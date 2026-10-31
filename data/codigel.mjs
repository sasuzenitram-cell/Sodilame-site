// ---------------------------------------------------------------------------
// CODIGEL — sélection « 20/80 » de la boutique : machines à glaçons ITV
//
// CODIGEL distribue plusieurs marques ; la direction a choisi de commencer par
// ITV, pour les machines à glaçons (30/10/2026). Les autres marques CODIGEL
// viendront ensuite, dans ce même fichier.
//
// Même méthode que Miele, RATIONAL, Foster et Infrico. Ce fichier est écrit à
// la main : il choisit les modèles, les regroupe en fiches et porte les
// textes. Le PRIX vient du tarif CODIGEL, lu dans `codigel-tarif.mjs`, généré
// par :
//
//     node outils/codigel-tarif.mjs <1_Import_Produits_CODIGEL_….csv> <2_….csv>
//
// Les photos viennent du serveur d'images CODIGEL (`codigel-visuels.mjs`,
// généré par outils/codigel-visuels.py) ; les fiches techniques PDF restent
// hébergées par CODIGEL (lien `fiche` du tarif).
//
// ⚠️  PRIX AFFICHÉ = PRIX PUBLIC CODIGEL, HT (base PVP 2026), choix de la
//     direction du 30/10/2026. Le prix d'achat SODILAME n'est JAMAIS lu par le
//     générateur et ne doit jamais apparaître dans ce dépôt.
//
// ⚠️  ÉCO-PARTICIPATION DEEE : facturée en plus du prix, elle est affichée à
//     côté de chaque prix (« + éco-part. X € HT »), décision de la direction du
//     30/10/2026. Son montant vient du tarif CODIGEL.
//
// ⚠️  SÉLECTION de la direction (30/10/2026) : machines ITV refroidies par
//     air, à réserve intégrée — STELLA, GALA, DELTA-MAX, ELEGANCE, QUASAR,
//     SPIKA, ICE QUEEN — et leurs consommables (filtres, cartouches, produit de
//     nettoyage, pompe de relevage, broyeur). HORS SÉLECTION : versions
//     refroidies par eau, têtes de production et réserves séparées, gamme
//     SCALA, glace nugget, modèles domestiques. Le reste du tarif est sur devis.
//
// Les libellés du tarif CODIGEL (en majuscules) ne sont pas affichés : tous
// les textes sont rédigés ici, à partir des descriptifs du fabricant.
// ---------------------------------------------------------------------------
import { tarifCodigel } from './codigel-tarif.mjs';
// Visuels : décision de la direction du 30/10/2026, sous sa responsabilité
// (voir codigel-visuels.mjs).
import { photosCodigel } from './codigel-visuels.mjs';

const ATT_GLACE =
  "Une machine à glaçons demande trois choses à son emplacement : une arrivée d'eau froide potable avec robinet d'arrêt, une évacuation plus basse que la machine (sinon il faut la version à pompe de vidange « DP » ou une pompe de relevage) et de l'air autour d'elle — enfermée sans ventilation, elle produit moins et s'use vite. Nous vérifions ces trois points avant la livraison.";
const ATT_EAU =
  "L'eau du Pays d'Arles et de la Crau est calcaire : sans filtre, le tartre s'installe dans le circuit d'eau et la production baisse. Nous conseillons de poser le filtre en même temps que la machine.";
const ATT_ACC =
  "Commandé chez CODIGEL, distributeur d'ITV, après vérification de la compatibilité avec votre machine : donnez-nous sa référence ou une photo de sa plaque signalétique.";

const AIR = 'Refroidissement par air, fluide R290';
const ALIM = 'Alimentation 230 V monophasé';

const v = (ref, court) => ({ ref, court });

/**
 * Les fiches. Champs propres à ce fichier :
 *   cle      : clé de la photo (codigel-visuels.mjs, outils/codigel-visuels.py).
 *   versions : [{ ref: référence EXACTE du tarif, court: précision affichée }]
 */
const fiches = [
  // =========================================================================
  // MACHINES À GLAÇONS ITV
  // =========================================================================
  {
    cle: 'stella',
    type: 'machine',
    machines: ['machine-a-glacons'],
    ref: 'STELLA',
    categorie: 'machines-a-glacons',
    nom: 'Machine à glaçons ITV STELLA, glaçons pleins',
    resume: 'La machine à glaçons simple et compacte, de 22 à 75 kg par jour.',
    description:
      "La machine à glaçons d'entrée de gamme ITV, pour le bar, le snack ou le restaurant qui veut des glaçons pleins sans y mettre le prix d'une gamme haute. Système à injection, réserve intégrée, carrosserie inox. La STELLA 25, sans pieds et haute de 60 cm, se glisse sous un comptoir ; les modèles suivants sont sur pieds réglables.",
    usages: ['Bars et cafés', 'Snacks et restauration rapide', 'Restaurants', 'Campings — bar et snack'],
    caracteristiques: [
      'Production de 22 à 75 kg de glace par 24 h',
      'Réserve intégrée de 6 à 40 kg',
      'Glaçons pleins, de 17 à 22 g selon le modèle',
      'De 350 x 475 x 595 mm (STELLA 25) à 645 x 645 x 840 mm (STELLA 85)',
      'Carrosserie inox',
      AIR,
      ALIM,
    ],
    attention: ATT_GLACE,
    versions: [
      v('STELLA25A', '22 kg/24 h, réserve 6 kg, sous comptoir'),
      v('STELLA35A', '33 kg/24 h, réserve 15 kg'),
      v('STELLA45A', '43 kg/24 h, réserve 15 kg'),
      v('STELLA65A', '54 kg/24 h, réserve 30 kg'),
      v('STELLA85A', '75 kg/24 h, réserve 40 kg'),
    ],
  },
  {
    cle: 'gala',
    type: 'machine',
    machines: ['machine-a-glacons'],
    ref: 'GALA',
    categorie: 'machines-a-glacons',
    nom: 'Machine à glaçons ITV GALA, glaçons cylindriques 22 g',
    resume: 'Le glaçon plein et cylindrique du bar, de 30 à 153 kg par jour.',
    description:
      "La machine à glaçons de référence du bar : des glaçons pleins et cylindriques de 22 g, durs et transparents, qui refroidissent le verre sans fondre trop vite. Les gicleurs souples du système à injection limitent l'entartrage, et la pompe à corps immergé est surdimensionnée pour durer. Carrosserie inox AISI 304, réserve intégrée. Chaque modèle existe aussi en version « DP », avec pompe de vidange intégrée, quand l'évacuation est plus haute que la machine.",
    usages: ['Bars et bars à cocktails', 'Brasseries', 'Hôtels', 'Discothèques et salles de réception'],
    caracteristiques: [
      'Production de 30 à 153 kg de glace par 24 h',
      'Réserve intégrée de 15 à 75 kg',
      'Glaçons pleins cylindriques de 22 g',
      'Injection à gicleurs souples, contre l’entartrage',
      'Version DP : pompe de vidange intégrée',
      'Carrosserie inox AISI 304, pieds réglables',
      AIR,
      ALIM,
    ],
    attention: ATT_GLACE,
    versions: [
      v('GALA30A', '30 kg/24 h, réserve 15 kg'),
      v('GALA35A', '37 kg/24 h, réserve 20 kg'),
      v('GALA45A', '47 kg/24 h, réserve 20 kg'),
      v('GALA60A', '55 kg/24 h, réserve 25 kg'),
      v('GALA80A', '75 kg/24 h, réserve 35 kg'),
      v('GALA110A', '112 kg/24 h, réserve 60 kg'),
      v('GALA150A', '153 kg/24 h, réserve 75 kg'),
      v('GALA30A-DP', '30 kg/24 h, pompe de vidange'),
      v('GALA35A-DP', '37 kg/24 h, pompe de vidange'),
      v('GALA45A-DP', '47 kg/24 h, pompe de vidange'),
      v('GALA60A-DP', '55 kg/24 h, pompe de vidange'),
      v('GALA80A-DP', '75 kg/24 h, pompe de vidange'),
      v('GALA110A-DP', '112 kg/24 h, pompe de vidange'),
    ],
  },
  {
    cle: 'delta',
    type: 'machine',
    machines: ['machine-a-glacons'],
    ref: 'DELTA-MAX',
    categorie: 'machines-a-glacons',
    nom: 'Machine à glaçons ITV DELTA-MAX, gros glaçons 40 g',
    resume: 'Le gros glaçon de 40 g, qui fond lentement, de 30 à 150 kg par jour.',
    description:
      "La même base que la GALA, pour un glaçon plus gros : 40 g, plein et tronconique. Il fond lentement et garde le verre froid plus longtemps sans diluer la boisson — c'est le glaçon des cocktails, des spiritueux servis sur glace et des bars de plage où le verre reste longtemps sur la table. Injection à gicleurs souples, inox AISI 304, réserve intégrée ; versions « DP » à pompe de vidange intégrée.",
    usages: ['Bars à cocktails', 'Bars de plage et rooftops', 'Hôtels', 'Restaurants'],
    caracteristiques: [
      'Production de 30 à 150 kg de glace par 24 h',
      'Réserve intégrée de 15 à 75 kg',
      'Glaçons pleins tronconiques de 40 g',
      'Injection à gicleurs souples, contre l’entartrage',
      'Version DP : pompe de vidange intégrée',
      'Carrosserie inox AISI 304, pieds réglables',
      AIR,
      ALIM,
    ],
    attention: ATT_GLACE,
    versions: [
      v('DELTA-MAX30A', '30 kg/24 h, réserve 15 kg'),
      v('DELTA-MAX35A', '35 kg/24 h, réserve 20 kg'),
      v('DELTA-MAX45A', '48 kg/24 h, réserve 20 kg'),
      v('DELTA-MAX60A', '62 kg/24 h, réserve 25 kg'),
      v('DELTA-MAX80A', '80 kg/24 h, réserve 35 kg'),
      v('DELTA-MAX110A', '115 kg/24 h, réserve 60 kg'),
      v('DELTA-MAX150A', '150 kg/24 h, réserve 75 kg'),
      v('DELTA-MAX30A-DP', '30 kg/24 h, pompe de vidange'),
      v('DELTA-MAX35A-DP', '35 kg/24 h, pompe de vidange'),
      v('DELTA-MAX45A-DP', '48 kg/24 h, pompe de vidange'),
      v('DELTA-MAX60A-DP', '62 kg/24 h, pompe de vidange'),
      v('DELTA-MAX80A-DP', '80 kg/24 h, pompe de vidange'),
      v('DELTA-MAX110A-DP', '115 kg/24 h, pompe de vidange'),
    ],
  },
  {
    cle: 'elegance',
    type: 'machine',
    machines: ['machine-a-glacons'],
    ref: 'ELEGANCE',
    categorie: 'machines-a-glacons',
    nom: 'Machine à glaçons ITV ELEGANCE, inox noir',
    resume: 'La machine à glaçons en inox noir, faite pour rester à la vue des clients.',
    description:
      "Quand la machine à glaçons est derrière le bar, face aux clients, elle fait partie du décor. L'ELEGANCE reprend la technique des GALA et DELTA-MAX — injection à gicleurs souples, pompe surdimensionnée, réserve intégrée — dans une carrosserie en inox noir. La 2514 fait de petits glaçons pleins de 14 g et se glisse sous un comptoir ; les 4040, 5040 et 8040 font le gros glaçon de 40 g.",
    usages: ['Bars à cocktails', 'Bars d’hôtel et lounges', 'Restaurants avec bar ouvert', 'Caves et bars à vin'],
    caracteristiques: [
      'Production de 22 à 80 kg de glace par 24 h',
      'Réserve intégrée de 6 à 35 kg',
      'Glaçons pleins de 14 g (2514) ou de 40 g (4040, 5040, 8040)',
      'Carrosserie inox noir',
      AIR,
      ALIM,
    ],
    attention: ATT_GLACE,
    versions: [
      v('ELEGANCE-2514', '22 kg/24 h, glaçons 14 g, sous comptoir'),
      v('ELEGANCE-4040', '30 kg/24 h, glaçons 40 g'),
      v('ELEGANCE-5040', '48 kg/24 h, glaçons 40 g'),
      v('ELEGANCE-8040', '80 kg/24 h, glaçons 40 g'),
    ],
  },
  {
    cle: 'quasar',
    type: 'machine',
    machines: ['machine-a-glacons'],
    ref: 'QUASAR',
    categorie: 'machines-a-glacons',
    nom: 'Machine à glaçons ITV QUASAR, à palettes',
    resume: 'La machine à palettes, la plus tolérante aux eaux calcaires.',
    description:
      "La QUASAR ne projette pas l'eau : des palettes tournent dans un bac et la glace se forme couche après couche autour de doigts réfrigérés. Le calcaire reste dans l'eau du bac au lieu de se déposer dans le circuit, ce qui en fait la machine des eaux les plus dures — celles de la Crau et des Alpilles. Elle donne un glaçon creux de 20 g. Commande électromécanique simple, porte qui coulisse vers l'intérieur, carrosserie inox AISI 304.",
    usages: ['Bars et cafés', 'Restaurants', 'Campings et hôtellerie de plein air', 'Établissements en eau très calcaire'],
    caracteristiques: [
      'Production de 22 à 122 kg de glace par 24 h',
      'Réserve intégrée de 6 à 50 kg',
      'Glaçons creux de 20 g',
      'Système à palettes, adapté aux eaux les plus calcaires',
      'Vidange par gravité',
      'Carrosserie inox AISI 304',
      AIR,
      ALIM,
    ],
    attention: ATT_GLACE,
    versions: [
      v('Q20A', 'QUASAR 20 · 22 kg/24 h, réserve 6 kg'),
      v('Q30A', 'QUASAR 30 · 34 kg/24 h, réserve 12 kg'),
      v('Q40A', 'QUASAR 40 · 40 kg/24 h, réserve 12 kg'),
      v('Q50A', 'QUASAR 50 · 48 kg/24 h, réserve 25 kg'),
      v('Q60A', 'QUASAR 60 · 66 kg/24 h, réserve 30 kg'),
      v('Q90A', 'QUASAR 90 · 78 kg/24 h, réserve 37 kg'),
      v('Q130A', 'QUASAR 130 · 122 kg/24 h, réserve 50 kg'),
    ],
  },
  {
    cle: 'spika',
    type: 'machine',
    machines: ['machine-a-glacons'],
    ref: 'SPIKA',
    categorie: 'machines-a-glacons',
    nom: 'Machine à glaçons ITV SPIKA, glaçons cubes',
    resume: 'Le glaçon cube à grande production, pour les cuisines et les bars qui débitent.',
    description:
      "La SPIKA fabrique des glaçons cubes sur un évaporateur vertical breveté par ITV : forte production pour son encombrement, en cube de 12 g ou en demi-cube de 6,5 g, qui se tasse bien dans le verre et dans les bacs à glace. Son condenseur surdimensionné et sa ventilation par l'avant la rendent à l'aise dans les locaux chauds et sous un comptoir. Versions « DP » à pompe de vidange intégrée.",
    usages: ['Bars à forte affluence', 'Restaurants et brasseries', 'Hôtels', 'Traiteurs et buffets'],
    caracteristiques: [
      'Production de 45 à 145 kg de glace par 24 h',
      'Réserve intégrée de 20 à 45 kg selon le modèle',
      'Glaçons cubes de 12 g, ou demi-cubes de 6,5 g (versions AH)',
      'Évaporateur vertical, condenseur surdimensionné pour les ambiances chaudes',
      'Ventilation frontale',
      'Version DP : pompe de vidange intégrée',
      'Carrosserie inox AISI 304, pieds réglables',
      AIR,
      ALIM,
    ],
    attention: ATT_GLACE,
    versions: [
      v('SNG50A', 'SPIKA 50 · 45 kg/24 h, cubes 12 g'),
      v('SNG70A', 'SPIKA 70 · 76 kg/24 h, cubes 12 g'),
      v('SNG100A', 'SPIKA 100 · 99 kg/24 h, cubes 12 g'),
      v('SNG150A', 'SPIKA 150 · 145 kg/24 h, cubes 12 g'),
      v('SNG50AH', 'SPIKA 50 · 45 kg/24 h, demi-cubes 6,5 g'),
      v('SNG70AH', 'SPIKA 70 · 76 kg/24 h, demi-cubes 6,5 g'),
      v('SNG100AH', 'SPIKA 100 · 99 kg/24 h, demi-cubes 6,5 g'),
      v('SNG150AH', 'SPIKA 150 · 145 kg/24 h, demi-cubes 6,5 g'),
      v('SNG50A-DP', 'SPIKA 50 · 45 kg/24 h, cubes, pompe de vidange'),
      v('SNG70A-DP', 'SPIKA 70 · 76 kg/24 h, cubes, pompe de vidange'),
      v('SNG100A-DP', 'SPIKA 100 · 99 kg/24 h, cubes, pompe de vidange'),
      v('SNG150A-DP', 'SPIKA 150 · 145 kg/24 h, cubes, pompe de vidange'),
    ],
  },
  {
    cle: 'icequeen',
    type: 'machine',
    machines: ['machine-a-glacons'],
    ref: 'ICE QUEEN',
    categorie: 'machines-a-glacons',
    nom: 'Machine à glace en grains ITV ICE QUEEN',
    resume: 'La glace en grains, pour le banc de poisson, le buffet froid et les cocktails.',
    description:
      "L'ICE QUEEN ne fait pas des glaçons mais de la glace en grains : une glace fine, à −2 / −3 °C, qui épouse ce qu'on y pose sans l'abîmer. C'est la glace des bancs de poisson et de fruits de mer, des buffets froids, des bacs à bouteilles et des cocktails frappés. Production par vis sans fin dans un évaporateur vertical, condenseur surdimensionné pour les ambiances chaudes, inox AISI 304.",
    usages: ['Poissonneries et écaillers', 'Restaurants de fruits de mer', 'Buffets et traiteurs', 'Bars à cocktails'],
    caracteristiques: [
      'Production de 55 à 182 kg de glace par 24 h',
      'Réserve intégrée de 20 à 64 kg',
      'Glace en grains, de −2 à −3 °C',
      'Vis sans fin, évaporateur vertical',
      'Carrosserie inox AISI 304',
      AIR,
      ALIM,
    ],
    attention: ATT_GLACE,
    versions: [
      v('IQ50CA', 'ICE QUEEN 50 · 55 kg/24 h, réserve 20 kg'),
      v('IQ90CA', 'ICE QUEEN 90 · 94 kg/24 h, réserve 20 kg'),
      v('IQ180CA', 'ICE QUEEN 180 · 182 kg/24 h, réserve 64 kg'),
    ],
  },

  // =========================================================================
  // ACCESSOIRES ET CONSOMMABLES ITV
  // =========================================================================
  {
    cle: 'broyeur',
    machines: ['machine-a-glacons'],
    ref: 'TR3',
    categorie: 'machines-a-glacons',
    nom: 'Broyeur à glaçons ITV TR3 inox',
    resume: 'De la glace pilée à la demande, 3 kg par minute, sur le comptoir.',
    description:
      "Le broyeur de comptoir pour la glace pilée des cocktails, des granités et des présentations de fruits de mer : on verse les glaçons en haut, la glace pilée tombe dans le bac transparent. Carrosserie inox, branchement sur une simple prise.",
    usages: ['Bars à cocktails', 'Restaurants de fruits de mer', 'Glaciers'],
    caracteristiques: ['3 kg de glace pilée par minute', 'Bac de 1 kg', '180 x 330 x 320 mm, 10 kg', '230 V, 150 W'],
    attention: "Le broyeur se pose sur un plan stable, près d'une prise. Il accepte les glaçons pleins ou creux de nos machines.",
    versions: [v('TR3-INOX', 'broyeur inox, 3 kg/min')],
  },
  {
    cle: 'filtres',
    machines: ['machine-a-glacons'],
    ref: 'Filtre ITV',
    categorie: 'machines-a-glacons',
    nom: 'Filtre à eau pour machine à glaçons ITV',
    resume: 'Moins de tartre, une glace sans goût : le filtre se pose avec la machine.',
    description:
      "Le filtre complet, tête et cartouche, à poser sur l'arrivée d'eau de la machine à glaçons. Sa cartouche agit sur trois fronts : le calcaire, qui entartre le circuit et fait chuter la production ; le chlore et les goûts, retenus par le charbon actif ; les sédiments. Il se choisit sur la production de la machine.",
    usages: ['Toutes les machines à glaçons', 'Eaux calcaires'],
    caracteristiques: [
      'C150 : machines de 20 à 40 kg/24 h',
      'C300 : machines de 45 à 80 kg/24 h',
      'C500 : machines à partir de 110 kg/24 h',
      'Anticalcaire, charbon actif, sédiments',
    ],
    attention: ATT_EAU,
    versions: [v('C150', 'filtre, machines de 20 à 40 kg/24 h'), v('C300', 'filtre, machines de 45 à 80 kg/24 h'), v('C500', 'filtre, machines dès 110 kg/24 h')],
  },
  {
    cle: 'cartouches',
    machines: ['machine-a-glacons'],
    ref: 'Cartouche ITV',
    categorie: 'machines-a-glacons',
    nom: 'Cartouche de rechange pour filtre ITV',
    resume: 'La cartouche de rechange des filtres C150, C300 et C500.',
    description:
      "La cartouche de rechange du filtre ITV : anticalcaire, charbon actif et sédiments. Une cartouche épuisée ne protège plus la machine ; nous la remplaçons lors de l'entretien, selon le volume d'eau traité.",
    usages: ['Filtres ITV C150, C300 et C500'],
    caracteristiques: ['Anticalcaire, charbon actif, sédiments', 'Une cartouche par taille de filtre'],
    attention: ATT_ACC,
    versions: [v('CC150', 'cartouche pour filtre C150'), v('CC300', 'cartouche pour filtre C300'), v('CC500', 'cartouche pour filtre C500')],
  },
  {
    cle: 'calklin',
    machines: ['machine-a-glacons'],
    ref: 'CALKLIN',
    categorie: 'machines-a-glacons',
    nom: 'Détartrant CALKLIN pour machine à glaçons ITV',
    resume: 'Le produit du nettoyage annuel de la machine à glaçons.',
    description:
      "Le produit de détartrage et de nettoyage du circuit d'eau, pour le nettoyage annuel de la machine à glaçons. Une machine à glaçons est un appareil alimentaire : ce nettoyage fait partie du plan de maîtrise sanitaire, comme celui de la réserve. Nous le faisons dans le cadre du contrat d'entretien.",
    usages: ['Machines à glaçons à partir de 60 kg/24 h'],
    caracteristiques: ['CALKLIN200 : 5 sachets de 200 g', 'CALKLIN1000 : 1 sachet de 1 kg'],
    attention: "Respectez le dosage et le rinçage indiqués par ITV : un produit de détartrage mal rincé se retrouve dans la glace.",
    versions: [v('CALKLIN200', '5 sachets de 200 g'), v('CALKLIN1000', '1 sachet de 1 kg')],
  },
  {
    cle: 'pompe',
    machines: ['machine-a-glacons'],
    ref: 'Pompe de relevage ITV',
    categorie: 'machines-a-glacons',
    nom: 'Pompe de relevage pour machine à glaçons',
    resume: 'Quand l’évacuation est plus haute que la machine.',
    description:
      "La pompe de relevage automatique remonte l'eau de vidange de la machine à glaçons jusqu'à une évacuation plus haute ou éloignée. C'est la solution pour une machine déjà en place sans pompe intégrée ; pour une machine neuve, la version « DP » à pompe intégrée est souvent plus simple.",
    usages: ['Machines à glaçons sans pompe de vidange intégrée'],
    caracteristiques: ['Démarrage automatique', '230 V'],
    attention: ATT_ACC,
    versions: [v('426470', 'pompe de relevage automatique')],
  },
];

// ---------------------------------------------------------------------------
// Assemblage avec le tarif et les visuels
// ---------------------------------------------------------------------------

/** Toutes les références du tarif utilisées ici — lu par le générateur. */
export const refsCodigel = fiches.flatMap((f) => f.versions.map((x) => x.ref));

/** Les références introuvables dans le tarif généré (doit rester vide). */
export const refsCodigelManquantes = refsCodigel.filter((r) => !tarifCodigel[r]);

// Adresses des fiches : écrites à la main, elles ne doivent plus changer une
// fois en ligne.
const SLUGS = {
  stella: 'itv-stella-machine-a-glacons-pleins',
  gala: 'itv-gala-machine-a-glacons-cylindriques',
  delta: 'itv-delta-max-machine-a-gros-glacons-40-g',
  elegance: 'itv-elegance-machine-a-glacons-inox-noir',
  quasar: 'itv-quasar-machine-a-glacons-a-palettes',
  spika: 'itv-spika-machine-a-glacons-cubes',
  icequeen: 'itv-ice-queen-machine-a-glace-en-grains',
  broyeur: 'itv-tr3-broyeur-a-glacons',
  filtres: 'itv-filtre-a-eau-machine-a-glacons',
  cartouches: 'itv-cartouche-filtre-machine-a-glacons',
  calklin: 'itv-calklin-detartrant-machine-a-glacons',
  pompe: 'itv-pompe-de-relevage-machine-a-glacons',
};

export const produitsCodigel = fiches.map((f) => {
  const { cle, versions, ...reste } = f;
  return {
    slug: SLUGS[cle],
    marque: 'ITV',
    creditVisuel: 'ITV',
    photo: photosCodigel[cle] ?? null,
    usages: [],
    // Accessoires et consommables : commandés chez CODIGEL, pas en stock chez
    // nous. La fiche ne doit donc promettre ni stock ni tournée.
    ...(f.type === 'machine' ? {} : { surCommande: true }),
    ...reste,
    conditionnements: versions.map((x) => {
      const t = tarifCodigel[x.ref] || {};
      return {
        label: `${x.ref} · ${x.court}`,
        refFabricant: x.ref,
        prix: typeof t.prix === 'number' ? t.prix : null,
        ...(typeof t.eco === 'number' && t.eco > 0 ? { ecoPart: t.eco } : {}),
        ...(t.fiche ? { ficheFabricant: t.fiche, ficheTitre: `Fiche technique ${x.ref}` } : {}),
      };
    }),
  };
});
