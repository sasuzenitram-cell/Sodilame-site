// ---------------------------------------------------------------------------
// FOSTER — sélection « 20/80 » de la boutique
//
// Même méthode que Miele et RATIONAL (voir miele.mjs et rational.mjs). Ce
// fichier est écrit à la main : il choisit les modèles, les regroupe en fiches
// et porte les textes. Le PRIX vient du tarif FOSTER, lu dans
// `foster-tarif.mjs`, généré par :
//
//     node outils/foster-tarif.mjs <1_Import_Produits_FOSTER_….csv> <2_….csv>
//
// Les photos et les liens vers les documents Foster (fiche technique, brochure
// de gamme, étiquette énergie) viennent du site public du fabricant
// (`foster-visuels.mjs`, généré par outils/foster-visuels.py) : Foster n'a pas
// de portail revendeur.
//
// ⚠️  PRIX AFFICHÉ = PRIX PUBLIC FOSTER, HT (tarif 2026, version du 16/09),
//     choix de la direction du 30/10/2026. Le prix d'achat SODILAME n'est
//     JAMAIS lu par le générateur et ne doit jamais apparaître dans ce dépôt.
//
// ⚠️  SÉLECTION de la direction (30/10/2026) : armoires EcoPro G3 (1 et
//     2 portes, bi-température), meubles bas EcoPro G3, saladettes FPS,
//     meubles bas compacts HR/LR, armoires à chariots Evologi (collectivités),
//     cellules mixtes Evologi ED15 à ED60, et leurs grilles et glissières. Hors
//     sélection, sur devis : gamme Xtra (retirée par la direction), versions
//     sans groupe, Slimline, pâtisserie TP, FlexDrawer, vitrines Multideck et
//     EcoShow, grandes cellules et le reste du tarif (620 références).
//
// ⚠️  ÉTIQUETTE ÉNERGIE : les armoires et meubles bas de stockage réfrigérés
//     professionnels portent une étiquette énergie européenne. Chaque version
//     qui en a une renvoie vers celle publiée par Foster, et sa classe est
//     rappelée dans les caractéristiques.
//
// Chaque fiche regroupe les VERSIONS d'un même modèle (finition, porte
// pleine ou vitrée, accès simple ou traversant). Une version = un
// « conditionnement » au sens du panier : son libellé commence toujours par la
// référence FOSTER exacte, c'est elle qui sert à la commande chez Foster.
// ---------------------------------------------------------------------------
import { tarifFoster } from './foster-tarif.mjs';
// Visuels du site Foster : décision de la direction du 30/10/2026, sous sa
// responsabilité (voir foster-visuels.mjs).
import { visuelsFoster } from './foster-visuels.mjs';

const MARQUE = 'Foster';

// Vocabulaire du tarif, expliqué une fois pour toutes.
const ALU = 'intérieur alu, extérieur inox';
const INOX = 'tout inox';
const FINITION =
  "Deux finitions : intérieur aluminium et extérieur inox, ou tout inox. L'intérieur inox se nettoie plus facilement et résiste mieux aux chocs et aux produits acides — c'est celui que nous conseillons en cuisine de production.";
const ATT_ARMOIRE =
  "Une armoire réfrigérée rejette la chaleur qu'elle retire : il lui faut de l'air autour d'elle, et elle doit pouvoir passer les portes jusqu'à son emplacement. Nous vérifions l'accès, la prise électrique dédiée et la ventilation du local avant la livraison.";
const ATT_VITREE =
  "Les versions à porte vitrée sont faites pour la salle ou le comptoir : elles sont données pour une ambiance jusqu'à 25 °C (classe climatique 3), contre 40 °C pour les portes pleines. En cuisine chaude, choisissez une porte pleine.";
const ATT_TABLE =
  "Un meuble bas réfrigéré aspire et rejette l'air par sa face avant : il s'installe contre un mur ou dos à dos, mais jamais devant une source de chaleur — fourneau, friteuse ou lave-vaisselle. Nous vérifions l'emplacement et la prise électrique avant la livraison.";
const ATT_CHARIOT =
  "Une armoire à chariots est un équipement d'installation : elle arrive sans pieds, se pose de niveau sur un sol plan et doit passer les portes jusqu'à son emplacement. Les dimensions de vos chariots, le passage et l'alimentation se vérifient au relevé, avant la commande.";
const ATT_CELLULE =
  "Une cellule de refroidissement travaille fort pendant le cycle : elle demande une prise dédiée et de l'air autour de son groupe. Les grilles et bacs ne sont pas fournis : prévoyez les vôtres (GN 1/1 ou 600 x 400 mm), ou demandez-les nous avec la cellule.";
const ATT_ACC =
  'Les grilles et glissières sont propres à chaque gamme. Donnez-nous la référence de votre appareil, ou une photo de sa plaque signalétique : nous vérifions la compatibilité avant de commander chez Foster.';

const v = (ref, court) => ({ ref, court });

/**
 * Les fiches. Champs propres à ce fichier :
 *   versions : [{ ref: référence EXACTE du tarif, court: précision affichée }]
 *   visuel   : référence dont on prend la photo. Sinon : la première version.
 */
const fiches = [
  // =========================================================================
  // ARMOIRES RÉFRIGÉRÉES — EcoPro G3
  // =========================================================================
  {
    slug: 'foster-ep700h-armoire-positive-600-l',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'EP700H',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire réfrigérée positive EcoPro G3 EP700H, 600 L',
    resume: 'L’armoire 1 porte GN 2/1 des cuisines chaudes : donnée pour 40 °C d’ambiance.',
    description:
      "L'armoire une porte de référence de Foster : 600 litres au format GN 2/1, de +1 à +4 °C, sur 70 cm de large. Elle est donnée en classe climatique 5, c'est-à-dire qu'elle tient sa température dans une ambiance jusqu'à 40 °C — l'arrière-cuisine provençale en août. Commande tactile, porte autofermante à joint démontable sans outil, fluide R290. " +
      FINITION,
    usages: ['Restaurants et brasseries', 'Traiteurs et laboratoires', 'Hôtels', 'Cuisines de collectivité'],
    caracteristiques: [
      '600 L bruts, format GN 2/1, de +1 à +4 °C',
      'Dimensions : 700 x 2 080 x 855 mm (L x H x P)',
      'Classe climatique 5 (porte pleine) : ambiance jusqu’à 40 °C',
      'Classe énergétique A',
      '230 V monophasé, fluide R290',
      'Sur roulettes avec freins (porte pleine)',
    ],
    attention: `${ATT_ARMOIRE} ${ATT_VITREE}`,
    visuel: '41-102',
    versions: [
      v('41-102', `EP700H, porte pleine, ${ALU}`),
      v('41-104', `EP700HS, porte pleine, ${INOX}`),
      v('41-153', `EP700G, porte vitrée, ${ALU}`),
      v('41-155', `EP700GS, porte vitrée, ${INOX}`),
    ],
  },
  {
    slug: 'foster-ep700l-armoire-negative-600-l',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'EP700L',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire négative EcoPro G3 EP700L, 600 L',
    resume: 'Le congélateur armoire 1 porte GN 2/1, de −18 à −21 °C.',
    description:
      "La version négative de l'EP700 : 600 litres au format GN 2/1, tenus de −18 à −21 °C, dans la même largeur de 70 cm que l'armoire positive. Elle est elle aussi donnée en classe climatique 5, pour une ambiance jusqu'à 40 °C. Dégivrage automatique, porte autofermante, fluide R290. " +
      FINITION,
    usages: ['Restaurants et brasseries', 'Pizzerias et snacks', 'Traiteurs', 'Cuisines de collectivité'],
    caracteristiques: [
      '600 L bruts, format GN 2/1, de −18 à −21 °C',
      'Dimensions : 700 x 2 080 x 855 mm (L x H x P)',
      'Classe climatique 5 : ambiance jusqu’à 40 °C',
      'Classe énergétique B',
      '230 V monophasé, fluide R290',
      'Sur roulettes avec freins',
    ],
    attention: ATT_ARMOIRE,
    visuel: '41-106',
    versions: [v('41-106', `EP700L, ${ALU}`), v('41-108', `EP700LS, ${INOX}`)],
  },
  {
    slug: 'foster-ep1440h-armoire-positive-1350-l',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'EP1440H',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire réfrigérée positive 2 portes EcoPro G3 EP1440H, 1 350 L',
    resume: 'Deux portes GN 2/1 pour 1 350 litres : la réserve des cuisines qui produisent.',
    description:
      "Deux EP700 côte à côte dans un seul meuble : 1 350 litres au format GN 2/1, de +1 à +4 °C, sur 1,44 m de large. C'est l'armoire des cuisines qui reçoivent en gros et produisent à l'avance, avec la même tenue en ambiance chaude que la une-porte (classe climatique 5 en porte pleine). " +
      FINITION,
    usages: ['Restaurants à fort débit', 'Hôtels', 'Traiteurs', 'Cuisines centrales et collectivités'],
    caracteristiques: [
      '1 350 L bruts, format GN 2/1, de +1 à +4 °C',
      'Dimensions : 1 440 x 2 080 x 855 mm (L x H x P)',
      'Classe climatique 5 (portes pleines) : ambiance jusqu’à 40 °C',
      'Classe énergétique B',
      '230 V monophasé, fluide R290',
    ],
    attention: `${ATT_ARMOIRE} ${ATT_VITREE}`,
    visuel: '41-166',
    versions: [
      v('41-166', `EP1440H, portes pleines, ${ALU}`),
      v('41-168', `EP1440HS, portes pleines, ${INOX}`),
      v('41-495', `EP1440G, portes vitrées, ${ALU}`),
      v('41-494', `EP1440GS, portes vitrées, ${INOX}`),
    ],
  },
  {
    slug: 'foster-ep1440l-armoire-negative-1350-l',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'EP1440L',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire négative 2 portes EcoPro G3 EP1440L, 1 350 L',
    resume: 'Le grand congélateur armoire 2 portes GN 2/1, de −18 à −21 °C.',
    description:
      "1 350 litres de stockage négatif au format GN 2/1, de −18 à −21 °C, derrière deux portes : le congélateur des cuisines qui achètent en volume. Classe climatique 5, dégivrage automatique, fluide R290. " +
      FINITION,
    usages: ['Restaurants à fort débit', 'Hôtels', 'Cuisines centrales et collectivités'],
    caracteristiques: [
      '1 350 L bruts, format GN 2/1, de −18 à −21 °C',
      'Dimensions : 1 440 x 2 080 x 855 mm (L x H x P)',
      'Classe climatique 5 : ambiance jusqu’à 40 °C',
      'Classe énergétique D',
      '230 V monophasé, fluide R290',
    ],
    attention: ATT_ARMOIRE,
    visuel: '41-170',
    versions: [v('41-170', `EP1440L, ${ALU}`), v('41-172', `EP1440LS, ${INOX}`)],
  },
  {
    slug: 'foster-ep700hl-armoire-bi-temperature',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'EP700HL',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire bi-température EcoPro G3 EP700HL, positif et négatif',
    resume: 'Un compartiment positif et un négatif, deux groupes : le froid complet sur 70 cm.',
    description:
      "Deux compartiments superposés, l'un de +1 à +4 °C, l'autre de −18 à −21 °C, chacun avec son propre groupe frigorifique et sa propre régulation : si l'un s'arrête, l'autre continue. C'est la solution des petites cuisines qui n'ont la place que pour une seule armoire, au format GN 2/1 et sur 70 cm de large.",
    usages: ['Petits restaurants et bistrots', 'Bars à manger', 'Food-trucks avec laboratoire', 'Chambres d’hôtes avec table'],
    caracteristiques: [
      'Compartiment positif +1/+4 °C et compartiment négatif −18/−21 °C',
      '2 groupes frigorifiques et 2 régulateurs indépendants',
      'Format GN 2/1',
      'Dimensions : 700 x 2 080 x 825 mm (L x H x P)',
      'Classe climatique 5, classe énergétique C',
      '230 V monophasé, fluide R290',
    ],
    attention: ATT_ARMOIRE,
    visuel: '41-487',
    versions: [v('41-487', 'EP700HL, extérieur inox'), v('41-489', `EP700HLS, ${INOX}`)],
  },

  // =========================================================================
  // ARMOIRES À CHARIOTS — Evologi (collectivités)
  // =========================================================================
  {
    slug: 'foster-egr1h-armoire-a-chariot-gn-1-1',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'EGR1H',
    categorie: 'armoires-a-chariots',
    nom: 'Armoire à chariot Evologi EGR1H, 1 chariot GN 1/1',
    resume: 'On y roule le chariot du four : stockage positif sans transvaser.',
    description:
      "L'armoire à chariot reçoit directement un chariot à glissières GN 1/1, celui qui sort du four ou de la cellule de refroidissement : on stocke les préparations sans les transvaser, ce qui fait gagner du temps et supprime les manipulations. Positive de +1 à +4 °C, tout inox, groupe logé au R290. La version traversante s'ouvre des deux côtés, pour séparer le côté production du côté distribution dans le respect de la marche en avant.",
    usages: ['Cuisines centrales', 'Restauration scolaire', 'EHPAD et établissements de santé', 'Traiteurs et liaison froide'],
    caracteristiques: [
      'Reçoit 1 chariot GN 1/1, de +1 à +4 °C',
      'Dimensions : 730 x 2 250 x 1 040 mm (L x H x P), 1 120 mm en traversante',
      'Tout inox 304, sol non isolé',
      '230 V monophasé, groupe logé, fluide R290',
    ],
    attention: ATT_CHARIOT,
    versions: [v('618121', 'EGR1H-290, accès simple'), v('618122', 'EGR1HP-290, traversante (double accès)')],
  },
  {
    slug: 'foster-egr2h-armoire-a-chariots-2-gn-1-1',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'EGR2H',
    categorie: 'armoires-a-chariots',
    nom: 'Armoire à chariots Evologi EGR2H, 2 chariots GN 1/1',
    resume: 'Deux chariots GN 1/1 côte à côte, pour la production d’une cuisine centrale.',
    description:
      "La même armoire que l'EGR1H, pour deux chariots GN 1/1 roulés côte à côte. Elle absorbe la production d'un service entier de cuisine centrale ou de restauration scolaire. En version traversante, elle s'ouvre des deux côtés : production d'un côté, distribution de l'autre.",
    usages: ['Cuisines centrales', 'Restauration scolaire', 'EHPAD et établissements de santé'],
    caracteristiques: [
      'Reçoit 2 chariots GN 1/1, de +1 à +4 °C',
      'Dimensions : 1 460 x 2 250 x 1 040 mm (L x H x P)',
      'Tout inox 304, sol non isolé',
      '230 V monophasé, groupe logé, fluide R290',
    ],
    attention: ATT_CHARIOT,
    versions: [v('618123', 'EGR2H-290, accès simple'), v('618124', 'EGR2HP-290, traversante (double accès)')],
  },
  {
    slug: 'foster-egrl1h-armoire-a-chariot-gn-2-1',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'EGRL1H',
    categorie: 'armoires-a-chariots',
    nom: 'Armoire à chariot Evologi EGRL1H, 1 chariot GN 2/1',
    resume: 'Pour les chariots GN 2/1 des grands fours mixtes.',
    description:
      "La version large de l'armoire à chariot, pour un chariot GN 2/1 — celui des fours mixtes 20-2/1 et des grandes cellules. Positive de +1 à +4 °C, tout inox, groupe logé au R290, en accès simple ou traversante.",
    usages: ['Cuisines centrales', 'Restauration collective', 'Traiteurs à grand volume'],
    caracteristiques: [
      'Reçoit 1 chariot GN 2/1, de +1 à +4 °C',
      'Dimensions : 930 x 2 250 x 1 040 mm (L x H x P), 1 120 mm en traversante',
      'Tout inox 304, sol non isolé',
      '230 V monophasé, groupe logé, fluide R290',
    ],
    attention: ATT_CHARIOT,
    versions: [v('618125', 'EGRL1H, accès simple'), v('618126', 'EGRL1HP, traversante (double accès)')],
  },
  {
    slug: 'foster-egrl2h-armoire-a-chariots-2-gn-2-1',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'EGRL2H',
    categorie: 'armoires-a-chariots',
    nom: 'Armoire à chariots Evologi EGRL2H, 2 chariots GN 2/1',
    resume: 'Deux chariots GN 2/1 : la plus grande armoire à chariots de la gamme.',
    description:
      "Deux chariots GN 2/1 côte à côte : c'est l'armoire des cuisines centrales et des liaisons froides à grand volume. Tout inox, groupe logé au R290, en accès simple ou traversante pour séparer production et distribution.",
    usages: ['Cuisines centrales', 'Restauration scolaire et collective', 'Liaison froide'],
    caracteristiques: [
      'Reçoit 2 chariots GN 2/1, de +1 à +4 °C',
      'Dimensions : 1 860 x 2 250 x 1 040 mm (L x H x P)',
      'Tout inox 304, sol non isolé',
      '230 V monophasé, groupe logé, fluide R290',
    ],
    attention: ATT_CHARIOT,
    versions: [v('618129', 'EGRL2H, accès simple'), v('618130', 'EGRL2HP-290, traversante (double accès)')],
  },

  // =========================================================================
  // MEUBLES BAS RÉFRIGÉRÉS — EcoPro G3
  // =========================================================================
  {
    slug: 'foster-ep1-2h-table-refrigeree-2-portes',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'EP1/2H',
    categorie: 'tables-refrigerees',
    nom: 'Table réfrigérée positive EcoPro G3 EP1/2H, 2 portes GN 1/1',
    resume: 'Le froid sous le plan de travail, au poste : 2 portes GN 1/1.',
    description:
      "Le meuble bas réfrigéré qui met les mises en place à portée de main, sous le plan de travail : deux portes au format GN 1/1, de +1 à +4 °C, sur 1,37 m. Plan de travail renforcé, commande tactile sans touches, aménagement démontable sans outils, et une tenue en ambiance chaude jusqu'à 40 °C (classe climatique 5). " +
      FINITION,
    usages: ['Postes chauds et garde-manger', 'Pizzerias', 'Restaurants et brasseries', 'Snacks et traiteurs'],
    caracteristiques: [
      '280 L bruts, 2 portes GN 1/1, de +1 à +4 °C',
      'Dimensions : 1 365 x 865 x 700 mm (L x H x P)',
      'Classe climatique 5 : ambiance jusqu’à 40 °C',
      'Classe énergétique A+',
      '230 V monophasé, fluide R290, sur roulettes',
    ],
    attention: ATT_TABLE,
    visuel: '43-102',
    versions: [v('43-102', `EP1/2H-290, ${ALU}`), v('43-104', `EP1/2HS-290, ${INOX}`)],
  },
  {
    slug: 'foster-ep1-3h-table-refrigeree-3-portes',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'EP1/3H',
    categorie: 'tables-refrigerees',
    nom: 'Table réfrigérée positive EcoPro G3 EP1/3H, 3 portes GN 1/1',
    resume: 'Trois portes GN 1/1 sur 1,82 m : le poste de travail le plus courant.',
    description:
      "La table réfrigérée trois portes : 435 litres au format GN 1/1, de +1 à +4 °C, sous un plan de travail renforcé de 1,82 m. C'est le format le plus courant en cuisine de restaurant, entre le garde-manger et le passe. Classe climatique 5. " +
      FINITION,
    usages: ['Restaurants et brasseries', 'Pizzerias', 'Hôtels-restaurants', 'Traiteurs'],
    caracteristiques: [
      '435 L bruts, 3 portes GN 1/1, de +1 à +4 °C',
      'Dimensions : 1 815 x 865 x 700 mm (L x H x P)',
      'Classe climatique 5 : ambiance jusqu’à 40 °C',
      'Classe énergétique A',
      '230 V monophasé, fluide R290, sur roulettes',
    ],
    attention: ATT_TABLE,
    visuel: '43-176',
    versions: [v('43-176', `EP1/3H-290, ${ALU}`), v('43-178', `EP1/3HS-290, ${INOX}`)],
  },
  {
    slug: 'foster-ep1-4h-table-refrigeree-4-portes',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'EP1/4H',
    categorie: 'tables-refrigerees',
    nom: 'Table réfrigérée positive EcoPro G3 EP1/4H, 4 portes GN 1/1',
    resume: 'Quatre portes GN 1/1 sur 2,27 m, pour les longues lignes de production.',
    description:
      "La plus longue table réfrigérée de la gamme : quatre portes au format GN 1/1, 585 litres de +1 à +4 °C, sous 2,27 m de plan de travail. Elle équipe les lignes de dressage et les cuisines où plusieurs cuisiniers travaillent côte à côte. Classe climatique 5. " +
      FINITION,
    usages: ['Restaurants à fort débit', 'Hôtels', 'Cuisines centrales'],
    caracteristiques: [
      '585 L bruts, 4 portes GN 1/1, de +1 à +4 °C',
      'Dimensions : 2 270 x 865 x 700 mm (L x H x P)',
      'Classe climatique 5 : ambiance jusqu’à 40 °C',
      'Classe énergétique A',
      '230 V monophasé, fluide R290, sur roulettes',
    ],
    attention: ATT_TABLE,
    visuel: '43-258',
    versions: [v('43-258', `EP1/4H-290, ${ALU}`), v('43-260', `EP1/4HS-290, ${INOX}`)],
  },
  {
    slug: 'foster-ep1-2l-table-negative-2-portes',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'EP1/2L',
    categorie: 'tables-refrigerees',
    nom: 'Table négative EcoPro G3 EP1/2L, 2 portes GN 1/1',
    resume: 'Le surgelé au poste, sous le plan de travail : 2 portes GN 1/1.',
    description:
      "La table négative deux portes garde les surgelés du service — frites, glaces, produits de la mer — au poste, de −18 à −21 °C, sans aller-retour à la réserve. Format GN 1/1, plan de travail renforcé, classe climatique 5. " +
      FINITION,
    usages: ['Postes friteuse et grill', 'Pâtisseries et glaciers', 'Restaurants et brasseries'],
    caracteristiques: [
      '280 L bruts, 2 portes GN 1/1, de −18 à −21 °C',
      'Dimensions : 1 365 x 865 x 700 mm (L x H x P)',
      'Classe climatique 5 : ambiance jusqu’à 40 °C',
      'Classe énergétique E',
      '230 V monophasé, fluide R290, sur roulettes',
    ],
    attention: ATT_TABLE,
    visuel: '43-106',
    versions: [v('43-106', `EP1/2L-290, ${ALU}`), v('43-108', `EP1/2LS-290, ${INOX}`)],
  },
  {
    slug: 'foster-ep1-3l-table-negative-3-portes',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'EP1/3L',
    categorie: 'tables-refrigerees',
    nom: 'Table négative EcoPro G3 EP1/3L, 3 portes GN 1/1',
    resume: 'Trois portes négatives GN 1/1 sur 1,82 m.',
    description:
      "La version trois portes de la table négative : 435 litres de −18 à −21 °C au format GN 1/1, sous 1,82 m de plan de travail renforcé. Classe climatique 5. " +
      FINITION,
    usages: ['Restaurants à fort débit', 'Pâtisseries', 'Cuisines de collectivité'],
    caracteristiques: [
      '435 L bruts, 3 portes GN 1/1, de −18 à −21 °C',
      'Dimensions : 1 815 x 865 x 700 mm (L x H x P)',
      'Classe climatique 5 : ambiance jusqu’à 40 °C',
      'Classe énergétique F',
      '230 V monophasé, fluide R290, sur roulettes',
    ],
    attention: ATT_TABLE,
    visuel: '43-180',
    versions: [v('43-180', `EP1/3L-290, ${ALU}`), v('43-182', `EP1/3LS-290, ${INOX}`)],
  },

  // =========================================================================
  // SALADETTES — tables de préparation FPS
  // =========================================================================
  {
    slug: 'foster-fps2hr-saladette-2-portes',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'FPS2HR',
    categorie: 'tables-refrigerees',
    nom: 'Saladette réfrigérée FPS2HR, 2 portes',
    resume: 'Bacs réfrigérés sur le dessus, réserve en dessous : le poste pizza ou salades.',
    description:
      "La table de préparation réfrigérée réunit au même poste la mise en place, dans des bacs GN posés au-dessus, et la réserve, derrière deux portes en dessous, le tout de +1 à +4 °C. Le couvercle de nuit referme les bacs à la fin du service. C'est le poste des pizzerias, des saladeries et des snacks.",
    usages: ['Pizzerias', 'Saladeries et sandwicheries', 'Snacks et restauration rapide', 'Postes froids de brasserie'],
    caracteristiques: [
      '270 L bruts en partie basse, 2 portes, de +1 à +4 °C',
      'Dessus réfrigéré pour bacs GN, avec couvercle de nuit',
      'Dimensions : 1 140 x 1 060 x 850 mm (L x H x P)',
      '230 V monophasé, fluide R290, sur roulettes avec freins',
      'Classe climatique 4 : ambiance jusqu’à 30 °C',
    ],
    attention:
      "Les bacs GN du dessus ne sont pas fournis. Une saladette est donnée pour une ambiance jusqu'à 30 °C : placez-la loin du four à pizza et du fourneau. Nous vérifions l'emplacement avant la livraison.",
    visuel: '15-151',
    versions: [v('15-151', 'FPS2HR-290-CN, extérieur inox'), v('15-152', `FPS2HRS-290-CN, ${INOX}`)],
  },
  {
    slug: 'foster-fps3hr-saladette-3-portes',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'FPS3HR',
    categorie: 'tables-refrigerees',
    nom: 'Saladette réfrigérée FPS3HR, 3 portes',
    resume: 'Plus de bacs au-dessus, trois portes en dessous, pour les postes chargés.',
    description:
      "La version trois portes de la table de préparation : un dessus réfrigéré plus long pour davantage de bacs GN, et 420 litres de réserve en dessous, de +1 à +4 °C. Couvercle de nuit, roulettes avec freins.",
    usages: ['Pizzerias à fort débit', 'Saladeries', 'Restauration rapide'],
    caracteristiques: [
      '420 L bruts en partie basse, 3 portes, de +1 à +4 °C',
      'Dessus réfrigéré pour bacs GN, avec couvercle de nuit',
      'Dimensions : 1 720 x 1 060 x 850 mm (L x H x P)',
      '230 V monophasé, fluide R290, sur roulettes avec freins',
      'Classe climatique 4 : ambiance jusqu’à 30 °C',
    ],
    attention:
      "Les bacs GN du dessus ne sont pas fournis. Une saladette est donnée pour une ambiance jusqu'à 30 °C : placez-la loin du four à pizza et du fourneau. Nous vérifions l'emplacement avant la livraison.",
    visuel: '15-153',
    versions: [v('15-153', 'FPS3HR-290-CN, extérieur inox'), v('15-154', `FPS3HRS-290-CN, ${INOX}`)],
  },

  // =========================================================================
  // MEUBLES BAS COMPACTS — HR / LR
  // =========================================================================
  {
    slug: 'foster-hr150-lr150-meuble-bas-compact-150-l',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'HR150 / LR150',
    categorie: 'tables-refrigerees',
    nom: 'Meuble bas compact HR150 / LR150, 150 L',
    resume: 'Le petit froid sous comptoir, pour le bar ou l’office : 60 cm de large.',
    description:
      "Un meuble bas de 150 litres sur 60 cm de large, qui se glisse sous un comptoir de bar, dans un office d'étage ou au bout d'une ligne. Trois versions : positive à porte pleine, positive à porte vitrée pour voir les boissons, ou négative. Porte à serrure, régulation électronique avec affichage de la température.",
    usages: ['Bars et cafés', 'Offices d’hôtel', 'Chambres d’hôtes', 'Petits snacks'],
    caracteristiques: [
      '150 L bruts, 1 porte avec serrure',
      'Dimensions : 605 x 830 x 640 mm (L x H x P)',
      'HR150 : +1/+4 °C, classe énergétique A+ ; HR150G (porte vitrée) : classe A',
      'LR150 : −18/−21 °C',
      '230 V monophasé, roulettes arrière et vérins avant',
    ],
    attention:
      "La version à porte vitrée est donnée pour une ambiance jusqu'à 25 °C (classe climatique 3), les autres jusqu'à 30 °C (classe 4). Sous un comptoir, laissez l'air circuler devant la grille : un meuble enfermé ne refroidit plus.",
    visuel: '13-102',
    versions: [
      v('13-102', 'HR150, positif, porte pleine'),
      v('13-174', 'HR150G, positif, porte vitrée'),
      v('13-104', 'LR150, négatif, porte pleine'),
    ],
  },
  {
    slug: 'foster-hr200-lr200-meuble-bas-compact-200-l',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'HR200 / LR200',
    categorie: 'tables-refrigerees',
    nom: 'Meuble bas compact HR200 / LR200, 200 L',
    resume: 'Un compact plus profond, donné pour 40 °C d’ambiance.',
    description:
      "Le meuble bas compact de 200 litres, sur 68 cm de large, en positif ou en négatif. Plus profond que le 150 litres, il est surtout donné en classe climatique 5 : il tient sa température jusqu'à 40 °C d'ambiance, derrière un bar exposé ou dans une cuisine ouverte.",
    usages: ['Bars et cafés', 'Cuisines ouvertes', 'Snacks', 'Offices'],
    caracteristiques: [
      '200 L bruts, 1 porte',
      'Dimensions : 684 x 824 x 755 mm (L x H x P)',
      'HR200 : +1/+4 °C, classe énergétique A+',
      'LR200 : −18/−21 °C, classe énergétique D',
      'Classe climatique 5 : ambiance jusqu’à 40 °C',
      '230 V monophasé, fluide R290',
    ],
    attention: ATT_TABLE,
    visuel: '13-111',
    versions: [v('13-111', 'HR200, positif'), v('13-207', 'LR200, négatif')],
  },
  {
    slug: 'foster-hr360-lr360-meuble-bas-compact-360-l',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'HR360 / LR360',
    categorie: 'tables-refrigerees',
    nom: 'Meuble bas compact HR360 / LR360, 360 L, 2 portes',
    resume: 'Deux portes sur 1,22 m : le compact pour les bars qui stockent.',
    description:
      "La version deux portes du meuble bas compact : 360 litres sur 1,22 m de large, en positif ou en négatif, donnée en classe climatique 5 pour une ambiance jusqu'à 40 °C. Elle remplace avantageusement deux petits réfrigérateurs sous un comptoir.",
    usages: ['Bars et caves à manger', 'Cuisines ouvertes', 'Snacks', 'Campings — snack-bar'],
    caracteristiques: [
      '360 L bruts, 2 portes',
      'Dimensions : 1 217 x 824 x 755 mm (L x H x P)',
      'HR360 : +1/+4 °C, classe énergétique A',
      'LR360 : −18/−21 °C, classe énergétique D',
      'Classe climatique 5 : ambiance jusqu’à 40 °C',
      '230 V monophasé, fluide R290',
    ],
    attention: ATT_TABLE,
    visuel: '13-117',
    versions: [v('13-117', 'HR360, positif'), v('13-187', 'LR360, négatif')],
  },

  // =========================================================================
  // CELLULES DE REFROIDISSEMENT RAPIDE — Evologi
  // =========================================================================
  {
    slug: 'foster-ed15-6-cellule-refroidissement-mixte',
    type: 'machine',
    machines: ['cellule-refroidissement'],
    ref: 'ED15/6',
    categorie: 'cellules-refroidissement',
    nom: 'Cellule de refroidissement mixte Evologi ED15/6, 6 niveaux',
    resume: 'La petite cellule mixte : 15 kg refroidis ou 6 kg surgelés par cycle.',
    description:
      "La cellule de refroidissement rapide est ce qui permet de cuisiner à l'avance en sécurité : elle fait passer les préparations de +63 °C à +10 °C en moins de 90 minutes, comme le demande la réglementation, ou les surgèle à cœur. Six niveaux GN 1/1 ou 600 x 400 mm, pilotage par sonde à piquer ou par minuterie, détecté tout seul, et 69,5 cm de profondeur seulement pour s'aligner avec les autres meubles de la cuisine.",
    usages: ['Restaurants qui produisent à l’avance', 'Traiteurs', 'Pâtisseries', 'Petites collectivités'],
    caracteristiques: [
      'Refroidissement : 15 kg de +63 °C à +10 °C en 90 min',
      'Surgélation : 6 kg de +63 °C à −18 °C en 270 min',
      '6 niveaux GN 1/1 ou 600 x 400 mm (grilles non fournies)',
      'Dimensions : 755 x 877 x 695 mm (L x H x P)',
      'Tout inox 304, 230 V monophasé, fluide R290, sur roulettes',
    ],
    attention: ATT_CELLULE,
    versions: [v('618391', 'ED15/6-290')],
  },
  {
    slug: 'foster-ed25-6-cellule-refroidissement-mixte',
    type: 'machine',
    machines: ['cellule-refroidissement'],
    ref: 'ED25/6',
    categorie: 'cellules-refroidissement',
    nom: 'Cellule de refroidissement mixte Evologi ED25/6, 6 niveaux',
    resume: 'Même encombrement, plus de puissance : 25 kg refroidis par cycle.',
    description:
      "Le même gabarit que l'ED15/6, avec une capacité de 25 kg refroidis de +63 °C à +10 °C en 90 minutes, ou 10 kg surgelés. C'est la cellule des restaurants qui cuisinent leurs fonds, leurs sauces et leurs garnitures à l'avance, et des traiteurs. Pilotage par sonde à piquer ou minuterie.",
    usages: ['Restaurants', 'Traiteurs', 'Pâtisseries', 'Cuisines de collectivité'],
    caracteristiques: [
      'Refroidissement : 25 kg de +63 °C à +10 °C en 90 min',
      'Surgélation : 10 kg de +63 °C à −18 °C en 270 min',
      '6 niveaux GN 1/1 ou 600 x 400 mm (grilles non fournies)',
      'Dimensions : 755 x 877 x 695 mm (L x H x P)',
      'Tout inox 304, 230 V monophasé, fluide R290, sur roulettes',
    ],
    attention: ATT_CELLULE,
    versions: [v('618392', 'ED25/6-290')],
  },
  {
    slug: 'foster-ed45-12-cellule-refroidissement-mixte',
    type: 'machine',
    machines: ['cellule-refroidissement'],
    ref: 'ED45/12',
    categorie: 'cellules-refroidissement',
    nom: 'Cellule de refroidissement mixte Evologi ED45/12, 12 niveaux',
    resume: 'Douze niveaux en armoire : 45 kg refroidis par cycle.',
    description:
      "La cellule armoire de douze niveaux GN 1/1 ou 600 x 400 mm : 45 kg refroidis de +63 °C à +10 °C en 90 minutes, ou 20 kg surgelés. Toujours 69,5 cm de profondeur, pour s'aligner avec le reste de la cuisine. C'est le format des cuisines qui produisent pour plusieurs services.",
    usages: ['Restaurants à fort débit', 'Traiteurs', 'Cuisines de collectivité', 'Boulangeries-pâtisseries'],
    caracteristiques: [
      'Refroidissement : 45 kg de +63 °C à +10 °C en 90 min',
      'Surgélation : 20 kg de +63 °C à −18 °C en 270 min',
      '12 niveaux GN 1/1 ou 600 x 400 mm (grilles non fournies)',
      'Dimensions : 755 x 1 536 x 695 mm (L x H x P)',
      'Tout inox 304, 230 V monophasé, fluide R290, sur roulettes',
    ],
    attention: ATT_CELLULE,
    versions: [v('618393P', 'ED45/12-290')],
  },
  {
    slug: 'foster-ed60-12-cellule-refroidissement-mixte',
    type: 'machine',
    machines: ['cellule-refroidissement'],
    ref: 'ED60/12',
    categorie: 'cellules-refroidissement',
    nom: 'Cellule de refroidissement mixte Evologi ED60/12, 12 niveaux',
    resume: 'La plus puissante de la sélection : 60 kg refroidis par cycle.',
    description:
      "Même armoire de douze niveaux que l'ED45/12, avec un groupe plus puissant : 60 kg refroidis de +63 °C à +10 °C en 90 minutes. C'est la cellule des cuisines qui refroidissent un four mixte 10-1/1 plein à chaque cycle.",
    usages: ['Cuisines centrales', 'Restauration collective', 'Traiteurs à grand volume'],
    caracteristiques: [
      'Refroidissement : 60 kg de +63 °C à +10 °C en 90 min',
      '12 niveaux GN 1/1 ou 600 x 400 mm (grilles non fournies)',
      'Dimensions : 755 x 1 536 x 695 mm (L x H x P)',
      'Tout inox 304, 230 V monophasé, fluide R290, sur roulettes',
    ],
    attention: ATT_CELLULE,
    versions: [v('618394P', 'ED60/12-290')],
  },

  // =========================================================================
  // ACCESSOIRES
  // =========================================================================
  {
    slug: 'foster-grille-inox-gn-1-1-meuble-bas-g3',
    machines: ['table-refrigeree'],
    ref: 'Grille GN 1/1 G3',
    categorie: 'accessoires-froid',
    nom: 'Grille inox GN 1/1 pour meuble bas EcoPro G3',
    resume: 'Un niveau de rangement de plus dans une table réfrigérée G3.',
    description:
      "Grille supplémentaire au format GN 1/1, pour ajouter un niveau dans une table réfrigérée EcoPro G3. Elle se pose sur une paire de glissières : si votre meuble n'en a plus de libre, commandez-les avec.",
    usages: ['Tables réfrigérées EcoPro G3 (EP1/2, EP1/3, EP1/4)'],
    caracteristiques: ['Format GN 1/1', 'Acier inoxydable'],
    attention: ATT_ACC,
    versions: [v('01-262354-01', 'grille inox GN 1/1, meuble bas EcoPro G3')],
  },
  {
    slug: 'foster-glissieres-inox-ecopro-g3',
    machines: ['armoire-refrigeree', 'table-refrigeree'],
    ref: 'Glissière G3',
    categorie: 'accessoires-froid',
    nom: 'Glissière inox pour armoire ou meuble bas EcoPro G3',
    resume: 'Pour ajouter un niveau, ou remplacer une glissière abîmée.',
    description:
      "Glissière en acier inoxydable, vendue à l'unité : il en faut deux pour un niveau. Elle existe pour les armoires EcoPro G3 et pour les meubles bas EcoPro G3 au format GN 1/1.",
    usages: ['Armoires EcoPro G3', 'Tables réfrigérées EcoPro G3'],
    caracteristiques: ['Acier inoxydable', 'Vendue à l’unité : 2 par niveau'],
    attention: ATT_ACC,
    versions: [v('01-272911-01', 'glissière inox, armoire EcoPro G3'), v('00-745543-01', 'glissière GN 1/1, meuble bas EcoPro G3')],
  },
  {
    slug: 'foster-grilles-meuble-bas-compact-hr-lr',
    machines: ['table-refrigeree'],
    ref: 'Grille HR/LR',
    categorie: 'accessoires-froid',
    nom: 'Grille pour meuble bas compact HR / LR',
    resume: 'La grille d’origine des compacts 150, 200 et 360 litres.',
    description:
      "Grille supplémentaire pour les meubles bas compacts Foster. Elle existe pour chaque taille : choisissez celle de votre appareil.",
    usages: ['Meubles bas compacts HR150, HR/LR200, HR/LR360'],
    caracteristiques: ['Grille d’origine Foster'],
    attention: ATT_ACC,
    versions: [
      v('01-233647-01', 'grille HR150'),
      v('01-232248-01', 'grille HR/LR200'),
      v('01-232304-01', 'grille HR/LR360'),
    ],
  },
];

// ---------------------------------------------------------------------------
// Assemblage avec le tarif et les visuels
// ---------------------------------------------------------------------------

/** Toutes les références du tarif utilisées ici — lu par le générateur. */
export const refsFoster = fiches.flatMap((f) => f.versions.map((x) => x.ref));

/** Les références introuvables dans le tarif généré (doit rester vide). */
export const refsFosterManquantes = refsFoster.filter((r) => !tarifFoster[r]);

const photoDe = (f) => visuelsFoster[f.visuel ?? f.versions[0].ref]?.photo ?? null;

export const produitsFoster = fiches.map((f) => {
  const { versions, visuel, ...reste } = f;
  // Brochure de la gamme, si une version n'a pas de document à elle.
  const gamme = versions.map((x) => visuelsFoster[x.ref]?.gamme).find(Boolean);
  return {
    marque: MARQUE,
    creditVisuel: 'Foster',
    photo: photoDe(f),
    usages: [],
    // Accessoires : commandés chez Foster, pas en stock chez nous. La fiche ne
    // doit donc promettre ni stock ni tournée.
    ...(f.type === 'machine' ? {} : { surCommande: true }),
    ...reste,
    conditionnements: versions.map((x) => {
      const t = tarifFoster[x.ref] || {};
      const d = visuelsFoster[x.ref] || {};
      // Fiche technique de la version ; à défaut, la brochure de la gamme.
      const doc = d.fiche || d.gamme || gamme;
      return {
        label: `${x.ref} · ${x.court}`,
        refFabricant: x.ref,
        prix: typeof t.prix === 'number' ? t.prix : null,
        ...(doc ? { ficheFabricant: doc, ficheTitre: d.fiche ? `Fiche technique ${x.court.split(',')[0]}` : 'Brochure de la gamme' } : {}),
        ...(d.etiquette ? { etiquetteEnergie: d.etiquette } : {}),
      };
    }),
  };
});
