// ---------------------------------------------------------------------------
// POST /api/commande — enregistrement d'une commande de produits lessiviels
//
// Réservé aux clients invités (session ouverte). Aucun paiement n'est traité :
// la commande est enregistrée, notifiée par e-mail à SODILAME, puis validée et
// facturée dans les conditions habituelles du compte client.
//
// SÉCURITÉ : ni l'identité du client ni les prix ne viennent du navigateur.
// Le client est lu depuis la session, les prix depuis la base (ou, à défaut,
// depuis le catalogue du code). Le navigateur ne choisit que des références,
// des conditionnements et des quantités.
// ---------------------------------------------------------------------------
import { q, q1, initSchema, baseDisponible, tracer } from '../lib/db.mjs';
import { lireSession } from '../lib/auth.mjs';
import { json, corpsRequete } from '../lib/vue.mjs';
import { envoyer, gabarit, echapper, baseUrl, DESTINATION, TEL } from '../lib/mail.mjs';
import { produits } from '../data/produits.mjs';
import { zones } from '../data/zones.mjs';

const normaliser = (s = '') =>
  String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');

const COMMUNES = new Set(zones.flatMap((z) => z.communes).map(normaliser));
const nbCommunes = new Set(zones.flatMap((z) => z.communes)).size;

// Index du catalogue : référence + conditionnement → produit officiel.
const CATALOGUE = new Map();
for (const p of produits) {
  for (const c of p.conditionnements) {
    CATALOGUE.set(`${p.ref}__${c.label}`, {
      ref: p.ref, nom: p.nom, marque: p.marque, cond: c.label, prixFichier: c.prix ?? null,
    });
  }
}

const vus = new Map();
function tropDeRequetes(ip) {
  const t = Date.now();
  const l = (vus.get(ip) || []).filter((x) => t - x < 10 * 60 * 1000);
  l.push(t);
  vus.set(ip, l);
  if (vus.size > 5000) vus.clear();
  return l.length > 8;
}

const nettoyer = (s = '', max = 500) => String(s ?? '').replace(/\r?\n/g, '\n').trim().slice(0, max);
const euros = (n) => Number(n).toFixed(2).replace('.', ',') + ' €';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { erreur: 'Méthode non autorisée.' });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'inconnue';
  if (tropDeRequetes(ip)) {
    return json(res, 429, { erreur: `Trop de commandes envoyées. Merci d'appeler le ${TEL}.` });
  }

  // ---- Le client doit être connecté ---------------------------------------
  let session = null;
  try {
    session = lireSession(req);
  } catch {
    session = null;
  }
  if (!session || session.role !== 'client') {
    return json(res, 401, {
      erreur: 'La commande en ligne est réservée aux clients SODILAME.',
      connexion: '/espace/connexion?suite=%2Fproduits%2Fma-commande',
    });
  }

  if (!baseDisponible()) {
    return json(res, 503, { erreur: `La commande en ligne est momentanément indisponible. Merci d'appeler le ${TEL}.` });
  }

  let corps;
  try {
    corps = await corpsRequete(req);
  } catch {
    return json(res, 400, { erreur: 'Requête illisible. Merci de réessayer.' });
  }

  if (nettoyer(corps.societe_web)) return json(res, 200, { ok: true }); // piège à robots

  try {
    await initSchema();
  } catch (e) {
    console.error('Init schéma :', e?.message);
    return json(res, 503, { erreur: `Service indisponible. Merci d'appeler le ${TEL}.` });
  }

  const client = await q1(`SELECT * FROM clients WHERE id = $1`, [session.clientId]);
  if (!client || !client.actif) {
    return json(res, 403, { erreur: `Votre compte n'est plus actif. Merci d'appeler le ${TEL}.` });
  }

  // ---- Livraison : celle du compte, sauf remplacement explicite ------------
  const adresse = nettoyer(corps.adresse, 200) || client.adresse;
  const codePostal = nettoyer(corps.codePostal, 10) || client.code_postal;
  const commune = nettoyer(corps.commune, 120) || client.commune;
  const message = nettoyer(corps.message, 2000);

  const manquants = [];
  if (!adresse) manquants.push('adresse de livraison');
  if (!/^\d{5}$/.test(codePostal)) manquants.push('code postal à 5 chiffres');
  if (!commune) manquants.push('commune');
  if (manquants.length) return json(res, 400, { erreur: `Merci de renseigner : ${manquants.join(', ')}.` });

  if (!COMMUNES.has(normaliser(commune))) {
    return json(res, 400, {
      erreur: `Nous ne livrons pas encore ${commune}. Notre zone couvre ${nbCommunes} communes des Bouches-du-Rhône, du Gard et du Vaucluse. Appelez le ${TEL} : nous trouverons une solution.`,
    });
  }

  // ---- Lignes : références validées, prix repris côté serveur -------------
  const tarifs = new Map(
    (await q(`SELECT ref, cond_label, prix_ht, disponible FROM tarifs`)).map((r) => [
      `${r.ref}__${r.cond_label}`,
      { prix: r.prix_ht === null ? null : Number(r.prix_ht), dispo: r.disponible !== false },
    ])
  );

  const brut = Array.isArray(corps.lignes) ? corps.lignes.slice(0, 60) : [];
  const lignes = [];
  const refusees = [];

  for (const l of brut) {
    const cle = `${nettoyer(l?.ref, 40)}__${nettoyer(l?.cond, 80)}`;
    const officiel = CATALOGUE.get(cle);
    if (!officiel) {
      refusees.push(nettoyer(l?.nom, 60) || 'référence inconnue');
      continue;
    }
    const t = tarifs.get(cle);
    if (t && t.dispo === false) {
      refusees.push(`${officiel.nom} (${officiel.cond}) — plus disponible`);
      continue;
    }
    lignes.push({
      ...officiel,
      qte: Math.min(999, Math.max(1, parseInt(l?.qte, 10) || 1)),
      prix: t && t.prix !== null ? t.prix : officiel.prixFichier,
    });
  }

  if (refusees.length) {
    return json(res, 409, {
      erreur: `Certaines lignes ne sont plus commandables : ${refusees.slice(0, 3).join(', ')}. Merci de retirer ces produits de votre commande.`,
      refusees,
    });
  }
  if (!lignes.length) return json(res, 400, { erreur: 'Votre commande est vide.' });

  const avecPrix = lignes.filter((l) => l.prix !== null);
  const total = avecPrix.reduce((s, l) => s + l.prix * l.qte, 0);
  const totalPartiel = avecPrix.length < lignes.length;

  // ---- Enregistrement ------------------------------------------------------
  const reference =
    'C' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + String(Date.now()).slice(-4);

  const cmd = await q1(
    `INSERT INTO commandes (reference, client_id, etablissement, contact, email, telephone,
        adresse, code_postal, commune, message, total_ht, statut)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'recue') RETURNING id`,
    [
      reference, client.id, client.etablissement, client.contact, client.email, client.telephone,
      adresse, codePostal, commune, message, avecPrix.length ? total.toFixed(2) : null,
    ]
  );

  for (const l of lignes) {
    await q(
      `INSERT INTO commande_lignes (commande_id, ref, nom, marque, cond_label, qte, prix_ht)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [cmd.id, l.ref, l.nom, l.marque, l.cond, l.qte, l.prix === null ? null : l.prix.toFixed(2)]
    );
  }

  await tracer(client.email, 'commande_recue', `${reference} — ${lignes.length} lignes`);

  // ---- Notifications --------------------------------------------------------
  const rows = lignes
    .map(
      (l) => `<tr>
      <td style="padding:9px 12px;border-bottom:1px solid #E4DACA">
        <b style="color:#1B2430">${echapper(l.nom)}</b><br>
        <span style="color:#5A6675;font-size:12px">${echapper(l.marque)} · Réf. ${echapper(l.ref)} · ${echapper(l.cond)}</span>
      </td>
      <td style="padding:9px 12px;border-bottom:1px solid #E4DACA;text-align:right"><b>${l.qte}</b></td>
      <td style="padding:9px 12px;border-bottom:1px solid #E4DACA;text-align:right;white-space:nowrap">${
        l.prix === null ? '<i style="color:#B4761B">à chiffrer</i>' : euros(l.prix * l.qte)
      }</td>
    </tr>`
    )
    .join('');

  const tableau = `<table role="presentation" width="100%" style="font-size:14px;border-collapse:collapse;margin:8px 0">
    <thead><tr>
      <th style="text-align:left;padding:8px 12px;background:#F3ECE0;color:#5A6675;font-size:11px;text-transform:uppercase">Produit</th>
      <th style="text-align:right;padding:8px 12px;background:#F3ECE0;color:#5A6675;font-size:11px;text-transform:uppercase">Qté</th>
      <th style="text-align:right;padding:8px 12px;background:#F3ECE0;color:#5A6675;font-size:11px;text-transform:uppercase">Total</th>
    </tr></thead><tbody>${rows}</tbody></table>
    <p style="text-align:right;font-size:16px;margin:12px 0 0">Total estimé HT : <b>${avecPrix.length ? euros(total) : 'à chiffrer'}</b>${
      totalPartiel ? '<br><span style="font-size:12px;color:#B4761B">Certaines lignes sont à chiffrer.</span>' : ''
    }</p>`;

  await envoyer({
    to: DESTINATION,
    replyTo: client.email,
    sujet: `[Commande ${reference}] ${client.etablissement} — ${commune}`,
    html: gabarit(
      `Nouvelle commande ${reference}`,
      `<table role="presentation" style="font-size:14px;width:100%;margin-bottom:14px">
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675">Établissement</td><td><b>${echapper(client.etablissement)}</b></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675">Contact</td><td><b>${echapper(client.contact)}</b></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675">Téléphone</td><td><b>${echapper(client.telephone)}</b></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675">E-mail</td><td><b>${echapper(client.email)}</b></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675;vertical-align:top">Livraison</td><td><b>${echapper(adresse)}<br>${echapper(codePostal)} ${echapper(commune)}</b></td></tr>
      </table>
      ${tableau}
      ${message ? `<p style="margin:18px 0 4px;color:#5A6675;font-size:13px">Précisions du client :</p><div style="background:#FAF6EF;border-left:4px solid #DFA64F;padding:12px 16px;white-space:pre-wrap">${echapper(message)}</div>` : ''}`,
      { url: `${baseUrl(req)}/admin/commandes?id=${cmd.id}`, label: 'Traiter la commande' }
    ),
    texte: [
      `NOUVELLE COMMANDE — ${reference}`,
      ``,
      `Établissement : ${client.etablissement}`,
      `Contact       : ${client.contact}`,
      `Téléphone     : ${client.telephone}`,
      `E-mail        : ${client.email}`,
      `Livraison     : ${adresse}, ${codePostal} ${commune}`,
      ``,
      ...lignes.map((l) => `  ${l.qte} × ${l.nom} (${l.marque} ${l.ref}) — ${l.cond} — ${l.prix === null ? 'à chiffrer' : euros(l.prix * l.qte)}`),
      ``,
      `Total estimé HT : ${avecPrix.length ? euros(total) : 'à chiffrer'}`,
      ``,
      message ? `Précisions :\n${message}` : '(aucune précision)',
    ].join('\n'),
  });

  // Accusé de réception au client — échec silencieux, la commande est enregistrée.
  envoyer({
    to: client.email,
    replyTo: DESTINATION,
    sujet: `Votre commande ${reference} — SODILAME`,
    html: gabarit(
      `Commande ${reference}`,
      `<p>Bonjour${client.contact ? ' ' + echapper(client.contact) : ''},</p>
       <p>Nous avons bien reçu votre commande pour <b>${echapper(client.etablissement)}</b>.</p>
       ${tableau}
       <p style="margin-top:18px">Livraison prévue, <b>sans frais de port</b>, à l'adresse suivante :<br>
       ${echapper(adresse)}<br>${echapper(codePostal)} ${echapper(commune)}</p>
       <p><b>Prochaine étape :</b> nous vous confirmons par mail le montant exact et la date de passage de l'un de nos techniciens. Aucun paiement ne vous est demandé en ligne — la facturation se fait dans les conditions habituelles de votre compte.</p>
       <p>Un ajout de dernière minute ? Appelez-nous au <b>${TEL}</b>.</p>`,
      { url: `${baseUrl(req)}/espace`, label: 'Suivre ma commande' }
    ),
    texte: `Bonjour,\n\nNous avons bien reçu votre commande ${reference}.\n\n${lignes
      .map((l) => `  ${l.qte} × ${l.nom} (${l.marque} ${l.ref}) — ${l.cond}`)
      .join('\n')}\n\nLivraison sans frais de port : ${adresse}, ${codePostal} ${commune}\n\nNous vous confirmons le montant exact et la date de passage par mail. Aucun paiement en ligne.\n\nSODILAME — ${TEL}`,
  }).catch(() => {});

  return json(res, 200, { ok: true, reference });
}
