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
      "Détergents liquides et en poudre Winterhalter pour lave-vaisselle et lave-verres professionnels. Livraison offerte dès un bidon dans notre zone d'intervention.",
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
    photo: null, // voir l'en-tête du fichier
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent universel F300',
    resume: 'Détergent en poudre polyvalent, pour lavage mixte vaisselle et verrerie.',
    description:
      "Détergent en poudre polyvalent conçu pour les machines à capot et les lave-vaisselle frontaux traitant des charges mixtes : assiettes, couverts et verrerie dans la même journée. C'est le produit d'entrée de gamme le plus courant dans les cuisines de restaurant qui n'ont qu'une seule machine.",
    usages: ['Lave-vaisselle à capot', 'Machines frontales', 'Charges mixtes vaisselle et verrerie'],
    caracteristiques: ['Poudre', 'Polyvalent', 'Eau de dureté moyenne'],
    conditionnements: [
      { label: 'Seau de 12 kg', prix: null },
      { label: 'Seau de 25 kg', prix: null },
    ],
  },
  {
    slug: 'winterhalter-f8500-detergent-ultra-concentre',
    machines: ['lave-vaisselle'],
    ref: 'F8500',
    marque: 'Winterhalter',
    photo: null, // voir l'en-tête du fichier
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent universel ultra-concentré F8500',
    resume: 'Poudre ultra-concentrée : moins de produit par cycle, moins de stock à gérer.',
    description:
      "Version ultra-concentrée du détergent universel. À volume de vaisselle égal, la dose par cycle est plus faible : le seau dure plus longtemps et le coût de lavage baisse. C'est le choix des établissements à fort débit qui veulent réduire à la fois la facture et la place occupée en réserve.",
    usages: ['Restauration à fort volume', 'Collectivités et cuisines centrales', 'Machines à capot et à avancement'],
    caracteristiques: ['Poudre', 'Ultra-concentré', 'Coût par cycle réduit'],
    conditionnements: [{ label: 'Seau de 25 kg', prix: null }],
  },
  {
    slug: 'winterhalter-f420e-detergent-eau-dure',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'F420e',
    marque: 'Winterhalter',
    photo: null, // voir l'en-tête du fichier
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent écologique eau dure F420e',
    resume: 'Formulé pour les eaux calcaires, sans phosphate.',
    description:
      "Détergent conçu pour les eaux dures, c'est-à-dire l'essentiel de notre secteur : la Crau, les Alpilles et le Comtat comptent parmi les zones les plus calcaires de la région. Sa formule sans phosphate limite l'entartrage de la cuve et du surchauffeur, là où un détergent standard laisse le calcaire s'installer cycle après cycle.",
    usages: ['Zones à eau calcaire', 'Établissements sans adoucisseur', 'Lavage quotidien intensif'],
    caracteristiques: ['Poudre', 'Sans phosphate', 'Spécial eau dure'],
    conditionnements: [
      { label: 'Seau de 6,1 kg', prix: null },
      { label: 'Seau de 12 kg', prix: null },
      { label: 'Seau de 25 kg', prix: null },
    ],
    misEnAvant: true,
  },
  {
    slug: 'winterhalter-f6800-detergent-tres-intensif',
    machines: ['lave-vaisselle'],
    ref: 'F6800',
    marque: 'Winterhalter',
    photo: null, // voir l'en-tête du fichier
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent très intensif F6800',
    resume: 'Pour les salissures cuites, brûlées ou grasses qui résistent au cycle normal.',
    description:
      "Détergent renforcé destiné aux salissures que le produit universel ne fait pas partir : plats à gratin, bacs gastronormes, ustensiles de cuisson, grilles. Il s'utilise sur les machines dédiées au gros matériel plutôt que sur la ligne de verrerie, dont il abîmerait la brillance à la longue.",
    usages: ['Lave-ustensiles', 'Bacs gastro et plats de cuisson', 'Salissures cuites ou grasses'],
    caracteristiques: ['Poudre', 'Très intensif', 'Déconseillé pour la verrerie'],
    conditionnements: [{ label: 'Seau de 25 kg', prix: null }],
  },
  {
    slug: 'winterhalter-f30-detergent-liquide-verres',
    machines: ['lave-verres'],
    ref: 'F30',
    marque: 'Winterhalter',
    photo: null, // voir l'en-tête du fichier
    categorie: 'detergents-lave-vaisselle',
    nom: 'Détergent liquide verres F30',
    resume: 'Détergent liquide non chloré, spécifique lave-verres de bar.',
    description:
      "Détergent liquide formulé pour la verrerie : il nettoie sans agresser le verre ni laisser le voile blanc irréversible que provoquent, à la longue, les produits trop alcalins. C'est le produit du bar, du snack et de la brasserie, sur lave-verres sous-comptoir.",
    usages: ['Lave-verres de bar', 'Verrerie fine et verres à pied', 'Cadence rapide en service'],
    caracteristiques: ['Liquide', 'Non chloré', 'Spécial verrerie'],
    conditionnements: [{ label: 'Bidon de 5 L', prix: null }],
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

  // ---- Liquides de rinçage -------------------------------------------------
  {
    slug: 'winterhalter-b100n-liquide-rincage-universel',
    machines: ['lave-vaisselle', 'lave-verres'],
    ref: 'B100N',
    marque: 'Winterhalter',
    photo: null, // voir l'en-tête du fichier
    categorie: 'liquides-de-rincage',
    nom: 'Liquide de rinçage universel B100N',
    resume: 'Le rinçage standard : séchage rapide, pas de trace, toutes machines.',
    description:
      "Liquide de rinçage universel, compatible avec l'ensemble des lave-vaisselle et lave-verres professionnels. Il accélère l'écoulement de l'eau en fin de cycle : la vaisselle sort sèche et sans gouttes séchées, ce qui supprime l'essuyage manuel et le risque de recontamination qui va avec.",
    usages: ['Toutes machines professionnelles', 'Vaisselle et verrerie', 'Usage quotidien'],
    caracteristiques: ['Liquide', 'Universel', 'Séchage rapide'],
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
