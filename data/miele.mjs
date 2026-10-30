// ---------------------------------------------------------------------------
// MIELE PROFESSIONAL — sélection « 20/80 » de la boutique
//
// Ce fichier est écrit à la main : il choisit les modèles, les regroupe en
// fiches et porte les textes. Tout ce qui vient du TARIF MIELE (prix public,
// EAN, lien de la fiche produit Miele, caractéristiques techniques) est lu
// dans `miele-tarif.mjs`, généré par :
//
//     node outils/miele-tarif.mjs <1_Import_Produits_MIELE_….csv>
//
// À relancer à chaque nouveau tarif Miele : les prix et les fiches se mettent
// à jour seuls, les textes ci-dessous ne bougent pas.
//
// ⚠️  PRIX AFFICHÉ = PRIX PUBLIC CONSEILLÉ MIELE (tarif 07/2026 pour le
//     professionnel, 01/2026 pour SmartBiz), choix de la direction du
//     28/10/2026. Le prix d'achat SODILAME n'est JAMAIS lu par le générateur
//     et ne doit jamais apparaître dans ce dépôt.
//
// ⚠️  RÈGLE MIELE (Display Excellence) : ne présenter que des produits
//     commercialisés. Un modèle arrêté disparaît du tarif : le générateur le
//     signale, et la fiche doit alors être retirée d'ici.
//
// ⚠️  HORS SÉLECTION, sur décision de la direction : lave-verres (PTD 701) et
//     machines à capot (PTD 901). Le reste du tarif (514 références) reste
//     disponible sur devis.
//
// Chaque fiche regroupe les VERSIONS d'un même modèle (vidange, carrosserie,
// options). Une version = un « conditionnement » au sens du panier : son
// libellé commence toujours par la référence Miele exacte, c'est elle qui sert
// à la commande chez Miele.
// ---------------------------------------------------------------------------
import { tarifMiele } from './miele-tarif.mjs';
// Photos et vues 3D reprises du site Miele Professional : décision de la
// direction du 30/10/2026, sous sa responsabilité (voir miele-visuels.mjs).
import { visuelsMiele } from './miele-visuels.mjs';

const MARQUE = 'Miele Professional';

// Vocabulaire du tarif, expliqué une fois pour toutes.
const DP = 'pompe de vidange';
const DV = 'clapet de vidange';
const VIDANGE =
  "Deux versions de vidange : par pompe (DP), quand l'évacuation est plus haute que la machine ou éloignée, et par clapet (DV), quand un siphon de sol est disponible juste derrière. C'est le relevé sur place qui tranche.";
const ATT_LG =
  "Une laveuse professionnelle vibre à l'essorage et pèse près de cent kilos, souvent plus : le plancher, l'évacuation et l'alimentation électrique se vérifient au relevé, avant la commande. Nous vous disons aussi quelle version de vidange convient à votre local.";
const ATT_SL_EVAC =
  "Un sèche-linge à évacuation demande une gaine vers l'extérieur et une entrée d'air suffisante dans le local : c'est la cause la plus fréquente de mauvais séchage sur une machine pourtant neuve. Nous la vérifions avant la livraison.";
const ATT_GROS =
  "À partir de 12 kg, une machine se livre et se pose comme un équipement : accès, scellement au sol, alimentation triphasée et évacuation se préparent avec vous avant la commande.";
const ATT_PANIER =
  'Paniers au format 500 x 500 mm, celui des lave-vaisselle frontaux PTD 702 et PTD 703. Pour une autre machine, donnez-nous sa référence : nous vérifions le format avant de livrer.';
const ATT_CHIMIE =
  "Produit chimique professionnel : la fiche de données de sécurité vous est remise avec la livraison, et vous devez la conserver avec votre plan de nettoyage. Ne mélangez jamais deux produits dans un même bidon.";

const v = (ref, court) => ({ ref, court });

/**
 * Les fiches. Champs propres à ce fichier :
 *   versions  : [{ ref: référence EXACTE du tarif, court: précision affichée }]
 *   label     : si absent, le libellé est « <réf. Miele> · <court> ».
 */
const fiches = [
  // =========================================================================
  // LAVE-LINGE
  // =========================================================================
  {
    slug: 'miele-pwm-906-lave-linge-6-kg',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 906',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 6 kg PWM 906',
    resume: 'Le 6 kg à commande tactile M Touch Flex, pour les petites blanchisseries qui lavent souvent.',
    description:
      "Lave-linge professionnel de 6 kg de la gamme Performance Plus, piloté par l'écran tactile M Touch Flex : on y programme et on y verrouille les cycles propres à l'établissement, ce qui évite les erreurs quand plusieurs personnes se relaient à la buanderie. Son encombrement est celui d'un lave-linge domestique, sa construction celle d'une machine qui tourne toute la journée. " +
      VIDANGE,
    usages: ['Chambres d’hôtes et petits hôtels', 'Restaurants — torchons, tabliers et tenues', 'Cabinets, instituts et salons'],
    attention: ATT_LG,
    versions: [
      v('PWM 906 DP LW', `${DP}, carrosserie blanche`),
      v('PWM 906 DV LW', `${DV}, carrosserie blanche`),
      v('PWM 906 DP SST', `${DP}, carrosserie inox`),
      v('PWM 906 DV SST', `${DV}, carrosserie inox`),
    ],
  },
  {
    slug: 'miele-pwm-507-lave-linge-7-kg',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 507',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 7 kg PWM 507',
    resume: 'Le 7 kg à commande M Select : la laveuse professionnelle la plus accessible de la gamme.',
    description:
      "Lave-linge professionnel de 7 kg de la gamme Performance, à commande M Select par sélecteur : des programmes professionnels clairs, sans menu à apprendre. Son essorage à 1 600 tr/min laisse peu d'eau dans le linge, ce qui raccourcit d'autant le passage au séchoir. Il se raccorde en triphasé, et peut aussi l'être en monophasé avec une puissance de chauffe réduite. " +
      VIDANGE,
    usages: ['Restaurants et brasseries', 'Chambres d’hôtes et gîtes', 'Campings — linge de location', 'Crèches et petites structures'],
    attention: ATT_LG,
    versions: [
      v('PWM 507 DP LW', `${DP}, carrosserie blanche`),
      v('PWM 507 DV LW', `${DV}, carrosserie blanche`),
      v('PWM 507 DP SST', `${DP}, carrosserie inox`),
      v('PWM 507 DV SST', `${DV}, carrosserie inox`),
    ],
  },
  {
    slug: 'miele-pwm-508-lave-linge-8-kg',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 508',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 8 kg PWM 508',
    resume: 'La version 8 kg de la gamme M Select, pour un kilo de plus à chaque cycle.',
    description:
      "Même machine que le PWM 507, avec un tambour plus grand pour 8 kg de linge : à rythme égal, c'est un cycle en moins par jour dès que la buanderie tourne. Commande M Select par sélecteur, essorage à 1 600 tr/min, raccordement triphasé ou monophasé. " +
      VIDANGE,
    usages: ['Restaurants et brasseries', 'Hôtels de petite capacité', 'Campings'],
    attention: ATT_LG,
    versions: [v('PWM 508 DP LW', `${DP}, carrosserie blanche`), v('PWM 508 DV LW', `${DV}, carrosserie blanche`)],
  },
  {
    slug: 'miele-pwm-908-lave-linge-8-kg-touch',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 908',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 8 kg PWM 908',
    resume: 'Le 8 kg à écran tactile M Touch Flex, programmable selon les textiles de l’établissement.',
    description:
      "Lave-linge professionnel de 8 kg de la gamme Performance Plus. L'écran M Touch Flex permet de créer et de nommer des programmes pour chaque type de linge — draps, éponge, tenues de cuisine — et d'en masquer les autres : la personne en buanderie choisit un usage, pas une température. Essorage à 1 600 tr/min. " +
      VIDANGE,
    usages: ['Hôtels', 'EHPAD et résidences', 'Restaurants avec linge de table', 'Campings'],
    attention: ATT_LG,
    versions: [
      v('PWM 908 DP LW', `${DP}, carrosserie blanche`),
      v('PWM 908 DV LW', `${DV}, carrosserie blanche`),
      v('PWM 908 DP SST', `${DP}, carrosserie inox`),
      v('PWM 908 DV SST', `${DV}, carrosserie inox`),
    ],
  },
  {
    slug: 'miele-pwm-506-mopstar-lave-linge-franges',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 506 MOPSTAR',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge spécial franges et lavettes PWM 506 MOPSTAR',
    resume: 'La laveuse dédiée aux franges et lavettes de nettoyage, pour ne plus les mélanger au linge.',
    description:
      "Lave-linge de 6 kg conçu pour les franges de lavage et les lavettes microfibre des équipes de ménage. Ses programmes sont réglés pour ces textiles très chargés, et une machine dédiée évite de les laver avec le linge des clients ou des résidents — c'est souvent ce que demande le protocole d'hygiène. " +
      VIDANGE,
    usages: ['EHPAD et établissements de santé', 'Hôtels — équipes d’étage', 'Entreprises de propreté', 'Collectivités'],
    attention: ATT_LG,
    versions: [v('PWM 506 DV LW MOPSTAR', `${DV}, carrosserie blanche`), v('PWM 506 DP LW MOPSTAR', `${DP}, carrosserie blanche`)],
  },
  {
    slug: 'miele-pwm-509-lave-linge-9-kg',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 509',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 9 kg PWM 509',
    resume: 'Le 9 kg de la nouvelle génération, avec boîte à produits et commande M Touch Pro.',
    description:
      "Lave-linge professionnel de 9 kg, gamme Performance de nouvelle génération, à commande M Touch Pro. On passe ici à un format de buanderie : carrosserie gris acier, tambour de 80 litres, boîte à produits en façade et raccordement triphasé. C'est la machine des établissements qui ont dépassé le format 6-8 kg sans avoir besoin d'une laveuse de 12 kg. " +
      VIDANGE,
    usages: ['Hôtels', 'EHPAD', 'Campings', 'Restaurants à fort volume de linge'],
    attention: ATT_LG,
    versions: [v('PWM 509 EL DP DD IG', `${DP}, gris acier`), v('PWM 509 EL DV DD IG', `${DV}, gris acier`)],
  },
  {
    slug: 'miele-pwm-909-lave-linge-benchmark',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 909',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 9 kg PWM 909',
    resume: 'Le 9 kg Performance Plus : essorage plus fort, commande M Touch Pro Plus, version hygiène.',
    description:
      "Lave-linge professionnel de 9 kg, gamme Performance Plus. Par rapport au PWM 509, il essore plus fort — le linge arrive moins humide au séchoir — et sa commande M Touch Pro Plus va plus loin dans la personnalisation des programmes. Il existe en carrosserie gris acier ou inox, et en version avec robinet d'échantillonnage (ST), qui permet de prélever le bain pour les contrôles d'hygiène exigés dans certains établissements de santé. " +
      VIDANGE,
    usages: ['Hôtels', 'EHPAD et établissements de santé', 'Campings', 'Blanchisseries intégrées'],
    attention: ATT_LG,
    versions: [
      v('PWM 909 EL DP DD IG', `${DP}, gris acier`),
      v('PWM 909 EL DV DD IG', `${DV}, gris acier`),
      v('PWM 909 EL DP DD SST', `${DP}, inox`),
      v('PWM 909 EL DV DD SST', `${DV}, inox`),
      v('PWM 909 EL DP DD ST SST', `${DP}, inox, robinet d'échantillonnage`),
      v('PWM 909 EL DV DD ST SST', `${DV}, inox, robinet d'échantillonnage`),
    ],
  },
  {
    slug: 'miele-pwm-511-lave-linge-11-kg',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 511',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 11 kg PWM 511',
    resume: 'Le 11 kg au format compact de la gamme 9 kg, tambour de 100 litres.',
    description:
      "Lave-linge professionnel de 11 kg, gamme Performance de nouvelle génération, à commande M Touch Pro. Il garde la largeur des machines de 9 kg avec un tambour de 100 litres : c'est la solution quand la place est comptée mais que le volume de linge augmente. " +
      VIDANGE,
    usages: ['Hôtels', 'EHPAD', 'Campings et villages de vacances'],
    attention: ATT_LG,
    versions: [v('PWM 511 EL DP DD IG', `${DP}, gris acier`), v('PWM 511 EL DV DD IG', `${DV}, gris acier`)],
  },
  {
    slug: 'miele-pwm-912-lave-linge-12-kg',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 912',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 12 kg PWM 912',
    resume: 'Le 12 kg inox, en version standard ou avec pesée automatique du linge.',
    description:
      "Lave-linge professionnel de 12 kg en carrosserie inox, tambour de 110 litres. La version WP intègre un socle de pesée : la machine connaît la charge réelle et ajuste l'eau et les produits en conséquence, ce qui évite de surdoser quand le tambour n'est qu'à moitié plein.",
    usages: ['Hôtels', 'EHPAD', 'Campings', 'Blanchisseries intégrées'],
    attention: ATT_GROS,
    versions: [v('PWM 912', 'version standard'), v('PWM 912 WP', 'avec socle de pesée automatique intégré')],
  },
  {
    slug: 'miele-pwm-514-lave-linge-14-kg',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 514',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 14 kg PWM 514',
    resume: 'Le 14 kg gris acier avec boîte à produits, tambour de 130 litres.',
    description:
      "Lave-linge professionnel de 14 kg, carrosserie gris acier, tambour de 130 litres et boîte à produits. Le format des blanchisseries d'hôtel et d'EHPAD qui traitent les draps sur place.",
    usages: ['Hôtels', 'EHPAD', 'Villages de vacances'],
    attention: ATT_GROS,
    versions: [v('PWM 514', 'électrique, avec boîte à produits')],
  },
  {
    slug: 'miele-pwm-916-lave-linge-16-kg',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 916',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 16 kg PWM 916',
    resume: 'Le 16 kg inox, avec ou sans pesée automatique.',
    description:
      "Lave-linge professionnel de 16 kg en inox, tambour de 140 litres. Comme le PWM 912, il existe en version WP avec socle de pesée intégré, qui adapte la consommation d'eau et de produits à la charge réelle.",
    usages: ['Hôtels', 'EHPAD', 'Blanchisseries intégrées'],
    attention: ATT_GROS,
    versions: [v('PWM 916', 'version standard'), v('PWM 916 WP', 'avec socle de pesée automatique intégré')],
  },
  {
    slug: 'miele-pwm-520-lave-linge-20-kg',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 520',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge professionnel 20 kg PWM 520',
    resume: 'Le 20 kg gris acier, tambour de 180 litres, pour les gros volumes de draps.',
    description:
      "Lave-linge professionnel de 20 kg, carrosserie gris acier, tambour de 180 litres et boîte à produits. Pour les établissements qui lavent leurs draps et leur éponge en grande quantité, associé à un séchoir de capacité équivalente.",
    usages: ['Hôtels de grande capacité', 'EHPAD', 'Villages de vacances'],
    attention: ATT_GROS,
    versions: [v('PWM 520', 'électrique, avec boîte à produits')],
  },
  {
    slug: 'miele-pwm-1108-smartbiz-lave-linge',
    type: 'machine',
    machines: ['lave-linge'],
    ref: 'PWM 1108',
    categorie: 'lave-linge-professionnels',
    nom: 'Lave-linge semi-professionnel SmartBiz PWM 1108',
    resume: 'Le 8 kg semi-professionnel en 230 V, pour les petits volumes de linge.',
    description:
      "Lave-linge semi-professionnel SmartBiz de 8 kg, branché en 230 V monophasé. Il s'adresse aux établissements qui lavent quelques machines par jour : il coûte nettement moins cher qu'une machine professionnelle, mais il n'est pas fait pour tourner en continu. La version TwinDos dose seule la lessive à partir de deux cartouches. Les accessoires de la gamme professionnelle ne sont pas compatibles avec SmartBiz.",
    usages: ['Chambres d’hôtes et gîtes', 'Petits restaurants', 'Cabinets et instituts'],
    attention:
      "SmartBiz est une gamme semi-professionnelle : au-delà de quelques cycles par jour, une machine professionnelle (PWM 507 et suivantes) reviendra moins cher sur sa durée de vie. Nous vous aidons à choisir.",
    versions: [v('PWM 1108', 'pompe de vidange, carrosserie blanche'), v('PWM 1108 TwinDos', 'avec dosage automatique TwinDos')],
  },

  // =========================================================================
  // SÈCHE-LINGE
  // =========================================================================
  {
    slug: 'miele-pdr-508-seche-linge-8-kg',
    type: 'machine',
    machines: ['seche-linge'],
    ref: 'PDR 508',
    categorie: 'seche-linge-professionnels',
    nom: 'Sèche-linge professionnel 8 kg PDR 508',
    resume: 'Le séchoir 8 kg M Select, à évacuation ou à pompe à chaleur sans gaine.',
    description:
      "Sèche-linge professionnel de 8 kg, commande M Select, tambour de 130 litres. Il s'associe au lave-linge PWM 507 ou PWM 508, en colonne avec un cadre de superposition. Deux technologies : à évacuation (EL), avec sonde d'humidité qui arrête le séchage au bon moment, ou à condensation par pompe à chaleur (HP), qui n'a besoin d'aucune gaine vers l'extérieur et consomme beaucoup moins d'électricité.",
    usages: ['Restaurants', 'Chambres d’hôtes et petits hôtels', 'Campings'],
    attention:
      "Le choix entre évacuation et pompe à chaleur dépend du local : sans possibilité de gaine vers l'extérieur, c'est la pompe à chaleur. Nous le vérifions au relevé.",
    versions: [
      v('PDR 508 ROP EL LW', 'évacuation, sonde d’humidité, blanc'),
      v('PDR 508 ROP EL SST', 'évacuation, sonde d’humidité, inox'),
      v('PDR 508 HP P LW', 'pompe à chaleur, sans évacuation, blanc'),
      v('PDR 508 HP P SST', 'pompe à chaleur, sans évacuation, inox'),
    ],
  },
  {
    slug: 'miele-pdr-908-seche-linge-8-kg-touch',
    type: 'machine',
    machines: ['seche-linge'],
    ref: 'PDR 908',
    categorie: 'seche-linge-professionnels',
    nom: 'Sèche-linge professionnel 8 kg PDR 908',
    resume: 'Le séchoir 8 kg à écran M Touch Flex, compagnon du lave-linge PWM 908.',
    description:
      "Sèche-linge professionnel de 8 kg de la gamme Performance Plus, à écran tactile M Touch Flex. Il reprend les deux technologies du PDR 508 — évacuation avec sonde d'humidité, ou pompe à chaleur sans gaine — avec une commande programmable qui se marie au lave-linge PWM 908.",
    usages: ['Hôtels', 'EHPAD et résidences', 'Campings'],
    attention:
      "Le choix entre évacuation et pompe à chaleur dépend du local : sans possibilité de gaine vers l'extérieur, c'est la pompe à chaleur. Nous le vérifions au relevé.",
    versions: [
      v('PDR 908 ROP EL LW', 'évacuation, sonde d’humidité, blanc'),
      v('PDR 908 ROP EL SST', 'évacuation, sonde d’humidité, inox'),
      v('PDR 908 HP P LW', 'pompe à chaleur, sans évacuation, blanc'),
      v('PDR 908 HP P SST', 'pompe à chaleur, sans évacuation, inox'),
    ],
  },
  {
    slug: 'miele-pdr-510-seche-linge-10-kg',
    type: 'machine',
    machines: ['seche-linge'],
    ref: 'PDR 510',
    categorie: 'seche-linge-professionnels',
    nom: 'Sèche-linge professionnel 10 kg PDR 510',
    resume: 'Le séchoir 10 kg M Select, en version minuterie, libre-service ou sonde d’humidité.',
    description:
      "Sèche-linge professionnel de 10 kg, tambour de 180 litres, commande M Select. Trois commandes au choix : TOP, à minuterie, la plus simple ; COP, prévue pour le libre-service avec monnayeur — celle des laveries de camping ; ROP, à sonde d'humidité, qui arrête le séchage quand le linge est sec plutôt qu'à la fin d'une durée fixée.",
    usages: ['Campings — laverie libre-service', 'Hôtels', 'EHPAD'],
    attention: ATT_SL_EVAC,
    versions: [
      v('PDR510 TOP EL IG', 'TOP, minuterie, gris acier'),
      v('PDR510 COP EL IG', 'COP, libre-service, gris acier'),
      v('PDR510 ROP EL IG', 'ROP, sonde d’humidité, gris acier'),
    ],
  },
  {
    slug: 'miele-pdr-910-seche-linge-benchmark',
    type: 'machine',
    machines: ['seche-linge'],
    ref: 'PDR 910',
    categorie: 'seche-linge-professionnels',
    nom: 'Sèche-linge professionnel 10 kg PDR 910',
    resume: 'Le séchoir 10 kg Performance Plus à commande M Touch Pro, compagnon du PWM 909.',
    description:
      "Sèche-linge professionnel de 10 kg, gamme Performance Plus, tambour de 180 litres, commande M Touch Pro. Il s'associe au lave-linge PWM 909 : la charge de la laveuse passe entière au séchoir, sans la diviser.",
    usages: ['Hôtels', 'EHPAD et établissements de santé', 'Campings'],
    attention: ATT_SL_EVAC,
    versions: [v('PDR 910 EL IG', 'électrique, gris acier'), v('PDR910 EL SST', 'électrique, inox')],
  },
  {
    slug: 'miele-pdr-514-seche-linge-14-kg',
    type: 'machine',
    machines: ['seche-linge'],
    ref: 'PDR 514',
    categorie: 'seche-linge-professionnels',
    nom: 'Sèche-linge professionnel 14 kg PDR 514',
    resume: 'Le séchoir 14 kg, tambour de 250 litres, en minuterie, libre-service ou sonde d’humidité.',
    description:
      "Sèche-linge professionnel de 14 kg, tambour de 250 litres, gamme Performance à commande M Select. Il accompagne les laveuses de 12 à 14 kg. La version COP, pour le libre-service, inclut le raccordement monnayeur ; la version ROP arrête le séchage à l'humidité résiduelle choisie.",
    usages: ['Hôtels', 'EHPAD', 'Campings — laverie libre-service'],
    attention: ATT_SL_EVAC + ' ' + ATT_GROS,
    versions: [
      v('PDR 514 TOP EL IG', 'TOP, minuterie, gris acier'),
      v('PDR 514 COP EL IG', 'COP, libre-service, raccordement monnayeur inclus'),
      v('PDR 514 ROP EL IG', 'ROP, sonde d’humidité, gris acier'),
    ],
  },
  {
    slug: 'miele-pdr-518-seche-linge-18-kg',
    type: 'machine',
    machines: ['seche-linge'],
    ref: 'PDR 518',
    categorie: 'seche-linge-professionnels',
    nom: 'Sèche-linge professionnel 18 kg PDR 518',
    resume: 'Le séchoir 18 kg, tambour de 325 litres, pour les laveuses de 16 kg.',
    description:
      "Sèche-linge professionnel de 18 kg, tambour de 325 litres, gamme Performance à commande M Select. Il accompagne le lave-linge PWM 916, en version libre-service (COP) ou à sonde d'humidité (ROP).",
    usages: ['Hôtels', 'EHPAD', 'Villages de vacances'],
    attention: ATT_SL_EVAC + ' ' + ATT_GROS,
    versions: [v('PDR 518 COP EL IG', 'COP, libre-service, gris acier'), v('PDR 518ROP EL IG', 'ROP, sonde d’humidité, gris acier')],
  },
  {
    slug: 'miele-pdr-522-seche-linge-22-kg',
    type: 'machine',
    machines: ['seche-linge'],
    ref: 'PDR 522',
    categorie: 'seche-linge-professionnels',
    nom: 'Sèche-linge professionnel 22 kg PDR 522',
    resume: 'Le séchoir 22 kg, tambour de 400 litres, pour les laveuses de 20 kg.',
    description:
      "Sèche-linge professionnel de 22 kg, tambour de 400 litres, gamme Performance à commande M Select. C'est le séchoir à associer au lave-linge PWM 520 pour sécher une charge complète en une fois.",
    usages: ['Hôtels de grande capacité', 'EHPAD', 'Villages de vacances'],
    attention: ATT_SL_EVAC + ' ' + ATT_GROS,
    versions: [v('PDR 522 TOP EL IG', 'TOP, minuterie, gris acier'), v('PDR 522ROP EL IG', 'ROP, sonde d’humidité, gris acier')],
  },
  {
    slug: 'miele-pdr-1108-smartbiz-seche-linge',
    type: 'machine',
    machines: ['seche-linge'],
    ref: 'PDR 1108',
    categorie: 'seche-linge-professionnels',
    nom: 'Sèche-linge semi-professionnel SmartBiz PDR 1108',
    resume: 'Le séchoir 8 kg à pompe à chaleur en 230 V, sans gaine d’évacuation.',
    description:
      "Sèche-linge semi-professionnel SmartBiz de 8 kg, à pompe à chaleur, branché en 230 V. Il n'a pas besoin d'évacuation vers l'extérieur : il s'installe là où une gaine est impossible. Il se superpose au lave-linge PWM 1108 avec un cadre dédié. Les accessoires de la gamme professionnelle ne sont pas compatibles avec SmartBiz.",
    usages: ['Chambres d’hôtes et gîtes', 'Petits restaurants', 'Cabinets et instituts'],
    attention:
      "SmartBiz est une gamme semi-professionnelle, pour quelques cycles par jour. Au-delà, un séchoir professionnel (PDR 508 et suivants) est le bon choix.",
    versions: [v('PDR 1108', 'pompe à chaleur, carrosserie blanche')],
  },

  // =========================================================================
  // REPASSAGE ET FINITION
  // =========================================================================
  {
    slug: 'miele-hm-16-83-repasseuse',
    type: 'machine',
    machines: ['repasseuse'],
    ref: 'HM 16-83',
    categorie: 'repassage-finition',
    nom: 'Repasseuse à cylindre HM 16-83',
    resume: 'La repasseuse compacte pour nappes, serviettes et taies : cylindre de 83 cm.',
    description:
      "Repasseuse à cylindre de 160 mm de diamètre et 830 mm de longueur. Elle repasse en un passage le linge plat de petite largeur — serviettes, chemins de table, taies, torchons — beaucoup plus vite qu'au fer, et avec un rendu régulier. C'est l'outil des restaurants qui ont rapatrié leur linge de table.",
    usages: ['Restaurants — serviettes et nappes', 'Chambres d’hôtes', 'Petits hôtels'],
    attention: "Une repasseuse demande une prise adaptée et un emplacement dégagé à l'avant et à l'arrière. Nous vérifions l'alimentation électrique avant la livraison.",
    versions: [v('HM 16-83', 'cylindre Ø 160 mm, longueur 830 mm')],
  },
  {
    slug: 'miele-pri-210-repasseuse',
    type: 'machine',
    machines: ['repasseuse'],
    ref: 'PRI 210',
    categorie: 'repassage-finition',
    nom: 'Repasseuse à cylindre PRI 210',
    resume: 'Cylindre d’un mètre pour les nappes et les draps pliés, kit de paraffinage inclus.',
    description:
      "Repasseuse à cylindre de 210 mm de diamètre et 1 000 mm de longueur, livrée avec son kit de paraffinage. Elle passe des nappes et des draps pliés, en volume. La version EPR ajoute un kit d'extraction de l'air, qui évacue la vapeur dégagée au repassage — à prévoir dans une petite pièce.",
    usages: ['Hôtels', 'Restaurants — nappes', 'EHPAD'],
    attention: "Une repasseuse demande une alimentation adaptée et, dans un local exigu, l'évacuation de la vapeur. Nous vérifions les deux au relevé.",
    versions: [v('PRI 210', 'version standard'), v('PRI 210 EPR', 'avec kit d’extraction de l’air')],
  },
  {
    slug: 'miele-pib-100-centre-repassage',
    machines: ['repasseuse'],
    ref: 'PIB 100',
    categorie: 'repassage-finition',
    nom: 'Centre de repassage vapeur PIB 100',
    resume: 'Le centre de repassage vapeur professionnel, pour les tenues et le linge à pièces.',
    description:
      "Centre de repassage vapeur professionnel : table, fer et générateur réunis. Il complète une repasseuse à cylindre pour ce qu'elle ne sait pas faire — vestes, chemises, tabliers, tenues de service.",
    usages: ['Hôtels', 'Restaurants — tenues de salle', 'Pressings intégrés'],
    versions: [v('PIB 100', 'centre de repassage vapeur')],
  },

  // =========================================================================
  // LAVE-VAISSELLE (sans lave-verres ni machines à capot, voir en-tête)
  // =========================================================================
  {
    slug: 'miele-ptd-702-lave-vaisselle-bistrot',
    type: 'machine',
    machines: ['lave-vaisselle'],
    ref: 'PTD 702',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle frontal bistrot PTD 702',
    resume: 'Le frontal compact de 72,5 cm de haut : jusqu’à 66 paniers par heure, verres et assiettes.',
    description:
      "Lave-vaisselle frontal à surchauffeur de la gamme Universal Compact, 60 cm de large pour 72,5 cm de haut : il se glisse sous un comptoir de bar. Il lave aussi bien la verrerie que les assiettes, jusqu'à 66 paniers de 500 x 500 mm par heure, et consomme 2 litres d'eau par rinçage en programme Eco. La version RO intègre un osmoseur, qui supprime les traces sur le verre quand l'eau est très chargée — le cas d'une bonne partie de notre zone.",
    usages: ['Bars et brasseries', 'Cafés et salons de thé', 'Petits restaurants'],
    attention:
      "Le résultat dépend d'abord de votre eau. Nous mesurons sa dureté avant de chiffrer, pour vous dire si la version standard suffit ou s'il faut l'osmoseur.",
    versions: [
      v('PTD 702 AE', 'pompes doseuses pour bidons externes'),
      v('PTD 702 AE DOS', 'réservoirs de produits intégrés'),
      v('PTD 702 AE RO DOS', 'osmoseur intégré, réservoirs intégrés'),
    ],
  },
  {
    slug: 'miele-ptd-703-lave-vaisselle-frontal',
    type: 'machine',
    machines: ['lave-vaisselle'],
    ref: 'PTD 703',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle frontal PTD 703',
    resume: 'Le frontal de restaurant : jusqu’à 1 170 assiettes par heure, adoucisseur intégré en option.',
    description:
      "Lave-vaisselle frontal à surchauffeur de la gamme Universal, 60 cm de large et 82 cm de haut, paniers de 500 x 500 mm. Il traite jusqu'à 66 paniers ou 1 170 assiettes par heure, avec une commande à écran tactile et des cycles courts. La version WES intègre un adoucisseur : sur l'eau dure de la région, c'est ce qui protège le surchauffeur du tartre.",
    usages: ['Restaurants et brasseries', 'Snacks et restauration rapide', 'Cuisines de petite collectivité'],
    attention:
      "Sur l'eau dure de la région, sans adoucisseur intégré (WES) ni adoucisseur externe, le surchauffeur s'entartre et la température de rinçage chute. Nous mesurons votre eau avant de vous conseiller une version.",
    versions: [
      v('PTD 703 AE', 'pompes doseuses pour bidons externes'),
      v('PTD 703 AE DOS', 'réservoirs de produits intégrés'),
      v('PTD 703 AE WES DOS', 'adoucisseur intégré, réservoirs intégrés'),
    ],
  },
  {
    slug: 'miele-pfd-101-lave-vaisselle-profiline',
    type: 'machine',
    machines: ['lave-vaisselle'],
    ref: 'PFD 101',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle à eau renouvelée PFD 101 ProfiLine',
    resume: 'Le lave-vaisselle professionnel au format domestique : programme court de 17 minutes.',
    description:
      "Lave-vaisselle professionnel ProfiLine, au format 60 cm d'un lave-vaisselle de cuisine, qui renouvelle son eau à chaque cycle. Son programme le plus court dure 17 minutes quand il est raccordé à l'eau chaude. Il existe à poser, à encastrer sous plan ou intégrable en inox. C'est la machine des offices, des crèches et des petites cuisines qui ne lavent pas assez pour un surchauffeur.",
    usages: ['Crèches', 'Offices d’entreprise et salles de pause', 'Chambres d’hôtes', 'Petites cuisines'],
    attention: "Le cycle de 17 minutes suppose un raccordement à l'eau chaude. Sur eau froide, le cycle s'allonge : nous regardons votre installation avant de vous le confirmer.",
    versions: [v('PFD 101', 'à poser, façade blanche'), v('PFD 101 U', 'à encastrer sous plan, façade blanche'), v('PFD 101 i', 'intégrable inox, commande en façade')],
  },
  {
    slug: 'miele-pfd-404-lave-vaisselle-hygiene',
    type: 'machine',
    machines: ['lave-vaisselle'],
    ref: 'PFD 404',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle à eau renouvelée PFD 404 Hygiene',
    resume: 'Eau renouvelée à chaque cycle et rinçage final à 85 °C : jusqu’à 456 assiettes par heure.',
    description:
      "Lave-vaisselle MasterLine qui renouvelle son eau à chaque cycle au lieu de travailler dans un bain permanent : c'est ce principe qui le fait retenir en crèche, en EHPAD et en milieu de soins. Le rinçage final monte à 85 °C, le cycle le plus court dure 5 minutes, jusqu'à 24 paniers ou 456 assiettes par heure. Livré avec ses paniers, en carrosserie blanche ou inox, avec ou sans pompe doseuse intégrée.",
    usages: ['EHPAD et établissements de santé', 'Crèches', 'Collectivités soumises à un protocole d’hygiène'],
    attention: "Une machine à eau renouvelée n'est pas une machine de bar : elle n'est pas faite pour le débit d'un coup de feu. Si c'est le débit que vous cherchez, regardez plutôt les PTD 702 et 703.",
    versions: [
      v('PFD 404 LW WB', 'carrosserie blanche, avec paniers'),
      v('PFD 404 LW DOS WB', 'blanche, pompe doseuse intégrée, avec paniers'),
      v('PFD 404 SST WB', 'carrosserie inox, avec paniers'),
      v('PFD 404 SST DOS WB', 'inox, pompe doseuse intégrée, avec paniers'),
    ],
  },
  {
    slug: 'miele-pfd-407-lave-vaisselle-hygiene-plus',
    type: 'machine',
    machines: ['lave-vaisselle'],
    ref: 'PFD 407',
    categorie: 'lave-vaisselle-professionnel',
    nom: 'Lave-vaisselle à eau renouvelée PFD 407 HygienePlus',
    resume: 'Le PFD avec thermodésinfection à 93 °C pendant 5 minutes.',
    description:
      "Même principe que le PFD 404 — eau renouvelée à chaque cycle — avec un programme de thermodésinfection à 93 °C pendant 5 minutes. C'est la machine qu'on installe quand le protocole d'hygiène de l'établissement va au-delà d'un lavage classique. Jusqu'à 24 paniers ou 456 assiettes par heure.",
    usages: ['Établissements de santé', 'EHPAD avec protocole de désinfection renforcé', 'Crèches'],
    attention: "La thermodésinfection à 93 °C est ce qui justifie l'écart de prix avec le PFD 404. Si votre protocole ne l'impose pas, le PFD 404 suffit, et nous vous le dirons.",
    versions: [
      v('PFD 407 LW WB', 'carrosserie blanche, avec paniers'),
      v('PFD 407 LW DOS WB', 'blanche, pompe doseuse intégrée, avec paniers'),
      v('PFD 407 SST WB', 'carrosserie inox, avec paniers'),
      v('PFD 407 SST DOS WB', 'inox, pompe doseuse intégrée, avec paniers'),
    ],
  },

  // =========================================================================
  // ACCESSOIRES DE BLANCHISSERIE
  // =========================================================================
  {
    slug: 'miele-apcl-001-cadre-superposition',
    machines: ['lave-linge', 'seche-linge'],
    ref: 'APCL 001',
    categorie: 'accessoires-blanchisserie',
    nom: 'Cadre de superposition lave-linge / sèche-linge',
    resume: 'Pour monter le sèche-linge sur le lave-linge et gagner la moitié de la surface au sol.',
    description:
      "Cadre de superposition inox qui permet d'installer un sèche-linge PDR au-dessus d'un lave-linge PWM des séries 50X et 90X, en blanc comme en inox. Dans une buanderie étroite, c'est la moitié de la surface au sol gagnée.",
    usages: ['Lave-linge PWM 50X / 90X', 'Sèche-linge PDR 50X / 90X'],
    attention: "Pour les SmartBiz PWM 1108 et PDR 1108, ce cadre ne convient pas : ils ont leur propre cadre de superposition. Donnez-nous vos références, nous vérifions.",
    versions: [v('APCL 001', 'cadre de superposition inox')],
  },
  {
    slug: 'miele-apcl-022-socle-little-giants',
    machines: ['lave-linge', 'seche-linge'],
    ref: 'APCL 022',
    categorie: 'accessoires-blanchisserie',
    nom: 'Socle fermé inox pour Little Giants',
    resume: 'Rehausse la machine de 30 cm : chargement sans se baisser, sans fixation au sol.',
    description:
      "Socle fermé en inox de 30 cm de haut, sans fixation au sol, pour les lave-linge et sèche-linge Little Giants. Le hublot remonte à hauteur de bras : c'est le dos de la personne en buanderie qui en profite, plusieurs fois par jour.",
    usages: ['Lave-linge et sèche-linge Little Giants'],
    versions: [v('APCL 022', 'socle fermé inox, H 30 cm, sans fixation au sol')],
  },
  {
    slug: 'miele-apcl-054-socle-9-10-kg',
    machines: ['lave-linge', 'seche-linge'],
    ref: 'APCL 054',
    categorie: 'accessoires-blanchisserie',
    nom: 'Socle fermé inox pour PWM 9 kg / PDR 10 kg',
    resume: 'Le socle de 30 cm des lave-linge 9 kg et sèche-linge 10 kg.',
    description:
      "Socle fermé en inox de 30 cm de haut pour les lave-linge de 9 kg (PWM 509, PWM 909) et les sèche-linge de 10 kg (PDR 510, PDR 910). Il met le hublot à hauteur de travail.",
    usages: ['Lave-linge PWM 509 et PWM 909', 'Sèche-linge PDR 510 et PDR 910'],
    versions: [v('APCL 054-1', 'socle fermé inox, H 30 cm')],
    label: (x) => `APCL 054 · ${x.court}`,
  },
  {
    slug: 'miele-c-4060-monnayeur-jetons',
    machines: ['lave-linge', 'seche-linge'],
    ref: 'C 4060',
    categorie: 'accessoires-blanchisserie',
    nom: 'Monnayeur à jetons C 4060',
    resume: 'Le monnayeur des laveries libre-service, en trois modèles de jetons.',
    description:
      "Monnayeur à jetons pour mettre un lave-linge ou un sèche-linge en libre-service — la laverie d'un camping ou d'une résidence. Il existe pour trois types de jetons (WM 2, WM 8, WM 9). Les jetons se commandent par lots de 50 : demandez-les avec le monnayeur.",
    usages: ['Campings — laverie libre-service', 'Résidences et foyers'],
    attention: "Selon la machine, le monnayeur se raccorde par un boîtier de paiement XCI ou par le raccordement monnayeur intégré (versions COP). Nous vérifions l'ensemble avant de commander.",
    versions: [v('C 4060-1', 'pour jetons WM 2'), v('C 4060-2', 'pour jetons WM 8'), v('C 4060-3', 'pour jetons WM 9')],
    label: (x) => `C 4060 · ${x.court}`,
  },
  {
    slug: 'miele-apcl-103-boitier-xci-paiement',
    machines: ['lave-linge', 'seche-linge'],
    ref: 'APCL 103',
    categorie: 'accessoires-blanchisserie',
    nom: 'Boîtier de paiement XCI pour Little Giants',
    resume: 'Le boîtier qui relie un monnayeur à un lave-linge ou un sèche-linge Little Giants.',
    description:
      "Boîtier XCI de paiement externe pour les lave-linge et sèche-linge Little Giants. Il sert uniquement à relier un monnayeur à la machine, pour une laverie en libre-service.",
    usages: ['Lave-linge et sèche-linge Little Giants en libre-service'],
    versions: [v('APCL 103', 'boîtier XCI de paiement externe')],
  },
  {
    slug: 'miele-apcl-083-chariot-linge-aluminium',
    machines: ['lave-linge', 'seche-linge'],
    ref: 'APCL 083',
    categorie: 'accessoires-blanchisserie',
    nom: 'Chariot de transport du linge en aluminium 223 L',
    resume: 'Le chariot léger qui va de la laveuse au séchoir, puis à la lingerie.',
    description:
      "Chariot de transport en aluminium de 223 litres. Il fait la navette entre lave-linge, sèche-linge et lingerie sans porter le linge mouillé à bout de bras.",
    usages: ['Buanderies d’hôtel', 'EHPAD', 'Campings'],
    versions: [v('APCL 083', 'chariot aluminium, 223 L')],
  },
  {
    slug: 'miele-apcl-082-chariot-sac-linge',
    machines: ['lave-linge'],
    ref: 'APCL 082',
    categorie: 'accessoires-blanchisserie',
    nom: 'Chariot à sac de linge',
    resume: 'Pour collecter le linge sale à l’étage ou en cuisine.',
    description:
      "Chariot porte-sac pour collecter le linge sale au plus près de là où il est produit — étage d'hôtel, cuisine, vestiaire — et l'amener à la buanderie sans le manipuler deux fois.",
    usages: ['Hôtels — étages', 'Cuisines et vestiaires', 'EHPAD'],
    versions: [v('APCL 082', 'chariot à sac de linge')],
  },

  // =========================================================================
  // PANIERS POUR LAVE-VAISSELLE PTD 702 / 703 (format 500 x 500 mm)
  // =========================================================================
  {
    slug: 'miele-u-502-panier-assiettes',
    machines: ['lave-vaisselle'],
    ref: 'U 502',
    categorie: 'paniers-lave-vaisselle',
    nom: 'Panier à assiettes U 502',
    resume: 'Panier 500 x 500 mm pour assiettes, 6 ou 9 rangées.',
    description: "Panier à assiettes au format 500 x 500 mm, à 6 ou 9 rangées. Un panier de plus, c'est un panier qui se charge pendant que l'autre lave.",
    usages: ['Lave-vaisselle PTD 702 et PTD 703'],
    attention: ATT_PANIER,
    versions: [v('U 502', 'panier assiettes, 6/9 rangées')],
  },
  {
    slug: 'miele-u-504-panier-couverts',
    machines: ['lave-vaisselle'],
    ref: 'U 504',
    categorie: 'paniers-lave-vaisselle',
    nom: 'Panier à couverts compartimenté U 504',
    resume: 'Panier 500 x 500 mm à compartiments pour les couverts.',
    description: "Panier compartimenté pour les couverts, au format 500 x 500 mm. Les couverts debout et séparés sèchent mieux et se trient plus vite à la sortie.",
    usages: ['Lave-vaisselle PTD 702 et PTD 703'],
    attention: ATT_PANIER,
    versions: [v('U 504', 'panier couverts compartimenté')],
  },
  {
    slug: 'miele-u-520-panier-verres',
    machines: ['lave-vaisselle'],
    ref: 'U 520',
    categorie: 'paniers-lave-vaisselle',
    nom: 'Panier à verres U 520',
    resume: 'Panier 500 x 500 mm pour la verrerie.',
    description: "Panier à verres au format 500 x 500 mm. Le plus économique des paniers à verres de la gamme, pour la verrerie courante.",
    usages: ['Lave-vaisselle PTD 702 et PTD 703'],
    attention: ATT_PANIER,
    versions: [v('U 520', 'panier à verres')],
  },
  {
    slug: 'miele-u-507-panier-bistro',
    machines: ['lave-vaisselle'],
    ref: 'U 507',
    categorie: 'paniers-lave-vaisselle',
    nom: 'Panier bistro U 507',
    resume: 'Panier 500 x 500 mm pour un chargement mixte.',
    description: "Panier « bistro » au format 500 x 500 mm, pour charger ensemble ce qui revient d'une table : assiettes, verres et couverts.",
    usages: ['Lave-vaisselle PTD 702 et PTD 703'],
    attention: ATT_PANIER,
    versions: [v('U 507', 'panier bistro')],
  },

  // =========================================================================
  // PRODUITS LESSIVIELS — LINGE (ProCare Tex)
  // =========================================================================
  {
    slug: 'miele-procare-tex-10-a-lessive-liquide',
    machines: ['lave-linge'],
    ref: 'ProCare Tex 10 A',
    categorie: 'lessives-blanchisserie',
    nom: 'Lessive liquide concentrée ProCare Tex 10 A',
    resume: 'La lessive liquide concentrée universelle, sans phosphate, Écolabel.',
    description:
      "Lessive liquide concentrée pour le linge blanc et le linge courant, sans phosphate et porteuse de l'Écolabel européen. En bidon, elle s'utilise avec une pompe doseuse : la machine prélève la dose juste, cycle après cycle.",
    usages: ['Lave-linge professionnels avec pompes doseuses', 'Linge hôtelier, éponge, tenues'],
    caracteristiques: ['Lessive liquide concentrée', 'Sans phosphate', 'Écolabel européen'],
    attention: ATT_CHIMIE,
    versions: [v('ProCare Tex 10 A - 5 l', 'bidon de 5 l'), v('ProCare Tex 10 A - 10 l', 'bidon de 10 l'), v('ProCare Tex 10 A - 20 l', 'bidon de 20 l')],
  },
  {
    slug: 'miele-procare-tex-10-ma-lessive-delicats',
    machines: ['lave-linge'],
    ref: 'ProCare Tex 10 MA',
    categorie: 'lessives-blanchisserie',
    nom: 'Lessive liquide délicats et couleurs ProCare Tex 10 MA',
    resume: 'La lessive liquide pour les textiles délicats et colorés, sans phosphate.',
    description:
      "Lessive liquide pour les textiles délicats et les couleurs, sans phosphate. Elle complète la lessive universelle pour le linge qui ne supporte ni l'alcalinité ni les hautes températures : tenues de salle, linge de couleur.",
    usages: ['Lave-linge professionnels avec pompes doseuses', 'Textiles délicats et colorés'],
    caracteristiques: ['Lessive liquide pour délicats et couleurs', 'Sans phosphate'],
    attention: ATT_CHIMIE,
    versions: [v('ProCare Tex 10 MA - 5 l', 'bidon de 5 l'), v('ProCare Tex 10 MA - 10 l', 'bidon de 10 l'), v('ProCare Tex 10 MA - 20 l', 'bidon de 20 l')],
  },
  {
    slug: 'miele-procare-tex-11-lessive-poudre',
    machines: ['lave-linge'],
    ref: 'ProCare Tex 11',
    categorie: 'lessives-blanchisserie',
    nom: 'Lessive poudre ProCare Tex 11',
    resume: 'La lessive en poudre sans phosphate, pour les machines sans pompe doseuse.',
    description:
      "Lessive en poudre sans phosphate, pour les lave-linge chargés à la main par la boîte à produits. Le seau se range près de la machine, la dose se mesure au verre doseur.",
    usages: ['Lave-linge professionnels sans pompe doseuse', 'Linge courant'],
    caracteristiques: ['Lessive en poudre', 'Sans phosphate'],
    attention: ATT_CHIMIE,
    versions: [v('ProCare Tex 11 - 10 kg', 'seau de 10 kg'), v('ProCare Tex 11 - 20 kg', 'seau de 20 kg')],
  },
  {
    slug: 'miele-procare-tex-10-b-renforcateur',
    machines: ['lave-linge'],
    ref: 'ProCare Tex 10 B+',
    categorie: 'lessives-blanchisserie',
    nom: 'Renforçateur de lavage ProCare Tex 10 B+',
    resume: 'Le renforçateur concentré pour le linge très sale ou très gras.',
    description:
      "Renforçateur de lavage liquide concentré, à ajouter à la lessive pour le linge très chargé : torchons et tabliers de cuisine, linge gras. Il évite de relaver.",
    usages: ['Torchons et tenues de cuisine', 'Linge très sale ou gras'],
    caracteristiques: ['Renforçateur de lavage liquide concentré'],
    attention: ATT_CHIMIE,
    versions: [v('ProCare Tex 10 B+ - 5 l', 'bidon de 5 l'), v('ProCare Tex 10 B+ - 10 l', 'bidon de 10 l'), v('ProCare Tex 10 B+ - 20 l', 'bidon de 20 l')],
  },
  {
    slug: 'miele-procare-tex-70-s-adoucissant',
    machines: ['lave-linge'],
    ref: 'ProCare Tex 70 S',
    categorie: 'lessives-blanchisserie',
    nom: 'Adoucissant concentré ProCare Tex 70 S',
    resume: 'L’adoucissant concentré sans microplastique, pour l’éponge et le linge de lit.',
    description:
      "Adoucissant liquide concentré, sans microplastique. Il rend l'éponge et le linge de lit plus souples et facilite le repassage.",
    usages: ['Éponge et linge de lit', 'Linge à repasser'],
    caracteristiques: ['Adoucissant liquide concentré', 'Sans microplastique'],
    attention: ATT_CHIMIE,
    versions: [v('ProCare Tex 70 S - 5 l', 'bidon de 5 l'), v('ProCare Tex 70 S - 10 l', 'bidon de 10 l'), v('ProCare Tex 70 S - 20 l', 'bidon de 20 l')],
  },
  {
    slug: 'miele-desinfect-desinfectant-linge',
    machines: ['lave-linge'],
    ref: 'Miele Desinfect',
    categorie: 'lessives-blanchisserie',
    nom: 'Agent désinfectant en poudre Miele Desinfect',
    resume: 'L’additif désinfectant pour le linge des établissements de santé.',
    description:
      "Agent désinfectant en poudre, à ajouter au lavage quand le protocole d'hygiène de l'établissement demande une désinfection chimique du linge, en complément ou à la place de la désinfection thermique.",
    usages: ['EHPAD et établissements de santé', 'Crèches', 'Linge de résidents'],
    caracteristiques: ['Agent désinfectant en poudre'],
    attention: ATT_CHIMIE + " Le dosage et la température se règlent selon votre protocole : nous les paramétrons avec vous.",
    versions: [v('Miele Desinfect - 5 kg V1', 'seau de 5 kg'), v('Miele Desinfect - 20 kg V1', 'seau de 20 kg')],
    label: (x) => `Miele Desinfect · ${x.court}`,
  },
  {
    slug: 'miele-pro-ultraphase-smartbiz',
    machines: ['lave-linge'],
    ref: 'PRO UltraPhase',
    categorie: 'lessives-blanchisserie',
    nom: 'Cartouches de lessive PRO UltraPhase 1 et 2',
    resume: 'Les deux cartouches du dosage automatique TwinDos du SmartBiz PWM 1108.',
    description:
      "Lessive en deux phases pour le lave-linge SmartBiz PWM 1108 TwinDos : la machine dose elle-même UltraPhase 1 puis UltraPhase 2 au bon moment du cycle. Il faut les deux cartouches.",
    usages: ['Lave-linge SmartBiz PWM 1108 TwinDos'],
    caracteristiques: ['Cartouche de 1,4 l', 'Système TwinDos en deux phases'],
    versions: [v('PRO UltraPhase 1', 'UltraPhase 1, cartouche 1,4 l'), v('PRO UltraPhase 2', 'UltraPhase 2, cartouche 1,4 l')],
  },
  {
    slug: 'miele-procare-universal-81-c-detartrant',
    machines: ['lave-linge', 'lave-vaisselle'],
    ref: 'ProCare Universal 81 C',
    categorie: 'entretien-machine-laverie',
    nom: 'Nettoyant détartrant ProCare Universal 81 C',
    resume: 'Le détartrant d’entretien pour lave-linge et lave-vaisselle professionnels.',
    description:
      "Nettoyant détartrant pour l'entretien périodique des lave-linge et lave-vaisselle professionnels. Sur l'eau dure de la région, un détartrage régulier évite que le calcaire ne s'installe sur les résistances.",
    usages: ['Lave-linge professionnels', 'Lave-vaisselle professionnels'],
    caracteristiques: ['Nettoyant détartrant', 'Flacon de 250 g'],
    attention: ATT_CHIMIE,
    versions: [v('ProCare Universal 81 C', 'flacon de 250 g')],
  },

  // =========================================================================
  // PRODUITS LESSIVIELS — VAISSELLE (ProCare Shine)
  // =========================================================================
  {
    slug: 'miele-procare-shine-10-ma-detergent',
    machines: ['lave-vaisselle'],
    ref: 'ProCare Shine 10 MA',
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent liquide moyennement alcalin ProCare Shine 10 MA',
    resume: 'Le détergent liquide Miele pour la vaisselle courante.',
    description:
      "Détergent liquide moyennement alcalin pour lave-vaisselle professionnels, en bidon pour pompe doseuse. C'est le détergent de base des machines Miele, pour la vaisselle courante.",
    usages: ['Lave-vaisselle PFD et PTD', 'Vaisselle courante'],
    caracteristiques: ['Détergent liquide moyennement alcalin'],
    attention: ATT_CHIMIE,
    versions: [v('Shine 10 MA-5l', 'bidon de 5 l'), v('Shine 10 MA-10l', 'bidon de 10 l')],
    label: (x) => `ProCare Shine 10 MA · ${x.court}`,
  },
  {
    slug: 'miele-procare-shine-10-a-detergent-chlore',
    machines: ['lave-vaisselle'],
    ref: 'ProCare Shine 10 A',
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent liquide alcalin chloré ProCare Shine 10 A',
    resume: 'Le détergent alcalin au chlore actif, contre les taches de thé, de café et de vin.',
    description:
      "Détergent liquide alcalin avec chlore actif pour lave-vaisselle professionnels. Le chlore vient à bout des colorations — thé, café, vin — que le détergent courant laisse sur la porcelaine.",
    usages: ['Lave-vaisselle PFD et PTD', 'Tasses et porcelaine tachées'],
    caracteristiques: ['Détergent liquide alcalin', 'Chlore actif'],
    attention: ATT_CHIMIE + " Un détergent chloré ne convient pas à l'argenterie ni à l'aluminium.",
    versions: [v('Shine 10 A-5l', 'bidon de 5 l'), v('Shine 10 A-10l', 'bidon de 10 l')],
    label: (x) => `ProCare Shine 10 A · ${x.court}`,
  },
  {
    slug: 'miele-procare-shine-40-rincage',
    machines: ['lave-vaisselle'],
    ref: 'ProCare Shine 40',
    categorie: 'liquides-de-rincage',
    nom: 'Produit de rinçage ProCare Shine 40',
    resume: 'Le liquide de rinçage Miele pour un séchage sans traces.',
    description: "Produit de rinçage pour lave-vaisselle professionnels : il fait glisser l'eau sur la vaisselle et la verrerie, qui sèche plus vite et sans traces.",
    usages: ['Lave-vaisselle PFD et PTD'],
    caracteristiques: ['Produit de rinçage liquide'],
    attention: ATT_CHIMIE,
    versions: [v('Shine 40-5l', 'bidon de 5 l'), v('Shine 40-10l', 'bidon de 10 l')],
    label: (x) => `ProCare Shine 40 · ${x.court}`,
  },
  {
    slug: 'miele-universal-61-sel-regenerant',
    machines: ['lave-vaisselle'],
    ref: 'ProCare Universal 61',
    categorie: 'traitement-eau',
    nom: 'Sel régénérant ProCare Universal 61',
    resume: 'Le sel des adoucisseurs intégrés aux lave-vaisselle (versions WES).',
    description:
      "Sel régénérant pour l'adoucisseur intégré des lave-vaisselle professionnels, comme le PTD 703 en version WES. Sans sel, l'adoucisseur ne se régénère plus, et la machine se remet à entartrer sans que rien ne le signale.",
    usages: ['Lave-vaisselle avec adoucisseur intégré'],
    caracteristiques: ['Sel régénérant', 'Seau de 6 kg'],
    versions: [v('Universal 61-6kg', 'seau de 6 kg')],
    label: (x) => `ProCare Universal 61 · ${x.court}`,
  },
];

// ---------------------------------------------------------------------------
// Assemblage avec le tarif
// ---------------------------------------------------------------------------
const lignesTechniques = (desc = '') =>
  desc
    .split('\n')
    .slice(1)
    .map((l) => l.trim())
    .filter((l) => l && !/^Famille\s*:/.test(l) && !/accessoires professionnels ne sont pas compatibles/i.test(l))
    .map((l) => l.replace(/^Gamme\s*:\s*/, 'Gamme Miele : ').replace(/"/g, ''));

/** Toutes les références du tarif utilisées ici — lu par le générateur. */
export const refsMiele = fiches.flatMap((f) => f.versions.map((x) => x.ref));

/** Les références introuvables dans le tarif généré (doit rester vide). */
export const refsMieleManquantes = refsMiele.filter((r) => !tarifMiele[r]);

export const produitsMiele = fiches.map((f) => {
  const { versions, label, caracteristiques, ...reste } = f;
  const t0 = tarifMiele[versions[0].ref] || {};
  return {
    marque: MARQUE,
    creditVisuel: 'Miele',
    photo: visuelsMiele[f.slug]?.photo ?? null,
    ...(visuelsMiele[f.slug]?.glb ? { vue3d: { glb: visuelsMiele[f.slug].glb, usdz: visuelsMiele[f.slug].usdz || null } } : {}),
    usages: [],
    // Accessoires et consommables : commandés chez Miele, pas en stock chez
    // nous. La fiche ne doit donc promettre ni stock ni tournée.
    ...(f.type === 'machine' ? {} : { surCommande: true }),
    ...reste,
    caracteristiques: caracteristiques || lignesTechniques(t0.description),
    conditionnements: versions.map((x) => {
      const t = tarifMiele[x.ref] || {};
      return {
        label: label ? label(x) : `${x.ref} · ${x.court}`,
        refMiele: x.ref,
        prix: typeof t.prix === 'number' ? t.prix : null,
        ...(t.ean ? { ean: t.ean } : {}),
        ...(t.fiche ? { ficheMiele: t.fiche } : {}),
      };
    }),
  };
});
