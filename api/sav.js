// ---------------------------------------------------------------------------
// POST /api/sav — signalement de panne et demande d'audit
//
// Alimenté par les pages scannées depuis les étiquettes QR code posées sur les
// équipements. Volontairement SANS connexion : la personne qui constate la
// panne est souvent un cuisinier en plein service, pas le titulaire du compte.
//
// L'envoi par e-mail est le canal : il fonctionne même si la base de données
// n'est pas disponible. Le signalement est aussi tracé dans le journal quand
// la base répond, sans jamais bloquer l'envoi.
// ---------------------------------------------------------------------------
import { json, corpsRequete } from '../lib/vue.mjs';
import { envoyer, gabarit, echapper, DESTINATION, TEL } from '../lib/mail.mjs';

const vus = new Map();
function tropDeRequetes(ip) {
  const t = Date.now();
  const l = (vus.get(ip) || []).filter((x) => t - x < 10 * 60 * 1000);
  l.push(t);
  vus.set(ip, l);
  if (vus.size > 5000) vus.clear();
  return l.length > 6;
}

const nettoyer = (s = '', max = 500) => String(s ?? '').replace(/\r?\n/g, '\n').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { erreur: 'Méthode non autorisée.' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'inconnue';
  if (tropDeRequetes(ip)) {
    return json(res, 429, { erreur: `Trop de demandes envoyées. Merci d'appeler le ${TEL}.` });
  }

  let c;
  try {
    c = await corpsRequete(req);
  } catch {
    return json(res, 400, { erreur: 'Requête illisible. Merci de réessayer.' });
  }

  // Piège à robots : champ invisible qui doit rester vide.
  if (nettoyer(c.societe_web)) return json(res, 200, { ok: true });

  const type = c.type === 'audit' ? 'audit' : 'panne';
  const etablissement = nettoyer(c.etablissement, 160);
  const telephone = nettoyer(c.telephone, 40);
  const nom = nettoyer(c.nom, 120);
  const email = nettoyer(c.email, 160);
  const machine = nettoyer(c.machine, 200);
  const commune = nettoyer(c.commune, 120);
  const description = nettoyer(c.description, 3000);

  // ---- Photos et vidéos -----------------------------------------------------
  // Reçues en base64, déjà compressées côté navigateur. On revalide tout ici :
  // type, taille unitaire et taille cumulée. Rien ne part vers Resend sans être
  // passé par ce filtre.
  const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime', 'video/webm']);
  const brut = Array.isArray(c.fichiers) ? c.fichiers.slice(0, 4) : [];
  const pieces = [];
  let poidsTotal = 0;

  for (const f of brut) {
    const data = typeof f?.data === 'string' ? f.data : '';
    const m = data.match(/^data:([a-z]+\/[a-z0-9.+-]+);base64,(.+)$/i);
    if (!m) continue;
    const type = m[1].toLowerCase();
    if (!TYPES.has(type)) continue;
    const b64 = m[2];
    const poids = Math.round(b64.length * 0.75);
    if (poids > 3_000_000) continue;
    if (poidsTotal + poids > 4_000_000) break;
    poidsTotal += poids;

    const ext = type.split('/')[1].replace('quicktime', 'mov').replace('jpeg', 'jpg');
    const nomSain = nettoyer(f.nom, 80).replace(/[^\w.\-]+/g, '_').replace(/\.[^.]*$/, '') || 'piece';
    pieces.push({ filename: `${nomSain}.${ext}`, content: b64, type });
  }

  const manquants = [];
  if (!etablissement) manquants.push('le nom de votre établissement');
  if (!telephone || telephone.replace(/\D/g, '').length < 9) manquants.push('un téléphone valide');
  if (type === 'panne') {
    if (!machine) manquants.push('le produit en panne');
    if (!description) manquants.push('la description de la panne');
  } else if (!commune) {
    manquants.push('votre commune');
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) manquants.push('un e-mail valide');

  if (manquants.length) {
    return json(res, 400, { erreur: `Merci d'indiquer : ${manquants.join(', ')}.` });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY absente — signalement non transmis.');
    return json(res, 500, { erreur: `L'envoi est momentanément indisponible. Merci d'appeler le ${TEL}.` });
  }

  const reference =
    (type === 'panne' ? 'P' : 'A') +
    new Date().toISOString().slice(2, 10).replace(/-/g, '') +
    '-' + String(Date.now()).slice(-4);

  const ligne = (l, v) =>
    v
      ? `<tr><td style="padding:6px 14px 6px 0;color:#5A6675;white-space:nowrap;vertical-align:top">${l}</td><td style="padding:6px 0;color:#1B2430"><b>${echapper(v)}</b></td></tr>`
      : '';

  // Une panne de cuisine professionnelle est urgente par nature : on ne
  // demande pas au client de la qualifier, tout signalement est prioritaire.
  const titre =
    type === 'panne'
      ? `Panne signalée — ${reference}`
      : `Demande d'audit technique — ${reference}`;

  const corpsHtml = `
    <table role="presentation" style="font-size:14px;width:100%">
      ${ligne('Établissement', etablissement)}
      ${ligne('Contact', nom)}
      ${ligne('Téléphone', telephone)}
      ${ligne('E-mail', email)}
      ${ligne('Commune', commune)}
      ${ligne('Équipement', machine)}
    </table>
    ${
      description
        ? `<p style="margin:18px 0 6px;color:#5A6675;font-size:13px">${type === 'panne' ? 'Description de la panne' : 'Précisions'} :</p>
           <div style="background:#FAF6EF;border-left:4px solid #DFA64F;padding:14px 18px;font-size:14px;white-space:pre-wrap">${echapper(description)}</div>`
        : ''
    }
    ${
      pieces.length
        ? `<p style="margin:18px 0 0;padding:11px 15px;background:#E2F1EA;border-radius:9px;color:#1F7A56;font-size:14px"><b>${pieces.length} pièce${pieces.length > 1 ? 's' : ''} jointe${pieces.length > 1 ? 's' : ''}</b> — ${pieces.map((p) => echapper(p.filename)).join(', ')}</p>`
        : `<p style="margin:18px 0 0;font-size:13px;color:#8A93A0">Aucune photo transmise.</p>`
    }
    <p style="margin:22px 0 0;font-size:12px;color:#8A93A0">Envoyé depuis une étiquette QR code — IP ${echapper(ip)}</p>`;

  const texte = [
    titre,
    '',
    `Établissement : ${etablissement}`,
    nom ? `Contact       : ${nom}` : null,
    `Téléphone     : ${telephone}`,
    email ? `E-mail        : ${email}` : null,
    commune ? `Commune       : ${commune}` : null,
    machine ? `Équipement    : ${machine}` : null,
    '',
    description || '(aucune précision)',
    '',
    pieces.length ? `${pieces.length} pièce(s) jointe(s) : ${pieces.map((p) => p.filename).join(', ')}` : 'Aucune photo transmise.',
  ]
    .filter(Boolean)
    .join('\n');

  const r = await envoyer({
    to: DESTINATION,
    replyTo: email || undefined,
    sujet: type === 'panne'
      ? `[PANNE] ${etablissement}${machine ? ' — ' + machine : ''}`
      : `[Audit] ${etablissement}${commune ? ' — ' + commune : ''}`,
    html: gabarit(titre, corpsHtml),
    texte,
    pieces,
  });

  if (!r.ok) {
    return json(res, 502, { erreur: `L'envoi a échoué. Merci d'appeler le ${TEL}.` });
  }

  // Accusé de réception si le client a laissé son e-mail — échec silencieux.
  if (email) {
    envoyer({
      to: email,
      replyTo: DESTINATION,
      sujet: type === 'panne' ? `Votre signalement ${reference} — SODILAME` : `Votre demande d'audit ${reference} — SODILAME`,
      html: gabarit(
        type === 'panne' ? 'Signalement bien reçu' : 'Demande bien reçue',
        type === 'panne'
          ? `<p>Bonjour${nom ? ' ' + echapper(nom) : ''},</p>
             <p>Nous avons bien reçu votre signalement concernant <b>${echapper(machine)}</b> pour ${echapper(etablissement)}.</p>
             <p>Un technicien vous rappelle sous 24 heures ouvrées.</p>
             <p>Si la situation se dégrade, appelez-nous directement au <b>${TEL}</b> : c'est le canal le plus rapide.</p>`
          : `<p>Bonjour${nom ? ' ' + echapper(nom) : ''},</p>
             <p>Nous avons bien reçu votre demande d'audit technique pour ${echapper(etablissement)}.</p>
             <p>Nous vous rappelons pour convenir d'un créneau de passage. L'audit est gratuit et sans engagement : un technicien recense vos équipements et vous remet un rapport avec les priorités.</p>`
      ),
      texte:
        (type === 'panne'
          ? `Bonjour,\n\nNous avons bien reçu votre signalement concernant ${machine} pour ${etablissement}.\nUn technicien vous rappelle sous 24 heures ouvrées.\n\nSi la situation se dégrade, appelez le ${TEL}.`
          : `Bonjour,\n\nNous avons bien reçu votre demande d'audit technique pour ${etablissement}.\nNous vous rappelons pour convenir d'un créneau.`) +
        `\n\nSODILAME — Cuisines professionnelles\n${TEL}`,
    }).catch(() => {});
  }

  // Trace dans le journal si la base répond — jamais bloquant.
  try {
    const { baseDisponible, initSchema, tracer } = await import('../lib/db.mjs');
    if (baseDisponible()) {
      await initSchema();
      await tracer(email || telephone, type === 'panne' ? 'panne_signalee' : 'audit_demande',
        `${reference} — ${etablissement}${machine ? ' — ' + machine : ''}`);
    }
  } catch {
    /* la base n'est pas indispensable ici */
  }

  return json(res, 200, { ok: true, reference });
}
