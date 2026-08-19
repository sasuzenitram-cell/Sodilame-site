// ---------------------------------------------------------------------------
// Les 8 pages services. Un objet = une page.
// ---------------------------------------------------------------------------

export const services = [
  // =========================================================================
  {
    slug: 'conception-cuisine-professionnelle',
    nomCourt: 'Conception & plan 2D',
    nom: 'Conception de cuisine professionnelle et plan 2D',
    icone: 'conception',
    titreSeo: 'Conception de cuisine professionnelle & plan 2D | SODILAME',
    description:
      "Étude et conception de cuisine professionnelle en Provence : relevé du local, plan 2D coté, marche en avant, chiffrage détaillé. Devis gratuit.",
    resume:
      "Étude d'implantation, plan 2D coté, respect de la marche en avant et des normes HACCP, chiffrage détaillé avant travaux.",
    intro:
      "Une cuisine professionnelle mal conçue coûte cher tous les jours : des mètres parcourus en trop à chaque service, des flux propres et sales qui se croisent, un poste de plonge sous-dimensionné qui bloque toute la brigade. Nous concevons votre implantation à partir de votre carte, de vos volumes et de votre local réel — pas à partir d'un catalogue.",
    points: [
      'Relevé sur site du local, des arrivées fluides et des évacuations existantes',
      'Plan 2D coté, remis en PDF et exploitable par votre architecte ou votre bureau de contrôle',
      'Respect du principe de la marche en avant et des exigences du Paquet Hygiène',
      'Dimensionnement des puissances électriques, gaz, eau et extraction',
      'Chiffrage détaillé poste par poste, sans forfait opaque',
    ],
    sections: [
      {
        h2: "Ce que nous étudions avant de dessiner",
        html: `<p>Un plan de cuisine ne part jamais d'une feuille blanche. Avant de positionner le moindre équipement, nous relevons ce qui contraint réellement le projet :</p>
<ul>
<li><b>Le local</b> : dimensions exactes, hauteur sous plafond, position des poteaux, des portes et des ouvertures, nature du sol et pente d'évacuation.</li>
<li><b>Les fluides</b> : puissance électrique disponible au tableau, présence et diamètre de l'arrivée gaz, points d'eau chaude et froide, siphons de sol et bacs à graisses.</li>
<li><b>Votre activité</b> : nombre de couverts par service, type de carte, part du fait maison, saisonnalité, effectif en cuisine aux heures de pointe.</li>
<li><b>La réglementation applicable</b> : établissement recevant du public, exigences d'hygiène du Paquet Hygiène, contraintes de sécurité incendie liées à l'extraction.</li>
</ul>
<p>C'est ce relevé qui détermine si votre projet tient dans le budget annoncé, ou s'il faudra prévoir un renforcement électrique ou une reprise d'évacuation. Mieux vaut le savoir avant la commande du matériel qu'au moment de la livraison.</p>`,
      },
      {
        h2: 'La marche en avant, en pratique',
        html: `<p>La marche en avant est le principe qui veut que les denrées ne reviennent jamais en arrière dans le circuit : de la livraison au stockage, du stockage à la préparation, de la préparation à la cuisson, puis à l'envoi. Les produits sales et les déchets ne doivent jamais croiser les produits propres.</p>
<p>Dans un local neuf et vaste, c'est une évidence à dessiner. Dans un local existant de 25 m² à Arles ou dans une cave voûtée, cela demande des arbitrages : marche en avant dans le temps plutôt que dans l'espace, plages horaires dédiées, poste de décontamination unique. Nous vous expliquons quel compromis est défendable devant les services vétérinaires, et lequel ne l'est pas.</p>`,
      },
      {
        h2: 'Du plan au chantier',
        html: `<p>Le plan 2D que nous remettons comporte l'implantation cotée, la légende des équipements avec leurs références, les réservations de fluides et les puissances associées. Il est directement exploitable par votre électricien, votre plombier et votre maître d'œuvre.</p>
<p>Parce que nous installons ensuite ce que nous avons dessiné, nous n'avons aucun intérêt à produire un plan élégant mais irréalisable. C'est la différence avec un projet dessiné par un intervenant qui ne reviendra jamais sur le chantier.</p>`,
      },
    ],
    faq: [
      {
        q: "L'étude et le plan sont-ils payants ?",
        r: "<p>L'étude préalable et le plan d'implantation sont offerts dans le cadre d'un projet d'équipement que nous réalisons. Pour une mission d'étude seule, sans fourniture de matériel, nous établissons un devis d'honoraires.</p>",
      },
      {
        q: 'Travaillez-vous avec des architectes et des bureaux d’études ?',
        r: "<p>Régulièrement. Nous intervenons soit en amont pour cadrer les besoins techniques du lot cuisine, soit en aval pour chiffrer et réaliser un lot déjà défini par un bureau d'études. Nous fournissons les fiches techniques, les plans de réservation et les puissances nécessaires au dossier.</p>",
      },
      {
        q: 'Combien de temps faut-il entre l’étude et la mise en service ?',
        r: "<p>Comptez une à deux semaines pour le relevé et le plan, puis le délai de fabrication du matériel : de quelques jours pour du standard en stock à 8–12 semaines pour de l'inox sur mesure ou des matériels spécifiques. L'installation elle-même dure de 2 à 10 jours selon l'ampleur du chantier.</p>",
      },
      {
        q: 'Pouvez-vous concevoir une cuisine à partir d’un local vide ?',
        r: "<p>C'est le cas le plus fréquent et le plus confortable : sans contrainte d'existant, nous optimisons vraiment les flux. Nous vous indiquons alors les réservations à faire réaliser par les autres corps de métier avant notre intervention.</p>",
      },
    ],
  },

  // =========================================================================
  {
    slug: 'materiel-cuisson-professionnel',
    nomCourt: 'Matériel de cuisson',
    nom: 'Matériel de cuisson professionnel : vente et installation',
    icone: 'cuisson',
    titreSeo: 'Matériel de cuisson professionnel : fours & fourneaux | SODILAME',
    description:
      "Vente et installation de matériel de cuisson professionnel en Provence : fourneaux, fours mixtes, friteuses, pianos. Raccordement gaz et électrique.",
    resume:
      'Fourneaux, fours mixtes, friteuses, grillades, sauteuses, pianos sur mesure. Vente, installation et raccordement aux normes.',
    intro:
      "Le bloc cuisson est le poste qui structure toute la brigade : sa puissance, sa modularité et sa fiabilité conditionnent la carte que vous pouvez tenir. Nous vous conseillons sur ce qui correspond réellement à votre volume et à votre équipe, pas sur ce qui fait la plus belle photo.",
    points: [
      'Fourneaux et pianos de cuisson gaz, électriques ou induction',
      'Fours mixtes, fours à convection, fours à pizza, cellules de refroidissement',
      'Friteuses, grillades, plaques coup de feu, woks, bains-marie, sauteuses et marmites',
      'Raccordement gaz et électrique réalisé dans les règles de l’art',
      'Mise en service, réglages et formation de vos équipes à l’utilisation',
    ],
    sections: [
      {
        h2: 'Choisir la bonne énergie : gaz, électrique ou induction',
        html: `<p>Il n'y a pas de réponse universelle, mais des arbitrages assez clairs :</p>
<ul>
<li><b>Le gaz</b> reste imbattable en réactivité perçue et en coût d'exploitation, à condition d'avoir une arrivée dimensionnée et une extraction correcte. C'est encore le standard de la restauration traditionnelle.</li>
<li><b>L'électrique</b> simplifie l'installation et la sécurité, mais demande une puissance disponible au tableau qu'il faut vérifier avant tout engagement.</li>
<li><b>L'induction</b> offre un rendement très supérieur, moins de chaleur dégagée en cuisine — donc moins d'extraction et un meilleur confort de travail — mais impose des ustensiles compatibles et un investissement initial plus élevé.</li>
</ul>
<p>Dans les faits, beaucoup de nos clients partent sur un bloc mixte : gaz pour les feux vifs, induction pour les postes de finition et de maintien.</p>`,
      },
      {
        h2: 'Le four mixte, l’équipement qui change une cuisine',
        html: `<p>Un four mixte bien utilisé remplace plusieurs matériels et sécurise la régularité des cuissons. Les critères qui comptent au moment de choisir :</p>
<ul>
<li><b>La capacité</b> : 6, 10 ou 20 niveaux — à dimensionner sur le pic de production, pas sur la moyenne.</li>
<li><b>Le mode d'humidification</b> : injection directe (plus simple, moins cher) ou générateur de vapeur (plus stable sur des cuissons longues).</li>
<li><b>Le nettoyage automatique</b> : indispensable en collectivité, où il conditionne l'hygiène réelle du four sur la durée.</li>
<li><b>La sonde à cœur</b> : incontournable dès que vous produisez en liaison froide et que vous devez tracer vos températures.</li>
</ul>
<p>Nous ne vendons pas le four le plus cher du catalogue : nous vendons celui que vos équipes utiliseront réellement à 100 % de ses fonctions.</p>`,
      },
      {
        h2: 'Installation et conformité du raccordement',
        html: `<p>Une friteuse mal raccordée ou un fourneau gaz posé sans contrôle d'étanchéité, c'est un risque immédiat pour votre établissement et un motif de réserve à la première visite de contrôle. Nos techniciens réalisent le raccordement, contrôlent l'étanchéité, vérifient l'évacuation des produits de combustion et remettent les documents correspondants.</p>
<p>Nous assurons ensuite le <a href="/services/depannage-sav-cuisine-professionnelle">SAV</a> et l'<a href="/services/contrat-entretien-cuisine-professionnelle">entretien</a> du matériel que nous avons installé — ce qui nous rend, disons-le, plutôt attentifs à la qualité de la pose.</p>`,
      },
    ],
    faq: [
      {
        q: 'Vendez-vous du matériel sans installation ?',
        r: "<p>Oui, nous vendons du matériel neuf en direct, avec du stock disponible dans notre magasin de Saint-Martin-de-Crau. Nous vous conseillons cependant systématiquement sur la compatibilité électrique, gaz et évacuation avant l'achat : c'est la première source de mauvaise surprise à la livraison.</p>",
      },
      {
        q: 'Reprenez-vous l’ancien matériel ?',
        r: "<p>Nous assurons l'enlèvement et l'évacuation de l'ancien matériel dans le cadre d'un remplacement. Selon l'état et la marque, une reprise valorisée est parfois possible — à évaluer au cas par cas lors du devis.</p>",
      },
      {
        q: 'Quelles marques installez-vous ?',
        r: "<p>Nous travaillons avec les principaux fabricants européens de matériel de cuisson professionnelle. Le choix de la marque dépend du besoin, du budget et surtout de la disponibilité des pièces détachées dans la durée — un critère que nous prenons très au sérieux puisque c'est nous qui dépannons ensuite.</p>",
      },
      {
        q: 'Formez-vous les équipes à l’utilisation du matériel ?',
        r: "<p>Oui, la prise en main est comprise dans la mise en service. Pour les fours mixtes et les matériels programmables, nous prenons le temps de paramétrer les cycles avec votre chef plutôt que de laisser le manuel sur le passe.</p>",
      },
    ],
  },

  // =========================================================================
  {
    slug: 'froid-professionnel',
    nomCourt: 'Froid professionnel',
    nom: 'Froid professionnel : chambres froides, armoires et vitrines',
    icone: 'froid',
    titreSeo: 'Froid professionnel & chambre froide en Provence | SODILAME',
    description:
      "Installation et dépannage de froid professionnel dans le 13, 30 et 84 : chambres froides, armoires réfrigérées, vitrines. Frigoristes habilités F-Gas.",
    resume:
      'Chambres froides, armoires réfrigérées, tables négatives, vitrines. Conception, montage, mise en service et suivi F-Gas.',
    intro:
      "Le froid est le poste où la panne coûte le plus cher : ce n'est pas la réparation qui vous ruine, c'est la marchandise perdue et le service annulé. C'est aussi le poste le plus réglementé, avec des obligations de contrôle d'étanchéité et de traçabilité qui vous engagent. Nos frigoristes sont titulaires de l'attestation d'aptitude à la manipulation des fluides frigorigènes.",
    points: [
      'Chambres froides positives et négatives, montées sur site ou en panneaux modulaires',
      'Armoires réfrigérées, tables inox réfrigérées, soubassements, cellules de refroidissement rapide',
      'Vitrines réfrigérées, saladettes, meubles de service et back-bars',
      "Groupes logés ou à distance, dimensionnés sur votre volume et votre taux d'ouverture",
      'Contrôle d’étanchéité, tenue du registre F-Gas et attestations réglementaires',
    ],
    sections: [
      {
        h2: 'Bien dimensionner une chambre froide',
        html: `<p>Une chambre froide sous-dimensionnée ne tient pas la température aux heures de pointe ; surdimensionnée, elle coûte en investissement et en consommation. Le calcul dépend de quatre facteurs :</p>
<ul>
<li><b>Le volume à stocker</b>, exprimé en jours de rotation plutôt qu'en mètres cubes bruts.</li>
<li><b>La température de consigne</b> : positive (0 à +4 °C) pour le frais, négative (−18 à −20 °C) pour le surgelé.</li>
<li><b>Le taux d'ouverture de la porte</b> : une chambre ouverte trente fois par service n'a rien à voir avec une réserve ouverte deux fois par jour.</li>
<li><b>Les apports thermiques</b> : température ambiante du local, présence d'un bloc cuisson à proximité, qualité de l'isolation des panneaux.</li>
</ul>
<p>Une erreur fréquente consiste à installer une chambre froide contre un mur exposé plein sud sans surisolation. En Provence, avec des étés à 38 °C, le groupe tourne en continu et son espérance de vie s'effondre.</p>`,
      },
      {
        h2: 'Vos obligations réglementaires sur les fluides frigorigènes',
        html: `<p>Les équipements contenant des gaz à effet de serre fluorés (HFC) sont soumis à la réglementation européenne dite <b>F-Gas</b>. Concrètement, en tant qu'exploitant :</p>
<ul>
<li>Vous devez faire réaliser des <b>contrôles d'étanchéité périodiques</b>, à une fréquence qui dépend de la charge de fluide de l'équipement.</li>
<li>Ces contrôles doivent être effectués par une <b>entreprise détentrice d'une attestation de capacité</b>, par du personnel titulaire de l'attestation d'aptitude.</li>
<li>Vous devez tenir à jour un <b>registre</b> (ou fiche d'intervention) mentionnant les charges, les récupérations et les contrôles.</li>
</ul>
<div class="callout"><p><b>Ce que nous faisons :</b> nous réalisons les contrôles, nous tenons le registre à jour et nous déposons les attestations dans votre espace client, de sorte qu'en cas de contrôle vous n'ayez qu'un dossier à ouvrir. C'est inclus dans nos <a href="/services/contrat-entretien-cuisine-professionnelle">contrats d'entretien</a>.</p></div>
<p>Cette page présente le cadre général tel que nous l'appliquons chez nos clients ; elle ne remplace pas la lecture des textes en vigueur ni l'avis des services compétents pour votre situation particulière.</p>`,
      },
      {
        h2: 'Panne de froid : ce qu’il faut faire dans l’heure',
        html: `<p>Avant même de nous appeler, trois réflexes limitent la casse :</p>
<ol>
<li><b>Relevez la température</b> et notez l'heure. C'est cette traçabilité qui déterminera ce que vous pouvez conserver ou non.</li>
<li><b>Ne rouvrez plus la porte.</b> Une chambre froide fermée tient plusieurs heures ; ouverte toutes les dix minutes, elle monte en flèche.</li>
<li><b>Transférez le plus sensible</b> vers un autre équipement ou une solution de dépannage, en priorisant les produits les plus périssables.</li>
</ol>
<p>Appelez ensuite le <a href="tel:+33490939888">04 90 93 98 88</a>. Nous qualifions la panne au téléphone : dans un cas sur deux, la description du symptôme (givre anormal, groupe qui ne démarre pas, ventilateur bruyant) nous permet de partir avec la bonne pièce dès le premier déplacement.</p>`,
      },
    ],
    faq: [
      {
        q: 'Intervenez-vous en urgence sur une panne de froid ?',
        r: "<p>Oui, c'est notre priorité d'intervention car une panne de froid menace directement vos marchandises. Nous qualifions la panne au téléphone, vérifions la disponibilité de la pièce dans notre stock et planifions le déplacement. Les clients sous contrat d'entretien passent en priorité.</p>",
      },
      {
        q: 'Vos techniciens sont-ils habilités à manipuler les fluides frigorigènes ?',
        r: "<p>Oui. La manipulation des fluides frigorigènes est réservée aux personnels titulaires de l'attestation d'aptitude, au sein d'entreprises détentrices d'une attestation de capacité. C'est notre cas, et c'est ce qui nous permet de délivrer les documents réglementaires après intervention.</p>",
      },
      {
        q: 'Faut-il un groupe logé ou un groupe à distance ?',
        r: "<p>Le groupe logé est plus simple et moins coûteux à installer, mais il rejette sa chaleur dans le local et fait du bruit. Le groupe à distance, déporté en toiture ou en local technique, améliore nettement le confort de travail et le rendement, au prix d'une installation plus lourde. Pour une chambre froide en plein cœur d'une cuisine, le groupe à distance se rentabilise souvent vite.</p>",
      },
      {
        q: 'Faites-vous le montage de chambres froides sur mesure ?',
        r: "<p>Oui, nous montons des chambres froides en panneaux modulaires adaptés aux dimensions de votre local, y compris dans des configurations contraintes (angles, hauteur limitée, passage de porte étroit). Nous prenons les cotes sur place avant commande.</p>",
      },
    ],
  },

  // =========================================================================
  {
    slug: 'laverie-buanderie-professionnelle',
    nomCourt: 'Laverie & buanderie',
    nom: 'Laverie et buanderie professionnelle',
    icone: 'laverie',
    titreSeo: 'Laverie professionnelle : lave-vaisselle & tunnels | SODILAME',
    description:
      "Installation de laveries professionnelles en Provence : lave-vaisselle à capot, tunnels de lavage, machines à laver et sèche-linge professionnels.",
    resume:
      'Lave-vaisselle à capot, tunnels de lavage, laveries complètes, machines à laver et sèche-linge professionnels.',
    intro:
      "La plonge est le poste le plus souvent négligé en conception et le premier à créer un goulot d'étranglement en service. Une laverie bien dimensionnée, correctement alimentée en eau adoucie et bien ventilée, c'est un service qui se termine à l'heure et une équipe qui reste.",
    points: [
      'Lave-vaisselle sous-comptoir, à capot, à avancement automatique et tunnels de lavage',
      'Laveries complètes en inox : tables d’entrée et de sortie, bacs, douchettes, étagères',
      'Machines à laver et sèche-linge professionnels pour hôtellerie, campings et EHPAD',
      'Traitement de l’eau : adoucisseur et osmoseur adaptés à la dureté locale',
      'Ventilation et évacuation des buées, souvent oubliées en rénovation',
    ],
    sections: [
      {
        h2: 'Adoucisseur ou osmoseur : la question qui décide de la durée de vie de votre machine',
        html: `<p>L'eau de notre région est calcaire. Sur un lave-vaisselle professionnel, le calcaire entartre la résistance du surchauffeur, réduit le débit des bras de lavage et laisse un voile blanc sur les verres. Résultat : consommation en hausse, résultats de lavage en baisse, et une panne prématurée que beaucoup attribuent à tort à la qualité de la machine.</p>
<ul>
<li><b>L'adoucisseur</b> retire le calcaire et protège la machine. C'est le minimum indispensable dans le 13, le 30 et le 84.</li>
<li><b>L'osmoseur</b> va plus loin en supprimant aussi les sels minéraux : c'est ce qui permet un séchage sans trace, sans essuyage manuel. Indispensable dès que vous servez du verre à pied.</li>
</ul>
<p>Le surcoût d'un traitement d'eau se rembourse sur la durée de vie de la machine et sur le temps d'essuyage économisé en fin de service.</p>`,
      },
      {
        h2: 'Capot, avancement ou tunnel : dimensionner sur le pic',
        html: `<p>Le bon critère n'est pas le nombre de couverts par jour mais le nombre de paniers à traiter dans l'heure la plus chargée :</p>
<table>
<tr><th>Configuration</th><th>Ordre de grandeur</th><th>Typiquement</th></tr>
<tr><td>Sous-comptoir</td><td>Petits volumes, verrerie de bar</td><td>Bars, snacks, offices</td></tr>
<tr><td>Capot</td><td>Jusqu'à ~60 paniers/heure</td><td>Restaurants traditionnels</td></tr>
<tr><td>Avancement automatique</td><td>Volumes soutenus et continus</td><td>Brasseries, hôtels, cantines</td></tr>
<tr><td>Tunnel</td><td>Gros volumes en flux continu</td><td>Cuisines centrales, collectivités</td></tr>
</table>
<p>Ces repères servent à cadrer la discussion : le dimensionnement précis se fait sur votre organisation réelle, la taille des paniers et le personnel affecté à la plonge.</p>`,
      },
      {
        h2: 'La buanderie, un poste à part entière',
        html: `<p>Pour les hôtels, campings, EHPAD et cliniques, le linge est une activité industrielle à part entière : machines à laver essoreuses, sèche-linge, calandres. Les points qui font la différence sont l'accès à l'eau chaude, l'évacuation des buées et la charge au sol pour les machines de forte capacité, en particulier lorsque la buanderie n'est pas au rez-de-chaussée.</p>
<p>Nous étudions ces contraintes avant la commande, parce qu'un plancher qui ne supporte pas l'essorage se découvre trop tard.</p>`,
      },
    ],
    faq: [
      {
        q: 'Mes verres sortent avec des traces blanches, que faire ?',
        r: "<p>Dans la grande majorité des cas, c'est un problème de dureté de l'eau, pas de produit. Vérifiez d'abord l'état de votre adoucisseur (régénération, niveau de sel). Si le problème persiste malgré un adoucisseur en bon état, seul un osmoseur permet un séchage sans trace. Nous pouvons mesurer la dureté sur place lors d'un passage.</p>",
      },
      {
        q: 'Installez-vous des laveries en inox sur mesure ?',
        r: "<p>Oui. Tables d'entrée et de sortie, bacs, dosserets, étagères hautes : nous faisons réaliser l'inox aux cotes de votre local, ce qui est presque toujours nécessaire dès qu'on sort du plan rectangulaire idéal.</p>",
      },
      {
        q: 'Assurez-vous le dépannage des lave-vaisselle professionnels ?',
        r: "<p>Oui, comme pour l'ensemble du matériel que nous vendons. Les pannes les plus fréquentes (résistance, pompe de vidange, doseur, bras de lavage) sont couvertes par les pièces que nous gardons en stock.</p>",
      },
    ],
  },

  // =========================================================================
  {
    slug: 'installation-mise-en-service',
    nomCourt: 'Installation & mise en service',
    nom: 'Installation et mise en service de cuisine professionnelle',
    icone: 'installation',
    titreSeo: 'Installation de cuisine professionnelle en Provence | SODILAME',
    description:
      "Livraison, manutention, raccordements, mise en service et formation : SODILAME installe votre cuisine professionnelle dans les Bouches-du-Rhône, le Gard et le Vaucluse.",
    resume:
      'Livraison, manutention, raccordements fluides, mise en route et formation de vos équipes.',
    intro:
      "Entre le matériel commandé et le matériel qui fonctionne, il y a un camion, un monte-charge trop étroit, une porte de 78 cm, un tableau électrique saturé et une brigade qui reprend le service le lendemain. L'installation, c'est ce métier-là : anticiper les obstacles avant qu'ils n'arrêtent le chantier.",
    points: [
      'Livraison et manutention, y compris en accès difficile ou en étage',
      'Pose, mise à niveau, assemblage des lignes et raccordement des fluides',
      'Coordination avec vos autres corps de métier (électricien, plombier, maçon)',
      'Mise en service, réglages, contrôles de sécurité et essais en charge',
      'Formation de vos équipes et remise du dossier technique',
    ],
    sections: [
      {
        h2: 'Ce que nous vérifions avant le jour J',
        html: `<p>La veille d'une livraison, nous avons déjà validé le chemin du matériel : largeur de la porte la plus étroite, angle du couloir, hauteur sous linteau, présence d'un seuil, résistance du sol. Une chambre froide se monte sur place, mais un four mixte 20 niveaux ne se plie pas.</p>
<p>Nous vérifions également que les réservations sont prêtes : arrivée électrique à la bonne puissance et au bon endroit, alimentation gaz avec vanne d'arrêt accessible, arrivées et évacuations d'eau, siphon de sol. Quand ces points ne sont pas prêts, nous le signalons avant la livraison — un camion qui repart chargé coûte à tout le monde.</p>`,
      },
      {
        h2: 'Travailler sans arrêter votre exploitation',
        html: `<p>La plupart de nos chantiers de remplacement se déroulent dans des établissements qui continuent de servir. Nous organisons alors l'intervention sur les jours de fermeture, tôt le matin ou entre deux services, et nous procédons par lots pour qu'il reste toujours un poste de cuisson et un point de froid opérationnels.</p>
<p>Sur les créations complètes, nous nous calons sur le planning du maître d'œuvre et nous intervenons après les corps d'état qui salissent — carrelage, peinture — mais avant la réception, pour que les essais soient faits avec vous.</p>`,
      },
      {
        h2: 'La mise en service, ce n’est pas « brancher »',
        html: `<p>À la mise en service, nous contrôlons l'étanchéité des raccordements gaz, les puissances absorbées, les températures atteintes, le sens de rotation des moteurs, l'équilibrage de l'extraction et la mise à la terre. Puis nous faisons tourner le matériel en charge, avec votre équipe présente.</p>
<p>Nous remettons enfin le dossier : notices, certificats, références et numéros de série. Ces informations sont également enregistrées dans votre espace client, pour qu'en cas de panne à 19 h un soir de service, personne n'ait à chercher la plaque signalétique derrière l'appareil.</p>`,
      },
    ],
    faq: [
      {
        q: 'Intervenez-vous en dehors des heures d’ouverture ?',
        r: "<p>Oui, sur planification. Les remplacements dans des établissements en activité se font très souvent tôt le matin, le lundi ou sur un jour de fermeture. Nous l'organisons avec vous au moment du devis.</p>",
      },
      {
        q: 'Assurez-vous aussi l’évacuation de l’ancien matériel ?',
        r: "<p>Oui, l'enlèvement et le traitement de l'ancien matériel sont chiffrés dans le devis de remplacement. Les équipements frigorifiques font l'objet d'une récupération des fluides dans les règles avant destruction.</p>",
      },
      {
        q: 'Faites-vous les travaux d’électricité et de plomberie ?',
        r: "<p>Nous réalisons les raccordements terminaux de nos équipements. Les travaux de réseau amont — création de circuits, renforcement du tableau, création d'évacuations — relèvent de vos corps d'état, avec lesquels nous nous coordonnons. Nous pouvons vous mettre en relation avec des partenaires locaux si vous n'en avez pas.</p>",
      },
    ],
  },

  // =========================================================================
  {
    slug: 'extraction-ventilation-cuisine',
    nomCourt: 'Extraction & ventilation',
    nom: 'Extraction et ventilation de cuisine professionnelle',
    icone: 'extraction',
    titreSeo: 'Hotte & extraction de cuisine professionnelle | SODILAME Provence',
    description:
      "Hottes, caissons d'extraction, compensation d'air et gaines pour cuisines professionnelles dans le 13, 30 et 84. Dimensionnement aux normes.",
    resume:
      "Hottes, caissons d'extraction, compensation d'air, gaines et filtres. Dimensionnement aux normes.",
    intro:
      "Une extraction mal dimensionnée se voit tout de suite : buées qui stagnent, odeurs qui partent en salle, chaleur insoutenable au piano, portes qui claquent à cause de la dépression. Elle se paie aussi en visite de contrôle et en risque incendie, car les conduits chargés de graisse sont un vecteur de propagation majeur.",
    points: [
      'Hottes murales, centrales et à induction, avec filtres à chocs ou à cyclones',
      "Caissons d'extraction et moteurs adaptés au débit et à la perte de charge réelle",
      "Compensation d'air neuf : le point le plus souvent oublié en rénovation",
      'Réseaux de gaines, trappes de visite et registres coupe-feu',
      'Nettoyage et dégraissage périodique des circuits',
    ],
    sections: [
      {
        h2: 'Extraire, oui — mais aussi compenser',
        html: `<p>Une hotte extrait de l'air. Si rien ne le remplace, la cuisine se met en dépression : les portes deviennent dures à ouvrir, les flammes des brûleurs se couchent, les odeurs sont aspirées depuis la salle vers la cuisine, et le rendement de l'extraction s'effondre. En hiver, l'air compensé arrive par toutes les infiltrations disponibles — c'est-à-dire par le plus froid.</p>
<p>La compensation d'air neuf, idéalement tempérée, fait partie intégrante du dimensionnement. C'est le poste que l'on retire le plus souvent d'un devis pour faire baisser le prix, et celui qu'il faut réinstaller six mois plus tard.</p>`,
      },
      {
        h2: 'La graisse dans les conduits, un sujet de sécurité incendie',
        html: `<p>Les dépôts de graisse dans les hottes, les filtres et les gaines constituent un combustible idéal. Un départ de feu au niveau du bloc cuisson se propage alors dans tout le réseau, souvent jusqu'en toiture. C'est le scénario redouté des pompiers et des assureurs.</p>
<ul>
<li><b>Les filtres</b> se nettoient très fréquemment — idéalement en lave-vaisselle, plusieurs fois par semaine selon l'activité.</li>
<li><b>Les conduits</b> doivent faire l'objet d'un dégraissage périodique par une entreprise spécialisée, avec remise d'un certificat.</li>
<li><b>Les trappes de visite</b> doivent exister et rester accessibles : sans elles, aucun nettoyage sérieux du réseau n'est possible.</li>
</ul>
<div class="callout"><p><b>À vérifier dans votre contrat d'assurance :</b> beaucoup de polices multirisques professionnelles conditionnent la garantie incendie à un entretien périodique documenté des circuits d'extraction. Conservez les certificats de dégraissage.</p></div>`,
      },
      {
        h2: 'Rénover une extraction existante',
        html: `<p>Sur un local repris, nous commençons par mesurer le débit réel plutôt que de nous fier à l'étiquette du moteur. Il n'est pas rare de trouver des installations qui extraient la moitié de ce qu'elles devraient, à cause d'un réseau sous-dimensionné, de coudes multipliés ou d'un moteur fatigué.</p>
<p>Selon le diagnostic, l'intervention va du simple remplacement du caisson à la reprise du réseau et à l'ajout d'une centrale de compensation. Nous chiffrons les deux scénarios pour que vous puissiez arbitrer en connaissance de cause.</p>`,
      },
    ],
    faq: [
      {
        q: 'À quelle fréquence faut-il dégraisser les conduits d’extraction ?',
        r: "<p>La fréquence dépend de votre activité : une cuisine avec beaucoup de fritures et de grillades encrasse bien plus vite qu'un établissement de cuisine vapeur. Un dégraissage annuel constitue une base fréquemment retenue, à porter à deux fois par an pour les activités très grasses. Reportez-vous aux exigences de votre assureur et aux prescriptions applicables à votre établissement.</p>",
      },
      {
        q: 'Ma cuisine est en dépression, portes dures et odeurs en salle. Que faire ?',
        r: "<p>C'est le symptôme classique d'une extraction sans compensation d'air suffisante. La solution passe par l'ajout d'une arrivée d'air neuf dimensionnée, éventuellement tempérée. Nous mesurons les débits sur place avant de proposer quoi que ce soit.</p>",
      },
      {
        q: 'Installez-vous des hottes à induction ou à cyclone ?',
        r: "<p>Oui. Les hottes à cyclones ou à induction offrent une meilleure captation avec un débit d'extraction plus faible, donc moins d'air à compenser et moins de consommation. Le surcoût initial se justifie surtout sur les blocs cuisson importants.</p>",
      },
    ],
  },

  // =========================================================================
  {
    slug: 'depannage-sav-cuisine-professionnelle',
    nomCourt: 'Dépannage & SAV',
    nom: 'Dépannage et SAV de cuisine professionnelle',
    icone: 'depannage',
    titreSeo: 'Dépannage cuisine professionnelle 13, 30, 84 | SODILAME — 04 90 93 98 88',
    description:
      "Dépannage de cuisine professionnelle en Provence : froid, cuisson, laverie. Pièces détachées en stock. Appelez le 04 90 93 98 88.",
    resume:
      'Intervention rapide sur panne de froid, de cuisson ou de laverie, avec pièces détachées en stock.',
    intro:
      "Quand une chambre froide lâche un vendredi soir ou qu'un four s'arrête à midi, ce n'est pas un devis qu'il vous faut, c'est un technicien et la bonne pièce. Notre magasin de Saint-Martin-de-Crau est là pour ça : les pièces d'usure les plus courantes sont en stock, avec une livraison possible sous deux heures sur notre secteur.",
    points: [
      'Dépannage froid : chambres froides, armoires, vitrines, tables réfrigérées',
      'Dépannage cuisson : fours, fourneaux, friteuses, grillades, bains-marie',
      'Dépannage laverie : lave-vaisselle à capot, tunnels, machines à laver',
      'Diagnostic téléphonique pour partir avec la bonne pièce dès le premier passage',
      'Techniciens salariés SODILAME, formés aux matériels que nous installons',
    ],
    sections: [
      {
        h2: 'Comment se déroule une demande de dépannage',
        html: `<ol>
<li><b>Vous appelez le <a href="tel:+33490939888">04 90 93 98 88</a></b> (ou vous ouvrez une demande depuis votre espace client, ce qui nous donne directement le modèle et le numéro de série).</li>
<li><b>Nous qualifions la panne</b> : marque, modèle, symptôme, code défaut affiché, ancienneté. Cette étape de deux minutes évite très souvent un second déplacement.</li>
<li><b>Nous vérifions la disponibilité de la pièce</b> dans notre stock, ou nous la commandons en annonçant un délai réaliste.</li>
<li><b>Le technicien intervient</b>, répare, teste en charge et rédige un rapport d'intervention.</li>
<li><b>Le rapport est archivé</b> dans votre espace client, avec les pièces posées et les préconisations éventuelles.</li>
</ol>`,
      },
      {
        h2: 'Pourquoi le stock de pièces change tout',
        html: `<p>Sur un dépannage de cuisine professionnelle, le délai n'est presque jamais lié à la disponibilité d'un technicien : il est lié à la disponibilité de la pièce. Un thermostat, un pressostat, une résistance, un ventilateur d'évaporateur, une pompe de vidange, un doseur — ce sont toujours les mêmes composants qui lâchent.</p>
<p>C'est pourquoi nous maintenons un stock physique sur place plutôt que de tout commander à la demande. C'est un investissement en fonds de roulement, mais c'est ce qui fait la différence entre « on passe demain » et « on passe la semaine prochaine ».</p>`,
      },
      {
        h2: 'Réparer ou remplacer : notre position',
        html: `<p>Nous réparons tant que la réparation est économiquement et techniquement raisonnable. Quand le coût de la remise en état approche celui d'un matériel neuf, ou quand les pièces ne sont plus approvisionnables, nous vous le disons clairement et nous chiffrons les deux options.</p>
<p>Nous préférons perdre une intervention que de facturer une réparation sur un appareil condamné. Notre modèle repose sur des clients qui rappellent, pas sur des dépannages à répétition.</p>`,
      },
    ],
    faq: [
      {
        q: 'Quels sont vos délais d’intervention ?',
        r: "<p>Les pannes de froid sont traitées en priorité. Les délais dépendent de la charge du planning, de votre localisation et de la disponibilité de la pièce ; les clients sous contrat d'entretien bénéficient d'une priorité de passage. Appelez-nous, nous vous annonçons un créneau réaliste plutôt qu'une promesse.</p>",
      },
      {
        q: 'Dépannez-vous du matériel que vous n’avez pas vendu ?',
        r: "<p>Oui, dans la mesure où les pièces restent approvisionnables. Donnez-nous la marque, le modèle et le numéro de série lors de l'appel : nous vérifions avant de nous déplacer.</p>",
      },
      {
        q: 'Comment est facturé un dépannage ?',
        r: "<p>Le déplacement et la main-d'œuvre sont facturés selon nos tarifs en vigueur, auxquels s'ajoutent les pièces. Les clients sous contrat d'entretien bénéficient d'un tarif préférentiel sur la main-d'œuvre et d'une remise sur les pièces.</p>",
      },
      {
        q: 'Puis-je demander une intervention en ligne ?',
        r: `<p>Oui, depuis votre espace client. La demande est automatiquement rattachée au bon équipement de votre parc, ce qui nous évite de vous rappeler pour connaître le modèle exact.</p>`,
      },
    ],
  },

  // =========================================================================
  {
    slug: 'contrat-entretien-cuisine-professionnelle',
    nomCourt: "Contrat d'entretien",
    nom: "Contrat d'entretien de cuisine professionnelle",
    icone: 'contrat',
    titreSeo: "Contrat d'entretien de cuisine professionnelle | SODILAME",
    description:
      "Contrat d'entretien préventif pour cuisine professionnelle en Provence : visites planifiées, contrôle F-Gas, priorité de dépannage. Audit gratuit.",
    resume:
      "Visites planifiées, contrôles réglementaires, priorité d'intervention et suivi documentaire dans votre espace client.",
    intro:
      "Une chambre froide qui lâche un vendredi soir, c'est un service annulé et des marchandises perdues. L'entretien préventif ne supprime pas la panne, mais il en déplace la très grande majorité : on remplace une pièce d'usure lors d'une visite planifiée, plutôt qu'en urgence un soir de coup de feu.",
    points: [
      'Visites préventives planifiées selon votre activité, de 1 à 4 par an',
      'Contrôle d’étanchéité et tenue du registre F-Gas pour les équipements concernés',
      'Nettoyage des condenseurs, contrôle des températures, remplacement des pièces d’usure',
      'Priorité d’intervention sur les demandes de dépannage',
      'Tarif main-d’œuvre préférentiel et remise sur les pièces détachées',
      'Rapports et attestations centralisés dans votre espace client',
    ],
    sections: [
      {
        h2: 'Ce que contient une visite préventive',
        html: `<p>Une visite n'est pas un passage de courtoisie. Sur chaque équipement du parc, le technicien contrôle et consigne :</p>
<ul>
<li><b>Sur le froid</b> : températures de consigne et réelles, état du condenseur et de l'évaporateur, dégivrage, joints de porte, charge en fluide et contrôle d'étanchéité lorsque l'équipement y est soumis.</li>
<li><b>Sur la cuisson</b> : étanchéité et pression gaz, état des brûleurs et des injecteurs, sécurités de flamme, thermostats, joints de porte de four, état des résistances.</li>
<li><b>Sur la laverie</b> : entartrage, doseurs de produit, bras de lavage, filtres, température de rinçage, état de l'adoucisseur.</li>
<li><b>Sur l'extraction</b> : état d'encrassement des filtres, fonctionnement du caisson, ventilation générale.</li>
</ul>
<p>Chaque anomalie est notée avec un niveau de priorité : à traiter immédiatement, à prévoir au prochain passage, ou simple point de vigilance. Vous savez ainsi ce qui va vous tomber dessus dans les six mois.</p>`,
      },
      {
        h2: "L'audit gratuit : le point de départ",
        html: `<p>Nous ne chiffrons pas un contrat d'entretien sans avoir vu votre parc. Un technicien passe dans votre établissement, recense les équipements — marque, modèle, numéro de série, année, état — et vous remet un rapport avec les priorités d'intervention et une proposition de rythme de visite.</p>
<p>Cet audit est gratuit et sans engagement. Même si vous ne souscrivez pas de contrat, l'inventaire de votre parc vous reste acquis : c'est déjà une base précieuse pour anticiper vos renouvellements et pour vos échanges avec votre assureur ou votre expert-comptable.</p>`,
      },
      {
        h2: 'Nos trois formules',
        html: `<p>La différence tient au nombre de visites annuelles et au niveau de priorité, pas à la qualité du travail réalisé. Le bon rythme dépend de l'intensité de votre exploitation et de la criticité de votre parc.</p>`,
        formules: true,
      },
      {
        h2: 'Ce que le contrat ne fait pas',
        html: `<p>Soyons clairs, parce que c'est ce qui crée les déceptions : un contrat d'entretien n'est pas une assurance tous risques. Il ne couvre pas le remplacement d'un compresseur qui casse, ni les dégâts liés à une mauvaise utilisation, ni le renouvellement d'un matériel en fin de vie.</p>
<p>Ce qu'il fait : réduire fortement la fréquence des pannes, vous mettre en règle sur les contrôles obligatoires, vous faire passer en priorité quand une panne survient quand même, et vous donner une visibilité sur l'état réel de votre parc. Les pièces et la main-d'œuvre des dépannages restent facturées, à tarif préférentiel.</p>`,
      },
    ],
    faq: [
      {
        q: "Un contrat d'entretien est-il obligatoire ?",
        r: "<p>L'entretien préventif en tant que tel n'est pas une obligation générale, mais plusieurs contrôles le sont : contrôle d'étanchéité des équipements contenant des fluides frigorigènes selon la réglementation F-Gas, entretien des circuits d'extraction, traçabilité des températures dans le cadre de votre plan de maîtrise sanitaire. Un contrat permet de regrouper ces obligations et d'en conserver les preuves. Vérifiez également les exigences propres à votre contrat d'assurance.</p>",
      },
      {
        q: "Combien coûte un contrat d'entretien ?",
        r: "<p>Le tarif dépend du nombre et du type d'équipements, de la formule choisie et de votre localisation. C'est précisément l'objet de l'audit gratuit : établir l'inventaire réel avant de chiffrer. Nous ne pratiquons pas de tarif forfaitaire au couvert, qui ne reflète rien.</p>",
      },
      {
        q: 'Puis-je souscrire pour une partie seulement de mes équipements ?',
        r: "<p>Oui. Beaucoup de clients commencent par le froid, qui est le poste le plus critique et le plus réglementé, puis étendent au reste du parc. Nous établissons le contrat sur la liste d'équipements que vous retenez.</p>",
      },
      {
        q: 'Que se passe-t-il si je change de matériel en cours de contrat ?',
        r: "<p>Le parc est mis à jour dans votre espace client et l'avenant au contrat suit. Un équipement retiré sort du périmètre, un équipement ajouté y entre à la date de mise en service.</p>",
      },
      {
        q: 'Quelle est la durée d’engagement ?',
        r: "<p>Nos contrats sont annuels et reconductibles. Les conditions exactes de durée, de reconduction et de résiliation figurent dans la proposition que nous vous remettons après l'audit — nous vous invitons à les lire, elles tiennent sur une page et sans clause piégeuse.</p>",
      },
    ],
  },
];

export const servicesNav = services.map((s) => ({
  nomCourt: s.nomCourt,
  nom: s.nom,
  url: `/services/${s.slug}`,
}));
