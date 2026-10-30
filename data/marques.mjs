// ---------------------------------------------------------------------------
// MARQUES DISTRIBUÉES
//
// Source unique des pages /marques et /marques/<slug>.
//
// ⚠️  « DISTRIBUTEUR AGRÉÉ » — CE QUE CE MOT ENGAGE
//     Le champ `agree` fait écrire « distributeur agréé » sur la page. C'est
//     une affirmation vérifiable : un fabricant avec lequel SODILAME n'a pas
//     de contrat de distribution peut en demander le retrait, et un acheteur
//     public peut la faire tomber en cours de consultation.
//     Mathieu a confirmé le 28/10/2026 que SODILAME est agréé sur l'ensemble
//     des marques listées ici. Le champ reste par marque : passer `agree` à
//     false suffit à basculer la page sur la formulation neutre
//     « nous vendons, installons et dépannons », sans rien d'autre à toucher.
//
// ⚠️  CE QUI NE DOIT PAS ÊTRE ÉCRIT ICI
//     1. Aucune liste de « pannes fréquentes » inventée. Les faits techniques
//        du champ `aRetenir` viennent tous de la documentation constructeur et
//        ont été recoupés ; le jour où on voudra parler de pannes réelles, la
//        source sera le journal d'intervention SODILAME, pas une supposition.
//     2. Aucun logo de marque, SAUF celui que le fabricant nous a remis en tant
//        que distributeur (champ `logo`). Le droit de citer un nom pour dire ce
//        qu'on vend n'emporte pas le droit de reproduire une marque figurative :
//        un logo trouvé sur Internet ne s'ajoute pas ici.
//        — Miele : logo transmis par la direction avec le courrier Miele
//          « Display Excellence » aux revendeurs, mis en ligne le 28/10/2026.
//          À remplacer par la dernière version officielle « Miele Professional »
//          dès réception du kit revendeur.
//        — RATIONAL : logo du portail revendeur RATIONAL (Toolbox), auquel
//          SODILAME accède en tant que distributeur ; repris le 30/10/2026 sur
//          décision de la direction.
//        — Foster : pas de portail revendeur. Logo vectoriel du site public
//          Foster (fosterrefrigerator.com), repris le 30/10/2026 avec les
//          visuels produit, sur décision de la direction et sous sa
//          responsabilité. À remplacer par le logo remis par Foster s'il en
//          fournit un.
//     3. Aucune phrase reprise d'un site de fabricant ou de concurrent. Tout
//        le texte ci-dessous est rédigé pour SODILAME.
//
// 🔎  SOURCES ET POINTS NON TRANCHÉS, par marque, en bas de fichier.
// ---------------------------------------------------------------------------

/** Univers de la page d'accueil des marques. L'ordre est celui de l'affichage. */
export const universMarques = [
  {
    slug: 'cuisson',
    nom: 'Cuisson',
    intro:
      "Fours mixtes, fourneaux, sauteuses, friteuses. C'est la partie de la cuisine qui tombe en panne le soir du service, et celle dont le remplacement se prépare des mois à l'avance.",
  },
  {
    slug: 'froid',
    nom: 'Froid commercial',
    intro:
      "Armoires, tables réfrigérées, cellules de refroidissement, vitrines. En Provence, le froid travaille dans des arrière-cuisines qui montent à 40 °C l'été : le choix de la classe climatique n'est pas un détail de fiche technique.",
  },
  {
    slug: 'laverie',
    nom: 'Laverie',
    intro:
      "Lave-verres, lave-vaisselle, lave-batterie, tunnels. Le matériel dont la performance dépend autant de l'eau que de la machine — et notre eau est dure.",
  },
  {
    slug: 'blanchisserie',
    nom: 'Blanchisserie',
    intro:
      "Laveuses-essoreuses, séchoirs, calandres. Hôtels, campings, EHPAD, laveries : des machines lourdes, dont l'installation se décide avant l'achat.",
  },
  {
    slug: 'preparation',
    nom: 'Préparation et conditionnement',
    intro:
      "Cutters, coupe-légumes, machines sous vide. Le petit matériel qui fait gagner des heures en production, et qui s'use parce qu'il sert tous les jours.",
  },
  {
    slug: 'ventilation',
    nom: 'Ventilation et extraction',
    intro:
      "Hottes, plafonds filtrants, caissons d'extraction, désenfumage. La partie invisible de la cuisine, et la première que regarde un contrôle.",
  },
  {
    slug: 'residentiel',
    nom: 'Cuisines privées haut de gamme',
    intro:
      "Un registre à part : l'électroménager premium des mas, villas et suites. Ce n'est pas du matériel de production, et nous le disons clairement.",
  },
];

export const marques = [
  // =========================================================================
  // CUISSON
  // =========================================================================
  {
    slug: 'rational',
    nom: 'RATIONAL',
    logo: { fichier: 'rational.png', largeur: 600, hauteur: 166, alt: 'Logo RATIONAL' },
    univers: 'cuisson',
    agree: true,
    pays: 'Allemagne',
    depuis: 1973,
    lieu: 'Landsberg am Lech, Bavière',
    site: 'https://www.rational-online.com/fr_fr/',
    resume: 'Le four mixte, et presque rien d’autre.',
    accroche:
      "RATIONAL ne fabrique que des appareils de cuisson, et c'est ce qui en fait la référence du four mixte en restauration professionnelle.",
    familles: ['Fours mixtes électriques et gaz', 'Appareils de cuisson multifonction', 'Supervision et traçabilité'],
    gammes: ['iCombi Pro', 'iCombi Classic', 'iVario Pro', 'iHexagon', 'ConnectedCooking'],
    description: [
      "RATIONAL a construit toute son activité sur un seul appareil : le four mixte. L'iCombi Pro pilote lui-même sa cuisson, son nettoyage et son détartrage ; l'iCombi Classic reprend la même mécanique en commande manuelle, pour les cuisines qui préfèrent décider elles-mêmes. L'iVario Pro remplace à lui seul la sauteuse, la friteuse et la marmite sur un plan de travail.",
      "C'est la marque sur laquelle nous intervenons le plus, et celle dont nous tenons les consommables en stock à Saint-Martin-de-Crau.",
    ],
    aRetenir: [
      "Deux consommables distincts et <b>non interchangeables</b> : les pastilles de nettoyage se placent dans le tamis de la bonde de sol, les pastilles d'entretien dans le tiroir Care. Les inverser ne nettoie rien et laisse le générateur de vapeur s'entartrer.",
      "L'écran affiche un <b>statut Care</b> séparé du statut de propreté : c'est lui qui suit l'entartrage du générateur de vapeur, et c'est le voyant à regarder en premier sur nos eaux.",
      "Sur les appareils raccordés à un adoucisseur, un <b>paramètre « eau adoucie »</b> doit être positionné à l'installation. Mal réglé, il fausse tout le cycle d'entretien — c'est un point que nous vérifions systématiquement à la mise en service.",
    ],
    clients: ['Restaurants et brasseries', 'Hôtels', 'Cuisines centrales et collectivités', 'Boulangeries-traiteurs'],
    services: ['materiel-cuisson-professionnel', 'installation-mise-en-service', 'depannage-sav-cuisine-professionnelle'],
    boutique: 'fours-mixtes',
    boutiqueTitre: 'Fours, accessoires et entretien en boutique',
    boutiqueTexte: 'iCombi Pro, iCombi Classic, iVario Pro et leurs accessoires au prix public RATIONAL, avec la pose ; pastilles et cartouches d’entretien livrées sur notre zone',
    boutiqueUrl: '/eshop/catalogue?marque=Rational#catalogue',
  },
  {
    slug: 'unox',
    nom: 'UNOX',
    univers: 'cuisson',
    agree: true,
    pays: 'Italie',
    depuis: 1990,
    lieu: 'Cadoneghe, province de Padoue',
    site: 'https://www.unox.com/fr_fr/',
    resume: 'Fours mixtes et fours de boulangerie, du compact au grand volume.',
    accroche:
      "UNOX couvre la cuisson du snacking au terminal de cuisson, avec une gamme boulangerie que peu de constructeurs tiennent aussi sérieusement.",
    familles: ['Fours mixtes restauration', 'Fours mixtes et convection pâtisserie-boulangerie', 'Cuisson accélérée', 'Traitement d’eau dédié'],
    gammes: ['CHEFTOP-X', 'CHEFTOP MIND.Maps', 'BAKERTOP-X', 'BAKERLUX SHOP.Pro', 'SPEED-X', 'EVEREO'],
    description: [
      "Deux familles à ne pas confondre : CHEFTOP pour la restauration, BAKERTOP et BAKERLUX pour la boulangerie et le snacking. UNOX a aussi poussé plus loin que les autres la cuisson accélérée, avec des fours qui combinent air chaud, humidité et micro-ondes.",
      "La nomenclature des modèles se lit directement : sur un XEVC-0621, 06 donne le nombre de niveaux et 21 le format gastronorme. Pratique au téléphone quand il faut identifier un appareil sans se déplacer.",
    ],
    aRetenir: [
      "UNOX est le constructeur le plus <b>explicite sur la qualité de l'eau</b> : le circuit vapeur demande une dureté inférieure à 8 °dH et moins de 25 ppm de chlorures. Une eau non conforme est un motif documenté de refus de garantie.",
      "Le constructeur <b>interdit les systèmes à polyphosphates</b> et préconise la résine échangeuse d'ions ou l'osmose. Sur l'eau des Bouches-du-Rhône, du Gard et du Vaucluse, le traitement d'eau n'est pas une option : c'est une condition d'achat.",
      "C'est pour cette raison que nous mesurons la dureté <b>avant</b> de chiffrer un four, pas après l'installation. L'analyse est gratuite.",
    ],
    clients: ['Restaurants indépendants et snacking', 'Boulangeries et pâtisseries', 'Terminaux de cuisson', 'Chaînes'],
    services: ['materiel-cuisson-professionnel', 'installation-mise-en-service', 'contrat-entretien-cuisine-professionnelle'],
    boutique: 'traitement-eau',
    boutiqueTexte: 'Sel pour adoucisseur et traitement de l’eau',
  },
  {
    slug: 'mkn',
    nom: 'MKN',
    univers: 'cuisson',
    agree: true,
    pays: 'Allemagne',
    depuis: 1946,
    lieu: 'Wolfenbüttel, Basse-Saxe',
    site: 'https://www.mkn.com/',
    resume: 'Fours mixtes compacts et sauteuses multifonction.',
    accroche:
      "MKN est le constructeur à regarder quand la place manque : le SpaceCombi fait 55 cm de large, et il existe en version avec hotte intégrée.",
    familles: ['Fours mixtes', 'Sauteuses multifonction', 'Fourneaux modulaires', 'Mélangeurs-cuiseurs'],
    gammes: ['FlexiCombi', 'SpaceCombi', 'FlexiChef', 'MasterLine', 'FlexiMix'],
    description: [
      "Le FlexiCombi est le four mixte de format classique ; le SpaceCombi, lui, résout un problème que rencontrent beaucoup de petites cuisines de village : 55 cm de largeur, et une version Magic Team avec hotte intégrée qui permet de s'installer là où aucune extraction n'est prévue — sous réserve de ce qu'autorise la réglementation du local.",
      "Le FlexiChef est une sauteuse qui se divise en zones indépendantes : on peut y cuire trois préparations différentes à trois températures.",
    ],
    aRetenir: [
      "Le nettoyage automatique fonctionne avec une <b>cartouche unique 2-en-1</b>, détergent et rinçage réunis. Pas de bidons séparés à gérer, et un seul consommable à tenir en stock.",
      "Les grilles <b>FlexiRack mesurent 530 × 570 mm</b> et se chargent en travers : ce n'est pas un format gastronorme standard, les accessoires d'un concurrent ne s'y adaptent pas. À savoir avant de remplacer un four par un MKN.",
      "Sur le FlexiChef, le nettoyage de cuve se fait <b>sans produit chimique</b> : il n'y a pas de consommable lessiviel sur cet appareil.",
    ],
    clients: ['Restaurants à petite cuisine', 'Front cooking et self-service', 'Restauration collective', 'Boulangeries'],
    services: ['materiel-cuisson-professionnel', 'conception-cuisine-professionnelle', 'depannage-sav-cuisine-professionnelle'],
    boutique: 'entretien-four-rational',
    boutiqueTexte: 'Cartouches de lavage pour four mixte',
  },
  {
    slug: 'angelo-po',
    nom: 'Angelo Po',
    univers: 'cuisson',
    agree: true,
    pays: 'Italie',
    depuis: 1922,
    lieu: 'Carpi, province de Modène',
    site: 'https://www.angelopo.com/fr/',
    resume: 'Le catalogue le plus large : cuisson, froid, lavage, distribution.',
    accroche:
      "Angelo Po est le constructeur vers lequel on se tourne quand une cuisine entière doit partir en un seul lot, avec un seul interlocuteur technique.",
    familles: ['Fourneaux modulaires', 'Fours mixtes', 'Froid et cellules', 'Lavage', 'Distribution et self'],
    gammes: ['TAST.O', 'ACT.O', 'Alpha 900', 'Gamma 700', 'ARI.O', 'DIV.A'],
    description: [
      "Peu de fabricants couvrent la cuisson, le froid, le lavage et la distribution sous une seule marque. Pour une cuisine centrale ou un marché public à allotissement unique, cela change la vie : un interlocuteur, une documentation, un réseau de pièces.",
      "Les fourneaux Alpha 900 sont assemblés module par module avec un joint étanche continu, et la conception hygiénique est certifiée — un argument qui pèse en restauration collective.",
    ],
    aRetenir: [
      "<b>Deux familles de fours mixtes coexistent</b> au catalogue : ACT.O (codes AT…) et TAST.O (codes AX…). Elles ne partagent ni les mêmes pièces ni les mêmes kits de superposition — relever le code exact avant toute commande.",
      "Le lavage automatique du four est une <b>option de modèle</b>, repérable au suffixe W de la référence, et non un équipement de série. Vérifier la présence du doseur avant de promettre un cycle automatique.",
      "La marque appartient au groupe Marmon : la structure de pièces détachées est centralisée et pérenne.",
    ],
    clients: ['Cuisines centrales', 'Restauration collective', 'Hôtellerie', 'Marchés publics'],
    services: ['conception-cuisine-professionnelle', 'materiel-cuisson-professionnel', 'installation-mise-en-service'],
  },
  {
    slug: 'capic',
    nom: 'CAPIC',
    univers: 'cuisson',
    agree: true,
    pays: 'France',
    depuis: 1955,
    lieu: 'Quimper, Finistère',
    site: 'https://www.capic-fr.com/',
    resume: 'Pianos et fourneaux sur mesure, fabriqués en Bretagne.',
    accroche:
      "CAPIC ne vend pas un modèle de catalogue : chaque piano est une configuration dessinée pour une cuisine et une seule.",
    familles: ['Pianos et fourneaux sur mesure', 'Sauteuses, marmites, bratt pans', 'Fours et salamandres', 'Matériel de cuisine centrale'],
    gammes: ['Cooking Suite 700 / 800 / 900 / 1000', 'Elite', 'Capitop', 'Pilot', 'Express'],
    description: [
      "Entreprise du Patrimoine Vivant, CAPIC conçoit et fabrique à Quimper. Le dessus est en inox de 3 mm, les cuves sont soudées au plan de travail plutôt qu'emboîtées, et les parties salissantes se démontent pour le nettoyage quotidien.",
      "C'est le fournisseur des cuisines qui produisent en volume — jusqu'à plusieurs dizaines de milliers de repas par jour — et des chefs qui veulent un piano dessiné autour de leur façon de travailler.",
    ],
    aRetenir: [
      "Chaque appareil étant une fabrication spéciale, il s'identifie par son <b>numéro d'affaire et son plan d'exécution</b>, pas par une référence catalogue. Conservez le dossier remis à la livraison : c'est lui qui permet de commander une pièce de carrosserie dix ans plus tard.",
      "Les couvercles de sauteuses et de marmites utilisent des <b>charnières d'un équipementier identifié</b> : la pièce reste approvisionnable même longtemps après la fabrication.",
      "Matériel gaz : les brûleurs et les sécurités relèvent des contrôles périodiques habituels, que nous intégrons au contrat d'entretien.",
    ],
    clients: ['Cuisines centrales', 'Charcutiers-traiteurs', 'Industrie agroalimentaire', 'Lycées hôteliers', 'Chefs'],
    services: ['conception-cuisine-professionnelle', 'materiel-cuisson-professionnel', 'contrat-entretien-cuisine-professionnelle'],
  },
  {
    slug: 'ambassade-de-bourgogne',
    nom: 'Ambassade de Bourgogne',
    univers: 'cuisson',
    agree: true,
    pays: 'France',
    lieu: 'Lacanche, Côte-d’Or',
    site: 'https://www.ambassade-de-bourgogne.com/fr/index.html',
    resume: 'Fourneaux français compacts, pour petites cuisines et traiteurs.',
    accroche:
      "Fabriqués à Lacanche par le même industriel que les fourneaux Lacanche, dans un format pensé pour les cuisines qui n'ont pas la place d'une ligne 900.",
    familles: ['Fourneaux gaz et électriques', 'Fours et étuves', 'Friteuses et grillades', 'Modules mobiles', 'Hottes'],
    gammes: ['Ligne gaz', 'Ligne électrique', 'Ligne finition inox', 'MobiChef'],
    description: [
      "C'est le matériel du restaurant de village, du traiteur et de la petite collectivité : des fourneaux modulaires qu'on combine, avec un vrai choix d'énergies — brûleurs gaz, plaques coup de feu, induction, radiant.",
      "Les modules mobiles MobiChef permettent de composer une ligne qu'on déplace pour nettoyer derrière, ce qui règle un problème concret dans les cuisines exiguës.",
    ],
    aRetenir: [
      "<b>Profondeur standard 650 mm</b>, et non 700 ou 900 comme les lignes classiques. C'est le premier point à vérifier avant de remplacer un fourneau existant : le raccordement et l'alignement avec le reste de la batterie en dépendent.",
      "Le laboratoire gaz du fabricant est agréé en France pour la certification des appareils gaz professionnels — rare pour une entreprise de cette taille.",
      "Construction modulaire : un module peut être ajouté à une ligne déjà en place, à condition de respecter la profondeur et la hauteur d'origine.",
    ],
    clients: ['Restaurants indépendants', 'Traiteurs', 'Petites collectivités', 'Chambres d’hôtes et maisons de famille'],
    services: ['materiel-cuisson-professionnel', 'conception-cuisine-professionnelle', 'installation-mise-en-service'],
  },

  // =========================================================================
  // FROID
  // =========================================================================
  {
    slug: 'infrico',
    nom: 'Infrico',
    univers: 'froid',
    agree: true,
    pays: 'Espagne',
    depuis: 1986,
    lieu: 'Lucena, Andalousie',
    site: 'https://www.infrico.com/',
    resume: 'Froid commercial complet, du bar au laboratoire médical.',
    accroche:
      "Un seul fabricant pour les armoires de cuisine, les vitrines de boutique et le froid médical — avec une ligne Medcare que peu de concurrents proposent.",
    familles: ['Armoires et tables réfrigérées', 'Cellules de refroidissement rapide', 'Vitrines pâtisserie et glacier', 'Dry Aging', 'Froid médical'],
    gammes: ['AGB 600', 'AGN 700', 'I-Line', 'Línea Americana', 'Dry Aging', 'Infrico Medcare'],
    description: [
      "Infrico fabrique en Andalousie pour la restauration, la boulangerie-pâtisserie, la boucherie et le commerce alimentaire, et décline la même compétence industrielle en froid médical sous la marque Medcare : pharmacies, laboratoires, cabinets, EHPAD.",
      "La gamme Dry Aging, pour la maturation de la viande, intéresse de plus en plus de bouchers et de restaurateurs de la région.",
    ],
    aRetenir: [
      "La gamme professionnelle tourne principalement au <b>R290</b>, un hydrocarbure. Conséquence pratique : ces appareils sont hors du champ du règlement F-Gas, donc <b>pas de contrôle d'étanchéité périodique</b> ni de déclaration à ce titre.",
      "En contrepartie, le R290 est inflammable : la charge est limitée et l'intervention demande des précautions particulières. C'est un travail de frigoriste, pas de bricolage.",
      "Le froid médical relève d'exigences de traçabilité de température qui n'ont rien à voir avec le froid alimentaire — nous traitons cette ligne séparément.",
    ],
    clients: ['Restaurants et bars', 'Boulangeries et pâtisseries', 'Boucheries', 'Pharmacies et laboratoires', 'EHPAD'],
    services: ['froid-professionnel', 'installation-mise-en-service', 'contrat-entretien-cuisine-professionnelle'],
  },
  {
    slug: 'foster',
    nom: 'Foster',
    logo: { fichier: 'foster.png', largeur: 600, hauteur: 289, alt: 'Logo Foster' },
    univers: 'froid',
    agree: true,
    pays: 'Royaume-Uni',
    depuis: 1968,
    lieu: 'King’s Lynn, Norfolk',
    site: 'https://www.fosterrefrigerator.com/',
    resume: 'Froid professionnel robuste, taillé pour les ambiances chaudes.',
    accroche:
      "La marque que nous proposons quand l'arrière-cuisine monte à 40 °C l'été — ce qui, en Provence, décrit à peu près toutes les arrière-cuisines.",
    familles: ['Armoires réfrigérées', 'Soubassements et tiroirs', 'Cellules de refroidissement et surgélation', 'Vitrines murales'],
    gammes: ['EcoPro G3', 'FlexDrawer', 'KORE', 'Blast chillers BCT / BFT', 'EcoShow'],
    description: [
      "Foster fabrique dans le Norfolk depuis 1968 et appartient au groupe ITW. La gamme EcoPro G3 est son volume : armoires et soubassements gastronorme, conçus pour tourner en continu dans des cuisines qui ne s'arrêtent pas.",
      "Les cellules BCT et BFT couvrent le refroidissement rapide et la surgélation, avec des versions de décongélation contrôlée que recherchent les cuisines soumises à un plan de maîtrise sanitaire exigeant.",
    ],
    aRetenir: [
      "La gamme EcoPro G3 est donnée en <b>classe climatique 5</b>, c'est-à-dire une ambiance jusqu'à 40 °C. Un matériel de classe 4 posé dans le même local perd en performance l'été, et c'est exactement ce qui provoque les pertes de marchandises en août.",
      "Fonctionnement au <b>R290</b> : hors règlement F-Gas, donc pas de contrôle d'étanchéité périodique à ce titre, mais une intervention qui demande les précautions propres aux fluides inflammables.",
      "La porte est autofermante avec point dur à 90° : un réglage de charnière négligé se paie en consommation et en condensation.",
    ],
    clients: ['Restauration commerciale', 'Restauration collective', 'Hôtellerie', 'Établissements de santé'],
    services: ['froid-professionnel', 'installation-mise-en-service', 'depannage-sav-cuisine-professionnelle'],
    boutique: 'armoires-refrigerees',
    boutiqueTitre: 'Armoires, tables et cellules en boutique',
    boutiqueTexte: 'Armoires EcoPro G3, armoires à chariots, tables réfrigérées, saladettes et cellules de refroidissement au prix public Foster, avec la pose',
    boutiqueUrl: '/eshop/catalogue?marque=Foster#catalogue',
  },
  {
    slug: 'atosa',
    nom: 'Atosa',
    univers: 'froid',
    agree: true,
    pays: 'Présence européenne : France, Royaume-Uni, Allemagne, Italie',
    site: 'https://www.atosafr.fr/',
    resume: 'Froid et cuisson à budget maîtrisé, avec garantie étendue.',
    accroche:
      "La marque du premier équipement et du remplacement à budget contraint — avec une garantie pouvant aller jusqu'à cinq ans, ce qui est rare sur ce segment.",
    familles: ['Armoires et tables réfrigérées', 'Saladettes et meubles à pizza', 'Cellules de refroidissement', 'Fours mixtes', 'Friteuses et cuisson'],
    gammes: ['MBF (inox 304)', 'ICE (inox 430)', 'EBF / ECF', 'EPF (tables réfrigérées)', 'ESL (meubles à pizza)'],
    description: [
      "Atosa couvre le froid et une partie de la cuisson, avec une logistique européenne et des stocks en France. C'est le matériel que nous proposons quand le budget commande : ouverture d'un snack, remplacement d'urgence, food-truck, saison.",
      "L'extension de garantie pièces et main-d'œuvre jusqu'à cinq ans change le calcul sur ce segment, où la durée de vie est habituellement la variable d'ajustement.",
    ],
    aRetenir: [
      "<b>Deux qualités d'inox selon la série</b>, et c'est le point à connaître avant d'acheter : les séries MBF sont en AISI 304, les séries ICE en AISI 430. L'inox 430 ne tient pas la corrosion de la même façon — à éviter en bord de mer, en zone de lavage et partout où l'on travaille au chlore.",
      "Froid au <b>R290 et R600a</b> : hors champ F-Gas, pas de contrôle d'étanchéité périodique à ce titre.",
      "Avant de référencer un matériel d'import sur un parc que nous devrons entretenir, nous vérifions la disponibilité réelle des pièces. C'est notre critère numéro un sur ce segment.",
    ],
    clients: ['Snacking et pizzerias', 'Food-trucks', 'Restaurants indépendants', 'Petits commerces alimentaires', 'Premier équipement'],
    services: ['froid-professionnel', 'materiel-cuisson-professionnel', 'depannage-sav-cuisine-professionnelle'],
  },

  // =========================================================================
  // LAVERIE
  // =========================================================================
  {
    slug: 'winterhalter',
    nom: 'Winterhalter',
    univers: 'laverie',
    agree: true,
    pays: 'Allemagne',
    depuis: 1947,
    lieu: 'Meckenbeuren, lac de Constance',
    site: 'https://www.winterhalter.com/fr-fr/',
    resume: 'Le lavage, et uniquement le lavage — machine, eau et produit.',
    accroche:
      "Winterhalter ne fait ni froid ni cuisson : la marque conçoit la machine, le traitement d'eau et le produit lessiviel comme un seul système, et c'est ce qui donne le résultat sur le verre.",
    familles: ['Lave-verres et lave-vaisselle frontaux', 'Machines à capot', 'Lave-ustensiles', 'Avancement de casiers et tunnels', 'Traitement d’eau et lessiviels'],
    gammes: ['UC Series', 'PT Series', 'UF Series', 'GS 630', 'MT Series'],
    description: [
      "Entreprise familiale de troisième génération, Winterhalter fabrique des machines de lavage depuis 1957 et rien d'autre. Les frontaux UC couvrent le bar et la petite restauration, les machines à capot PT la plonge de restaurant, les séries MT les cuisines centrales.",
      "Nous distribuons aussi leurs détergents et liquides de rinçage, et nos techniciens règlent les doseurs lors de leur passage.",
    ],
    aRetenir: [
      "Le quatrième étage de filtration retient les particules les plus fines — le <b>marc de café</b> en particulier. C'est un argument réel en bar et en brasserie, où c'est lui qui encrasse tout le reste.",
      "La fonction qui bloque le rinçage tant que le surchauffeur n'a pas atteint sa consigne est une <b>sécurité d'hygiène</b> autant qu'une sécurité thermique : sans elle, un rinçage trop froid passe inaperçu.",
      "Le traitement d'eau fait partie de la gamme : osmose, déminéralisation par cartouche, adoucisseur externe. Sur notre eau, c'est ce choix-là qui décide de l'aspect du verre, pas le produit de rinçage.",
    ],
    clients: ['Bars et brasseries', 'Restaurants', 'Hôtels', 'Boulangeries et boucheries', 'Restauration collective'],
    services: ['laverie-restauration', 'installation-mise-en-service', 'contrat-entretien-cuisine-professionnelle'],
    boutique: 'detergents-lave-vaisselle',
    boutiqueTexte: 'Détergents et liquides de rinçage Winterhalter en boutique',
  },
  {
    slug: 'comenda',
    nom: 'Comenda',
    univers: 'laverie',
    agree: true,
    pays: 'Italie',
    depuis: 1963,
    lieu: 'Cassina de’ Pecchi, Milan',
    site: 'https://www.comenda.eu/',
    resume: 'Lavage de la plonge de bar au tunnel de cuisine centrale.',
    accroche:
      "Comenda est la société autour de laquelle s'est construit le groupe Ali, et son terrain de prédilection reste le gros débit : avancement de casiers, tunnels, laveuses de bacs.",
    familles: ['Lave-verres et frontaux', 'Machines à capot', 'Lave-batterie, dont modèles à granulés', 'Avancement de casiers', 'Tunnels à bande'],
    gammes: ['Prime', 'Hi-Line', 'AC2 / AC3 NEXT', 'NE (tunnels)', 'DIVA'],
    description: [
      "Là où beaucoup de constructeurs s'arrêtent à la machine à capot, Comenda continue : avancement automatique de casiers, convoyeurs à bande, laveuses de bacs et de caisses. C'est la marque des cuisines centrales, des hôpitaux et de l'agroalimentaire.",
      "La gamme comprend aussi des lave-batterie à granulés, dans la même logique que les machines que nous équipons déjà en granulés de lavage.",
    ],
    aRetenir: [
      "Sur les tunnels, le <b>débit d'eau de rinçage est asservi à la vitesse de la bande</b> : la machine ne consomme que ce que la charge réelle demande. C'est le marqueur technique de la marque.",
      "Un <b>mode de secours électromécanique à clé</b> permet de maintenir un lavage de base en cas de défaillance de l'automate. Dans une cuisine centrale qui doit servir à midi, cette fonction vaut à elle seule une journée d'exploitation — encore faut-il savoir qu'elle existe.",
      "Le déclinaison énergétique se lit dans le code machine : récupération de chaleur, condenseur de vapeur ou pompe à chaleur ne se commandent pas après coup.",
    ],
    clients: ['Cuisines centrales', 'Hôpitaux et EHPAD', 'Hôtellerie', 'Agroalimentaire'],
    services: ['laverie-restauration', 'conception-cuisine-professionnelle', 'contrat-entretien-cuisine-professionnelle'],
    boutique: 'granules-lave-batterie',
    boutiqueTexte: 'Granulés de lavage pour lave-batterie',
  },
  {
    slug: 'miele-professional',
    nom: 'Miele Professional',
    logo: { fichier: 'miele.png', largeur: 600, hauteur: 230, alt: 'Logo Miele' },
    univers: 'laverie',
    agree: true,
    pays: 'Allemagne',
    depuis: 1899,
    lieu: 'Gütersloh, Rhénanie-du-Nord-Westphalie',
    site: 'https://www.miele-professional.fr/',
    resume: 'Lavage à eau neuve, buanderie et laveurs-désinfecteurs.',
    accroche:
      "Miele Professional est la seule marque de notre catalogue à proposer à la fois le lavage de vaisselle à eau renouvelée, la buanderie et les laveurs-désinfecteurs médicaux.",
    familles: ['Lave-vaisselle à eau neuve', 'Lave-verres et machines à capot', 'Lave-linge et sèche-linge', 'Laveurs-désinfecteurs'],
    gammes: ['ProfiLine PFD 101', 'MasterLine PFD 400 à 407', 'PTD 701 / 703 / 901', 'Benchmark PWM / PDR', 'SmartBiz'],
    description: [
      "Chez Miele, deux principes de lavage cohabitent, et c'est la première chose à comprendre avant de choisir. Les machines PFD travaillent à eau renouvelée à chaque cycle, sans bain permanent : c'est ce qu'on installe en crèche, en EHPAD et en milieu de soins. Les PTD sont des machines à surchauffeur classiques, faites pour le débit du bar et du restaurant.",
      "La buanderie Benchmark couvre les petites laveries d'hôtel, de camping et d'EHPAD.",
    ],
    aRetenir: [
      "<b>PFD ou PTD, ce ne sont pas deux gammes, ce sont deux technologies.</b> Se tromper, c'est installer une machine à bain là où le cahier des charges demandait de l'eau neuve — et l'erreur ne se rattrape pas au réglage.",
      "Le modèle le plus haut de la série PFD propose un programme de <b>désinfection thermique à 93 °C</b>, revendiqué virucide : c'est ce qui le fait retenir en établissement de santé.",
      "Miele s'engage sur la <b>disponibilité des pièces 15 ans après l'arrêt d'une série</b>. Sur un parc de buanderie amorti sur quinze ans, c'est un critère d'achat à part entière.",
    ],
    clients: ['Crèches, EHPAD et établissements de santé', 'Bars et restaurants', 'Hôtels et campings', 'Cabinets dentaires et laboratoires'],
    services: ['laverie-restauration', 'buanderie-professionnelle', 'contrat-entretien-cuisine-professionnelle'],
    // Première marque de matériel vendue en ligne : ses produits sont répartis
    // sur plusieurs collections, d'où un lien vers le catalogue filtré sur la
    // marque plutôt que vers une seule collection.
    boutique: 'lave-linge-professionnels',
    boutiqueTitre: 'Miele Professional en boutique',
    boutiqueTexte: 'Lave-linge, sèche-linge, repasseuses et lave-vaisselle Miele Professional au prix public, livrés, installés et mis en service par nos techniciens — avec les accessoires et les produits ProCare',
    boutiqueUrl: '/eshop/catalogue?marque=Miele+Professional#catalogue',
  },

  // =========================================================================
  // BLANCHISSERIE
  // =========================================================================
  {
    slug: 'girbau',
    nom: 'Girbau',
    univers: 'blanchisserie',
    agree: true,
    pays: 'Espagne',
    depuis: 1920,
    lieu: 'Vic, Catalogne',
    site: 'https://www.girbau.com/fr-fr',
    resume: 'Laveuses, séchoirs et calandres, du camping à la blanchisserie industrielle.',
    accroche:
      "La marque qui permet d'installer une laverie à l'étage ou dans un local existant : les laveuses Genius ne demandent pas de massif béton.",
    familles: ['Laveuses-essoreuses', 'Laveuses à barrière sanitaire', 'Séchoirs', 'Calandres et trains de repassage', 'Tunnels de lavage'],
    gammes: ['Genius GS7009 à GS7032', 'HS6008 à HS6110', 'ED / EDD (séchoirs)', 'PB (calandres)', 'TBS 50'],
    description: [
      "Girbau travaille sur trois marchés distincts : la blanchisserie d'établissement (hôtel, camping, EHPAD), la laverie libre-service et la blanchisserie industrielle. Les origines de la maison remontent à 1920 à Vic, en Catalogne ; l'activité blanchisserie date des années 1960.",
      "La France a été son premier pays d'implantation à l'international, en 1989.",
    ],
    aRetenir: [
      "Suspension flottante et châssis renforcé : <b>pas de massif béton ni de scellement</b>. C'est ce qui permet d'installer une laverie dans un local qui n'avait pas été prévu pour, ou à l'étage — un cas fréquent dans les mas et les hôtels anciens.",
      "Le taux d'humidité résiduelle est donné par vitesse d'essorage : <b>60 % à 450 G contre 92 % à 100 G</b>. C'est avec ce chiffre, et pas avec la capacité de la laveuse, qu'on dimensionne correctement le séchoir derrière.",
      "La commande accepte jusqu'à douze signaux de dosage externe : un raccordement lessiviel multi-produits se prépare au moment de l'installation, pas après.",
    ],
    clients: ['Hôtels et campings', 'EHPAD et hôpitaux', 'Laveries libre-service', 'Blanchisseries industrielles'],
    services: ['buanderie-professionnelle', 'installation-mise-en-service', 'contrat-entretien-cuisine-professionnelle'],
  },
  {
    slug: 'danube',
    nom: 'Danube',
    univers: 'blanchisserie',
    agree: true,
    pays: 'France',
    lieu: 'Lamotte-Beuvron, Loir-et-Cher',
    site: 'https://www.danube-international.com/fr/',
    resume: 'Blanchisserie fabriquée en France, du professionnel à l’industriel.',
    accroche:
      "Des machines de blanchisserie fabriquées en France, dans le Loir-et-Cher — argument qui compte de plus en plus dans les consultations publiques.",
    familles: ['Laveuses-essoreuses', 'Laveuses à barrière sanitaire', 'Séchoirs', 'Repassage et finition', 'Laverie libre-service'],
    gammes: ['WED (haute extraction)', 'WEN', 'CS II (chargement par le dessus)', 'Aquabac', 'Easy Touch 2'],
    description: [
      "Danube fabrique à Lamotte-Beuvron pour l'hôtellerie, les EHPAD, les hôpitaux, les centres équestres et les laveries libre-service, avec une spécialité sur les salles blanches et le lavage sanitaire à barrière.",
      "Le système Aquabac récupère l'eau de rinçage pour la réinjecter au bain suivant — une économie qui se mesure vite sur un gros volume de linge.",
    ],
    aRetenir: [
      "<b>Deux familles qui ne s'installent pas de la même façon</b> : les WED, à haute extraction, sont montées sur silentblocs et se posent librement ; les WEN, à essorage normal, doivent être scellées au sol. Le choix se fait au moment du devis, pas à la livraison.",
      "Les facteurs d'essorage vont de 500 G sur les WED à 150 G sur les WEN. Comme chez Girbau, c'est ce chiffre qui détermine la charge de travail du séchoir.",
      "La société a changé de dénomination sociale en 2025 tout en conservant la marque Danube : si vous commandez une pièce sur un ancien dossier, la raison sociale ne correspondra plus.",
    ],
    clients: ['Hôtels et campings', 'EHPAD et hôpitaux', 'Centres équestres', 'Laveries libre-service', 'Salles blanches'],
    services: ['buanderie-professionnelle', 'installation-mise-en-service', 'depannage-sav-cuisine-professionnelle'],
  },

  // =========================================================================
  // PRÉPARATION
  // =========================================================================
  {
    slug: 'robot-coupe',
    nom: 'Robot Coupe',
    univers: 'preparation',
    agree: true,
    pays: 'France',
    depuis: 1961,
    lieu: 'Montceau-les-Mines, Saône-et-Loire',
    site: 'https://www.robot-coupe.com/',
    resume: 'Cutters, coupe-légumes et mixeurs : la préparation dynamique.',
    accroche:
      "Robot Coupe a inventé le cutter vertical et le combiné. C'est le matériel qui fait gagner des heures en production, et celui qui s'use parce qu'il sert tous les jours.",
    familles: ['Cutters', 'Coupe-légumes', 'Combinés', 'Blixer', 'Mixeurs plongeants', 'Presse-agrumes'],
    gammes: ['R 2 à R 60', 'CL 20 à CL 60', 'R 301 à R 752 (combinés)', 'Blixer 2 à 60', 'MP Ultra'],
    description: [
      "Un combiné R 301 fait le travail de plusieurs personnes sur une mise en place. Les Blixer, eux, répondent à une exigence réglementaire autant que culinaire : la texture modifiée en EHPAD et en établissement de santé.",
      "C'est du matériel français, fabriqué à Montceau-les-Mines, et dont les pièces restent disponibles longtemps.",
    ],
    aRetenir: [
      "<b>Seuls les couteaux lisses s'affûtent</b> ; les couteaux crantés, non. Un passage au fusil après chaque service et un affûtage mensuel à la pierre changent complètement la durée de vie de la lame — et l'affûtage n'est pas couvert par la garantie.",
      "Si la cuve se déverrouille en marche, ce sont généralement les <b>patins de cuve</b> qui sont usés. La sécurité coupe la machine : c'est un symptôme, pas une panne électrique.",
      "Les sécurités mécano-magnétiques ne se shuntent jamais. Un appareil dont la sécurité a été pontée est un appareil que nous refusons de remettre en service.",
    ],
    clients: ['Restaurants et traiteurs', 'Cuisines centrales', 'EHPAD et santé', 'Boucheries-charcuteries', 'Laboratoires de GMS'],
    services: ['materiel-cuisson-professionnel', 'depannage-sav-cuisine-professionnelle', 'contrat-entretien-cuisine-professionnelle'],
  },
  {
    slug: 'orved',
    nom: 'ORVED',
    univers: 'preparation',
    agree: true,
    pays: 'Italie',
    depuis: 1984,
    lieu: 'Musile di Piave, Vénétie',
    site: 'https://www.orved.it/',
    resume: 'Machines sous vide, operculeuses et cuisson sous vide.',
    accroche:
      "Le sous vide a cessé d'être une technique de chef pour devenir un outil de gestion : moins de pertes, des préparations qui tiennent, une production qu'on peut lisser sur la semaine.",
    familles: ['Machines sous vide à cloche', 'Aspiration externe', 'Operculeuses et thermosoudeuses', 'Cuisson sous vide', 'Sacs et barquettes'],
    gammes: ['EVOX 25 / 30 / 31 Hi-line', 'VM 46 / 95H / 98', 'IDEA 41', 'Cuisson', 'SV-Lab Pro'],
    description: [
      "ORVED fabrique en Vénétie depuis 1984 : machines à cloche pour le laboratoire, aspiration externe pour la petite cuisine, operculeuses pour la vente à emporter, et appareils de cuisson sous vide.",
      "La marque fournit aussi les consommables — sacs lisses et gaufrés, y compris des références recyclables et compostables, de plus en plus demandées.",
    ],
    aRetenir: [
      "<b>L'huile de la pompe se vidange toutes les 200 heures de fonctionnement</b>, et avant si elle fonce. C'est l'entretien qui décide de la durée de vie de la machine, et c'est celui qu'on oublie systématiquement.",
      "Une <b>huile laiteuse signale une entrée d'eau</b> dans la pompe : il faut arrêter la machine, pas continuer en se disant que ça passera. À ce stade, une vidange suffit encore ; une semaine plus tard, c'est la pompe.",
      "La barre de soudure est amovible sur la ligne EVOX : son nettoyage quotidien conditionne la qualité de la soudure, donc la tenue du vide.",
    ],
    clients: ['Restauration gastronomique et bistronomique', 'Traiteurs', 'Boucheries et poissonneries', 'Pâtisseries', 'Cuisines centrales en liaison froide'],
    services: ['materiel-cuisson-professionnel', 'depannage-sav-cuisine-professionnelle'],
  },

  // =========================================================================
  // VENTILATION
  // =========================================================================
  {
    slug: 'vim',
    nom: 'VIM',
    univers: 'ventilation',
    agree: true,
    pays: 'France',
    depuis: 1916,
    lieu: 'Soudan, Deux-Sèvres',
    site: 'https://www.vim.fr/fr/',
    resume: 'Ventilation, captation et désenfumage, fabriqués en France.',
    accroche:
      "VIM ventile des galeries de mine depuis 1916. Aujourd'hui, la maison couvre la hotte de cuisine, le caisson d'extraction et le désenfumage avec le même sérieux industriel.",
    familles: ['Hottes de cuisine et plafonds filtrants', 'Caissons et ventilateurs d’extraction', 'Désenfumage', 'Traitement et diffusion d’air'],
    gammes: ['Vorax', 'Novax', 'Vorax ECO', 'Vorax ESP+ et UV', 'Caissons KABB / KABT'],
    description: [
      "La captation de cuisine est une des six familles de VIM, à côté du désenfumage et du traitement d'air. Les caissons double peau tiennent le service continu à haute température, et les gammes de traitement des graisses par précipitation électrostatique ou par UV répondent aux rejets en milieu urbain contraint.",
      "Le fabricant propose un outil de calcul des débits qui évite l'erreur la plus répandue en cuisine : une hotte correctement dimensionnée sur une amenée d'air qui ne l'est pas.",
    ],
    aRetenir: [
      "Au-delà de <b>25 kW de puissance de cuisson installée</b>, la norme impose une amenée d'air mécanique. Une hotte seule, sans compensation, met la cuisine en dépression et fait refouler les appareils gaz.",
      "Les filtres se contrôlent <b>tous les jours</b> et les conduits <b>au moins tous les six mois</b>. Ce n'est pas du confort : un conduit gras est un départ de feu, et c'est le premier point que regarde un contrôle.",
      "Les séparateurs doivent être exclusivement mécaniques et démontables sans outil. Un filtre à média dans une hotte de cuisson professionnelle n'est pas conforme.",
    ],
    clients: ['Restauration commerciale', 'Cuisines de collectivité', 'Hôtellerie', 'Établissements recevant du public'],
    services: ['extraction-ventilation-cuisine', 'conception-cuisine-professionnelle', 'contrat-entretien-cuisine-professionnelle'],
  },
  {
    slug: 'saftair',
    nom: 'SAFTAIR',
    univers: 'ventilation',
    agree: true,
    pays: 'France',
    depuis: 1988,
    lieu: 'Torcy-le-Petit, Seine-Maritime',
    site: 'https://www.saftair.com/',
    resume: 'Hottes et plafonds filtrants sur mesure, désenfumage.',
    accroche:
      "SAFTAIR fabrique en Normandie des hottes standard et sur mesure, des plafonds filtrants — uniquement sur mesure — et des caissons de désenfumage.",
    familles: ['Hottes standard et sur mesure', 'Plafonds filtrants sur mesure', 'Caissons et tourelles de désenfumage', 'Systèmes de télécommande'],
    gammes: ['Hottes de cuisine professionnelle', 'Plafonds filtrants', 'DOF+ (désenfumage)', 'Otabrez (hotte à brumisation)'],
    description: [
      "Le plafond filtrant est la réponse aux cuisines où une hotte classique ne passe pas : hauteur sous plafond limitée, îlot central, contrainte architecturale. SAFTAIR ne le fait que sur mesure, ce qui suppose un relevé sur place — c'est notre travail.",
      "La maison a aussi sorti une hotte à brumisation destinée aux cuissons au feu de bois, qui règle un problème réel sur les fours à bois et les grillades au charbon.",
    ],
    aRetenir: [
      "Le dimensionnement se fait selon la <b>norme NF EN 16282</b>, qui fixe les débits, la construction de la hotte et les périodicités d'entretien. Ce n'est pas une recommandation : c'est le référentiel qu'un contrôleur applique.",
      "Les appareils de cuisson <b>au combustible solide</b> — four à bois, brasero, grillade au charbon — relèvent d'obligations de ramonage spécifiques, renforcées pour les appareils collectifs. Les cuissons gaz et électriques n'y sont pas soumises.",
      "Un plafond filtrant se décide à la conception, pas en fin de chantier : il structure le faux plafond, l'éclairage et l'amenée d'air.",
    ],
    clients: ['Restauration commerciale', 'Cuisines pédagogiques et scolaires', 'Restauration collective', 'ERP pour le désenfumage'],
    services: ['extraction-ventilation-cuisine', 'conception-cuisine-professionnelle', 'installation-mise-en-service'],
  },

  // =========================================================================
  // RÉSIDENTIEL HAUT DE GAMME
  // =========================================================================
  {
    // ⚠️ Gaggenau est de l'électroménager DOMESTIQUE haut de gamme (groupe BSH).
    //    Sa garantie constructeur exclut l'usage commercial : un appareil posé
    //    dans une cuisine de restaurant n'est plus garanti. La page est donc
    //    classée à part, dans l'univers « residentiel », et le dit franchement.
    //    Décision de Mathieu du 28/10/2026, après avoir été alerté sur le point.
    slug: 'gaggenau',
    nom: 'Gaggenau',
    univers: 'residentiel',
    agree: true,
    domestique: true,
    pays: 'Allemagne',
    depuis: 1683,
    lieu: 'Munich — production en Allemagne, en Alsace et en Espagne',
    site: 'https://www.gaggenau.com/',
    resume: 'Électroménager domestique haut de gamme, pour cuisines privées.',
    accroche:
      "Gaggenau n'est pas du matériel de production : c'est de l'électroménager domestique haut de gamme, pour les mas, les villas et les suites. Nous le posons là où il a sa place, et nulle part ailleurs.",
    familles: ['Fours et fours vapeur combinés', 'Tables de cuisson et induction', 'Froid et caves à vin', 'Hottes', 'Tiroirs sous vide et chauffants'],
    gammes: ['Série 400', 'Série 200', 'Vario', 'Vario cooling'],
    description: [
      "Les Alpilles, la Camargue et le pays d'Arles comptent beaucoup de mas restaurés, de villas et de maisons d'hôtes dont la cuisine demande un niveau de finition que le matériel professionnel ne cherche pas à atteindre. C'est le terrain de Gaggenau, et notre savoir-faire d'installateur s'y applique directement : encastrement, raccordements, extraction, mise en service.",
      "Nous intervenons aussi sur les parties privatives d'établissements hôteliers : suites avec cuisine, appartements avec services, logements de fonction.",
    ],
    aRetenir: [
      "<b>La garantie constructeur exclut l'usage commercial.</b> Installer un four Gaggenau dans une cuisine de restaurant, c'est perdre la garantie de l'appareil. Nous ne le proposerons jamais pour une cuisine de production — pour cela, il y a RATIONAL, UNOX, MKN et les autres.",
      "Le SAV relève du réseau agréé du constructeur : nous vous orientons vers le bon interlocuteur plutôt que d'intervenir sur un appareil dont l'ouverture ferait tomber votre garantie.",
      "Pour une cuisine de mas ou de villa, c'est en revanche le bon choix, et nous savons l'installer.",
    ],
    clients: ['Mas et villas', 'Maisons d’hôtes', 'Suites et appartements d’hôtel', 'Cuisines de démonstration'],
    services: ['conception-cuisine-professionnelle', 'installation-mise-en-service'],
  },
];

// ---------------------------------------------------------------------------
// QUESTIONS FRÉQUENTES, PAR MARQUE
//
// ⚠️  CE QUE CES FAQ APPORTENT, ET CE QU'ELLES N'APPORTENT PLUS
//     Google a supprimé les résultats enrichis FAQ pour les sites ordinaires :
//     le balisage FAQPage ne fait plus apparaître de liste dépliante dans les
//     résultats de recherche, et seuls quelques sites publics et de santé en
//     bénéficient encore. Ces FAQ ne sont donc PAS un gadget à rich snippet.
//     Elles sont là pour deux raisons qui tiennent toujours :
//       — le visiteur qui hésite trouve la réponse sans décrocher le téléphone,
//         et celui qui décroche appelle avec une meilleure question ;
//       — ce sont des réponses précises à des questions longues, exactement ce
//         que reprennent les réponses générées par IA et les recherches
//         conversationnelles, qui pèsent de plus en plus.
//
//     Le balisage est conservé par cohérence avec les pages service et zone du
//     site, pas en espérant un affichage enrichi.
//
// ⚠️  CHAQUE RÉPONSE DOIT ÊTRE VRAIE ET VÉRIFIABLE. Elles sont écrites à partir
//     de la documentation constructeur relevée le 28/10/2026 (voir les sources
//     en fin de fichier) et de la réglementation citée. Aucune réponse
//     n'invente un délai, une statistique de panne ou une promesse
//     d'intervention : ce qui n'est pas tenable n'est pas écrit.
// ---------------------------------------------------------------------------

export const faqMarques = {
  rational: [
    {
      q: 'Puis-je utiliser des pastilles génériques dans mon four RATIONAL ?',
      r: `<p>Non, et ce n'est pas une question de commerce. Le cycle de nettoyage automatique est calibré pour les pastilles du constructeur, et l'appareil en attend <b>deux types différents</b> : le nettoyant, qui va dans le tamis de la bonde de sol, et l'anti-calcaire, qui va dans le tiroir Care. Un produit générique provoque un excès de mousse, déclenche des alarmes et laisse le générateur de vapeur s'entartrer sans que rien ne le signale.</p>
<p>Nous tenons les deux références en stock à Saint-Martin-de-Crau et nous les livrons sur notre zone.</p>`,
    },
    {
      q: 'Mon four affiche un statut Care orange : est-ce une panne ?',
      r: `<p>Non. Le statut Care est l'indicateur d'entartrage du générateur de vapeur, distinct de l'indicateur de propreté de l'enceinte. Orange signifie qu'il faut lancer le cycle d'entretien ou remplacer la cartouche.</p>
<p>En revanche, s'il repasse à l'orange peu de temps après, le problème n'est pas dans le four : c'est votre eau. Appelez-nous, nous mesurons la dureté — c'est gratuit — et nous vous disons s'il faut un adoucisseur ou un osmoseur.</p>`,
    },
    {
      q: 'Faut-il un adoucisseur sur un iCombi ?',
      r: `<p>Sur l'eau des Bouches-du-Rhône, du Gard et du Vaucluse, c'est presque toujours oui. Le calcaire se dépose dans le générateur de vapeur, la montée en température se dégrade, et la réparation coûte bien plus cher que le traitement.</p>
<p>Un point que beaucoup d'installateurs oublient : quand l'appareil est raccordé sur une eau adoucie, un <b>paramètre doit être positionné à la mise en service</b>. Mal réglé, il fausse tout le cycle d'entretien. Nous le vérifions systématiquement.</p>`,
    },
    {
      q: 'iCombi Pro ou iCombi Classic ?',
      r: `<p>Même construction, même qualité : la différence est le pilotage. Le Pro conduit la cuisson lui-même et rattrape les écarts — intéressant quand l'équipe tourne ou que plusieurs personnes utilisent le four. Le Classic laisse la main au cuisinier, et convient aux cuisines où c'est toujours la même personne qui pilote.</p>
<p>Le Pro coûte plus cher à l'achat. Il se justifie par la régularité, pas par la performance de cuisson.</p>`,
    },
  ],

  unox: [
    {
      q: 'Le traitement d’eau est-il vraiment obligatoire sur un four UNOX ?',
      r: `<p>UNOX est le constructeur le plus explicite sur ce point : le circuit vapeur demande une dureté inférieure à <b>8 °dH</b> et moins de <b>25 ppm de chlorures</b>. Une eau non conforme est un motif documenté de refus de garantie — ce n'est pas une recommandation d'usage, c'est une condition.</p>
<p>Le constructeur <b>interdit par ailleurs les systèmes à polyphosphates</b> et préconise la résine échangeuse d'ions ou l'osmose inverse. C'est pour cette raison que nous mesurons votre eau <b>avant</b> de chiffrer le four, pas après l'avoir installé.</p>`,
    },
    {
      q: 'Comment identifier mon modèle sans me déplacer ?',
      r: `<p>La référence se lit directement. Sur un <b>XEVC-0621</b>, XEVC désigne un CHEFTOP électrique, <b>06</b> le nombre de niveaux et <b>21</b> le format gastronorme. Relevez la plaque signalétique et donnez-nous la ligne complète au téléphone : cela suffit à identifier la pièce dans la plupart des cas.</p>`,
    },
    {
      q: 'CHEFTOP ou BAKERTOP ?',
      r: `<p>CHEFTOP pour la restauration, BAKERTOP et BAKERLUX pour la boulangerie, la pâtisserie et le snacking. Ce ne sont pas deux finitions du même four : les formats de plaques et les cycles diffèrent. Un terminal de cuisson équipé d'un four de restauration travaillera mal, et inversement.</p>`,
    },
    {
      q: 'Quelle alimentation électrique prévoir ?',
      r: `<p>Un four mixte six niveaux consomme de l'ordre de vingt kilowatts en triphasé : ce n'est pas un appareil qu'on branche sur une prise existante. L'alimentation et la protection se vérifient <b>avant</b> la commande — c'est la première chose que nous regardons lors du relevé sur place, avec l'eau et l'évacuation.</p>`,
    },
  ],

  mkn: [
    {
      q: 'Le SpaceCombi tient-il dans une petite cuisine ?',
      r: `<p>C'est sa raison d'être : <b>55 cm de large</b>. Et la version Magic Team intègre une hotte, ce qui permet de l'installer là où aucune extraction n'était prévue — sous réserve de ce qu'autorise la réglementation de votre local, point que nous vérifions au relevé.</p>`,
    },
    {
      q: 'Puis-je garder mes grilles gastronorme ?',
      r: `<p>Non. Les grilles FlexiRack mesurent <b>530 × 570 mm</b> et se chargent en travers : ce n'est pas un format gastronorme standard. Les accessoires d'un four concurrent ne s'y adaptent pas, et il faut en tenir compte dans le budget de remplacement.</p>`,
    },
    {
      q: 'Quel consommable pour le nettoyage ?',
      r: `<p>Une <b>cartouche unique</b>, qui réunit le détergent et le rinçage. Pas de bidons séparés à gérer, un seul article à tenir en stock.</p>
<p>À noter : la sauteuse FlexiChef, elle, se nettoie <b>sans produit chimique</b>. Il n'y a aucun consommable lessiviel sur cet appareil.</p>`,
    },
  ],

  'angelo-po': [
    {
      q: 'Mon four Angelo Po a-t-il le lavage automatique ?',
      r: `<p>Cela dépend du modèle, et cela se lit sur la référence : le <b>suffixe W</b> indique la présence du doseur de lavage automatique. Sans ce suffixe, l'appareil n'a pas le doseur, et aucun réglage ne permet d'ajouter la fonction après coup.</p>
<p>Relevez la plaque signalétique avant de nous appeler, c'est le plus rapide.</p>`,
    },
    {
      q: 'Pourquoi deux familles de fours mixtes au catalogue ?',
      r: `<p>ACT.O et TAST.O coexistent : les codes commencent respectivement par <b>AT</b> et par <b>AX</b>. Ils ne partagent ni les mêmes pièces ni les mêmes kits de superposition. C'est le piège classique en commande de pièces détachées — le code exact prime toujours sur le nom de gamme.</p>`,
    },
    {
      q: 'Peut-on équiper une cuisine entière chez un seul fabricant ?',
      r: `<p>C'est précisément l'intérêt d'Angelo Po : cuisson, froid, lavage et distribution sous une même marque. Pour une cuisine centrale ou un marché public en lot unique, cela veut dire un interlocuteur, une documentation technique cohérente et un réseau de pièces unique.</p>`,
    },
  ],

  capic: [
    {
      q: 'Quel délai pour un piano sur mesure ?',
      r: `<p>C'est une fabrication, pas un produit en stock : le délai dépend de la configuration et se confirme à la commande, une fois le plan validé. Nous ne vous annoncerons pas un délai avant d'avoir celui de l'usine — un chantier calé sur une date approximative coûte plus cher qu'un chantier calé deux semaines plus tard.</p>`,
    },
    {
      q: 'Puis-je faire modifier ou compléter un piano existant ?',
      r: `<p>Oui, à condition de disposer du plan d'exécution d'origine. Chaque appareil étant une fabrication spéciale, il s'identifie par son <b>numéro d'affaire</b> et non par une référence catalogue.</p>
<p>Conservez le dossier remis à la livraison : c'est lui qui permettra de commander une pièce de carrosserie ou un dessus dix ans plus tard.</p>`,
    },
    {
      q: 'Pourquoi est-ce plus cher qu’un fourneau de catalogue ?',
      r: `<p>Parce que ce n'en est pas un. Dessus en inox de 3 mm, cuves soudées au plan de travail plutôt qu'emboîtées, parties salissantes démontables, fabrication française labellisée Entreprise du Patrimoine Vivant. Sur une cuisine qui produit tous les jours pendant vingt ans, l'écart se rattrape ; sur un établissement saisonnier, il ne se rattrape pas, et nous vous le dirons.</p>`,
    },
  ],

  'ambassade-de-bourgogne': [
    {
      q: 'Est-ce compatible avec ma ligne de cuisson existante ?',
      r: `<p>C'est le premier point à vérifier. La profondeur standard est de <b>650 mm</b>, et non 700 ou 900 comme les lignes classiques. Remplacer un module dans une batterie existante suppose donc de contrôler l'alignement, le plan de travail et les raccordements avant de commander.</p>`,
    },
    {
      q: 'Gaz ou induction ?',
      r: `<p>Les deux existent dans la gamme, mais l'écart de prix est important — l'induction peut représenter près de trois fois le tarif d'un fourneau gaz équivalent. Le choix se fait surtout sur l'usage : l'induction gagne en confort thermique et en nettoyage, le gaz reste plus souple sur les cuissons à la flamme.</p>`,
    },
    {
      q: 'Qui fabrique réellement cette marque ?',
      r: `<p>La Société Industrielle de Lacanche, en Côte-d'Or — le même industriel que les fourneaux Lacanche. Son laboratoire gaz est agréé en France pour la certification des appareils gaz professionnels, ce qui est rare pour une entreprise de cette taille.</p>`,
    },
  ],

  infrico: [
    {
      q: 'Dois-je faire contrôler l’étanchéité de mon armoire tous les ans ?',
      r: `<p>Pour les matériels au <b>R290</b>, qui représentent l'essentiel de la gamme actuelle : non. Le R290 est un hydrocarbure, hors du champ du règlement européen sur les gaz fluorés — donc pas de contrôle d'étanchéité périodique ni de déclaration à ce titre.</p>
<p>En revanche, si votre parc comporte encore des appareils au R404A ou au R134a, ceux-là y sont soumis, avec une périodicité qui dépend de la charge. Nous faisons le point lors de l'audit de parc, qui est gratuit.</p>`,
    },
    {
      q: 'Le froid médical, qu’est-ce que ça change ?',
      r: `<p>Tout, en réalité. Une armoire à vaccins ou à réactifs n'est pas une armoire alimentaire repeinte : la régulation est plus fine, et surtout la <b>traçabilité de température</b> doit pouvoir être produite en cas de contrôle. C'est une ligne que nous traitons séparément, avec ses propres exigences.</p>`,
    },
    {
      q: 'Les armoires de maturation, c’est pour qui ?',
      r: `<p>Pour les bouchers et les restaurateurs qui veulent maîtriser eux-mêmes la maturation de leurs viandes, et en faire un argument de carte. Cela suppose de la place, de la rigueur et un plan de maîtrise sanitaire qui tient : nous en parlons avant de chiffrer.</p>`,
    },
  ],

  foster: [
    {
      q: 'Mon armoire perd du froid l’été : est-elle en panne ?',
      r: `<p>Pas forcément. Regardez la <b>classe climatique</b> sur la plaque signalétique. Un matériel de classe 4 est conçu pour une ambiance de 30 °C ; dans une arrière-cuisine provençale qui monte à 38 ou 40 °C en août, il travaille hors de ses conditions et perd en performance sans être défaillant.</p>
<p>La gamme EcoPro G3 est donnée en <b>classe 5</b>, soit jusqu'à 40 °C d'ambiance. C'est exactement pour cette raison que nous la proposons ici.</p>`,
    },
    {
      q: 'Le R290 est inflammable : est-ce risqué dans une cuisine ?',
      r: `<p>Non, à l'usage : la charge embarquée est faible et strictement limitée par la conception. Cela change surtout les conditions d'<b>intervention</b> — c'est un travail de frigoriste formé, pas de bricolage, et cela exclut certaines réparations improvisées.</p>
<p>En contrepartie, ces appareils sortent du champ du règlement sur les gaz fluorés : pas de contrôle d'étanchéité périodique à ce titre.</p>`,
    },
    {
      q: 'Pourquoi la porte doit-elle se refermer seule ?',
      r: `<p>Parce qu'une porte restée entrouverte quelques minutes à chaque service, c'est de la consommation, de la condensation et, à terme, de la glace sur l'évaporateur. Les portes sont autofermantes avec un point dur à 90° : si la vôtre ne revient plus, c'est un réglage de charnière, pas une fatalité.</p>`,
    },
  ],

  atosa: [
    {
      q: 'Quelle différence entre les séries MBF et ICE ?',
      r: `<p>L'inox, et ce n'est pas un détail. Les séries <b>MBF sont en AISI 304</b>, les séries <b>ICE en AISI 430</b>. L'inox 430 ne tient pas la corrosion de la même façon : à éviter en bord de mer, en zone de lavage et partout où l'on travaille au chlore.</p>
<p>L'écart de prix entre les deux séries est réel, et il correspond à quelque chose. Nous vous dirons laquelle convient à votre local plutôt que de vous vendre la moins chère.</p>`,
    },
    {
      q: 'Est-ce du matériel fiable pour un usage intensif ?',
      r: `<p>C'est du matériel positionné en entrée et milieu de gamme, et nous le présentons comme tel. Il a toute sa place pour une ouverture, un remplacement d'urgence, une saison ou un food-truck. Pour une cuisine qui tourne douze heures par jour toute l'année, nous vous orienterons vers une autre marque.</p>
<p>La garantie étendue jusqu'à cinq ans pièces et main-d'œuvre change néanmoins le calcul sur ce segment.</p>`,
    },
    {
      q: 'Trouverez-vous les pièces dans trois ans ?',
      r: `<p>C'est la bonne question à poser sur toute marque d'import, et c'est notre critère numéro un avant de référencer un matériel que nous devrons entretenir. Nous vérifions la disponibilité réelle des pièces avant de vous proposer un appareil — pas après.</p>`,
    },
  ],

  winterhalter: [
    {
      q: 'Mes verres sortent voilés malgré un bon produit : d’où ça vient ?',
      r: `<p>Neuf fois sur dix, de l'eau. Des traces blanches qui reviennent sur une machine correctement réglée signalent une eau trop dure ou trop chargée en minéraux dissous — pas un mauvais liquide de rinçage. Augmenter la dose ne corrige rien et coûte cher.</p>
<p>C'est le <b>traitement d'eau</b> qu'il faut revoir : adoucisseur, cartouche de déminéralisation ou osmose selon le cas. Nous mesurons votre eau gratuitement avant de vous proposer quoi que ce soit.</p>`,
    },
    {
      q: 'Quelle machine pour un bar ?',
      r: `<p>Un lave-verres frontal de la série UC, dans la taille adaptée à votre débit. Un point à connaître : le quatrième étage de filtration retient les particules les plus fines, et notamment le <b>marc de café</b> — c'est lui qui encrasse tout le reste dans un bar, et c'est un argument réel plutôt qu'un détail de brochure.</p>`,
    },
    {
      q: 'Puis-je utiliser un autre détergent que celui de la marque ?',
      r: `<p>Techniquement oui, mais vous perdez la cohérence du système : la machine, le traitement d'eau et le produit sont conçus ensemble, et le dosage est réglé en fonction de votre eau. Nous distribuons les produits Winterhalter et nos techniciens réajustent les doseurs à chaque passage — c'est inclus dans le contrat d'entretien.</p>`,
    },
  ],

  comenda: [
    {
      q: 'L’automate de mon tunnel est en panne : faut-il arrêter le service ?',
      r: `<p>Pas nécessairement. Les machines disposent d'un <b>mode de secours électromécanique à clé</b> qui maintient un lavage de base même quand l'automate ne répond plus. Dans une cuisine centrale qui doit servir à midi, cette fonction vaut une journée d'exploitation — encore faut-il savoir qu'elle existe et où se trouve la clé.</p>
<p>Appelez-nous : nous vous guidons au téléphone, puis nous venons.</p>`,
    },
    {
      q: 'Avancement de casiers ou tunnel à bande ?',
      r: `<p>C'est le volume qui tranche, et surtout sa régularité. L'avancement de casiers convient à une plonge qui travaille par à-coups ; le tunnel à bande se justifie quand le flux est continu. Sur les tunnels, le débit d'eau de rinçage est asservi à la vitesse de bande : la machine ne consomme que ce que la charge demande réellement.</p>`,
    },
    {
      q: 'Comenda fait-il des lave-batterie à granulés ?',
      r: `<p>Oui, et nous fournissons les granulés. C'est le même principe que les machines que nous équipons déjà : des billes projetées contre les bacs remplacent le trempage de la veille. Les granulés s'usent en s'arrondissant, sans qu'aucune alarme ne se déclenche — c'est un des points que nos techniciens contrôlent en visite d'entretien.</p>`,
    },
  ],

  'miele-professional': [
    {
      q: 'PFD ou PTD : quelle différence ?',
      r: `<p>Ce ne sont pas deux gammes, ce sont <b>deux technologies de lavage</b>, et c'est la première chose à trancher.</p>
<ul>
<li>Les <b>PFD</b> travaillent à <b>eau renouvelée à chaque cycle</b>, sans bain permanent. C'est ce qu'on installe en crèche, en EHPAD et en milieu de soins.</li>
<li>Les <b>PTD</b> sont des machines à surchauffeur avec bain de lavage, faites pour le débit du bar et du restaurant.</li>
</ul>
<p>Se tromper, c'est installer une machine à bain là où le cahier des charges demandait de l'eau neuve. L'erreur ne se rattrape pas au réglage.</p>`,
    },
    {
      q: 'Trouverai-je encore des pièces dans dix ans ?',
      r: `<p>Miele s'engage sur la disponibilité des pièces <b>quinze ans après l'arrêt d'une série</b>. Sur un parc de buanderie amorti sur quinze ans, ce n'est pas un argument de confort : c'est un critère d'achat à part entière, et il explique une partie de l'écart de prix à l'achat.</p>`,
    },
    {
      q: 'Qu’est-ce que la désinfection thermique à 93 °C ?',
      r: `<p>Un programme disponible sur le modèle le plus haut de la série PFD, revendiqué virucide par le constructeur. C'est lui qui fait retenir cette machine en établissement de santé, là où un lavage à 60 °C ne suffit pas au protocole.</p>`,
    },
  ],

  girbau: [
    {
      q: 'Faut-il couler un massif béton pour installer une laveuse ?',
      r: `<p>Pas sur la gamme Genius : suspension flottante et châssis renforcé, <b>pas de scellement ni de massif</b>. C'est ce qui permet d'installer une laverie dans un local qui n'avait pas été prévu pour, ou à l'étage — un cas fréquent dans les mas et les hôtels anciens de la région.</p>
<p>Cela ne dispense pas du relevé : plancher, évacuation, électricité et accès restent à vérifier.</p>`,
    },
    {
      q: 'Comment dimensionner le séchoir derrière la laveuse ?',
      r: `<p>Pas à partir de la capacité de la laveuse, mais à partir du <b>taux d'humidité résiduelle</b> après essorage. Le constructeur le donne par vitesse : de l'ordre de 60 % à 450 G, contre 92 % à 100 G. Entre les deux, le temps de séchage — et la facture d'énergie — n'ont rien à voir.</p>
<p>C'est le calcul que nous faisons avant de vous proposer un ensemble.</p>`,
    },
    {
      q: 'Puis-je raccorder plusieurs lessiviels ?',
      r: `<p>Oui, la commande accepte jusqu'à douze signaux de dosage externe. Mais cela se prépare au moment de l'installation : y revenir après coup suppose de rouvrir la machine et de reprendre le câblage.</p>`,
    },
  ],

  danube: [
    {
      q: 'WED ou WEN : laquelle choisir ?',
      r: `<p>La question n'est pas le prix, c'est l'installation. Les <b>WED</b>, à haute extraction, sont montées sur silentblocs et se posent librement. Les <b>WEN</b>, à essorage normal, doivent être <b>scellées au sol</b>.</p>
<p>Si votre local ne permet pas le scellement, ou si la machine va à l'étage, le choix est fait d'avance. Cela se décide au devis, pas à la livraison.</p>`,
    },
    {
      q: 'Est-ce vraiment fabriqué en France ?',
      r: `<p>Oui, à Lamotte-Beuvron dans le Loir-et-Cher. C'est un argument qui compte de plus en plus dans les consultations publiques, et il est vérifiable.</p>
<p>À savoir : la société a changé de dénomination en 2025 tout en conservant la marque Danube. Si vous commandez une pièce sur un ancien dossier, la raison sociale ne correspondra plus — ce n'est pas une erreur.</p>`,
    },
    {
      q: 'Comment réduire la consommation d’eau d’une blanchisserie ?',
      r: `<p>Le levier le plus direct est la récupération : le système Aquabac stocke l'eau de rinçage pour la réinjecter au bain suivant. Sur un gros volume de linge, l'économie se mesure vite. Les automates ajustent par ailleurs l'eau et la lessive à la charge réellement introduite.</p>`,
    },
  ],

  'robot-coupe': [
    {
      q: 'Mes couteaux ne coupent plus : faut-il les remplacer ?',
      r: `<p>Pas forcément. <b>Les couteaux lisses s'affûtent</b> — un passage au fusil après chaque service, surtout après du persil, et un affûtage mensuel à la pierre changent complètement leur durée de vie. <b>Les couteaux crantés, eux, ne s'affûtent pas</b> et se remplacent.</p>
<p>À noter : l'usure normale des couteaux et la main-d'œuvre d'affûtage ne sont pas couvertes par la garantie.</p>`,
    },
    {
      q: 'La cuve se déverrouille en cours de marche, est-ce grave ?',
      r: `<p>Ce sont généralement les <b>patins de cuve</b> qui sont usés. La sécurité coupe alors la machine : ce que vous voyez est un symptôme, pas une panne électrique. La pièce se remplace, et c'est un entretien courant.</p>`,
    },
    {
      q: 'La machine s’arrête toute seule en pleine production.',
      r: `<p>La protection thermique coupe l'appareil après une surcharge ou un usage prolongé. Laissez-le refroidir avant de relancer. Si cela se reproduit systématiquement, c'est que l'appareil est sous-dimensionné pour le volume traité — mieux vaut en parler que de le forcer.</p>
<p>Dans tous les cas, une sécurité ne se shunte jamais : un appareil dont le verrouillage a été ponté est un appareil que nous refusons de remettre en service.</p>`,
    },
  ],

  orved: [
    {
      q: 'À quelle fréquence vidanger l’huile de la pompe ?',
      r: `<p><b>Toutes les 200 heures de fonctionnement</b>, et avant si l'huile fonce. C'est l'entretien qui décide de la durée de vie de la machine, et c'est celui qu'on oublie le plus souvent — jusqu'au jour où la pompe lâche.</p>
<p>Le contrôle visuel se fait sur le voyant : l'huile doit rester claire et dorée.</p>`,
    },
    {
      q: 'Mon huile est devenue laiteuse, que faire ?',
      r: `<p>Arrêter la machine. Une huile laiteuse signale une <b>entrée d'eau</b> dans la pompe. À ce stade, une vidange suffit encore ; en continuant à travailler, c'est la pompe entière qu'il faudra remplacer une semaine plus tard.</p>`,
    },
    {
      q: 'Machine à cloche ou aspiration externe ?',
      r: `<p>La cloche pour le laboratoire et la production régulière : vide plus poussé, soudure plus fiable, cadence tenue. L'aspiration externe pour un usage occasionnel ou des volumes irréguliers, avec un investissement bien moindre.</p>
<p>Si vous conditionnez tous les jours, la cloche se rentabilise sur les sacs et sur la tenue des produits.</p>`,
    },
  ],

  vim: [
    {
      q: 'Faut-il une amenée d’air en plus de la hotte ?',
      r: `<p>Au-delà de <b>25 kW de puissance de cuisson installée</b>, la norme impose une amenée d'air mécanique. Et c'est du bon sens autant que de la réglementation : une hotte seule, sans compensation, met la cuisine en dépression, fait refouler les appareils gaz et aspire l'air de la salle.</p>
<p>C'est l'erreur la plus répandue que nous rencontrons sur les installations existantes.</p>`,
    },
    {
      q: 'À quelle fréquence nettoyer filtres et conduits ?',
      r: `<p>Les filtres et les composants de la hotte se vérifient <b>tous les jours</b> ; les conduits et les entrées et sorties d'air, <b>au moins tous les six mois</b>. Ce n'est pas du confort : un conduit gras est un départ de feu, et c'est le premier point que regarde un contrôle.</p>`,
    },
    {
      q: 'Puis-je mettre un filtre à média dans ma hotte ?',
      r: `<p>Non. Les séparateurs doivent être exclusivement <b>mécaniques et démontables sans outil</b> ; les filtres à média sont exclus en cuisson professionnelle. Un filtre non conforme se voit immédiatement en contrôle, et il change le comportement de la hotte au feu.</p>`,
    },
  ],

  saftair: [
    {
      q: 'Hotte classique ou plafond filtrant ?',
      r: `<p>Le plafond filtrant répond aux cas où une hotte ne passe pas : hauteur sous plafond limitée, îlot central, contrainte architecturale ou patrimoniale — fréquent dans les bâtis anciens d'Arles et des Alpilles.</p>
<p>Il se décide <b>à la conception</b>, pas en fin de chantier : il structure le faux plafond, l'éclairage et l'amenée d'air. Et il est toujours sur mesure, donc précédé d'un relevé sur place.</p>`,
    },
    {
      q: 'J’ai un four à bois : quelles obligations en plus ?',
      r: `<p>Les appareils de cuisson <b>au combustible solide</b> — four à bois, brasero, grillade au charbon — relèvent d'obligations d'entretien et de ramonage spécifiques, renforcées pour les appareils collectifs, avec une attestation à conserver.</p>
<p>Les cuissons au gaz et à l'électricité n'y sont pas soumises. Si vous avez les deux, c'est le conduit du bois qui commande.</p>`,
    },
    {
      q: 'Comment se passe une hotte sur mesure ?',
      r: `<p>Par un relevé sur place : dimensions, puissance installée, position des appareils, contraintes du local et chemin d'extraction. Le dimensionnement suit la norme NF EN 16282, qui fixe les débits et la construction. Ensuite seulement vient le chiffrage.</p>`,
    },
  ],

  gaggenau: [
    {
      q: 'Puis-je installer du Gaggenau dans la cuisine de mon restaurant ?',
      r: `<p>Non, et nous ne vous le proposerons pas. <b>La garantie constructeur exclut l'usage commercial</b> : un appareil posé dans une cuisine de production n'est plus garanti, et il n'est de toute façon pas conçu pour ces cadences.</p>
<p>Pour une cuisine professionnelle, il y a RATIONAL, UNOX, MKN et les autres marques de notre catalogue. C'est dans votre intérêt, pas dans le nôtre.</p>`,
    },
    {
      q: 'Qui assure le service après-vente ?',
      r: `<p>Le réseau agréé du constructeur. Nous vous orientons vers le bon interlocuteur plutôt que d'ouvrir un appareil dont l'intervention ferait tomber votre garantie. C'est une limite que nous assumons : mieux vaut le dire avant la vente qu'après la panne.</p>`,
    },
    {
      q: 'Et pour une suite d’hôtel ou une maison d’hôtes ?',
      r: `<p>C'est un usage privatif, pas une cuisine de production : Gaggenau y a toute sa place, et notre savoir-faire d'installateur s'y applique directement — encastrement, raccordements, extraction, mise en service.</p>
<p>C'est un cas fréquent dans les mas et villas des Alpilles, et c'est pour cela que nous proposons cette marque.</p>`,
    },
  ],
};

/** Les questions d'une marque, ou un tableau vide. */
export const faqDe = (slug) => faqMarques[slug] || [];

// ---------------------------------------------------------------------------
// Aides
// ---------------------------------------------------------------------------
export const marquesNav = marques.map((m) => ({ nom: m.nom, url: `/marques/${m.slug}` }));
export const marquesDeLUnivers = (slug) => marques.filter((m) => m.univers === slug);
export const totalMarques = marques.length;

// Les marques mises en avant dans le pied de page : celles sur lesquelles nous
// recevons le plus de demandes. Liste volontairement courte — un pied de page
// qui liste dix-neuf marques n'en met aucune en valeur.
export const marquesPied = ['rational', 'winterhalter', 'unox', 'infrico', 'robot-coupe']
  .map((s) => marques.find((m) => m.slug === s))
  .filter(Boolean);

// ---------------------------------------------------------------------------
// SOURCES ET POINTS NON TRANCHÉS — à reprendre avant toute modification
//
// Tous les faits du champ `aRetenir` proviennent de la documentation des
// constructeurs (notices, fiches techniques, catalogues) consultée le
// 28/10/2026, ou de la norme et de la réglementation citées. Ce qui n'a pas pu
// être vérifié n'a pas été écrit.
//
//  • ATOSA — le site français annonce quatre sites en France, au Royaume-Uni,
//    en Allemagne et en Italie, sans préciser le lieu de fabrication. La presse
//    professionnelle britannique décrit une fabrication asiatique. Aucun pays
//    d'origine n'est donc affirmé sur la page : on écrit ce que le fabricant
//    publie, rien de plus. Ne pas reprendre la mention « fabriqué en Europe »
//    qui circule chez certains distributeurs : elle n'est corroborée nulle part.
//
//  • DANUBE — la société s'appelle ONNERA LAUNDRY FRANCE depuis juin 2025 ; la
//    marque commerciale reste Danube. Vérifier l'incidence sur les références
//    de pièces détachées avant de s'engager sur un délai.
//
//  • GIRBAU — la maison communique sur 1920 (atelier d'origine à Vic) ; d'autres
//    sources retiennent 1960 (virage blanchisserie). La page retient 1920 en
//    précisant que l'activité blanchisserie date des années 1960.
//
//  • VIM — la documentation « cuisines professionnelles » consultée date de
//    2015. Les noms de gammes cités sont donc à reconfirmer sur le catalogue en
//    cours avant d'en faire un argument de devis.
//
//  • SAFTAIR — le site bloque l'indexation : les noms des gammes de hottes
//    standard et de plafonds filtrants n'ont pas pu être relevés. La page reste
//    volontairement générique sur ce point.
//
//  • MKN — le site du constructeur affiche des âges incohérents selon les
//    pages. La date retenue est 1946, qui est la date de fondation documentée.
//
//  • ANGELO PO — ACT.O et TAST.O coexistent au catalogue. Confirmer auprès du
//    distributeur France laquelle est en cours de commercialisation avant de
//    chiffrer.
//
//  • AMBASSADE DE BOURGOGNE — l'année de création de la marque elle-même n'a
//    pas pu être établie (les dates disponibles concernent le site de Lacanche).
//    Le champ `depuis` est donc volontairement absent.
//
//  • PANNES FRÉQUENTES — aucune marque ne publie de statistiques de panne. Le
//    jour où l'on voudra en parler, la source sera le journal d'intervention
//    SODILAME : c'est la seule donnée réelle dont nous disposions, et elle vaut
//    mieux que celle de n'importe quel concurrent.
// ---------------------------------------------------------------------------
