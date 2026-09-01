// ---------------------------------------------------------------------------
// POST /api/commande — enregistrement d'une commande de produits lessiviels
//
// Ouverte à tous : aucun compte n'est nécessaire pour commander. Le filtrage
// se fait sur la commune de livraison — hors zone d'intervention, la commande
// est refusée. Un client connecté voit simplement ses coordonnées pré-remplies
// et retrouve sa commande dans son espace.
//
// Aucun paiement n'est traité : la commande est enregistrée, notifiée par
// e-mail, puis validée et facturée dans les conditions habituelles.
//
// SÉCURITÉ : les PRIX ne viennent jamais du navigateur. Ils sont relus depuis
// la base (ou, à défaut, depuis le catalogue du code). Le navigateur ne choisit
// que des références, des conditionnements et des quantités.
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

  // ---- Connexion facultative ----------------------------------------------
  let session = null;
  try {
    session = lireSession(req);
  } catch {
    session = null;
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

  // ---- Identité : le compte s'il existe, sinon le formulaire ---------------
  let client = null;
  if (session?.role === 'client') {
    client = await q1(`SELECT * FROM clients WHERE id = $1`, [session.clientId]);
    if (client && !client.actif) {
      return json(res, 403, { erreur: `Votre compte n'est plus actif. Merci d'appeler le ${TEL}.` });
    }
  }

  const etablissement = client ? client.etablissement : nettoyer(corps.etablissement, 160);
  const contact = client ? client.contact : nettoyer(corps.nom, 120);
  const email = client ? client.email : nettoyer(corps.email, 160).toLowerCase();
  const telephone = client ? client.telephone : nettoyer(corps.telephone, 40);

  const adresse = nettoyer(corps.adresse, 200) || client?.adresse || '';
  const codePostal = nettoyer(corps.codePostal, 10) || client?.code_postal || '';
  const commune = nettoyer(corps.commune, 120) || client?.commune || '';
  const message = nettoyer(corps.message, 2000);

  const manquants = [];
  // Un client connecté est identifié par sa fiche : on ne lui redemande rien,
  // même si sa fiche est incomplète (un contact ou un téléphone peut manquer
  // après un import Dolibarr). Un visiteur, lui, doit tout renseigner.
  if (!client) {
    if (!etablissement) manquants.push('établissement');
    if (!contact) manquants.push('nom du contact');
    if (!telephone || telephone.replace(/\D/g, '').length < 9) manquants.push('téléphone valide');
    if (!email || !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) manquants.push('e-mail valide');
    if (!corps.consentement) manquants.push('acceptation de la politique de confidentialité');
  }
  if (!adresse) manquants.push('adresse de livraison');
  if (!/^\d{5}$/.test(codePostal)) manquants.push('code postal à 5 chiffres');
  if (!commune) manquants.push('commune');
  if (manquants.length) return json(res, 400, { erreur: `Merci de renseigner : ${manquants.join(', ')}.` });

  // Un visiteur qui commande avec l'e-mail d'un client connu est rattaché à sa
  // fiche : la commande apparaît dans son espace, et l'historique reste entier.
  let clientId = client?.id ?? null;
  if (!clientId) {
    const connu = await q1(`SELECT id, actif FROM clients WHERE email = $1`, [email]);
    if (connu?.actif) clientId = connu.id;
  }

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
      reference, clientId, etablissement, contact, email, telephone,
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

  await tracer(email, 'commande_recue', `${reference} — ${lignes.length} lignes`);

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
    replyTo: email,
    sujet: `[Commande ${reference}] ${etablissement} — ${commune}`,
    html: gabarit(
      `Nouvelle commande ${reference}`,
      `<table role="presentation" style="font-size:14px;width:100%;margin-bottom:14px">
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675">Établissement</td><td><b>${echapper(etablissement)}</b></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675">Contact</td><td><b>${echapper(contact)}</b></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675">Téléphone</td><td><b>${echapper(telephone)}</b></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675">E-mail</td><td><b>${echapper(email)}</b></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#5A6675;vertical-align:top">Livraison</td><td><b>${echapper(adresse)}<br>${echapper(codePostal)} ${echapper(commune)}</b></td></tr>
      </table>
      ${tableau}
      ${message ? `<p style="margin:18px 0 4px;color:#5A6675;font-size:13px">Précisions du client :</p><div style="background:#FAF6EF;border-left:4px solid #DFA64F;padding:12px 16px;white-space:pre-wrap">${echapper(message)}</div>` : ''}`,
      { url: `${baseUrl(req)}/admin/commandes?id=${cmd.id}`, label: 'Traiter la commande' }
    ),
    texte: [
      `NOUVELLE COMMANDE — ${reference}`,
      ``,
      `Établissement : ${etablissement}`,
      `Contact       : ${contact}`,
      `Téléphone     : ${telephone}`,
      `E-mail        : ${email}`,
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
    to: email,
    replyTo: DESTINATION,
    sujet: `Votre commande ${reference} — SODILAME`,
    html: gabarit(
      `Commande ${reference}`,
      `<p>Bonjour${contact ? ' ' + echapper(contact) : ''},</p>
       <p>Nous avons bien reçu votre commande pour <b>${echapper(etablissement)}</b>.</p>
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
