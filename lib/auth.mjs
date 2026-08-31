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
const DUREE_SESSION = 30 * 24 * 60 * 60; // 30 jours
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
  const charge = b64(JSON.stringify({ email: normEmail(email), role, clientId, etablissement, exp: Date.now() + DUREE_SESSION * 1000 }));
  const valeur = `${charge}.${signer(charge)}`;
  const attrs = [
    `${COOKIE}=${valeur}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${DUREE_SESSION}`,
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

/** Garde : renvoie la session admin, ou répond 302 vers la connexion. */
export function exigerAdmin(req, res) {
  const s = lireSession(req);
  if (!s || s.role !== 'admin') {
    res.statusCode = 302;
    res.setHeader('Location', '/espace/connexion?suite=' + encodeURIComponent(req.url || '/admin'));
    res.end();
    return null;
  }
  return s;
}

/** Garde : renvoie la session (client ou admin), ou répond 302. */
export function exigerConnexion(req, res) {
  const s = lireSession(req);
  if (!s) {
    res.statusCode = 302;
    res.setHeader('Location', '/espace/connexion?suite=' + encodeURIComponent(req.url || '/espace'));
    res.end();
    return null;
  }
  return s;
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
