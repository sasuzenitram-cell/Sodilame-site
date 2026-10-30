// ---------------------------------------------------------------------------
// INFRICO — sélection « 20/80 » de la boutique
//
// Même méthode que Miele, RATIONAL et Foster. Ce fichier est écrit à la main :
// il choisit les modèles, les regroupe en fiches et porte les textes. Le PRIX
// vient du tarif INFRICO, lu dans `infrico-tarif.mjs`, généré par :
//
//     node outils/infrico-tarif.mjs <1_Import_Produits_INFRICO_….csv> <2_….csv>
//
// Les photos et les liens vers les documents Infrico (fiche technique,
// catalogue de gamme) viennent des sites publics du fabricant
// (`infrico-visuels.mjs`, généré par outils/infrico-visuels.py).
//
// ⚠️  PRIX AFFICHÉ = PRIX PUBLIC INFRICO FRANCE, HT (PVP 2026), choix de la
//     direction du 30/10/2026. Le prix d'achat SODILAME n'est JAMAIS lu par le
//     générateur et ne doit jamais apparaître dans ce dépôt.
//
// ⚠️  SÉLECTION de la direction (30/10/2026) : arrière-bars et mobilier de
//     bar, vitrines à boissons, vitrines de comptoir, caves à vin, armoires
//     (GN 2/1, Slim GN 1/1, pâtisserie 600 x 400, vitrées, maturation),
//     tables, tables basses, saladettes et tables à pizza, cellules, vitrines
//     pâtisserie et glaces, congélateurs, buffets BasicBuffet. Les références
//     « 80 % gagnants » du commercial Infrico sud-est y sont reprises.
//     HORS SÉLECTION, sur décision de la direction : machines à glaçons
//     Infrico (la boutique proposera Codigel, Hoshizaki ou Scotsman), gamme
//     éco iLine. Le reste du tarif (4 659 références) est sur devis.
//
// Les libellés du tarif Infrico sont traduits de l'espagnol de façon
// approximative : aucun n'est affiché. Tous les textes sont rédigés ici, à
// partir des fiches techniques Infrico.
// ---------------------------------------------------------------------------
import { tarifInfrico } from './infrico-tarif.mjs';
// Visuels des sites Infrico : décision de la direction du 30/10/2026, sous sa
// responsabilité (voir infrico-visuels.mjs).
import { photosInfrico, documentsInfrico } from './infrico-visuels.mjs';

const MARQUE = 'Infrico';

const POS = 'positive';
const NEG = 'négative';
const ATT_ARMOIRE =
  "Une armoire réfrigérée rejette la chaleur qu'elle retire : il lui faut de l'air autour d'elle, et elle doit passer les portes jusqu'à son emplacement. Nous vérifions l'accès, la prise électrique et la ventilation du local avant la livraison.";
const ATT_TABLE =
  "Un meuble bas réfrigéré se pose loin des sources de chaleur — fourneau, friteuse, lave-vaisselle — et sur une prise dédiée. Nous vérifions l'emplacement avant la livraison.";
const ATT_BAR =
  "Derrière un bar, l'air manque souvent : un arrière-bar enfermé sous un comptoir sans ventilation peine à refroidir et s'use vite. Nous vérifions l'emplacement, la ventilation et la prise avant la livraison.";
const ATT_VITRINE =
  "Une vitrine réfrigérée est réglée pour la salle, pas pour une cuisine chaude : évitez le plein soleil, une porte d'entrée ou une source de chaleur à proximité. Nous vérifions l'emplacement avant la livraison.";
const ATT_CAVE =
  "Une cave à vin se pose loin du soleil et des sources de chaleur, sur un sol plan. Les modèles encastrables ou sous comptoir demandent une ventilation par l'avant : nous vérifions l'emplacement avant la livraison.";
const ATT_CELLULE =
  "Une cellule de refroidissement travaille fort pendant le cycle : prise dédiée et air autour du groupe sont indispensables. Nous vérifions l'alimentation électrique au relevé, avant la commande.";
const ATT_BUFFET =
  "Les modules BasicBuffet se juxtaposent pour composer une ligne de buffet ; chacun se branche sur sa propre prise. Plateaux, écrans et décorations se choisissent en option : demandez-nous la configuration complète.";
const CLIM5 = 'Classe climatique 5 : ambiance jusqu’à 40 °C';
const CLIM4 = 'Classe climatique 4 : ambiance jusqu’à 30 °C';

const v = (ref, court) => ({ ref, court });

/**
 * Les fiches. Champs propres à ce fichier :
 *   cle      : clé de la photo (infrico-visuels.mjs, outils/infrico-visuels.py).
 *   versions : [{ ref: référence EXACTE du tarif, court: précision affichée }]
 */
const fiches = [
  // =========================================================================
  // ARRIÈRE-BARS ET MOBILIER DE BAR
  // =========================================================================
  {
    cle: 'eb',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'EB',
    categorie: 'arrieres-bars',
    nom: 'Refroidisseur de bouteilles EB, couvercles coulissants',
    resume: 'Le refroidisseur de bar inox qu’on ouvre par le dessus, de 1 à 2,5 m.',
    description:
      "Le refroidisseur de bouteilles du bar, à hauteur de comptoir : on le charge et on se sert par le dessus, sous des couvercles coulissants à poignée intégrée qui ne gênent jamais le passage. Bières, softs et vins blancs y restent à température de service. Structure entièrement inox, régulation électronique, quatre longueurs pour suivre celle du comptoir.",
    usages: ['Bars et cafés', 'Brasseries', 'Campings — bar et snack', 'Hôtels'],
    caracteristiques: [
      'De +3 à +6 °C',
      'Longueurs 1 000, 1 500, 2 000 et 2 500 mm ; profondeur 550 mm, hauteur 865 mm',
      'De 265 L (1 000 mm) à 445 L selon la longueur',
      'Couvercles coulissants sur le dessus, tout inox AISI 304',
      CLIM4,
    ],
    attention: ATT_BAR,
    versions: [
      v('EB1000II', '1 000 mm, inox'),
      v('EB1500II', '1 500 mm, inox'),
      v('EB2000II', '2 000 mm, inox'),
      v('EB2500II', '2 500 mm, inox'),
    ],
  },
  {
    cle: 'ebc',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'EBC',
    categorie: 'arrieres-bars',
    nom: 'Refroidisseur de bouteilles EBC, avec tiroirs',
    resume: 'Le refroidisseur EB, avec des tiroirs réfrigérés en plus sous le bac.',
    description:
      "Le refroidisseur de bouteilles EB, avec des tiroirs réfrigérés sous le bac à bouteilles : citrons, garnitures, softs en canette ou réserve de bouteilles se rangent à part, à portée de main. Chargement du bac par le dessus, structure inox, régulation électronique.",
    usages: ['Bars à cocktails', 'Bars de nuit', 'Brasseries', 'Bars d’hôtel'],
    caracteristiques: [
      'De +3 à +6 °C',
      'Longueurs 1 000, 1 500 et 2 000 mm ; profondeur 550 mm, hauteur 865 mm',
      'Bac à couvercles coulissants et tiroirs réfrigérés, tout inox AISI 304',
      CLIM4,
    ],
    attention: ATT_BAR,
    versions: [v('EBC1000II', '1 000 mm, tiroirs, inox'), v('EBC1500II', '1 500 mm, tiroirs, inox'), v('EBC2000II', '2 000 mm, tiroirs, inox')],
  },
  {
    cle: 'efp',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'EFP',
    categorie: 'arrieres-bars',
    nom: 'Refroidisseur de bouteilles par le dessus EFP',
    resume: 'Le bac à bouteilles qu’on charge et qu’on sert par le dessus.',
    description:
      "Le refroidisseur de bouteilles « à fond plat » : un grand bac réfrigéré qu'on remplit par le dessus, où les bouteilles se rangent debout et se prennent sans se baisser. Il reçoit beaucoup en peu de place, et c'est le meuble des bars à bière, des buvettes et des snacks de plage. Extérieur en tôle plastifiée blanche (EG) ou tout inox (II).",
    usages: ['Bars à bière', 'Buvettes et snacks de plage', 'Campings', 'Salles des fêtes'],
    caracteristiques: [
      'De +3 à +6 °C',
      'Longueurs 1 000, 1 500 et 2 000 mm',
      '305 L pour le 1 000 mm',
      'Extérieur plastifié blanc ou tout inox AISI 304',
      CLIM4,
    ],
    attention: ATT_BAR,
    versions: [
      v('EFP1000EG', '1 000 mm, extérieur blanc'),
      v('EFP1500EG', '1 500 mm, extérieur blanc'),
      v('EFP2000EG', '2 000 mm, extérieur blanc'),
      v('EFP1000II', '1 000 mm, tout inox'),
      v('EFP1500II', '1 500 mm, tout inox'),
      v('EFP2000II', '2 000 mm, tout inox'),
    ],
  },
  {
    cle: 'erv',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'ERV',
    categorie: 'arrieres-bars',
    nom: 'Arrière-bar vitré ERV, 1 à 3 portes',
    resume: 'Les bouteilles en vitrine derrière le bar : le client voit ce qu’il commande.',
    description:
      "L'arrière-bar à portes vitrées et éclairage LED : les bouteilles sont en vitrine, ce qui fait vendre les références qu'on veut mettre en avant. Portes à fermeture automatique et serrure, réversibles. Extérieur noir, ou tout inox ; une version à portes pleines existe pour les comptoirs où l'on préfère ne rien montrer.",
    usages: ['Bars et cafés', 'Caves et épiceries fines', 'Restaurants — service des boissons', 'Hôtels'],
    caracteristiques: [
      'De +4 à +12 °C',
      'Hauteur 920 mm ; 1 porte : 600 x 510 mm, 140 L',
      '1, 2 ou 3 portes, vitrées ou pleines',
      'Éclairage LED, portes à fermeture automatique avec serrure',
      CLIM4,
    ],
    attention: ATT_BAR,
    versions: [
      v('ERV15', '1 porte vitrée, noir'),
      v('ERV25', '2 portes vitrées, noir'),
      v('ERV15II', '1 porte vitrée, inox'),
      v('ERV25II', '2 portes vitrées, inox'),
      v('ERV35II', '3 portes vitrées, inox'),
      v('ERV15PP', '1 porte pleine'),
      v('ERV25PP', '2 portes pleines'),
    ],
  },
  {
    cle: 'bst',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'BST R',
    categorie: 'arrieres-bars',
    nom: 'Station cocktail réfrigérée Bar Station BST',
    resume: 'Le poste du barman : bac à glace, ingrédients et froid réunis.',
    description:
      "La station de travail du barman, pensée pour enchaîner les cocktails : bac à glace avec séparateurs (glace pilée et glaçons côte à côte), mini-bacs pour les garnitures à portée de main, robinet mitigeur à la bonne hauteur pour les verres, et une base réfrigérée GN 1/1 en dessous pour les jus, sirops et préparations.",
    usages: ['Bars à cocktails', 'Bars d’hôtel', 'Rooftops et bars de plage', 'Restaurants avec bar'],
    caracteristiques: [
      'Base réfrigérée GN 1/1, profondeur 700 mm',
      'Longueurs 1 600 et 2 000 mm',
      'Bac à glace avec séparateurs, mini-bacs à garnitures, robinet mitigeur',
      'Fluide R290',
    ],
    attention:
      "La station demande une arrivée d'eau et une évacuation en plus de l'électricité : elles se prévoient avec l'agencement du bar. Nous les vérifions au relevé, avant la commande.",
    versions: [v('BST1600R', '1 600 mm, base réfrigérée'), v('BST2000R', '2 000 mm, base réfrigérée')],
  },
  {
    cle: 'mcaf',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'MCAF',
    categorie: 'arrieres-bars',
    nom: 'Meuble machine à café MCAF',
    resume: 'Le meuble inox qui porte la machine à café, avec son tiroir à marc.',
    description:
      "Le meuble de comptoir sur lequel se pose la machine à café : tout inox, tiroir à marc intégré, tiroirs et portes pour ranger tasses et consommables, dessus avec dosseret. En 820 mm, ou en 1 000 mm avec la partie café à droite ou à gauche selon le sens du comptoir.",
    usages: ['Cafés et bars', 'Boulangeries-salons de thé', 'Hôtels — petit-déjeuner', 'Restaurants'],
    caracteristiques: [
      'Inox AISI 304, pieds réglables',
      'Tiroir à marc, tiroirs et portes',
      'Dessus avec dosseret de 100 mm',
      'Longueurs 820 mm ou 1 000 mm (café à droite ou à gauche)',
    ],
    attention: 'Meuble non réfrigéré. La machine à café, son adoucisseur et leurs raccordements se commandent à part : demandez-nous.',
    versions: [
      v('MCAF820', '820 mm'),
      v('MCAF1000CD', '1 000 mm, café à droite'),
      v('MCAF1000CI', '1 000 mm, café à gauche'),
    ],
  },
  {
    cle: 'fmpp',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'FMPP CR',
    categorie: 'arrieres-bars',
    nom: 'Comptoir réfrigéré vitré FMPP',
    resume: 'Le comptoir de cafétéria à portes vitrées, hauteur 1 050 mm.',
    description:
      "Le comptoir réfrigéré qui fait à la fois plan de travail et réserve, à hauteur de comptoir de bar : portes vitrées pour voir le stock, plan inox au-dessus. Trois longueurs, de 340 à 690 litres.",
    usages: ['Cafétérias', 'Bars et brasseries', 'Snacks', 'Hôtels'],
    caracteristiques: [
      'De +2 à +6 °C',
      'Longueurs 1 500, 2 000 et 2 500 mm ; hauteur 1 050 mm',
      '340, 520 ou 690 L selon la longueur',
      'Portes vitrées, inox, fluide R290',
      CLIM4,
    ],
    attention: ATT_BAR,
    versions: [v('FMPP1500CR', '1 500 mm, portes vitrées'), v('FMPP2000CR', '2 000 mm, portes vitrées'), v('FMPP2500CR', '2 500 mm, portes vitrées')],
  },

  // =========================================================================
  // VITRINES À BOISSONS ET DE COMPTOIR
  // =========================================================================
  {
    cle: 'nec1',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'NEC501RV',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à boissons positive NEC 501 RV, 1 porte',
    resume: 'La vitrine verticale qui vend les boissons fraîches en libre-service.',
    description:
      "La vitrine réfrigérée à porte vitrée qu'on place côté client : boissons, produits laitiers, sandwiches emballés, tout se voit et se prend. Éclairage LED, 500 litres sur moins de 70 cm de large.",
    usages: ['Snacks et sandwicheries', 'Épiceries et supérettes de camping', 'Boulangeries', 'Stations-service'],
    caracteristiques: ['De +2 à +8 °C', '500 L', 'Dimensions : 687 x 738 x 2 010 mm (L x P x H)', 'Porte vitrée, éclairage LED, fluide R290', CLIM4],
    attention: ATT_VITRINE,
    versions: [v('NEC501RV', '1 porte vitrée, positive')],
  },
  {
    cle: 'nec2',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'NEC1002RV',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à boissons positive NEC 1002 RV, 2 portes',
    resume: 'Deux portes vitrées, 1 000 litres de boissons en libre-service.',
    description:
      "La version deux portes de la vitrine à boissons : 1 000 litres de froid positif en libre-service, pour les points de vente qui écoulent du volume — supérettes de camping, snacks de plage, boulangeries.",
    usages: ['Supérettes et épiceries de camping', 'Snacks', 'Boulangeries', 'Cafétérias'],
    caracteristiques: ['De +2 à +8 °C', '1 000 L', 'Dimensions : 1 385 x 705 x 2 010 mm (L x P x H)', '2 portes vitrées, éclairage LED, fluide R290', CLIM4],
    attention: ATT_VITRINE,
    versions: [v('NEC1002RV', '2 portes vitrées, positive')],
  },
  {
    cle: 'nec1bt',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'NEC401FS / NEC501FV',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine négative NEC, 1 porte',
    resume: 'Glaces et surgelés en libre-service, derrière une porte vitrée.',
    description:
      "La vitrine négative à porte vitrée pour les glaces en pot, les bâtonnets et les surgelés. Deux versions : statique (NEC 401 FS, 430 L), la plus simple, ou ventilée (NEC 501 FV, 500 L), où le froid circule mieux et le givre se forme moins.",
    usages: ['Snacks et glaciers', 'Supérettes de camping', 'Boulangeries'],
    caracteristiques: ['De −15 à −25 °C', 'NEC 401 FS : statique, 430 L, 687 x 670 x 2 010 mm', 'NEC 501 FV : ventilée, 500 L', 'Porte vitrée, éclairage LED, fluide R290', CLIM4],
    attention: ATT_VITRINE,
    versions: [v('NEC401FS', 'statique, 430 L'), v('NEC501FV', 'ventilée, 500 L')],
  },
  {
    cle: 'nec2bt',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'NEC1002FV',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine négative NEC 1002 FV, 2 portes',
    resume: 'Deux portes vitrées de surgelés et de glaces, en froid ventilé.',
    description:
      "La grande vitrine négative à deux portes vitrées, en froid ventilé : le volume des points de vente qui vendent glaces et surgelés toute la saison.",
    usages: ['Supérettes de camping', 'Glaciers', 'Snacks de plage'],
    caracteristiques: ['Froid négatif ventilé', '1 000 L', 'Dimensions : 1 385 x 705 x 2 010 mm (L x P x H)', '2 portes vitrées, éclairage LED, fluide R290', CLIM4],
    attention: ATT_VITRINE,
    versions: [v('NEC1002FV', '2 portes vitrées, négative ventilée')],
  },
  {
    cle: 'vet',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'VET',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à tapas réfrigérée VET',
    resume: 'Sur le comptoir, les tapas au frais et en vue, de 4 à 8 bacs GN.',
    description:
      "La vitrine de comptoir qui présente tapas, entrées et desserts au frais, sous une vitre bombée relevable. Bac intérieur inox à angles arrondis, froid par plaque, éclairage LED, porte arrière côté service. De 4 à 8 bacs gastronormes, en deux versions (P et DP).",
    usages: ['Bars à tapas', 'Bars à vin et caves à manger', 'Traiteurs', 'Buffets de petit-déjeuner'],
    caracteristiques: ['4, 6 ou 8 bacs GN', 'Vitre bombée relevable, porte arrière', 'Bac inox AISI 304, éclairage LED', 'Dégivrage manuel'],
    attention: ATT_VITRINE,
    versions: [
      v('VET4P', '4 bacs, version P'),
      v('VET6P', '6 bacs, version P'),
      v('VET8P', '8 bacs, version P'),
      v('VET4DP', '4 bacs, version DP'),
      v('VET6DP', '6 bacs, version DP'),
      v('VET8DP', '8 bacs, version DP'),
    ],
  },
  {
    cle: 'veb',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'VEB',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine de comptoir réfrigérée VEB',
    resume: 'Plats et tapas sur le bar, sous verre bombé ou plat, de 81 cm à 1,69 m.',
    description:
      "La vitrine de bar pour exposer plats, tapas et desserts sur le comptoir. Deux lignes au choix : vitre bombée (CC), classique, ou vitre plate (CP), plus contemporaine. Cinq longueurs pour suivre celle du comptoir.",
    usages: ['Bars à tapas', 'Cafés-restaurants', 'Traiteurs', 'Boulangeries'],
    caracteristiques: ['Longueurs 810, 1 162, 1 338, 1 541 et 1 690 mm environ', 'Vitre bombée ou plate', 'Bac inox AISI 304, éclairage LED'],
    attention: ATT_VITRINE,
    versions: [
      v('VEB4CC', '810 mm, vitre bombée'),
      v('VEB6CC', '1 162 mm, vitre bombée'),
      v('VEB7CC', '1 338 mm, vitre bombée'),
      v('VEB8CC', '1 541 mm, vitre bombée'),
      v('VEB9CC', '1 690 mm, vitre bombée'),
      v('VEB4CP', '810 mm, vitre plate'),
      v('VEB6CP', '1 162 mm, vitre plate'),
      v('VEB7CP', '1 338 mm, vitre plate'),
      v('VEB8CP', '1 514 mm, vitre plate'),
      v('VEB9CP', '1 690 mm, vitre plate'),
    ],
  },
  {
    cle: 'vip14',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'VIP 1/4',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à ingrédients pizza et sandwiches VIP, bacs 1/4',
    resume: 'Les garnitures au frais sur le plan de travail, en bacs GN 1/4.',
    description:
      "La vitrine à ingrédients qui se pose sur un plan de travail ou une table réfrigérée : garnitures de pizza, de sandwiches ou de salades au frais et à portée de main, en bacs GN 1/4. Avec vitre de protection, ou avec couvercle inox pour les postes où l'on veut tout refermer.",
    usages: ['Pizzerias', 'Sandwicheries et snacks', 'Saladeries', 'Restauration rapide'],
    caracteristiques: ['Bacs GN 1/4', 'Longueurs 1 490, 1 740, 1 980 et 2 300 mm', 'Vitre de protection ou couvercle'],
    attention: 'Les bacs GN ne sont pas fournis. Vérifiez la longueur du plan qui reçoit la vitrine : nous la confirmons avant la commande.',
    versions: [
      v('VIP14901/4C', '1 490 mm, vitre'),
      v('VIP17401/4C', '1 740 mm, vitre'),
      v('VIP19801/4C', '1 980 mm, vitre'),
      v('VIP23001/4C', '2 300 mm, vitre'),
      v('VIP14901/4T', '1 490 mm, couvercle'),
      v('VIP17401/4T', '1 740 mm, couvercle'),
      v('VIP19801/4T', '1 980 mm, couvercle'),
      v('VIP23001/4T', '2 300 mm, couvercle'),
    ],
  },
  {
    cle: 'vip13',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'VIP 1/3',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à ingrédients pizza et sandwiches VIP, bacs 1/3',
    resume: 'La même vitrine à ingrédients, en bacs GN 1/3 plus grands.',
    description:
      "La vitrine à ingrédients VIP en bacs GN 1/3 : moins de bacs, mais plus grands, pour les garnitures qui partent en volume. Vitre de protection ou couvercle inox.",
    usages: ['Pizzerias', 'Sandwicheries', 'Kebabs et restauration rapide'],
    caracteristiques: ['Bacs GN 1/3', 'Longueurs 1 330 à 2 300 mm', 'Vitre de protection ou couvercle'],
    attention: 'Les bacs GN ne sont pas fournis. Vérifiez la longueur du plan qui reçoit la vitrine : nous la confirmons avant la commande.',
    versions: [
      v('VIP13301/3C', '1 330 mm, vitre'),
      v('VIP14901/3C', '1 490 mm, vitre'),
      v('VIP17401/3C', '1 740 mm, vitre'),
      v('VIP19801/3C', '1 980 mm, vitre'),
      v('VIP13301/3T', '1 330 mm, couvercle'),
      v('VIP14901/3T', '1 490 mm, couvercle'),
      v('VIP17401/3T', '1 740 mm, couvercle'),
      v('VIP19801/3T', '1 980 mm, couvercle'),
      v('VIP23001/3T', '2 300 mm, couvercle'),
    ],
  },

  // =========================================================================
  // CAVES À VIN
  // =========================================================================
  {
    cle: 'evv50',
    type: 'machine',
    machines: ['cave-a-vin'],
    ref: 'EVV 50 B',
    categorie: 'caves-a-vin',
    nom: 'Cave à vin compacte EVV 50 B, sous comptoir',
    resume: 'La petite cave vitrée qui se glisse sous un comptoir.',
    description:
      "Une cave à vin de 82 cm de haut, qui se loge sous un comptoir de bar ou de restaurant pour garder à température les vins servis au verre. Porte vitrée, régulation de +4 à +18 °C.",
    usages: ['Bars à vin', 'Restaurants — vins au verre', 'Chambres d’hôtes', 'Épiceries fines'],
    caracteristiques: ['De +4 à +18 °C', '141 L', 'Dimensions : 600 x 680 x 824 mm (L x P x H)', 'Porte vitrée', CLIM4],
    attention: ATT_CAVE,
    versions: [v('EVV50B', 'sous comptoir, porte vitrée')],
  },
  {
    cle: 'ewc80',
    type: 'machine',
    machines: ['cave-a-vin'],
    ref: 'EWC 80',
    categorie: 'caves-a-vin',
    nom: 'Cave à vin EWC 80, 80 bouteilles',
    resume: '80 bouteilles en vitrine, avec plusieurs zones de température.',
    description:
      "La cave à vin vitrée de 80 bouteilles, à plage de température multizone : rouges à température de cave en bas, blancs et rosés plus frais en haut. Éclairage intérieur, faible consommation.",
    usages: ['Restaurants', 'Bars à vin', 'Hôtels', 'Cavistes'],
    caracteristiques: ['80 bouteilles de 75 cl', 'Multizone, de +3 à +16 °C', 'Dimensions : 600 x 651 x 1 861 mm (L x P x H)', 'Consommation : 2,1 kWh par 24 h', 'Classe climatique 3 : ambiance jusqu’à 25 °C'],
    attention: ATT_CAVE,
    versions: [v('EWC80', '80 bouteilles, multizone')],
  },
  {
    cle: 'evv90',
    type: 'machine',
    machines: ['cave-a-vin'],
    ref: 'EVV 90 B',
    categorie: 'caves-a-vin',
    nom: 'Cave à vin EVV 90 B, 350 L',
    resume: 'La cave à vin vitrée de grande hauteur, au meilleur prix de la gamme.',
    description:
      "Une cave à vin vitrée de 350 litres sur 60 cm de large : la grande capacité pour un encombrement d'armoire étroite. Régulation de +4 à +18 °C.",
    usages: ['Restaurants', 'Bars à vin', 'Cavistes'],
    caracteristiques: ['De +4 à +18 °C', '350 L', 'Dimensions : 600 x 680 x 1 840 mm (L x P x H)', 'Porte vitrée, fluide R290', CLIM4],
    attention: ATT_CAVE,
    versions: [v('EVV90', 'porte vitrée, 350 L')],
  },
  {
    cle: 'ewc116',
    type: 'machine',
    machines: ['cave-a-vin'],
    ref: 'EWC 116 DT',
    categorie: 'caves-a-vin',
    nom: 'Cave à vin EWC 116 DT, 116 bouteilles, 2 zones',
    resume: 'Deux compartiments réglés séparément : rouges d’un côté, blancs de l’autre.',
    description:
      "La cave à vin de 116 bouteilles à deux zones indépendantes, chacune réglable de +2 à +20 °C : on garde rouges et blancs chacun à sa température de service, dans la même armoire. Très faible consommation.",
    usages: ['Restaurants', 'Hôtels', 'Bars à vin'],
    caracteristiques: ['116 bouteilles', '2 zones indépendantes, de +2 à +20 °C', 'Dimensions : 595 x 700 x 1 804 mm (L x P x H)', 'Consommation : 0,5 kWh par 24 h', 'Classe climatique 3 : ambiance jusqu’à 25 °C'],
    attention: ATT_CAVE,
    versions: [v('EWC116DT', '116 bouteilles, 2 zones')],
  },
  {
    cle: 'evv70',
    type: 'machine',
    machines: ['cave-a-vin'],
    ref: 'EVV 70',
    categorie: 'caves-a-vin',
    nom: 'Cave à vin EVV 70, 340 L',
    resume: 'La cave à vin vitrée de taille moyenne, 1,65 m de haut.',
    description:
      "Une cave à vin vitrée de 340 litres et 1,65 m de haut, qui trouve sa place en salle sans dominer la pièce. Régulation de +4 à +18 °C.",
    usages: ['Restaurants', 'Bars à vin', 'Épiceries fines'],
    caracteristiques: ['De +4 à +18 °C', '340 L', 'Dimensions : 600 x 656 x 1 645 mm (L x P x H)', 'Porte vitrée, fluide R290', CLIM4],
    attention: ATT_CAVE,
    versions: [v('EVV70', 'porte vitrée, 340 L')],
  },
  {
    cle: 'evv100',
    type: 'machine',
    machines: ['cave-a-vin'],
    ref: 'EVV 100',
    categorie: 'caves-a-vin',
    nom: 'Cave à vin et gourmet EVV 100, finition bois',
    resume: 'La cave en bois qui se montre en salle, pour le vin et les produits fins.',
    description:
      "Une armoire à vin à façade bois, faite pour être vue en salle, qui conserve aussi bien les bouteilles que les produits gourmets — fromages, charcuteries. Régulation de +4 à +18 °C, 350 litres.",
    usages: ['Restaurants gastronomiques', 'Caves à manger', 'Épiceries fines', 'Hôtels'],
    caracteristiques: ['De +4 à +18 °C', '350 L', 'Dimensions : 657 x 596 x 1 918 mm (L x P x H)', 'Façade bois, porte vitrée, fluide R290', CLIM4],
    attention: ATT_CAVE,
    versions: [v('EVV100', 'finition bois, 350 L')],
  },

  // =========================================================================
  // ARMOIRES RÉFRIGÉRÉES
  // =========================================================================
  {
    cle: 'agb651',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AGB 651',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire réfrigérée Infrico AGB 651, 1 porte GN 2/1',
    resume: 'L’armoire 1 porte GN 2/1 compacte, donnée pour 40 °C d’ambiance.',
    description:
      "L'armoire une porte GN 2/1 la plus basse de la gamme AGB, à moins de 2 m de haut : elle passe sous un faux plafond bas ou une poutre. Tout inox, angles intérieurs arrondis, commande tactile, éclairage LED, fluide R290, et une tenue en ambiance chaude jusqu'à 40 °C (classe climatique 5). En positif ou en négatif.",
    usages: ['Restaurants et brasseries', 'Traiteurs', 'Snacks', 'Cuisines de collectivité'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT) : froid négatif', '505 L, format GN 2/1', 'Dimensions : 687 x 794 x 1 989 mm (L x P x H)', 'Tout inox AISI 304, commande tactile IP65', CLIM5, 'Classe énergétique C (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AGB651', POS), v('AGB651BT', NEG)],
  },
  {
    cle: 'agb1302',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AGB 1302',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire réfrigérée Infrico AGB 1302, 2 portes GN 2/1',
    resume: 'Deux portes GN 2/1 sous 2 m de haut : 1 120 litres.',
    description:
      "La version deux portes de l'AGB 651 : 1 120 litres au format GN 2/1, sous 1,99 m de haut. Tout inox, commande tactile, classe climatique 5. En positif ou en négatif.",
    usages: ['Restaurants', 'Traiteurs', 'Cuisines de collectivité'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '1 120 L, format GN 2/1', 'Dimensions : 1 385 x 794 x 1 989 mm (L x P x H)', 'Tout inox AISI 304', CLIM5, 'Classe énergétique C (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AGB1302', POS), v('AGB1302BT', NEG)],
  },
  {
    cle: 'agb701',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AGB 701',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire réfrigérée Infrico AGB 701, 1 porte GN 2/1',
    resume: 'L’armoire 1 porte GN 2/1 de référence chez Infrico : 560 litres.',
    description:
      "L'armoire une porte GN 2/1 la plus vendue de la gamme : 560 litres, tout inox, porte réversible, commande tactile, classe climatique 5. En positif, en négatif, ou à porte vitrée pour voir le stock sans ouvrir.",
    usages: ['Restaurants et brasseries', 'Traiteurs', 'Hôtels', 'Cuisines de collectivité'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '560 L, format GN 2/1', 'Dimensions : 687 x 794 x 2 130 mm (L x P x H)', 'Tout inox AISI 304, porte réversible', CLIM5, 'Classe énergétique C (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AGB701', `${POS}, porte pleine`), v('AGB701BT', `${NEG}, porte pleine`), v('AGB701CR', `${POS}, porte vitrée`)],
  },
  {
    cle: 'agb1402',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AGB 1402',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire réfrigérée Infrico AGB 1402, 2 portes GN 2/1',
    resume: 'Deux portes GN 2/1 et 1 240 litres, en positif, négatif ou vitré.',
    description:
      "L'armoire deux portes de la gamme AGB : 1 240 litres au format GN 2/1, tout inox, classe climatique 5. En positif, en négatif, ou à portes vitrées.",
    usages: ['Restaurants à fort débit', 'Hôtels', 'Traiteurs', 'Cuisines de collectivité'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '1 240 L, format GN 2/1', 'Dimensions : 1 385 x 794 x 2 130 mm (L x P x H)', 'Tout inox AISI 304', CLIM5, 'Classe énergétique B (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AGB1402', `${POS}, portes pleines`), v('AGB1402BT', `${NEG}, portes pleines`), v('AGB1402CR', `${POS}, portes vitrées`)],
  },
  {
    cle: 'agn300',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AGN 301',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire étroite Infrico AGN 301 Slim, GN 1/1',
    resume: 'Une armoire de 48 cm de large, pour les cuisines où chaque centimètre compte.',
    description:
      "L'armoire réfrigérée Slim Line au format GN 1/1, sur 48 cm de large seulement : elle se loge entre deux meubles ou dans un recoin où aucune armoire GN 2/1 ne passerait. Tout inox, classe climatique 5. En positif, en négatif, ou à porte vitrée.",
    usages: ['Petites cuisines', 'Food-trucks avec laboratoire', 'Bars à manger', 'Offices'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '325 L, format GN 1/1', 'Dimensions : 482 x 695 x 2 100 mm (L x P x H)', 'Tout inox AISI 304', CLIM5, 'Classe énergétique C (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AGN301', `${POS}, porte pleine`), v('AGN301BT', `${NEG}, porte pleine`), v('AGN300CR', `${POS}, porte vitrée`)],
  },
  {
    cle: 'agn600',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AGN 602',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire étroite Infrico AGN 602 Slim, 2 portes GN 1/1',
    resume: 'Deux portes GN 1/1 sur 97 cm, dont une version bi-température.',
    description:
      "La Slim Line en deux portes, sur 97 cm de large : 745 litres au format GN 1/1. En positif, en négatif, à portes vitrées, ou en bi-température (AGN 602 MX) avec un compartiment positif et un négatif, chacun avec son propre groupe.",
    usages: ['Petites et moyennes cuisines', 'Traiteurs', 'Restaurants'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT) ; bi-température (MX)', '745 L, format GN 1/1', 'Dimensions : 974 x 695 x 2 100 mm (L x P x H)', 'Tout inox AISI 304', CLIM5, 'Classe énergétique B (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AGN602', `${POS}, portes pleines`), v('AGN602BT', `${NEG}, portes pleines`), v('AGN602MX', 'bi-température, 2 groupes'), v('AGN600CR', `${POS}, portes vitrées`)],
  },
  {
    cle: 'anpast400',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AN 401 PAST',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire pâtissière Infrico AN 401 PAST, 600 x 400',
    resume: 'L’armoire 1 porte aux glissières 600 x 400 de la pâtisserie.',
    description:
      "L'armoire réfrigérée de la pâtisserie et de la boulangerie : ses glissières reçoivent les plaques et grilles Euronorme 600 x 400, celles qui sortent du four. 395 litres sur 56 cm de large, classe climatique 5. En positif ou en négatif.",
    usages: ['Pâtisseries et boulangeries', 'Restaurants — poste pâtisserie', 'Traiteurs'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '395 L, glissières Euronorme 600 x 400', 'Dimensions : 557 x 775 x 2 060 mm (L x P x H)', CLIM5, 'Classe énergétique C (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AN401PAST', POS), v('AN401BTPAST', NEG)],
  },
  {
    cle: 'anpast900',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AN 902 PAST',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire pâtissière Infrico AN 902 PAST, 2 portes 600 x 400',
    resume: 'Deux portes de plaques 600 x 400 : 895 litres pour la pâtisserie.',
    description:
      "La version deux portes de l'armoire pâtissière AN : 895 litres de plaques Euronorme 600 x 400, classe climatique 5. En positif ou en négatif.",
    usages: ['Pâtisseries et boulangeries', 'Traiteurs', 'Restaurants gastronomiques'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '895 L, glissières Euronorme 600 x 400', 'Dimensions : 1 124 x 775 x 2 060 mm (L x P x H)', CLIM5, 'Classe énergétique B (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AN902PAST', POS), v('AN902BTPAST', NEG)],
  },
  {
    cle: 'agbpast701',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AGB 701 PAST',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire pâtissière Infrico AGB 701 PAST, 600 x 400',
    resume: 'Le gabarit de l’AGB 701, aménagé pour les plaques 600 x 400.',
    description:
      "L'armoire AGB 701, aménagée pour la pâtisserie : 560 litres de glissières Euronorme 600 x 400, tout inox, classe climatique 5. En positif ou en négatif.",
    usages: ['Pâtisseries et boulangeries', 'Restaurants — poste pâtisserie', 'Traiteurs'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '560 L, glissières Euronorme 600 x 400', 'Dimensions : 687 x 794 x 2 130 mm (L x P x H)', CLIM5, 'Classe énergétique C (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AGB701PAST', POS), v('AGB701BTPAS', NEG)],
  },
  {
    cle: 'agbpast1402',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AGB 1402 PAST',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire pâtissière Infrico AGB 1402 PAST, 2 portes 600 x 400',
    resume: 'Deux portes de plaques 600 x 400 : 1 240 litres.',
    description:
      "L'armoire AGB deux portes aménagée pour la pâtisserie : 1 240 litres de glissières Euronorme 600 x 400, tout inox, classe climatique 5. En positif ou en négatif.",
    usages: ['Pâtisseries et boulangeries', 'Traiteurs', 'Cuisines centrales'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '1 240 L, glissières Euronorme 600 x 400', 'Dimensions : 1 385 x 794 x 2 130 mm (L x P x H)', CLIM5, 'Classe énergétique B (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AGB1402PAST', POS), v('AGB1402BTPAS', NEG)],
  },
  {
    cle: 'agb901',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AGB 901',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire pâtisserie et glace Infrico AGB 901, 800 x 600',
    resume: 'Pour les grandes plaques 800 x 600 des pâtissiers et glaciers.',
    description:
      "L'armoire au format Euronorme 800 x 600, celui des grandes plaques de pâtisserie et des bacs de glacier : 785 litres, tout inox, classe climatique 5. En positif ou en négatif.",
    usages: ['Pâtisseries', 'Glaciers', 'Boulangeries'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '785 L, format Euronorme 800 x 600', 'Dimensions : 796 x 960 x 2 130 mm (L x P x H)', CLIM5, 'Classe énergétique B (version positive)'],
    attention: ATT_ARMOIRE,
    versions: [v('AGB901', POS), v('AGB901BT', NEG)],
  },
  {
    cle: 'aex500',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AEX 500',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire vitrée Infrico AEX 500, 1 porte',
    resume: 'L’armoire positive à porte vitrée, pour voir le stock sans ouvrir.',
    description:
      "Une armoire positive de 500 litres à porte vitrée : on voit ce qu'elle contient sans ouvrir, et elle peut aussi servir de vitrine côté salle. Froid ventilé.",
    usages: ['Restaurants', 'Bars et brasseries', 'Boulangeries', 'Épiceries'],
    caracteristiques: ['De +2 à +6 °C', '500 L', 'Dimensions : 687 x 700 x 2 030 mm (L x P x H)', 'Porte vitrée, froid ventilé, fluide R290', CLIM4],
    attention: ATT_ARMOIRE,
    versions: [v('AEX500TF', '1 porte vitrée')],
  },
  {
    cle: 'aex1000',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AEX 1000',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire vitrée Infrico AEX 1000, 2 portes',
    resume: 'Deux portes vitrées, 1 000 litres de froid positif.',
    description:
      "La version deux portes de l'armoire vitrée AEX : 1 000 litres de froid positif ventilé derrière deux portes vitrées.",
    usages: ['Restaurants', 'Bars', 'Épiceries', 'Boulangeries'],
    caracteristiques: ['De +2 à +6 °C', 'Environ 1 000 L', 'Dimensions : 1 385 x 700 x 2 060 mm (L x P x H)', '2 portes vitrées, froid ventilé, fluide R290', CLIM4],
    attention: ATT_ARMOIRE,
    versions: [v('AEX1000TF', '2 portes vitrées')],
  },
  {
    cle: 'amc',
    type: 'machine',
    machines: ['armoire-refrigeree'],
    ref: 'AMC',
    categorie: 'armoires-refrigerees',
    nom: 'Armoire de maturation de la viande Dry Aging AMC',
    resume: 'La maturation de la viande en salle, sous contrôle de l’humidité.',
    description:
      "L'armoire de maturation qui permet de faire vieillir la viande sur place, en vitrine, avec contrôle de l'humidité de série. Triple vitrage traité contre les UV, commande tactile à écran graphique. Deux largeurs (650 et 850 mm), deux hauteurs (L et XL), et une ou quatre faces vitrées pour la placer contre un mur ou au milieu de la salle.",
    usages: ['Restaurants de viande et grills', 'Boucheries', 'Restaurants gastronomiques'],
    caracteristiques: ['Maturation de +2 à +6 °C, humidité contrôlée', 'Largeurs 650 ou 850 mm ; hauteurs L ou XL (jusqu’à 2 300 mm)', 'Une ou quatre faces vitrées, triple vitrage anti-UV', 'Fluide R290'],
    attention:
      "La maturation est un process : réglages, hygiène et suivi des pièces s'apprennent. Nous vous accompagnons à la mise en service. Une armoire quatre faces se place loin d'une fenêtre ou d'une source de chaleur.",
    versions: [
      v('AMC6711L', '650 mm, L, 1 face vitrée'),
      v('AMC6714L', '650 mm, L, 4 faces vitrées'),
      v('AMC8711L', '850 mm, L, 1 face vitrée'),
      v('AMC8714L', '850 mm, L, 4 faces vitrées'),
      v('AMC6711XL', '650 mm, XL, 1 face vitrée'),
      v('AMC6714XL', '650 mm, XL, 4 faces vitrées'),
      v('AMC8711XL', '850 mm, XL, 1 face vitrée'),
      v('AMC8714XL', '850 mm, XL, 4 faces vitrées'),
    ],
  },

  // =========================================================================
  // TABLES RÉFRIGÉRÉES, TABLES BASSES, SALADETTES ET PIZZA
  // =========================================================================
  {
    cle: 'bmgn1470',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'BMGN 1470',
    categorie: 'tables-refrigerees',
    nom: 'Table réfrigérée Infrico BMGN 1470, 2 portes GN 1/1',
    resume: 'La table GN 1/1 deux portes, profondeur 700 mm.',
    description:
      "La table réfrigérée deux portes au format GN 1/1, profondeur 700 mm, plan de travail à 850 mm avec dosseret. Tout inox, classe climatique 5. En positif ou en négatif.",
    usages: ['Restaurants et brasseries', 'Pizzerias', 'Snacks', 'Traiteurs'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '2 portes GN 1/1, 305 L', 'Dimensions : 1 468 x 700 mm, plan à 850 mm', 'Tout inox AISI 304', CLIM5, 'Classe énergétique A (version positive)'],
    attention: ATT_TABLE,
    versions: [v('BMGN1470II', POS), v('BMGN1470BT', NEG)],
  },
  {
    cle: 'bmgn1960',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'BMGN 1960',
    categorie: 'tables-refrigerees',
    nom: 'Table réfrigérée Infrico BMGN 1960, 3 portes GN 1/1',
    resume: 'Trois portes GN 1/1 sur 1,96 m, profondeur 700 mm.',
    description:
      "La table réfrigérée trois portes GN 1/1, profondeur 700 mm : le poste de travail le plus courant, avec 465 litres en dessous. Tout inox, classe climatique 5. En positif ou en négatif.",
    usages: ['Restaurants', 'Brasseries', 'Hôtels', 'Traiteurs'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '3 portes GN 1/1, 465 L', 'Dimensions : 1 960 x 700 mm, plan à 850 mm', 'Tout inox AISI 304', CLIM5],
    attention: ATT_TABLE,
    versions: [v('BMGN1960II', POS), v('BMGN1960BT', NEG)],
  },
  {
    cle: 'bmgn2450',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'BMGN 2450',
    categorie: 'tables-refrigerees',
    nom: 'Table réfrigérée Infrico BMGN 2450, 4 portes GN 1/1',
    resume: 'Quatre portes GN 1/1 sur 2,45 m, pour les longues lignes.',
    description:
      "La table réfrigérée quatre portes GN 1/1, profondeur 700 mm, pour les lignes de dressage et les cuisines à plusieurs postes. Tout inox, classe climatique 5. En positif ou en négatif.",
    usages: ['Restaurants à fort débit', 'Hôtels', 'Cuisines centrales'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '4 portes GN 1/1', 'Dimensions : 2 452 x 700 mm, plan à 850 mm', 'Tout inox AISI 304', CLIM5],
    attention: ATT_TABLE,
    versions: [v('BMGN2450II', POS), v('BMGN2450BT', NEG)],
  },
  {
    cle: 'bmpp1500',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'BMPP 1500',
    categorie: 'tables-refrigerees',
    nom: 'Table réfrigérée Infrico BMPP 1500, 2 portes, profondeur 600',
    resume: 'Deux portes dans 600 mm de profondeur, pour les linéaires serrés.',
    description:
      "La table réfrigérée deux portes en profondeur 600 mm : 100 mm de moins que la série GN 1/1, ce qui fait souvent la différence en rénovation ou dans un couloir de cuisine étroit. Tout inox, classe climatique 5. En positif ou en négatif.",
    usages: ['Petites cuisines', 'Bars à manger', 'Snacks', 'Rénovations'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '2 portes, 250 L', 'Dimensions : 1 468 x 600 mm, plan à 850 mm', 'Tout inox AISI 304', CLIM5, 'Classe énergétique A (version positive)'],
    attention: ATT_TABLE,
    versions: [v('BMPP1500II', POS), v('BMPP1500BT', NEG)],
  },
  {
    cle: 'bmpp2000',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'BMPP 2000',
    categorie: 'tables-refrigerees',
    nom: 'Table réfrigérée Infrico BMPP 2000, 3 portes, profondeur 600',
    resume: 'Trois portes en profondeur 600 mm.',
    description:
      "La table trois portes de la série 600 : 385 litres en dessous, un plan de 1,96 m au-dessus, dans 600 mm de profondeur. Tout inox, classe climatique 5. En positif ou en négatif.",
    usages: ['Petites cuisines', 'Restaurants', 'Rénovations'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '3 portes, 385 L', 'Dimensions : 1 960 x 600 mm, plan à 850 mm', 'Tout inox AISI 304', CLIM5, 'Classe énergétique A (version positive)'],
    attention: ATT_TABLE,
    versions: [v('BMPP2000II', POS), v('BMPP2000BT', NEG)],
  },
  {
    cle: 'bmpp2500',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'BMPP 2500',
    categorie: 'tables-refrigerees',
    nom: 'Table réfrigérée Infrico BMPP 2500, 4 portes, profondeur 600',
    resume: 'Quatre portes en profondeur 600 mm, sur 2,45 m.',
    description:
      "La table quatre portes de la série 600, pour les longs linéaires étroits. Tout inox, classe climatique 5. En positif ou en négatif.",
    usages: ['Restaurants', 'Cuisines en couloir', 'Rénovations'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', '4 portes', 'Dimensions : 2 452 x 600 mm, plan à 850 mm', 'Tout inox AISI 304', CLIM5],
    attention: ATT_TABLE,
    versions: [v('BMPP2500II', POS), v('BMPP2500BT', NEG)],
  },
  {
    cle: 'msg',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'MSG',
    categorie: 'tables-refrigerees',
    nom: 'Table basse réfrigérée Infrico MSG, sous grill ou plancha',
    resume: 'Le froid à tiroirs sous le grill ou la plancha, hauteur 650 mm.',
    description:
      "La table réfrigérée basse, à 650 mm de haut, qui porte l'appareil de cuisson — grill, plancha, fourneau — et garde en dessous, dans ses tiroirs, la viande et le poisson du service. Le cuisinier se sert sans quitter son poste. Cinq longueurs, classe climatique 5.",
    usages: ['Grills et restaurants de viande', 'Postes plancha', 'Brasseries', 'Restaurants de poisson'],
    caracteristiques: ['De −2 à +8 °C', 'Hauteur 650 mm, série GN 1/1 profondeur 700 mm', 'Longueurs 1 000 à 2 400 mm', CLIM5, 'Classe énergétique A'],
    attention:
      "L'appareil de cuisson posé dessus doit être compatible (poids, chaleur dégagée vers le bas) : nous vérifions l'ensemble avant la commande.",
    versions: [v('MSG1000', '1 000 mm'), v('MSG1400', '1 400 mm'), v('MSG1600', '1 600 mm'), v('MSG2000', '2 000 mm'), v('MSG2400', '2 400 mm')],
  },
  {
    cle: 'msgbt',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'MSG BT',
    categorie: 'tables-refrigerees',
    nom: 'Table basse négative Infrico MSG BT',
    resume: 'La table basse en froid négatif, pour les surgelés au poste.',
    description:
      "La version négative de la table basse MSG, à −18 °C : les surgelés du service sous l'appareil de cuisson, à portée de main.",
    usages: ['Postes friteuse', 'Grills', 'Restauration rapide'],
    caracteristiques: ['−18 °C', 'Hauteur 650 mm, série GN 1/1 profondeur 700 mm', 'Longueurs 1 000 à 2 000 mm', CLIM4, 'Classe énergétique C'],
    attention:
      "L'appareil de cuisson posé dessus doit être compatible (poids, chaleur dégagée vers le bas) : nous vérifions l'ensemble avant la commande.",
    versions: [v('MSG1000BT', '1 000 mm'), v('MSG1400BT', '1 400 mm'), v('MSG1600BT', '1 600 mm'), v('MSG2000BT', '2 000 mm')],
  },
  {
    cle: 'mr',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'MR',
    categorie: 'tables-refrigerees',
    nom: 'Table pâtissière Infrico MR, 600 x 400',
    resume: 'La table réfrigérée aux glissières 600 x 400, profondeur 800 mm.',
    description:
      "La table réfrigérée de la pâtisserie : ses glissières reçoivent les plaques Euronorme 600 x 400 en profondeur, sous un plan de travail de 800 mm. Deux, trois ou quatre portes, en positif, et en négatif pour les 2 et 3 portes. Classe climatique 5.",
    usages: ['Pâtisseries et boulangeries', 'Restaurants — poste pâtisserie', 'Traiteurs'],
    caracteristiques: ['Positive : de −2 à +8 °C ; négative (BT)', 'Glissières Euronorme 600 x 400', 'Longueurs 1 618, 2 185 et 2 752 mm ; profondeur 800 mm, plan à 850 mm', CLIM5],
    attention: ATT_TABLE,
    versions: [v('MR1620', `2 portes, ${POS}`), v('MR2190', `3 portes, ${POS}`), v('MR2750', `4 portes, ${POS}`), v('MR1620BT', `2 portes, ${NEG}`), v('MR2190BT', `3 portes, ${NEG}`)],
  },
  {
    cle: 'me1000en',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'ME 1000 EN',
    categorie: 'tables-refrigerees',
    nom: 'Saladette Infrico ME 1000 EN, 2 portes',
    resume: 'La saladette compacte : 5 bacs 1/4 au-dessus, réserve en dessous.',
    description:
      "La saladette de moins d'un mètre : une cuve réfrigérée de 5 bacs GN 1/4 au-dessus pour la mise en place, et une réserve à deux portes en dessous. Le poste salades ou sandwiches des petites cuisines.",
    usages: ['Sandwicheries', 'Saladeries', 'Snacks', 'Petites pizzerias'],
    caracteristiques: ['De 0 à +6 °C', 'Cuve de 5 bacs GN 1/4, 230 L en réserve', 'Dimensions : 978 x 700 x 885 mm (L x P x H)', 'Fluide R290', CLIM4],
    attention: 'Les bacs GN ne sont pas fournis. ' + ATT_TABLE,
    versions: [v('ME1000EN', '5 bacs GN 1/4')],
  },
  {
    cle: 'me1003en',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'ME 1003 EN',
    categorie: 'tables-refrigerees',
    nom: 'Saladette Infrico ME 1003 EN, 3 portes',
    resume: 'La saladette trois portes : 8 bacs 1/4 au-dessus.',
    description:
      "La saladette de 1,46 m : 8 bacs GN 1/4 réfrigérés au-dessus, 355 litres de réserve à trois portes en dessous.",
    usages: ['Sandwicheries', 'Saladeries', 'Pizzerias', 'Restauration rapide'],
    caracteristiques: ['De 0 à +6 °C', 'Cuve de 8 bacs GN 1/4, 355 L en réserve', 'Dimensions : 1 460 x 700 x 885 mm (L x P x H)', 'Fluide R290', CLIM4],
    attention: 'Les bacs GN ne sont pas fournis. ' + ATT_TABLE,
    versions: [v('ME1003EN', '8 bacs GN 1/4')],
  },
  {
    cle: 'bmgnen',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'BMGN EN',
    categorie: 'tables-refrigerees',
    nom: 'Saladette Infrico BMGN EN, cuve et couvercle',
    resume: 'Une table GN 1/1 avec cuve réfrigérée et couvercle, pour le poste froid.',
    description:
      "La table réfrigérée GN 1/1 de la série 700, surmontée d'une cuve réfrigérée à couvercle pour la mise en place du poste froid : entrées, salades, garnitures. Deux longueurs.",
    usages: ['Restaurants — garde-manger', 'Saladeries', 'Traiteurs'],
    caracteristiques: ['De 0 à +6 °C', 'Cuve réfrigérée avec couvercle, 305 L en réserve (1 470 mm)', 'Longueurs 1 468 et 1 960 mm, profondeur 700 mm', 'Fluide R290', CLIM4, 'Classe énergétique A'],
    attention: 'Les bacs GN ne sont pas fournis. ' + ATT_TABLE,
    versions: [v('BMGN1470EN', '1 470 mm, 2 portes'), v('BMGN1960EN', '1 960 mm, 3 portes')],
  },
  {
    cle: 'mepizza',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'ME PIZZA',
    categorie: 'tables-refrigerees',
    nom: 'Table à pizza Infrico ME PIZZA',
    resume: 'La table à pizza compacte, ingrédients en vitrine au-dessus.',
    description:
      "La table à pizza compacte : une vitrine réfrigérée d'ingrédients avec protection au-dessus, une réserve en dessous, et le plan de travail entre les deux pour garnir. En 978 mm (2 portes) ou 1 460 mm (3 portes).",
    usages: ['Pizzerias', 'Snacks', 'Food-trucks'],
    caracteristiques: ['De 0 à +6 °C', 'Bacs d’ingrédients avec protection', 'Profondeur 700 mm ; 978 mm : hauteur 1 129 mm', 'Fluide R290', CLIM4],
    attention: 'Les bacs GN ne sont pas fournis. ' + ATT_TABLE,
    versions: [v('ME1000PIZZA', '978 mm, 2 portes'), v('ME1003PIZZA', '1 460 mm, 3 portes')],
  },
  {
    cle: 'mp',
    type: 'machine',
    machines: ['table-refrigeree'],
    ref: 'MP',
    categorie: 'tables-refrigerees',
    nom: 'Table à pizza Infrico MP, plan granit',
    resume: 'La grande table à pizza à plan granit, profondeur 800 mm.',
    description:
      "La table à pizza professionnelle : plan de travail en granit, qui garde la pâte fraîche et ne colle pas, vitrine d'ingrédients au-dessus et réserve réfrigérée en dessous. En 1 740 ou 2 300 mm, avec ou sans zone neutre (CN) pour poser les bacs à pâtons.",
    usages: ['Pizzerias', 'Restaurants italiens', 'Cuisines de pâtes fraîches'],
    caracteristiques: ['De +2 à +6 °C', 'Plan de travail en granit', 'Longueurs 1 738 et 2 300 mm ; profondeur 800 mm', 'Fluide R290', CLIM5],
    attention: 'Les bacs GN ne sont pas fournis. ' + ATT_TABLE,
    versions: [v('MP1740', '1 740 mm'), v('MP1740CN', '1 740 mm, zone neutre'), v('MP2300', '2 300 mm'), v('MP2300CN', '2 300 mm, zone neutre')],
  },

  // =========================================================================
  // CELLULES DE REFROIDISSEMENT RAPIDE
  // =========================================================================
  {
    cle: 'abt3',
    type: 'machine',
    machines: ['cellule-refroidissement'],
    ref: 'ABT3 1S',
    categorie: 'cellules-refroidissement',
    nom: 'Cellule de refroidissement et surgélation Infrico ABT3, 3 niveaux',
    resume: 'La petite cellule à poser : 3 niveaux, refroidissement et surgélation.',
    description:
      "La cellule de refroidissement rapide la plus compacte, à poser sur un plan : elle fait passer les préparations de +63 °C à +10 °C dans les délais réglementaires, ou les surgèle. Trois niveaux, pour les petites productions faites à l'avance.",
    usages: ['Petits restaurants', 'Pâtisseries', 'Traiteurs'],
    caracteristiques: ['Refroidissement et surgélation, de +3 à −38 °C', '3 niveaux', 'Dimensions : 721 x 711 x 545 mm (L x P x H)', 'Fluide R290', CLIM4],
    attention: ATT_CELLULE,
    versions: [v('ABT31S', '3 niveaux')],
  },
  {
    cle: 'abt5',
    type: 'machine',
    machines: ['cellule-refroidissement'],
    ref: 'ABT5 1L',
    categorie: 'cellules-refroidissement',
    nom: 'Cellule de refroidissement et surgélation Infrico ABT5, 5 niveaux',
    resume: 'Cinq niveaux GN 1/1 ou 600 x 400, sous un plan de travail.',
    description:
      "La cellule cinq niveaux, au format GN 1/1 ou 600 x 400, qui se glisse sous un plan de travail. Refroidissement rapide et surgélation, pilotage par sonde ou par temps.",
    usages: ['Restaurants', 'Pâtisseries', 'Traiteurs'],
    caracteristiques: ['Refroidissement et surgélation, de +3 à −38 °C', '5 niveaux GN 1/1 ou 600 x 400', 'Dimensions : 837 x 870 x 967 mm (L x P x H)', 'Fluide R290', CLIM4],
    attention: ATT_CELLULE,
    versions: [v('ABT51L', '5 niveaux')],
  },
  {
    cle: 'abt7',
    type: 'machine',
    machines: ['cellule-refroidissement'],
    ref: 'ABT7 1L',
    categorie: 'cellules-refroidissement',
    nom: 'Cellule de refroidissement et surgélation Infrico ABT7, 7 niveaux',
    resume: 'Sept niveaux, et une puissance pour les fortes productions.',
    description:
      "La cellule sept niveaux GN 1/1 ou 600 x 400, avec un groupe nettement plus puissant que l'ABT5 : elle descend jusqu'à −42 °C et absorbe les grosses fournées.",
    usages: ['Restaurants à fort débit', 'Traiteurs', 'Pâtisseries'],
    caracteristiques: ['Refroidissement et surgélation, de +3 à −42 °C', '7 niveaux GN 1/1 ou 600 x 400', 'Dimensions : 837 x 870 x 1 137 mm (L x P x H)', 'Fluide R290', CLIM4],
    attention: ATT_CELLULE,
    versions: [v('ABT71L', '7 niveaux')],
  },
  {
    cle: 'abt10',
    type: 'machine',
    machines: ['cellule-refroidissement'],
    ref: 'ABT10 1L',
    categorie: 'cellules-refroidissement',
    nom: 'Cellule de refroidissement et surgélation Infrico ABT10, 10 niveaux',
    resume: 'Dix niveaux en armoire, pour les cuisines qui produisent à l’avance.',
    description:
      "La cellule armoire dix niveaux GN 1/1 ou 600 x 400 : le format des cuisines qui produisent pour plusieurs services, et des pâtisseries qui surgèlent leurs fabrications.",
    usages: ['Cuisines de collectivité', 'Traiteurs', 'Pâtisseries'],
    caracteristiques: ['Refroidissement et surgélation, de +3 à −38 °C', '10 niveaux GN 1/1 ou 600 x 400', 'Dimensions : 837 x 870 x 1 747 mm (L x P x H)', 'Fluide R290', CLIM4],
    attention: ATT_CELLULE,
    versions: [v('ABT101L', '10 niveaux')],
  },
  {
    cle: 'abt14',
    type: 'machine',
    machines: ['cellule-refroidissement'],
    ref: 'ABT14 1L',
    categorie: 'cellules-refroidissement',
    nom: 'Cellule de refroidissement et surgélation Infrico ABT14, 14 niveaux',
    resume: 'Quatorze niveaux dans le même gabarit, pour les plus grosses productions.',
    description:
      "La plus grande cellule armoire de la sélection : quatorze niveaux dans le gabarit de l'ABT10, avec un groupe bien plus puissant, pour les cuisines centrales et les laboratoires.",
    usages: ['Cuisines centrales', 'Traiteurs à grand volume', 'Laboratoires de pâtisserie'],
    caracteristiques: ['Refroidissement et surgélation, de +3 à −38 °C', '14 niveaux', 'Dimensions : 837 x 870 x 1 747 mm (L x P x H)', 'Fluide R290', CLIM4],
    attention: ATT_CELLULE,
    versions: [v('ABT141L', '14 niveaux')],
  },

  // =========================================================================
  // VITRINES PÂTISSERIE ET GLACES, CONGÉLATEURS
  // =========================================================================
  {
    cle: 'vnz',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'VNZ',
    categorie: 'vitrines-patisserie-glaces',
    nom: 'Vitrine pâtissière Infrico Niza',
    resume: 'La vitrine pâtissière réfrigérée, de 98 cm à 1,92 m.',
    description:
      "La vitrine réfrigérée de la pâtisserie et de la boulangerie, éclairée à chaque niveau pour mettre les gâteaux en valeur. Quatre longueurs, avec un plan de service standard ou inox (I).",
    usages: ['Pâtisseries', 'Boulangeries', 'Salons de thé'],
    caracteristiques: ['Longueurs 978, 1 290, 1 602 et 1 915 mm', 'Éclairage LED à chaque niveau', 'Plan standard ou inox'],
    attention: ATT_VITRINE,
    versions: [
      v('VNZ9', '978 mm'), v('VNZ12', '1 290 mm'), v('VNZ15', '1 602 mm'), v('VNZ18', '1 915 mm'),
      v('VNZ9I', '978 mm, inox'), v('VNZ12I', '1 290 mm, inox'), v('VNZ15I', '1 602 mm, inox'), v('VNZ18I', '1 915 mm, inox'),
    ],
  },
  {
    cle: 'vly',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'VLY',
    categorie: 'vitrines-patisserie-glaces',
    nom: 'Vitrine pâtissière Infrico Lyon',
    resume: 'La ligne modulaire de vitrines pâtissières, jusqu’à 2,5 m.',
    description:
      "La ligne modulaire Lyon, conçue pour la pâtisserie, la viennoiserie et la boulangerie : grande capacité d'exposition, éclairage à tous les niveaux, et des modules d'angle et de caisse pour composer tout un comptoir. Cinq longueurs, standard ou inox.",
    usages: ['Pâtisseries', 'Boulangeries', 'Traiteurs'],
    caracteristiques: ['Longueurs 938 à 2 500 mm', 'Éclairage LED à tous les niveaux', 'Version standard ou inox', 'Modules d’angle et de caisse sur devis'],
    attention: ATT_VITRINE,
    versions: [
      v('VLY9', '938 mm'), v('VLY12', '1 250 mm'), v('VLY15', '1 562 mm'), v('VLY18', '1 875 mm'), v('VLY25', '2 500 mm'),
      v('VLY9I', '938 mm, inox'), v('VLY12I', '1 250 mm, inox'), v('VLY15I', '1 562 mm, inox'), v('VLY18I', '1 875 mm, inox'), v('VLY25I', '2 500 mm, inox'),
    ],
  },
  {
    cle: 'vbr',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'VBR',
    categorie: 'vitrines-patisserie-glaces',
    nom: 'Vitrine réfrigérée libre-service Infrico Ambar',
    resume: 'Le libre-service réfrigéré : desserts, sandwiches et boissons à portée de main.',
    description:
      "La vitrine réfrigérée ouverte, en libre-service : le client se sert lui-même en desserts, sandwiches, salades et boissons. Éclairage à chaque étage. Quatre longueurs, standard ou inox.",
    usages: ['Boulangeries et snacks', 'Cafétérias', 'Supérettes de camping', 'Self-services'],
    caracteristiques: ['Libre-service, façade ouverte', 'Longueurs 625, 938, 1 250 et 1 875 mm', 'Version standard ou inox'],
    attention:
      "Une vitrine ouverte demande un local tempéré et à l'abri des courants d'air : nous vérifions l'emplacement avant la livraison.",
    versions: [
      v('VBR6SS', '625 mm'), v('VBR9SS', '938 mm'), v('VBR12SS', '1 250 mm'), v('VBR18SS', '1 875 mm'),
      v('VBR06ISS', '625 mm, inox'), v('VBR12ISS', '1 250 mm, inox'), v('VBR18ISS', '1 875 mm, inox'),
    ],
  },
  {
    cle: 'vbz',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'VBZ',
    categorie: 'vitrines-patisserie-glaces',
    nom: 'Vitrine à glaces statique Infrico Ibiza',
    resume: 'La vitrine à glaces en bacs, groupe incorporé.',
    description:
      "La vitrine à glaces statique pour servir les crèmes glacées en bacs, groupe frigorifique incorporé. Deux longueurs (1 250 et 1 622 mm), avec un groupe standard (U) ou réduit (SU).",
    usages: ['Glaciers', 'Snacks et cafés de plage', 'Campings', 'Boulangeries'],
    caracteristiques: ['Froid statique, groupe incorporé', 'Longueurs 1 250 et 1 622 mm'],
    attention: ATT_VITRINE,
    versions: [v('VBZ12U', '1 250 mm'), v('VBZ15U', '1 622 mm'), v('VBZ12SU', '1 250 mm, groupe réduit'), v('VBZ15SU', '1 622 mm, groupe réduit')],
  },
  {
    cle: 'var',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'VAR',
    categorie: 'vitrines-patisserie-glaces',
    nom: 'Vitrine à glaces Infrico Aries',
    resume: 'La vitrine de glacier ventilée, tenue jusqu’à 35 °C d’ambiance.',
    description:
      "La vitrine de glacier ventilée, éclairée sur le plan d'exposition et les étagères, donnée pour une ambiance jusqu'à 35 °C et 75 % d'humidité : celle des terrasses et des bords de mer l'été.",
    usages: ['Glaciers', 'Salons de thé', 'Cafés de plage'],
    caracteristiques: ['De −15 à −18 °C', 'Longueurs 1 250 et 1 875 mm', 'Classe climatique 7 : ambiance jusqu’à 35 °C, 75 % d’humidité', 'Fluide R290'],
    attention: ATT_VITRINE,
    versions: [v('VAR12H', '1 250 mm'), v('VAR18H', '1 875 mm')],
  },
  {
    cle: 'hf',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'HF',
    categorie: 'vitrines-patisserie-glaces',
    nom: 'Congélateur coffre Infrico HF, couvercle rabattable',
    resume: 'Le congélateur coffre de réserve, de 240 à 700 litres.',
    description:
      "Le congélateur coffre à couvercle plein rabattable, pour la réserve de surgelés : simple, robuste, et le moins cher au litre. Six capacités.",
    usages: ['Réserves de restaurant', 'Campings et snacks', 'Glaciers'],
    caracteristiques: ['De −25 à −17 °C', 'De 240 à 700 L', 'Couvercle plein rabattable', CLIM4],
    attention: "Un congélateur coffre se pose dans un local ventilé, à l'abri du soleil, sur un sol plan.",
    versions: [v('HF240ALHC', '240 L'), v('HF320ALHC', '320 L'), v('HF400ALHC', '400 L'), v('HF500ALHC', '500 L'), v('HF550ALHC', '550 L'), v('HF700ALHC', '700 L')],
  },
  {
    cle: 'hftc',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'HF TC',
    categorie: 'vitrines-patisserie-glaces',
    nom: 'Conservateur à glaces Infrico HF, couvercles coulissants vitrés',
    resume: 'Le bac à glaces vitré, pour les bâtonnets et les pots en libre-service.',
    description:
      "Le conservateur à couvercles coulissants vitrés : les glaces en bâtonnets et en pots se voient et se prennent en libre-service. Trois capacités, deux versions de couvercle (TCG et TCC).",
    usages: ['Snacks et cafés de plage', 'Supérettes de camping', 'Boulangeries'],
    caracteristiques: ['Froid négatif', '300, 400 ou 500 L', 'Couvercles coulissants vitrés'],
    attention: "Un conservateur se pose à l'abri du soleil direct, sur un sol plan.",
    versions: [
      v('HF300TCGHC', '300 L, TCG'), v('HF400TCGHC', '400 L, TCG'), v('HF500TCGHC', '500 L, TCG'),
      v('HF300TCCHC', '300 L, TCC'), v('HF400TCCHC', '400 L, TCC'), v('HF500TCCHC', '500 L, TCC'),
    ],
  },

  // =========================================================================
  // BUFFETS BASICBUFFET
  // =========================================================================
  {
    cle: 'bbcf',
    type: 'machine',
    machines: ['buffet'],
    ref: 'MBUB CF',
    categorie: 'buffets',
    nom: 'Buffet BasicBuffet à cuve réfrigérée',
    resume: 'Le module de buffet froid à bacs GN, sur roulettes.',
    description:
      "Le module de buffet à cuve réfrigérée : entrées, salades, fromages et desserts restent au frais dans des bacs GN 1/1 de 200 mm de profondeur. Mobile sur roulettes, il se juxtapose aux autres modules BasicBuffet pour composer une ligne de petit-déjeuner ou de buffet. Corps blanc de série ; gris anthracite ou inox sur demande.",
    usages: ['Hôtels — petit-déjeuner', 'Campings et clubs', 'Restaurants à buffet', 'Restauration collective'],
    caracteristiques: ['De +2 à +10 °C', '2, 3 ou 4 bacs GN 1/1 (profondeur 200 mm)', 'Longueurs 835, 1 155 et 1 475 mm ; profondeur 745 mm, hauteur 929 mm', 'Sur roulettes'],
    attention: ATT_BUFFET,
    versions: [v('MBUB2CF', '2 bacs GN 1/1'), v('MBUB3CF', '3 bacs GN 1/1'), v('MBUB4CF', '4 bacs GN 1/1')],
  },
  {
    cle: 'bbpf',
    type: 'machine',
    machines: ['buffet'],
    ref: 'MBUB PF',
    categorie: 'buffets',
    nom: 'Buffet BasicBuffet à plaque réfrigérée',
    resume: 'Le module froid à plaque, pour présenter plats et assiettes.',
    description:
      "Le module de buffet à plaque réfrigérée : on y pose directement plats de service et assiettes, pour une présentation plus libre qu'en bacs. Mobile sur roulettes, il complète une ligne BasicBuffet.",
    usages: ['Hôtels — petit-déjeuner', 'Restaurants à buffet', 'Traiteurs'],
    caracteristiques: ['Plaque réfrigérée', 'Formats 2, 3 ou 4 GN ; longueurs 835, 1 155 et 1 475 mm', 'Profondeur 745 mm, hauteur 929 mm', 'Sur roulettes'],
    attention: ATT_BUFFET,
    versions: [v('MBUB2PF', 'format 2 GN'), v('MBUB3PF', 'format 3 GN'), v('MBUB4PF', 'format 4 GN')],
  },
  {
    cle: 'bbbm',
    type: 'machine',
    machines: ['buffet'],
    ref: 'MBUB BM',
    categorie: 'buffets',
    nom: 'Buffet BasicBuffet bain-marie',
    resume: 'Le module chaud du buffet : bain-marie en bacs GN.',
    description:
      "Le module bain-marie de la ligne BasicBuffet, pour garder au chaud œufs, viennoiseries, plats et garnitures en bacs GN 1/1. Mobile sur roulettes, réglable de +30 à +90 °C.",
    usages: ['Hôtels — petit-déjeuner', 'Restaurants à buffet', 'Restauration collective'],
    caracteristiques: ['De +30 à +90 °C', '2, 3 ou 4 bacs GN 1/1 (profondeur 200 mm)', 'Puissance 1 500, 2 500 ou 3 500 W', 'Longueurs 835, 1 155 et 1 475 mm ; profondeur 745 mm, hauteur 929 mm'],
    attention: ATT_BUFFET,
    versions: [v('MBUB2BM', '2 bacs GN 1/1'), v('MBUB3BM', '3 bacs GN 1/1'), v('MBUB4BM', '4 bacs GN 1/1')],
  },
  {
    cle: 'bbne',
    type: 'machine',
    machines: ['buffet'],
    ref: 'MBUB NE',
    categorie: 'buffets',
    nom: 'Buffet BasicBuffet neutre',
    resume: 'Le module neutre : pain, couverts, vaisselle, boissons.',
    description:
      "Le module neutre de la ligne BasicBuffet, sans froid ni chaud : il porte le pain, les couverts, la vaisselle ou les boissons, et donne sa longueur à la ligne de buffet. Mobile sur roulettes.",
    usages: ['Hôtels — petit-déjeuner', 'Restaurants à buffet', 'Campings et clubs'],
    caracteristiques: ['Module neutre', 'Formats 2, 3 ou 4 GN ; longueurs 835, 1 155 et 1 475 mm', 'Profondeur 745 mm, hauteur 929 mm', 'Sur roulettes'],
    attention: ATT_BUFFET,
    versions: [v('MBUB2NE', 'format 2 GN'), v('MBUB3NE', 'format 3 GN'), v('MBUB4NE', 'format 4 GN')],
  },
];

// ---------------------------------------------------------------------------
// Assemblage avec le tarif et les visuels
// ---------------------------------------------------------------------------

/** Toutes les références du tarif utilisées ici — lu par le générateur. */
export const refsInfrico = fiches.flatMap((f) => f.versions.map((x) => x.ref));

/** Les références introuvables dans le tarif généré (doit rester vide). */
export const refsInfricoManquantes = refsInfrico.filter((r) => !tarifInfrico[r]);

// Adresses des fiches : écrites à la main, elles ne doivent plus changer une
// fois en ligne.
const SLUGS = {
  eb: 'infrico-eb-arriere-bar-portes-coulissantes',
  ebc: 'infrico-ebc-arriere-bar-tiroirs',
  efp: 'infrico-efp-refroidisseur-bouteilles',
  erv: 'infrico-erv-arriere-bar-vitre',
  bst: 'infrico-bst-station-cocktail-refrigeree',
  mcaf: 'infrico-mcaf-meuble-machine-a-cafe',
  fmpp: 'infrico-fmpp-comptoir-refrigere-vitre',
  nec1: 'infrico-nec-501-rv-vitrine-boissons-1-porte',
  nec2: 'infrico-nec-1002-rv-vitrine-boissons-2-portes',
  nec1bt: 'infrico-nec-vitrine-negative-1-porte',
  nec2bt: 'infrico-nec-1002-fv-vitrine-negative-2-portes',
  vet: 'infrico-vet-vitrine-a-tapas',
  veb: 'infrico-veb-vitrine-de-comptoir',
  vip14: 'infrico-vip-vitrine-ingredients-bacs-1-4',
  vip13: 'infrico-vip-vitrine-ingredients-bacs-1-3',
  evv50: 'infrico-evv-50-b-cave-a-vin-sous-comptoir',
  ewc80: 'infrico-ewc-80-cave-a-vin-80-bouteilles',
  evv90: 'infrico-evv-90-b-cave-a-vin-350-l',
  ewc116: 'infrico-ewc-116-dt-cave-a-vin-2-zones',
  evv70: 'infrico-evv-70-cave-a-vin-340-l',
  evv100: 'infrico-evv-100-cave-a-vin-bois',
  agb651: 'infrico-agb-651-armoire-1-porte-gn-2-1',
  agb1302: 'infrico-agb-1302-armoire-2-portes-gn-2-1',
  agb701: 'infrico-agb-701-armoire-1-porte-gn-2-1',
  agb1402: 'infrico-agb-1402-armoire-2-portes-gn-2-1',
  agn300: 'infrico-agn-301-armoire-etroite-slim',
  agn600: 'infrico-agn-602-armoire-etroite-slim-2-portes',
  anpast400: 'infrico-an-401-past-armoire-patissiere',
  anpast900: 'infrico-an-902-past-armoire-patissiere-2-portes',
  agbpast701: 'infrico-agb-701-past-armoire-patissiere',
  agbpast1402: 'infrico-agb-1402-past-armoire-patissiere-2-portes',
  agb901: 'infrico-agb-901-armoire-patisserie-glace-800-x-600',
  aex500: 'infrico-aex-500-armoire-vitree-1-porte',
  aex1000: 'infrico-aex-1000-armoire-vitree-2-portes',
  amc: 'infrico-amc-armoire-maturation-dry-aging',
  bmgn1470: 'infrico-bmgn-1470-table-refrigeree-2-portes',
  bmgn1960: 'infrico-bmgn-1960-table-refrigeree-3-portes',
  bmgn2450: 'infrico-bmgn-2450-table-refrigeree-4-portes',
  bmpp1500: 'infrico-bmpp-1500-table-refrigeree-2-portes-p600',
  bmpp2000: 'infrico-bmpp-2000-table-refrigeree-3-portes-p600',
  bmpp2500: 'infrico-bmpp-2500-table-refrigeree-4-portes-p600',
  msg: 'infrico-msg-table-basse-refrigeree',
  msgbt: 'infrico-msg-bt-table-basse-negative',
  mr: 'infrico-mr-table-patissiere-600-x-400',
  me1000en: 'infrico-me-1000-en-saladette',
  me1003en: 'infrico-me-1003-en-saladette-3-portes',
  bmgnen: 'infrico-bmgn-en-saladette-cuve-couvercle',
  mepizza: 'infrico-me-pizza-table-a-pizza',
  mp: 'infrico-mp-table-a-pizza-granit',
  abt3: 'infrico-abt3-cellule-refroidissement-3-niveaux',
  abt5: 'infrico-abt5-cellule-refroidissement-5-niveaux',
  abt7: 'infrico-abt7-cellule-refroidissement-7-niveaux',
  abt10: 'infrico-abt10-cellule-refroidissement-10-niveaux',
  abt14: 'infrico-abt14-cellule-refroidissement-14-niveaux',
  vnz: 'infrico-niza-vitrine-patissiere',
  vly: 'infrico-lyon-vitrine-patissiere',
  vbr: 'infrico-ambar-vitrine-libre-service',
  vbz: 'infrico-ibiza-vitrine-a-glaces',
  var: 'infrico-aries-vitrine-a-glaces',
  hf: 'infrico-hf-congelateur-coffre',
  hftc: 'infrico-hf-conservateur-glaces-vitre',
  bbcf: 'infrico-basicbuffet-cuve-refrigeree',
  bbpf: 'infrico-basicbuffet-plaque-refrigeree',
  bbbm: 'infrico-basicbuffet-bain-marie',
  bbne: 'infrico-basicbuffet-neutre',
};

export const produitsInfrico = fiches.map((f) => {
  const { cle, versions, ...reste } = f;
  // Catalogue de la gamme, si une version n'a pas de fiche technique à elle.
  const gamme = versions.map((x) => documentsInfrico[x.ref]?.gamme).find(Boolean);
  return {
    slug: SLUGS[cle],
    marque: MARQUE,
    creditVisuel: 'Infrico',
    photo: photosInfrico[cle] ?? null,
    usages: [],
    ...reste,
    conditionnements: versions.map((x) => {
      const t = tarifInfrico[x.ref] || {};
      const d = documentsInfrico[x.ref] || {};
      const doc = d.fiche || d.gamme || gamme;
      return {
        label: `${x.ref} · ${x.court}`,
        refFabricant: x.ref,
        prix: typeof t.prix === 'number' ? t.prix : null,
        ...(doc ? { ficheFabricant: doc, ficheTitre: d.fiche ? `Fiche technique ${x.ref}` : 'Catalogue de la gamme (espagnol)' } : {}),
      };
    }),
  };
});
