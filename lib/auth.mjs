// ---------------------------------------------------------------------------
// Authentification sans mot de passe (« lien magique »)
//
// Pourquoi pas de mot de passe : aucun mot de passe à stocker, à hacher, à
// réinitialiser ni à se faire voler. Le client saisit son e-mail, reçoit un
// lien valable 30 minutes, clique, et il est connecté pour 30 jours.
//
// Seuls les e-mails déjà enregistrés (clients invités) ou déclarés admin
// reçoivent un lien. Un inconnu ne reçoit rien — et on ne le lui dit pas,
// pour ne pas transformer le formulaire en détecteur de clients.
//
// Variables d'environnement :
//   SESSION_SECRET  chaîne aléatoire longue — obligatoire
//   ADMINS          e-mails admin séparés par des virgules
// ---------------------------------------------------------------------------
import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { q, q1, tracer } from './db.mjs';

const COOKIE = 'sodilame_session';
// Un client consulte ses commandes de loin en loin : 30 jours lui évitent de
// redemander un lien à chaque fois. Un administrateur gère les commandes, les
// comptes clients et les prix : sa session est volontairement plus courte.
const DUREE_CLIENT = 30 * 24 * 60 * 60; // 30 jours
const DUREE_ADMIN = 12 * 60 * 60; // 12 heures
const DUREE_JETON = 30 * 60 * 1000; // 30 minutes

const secret = () => {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 24) throw new Error('SESSION_SECRET absente ou trop courte (24 caractères minimum).');
  return s;
};

export const normEmail = (e = '') => String(e).trim().toLowerCase();

export function estAdmin(email) {
  const liste = (process.env.ADMINS || '')
    .split(',')
    .map(normEmail)
    .filter(Boolean);
  return liste.includes(normEmail(email));
}

// ---- Signature ------------------------------------------------------------
const b64 = (buf) => Buffer.from(buf).toString('base64url');
const signer = (donnees) => createHmac('sha256', secret()).update(donnees).digest('base64url');

function comparer(a, b) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

// ---- Session (cookie signé) ----------------------------------------------
export function creerSession(res, { email, role, clientId = null, etablissement = '' }) {
  const duree = role === 'admin' ? DUREE_ADMIN : DUREE_CLIENT;
  const charge = b64(JSON.stringify({ email: normEmail(email), role, clientId, etablissement, exp: Date.now() + duree * 1000 }));
  const valeur = `${charge}.${signer(charge)}`;
  const attrs = [
    `${COOKIE}=${valeur}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${duree}`,
    process.env.NODE_ENV === 'development' ? '' : 'Secure',
  ].filter(Boolean);
  res.setHeader('Set-Cookie', attrs.join('; '));
}

export function detruireSession(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

export function lireSession(req) {
  const brut = req.headers?.cookie || '';
  const m = brut.split(';').map((c) => c.trim()).find((c) => c.startsWith(COOKIE + '='));
  if (!m) return null;
  const valeur = m.slice(COOKIE.length + 1);
  const i = valeur.lastIndexOf('.');
  if (i < 1) return null;
  const charge = valeur.slice(0, i);
  const sig = valeur.slice(i + 1);
  try {
    if (!comparer(signer(charge), sig)) return null;
    const s = JSON.parse(Buffer.from(charge, 'base64url').toString('utf8'));
    if (!s.exp || s.exp < Date.now()) return null;
    return s;
  } catch {
    return null;
  }
}

// ---- Défense CSRF ---------------------------------------------------------
//
// Première ligne : `SameSite=Lax` sur le cookie. Le navigateur n'envoie pas le
// cookie de session sur un POST venu d'un autre site — la requête arrive donc
// sans session et se fait refuser plus haut.
//
// Deuxième ligne, ici : on compare l'origine annoncée à notre propre hôte.
//
// Un choix mérite d'être explicité. Quand la requête ne porte NI `Origin` NI
// `Referer`, on laisse passer. C'est délibéré :
//   — un navigateur envoie toujours `Origin` sur un POST inter-sites, donc une
//     vraie attaque est bien détectée par la comparaison ci-dessous ;
//   — l'absence totale des deux en-têtes ne se produit qu'avec un client hors
//     navigateur, qui n'a de toute façon pas le cookie ;
//   — et refuser dans ce cas exposerait Mathieu à se retrouver enfermé hors de
//     sa propre administration à cause d'un proxy d'entreprise qui filtre les
//     en-têtes, sans aucun moyen de comprendre pourquoi.
// On bloque donc ce qui est réellement suspect — une origine qui ne correspond
// pas — sans bloquer ce qui est seulement muet.
export function origineValide(req) {
  const hote = req.headers['x-forwarded-host'] || req.headers.host || '';
  const brut = req.headers.origin || req.headers.referer || '';
  if (!brut) return true; // muet : voir le commentaire ci-dessus
  if (!hote) return false;
  try {
    return new URL(brut).host === hote;
  } catch {
    return false; // en-tête illisible : on refuse
  }
}

/**
 * Garde : renvoie la session admin, ou coupe.
 *
 * Le rôle inscrit dans le cookie ne suffit PAS : il a été gravé au moment de
 * la connexion et vaudrait « admin » pendant toute la durée de la session,
 * même après retrait de l'adresse de la liste ADMINS. On revérifie donc la
 * liste à chaque requête — elle est en mémoire, la vérification est gratuite.
 * C'est ce qui rend un accès réellement révocable.
 */
export function exigerAdmin(req, res, { csrf = true } = {}) {
  const s = lireSession(req);
  if (!s || s.role !== 'admin' || !estAdmin(s.email)) {
    if (s && s.role === 'admin') {
      // Le cookie dit admin mais la liste ne le confirme plus : accès retiré.
      console.warn('Accès admin révoqué pour', s.email);
      detruireSession(res);
    }
    res.statusCode = 302;
    res.setHeader('Location', '/espace/connexion?suite=' + encodeURIComponent(req.url || '/admin'));
    res.end();
    return null;
  }
  if (csrf && req.method !== 'GET' && req.method !== 'HEAD' && !origineValide(req)) {
    console.warn('Requête admin refusée : origine invalide', req.headers.origin || req.headers.referer || '(aucune)');
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Requête refusée : origine non reconnue.');
    return null;
  }
  return s;
}

/** Garde : renvoie la session (client ou admin), ou répond 302. */
export function exigerConnexion(req, res, { csrf = true } = {}) {
  const s = lireSession(req);
  if (!s) {
    res.statusCode = 302;
    res.setHeader('Location', '/espace/connexion?suite=' + encodeURIComponent(req.url || '/espace'));
    res.end();
    return null;
  }
  // Même raisonnement que pour l'admin : un compte client désactivé garderait
  // sinon son accès jusqu'à l'expiration du cookie.
  if (s.role === 'admin' && !estAdmin(s.email)) {
    detruireSession(res);
    res.statusCode = 302;
    res.setHeader('Location', '/espace/connexion');
    res.end();
    return null;
  }
  if (csrf && req.method !== 'GET' && req.method !== 'HEAD' && !origineValide(req)) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Requête refusée : origine non reconnue.');
    return null;
  }
  return s;
}

/**
 * Vérifie qu'un compte client est toujours actif en base. Appelée sur les
 * pages de l'espace client : le cookie ne peut pas savoir qu'un compte a été
 * désactivé depuis. Ne lève jamais — si la base ne répond pas, on laisse
 * passer plutôt que de bloquer un client pour un incident technique.
 */
export async function clientToujoursActif(session) {
  if (!session || session.role !== 'client' || !session.clientId) return true;
  try {
    const c = await q1(`SELECT actif FROM clients WHERE id = $1`, [session.clientId]);
    return !!(c && c.actif);
  } catch {
    return true;
  }
}

// ---- Jetons de connexion (liens magiques) ---------------------------------
const hacher = (jeton) => createHmac('sha256', secret()).update(jeton).digest('hex');

export async function creerJeton(email) {
  const jeton = randomBytes(32).toString('base64url');
  await q(`INSERT INTO jetons (jeton_hash, email, expire_le) VALUES ($1,$2,$3)`, [
    hacher(jeton),
    normEmail(email),
    new Date(Date.now() + DUREE_JETON).toISOString(),
  ]);
  return jeton;
}

/** Consomme un jeton. Renvoie l'e-mail, ou null si invalide, expiré ou déjà utilisé. */
export async function consommerJeton(jeton) {
  if (!jeton || typeof jeton !== 'string' || jeton.length > 200) return null;
  const h = hacher(jeton);
  const l = await q1(
    `UPDATE jetons SET utilise_le = now()
       WHERE jeton_hash = $1 AND utilise_le IS NULL AND expire_le > now()
       RETURNING email`,
    [h]
  );
  return l ? l.email : null;
}

/** Purge les jetons périmés (appelée opportunément, sans bloquer). */
export async function purgerJetons() {
  try {
    await q(`DELETE FROM jetons WHERE expire_le < now() - interval '7 days'`);
  } catch {}
}

// ---- Résolution d'identité -------------------------------------------------
/**
 * Détermine ce qu'on peut faire d'un e-mail : admin, client actif, ou rien.
 * Un admin qui est aussi client reste admin.
 */
export async function identifier(email) {
  const e = normEmail(email);
  if (estAdmin(e)) return { role: 'admin', email: e, clientId: null, etablissement: 'SODILAME' };
  const c = await q1(`SELECT id, etablissement, actif FROM clients WHERE email = $1`, [e]);
  if (c && c.actif) return { role: 'client', email: e, clientId: c.id, etablissement: c.etablissement };
  return null;
}

export { tracer };
