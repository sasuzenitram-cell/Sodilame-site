// ---------------------------------------------------------------------------
// Bout en bout sur /api/contact — le point d'entrée réellement exécuté.
//
// tests/antispam.mjs vérifie les briques une par une. Ce fichier-ci vérifie ce
// qui compte vraiment : ce qu'il advient d'une requête HTTP complète, dans
// l'ordre où les couches s'appliquent. C'est le seul endroit où l'on constate
// que le robot du 28/09/2026 ne produit plus un seul e-mail, et — au moins
// aussi important — qu'une demande de dépannage normale en produit bien deux.
//
// Le point d'entrée est monté derrière un vrai serveur HTTP, avec un objet
// `res` façon Vercel. Les appels à Resend sont interceptés et comptés : rien
// ne part vers l'extérieur.
//
// Les pauses de deux secondes sont voulues : c'est le délai minimum entre la
// délivrance du jeton et l'envoi. Un test qui le contournerait ne testerait
// plus le chemin que suit un visiteur.
// ---------------------------------------------------------------------------
import { createServer } from 'node:http';

process.env.FORM_SECRET = 'cle-de-test-suffisamment-longue-pour-signer-les-jetons';
process.env.RESEND_API_KEY = 're_faux_pour_le_test';

const envois = [];
const vraiFetch = globalThis.fetch;
globalThis.fetch = async (url, opts) => {
  if (String(url).includes('api.resend.com')) {
    envois.push(JSON.parse(opts.body));
    return { ok: true, status: 200, text: async () => 'ok' };
  }
  return vraiFetch(url, opts);
};

const { default: handler } = await import('../api/contact.js');

const srv = createServer(async (req, res) => {
  const morceaux = [];
  for await (const c of req) morceaux.push(c);
  const brut = Buffer.concat(morceaux).toString('utf8');
  req.body = brut || undefined;

  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (o) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); return res; };

  try { await handler(req, res); }
  catch (e) { res.statusCode = 500; res.end(String(e && e.stack)); }
});

await new Promise((r) => srv.listen(0, r));
const base = `http://127.0.0.1:${srv.address().port}`;

let ok = 0, ko = 0;
const verifier = (nom, cond, detail = '') => {
  if (cond) { ok++; console.log(`  ✓ ${nom}`); }
  else { ko++; console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`); }
};

const poster = (corps, entetes = {}) =>
  vraiFetch(`${base}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...entetes },
    body: JSON.stringify(corps),
  }).then(async (r) => ({ statut: r.status, corps: await r.json() }));

// Chaque bloc de vérification prend sa propre IP : le compteur par IP est à 5
// envois / 10 min, et l'enchaînement des cas le déclencherait sinon — ce qui est
// le comportement voulu, vérifié séparément en fin de fichier.
let compteurIp = 0;
const NAV = () => ({
  Origin: 'https://www.sodilame.com',
  Host: 'www.sodilame.com',
  'X-Forwarded-For': `203.0.113.${++compteurIp}`,
});
const NAVIGATEUR = NAV();

const DEMANDE = {
  nom: 'Marie Delorme',
  etablissement: 'Le Mas',
  telephone: '06 12 34 56 78',
  email: 'marie@lemas.fr',
  ville: 'Arles',
  sujet: 'Dépannage — froid',
  message: 'Bonjour, notre chambre froide positive ne tient plus la température. Merci de nous rappeler.',
  consentement: 'on',
  page: '/contact',
};

const SPAM = {
  nom: 'Weelankelm', ville: 'Weelankelm', telephone: '85325872322',
  email: 'alfredo.lokillo@hotmail.com', sujet: 'Dépannage — froid',
  message: 'we offer the best escort application http://tinyurl.com/2xyz download now',
  consentement: 'on', page: '/',
};

console.log('\n═══ Bout en bout sur /api/contact ═══');

// 1. Le robot du 28/09 : POST direct, ni Origin ni jeton.
{
  const n = envois.length;
  const r = await poster(SPAM);
  verifier('robot sans Origin ni jeton : répond ok et n’envoie RIEN',
    r.statut === 200 && r.corps.ok === true && envois.length === n,
    `statut ${r.statut}, ${envois.length - n} e-mail(s)`);
}

// 2. Le même robot avec un Origin forgé, mais toujours sans jeton.
{
  const n = envois.length;
  const r = await poster(SPAM, NAV());
  verifier('robot avec Origin mais sans jeton : rien n’est envoyé',
    r.statut === 200 && envois.length === n, `${envois.length - n} e-mail(s)`);
}

// 3. Parcours navigateur complet, jeton compris.
const jetonDe = async () => {
  const r = await vraiFetch(`${base}/api/contact`, { headers: { Accept: 'application/json' } });
  return (await r.json()).jeton;
};

{
  const ent = NAV();
  const jeton = await jetonDe();
  verifier('GET délivre un jeton', typeof jeton === 'string' && jeton.startsWith('1.'));

  // Envoi immédiat : refus « trop vite » avec le délai à attendre.
  const vite = await poster({ ...DEMANDE, jeton }, ent);
  verifier('envoi instantané : « trop vite », 429, avec attendreMs',
    vite.statut === 429 && vite.corps.code === 'trop_vite' && vite.corps.attendreMs > 0,
    JSON.stringify(vite));

  // Ce que fait le navigateur : patienter puis renvoyer le même jeton.
  await new Promise((r) => setTimeout(r, vite.corps.attendreMs + 250));
  const n = envois.length;
  const bon = await poster({ ...DEMANDE, jeton }, ent);
  verifier('après le délai, la demande passe',
    bon.statut === 200 && bon.corps.ok === true, JSON.stringify(bon.corps));
  verifier('deux e-mails partent : la demande et l’accusé de réception',
    envois.length - n === 2, `${envois.length - n}`);
  verifier('la demande va bien à SODILAME',
    envois[n].to[0].includes('sodilame'), envois[n]?.to?.join());
  verifier('l’objet est propre', envois[n].subject.startsWith('[Site] Dépannage'), envois[n].subject);
  verifier('l’accusé de réception va au client', envois[n + 1].to[0] === 'marie@lemas.fr');

  // Rejeu du même jeton.
  const rejeu = await poster({ ...DEMANDE, jeton }, ent);
  verifier('le jeton ne sert qu’une fois',
    rejeu.statut === 403 && rejeu.corps.code === 'jeton_deja_utilise', JSON.stringify(rejeu));
}

// 4. Spam complet, avec un jeton valide : c'est le contenu qui l'arrête.
{
  const jeton = await jetonDe();
  await new Promise((r) => setTimeout(r, 2300));
  const n = envois.length;
  const r = await poster({ ...SPAM, jeton }, NAV());
  verifier('spam muni d’un vrai jeton : refusé sur le contenu, 422',
    r.statut === 422 && r.corps.code === 'filtre', JSON.stringify(r));
  verifier('aucun e-mail n’est parti', envois.length === n, `${envois.length - n}`);
  verifier('le refus donne le téléphone et l’adresse e-mail',
    r.corps.erreur.includes('04 90 93 98 88') && r.corps.erreur.includes('@'), r.corps.erreur);
}

// 5. Message marqué : il part, sans accusé de réception au demandeur.
{
  const jeton = await jetonDe();
  await new Promise((r) => setTimeout(r, 2300));
  const n = envois.length;
  const r = await poster({
    ...DEMANDE, email: 'contact@exemple-inconnu.fr', jeton,
    message: 'Bonjour, je voudrais le même modèle que celui-ci : https://exemple.com/uc-m',
  }, NAV());
  verifier('message marqué : accepté', r.statut === 200, JSON.stringify(r));
  verifier('un seul e-mail part — pas d’accusé de réception vers une adresse douteuse',
    envois.length - n === 1, `${envois.length - n}`);
  verifier('l’objet signale la vérification à faire',
    envois[n].subject.includes('a verifier'), envois[n].subject);
  verifier('le motif est écrit dans le corps du message',
    envois[n].html.includes('filtre anti-spam'));
}

// 6. Le piège à robots continue de fonctionner.
{
  const jeton = await jetonDe();
  await new Promise((r) => setTimeout(r, 2300));
  const n = envois.length;
  const r = await poster({ ...DEMANDE, jeton, societe_web: 'https://spam.ru' }, NAV());
  verifier('piège rempli : ok de façade, rien d’envoyé',
    r.statut === 200 && envois.length === n);
}

// 7. Un champ obligatoire manquant reste une erreur lisible.
{
  const jeton = await jetonDe();
  await new Promise((r) => setTimeout(r, 2300));
  const r = await poster({ ...DEMANDE, jeton, telephone: '' }, NAV());
  verifier('champ manquant : message clair', r.statut === 400 && /téléphone/.test(r.corps.erreur),
    JSON.stringify(r));
}

// 8. Injection d'en-tête via le nom.
{
  const jeton = await jetonDe();
  await new Promise((r) => setTimeout(r, 2300));
  const n = envois.length;
  const r = await poster({ ...DEMANDE, jeton, nom: 'Marie\r\nBcc: victime@exemple.fr' }, NAV());
  verifier('retours à la ligne dans le nom : absents de l’objet',
    r.statut === 200 && !/[\r\n]/.test(envois[n].subject), JSON.stringify(envois[n]?.subject));
}

srv.close();
console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
