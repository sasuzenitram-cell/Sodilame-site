// ---------------------------------------------------------------------------
// Configuration globale du site SODILAME
// Modifier CE FICHIER puis relancer `npm run build` pour répercuter partout.
// ---------------------------------------------------------------------------

export const site = {
  nom: 'SODILAME',
  baseline: 'Cuisines professionnelles',
  domaine: 'https://www.sodilame.com',
  langue: 'fr',
  anneeCreation: 1986,
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
    siren: '334 555 091',
    siret: '334 555 091 00035',
    rcs: '334 555 091 R.C.S. Tarascon',
    tvaIntra: 'FR77334555091',
    capital: '52 000 €',
    directeurPublication: 'Mathieu Martinez',
    hebergeur: {
      nom: 'Vercel Inc.',
      adresse: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
      site: 'https://vercel.com',
    },
  },

  // ---- Réseaux (laisser vide pour masquer) ---------------------------------
  reseaux: {
    // URL canonique de la fiche Google Business Profile, reconstruite à partir du
    // CID (0x5a2fc4214cf00a07) contenu dans l'iframe de la carte ci-dessus.
    // Plus stable qu'un lien share.google, qui peut expirer.
    google: 'https://maps.google.com/?cid=6498628434622679559',
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
    nom: 'My Sodilame',
    visites: '1 visite préventive par an',
    pour: 'Établissements à activité saisonnière ou parc d’équipements réduit',
    inclus: [
      'Visite annuelle de contrôle de l’ensemble du parc',
      'Contrôle d’étanchéité réglementaire des équipements frigorifiques concernés',
      'Nettoyage des condenseurs et contrôle des températures',
      'Rapport d’intervention détaillé, archivé dans votre espace client',
    ],
  },
  {
    nom: 'My Sodilame Plus',
    visites: '2 visites préventives par an',
    pour: 'Établissements en activité toute l’année, collectivités et gros parcs',
    inclus: [
      'Deux visites planifiées, avant et après la haute saison',
      'Contrôle d’étanchéité et tenue du registre F-Gas',
      'Remplacement anticipé des pièces d’usure',
      'Suivi documentaire complet (F-Gas, HACCP, attestations)',
      'Suivi renforcé de votre parc tout au long de l’année',
    ],
  },
];

// ---- Navigation principale --------------------------------------------------
export const navPrincipale = [
  { label: 'Nos services', url: '/services' },
  { label: "Zone d'intervention", url: '/zone-intervention' },
  { label: 'Conseils', url: '/conseils' },
  { label: "L'entreprise", url: '/a-propos' },
];

// ---- Secteurs desservis (bloc réutilisable) ---------------------------------
export const secteurs = [
  { titre: 'Restaurants & brasseries', detail: 'indépendants, chaînes, food-courts', icone: 'restaurant' },
  { titre: 'Bars & snacks', detail: 'verrerie, froid de bar, petite cuisine', icone: 'bar' },
  { titre: 'Hôtels & campings', detail: 'petits-déjeuners, laverie, buanderie', icone: 'hotel' },
  { titre: 'Boulangeries & pâtisseries', detail: 'fours, chambres de pousse, froid', icone: 'boulangerie' },
  { titre: 'Boucheries & commerces de bouche', detail: 'vitrines, chambres froides, labo', icone: 'boucherie' },
  { titre: 'Collectivités, cantines & EHPAD', detail: 'cuisines centrales, marchés publics', icone: 'mairie' },
  { titre: 'Traiteurs & food-trucks', detail: 'équipements mobiles et compacts', icone: 'traiteur' },
  { titre: "Bureaux d'études", detail: "prescripteurs et maîtres d'œuvre", icone: 'bureau' },
];

// ---- Étapes du parcours client ----------------------------------------------
export const etapes = [
  { titre: 'Votre appel', texte: 'Vous décrivez la panne ou le projet, nous qualifions le besoin au téléphone.' },
  { titre: 'Planification', texte: 'Nous fixons ensemble le créneau d’intervention le plus proche.' },
  { titre: 'Diagnostic', texte: 'Le technicien identifie la panne sur site, outillé et documenté.' },
  { titre: 'Réparation', texte: 'Pièce en stock : remise en route immédiate. Sinon, devis puis commande.' },
  { titre: 'Suivi', texte: 'Rapport d’intervention, conseils d’usage et suivi de votre parc.' },
];
