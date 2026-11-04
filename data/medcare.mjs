// ---------------------------------------------------------------------------
// INFRICO MEDCARE — froid médical, sous-famille du rayon Froid
//
// Ajouté le 04/11/2026 à partir de la plaquette « Froid médical » SODILAME
// (v7) : ses sept familles, toutes tailles, portes pleines et vitrées.
// Même méthode que les autres marques : ce fichier est écrit à la main (choix
// des modèles, fiches, textes) ; le PRIX vient du tarif Infrico Medcare,
// lu dans `medcare-tarif.mjs`, généré par :
//
//     python3 outils/medcare-tarif.py "MEDCARE PRICELIST 2026 FRANCIA.xlsx"
//
// Photos : site public infricomedcare.com (`medcare-visuels.mjs`, généré par
// outils/medcare-visuels.py). Fiches techniques : PDF Infrico, bilingues
// espagnol / anglais (infricodocuments.com/medcare/ficha-tecnica/).
//
// ⚠️  PRIX AFFICHÉ = PRIX PUBLIC CONSEILLÉ INFRICO MEDCARE, HT (PVP 2026),
//     comme sur la plaquette. La remise SODILAME n'apparaît nulle part.
//     Tarif France « Ex Works » : le transport Infrico n'est pas compris ; il
//     est couvert par notre forfait de livraison et d'installation.
//
// ⚠️  DÉCISIONS de la direction (04/11/2026) : les 7 familles de la
//     plaquette ; forfait d'installation selon la grille du froid (1 porte
//     150 €, 2 portes 250 € HT) ; seule option vendue en ligne : les
//     dataloggers WiFi / Bluetooth. Le reste des options (batterie, sondes,
//     certification 9 points, roulettes…) est sur devis.
//
// ⚠️  LTF80SD retiré : le tarif 2026 lui donne le même prix que la LTF43SD
//     (2 832 € HT), moins cher que la LTF65SD — erreur probable du fichier,
//     à faire confirmer par Infrico avant de l'afficher.
// ---------------------------------------------------------------------------
import { tarifMedcare } from './medcare-tarif.mjs';
// Visuels : décision de la direction du 30/10/2026, sous sa responsabilité.
import { photosMedcare } from './medcare-visuels.mjs';

const ATT_MED =
  "Ces enceintes sont données pour une ambiance de 30 °C au plus (classe climatique 4). Une officine ou un laboratoire non climatisé dépasse cette température l'été en Provence : l'enceinte doit être posée dans un local tempéré, à l'écart du soleil et d'une source de chaleur, avec de l'air autour du groupe. Nous vérifions l'emplacement, la prise et le passage des portes avant la livraison. La qualification de l'enceinte (cartographie des températures) se chiffre à part : parlons-en avant la commande.";
const ATT_ULT =
  "Une ultra-basse température rejette beaucoup de chaleur et pèse lourd (jusqu'à 300 kg) : il lui faut un local tempéré (30 °C au plus), ventilé, un sol qui la porte et une prise dédiée. Nous faisons un relevé sur site avant la commande, et nous vous conseillons sur le secours (batterie, CO₂, report d'alarme).";

const DIGITAL = 'Contrôleur Digital : alarmes visuelles et sonores (température, porte ouverte, défaut de sonde)';
const PLUS =
  'Contrôleur Digital Plus à écran tactile 5" : enregistrement des températures et des alarmes, export USB, port RS485 Modbus';
const CLIM = 'Classe climatique 4 : ambiance jusqu’à 30 °C';
const ALIM = 'Alimentation 230 V monophasé';

/** Libellé de version : référence, volume, porte. */
const PORTE = { S: 'porte pleine', G: 'porte vitrée', SD: 'porte pleine', GD: 'porte vitrée', IS: 'porte pleine, Inverter', IG: 'porte vitrée, Inverter' };
const porteDe = (ref) => {
  const m = ref.match(/(IS|IG|SD|GD|S|G)$/);
  return m ? PORTE[m[1]] : null;
};

/**
 * Les fiches. Champs propres à ce fichier :
 *   cle      : clé de la photo (medcare-visuels.mjs).
 *   versions : références EXACTES du tarif ; le libellé est composé à partir
 *              du volume du tarif et du type de porte (suffixe de la réf.).
 *   niveaux  : 'clayettes' ou 'tiroirs' (ce que le tarif compte).
 *   court    : libellé imposé pour une référence (sinon composé).
 */
const fiches = [
  // =========================================================================
  // PHARMACIE
  // =========================================================================
  {
    cle: 'per',
    type: 'machine',
    ref: 'PER',
    nom: 'Armoire de pharmacie Infrico Medcare Pharma Care PER, +2 / +8 °C',
    resume: 'L’armoire à vaccins et médicaments de l’officine et du cabinet, de 70 à 376 litres.',
    description:
      "L'armoire de pharmacie standard : une enceinte dédiée aux produits de santé conservés entre +2 et +8 °C — vaccins, insulines, collyres, biothérapies. Elle est conçue selon les normes DIN 58345 et 13277 : régulation électronique, sécurité antigel qui bloque le froid sous +2 °C, alarmes visuelles et sonores, batterie qui maintient les alarmes et l'enregistrement en cas de coupure, serrure et capteur de porte. Cinq tailles, du modèle sous comptoir à l'armoire haute, en porte pleine ou vitrée.",
    usages: ['Pharmacies d’officine', 'Cabinets médicaux et infirmiers', 'Cliniques vétérinaires', 'EHPAD — stock de soins'],
    caracteristiques: [
      'De +2 à +8 °C, sécurité antigel',
      'De 70 à 376 L, 2 à 6 clayettes inox AISI 304 fournies',
      'Conçue selon DIN 58345 et DIN 13277',
      DIGITAL,
      'Batterie de maintien des alarmes et de l’enregistrement, serrure, capteur de porte',
      'Intérieur inox AISI 430, éclairage LED, fluide R600a',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'clayettes',
    versions: ['PER08S', 'PER08G', 'PER16S', 'PER16G', 'PER24S', 'PER24G', 'PER28S', 'PER28G', 'PER37S', 'PER37G'],
  },
  {
    cle: 'ptr',
    type: 'machine',
    ref: 'PTR',
    nom: 'Armoire de pharmacie Infrico Medcare Pharma Care Plus PTR, Inverter',
    resume: 'L’armoire des grands stocks de santé, avec l’enregistrement des températures intégré.',
    description:
      "La gamme haute de l'armoire de pharmacie : un compresseur Inverter qui tient la température plus stable et plus silencieusement, des tiroirs inox pour ranger le stock par lot, et surtout le contrôleur Digital Plus à écran tactile, qui enregistre les températures et les alarmes et les exporte par clé USB. Le relevé réglementaire est dans la machine. Conçue selon la norme DIN 58345, de 251 à 737 litres en une porte, pleine ou vitrée.",
    usages: ['Grandes officines', 'Pharmacies à usage intérieur', 'Centres de vaccination', 'EHPAD et cliniques'],
    caracteristiques: [
      'De +2 à +8 °C, sécurité antigel',
      'De 251 à 737 L, 4 à 7 tiroirs inox fournis',
      'Compresseur Inverter',
      'Conçue selon DIN 58345',
      PLUS,
      'Batterie de maintien des alarmes et de l’enregistrement',
      'Intérieur inox AISI 304, éclairage LED',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'tiroirs',
    versions: ['PTR25IS', 'PTR25IG', 'PTR40IS', 'PTR40IG', 'PTR65IS', 'PTR65IG', 'PTR80IS', 'PTR80IG'],
  },
  {
    cle: 'ptr130',
    type: 'machine',
    ref: 'PTR130',
    nom: 'Armoire de pharmacie 2 portes Infrico Medcare PTR 130, Inverter',
    resume: 'La Pharma Care Plus en deux portes : plus de 1 100 litres et 14 tiroirs.',
    description:
      "La plus grande armoire de pharmacie Infrico Medcare : deux portes, quatorze tiroirs inox, compresseur Inverter et contrôleur Digital Plus qui enregistre températures et alarmes. Pour la pharmacie à usage intérieur d'un établissement ou un centre de vaccination, là où le stock ne tient plus dans une porte.",
    usages: ['Pharmacies à usage intérieur', 'Centres de vaccination', 'Grandes officines'],
    caracteristiques: [
      'De +2 à +8 °C, sécurité antigel',
      '1 166 L (portes pleines) ou 1 202 L (portes vitrées), 14 tiroirs inox fournis',
      'Compresseur Inverter',
      'Conçue selon DIN 58345',
      PLUS,
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'tiroirs',
    versions: ['PTR130IS', 'PTR130IG'],
  },

  // =========================================================================
  // LABORATOIRE — RÉFRIGÉRATION
  // =========================================================================
  {
    cle: 'ler',
    type: 'machine',
    ref: 'LER',
    nom: 'Réfrigérateur de laboratoire Infrico Medcare Lab Care LER',
    resume: 'Le réfrigérateur de laboratoire, du sous-paillasse à 507 litres.',
    description:
      "Le réfrigérateur de laboratoire pour les échantillons, les réactifs et les milieux de culture conservés entre +2 et +8 °C. Régulation électronique, alarmes, intérieur inox à angles arrondis qui se nettoie facilement, éclairage LED. Du modèle sous paillasse de 70 litres à l'armoire haute, en porte pleine ou vitrée ; la LER 60, tout inox, reçoit cinq grilles.",
    usages: ['Laboratoires d’analyses médicales', 'Laboratoires vétérinaires', 'Recherche et enseignement', 'Laboratoires de l’agroalimentaire'],
    caracteristiques: [
      'De +2 à +8 °C',
      'De 70 à 507 L, 2 à 6 clayettes ou grilles fournies',
      DIGITAL,
      'Intérieur inox à angles arrondis, éclairage LED',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'clayettes',
    versions: ['LER08S', 'LER08G', 'LER16S', 'LER16G', 'LER24S', 'LER24G', 'LER28S', 'LER28G', 'LER37S', 'LER37G', 'LER60S'],
    court: { LER60S: '507 L, tout inox, porte pleine' },
  },
  {
    cle: 'ltr',
    type: 'machine',
    ref: 'LTR',
    nom: 'Armoire réfrigérée de laboratoire Infrico Medcare Lab Care LTR',
    resume: 'L’armoire haute de laboratoire, de 251 à 737 litres, porte pleine ou vitrée.',
    description:
      "L'armoire réfrigérée de laboratoire en format haut : de 251 à 737 litres en une porte, intérieur inox, sept clayettes inox sur les plus grandes. Régulation électronique et alarmes, éclairage LED, porte pleine pour le stockage ou vitrée pour voir le contenu sans ouvrir.",
    usages: ['Laboratoires d’analyses médicales', 'Laboratoires vétérinaires', 'Recherche', 'Plateaux techniques hospitaliers'],
    caracteristiques: [
      'De +2 à +8 °C',
      'De 251 à 737 L, 4 à 7 clayettes inox fournies',
      DIGITAL,
      'Intérieur inox, éclairage LED',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'clayettes',
    versions: ['LTR25SD', 'LTR25GD', 'LTR40SD', 'LTR40GD', 'LTR65SD', 'LTR65GD', 'LTR80SD', 'LTR80GD'],
  },
  {
    cle: 'ltr130',
    type: 'machine',
    ref: 'LTR130',
    nom: 'Armoire réfrigérée de laboratoire 2 portes Infrico Medcare LTR 130',
    resume: 'L’armoire de laboratoire deux portes, plus de 1 100 litres.',
    description:
      "L'armoire réfrigérée de laboratoire en deux portes, pour les gros volumes de réactifs ou d'échantillons : quatorze clayettes inox AISI 304, intérieur inox, régulation électronique et alarmes.",
    usages: ['Laboratoires d’analyses médicales', 'Recherche', 'Plateaux techniques hospitaliers'],
    caracteristiques: [
      'De +2 à +8 °C',
      '1 166 L (portes pleines) ou 1 202 L (portes vitrées), 14 clayettes inox fournies',
      DIGITAL,
      'Intérieur inox AISI 304, éclairage LED',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'clayettes',
    versions: ['LTR130SD', 'LTR130GD'],
  },

  // =========================================================================
  // LABORATOIRE — CONGÉLATION
  // =========================================================================
  {
    cle: 'lef',
    type: 'machine',
    ref: 'LEF',
    nom: 'Congélateur de laboratoire Infrico Medcare Lab Care LEF, −10 / −22 °C',
    resume: 'Le congélateur de laboratoire, de 141 à 591 litres.',
    description:
      "Le congélateur vertical de laboratoire pour les souches, prélèvements et réactifs conservés entre −10 et −22 °C. Régulation électronique et alarmes, éclairage LED. La LEF 60, à froid statique, descend à −25 °C et reçoit six grilles.",
    usages: ['Laboratoires d’analyses médicales', 'Laboratoires vétérinaires', 'Recherche'],
    caracteristiques: [
      'De −10 à −22 °C (LEF 60 : −10 à −25 °C)',
      'De 141 à 591 L, 3 à 6 clayettes ou grilles fournies',
      DIGITAL,
      'Éclairage LED',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'clayettes',
    versions: ['LEF16S', 'LEF24S', 'LEF28S', 'LEF37S', 'LEF60S'],
    court: { LEF60S: '591 L, froid statique, porte pleine' },
  },
  {
    cle: 'ltf',
    type: 'machine',
    ref: 'LTF',
    nom: 'Armoire de congélation de laboratoire Infrico Medcare Lab Care LTF, −10 / −25 °C',
    resume: 'L’armoire de congélation haute, avec dégivrage automatique, de 242 à 719 litres.',
    description:
      "L'armoire de congélation de laboratoire en format haut, entre −10 et −25 °C. Deux niveaux d'équipement : SD, avec contrôleur Digital ; IS, avec compresseur Inverter, contrôleur Digital Plus qui enregistre les températures, intérieur inox AISI 304 et dégivrage automatique par gaz chaud. La LTF 43, à froid statique, reçoit cinq grilles.",
    usages: ['Laboratoires d’analyses médicales', 'Laboratoires vétérinaires', 'Recherche', 'Établissements de santé'],
    caracteristiques: [
      'De −10 à −25 °C',
      'De 242 à 719 L, 4 à 7 clayettes fournies',
      'Versions IS : compresseur Inverter, contrôleur Digital Plus, dégivrage par gaz chaud',
      'Versions SD : contrôleur Digital',
      'Fluide R290, éclairage LED',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'clayettes',
    versions: ['LTF25SD', 'LTF25IS', 'LTF40SD', 'LTF40IS', 'LTF43SD', 'LTF65SD', 'LTF65IS', 'LTF65GD', 'LTF80IS'],
    court: { LTF43SD: '470 L, froid statique, porte pleine' },
  },
  {
    cle: 'ltf130',
    type: 'machine',
    ref: 'LTF130',
    nom: 'Armoire de congélation de laboratoire 2 portes Infrico Medcare LTF 130',
    resume: 'La congélation de laboratoire en deux portes : 1 165 litres.',
    description:
      "L'armoire de congélation de laboratoire en deux portes, entre −10 et −25 °C, avec quatorze clayettes. Version SD avec contrôleur Digital, ou IS avec compresseur Inverter et contrôleur Digital Plus qui enregistre les températures.",
    usages: ['Laboratoires d’analyses médicales', 'Recherche', 'Établissements de santé'],
    caracteristiques: [
      'De −10 à −25 °C',
      '1 165 L, 14 clayettes fournies',
      'Version IS : compresseur Inverter, contrôleur Digital Plus',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'clayettes',
    versions: ['LTF130SD', 'LTF130IS'],
  },
  {
    cle: 'mixte',
    type: 'machine',
    ref: 'LERF / LTRF',
    nom: 'Armoire mixte réfrigération et congélation Infrico Medcare LERF / LTRF',
    resume: 'Le froid positif et la congélation dans un seul meuble, pour les petits plateaux techniques.',
    description:
      "Deux compartiments indépendants dans un même meuble : un réfrigérateur entre +2 et +8 °C et un congélateur entre −10 et −22 °C (LERF 40) ou −25 °C (LTRF 130). La solution des petits laboratoires et des cabinets qui ont besoin des deux sans la place pour deux armoires. Chaque compartiment a sa porte et sa régulation.",
    usages: ['Petits laboratoires', 'Cabinets et centres de santé', 'Cliniques vétérinaires'],
    caracteristiques: [
      'Compartiment réfrigéré +2 / +8 °C et compartiment congélateur',
      'LERF 40 : 238 L + 140 L, 2 portes superposées, hauteur 2 043 mm',
      'LTRF 130 : 506 L + 506 L, 2 portes côte à côte, dégivrage automatique',
      'Régulation électronique par compartiment, éclairage LED',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'clayettes',
    versions: ['LERF40S', 'LTRF130SD'],
    court: { LERF40S: '238 L + 140 L, portes superposées', LTRF130SD: '506 L + 506 L, portes côte à côte' },
  },

  // =========================================================================
  // SANG ET PLASMA
  // =========================================================================
  {
    cle: 'bbmd',
    type: 'machine',
    ref: 'BBMD',
    nom: 'Réfrigérateur de banque de sang Infrico Medcare Health Care BBMD, +2 / +6 °C',
    resume: 'Le réfrigérateur des poches de sang, conçu selon DIN 58371, de 191 à 737 litres.',
    description:
      "Le réfrigérateur de dépôt de sang, entre +2 et +6 °C, conçu selon la norme DIN 58371. Les poches se rangent dans des tiroirs extractibles ; une double sonde mesure la température simulée du produit et celle de l'air. Contrôleur Digital Plus à écran tactile qui enregistre températures et alarmes, contact sec pour reporter l'alarme vers une télésurveillance ou la GTC de l'établissement.",
    usages: ['Dépôts de sang', 'Établissements de transfusion', 'Cliniques et hôpitaux'],
    caracteristiques: [
      'De +2 à +6 °C',
      'De 191 à 737 L, 3 à 6 tiroirs fournis',
      'Conçu selon DIN 58371',
      'Double sonde PT1000 : produit simulé et air',
      PLUS,
      'Contact sec de report d’alarme',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'tiroirs',
    versions: ['BBMD17', 'BBMD25', 'BBMD40', 'BBMD65', 'BBMD80'],
  },
  {
    cle: 'bbmd130',
    type: 'machine',
    ref: 'BBMD130',
    nom: 'Réfrigérateur de banque de sang 2 portes Infrico Medcare BBMD 130',
    resume: 'La banque de sang en deux portes : 1 202 litres et 12 tiroirs.',
    description:
      "Le réfrigérateur de banque de sang en deux portes vitrées, entre +2 et +6 °C, conçu selon la norme DIN 58371 : douze tiroirs, double sonde produit et air, contrôleur Digital Plus et contact sec de report d'alarme.",
    usages: ['Établissements de transfusion', 'Hôpitaux'],
    caracteristiques: [
      'De +2 à +6 °C',
      '1 202 L, 12 tiroirs fournis',
      'Conçu selon DIN 58371',
      PLUS,
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'tiroirs',
    versions: ['BBMD130'],
    court: { BBMD130: '1 202 L, 2 portes vitrées, 12 tiroirs' },
  },
  {
    cle: 'pfmd',
    type: 'machine',
    ref: 'PFMD',
    nom: 'Congélateur de plasma Infrico Medcare Health Care PFMD, −30 / −40 °C',
    resume: 'La conservation du plasma frais congelé, de 242 à 719 litres.',
    description:
      "Le congélateur de plasma, entre −30 et −40 °C, pour la conservation du plasma frais congelé. Tiroirs inox derrière des portes intérieures qui limitent la remontée en température à l'ouverture, sonde de simulation produit, contrôleur Digital Plus qui enregistre températures et alarmes, batterie de maintien des alarmes et dégivrage automatique par gaz chaud.",
    usages: ['Établissements de transfusion', 'Dépôts de délivrance', 'Hôpitaux'],
    caracteristiques: [
      'De −30 à −40 °C',
      'De 242 à 719 L, 4 à 6 tiroirs inox fournis',
      'Portes intérieures, sonde de simulation produit',
      PLUS,
      'Dégivrage automatique par gaz chaud, fluide R290',
      CLIM,
      ALIM,
    ],
    attention: ATT_MED,
    niveaux: 'tiroirs',
    versions: ['PFMD25S', 'PFMD40S', 'PFMD65S', 'PFMD80S'],
  },

  // =========================================================================
  // ULTRA-BASSE TEMPÉRATURE
  // =========================================================================
  {
    cle: 'ult',
    type: 'machine',
    ref: 'ULT',
    nom: 'Congélateur ultra-basse température Infrico Medcare ULT, −86 °C',
    resume: 'L’ultra-congélateur vertical des biobanques et de la recherche, de 125 à 821 litres.',
    description:
      "L'ultra-congélateur vertical, réglable de −40 à −86 °C. Deux circuits frigorifiques en cascade, isolation de 120 mm renforcée de panneaux sous vide, portes intérieures qui gardent le froid à l'ouverture, contrôleur Digital Plus à écran tactile qui enregistre températures et alarmes, avec batterie. Pour les biobanques, la recherche et les vaccins qui exigent l'ultra-basse température.",
    usages: ['Biobanques', 'Recherche', 'Hôpitaux', 'Conservation de vaccins à ultra-basse température'],
    caracteristiques: [
      'De −40 à −86 °C',
      'De 125 à 821 L',
      'Double circuit frigorifique en cascade',
      'Isolation 120 mm et panneaux sous vide, portes intérieures',
      PLUS,
      'Garantie fabricant 5 ans sur le compresseur',
      CLIM,
      ALIM,
    ],
    attention: ATT_ULT,
    niveaux: 'clayettes',
    versions: ['ULT11086', 'ULT40086', 'ULT50086', 'ULT70086', 'ULT80086'],
  },
  {
    cle: 'ultp',
    type: 'machine',
    ref: 'ULTP',
    nom: 'Mini ultra-congélateur de paillasse Infrico Medcare ULTP, −86 °C',
    resume: 'L’ultra-basse température en 36 litres, posée sur une paillasse.',
    description:
      "Un ultra-congélateur de 36 litres, de −40 à −86 °C, assez compact pour se poser sur une paillasse : la solution quand quelques racks seulement demandent l'ultra-basse température. Double circuit frigorifique, isolation renforcée de panneaux sous vide, contrôleur Digital Plus à écran tactile avec enregistrement et batterie, port USB et RS485 Modbus.",
    usages: ['Laboratoires', 'Recherche', 'Pharmacies hospitalières'],
    caracteristiques: [
      'De −40 à −86 °C',
      '36 L ; 750 x 815 x 590 mm',
      'Double circuit frigorifique, panneaux sous vide',
      PLUS,
      'Garantie fabricant 5 ans sur le compresseur',
      CLIM,
      ALIM,
    ],
    attention: ATT_ULT,
    niveaux: 'clayettes',
    versions: ['ULTP'],
    court: { ULTP: '36 L, modèle de paillasse' },
  },

  // =========================================================================
  // OPTION VENDUE EN LIGNE (décision du 04/11/2026)
  // =========================================================================
  {
    ref: 'Datalogger',
    nom: 'Datalogger WiFi ou Bluetooth pour enceinte Infrico Medcare',
    resume: 'Le relevé des températures envoyé à distance, sans ouvrir l’armoire.',
    description:
      "Le datalogger enregistre les températures de l'enceinte et les transmet par WiFi ou Bluetooth : le relevé quotidien se consulte à distance et s'archive sans cahier. Il se choisit selon le contrôleur de l'armoire — Digital ou Digital Plus. Nous le posons et le paramétrons avec l'enceinte.",
    usages: ['Armoires Infrico Medcare'],
    caracteristiques: [
      '308X149 : WiFi, pour contrôleur Digital (PER, LER, LEF, LTF SD)',
      '308X150 : WiFi, pour contrôleur Digital Plus (PTR, LTF IS, BBMD, PFMD, ULT)',
      '308X130 : Bluetooth, pour contrôleur Digital',
    ],
    attention:
      "Commandé chez Infrico avec l'enceinte, ou après coup : donnez-nous la référence de votre armoire, nous vérifions la compatibilité avec son contrôleur.",
    versions: ['308X149', '308X150', '308X130'],
    court: { '308X149': 'WiFi, contrôleur Digital', '308X150': 'WiFi, contrôleur Digital Plus', '308X130': 'Bluetooth, contrôleur Digital' },
  },
];

// ---------------------------------------------------------------------------
// Assemblage avec le tarif et les visuels
// ---------------------------------------------------------------------------

/** Toutes les références du tarif utilisées ici — lu par le générateur. */
export const refsMedcare = fiches.flatMap((f) => f.versions);

/** Les références introuvables dans le tarif généré (doit rester vide). */
export const refsMedcareManquantes = refsMedcare.filter((r) => !tarifMedcare[r]);

const fmt = (n) => Number(String(n).replace(/\s/g, '')).toLocaleString('fr-FR');

function libelle(f, ref) {
  if (f.court?.[ref]) return `${ref} · ${f.court[ref]}`;
  const t = tarifMedcare[ref] || {};
  const porte = porteDe(ref);
  return `${ref} · ${fmt(t.volume)} L${porte ? `, ${porte}` : ''}`;
}

// Adresses des fiches : écrites à la main, elles ne doivent plus changer une
// fois en ligne.
const SLUGS = {
  PER: 'infrico-medcare-per-armoire-pharmacie',
  PTR: 'infrico-medcare-ptr-armoire-pharmacie-inverter',
  PTR130: 'infrico-medcare-ptr-130-armoire-pharmacie-2-portes',
  LER: 'infrico-medcare-ler-refrigerateur-laboratoire',
  LTR: 'infrico-medcare-ltr-armoire-refrigeree-laboratoire',
  LTR130: 'infrico-medcare-ltr-130-armoire-laboratoire-2-portes',
  LEF: 'infrico-medcare-lef-congelateur-laboratoire',
  LTF: 'infrico-medcare-ltf-armoire-congelation-laboratoire',
  LTF130: 'infrico-medcare-ltf-130-congelation-laboratoire-2-portes',
  'LERF / LTRF': 'infrico-medcare-armoire-mixte-refrigeration-congelation',
  BBMD: 'infrico-medcare-bbmd-refrigerateur-banque-de-sang',
  BBMD130: 'infrico-medcare-bbmd-130-banque-de-sang-2-portes',
  PFMD: 'infrico-medcare-pfmd-congelateur-plasma',
  ULT: 'infrico-medcare-ult-congelateur-ultra-basse-temperature',
  ULTP: 'infrico-medcare-ultp-mini-ultra-congelateur-paillasse',
  Datalogger: 'infrico-medcare-datalogger-wifi-bluetooth',
};

const DOCS = 'https://infricodocuments.com/medcare/ficha-tecnica/';

export const produitsMedcare = fiches.map((f) => {
  const { cle, versions, court, niveaux, ...reste } = f;
  return {
    slug: SLUGS[f.ref],
    marque: 'Infrico',
    categorie: 'froid-medical',
    machines: ['froid-medical'],
    creditVisuel: 'Infrico Medcare',
    photo: cle ? photosMedcare[cle] ?? null : null,
    usages: [],
    // Option : commandée chez Infrico, pas en stock chez nous.
    ...(f.type === 'machine' ? {} : { surCommande: true }),
    ...reste,
    conditionnements: versions.map((ref) => {
      const t = tarifMedcare[ref] || {};
      return {
        label: libelle(f, ref),
        refFabricant: ref,
        prix: typeof t.prix === 'number' ? t.prix : null,
        // Fiche technique Infrico, bilingue espagnol / anglais.
        ...(f.type === 'machine' ? { ficheFabricant: `${DOCS}${ref}.pdf`, ficheTitre: `Fiche technique ${ref} (espagnol / anglais)` } : {}),
      };
    }),
  };
});
