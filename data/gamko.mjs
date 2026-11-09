// ---------------------------------------------------------------------------
// GAMKO — sélection « 20/80 » de la boutique : froid de bar
//
// Même méthode que les autres marques. Ce fichier est écrit à la main : il
// choisit les modèles, les regroupe en fiches et porte les textes. Le PRIX
// vient du tarif GAMKO 2026, lu dans `gamko-tarif.mjs`, généré par :
//
//     node outils/gamko-tarif.mjs <1_Import_Produits_GAMKO_2026_creation.csv>
//
// Photos et documents (fiche technique, étiquette énergie) : site public
// gamko.com (`gamko-visuels.mjs`, généré par outils/gamko-visuels.py). Gamko
// appartient au groupe ITW, comme Foster : même site, même médiathèque.
//
// ⚠️  PRIX AFFICHÉ = PRIX PUBLIC GAMKO, HT (tarif 2026 V1), choix de la
//     direction. Le prix d'achat SODILAME n'est JAMAIS lu par le générateur et
//     ne doit jamais apparaître dans ce dépôt. L'éco-participation, facturée
//     en plus, est affichée sous le prix, comme pour ITV.
//
// ⚠️  SÉLECTION de la direction (09/11/2026) : refroidisseurs de bouteilles
//     E3 (groupe logé) et GM Line, vitrines à boissons Maxiglass, givreurs de
//     verres GF, mini-refroidisseurs, postes cocktail Flexbar. HORS SÉLECTION :
//     E3 sans groupe (groupe à distance), modules Flexbar sur mesure,
//     refroidisseurs de fûts et de poubelles, machines à glaçons Gamko (la
//     boutique propose ITV). Le reste du tarif est sur devis.
//
// Forfaits (grille du froid) : arrière-bars, givreurs, mini-refroidisseurs et
// vitrines 1 porte 150 € ; vitrines 2 et 3 portes 250 € ; postes cocktail
// 250 € HT.
// ---------------------------------------------------------------------------
import { tarifGamko } from './gamko-tarif.mjs';
// Visuels du site Gamko : décision de la direction, sous sa responsabilité.
import { visuelsGamko } from './gamko-visuels.mjs';

const MARQUE = 'Gamko';

const ATT_BAR =
  "Derrière un bar, l'air manque souvent : un refroidisseur enfermé sous un comptoir sans ventilation peine à refroidir et s'use vite. Les GM Line et les vitrines Maxiglass ont leur groupe à l'arrière : il leur faut un dégagement contre le mur. Nous vérifions l'emplacement, la ventilation et la prise avant la livraison.";
const ATT_VITRINE =
  "Une vitrine à boissons se pose à l'écart du soleil et des sources de chaleur, avec de l'air autour du groupe, sur une prise dédiée. Nous vérifions l'emplacement et le passage jusqu'au bar avant la livraison.";
const ATT_COCKTAIL =
  "Un poste cocktail se raccorde à l'eau et à l'évacuation (bac à glace, plonge) : nous relevons l'emplacement et les arrivées avant la commande, et nous vous confirmons la configuration — côté de la plonge, options — par écrit.";
const ATT_ACC = "Commandé chez Gamko avec l'appareil, ou après coup : donnez-nous la référence de votre appareil, nous vérifions la compatibilité.";

const TEMP_BAR = 'De +2 à +18 °C, froid ventilé';
const SKIN = 'Extérieur skinplate anthracite ou inox, intérieur skinplate argenté';

const v = (ref, court) => ({ ref, court });

/**
 * Les fiches. Champs propres à ce fichier :
 *   visuel   : référence dont la photo illustre la fiche (gamko-visuels.mjs).
 *   versions : [{ ref: référence EXACTE du tarif, court: précision affichée }]
 */
const fiches = [
  // =========================================================================
  // REFROIDISSEURS DE BOUTEILLES E3
  // =========================================================================
  {
    visuel: 'E322GMU84',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'E3/22',
    categorie: 'arrieres-bars',
    nom: 'Refroidisseur de bouteilles Gamko E3, 2 portes',
    resume: 'L’arrière-bar Gamko de 1,43 m : 344 bouteilles de 33 cl à portée de main.',
    description:
      "Le refroidisseur de bouteilles phare de Gamko, à hauteur de comptoir. Froid ventilé TotalChill, réévaporation automatique des condensats (pas d'évacuation à prévoir), groupe logé à droite. Portes pleines pour le stockage, ou vitrées avec éclairage LED pour vendre ce qu'on sert ; extérieur skinplate anthracite ou tout inox.",
    usages: ['Bars et cafés', 'Brasseries', 'Bars d’hôtel', 'Discothèques'],
    caracteristiques: [
      TEMP_BAR,
      '344 bouteilles de 33 cl, 2 niveaux réglables',
      '1 434 x 512 x 860 mm, pieds réglables sur 20 mm',
      'Groupe logé à droite, réévaporation automatique des condensats',
      'Portes vitrées : serrures et éclairage LED réglable de série',
      SKIN,
    ],
    attention: ATT_BAR,
    versions: [
      v('E322MU84', 'portes pleines, skinplate anthracite'),
      v('E322MUCS84', 'portes pleines, inox'),
      v('E322GMU84', 'portes vitrées, skinplate anthracite'),
      v('E322GMUCS84', 'portes vitrées, inox'),
    ],
  },
  {
    visuel: 'E3222GMU84',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'E3/222',
    categorie: 'arrieres-bars',
    nom: 'Refroidisseur de bouteilles Gamko E3, 3 portes',
    resume: 'L’arrière-bar E3 en 1,99 m : 531 bouteilles de 33 cl.',
    description:
      "Le refroidisseur E3 en trois portes, pour les bars qui servent beaucoup de bouteilles. Mêmes qualités que le modèle deux portes : froid ventilé TotalChill, réévaporation des condensats, groupe logé. Il existe aussi en trois portes étroites (1,57 m), pour un comptoir plus court.",
    usages: ['Bars et brasseries', 'Bars de plage', 'Salles de concert', 'Hôtels'],
    caracteristiques: [
      TEMP_BAR,
      '531 bouteilles de 33 cl (365 en portes étroites)',
      '1 988 x 512 x 860 mm ; portes étroites 1 574 mm',
      'Groupe logé, réévaporation automatique des condensats',
      'Portes vitrées : serrures et éclairage LED réglable de série',
      SKIN,
    ],
    attention: ATT_BAR,
    versions: [
      v('E3222MU84', 'portes pleines, skinplate anthracite'),
      v('E3222MUCS84', 'portes pleines, inox'),
      v('E3222MUPP84', '3 portes étroites pleines, 1 574 mm'),
      v('E3222GMU84', 'portes vitrées, skinplate anthracite'),
      v('E3222GMUCS84', 'portes vitrées, inox'),
    ],
  },
  {
    visuel: 'E32222GMU84',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'E3/2222',
    categorie: 'arrieres-bars',
    nom: 'Refroidisseur de bouteilles Gamko E3, 4 portes',
    resume: 'Le plus long des E3 : 2,54 m et 722 bouteilles de 33 cl.',
    description:
      "Le refroidisseur E3 en quatre portes, pour habiller un long comptoir d'un seul meuble : 722 bouteilles de 33 cl à température, froid ventilé TotalChill, réévaporation des condensats, groupe logé à droite.",
    usages: ['Grands bars', 'Discothèques', 'Salles de réception', 'Bars de stade et de salle'],
    caracteristiques: [
      TEMP_BAR,
      '722 bouteilles de 33 cl, 2 niveaux réglables',
      '2 542 x 512 x 860 mm',
      'Groupe logé à droite, réévaporation automatique des condensats, fluide R600a',
      'Portes vitrées : serrures et éclairage LED réglable de série',
      SKIN,
    ],
    attention: ATT_BAR,
    versions: [
      v('E32222MU84', 'portes pleines, skinplate anthracite'),
      v('E32222MUCS84', 'portes pleines, inox'),
      v('E32222GMU84', 'portes vitrées, skinplate anthracite'),
      v('E32222GMUCS84', 'portes vitrées, inox'),
    ],
  },
  {
    visuel: 'E33DA',
    machines: ['arriere-bar'],
    ref: 'Options E3',
    categorie: 'arrieres-bars',
    nom: 'Blocs tiroirs et serrure pour refroidisseur Gamko E3',
    resume: 'Remplacer une porte de l’E3 par des tiroirs, et fermer à clé.',
    description:
      "Un bloc tiroirs prend la place d'une porte de l'E3 : on y range les softs, les jus et les garnitures sans se baisser. Deux tiroirs égaux, deux tiroirs asymétriques (un grand en bas pour les bouteilles de 75 cl) ou trois tiroirs, en anthracite ou en inox. La serrure se commande par porte pleine ou par tiroir.",
    usages: ['Refroidisseurs Gamko E3'],
    caracteristiques: [
      '2 tiroirs : hauteurs utiles 354 et 341 mm',
      '2 tiroirs asymétriques : 406 et 227 mm',
      '3 tiroirs : 216, 216 et 214 mm',
      'Serrure : une par porte pleine ou par tiroir',
    ],
    attention: ATT_ACC,
    versions: [
      v('E33DA', 'bloc 2 tiroirs, anthracite'),
      v('E33DCS', 'bloc 2 tiroirs, inox'),
      v('E35DA', 'bloc 2 tiroirs asymétriques, anthracite'),
      v('E35DCS', 'bloc 2 tiroirs asymétriques, inox'),
      v('E36DA', 'bloc 3 tiroirs, anthracite'),
      v('E36DCS', 'bloc 3 tiroirs, inox'),
      v('013050219', 'serrure, par porte pleine ou par tiroir'),
    ],
  },

  // =========================================================================
  // GM LINE
  // =========================================================================
  {
    visuel: 'GM322',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'GM portes',
    categorie: 'arrieres-bars',
    nom: 'Refroidisseur de bouteilles Gamko GM Line, à portes',
    resume: 'L’arrière-bar compact Gamko, de 1 à 3 portes pleines.',
    description:
      "La GM Line est l'arrière-bar Gamko à groupe arrière, en modules de 600 mm de large par porte : une porte sous un petit comptoir, deux ou trois pour un bar classique. Froid ventilé, éclairage LED blanc, poignées encastrées, fluide naturel R600a.",
    usages: ['Bars et cafés', 'Restaurants', 'Caves et bars à vin', 'Campings — bar et snack'],
    caracteristiques: [
      TEMP_BAR,
      'De 151 bouteilles de 33 cl (1 porte) à 456 (3 portes)',
      'Profondeur 576 mm, hauteur 850 mm ; 600 mm de large en 1 porte, 1 110 mm en 2 portes',
      'Groupe à l’arrière, fluide R600a, éclairage LED',
      'Extérieur skinplate anthracite',
    ],
    attention: ATT_BAR,
    versions: [v('GM32', '1 porte pleine, 151 bouteilles'), v('GM322', '2 portes pleines, 296 bouteilles'), v('GM3222', '3 portes pleines, 456 bouteilles')],
  },
  {
    visuel: 'GM344',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'GM tiroirs',
    categorie: 'arrieres-bars',
    nom: 'Refroidisseur de bouteilles Gamko GM Line, à tiroirs',
    resume: 'La GM Line en tiroirs : on sert sans se baisser ni ouvrir de porte.',
    description:
      "La GM Line en tiroirs pleins, par colonnes de deux : tout se voit d'un coup d'œil quand on tire le tiroir, et rien ne gêne le passage derrière le bar. Froid ventilé double flux sur les modèles à 4 et 6 tiroirs, éclairage LED, fluide R600a.",
    usages: ['Bars à cocktails', 'Bars d’hôtel', 'Restaurants', 'Caves et bars à vin'],
    caracteristiques: [
      TEMP_BAR,
      'Tiroirs de 280 mm (bas) et 330 mm (haut) de hauteur utile',
      '600 mm (2 tiroirs), 1 110 mm (4 tiroirs) ou 1 670 mm (6 tiroirs) ; profondeur 576 mm, hauteur 850 mm',
      'Groupe à l’arrière, fluide R600a, éclairage LED',
    ],
    attention: ATT_BAR,
    versions: [v('GM34', '2 tiroirs, 600 mm'), v('GM344', '4 tiroirs, 1 110 mm'), v('GM3444', '6 tiroirs, 1 670 mm')],
  },

  // =========================================================================
  // VITRINES À BOISSONS MAXIGLASS
  // =========================================================================
  {
    visuel: 'MG3150RG',
    type: 'machine',
    machines: ['vitrine-refrigeree', 'arriere-bar'],
    ref: 'Maxiglass 150',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à boissons Gamko Maxiglass, 1 porte, 150 L',
    resume: 'La vitrine à boissons d’une porte, sous comptoir : 151 bouteilles de 33 cl.',
    description:
      "La vitrine Maxiglass est monocoque : pas de joint de carrosserie où la saleté s'accumule, une isolation continue et une faible consommation. Une porte vitrée pour vendre, avec éclairage LED réglable, ou une porte pleine pour stocker ; charnière à droite (R) ou à gauche (L). Deux hauteurs : 900 mm (MG) ou 840 mm (LG), pour passer sous un comptoir bas.",
    usages: ['Bars et cafés', 'Snacks et boulangeries', 'Restaurants', 'Campings'],
    caracteristiques: [
      TEMP_BAR,
      '150 L, 151 bouteilles de 33 cl, 2 niveaux réglables',
      '602 x 575 mm ; hauteur 900 mm (MG) ou 840 mm (LG)',
      'Monocoque, serrure, éclairage LED réglable, groupe à l’arrière',
      SKIN,
    ],
    attention: ATT_VITRINE,
    versions: [
      v('MG3150RG', 'H 900, porte vitrée, charnière à droite'),
      v('MG3150LG', 'H 900, porte vitrée, charnière à gauche'),
      v('MG3150RGCS', 'H 900, porte vitrée inox, charnière à droite'),
      v('MG3150LGCS', 'H 900, porte vitrée inox, charnière à gauche'),
      v('MG3150R', 'H 900, porte pleine, charnière à droite'),
      v('MG3150L', 'H 900, porte pleine, charnière à gauche'),
      v('MG3150RCS', 'H 900, porte pleine inox, charnière à droite'),
      v('MG3150LCS', 'H 900, porte pleine inox, charnière à gauche'),
      v('LG3150RG', 'H 840, porte vitrée, charnière à droite'),
      v('LG3150LG', 'H 840, porte vitrée, charnière à gauche'),
      v('LG3150RGCS', 'H 840, porte vitrée inox, charnière à droite'),
      v('LG3150LGCS', 'H 840, porte vitrée inox, charnière à gauche'),
      v('LG3150R', 'H 840, porte pleine, charnière à droite'),
      v('LG3150L', 'H 840, porte pleine, charnière à gauche'),
      v('LG3150RCS', 'H 840, porte pleine inox, charnière à droite'),
      v('LG3150LCS', 'H 840, porte pleine inox, charnière à gauche'),
    ],
  },
  {
    visuel: 'MG3250GCS',
    type: 'machine',
    machines: ['vitrine-refrigeree', 'arriere-bar'],
    ref: 'Maxiglass 250',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à boissons Gamko Maxiglass, 2 portes, 250 L',
    resume: 'La Maxiglass deux portes en 900 mm de large, battantes ou coulissantes.',
    description:
      "La vitrine Maxiglass deux portes : 250 litres en 900 mm de large. Portes vitrées battantes, portes vitrées coulissantes (rien ne dépasse dans le passage quand on ouvre) ou portes pleines. Deux hauteurs : 900 mm (MG) ou 840 mm (LG).",
    usages: ['Bars et cafés', 'Bars de plage', 'Brasseries', 'Épiceries fines'],
    caracteristiques: [
      TEMP_BAR,
      '250 L, 225 bouteilles de 33 cl',
      '900 x 575 mm ; hauteur 900 mm (MG) ou 840 mm (LG)',
      'Monocoque, serrure, éclairage LED réglable, groupe à l’arrière',
      SKIN,
    ],
    attention: ATT_VITRINE,
    versions: [
      v('MG3250G', 'H 900, portes vitrées'),
      v('MG3250GCS', 'H 900, portes vitrées, inox'),
      v('MG3250SD', 'H 900, portes vitrées coulissantes'),
      v('MG3250', 'H 900, portes pleines'),
      v('MG3250CS', 'H 900, portes pleines, inox'),
      v('LG3250G', 'H 840, portes vitrées'),
      v('LG3250GCS', 'H 840, portes vitrées, inox'),
      v('LG3250SD', 'H 840, portes vitrées coulissantes'),
      v('LG3250', 'H 840, portes pleines'),
      v('LG3250CS', 'H 840, portes pleines, inox'),
    ],
  },
  {
    visuel: 'MG3275G',
    type: 'machine',
    machines: ['vitrine-refrigeree', 'arriere-bar'],
    ref: 'Maxiglass 275',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à boissons Gamko Maxiglass, 2 portes, 275 L',
    resume: 'La Maxiglass deux portes en 1,20 m : 322 bouteilles de 33 cl.',
    description:
      "La vitrine Maxiglass deux portes larges, en 1 200 mm : plus de bouteilles par porte. Portes vitrées battantes ou coulissantes, ou portes pleines, en hauteur 900 mm.",
    usages: ['Bars et brasseries', 'Bars d’hôtel', 'Traiteurs'],
    caracteristiques: [
      TEMP_BAR,
      '275 L, 322 bouteilles de 33 cl',
      '1 200 x 575 x 900 mm',
      'Monocoque, serrure, éclairage LED réglable, groupe à l’arrière, fluide R600a',
      SKIN,
    ],
    attention: ATT_VITRINE,
    versions: [
      v('MG3275G', 'portes vitrées'),
      v('MG3275GCS', 'portes vitrées, inox'),
      v('MG3275SD', 'portes vitrées coulissantes'),
      v('MG3275', 'portes pleines'),
      v('MG3275CS', 'portes pleines, inox'),
    ],
  },
  {
    visuel: 'MG3315G',
    type: 'machine',
    machines: ['vitrine-refrigeree', 'arriere-bar'],
    ref: 'Maxiglass 315',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à boissons Gamko Maxiglass, 3 portes, 315 L',
    resume: 'La Maxiglass trois portes en 1,35 m, pour vendre sur toute la longueur du bar.',
    description:
      "La vitrine Maxiglass trois portes, en 1 350 mm de large : 366 bouteilles de 33 cl derrière des portes vitrées battantes ou coulissantes, ou des portes pleines. Deux hauteurs : 900 mm (MG) ou 840 mm (LG).",
    usages: ['Bars et brasseries', 'Bars de plage', 'Salles de réception'],
    caracteristiques: [
      TEMP_BAR,
      '315 L, 366 bouteilles de 33 cl (portes battantes)',
      'Largeur 1 350 mm, profondeur 575 mm',
      'Monocoque, serrure, éclairage LED réglable, groupe à l’arrière',
      SKIN,
    ],
    attention: ATT_VITRINE,
    versions: [
      v('MG3315G', 'H 900, portes vitrées'),
      v('MG3315GCS', 'H 900, portes vitrées, inox'),
      v('MG3315SD', 'H 900, portes vitrées coulissantes'),
      v('MG3315', 'H 900, portes pleines'),
      v('MG3315CS', 'H 900, portes pleines, inox'),
      v('LG3315G', 'H 840, portes vitrées'),
      v('LG3315GCS', 'H 840, portes vitrées, inox'),
      v('LG3315SD', 'H 840, portes vitrées coulissantes'),
      v('LG3315', 'H 840, portes pleines'),
      v('LG3315CS', 'H 840, portes pleines, inox'),
    ],
  },
  {
    visuel: 'MG3300RGCS',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'Maxiglass 300 haute',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à boissons haute Gamko Maxiglass, 1 porte, 300 L',
    resume: 'La Maxiglass en armoire haute de 1,80 m : 300 bouteilles sur 5 niveaux.',
    description:
      "La vitrine Maxiglass en version haute : 1 800 mm, une porte vitrée, cinq niveaux réglables. Pour le libre-service en salle ou en boutique, là où la place manque en largeur. Charnière à droite ou à gauche, extérieur anthracite ou porte inox.",
    usages: ['Snacks et boulangeries', 'Épiceries fines', 'Bars', 'Campings — supérette'],
    caracteristiques: [
      TEMP_BAR,
      '300 L, 300 bouteilles de 33 cl, 5 niveaux réglables',
      'Hauteur 1 800 mm, profondeur 530 mm',
      'Monocoque, serrure, éclairage LED réglable, fluide R600a',
    ],
    attention: ATT_VITRINE,
    versions: [
      v('MG3300RG', 'porte vitrée, charnière à droite'),
      v('MG3300LG', 'porte vitrée, charnière à gauche'),
      v('MG3300RGCS', 'porte vitrée inox, charnière à droite'),
      v('MG3300LGCS', 'porte vitrée inox, charnière à gauche'),
    ],
  },
  {
    visuel: 'MG3500SD',
    type: 'machine',
    machines: ['vitrine-refrigeree'],
    ref: 'Maxiglass 500 haute',
    categorie: 'vitrines-refrigerees',
    nom: 'Vitrine à boissons haute Gamko Maxiglass, 2 portes, 500 L',
    resume: 'La Maxiglass haute deux portes : 508 bouteilles sur 900 mm de large.',
    description:
      "La vitrine Maxiglass haute en deux portes vitrées, battantes ou coulissantes : 500 litres sur 900 mm de large et 1 800 mm de haut, cinq niveaux réglables, éclairage LED.",
    usages: ['Snacks et boulangeries', 'Épiceries', 'Bars à forte affluence'],
    caracteristiques: [
      TEMP_BAR,
      '500 L, 508 bouteilles de 33 cl, 5 niveaux réglables',
      '900 x 530 x 1 800 mm',
      'Monocoque, serrures, éclairage LED réglable',
    ],
    attention: ATT_VITRINE,
    versions: [v('MG3500G', 'portes vitrées battantes'), v('MG3500GCS', 'portes vitrées battantes, inox'), v('MG3500SD', 'portes vitrées coulissantes')],
  },

  // =========================================================================
  // GIVREURS DE VERRES, MINI-REFROIDISSEURS
  // =========================================================================
  {
    visuel: 'GF3100RG',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'GF3/100',
    categorie: 'arrieres-bars',
    nom: 'Givreur de verres Gamko GF, 1 porte',
    resume: 'Des verres givrés à −10 °C, pour une bière servie vraiment fraîche.',
    description:
      "Le givreur de verres refroidit les verres entre −14 et −10 °C : la bière, le cocktail ou le soda y reste froid plus longtemps, et le verre givré se voit en salle. 50 pintes de 50 cl sur deux grilles réglables, porte vitrée (on voit le stock) ou pleine, charnière à droite ou à gauche.",
    usages: ['Bars à bière', 'Pubs et brasseries', 'Bars à cocktails'],
    caracteristiques: [
      'De −14 à −10 °C, froid ventilé',
      '100 L, 50 verres pintes de 50 cl (H 150 mm, Ø 88 mm), 2 grilles',
      '602 x 536 x 840 mm',
      'Serrure, éclairage LED, groupe à l’arrière, fluide R600a',
      'Extérieur skinplate anthracite ou porte inox',
    ],
    attention: ATT_BAR,
    versions: [
      v('GF3100RG', 'porte vitrée, charnière à droite'),
      v('GF3100LG', 'porte vitrée, charnière à gauche'),
      v('GF3100RGCS', 'porte vitrée inox, charnière à droite'),
      v('GF3100LGCS', 'porte vitrée inox, charnière à gauche'),
      v('GF3100RS', 'porte pleine, charnière à droite'),
      v('GF3100LS', 'porte pleine, charnière à gauche'),
      v('GF3100RSCS', 'porte pleine inox, charnière à droite'),
      v('GF3100LSCS', 'porte pleine inox, charnière à gauche'),
    ],
  },
  {
    visuel: 'VKHC10R',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'VKHC',
    categorie: 'arrieres-bars',
    nom: 'Mini-refroidisseur de bouteilles Gamko VKHC, à encastrer',
    resume: 'Dix ou douze bouteilles d’un litre, encastrées dans le comptoir ou posées.',
    description:
      "Le mini-refroidisseur garde au poste de travail les bouteilles qu'on sert le plus : sirops et jus au positif (+4 / +8 °C), alcools servis glacés au négatif (−8 / −12 °C). Il s'encastre dans le plan du bar ou se pose dessus.",
    usages: ['Bars à cocktails', 'Bars de nuit', 'Postes cocktail'],
    caracteristiques: [
      'Positif : réglable de 0 à +10 °C ; négatif : de 0 à −15 °C',
      '10 ou 12 bouteilles de 1 L',
      'VKHC 10 : 510 x 423 x 253 mm ; VKHC 12 : 458 x 373 x 490 mm',
      'À encastrer ou à poser, fluide R600a',
    ],
    attention: ATT_BAR,
    versions: [
      v('VKHC10R', '10 bouteilles, positif +4 / +8 °C'),
      v('VKHC10F', '10 bouteilles, négatif −8 / −12 °C'),
      v('VKHC12R', '12 bouteilles, positif +4 / +8 °C'),
      v('VKHC12F', '12 bouteilles, négatif −8 / −12 °C'),
    ],
  },

  // =========================================================================
  // POSTES COCKTAIL FLEXBAR
  // =========================================================================
  {
    visuel: 'XC1000650',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'XC1000',
    categorie: 'arrieres-bars',
    nom: 'Poste cocktail Gamko Flexbar 1000',
    resume: 'Le poste du barman en un mètre : glace, bouteilles, garnitures, plan de préparation.',
    description:
      "Le poste cocktail Flexbar réunit sur un mètre ce dont le barman a besoin sans faire un pas : réserve à glaçons isolée avec vidange, porte-bouteilles en façade (speed rack, 10 à 13 bouteilles), bacs GN 1/9 pour les garnitures, plan de préparation. Châssis inox à pieds réglables, dosseret de 100 mm. Trois versions : réserve de 92 L (profondeur 600), de 100 L (profondeur 650), ou « condensée » à cuve GN.",
    usages: ['Bars à cocktails', 'Bars d’hôtel', 'Rooftops et bars de plage'],
    caracteristiques: [
      '1 000 mm de long, profondeur 600 ou 650 mm',
      'Réserve à glaçons isolée avec vidange et séparateur',
      'Speed rack frontal, 4 bacs GN 1/9 fournis',
      'Châssis inox à pieds réglables, dosseret 100 mm',
    ],
    attention: ATT_COCKTAIL,
    versions: [
      v('XC1000600', 'réserve 92 L, profondeur 600'),
      v('XC1000650', 'réserve 100 L, profondeur 650'),
      v('XC1000V2', 'version condensée, cuve GN'),
    ],
  },
  {
    visuel: 'XC1350650R',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'XC1350',
    categorie: 'arrieres-bars',
    nom: 'Poste cocktail Gamko Flexbar 1350 avec plonge',
    resume: 'Le poste cocktail avec son bac de rinçage, plonge à droite ou à gauche.',
    description:
      "Le poste cocktail de 1 350 mm avec un bac plonge rince-verres : on lave l'outil et on rince le verre sans quitter son poste. Bac à glace isolé format GN avec vidange, 4 bacs GN 1/9 et un GN 1/3, speed rack en façade avec range-accessoires, planche à découper. Plonge à droite ou à gauche selon le sens de service.",
    usages: ['Bars à cocktails', 'Bars d’hôtel', 'Restaurants avec bar'],
    caracteristiques: [
      '1 350 x 650 x 900 mm, dosseret 100 mm',
      'Bac plonge rince-verres avec vidange, bonde et trop-plein',
      'Bac à glace isolé GN avec vidange, 3 séparateurs',
      'Speed rack frontal, 4 bacs GN 1/9 + 1 GN 1/3',
    ],
    attention: ATT_COCKTAIL,
    versions: [v('XC1350650R', 'plonge à droite'), v('XC1350650L', 'plonge à gauche')],
  },
  {
    visuel: 'XC1700',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'XC1700 / XC2200',
    categorie: 'arrieres-bars',
    nom: 'Ensemble poste cocktail Gamko Flexbar 1700 ou 2200',
    resume: 'Le poste cocktail complet, rangements et poubelles compris, en 1,74 ou 2,24 m.',
    description:
      "L'ensemble poste cocktail Flexbar : plan de travail inox avec plonge, deux bacs à glaçons (dont un avec couvercle isolant), deux porte-bouteilles, bacs GN 1/9, planche à découper, et en dessous deux modules de rangement, un module poubelle avec trappe et un tiroir poubelle. Façade anthracite ou inox. La version 1700 « avec plonge » est un poste plus simple, sans les modules du dessous, avec une réserve de 100 L.",
    usages: ['Bars à cocktails', 'Bars d’hôtel', 'Établissements de nuit'],
    caracteristiques: [
      '1 740 ou 2 240 mm de long, profondeur 650 mm, hauteur 920 mm',
      'Plonge, 2 bacs à glaçons, 2 porte-bouteilles, 4 bacs GN 1/9',
      'Modules de rangement, module et tiroir poubelle (ensembles complets)',
      'Plan de travail inox avec dosseret 100 mm',
    ],
    attention: ATT_COCKTAIL,
    versions: [
      v('XC1700', 'ensemble 1 740 mm, façade anthracite'),
      v('XC1700CS', 'ensemble 1 740 mm, façade inox'),
      v('XC2200', 'ensemble 2 240 mm, façade anthracite'),
      v('XC2200CS', 'ensemble 2 240 mm, façade inox'),
      v('XC1700PLN', 'poste 1 700 mm avec plonge, réserve 100 L'),
    ],
  },
  {
    visuel: 'XCB410',
    type: 'machine',
    machines: ['arriere-bar'],
    ref: 'XCB',
    categorie: 'arrieres-bars',
    nom: 'Module plonge rince-verres Gamko Flexbar',
    resume: 'Le bac de rinçage à intégrer dans une ligne de bar, en 410 ou 540 mm.',
    description:
      "Le module plonge rince-verres Flexbar complète une ligne de bar : cuve de 290 x 350 x 200 mm avec bonde et trop-plein, rince-verres sur grille en décaissé penté, soubassement ouvert. Châssis inox à pieds réglables. Le robinet n'est pas fourni : nous le chiffrons avec la pose.",
    usages: ['Bars et cafés', 'Postes cocktail', 'Bars d’hôtel'],
    caracteristiques: ['410 ou 540 x 650 x 900 mm, dosseret 100 mm', 'Cuve 290 x 350 x 200 mm, bonde et trop-plein', 'Rince-verres sur grille', 'Robinet non fourni'],
    attention: ATT_COCKTAIL,
    versions: [v('XCB410', 'module 410 mm'), v('XCB540', 'module 540 mm')],
  },
  {
    machines: ['arriere-bar'],
    ref: 'XC1350EPBCK',
    categorie: 'arrieres-bars',
    visuel: 'XC1350650R',
    nom: 'Étagère basse pour poste cocktail Gamko Flexbar 1350',
    resume: 'Un niveau de rangement sous le poste cocktail 1350.',
    description: "Étagère basse inox qui se pose sous le poste cocktail Flexbar 1350 (profondeur 650) : verres, bacs ou réserve de bouteilles restent à portée de main.",
    usages: ['Postes cocktail Flexbar 1350'],
    caracteristiques: ['Pour XC1350650R et XC1350650L', 'Inox'],
    attention: ATT_ACC,
    versions: [v('XC1350EPBCK', 'étagère basse, poste 1350')],
  },
];

// ---------------------------------------------------------------------------
// Assemblage avec le tarif et les visuels
// ---------------------------------------------------------------------------

/** Toutes les références du tarif utilisées ici — lu par le générateur. */
export const refsGamko = fiches.flatMap((f) => f.versions.map((x) => x.ref));

/** Les références introuvables dans le tarif généré (doit rester vide). */
export const refsGamkoManquantes = refsGamko.filter((r) => !tarifGamko[r]);

// Adresses des fiches : écrites à la main, elles ne doivent plus changer une
// fois en ligne.
const SLUGS = {
  'E3/22': 'gamko-e3-refroidisseur-bouteilles-2-portes',
  'E3/222': 'gamko-e3-refroidisseur-bouteilles-3-portes',
  'E3/2222': 'gamko-e3-refroidisseur-bouteilles-4-portes',
  'Options E3': 'gamko-e3-blocs-tiroirs-serrure',
  'GM portes': 'gamko-gm-line-refroidisseur-bouteilles-portes',
  'GM tiroirs': 'gamko-gm-line-refroidisseur-bouteilles-tiroirs',
  'Maxiglass 150': 'gamko-maxiglass-vitrine-boissons-1-porte-150-l',
  'Maxiglass 250': 'gamko-maxiglass-vitrine-boissons-2-portes-250-l',
  'Maxiglass 275': 'gamko-maxiglass-vitrine-boissons-2-portes-275-l',
  'Maxiglass 315': 'gamko-maxiglass-vitrine-boissons-3-portes-315-l',
  'Maxiglass 300 haute': 'gamko-maxiglass-vitrine-boissons-haute-300-l',
  'Maxiglass 500 haute': 'gamko-maxiglass-vitrine-boissons-haute-500-l',
  'GF3/100': 'gamko-gf-givreur-de-verres',
  VKHC: 'gamko-vkhc-mini-refroidisseur-bouteilles',
  XC1000: 'gamko-flexbar-poste-cocktail-1000',
  XC1350: 'gamko-flexbar-poste-cocktail-1350-plonge',
  'XC1700 / XC2200': 'gamko-flexbar-ensemble-poste-cocktail',
  XCB: 'gamko-flexbar-module-plonge-rince-verres',
  XC1350EPBCK: 'gamko-flexbar-etagere-basse-poste-cocktail-1350',
};

const photoDe = (f) => visuelsGamko[f.visuel ?? f.versions[0].ref]?.photo ?? null;

export const produitsGamko = fiches.map((f) => {
  const { versions, visuel, ...reste } = f;
  return {
    slug: SLUGS[f.ref],
    marque: MARQUE,
    creditVisuel: 'Gamko',
    photo: photoDe(f),
    usages: [],
    // Options et accessoires : commandés chez Gamko, pas en stock chez nous.
    ...(f.type === 'machine' ? {} : { surCommande: true }),
    ...reste,
    conditionnements: versions.map((x) => {
      const t = tarifGamko[x.ref] || {};
      const d = visuelsGamko[x.ref] || {};
      return {
        label: `${x.ref} · ${x.court}`,
        refFabricant: x.ref,
        prix: typeof t.prix === 'number' ? t.prix : null,
        ...(typeof t.eco === 'number' && t.eco > 0 ? { ecoPart: t.eco } : {}),
        // Fiche technique de la version ; à défaut, la brochure de la gamme.
        ...(d.fiche
          ? { ficheFabricant: d.fiche, ficheTitre: `Fiche technique ${x.ref}` }
          : d.gamme
            ? { ficheFabricant: d.gamme, ficheTitre: 'Brochure de la gamme' }
            : {}),
        ...(d.etiquette ? { etiquetteEnergie: d.etiquette } : {}),
      };
    }),
  };
});
