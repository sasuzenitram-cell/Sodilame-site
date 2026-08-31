// ---------------------------------------------------------------------------
// Authentification : demande de lien, validation du lien, déconnexion.
//
//   POST /api/auth?action=demande   { email }        → envoie le lien
//   GET  /api/auth?action=valider&jeton=…&suite=…    → ouvre la session
//   GET  /api/auth?action=deconnexion                → ferme la session
// ---------------------------------------------------------------------------
import { initSchema, baseDisponible, q } from '../lib/db.mjs';
import {
  identifier, creerJeton, consommerJeton, creerSession, detruireSession,
  purgerJetons, normEmail, tracer,
} from '../lib/auth.mjs';
import { envoyer, gabarit, baseUrl, echapper, TEL } from '../lib/mail.mjs';
import { pageApp, html, json, esc, corpsRequete } from '../lib/vue.mjs';

// Anti-abus : 5 demandes par IP toutes les 15 minutes.
const vus = new Map();
function tropDeDemandes(ip) {
  const t = Date.now();
  const l = (vus.get(ip) || []).filter((x) => t - x < 15 * 60 * 1000);
  l.push(t);
  vus.set(ip, l);
  if (vus.size > 5000) vus.clear();
  return l.length > 5;
}

function pageMessage(titre, corps, lien = null) {
  return pageApp({
    titre,
    corps: `<div class="carte" style="max-width:560px;margin:40px auto">
      <h1>${esc(titre)}</h1>
      <p class="sous">${corps}</p>
      ${lien ? `<a class="b p" href="${lien.url}">${esc(lien.label)}</a>` : ''}
    </div>`,
  });
}

export default async function handler(req, res) {
  const u = new URL(req.url, 'http://x');
  const action = u.searchParams.get('action') || '';

  if (action === 'deconnexion') {
    detruireSession(res);
    res.statusCode = 302;
    res.setHeader('Location', '/espace/connexion?m=' + encodeURIComponent('Vous êtes déconnecté.'));
    return res.end();
  }

  if (!baseDisponible()) {
    return html(res, 503, pageMessage('Espace client indisponible', `La base de données n’est pas encore branchée. Merci d’appeler le ${TEL}.`));
  }

  try {
    await initSchema();
  } catch (e) {
    console.error('Init schéma :', e?.message);
    return html(res, 503, pageMessage('Espace client indisponible', `Un incident technique empêche l’accès. Merci d’appeler le ${TEL}.`));
  }

  // ---- Validation du lien reçu par e-mail ---------------------------------
  if (action === 'valider') {
    const jeton = u.searchParams.get('jeton') || '';
    const suite = u.searchParams.get('suite') || '';
    let email;
    try {
      email = await consommerJeton(jeton);
    } catch (e) {
      console.error('Consommation jeton :', e?.message);
      email = null;
    }
    if (!email) {
      return html(
        res,
        400,
        pageMessage(
          'Lien expiré ou déjà utilisé',
          'Les liens de connexion sont valables 30 minutes et ne servent qu’une fois. Demandez-en un nouveau, c’est immédiat.',
          { url: '/espace/connexion', label: 'Demander un nouveau lien' }
        )
      );
    }

    const id = await identifier(email);
    if (!id) {
      return html(res, 403, pageMessage('Accès non autorisé', `Ce compte n’est plus actif. Merci d’appeler le ${TEL}.`));
    }

    creerSession(res, id);
    if (id.role === 'client') {
      await q(`UPDATE clients SET connecte_le = now() WHERE id = $1`, [id.clientId]).catch(() => {});
    }
    await tracer(email, 'connexion', id.role);
    purgerJetons();

    // On ne redirige que vers une URL interne, jamais vers un site tiers.
    const cible = suite.startsWith('/') && !suite.startsWith('//') ? suite : id.role === 'admin' ? '/admin' : '/espace';
    res.statusCode = 302;
    res.setHeader('Location', cible);
    return res.end();
  }

  // ---- Demande de lien -----------------------------------------------------
  if (action === 'demande') {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return json(res, 405, { erreur: 'Méthode non autorisée.' });
    }

    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'inconnue';

    let corps;
    try {
      corps = await corpsRequete(req);
    } catch {
      return json(res, 400, { erreur: 'Requête illisible.' });
    }

    const email = normEmail(corps.email);
    const suite = typeof corps.suite === 'string' && corps.suite.startsWith('/') ? corps.suite : '';

    // Réponse volontairement identique dans tous les cas : le formulaire ne doit
    // pas permettre de deviner qui est client de SODILAME.
    const reponseNeutre = () => json(res, 200, { ok: true });

    if (!email || !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
      return json(res, 400, { erreur: 'Adresse e-mail invalide.' });
    }
    if (tropDeDemandes(ip)) {
      return json(res, 429, { erreur: `Trop de demandes. Merci d'appeler le ${TEL}.` });
    }

    const id = await identifier(email);
    if (!id) {
      await tracer(email, 'connexion_refusee', 'e-mail inconnu ou compte inactif');
      return reponseNeutre();
    }

    const jeton = await creerJeton(email);
    const lien = `${baseUrl(req)}/api/auth?action=valider&jeton=${encodeURIComponent(jeton)}${
      suite ? `&suite=${encodeURIComponent(suite)}` : ''
    }`;

    await envoyer({
      to: email,
      sujet: id.role === 'admin' ? 'Votre accès à l’administration SODILAME' : 'Votre lien de connexion SODILAME',
      html: gabarit(
        'Connexion',
        `<p>Bonjour,</p>
         <p>Voici votre lien de connexion à ${id.role === 'admin' ? 'l’administration' : 'votre espace client'} SODILAME. Il est valable <b>30 minutes</b> et ne fonctionne qu’une seule fois.</p>`,
        { url: lien, label: 'Me connecter' }
      ),
      texte: `Bonjour,\n\nVoici votre lien de connexion SODILAME (valable 30 minutes, à usage unique) :\n\n${lien}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez ce message.\n\nSODILAME — ${TEL}`,
    });

    await tracer(email, 'lien_envoye', id.role);
    return reponseNeutre();
  }

  return html(res, 404, pageMessage('Page introuvable', 'Cette adresse n’existe pas.', { url: '/', label: 'Retour au site' }));
}
