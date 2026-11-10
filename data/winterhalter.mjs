// ---------------------------------------------------------------------------
// WINTERHALTER — sélection « 20/80 » de la boutique : laverie
//
// Même méthode que les autres marques. Ce fichier est écrit à la main : il
// choisit les modèles, les regroupe en fiches et porte les textes. Le PRIX
// vient du catalogue « TARIFS 2026 » Winterhalter, lu dans
// `winterhalter-tarif.mjs`, généré par :
//
//     python3 outils/winterhalter-tarif.py winterhalter_tarifs_2026.pdf
//
// Winterhalter ne fournit pas d'export Dolibarr : la source est le catalogue
// PDF du portail revendeur, et l'outil lit chaque prix dans le PDF.
//
// Photos : médiathèque du portail revendeur (`winterhalter-visuels.mjs`,
// généré par outils/winterhalter-visuels.py). Documents : brochures de gamme
// publiques de winterhalter.com (BROCHURES ci-dessous).
//
// ⚠️  PRIX AFFICHÉ = PRIX PUBLIC WINTERHALTER, HT (tarif 2026). Le prix d'achat
//     SODILAME n'apparaît nulle part dans ce dépôt.
//
// ⚠️  SÉLECTION de la direction (04/11/2026) : lave-verres et lave-vaisselle
//     frontaux UC (S, M, L, XL ; options Energy, Cool, adoucisseur intégré),
//     UC Excellence-i / iPlus (osmoseur intégré), lave-vaisselle à capot PT
//     (M, L, XL ; EnergyPlus, ClimatePlus), lave-ustensiles UF et GS 630,
//     traitement de l'eau (adoucisseurs MonoMatik / DuoMatik, osmoseurs AT
//     Excellence), et prix publics sur les produits lessiviels déjà en ligne.
//     HORS SÉLECTION : machines à avancement (CTR, MTR, MTF), PT Utensil,
//     Ver'net, tables et paniers. Sur devis.
//
// Forfaits (grille de la direction du 09/11/2026, HT) : UC et UC Excellence
// 350 € ; PT 550 € ; UF 750 € ; GS 630 350 € ; adoucisseur ou osmoseur posé
// seul 750 €. Pack CARSAT (10/11/2026 : lave-verres UC-S/M/L + osmoseur +
// adoucisseur, une seule pose) 750 €.
// ---------------------------------------------------------------------------
import { tarifWinterhalter as T } from './winterhalter-tarif.mjs';
// Visuels du portail revendeur : décision de la direction, sous sa responsabilité.
import { photosWinterhalter } from './winterhalter-visuels.mjs';

const MARQUE = 'Winterhalter';

// Brochures de gamme publiques (pages produits de winterhalter.com/fr-fr).
const MEDIA = 'https://media.winterhalter.com/mc/mediabase?assetId=';
const BROCHURES = {
  uc: { url: `${MEDIA}155735`, titre: 'Brochure de la gamme UC' },
  pt: { url: `${MEDIA}643554`, titre: 'Brochure de la gamme PT' },
  uf: { url: `${MEDIA}345226`, titre: 'Brochure de la gamme UF' },
  gs: { url: `${MEDIA}344266`, titre: 'Brochure GS 630' },
  eau: { url: `${MEDIA}166740`, titre: 'Brochure Traitement de l’eau' },
};

const ATT_MACHINE =
  "Une machine de laverie se raccorde à l'eau, à l'évacuation et à l'électricité — le plus souvent en triphasé — et son résultat dépend de l'eau qui l'alimente. Nous relevons les arrivées, mesurons la dureté de l'eau et vérifions la puissance disponible avant la commande ; le choix du programme (verres, vaisselle, mixte) se précise à ce moment-là, sans changer le prix.";
const ATT_EAU =
  "Sur l'eau dure de la Crau et des Alpilles, un lave-verres sans traitement d'eau voile les verres et s'entartre. Le traitement se choisit sur une mesure de dureté, faite sur place : nous la faisons au relevé, avant la commande.";
const ATT_OPT = "Option montée en usine : à commander avec la machine, ou à faire chiffrer pour une machine déjà en place.";

// Renvoi vers le pack CARSAT, sur les fiches des machines qui le composent.
const ENCART_PACK = {
  titre: 'Existe en pack CARSAT.',
  texte: 'Lave-verres UC-S, UC-M ou UC-L, osmoseur et adoucisseur réunis : l’ensemble « lave-verres avec osmoseur » visé par les aides à la prévention de l’Assurance Maladie.',
  versRef: 'Pack CARSAT',
  lien: 'Voir le pack lave-verres + osmoseur',
};

// Pack CARSAT : lave-verres UC + 2 cannes d'aspiration (UC-SL_30) + osmoseur
// AT Excellence-S (200V0001) + adoucisseur BiBloc Compact (20006716) + 2
// paniers à verres (5501178 en 400 x 400, 85000436 en 500 x 500). Composition
// du devis type de la direction (10/11/2026) ; chaque montant est lu au tarif.
const pack = (m, panier) => T[m] + T['UC-SL_30'] + T['200V0001'] + T['20006716'] + 2 * T[panier];

const UC_COMMUN = [
  'Programmes lave-verres, lave-vaisselle ou mixte, au même prix',
  'Alimentation monophasée ou triphasée, au même prix',
  'Interface DIN 18875 pour la gestion d’énergie, de série',
];

/**
 * Les fiches. Champs propres à ce fichier :
 *   cle      : clé de la photo (winterhalter-visuels.mjs).
 *   doc      : clé de la brochure de gamme (BROCHURES).
 *   versions : [{ ref, court, prix }] — `ref` est la référence affichée,
 *              `prix` est lu dans le tarif (ou composé : machine + option, deux
 *              montants du tarif).
 */
const v = (ref, court, prix) => ({ ref, court, prix });

const ucVersions = (m) => [
  v(m, 'version standard', T[m]),
  v(`${m} Energy`, 'récupération de chaleur des buées', T[m] + T['UC-ERG_10']),
  v(`${m} Cool`, 'rinçage à 65 °C, pour les verres', T[m] + T['UC-SPA_10']),
  v(`${m} + adoucisseur`, 'adoucisseur intégré (jusqu’à 53 °TH)', T[m] + T['UC-WAUF_10']),
  v(`${m} Energy + adoucisseur`, 'Energy et adoucisseur intégré', T[m] + T['UC-ERG_10'] + T['UC-WAUF_10']),
];

const fiches = [
  // =========================================================================
  // LAVE-VERRES ET LAVE-VAISSELLE FRONTAUX UC
  // =========================================================================
  {
    cle: 'ucs',
    doc: 'uc',
    type: 'machine',
    machines: ['lave-verres', 'lave-vaisselle'],
    ref: 'UC-S',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-verres et lave-vaisselle frontal Winterhalter UC-S',
    resume: 'Le lave-verres compact du bar : 46 cm de large, paniers de 400 x 400.',
    description:
      "Le plus petit des frontaux Winterhalter, conçu pour se glisser sous un comptoir de bar : 460 mm de large, paniers de 400 x 400 mm. Il se règle en lave-verres, en lave-vaisselle ou en mixte, au même prix. La version Energy récupère la chaleur des buées pour préchauffer l'eau ; la version Cool rince à 65 °C, pour des verres qu'on peut servir dès la sortie ; l'adoucisseur intégré protège la machine et les verres sur notre eau calcaire.",
    usages: ['Bars et cafés', 'Brasseries', 'Bars à vin', 'Bars d’hôtel'],
    caracteristiques: [
      '460 x 617 mm, hauteur 725 à 760 mm (Energy : 810 à 845 mm)',
      'Paniers 400 x 400 mm, hauteur de passage 309 mm',
      'Jusqu’à 48 paniers de verres à l’heure, cycle court jusqu’à 77',
      'Cuve de 9,5 L, 2 L d’eau de rinçage par cycle',
      ...UC_COMMUN,
    ],
    attention: ATT_MACHINE,
    versions: ucVersions('UC-S'),
    encart: ENCART_PACK,
  },
  {
    cle: 'ucm',
    doc: 'uc',
    type: 'machine',
    machines: ['lave-verres', 'lave-vaisselle'],
    ref: 'UC-M',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-verres et lave-vaisselle frontal Winterhalter UC-M',
    resume: 'Le frontal polyvalent en paniers de 500 x 500 : verres, assiettes ou les deux.',
    description:
      "Le frontal de référence du bar-restaurant : paniers de 500 x 500 mm pour les verres comme pour les assiettes, sous un comptoir standard. Réglable en lave-verres, lave-vaisselle ou mixte, au même prix ; versions Energy (récupération de chaleur des buées), Cool (rinçage à 65 °C) et adoucisseur intégré.",
    usages: ['Bars et brasseries', 'Restaurants', 'Cafés', 'Hôtels — bar et office'],
    caracteristiques: [
      '600 x 617 mm, hauteur 725 à 760 mm (Energy : 810 à 845 mm)',
      'Paniers 500 x 500 mm, hauteur de passage 309 mm',
      'Lave-verres jusqu’à 48 paniers/h ; lave-vaisselle jusqu’à 40 paniers/h',
      'Cuve de 15,3 L, 2,2 L d’eau de rinçage par cycle',
      ...UC_COMMUN,
    ],
    attention: ATT_MACHINE,
    versions: ucVersions('UC-M'),
    encart: ENCART_PACK,
  },
  {
    cle: 'ucl',
    doc: 'uc',
    type: 'machine',
    machines: ['lave-verres', 'lave-vaisselle'],
    ref: 'UC-L',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle frontal Winterhalter UC-L',
    resume: 'Le frontal qui passe les plaques Gastronorm : 404 mm de hauteur de passage.',
    description:
      "Le frontal UC en version haute : 404 mm de hauteur de passage, assez pour les grandes assiettes, les plats et les plaques Gastronorm. C'est le lave-vaisselle de la petite restauration qui n'a pas la place d'un capot. Réglable en lave-vaisselle, lave-verres ou mixte ; versions Energy, Cool et adoucisseur intégré.",
    usages: ['Restaurants', 'Snacks et pizzerias', 'Crèches et petites collectivités', 'Traiteurs'],
    caracteristiques: [
      '600 x 617 mm, hauteur 820 à 855 mm (Energy : 905 à 940 mm)',
      'Paniers 500 x 500 mm, hauteur de passage 404 mm (plaques GN)',
      'Lave-vaisselle jusqu’à 40 paniers/h',
      'Cuve de 15,3 L, 2,2 L d’eau de rinçage par cycle',
      ...UC_COMMUN,
    ],
    attention: ATT_MACHINE,
    versions: ucVersions('UC-L'),
    encart: ENCART_PACK,
  },
  {
    cle: 'ucxl',
    doc: 'uc',
    type: 'machine',
    machines: ['lave-vaisselle'],
    ref: 'UC-XL',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle frontal Winterhalter UC-XL',
    resume: 'Le plus grand des frontaux : plaques Euronorm, plateaux et bacs.',
    description:
      "Le frontal UC le plus profond, qui accepte les plaques Euronorm 600 x 400 de la boulangerie et de la pâtisserie, les plateaux et les bacs. Habillage arrière inox de série. Versions Energy, Cool et adoucisseur intégré.",
    usages: ['Boulangeries et pâtisseries', 'Boucheries', 'Restaurants', 'Cuisines de collectivité'],
    caracteristiques: [
      '600 x 651 mm, hauteur 820 à 855 mm (Energy : 905 à 940 mm)',
      'Paniers 500 x 500 mm, hauteur de passage 404 mm (plaques Euronorm)',
      'Habillage arrière inox, indice de protection IPX5',
      'Cuve de 15,3 L, 2,2 L d’eau de rinçage par cycle',
      ...UC_COMMUN,
    ],
    attention: ATT_MACHINE,
    versions: ucVersions('UC-XL'),
  },
  {
    cle: 'ucexc',
    doc: 'uc',
    type: 'machine',
    machines: ['lave-verres', 'lave-vaisselle'],
    ref: 'UC Excellence',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-verres Winterhalter UC Excellence-i / iPlus, osmoseur intégré',
    resume: 'Le lave-verres avec osmoseur intégré : des verres brillants, sans essuyage.',
    description:
      "L'UC Excellence intègre un osmoseur dans la machine : l'eau de rinçage est déminéralisée, les verres sortent sans trace de calcaire et n'ont plus à être essuyés à la main. La version iPlus intègre aussi l'adoucisseur et accepte une eau jusqu'à 31 °dH ; la version i demande un adoucisseur en amont. En taille S (paniers 400 x 400) ou M (500 x 500). Ce type d'équipement peut entrer dans le champ des aides à la prévention des risques professionnels : voir notre article sur le lave-verres avec osmoseur subventionné.",
    usages: ['Bars et bars à vin', 'Brasseries', 'Restaurants gastronomiques', 'Hôtels'],
    caracteristiques: [
      'Osmoseur intégré, débit de perméat 42 L/h minimum',
      'iPlus : adoucisseur intégré, eau d’alimentation jusqu’à 31 °dH',
      'Excellence-i : adoucisseur en amont obligatoire',
      'UC-S : 460 mm de large, paniers 400 x 400 ; UC-M : 600 mm, paniers 500 x 500',
      'Hauteur 820 à 855 mm, passage 309 mm',
      'Monophasé 3,4 kW ou triphasé 8,1 kW (16 A)',
    ],
    attention: ATT_EAU,
    versions: [
      v('UC-S Excellence-i', 'osmoseur intégré, paniers 400 x 400', T['UC-S Excellence-i']),
      v('UC-M Excellence-i', 'osmoseur intégré, paniers 500 x 500', T['UC-M Excellence-i']),
      v('UC-S Excellence-iPlus', 'osmoseur + adoucisseur, paniers 400 x 400', T['UC-S Excellence-iPlus']),
      v('UC-M Excellence-iPlus', 'osmoseur + adoucisseur, paniers 500 x 500', T['UC-M Excellence-iPlus']),
    ],
  },

  {
    cle: 'pack',
    doc: 'uc',
    type: 'machine',
    machines: ['lave-verres', 'adoucisseur'],
    ref: 'Pack CARSAT',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Pack CARSAT Winterhalter : lave-verres UC, osmoseur et adoucisseur',
    resume: 'Lave-verres UC, osmoseur AT Excellence-S et adoucisseur BiBloc : des verres qui n’ont plus à être essuyés.',
    description:
      "Le pack réunit ce qu'il faut pour que les verres sortent brillants et n'aient plus à être essuyés au torchon : un lave-verres frontal UC (S, M ou L), un osmoseur AT Excellence-S qui déminéralise l'eau de rinçage, et un adoucisseur BiBloc Compact qui le protège en amont. S'y ajoutent deux cannes d'aspiration pour brancher directement les bidons de détergent et de rinçage, et deux paniers à verres. C'est l'équipement « lave-verres avec osmoseur » que vise la subvention Prévention des risques ergonomiques de l'Assurance Maladie : conditions et démarche dans notre article sur le lave-verres avec osmoseur subventionné. Le premier bidon de détergent F420e (12 kg) et le premier bidon de rinçage B100N (5 L) sont offerts, et la formation de votre équipe est comprise dans le forfait.",
    usages: ['Bars et cafés', 'Brasseries', 'Bars à vin', 'Hôtels — bar et office'],
    caracteristiques: [
      'Lave-verres UC-S (paniers 400 x 400), UC-M ou UC-L (paniers 500 x 500)',
      'Osmoseur AT Excellence-S : 90 L/h de perméat minimum, filtre à sédiments inclus',
      'Adoucisseur BiBloc Compact : 2 x 4,5 L de résine, bac à sel de 8 kg',
      '2 cannes d’aspiration avec sonde de niveau, détergent et rinçage',
      '2 paniers à verres (4 rangées en UC-S, 5 rangées en UC-M et UC-L)',
      'Offerts : premier bidon de détergent F420e 12 kg et de rinçage B100N 5 L',
    ],
    attention:
      "L'aide de l'Assurance Maladie a ses conditions (effectif, cahier des charges, enveloppe limitée) et la demande vous appartient : vérifiez votre éligibilité avant de commander, notre article détaille la démarche. Sur l'eau dure de la région, nous mesurons la dureté au relevé, avant la commande.",
    versions: [
      v('UC-S pack CARSAT', 'osmoseur AT-S, adoucisseur BiBloc, paniers 400 x 400', pack('UC-S', '5501178')),
      v('UC-M pack CARSAT', 'osmoseur AT-S, adoucisseur BiBloc, paniers 500 x 500', pack('UC-M', '85000436')),
      v('UC-L pack CARSAT', 'osmoseur AT-S, adoucisseur BiBloc, passage 404 mm', pack('UC-L', '85000436')),
    ],
  },

  // =========================================================================
  // LAVE-VAISSELLE À CAPOT PT
  // =========================================================================
  {
    cle: 'ptm',
    doc: 'pt',
    type: 'machine',
    machines: ['lave-vaisselle'],
    ref: 'PT-M',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle à capot Winterhalter PT-M',
    resume: 'Le capot de la plonge de restaurant : jusqu’à 72 paniers à l’heure.',
    description:
      "Le lave-vaisselle à capot est la machine de la plonge : on fait glisser le panier depuis la table d'entrée, on baisse le capot, on le relève sur la table de sortie. Le PT-M, en 635 mm de large, convient en ligne comme en angle. Le prix comprend le câble, les flexibles d'arrivée et de vidange et un kit de paniers. Version EnergyPlus : récupération de chaleur des buées, pour une eau d'arrivée froide (< 20 °C). Version ClimatePlus : pompe à chaleur, qui récupère la chaleur et l'humidité et limite les buées dans la plonge.",
    usages: ['Restaurants', 'Brasseries', 'Hôtels', 'Restauration collective'],
    caracteristiques: [
      '635 x 750 mm, hauteur 1 535 mm capot fermé, 2 010 mm ouvert',
      'Paniers 500 x 500 mm, hauteur de passage 440 mm',
      'Jusqu’à 72 paniers/h en cycle court (verres : 77)',
      'Cuve de 35 L, 2,2 L d’eau de rinçage par cycle',
      'Programmes vaisselle, bistro, verres ou couverts : même prix',
      'Triphasé, de 7,1 à 11,5 kW selon le raccordement',
    ],
    attention: ATT_MACHINE,
    versions: [
      v('PT-M', 'version standard', T['PT-M']),
      v('PT-M EnergyPlus', 'récupération de chaleur, eau froide < 20 °C', T['PT-M EnergyPlus']),
      v('PT-M ClimatePlus', 'pompe à chaleur, buées réduites', T['PT-M ClimatePlus']),
    ],
  },
  {
    cle: 'ptl',
    doc: 'pt',
    type: 'machine',
    machines: ['lave-vaisselle'],
    ref: 'PT-L',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle à capot Winterhalter PT-L',
    resume: 'Le capot élargi, qui accepte aussi les paniers de 500 x 600.',
    description:
      "Le PT-L reprend le PT-M en 735 mm de large : il accepte les paniers de 500 x 600 mm, pour les grandes assiettes, les plateaux et les plaques. Mêmes versions EnergyPlus (récupération de chaleur) et ClimatePlus (pompe à chaleur). Câble, flexibles et kit de paniers compris.",
    usages: ['Restaurants à fort débit', 'Hôtels', 'Restauration collective', 'Traiteurs'],
    caracteristiques: [
      '735 x 750 mm, hauteur 1 535 mm capot fermé, 2 010 mm ouvert',
      'Paniers 500 x 500 ou 500 x 600 mm, hauteur de passage 440 mm',
      'Jusqu’à 72 paniers/h en cycle court',
      'Cuve de 35 L, 2,4 L d’eau de rinçage par cycle',
      'Programmes vaisselle, bistro, verres ou couverts : même prix',
    ],
    attention: ATT_MACHINE,
    versions: [
      v('PT-L', 'version standard', T['PT-L']),
      v('PT-L EnergyPlus', 'récupération de chaleur, eau froide < 20 °C', T['PT-L EnergyPlus']),
      v('PT-L ClimatePlus', 'pompe à chaleur, buées réduites', T['PT-L ClimatePlus']),
    ],
  },
  {
    cle: 'ptxl',
    doc: 'pt',
    type: 'machine',
    machines: ['lave-vaisselle'],
    ref: 'PT-XL',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle à capot Winterhalter PT-XL',
    resume: 'Le capot haut : 560 mm de passage, pour les plaques et les bacs.',
    description:
      "Le PT-XL offre 560 mm de hauteur de passage : plaques de pâtisserie, bacs, plateaux et grands contenants passent sans difficulté, à côté de la vaisselle courante. 735 mm de large, paniers de 500 x 500 ou 500 x 600 mm ; version EnergyPlus. Câble, flexibles et kit de paniers compris.",
    usages: ['Restauration collective', 'Boulangeries et pâtisseries', 'Traiteurs', 'Hôtels'],
    caracteristiques: [
      '735 x 750 mm, hauteur 1 655 mm capot fermé, 2 250 mm ouvert',
      'Paniers 500 x 500 ou 500 x 600 mm, hauteur de passage 560 mm',
      'Cuve de 35 L, 2,4 L d’eau de rinçage par cycle',
      'Programmes vaisselle, bistro, verres ou couverts : même prix',
    ],
    attention: ATT_MACHINE,
    versions: [
      v('PT-XL', 'version standard', T['PT-XL']),
      v('PT-XL EnergyPlus', 'récupération de chaleur, eau froide < 20 °C', T['PT-XL EnergyPlus']),
    ],
  },
  {
    cle: 'ptm',
    doc: 'pt',
    machines: ['lave-vaisselle'],
    ref: 'Options PT',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Options pour lave-vaisselle à capot Winterhalter PT',
    resume: 'Adoucisseur intégré, doseur, capot automatique : à commander avec la machine.',
    description:
      "Les options les plus demandées pour la gamme PT. L'adoucisseur intégré protège la machine et la vaisselle sur une eau calcaire ; le doseur de détergent intégré évite un doseur externe ; l'ouverture et la fermeture automatiques du capot soulagent le plongeur ; le surchauffeur renforcé de 10,8 kW maintient la cadence avec une alimentation en eau froide.",
    usages: ['Lave-vaisselle à capot PT-M, PT-L, PT-XL'],
    caracteristiques: [
      'Adoucisseur intégré : jusqu’à 30 °TH (20 °TH en EnergyPlus)',
      'Surchauffeur renforcé : non disponible en ClimatePlus',
    ],
    attention: ATT_OPT,
    versions: [
      v('PT-WAUF_10', 'adoucisseur intégré', T['PT-WAUF_10']),
      v('PT-D_05', 'doseur de détergent intégré', T['PT-D_05']),
      v('PT-H_10', 'ouverture et fermeture automatiques du capot', T['PT-H_10']),
      v('PT-B_67', 'surchauffeur renforcé 10,8 kW', T['PT-B_67']),
    ],
  },

  // =========================================================================
  // LAVE-USTENSILES UF ET GS 630
  // =========================================================================
  {
    cle: 'ufm',
    doc: 'uf',
    type: 'machine',
    machines: ['lave-batterie'],
    ref: 'UF-M',
    categorie: 'lave-ustensiles',
    nom: 'Lave-ustensiles Winterhalter UF-M',
    resume: 'Le lave-batterie compact : bacs, plaques et casseroles en 640 mm de passage.',
    description:
      "Le lave-ustensiles lave ce que le lave-vaisselle ne passe pas : bacs Gastronorm, plaques, casseroles, grilles, caisses. L'UF-M offre 640 mm de hauteur de passage, des programmes boulangerie, boucherie et universel, et une porte rabattable qui sert de plan de chargement. La version Energy récupère la chaleur des buées (eau d'arrivée < 20 °C). Câble, flexibles et dotation de paniers compris.",
    usages: ['Restaurants', 'Boulangeries', 'Boucheries et traiteurs', 'Cuisines de collectivité'],
    caracteristiques: [
      '775 x 870 mm, hauteur 1 720 mm (Energy : 1 910 mm)',
      'Hauteur de passage 640 mm, panier 612 x 672 mm',
      'Cuve de 69 L, 4,7 L d’eau de rinçage par cycle',
      'Programmes boulangerie, boucherie, universel',
      'Triphasé 400 V, de 9,4 à 16,4 kW selon l’alimentation en eau',
    ],
    attention: ATT_MACHINE,
    versions: [v('UF-M', 'version standard', T['UF-M']), v('UF-M Energy', 'condenseur récupérateur de buées', T['UF-M Energy'])],
  },
  {
    cle: 'ufl',
    doc: 'uf',
    type: 'machine',
    machines: ['lave-batterie'],
    ref: 'UF-L',
    categorie: 'lave-ustensiles',
    nom: 'Lave-ustensiles Winterhalter UF-L',
    resume: 'L’UF en version haute : 800 mm de passage pour les grands contenants.',
    description:
      "L'UF-L reprend l'UF-M avec 800 mm de hauteur de passage : grandes plaques, caisses, chariots de cuisson et bacs hauts y passent debout. Programmes boulangerie, boucherie et universel, version Energy à récupération de chaleur.",
    usages: ['Boulangeries industrielles', 'Boucheries', 'Restauration collective', 'Cuisines centrales'],
    caracteristiques: [
      '775 x 870 mm, hauteur 1 880 mm (Energy : 2 070 mm)',
      'Hauteur de passage 800 mm, panier 612 x 672 mm',
      'Cuve de 69 L, 4,7 L d’eau de rinçage par cycle',
      'Triphasé 400 V',
    ],
    attention: ATT_MACHINE,
    versions: [v('UF-L', 'version standard', T['UF-L']), v('UF-L Energy', 'condenseur récupérateur de buées', T['UF-L Energy'])],
  },
  {
    cle: 'ufxl',
    doc: 'uf',
    type: 'machine',
    machines: ['lave-batterie'],
    ref: 'UF-XL',
    categorie: 'lave-ustensiles',
    nom: 'Lave-ustensiles Winterhalter UF-XL',
    resume: 'Le lave-ustensiles double largeur : un panier de 1,30 m.',
    description:
      "L'UF-XL double la largeur de l'UF : un panier de 1 305 x 672 mm, deux pompes de lavage, une cuve de 138 L. Pour les cuisines centrales, les boulangeries et les ateliers qui lavent de grandes séries de plaques et de caisses. Version Energy à récupération de chaleur.",
    usages: ['Cuisines centrales', 'Boulangeries', 'Ateliers de transformation', 'Restauration collective'],
    caracteristiques: [
      '1 468 x 870 mm, hauteur 1 880 mm (Energy : 2 070 mm)',
      'Hauteur de passage 800 mm, panier 1 305 x 672 mm',
      'Cuve de 138 L, 7 L d’eau de rinçage par cycle',
      'Triphasé 400 V',
    ],
    attention: ATT_MACHINE,
    versions: [v('UF-XL', 'version standard', T['UF-XL']), v('UF-XL Energy', 'condenseur récupérateur de buées', T['UF-XL Energy'])],
  },
  {
    cle: 'ufm',
    doc: 'uf',
    machines: ['lave-batterie'],
    ref: 'Options UF',
    categorie: 'lave-ustensiles',
    nom: 'Options pour lave-ustensiles Winterhalter UF',
    resume: 'Pack performance et chariot à casiers pour la gamme UF.',
    description:
      "Le pack performance double la puissance de chauffe (cuve 10 kW, surchauffeur 16,4 kW) pour tenir la cadence avec une eau d'arrivée froide. Le chariot à casiers se charge à côté de la machine et s'y engage directement.",
    usages: ['Lave-ustensiles UF-M, UF-L, UF-XL'],
    caracteristiques: ['Pack performance : à commander avec la machine', 'Chariot : UF-M et UF-L (75004683) ou UF-XL (75004684)'],
    attention: ATT_OPT,
    versions: [
      v('UF-B_69', 'pack performance, résistances renforcées', T['UF-B_69']),
      v('75004683', 'chariot à casiers, UF-M et UF-L', T['75004683']),
      v('75004684', 'chariot à casiers, UF-XL', T['75004684']),
    ],
  },
  {
    cle: 'gs630',
    doc: 'gs',
    type: 'machine',
    machines: ['lave-batterie', 'lave-vaisselle'],
    ref: 'GS 630',
    categorie: 'lave-ustensiles',
    nom: 'Lave-ustensiles et lave-vaisselle Winterhalter GS 630',
    resume: 'Le combiné frontal : ustensiles et vaisselle, en 87 cm de large.',
    description:
      "Le GS 630 lave à la fois les ustensiles et la vaisselle, dans un format frontal de 870 mm de large et 820 mm de haut qui se glisse sous un plan de travail. Rampes de lavage fixes et oscillantes, filtration Mediamat, système Thermostop qui garantit la température de rinçage. Livré avec un panier à ustensiles et un panier fond plat ; version avec doseur de lavage intégré.",
    usages: ['Restaurants', 'Boulangeries et pâtisseries', 'Boucheries', 'Petites collectivités'],
    caracteristiques: [
      '870 x 600 mm, hauteur 820 à 835 mm',
      'Hauteur de passage 410 mm, panier 508 x 650 mm',
      'Cuve de 25 L, 4,4 L d’eau de rinçage par cycle',
      'Triphasé 400 V',
    ],
    attention: ATT_MACHINE,
    versions: [v('630V9999', 'version standard', T['630V9999']), v('630V0004', 'avec doseur de lavage intégré', T['630V0004'])],
  },

  // =========================================================================
  // TRAITEMENT DE L'EAU — posé seul, « package CARSAT »
  // =========================================================================
  {
    cle: 'mono',
    doc: 'eau',
    type: 'machine',
    machines: ['adoucisseur', 'lave-verres', 'lave-vaisselle'],
    ref: 'MonoMatik 3',
    categorie: 'traitement-eau-laverie',
    nom: 'Adoucisseur Winterhalter MonoMatik 3',
    resume: 'L’adoucisseur externe d’un lave-verres ou d’un lave-vaisselle.',
    description:
      "L'adoucisseur MonoMatik 3 retire le calcaire de l'eau avant la machine, pour une eau d'une dureté supérieure à 7 °TH : moins d'entartrage, moins de produit, des verres plus nets. Régénération volumétrique, déclenchée par le volume d'eau traitée. Il se pose à côté de la machine, ou en amont d'un osmoseur.",
    usages: ['Lave-verres et lave-vaisselle frontaux', 'Osmoseurs AT Excellence', 'Bars et restaurants'],
    caracteristiques: [
      'Eau d’alimentation jusqu’à 50 °C, pression dynamique 1,5 à 6 bar',
      'Bonbonne en fibre de verre, bac à sel',
      'Régénération volumétrique',
      'Disconnecteur (kit WSE) requis pour une pose conforme DIN',
    ],
    attention: ATT_EAU,
    versions: [v('20000826', 'MonoMatik 3', T['20000826'])],
  },
  {
    cle: 'duo',
    doc: 'eau',
    type: 'machine',
    machines: ['adoucisseur', 'lave-verres', 'lave-vaisselle'],
    ref: 'DuoMatik 3',
    categorie: 'traitement-eau-laverie',
    nom: 'Adoucisseur Winterhalter DuoMatik 3',
    resume: 'L’adoucisseur à deux bonbonnes : de l’eau douce même pendant la régénération.',
    description:
      "Le DuoMatik 3 travaille avec deux bonbonnes : pendant que l'une se régénère, l'autre continue de fournir de l'eau adoucie. C'est l'adoucisseur des machines qui tournent sans interruption — capots, lave-ustensiles, établissements ouverts tard. Régénération volumétrique, garantie deux ans.",
    usages: ['Lave-vaisselle à capot', 'Lave-ustensiles', 'Restaurants à fort débit'],
    caracteristiques: [
      'Deux bonbonnes : eau douce en continu',
      'Eau d’alimentation jusqu’à 50 °C, pression dynamique 2,5 à 6 bar',
      'Régénération volumétrique',
      'Disconnecteur (kit WSE) requis pour une pose conforme DIN',
    ],
    attention: ATT_EAU,
    versions: [v('20000932', 'DuoMatik 3', T['20000932'])],
  },
  {
    cle: 'bibloc',
    type: 'machine',
    machines: ['adoucisseur', 'lave-verres'],
    ref: 'BiBloc Compact',
    categorie: 'traitement-eau-laverie',
    nom: 'Adoucisseur Winterhalter BiBloc Compact',
    resume: 'L’adoucisseur compact à deux bonbonnes, en amont d’un lave-verres et de son osmoseur.',
    description:
      "Le BiBloc Compact est un adoucisseur à deux petites bonbonnes de résine (2 x 4,5 L), qui se régénère en 11 minutes. Son format étroit le loge sous un comptoir de bar, à côté du lave-verres ou en amont d'un osmoseur AT Excellence, qu'il protège du calcaire. C'est l'adoucisseur de notre pack CARSAT.",
    usages: ['Lave-verres frontaux', 'Osmoseurs AT Excellence', 'Bars et brasseries'],
    caracteristiques: [
      'Deux bonbonnes de 4,5 L de résine',
      'Régénération en 11 minutes',
      'Bac à sel de 8 kg',
      'Eau d’alimentation jusqu’à 35 °C, pression dynamique 1,5 à 6 bar',
    ],
    attention: ATT_EAU,
    versions: [v('20006716', 'BiBloc Compact', T['20006716'])],
  },
  {
    cle: 'ats',
    doc: 'eau',
    type: 'machine',
    machines: ['adoucisseur', 'lave-verres'],
    ref: 'AT Excellence',
    categorie: 'traitement-eau-laverie',
    nom: 'Osmoseur Winterhalter AT Excellence-S / AT Excellence-M',
    resume: 'L’osmoseur à poser à côté d’un lave-verres : des verres sans essuyage.',
    description:
      "L'osmoseur déminéralise l'eau de rinçage : sels, calcaire et silice restent dans la membrane, et les verres sèchent sans trace — plus besoin de les essuyer à la main. L'AT Excellence se raccorde à un lave-verres existant ; un adoucisseur en amont est obligatoire. Avec un lave-verres UC, c'est l'ensemble qui peut entrer dans le champ des aides à la prévention des risques professionnels : voir notre article sur le lave-verres avec osmoseur subventionné.",
    usages: ['Bars et bars à vin', 'Brasseries', 'Restaurants', 'Hôtels'],
    caracteristiques: [
      'AT Excellence-S : 90 L/h de perméat minimum, 205 x 505 x 420 mm',
      'AT Excellence-M : 180 L/h de perméat minimum, 365 x 505 x 420 mm',
      'Adoucisseur en amont obligatoire',
      'Support de filtre et filtre à sédiments inclus',
    ],
    attention: ATT_EAU,
    versions: [v('200V0001', 'AT Excellence-S, 90 L/h', T['200V0001']), v('201V0001', 'AT Excellence-M, 180 L/h', T['201V0001'])],

    encart: ENCART_PACK,
  },
  {
    cle: 'selfin',
    machines: ['lave-vaisselle', 'lave-verres', 'adoucisseur'],
    ref: 'Sel régénérant fin',
    categorie: 'traitement-eau',
    nom: 'Sel régénérant fin pour adoucisseur intégré Winterhalter',
    resume: 'Le sel en sachets de 500 g des machines à adoucisseur intégré.',
    description:
      "Le sel régénérant fin en sachets de 500 g, pour l'adoucisseur intégré des lave-verres et lave-vaisselle Winterhalter (versions « + adoucisseur », UC Excellence-iPlus, PT avec adoucisseur). Un sachet se verse directement dans le bac, sans risque d'en renverser dans la cuve.",
    usages: ['Machines Winterhalter à adoucisseur intégré'],
    caracteristiques: ['Carton de 24 sachets de 500 g (12 kg)'],
    attention: "Pour un adoucisseur externe (MonoMatik, DuoMatik), utilisez du sel en pastilles.",
    versions: [v('3305017', 'carton de 24 sachets de 500 g', T['3305017'])],
  },

  // =========================================================================
  // PRODUITS LESSIVIELS AJOUTÉS (les autres sont déjà dans produits.mjs)
  // =========================================================================
  {
    cle: 'f8700',
    machines: ['lave-vaisselle', 'lave-batterie'],
    ref: 'F8700',
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent universel eau dure F8700',
    resume: 'Le détergent fortement alcalin formulé pour les eaux dures.',
    description:
      "Détergent liquide fortement alcalin, à base de chlore actif, formulé pour les eaux dures : il garde son efficacité là où un détergent standard laisse un voile. Pour lave-vaisselle et lave-ustensiles.",
    usages: ['Lave-vaisselle et lave-ustensiles', 'Eaux dures'],
    caracteristiques: ['Liquide, fortement alcalin, chlore actif', 'Bidon de 12 kg ou de 25 kg'],
    attention: "Produit corrosif : à manipuler avec gants et lunettes, et à doser par le doseur de la machine.",
    versions: [v('20000217', 'bidon de 12 kg', T['20000217']), v('3301581', 'bidon de 25 kg', T['3301581'])],
  },
  {
    cle: 'b2s',
    machines: ['lave-verres', 'lave-vaisselle'],
    ref: 'B2S',
    categorie: 'liquides-de-rincage',
    nom: 'Liquide de rinçage acide B2S',
    resume: 'Le rinçage acide des lave-verres alimentés en eau osmosée.',
    description:
      "Liquide de rinçage acide, préconisé par Winterhalter pour le lavage des verres en eau osmosée (UC Excellence, lave-verres avec osmoseur). Il complète le détergent F30, F40 ou F420e.",
    usages: ['Lave-verres en eau osmosée', 'Bars à vin et caves'],
    caracteristiques: ['Liquide de rinçage acide', 'Bidon de 5 L (fabriqué sur commande) ou de 10 L'],
    attention: "Le bidon de 5 L est fabriqué sur commande, avec un délai d'environ huit semaines annoncé par Winterhalter.",
    versions: [v('20006492', 'bidon de 5 L, sur commande', T['20006492']), v('20000851', 'bidon de 10 L', T['20000851'])],
  },
  {
    cle: 'a70ls',
    machines: ['lave-vaisselle', 'lave-verres', 'lave-batterie'],
    ref: 'A70LS',
    categorie: 'entretien-machine-laverie',
    nom: 'Détartrant liquide A70LS',
    resume: 'Le détartrage de la cuve et du circuit des lave-vaisselle.',
    description:
      "Détartrant minéral à base d'acide phosphorique, pour éliminer le tartre de la cuve, des bras et du circuit des lave-vaisselle et lave-verres. Un détartrage régulier rend son efficacité au lavage et protège les résistances.",
    usages: ['Lave-vaisselle, lave-verres et lave-ustensiles'],
    caracteristiques: ['Liquide, acide phosphorique', 'Bidon de 5 L (fabriqué sur commande) ou de 12 kg'],
    attention: "Ne jamais mélanger avec un détergent chloré. Suivre la procédure de détartrage de la notice de la machine, puis rincer.",
    versions: [v('20000950', 'bidon de 5 L, sur commande', T['20000950']), v('20000523', 'bidon de 12 kg', T['20000523'])],
  },
];

// ---------------------------------------------------------------------------
// Prix publics des produits lessiviels Winterhalter déjà en ligne
// (data/produits.mjs) : libellé du conditionnement → n° d'article du tarif.
// A15MC n'y figure pas : les conditionnements affichés (sachets de 0,05 et
// 0,2 kg) ne correspondent pas à celui du tarif 2026 (boîte de 25 pastilles
// de 8 g) — à faire vérifier avant de fixer un prix.
// ---------------------------------------------------------------------------
export const articlesLessivielsWinterhalter = {
  F300: { 'Bidon de 5 L': '20006021', 'Bidon de 12 kg': '20006022', 'Bidon de 25 kg': '20006023' },
  F8500: { 'Bidon de 5 L': '20008202', 'Bidon de 12 kg': '20008203', 'Bidon de 25 kg': '20008204' },
  F420e: { 'Bidon de 5 L': '20004401', 'Bidon de 12 kg': '20004391', 'Bidon de 25 kg': '20004392' },
  F6800: { 'Bidon de 25 kg': '20000683' },
  F30: { 'Bidon de 5 L': '3301415', 'Bidon de 12 kg': '3301630' },
  F40: { 'Bidon de 12 kg': '20000620' },
  'F720 BLUe': { 'Bidon de 10 L': '20000590' },
  B100N: { 'Bidon de 5 L': '20000331', 'Bidon de 10 L': '20000513', 'Bidon de 20 L': '20000514' },
  B200S: { 'Bidon de 10 L': '20000377' },
  B220e: { 'Bidon de 5 L': '20004403', 'Bidon de 10 L': '20004393' },
  B170XD: { 'Bidon de 10 L': '20008124' },
};

/**
 * Donne leur prix public aux lessiviels Winterhalter de `produits`, et ajoute
 * les conditionnements du tarif qui manquent (B220e en 10 L). Un prix déjà
 * renseigné n'est jamais écrasé.
 */
export function appliquerTarifLessiviels(produits) {
  for (const p of produits) {
    const articles = p.marque === MARQUE ? articlesLessivielsWinterhalter[p.ref] : null;
    if (!articles) continue;
    for (const [label, article] of Object.entries(articles)) {
      let c = p.conditionnements.find((x) => x.label === label);
      if (!c) {
        c = { label, prix: null };
        p.conditionnements.push(c);
      }
      if (c.prix === null || c.prix === undefined) c.prix = T[article];
      c.refFabricant = article;
    }
  }
}

// ---------------------------------------------------------------------------
// Assemblage avec le tarif et les visuels
// ---------------------------------------------------------------------------

/** Les prix lus dans le tarif doivent tous exister (sinon NaN / undefined). */
export const versionsSansPrix = fiches.flatMap((f) => f.versions.filter((x) => !(x.prix > 0)).map((x) => x.ref));

// Adresses des fiches : écrites à la main, elles ne doivent plus changer une
// fois en ligne.
const SLUGS = {
  'UC-S': 'winterhalter-uc-s-lave-verres-frontal',
  'UC-M': 'winterhalter-uc-m-lave-verres-lave-vaisselle-frontal',
  'UC-L': 'winterhalter-uc-l-lave-vaisselle-frontal',
  'UC-XL': 'winterhalter-uc-xl-lave-vaisselle-frontal',
  'UC Excellence': 'winterhalter-uc-excellence-lave-verres-osmoseur-integre',
  'PT-M': 'winterhalter-pt-m-lave-vaisselle-a-capot',
  'PT-L': 'winterhalter-pt-l-lave-vaisselle-a-capot',
  'PT-XL': 'winterhalter-pt-xl-lave-vaisselle-a-capot',
  'Options PT': 'winterhalter-options-lave-vaisselle-a-capot-pt',
  'UF-M': 'winterhalter-uf-m-lave-ustensiles',
  'UF-L': 'winterhalter-uf-l-lave-ustensiles',
  'UF-XL': 'winterhalter-uf-xl-lave-ustensiles',
  'Options UF': 'winterhalter-options-lave-ustensiles-uf',
  'GS 630': 'winterhalter-gs-630-lave-ustensiles-lave-vaisselle',
  'MonoMatik 3': 'winterhalter-monomatik-3-adoucisseur',
  'DuoMatik 3': 'winterhalter-duomatik-3-adoucisseur',
  'BiBloc Compact': 'winterhalter-bibloc-compact-adoucisseur',
  'Pack CARSAT': 'winterhalter-pack-carsat-lave-verres-osmoseur-adoucisseur',
  'AT Excellence': 'winterhalter-at-excellence-osmoseur',
  'Sel régénérant fin': 'winterhalter-sel-regenerant-fin-sachets',
  F8700: 'winterhalter-f8700-detergent-universel-eau-dure',
  B2S: 'winterhalter-b2s-liquide-rincage-acide',
  A70LS: 'winterhalter-a70ls-detartrant-liquide',
};

export const produitsWinterhalter = fiches.map((f) => {
  const { cle, doc, versions, ...reste } = f;
  const brochure = doc ? BROCHURES[doc] : null;
  return {
    slug: SLUGS[f.ref],
    marque: MARQUE,
    creditVisuel: 'Winterhalter',
    photo: photosWinterhalter[cle] ?? null,
    usages: [],
    // Options, consommables ajoutés : commandés chez Winterhalter.
    ...(f.type === 'machine' ? {} : { surCommande: true }),
    ...reste,
    conditionnements: versions.map((x) => ({
      label: `${x.ref} · ${x.court}`,
      refFabricant: x.ref,
      prix: x.prix,
      ...(brochure ? { ficheFabricant: brochure.url, ficheTitre: brochure.titre } : {}),
    })),
  };
});
