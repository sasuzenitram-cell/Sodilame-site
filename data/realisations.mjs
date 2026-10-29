// ---------------------------------------------------------------------------
// RÉALISATIONS — installations SODILAME, avec photos
//
// ⚠️  PHOTOS : uniquement celles prises par SODILAME sur ses chantiers.
//     Exportées en JPEG SANS métadonnées (ni GPS, ni appareil) : une photo
//     d'iPhone porte la position exacte du client.
// ⚠️  CLIENT ET LIEU : ne les nommer qu'avec l'accord du client. Tant que
//     `client` et `lieu` valent null, la réalisation reste anonyme.
// ---------------------------------------------------------------------------
export const realisations = [
  {
    slug: 'miele-blanchisserie-2026-10',
    date: '2026-10-16',
    mois: 'octobre 2026',
    marque: 'miele-professional',
    collections: ['lave-linge-professionnels'],
    client: null,
    lieu: null,
    titre: 'Deux lave-linge Miele Professional remplacés dans une blanchisserie',
    texte:
      "Les deux anciennes laveuses Miele de cette blanchisserie ont été remplacées par deux lave-linge Miele Professional de nouvelle génération, à commande tactile. Nos techniciens ont déposé les anciennes machines, mis en place les nouvelles, puis les ont raccordées et mises en service : la buanderie a repris son travail aussitôt.",
    photos: [
      {
        fichier: 'miele-blanchisserie-2026-10-avant.jpg', largeur: 1400, hauteur: 1050, etiquette: 'Avant',
        alt: 'Blanchisserie avant l’intervention : deux anciens lave-linge Miele en inox de part et d’autre d’un bac de lavage',
      },
      {
        fichier: 'miele-blanchisserie-2026-10-apres.jpg', largeur: 1400, hauteur: 1050, etiquette: 'Après',
        alt: 'La même blanchisserie après l’intervention : deux lave-linge Miele Professional gris acier en service',
      },
      {
        fichier: 'miele-blanchisserie-2026-10-detail.jpg', largeur: 900, hauteur: 1200, etiquette: 'La machine',
        alt: 'Lave-linge Miele Professional gris acier à écran tactile et arrêt d’urgence, après sa mise en service',
      },
    ],
  },
];

export const realisationsDeMarque = (slug) => realisations.filter((r) => r.marque === slug);
export const realisationsDeCollection = (slug) => realisations.filter((r) => r.collections.includes(slug));
