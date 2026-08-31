// ---------------------------------------------------------------------------
// Back-office SODILAME
//
//   /admin                → tableau de bord
//   /admin/commandes      → liste, filtres, détail, changement de statut
//   /admin/clients        → liste, création, invitation, import Dolibarr
//   /admin/produits       → prix, disponibilité
//
// Toutes les pages exigent une session admin (voir lib/auth.mjs).
// ---------------------------------------------------------------------------
import { q, q1, initSchema, baseDisponible, STATUTS, estStatut, tracer } from '../lib/db.mjs';
import { exigerAdmin, normEmail } from '../lib/auth.mjs';
import { pageApp, html, esc, euros, dateFr, dateHeureFr, rediriger, flash, corpsRequete, etiquetteStatut } from '../lib/vue.mjs';
import { envoyer, gabarit, baseUrl, TEL } from '../lib/mail.mjs';
import { produits, categoriesProduits } from '../data/produits.mjs';
import { zones } from '../data/zones.mjs';

const COMMUNES = [...new Set(zones.flatMap((z) => z.communes))].sort((a, b) => a.localeCompare(b, 'fr'));
const normCommune = (s = '') =>
  String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const COMMUNES_SET = new Set(COMMUNES.map(normCommune));

const nettoyer = (s = '', max = 300) => String(s ?? '').trim().slice(0, max);
const et = (s) => etiquetteStatut(s, STATUTS);

// ---------------------------------------------------------------------------
export default async function handler(req, res) {
  const u = new URL(req.url, 'http://x');
  const query = Object.fromEntries(u.searchParams);
  const section = query.section || 'accueil';

  if (!baseDisponible()) {
    return html(res, 503, pageApp({
      titre: 'Base non branchée',
      corps: `<div class="carte"><h1>Base de données non branchée</h1>
      <p class="sous">L'administration a besoin d'une base Postgres. Dans Vercel : <b>Storage → Marketplace → Neon</b>, puis redéploie.</p></div>`,
    }));
  }

  const session = exigerAdmin(req, res);
  if (!session) return;

  try {
    await initSchema();
  } catch (e) {
    console.error('Init schéma :', e?.message);
    return html(res, 503, pageApp({ titre: 'Incident', session, corps: `<div class="carte"><h1>Incident technique</h1><p class="sous">${esc(e?.message || '')}</p></div>` }));
  }

  // ---- Actions (POST) -----------------------------------------------------
  if (req.method === 'POST') {
    const corps = await corpsRequete(req);
    try {
      return await agir(req, res, session, corps);
    } catch (e) {
      console.error('Action admin :', e);
      return rediriger(res, '/admin/' + (corps.retour || ''), 'Erreur : ' + (e?.message || 'opération impossible'), 'ko');
    }
  }

  // ---- Pages (GET) --------------------------------------------------------
  if (section === 'commandes') return html(res, 200, await vueCommandes(session, query));
  if (section === 'clients') return html(res, 200, await vueClients(session, query));
  if (section === 'produits') return html(res, 200, await vueProduits(session, query));
  return html(res, 200, await vueAccueil(session, query));
}

// ===========================================================================
// ACTIONS
// ===========================================================================
async function agir(req, res, session, c) {
  const action = c.action || '';

  // ---- Statut d'une commande ---------------------------------------------
  if (action === 'statut') {
    const id = parseInt(c.id, 10);
    const statut = nettoyer(c.statut, 20);
    if (!id || !estStatut(statut)) return rediriger(res, '/admin/commandes', 'Statut inconnu.', 'ko');

    const cmd = await q1(`SELECT reference, email, contact, statut FROM commandes WHERE id = $1`, [id]);
    if (!cmd) return rediriger(res, '/admin/commandes', 'Commande introuvable.', 'ko');

    await q(`UPDATE commandes SET statut = $1, maj_le = now() WHERE id = $2`, [statut, id]);
    await tracer(session.email, 'commande_statut', `${cmd.reference} : ${cmd.statut} → ${statut}`);

    // On ne prévient le client que sur les étapes qui l'intéressent.
    if (c.prevenir === '1' && ['validee', 'preparee', 'livree'].includes(statut)) {
      const texte = {
        validee: 'Votre commande est validée. Nous la préparons et nous vous la livrons lors de notre prochaine tournée dans votre secteur.',
        preparee: 'Votre commande est prête. Elle part avec l’un de nos techniciens lors de sa prochaine tournée dans votre secteur.',
        livree: 'Votre commande a été livrée. La facture vous parviendra dans les conditions habituelles de votre compte.',
      }[statut];
      await envoyer({
        to: cmd.email,
        sujet: `Commande ${cmd.reference} — ${STATUTS[statut].label.toLowerCase()}`,
        html: gabarit(`Commande ${cmd.reference}`, `<p>Bonjour${cmd.contact ? ' ' + esc(cmd.contact) : ''},</p><p>${texte}</p>`, {
          url: `${baseUrl(req)}/espace`,
          label: 'Voir ma commande',
        }),
        texte: `Bonjour,\n\n${texte}\n\nSODILAME — ${TEL}`,
      });
    }
    return rediriger(res, `/admin/commandes?id=${id}`, `Commande ${cmd.reference} : ${STATUTS[statut].label.toLowerCase()}.`);
  }

  // ---- Note interne sur une commande -------------------------------------
  if (action === 'note') {
    const id = parseInt(c.id, 10);
    await q(`UPDATE commandes SET note_interne = $1, maj_le = now() WHERE id = $2`, [nettoyer(c.note, 2000), id]);
    return rediriger(res, `/admin/commandes?id=${id}`, 'Note enregistrée.');
  }

  // ---- Création / modification d'un client -------------------------------
  if (action === 'client') {
    const id = c.id ? parseInt(c.id, 10) : null;
    const email = normEmail(c.email);
    const etablissement = nettoyer(c.etablissement, 160);
    if (!etablissement) return rediriger(res, '/admin/clients', "L'établissement est obligatoire.", 'ko');
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return rediriger(res, '/admin/clients', 'Adresse e-mail invalide.', 'ko');

    const champs = [
      nettoyer(c.ref_dolibarr, 60), etablissement, nettoyer(c.contact, 120), email,
      nettoyer(c.telephone, 40), nettoyer(c.adresse, 200), nettoyer(c.code_postal, 10),
      nettoyer(c.commune, 120), nettoyer(c.notes, 1000), c.actif === '1',
    ];

    if (id) {
      await q(
        `UPDATE clients SET ref_dolibarr=$1, etablissement=$2, contact=$3, email=$4, telephone=$5,
           adresse=$6, code_postal=$7, commune=$8, notes=$9, actif=$10 WHERE id=$11`,
        [...champs, id]
      );
      await tracer(session.email, 'client_modifie', `${etablissement} (${email})`);
      return rediriger(res, `/admin/clients?id=${id}`, 'Client mis à jour.');
    }

    const existe = await q1(`SELECT id FROM clients WHERE email = $1`, [email]);
    if (existe) return rediriger(res, `/admin/clients?id=${existe.id}`, 'Ce client existe déjà.', 'info');

    const n = await q1(
      `INSERT INTO clients (ref_dolibarr, etablissement, contact, email, telephone, adresse, code_postal, commune, notes, actif)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      champs
    );
    await tracer(session.email, 'client_cree', `${etablissement} (${email})`);
    return rediriger(res, `/admin/clients?id=${n.id}`, 'Client créé. Tu peux maintenant l’inviter.');
  }

  // ---- Invitation ---------------------------------------------------------
  if (action === 'inviter') {
    const id = parseInt(c.id, 10);
    const cl = await q1(`SELECT * FROM clients WHERE id = $1`, [id]);
    if (!cl) return rediriger(res, '/admin/clients', 'Client introuvable.', 'ko');
    if (!cl.actif) return rediriger(res, `/admin/clients?id=${id}`, 'Ce client est désactivé : réactive-le avant de l’inviter.', 'ko');

    const r = await envoyer({
      to: cl.email,
      sujet: 'Votre accès à la boutique en ligne SODILAME',
      html: gabarit(
        'Bienvenue sur la boutique SODILAME',
        `<p>Bonjour${cl.contact ? ' ' + esc(cl.contact) : ''},</p>
         <p>Vous pouvez désormais commander vos produits lessiviels et d’entretien directement en ligne, à toute heure.</p>
         <p><b>Vos coordonnées sont déjà enregistrées</b> : vous n’avez rien à ressaisir. Vous composez votre commande, vous l’envoyez, nous vous la confirmons par mail avec le montant exact, puis nous vous la livrons.</p>
         <p><b>La livraison est offerte dès un bidon</b> : nos techniciens vous la déposent lors de leur prochaine tournée dans votre secteur. Aucun paiement ne vous est demandé en ligne — la facturation se fait dans les conditions habituelles de votre compte.</p>
         <p>Pour vous connecter, il n’y a pas de mot de passe à retenir : vous saisissez votre adresse <b>${esc(cl.email)}</b> et vous recevez un lien de connexion.</p>`,
        { url: `${baseUrl(req)}/espace/connexion`, label: 'Accéder à la boutique' }
      ),
      texte: `Bonjour,\n\nVous pouvez désormais commander vos produits lessiviels en ligne sur ${baseUrl(req)}/espace/connexion\n\nVos coordonnées sont déjà enregistrées. Connexion sans mot de passe : saisissez ${cl.email}, vous recevez un lien.\n\nLivraison offerte dès un bidon, aucun paiement en ligne.\n\nSODILAME — ${TEL}`,
    });

    if (!r.ok) return rediriger(res, `/admin/clients?id=${id}`, 'Invitation non envoyée : ' + r.erreur, 'ko');

    await q(`UPDATE clients SET invite_le = now() WHERE id = $1`, [id]);
    await tracer(session.email, 'client_invite', `${cl.etablissement} (${cl.email})`);
    return rediriger(res, `/admin/clients?id=${id}`, `Invitation envoyée à ${cl.email}.`);
  }

  // ---- Import Dolibarr (CSV collé) ---------------------------------------
  if (action === 'import') {
    const brut = String(c.csv || '');
    if (!brut.trim()) return rediriger(res, '/admin/clients?vue=import', 'Rien à importer.', 'ko');

    const { lignes, erreurs } = analyserCsv(brut);
    let crees = 0;
    let majs = 0;
    for (const l of lignes) {
      const existe = await q1(`SELECT id FROM clients WHERE email = $1`, [l.email]);
      if (existe) {
        await q(
          `UPDATE clients SET ref_dolibarr=COALESCE(NULLIF($1,''), ref_dolibarr), etablissement=$2,
             contact=COALESCE(NULLIF($3,''), contact), telephone=COALESCE(NULLIF($4,''), telephone),
             adresse=COALESCE(NULLIF($5,''), adresse), code_postal=COALESCE(NULLIF($6,''), code_postal),
             commune=COALESCE(NULLIF($7,''), commune) WHERE id=$8`,
          [l.ref, l.etablissement, l.contact, l.telephone, l.adresse, l.cp, l.commune, existe.id]
        );
        majs++;
      } else {
        await q(
          `INSERT INTO clients (ref_dolibarr, etablissement, contact, email, telephone, adresse, code_postal, commune)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [l.ref, l.etablissement, l.contact, l.email, l.telephone, l.adresse, l.cp, l.commune]
        );
        crees++;
      }
    }
    await tracer(session.email, 'import_clients', `${crees} créés, ${majs} mis à jour, ${erreurs.length} ignorés`);
    const msg = `${crees} client${crees > 1 ? 's' : ''} créé${crees > 1 ? 's' : ''}, ${majs} mis à jour${
      erreurs.length ? `, ${erreurs.length} ligne(s) ignorée(s) : ${erreurs.slice(0, 3).join(' · ')}` : ''
    }.`;
    return rediriger(res, '/admin/clients', msg, erreurs.length ? 'info' : 'ok');
  }

  // ---- Prix et disponibilité ---------------------------------------------
  if (action === 'tarifs') {
    let n = 0;
    for (const p of produits) {
      for (const [k, cd] of p.conditionnements.entries()) {
        const cle = `p_${p.ref}__${k}`;
        if (!(cle in c)) continue;
        const brut = String(c[cle] ?? '').replace(',', '.').trim();
        const prix = brut === '' ? null : Number(brut);
        if (prix !== null && (!isFinite(prix) || prix < 0 || prix > 100000)) continue;
        const dispo = c[`d_${p.ref}__${k}`] === '1';
        await q(
          `INSERT INTO tarifs (ref, cond_label, prix_ht, disponible, maj_le, maj_par)
             VALUES ($1,$2,$3,$4,now(),$5)
           ON CONFLICT (ref, cond_label)
             DO UPDATE SET prix_ht = EXCLUDED.prix_ht, disponible = EXCLUDED.disponible,
                           maj_le = now(), maj_par = EXCLUDED.maj_par`,
          [p.ref, cd.label, prix, dispo, session.email]
        );
        n++;
      }
    }
    await tracer(session.email, 'tarifs_maj', `${n} lignes`);
    return rediriger(res, '/admin/produits', `${n} ligne${n > 1 ? 's' : ''} enregistrée${n > 1 ? 's' : ''}. Les prix sont visibles immédiatement sur le site.`);
  }

  return rediriger(res, '/admin', 'Action inconnue.', 'ko');
}

// ---------------------------------------------------------------------------
// Analyse d'un CSV Dolibarr collé (séparateur ; ou , ou tabulation)
// ---------------------------------------------------------------------------
export function analyserCsv(brut) {
  const lignes = [];
  const erreurs = [];
  const rangs = brut.split(/\r?\n/).filter((r) => r.trim());
  if (!rangs.length) return { lignes, erreurs };

  const sep = (r) => (r.includes('\t') ? '\t' : (r.match(/;/g) || []).length >= (r.match(/,/g) || []).length ? ';' : ',');
  const s = sep(rangs[0]);
  const decouper = (r) =>
    r.split(s).map((x) => x.trim().replace(/^"(.*)"$/s, '$1').trim());

  const entete = decouper(rangs[0]).map((x) =>
    x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  );
  const trouver = (...cles) => entete.findIndex((h) => cles.some((k) => h.includes(k)));

  const iEmail = trouver('email', 'e-mail', 'mail');
  if (iEmail === -1) {
    erreurs.push('aucune colonne e-mail trouvée dans l’en-tête');
    return { lignes, erreurs };
  }
  const iNom = trouver('societe', 'société', 'nom', 'raison', 'client', 'tiers');
  const iRef = trouver('ref', 'code', 'id');
  const iContact = trouver('contact', 'interlocuteur', 'prenom');
  const iTel = trouver('tel', 'phone', 'telephone');
  const iAdr = trouver('adresse', 'address', 'rue');
  const iCp = trouver('zip', 'cp', 'postal');
  const iVille = trouver('ville', 'commune', 'town', 'city');

  for (const r of rangs.slice(1)) {
    const cols = decouper(r);
    const email = normEmail(cols[iEmail] || '');
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
      erreurs.push(`ligne sans e-mail valide (${(cols[iNom] || cols[0] || '?').slice(0, 30)})`);
      continue;
    }
    const etablissement = nettoyer(iNom >= 0 ? cols[iNom] : '', 160) || email.split('@')[0];
    lignes.push({
      ref: nettoyer(iRef >= 0 ? cols[iRef] : '', 60),
      etablissement,
      contact: nettoyer(iContact >= 0 ? cols[iContact] : '', 120),
      email,
      telephone: nettoyer(iTel >= 0 ? cols[iTel] : '', 40),
      adresse: nettoyer(iAdr >= 0 ? cols[iAdr] : '', 200),
      cp: nettoyer(iCp >= 0 ? cols[iCp] : '', 10),
      commune: nettoyer(iVille >= 0 ? cols[iVille] : '', 120),
    });
  }
  return { lignes, erreurs };
}

// ===========================================================================
// VUES
// ===========================================================================
async function vueAccueil(session, query) {
  const parStatut = await q(`SELECT statut, COUNT(*)::int n FROM commandes GROUP BY statut`);
  const compte = Object.fromEntries(parStatut.map((r) => [r.statut, r.n]));
  const nbClients = (await q1(`SELECT COUNT(*)::int n FROM clients WHERE actif`))?.n || 0;
  const nbInvites = (await q1(`SELECT COUNT(*)::int n FROM clients WHERE actif AND invite_le IS NOT NULL`))?.n || 0;
  const nbTarifs = (await q1(`SELECT COUNT(*)::int n FROM tarifs WHERE prix_ht IS NOT NULL`))?.n || 0;
  const totalCond = produits.reduce((n, p) => n + p.conditionnements.length, 0);
  const recentes = await q(
    `SELECT id, reference, etablissement, commune, total_ht, statut, cree_le
       FROM commandes ORDER BY cree_le DESC LIMIT 8`
  );

  const aTraiter = (compte.recue || 0) + (compte.validee || 0) + (compte.preparee || 0);

  return pageApp({
    titre: 'Tableau de bord',
    session,
    actif: 'accueil',
    corps: `
${flash(query)}
<h1>Tableau de bord</h1>
<p class="sous">Bonjour ${esc(session.email)}. Voici l'état de la boutique.</p>

<div class="grille">
  <div class="kpi"><b>${compte.recue || 0}</b><span>commande${(compte.recue || 0) > 1 ? 's' : ''} à traiter</span></div>
  <div class="kpi"><b>${aTraiter}</b><span>en cours (non livrées)</span></div>
  <div class="kpi"><b>${nbClients}</b><span>clients actifs</span></div>
  <div class="kpi"><b>${nbInvites}/${nbClients}</b><span>clients invités</span></div>
  <div class="kpi"><b>${nbTarifs}/${totalCond}</b><span>prix renseignés</span></div>
</div>

${
  nbTarifs < totalCond
    ? `<div class="msg info"><b>Il reste ${totalCond - nbTarifs} prix à renseigner.</b> Tant qu'un conditionnement n'a pas de prix, le site affiche « Prix sur demande » et le client ne peut pas calculer son total. <a href="/admin/produits">Renseigner les prix →</a></div>`
    : ''
}
${
  nbClients === 0
    ? `<div class="msg info"><b>Aucun client enregistré.</b> Commence par importer ton fichier Dolibarr, puis invite tes clients. <a href="/admin/clients?vue=import">Importer depuis Dolibarr →</a></div>`
    : ''
}

<h2>Dernières commandes</h2>
${
  recentes.length
    ? `<div class="tw"><table>
  <tr><th>Référence</th><th>Client</th><th>Commune</th><th class="num">Total HT</th><th>Statut</th><th class="num">Reçue le</th></tr>
  ${recentes
    .map(
      (c) => `<tr>
    <td><a href="/admin/commandes?id=${c.id}"><b>${esc(c.reference)}</b></a></td>
    <td>${esc(c.etablissement)}</td>
    <td>${esc(c.commune)}</td>
    <td class="num">${euros(c.total_ht)}</td>
    <td>${et(c.statut)}</td>
    <td class="num">${dateFr(c.cree_le)}</td>
  </tr>`
    )
    .join('')}
</table></div>
<p style="margin-top:14px"><a class="b s" href="/admin/commandes">Voir toutes les commandes</a></p>`
    : `<div class="carte vide">Aucune commande pour le moment.</div>`
}`,
  });
}

// ---------------------------------------------------------------------------
async function vueCommandes(session, query) {
  if (query.id) return vueCommande(session, query);

  const filtre = estStatut(query.statut) ? query.statut : '';
  const lignes = filtre
    ? await q(
        `SELECT id, reference, etablissement, contact, commune, total_ht, statut, cree_le
           FROM commandes WHERE statut = $1 ORDER BY cree_le DESC LIMIT 200`,
        [filtre]
      )
    : await q(
        `SELECT id, reference, etablissement, contact, commune, total_ht, statut, cree_le
           FROM commandes ORDER BY cree_le DESC LIMIT 200`
      );

  const onglet = (v, l) =>
    `<a class="b ${filtre === v ? 'p' : 's'} mini" href="/admin/commandes${v ? '?statut=' + v : ''}">${l}</a>`;

  return pageApp({
    titre: 'Commandes',
    session,
    actif: 'commandes',
    corps: `
${flash(query)}
<h1>Commandes</h1>
<p class="sous">${lignes.length} commande${lignes.length > 1 ? 's' : ''}${filtre ? ` au statut « ${STATUTS[filtre].label} »` : ''}.</p>

<div class="ligne-act" style="margin-bottom:18px">
  ${onglet('', 'Toutes')}
  ${Object.entries(STATUTS).sort((a, b) => a[1].ordre - b[1].ordre).map(([k, v]) => onglet(k, v.label)).join('')}
</div>

${
  lignes.length
    ? `<div class="tw"><table>
  <tr><th>Référence</th><th>Client</th><th>Commune</th><th class="num">Total HT</th><th>Statut</th><th class="num">Reçue le</th></tr>
  ${lignes
    .map(
      (c) => `<tr>
    <td><a href="/admin/commandes?id=${c.id}"><b>${esc(c.reference)}</b></a></td>
    <td>${esc(c.etablissement)}<span class="meta">${esc(c.contact)}</span></td>
    <td>${esc(c.commune)}</td>
    <td class="num">${euros(c.total_ht)}</td>
    <td>${et(c.statut)}</td>
    <td class="num">${dateFr(c.cree_le)}</td>
  </tr>`
    )
    .join('')}
</table></div>`
    : `<div class="carte vide">Aucune commande${filtre ? ' à ce statut' : ''}.</div>`
}`,
  });
}

async function vueCommande(session, query) {
  const id = parseInt(query.id, 10);
  const c = await q1(`SELECT * FROM commandes WHERE id = $1`, [id]);
  if (!c) return pageApp({ titre: 'Introuvable', session, actif: 'commandes', corps: `<div class="carte vide">Commande introuvable.</div>` });
  const lignes = await q(`SELECT * FROM commande_lignes WHERE commande_id = $1 ORDER BY id`, [id]);

  return pageApp({
    titre: `Commande ${c.reference}`,
    session,
    actif: 'commandes',
    corps: `
${flash(query)}
<p><a href="/admin/commandes">← Toutes les commandes</a></p>
<div class="ent">
  <div>
    <h1>Commande ${esc(c.reference)}</h1>
    <p class="sous">Reçue le ${dateHeureFr(c.cree_le)}${c.maj_le && c.maj_le !== c.cree_le ? ` · modifiée le ${dateHeureFr(c.maj_le)}` : ''}</p>
  </div>
  <div>${et(c.statut)}</div>
</div>

<div class="r2">
  <div class="carte">
    <h2 style="margin-top:0">Client</h2>
    <p><b>${esc(c.etablissement)}</b><br>
    ${esc(c.contact)}<br>
    <a href="tel:${esc(c.telephone)}">${esc(c.telephone)}</a><br>
    <a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>
    <h2>Livraison</h2>
    <p>${esc(c.adresse)}<br>${esc(c.code_postal)} ${esc(c.commune)}</p>
    ${c.message ? `<h2>Précisions du client</h2><p style="white-space:pre-wrap">${esc(c.message)}</p>` : ''}
  </div>

  <div class="carte">
    <h2 style="margin-top:0">Faire avancer la commande</h2>
    <form method="post" action="/admin">
      <input type="hidden" name="action" value="statut">
      <input type="hidden" name="id" value="${c.id}">
      <div class="champ">
        <label for="st">Statut</label>
        <select id="st" name="statut">
          ${Object.entries(STATUTS)
            .sort((a, b) => a[1].ordre - b[1].ordre)
            .map(([k, v]) => `<option value="${k}"${k === c.statut ? ' selected' : ''}>${v.label}</option>`)
            .join('')}
        </select>
      </div>
      <label style="display:flex;gap:.5rem;align-items:flex-start;font-weight:400;color:var(--ink)">
        <input type="checkbox" name="prevenir" value="1" checked style="width:auto;margin-top:3px">
        <span>Prévenir le client par e-mail<span class="meta">Uniquement pour Validée, Préparée et Livrée.</span></span>
      </label>
      <p><button class="b p" type="submit">Enregistrer le statut</button></p>
    </form>

    <form method="post" action="/admin" style="margin-top:22px;padding-top:18px;border-top:1px solid var(--line)">
      <input type="hidden" name="action" value="note">
      <input type="hidden" name="id" value="${c.id}">
      <div class="champ">
        <label for="nt">Note interne</label>
        <textarea id="nt" name="note" placeholder="Numéro de BL, remarque de préparation, tournée prévue…">${esc(c.note_interne)}</textarea>
        <p class="aide">Visible uniquement par vous. Jamais envoyée au client.</p>
      </div>
      <button class="b s" type="submit">Enregistrer la note</button>
    </form>
  </div>
</div>

<h2>Produits commandés</h2>
<div class="tw"><table>
  <tr><th>Produit</th><th class="num">Qté</th><th class="num">Prix unitaire</th><th class="num">Total</th></tr>
  ${lignes
    .map(
      (l) => `<tr>
    <td><b>${esc(l.nom)}</b><span class="meta">${esc(l.marque)} · Réf. ${esc(l.ref)} · ${esc(l.cond_label)}</span></td>
    <td class="num">${l.qte}</td>
    <td class="num">${euros(l.prix_ht)}</td>
    <td class="num">${l.prix_ht === null ? '<span class="et or">à chiffrer</span>' : euros(Number(l.prix_ht) * l.qte)}</td>
  </tr>`
    )
    .join('')}
  <tr><td colspan="3" class="num"><b>Total estimé HT</b></td><td class="num"><b>${euros(c.total_ht)}</b></td></tr>
</table></div>`,
  });
}

// ---------------------------------------------------------------------------
async function vueClients(session, query) {
  if (query.vue === 'import') return vueImport(session, query);
  if (query.id) return vueClient(session, query);

  const lignes = await q(
    `SELECT c.*, (SELECT COUNT(*)::int FROM commandes o WHERE o.client_id = c.id) nb_commandes
       FROM clients c ORDER BY c.etablissement LIMIT 500`
  );

  return pageApp({
    titre: 'Clients',
    session,
    actif: 'clients',
    corps: `
${flash(query)}
<div class="ent">
  <div><h1>Clients</h1><p class="sous">${lignes.length} fiche${lignes.length > 1 ? 's' : ''}.</p></div>
  <div class="ligne-act">
    <a class="b s" href="/admin/clients?vue=import">Importer depuis Dolibarr</a>
    <a class="b p" href="/admin/clients?id=nouveau">Ajouter un client</a>
  </div>
</div>

${
  lignes.length
    ? `<div class="tw"><table>
  <tr><th>Établissement</th><th>Contact</th><th>Commune</th><th>Accès</th><th class="num">Commandes</th></tr>
  ${lignes
    .map(
      (c) => `<tr>
    <td><a href="/admin/clients?id=${c.id}"><b>${esc(c.etablissement)}</b></a>${c.ref_dolibarr ? `<span class="meta">Dolibarr ${esc(c.ref_dolibarr)}</span>` : ''}</td>
    <td>${esc(c.contact)}<span class="meta">${esc(c.email)}</span></td>
    <td>${esc(c.commune)}</td>
    <td>${
      !c.actif
        ? '<span class="et rouge">Désactivé</span>'
        : c.connecte_le
        ? '<span class="et vert">Actif</span>'
        : c.invite_le
        ? '<span class="et or">Invité</span>'
        : '<span class="et gris">Non invité</span>'
    }</td>
    <td class="num">${c.nb_commandes}</td>
  </tr>`
    )
    .join('')}
</table></div>`
    : `<div class="carte vide"><p>Aucun client enregistré.</p><p><a class="b p" href="/admin/clients?vue=import">Importer depuis Dolibarr</a></p></div>`
}`,
  });
}

async function vueClient(session, query) {
  const nouveau = query.id === 'nouveau';
  const c = nouveau
    ? { id: '', ref_dolibarr: '', etablissement: '', contact: '', email: '', telephone: '', adresse: '', code_postal: '', commune: '', notes: '', actif: true }
    : await q1(`SELECT * FROM clients WHERE id = $1`, [parseInt(query.id, 10)]);

  if (!c) return pageApp({ titre: 'Introuvable', session, actif: 'clients', corps: `<div class="carte vide">Client introuvable.</div>` });

  const commandes = nouveau
    ? []
    : await q(`SELECT id, reference, total_ht, statut, cree_le FROM commandes WHERE client_id = $1 ORDER BY cree_le DESC LIMIT 20`, [c.id]);

  const horsZone = c.commune && !COMMUNES_SET.has(normCommune(c.commune));

  return pageApp({
    titre: nouveau ? 'Nouveau client' : c.etablissement,
    session,
    actif: 'clients',
    corps: `
${flash(query)}
<p><a href="/admin/clients">← Tous les clients</a></p>
<h1>${nouveau ? 'Nouveau client' : esc(c.etablissement)}</h1>
<p class="sous">${
      nouveau
        ? 'Renseigne la fiche, puis invite le client à rejoindre la boutique.'
        : `Créé le ${dateFr(c.cree_le)}${c.invite_le ? ` · invité le ${dateFr(c.invite_le)}` : ' · jamais invité'}${c.connecte_le ? ` · dernière connexion le ${dateFr(c.connecte_le)}` : ''}`
    }</p>

${horsZone ? `<div class="msg info"><b>Commune hors zone de livraison.</b> « ${esc(c.commune)} » ne figure pas dans les ${COMMUNES.length} communes desservies : ce client ne pourra pas valider de commande en ligne.</div>` : ''}

<div class="r2">
  <div class="carte">
    <h2 style="margin-top:0">Fiche client</h2>
    <form method="post" action="/admin">
      <input type="hidden" name="action" value="client">
      ${nouveau ? '' : `<input type="hidden" name="id" value="${c.id}">`}
      <div class="r2">
        <div class="champ"><label for="f1">Établissement *</label><input id="f1" type="text" name="etablissement" value="${esc(c.etablissement)}" required></div>
        <div class="champ"><label for="f2">Référence Dolibarr</label><input id="f2" type="text" name="ref_dolibarr" value="${esc(c.ref_dolibarr)}"></div>
      </div>
      <div class="r2">
        <div class="champ"><label for="f3">Contact</label><input id="f3" type="text" name="contact" value="${esc(c.contact)}"></div>
        <div class="champ"><label for="f4">Téléphone</label><input id="f4" type="tel" name="telephone" value="${esc(c.telephone)}"></div>
      </div>
      <div class="champ"><label for="f5">E-mail *</label><input id="f5" type="email" name="email" value="${esc(c.email)}" required>
        <p class="aide">C'est cette adresse qui sert à se connecter. La changer change l'accès.</p></div>
      <div class="champ"><label for="f6">Adresse de livraison</label><input id="f6" type="text" name="adresse" value="${esc(c.adresse)}"></div>
      <div class="r2">
        <div class="champ"><label for="f7">Code postal</label><input id="f7" type="text" name="code_postal" value="${esc(c.code_postal)}"></div>
        <div class="champ"><label for="f8">Commune</label><input id="f8" type="text" name="commune" value="${esc(c.commune)}" list="communes">
          <datalist id="communes">${COMMUNES.map((x) => `<option value="${esc(x)}">`).join('')}</datalist></div>
      </div>
      <div class="champ"><label for="f9">Notes internes</label><textarea id="f9" name="notes">${esc(c.notes)}</textarea></div>
      <div class="champ">
        <label style="display:flex;gap:.5rem;align-items:center;font-weight:400;color:var(--ink)">
          <input type="checkbox" name="actif" value="1"${c.actif ? ' checked' : ''} style="width:auto"> Compte actif
        </label>
        <p class="aide">Décoché, le client ne peut plus se connecter ni commander. Ses commandes sont conservées.</p>
      </div>
      <button class="b p" type="submit">${nouveau ? 'Créer le client' : 'Enregistrer'}</button>
    </form>
  </div>

  <div>
    ${
      nouveau
        ? `<div class="carte"><h2 style="margin-top:0">Invitation</h2><p class="sous">Crée d'abord la fiche : le bouton d'invitation apparaîtra ensuite.</p></div>`
        : `<div class="carte">
      <h2 style="margin-top:0">Accès à la boutique</h2>
      <p class="sous">${
        c.connecte_le
          ? 'Ce client s’est déjà connecté. Tout fonctionne.'
          : c.invite_le
          ? `Invité le ${dateFr(c.invite_le)}, jamais connecté. Tu peux relancer.`
          : 'Ce client n’a pas encore reçu son invitation.'
      }</p>
      <form method="post" action="/admin">
        <input type="hidden" name="action" value="inviter">
        <input type="hidden" name="id" value="${c.id}">
        <button class="b p" type="submit"${c.actif ? '' : ' disabled'}>${c.invite_le ? 'Renvoyer l’invitation' : 'Envoyer l’invitation'}</button>
      </form>
      <p class="aide" style="margin-top:12px">L'e-mail explique la livraison offerte, l'absence de paiement en ligne et la connexion sans mot de passe.</p>
    </div>

    <div class="carte">
      <h2 style="margin-top:0">Commandes</h2>
      ${
        commandes.length
          ? `<table style="min-width:0">${commandes
              .map(
                (o) => `<tr><td><a href="/admin/commandes?id=${o.id}">${esc(o.reference)}</a><span class="meta">${dateFr(o.cree_le)}</span></td><td class="num">${euros(o.total_ht)}</td><td class="num">${et(o.statut)}</td></tr>`
              )
              .join('')}</table>`
          : `<p class="sous">Aucune commande pour ce client.</p>`
      }
    </div>`
    }
  </div>
</div>`,
  });
}

function vueImport(session, query) {
  return pageApp({
    titre: 'Importer des clients',
    session,
    actif: 'clients',
    corps: `
${flash(query)}
<p><a href="/admin/clients">← Tous les clients</a></p>
<h1>Importer depuis Dolibarr</h1>
<p class="sous">Exporte tes tiers depuis Dolibarr au format CSV, ouvre le fichier, copie tout, colle ici.</p>

<div class="carte">
  <h2 style="margin-top:0">Comment faire</h2>
  <ol style="padding-left:20px;color:var(--muted);font-size:14px">
    <li>Dans Dolibarr : <b>Tiers → Exports</b>, ou <b>Outils → Exports → Tiers</b>.</li>
    <li>Coche au minimum : <b>e-mail</b>, <b>nom ou société</b>. Ajoute si tu les as : référence, contact, téléphone, adresse, code postal, ville.</li>
    <li>Exporte en CSV, ouvre le fichier avec un tableur ou un éditeur de texte, sélectionne tout et copie.</li>
    <li>Colle ci-dessous, en gardant la <b>première ligne d'en-tête</b> : c'est elle qui me dit quelle colonne est quoi.</li>
  </ol>
  <p class="aide">Les séparateurs point-virgule, virgule et tabulation sont reconnus automatiquement. Un client dont l'e-mail existe déjà est mis à jour, jamais dupliqué. Les lignes sans e-mail valide sont ignorées et signalées.</p>
</div>

<div class="carte">
  <form method="post" action="/admin">
    <input type="hidden" name="action" value="import">
    <input type="hidden" name="retour" value="clients">
    <div class="champ">
      <label for="csv">Contenu du fichier CSV</label>
      <textarea id="csv" name="csv" style="min-height:260px;font-family:ui-monospace,Menlo,monospace;font-size:13px" placeholder="ref;societe;email;telephone;adresse;cp;ville
CL0142;Restaurant Le Mas;contact@lemas.fr;0490000000;12 avenue de la République;13200;Arles"></textarea>
    </div>
    <button class="b p" type="submit">Importer</button>
  </form>
</div>

<div class="msg info"><b>Rien n'est envoyé aux clients à cette étape.</b> L'import crée les fiches, c'est tout. Tu invites ensuite qui tu veux, quand tu veux, depuis chaque fiche.</div>`,
  });
}

// ---------------------------------------------------------------------------
async function vueProduits(session, query) {
  const rows = await q(`SELECT ref, cond_label, prix_ht, disponible, maj_le, maj_par FROM tarifs`);
  const carte = new Map(rows.map((r) => [`${r.ref}__${r.cond_label}`, r]));
  const nbRenseignes = rows.filter((r) => r.prix_ht !== null).length;
  const totalCond = produits.reduce((n, p) => n + p.conditionnements.length, 0);

  const bloc = (cat) => {
    const liste = produits.filter((p) => p.categorie === cat.slug);
    return `<h2>${esc(cat.nom)}</h2>
<div class="tw"><table>
  <tr><th>Produit</th><th>Conditionnement</th><th class="num" style="width:150px">Prix HT (€)</th><th style="width:110px">En vente</th><th class="num">Modifié</th></tr>
  ${liste
    .map((p) =>
      p.conditionnements
        .map((cd, k) => {
          const t = carte.get(`${p.ref}__${cd.label}`);
          const prix = t && t.prix_ht !== null ? Number(t.prix_ht).toFixed(2) : '';
          const dispo = t ? t.disponible : true;
          return `<tr>
    ${k === 0 ? `<td rowspan="${p.conditionnements.length}"><b>${esc(p.nom)}</b><span class="meta">${esc(p.marque)} · Réf. ${esc(p.ref)}</span></td>` : ''}
    <td>${esc(cd.label)}${cd.aConfirmer ? ' <span class="et or">à confirmer</span>' : ''}</td>
    <td class="num"><input type="text" inputmode="decimal" name="p_${esc(p.ref)}__${k}" value="${prix}" placeholder="—" style="text-align:right"></td>
    <td><label style="display:flex;gap:.4rem;align-items:center;font-weight:400;color:var(--ink);margin:0">
      <input type="checkbox" name="d_${esc(p.ref)}__${k}" value="1"${dispo ? ' checked' : ''} style="width:auto"> Oui</label></td>
    <td class="num">${t ? dateFr(t.maj_le) : '—'}</td>
  </tr>`;
        })
        .join('')
    )
    .join('')}
</table></div>`;
  };

  return pageApp({
    titre: 'Produits & prix',
    session,
    actif: 'produits',
    corps: `
${flash(query)}
<h1>Produits &amp; prix</h1>
<p class="sous">${nbRenseignes} prix renseignés sur ${totalCond}. Un prix vide affiche « Prix sur demande » côté client. Décocher « En vente » masque le bouton d'ajout sans supprimer la fiche produit.</p>

<div class="msg info">Les modifications sont visibles <b>immédiatement</b> sur le site : les pages produits lisent les prix en direct. Aucun redéploiement nécessaire.</div>

<form method="post" action="/admin">
  <input type="hidden" name="action" value="tarifs">
  ${categoriesProduits.map(bloc).join('\n')}
  <div class="barre-actions">
    <button class="b p" type="submit">Enregistrer tous les prix</button>
  </div>
</form>`,
  });
}
