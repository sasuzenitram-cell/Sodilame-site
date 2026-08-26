// ---------------------------------------------------------------------------
// Configuration globale du site SODILAME
// Modifier CE FICHIER puis relancer `npm run build` pour répercuter partout.
// ---------------------------------------------------------------------------

export const site = {
  nom: 'SODILAME',
  baseline: 'Cuisines professionnelles',
  domaine: 'https://www.sodilame.com',
  langue: 'fr',
  anneeCreation: 1985,
  anneeCourante: 2026,
  ansExperience: 40, // valeur affichée (arrondie) — modifier ici uniquement

  // ---- Coordonnées (NAP — doivent être STRICTEMENT identiques à la fiche Google) ----
  telephone: '04 90 93 98 88',
  telephoneE164: '+33490939888',
  // ⚠️ Adresse réellement relevée aujourd'hui. Elle est sur le domaine .fr, qui n'est pas
  // affecté par la délégation DNS de sodilame.com vers Vercel. À basculer vers une adresse
  // @sodilame.com le jour où la messagerie sera migrée.
  email: 'sodilame@sodilame.fr',
  emailDevis: 'sodilame@sodilame.fr',
  adresse: {
    rue: '3 impasse des Apprentis',
    complement: 'ZA de la Chapelette',
    codePostal: '13310',
    ville: 'Saint-Martin-de-Crau',
    region: "Provence-Alpes-Côte d'Azur",
    pays: 'FR',
    lat: 43.631914,
    lng: 4.810175,
  },
  horaires: {
    texte: 'Lundi au jeudi : 8h–12h / 14h–17h15 — Vendredi : 8h–12h / 14h–16h',
    court: 'Lun–Jeu 8h–12h / 14h–17h15 · Ven 8h–12h / 14h–16h',
    schema: [
      { jours: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], ouvre: '08:00', ferme: '12:00' },
      { jours: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], ouvre: '14:00', ferme: '17:15' },
      { jours: ['Friday'], ouvre: '08:00', ferme: '12:00' },
      { jours: ['Friday'], ouvre: '14:00', ferme: '16:00' },
    ],
  },

  // ---- Carte Google (iframe de la fiche Google Business Profile réelle) -------
  carteEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.7811382884156!2d4.810175!3d43.631913999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6766a38aff351%3A0x5a2fc4214cf00a07!2sSodilame!5e0!3m2!1sfr!2sfr!4v1787400867232!5m2!1sfr!2sfr',

  // ---- Portail client -------------------------------------------------------
  portail: {
    url: 'https://mysodilame.app',
    nom: 'MySodilame',
  },

  // ---- Mentions légales -----------------------------------------------------
  legal: {
    raisonSociale: 'SODILAME',
    formeJuridique: 'SAS',
    siret: '', // à compléter
    rcs: '', // à compléter
    tvaIntra: '', // à compléter
    capital: '', // à compléter
    directeurPublication: 'Mathieu Martinez',
    hebergeur: {
      nom: 'Vercel Inc.',
      adresse: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
      site: 'https://vercel.com',
    },
  },

  // ---- Réseaux (laisser vide pour masquer) ---------------------------------
  reseaux: {
    google: '', // URL de la fiche Google Business Profile
    linkedin: '',
    facebook: '',
    instagram: '',
  },

  // ---- Google Search Console -------------------------------------------------
  // Méthode « balise HTML » : coller ici le SEUL contenu de l'attribut content=
  // fourni par Search Console (ex. 'AbC123...'), puis redéployer et cliquer Vérifier.
  // Laisser vide si la vérification est faite par enregistrement DNS TXT côté Vercel.
  googleVerification: '',

  // ---- Analytics ------------------------------------------------------------
  // Laisser vide tant que ce n'est pas configuré (aucun script chargé = aucun bandeau cookie nécessaire)
  gaId: '',
};

// ---- Contrats d'entretien ---------------------------------------------------
export const formules = [
  {
    nom: 'Essentiel',
    visites: '1 visite préventive par an',
    pour: 'Établissements à activité saisonnière ou parc d’équipements réduit',
    inclus: [
      'Visite annuelle de contrôle de l’ensemble du parc',
      'Contrôle d’étanchéité réglementaire des équipements frigorifiques concernés',
      'Rapport d’intervention détaillé',
      'Tarif main-d’œuvre préférentiel sur les dépannages',
    ],
  },
  {
    nom: 'Confort',
    visites: '2 visites préventives par an',
    pour: 'Restaurants et hôtels en activité toute l’année',
    inclus: [
      'Deux visites planifiées (avant et après haute saison)',
      'Contrôle d’étanchéité et tenue du registre F-Gas',
      'Nettoyage des condenseurs et remplacement des pièces d’usure',
      'Priorité de passage sur les demandes de dépannage',
      'Remise sur les pièces détachées',
    ],
  },
  {
    nom: 'Sérénité',
    visites: '4 visites préventives par an',
    pour: 'Collectivités, cuisines centrales, établissements de santé et gros parcs',
    inclus: [
      'Quatre visites planifiées dans l’année',
      'Suivi documentaire complet (F-Gas, HACCP, attestations)',
      'Priorité maximale d’intervention en cas de panne',
      'Remise renforcée sur pièces et main-d’œuvre',
      'Bilan annuel du parc avec plan de renouvellement chiffré',
    ],
  },
];

// ---- Navigation principale --------------------------------------------------
export const navPrincipale = [
  { label: 'Nos services', url: '/services' },
  { label: "Contrat d'entretien", url: '/services/contrat-entretien-cuisine-professionnelle' },
  { label: "Zone d'intervention", url: '/zone-intervention' },
  { label: 'Conseils', url: '/conseils' },
  { label: "L'entreprise", url: '/a-propos' },
];

// ---- Secteurs desservis (bloc réutilisable) ---------------------------------
export const secteurs = [
  { titre: 'Restaurants & brasseries', detail: 'indépendants, chaînes, food-courts', icone: 'restaurant' },
  { titre: 'Hôtels & campings', detail: 'petits-déjeuners, laverie, room service', icone: 'hotel' },
  { titre: 'Écoles & cantines', detail: 'self, liaison chaude et froide', icone: 'ecole' },
  { titre: 'Santé & EHPAD', detail: 'cliniques, maisons de retraite', icone: 'sante' },
  { titre: 'Collectivités & mairies', detail: 'marchés publics, cuisines centrales', icone: 'mairie' },
  { titre: 'Boulangeries & pâtisseries', detail: 'fours, chambres de pousse, froid', icone: 'boulangerie' },
  { titre: 'Traiteurs & food-trucks', detail: 'équipements mobiles et compacts', icone: 'traiteur' },
  { titre: "Bureaux d'études", detail: "prescripteurs et maîtres d'œuvre", icone: 'bureau' },
];

// ---- Étapes du parcours client ----------------------------------------------
export const etapes = [
  { titre: 'Prise de contact', texte: 'Vous décrivez votre projet ou votre panne. Nous qualifions le besoin par téléphone ou par mail sous 24 h ouvrées.' },
  { titre: 'Visite & étude', texte: 'Un technicien se déplace, relève les contraintes du local et propose une implantation ou un diagnostic.' },
  { titre: 'Devis détaillé', texte: 'Vous recevez un chiffrage clair, poste par poste, avec les délais de livraison et les options possibles.' },
  { titre: 'Installation & suivi', texte: 'Nous livrons, installons, raccordons et formons vos équipes. Puis nous assurons le SAV et l’entretien.' },
];
