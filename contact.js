// ---------------------------------------------------------------------------
// Fonction serverless Vercel — réception du formulaire et envoi par e-mail
//
// Variables d'environnement à définir dans Vercel (Settings → Environment Variables) :
//   RESEND_API_KEY   clé API Resend (https://resend.com)  — obligatoire
//   MAIL_DESTINATION adresse qui reçoit les demandes      — sodilame@sodilame.fr
//   MAIL_EXPEDITEUR  expéditeur vérifié chez Resend       — SODILAME <site@sodilame.com>
//
// Le domaine vérifié chez Resend est sodilame.com (domaine racine, pas un
// sous-domaine). L'expéditeur doit donc être une adresse @sodilame.com.
// ---------------------------------------------------------------------------

const DESTINATION = process.env.MAIL_DESTINATION || 'sodilame@sodilame.fr';
const EXPEDITEUR = process.env.MAIL_EXPEDITEUR || 'SODILAME <site@sodilame.com>';
const TEL = '04 90 93 98 88';

// Limitation de débit très simple, en mémoire de l'instance (anti-flood basique).
const vus = new Map();
function tropDeRequetes(ip) {
  const maintenant = Date.now();
  const fenetre = 10 * 60 * 1000; // 10 minutes
  const max = 5;
  const liste = (vus.get(ip) || []).filter((t) => maintenant - t < fenetre);
  liste.push(maintenant);
  vus.set(ip, liste);
  if (vus.size > 5000) vus.clear();
  return liste.length > max;
}

const echapper = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const nettoyer = (s = '', max = 2000) => String(s).replace(/\r?\n/g, '\n').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ erreur: 'Méthode non autorisée.' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'inconnue';

  if (tropDeRequetes(ip)) {
    return res.status(429).json({ erreur: `Trop de demandes envoyées. Merci d'appeler le ${TEL}.` });
  }

  // req.body est un getter : il lève une exception si le JSON est malformé.
  let corps;
  try {
    corps = req.body;
    if (typeof corps === 'string') corps = JSON.parse(corps);
  } catch {
    return res.status(400).json({ erreur: 'Requête illisible. Merci de réessayer.' });
  }
  corps = corps || {};

  // Piège à robots : champ invisible qui doit rester vide.
  if (nettoyer(corps.societe_web)) {
    return res.status(200).json({ ok: true }); // on fait semblant d'accepter
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

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY absente — impossible d’envoyer le message.');
    return res
      .status(500)
      .json({ erreur: `Le formulaire est momentanément indisponible. Merci d'appeler le ${TEL}.` });
  }

  const ligne = (l, v) =>
    v ? `<tr><td style="padding:6px 14px 6px 0;color:#5A6675;white-space:nowrap">${l}</td><td style="padding:6px 0;color:#1B2430"><b>${echapper(v)}</b></td></tr>` : '';

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;background:#FAF6EF;padding:24px">
  <table role="presentation" width="100%" style="background:#183253;border-radius:10px 10px 0 0"><tr><td style="padding:18px 24px;color:#fff;font-size:15px;letter-spacing:.05em">
    <b>NOUVELLE DEMANDE — SITE SODILAME.COM</b>
  </td></tr></table>
  <div style="background:#fff;padding:24px;border:1px solid #E4DACA;border-top:0;border-radius:0 0 10px 10px">
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

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EXPEDITEUR,
        to: [DESTINATION],
        reply_to: email,
        subject: `[Site] ${sujet} — ${nom}${ville ? ` (${ville})` : ''}`,
        html,
        text: texte,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Erreur Resend :', r.status, detail);
      return res
        .status(502)
        .json({ erreur: `L'envoi a échoué. Merci d'appeler le ${TEL} ou d'écrire à ${DESTINATION}.` });
    }

    // Accusé de réception au demandeur (échec silencieux : la demande est déjà partie).
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        }),
      });
    } catch (e) {
      console.warn("Accusé de réception non envoyé :", e?.message);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Erreur envoi :', e);
    return res
      .status(500)
      .json({ erreur: `Une erreur est survenue. Merci d'appeler le ${TEL}.` });
  }
}
