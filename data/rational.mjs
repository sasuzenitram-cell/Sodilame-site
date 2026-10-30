// ---------------------------------------------------------------------------
// RATIONAL — sélection « 20/80 » de la boutique
//
// Même méthode que Miele (voir miele.mjs). Ce fichier est écrit à la main : il
// choisit les modèles, les regroupe en fiches et porte les textes. Le PRIX vient
// du tarif RATIONAL, lu dans `rational-tarif.mjs`, généré par :
//
//     node outils/rational-tarif.mjs <1_Import_Produits_RATIONAL_….csv> <2_….csv>
//
// Les photos et les fiches techniques viennent de la Toolbox du portail
// revendeur RATIONAL (`rational-visuels.mjs`, généré par
// outils/rational-visuels.py).
//
// ⚠️  PRIX AFFICHÉ = PRIX PUBLIC RATIONAL FRANCE, HT (tarif matériel 10/2026),
//     choix de la direction du 30/10/2026. Le prix d'achat SODILAME n'est
//     JAMAIS lu par le générateur et ne doit jamais apparaître dans ce dépôt.
//
// ⚠️  SÉLECTION de la direction (30/10/2026) : iCombi Pro et iCombi Classic
//     de 6-1/1 à 20-1/1 (plus l'iCombi Pro XS), iVario Pro 2-S et L, et les
//     accessoires courants. Hors sélection, disponibles sur devis : 20-2/1,
//     iVario 2-XS et XL, iHexagon, gaz naturel L (absent de notre zone),
//     versions MarineLine / SecurityLine / HeavyDutyLine et le reste du tarif.
//
// Chaque fiche regroupe les VERSIONS d'un même modèle (énergie, cuisson sous
// pression, taille d'accessoire). Une version = un « conditionnement » au sens
// du panier : son libellé commence toujours par la référence RATIONAL exacte,
// c'est elle qui sert à la commande chez RATIONAL.
// ---------------------------------------------------------------------------
import { tarifRational } from './rational-tarif.mjs';
// Visuels et fiches techniques du portail revendeur : décision de la direction
// du 30/10/2026, sous sa responsabilité (voir rational-visuels.mjs).
import { photosRational, fichesRational } from './rational-visuels.mjs';

const MARQUE = 'Rational';

// Vocabulaire du tarif, expliqué une fois pour toutes.
const E = 'électrique, 400 V triphasé';
const GN = 'gaz naturel (H)';
const GP = 'propane';
const ENERGIE =
  "Le même four existe en électrique et au gaz, naturel ou propane : c'est l'alimentation disponible dans votre cuisine, et la puissance de votre abonnement électrique, qui décident. Nous le vérifions au relevé, avant la commande.";
const ATT_FOUR =
  "Un four mixte demande une arrivée d'eau, une évacuation, et selon la version une alimentation triphasée ou un raccordement gaz conforme. Sur nos eaux dures, un traitement d'eau adapté est indispensable : c'est lui qui protège le générateur de vapeur. Tout cela se vérifie au relevé, avant la commande.";
const ATT_GAZ =
  "Les versions gaz demandent un raccordement et une évacuation des produits de combustion conformes, réalisés par un professionnel qualifié : nous nous en chargeons à l'installation.";
const ATT_ACC_FOUR =
  "Chaque accessoire existe en plusieurs tailles, selon le format du four : 6-1/1 et 10-1/1, 6-2/1 et 10-2/1, 20-1/1, XS. Donnez-nous le modèle de votre four, ou une photo de sa plaque signalétique : nous vérifions la compatibilité avant de commander.";
const ATT_GN =
  'Les accessoires RATIONAL suivent le format Gastronorme : un 1/1 GN mesure 530 x 325 mm, un 2/3 GN 354 x 325 mm. Un four 6-2/1 ou 10-2/1 reçoit deux 1/1 GN par niveau.';

const v = (ref, court, extra = {}) => ({ ref, court, ...extra });

// Versions d'un iCombi : électrique, gaz naturel, propane.
const versionsFour = (e, gn, gp) => [v(e, E), v(gn, GN), v(gp, GP)];

/**
 * Les fiches. Champs propres à ce fichier :
 *   versions : [{ ref: référence EXACTE du tarif, court: précision affichée,
 *                 fiche?: fiche technique propre à la version }]
 *   visuel   : clé de la photo (rational-visuels.mjs). Sinon : la première
 *              version qui en a une.
 *   fiche    : fiche technique RATIONAL commune à toutes les versions.
 */
const fiches = [
  // =========================================================================
  // FOURS MIXTES — iCombi Pro
  // =========================================================================
  {
    slug: 'rational-icombi-pro-xs-6-2-3',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Pro XS 6-2/3',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Pro XS 6-2/3',
    resume: "Le plus compact des iCombi Pro : 6 niveaux en 2/3 GN, sur 65 cm de large.",
    description:
      "L'iCombi Pro dans son plus petit format : six niveaux au format 2/3 GN dans une largeur de 65 cm, qui se loge sur un plan de travail ou sous une hotte existante. Il a les mêmes assistants que les grands modèles — cuisson pilotée selon le résultat demandé, planification des chargements, nettoyage et détartrage automatiques. C'est le four des snackings, des bars à manger et des cuisines où chaque centimètre compte. Il existe uniquement en électrique.",
    usages: ['Snacking et restauration rapide', 'Bars, cafés et caves à manger', 'Boulangeries-traiteurs', 'Cuisines d’appoint'],
    caracteristiques: [
      '6 niveaux 2/3 GN',
      'Dimensions : 655 x 594 x 621 mm (L x H x P)',
      'Électrique : 5,7 kW en 400 V triphasé (5,3 kW en 230 V monophasé)',
      'Poids : 62 kg',
      'Cuisson intelligente iCookingSuite, planification iProductionManager',
      'Nettoyage et détartrage automatiques iCareSystem',
    ],
    attention: ATT_FOUR,
    visuel: 'icombi-pro-xs-6-2-3',
    fiche: 'iCombiPro_XS_E_Standard',
    versions: [v('CA1ERRA.0000726', E)],
  },
  {
    slug: 'rational-icombi-pro-6-1-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Pro 6-1/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Pro 6-1/1',
    resume: 'Le format le plus vendu : 6 niveaux GN 1/1, piloté par ses assistants de cuisson.',
    description:
      "Six niveaux au format GN 1/1, c'est le four mixte de la plupart des restaurants. L'iCombi Pro règle lui-même température, humidité et ventilation selon le résultat demandé — cuisson, coloration — et s'adapte à la quantité enfournée. L'iProductionManager indique ce qui peut cuire ensemble et dans quel ordre, et le four se nettoie et se détartre seul, la nuit si on le souhaite. " +
      ENERGIE,
    usages: ['Restaurants et brasseries', 'Hôtels-restaurants', 'Traiteurs', 'Cuisines de collectivité de petite taille'],
    caracteristiques: [
      '6 niveaux GN 1/1 (68 mm entre niveaux)',
      'Dimensions : 850 x 804 x 842 mm (L x H x P)',
      'Électrique : 10,8 kW en 400 V triphasé',
      'Gaz : 13 kW',
      'Poids : 101 kg en électrique, 115 kg au gaz',
      'Cuisson intelligente iCookingSuite, planification iProductionManager',
      'Nettoyage et détartrage automatiques iCareSystem',
    ],
    attention: ATT_FOUR,
    visuel: 'icombi-pro-6-1-1',
    fiche: 'iCombiPro_6-11_EG_Standard',
    versions: versionsFour('CB1ERRA.0000727', 'CB1GRRA.0000746', 'CB1GRRA.0000740'),
  },
  {
    slug: 'rational-icombi-pro-10-1-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Pro 10-1/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Pro 10-1/1',
    resume: 'Dix niveaux GN 1/1 pour les services chargés, dans la même largeur que le 6-1/1.',
    description:
      "Le même four que le 6-1/1, avec quatre niveaux de plus pour une emprise au sol identique : c'est le choix des cuisines qui enchaînent deux services ou qui produisent à l'avance. Ses assistants gèrent les chargements mixtes niveau par niveau, et le nettoyage automatique se lance en fin de service. " +
      ENERGIE,
    usages: ['Restaurants à fort débit', 'Hôtels', 'Cuisines centrales', 'EHPAD et collectivités'],
    caracteristiques: [
      '10 niveaux GN 1/1 (68 mm entre niveaux)',
      'Dimensions : 850 x 1 064 x 842 mm (L x H x P)',
      'Électrique : 18,9 kW en 400 V triphasé',
      'Gaz : 22 kW',
      'Poids : 130 kg en électrique, 150 kg au gaz',
      'Cuisson intelligente iCookingSuite, planification iProductionManager',
      'Nettoyage et détartrage automatiques iCareSystem',
    ],
    attention: ATT_FOUR,
    visuel: 'icombi-pro-10-1-1',
    fiche: 'iCombiPro_10-11_EG_Standard',
    versions: versionsFour('CD1ERRA.0000728', 'CD1GRRA.0000747', 'CD1GRRA.0000741'),
  },
  {
    slug: 'rational-icombi-pro-6-2-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Pro 6-2/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Pro 6-2/1',
    resume: 'Six niveaux au format GN 2/1 : deux bacs 1/1 côte à côte à chaque niveau.',
    description:
      "Le format 2/1 double la surface de chaque niveau : on y enfourne un grand plat GN 2/1, ou deux bacs 1/1 côte à côte. C'est le four des cuisines qui travaillent de grosses pièces, des plaques de rôtis ou de grandes quantités de garnitures, sans monter en hauteur. " +
      ENERGIE,
    usages: ['Cuisines centrales', 'Restauration collective', 'Traiteurs et banquets', 'Grandes brasseries'],
    caracteristiques: [
      '6 niveaux GN 2/1, soit 12 bacs GN 1/1',
      'Dimensions : 1 072 x 804 x 1 042 mm (L x H x P)',
      'Électrique : 22,4 kW en 400 V triphasé',
      'Gaz : 28 kW',
      'Poids : 135 kg en électrique, 151 kg au gaz',
      'Cuisson intelligente iCookingSuite, planification iProductionManager',
      'Nettoyage et détartrage automatiques iCareSystem',
    ],
    attention: ATT_FOUR,
    visuel: 'icombi-pro-6-2-1',
    fiche: 'iCombiPro_6-21_EG_Standard',
    versions: versionsFour('CC1ERRA.0000729', 'CC1GRRA.0000748', 'CC1GRRA.0000742'),
  },
  {
    slug: 'rational-icombi-pro-10-2-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Pro 10-2/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Pro 10-2/1',
    resume: 'Dix niveaux GN 2/1 : la capacité d’une cuisine centrale dans un four posé.',
    description:
      "Dix niveaux au format 2/1, soit vingt bacs GN 1/1 par fournée : c'est le four des cuisines centrales et des grosses collectivités qui veulent cette capacité sans passer à un four à chariot. Les assistants gardent une cuisson régulière d'un niveau à l'autre, même four plein. " +
      ENERGIE,
    usages: ['Cuisines centrales', 'Restauration scolaire et hospitalière', 'Traiteurs de grande capacité'],
    caracteristiques: [
      '10 niveaux GN 2/1, soit 20 bacs GN 1/1',
      'Dimensions : 1 072 x 1 064 x 1 042 mm (L x H x P)',
      'Électrique : 37,4 kW en 400 V triphasé',
      'Gaz : 40 kW',
      'Poids : 173 kg en électrique, 192 kg au gaz',
      'Cuisson intelligente iCookingSuite, planification iProductionManager',
      'Nettoyage et détartrage automatiques iCareSystem',
    ],
    attention: ATT_FOUR,
    visuel: 'icombi-pro-10-2-1',
    fiche: 'iCombiPro_10-21_EG_Standard',
    versions: versionsFour('CE1ERRA.0000730', 'CE1GRRA.0000749', 'CE1GRRA.0000743'),
  },
  {
    slug: 'rational-icombi-pro-20-1-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Pro 20-1/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Pro 20-1/1',
    resume: 'Le four sur pieds à chariot : 20 niveaux GN 1/1 chargés d’un seul geste.',
    description:
      "Un four sur pieds qui se charge par chariot à claies : vingt niveaux GN 1/1 préparés à l'avance, enfournés d'un seul mouvement, puis ressortis vers le banquet ou la cellule de refroidissement. C'est l'outil des productions en série et des cuisines qui servent des centaines de repas. " +
      ENERGIE,
    usages: ['Cuisines centrales', 'Banquets et événementiel', 'Restauration hospitalière', 'Production en liaison froide'],
    caracteristiques: [
      '20 niveaux GN 1/1 sur chariot à claies (65 mm entre niveaux)',
      'Dimensions : 877 x 1 872 x 913 mm (L x H x P)',
      'Électrique : 37,2 kW en 400 V triphasé',
      'Gaz : 42 kW',
      'Poids : 245 kg en électrique, 267 kg au gaz',
      'Cuisson intelligente iCookingSuite, planification iProductionManager',
      'Nettoyage et détartrage automatiques iCareSystem',
    ],
    attention: ATT_FOUR + ' ' + ATT_GAZ,
    visuel: 'icombi-pro-20-1-1',
    fiche: 'iCombiPro_20-11_EG_Standard',
    versions: versionsFour('CF1ERRA.0000731', 'CF1GRRA.0000750', 'CF1GRRA.0000744'),
  },

  // =========================================================================
  // FOURS MIXTES — iCombi Classic
  // =========================================================================
  {
    slug: 'rational-icombi-classic-6-1-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Classic 6-1/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Classic 6-1/1',
    resume: 'Le four mixte RATIONAL en commande manuelle : on règle soi-même, il tient la consigne.',
    description:
      "L'iCombi Classic reprend la mécanique de l'iCombi Pro — générateur de vapeur, ventilation, régulation de l'humidité — avec une commande manuelle : le cuisinier choisit le mode, la température et le temps, le four tient la consigne. Pour les équipes qui savent ce qu'elles veulent et n'ont pas besoin d'assistants. Le nettoyage reste automatique. " +
      ENERGIE,
    usages: ['Restaurants traditionnels', 'Brasseries', 'Boulangeries-traiteurs', 'Petites collectivités'],
    caracteristiques: [
      '6 niveaux GN 1/1 (68 mm entre niveaux)',
      'Dimensions : 850 x 804 x 842 mm (L x H x P)',
      'Électrique : 10,8 kW en 400 V triphasé',
      'Gaz : 13 kW',
      'Poids : 95 kg en électrique, 110 kg au gaz',
      'Commande manuelle : vapeur, air pulsé, mixte',
      'Nettoyage automatique',
    ],
    attention: ATT_FOUR,
    visuel: 'icombi-classic-6-1-1',
    fiche: 'iCombiClassic_6-11_EG_Standard',
    versions: versionsFour('CB2ERRA.0000734', 'CB2GRRA.0000764', 'CB2GRRA.0000758'),
  },
  {
    slug: 'rational-icombi-classic-10-1-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Classic 10-1/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Classic 10-1/1',
    resume: 'Dix niveaux GN 1/1 en commande manuelle, pour les cuisines à deux services.',
    description:
      "Dix niveaux GN 1/1 dans la largeur d'un 6-1/1, en commande manuelle : le format des cuisines qui enchaînent les services et préfèrent régler leurs cuissons elles-mêmes. Même générateur de vapeur et même nettoyage automatique que l'iCombi Pro. " +
      ENERGIE,
    usages: ['Restaurants à fort débit', 'Hôtels', 'Collectivités', 'EHPAD'],
    caracteristiques: [
      '10 niveaux GN 1/1 (68 mm entre niveaux)',
      'Dimensions : 850 x 1 064 x 842 mm (L x H x P)',
      'Électrique : 18,9 kW en 400 V triphasé',
      'Gaz : 22 kW',
      'Poids : 123 kg en électrique, 143 kg au gaz',
      'Commande manuelle : vapeur, air pulsé, mixte',
      'Nettoyage automatique',
    ],
    attention: ATT_FOUR,
    visuel: 'icombi-classic-10-1-1',
    fiche: 'iCombiClassic_10-11_EG_Standard',
    versions: versionsFour('CD2ERRA.0000735', 'CD2GRRA.0000765', 'CD2GRRA.0000759'),
  },
  {
    slug: 'rational-icombi-classic-6-2-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Classic 6-2/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Classic 6-2/1',
    resume: 'Six niveaux GN 2/1 en commande manuelle : deux bacs 1/1 par niveau.',
    description:
      "Le format 2/1 en commande manuelle : chaque niveau reçoit un grand plat GN 2/1 ou deux bacs 1/1. Pour les cuisines de collectivité et les traiteurs qui travaillent de gros volumes avec des recettes qu'ils maîtrisent. " +
      ENERGIE,
    usages: ['Restauration collective', 'Traiteurs', 'Cuisines centrales'],
    caracteristiques: [
      '6 niveaux GN 2/1, soit 12 bacs GN 1/1',
      'Dimensions : 1 072 x 804 x 1 042 mm (L x H x P)',
      'Électrique : 22,4 kW en 400 V triphasé',
      'Gaz : 28 kW',
      'Poids : 128 kg en électrique, 147 kg au gaz',
      'Commande manuelle : vapeur, air pulsé, mixte',
      'Nettoyage automatique',
    ],
    attention: ATT_FOUR,
    visuel: 'icombi-classic-6-2-1',
    fiche: 'iCombiClassic_6-21_EG_Standard',
    versions: versionsFour('CC2ERRA.0000736', 'CC2GRRA.0000766', 'CC2GRRA.0000760'),
  },
  {
    slug: 'rational-icombi-classic-10-2-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Classic 10-2/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Classic 10-2/1',
    resume: 'Dix niveaux GN 2/1 en commande manuelle, pour les grosses productions.',
    description:
      "Vingt bacs GN 1/1 par fournée, en commande manuelle : la capacité d'une cuisine centrale dans un four posé, pour les équipes qui conduisent leurs cuissons elles-mêmes. " +
      ENERGIE,
    usages: ['Cuisines centrales', 'Restauration scolaire', 'Traiteurs de grande capacité'],
    caracteristiques: [
      '10 niveaux GN 2/1, soit 20 bacs GN 1/1',
      'Dimensions : 1 072 x 1 064 x 1 042 mm (L x H x P)',
      'Électrique : 37,4 kW en 400 V triphasé',
      'Gaz : 40 kW',
      'Poids : 165 kg en électrique, 187 kg au gaz',
      'Commande manuelle : vapeur, air pulsé, mixte',
      'Nettoyage automatique',
    ],
    attention: ATT_FOUR,
    visuel: 'icombi-classic-10-2-1',
    fiche: 'iCombiClassic_10-21_EG_Standard',
    versions: versionsFour('CE2ERRA.0000737', 'CE2GRRA.0000767', 'CE2GRRA.0000761'),
  },
  {
    slug: 'rational-icombi-classic-20-1-1',
    type: 'machine',
    machines: ['four'],
    ref: 'iCombi Classic 20-1/1',
    categorie: 'fours-mixtes',
    nom: 'Four mixte iCombi Classic 20-1/1',
    resume: 'Le four sur pieds à chariot, en commande manuelle : 20 niveaux GN 1/1.',
    description:
      "Vingt niveaux GN 1/1 chargés par chariot à claies, en commande manuelle. Le chariot se prépare pendant que la fournée précédente cuit, et passe directement du four au banquet ou à la cellule de refroidissement. " +
      ENERGIE,
    usages: ['Cuisines centrales', 'Banquets', 'Production en liaison froide'],
    caracteristiques: [
      '20 niveaux GN 1/1 sur chariot à claies (65 mm entre niveaux)',
      'Dimensions : 877 x 1 872 x 913 mm (L x H x P)',
      'Électrique : 37,2 kW en 400 V triphasé',
      'Gaz : 42 kW',
      'Poids : 246 kg en électrique, 267 kg au gaz',
      'Commande manuelle : vapeur, air pulsé, mixte',
      'Nettoyage automatique',
    ],
    attention: ATT_FOUR + ' ' + ATT_GAZ,
    visuel: 'icombi-classic-20-1-1',
    fiche: 'iCombiClassic_20-11_EG_Standard',
    versions: versionsFour('CF2ERRA.0000738', 'CF2GRRA.0000768', 'CF2GRRA.0000762'),
  },

  // =========================================================================
  // SAUTEUSES MULTIFONCTIONS — iVario Pro
  // =========================================================================
  {
    slug: 'rational-ivario-pro-2-s',
    type: 'machine',
    machines: ['sauteuse'],
    ref: 'iVario Pro 2-S',
    categorie: 'sauteuses-multifonctions',
    nom: 'Sauteuse multifonction iVario Pro 2-S',
    resume: 'Deux cuves de 25 litres indépendantes : sauter, bouillir, frire et confire sur 1,10 m.',
    description:
      "Deux cuves de 25 litres, pilotées chacune à sa température : l'une saisit pendant que l'autre fait cuire des pâtes ou réduit une sauce. L'iVario remplace la sauteuse, la marmite, la friteuse et une partie du fourneau, et son fond de cuve monte à 200 °C en moins de 90 secondes. La version avec cuisson sous pression raccourcit nettement les braisages et les ragoûts.",
    usages: ['Restaurants et brasseries', 'Traiteurs', 'Cuisines à la carte en manque de feux', 'Cuisines de collectivité'],
    caracteristiques: [
      '2 cuves de 25 litres utiles, 19 dm² de surface de cuisson chacune',
      'Largeur 1 100 mm, profondeur 938 mm',
      'Électrique : 21 kW en 400 V triphasé',
      'Poids : 134 kg (157 kg avec cuisson sous pression)',
      'Remplissage d’eau automatique au litre près',
      'Vidange par la cuve, sans basculement ni caniveau de sol',
    ],
    attention:
      "L'iVario se pose sur un plan ou sur son soubassement, se raccorde en triphasé, à l'eau froide et à une évacuation. L'emplacement, la hauteur de travail et le raccordement électrique se vérifient au relevé, avant la commande.",
    visuel: 'ivario-pro-2-s',
    fiche: 'iVarioPro_2-S_Standard_RATIONAL',
    versions: [v('WY9ENRA.0005497', 'standard'), v('WY9EPRA.0005452', 'avec cuisson sous pression')],
  },
  {
    slug: 'rational-ivario-pro-l',
    type: 'machine',
    machines: ['sauteuse'],
    ref: 'iVario Pro L',
    categorie: 'sauteuses-multifonctions',
    nom: 'Sauteuse multifonction iVario Pro L',
    resume: 'Une cuve de 100 litres pour les grosses productions, sur pieds ou sur soubassement.',
    description:
      "Une grande cuve de 100 litres et 39 dm² de fond, pour les productions qui se comptent en centaines de portions : sauces, ragoûts, pâtes, viandes saisies en quantité. Le fond de cuve chauffe uniformément et se divise en zones de températures différentes. Les versions avec cuisson sous pression accélèrent les braisages et les cuissons longues.",
    usages: ['Cuisines centrales', 'Restauration collective', 'Traiteurs et banquets', 'Grandes brasseries'],
    caracteristiques: [
      'Cuve de 100 litres utiles, 39 dm² de surface de cuisson',
      'Largeur 1 030 mm, profondeur 894 mm',
      'Électrique : 27 kW en 400 V triphasé',
      'Poids : 196 kg (216 kg sur soubassement)',
      'Remplissage d’eau automatique au litre près',
      'Vidange par la cuve, sans basculement ni caniveau de sol',
    ],
    attention:
      "L'iVario Pro L se pose sur pieds ou sur son soubassement, se raccorde en triphasé, à l'eau froide et à une évacuation. L'emplacement, la hauteur de travail et le raccordement électrique se vérifient au relevé, avant la commande.",
    visuel: 'ivario-pro-l',
    versions: [
      v('WX9ENRA.0005015', 'standard', { fiche: 'iVarioPro_L_Standard_RATIONAL', ficheTitre: 'Fiche technique iVario Pro L standard' }),
      v('WX9EPRA.0006435', 'avec cuisson sous pression', { fiche: 'iVarioPro_L_Standard_RATIONAL', ficheTitre: 'Fiche technique iVario Pro L standard' }),
      v('WX9ENRA.0002816', 'sur soubassement', { fiche: 'iVarioPro_L_avec soubassement_RATIONAL', ficheTitre: 'Fiche technique iVario Pro L sur soubassement' }),
      v('WX9EPRA.0005640', 'sur soubassement, avec cuisson sous pression', { fiche: 'iVarioPro_L_avec soubassement_RATIONAL', ficheTitre: 'Fiche technique iVario Pro L sur soubassement' }),
    ],
  },

  // =========================================================================
  // ACCESSOIRES DES FOURS MIXTES
  // =========================================================================
  {
    slug: 'rational-soubassements-icombi',
    machines: ['four'],
    ref: 'Soubassement iCombi',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Soubassements pour iCombi',
    resume: 'Le support qui met le four à bonne hauteur, avec ou sans glissières de rangement.',
    description:
      "Un four de table se pose sur un soubassement RATIONAL : il le met à la bonne hauteur de travail, garde le niveau du haut sous 1,60 m, et range les bacs et les grilles à portée de main. Le modèle à pieds est le plus simple ; les soubassements I et II ajoutent des glissières pour les accessoires GN. Choisissez la taille de votre four.",
    usages: ['iCombi Pro et iCombi Classic', 'iCombi Pro XS'],
    caracteristiques: ['Acier inoxydable', 'Glissières pour accessoires GN (soubassements I et II)', 'Pieds réglables'],
    attention: ATT_ACC_FOUR,
    visuel: '60.31.089',
    versions: [
      v('60.31.668', 'soubassement à pieds, fours 6-1/1 et 10-1/1'),
      v('60.31.089', 'soubassement I, fours 6-1/1 et 10-1/1'),
      v('60.31.086', 'soubassement II, fours 6-1/1 et 10-1/1'),
      v('60.31.671', 'soubassement à pieds, fours 6-2/1 et 10-2/1'),
      v('60.31.090', 'soubassement I, fours 6-2/1 et 10-2/1'),
      v('60.31.087', 'soubassement II, fours 6-2/1 et 10-2/1'),
      v('60.31.029', 'soubassement, iCombi Pro XS 6-2/3'),
      v('60.31.018', 'soubassement I, iCombi Pro XS 6-2/3'),
    ],
  },
  {
    slug: 'rational-kit-combi-duo',
    machines: ['four'],
    ref: 'Kit Combi-Duo',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Kit de superposition Combi-Duo',
    resume: 'Deux fours l’un sur l’autre : deux cuissons différentes sur la surface d’un seul.',
    description:
      "Le kit Combi-Duo superpose deux fours RATIONAL : deux cuissons indépendantes — un rôti et des légumes vapeur, une fournée de viennoiseries et un plat du jour — sur l'emprise au sol d'un seul appareil. Le four du bas se pose sur un soubassement prévu pour la superposition. Le kit dépend des deux modèles superposés : nous le choisissons avec vous.",
    usages: ['Cuisines manquant de place', 'Restaurants à la carte', 'Boulangeries-traiteurs'],
    caracteristiques: ['Superposition de deux iCombi', 'Raccordements et évacuations prévus', 'Kit propre à chaque combinaison de fours'],
    attention: ATT_ACC_FOUR,
    versions: [
      v('60.73.991', '6-1/1 sur 6-1/1 ou 10-1/1 électrique'),
      v('60.74.725', '6-2/1 sur 6-2/1 ou 10-2/1 électrique'),
      v('60.73.768', 'XS 6-2/3 sur XS 6-2/3, charnières à droite'),
      v('60.74.276', 'XS 6-2/3 sur XS 6-2/3, charnières à gauche'),
    ],
  },
  {
    slug: 'rational-ultravent',
    machines: ['four'],
    ref: 'UltraVent',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Hotte à condensation UltraVent',
    resume: 'Capte les buées à l’ouverture de la porte, sans raccordement à une extraction.',
    description:
      "La hotte UltraVent se fixe sur le four et condense les buées qui s'échappent à l'ouverture de la porte et pendant le nettoyage. Elle évite d'installer une hotte d'extraction au-dessus d'un four électrique, et protège le plafond et le mobilier de l'humidité. Sur l'iCombi Pro, c'est le four qui adapte sa puissance d'aspiration.",
    usages: ['Fours électriques sans hotte au-dessus', 'Cuisines ouvertes', 'Locaux à plafond bas'],
    caracteristiques: ['Hotte à condensation', 'Pour fours électriques', 'Sans raccordement à une extraction'],
    attention: ATT_ACC_FOUR,
    versions: [
      v('60.75.134', 'fours électriques 6-1/1 et 10-1/1'),
      v('60.75.135', 'fours électriques 6-2/1 et 10-2/1'),
      v('60.75.136', 'four électrique 20-1/1'),
      v('60.73.865', 'iCombi Pro XS 6-2/3'),
    ],
  },
  {
    slug: 'rational-ultravent-plus',
    machines: ['four'],
    ref: 'UltraVent Plus',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Hotte à condensation UltraVent Plus',
    resume: 'L’UltraVent avec filtration des fumées, pour griller et rôtir sans extraction.',
    description:
      "L'UltraVent Plus ajoute à la condensation des buées une filtration des fumées de cuisson : on peut griller et rôtir dans une cuisine ouverte ou dans un local sans extraction, sans odeur ni fumée dans la salle. Elle se fixe sur le four électrique.",
    usages: ['Cuisines ouvertes sur la salle', 'Points de vente et corners', 'Locaux sans extraction'],
    caracteristiques: ['Condensation des buées et filtration des fumées', 'Pour fours électriques'],
    attention: ATT_ACC_FOUR,
    versions: [
      v('60.75.142', 'fours électriques 6-1/1 et 10-1/1'),
      v('60.75.143', 'fours électriques 6-2/1 et 10-2/1'),
      v('60.74.394', 'iCombi Pro XS 6-2/3'),
    ],
  },
  {
    slug: 'rational-condenseur-vapeurs',
    machines: ['four'],
    ref: 'Condenseur de vapeurs',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Condenseur de vapeurs',
    resume: 'Le tube qui condense la vapeur sortant de la cheminée du four.',
    description:
      "Le condenseur se monte sur la sortie de buées du four et en condense la vapeur, qui repart à l'évacuation au lieu de s'échapper dans la cuisine. Un petit accessoire qui protège la hotte, les plafonds et les luminaires au-dessus du four.",
    usages: ['iCombi Pro et iCombi Classic'],
    caracteristiques: ['Acier inoxydable', 'Monté sur la sortie de buées'],
    attention: ATT_ACC_FOUR,
    versions: [
      v('60.72.592', 'fours 6-1/1, 10-1/1, 6-2/1 et 10-2/1'),
      v('60.75.326', 'fours 20-1/1 et 20-2/1'),
      v('60.74.037', 'iCombi Pro XS 6-2/3'),
    ],
  },
  {
    slug: 'rational-variosmoker',
    machines: ['four'],
    ref: '60.75.371',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Fumoir VarioSmoker',
    resume: 'Un fumoir dans le four mixte, piloté par l’iCombi Pro.',
    description:
      "Le VarioSmoker se pose dans l'enceinte et se branche sur le four, qui le pilote : on fume viandes, poissons, légumes ou fromages avec des copeaux ou des granulés de bois. Une carte de produits fumés sans fumoir dédié ni place supplémentaire.",
    usages: ['iCombi Pro', 'Restaurants et bistronomie', 'Traiteurs'],
    caracteristiques: ['Piloté par l’iCombi Pro', 'Copeaux ou granulés de bois'],
    attention: ATT_ACC_FOUR,
    versions: [v('60.75.371', 'pour iCombi Pro')],
  },
  {
    slug: 'rational-combifry',
    machines: ['four'],
    ref: 'CombiFry',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Panier CombiFry',
    resume: 'Frites, nuggets et légumes panés au four, sans bain d’huile.',
    description:
      "Le panier CombiFry fait « frire » au four : frites surgelées, nuggets, légumes panés ou wedges dorent dans l'air chaud, sans bain d'huile à surveiller ni à changer. Plusieurs paniers par fournée, et autant de place libérée sur la friteuse.",
    usages: ['Snacking et restauration rapide', 'Collectivités', 'Brasseries'],
    caracteristiques: ['Treillis inox', 'Format GN'],
    attention: ATT_GN,
    versions: [v('6019.1150', '1/1 GN'), v('60.73.619', '2/3 GN'), v('6019.1250', '1/3 GN')],
  },
  {
    slug: 'rational-multibaker',
    machines: ['four'],
    ref: 'Multibaker',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Plaque Multibaker',
    resume: 'Œufs au plat, omelettes et galettes en série, à alvéoles anti-adhérentes.',
    description:
      "Plaque à alvéoles anti-adhérente pour cuire en série œufs au plat, omelettes, röstis, pancakes ou petits gâteaux, tous à la même forme. C'est l'accessoire des petits-déjeuners d'hôtel et des buffets.",
    usages: ['Petits-déjeuners d’hôtel', 'Buffets', 'Collectivités'],
    caracteristiques: ['Revêtement anti-adhérent', 'Alvéoles rondes', 'Format GN'],
    attention: ATT_GN,
    versions: [v('60.71.157', '1/1 GN'), v('60.73.646', '2/3 GN'), v('60.73.764', '1/3 GN')],
  },
  {
    slug: 'rational-plaque-griller-pizza',
    machines: ['four'],
    ref: 'Plaque à griller et à pizza',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Plaque à griller et à pizza',
    resume: 'Une face rainurée pour le marquage, une face lisse pour les pizzas et les galettes.',
    description:
      "Plaque réversible : la face rainurée marque viandes, poissons et légumes comme sur un grill, la face lisse cuit pizzas, flammekueches et galettes. Elle monte vite en température et la restitue au produit.",
    usages: ['Restaurants et brasseries', 'Pizzas et snacking', 'Grillades en série'],
    caracteristiques: ['Réversible : rainurée et lisse', 'Format GN'],
    attention: ATT_GN,
    versions: [v('60.70.943', '1/1 GN'), v('60.73.798', '2/3 GN')],
  },
  {
    slug: 'rational-grille-combigrill',
    machines: ['four'],
    ref: '6035.1017',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Grille CombiGrill 1/1 GN',
    resume: 'La grille qui marque les grillades au four.',
    description:
      "Grille à barreaux qui marque steaks, poissons et légumes comme un grill, en série et sans surveillance. Elle se nettoie dans le four, avec le cycle automatique.",
    usages: ['Restaurants et brasseries', 'Grillades en série'],
    caracteristiques: ['Marquage grill', 'Format 1/1 GN'],
    attention: ATT_GN,
    versions: [v('6035.1017', '1/1 GN')],
  },
  {
    slug: 'rational-grilles-poulet',
    machines: ['four'],
    ref: 'Grille spéciale poulets',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Grilles spéciales poulets',
    resume: 'Les poulets tenus debout : une peau croustillante sur toute la surface.',
    description:
      "Les poulets se posent debout sur la grille : l'air chaud circule tout autour, la peau dore uniformément et la graisse s'écoule dans un bac placé en dessous. Un niveau de four rôtit de quatre à dix poulets selon la grille.",
    usages: ['Rôtisseries et traiteurs', 'Restaurants', 'Collectivités'],
    caracteristiques: ['Inox', 'Format 1/1 GN', 'Poulets tenus debout'],
    attention: ATT_GN,
    versions: [
      v('6035.1015', '4 poulets'),
      v('6035.1016', '6 poulets'),
      v('6035.1006', '8 poulets'),
      v('6035.1010', '10 poulets'),
    ],
  },
  {
    slug: 'rational-plats-granite-emaille',
    machines: ['four'],
    ref: 'Plats granité émaillé',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Plats en granité émaillé',
    resume: 'Les plats à rôtir, braiser et gratiner, en plusieurs profondeurs.',
    description:
      "Plats en acier émaillé granité, pour rôtir, braiser ou gratiner, et servir dans le même plat. L'émail supporte la vapeur comme les hautes températures. Plusieurs profondeurs, pour un gratin ou pour une pièce de viande avec son jus.",
    usages: ['Rôtis et braisés', 'Gratins', 'Garnitures'],
    caracteristiques: ['Acier émaillé granité', 'Format GN'],
    attention: ATT_GN,
    versions: [
      v('6014.1102', '1/1 GN, 20 mm'),
      v('6014.1104', '1/1 GN, 40 mm'),
      v('6014.1106', '1/1 GN, 60 mm'),
      v('6014.2302', '2/3 GN, 20 mm'),
      v('6014.2304', '2/3 GN, 40 mm'),
      v('6014.2306', '2/3 GN, 60 mm'),
    ],
  },
  {
    slug: 'rational-plaques-patissieres',
    machines: ['four'],
    ref: 'Plaques pâtissières',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Plaques de cuisson et pâtissières',
    resume: 'Perforées pour les viennoiseries et le pain, pleines pour les cuissons avec jus.',
    description:
      "Plaques anti-adhérentes au format GN. Les perforées laissent passer l'air chaud sous la pâte : viennoiseries, pains et produits panés cuisent dessous comme dessus. Les pleines gardent le jus des rôtis et des légumes. Le revêtement évite le papier cuisson.",
    usages: ['Viennoiseries et pains', 'Produits panés', 'Rôtis et légumes'],
    caracteristiques: ['Revêtement anti-adhérent', 'Perforées ou pleines', 'Format GN'],
    attention: ATT_GN,
    versions: [
      v('6015.1103', 'perforée, 1/1 GN'),
      v('6015.2103', 'perforée, 2/1 GN'),
      v('60.74.147', 'perforée, 2/3 GN'),
      v('6013.1103', 'pleine, 1/1 GN'),
      v('6013.2103', 'pleine, 2/1 GN'),
      v('60.73.671', 'pleine, 2/3 GN'),
    ],
  },
  {
    slug: 'rational-grilles-inox',
    machines: ['four'],
    ref: 'Grille inox',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Grilles en acier inoxydable',
    resume: 'La grille de base du four mixte, pour poser plats et bacs ou griller directement.',
    description:
      "Grille plate en acier inoxydable : elle reçoit les plats et les bacs qui n'ont pas leur propre glissière, et sert aux cuissons directes. Un four ne compte jamais assez de grilles le jour d'un banquet.",
    usages: ['Tous les iCombi'],
    caracteristiques: ['Acier inoxydable', 'Format GN'],
    attention: ATT_GN,
    versions: [v('6010.1101', '1/1 GN'), v('6010.2101', '2/1 GN'), v('6010.2301', '2/3 GN')],
  },
  {
    slug: 'rational-bacs-inox',
    machines: ['four'],
    ref: 'Bac inox',
    categorie: 'accessoires-fours-mixtes',
    nom: 'Bacs en acier inoxydable',
    resume: 'Les bacs GN pleins et perforés : cuisson vapeur, garnitures, maintien.',
    description:
      "Bacs Gastronorme en acier inoxydable. Les pleins servent aux garnitures, aux sauces et aux cuissons avec liquide ; le perforé laisse circuler la vapeur autour des légumes, des pommes de terre ou du poisson et égoutte en même temps.",
    usages: ['Cuisson vapeur', 'Garnitures et sauces', 'Maintien en température'],
    caracteristiques: ['Acier inoxydable', 'Format GN', 'Pleins ou perforé'],
    attention: ATT_GN,
    versions: [
      v('6013.1102', '1/1 GN, 20 mm'),
      v('6013.1104', '1/1 GN, 40 mm'),
      v('6013.1106', '1/1 GN, 65 mm'),
      v('6015.1165', 'perforé, 1/1 GN'),
      v('6013.2302', '2/3 GN, 20 mm'),
      v('6013.2306', '2/3 GN, 65 mm'),
    ],
  },

  // =========================================================================
  // ACCESSOIRES iVARIO
  // =========================================================================
  {
    slug: 'rational-soubassement-ivario-2-s',
    machines: ['sauteuse'],
    ref: 'Soubassement iVario 2-S',
    categorie: 'accessoires-ivario',
    nom: 'Soubassement pour iVario Pro 2-S',
    resume: 'Met l’iVario 2-S à hauteur de travail, sur pieds ou sur roulettes.',
    description:
      "Le soubassement pose l'iVario Pro 2-S à la bonne hauteur et dégage un espace de rangement en dessous. Sur pieds pour une installation fixe, sur roulettes pivotantes pour le déplacer au nettoyage.",
    usages: ['iVario Pro 2-S'],
    caracteristiques: ['Acier inoxydable', 'Pieds ou roulettes pivotantes'],
    attention:
      'Accessoire propre au modèle 2-S. Pour un iVario L ou XL, le soubassement se choisit avec la machine : demandez-nous.',
    visuel: 'soubassement-ivario-2-s',
    versions: [
      v('60.31.854', 'sur pieds'),
      v('60.31.856', 'sur pieds en acier inoxydable'),
      v('60.31.855', 'sur roulettes pivotantes'),
    ],
  },
  {
    slug: 'rational-paniers-pochage-ivario',
    machines: ['sauteuse'],
    ref: 'Panier pochage iVario',
    categorie: 'accessoires-ivario',
    nom: 'Panier de pochage pour iVario',
    resume: 'Pâtes, légumes, œufs : on plonge, on relève, on égoutte.',
    description:
      "Le panier de pochage se plonge dans la cuve : pâtes, riz, légumes ou œufs pochés cuisent et s'égouttent d'un seul geste. Avec le bras de relevage (accessoire), l'iVario Pro le relève lui-même en fin de cuisson, à point et sans surveillance.",
    usages: ['Pâtes et riz', 'Légumes', 'Œufs pochés'],
    caracteristiques: ['Acier inoxydable', 'Relevage automatique avec le bras de relevage (accessoire)'],
    attention: 'Choisissez le panier de la taille de votre iVario : 2-S, ou L et XL.',
    versions: [v('60.74.986', 'iVario 2-S'), v('60.74.983', 'iVario L et XL')],
  },
  {
    slug: 'rational-paniers-friture-ivario',
    machines: ['sauteuse'],
    ref: 'Panier friture iVario',
    categorie: 'accessoires-ivario',
    nom: 'Panier de friture pour iVario',
    resume: 'L’iVario en friteuse, avec une température d’huile tenue au degré.',
    description:
      "Avec son panier de friture, l'iVario devient friteuse : l'huile est tenue à la température réglée et, avec le bras de relevage (accessoire), le panier se relève seul en fin de cuisson. Une friteuse de plus le jour où la carte en demande, sans appareil supplémentaire.",
    usages: ['Frites et beignets', 'Poissons et tempuras'],
    caracteristiques: ['Acier inoxydable', 'Relevage automatique avec le bras de relevage (accessoire)'],
    attention: 'Choisissez le panier de la taille de votre iVario : 2-S, ou L et XL.',
    versions: [v('60.75.330', 'iVario 2-S'), v('60.75.391', 'iVario L et XL')],
  },
];

// ---------------------------------------------------------------------------
// Assemblage avec le tarif et les visuels
// ---------------------------------------------------------------------------

/** Toutes les références du tarif utilisées ici — lu par le générateur. */
export const refsRational = fiches.flatMap((f) => f.versions.map((x) => x.ref));

/** Les références introuvables dans le tarif généré (doit rester vide). */
export const refsRationalManquantes = refsRational.filter((r) => !tarifRational[r]);

const photoDe = (f) => {
  const cle = f.visuel ?? f.versions.map((x) => x.ref).find((r) => photosRational[r]);
  return photosRational[cle] ?? null;
};
const ficheDe = (nom) => (nom && fichesRational[nom] ? `/assets/fiches/${fichesRational[nom]}` : null);

export const produitsRational = fiches.map((f) => {
  const { versions, visuel, fiche, ...reste } = f;
  return {
    marque: MARQUE,
    creditVisuel: 'RATIONAL',
    photo: photoDe(f),
    usages: [],
    // Accessoires : commandés chez RATIONAL, pas en stock chez nous. La fiche
    // ne doit donc promettre ni stock ni tournée.
    ...(f.type === 'machine' ? {} : { surCommande: true }),
    ...reste,
    conditionnements: versions.map((x) => {
      const t = tarifRational[x.ref] || {};
      const pdf = ficheDe(x.fiche || fiche);
      return {
        label: `${x.ref} · ${x.court}`,
        refFabricant: x.ref,
        prix: typeof t.prix === 'number' ? t.prix : null,
        ...(pdf ? { ficheFabricant: pdf } : {}),
        ...(pdf && x.ficheTitre ? { ficheTitre: x.ficheTitre } : {}),
      };
    }),
  };
});
