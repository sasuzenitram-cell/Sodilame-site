// ---------------------------------------------------------------------------
// Fonction serverless Vercel — réception du formulaire et envoi par e-mail
//
//   GET  /api/contact?jeton=1   → délivre le jeton exigé à l'envoi
//   POST /api/contact           → valide, filtre, puis envoie la demande
//
// Variables d'environnement à définir dans Vercel (Settings → Environment Variables) :
//   RESEND_API_KEY   clé API Resend (https://resend.com)  — obligatoire
//   MAIL_DESTINATION adresse qui reçoit les demandes      — sodilame@sodilame.fr
//   MAIL_EXPEDITEUR  expéditeur vérifié chez Resend       — SODILAME <site@sodilame.com>
//   FORM_SECRET      (recommandé) clé de signature des jetons de formulaire.
//                    À défaut, SESSION_SECRET puis RESEND_API_KEY servent de
//                    matière première — voir lib/antispam.mjs.
//
// Le domaine vérifié chez Resend est sodilame.com (domaine racine, pas un
// sous-domaine). L'expéditeur doit donc être une adresse @sodilame.com.
//
// ANTI-SPAM : la mécanique, son pourquoi et la signature de l'attaque du
// 28/09/2026 sont documentés dans lib/antispam.mjs. Ce fichier ne fait que
// l'appliquer, dans cet ordre : origine, jeton, débit, champs, contenu.
// ---------------------------------------------------------------------------
import {
  delivrerJeton, verifierJeton, jetonsActifs, origineAcceptee, limiteur, ipDe,
  analyser, surUneLigne, TEL,
} from '../lib/antispam.mjs';
import { sujets } from '../data/formulaire.mjs';

const DESTINATION = process.env.MAIL_DESTINATION || 'sodilame@sodilame.fr';
const EXPEDITEUR = process.env.MAIL_EXPEDITEUR || 'SODILAME <site@sodilame.com>';

const tropDEnvois = limiteur(10 * 60 * 1000, 5);     // 5 envois par IP / 10 min
const tropDeJetons = limiteur(10 * 60 * 1000, 30);   // 30 jetons par IP / 10 min
const tropPourCetteAdresse = limiteur(60 * 60 * 1000, 4);

// Plafond de sécurité : quoi qu'il arrive en amont, une instance n'émet pas
// plus de 40 demandes par heure. Si un jour une nouvelle technique passe les
// quatre couches, elle ne produira plus 400 messages — elle en produira
// quelques dizaines, et la trace restera dans les journaux Vercel.
const plafondInstance = limiteur(60 * 60 * 1000, 40);

const echapper = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const nettoyer = (s = '', max = 2000) => String(s ?? '').replace(/\r?\n/g, '\n').trim().slice(0, max);

const envoyerResend = (charge) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(charge),
  });

export default async function handler(req, res) {
  // ---- Délivrance du jeton ------------------------------------------------
  // Le site est statique : la page ne peut pas porter de jeton signé au moment
  // où elle est générée. Le navigateur vient donc le chercher ici, à la
  // première frappe dans le formulaire.
  if (req.method === 'GET') {
    const ip = ipDe(req);
    if (tropDeJetons(ip)) {
      return res.status(429).json({ erreur: 'Trop de requêtes.' });
    }
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ jeton: delivrerJeton() });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ erreur: 'Méthode non autorisée.' });
  }

  const ip = ipDe(req);

  // ---- Couche 2 : origine -------------------------------------------------
  // Un robot qui poste directement sur l'API n'a ni Origin ni Referer. On lui
  // répond « ok » : le décevoir l'amènerait à chercher pourquoi.
  if (!origineAcceptee(req)) {
    console.warn('[antispam] origine refusée', {
      ip,
      origine: req.headers.origin || req.headers.referer || '(aucune)',
    });
    return res.status(200).json({ ok: true });
  }

  let corps;
  try {
    corps = req.body;
    if (typeof corps === 'string') corps = JSON.parse(corps);
  } catch {
    return res.status(400).json({ erreur: 'Requête illisible. Merci de réessayer.' });
  }
  corps = corps || {};

  // ---- Couche 1 : jeton signé --------------------------------------------
  const j = verifierJeton(corps.jeton);
  if (!j.ok) {
    // « trop vite » n'est pas un refus définitif : le navigateur patiente le
    // temps indiqué et renvoie le même formulaire, l'utilisateur ne voit rien.
    if (j.code === 'trop_vite') {
      return res.status(429).json({ erreur: j.message, code: j.code, attendreMs: j.attendreMs });
    }
    console.warn('[antispam] jeton refusé', { ip, code: j.code });
    // Absence totale de jeton = client qui n'a pas affiché le formulaire.
    if (j.code === 'jeton_absent') return res.status(200).json({ ok: true });
    return res.status(403).json({ erreur: j.message, code: j.code });
  }

  // ---- Couche 3 : débit ---------------------------------------------------
  if (tropDEnvois(ip)) {
    return res.status(429).json({ erreur: `Trop de demandes envoyées. Merci d'appeler le ${TEL}.` });
  }

  // Piège à robots : champ invisible qui doit rester vide. Il ne suffit pas
  // (celui du 28/09 l'évitait soigneusement), il ne coûte rien, on le garde.
  if (nettoyer(corps.societe_web)) {
    console.warn('[antispam] piège rempli', { ip });
    return res.status(200).json({ ok: true });
  }

  const nom = nettoyer(corps.nom, 120);
  const email = nettoyer(corps.email, 160);
  const telephone = nettoyer(corps.telephone, 40);
  const etablissement = nettoyer(corps.etablissement, 160);
  const ville = nettoyer(corps.ville, 120);
  const sujet = nettoyer(corps.sujet, 120);
  const message = nettoyer(corps.message, 4000);
  const pageOrigine = nettoyer(corps.page, 200);

  const manquants = [];
  if (!nom) manquants.push('nom');
  if (!telephone) manquants.push('téléphone');
  if (!email || !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) manquants.push('e-mail valide');
  if (!sujet) manquants.push('nature de la demande');
  if (!corps.consentement) manquants.push('acceptation de la politique de confidentialité');

  if (manquants.length) {
    return res.status(400).json({ erreur: `Merci de renseigner : ${manquants.join(', ')}.` });
  }

  if (tropPourCetteAdresse(email.toLowerCase())) {
    return res.status(429).json({ erreur: `Trop de demandes envoyées pour cette adresse. Merci d'appeler le ${TEL}.` });
  }

  // ---- Couche 4 : contenu -------------------------------------------------
  const a = analyser({ nom, email, telephone, etablissement, ville, sujet, message, sujetsAutorises: sujets });

  if (a.verdict === 'rejet') {
    console.warn('[antispam] message refusé', { ip, score: a.score, motifs: a.motifs, email });
    // Un humain qui tomberait là garde une porte de sortie explicite : c'est la
    // raison pour laquelle ce cas ne répond pas « ok ».
    return res.status(422).json({
      erreur: `Votre message a été bloqué par notre filtre anti-spam. Nous en sommes désolés : merci de nous appeler au ${TEL} ou d'écrire directement à ${DESTINATION}.`,
      code: 'filtre',
    });
  }

  const suspect = a.verdict === 'suspect';
  if (suspect) {
    console.warn('[antispam] message marqué', { ip, score: a.score, motifs: a.motifs, email });
  }

  if (plafondInstance('global')) {
    console.error('[antispam] plafond horaire atteint — envoi abandonné', { ip, email });
    return res.status(429).json({ erreur: `Le formulaire est saturé. Merci d'appeler le ${TEL}.` });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY absente — impossible d’envoyer le message.');
    return res
      .status(500)
      .json({ erreur: `Le formulaire est momentanément indisponible. Merci d'appeler le ${TEL}.` });
  }

  const ligne = (l, v) =>
    v ? `<tr><td style="padding:6px 14px 6px 0;color:#5A6675;white-space:nowrap">${l}</td><td style="padding:6px 0;color:#1B2430"><b>${echapper(v)}</b></td></tr>` : '';

  const alerte = suspect
    ? `<div style="background:#FDF0DC;border-left:4px solid #DFA64F;padding:12px 16px;margin:0 0 18px;font-size:13px;color:#7A4F12">
        <b>Ce message a été marqué par le filtre anti-spam.</b><br>
        Motif${a.motifs.length > 1 ? 's' : ''} : ${echapper(a.motifs.join(' ; '))}.<br>
        Il vous est transmis quand même : vérifiez avant de rappeler, et supprimez sans suite s'il s'agit d'un robot.
      </div>`
    : '';

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;background:#FAF6EF;padding:24px">
  <table role="presentation" width="100%" style="background:${suspect ? '#7A4F12' : '#183253'};border-radius:10px 10px 0 0"><tr><td style="padding:18px 24px;color:#fff;font-size:15px;letter-spacing:.05em">
    <b>${suspect ? 'DEMANDE À VÉRIFIER' : 'NOUVELLE DEMANDE'} — SITE SODILAME.COM</b>
  </td></tr></table>
  <div style="background:#fff;padding:24px;border:1px solid #E4DACA;border-top:0;border-radius:0 0 10px 10px">
    ${alerte}
    <table role="presentation" style="font-size:14px;width:100%">
      ${ligne('Nom', nom)}
      ${ligne('Établissement', etablissement)}
      ${ligne('Téléphone', telephone)}
      ${ligne('E-mail', email)}
      ${ligne('Ville', ville)}
      ${ligne('Nature', sujet)}
    </table>
    ${message ? `<p style="margin:20px 0 6px;color:#5A6675;font-size:13px">Message :</p><div style="background:#FAF6EF;border-left:4px solid #DFA64F;padding:14px 18px;font-size:14px;color:#1B2430;white-space:pre-wrap">${echapper(message)}</div>` : ''}
    <p style="margin:22px 0 0;font-size:12px;color:#8A93A0">Envoyé depuis ${echapper(pageOrigine || '/')} — IP ${echapper(ip)}</p>
  </div>
</div>`;

  const texte = [
    `Nouvelle demande — sodilame.com`,
    suspect ? `\n/!\\ MARQUÉ PAR LE FILTRE ANTI-SPAM : ${a.motifs.join(' ; ')}\n` : null,
    ``,
    `Nom          : ${nom}`,
    etablissement ? `Établissement: ${etablissement}` : null,
    `Téléphone    : ${telephone}`,
    `E-mail       : ${email}`,
    ville ? `Ville        : ${ville}` : null,
    `Nature       : ${sujet}`,
    ``,
    message ? `Message :\n${message}` : `(pas de message)`,
    ``,
    `Page : ${pageOrigine || '/'}`,
  ]
    .filter(Boolean)
    .join('\n');

  // L'objet part dans un en-tête : aucun retour à la ligne n'y entre, quelle
  // que soit la saisie.
  const objet = surUneLigne(
    `${suspect ? '[Site - a verifier]' : '[Site]'} ${sujet} — ${nom}${ville ? ` (${ville})` : ''}`
  );

  try {
    const r = await envoyerResend({
      from: EXPEDITEUR,
      to: [DESTINATION],
      reply_to: email,
      subject: objet,
      html,
      text: texte,
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Erreur Resend :', r.status, detail);
      return res
        .status(502)
        .json({ erreur: `L'envoi a échoué. Merci d'appeler le ${TEL} ou d'écrire à ${DESTINATION}.` });
    }

    // ---- Accusé de réception au demandeur ---------------------------------
    // Uniquement si le message est propre. Un accusé envoyé à l'adresse saisie
    // par un robot, c'est notre domaine qui écrit à un inconnu en recopiant le
    // texte du spam : 400 messages de ce type suffisent à abîmer durablement la
    // réputation d'expédition de sodilame.com, et donc à faire tomber nos
    // devis dans les indésirables de vrais clients.
    if (!suspect) {
      try {
        await envoyerResend({
          from: EXPEDITEUR,
          to: [email],
          // L'adresse d'expédition ne reçoit pas de courrier : si le client
          // répond à cet accusé de réception, sa réponse doit arriver à SODILAME.
          reply_to: DESTINATION,
          subject: 'Nous avons bien reçu votre demande — SODILAME',
          text: `Bonjour ${nom},

Nous avons bien reçu votre demande concernant : ${sujet}.
Un membre de notre équipe revient vers vous sous 24 heures ouvrées.

Pour une panne bloquante, n'hésitez pas à nous appeler directement au ${TEL} : c'est le canal le plus rapide.

Récapitulatif de votre message :
${message || '(aucun message)'}

Cordialement,

L'équipe SODILAME
Cuisines professionnelles
3 impasse des Apprentis — ZA de la Chapelette
13310 Saint-Martin-de-Crau
${TEL}`,
        });
      } catch (e) {
        console.warn("Accusé de réception non envoyé :", e?.message);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Erreur envoi :', e);
    return res
      .status(500)
      .json({ erreur: `Une erreur est survenue. Merci d'appeler le ${TEL}.` });
  }
}

// Utilisé par les tests : signale si la couche jeton est bien armée.
export const diagnostic = () => ({ jetonsActifs: jetonsActifs() });
