// ---------------------------------------------------------------------------
// Protection des formulaires publics contre le spam automatisé.
//
// POURQUOI CE FICHIER EXISTE
// Le 28/09/2026, la boîte sodilame@sodilame.fr a reçu environ 400 messages
// envoyés par un robot via le formulaire de contact. Signature relevée sur les
// messages conservés :
//
//   Nom    : Weelankelm          ← identique au champ Ville
//   Ville  : Weelankelm
//   Tél.   : 85325872322         ← 11 chiffres, aucun format français possible
//   E-mail : alfredo.lokillo@hotmail.com, pelonmeto120@gmail.com
//   Message: anglais + lien tinyurl + « escort application »
//   IP     : 51.159.158.233, 193.29.139.198 — différentes à chaque envoi
//   Nature : une des six valeurs réelles du menu déroulant
//
// Ce que cela nous apprend, et qui commande toute la suite :
//
//  1. Le robot connaît les noms des champs et les valeurs du menu : il a lu la
//     page une fois. Mais il n'a PAS rempli le piège `societe_web`, alors qu'il
//     remplit tout le reste — les logiciels de spam de cette famille détectent
//     et évitent les champs masqués. Un piège seul ne protège donc rien.
//  2. Les adresses IP tournent : une limite par IP ne freine rien.
//  3. Il n'exécute pas le JavaScript de la page — il envoie le JSON
//     directement à /api/contact. C'est la faille utilisée, et c'est là que se
//     joue la défense : exiger une preuve que la requête vient bien d'un
//     navigateur qui a affiché le formulaire.
//
// LES QUATRE COUCHES, de la plus décisive à la plus fine
//
//   1. Jeton signé (HMAC) délivré par GET sur le point d'entrée, exigé au POST.
//      Un envoi direct sans passer par la page n'a pas de jeton : il est
//      refusé avant toute analyse. C'est la couche qui arrête les 400 mails.
//   2. En-tête Origin (ou Referer) obligatoire et correspondant à notre hôte.
//      Un navigateur l'envoie toujours sur un POST ; un script curl, non.
//   3. Délai minimum entre la délivrance du jeton et l'envoi. Un humain remplit
//      six champs en plus de deux secondes ; un robot poste instantanément.
//   4. Analyse du contenu, notée. Signaux durs → refus ; signaux faibles →
//      le message part quand même, marqué dans l'objet.
//
// PRINCIPE QUI PRIME SUR TOUT LE RESTE
// Une vraie demande de dépannage ne doit JAMAIS disparaître en silence. Un
// message refusé renvoie donc une erreur lisible avec le numéro de téléphone —
// sauf le cas du robot pur (aucun jeton, aucune origine), où l'on répond « ok »
// sans rien envoyer : dire non à un robot, c'est l'inviter à recommencer
// autrement.
// ---------------------------------------------------------------------------
import { createHmac, randomBytes } from 'node:crypto';
import { zones } from '../data/zones.mjs';

export const TEL = '04 90 93 98 88';

// ---------------------------------------------------------------------------
// Clé de signature des jetons
//
// Elle doit être STABLE d'une instance à l'autre : sur Vercel, le GET qui
// délivre le jeton et le POST qui le présente ne tombent pas sur la même
// fonction. Une clé tirée au hasard au démarrage invaliderait un jeton sur
// deux. On prend donc, dans l'ordre, une variable dédiée, puis le secret de
// session, puis la clé Resend — toutes trois stables et côté serveur.
//
// Le jeton ne révèle jamais la clé : il ne contient qu'un horodatage, un
// numéro aléatoire et leur signature.
//
// Si aucune des trois n'est définie, la couche jeton se désactive au lieu de
// bloquer le formulaire : un site qui n'envoie plus rien serait pire que le
// spam. Les trois autres couches continuent de s'appliquer.
// ---------------------------------------------------------------------------
function matiereCle() {
  return (
    process.env.FORM_SECRET ||
    process.env.SESSION_SECRET ||
    process.env.RESEND_API_KEY ||
    ''
  );
}

export const jetonsActifs = () => matiereCle().length >= 16;

const signer = (charge) =>
  createHmac('sha256', matiereCle()).update(charge).digest('base64url').slice(0, 27);

/** Délivre un jeton à usage unique, lié à l'instant présent. */
export function delivrerJeton() {
  const ts = Date.now().toString(36);
  const alea = randomBytes(9).toString('base64url');
  return `1.${ts}.${alea}.${signer(`1.${ts}.${alea}`)}`;
}

// Jetons déjà consommés, en mémoire de l'instance. Volontairement « au mieux » :
// il n'y a pas de base partagée entre les fonctions, et en ajouter une pour
// cela coûterait plus qu'elle ne protège. Cette liste gêne le rejeu rapide
// depuis une même instance ; ce qui limite réellement le rejeu, c'est la durée
// de vie courte du jeton et la limite par IP.
const consommes = new Set();

const DELAI_MIN_MS = 2000;
const DELAI_MAX_MS = 3 * 60 * 60 * 1000; // 3 h : un devis se remplit lentement

/**
 * Vérifie un jeton.
 * @returns {{ok:true}|{ok:false, code:string, message:string}}
 */
export function verifierJeton(jeton, { maintenant = Date.now() } = {}) {
  if (!jetonsActifs()) return { ok: true };

  const brut = String(jeton || '');
  if (!brut) {
    return { ok: false, code: 'jeton_absent', message: 'Formulaire expiré. Merci de recharger la page.' };
  }

  const p = brut.split('.');
  if (p.length !== 4 || p[0] !== '1') {
    return { ok: false, code: 'jeton_invalide', message: 'Formulaire expiré. Merci de recharger la page.' };
  }

  const attendue = signer(`${p[0]}.${p[1]}.${p[2]}`);
  if (p[3] !== attendue) {
    return { ok: false, code: 'jeton_invalide', message: 'Formulaire expiré. Merci de recharger la page.' };
  }

  const emis = parseInt(p[1], 36);
  if (!Number.isFinite(emis)) {
    return { ok: false, code: 'jeton_invalide', message: 'Formulaire expiré. Merci de recharger la page.' };
  }

  const age = maintenant - emis;
  if (age > DELAI_MAX_MS) {
    return { ok: false, code: 'jeton_expire', message: 'Formulaire ouvert depuis trop longtemps. Merci de recharger la page.' };
  }
  // Un jeton daté du futur ne peut venir que d'une horloge trafiquée.
  if (age < -60_000) {
    return { ok: false, code: 'jeton_invalide', message: 'Formulaire expiré. Merci de recharger la page.' };
  }
  if (age < DELAI_MIN_MS) {
    // Le navigateur sait attendre et réessayer : l'utilisateur ne voit rien.
    return { ok: false, code: 'trop_vite', message: 'Envoi trop rapide, merci de réessayer.', attendreMs: DELAI_MIN_MS - age };
  }

  if (consommes.has(p[2])) {
    return { ok: false, code: 'jeton_deja_utilise', message: 'Cette demande a déjà été envoyée. Merci de recharger la page.' };
  }
  if (consommes.size > 20_000) consommes.clear();
  consommes.add(p[2]);

  return { ok: true };
}

// ---------------------------------------------------------------------------
// Origine de la requête
//
// `lib/auth.mjs` accepte une requête sans Origin ni Referer : c'est volontaire
// là-bas, pour ne pas casser une navigation dont le navigateur a retiré les
// en-têtes. Ici c'est l'inverse : le formulaire est TOUJOURS envoyé par
// `fetch()` depuis une de nos pages, et tous les navigateurs actuels joignent
// Origin à une requête POST, même de même origine. Une absence d'Origin
// signale donc un client qui n'est pas un navigateur.
// ---------------------------------------------------------------------------
const sansWww = (h) => String(h || '').toLowerCase().replace(/^www\./, '').replace(/:\d+$/, '');

export function origineAcceptee(req) {
  const hote = sansWww(req.headers['x-forwarded-host'] || req.headers.host);
  const brut = req.headers.origin || req.headers.referer || '';
  if (!brut) return false;
  let h;
  try {
    h = sansWww(new URL(brut).host);
  } catch {
    return false;
  }
  if (!h) return false;
  if (h === hote) return true;
  // Le site est servi sous deux noms, et le serveur de développement local
  // doit continuer de fonctionner sans configuration.
  return ['sodilame.com', 'sodilame.fr', 'localhost', '127.0.0.1'].includes(h);
}

// ---------------------------------------------------------------------------
// Compteurs par clé (IP, adresse e-mail…), en mémoire de l'instance.
// Ils ralentissent l'abus, ils ne prétendent pas l'interdire.
// ---------------------------------------------------------------------------
export function limiteur(fenetreMs, maximum) {
  const vus = new Map();
  return (cle) => {
    const t = Date.now();
    const l = (vus.get(cle) || []).filter((x) => t - x < fenetreMs);
    l.push(t);
    vus.set(cle, l);
    if (vus.size > 5000) vus.clear();
    return l.length > maximum;
  };
}

export function ipDe(req) {
  return (
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'inconnue'
  );
}

// ---------------------------------------------------------------------------
// Téléphone : formes impossibles
//
// On ne cherche pas à valider un numéro, seulement à écarter ce qu'aucun
// client français ne peut saisir. Deux règles suffisent, et elles suffisent à
// écarter les deux numéros du spam du 28/09 (85325872322, 83199378727) :
//   — moins de 9 chiffres : ce n'est pas un numéro ;
//   — plus de 10 chiffres sans « + » ni « 00 » en tête : pas un format français,
//     et pas non plus un international correctement écrit.
// Un client qui tape « +33 6 12 34 56 78 » ou « 0033… » passe sans encombre.
// ---------------------------------------------------------------------------
export function telephonePlausible(tel) {
  const brut = String(tel || '').trim();
  const chiffres = brut.replace(/\D/g, '');
  if (chiffres.length < 9) return false;
  const international = brut.startsWith('+') || chiffres.startsWith('00');
  if (chiffres.length > 10 && !international) return false;
  if (chiffres.length > 15) return false;
  return true;
}

// ---------------------------------------------------------------------------
// Analyse du contenu
// ---------------------------------------------------------------------------
const communes = new Set(
  zones.flatMap((z) => z.communes).map((c) => c.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''))
);

const normaliser = (s) =>
  String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

const LIEN = /(https?:\/\/|www\.[a-z0-9-]+\.[a-z]{2,}|[a-z0-9-]+\.(?:ru|top|xyz|tk|click|link|bid|loan|stream)\b|tinyurl|bit\.ly|t\.me\/)/i;
const BALISE = /\[(?:url|link|img|b)[=\]]|\[\/(?:url|link|img)\]|<a\s|<script/i;

// Écritures qu'aucune demande adressée à un installateur de cuisines de la
// région d'Arles n'emploie. On écarte, on ne juge pas : un vrai client qui
// écrirait en cyrillique nous appellera.
const HORS_ALPHABET = /[Ѐ-ӿ֐-׿؀-ۿऀ-ॿ฀-๿　-鿿가-힯]/;

// Vocabulaire retenu uniquement là où aucune confusion n'est possible.
// « casino » seul est écarté de la liste : le groupe Casino est un client
// potentiel, et un restaurant de casino aussi. « online casino » en revanche
// n'apparaît jamais dans une demande de devis de four mixte.
const VOCABULAIRE = [
  'escort', 'escorte girl', 'viagra', 'cialis', 'kamagra', 'tramadol', 'oxycontin',
  'porn', 'porno', 'xxx', 'webcam girl', 'sex dating', 'adult dating', 'hookup',
  'online casino', 'casino online', 'gambling', 'betting site',
  'bitcoin', 'crypto investment', 'forex', 'binary option', 'payday loan',
  'seo service', 'seo services', 'backlink', 'link building', 'guest post',
  'buy followers', 'increase traffic', 'rank higher on google',
];

// Mots-outils du français. Leur absence totale dans un texte long n'est pas une
// preuve, c'est un indice : on marque, on n'écarte pas.
const MOTS_FR = [
  'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'pour', 'avec',
  'sur', 'dans', 'est', 'sont', 'nous', 'vous', 'je', 'notre', 'votre', 'mon',
  'ma', 'que', 'qui', 'pas', 'plus', 'bonjour', 'merci', 'cordialement',
];

/**
 * Note une soumission.
 *
 * @returns {{score:number, motifs:string[], verdict:'ok'|'suspect'|'rejet'}}
 *   ok      → envoi normal
 *   suspect → envoi, objet marqué, pas d'accusé de réception au demandeur
 *   rejet   → rien n'est envoyé, l'expéditeur reçoit une erreur lisible
 */
export function analyser({
  nom = '',
  email = '',
  telephone = '',
  etablissement = '',
  ville = '',
  sujet = '',
  message = '',
  sujetsAutorises = null,
} = {}) {
  // Trois poids. Le seuil de marquage est à 40 et celui de refus à 100, ce qui
  // donne : un signal dur écarte à lui seul ; un signal faible marque ; un
  // signal très faible ne fait rien tout seul et ne pèse qu'accompagné.
  //
  // Ce dernier niveau existe à cause d'un cas réel : la Mairie de Velaux est
  // cliente, et Velaux n'est pas dans les 104 communes de la zone. Une commune
  // hors zone n'est donc PAS un indice de spam — c'est un client de plus.
  const motifs = [];
  let score = 0;
  const dur = (m) => { score += 100; motifs.push(m); };
  const faible = (m) => { score += 40; motifs.push(m); };
  const tresFaible = (m) => { score += 15; motifs.push(m); };

  const courts = [nom, etablissement, ville, telephone, sujet].join(' ');
  const tout = [courts, email, message].join(' ');

  // ---- Signaux durs -------------------------------------------------------
  if (LIEN.test(courts)) dur('lien dans un champ d’identité');
  if (BALISE.test(message) || BALISE.test(courts)) dur('balisage BBCode ou HTML');
  if (HORS_ALPHABET.test(tout)) dur('écriture non latine');

  // La signature du 28/09 : le robot recopie la même chaîne dans Nom et Ville.
  const n = normaliser(nom);
  const v = normaliser(ville);
  if (n && v && n === v && n.length >= 4) dur('nom identique à la ville');

  if (telephone && !telephonePlausible(telephone)) dur('téléphone impossible');

  if (sujetsAutorises && sujet && !sujetsAutorises.includes(sujet)) {
    dur('nature de la demande hors du menu');
  }

  const bas = normaliser(tout);
  const trouves = VOCABULAIRE.filter((m) => bas.includes(m));
  if (trouves.length) dur(`vocabulaire : ${trouves.slice(0, 3).join(', ')}`);

  const liensMessage = (String(message).match(new RegExp(LIEN.source, 'gi')) || []).length;
  if (liensMessage >= 3) dur('trois liens ou plus dans le message');

  // ---- Signaux faibles ----------------------------------------------------
  if (liensMessage >= 1) faible('lien dans le message');

  // Hors zone : information réelle mais faible. Des clients hors zone, il y en
  // a (Velaux, Lyon pour un groupe), et un visiteur peut aussi écrire son
  // quartier plutôt que sa commune.
  if (v && !communes.has(v)) tresFaible('commune hors zone d’intervention');

  // Un particulier ne met pas de chiffre dans son nom, mais beaucoup de gens
  // saisissent l'enseigne à cette place : « Bistrot 1900 », « Le 5 ».
  if (/\d/.test(nom)) tresFaible('chiffres dans le nom');

  const corps = String(message).trim();
  if (corps.length > 120) {
    const mots = normaliser(corps).split(/[^a-z']+/).filter(Boolean);
    if (!mots.some((m) => MOTS_FR.includes(m))) faible('message long sans un mot de français');
  }

  const verdict = score >= 100 ? 'rejet' : score >= 40 ? 'suspect' : 'ok';
  return { score, motifs, verdict };
}

/** Retire les retours à la ligne d'une valeur destinée à un objet d'e-mail. */
export const surUneLigne = (s = '', max = 160) =>
  String(s).replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, max);
