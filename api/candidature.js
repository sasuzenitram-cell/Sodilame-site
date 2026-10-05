// ---------------------------------------------------------------------------
// POST /api/candidature — réception d'une candidature avec CV
//
//   GET  /api/candidature   → délivre un jeton (même mécanique que /api/contact)
//   POST /api/candidature   → valide, filtre, puis transmet la candidature
//
// Variables d'environnement :
//   RESEND_API_KEY     obligatoire
//   MAIL_RECRUTEMENT   adresse qui reçoit les candidatures — direction@sodilame.fr
//   MAIL_EXPEDITEUR    expéditeur vérifié chez Resend
//
// POURQUOI UNE ADRESSE DISTINCTE DES AUTRES FORMULAIRES
// Les demandes commerciales arrivent chez sodilame@sodilame.fr, que plusieurs
// personnes consultent. Une candidature contient un CV : nom, adresse, parcours,
// parfois une date de naissance. Elle ne doit pas tomber dans une boîte
// partagée. Elle part donc à la direction, et à elle seule.
//
// ANTI-SPAM : les quatre couches de lib/antispam.mjs s'appliquent, jeton
// compris — le formulaire de candidature est servi avec son propre script, nous
// maîtrisons donc l'aller-retour. Voir lib/antispam.mjs pour le détail et pour
// l'historique de la vague de 400 messages du 28/09/2026.
// ---------------------------------------------------------------------------
import { json, corpsRequete } from '../lib/vue.mjs';
import { envoyer, gabarit, echapper, TEL } from '../lib/mail.mjs';
import {
  delivrerJeton, verifierJeton, origineAcceptee, limiteur, ipDe, analyser, surUneLigne,
} from '../lib/antispam.mjs';
import { postes, SPONTANEE, emailRecrutement } from '../data/recrutement.mjs';

const DESTINATION = process.env.MAIL_RECRUTEMENT || emailRecrutement;

const tropDeCandidatures = limiteur(60 * 60 * 1000, 4);   // 4 par IP / heure
const tropDeJetons = limiteur(10 * 60 * 1000, 30);
const tropPourCetteAdresse = limiteur(24 * 60 * 60 * 1000, 3);
const plafondInstance = limiteur(60 * 60 * 1000, 25);

const nettoyer = (s = '', max = 500) => String(s ?? '').replace(/\r?\n/g, '\n').trim().slice(0, max);

// Un CV arrive en PDF neuf fois sur dix. Les autres formats acceptés couvrent
// la photo prise avec le téléphone — c'est fréquent, et refuser ce cas revient
// à écarter des candidats qui n'ont pas d'ordinateur sous la main.
const TYPES_CV = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const EXTENSIONS = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};

const POIDS_MAX = 4_000_000;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (tropDeJetons(ipDe(req))) return json(res, 429, { erreur: 'Trop de requêtes.' });
    res.setHeader('Cache-Control', 'no-store');
    return json(res, 200, { jeton: delivrerJeton() });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return json(res, 405, { erreur: 'Méthode non autorisée.' });
  }

  const ip = ipDe(req);

  if (!origineAcceptee(req)) {
    console.warn('[antispam] candidature — origine refusée', {
      ip, origine: req.headers.origin || req.headers.referer || '(aucune)',
    });
    return json(res, 200, { ok: true });
  }

  let c;
  try {
    c = await corpsRequete(req);
  } catch {
    return json(res, 400, { erreur: 'Requête illisible. Merci de réessayer.' });
  }

  const j = verifierJeton(c.jeton);
  if (!j.ok) {
    if (j.code === 'trop_vite') {
      return json(res, 429, { erreur: j.message, code: j.code, attendreMs: j.attendreMs });
    }
    console.warn('[antispam] candidature — jeton refusé', { ip, code: j.code });
    if (j.code === 'jeton_absent') return json(res, 200, { ok: true });
    return json(res, 403, { erreur: j.message, code: j.code });
  }

  if (tropDeCandidatures(ip)) {
    return json(res, 429, { erreur: `Trop d'envois depuis cette connexion. Merci d'appeler le ${TEL}.` });
  }

  if (nettoyer(c.societe_web)) {
    console.warn('[antispam] candidature — piège rempli', { ip });
    return json(res, 200, { ok: true });
  }

  const nom = nettoyer(c.nom, 120);
  const telephone = nettoyer(c.telephone, 40);
  const email = nettoyer(c.email, 160);
  const ville = nettoyer(c.ville, 120);
  const message = nettoyer(c.message, 4000);
  const posteBrut = nettoyer(c.poste, 160);
  // Vocabulaire fermé : le poste ne peut être que l'un de ceux publiés.
  const poste = postes.includes(posteBrut) ? posteBrut : SPONTANEE;
  const permis = c.permis ? 'Oui' : 'Non précisé';

  const manquants = [];
  if (!nom) manquants.push('votre nom');
  if (!telephone || telephone.replace(/\D/g, '').length < 9) manquants.push('un téléphone valide');
  if (!email || !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) manquants.push('un e-mail valide');
  if (!c.consentement) manquants.push("votre accord pour l'étude de votre candidature");
  if (manquants.length) {
    return json(res, 400, { erreur: `Merci d'indiquer : ${manquants.join(', ')}.` });
  }

  if (tropPourCetteAdresse(email.toLowerCase())) {
    return json(res, 429, { erreur: `Nous avons déjà reçu votre candidature. Merci d'appeler le ${TEL} pour la suivre.` });
  }

  // Analyse du contenu. Seuls les signaux durs écartent : une candidature mal
  // écrite reste une candidature, et c'est souvent celle d'un bon technicien.
  const a = analyser({ nom, email, telephone, ville, message, etablissement: '' });
  if (a.verdict === 'rejet') {
    console.warn('[antispam] candidature refusée', { ip, score: a.score, motifs: a.motifs, email });
    return json(res, 422, {
      erreur: `Votre envoi a été bloqué par notre filtre anti-spam. Nous en sommes désolés : écrivez directement à ${DESTINATION} ou appelez le ${TEL}.`,
    });
  }

  // ---- CV -------------------------------------------------------------------
  // Un seul fichier. Le navigateur l'envoie en base64 ; tout est revalidé ici,
  // le type comme le poids.
  const brut = Array.isArray(c.fichiers) ? c.fichiers.slice(0, 1) : [];
  const pieces = [];
  for (const f of brut) {
    const data = typeof f?.data === 'string' ? f.data : '';
    const m = data.match(/^data:([a-z]+\/[a-z0-9.+-]+);base64,(.+)$/i);
    if (!m) continue;
    const type = m[1].toLowerCase();
    if (!TYPES_CV.has(type)) continue;
    const b64 = m[2];
    if (Math.round(b64.length * 0.75) > POIDS_MAX) continue;
    const base = nettoyer(f.nom, 80).replace(/\.[^.]*$/, '').replace(/[^\w.\-]+/g, '_') || 'cv';
    pieces.push({ filename: `${base}.${EXTENSIONS[type] || 'bin'}`, content: b64 });
  }

  if (plafondInstance('global')) {
    console.error('[antispam] candidature — plafond horaire atteint', { ip, email });
    return json(res, 429, { erreur: `Le formulaire est saturé. Merci d'écrire à ${DESTINATION}.` });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY absente — candidature non transmise.');
    return json(res, 500, { erreur: `L'envoi est momentanément indisponible. Merci d'écrire à ${DESTINATION}.` });
  }

  const reference = 'C' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + String(Date.now()).slice(-4);

  const ligne = (l, v) =>
    v ? `<tr><td style="padding:6px 14px 6px 0;color:#5A6675;white-space:nowrap;vertical-align:top">${l}</td><td style="padding:6px 0;color:#1B2430"><b>${echapper(v)}</b></td></tr>` : '';

  const corpsHtml = `
    <table role="presentation" style="font-size:14px;width:100%">
      ${ligne('Candidat', nom)}
      ${ligne('Poste', poste)}
      ${ligne('Téléphone', telephone)}
      ${ligne('E-mail', email)}
      ${ligne('Ville', ville)}
      ${ligne('Permis B', permis)}
    </table>
    ${
      message
        ? `<p style="margin:18px 0 6px;color:#5A6675;font-size:13px">Message du candidat :</p>
           <div style="background:#FAF6EF;border-left:4px solid #DFA64F;padding:14px 18px;font-size:14px;white-space:pre-wrap">${echapper(message)}</div>`
        : '<p style="margin:18px 0 0;font-size:13px;color:#8A93A0">Aucun message.</p>'
    }
    ${
      pieces.length
        ? `<p style="margin:18px 0 0;padding:11px 15px;background:#E2F1EA;border-radius:9px;color:#1F7A56;font-size:14px"><b>CV joint</b> — ${echapper(pieces[0].filename)}</p>`
        : `<p style="margin:18px 0 0;padding:11px 15px;background:#FDF0DC;border-radius:9px;color:#7A4F12;font-size:14px"><b>Aucun CV joint.</b> Le candidat a postulé sans fichier — rappelez-le, c'est souvent qu'il n'en avait pas sous la main.</p>`
    }
    <p style="margin:22px 0 0;font-size:12px;color:#8A93A0">Reçue depuis le site — référence ${reference}</p>`;

  const r = await envoyer({
    to: DESTINATION,
    replyTo: email,
    sujet: surUneLigne(`[Candidature] ${poste} — ${nom}${ville ? ` (${ville})` : ''}`),
    html: gabarit(`Candidature — ${poste}`, corpsHtml),
    texte: [
      `Candidature reçue depuis sodilame.com — ${reference}`,
      '',
      `Candidat   : ${nom}`,
      `Poste      : ${poste}`,
      `Téléphone  : ${telephone}`,
      `E-mail     : ${email}`,
      ville ? `Ville      : ${ville}` : null,
      `Permis B   : ${permis}`,
      '',
      message || '(aucun message)',
      '',
      pieces.length ? `CV joint : ${pieces[0].filename}` : 'Aucun CV joint.',
    ].filter(Boolean).join('\n'),
    pieces,
  });

  if (!r.ok) {
    return json(res, 502, { erreur: `L'envoi a échoué. Merci d'écrire à ${DESTINATION} ou d'appeler le ${TEL}.` });
  }

  // Accusé de réception au candidat. Il n'engage sur aucun délai : une promesse
  // de réponse sous 48 h tenue une fois sur trois fait plus de mal que pas de
  // promesse du tout.
  envoyer({
    to: email,
    replyTo: DESTINATION,
    sujet: 'Votre candidature chez SODILAME',
    html: gabarit(
      'Candidature bien reçue',
      `<p>Bonjour ${echapper(nom)},</p>
       <p>Nous avons bien reçu votre candidature au poste de <b>${echapper(poste)}</b>.</p>
       <p>Elle est lue par la direction, et nous revenons vers vous — y compris si la réponse est non. Si vous souhaitez en parler de vive voix d'ici là, appelez-nous au <b>${TEL}</b>.</p>
       <p style="font-size:13px;color:#5A6675">Vos informations et votre CV sont conservés deux ans au plus, et uniquement pour le recrutement. Vous pouvez demander leur suppression à tout moment en répondant à ce message.</p>`
    ),
    texte: `Bonjour ${nom},

Nous avons bien reçu votre candidature au poste de ${poste}.

Elle est lue par la direction, et nous revenons vers vous — y compris si la réponse est non.
Si vous souhaitez en parler de vive voix d'ici là, appelez-nous au ${TEL}.

Vos informations et votre CV sont conservés deux ans au plus, et uniquement pour le recrutement.
Vous pouvez demander leur suppression à tout moment en répondant à ce message.

SODILAME — Cuisines professionnelles
3 impasse des Apprentis — ZA de la Chapelette
13310 Saint-Martin-de-Crau
${TEL}`,
  }).catch(() => {});

  return json(res, 200, { ok: true, reference });
}
