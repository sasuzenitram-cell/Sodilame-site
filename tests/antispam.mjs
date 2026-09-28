// ---------------------------------------------------------------------------
// Banc d'essai du filtre anti-spam des formulaires publics.
//
// Le 28/09/2026, 400 messages envoyés par un robot sont arrivés dans la boîte
// SODILAME par /api/contact. Ce fichier épingle deux choses :
//
//   — que le message type de cette vague soit bien écarté ;
//   — et, tout aussi important, qu'une VRAIE demande passe. Un filtre qui
//     bloque un restaurateur en panne de chambre froide coûte infiniment plus
//     cher que dix spams dans la boîte. Chaque cas « qui doit passer » ci-dessous
//     est là pour empêcher un futur durcissement de casser le formulaire sans
//     que personne s'en aperçoive.
// ---------------------------------------------------------------------------
import { readFileSync, existsSync } from 'node:fs';

process.env.FORM_SECRET = 'cle-de-test-suffisamment-longue-pour-signer-les-jetons';

const {
  delivrerJeton, verifierJeton, jetonsActifs, origineAcceptee,
  telephonePlausible, analyser, surUneLigne, limiteur,
} = await import('../lib/antispam.mjs');
const { sujets } = await import('../data/formulaire.mjs');

let ok = 0;
let ko = 0;
const verifier = (nom, cond, detail = '') => {
  if (cond) { ok++; console.log(`  ✓ ${nom}`); }
  else { ko++; console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`); }
};

const requete = ({ origin = null, referer = null, host = 'www.sodilame.com' } = {}) => {
  const headers = { host };
  if (origin) headers.origin = origin;
  if (referer) headers.referer = referer;
  return { headers, socket: {} };
};

// ===========================================================================
console.log('\n═══ Jeton signé — la couche qui arrête l’envoi direct sur l’API ═══');

verifier('la couche est armée dès qu’une clé est disponible', jetonsActifs());

{
  const j = delivrerJeton();
  const plusTard = Date.now() + 5000;
  verifier('un jeton délivré ici est accepté après le délai minimum',
    verifierJeton(j, { maintenant: plusTard }).ok);
  verifier('le même jeton n’est pas accepté deux fois',
    verifierJeton(j, { maintenant: plusTard }).code === 'jeton_deja_utilise');
}

verifier('aucun jeton → refus (c’est le cas du robot du 28/09)',
  verifierJeton('').code === 'jeton_absent');

verifier('jeton fabriqué de toutes pièces → refus',
  verifierJeton('1.abcdef.Zm9vYmFy.signaturebidonbidonbidonbid').code === 'jeton_invalide');

{
  // Signature valide, mais un caractère de la charge modifié.
  const j = delivrerJeton().split('.');
  const falsifie = `1.${j[1]}.${j[2]}x.${j[3]}`;
  verifier('charge modifiée après signature → refus',
    verifierJeton(falsifie, { maintenant: Date.now() + 5000 }).code === 'jeton_invalide');
}

verifier('envoi instantané → « trop vite », pas un refus définitif',
  verifierJeton(delivrerJeton()).code === 'trop_vite');

verifier('« trop vite » indique au navigateur combien de temps patienter',
  typeof verifierJeton(delivrerJeton()).attendreMs === 'number');

verifier('jeton vieux de quatre heures → refus',
  verifierJeton(delivrerJeton(), { maintenant: Date.now() + 4 * 3600 * 1000 }).code === 'jeton_expire');

{
  // Sans clé, la couche se DÉSACTIVE au lieu de bloquer le formulaire : un
  // site qui n'envoie plus rien serait pire que le spam.
  const sauve = process.env.FORM_SECRET;
  const s2 = process.env.SESSION_SECRET;
  const s3 = process.env.RESEND_API_KEY;
  delete process.env.FORM_SECRET;
  delete process.env.SESSION_SECRET;
  delete process.env.RESEND_API_KEY;
  verifier('sans clé de signature, le formulaire reste ouvert (pas de blocage)',
    !jetonsActifs() && verifierJeton('').ok);
  process.env.FORM_SECRET = sauve;
  if (s2) process.env.SESSION_SECRET = s2;
  if (s3) process.env.RESEND_API_KEY = s3;
}

// ===========================================================================
console.log('\n═══ Origine de la requête ═══');

verifier('depuis le site', origineAcceptee(requete({ origin: 'https://www.sodilame.com' })));
verifier('depuis le domaine sans www', origineAcceptee(requete({ origin: 'https://sodilame.com' })));
verifier('à défaut d’Origin, le Referer suffit',
  origineAcceptee(requete({ referer: 'https://www.sodilame.com/contact' })));
verifier('le serveur de développement local continue de fonctionner',
  origineAcceptee(requete({ origin: 'http://localhost:3000', host: 'localhost:3000' })));
verifier('aucune origine → refus (script, curl, robot)', !origineAcceptee(requete()));
verifier('origine étrangère → refus',
  !origineAcceptee(requete({ origin: 'https://spam-factory.ru' })));
verifier('origine illisible → refus', !origineAcceptee(requete({ origin: 'pas-une-url' })));

// ===========================================================================
console.log('\n═══ Téléphone : écarter l’impossible, pas le mal écrit ═══');

// Les deux numéros relevés dans le spam du 28/09.
verifier('85325872322 (11 chiffres, sans +) → écarté', !telephonePlausible('85325872322'));
verifier('83199378727 (11 chiffres, sans +) → écarté', !telephonePlausible('83199378727'));
verifier('123 → écarté', !telephonePlausible('123'));

for (const bon of [
  '04 90 93 98 88',
  '0490939888',
  '06.12.34.56.78',
  '+33 6 12 34 56 78',
  '+33490939888',
  '0033 6 12 34 56 78',
  '04-90-93-98-88',
  '490939888',
  '+32 2 555 12 34',
]) {
  verifier(`« ${bon} » passe`, telephonePlausible(bon));
}

// ===========================================================================
console.log('\n═══ Le message type de la vague du 28/09 ═══');

const SPAM = {
  nom: 'Weelankelm',
  ville: 'Weelankelm',
  telephone: '85325872322',
  email: 'alfredo.lokillo@hotmail.com',
  sujet: 'Dépannage — froid',
  message:
    'Hello, we offer the best escort application for your city, download here http://tinyurl.com/2xyzabc and start now, thousands of profiles waiting.',
};

{
  const a = analyser({ ...SPAM, sujetsAutorises: sujets });
  verifier('il est écarté', a.verdict === 'rejet', `verdict ${a.verdict}, score ${a.score}`);
  verifier('le nom identique à la ville est relevé', a.motifs.some((m) => m.includes('ville')));
  verifier('le téléphone impossible est relevé', a.motifs.some((m) => m.includes('téléphone')));
  verifier('le vocabulaire est relevé', a.motifs.some((m) => m.includes('vocabulaire')));
}

// Chaque signal dur doit suffire à lui seul : le robot suivant n'en cumulera
// peut-être qu'un.
const base = {
  nom: 'Marie Delorme', ville: 'Arles', telephone: '06 12 34 56 78',
  email: 'marie@lemas.fr', sujet: 'Dépannage — froid',
  message: 'Bonjour, notre chambre froide positive ne tient plus la température depuis ce matin. Merci de nous rappeler.',
};

for (const [nom, modif] of [
  ['un lien dans le champ Nom', { nom: 'Marie http://spam.ru' }],
  ['un lien dans le champ Ville', { ville: 'www.casino-online.xyz' }],
  ['du BBCode dans le message', { message: 'Bonjour [url=http://x.ru]cliquez ici[/url] merci' }],
  ['une balise <a> dans le message', { message: 'Bonjour <a href="http://x.ru">ici</a> merci' }],
  ['de l’écriture cyrillique', { message: 'Здравствуйте, предлагаем услуги' }],
  ['de l’écriture chinoise', { etablissement: '北京饭店有限公司' }],
  ['une nature de demande hors du menu', { sujet: 'Cheap loans available now' }],
  ['trois liens dans le message', { message: 'voir http://a.ru et http://b.ru et http://c.ru' }],
]) {
  const a = analyser({ ...base, ...modif, sujetsAutorises: sujets });
  verifier(`${nom} suffit à écarter`, a.verdict === 'rejet', `verdict ${a.verdict}`);
}

// ===========================================================================
console.log('\n═══ Ce qui doit passer — la partie la plus importante du fichier ═══');

{
  const a = analyser({ ...base, sujetsAutorises: sujets });
  verifier('une demande de dépannage ordinaire passe sans marque',
    a.verdict === 'ok', `verdict ${a.verdict} : ${a.motifs.join(' ; ')}`);
}

for (const [nom, cas] of [
  ['un projet de cuisine complète', {
    nom: 'Jean-Pierre Aubanel', etablissement: 'Le Mas de la Crau', ville: 'Saint-Martin-de-Crau',
    telephone: '0490123456', email: 'contact@masdelacrau.fr',
    sujet: 'Projet de cuisine complète',
    message: "Nous ouvrons un restaurant de 80 couverts en avril. J'aimerais un rendez-vous pour étudier la conception de la cuisine et un chiffrage.",
  }],
  // Cas réel : la Mairie de Velaux est cliente, et Velaux ne fait pas partie
  // des 104 communes de la zone d'intervention publiée. Un durcissement qui
  // ferait de « hors zone » un motif de marquage ferait clignoter l'alerte sur
  // une vraie collectivité — et supprimerait son accusé de réception.
  ['une mairie hors zone, qui est une cliente réelle', {
    nom: 'Service technique', etablissement: 'Mairie de Velaux', ville: 'Velaux',
    telephone: '04 42 87 00 00', email: 'technique@velaux.fr',
    sujet: "Contrat d'entretien / audit gratuit",
    message: 'Audit du parc de la cuisine centrale, dans le cadre du renouvellement de notre marché.',
  }],
  ['un restaurant DE casino (le mot seul ne doit rien déclencher)', {
    nom: 'Sofiane Merad', etablissement: 'Brasserie du Casino', ville: 'Salon-de-Provence',
    telephone: '0490561234', email: 's.merad@brasserieducasino.fr',
    sujet: 'Dépannage — cuisson ou laverie',
    message: 'Le lave-verres ne chauffe plus. Nous sommes ouverts ce soir, service à 19 h.',
  }],
  ['un client du groupe Casino', {
    nom: 'Laurent Vidal', etablissement: 'Casino Supermarché Arles', ville: 'Arles',
    telephone: '0490960000', email: 'l.vidal@casino.fr',
    sujet: "Achat / remplacement d'un équipement",
    message: 'Remplacement de la vitrine réfrigérée du rayon traiteur.',
  }],
  ['un message très court', {
    nom: 'Paul', telephone: '0612345678', email: 'paul@bistrot.fr',
    sujet: 'Dépannage — froid', message: 'Rappelez-moi.',
  }],
  ['aucun message du tout', {
    nom: 'Claire Simon', telephone: '0612345678', email: 'claire@hotel.fr',
    sujet: 'Autre demande', message: '',
  }],
  ['un e-mail en anglais mais court (un client étranger existe)', {
    nom: 'John Baker', ville: 'Arles', telephone: '+33 6 12 34 56 78',
    email: 'john@thebakery.fr', sujet: 'Autre demande',
    message: 'Hello, I need a quote for a cold room.',
  }],
  ['un accent et une apostrophe typographique', {
    nom: 'Hélène Nguyễn', etablissement: "L'Auberge", ville: 'Nîmes',
    telephone: '0466000000', email: 'helene@auberge.fr',
    sujet: 'Dépannage — froid', message: "L'armoire négative s'est arrêtée cette nuit.",
  }],
]) {
  const a = analyser({ ...cas, sujetsAutorises: sujets });
  verifier(`${nom} → passe`, a.verdict === 'ok', `verdict ${a.verdict} : ${a.motifs.join(' ; ')}`);
}

// Un nom vietnamien comporte des diacritiques latines, pas une autre écriture :
// le filtre ne doit pas les confondre.
verifier('les diacritiques latines ne sont pas prises pour une autre écriture',
  analyser({ nom: 'Hélène Nguyễn', message: 'Bonjour, merci de me rappeler.' }).verdict === 'ok');

// ===========================================================================
console.log('\n═══ Ce qui passe mais part marqué ═══');

{
  // Un client peut coller le lien de la fiche produit qu'il veut commander.
  const a = analyser({
    ...base,
    message: 'Bonjour, je voudrais le même modèle que celui-ci : https://www.winterhalter.com/fr/uc-m — pouvez-vous me le chiffrer ?',
    sujetsAutorises: sujets,
  });
  verifier('un lien seul dans le message : marqué, pas écarté',
    a.verdict === 'suspect', `verdict ${a.verdict}`);
}

{
  // Hors zone seul ne marque rien (cf. Mairie de Velaux plus haut) ; hors zone
  // ACCOMPAGNÉ d'un lien, si.
  const seul = analyser({ ...base, ville: 'Lyon', sujetsAutorises: sujets });
  verifier('une commune hors zone, seule, ne marque rien',
    seul.verdict === 'ok', `verdict ${seul.verdict} : ${seul.motifs.join(' ; ')}`);

  const accompagne = analyser({
    ...base, ville: 'Lyon',
    message: 'Voir ce modèle http://exemple-fournisseur.com/x et me dire.',
    sujetsAutorises: sujets,
  });
  verifier('hors zone + un lien : marqué', accompagne.verdict === 'suspect',
    `verdict ${accompagne.verdict}`);
}

{
  const a = analyser({
    ...base,
    message: 'Dear sir, I am writing to you about a business opportunity that could increase the revenue of your company this year, please read the attached document and let me know what you think about it.',
    sujetsAutorises: sujets,
  });
  verifier('un long texte sans un mot de français : marqué',
    a.verdict === 'suspect', `verdict ${a.verdict} : ${a.motifs.join(' ; ')}`);
}

// ===========================================================================
console.log('\n═══ Objet de l’e-mail ═══');

verifier('aucun retour à la ligne n’entre dans l’objet',
  !/[\r\n]/.test(surUneLigne('Dépannage\r\nBcc: victime@exemple.fr')));
verifier('l’objet reste borné en longueur', surUneLigne('x'.repeat(500)).length <= 160);

// ===========================================================================
console.log('\n═══ Compteur de débit ═══');

{
  const trop = limiteur(60_000, 3);
  verifier('les trois premiers passent', !trop('ip') && !trop('ip') && !trop('ip'));
  verifier('le quatrième est freiné', trop('ip'));
  verifier('une autre IP n’est pas pénalisée', !trop('autre'));
}

// ===========================================================================
console.log('\n═══ Page publiée ═══');

if (existsSync('public/contact/index.html')) {
  const page = readFileSync('public/contact/index.html', 'utf8');

  verifier('le piège à robots est toujours là', page.includes('name="societe_web"'));

  // Le menu de la page et la liste que le serveur accepte doivent rester la
  // même chose : sinon le formulaire refuse toutes les demandes réelles.
  const manquants = sujets.filter((s) => !page.includes(s.replace(/'/g, '&#39;')) && !page.includes(s));
  verifier('les natures du menu sont exactement celles acceptées par l’API',
    !manquants.length, manquants.join(' | '));

  const js = readFileSync('public/assets/form.js', 'utf8');
  verifier('le script va chercher un jeton avant d’envoyer', /demanderJeton/.test(js));
  verifier('le jeton est joint à l’envoi', /data\.jeton/.test(js));
  verifier('un envoi jugé trop rapide est rejoué automatiquement', /trop_vite/.test(js));
  verifier('un jeton périmé est renouvelé sans embêter le visiteur', /jeton_expire/.test(js));
} else {
  verifier('la page de contact est générée', false, 'public/contact/index.html absent');
}

console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
