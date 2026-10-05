// ---------------------------------------------------------------------------
// OFFRES D'EMPLOI
//
// Source unique pour la page /recrutement, les pages d'offre, le schéma
// JobPosting lu par Google for Jobs, et la liste déroulante du formulaire de
// candidature. Ajouter une offre ici suffit : la page, le sitemap, le menu du
// formulaire et le balisage suivent.
//
// ⚠️  DEUX CHAMPS À SURVEILLER
//
//     `publieeLe` et `valideJusquau` ne sont pas décoratifs : Google for Jobs
//     retire une offre dont la date de validité est dépassée, et signale en
//     Search Console celles qui n'en portent pas. Une offre pourvue doit
//     passer à `active: false` — la page bascule alors en « poste pourvu »
//     plutôt que de disparaître (une page qui disparaît renvoie un 404 aux
//     candidats qui ont gardé le lien, et fait perdre le référencement acquis).
//
//     `salaire` est affiché ET balisé. La directive européenne 2023/970 sur la
//     transparence des rémunérations imposera de communiquer la rémunération
//     initiale ou sa fourchette avant le premier entretien ; sa transposition
//     française a pris du retard, mais afficher la fourchette est déjà la
//     bonne habitude — et c'est ce qui fait le plus monter le nombre de
//     candidatures sur un poste technique.
// ---------------------------------------------------------------------------

// Les candidatures ne vont pas dans la boîte partagée de l'équipe : un CV
// contient un nom, une adresse, un parcours, parfois une date de naissance. Il
// s'arrête à la direction. C'est aussi l'adresse que l'annonce diffusée sur les
// réseaux indique, et les deux doivent rester les mêmes.
export const emailRecrutement = 'direction@sodilame.fr';

export const offres = [
  {
    slug: 'technicien-maintenance-cuisine-professionnelle',
    active: true,

    titre: 'Technicien de maintenance en cuisine professionnelle (H/F)',
    titreCourt: 'Technicien de maintenance',
    contrat: 'CDI',
    contratSchema: 'FULL_TIME',
    tempsTravail: '35 h, du lundi au vendredi',
    lieu: 'Saint-Martin-de-Crau (13310)',
    publieeLe: '2026-10-05',
    valideJusquau: '2027-04-05',

    // Fourchette affichée et balisée. Décision du 05/10/2026 : la fourchette
    // seule, sans détailler le salaire d'embauche — la page est lue aussi par
    // les salariés en poste.
    salaire: {
      min: 2000,
      max: 3500,
      devise: 'EUR',
      unite: 'MONTH',
      texte: 'De 2 000 à 3 500 € brut par mois selon expérience',
    },

    accroche:
      "Dépanner un four qui s'arrête en plein service, remettre une chambre froide en température, installer une laverie neuve : un métier technique, varié, où l'on voit le résultat de sa journée.",

    resume:
      "Nous cherchons quelqu'un de curieux et débrouillard, à l'aise avec un tournevis comme avec un multimètre. Le matériel de cuisine professionnelle, ça s'apprend : nous nous chargeons de la formation.",

    missions: [
      "Dépanner les équipements de nos clients : fours, lave-vaisselle, lave-verres, matériel de froid, machines de laverie et de buanderie.",
      "Assurer les visites d'entretien préventif chez les établissements sous contrat.",
      "Installer et raccorder le matériel neuf, le mettre en service et montrer son fonctionnement à l'équipe de cuisine.",
      "Rédiger le compte rendu d'intervention et signaler ce qui devra être repris.",
    ],

    profil: [
      "De bonnes bases en électricité et en plomberie — le reste s'apprend chez nous.",
      "Le goût du diagnostic : comprendre <i>pourquoi</i> une machine est tombée en panne, pas seulement la faire repartir.",
      "Le permis B, indispensable : vous êtes en tournée chez les clients toute la journée.",
      "La capacité à travailler seul chez un client, et à dire quand on ne sait pas.",
    ],

    // Argument décisif sur ce poste : nous recrutons sur le potentiel, pas sur
    // la connaissance préalable d'un matériel que personne n'apprend à l'école.
    debutantAccepte: true,

    avantages: [
      { titre: 'CDI 35 h du lundi au vendredi', detail: "Pas d'astreinte le week-end imposée à l'embauche." },
      { titre: 'Véhicule technique équipé', detail: 'Outillage fourni, stock de pièces embarqué.' },
      { titre: 'Carte professionnelle pour les repas', detail: 'Les midis sont pris en charge.' },
      { titre: 'Heures supplémentaires payées', detail: 'Payées sur la fiche de paie, pas récupérées en repos.' },
      { titre: 'Formations constructeurs', detail: 'Rational, Winterhalter, Nordisk et les autres marques que nous installons.' },
      { titre: 'Évolution vers le froid', detail: "Possibilité de passer l'attestation d'aptitude aux fluides frigorigènes." },
    ],

    // Dire ce que le poste n'est pas vaut mieux qu'un candidat qui démissionne
    // au bout de six semaines.
    franchise: [
      "Vous passerez du temps sur la route : notre zone couvre les Bouches-du-Rhône, le Gard et le Vaucluse.",
      "Une cuisine professionnelle en plein service est chaude, bruyante et pressée. Y intervenir demande du sang-froid.",
      "Certaines journées finissent plus tard que prévu, parce qu'un restaurant doit rouvrir le soir même. Ces heures-là sont payées.",
    ],

    motsCles: [
      'technicien de maintenance',
      'technicien SAV cuisine professionnelle',
      'dépannage four mixte',
      'frigoriste',
      'Saint-Martin-de-Crau',
      'Arles',
      'Bouches-du-Rhône',
    ],
  },
];

export const offresActives = offres.filter((o) => o.active);

/** Les choix du menu « Poste » du formulaire de candidature. */
export const postes = [
  ...offresActives.map((o) => o.titreCourt),
  'Candidature spontanée',
];

/** Une candidature spontanée reste possible même sans offre ouverte. */
export const SPONTANEE = 'Candidature spontanée';
