// ---------------------------------------------------------------------------
// RÉALISATIONS — installations SODILAME, avec photos
//
// ⚠️  PHOTOS : uniquement celles prises par SODILAME sur ses chantiers.
//     Exportées en JPEG SANS métadonnées (ni GPS, ni appareil) : une photo
//     d'iPhone porte la position exacte du client.
// ⚠️  CLIENTS : règle de la direction (29/10/2026), on reste VAGUE. Jamais
//     de nom d'établissement : seulement son type (« un domaine », « un
//     hôtel ») et son secteur (« les Alpilles », « le pays d'Arles »), assez
//     larges pour qu'on ne puisse pas reconnaître le client. Un nom précis ne
//     s'écrit qu'avec l'accord écrit du client.
// ---------------------------------------------------------------------------
export const realisations = [
  {
    slug: 'miele-blanchisserie-2026-10',
    date: '2026-10-16',
    mois: 'octobre 2026',
    marque: 'miele-professional',
    collections: ['lave-linge-professionnels'],
    // Fiches produit sur lesquelles la réalisation s'affiche aussi.
    produits: ['PWM 514'],
    client: 'un domaine',
    lieu: 'Alpilles',
    titre: 'Deux lave-linge Miele PWM 514 pour la blanchisserie d’un domaine des Alpilles',
    texte:
      "Les deux anciennes laveuses Miele de la blanchisserie de ce domaine ont été remplacées par deux lave-linge Miele Professional PWM 514 de 14 kg, à commande tactile. Nos techniciens ont déposé les anciennes machines, mis en place les nouvelles, puis les ont raccordées et mises en service : la buanderie a repris son travail aussitôt.",
    photos: [
      {
        fichier: 'miele-blanchisserie-2026-10-avant.jpg', largeur: 1400, hauteur: 1050, etiquette: 'Avant',
        alt: 'Blanchisserie avant l’intervention : deux anciens lave-linge Miele en inox de part et d’autre d’un bac de lavage',
      },
      {
        fichier: 'miele-blanchisserie-2026-10-apres.jpg', largeur: 1400, hauteur: 1050, etiquette: 'Après',
        alt: 'La même blanchisserie après l’intervention : deux lave-linge Miele Professional PWM 514 gris acier en service',
      },
      {
        fichier: 'miele-blanchisserie-2026-10-detail.jpg', largeur: 900, hauteur: 1200, etiquette: 'La machine',
        alt: 'Lave-linge Miele Professional PWM 514 gris acier à écran tactile et arrêt d’urgence, après sa mise en service',
      },
    ],
  },
];

export const realisationsDeMarque = (slug) => realisations.filter((r) => r.marque === slug);
export const realisationsDeCollection = (slug) => realisations.filter((r) => r.collections.includes(slug));
export const realisationsDuProduit = (ref) => realisations.filter((r) => (r.produits || []).includes(ref));
