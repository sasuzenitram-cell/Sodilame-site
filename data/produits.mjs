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

export const categoriesProduits = [
  {
    slug: 'detergents-lave-vaisselle',
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
    slug: 'entretien-four-rational',
    nom: 'Entretien des fours Rational',
    nomCourt: 'Entretien four',
    icone: 'cuisson',
    titreSeo: 'Tablettes et cartouches d’entretien pour fours Rational et Frima',
    description:
      "Tablettes de nettoyage, d'entretien et de rinçage et cartouches Active Green pour fours Rational iCombi et SelfCookingCenter. Produits d'origine, livraison offerte.",
    intro:
      "Un four mixte se nettoie tous les jours ou il ne se nettoie plus. Les produits d'origine Rational sont les seuls validés par le cycle automatique de la machine : un produit générique déclenche des alarmes, encrasse le système de dosage et fait sauter la garantie.",
    conseil:
      "La référence dépend de la génération du four et de la présence de CareControl ou de l'AutoDose. Si vous ne savez pas laquelle commander, envoyez-nous une photo de la plaque signalétique : nous identifions le modèle et nous vous confirmons la bonne référence avant de livrer.",
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
    photo: null, // voir l'en-tête du fichier
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
    photo: null, // voir l'en-tête du fichier
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
    photo: null, // voir l'en-tête du fichier
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
    photo: null, // voir l'en-tête du fichier
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
    photo: null, // voir l'en-tête du fichier
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
    photo: null, // voir l'en-tête du fichier
    categorie: 'entretien-four-rational',
    nom: 'Cartouche d’entretien Care',
    resume: 'Cartouche anticalcaire pour iCombi Pro avec AutoDose.',
    description:
      "Cartouche d'entretien anticalcaire pour iCombi Pro équipé de l'iCareSystem AutoDose. Elle assure la protection de la chaudière en parallèle de la cartouche de nettoyage : les deux se posent ensemble et se remplacent au même rythme.",
    usages: ['iCombi Pro avec iCareSystem AutoDose'],
    caracteristiques: ['Protection anticalcaire', 'Dosage automatique', 'Produit d’origine Rational'],
    conditionnements: [{ label: 'Carton de cartouches', prix: null, aConfirmer: true }],
  },
];

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
];

export const marquesCatalogue = [...new Set(produits.map((p) => p.marque))].sort();

// ---------------------------------------------------------------------------
// Aides
// ---------------------------------------------------------------------------
export const produitsDeCategorie = (slugCat) => produits.filter((p) => p.categorie === slugCat);
export const categorieDuProduit = (p) => categoriesProduits.find((c) => c.slug === p.categorie);
// Les familles ne sont plus des pages : ce sont des filtres du catalogue.
export const produitsNav = categoriesProduits.map((c) => ({
  nom: c.nomCourt,
  url: `/produits?famille=${c.slug}`,
}));
export const totalProduits = produits.length;
export const auMoinsUnPrix = produits.some((p) => p.conditionnements.some((c) => typeof c.prix === 'number'));
