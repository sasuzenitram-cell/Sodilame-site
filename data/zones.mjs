// ---------------------------------------------------------------------------
// Les 5 zones d'intervention, reprises de la plaquette dépannage SODILAME.
// Les communes sont listées SANS tarif : la grille de déplacement reste un
// document commercial remis de la main à la main, elle n'est pas publiée ici.
// ---------------------------------------------------------------------------

export const zones = [
  {
    slug: 'coeur-de-crau',
    numero: 1,
    nom: 'Cœur de Crau',
    sousTitre: 'Saint-Martin-de-Crau et communes limitrophes',
    couleur: 'teal',
    titreSeo: 'Dépannage cuisine professionnelle en Cœur de Crau | SODILAME',
    description:
      "Zone 1 : Saint-Martin-de-Crau, Mouriès, Fontvieille, Maussane, Les Baux-de-Provence. Dépannage et entretien de cuisines professionnelles au départ de notre atelier.",
    accroche:
      "C'est notre zone la plus proche — celle où notre atelier et notre magasin de pièces se trouvent. Quand la pièce est en stock, elle est à quelques minutes de votre cuisine.",
    corps: [
      {
        h2: 'La zone où nous sommes le plus réactifs',
        html: `<p>Notre atelier de la ZA de la Chapelette est au centre de cette zone. Concrètement, cela veut dire deux choses pour les établissements du secteur : nos techniciens y passent tous les jours en partant ou en rentrant de tournée, et le stock de pièces d'usure est à portée immédiate.</p>
<p>C'est aussi la seule zone où nous pratiquons le dépôt-retrait direct : un professionnel qui a besoin d'un joint de porte, d'un thermostat ou d'un petit matériel peut venir le chercher aux horaires d'ouverture plutôt que d'attendre un passage.</p>`,
      },
      {
        h2: 'Des établissements très différents sur un petit territoire',
        html: `<p>Le Cœur de Crau juxtapose des réalités qui n'ont rien à voir : les restaurants de village de Mouriès, Maussane ou Fontvieille, très saisonniers et souvent installés dans du bâti ancien ; les mas et hôtels des Alpilles, avec une clientèle exigeante et des cuisines soignées ; les cantines et structures d'accueil de Saint-Martin-de-Crau ; et les restaurants d'entreprise de la zone logistique.</p>
<p>Aux Baux-de-Provence, s'ajoutent les contraintes patrimoniales : accès en voirie étroite, impossibilité d'installer un groupe frigorifique ou un caisson d'extraction visible depuis l'extérieur. Ce sont des projets qui se relèvent sur place, jamais sur plan.</p>`,
      },
      {
        h2: 'Notre conseil pour cette zone',
        html: `<p>La saison des Alpilles est courte et intense. Positionnez votre visite d'entretien préventif en février ou en mars : c'est le moment où l'immobilisation d'un équipement ne coûte presque rien, et où nous avons le plus de disponibilité pour prendre le temps de faire les choses correctement.</p>`,
      },
    ],
    communes: [
      'Saint-Martin-de-Crau', 'Mouriès', 'Raphèle', 'Mas-Thibert', 'Maussane',
      'Le Paradou', 'Barbegal', 'Entressen', 'Fontvieille', 'Les Baux-de-Provence',
    ],
    villes: ['saint-martin-de-crau'],
  },

  {
    slug: 'pays-arles-alpilles-camargue',
    numero: 2,
    nom: "Pays d'Arles, Alpilles et Camargue",
    sousTitre: 'Arles, Salon-de-Provence, Nîmes, Avignon, Istres et alentours',
    couleur: 'gold',
    titreSeo: "Cuisine professionnelle : Arles, Salon, Nîmes, Avignon | SODILAME",
    description:
      "Zone 2 : Arles, Salon-de-Provence, Nîmes, Avignon, Istres, Miramas, Tarascon, Cavaillon. Installation, dépannage et entretien de cuisines professionnelles.",
    accroche:
      "C'est le cœur de notre activité. Une quarantaine de communes entre Rhône et Durance, où nos techniciens tournent quotidiennement.",
    corps: [
      {
        h2: 'Notre zone la plus dense',
        html: `<p>Cette zone concentre l'essentiel de nos interventions. Elle couvre les quatre grands bassins de restauration de notre territoire : le Pays d'Arles, le Salonais, l'agglomération nîmoise et le Grand Avignon, plus le secteur Istres–Miramas–Fos.</p>
<p>La densité est un avantage direct pour vous : nos tournées y sont quotidiennes, ce qui nous permet souvent de greffer une intervention sur un passage déjà prévu plutôt que de programmer un déplacement dédié.</p>`,
      },
      {
        h2: 'Quatre saisonnalités qui ne se superposent pas',
        html: `<p>Ce qui rend cette zone intéressante à couvrir, c'est que ses pics d'activité sont décalés. La feria de Pâques et les Rencontres de la photographie tendent Arles au printemps et en juillet. Le Festival concentre Avignon sur trois semaines de juillet. Les férias nîmoises font exploser la restauration gardoise à la Pentecôte. Les cantines et cuisines centrales du Salonais, elles, tournent hors vacances scolaires.</p>
<p>Nous calons les visites préventives sur ces calendriers plutôt que sur une date anniversaire de contrat. Un restaurant arlésien est visité avant les Rencontres, une cuisine centrale salonaise pendant les vacances scolaires.</p>`,
      },
      {
        h2: 'Camargue : la contrainte de l’éloignement',
        html: `<p>Le Sambuc, Salin-de-Giraud, Albaron, Gageron, les Saintes-Maries-de-la-Mer : ces établissements cumulent l'isolement, une activité très saisonnière et parfois une alimentation électrique limitée.</p>
<p>Pour ces sites, nous privilégions des matériels dont les pièces restent approvisionnables longtemps, et nous insistons sur l'entretien préventif — parce qu'un déplacement à vide en Camargue coûte cher à tout le monde.</p>`,
      },
    ],
    communes: [
      'Saint-Étienne-du-Grès', 'Arles', 'Gageron', 'Fourques', 'Saint-Gilles',
      'Albaron', 'Istres', 'Maillane', 'Miramas', 'Saint-Rémy-de-Provence',
      'Graveson', 'Le Paty', 'Salon-de-Provence', 'Le Sambuc', 'Sénas',
      'Eyragues', 'Mallemort', 'Saint-Chamas', 'Vauvert', 'Tarascon',
      'Beaucaire', 'Bellegarde', 'Comps', 'Fos-sur-Mer', 'Eygalières',
      'Aureille', 'Mollégès', 'Rognonas', 'Saintes-Maries-de-la-Mer', 'Meynes',
      'Montfrin', 'Nîmes', 'Lambesc', 'Remoulins', 'Salin-de-Giraud',
      'Le Thor', 'Aimargues', 'Avignon', 'Cavaillon', 'Villeneuve-lès-Avignon',
    ],
    villes: ['arles', 'salon-de-provence', 'avignon', 'nimes', 'istres-miramas'],
  },

  {
    slug: 'grand-avignon-comtat-uzege',
    numero: 3,
    nom: 'Grand Avignon, Comtat et Uzège',
    sousTitre: 'Étang de Berre ouest et Gard rhodanien',
    couleur: 'terra',
    titreSeo: 'Cuisine professionnelle : Carpentras, Uzès, Sorgues | SODILAME',
    description:
      "Zone 3 : Carpentras, L'Isle-sur-la-Sorgue, Uzès, Sorgues, Châteauneuf-du-Pape, Martigues. Dépannage et entretien de cuisines professionnelles.",
    accroche:
      "Le Comtat Venaissin, l'Uzège et le Gard rhodanien : un territoire de domaines viticoles, de villages touristiques et de restauration de destination.",
    corps: [
      {
        h2: 'Domaines viticoles et activité de réception',
        html: `<p>Châteauneuf-du-Pape, Bédarrides, Courthézon, Rasteau : le vignoble rhodanien a développé une vraie activité de réception — dégustations, repas de domaine, mariages, séminaires. Ces cuisines ont un profil particulier : très sollicitées sur quelques dizaines de dates dans l'année, à l'arrêt le reste du temps.</p>
<p>C'est un cas où le surdimensionnement du froid et de la plonge se justifie pleinement, et où le contrat d'entretien prend tout son sens : un équipement qui dort dix mois par an tombe en panne au redémarrage, pas en pleine saison.</p>`,
      },
      {
        h2: 'Restauration de destination en Uzège',
        html: `<p>Uzès, Vers-Pont-du-Gard, Saint-Hilaire-d'Ozilhan, Pouzilhac : la restauration y est tirée par le tourisme patrimonial, avec une clientèle qui vient de loin et une exigence élevée. Beaucoup d'établissements sont installés dans des bâtiments anciens, souvent classés, ce qui pèse sur les possibilités d'extraction et sur l'implantation des groupes frigorifiques.</p>
<p>Comme aux Baux, ces projets se relèvent sur site. Nous ne chiffrons jamais une extraction en Uzège sans être passé voir la façade et la toiture.</p>`,
      },
      {
        h2: 'Carpentras, L’Isle-sur-la-Sorgue, Pernes',
        html: `<p>Le Comtat combine une restauration de centre-ville dense, des marchés et des commerces de bouche importants, et un tissu de collectivités. C'est une zone où nous intervenons autant sur du froid de boucherie et de commerce alimentaire que sur de la cuisine de restaurant.</p>`,
      },
    ],
    communes: [
      'Entraigues', "L'Isle-sur-la-Sorgue", 'Martigues', 'Orgon', 'Sorgues',
      'Courthézon', 'Le Grau-du-Roi', "Saint-Hilaire-d'Ozilhan", 'Bédarrides',
      'Châteauneuf-du-Pape', 'Saint-Didier', 'Saint-Maximin', 'Carpentras',
      'Pernes-les-Fontaines', 'Uzès', 'Vers-Pont-du-Gard', 'Pouzilhac',
    ],
    villes: [],
  },

  {
    slug: 'aix-marseille-luberon',
    numero: 4,
    nom: 'Aix, Marseille et Luberon',
    sousTitre: 'Littoral des Bouches-du-Rhône et Vaucluse est',
    couleur: 'navy',
    titreSeo: 'Cuisine professionnelle : Aix, Marseille, Luberon | SODILAME',
    description:
      "Zone 4 : Aix-en-Provence, Marseille, Aubagne, Cassis, La Ciotat, Gordes, Apt, Pertuis. Projets d'équipement et contrats d'entretien pour cuisines professionnelles.",
    accroche:
      "Le grand bassin aixois et marseillais, le littoral et le Luberon. Une zone que nous couvrons en interventions planifiées plutôt qu'en dépannage à la volée.",
    corps: [
      {
        h2: 'Notre positionnement sur cette zone, en toute franchise',
        html: `<p>Aix, Marseille et le Luberon sont à une heure ou plus de notre atelier. Nous n'y promettons pas d'intervenir dans l'heure sur une panne isolée, et nous préférons le dire clairement plutôt que de vous faire attendre un technicien qui ne partira pas.</p>
<p>En revanche, sur les projets d'équipement, les remplacements programmés et les contrats d'entretien, notre service y est identique à celui du Pays d'Arles : les passages sont planifiés, les interventions groupées, et vous avez le même interlocuteur du plan au SAV.</p>`,
      },
      {
        h2: 'Restauration exigeante et hôtellerie haut de gamme',
        html: `<p>Le triangle Aix – Luberon – littoral concentre une gastronomie et une hôtellerie où la régularité prime sur la puissance brute : un four mixte qui tient exactement sa consigne, une cellule qui descend dans les temps, une verrerie qui sort sans trace.</p>
<p>Ces exigences orientent le choix du matériel — sonde à cœur, générateur de vapeur, osmoseur — et surtout le rythme d'entretien. Un four dont la sonde dérive de deux degrés ne tombe pas en panne : il dégrade silencieusement la production, et personne ne comprend pourquoi.</p>`,
      },
      {
        h2: 'Livrer dans Marseille et sur le littoral',
        html: `<p>Livrer un bloc cuisson dans le Panier, à Cassis un samedi d'été ou dans une rue en pente du 7ᵉ n'a rien d'anodin : autorisation de stationnement, créneaux horaires imposés, monte-charge à la dimension près, portage à plusieurs.</p>
<p>Nous intégrons ces contraintes dans l'étude et dans le devis. C'est plus long à préparer, et cela évite le camion qui repart chargé.</p>`,
      },
    ],
    communes: [
      'Arpaillargues', "Cabrières-d'Avignon", 'Aix-en-Provence', 'Apt',
      'Bouc-Bel-Air', 'Fontaine-de-Vaucluse', 'Gardanne', 'Gordes', 'Marignane',
      'Ménerbes', 'Oppède', "La Roque-d'Anthéron", 'Vitrolles', 'Aubagne',
      'Le Barroux', 'Cassis', 'La Ciotat', 'Crillon-le-Brave', 'Marseille',
      'La Penne-sur-Huveaune', 'Pertuis', 'Le Puy-Sainte-Réparade', 'Puyvert',
      'Sault', 'Vacqueyras',
    ],
    villes: ['aix-en-provence', 'marseille'],
  },

  {
    slug: 'var-haut-vaucluse-drome-herault',
    numero: 5,
    nom: 'Var, Haut-Vaucluse, Drôme et Hérault',
    sousTitre: 'Interventions plus lointaines, sur planification',
    couleur: 'steel',
    titreSeo: 'Cuisine professionnelle : Orange, Montpellier, Var | SODILAME',
    description:
      "Zone 5 : Orange, Bollène, Vaison-la-Romaine, Montpellier, Saint-Paul-Trois-Châteaux, Lorgues. Interventions planifiées sur cuisines professionnelles.",
    accroche:
      "Le bord de notre carte. Nous y allons pour des projets et des remplacements programmés, jamais en promettant l'urgence.",
    corps: [
      {
        h2: 'Ce que nous faisons — et ce que nous ne faisons pas',
        html: `<p>Cette zone dépasse notre rayon d'intervention naturel. Nous y allons, mais sur planification : installation d'une cuisine complète, remplacement d'un équipement lourd, mise en service, visite d'entretien programmée.</p>
<p>Ce que nous ne ferons pas, c'est vous promettre un dépannage d'urgence à Montpellier ou à Lorgues. Un technicien qui part de Saint-Martin-de-Crau perd sa demi-journée en trajet, et vous perdez le vôtre à l'attendre. Dans ce cas, nous vous le disons, et nous vous orientons si nécessaire.</p>`,
      },
      {
        h2: 'Pourquoi des clients nous appellent quand même de loin',
        html: `<p>Presque toujours pour la même raison : un matériel spécifique, une buanderie lourde, une calandre à remplacer, un projet que personne ne veut prendre parce qu'il demande un relevé d'accès sérieux et des moyens de manutention.</p>
<p>Ce sont des chantiers que nous préparons dans le détail — cotes de passage, moyens de levage, séquencement de la journée — et que nous exécutons en une intervention. C'est ce savoir-faire de manutention qui justifie le déplacement, pas le prix du matériel.</p>`,
      },
      {
        h2: 'Groupement des interventions',
        html: `<p>Sur cette zone, nous groupons systématiquement. Si vous êtes plusieurs établissements du même secteur à avoir un besoin, dites-le-nous : une tournée mutualisée fait baisser le coût de déplacement pour chacun, et c'est souvent ce qui rend le projet possible.</p>`,
      },
    ],
    communes: [
      "Plan-d'Aups", 'Nans-les-Pins', 'Orange', 'Bollène', 'Montpellier',
      'Saint-Clément-de-Rivière', 'Le Beausset', 'Vaison-la-Romaine', 'Rasteau',
      'Solérieux', 'Saint-Paul-Trois-Châteaux', 'Lorgues',
    ],
    villes: [],
  },
];

export const zonesNav = zones.map((z) => ({ nom: z.nom, url: `/zone-intervention/${z.slug}` }));

// Retrouve la zone d'une ville (pour le maillage interne des pages villes)
export const zoneDeLaVille = (slugVille) =>
  zones.find((z) => z.villes.includes(slugVille)) || null;

// Nombre total de communes listées
export const totalCommunes = zones.reduce((n, z) => n + z.communes.length, 0);
