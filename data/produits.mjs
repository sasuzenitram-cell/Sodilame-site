// ---------------------------------------------------------------------------
// CATALOGUE PRODUITS LESSIVIELS ET D'ENTRETIEN
//
// ⚠️  LES PRIX : chaque conditionnement a un champ `prix` (en euros HT).
//     Tant qu'il vaut `null`, le site affiche « Prix sur demande » et la
//     commande reste possible — SODILAME chiffre au moment de la validation.
//     Dès que tu renseignes un nombre (ex. prix: 84.90), le prix s'affiche,
//     le panier calcule le total et le client devient réellement autonome.
//
// ⚠️  LES CONDITIONNEMENTS marqués `aConfirmer: true` sont issus des gammes
//     publiques des fabricants et doivent être recoupés avec le tarif SODILAME
//     avant mise en ligne définitive.
//
// Les descriptions sont rédigées pour SODILAME : ne pas copier celles des
// distributeurs concurrents (contenu dupliqué = pénalité Google + risque légal).
//
// ⚠️  DONNÉES VÉRIFIÉES / NON VÉRIFIÉES — à lire avant de faire confiance
//
//     Huit références ont été reprises sur les fiches techniques officielles
//     Winterhalter transmises par le fabricant. Ce sont celles qui portent un
//     champ `fiches` : F300, F420e, F8500, F720 BLUe, F30, F6800, B100N, A15MC.
//
//     La reprise a corrigé des erreurs de fond : le F300 et le F8500 étaient
//     décrits comme des POUDRES en seaux alors que ce sont des LIQUIDES en
//     bidons, et le F420e était présenté comme compatible aluminium alors que
//     la fiche du fabricant l'exclut, anodisé compris.
//
//     La cartouche MKN 10012974 a été reprise sur la fiche de données de
//     sécurité du fabricant (la seule qu'il ait fournie) : sa composition et
//     sa mise en garde en viennent, le reste du texte est rédigé par SODILAME.
//
//     Les trois références Nordisk (PowerGranules 22633, 22634, 26602) ont été
//     relevées sur la fiche produit du fabricant et recoupées chez deux
//     revendeurs : matière, granulométrie, durée de vie, machines compatibles.
//     Les chiffres environnementaux du BIO sont des annonces du fabricant et
//     sont attribués comme telles dans le texte.
//
//     LES ONZE AUTRES RÉFÉRENCES N'ONT PAS ÉTÉ VÉRIFIÉES. Elles ont été
//     rédigées à partir des gammes publiques, et l'expérience ci-dessus montre
//     que cette source se trompe. À recouper avec les fiches du fabricant
//     avant de s'appuyer dessus pour conseiller un client :
//       F40, B200S, B220e, B170XD
//       et les 7 références Rational d'entretien four.
//
// 📷 LES PHOTOS : champ `photo` de chaque produit.
//    - `null`  → une vignette de remplacement est générée automatiquement
//               (pictogramme bidon ou seau + référence). La page reste propre.
//    - 'nom-du-fichier' → affiche /assets/produits/nom-du-fichier.jpg
//    Déposer les images dans static/assets/produits/, format carré, 800×800 px.
//    N'utiliser QUE des photos dont SODILAME a le droit d'usage : les vôtres,
//    ou celles fournies par le fabricant pour ses distributeurs.
// ---------------------------------------------------------------------------

import { produitsMiele } from './miele.mjs';
import { produitsRational } from './rational.mjs';

export const categoriesProduits = [
  {
    slug: 'detergents-lave-vaisselle',
    univers: 'entretien',
    rayon: 'consommables',
    nom: 'Détergents lave-vaisselle et lave-verres',
    nomCourt: 'Détergents',
    icone: 'laverie',
    titreSeo: 'Détergents lave-vaisselle et lave-verres professionnels',
    description:
      "Détergents liquides Winterhalter pour lave-vaisselle et lave-verres professionnels. Livraison offerte dès un bidon dans notre zone d'intervention.",
    intro:
      "Le détergent fait la moitié du résultat de lavage — l'autre moitié, c'est la dureté de votre eau et le réglage du doseur. Nous ne vendons que des produits dont nous savons régler la machine, et nos techniciens ajustent le dosage lors de leur passage.",
    conseil:
      "Un détergent trop dosé ne lave pas mieux : il voile la verrerie, attaque les joints et coûte trois fois plus cher à l'année. Un détergent sous-dosé laisse un film gras qui finit par bloquer les bras de lavage. Si vous hésitez, demandez-nous une analyse de votre eau — c'est gratuit et c'est ce qui détermine le bon produit.",
  },
  {
    slug: 'liquides-de-rincage',
    univers: 'entretien',
    rayon: 'consommables',
    nom: 'Liquides de rinçage',
    nomCourt: 'Rinçage',
    icone: 'goutte',
    titreSeo: 'Liquides de rinçage professionnels Winterhalter',
    description:
      "Liquides de rinçage Winterhalter pour lave-vaisselle et lave-verres professionnels : séchage rapide, verrerie sans trace. Livraison offerte dès un bidon.",
    intro:
      "Le liquide de rinçage ne nettoie pas : il casse la tension superficielle de l'eau pour que celle-ci s'écoule au lieu de sécher en gouttes. C'est lui qui décide si vos verres sortent brillants ou tachés, et si votre plonge peut enchaîner les cycles sans essuyage.",
    conseil:
      "Des traces blanches qui reviennent malgré un rinçage correct signalent presque toujours une eau trop dure, pas un mauvais produit. Dans ce cas, c'est le traitement d'eau qu'il faut revoir — adoucisseur ou osmoseur — et non la dose de rinçage.",
  },
  {
    slug: 'entretien-machine-laverie',
    univers: 'entretien',
    rayon: 'consommables',
    nom: 'Entretien des lave-vaisselle et lave-verres',
    nomCourt: 'Entretien machine',
    icone: 'seau',
    titreSeo: 'Pastilles et produits d’entretien pour lave-vaisselle professionnel',
    description:
      "Pastilles d'autonettoyage, détartrants et produits d'entretien pour lave-vaisselle et lave-verres professionnels Winterhalter. Livraison offerte.",
    intro:
      "Une machine de laverie ne s'entretient pas avec du détergent de lavage. Le programme d'autonettoyage a besoin d'un produit dédié, qui décolle le calcaire et le film graisseux là où le cycle normal ne passe pas — et c'est lui qui décide de la durée de vie de la cuve, du surchauffeur et des bras de lavage.",
    conseil:
      "Sur nos eaux, un lave-vaisselle non détartré perd sa température de rinçage en moins d'un an : le surchauffeur s'entoure de calcaire et ne monte plus à 82 °C. Ce n'est pas seulement une question de longévité, c'est une question d'hygiène — et ça ne se voit pas depuis la plonge.",
  },
  {
    // Le slug garde le mot « rational » : il sert de valeur de filtre dans les
    // URL déjà partagées et dans les redirections de vercel.json. Le libellé,
    // lui, couvre désormais les deux marques de fours du catalogue.
    slug: 'entretien-four-rational',
    univers: 'entretien',
    rayon: 'consommables',
    nom: 'Entretien des fours mixtes',
    nomCourt: 'Entretien four',
    icone: 'cuisson',
    titreSeo: 'Tablettes et cartouches d’entretien pour fours mixtes Rational et MKN',
    description:
      "Tablettes de nettoyage et d'entretien Rational et cartouches de lavage MKN pour fours mixtes professionnels. Produits d'origine, livraison offerte.",
    intro:
      "Un four mixte se nettoie tous les jours ou il ne se nettoie plus. Les produits d'origine du constructeur sont les seuls validés par le cycle automatique de la machine : un produit générique déclenche des alarmes, encrasse le système de dosage et fait sauter la garantie.",
    conseil:
      "La référence dépend de la marque du four et de sa génération — CareControl ou AutoDose chez Rational, WaveClean chez MKN. Si vous ne savez pas laquelle commander, envoyez-nous une photo de la plaque signalétique : nous identifions le modèle et nous vous confirmons la bonne référence avant de livrer.",
  },
  {
    slug: 'granules-lave-batterie',
    univers: 'entretien',
    rayon: 'consommables',
    nom: 'Granulés de lavage pour lave-batterie',
    nomCourt: 'Granulés',
    icone: 'bidon',
    titreSeo: 'Granulés PowerGranules pour lave-batterie Granuldisk',
    description:
      "Granulés PowerGranules d'origine pour lave-batterie Granuldisk et Nor:disk, au bidon ou au lot de 5. Livraison comprise dans le prix.",
    intro:
      "Un lave-batterie ne lave pas à l'eau : il lave aux granulés. Ces billes de plastique alimentaire, projetées par milliers contre les bacs et les marmites, font le travail que faisaient le trempage de la veille et l'huile de coude. C'est le seul consommable de la machine qui agisse mécaniquement. Le fabricant, longtemps connu sous le nom de GRANULDISK, s'appelle désormais Nordisk Clean Solutions ; les machines, elles, gardent la marque Granuldisk.",
    conseil:
      "Les granulés s'arrondissent en s'usant, et le lavage perd en efficacité sans qu'aucune alarme ne se déclenche. Le symptôme, ce sont des bacs qui ressortent sales alors que rien n'a changé sur la machine — et on accuse presque toujours le lave-batterie avant de penser aux granulés. Comptez 2 500 à 3 500 cycles par jeu, soit environ un an dans une cuisine qui tourne, et complétez le niveau chaque jour. C'est un des points que nos techniciens regardent en visite d'entretien : mieux vaut le voir avant que la plonge ne s'en plaigne.",
  },
  {
    slug: 'traitement-eau',
    univers: 'entretien',
    rayon: 'consommables',
    nom: "Sel et traitement de l'eau",
    nomCourt: 'Traitement eau',
    icone: 'sac',
    titreSeo: "Sel en pastilles pour adoucisseur d'eau — cuisine professionnelle",
    description:
      "Sel en pastilles pour adoucisseur d'eau, sac de 25 kg. Livraison offerte dans notre zone d'intervention, sans minimum de commande.",
    intro:
      "Dans les Bouches-du-Rhône, le Gard et le Vaucluse, l'eau est dure — souvent très dure. L'adoucisseur est ce qui protège tout le reste : le surchauffeur du lave-vaisselle, les résistances du four, la pompe de la machine à café. Et un adoucisseur ne fonctionne que tant qu'il reste du sel dans le bac.",
    conseil:
      "La panne la plus fréquente sur un adoucisseur n'en est pas une : c'est un bac vide. Personne ne le surveille, parce que rien ne s'allume et que rien ne s'arrête — l'eau continue de couler, simplement elle n'est plus adoucie. Trois semaines plus tard, c'est la machine qui entartre, et là ça se voit. Prenez l'habitude d'ouvrir le couvercle une fois par mois : le sel doit toujours affleurer au-dessus du niveau d'eau.",
  },

  // Lessives : rayon entretien, à la suite des familles ci-dessus.
  {
    slug: 'lessives-blanchisserie',
    univers: 'entretien',
    rayon: 'consommables',
    nom: 'Lessives et produits de blanchisserie',
    nomCourt: 'Lessives',
    icone: 'bidon',
    titreSeo: 'Lessives professionnelles ProCare Tex — blanchisserie',
    description:
      "Lessives liquides et en poudre, renforçateur, adoucissant et désinfectant pour lave-linge professionnels. Livrés sans frais de port sur notre zone d'intervention.",
    intro:
      "Une lessive professionnelle se choisit avec la machine qui la dose : en bidon pour les lave-linge équipés de pompes doseuses, en poudre pour ceux qu'on charge à la main. Le bon produit, au bon dosage, c'est moins de relavage et un linge qui dure plus longtemps.",
    conseil:
      "Si vos pompes doseuses ont été réglées pour une autre marque de lessive, faites-les recalibrer au changement de produit : deux lessives n'ont ni la même concentration ni le même dosage. Nos techniciens le font lors de la livraison.",
  },

  // =========================================================================
  // MATÉRIEL — familles de machines, vendues avec leur forfait d'installation
  // =========================================================================
  {
    slug: 'lave-linge-professionnels',
    univers: 'materiel',
    rayon: 'buanderie',
    nom: 'Lave-linge professionnels',
    nomCourt: 'Lave-linge',
    icone: 'buanderie',
    titreSeo: 'Lave-linge professionnels Miele — vente et installation',
    description:
      "Lave-linge professionnels de 6 à 20 kg pour hôtels, campings, EHPAD et restaurants, livrés, installés et mis en service par nos techniciens dans les Bouches-du-Rhône, le Gard et le Vaucluse.",
    intro:
      "Une blanchisserie se dimensionne à l'envers : on part du linge à traiter chaque jour et du temps disponible pour le faire, on en déduit la capacité du séchoir, et seulement ensuite celle de la laveuse. C'est l'essorage qui fait le lien entre les deux — une machine qui essore fort laisse moins d'eau au séchoir, et le séchage va plus vite.",
    conseil:
      "Chaque machine est vendue avec son forfait de livraison, d'installation et de mise en service. Une laveuse professionnelle est lourde et vibre à l'essorage : le plancher, l'évacuation et l'alimentation électrique se vérifient avant la livraison, pas le jour où l'on cherche à la faire passer par la porte.",
  },
  {
    slug: 'seche-linge-professionnels',
    univers: 'materiel',
    rayon: 'buanderie',
    nom: 'Sèche-linge professionnels',
    nomCourt: 'Sèche-linge',
    icone: 'buanderie',
    titreSeo: 'Sèche-linge professionnels Miele — vente et installation',
    description:
      "Sèche-linge professionnels de 8 à 22 kg, à évacuation ou à pompe à chaleur, en commande libre-service pour les laveries de camping. Livrés, installés et mis en service par nos techniciens.",
    intro:
      "Un séchoir se choisit d'abord sur son local : s'il est possible de sortir une gaine vers l'extérieur, la version à évacuation ; sinon, la pompe à chaleur, qui condense l'humidité et consomme beaucoup moins. Ensuite vient la capacité, qui doit absorber la charge entière de la laveuse — un tambour de séchoir est toujours plus grand que celui du lave-linge qu'il accompagne.",
    conseil:
      "La première cause de mauvais séchage sur une machine neuve n'est pas la machine : c'est une gaine trop longue, trop coudée, ou un local qui ne laisse pas entrer assez d'air. Nous les vérifions avant la livraison, et nous nettoyons le filtre à peluches avec vous à la mise en service.",
  },
  {
    slug: 'repassage-finition',
    univers: 'materiel',
    rayon: 'buanderie',
    nom: 'Repassage et finition du linge',
    nomCourt: 'Repassage',
    icone: 'buanderie',
    titreSeo: 'Repasseuses à cylindre et centre de repassage professionnels',
    description:
      "Repasseuses à cylindre pour nappes, serviettes et draps, et centre de repassage vapeur professionnel, livrés et installés par nos techniciens.",
    intro:
      "Le linge de table repassé à la main, c'est une heure par jour pour une personne. Une repasseuse à cylindre fait le même travail en une fraction du temps, avec un rendu régulier : c'est souvent ce qui permet de rapatrier le linge qu'on confiait à une blanchisserie extérieure.",
    conseil:
      "Une repasseuse ne repasse bien qu'un linge correctement essoré et encore légèrement humide : elle se choisit avec la laveuse. Pensez aussi à la paraffine — un cylindre entretenu ne marque pas le linge.",
  },
  {
    slug: 'lave-vaisselle-professionnel',
    univers: 'materiel',
    rayon: 'laverie',
    nom: 'Lave-vaisselle professionnels',
    nomCourt: 'Lave-vaisselle',
    icone: 'laverie',
    titreSeo: 'Lave-vaisselle professionnels Miele — vente et installation',
    description:
      "Lave-vaisselle frontaux à surchauffeur et lave-vaisselle à eau renouvelée, livrés, installés et mis en service par nos techniciens dans les Bouches-du-Rhône, le Gard et le Vaucluse.",
    intro:
      "Deux principes de lavage, deux usages. Le lave-vaisselle à surchauffeur (PTD) lave en quelques minutes dans un bain maintenu en température : c'est la machine du débit, au bar comme au restaurant. Le lave-vaisselle à eau renouvelée (PFD) change son eau à chaque cycle : c'est celle des crèches, des EHPAD et des établissements de santé.",
    conseil:
      "Chaque machine de cette famille est vendue avec son forfait de livraison, d'installation et de mise en service : nous la recevons à l'atelier, la préparons, la livrons, la raccordons et la réglons sur votre eau, puis nous montrons son fonctionnement à votre équipe. Sur l'eau de notre région, c'est ce réglage qui décide de l'aspect de votre vaisselle pendant les dix ans qui suivent.",
  },
  {
    slug: 'accessoires-blanchisserie',
    univers: 'materiel',
    rayon: 'buanderie',
    nom: 'Accessoires de blanchisserie',
    nomCourt: 'Accessoires linge',
    icone: 'outils',
    titreSeo: 'Accessoires pour lave-linge et sèche-linge professionnels Miele',
    description:
      "Cadres de superposition, socles, monnayeurs et boîtiers de paiement pour laverie libre-service, chariots de linge. Livrés et posés avec votre machine.",
    intro:
      "Les accessoires qui changent la vie d'une buanderie ne sont pas les plus chers : un cadre de superposition qui libère la moitié du sol, un socle qui remonte le hublot à hauteur de bras, un chariot qui évite de porter le linge mouillé.",
    conseil:
      "Commandez les accessoires avec la machine : ils sont posés le jour de l'installation, et nous vérifions leur compatibilité avant de passer la commande chez Miele.",
  },
  {
    slug: 'paniers-lave-vaisselle',
    univers: 'materiel',
    rayon: 'laverie',
    nom: 'Paniers pour lave-vaisselle',
    nomCourt: 'Paniers',
    icone: 'laverie',
    titreSeo: 'Paniers 500 x 500 mm pour lave-vaisselle professionnels Miele',
    description:
      "Paniers à assiettes, à couverts, à verres et bistro au format 500 x 500 mm, pour les lave-vaisselle frontaux Miele PTD 702 et PTD 703.",
    intro:
      "Un panier de plus, c'est un panier qui se charge pendant que l'autre lave : au coup de feu, c'est souvent ce qui manque le plus à la plonge.",
    conseil:
      "Les paniers se choisissent au format de la machine. Ceux-ci sont au format 500 x 500 mm ; pour une autre machine, donnez-nous sa référence avant de commander.",
  },

  {
    slug: 'fours-mixtes',
    univers: 'materiel',
    rayon: 'fours',
    nom: 'Fours mixtes',
    nomCourt: 'Fours mixtes',
    icone: 'cuisson',
    titreSeo: 'Fours mixtes RATIONAL iCombi Pro et iCombi Classic — vente et installation',
    description:
      "Fours mixtes RATIONAL iCombi Pro et iCombi Classic, électriques ou gaz, de 6 à 20 niveaux, livrés, installés et mis en service par nos techniciens dans les Bouches-du-Rhône, le Gard et le Vaucluse.",
    intro:
      "Un four mixte se choisit sur le service le plus chargé, pas sur la moyenne : combien de niveaux faut-il enfourner en même temps quand toute la brigade attend ? Le format suit ensuite les plats — GN 1/1 pour la plupart des cuisines, GN 2/1 pour les grosses pièces et les grandes quantités. Reste à choisir entre l'iCombi Pro, qui conduit ses cuissons à partir du résultat demandé, et l'iCombi Classic, que l'on règle soi-même.",
    conseil:
      "Chaque four est vendu avec son forfait de livraison, d'installation et de mise en service. L'alimentation électrique ou gaz, l'arrivée d'eau, l'évacuation et le traitement de l'eau se vérifient avant la commande : sur nos eaux dures, c'est de lui que dépend la durée de vie du générateur de vapeur.",
  },
  {
    slug: 'accessoires-fours-mixtes',
    univers: 'materiel',
    rayon: 'fours',
    nom: 'Accessoires pour fours mixtes',
    nomCourt: 'Accessoires four',
    icone: 'outils',
    titreSeo: 'Accessoires RATIONAL pour fours mixtes iCombi — soubassements, hottes, plaques GN',
    description:
      "Soubassements, kits de superposition Combi-Duo, hottes UltraVent, plaques, grilles et bacs GN d'origine RATIONAL pour fours iCombi. Livrés et posés avec votre four.",
    intro:
      "Un four mixte vaut ce que valent ses accessoires : la bonne plaque fait la différence entre une frite molle et une frite croustillante, et un soubassement à glissières range ce que l'on cherche au coup de feu.",
    conseil:
      "Les accessoires dépendent du format du four. Donnez-nous son modèle, ou une photo de sa plaque signalétique : nous vérifions la compatibilité avant de commander chez RATIONAL.",
  },
  {
    slug: 'sauteuses-multifonctions',
    univers: 'materiel',
    rayon: 'cuisson',
    nom: 'Sauteuses multifonctions',
    nomCourt: 'Sauteuses',
    icone: 'cuisson',
    titreSeo: 'Sauteuses multifonctions RATIONAL iVario Pro — vente et installation',
    description:
      "Sauteuses multifonctions RATIONAL iVario Pro 2-S et L, avec ou sans cuisson sous pression, livrées, installées et mises en service par nos techniciens dans les Bouches-du-Rhône, le Gard et le Vaucluse.",
    intro:
      "Une sauteuse multifonction saisit, fait bouillir, frit et confit dans la même cuve. Elle remplace plusieurs appareils du fourneau, et c'est souvent la solution quand une cuisine manque de feux sans pouvoir s'agrandir.",
    conseil:
      "Chaque machine est vendue avec son forfait de livraison, d'installation et de mise en service. Le raccordement triphasé, l'arrivée d'eau et l'évacuation se vérifient au relevé, avant la commande.",
  },
  {
    slug: 'accessoires-ivario',
    univers: 'materiel',
    rayon: 'cuisson',
    nom: 'Accessoires iVario',
    nomCourt: 'Accessoires iVario',
    icone: 'outils',
    titreSeo: 'Accessoires RATIONAL pour iVario Pro — soubassements et paniers',
    description:
      "Soubassements et paniers de pochage et de friture d'origine RATIONAL pour sauteuses multifonctions iVario Pro. Livrés et posés avec votre machine.",
    intro:
      "Les paniers font de l'iVario une marmite à pâtes ou une friteuse ; le soubassement le met à la bonne hauteur de travail.",
    conseil:
      "Chaque accessoire existe pour la taille 2-S ou pour les tailles L et XL. Donnez-nous votre modèle : nous vérifions avant de commander.",
  },

  // =========================================================================
  // FORFAITS — famille technique, jamais affichée au public
  //
  // Les forfaits d'installation sont déclarés comme des articles ordinaires :
  // ils passent ainsi par le panier, la validation du serveur et la grille de
  // prix de l'administration sans une ligne de code supplémentaire. La famille
  // porte `cache: true`, et le générateur du site l'exclut de toutes les pages
  // publiques — catalogue, sitemap, menus, filtres et compteurs.
  // =========================================================================
  {
    slug: 'forfaits',
    univers: 'service',
    cache: true,
    nom: "Forfaits de livraison, d'installation et de mise en service",
    nomCourt: 'Forfaits',
    icone: 'installation',
    description: '',
    intro: '',
    conseil: '',
  },
];

// ---------------------------------------------------------------------------
// Produits
// ---------------------------------------------------------------------------
export const produits = [
  // ---- Détergents lave-vaisselle / lave-verres -----------------------------
  {
    slug: 'winterhalter-f300-detergent-universel',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'F300',
    technique: {
        "soustitre": "Détergent alcalin à base de chlore actif",
        "couleur": "Jaunâtre",
        "odeur": "Spécifique au produit",
        "ph": "Environ 14 (concentré)",
        "densite": "1,24 g/cm³",
        "conservation": "12 mois",
        "stockage": "Au frais, à l'abri de la lumière, debout, hors gel, 25 °C maximum",
        "conductivite": "Environ 3 mS/cm (4 ml/L d'eau déminéralisée à 22 °C)",
        "ingredients": "Alcalins, agents blanchissants à base de chlore, phosphates, silicates",
        "dosage": [
              [
                    "Eau douce",
                    "< 8 °dH",
                    "< 150 mg/L CaCO₃",
                    "2 ml/L"
              ],
              [
                    "Eau moyenne",
                    "8 à 14 °dH",
                    "150 à 250 mg/L CaCO₃",
                    "2 à 4 ml/L"
              ]
        ],
        "danger": [
              "H290 — Peut être corrosif pour les métaux",
              "H314 — Provoque de graves brûlures de la peau et des lésions oculaires",
              "H400 — Très toxique pour les organismes aquatiques",
              "EUH031 — Le contact avec les acides dégage un gaz toxique"
        ]
  },
    marque: 'Winterhalter',
    photo: 'winterhalter-f300',
    fiches: { technique: 'F300-fiche-technique.pdf', securite: 'F300-fiche-securite.pdf' },
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent universel F300',
    resume: 'Détergent liquide chloré, particulièrement efficace sur les traces de café et de thé.',
    description:
      "Détergent liquide alcalin à base de chlore actif, conçu pour les lave-vaisselle frontaux et à capot. Sa particularité est le traitement des services à café et à thé : le chlore actif décolore les dépôts de tanin que les tasses accumulent et qu'un détergent ordinaire laisse en place. Il convient à l'inox, au plastique, à la porcelaine et aux couverts, et il protège l'aluminium — un essai préalable reste conseillé sur l'aluminium anodisé.",
    usages: ['Lave-vaisselle frontaux et à capot', 'Services à café et à thé', 'Vaisselle peu à moyennement salie'],
    caracteristiques: ['Liquide', 'Chlore actif', 'pH 14 concentré', 'Protège l’aluminium'],
    conditionnements: [
      { label: 'Bidon de 5 L', prix: null },
      { label: 'Bidon de 12 kg', prix: null },
      { label: 'Bidon de 25 kg', prix: null },
    ],
  },
  {
    slug: 'winterhalter-f8500-detergent-ultra-concentre',
    machines: ['lave-vaisselle'],
    ref: 'F8500',
    technique: {
        "soustitre": "Détergent universel liquide fortement alcalin, chlore actif, sans phosphate",
        "couleur": "Jaunâtre",
        "odeur": "Légèrement chlorée",
        "ph": "14 (concentré)",
        "densite": "1,26 g/cm³",
        "conservation": "9 mois",
        "titrage": "0,56",
        "stockage": "Au frais, à l'abri de la lumière, debout, hors gel, 25 °C maximum",
        "conductivite": "Environ 3,35 mS/cm (3 ml/L d'eau déminéralisée à 22 °C)",
        "ingredients": "Alcalis, agents blanchissants à base de chlore",
        "dosage": [
              [
                    "Eau osmosée",
                    "0 °dH",
                    "0 mg/L CaCO₃",
                    "1,5 à 1,8 ml/L"
              ],
              [
                    "Eau douce",
                    "0 à 8 °dH",
                    "0 à 142 mg/L CaCO₃",
                    "2,0 à 3,0 ml/L"
              ],
              [
                    "Eau moyennement dure",
                    "8 à 14 °dH",
                    "142 à 249 mg/L CaCO₃",
                    "3,0 à 4,0 ml/L"
              ],
              [
                    "Eau dure",
                    "> 14 °dH",
                    "> 249 mg/L CaCO₃",
                    "Traitement d'eau requis"
              ]
        ],
        "danger": [
              "H290 — Peut être corrosif pour les métaux",
              "H314 — Provoque de graves brûlures",
              "H412 — Nocif pour les organismes aquatiques, entraîne des effets néfastes à long terme",
              "EUH206 — Ne pas utiliser en combinaison avec d'autres produits : peut libérer des gaz dangereux"
        ]
  },
    marque: 'Winterhalter',
    photo: 'winterhalter-f8500',
    fiches: { technique: 'F8500-fiche-technique.pdf', securite: 'F8500-fiche-securite.pdf' },
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent universel très concentré F8500',
    resume: 'Le plus puissant de la gamme : salissures cuites, protéines et graisses.',
    description:
      "Détergent liquide fortement alcalin à base de chlore actif, sans phosphate. C'est le produit des cuisines à fort débit : lave-ustensiles, machines à avancement de casiers et convoyeurs à doigts. Sa concentration élevée fait baisser le coût par cycle, et son pouvoir blanchissant vient à bout des restes alimentaires séchés comme des taches de café et de thé.",
    usages: ['Lave-ustensiles', 'Machines à avancement et convoyeurs', 'Salissures cuites, protéines, graisses'],
    caracteristiques: ['Liquide', 'Fortement alcalin', 'Chlore actif', 'Sans phosphate'],
    // Cette mise en garde figure sur la fiche technique du fabricant. Elle
    // n'est pas décorative : le F8500 attaque ces métaux.
    attention:
      "Ne convient pas à l'argent, à l'aluminium — y compris anodisé — ni aux alliages de métaux légers. Fortement alcalin : à réserver aux lignes vaisselle et ustensiles, pas à la verrerie fine.",
    conditionnements: [
      { label: 'Bidon de 5 L', prix: null },
      { label: 'Bidon de 12 kg', prix: null },
      { label: 'Bidon de 25 kg', prix: null },
    ],
  },
  {
    slug: 'winterhalter-f420e-detergent-eau-dure',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'F420e',
    technique: {
        "soustitre": "Détergent liquide alcalin pour eau dure · EU Ecolabel DE/038/018",
        "couleur": "Incolore",
        "odeur": "Spécifique au produit",
        "ph": "Environ 14 (concentré)",
        "densite": "1,22 g/cm³",
        "conservation": "24 mois",
        "titrage": "0,93",
        "stockage": "Au frais, à l'abri de la lumière, debout, hors gel, 30 °C maximum",
        "conductivite": "Environ 2,13 mS/cm (3 ml/L d'eau déminéralisée à 22 °C)",
        "ingredients": "Alcalis, phosphonates",
        "dosage": [
              [
                    "Eau douce à moyenne",
                    "< 14 °dH",
                    "< 150 mg/L CaCO₃",
                    "1,6 à 2,4 ml/L"
              ],
              [
                    "Eau dure",
                    "> 14 °dH",
                    "> 250 mg/L CaCO₃",
                    "3 à 5 ml/L"
              ]
        ],
        "danger": [
              "H290 — Peut être corrosif pour les métaux",
              "H314 — Provoque de graves brûlures de la peau et des lésions oculaires"
        ]
  },
    marque: 'Winterhalter',
    photo: 'winterhalter-f420e',
    fiches: { technique: 'F420e-fiche-technique.pdf', securite: 'F420e-fiche-securite.pdf' },
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent écologique eau dure F420e',
    resume: 'Formulé pour les eaux calcaires, certifié Ecolabel européen. Doux pour les verres.',
    description:
      "Détergent liquide alcalin conçu pour les eaux dures, c'est-à-dire l'essentiel de notre secteur : la Crau, les Alpilles et le Comtat comptent parmi les zones les plus calcaires de la région. Sa formule est optimisée pour prévenir l'accumulation de tartre dans la machine, et il est doux avec les verres tout en préservant la stabilité de la mousse de bière. Il porte le label écologique européen (EU Ecolabel DE/038/018) et vient à bout des tanins et des traces de rouge à lèvres sans odeur résiduelle.",
    usages: ['Zones à eau calcaire', 'Lave-verres et lave-vaisselle', 'Verres sans décoration, inox, porcelaine'],
    caracteristiques: ['Liquide', 'EU Ecolabel', 'Spécial eau dure', 'Doux pour les verres'],
    attention:
      "Ne convient pas à l'aluminium, même anodisé, ni aux alliages de métaux légers. Faire un essai sur l'argent avant utilisation.",
    conditionnements: [
      { label: 'Bidon de 5 L', prix: null },
      { label: 'Bidon de 12 kg', prix: null },
      { label: 'Bidon de 25 kg', prix: null },
    ],
    misEnAvant: true,
  },
  {
    slug: 'winterhalter-f6800-detergent-tres-intensif',
    machines: ['lave-vaisselle'],
    ref: 'F6800',
    technique: {
        "soustitre": "Détergent intensif liquide hautement alcalin, dissout l'amidon",
        "couleur": "Incolore",
        "odeur": "Spécifique au produit",
        "ph": "14",
        "densite": "1,52 g/cm³",
        "conservation": "24 mois",
        "titrage": "0,18",
        "stockage": "Frais, sombre, à l'abri du gel, 30 °C maximum",
        "ingredients": "Alcalis, phosphonates. Sans chlore ni phosphate, exempt de NTA et d'EDTA",
        "dosage": [
              [
                    "Eau adoucie",
                    "0 à 3 °dH",
                    "0 à 53 mg/L CaCO₃",
                    "2,0 à 2,9 ml/L"
              ],
              [
                    "Eau douce",
                    "4 à 8 °dH",
                    "54 à 142 mg/L CaCO₃",
                    "3,0 à 5,0 ml/L"
              ],
              [
                    "Eau mi-dure à dure",
                    "> 9 °dH",
                    "> 143 mg/L CaCO₃",
                    "Traitement d'eau requis"
              ]
        ],
        "danger": [
              "H290 — Peut être corrosif pour les métaux",
              "H314 — Provoque de graves brûlures de la peau et des lésions oculaires"
        ]
  },
    marque: 'Winterhalter',
    photo: 'winterhalter-f6800',
    fiches: { technique: 'F6800-fiche-technique.pdf', securite: 'F6800-fiche-securite.pdf' },
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent intensif F6800',
    resume: 'Le seul qui dissout l’amidon : pâtes, riz, pommes de terre collés au fond des bacs.',
    description:
      "Détergent liquide hautement alcalin, dont la particularité est un pouvoir dissolvant élevé sur l'amidon. C'est ce qui le distingue du reste de la gamme : les résidus de pâtes, de riz, de purée ou de pommes de terre qui prennent au fond des bacs gastronormes résistent aux détergents ordinaires, parce que l'amidon gélifie au lieu de se dissoudre. Le F6800 les décolle. Il est sans chlore ni phosphate, très concentré et sans odeur, et il dissout également très bien les graisses. C'est le produit du lave-ustensiles et des cuisines qui produisent en volume.",
    usages: ['Lave-ustensiles', 'Bacs gastro, plats de cuisson, grilles', 'Résidus d’amidon : pâtes, riz, pommes de terre'],
    caracteristiques: ['Liquide', 'Hautement alcalin', 'Sans chlore ni phosphate', 'Dissout l’amidon'],
    attention:
      "Ne convient pas à l'argent, à l'aluminium — même anodisé — ni aux alliages métalliques. Ne pas l'utiliser sur la ligne de verrerie : la fiche du fabricant exclut le verre.",
    conditionnements: [{ label: 'Bidon de 25 kg', prix: null }],
  },
  {
    slug: 'winterhalter-f30-detergent-liquide-verres',
    machines: ['lave-verres'],
    ref: 'F30',
    technique: {
        "soustitre": "Détergent liquide pour verres, protège le verre et ses décors",
        "couleur": "Incolore",
        "odeur": "Spécifique au produit",
        "ph": "14 (concentré)",
        "densite": "1,29 g/cm³",
        "conservation": "2 ans",
        "titrage": "1,11",
        "stockage": "Au frais, à l'abri de la lumière, debout, hors gel, 30 °C maximum",
        "ingredients": "Silicates alcalins, tensides amphotères, phosphates",
        "dosage": [
              [
                    "Eau douce",
                    "< 8 °dH",
                    "< 150 mg/L CaCO₃",
                    "1,5 à 2 ml/L"
              ]
        ],
        "danger": [
              "R34 — Provoque des brûlures",
              "Port de gants, de vêtements de protection et d'une protection du visage et des yeux requis"
        ]
  },
    marque: 'Winterhalter',
    photo: 'winterhalter-f30',
    fiches: { technique: 'F30-fiche-technique.pdf', securite: 'F30-fiche-securite.pdf' },
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent verres F30',
    resume: 'Le détergent du bar : protège le verre et ses décors, même sur la verrerie fine.',
    description:
      "Détergent liquide non chloré formulé pour la verrerie, et pour elle seule. Sa particularité est d'être doux avec le verre décoré : les tests conduits par les grands verriers ont confirmé qu'il n'attaque ni les décors ni la matière, là où un détergent trop alcalin finit par laisser le voile blanc irréversible qu'on appelle la corrosion du verre. Il vient à bout des restes de jus, de bière, de vin, de cocktails et de rouge à lèvres, et il préserve la tenue de la mousse de bière. C'est le produit du bar, du bar à vin, de la brasserie et du snack, sur lave-verres sous-comptoir.",
    usages: ['Lave-verres de bar et de brasserie', 'Verrerie fine et verres décorés', 'Traces de vin, bière, rouge à lèvres'],
    caracteristiques: ['Liquide', 'Non chloré', 'Protège les décors', 'Contient des phosphates'],
    // Ce n'est pas une préférence mais une condition posée par le fabricant :
    // sans traitement d'eau, le résultat ne sera pas celui annoncé.
    attention:
      "Le fabricant conditionne le résultat à un traitement d'eau : sur une eau non adoucie ou non déminéralisée, aucun détergent ne donnera des verres impeccables. Si votre eau reste dure malgré l'adoucisseur, associez-lui le liquide de rinçage B200S plutôt que le B100N.",
    conditionnements: [
      { label: 'Bidon de 5 L', prix: null },
      { label: 'Bidon de 12 kg', prix: null },
    ],
    misEnAvant: true,
  },
  {
    slug: 'winterhalter-f40-detergent-liquide-verres-chlore',
    machines: ['lave-verres'],
    ref: 'F40',
    marque: 'Winterhalter',
    photo: null, // voir l'en-tête du fichier
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent liquide verres chloré F40',
    resume: 'Version chlorée : élimine les traces de thé, café, vin et rouge à lèvres.',
    description:
      "Détergent liquide chloré destiné aux verrerie et tasses qui marquent : traces de thé et de café dans les tasses, dépôts de vin rouge, rouge à lèvres sur les bords. Le chlore décolore ces salissures organiques que le détergent classique laisse en place.",
    usages: ['Tasses à café et à thé', 'Verres à vin', 'Salons de thé et brasseries'],
    caracteristiques: ['Liquide', 'Chloré', 'Anti-traces organiques'],
    conditionnements: [{ label: 'Bidon de 12 kg', prix: null }],
  },

  {
    slug: 'winterhalter-f720blue-detergent-neutre',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'F720 BLUe',
    technique: {
        "soustitre": "Détergent liquide neutre, effet neutre sur les eaux usées",
        "couleur": "Jaune clair",
        "odeur": "Spécifique au produit",
        "ph": "Environ 10 (concentré) · environ 7 (dissous en cuve)",
        "densite": "1,08 g/cm³",
        "conservation": "12 mois",
        "stockage": "Au frais, à l'abri de la lumière, debout, hors gel, de 0 à 25 °C maximum",
        "conductivite": "Environ 3 mS/cm (4 ml/L d'eau désionisée à 22 °C)",
        "ingredients": "Phosphonates, polycarboxylates, conservateurs",
        "dosage": [
              [
                    "Eau douce",
                    "< 8 °dH",
                    "< 150 mg/L CaCO₃",
                    "3 à 4 ml/L"
              ],
              [
                    "Eau moyenne",
                    "8 à 10 °dH",
                    "150 à 180 mg/L CaCO₃",
                    "4 à 5 ml/L"
              ]
        ],
        "danger": [
              "Aucun étiquetage de danger requis. Le produit n'est pas classé comme dangereux au sens de la directive 99/45/CE."
        ]
  },
    marque: 'Winterhalter',
    photo: 'winterhalter-f720blue',
    fiches: { technique: 'F720BLUe-fiche-technique.pdf', securite: 'F720BLUe-fiche-securite.pdf' },
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent neutre F720 BLUe',
    resume: 'Le seul de la gamme sans étiquetage de danger. Pour l’argenterie et l’aluminium.',
    description:
      "Détergent liquide au pH pratiquement neutre — 7 une fois dissous dans la cuve. C'est ce qui en fait un produit à part : il n'est ni corrosif ni irritant, ne porte aucun étiquetage de danger, et convient donc aux couverts en argent et aux pièces en aluminium que les détergents alcalins abîment. L'air de la zone de plonge est nettement plus respirable qu'avec un produit conventionnel, et les eaux usées sortent neutres. C'est le choix des établissements qui lavent de l'argenterie, et de ceux qui veulent réduire l'exposition du personnel.",
    usages: ['Argenterie et aluminium', 'Lave-vaisselle à passage manuel et frontal', 'Réduction de l’exposition du personnel'],
    caracteristiques: ['Liquide', 'pH neutre', 'Aucun étiquetage de danger', 'Action blanchissante'],
    attention:
      "Ne pas associer au produit A 10 TK. Sa concentration ne se mesure pas au kit acide-base habituel : les doseurs à électrode sont incompatibles, il faut un doseur automatique à minuterie.",
    conditionnements: [{ label: 'Bidon de 10 L', prix: null }],
    misEnAvant: true,
  },

  // ---- Liquides de rinçage -------------------------------------------------
  {
    slug: 'winterhalter-b100n-liquide-rincage-universel',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'B100N',
    technique: {
        "soustitre": "Liquide de rinçage universel neutre",
        "couleur": "Incolore",
        "odeur": "Spécifique au produit",
        "ph": "Environ 5,5 (concentré)",
        "densite": "Environ 1,02 g/cm³",
        "conservation": "2 ans",
        "viscosite": "< 10 mPa·s à 20 °C",
        "stockage": "Au frais, à l'ombre, debout, à l'abri du gel, 30 °C maximum",
        "ingredients": "Phosphonates, polycarboxylates, agents tensioactifs non ioniques, conservateurs, sels d'acides organiques",
        "dosage": [
              [
                    "Toutes duretés",
                    "—",
                    "—",
                    "0,1 à 0,4 ml/L selon la vaisselle et la qualité de l'eau"
              ]
        ],
        "danger": [
              "H319 — Provoque une sévère irritation des yeux"
        ]
  },
    marque: 'Winterhalter',
    photo: 'winterhalter-b100n',
    fiches: { technique: 'B100N-fiche-technique.pdf', securite: 'B100N-fiche-securite.pdf' },
    categorie: 'liquides-de-rincage',
    nom: 'Liquide de rinçage universel B100N',
    resume: 'Le rinçage standard : séchage rapide, pas de trace, toutes machines.',
    description:
      "Liquide de rinçage neutre, compatible avec l'ensemble des lave-vaisselle et lave-verres professionnels et avec tous les détergents courants. Il casse la tension superficielle de l'eau en fin de cycle : celle-ci s'écoule au lieu de sécher en gouttes, la vaisselle sort sèche et brillante, et l'essuyage manuel disparaît — avec le risque de recontamination et de coupure qui va avec. Il est doux pour les verres et leurs décorations, et n'altère pas la tenue de la mousse de bière. Particulièrement adapté aux installations équipées d'un adoucisseur.",
    usages: ['Toutes machines professionnelles', 'Verrerie décorée', 'Installations avec adoucisseur'],
    caracteristiques: ['Liquide', 'Neutre (pH 5,5)', 'Séchage rapide', 'Dosage 0,1 à 0,4 ml/L'],
    conditionnements: [
      { label: 'Bidon de 5 L', prix: null },
      { label: 'Bidon de 10 L', prix: null },
      { label: 'Bidon de 20 L', prix: null },
    ],
    misEnAvant: true,
  },
  {
    slug: 'winterhalter-b200s-liquide-rincage-universel',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'B200S',
    marque: 'Winterhalter',
    photo: null, // voir l'en-tête du fichier
    categorie: 'liquides-de-rincage',
    nom: 'Liquide de rinçage universel B200S',
    resume: 'Alternative universelle, adaptée aux eaux traitées ou peu minéralisées.',
    description:
      "Liquide de rinçage universel dont la formulation convient particulièrement aux établissements équipés d'un adoucisseur ou d'un osmoseur, où l'eau est déjà déminéralisée. Sur ces installations, il donne un séchage plus régulier que le produit standard.",
    usages: ['Installations avec adoucisseur ou osmoseur', 'Verrerie de restaurant', 'Toutes machines'],
    caracteristiques: ['Liquide', 'Universel', 'Eaux traitées'],
    conditionnements: [{ label: 'Bidon de 10 L', prix: null }],
  },
  {
    slug: 'winterhalter-b220e-liquide-rincage-acide',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'B220e',
    marque: 'Winterhalter',
    photo: null, // voir l'en-tête du fichier
    categorie: 'liquides-de-rincage',
    nom: 'Liquide de rinçage acide B220e',
    resume: 'Rinçage acide : dissout les dépôts minéraux au fil des cycles.',
    description:
      "Liquide de rinçage à formulation acide, conçu pour les eaux qui laissent des dépôts minéraux malgré un rinçage correct. Son acidité neutralise le calcaire résiduel à chaque cycle et évite qu'il ne se fixe sur la verrerie et dans la cuve. C'est un correctif utile, pas un substitut à un traitement d'eau.",
    usages: ['Eaux très calcaires', 'Verrerie qui se voile', 'Machines sans traitement d’eau'],
    caracteristiques: ['Liquide', 'Acide', 'Anti-dépôts minéraux'],
    conditionnements: [{ label: 'Bidon de 5 L', prix: null }],
  },
  {
    slug: 'winterhalter-b170xd-liquide-rincage-plastiques',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'B170XD',
    marque: 'Winterhalter',
    photo: null, // voir l'en-tête du fichier
    categorie: 'liquides-de-rincage',
    nom: 'Liquide de rinçage plastiques B170XD',
    resume: 'Pour gobelets réutilisables et vaisselle plastique, qui sèchent mal.',
    description:
      "Liquide de rinçage spécifique aux gobelets réutilisables et à la vaisselle en plastique, qui retiennent l'eau bien plus que le verre ou la porcelaine et ressortent humides d'un cycle normal. Une nécessité pour les festivals, les cantines et tous les établissements passés au réutilisable.",
    usages: ['Gobelets réutilisables', 'Vaisselle plastique et mélamine', 'Cantines et événementiel'],
    caracteristiques: ['Liquide', 'Spécial plastiques', 'Séchage optimisé'],
    conditionnements: [{ label: 'Bidon de 10 L', prix: null }],
  },

  // ---- Entretien des machines de laverie -----------------------------------
  {
    slug: 'winterhalter-a15mc-pastilles-autonettoyage',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'A15MC',
    technique: {
        "soustitre": "Pastilles pour le programme d'autonettoyage",
        "couleur": "Blanc",
        "odeur": "Spécifique au produit",
        "ph": "9,5 (à 16 g/L)",
        "conservation": "24 mois",
        "poidsPastille": "Environ 8 g",
        "stockage": "Frais, sombre, à l'abri du gel, 25 °C maximum",
        "ingredients": "Tensioactifs non ioniques, phosphates, parfums",
        "dosage": [
              [
                    "Lave-vaisselle UC",
                    "—",
                    "—",
                    "1 pastille"
              ],
              [
                    "Lave-vaisselle PT",
                    "—",
                    "—",
                    "2 pastilles"
              ],
              [
                    "Lave-vaisselle UF",
                    "—",
                    "—",
                    "2 à 3 pastilles"
              ],
              [
                    "CTR / MTR / MTF",
                    "—",
                    "—",
                    "1 pastille par cuve"
              ]
        ],
        "danger": [
              "H319 — Provoque une irritation oculaire grave",
              "EUH208 — Contient un dérivé de tétraméthyl-naphtyl-éthanone : peut produire une réaction allergique"
        ]
  },
    marque: 'Winterhalter',
    photo: 'winterhalter-a15mc',
    fiches: { technique: 'A15MC-fiche-technique.pdf', securite: 'A15MC-fiche-securite.pdf' },
    categorie: 'entretien-machine-laverie',
    nom: 'Pastilles d’autonettoyage A15MC',
    resume: 'Une pastille dans la cuve, le programme d’autonettoyage fait le reste.',
    description:
      "Pastille destinée au programme d'autonettoyage des lave-vaisselle et lave-verres Winterhalter. Elle élimine le calcaire, le film graisseux et les odeurs que le cycle de lavage ordinaire ne traite pas. Elle ne contient ni chlore ni phosphate, et son intérêt pratique est la manipulation : le personnel n'a aucun contact avec le produit, contrairement à un détartrant liquide qu'il faut verser et doser. C'est le geste d'entretien le plus rentable d'une laverie — sur nos eaux calcaires, il conditionne la durée de vie du surchauffeur.",
    usages: ['Programme d’autonettoyage', 'Détartrage de la cuve', 'Élimination des odeurs'],
    caracteristiques: ['Pastilles de 8 g', 'Sans chlore ni phosphate', 'Aucun contact avec le produit', 'pH 9,5'],
    // Dosage constructeur, repris de la fiche technique : il dépend du modèle.
    dosage: 'UC : 1 pastille · PT : 2 pastilles · UF : 2 à 3 pastilles · CTR/MTR/MTF : 1 pastille par cuve',
    attention:
      "Ne convient pas à l'argent, à l'aluminium — même anodisé — ni aux alliages métalliques. Retirer le film protecteur avant usage, et le filtre et le tamis en cas de nettoyage manuel.",
    conditionnements: [
      { label: 'Carton de 20 sachets de 0,05 kg', prix: null },
      { label: 'Carton de 10 sachets de 0,2 kg', prix: null },
    ],
  },

  // ---- Entretien fours Rational -------------------------------------------
  {
    slug: 'rational-active-green-tablettes-nettoyantes',
    machines: ['four'],
    ref: '56.01.535',
    marque: 'Rational',
    photo: 'rational-56-01-535-tab-active-green',
    categorie: 'entretien-four-rational',
    nom: 'Tablettes nettoyantes Active Green',
    resume: 'Nettoyage rapide et détartrage automatique des fours iCombi.',
    description:
      "Tablette de nettoyage de dernière génération pour les fours Rational iCombi Pro et iCombi Classic. Elle permet un nettoyage intermédiaire en une douzaine de minutes et assure le détartrage automatique de la chaudière. Formule sans phosphate ni phosphore, avec une consommation de produit réduite de moitié par rapport à la génération précédente à efficacité équivalente.",
    usages: ['Rational iCombi Pro', 'Rational iCombi Classic'],
    caracteristiques: ['Sans phosphate ni phosphore', 'Nettoyage intermédiaire ~12 min', 'Détartrage automatique'],
    conditionnements: [{ label: 'Seau de 150 tablettes', prix: null }],
    misEnAvant: true,
  },
  {
    slug: 'rational-tablettes-entretien-carecontrol',
    machines: ['four'],
    ref: '56.00.562',
    marque: 'Rational',
    photo: 'rational-56-00-562-care-tab',
    categorie: 'entretien-four-rational',
    nom: 'Tablettes d’entretien CareControl',
    resume: 'Protègent la chaudière du calcaire sur les fours équipés de CareControl.',
    description:
      "Tablette d'entretien destinée aux fours équipés du système CareControl : SelfCookingCenter, iCombi Pro et iCombi Classic. Elle traite le circuit de vapeur et protège la chaudière de l'entartrage. C'est le produit dont l'oubli provoque, à terme, la panne de chaudière la plus coûteuse du four mixte.",
    usages: ['SelfCookingCenter avec CareControl', 'iCombi Pro', 'iCombi Classic'],
    caracteristiques: ['Protection anticalcaire', 'Circuit vapeur', 'Produit d’origine Rational'],
    conditionnements: [{ label: 'Seau de 150 tablettes', prix: null }],
  },
  {
    slug: 'rational-tablettes-nettoyage-selfcookingcenter',
    machines: ['four'],
    ref: '56.00.210',
    marque: 'Rational',
    photo: null, // voir l'en-tête du fichier
    categorie: 'entretien-four-rational',
    nom: 'Tablettes de nettoyage SelfCookingCenter',
    resume: 'Nettoyage des générations SelfCookingCenter et CombiMaster Plus.',
    description:
      "Tablette de nettoyage pour les fours de génération SelfCookingCenter et CombiMaster Plus. Elle dissout les graisses cuites de l'enceinte pendant le cycle automatique. C'est la référence à commander pour les fours installés avant le passage à la gamme iCombi.",
    usages: ['Rational SelfCookingCenter', 'Rational CombiMaster Plus'],
    caracteristiques: ['Nettoyage de l’enceinte', 'Cycle automatique', 'Produit d’origine Rational'],
    conditionnements: [{ label: 'Seau de 100 tablettes', prix: null, aConfirmer: true }],
  },
  {
    slug: 'rational-tablettes-rincage',
    machines: ['four'],
    ref: '56.00.211',
    marque: 'Rational',
    photo: 'rational-56-00-211-tab-rincage',
    categorie: 'entretien-four-rational',
    nom: 'Tablettes de rinçage',
    resume: 'Complètent le cycle de nettoyage sur les fours sans CareControl.',
    description:
      "Tablette de rinçage utilisée en complément de la tablette de nettoyage sur les fours SelfCookingCenter non équipés de CareControl. Elle neutralise les résidus de détergent en fin de cycle et évite les remontées de goût dans les cuissons suivantes.",
    usages: ['SelfCookingCenter sans CareControl'],
    caracteristiques: ['Rinçage de fin de cycle', 'Produit d’origine Rational'],
    conditionnements: [{ label: 'Seau de 50 tablettes', prix: null, aConfirmer: true }],
  },
  {
    slug: 'rational-tablettes-nettoyage-sans-phosphate',
    machines: ['four'],
    ref: '56.02.315E',
    marque: 'Rational',
    photo: 'rational-56-02-315e-tab-sans-phosphate',
    categorie: 'entretien-four-rational',
    nom: 'Tablettes de nettoyage sans phosphate',
    resume: 'Formule sans phosphate, compatible avec l’ensemble des générations.',
    description:
      "Tablette de nettoyage sans phosphate, compatible avec les différentes générations de fours Rational. Elle répond aux cahiers des charges environnementaux de plus en plus fréquents dans les marchés publics et les collectivités, sans perte d'efficacité sur les graisses cuites.",
    usages: ['Toutes générations Rational', 'Collectivités et marchés publics'],
    caracteristiques: ['Sans phosphate', 'Toutes générations', 'Produit d’origine Rational'],
    conditionnements: [{ label: 'Seau de 100 tablettes', prix: null, aConfirmer: true }],
  },
  {
    slug: 'rational-cartouche-active-green',
    machines: ['four'],
    ref: '56.01.912',
    marque: 'Rational',
    photo: 'rational-56-01-912-cartouche-active-green',
    categorie: 'entretien-four-rational',
    nom: 'Cartouche de nettoyage Active Green',
    resume: 'Cartouche de détergent pour iCombi Pro équipé de l’AutoDose.',
    description:
      "Cartouche de détergent Active Green destinée aux fours iCombi Pro équipés de l'option iCareSystem AutoDose. Le four se sert seul dans la cartouche : plus de tablette à introduire manuellement, plus de contact du personnel avec le produit, et un dosage constant d'un cycle à l'autre.",
    usages: ['iCombi Pro avec iCareSystem AutoDose'],
    caracteristiques: ['Dosage automatique', 'Sans manipulation par le personnel', 'Produit d’origine Rational'],
    conditionnements: [{ label: 'Carton de cartouches', prix: null, aConfirmer: true }],
  },
  {
    slug: 'rational-cartouche-entretien-care',
    machines: ['four'],
    ref: '56.01.914',
    marque: 'Rational',
    photo: 'rational-56-01-914-cartouche-care',
    categorie: 'entretien-four-rational',
    nom: 'Cartouche d’entretien Care',
    resume: 'Cartouche anticalcaire pour iCombi Pro avec AutoDose.',
    description:
      "Cartouche d'entretien anticalcaire pour iCombi Pro équipé de l'iCareSystem AutoDose. Elle assure la protection de la chaudière en parallèle de la cartouche de nettoyage : les deux se posent ensemble et se remplacent au même rythme.",
    usages: ['iCombi Pro avec iCareSystem AutoDose'],
    caracteristiques: ['Protection anticalcaire', 'Dosage automatique', 'Produit d’origine Rational'],
    conditionnements: [{ label: 'Carton de cartouches', prix: null, aConfirmer: true }],
  },

  // ---- Entretien four MKN ---------------------------------------------------
  {
    slug: 'mkn-cartouches-lavage-2in1',
    machines: ['four'],
    ref: '10012974',
    marque: 'MKN',
    photo: 'mkn-cartouche-2in1',
    // Pas de champ `technique` : le fabricant n'a fourni que la fiche de
    // données de sécurité, pas de fiche technique. Sans données constructeur,
    // pas de fiche SODILAME — un gabarit à moitié vide vaut moins que rien.
    fiches: { securite: '10012974-fiche-securite.pdf' },
    categorie: 'entretien-four-rational',
    nom: 'Cartouches de lavage 2 in 1',
    resume: 'Cartouche à deux chambres pour le nettoyage automatique des fours MKN.',
    description:
      "Cartouche d'origine MKN pour le cycle de nettoyage automatique des fours mixtes de la marque. Elle réunit deux chambres dans un seul corps : la chambre inférieure contient le détergent alcalin qui décolle les graisses cuites de l'enceinte, la chambre supérieure un produit à base d'acide citrique qui rince et neutralise. Une cartouche par cycle, posée dans son logement, sans manipulation de produit concentré par le personnel.",
    usages: ['Fours mixtes MKN à nettoyage automatique', 'Nettoyage quotidien de l’enceinte', 'Rinçage et neutralisation en fin de cycle'],
    caracteristiques: ['Produit d’origine MKN', 'Deux chambres : détergent + rinçage', 'Une cartouche par cycle', 'En stock à Saint-Martin-de-Crau'],
    attention:
      "Produit corrosif : la chambre détergente est à base d'hydroxyde de sodium (pH supérieur à 12). La cartouche se manipule fermée, gants aux mains, et ne s'ouvre jamais. Ne pas mélanger avec un acide ni avec un autre produit d'entretien.",
    conditionnements: [{ label: 'Carton de 10 cartouches', prix: 49.5 }],
  },

  // ---- Granulés pour lave-batterie -----------------------------------------
  // Données relevées sur la fiche produit du fabricant et recoupées chez deux
  // revendeurs : matière, granulométrie, durée de vie et machines compatibles.
  // Les trois références s'achètent par lot de 5 bidons ; SODILAME ne les
  // stocke pas, d'où le champ `delai` sur chacune.
  {
    slug: 'nordisk-powergranules-20l',
    machines: ['lave-batterie'],
    ref: '22634',
    marque: 'Nordisk',
    photo: 'nordisk-22634-powergranules-20l',
    categorie: 'granules-lave-batterie',
    nom: 'PowerGranules 20 L pour Granuldisk',
    resume: 'Granulés de lavage d’origine, bidon de 20 litres — le meilleur prix au litre.',
    description:
      "Les granulés sont la pièce active d'un lave-batterie : projetés en masse contre les plaques, les bacs gastronormes et les marmites, ils décollent mécaniquement les résidus cuits que l'eau seule laisse en place. C'est ce qui supprime le trempage de la veille et le grattage à la main. Des billes de 3 mm en polyoxyméthylène, agréées contact alimentaire : assez dures pour décoller, assez souples pour ne pas marquer l'inox. Le fabricant annonce 2 500 à 3 500 cycles par jeu selon la charge et la nature des salissures, soit environ un remplacement par an dans une cuisine qui tourne. Le bidon de 20 litres est le format le plus économique au litre de la gamme.",
    usages: [
      'Granuldisk Granule Smart et Smart Plus',
      'Granuldisk Granule Flexi, Combi et Gastro',
      'Granuldisk Granule Maxi Pro',
      'Bacs gastronormes, plaques, marmites et ustensiles',
    ],
    caracteristiques: [
      'Billes de 3 mm, polyoxyméthylène',
      'Agréées contact alimentaire',
      '2 500 à 3 500 cycles par jeu',
      'Le meilleur prix au litre de la gamme',
      'Livré par un technicien, pas par un transporteur',
    ],
    attention:
      "Vérifiez que votre machine est bien un lave-batterie à granulés. Ces billes ne s'utilisent que dans une machine conçue pour elles : versées dans un lave-vaisselle ordinaire, elles bloquent la pompe et les bras de lavage. En cas de doute, envoyez-nous une photo de la plaque signalétique.",
    delai:
      "Les granulés ne sont pas stockés à Saint-Martin-de-Crau : nous les commandons chez le fabricant à réception de votre commande, et la livraison est comprise dans le prix affiché — comptez une dizaine de jours. Ce n'est pas un colis déposé devant la porte : c'est un technicien qui connaît les lave-batterie qui vous l'apporte. Dites-le-nous à la commande et il contrôle au passage l'état des granulés déjà en cuve, le niveau et la propreté du filtre. Si votre machine est à l'arrêt, appelez-nous : nous regardons ce qu'il est possible de faire dans l'urgence.",
    conditionnements: [
      { label: 'Bidon de 20 L', prix: null },
      { label: 'Lot de 5 bidons de 20 L — 100 L', prix: null },
    ],
    misEnAvant: true,
  },
  {
    slug: 'nordisk-powergranules-10l',
    machines: ['lave-batterie'],
    ref: '22633',
    marque: 'Nordisk',
    photo: 'nordisk-22633-powergranules-10l',
    categorie: 'granules-lave-batterie',
    nom: 'PowerGranules 10 L pour Granuldisk',
    resume: 'Granulés de lavage d’origine, bidon de 10 litres.',
    description:
      "Même granulé que la référence 22634, en bidon de 10 litres : le format d'appoint, et celui des machines dont la cuve demande une charge plus réduite. Des billes de 3 mm en polyoxyméthylène agréées contact alimentaire, projetées en masse contre les bacs gastronormes et les marmites pour décoller mécaniquement les résidus cuits — sans trempage ni grattage. Le fabricant annonce 2 500 à 3 500 cycles par jeu. Si vous consommez régulièrement, le bidon de 20 litres revient moins cher au litre.",
    usages: [
      'Granuldisk Granule Smart et Smart Plus',
      'Granuldisk Granule Flexi, Combi et Gastro',
      'Granuldisk Granule Maxi Pro',
      'Complément de niveau en cours d’année',
    ],
    caracteristiques: [
      'Billes de 3 mm, polyoxyméthylène',
      'Agréées contact alimentaire',
      '2 500 à 3 500 cycles par jeu',
      'Format d’appoint',
      'Livré par un technicien, pas par un transporteur',
    ],
    attention:
      "Vérifiez que votre machine est bien un lave-batterie à granulés. Ces billes ne s'utilisent que dans une machine conçue pour elles : versées dans un lave-vaisselle ordinaire, elles bloquent la pompe et les bras de lavage. En cas de doute, envoyez-nous une photo de la plaque signalétique.",
    delai:
      "Les granulés ne sont pas stockés à Saint-Martin-de-Crau : nous les commandons chez le fabricant à réception de votre commande, et la livraison est comprise dans le prix affiché — comptez une dizaine de jours. Ce n'est pas un colis déposé devant la porte : c'est un technicien qui connaît les lave-batterie qui vous l'apporte. Dites-le-nous à la commande et il contrôle au passage l'état des granulés déjà en cuve, le niveau et la propreté du filtre. Si votre machine est à l'arrêt, appelez-nous : nous regardons ce qu'il est possible de faire dans l'urgence.",
    conditionnements: [
      { label: 'Bidon de 10 L', prix: null },
      { label: 'Lot de 5 bidons de 10 L — 50 L', prix: null },
    ],
  },
  {
    slug: 'nordisk-powergranules-bio-10l',
    machines: ['lave-batterie'],
    ref: '26602',
    marque: 'Nordisk',
    photo: 'nordisk-26602-powergranules-bio-10l',
    categorie: 'granules-lave-batterie',
    nom: 'PowerGranules BIO 10 L pour Granuldisk',
    resume: 'Granulés biodégradables d’origine végétale, à prix égal avec la version standard.',
    description:
      "Même fonction, mêmes machines et même durée de vie annoncée que les PowerGranules standard — 2 500 à 3 500 cycles — mais une matière d'origine végétale : sel de calcium, huile de colza et esters biodégradables, agréés contact alimentaire. Le fabricant annonce une fabrication qui consomme 87 % d'eau en moins et émet 25 % de CO₂ en moins que celle des granulés standard, et un emballage contenant 40 % de matière recyclée. Comme le tarif est le même que celui de la version standard, c'est le choix par défaut dès qu'un établissement doit justifier ses consommables : marché public, label environnemental, cahier des charges de groupe hôtelier.",
    usages: [
      'Granuldisk Granule Smart et Smart Plus',
      'Granuldisk Granule Flexi, Combi et Gastro',
      'Granuldisk Granule Maxi Pro',
      'Établissements soumis à un cahier des charges environnemental',
    ],
    caracteristiques: [
      'Origine végétale, biodégradable',
      'Sel de calcium, huile de colza, esters',
      'Agréées contact alimentaire',
      'Même tarif que la version standard',
      'Livré par un technicien, pas par un transporteur',
    ],
    attention:
      "Vérifiez que votre machine est bien un lave-batterie à granulés. Ces billes ne s'utilisent que dans une machine conçue pour elles : versées dans un lave-vaisselle ordinaire, elles bloquent la pompe et les bras de lavage. En cas de doute, envoyez-nous une photo de la plaque signalétique.",
    delai:
      "Les granulés ne sont pas stockés à Saint-Martin-de-Crau : nous les commandons chez le fabricant à réception de votre commande, et la livraison est comprise dans le prix affiché — comptez une dizaine de jours. Ce n'est pas un colis déposé devant la porte : c'est un technicien qui connaît les lave-batterie qui vous l'apporte. Dites-le-nous à la commande et il contrôle au passage l'état des granulés déjà en cuve, le niveau et la propreté du filtre. Si votre machine est à l'arrêt, appelez-nous : nous regardons ce qu'il est possible de faire dans l'urgence.",
    conditionnements: [
      { label: 'Bidon de 10 L', prix: null },
      { label: 'Lot de 5 bidons de 10 L — 50 L', prix: null },
    ],
  },

  // ---- Sel et traitement de l'eau ------------------------------------------
  {
    slug: 'sel-pastilles-adoucisseur-25kg',
    machines: ['adoucisseur', 'lave-vaisselle', 'lave-verres'],
    ref: 'SEL25',
    // Le sel de régénération est une commodité : la marque du sac change d'un
    // approvisionnement à l'autre, et aucune ne se revendique sur l'étiquette
    // d'un bac à sel. Nous le vendons donc sous notre propre nom, ce qui évite
    // d'annoncer une marque que la prochaine palette ne portera peut-être pas.
    marque: 'SODILAME',
    // ⚠️ Illustration, pas photographie : dessin original produit par
    //    outils/illustration-sel.mjs, faute de visuel dont nous ayons les
    //    droits. À remplacer par une photo du stock dès que possible.
    photo: 'sel-pastilles-adoucisseur-25kg',
    categorie: 'traitement-eau',
    nom: 'Sel en pastilles pour adoucisseur — sac de 25 kg',
    resume: "Le consommable le moins cher du parc, et celui qui évite les réparations les plus chères.",
    description:
      "Sel en pastilles destiné à la régénération des adoucisseurs d'eau. Les pastilles se dissolvent lentement et régulièrement, sans former la croûte compacte que donne le sel en grains au fond du bac — c'est ce qui évite les régénérations incomplètes et les remplissages à la pelle. Un sac de 25 kg couvre plusieurs semaines à plusieurs mois selon la dureté de votre eau, le volume consommé et le réglage de votre appareil. Sur l'eau de notre région, comptez large : c'est le produit qu'il vaut mieux avoir en avance qu'en rupture.",
    usages: [
      "Adoucisseurs d'eau de cuisine professionnelle",
      'Adoucisseurs alimentant un lave-vaisselle ou un lave-verres',
      "Lave-vaisselle et lave-verres à adoucisseur intégré — le sel va dans la machine elle-même",
      'Adoucisseurs de laverie et de buanderie',
      "Adoucisseurs domestiques — le format et le produit sont les mêmes",
    ],
    caracteristiques: [
      'Sel en pastilles, sac de 25 kg',
      "Pour tous les adoucisseurs à bac à sel",
      'Dissolution régulière, sans prise en masse',
      'Livraison offerte sur notre zone',
    ],
    attention:
      "N'utilisez jamais de sel de déneigement, de sel de piscine ou de gros sel de cuisine dans un adoucisseur : les impuretés qu'ils contiennent encrassent la vanne et les résines, et la réparation coûte bien plus cher que la différence de prix sur le sac.",
    conditionnements: [
      // Prix public communiqué par la direction le 05/10/2026.
      { label: 'Sac de 25 kg', prix: 25 },
    ],
  },
  // =========================================================================
  // MIELE PROFESSIONAL — fiches, versions et prix dans data/miele.mjs
  // =========================================================================
  ...produitsMiele,
  // =========================================================================
  // RATIONAL — fiches, versions et prix dans data/rational.mjs
  // =========================================================================
  ...produitsRational,
];

// ---------------------------------------------------------------------------
// FORFAITS DE LIVRAISON, D'INSTALLATION ET DE MISE EN SERVICE
//
// Une machine n'est jamais vendue seule : SODILAME la reçoit à l'atelier, la
// prépare, la livre, l'installe, la raccorde, la met en service et montre son
// fonctionnement à l'équipe. Ce travail est facturé par un forfait PROPRE À
// CHAQUE MACHINE, dont le montant varie avec la machine — un lave-verres ne se
// pose pas comme une laveuse de 27 kg.
//
// Chaque forfait est généré ici à partir de sa machine, et :
//   — le panier l'ajoute automatiquement avec la machine, en suit la quantité
//     et le retire avec elle (static/assets/panier.js) ;
//   — le serveur IGNORE les lignes de forfait envoyées par le navigateur et
//     les recalcule lui-même à partir des machines commandées
//     (api/commande.js). Un forfait ne peut donc ni être retiré, ni être
//     commandé seul, même par une requête fabriquée à la main.
//
// 💶 PRIX : à renseigner ici, machine par machine (référence de la machine →
//    montant HT), ou dans l'administration, où les forfaits apparaissent dans
//    leur propre rubrique. `null` affiche « prix sur demande ».
// ---------------------------------------------------------------------------
// Grille de la direction, 29/10/2026 (prix HT) :
//   lave-linge et sèche-linge jusqu'à 10 kg ........ 350 €
//   lave-linge et sèche-linge de 11 à 25 kg ........ 550 €
//   calandres (repasseuses à cylindre) ............. 850 €
//   lave-vaisselle .................................. à fixer (prix sur demande)
// Grille de la direction, 30/10/2026 (prix HT), RATIONAL :
//   fours mixtes 6 et 10 niveaux (1/1 et 2/1) ...... 550 €
//   fours mixtes 20 niveaux ......................... 850 €
//   sauteuses multifonctions iVario ................. 750 €
// L'iCombi Pro XS (6-2/3) est un four 6 niveaux : rangé à 550 €.
// Les machines de 10 kg (sèche-linge PDR 510 et PDR 910) sont rangées à 350 € :
// « en dessous de 10 kg » / « entre 11 et 25 », 10 kg tombe dans la première
// tranche. À confirmer par la direction.
const PRIX_FORFAITS = {
  'PWM 906': 350,
  'PWM 507': 350,
  'PWM 508': 350,
  'PWM 908': 350,
  'PWM 506 MOPSTAR': 350,
  'PWM 509': 350,
  'PWM 909': 350,
  'PWM 1108': 350,
  'PWM 511': 550,
  'PWM 912': 550,
  'PWM 514': 550,
  'PWM 916': 550,
  'PWM 520': 550,
  'PDR 508': 350,
  'PDR 908': 350,
  'PDR 510': 350,
  'PDR 910': 350,
  'PDR 1108': 350,
  'PDR 514': 550,
  'PDR 518': 550,
  'PDR 522': 550,
  'HM 16-83': 850,
  'PRI 210': 850,
  'PTD 702': null,
  'PTD 703': null,
  'PFD 101': null,
  'PFD 404': null,
  'PFD 407': null,
  // RATIONAL : grille de la direction du 30/10/2026.
  'iCombi Pro XS 6-2/3': 550,
  'iCombi Pro 6-1/1': 550,
  'iCombi Pro 10-1/1': 550,
  'iCombi Pro 6-2/1': 550,
  'iCombi Pro 10-2/1': 550,
  'iCombi Pro 20-1/1': 850,
  'iCombi Classic 6-1/1': 550,
  'iCombi Classic 10-1/1': 550,
  'iCombi Classic 6-2/1': 550,
  'iCombi Classic 10-2/1': 550,
  'iCombi Classic 20-1/1': 850,
  'iVario Pro 2-S': 750,
  'iVario Pro L': 750,
};

const LIBELLE_FORFAIT = 'Forfait';

for (const m of produits.filter((x) => x.type === 'machine')) {
  const ref = `${m.ref.replace(/\s+/g, '')}-INST`;
  m.forfait = ref;
  produits.push({
    slug: `forfait-${m.slug}`,
    type: 'forfait',
    pour: m.ref,
    machines: [],
    ref,
    marque: 'SODILAME',
    photo: null,
    categorie: 'forfaits',
    nom: `Livraison, installation et mise en service — ${m.ref}`,
    resume: 'Réception à l’atelier, préparation, livraison, installation, raccordement, mise en service et prise en main par votre équipe.',
    description: '',
    usages: [],
    caracteristiques: [],
    conditionnements: [{ label: LIBELLE_FORFAIT, prix: PRIX_FORFAITS[m.ref] ?? null }],
  });
}

/** Ce que comprend un forfait — affiché sur la fiche de chaque machine. */
export const etapesForfait = [
  'Réception de la machine dans nos locaux de Saint-Martin-de-Crau',
  'Contrôle et préparation à l’atelier',
  'Livraison sur votre site',
  'Installation et raccordement aux réseaux',
  'Mise en service et réglage sur votre eau',
  'Prise en main par votre équipe',
];

/** Le forfait d'une machine, ou `undefined`. */
export const forfaitDe = (m) => (m.forfait ? produits.find((p) => p.ref === m.forfait) : undefined);

// Ce que voit le public : ni forfaits, ni familles techniques. Toute page,
// grille, compteur, filtre ou menu du site doit passer par ces deux listes.
export const produitsPublics = produits.filter((p) => p.type !== 'forfait');
export const categoriesPubliques = categoriesProduits.filter((c) => !c.cache);


// ---------------------------------------------------------------------------
// Types de machine — troisième axe de filtrage du catalogue.
//
// Le champ `machines` de chaque produit est déduit de ses usages réels, pas de
// la famille : un liquide de rinçage universel sert aussi bien au lave-vaisselle
// qu'au lave-verres et apparaît donc sous les deux. Un produit mal classé ici
// envoie un client sur la mauvaise référence — à vérifier avant toute reprise.
// ---------------------------------------------------------------------------
export const machinesCatalogue = [
  { slug: 'lave-vaisselle', nom: 'Lave-vaisselle', icone: 'laverie' },
  { slug: 'lave-verres', nom: 'Lave-verres', icone: 'goutte' },
  { slug: 'four', nom: 'Four mixte', icone: 'cuisson' },
  // « Lave-batterie » est le terme du métier en France ; « lave-ustensiles »
  // se dit aussi et figure dans le texte des fiches, pour la recherche.
  { slug: 'lave-batterie', nom: 'Lave-batterie', icone: 'extraction' },
  // L'adoucisseur n'est pas une machine de production, mais c'est bien une
  // machine qu'on alimente — et c'est par là que le client cherche son sel.
  { slug: 'adoucisseur', nom: 'Adoucisseur', icone: 'goutte' },
  { slug: 'lave-linge', nom: 'Lave-linge', icone: 'buanderie' },
  { slug: 'seche-linge', nom: 'Sèche-linge', icone: 'buanderie' },
  { slug: 'repasseuse', nom: 'Repasseuse', icone: 'buanderie' },
  { slug: 'sauteuse', nom: 'Sauteuse multifonction', icone: 'cuisson' },
];

export const marquesCatalogue = [...new Set(produitsPublics.map((p) => p.marque))].sort();

// ---------------------------------------------------------------------------
// Aides
// ---------------------------------------------------------------------------
/**
 * Nom du PDF de la fiche technique à la charte SODILAME, ou null quand le
 * produit n'a pas de données constructeur relevées.
 *
 * Les espaces des références (« F720 BLUe ») sont retirés : une URL avec espace
 * s'encode en %20 et se casse au copier-coller dans un mail.
 *
 * Cette fonction est la source unique du nom de fichier : `outils/fiches.mjs`
 * l'utilise pour écrire le PDF et `build.mjs` pour le lier. Les deux ne peuvent
 * donc pas diverger.
 */
export const ficheSodilame = (p) =>
  p.technique ? `${p.ref.replace(/\s+/g, '')}-fiche-technique-sodilame.pdf` : null;

export const produitsDeCategorie = (slugCat) => produits.filter((p) => p.categorie === slugCat);
export const categorieDuProduit = (p) => categoriesProduits.find((c) => c.slug === p.categorie);

// ---------------------------------------------------------------------------
// E-SHOP — arborescence publique
//
//   /eshop                         accueil de la boutique : les collections
//   /eshop/catalogue               toutes les références, filtrables
//   /eshop/<collection>            une famille de produits
//   /eshop/<collection>/<produit>  la fiche produit
//   /eshop/panier                  le panier et l'envoi de la commande
//
// Les anciennes adresses /produits/... redirigent en 301 (vercel.json).
// « catalogue » et « panier » sont donc réservés : aucune famille ne peut
// porter ces noms (vérifié par tests/catalogue.mjs).
// ---------------------------------------------------------------------------
export const ESHOP = '/eshop';
export const urlCollection = (slugCat) => `${ESHOP}/${slugCat}`;
export const urlProduit = (p) => `${ESHOP}/${p.categorie}/${p.slug}`;
export const URL_PANIER = `${ESHOP}/panier`;
export const URL_CATALOGUE = `${ESHOP}/catalogue`;

/** Les deux rayons de la boutique, dans l'ordre d'affichage. */
export const universBoutique = [
  {
    slug: 'materiel',
    nom: 'Matériel professionnel',
    accroche: 'Livré, installé et mis en service par nos techniciens.',
  },
  {
    slug: 'entretien',
    nom: "Produits lessiviels et d'entretien",
    accroche: 'Livrés sans frais de port par nos techniciens, dès une unité.',
  },
];
export const collectionsDe = (u) => categoriesPubliques.filter((c) => c.univers === u);

// ---------------------------------------------------------------------------
// RAYONS — premier niveau du menu de la boutique (décision du 29/10/2026)
//
//   Froid · Cuisson · Fours · Laverie · Buanderie · Extraction · Consommables
//
// Chaque collection appartient à un rayon (champ `rayon`) : ce sont les
// sous-catégories. Un rayon sans collection en ligne a quand même sa page
// (/eshop/<rayon>) : elle présente les marques que nous installons et renvoie
// vers le devis. Elle reste hors index tant qu'aucun produit n'y est vendu.
// ---------------------------------------------------------------------------
export const rayonsBoutique = [
  {
    slug: 'froid',
    nom: 'Froid',
    icone: 'froid',
    service: 'froid-professionnel',
    marques: ['foster', 'infrico', 'atosa'],
    aVenir: ['Armoires réfrigérées', 'Tables réfrigérées', 'Cellules de refroidissement rapide', 'Chambres froides'],
    accroche: 'Armoires, tables et cellules de refroidissement, installées et entretenues par nos frigoristes.',
  },
  {
    slug: 'cuisson',
    nom: 'Cuisson',
    icone: 'cuisson',
    service: 'materiel-cuisson-professionnel',
    marques: ['angelo-po', 'capic', 'ambassade-de-bourgogne', 'mkn'],
    aVenir: ['Fourneaux et pianos', 'Friteuses', 'Planchas et grillades', 'Marmites'],
    accroche: 'Fourneaux, pianos, friteuses et sauteuses, raccordés au gaz ou à l’électricité par nos techniciens.',
  },
  {
    slug: 'fours',
    nom: 'Fours',
    icone: 'cuisson',
    service: 'materiel-cuisson-professionnel',
    marques: ['rational', 'unox', 'mkn'],
    aVenir: ['Fours à convection'],
    accroche: 'Fours mixtes et fours à convection, installés, réglés et entretenus par nos techniciens.',
  },
  {
    slug: 'laverie',
    nom: 'Laverie',
    icone: 'laverie',
    service: 'laverie-restauration',
    marques: ['winterhalter', 'comenda', 'miele-professional'],
    aVenir: [],
    accroche: 'Lave-vaisselle professionnels et paniers, livrés, installés et réglés sur votre eau.',
  },
  {
    slug: 'buanderie',
    nom: 'Buanderie',
    icone: 'buanderie',
    service: 'buanderie-professionnelle',
    marques: ['miele-professional', 'girbau', 'danube'],
    aVenir: [],
    accroche: 'Lave-linge, sèche-linge et repasseuses professionnels, livrés, installés et mis en service.',
  },
  {
    slug: 'extraction',
    nom: 'Extraction',
    icone: 'extraction',
    service: 'extraction-ventilation-cuisine',
    marques: ['vim', 'saftair'],
    aVenir: ['Hottes professionnelles', 'Caissons d’extraction', 'Compensation d’air'],
    accroche: 'Hottes, caissons et compensation d’air, dimensionnés et posés par nos techniciens.',
  },
  {
    slug: 'consommables',
    nom: 'Consommables',
    icone: 'bidon',
    service: null,
    marques: [],
    aVenir: [],
    accroche: 'Détergents, rinçage, lessives et produits d’entretien, livrés sans frais de port par nos techniciens.',
  },
];
export const urlRayon = (slug) => `${ESHOP}/${slug}`;
export const collectionsDuRayon = (slug) => categoriesPubliques.filter((c) => c.rayon === slug);
export const rayonDe = (c) => rayonsBoutique.find((r) => r.slug === c?.rayon);
/** Le rayon d'une adresse /eshop/… (rayon, collection ou fiche produit), pour le menu. */
export const rayonDuChemin = (chemin = '') => {
  const s = chemin.split('/')[2];
  return rayonsBoutique.find((r) => r.slug === s) || rayonDe(categoriesPubliques.find((c) => c.slug === s));
};

export const produitsNav = categoriesPubliques.map((c) => ({
  nom: c.nomCourt,
  url: urlCollection(c.slug),
}));
export const totalProduits = produitsPublics.length;
export const auMoinsUnPrix = produitsPublics.some((p) => p.conditionnements.some((c) => typeof c.prix === 'number'));
