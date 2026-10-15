// Articles SODILAME rédigés et prêts à publier.
// Déposer ce fichier dans data/ puis ajouter deux lignes dans data/articles.mjs
// (voir A-LIRE-integration.md).
//
// Ordre : du plus récent au plus ancien.
//   1. dimensionner-cellule-refroidissement-rapide  — 15/10/2026 — Équipement
//   2. marche-en-avant-petite-cuisine               — 01/10/2026 — Hygiène & HACCP
//   3. verres-voiles-osmoseur-lave-verre            — 15/09/2026 — Équipement
//   4. controle-hygiene-restaurant                  — 07/09/2026 — Hygiène & HACCP

export const articlesNouveaux = [

  // ───────────────────────────────────────────────────────────────────────────
  // 15 octobre 2026 — cellule de refroidissement
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'dimensionner-cellule-refroidissement-rapide',
    photo: null,
    titre: "Dimensionner sa cellule de refroidissement : le calcul que personne ne fait",
    titreSeo: "Dimensionner sa cellule de refroidissement rapide | SODILAME",
    description: "De +63 à +10 °C en moins de deux heures : pourquoi la capacité annoncée au catalogue n'est pas la capacité utile, et comment calculer la vôtre sur votre pic.",
    date: '2026-10-15',
    dateAffichee: '15 octobre 2026',
    categorie: 'Équipement',
    resume: "La cellule sous-dimensionnée est l'erreur la plus coûteuse de la restauration collective, et celle qu'on découvre au contrôle. Comment calculer la capacité dont vous avez réellement besoin.",
    corps: `<p>C'est l'achat que l'on fait une fois pour quinze ans, et c'est celui où l'erreur se voit le moins. Une cellule de refroidissement trop juste fonctionne : elle démarre, elle souffle, elle s'arrête. Elle ne descend simplement plus dans les temps imposés — et personne ne s'en aperçoit avant une visite de contrôle ou une analyse non conforme.</p>

<p>Nous entretenons et dépannons des cellules dans des cuisines centrales, des cantines scolaires, des maisons de retraite et des restaurants, entre la Crau, le pays d'Arles et l'étang de Berre. Le constat est régulier : le matériel est rarement en panne, il est trop petit, mal implanté, ou les deux. Voici comment éviter ça avant la commande, et comment vérifier ce que vaut la machine que vous avez déjà.</p>

<h2>Ce que le texte impose, et ce qu'il n'impose pas</h2>

<p>Aucun texte n'impose d'acheter une cellule de refroidissement. Ce qui est imposé, c'est un <strong>résultat</strong>. L'annexe IV de l'<strong>arrêté du 21 décembre 2009</strong> relatif aux règles sanitaires applicables aux activités de commerce de détail, d'entreposage et de transport de produits d'origine animale pose la règle à son point 1 : le refroidissement des préparations culinaires est conduit de telle manière que leur <strong>température à cœur ne reste pas entre +63 °C et +10 °C pendant plus de deux heures</strong>. À l'issue du refroidissement, les produits sont entreposés dans une enceinte dont la température ne dépasse pas +3 °C.</p>

<p>Deux précisions que l'on lit rarement, et qui changent tout dans la pratique :</p>

<ul>
  <li><strong>La règle porte sur le temps passé dans la plage, pas sur un chrono de deux heures en soi.</strong> Un plat qui stagne quarante minutes sur une table avant d'entrer en cellule a déjà consommé une bonne part de son budget.</li>
  <li><strong>+10 °C n'est pas une température de conservation.</strong> C'est la sortie de la zone à risque. Derrière, il faut une enceinte à +3 °C maximum. Une cellule qui finit son cycle et laisse le produit dedans à +8 °C pendant le service du soir ne respecte rien du tout.</li>
</ul>

<p>Le texte prévoit une porte de sortie : une analyse des dangers validée peut démontrer qu'un refroidissement moins rapide ne présente pas de risque. C'est une démarche documentée, pas une tolérance par défaut. Sans elle, c'est la règle des deux heures qui s'applique, et c'est à vous d'en apporter la preuve — l'instruction technique <strong>DGAL/SDSSA/N2012-8054</strong> parle d'« enregistrements appropriés », et renvoie pour la surveillance de cette étape à la note de service <strong>DGAL/SDSSA/N2008-8186 du 21 juillet 2008</strong>.</p>

<p>Deux repères complètent le cadre, parce qu'ils conditionnent le volume que vous allez devoir refroidir :</p>

<ul>
  <li><strong>La durée de vie.</strong> Même annexe, point 4 : sans étude de durée de vie, la date limite de consommation d'une préparation réfrigérée ne peut pas dépasser <strong>le troisième jour après celui de la fabrication</strong>. Vous ne pouvez donc pas lisser votre production sur la semaine pour soulager une cellule trop petite.</li>
  <li><strong>La remise en température.</strong> Point 3 : pas plus d'une heure entre +10 °C et la température de service, et pas en dessous de +63 °C sauf analyse des dangers validée. La préparation est consommée le jour de sa première remise en température.</li>
</ul>

<p>Si votre établissement est une cuisine de collectivité, un point mérite d'être levé : l'arrêté du 29 septembre 1997 sur la restauration collective à caractère social, que beaucoup de classeurs citent encore, <strong>a été abrogé pour les produits d'origine animale</strong> par l'arrêté de 2009. Les denrées qui n'en contiennent pas relèvent aujourd'hui de l'<strong>arrêté du 8 octobre 2013</strong>. Si votre plan de maîtrise sanitaire cite toujours 1997, il est temps de le reprendre — c'est le genre de détail qui donne le ton d'une visite. Nous en parlons dans notre <a href="/conseils/plan-de-maitrise-sanitaire-restaurant">guide du plan de maîtrise sanitaire</a>.</p>

<h2>Pourquoi une chambre froide ne fait pas ce travail</h2>

<p>C'est la question qui revient le plus souvent, et la réponse n'est pas celle qu'on attend. Une chambre froide n'y arrive pas pour une raison de physique : sa puissance et son brassage d'air sont calculés pour <strong>maintenir</strong> une masse déjà froide, pas pour extraire des kilocalories d'un bac à 70 °C. Pas de vitesse d'air sur le produit, pas de réserve de puissance : le cœur du produit descend en six ou huit heures. Hors sujet.</p>

<p>Mais le vrai problème est ailleurs, et c'est celui que nous voyons sur le terrain. <strong>Mettre du chaud dans une chambre froide fait monter tout le reste.</strong> Le groupe tourne en continu, la température de la chambre grimpe de deux ou trois degrés pendant plusieurs heures, et c'est l'ensemble du stock — viandes, produits laitiers, préparations de la veille — qui sort de ses températures de conservation. Vous avez transformé un problème de refroidissement en problème de chaîne du froid sur toute une enceinte. À quoi s'ajoute l'humidité relâchée par le produit chaud, qui part se déposer en givre sur l'évaporateur et dégrade la performance pour les jours suivants.</p>

<p>C'est aussi comme ça qu'on tue un groupe froid : pas d'un coup, mais par des cycles à pleine charge répétés. Nous détaillons ces dérives dans notre article sur les <a href="/conseils/eviter-panne-chambre-froide-ete">pannes de chambre froide en été</a>, et les températures de conservation sont rassemblées dans notre <a href="/conseils/temperatures-haccp-restauration">mémo des températures HACCP</a>.</p>

<h2>La capacité annoncée n'est pas la capacité utile</h2>

<p>Voilà le cœur du sujet, et la raison pour laquelle tant de cellules sont trop petites alors que personne n'a triché.</p>

<p>Les performances d'une cellule sont mesurées selon une norme : <strong>NF EN ISO 22042</strong> (octobre 2021), qui a remplacé NF EN 17032 de 2018. Cette norme définit une méthode d'essai, et il faut savoir ce qu'il y a dedans :</p>

<ul>
  <li><strong>L'aliment d'essai est de la purée de pommes de terre reconstituée</strong> — environ 115 g de flocons déshydratés, 877 g d'eau et 8 g de sel par kilogramme.</li>
  <li>Elle est répartie dans des <strong>bacs inox de 40 mm de hauteur, remplis sur 35 mm</strong>, sur la surface maximale permise par chaque niveau.</li>
  <li>Le cycle part de <strong>+65 °C</strong>, descend à <strong>+10 °C</strong>, en <strong>120 minutes maximum</strong>.</li>
  <li>L'essai se fait à la <strong>température ambiante de fonctionnement</strong> pour laquelle l'appareil est conçu — la norme prévoit trois niveaux : <strong>25, 30 ou 40 °C</strong>.</li>
</ul>

<p>Relisez la deuxième ligne. <strong>Trente-cinq millimètres.</strong> Un fond de bac. Or dans une vraie cuisine, on remplit un bac gastro de ratatouille, de hachis ou de sauce sur huit à dix centimètres, parce que c'est ce qui rentre dans le four et ce qu'on a de récipients. Le temps de refroidissement ne double pas quand l'épaisseur double : il augmente beaucoup plus vite, parce que la chaleur doit traverser toute la masse pour atteindre la surface. C'est l'épaisseur, pas le poids total, qui décide du temps de cycle. Deux cuisines avec la même cellule et le même tonnage obtiennent des résultats sans rapport selon la manière dont elles remplissent leurs bacs.</p>

<p>Puis la quatrième ligne, qui est notre sujet local. Une cellule déclarée pour une ambiance de 25 °C placée dans une cuisine de Provence au mois d'août, où il fait 35 à 38 °C à côté des pianos, ne tiendra pas ses temps. Le condenseur rejette dans un air déjà chaud, la haute pression monte, la puissance frigorifique chute. C'est mécanique, ce n'est pas un défaut. Nous le constatons chaque été : les cellules qui débordent sont celles qui étaient déjà juste en février.</p>

<p>D'où la question à poser au vendeur, celle à laquelle un catalogue ne répond jamais seul : <strong>cette capacité est annoncée pour quelle ambiance, et pour quelle épaisseur de produit ?</strong> Et pour une cellule mixte refroidissement-congélation, demandez les deux capacités : la capacité en congélation est toujours la plus basse des deux, et c'est elle qui compte si vous congelez.</p>

<h2>Le calcul : partir du pic, pas de la moyenne</h2>

<p>La capacité d'une cellule se calcule sur <strong>la plus grosse production d'un seul service</strong>, pas sur une moyenne journalière ou hebdomadaire. Ce n'est pas un détail de méthode : la règle des deux heures s'applique à chaque fournée, et la DLC à J+3 vous interdit de produire très en avance pour étaler la charge.</p>

<p>En pratique, nous reprenons quatre chiffres avec l'exploitant :</p>

<ol>
  <li><strong>La masse du pic.</strong> Le jour le plus chargé, combien de kilos sortent du four ou de la marmite dans la même fenêtre d'une heure ? Pas le total de la journée.</li>
  <li><strong>L'épaisseur réelle.</strong> Sur combien de centimètres remplissez-vous vos bacs, avec les récipients que vous possédez ? Si c'est 8 cm, aucune capacité catalogue ne s'applique telle quelle.</li>
  <li><strong>Le nombre de cycles possibles.</strong> Deux cycles de suite sont rarement tenables : il faut sortir, étiqueter, remplir à nouveau, et la machine doit se remettre en froid. Compter sur trois rotations d'affilée est le plus sûr moyen de se retrouver à la limite.</li>
  <li><strong>L'ambiance du local.</strong> Température en août à l'emplacement prévu, et surtout la place laissée autour du condenseur pour qu'il respire.</li>
</ol>

<p>Deux règles de bon sens sortent de là. La première : <strong>mieux vaut une cellule un cran au-dessus du calcul qu'une cellule juste</strong>, parce qu'une machine surdimensionnée consomme un peu plus et une machine sous-dimensionnée vous met en non-conformité. La seconde : <strong>investissez dans les bacs en même temps que dans la cellule.</strong> Passer de bacs profonds à des bacs plats — plus nombreux, moins remplis — est souvent l'ajustement le plus efficace, et de loin le moins lourd.</p>

<h2>La sonde à cœur et la preuve</h2>

<p>Une cellule se pilote de deux façons : au temps, ou à la sonde. Le mode « temps » lance un cycle de durée fixe et s'arrête ; le mode « sonde » s'arrête quand le cœur du produit atteint la consigne. Le second est le seul qui prouve quelque chose.</p>

<p>Ce que nous trouvons en intervention, de manière répétée : la sonde pendue à son crochet, jamais utilisée, parfois encore dans son emballage d'origine. Ou piquée dans le bac et non dans le produit, ou plantée dans la pièce de viande la plus petite — celle qui descend la première et arrête le cycle pour tout le monde. La sonde doit aller <strong>au centre géométrique de la pièce la plus épaisse</strong>, c'est-à-dire la plus lente.</p>

<p>Côté enregistrement, l'essentiel est que les relevés soient <strong>cohérents</strong>. Beaucoup de cellules récentes impriment ou exportent la courbe du cycle, et c'est de loin la meilleure preuve : la température de départ, la température d'arrivée, l'heure et la durée. À défaut, un relevé manuel par fournée fait le travail, à condition qu'il reflète ce qui s'est passé. Un registre où chaque cycle dure exactement 90 minutes toute l'année ne convainc personne, et surtout pas quelqu'un qui en lit toute la semaine.</p>

<h2>Ce qui fait dériver une cellule en silence</h2>

<p>Une cellule correctement dimensionnée le reste rarement sans entretien. Ce que nous mesurons sur les parcs que nous suivons :</p>

<ul>
  <li><strong>Le condenseur encrassé.</strong> C'est la première cause, et de loin. Dans nos cuisines, c'est un mélange de graisse et de poussière — et dans la Crau, la poussière ne manque pas. Un condenseur sale, c'est un cycle qui s'allonge sans qu'aucun voyant ne s'allume.</li>
  <li><strong>Les joints de porte.</strong> Écrasés, déchirés au coin inférieur par les chariots. La cellule tire de l'air chaud en permanence et givre.</li>
  <li><strong>Le dégivrage et l'évaporateur.</strong> Un évaporateur partiellement pris en glace perd en échange thermique bien avant de se bloquer.</li>
  <li><strong>L'implantation.</strong> Cellule coincée contre un mur, condenseur à vingt centimètres d'un four, grille d'aspiration contre un retour de cloison. C'est l'erreur la plus fréquente et la moins chère à corriger, à condition de la voir avant la pose.</li>
  <li><strong>Les sondes dérivées.</strong> Une sonde d'ambiance qui lit deux degrés trop bas fait arrêter le cycle trop tôt, en toute bonne foi.</li>
</ul>

<p>Le test tient en une matinée, et vous pouvez le faire vous-même : <strong>chargez la cellule comme un jour de pointe, lancez un cycle sur sonde, et notez l'heure de départ et l'heure où le cœur atteint +10 °C.</strong> C'est exactement ce que nous faisons lors de l'audit technique de parc, sur une production réelle et non sur un bac témoin. Si vous êtes à plus de deux heures, vous le savez avant que quelqu'un d'autre ne vous le dise.</p>

<h2>Deux points à ne pas oublier avant de commander</h2>

<p><strong>Les fluides.</strong> Les cellules se vendent aujourd'hui majoritairement en fluides à faible potentiel de réchauffement, souvent du R290 (propane), qui impose des contraintes d'implantation et de ventilation du local liées à son inflammabilité. Pour les machines encore chargées en HFC, les obligations de contrôle d'étanchéité dépendent de la charge exprimée en tonnes équivalent CO₂, sous le régime du <strong>règlement (UE) 2024/573 du 7 février 2024</strong>, en vigueur depuis le 11 mars 2024, qui a abrogé le règlement (UE) n° 517/2014. Nous avons détaillé ce sujet dans notre article sur le <a href="/conseils/controle-etancheite-f-gas-cuisine-professionnelle">contrôle d'étanchéité</a>.</p>

<p><strong>Les contraintes du local.</strong> Puissance électrique disponible, évacuation des condensats, passage de la machine par les portes existantes, et ventilation du local. Ce sont ces points-là qui transforment une livraison en chantier, et ils se relèvent avant la commande, pas le jour de la pose.</p>

<h2>Ce que nous faisons</h2>

<p>Nous installons, mettons en service et dépannons le <a href="/services/froid-professionnel">froid professionnel</a> depuis quarante ans depuis Saint-Martin-de-Crau, sur le pays d'<a href="/zone-intervention/arles">Arles</a>, la Crau, Istres et Miramas, le Grand Avignon et jusqu'à Marseille — toutes marques, y compris celles que nous n'avons pas vendues.</p>

<p>Avant de proposer une cellule, nous relevons le pic de production, l'épaisseur des bacs utilisés, l'ambiance du local et la place disponible autour du condenseur. Sur une machine déjà en place, nous mesurons un cycle réel en charge. Et c'est l'un des points que nous reprenons à chaque visite d'un <a href="/services/contrat-entretien-cuisine-professionnelle">contrat d'entretien</a> : condenseur, joints, dégivrage, sondes, temps de descente. Une cellule qui tient ses temps en février et plus en août n'est pas tombée en panne — elle a juste cessé d'être conforme, et c'est le genre de chose qu'on préfère découvrir soi-même.</p>`,
    faq: [
      {
        q: "La cellule de refroidissement est-elle obligatoire ?",
        r: `<p>Non : aucun texte n'impose l'appareil. Ce qui est imposé est un résultat — la température à cœur ne doit pas rester entre +63 °C et +10 °C plus de deux heures, puis le produit est entreposé à +3 °C maximum (arrêté du 21 décembre 2009, annexe IV, point 1). En pratique, dès que vous produisez à l'avance pour servir plus tard, aucun autre matériel ne tient ce délai. L'obligation de moyen découle de l'obligation de résultat.</p>`,
      },
      {
        q: "Peut-on refroidir ses préparations en chambre froide ?",
        r: `<p>Non, et c'est doublement risqué. Une chambre froide est dimensionnée pour maintenir une masse déjà froide, pas pour extraire la chaleur d'un bac à 70 °C : le cœur descend en plusieurs heures, bien au-delà du délai réglementaire. Et le produit chaud fait monter la température de toute l'enceinte, ce qui sort le reste du stock de ses températures de conservation. Vous risquez la non-conformité sur la préparation refroidie et sur tout ce qui l'entoure.</p>`,
      },
      {
        q: "Combien de temps peut-on conserver un plat passé en cellule ?",
        r: `<p>Sans étude de durée de vie, la date limite de consommation ne peut pas dépasser le troisième jour suivant celui de la fabrication (arrêté du 21 décembre 2009, annexe IV, point 4). Une étude de durée de vie, menée en laboratoire sur vos recettes et votre process, peut allonger ce délai : c'est une démarche documentée, pas une appréciation interne. Ce point a une conséquence directe sur le dimensionnement, puisqu'il interdit d'étaler la production sur la semaine pour soulager une cellule trop juste.</p>`,
      },
      {
        q: "Comment savoir si ma cellule descend encore dans les temps ?",
        r: `<p>En mesurant un cycle réel. Chargez-la comme un jour de pointe, avec les bacs que vous utilisez vraiment et leur remplissage habituel, lancez un cycle piloté par la sonde à cœur placée au centre de la pièce la plus épaisse, et relevez l'heure de départ et celle où le cœur atteint +10 °C. Un essai sur un bac témoin peu rempli ne prouve rien. Si le temps dépasse deux heures, commencez par le condenseur et les joints de porte avant d'envisager de remplacer la machine : une cellule qui a dérivé n'est pas forcément une cellule trop petite.</p>`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 1er octobre 2026 — marche en avant en petite cuisine
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'marche-en-avant-petite-cuisine',
    photo: null,
    titre: "La marche en avant quand la cuisine fait 20 m²",
    titreSeo: "Marche en avant en petite cuisine : comment faire | SODILAME",
    description: "La marche en avant dans l'espace est impossible sous 25 m². La séparation dans le temps est admise par le guide de bonnes pratiques : comment l'appliquer.",
    date: '2026-10-01',
    dateAffichee: '1er octobre 2026',
    categorie: 'Hygiène & HACCP',
    resume: "Le principe est simple : le sale ne croise jamais le propre. Dans un local de 20 m², l'appliquer dans l'espace est impossible. Il existe une autre voie, admise par le guide de bonnes pratiques d'hygiène, et presque jamais expliquée.",
    corps: `<p>Nous installons et entretenons des cuisines professionnelles entre Saint-Martin-de-Crau, Arles et le Vaucluse depuis quarante ans. Une bonne partie de ces cuisines fait entre 15 et 25 m², parce qu'elles sont installées dans des locaux de centre ancien qui n'ont jamais été conçus pour ça. Et à chaque fois revient la même question : comment respecter la marche en avant quand il n'y a tout simplement pas la place de séparer quoi que ce soit ?</p>

<p>La réponse existe. Elle est écrite noir sur blanc dans un document officiel, et elle est presque jamais expliquée.</p>

<h2>Le principe, et pourquoi il n'est écrit nulle part sous ce nom</h2>

<p>La marche en avant, c'est une idée en une phrase : un produit avance toujours du sale vers le propre, et ne revient jamais en arrière. Les cartons de livraison entrent, les légumes sont lavés, les viandes découpées, les plats cuits, dressés, envoyés. À aucun moment un produit propre ne doit croiser un produit sale, ni le plan de travail, ni l'ustensile, ni les mains qui viennent de toucher du sale.</p>

<p>Première surprise : l'expression « marche en avant » ne figure dans aucun texte réglementaire. Ce n'est pas une norme, c'est un vocabulaire de métier. Ce qui est écrit, et qui s'impose, c'est le <strong>règlement (CE) n° 852/2004 du 29 avril 2004</strong>. Son annexe II, chapitre I, point 2 c) exige que les locaux, « par leur agencement, leur conception, leur construction, leur emplacement et leurs dimensions », permettent « la mise en œuvre de bonnes pratiques d'hygiène, notamment prévenir la contamination ». Le chapitre IX, point 3 du même texte ajoute que les denrées doivent être protégées « à toutes les étapes » contre toute contamination.</p>

<p>Cette nuance n'est pas un détail de juriste, c'est la clé de tout l'article : <strong>le règlement fixe un résultat, pas un plan</strong>. Il ne dit nulle part qu'il faut deux pièces, trois plans de travail ou une porte entre la plonge et le dressage. Il dit que le résultat doit être atteint. Comment vous l'atteignez vous regarde — à condition de pouvoir l'expliquer et de le prouver.</p>

<p>C'est pour cela qu'un inspecteur ne vient pas avec un gabarit de cuisine idéale. Il regarde si, chez vous, dans votre local, avec votre carte et votre effectif, le sale peut croiser le propre. S'il trouve un croisement possible, le fait que votre cuisine soit petite n'est pas une excuse recevable. S'il n'en trouve pas, les 20 m² ne lui posent aucun problème.</p>

<h2>Les croisements que nous voyons le plus souvent</h2>

<p>Nos techniciens entrent dans des cuisines toute l'année, pour un dépannage ou une visite d'entretien. Ils ne viennent pas contrôler l'hygiène, mais ils voient les implantations. Voici ce qui revient, dans l'ordre de fréquence.</p>

<ul>
<li><strong>La plonge et le dressage sur le même plan, sans rien entre les deux.</strong> C'est le croisement n° 1. Les éclaboussures de plonge portent à plus d'un mètre, et elles vont là où on dresse.</li>
<li><strong>Le chemin des poubelles qui passe devant le poste de dressage.</strong> Personne ne dessine ça sur un plan. Tout le monde le fait en service, parce que c'est le trajet le plus court vers la porte.</li>
<li><strong>Les cartons de livraison posés sur le plan de travail.</strong> Un carton a voyagé sur un quai, dans un camion, sur un diable. Il n'a rien à faire sur une surface où l'on prépare. Il manque presque toujours une zone de déconditionnement, même minuscule.</li>
<li><strong>Un seul lave-mains, et il est mal placé.</strong> Le règlement demande des lave-mains « en nombre suffisant » et « judicieusement situés » (annexe II, chapitre I, point 4). Un lave-mains derrière la plonge, c'est un lave-mains qu'on n'utilise pas quand on passe du sale au propre, parce qu'il faut traverser la cuisine pour y aller.</li>
<li><strong>La porte du frigo de produits bruts qui s'ouvre au-dessus du poste de découpe du propre.</strong> Sur le plan, les deux équipements sont bien chacun dans leur zone. Dans la réalité, la porte ouverte met les deux en contact.</li>
<li><strong>Le passage vers les vestiaires et les sanitaires qui traverse la zone propre.</strong> Celui-là ne se corrige pas avec une procédure. Il se corrige au plan, ou il ne se corrige pas.</li>
</ul>

<h2>La dimension que personne ne regarde : la verticale</h2>

<p>Ce point est celui où notre métier d'installateur et de frigoriste apporte quelque chose que vous ne lirez pas ailleurs. Tout le monde raisonne la marche en avant à plat, comme un plan vu du dessus. Or une contamination ne circule pas seulement horizontalement : elle tombe, et elle est soufflée.</p>

<p>Ce que nous constatons en intervention :</p>

<ul>
<li><strong>Les condensats d'une vitrine ou d'une armoire positive</strong> qui s'écoulent sur un plan de travail situé en dessous, parce que le bac d'évaporation est fissuré ou le tube d'évacuation débranché. C'est une cause fréquente de nos appels, et c'est aussi un croisement sale/propre que le plan ne montre pas.</li>
<li><strong>Les filtres de hotte qui s'égouttent.</strong> Un filtre à chocs saturé relâche de la graisse, et elle tombe droit sur ce qui est dessous. Si le poste de dressage est sous la hotte, le dressage reçoit la graisse de la cuisson.</li>
<li><strong>L'air rejeté par un groupe logé sous un plan de travail.</strong> Un groupe de froid aspire, réchauffe et rejette. S'il rejette vers la zone propre, il y envoie la poussière de la cuisine entière — et au passage il s'étouffe, ce qui finit par un dépannage.</li>
<li><strong>Le flux d'une ventilation mal équilibrée.</strong> Quand l'extraction est surdimensionnée par rapport à la compensation d'air, la cuisine se met en dépression et aspire l'air des sanitaires et de la salle. La direction de l'air n'est jamais indiquée sur un plan d'implantation, et pourtant elle existe.</li>
</ul>

<p>En petite cuisine, où les équipements sont forcément empilés les uns sur les autres, cette dimension verticale décide plus souvent de l'hygiène réelle que le positionnement des plans de travail.</p>

<h2>La marche en avant dans l'espace : à quoi ressemble une implantation qui tient</h2>

<p>Quand la surface le permet — en pratique à partir de 25 à 30 m² selon la carte —, la marche en avant se traite dans l'espace, et c'est la solution la plus confortable à exploiter. La logique d'implantation est toujours la même :</p>

<ol>
<li>Une <strong>réception / déconditionnement</strong> au plus près de l'entrée de marchandises, avec une surface dédiée où le carton est ouvert et éliminé.</li>
<li>Un <strong>stockage</strong> séparé en froid positif, froid négatif et sec, avec des produits bruts et des produits finis qui ne partagent pas la même enceinte.</li>
<li>Une <strong>zone de préparation froide</strong> (légumes, viandes crues) distincte du reste, avec son propre plan et son propre lave-mains.</li>
<li>La <strong>cuisson</strong>, sous hotte, qui joue le rôle de frontière naturelle entre le cru et le cuit.</li>
<li>Le <strong>dressage et l'envoi</strong>, au plus près de la salle, et surtout le plus loin possible de la plonge.</li>
<li>La <strong>plonge</strong>, en bout de circuit, avec son retour vaisselle qui ne traverse pas la zone de dressage. C'est le point sur lequel nous passons le plus de temps en conception, parce que c'est le plus souvent raté.</li>
</ol>

<p>Si vous pouvez tracer ce circuit sans jamais croiser une flèche avec une autre, la marche en avant dans l'espace est réglée.</p>

<h2>La marche en avant dans le temps : la solution des petites cuisines</h2>

<p>Voici le point que la plupart des exploitants n'ont jamais entendu formuler. Quand la séparation dans l'espace est matériellement impossible, elle peut se faire <strong>dans le temps</strong>.</p>

<p>Ce n'est pas une astuce ni une tolérance officieuse. Le <strong>guide de bonnes pratiques d'hygiène et d'application de l'HACCP — Restaurateur</strong>, édité par la CGAD en novembre 2015 et dont l'avis de validation a été publié au <strong>Journal officiel du 21 janvier 2016</strong> (NOR : AGRG1515768V), reconnaît explicitement les deux organisations : séparation des opérations dans l'espace, <em>ou</em> séparation des opérations non simultanées dans le temps, les séquences étant alors séparées par une étape de nettoyage et de désinfection.</p>

<p>Concrètement, sur un même plan de travail : on épluche et on lave les légumes, on nettoie et on désinfecte le plan, puis et seulement puis on découpe la viande crue, on nettoie et on désinfecte à nouveau, et c'est seulement après qu'on dresse. Le croisement n'est pas évité par un mur, il est évité par l'horloge et par le produit de nettoyage.</p>

<h3>Ce que cela exige réellement</h3>

<p>Il faut être honnête : la marche en avant dans le temps est plus exigeante que la marche en avant dans l'espace, pas moins. Un mur ne se fatigue pas, une équipe le vendredi soir à 21 h, oui. Pour qu'elle tienne, il faut quatre choses.</p>

<ul>
<li><strong>Une séquence écrite, et une seule.</strong> L'ordre des opérations de la journée doit être figé noir sur blanc, pas laissé au bon sens du moment. C'est ce document que vous présenterez en cas de contrôle, et il s'intègre naturellement à votre <a href="/conseils/plan-de-maitrise-sanitaire-restaurant">plan de maîtrise sanitaire</a>.</li>
<li><strong>Une étape de nettoyage-désinfection qui laisse une trace.</strong> C'est l'étape qui remplace la cloison. Si elle n'est pas enregistrée, rien ne distingue votre organisation d'une absence d'organisation. Le produit utilisé, sa dilution et le temps de contact doivent être connus de ceux qui l'appliquent.</li>
<li><strong>De la capacité de froid, plus que la moyenne.</strong> Travailler en séquences veut dire produire à l'avance, donc stocker. Et produire à l'avance impose le refroidissement rapide : de +63 °C à moins de +10 °C en moins de deux heures, conformément à l'annexe IV de l'<strong>arrêté du 21 décembre 2009</strong>. C'est une performance de matériel, et une chambre froide ne la tient pas. Les seuils de conservation qui s'appliquent ensuite sont dans notre <a href="/conseils/temperatures-haccp-restauration">mémo des températures en restauration</a>.</li>
<li><strong>Une équipe formée.</strong> La formation à l'hygiène alimentaire est obligatoire en restauration commerciale depuis le 1er octobre 2012 — article L. 233-4 du code rural et de la pêche maritime, <strong>décret n° 2011-731 du 24 juin 2011</strong> et <strong>arrêté du 5 octobre 2011</strong> modifié, soit 14 heures minimum pour au moins une personne par établissement. Avec une organisation temporelle, cette personne ne peut pas être la seule à comprendre pourquoi l'ordre des tâches n'est pas négociable.</li>
</ul>

<p>Dit autrement : la marche en avant dans l'espace s'achète une fois, à la conception. La marche en avant dans le temps se paie tous les jours, en discipline. Les deux sont valables. La seconde n'est pas un rabais sur la première.</p>

<h2>Les cinq erreurs des plans qu'on nous apporte</h2>

<p>Nous recevons régulièrement des plans faits par un architecte, un cuisiniste généraliste ou l'exploitant lui-même, avec la demande d'installer le matériel dessus. Voici ce que nous signalons le plus souvent avant de commencer.</p>

<ul>
<li><strong>La plonge mise là où il restait de la place.</strong> La plonge se place en premier, parce qu'elle commande les évacuations, l'arrivée d'eau et le sens du circuit. Si elle arrive en dernier sur le plan, elle sera au mauvais endroit.</li>
<li><strong>L'absence de zone de déconditionnement.</strong> Même 60 cm de plan dédié à l'ouverture des cartons changent la situation. Ne rien prévoir, c'est garantir que les cartons iront sur le plan de dressage.</li>
<li><strong>Un seul lave-mains, en fin de plan.</strong> Deux petits lave-mains bien placés valent mieux qu'un grand au mauvais endroit.</li>
<li><strong>Le trajet des déchets jamais dessiné.</strong> Tracez-le sur le plan avant les travaux. S'il croise le dressage et qu'il n'y a pas d'autre chemin, il faut décaler le dressage.</li>
<li><strong>La hauteur sous plafond oubliée.</strong> C'est notre spécialité des locaux anciens d'Arles et de Saint-Martin-de-Crau : une cave voûtée ou un plafond à 2,20 m interdit certains équipements, notamment une machine à capot, et oblige à repenser toute la laverie. Mieux vaut le découvrir sur le plan que le jour de la livraison.</li>
</ul>

<h2>Ce qu'un plan 2D permet de vérifier, et qu'un relevé de dimensions ne montre pas</h2>

<p>Un plan 2D ne sert pas à faire joli dans un dossier. Il sert à faire trois vérifications qu'on ne peut pas faire de tête, et encore moins sur place avec un mètre.</p>

<p>D'abord, <strong>tracer les flux et chercher les croisements</strong> : le flux des marchandises, celui des déchets, celui du personnel, celui de la vaisselle sale. Quatre tracés sur un même plan, et les croisements sautent aux yeux. C'est l'exercice qui décide si vous travaillerez dans l'espace ou dans le temps.</p>

<p>Ensuite, <strong>vérifier les dégagements réels</strong>, portes de four et de lave-vaisselle ouvertes, pas fermées. Beaucoup d'implantations sont justes sur le papier et impraticables en service.</p>

<p>Enfin, <strong>confronter les besoins techniques au local</strong> : puissance électrique disponible, position et diamètre des évacuations, arrivée d'eau, extraction, compensation d'air. C'est ce travail que nous faisons en <a href="/services/conception-cuisine-professionnelle">conception de cuisine professionnelle</a>, et c'est aussi ce qui permet à l'<a href="/services/installation-mise-en-service">installation et à la mise en service</a> de se passer sans découverte désagréable : on vérifie les accès, les hauteurs et les raccordements avant de commander le matériel, pas après.</p>

<p>Dans les centres anciens, cette étape n'est pas optionnelle. Nos interventions de <a href="/zone-intervention/arles">dépannage et d'installation à Arles</a> se font régulièrement dans des locaux aux murs épais, aux accès étroits et aux volumes contraints, où la seule manière de savoir si une implantation tient est de la dessiner d'abord.</p>

<h2>Ce qu'il faut retenir</h2>

<p>La marche en avant n'est pas une question de surface, c'est une question d'organisation démontrable. Le règlement européen impose un résultat — aucun croisement du sale et du propre — et laisse le choix du moyen. Dans l'espace si vous avez la place, dans le temps si vous ne l'avez pas, cette seconde voie étant admise par le guide de bonnes pratiques d'hygiène validé au Journal officiel. Dans les deux cas, ce qui fait la différence devant un contrôle, c'est d'avoir écrit comment vous faites et de pouvoir le prouver.</p>

<p>Si vous reprenez un local ou réaménagez une cuisine existante, le moment utile pour en parler est avant les travaux. Nous nous déplaçons, nous relevons, et nous vous dessinons le plan.</p>`,
    faq: [
      {
        q: "La marche en avant est-elle obligatoire par la loi ?",
        r: `<p>L'expression « marche en avant » ne figure dans aucun texte. Ce qui est obligatoire, c'est le résultat : le règlement (CE) n° 852/2004 du 29 avril 2004 exige, à son annexe II, chapitre I, point 2 c), que l'agencement et les dimensions des locaux permettent « la mise en œuvre de bonnes pratiques d'hygiène, notamment prévenir la contamination ». La marche en avant est le nom que le métier donne à la façon d'y parvenir. Vous n'êtes pas tenu d'une implantation type, vous êtes tenu de l'absence de croisement entre le sale et le propre.</p>`,
      },
      {
        q: "Quelle surface minimale faut-il pour une cuisine professionnelle ?",
        r: `<p>Aucun texte ne fixe de surface minimale. Un local de 15 m² peut être conforme et un local de 50 m² peut ne pas l'être. Ce qui est exigé, c'est un espace de travail suffisant pour l'exécution hygiénique de toutes les opérations, et une organisation qui empêche les croisements. En dessous de 25 m² environ, la séparation dans l'espace devient difficile et c'est l'organisation dans le temps qui prend le relais.</p>`,
      },
      {
        q: "Peut-on préparer le cru et le cuit sur le même plan de travail ?",
        r: `<p>Oui, à condition que les deux opérations ne soient pas simultanées et qu'une étape de nettoyage et de désinfection les sépare. C'est la marche en avant dans le temps, reconnue par le guide de bonnes pratiques d'hygiène Restaurateur (CGAD, novembre 2015), dont l'avis de validation a été publié au Journal officiel du 21 janvier 2016. En pratique, cela suppose une séquence écrite, des produits de nettoyage dont la dilution et le temps de contact sont connus, et un enregistrement qui prouve que l'étape de nettoyage a bien eu lieu.</p>`,
      },
      {
        q: "Faut-il refaire la cuisine pour être conforme ?",
        r: `<p>Pas systématiquement. Beaucoup de non-conformités que nous rencontrons se corrigent en déplaçant un équipement, en ajoutant un lave-mains au bon endroit, en créant une petite zone de déconditionnement ou en changeant le trajet des déchets. Les travaux lourds ne se justifient que lorsque le local lui-même impose un croisement — un passage vers les sanitaires qui traverse la zone propre, par exemple. Un plan 2D permet de trancher entre les deux avant de dépenser quoi que ce soit.</p>`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 15 septembre 2026 — verres voilés
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'verres-voiles-osmoseur-lave-verre',
    photo: null,
    titre: "Verres voilés : c'est l'eau, pas le produit",
    titreSeo: "Verres voilés : adoucisseur ou osmoseur de lave-verre | SODILAME",
    description: "Pourquoi les verres sortent ternes, comment distinguer un dépôt de calcaire d'un verre attaqué, et ce que l'adoucisseur ne fait pas et l'osmoseur fait.",
    date: '2026-09-15',
    dateAffichee: '15 septembre 2026',
    categorie: 'Équipement',
    resume: "Changer de liquide de rinçage ne règle presque jamais un problème de verres voilés. À 37 °f, l'eau de la Crau apporte 370 mg de calcaire par litre : c'est ça qu'il faut traiter, et pas toujours avec un adoucisseur.",
    corps: `
<p>C'est un des appels les plus fréquents en laverie, et presque toujours dans le même ordre : l'exploitant a changé de liquide de rinçage, puis de détergent, puis il a doublé les doses. Les verres sont toujours ternes, il a dépensé de l'argent, et il commence à soupçonner sa machine.</p>

<p>Dans la quasi-totalité des cas que nous voyons entre la Crau, les Alpilles et le Comtat, la machine va bien et le produit n'y est pour rien. C'est l'eau qui entre dedans.</p>

<h2>Avant tout : dépôt ou verre attaqué ?</h2>

<p>Deux défauts très différents se ressemblent à l'œil nu, et le premier réflexe utile est de les séparer. Le test prend dix minutes et vous pouvez le faire ce soir.</p>

<p>Prenez deux verres ternes. Laissez-en un tremper une heure dans un détartrant acide dilué — à défaut, du vinaigre blanc chaud fait l'affaire pour le diagnostic. Rincez, séchez.</p>

<ul>
  <li><strong>Le verre redevient clair</strong> : c'est un <strong>dépôt</strong>. Les minéraux se sont accumulés à la surface. C'est réversible, et c'est un problème de traitement d'eau.</li>
  <li><strong>Le verre reste voilé</strong> : le verre lui-même est <strong>attaqué</strong>. Sa surface a été corrodée, la lumière ne s'y réfléchit plus correctement. C'est irréversible : aucun produit, aucun réglage, aucune machine ne rattrapera ces verres. Ils sont à remplacer.</li>
</ul>

<p>Le second cas est plus rare mais il change tout, parce qu'il signale une cause opposée à celle qu'on imagine. La corrosion du verre est favorisée par une <strong>eau trop douce</strong> associée à un détergent trop alcalin et à une température élevée — typiquement, une machine raccordée derrière un adoucisseur réglé à zéro, avec un dosage de produit jamais revu. Autrement dit : on peut abîmer définitivement une verrerie en voulant trop bien faire.</p>

<p>D'où l'intérêt de faire le test avant d'acheter quoi que ce soit. S'il s'agit de corrosion, changer de liquide de rinçage ne sert à rien. S'il s'agit d'un dépôt, la suite de cet article vous concerne.</p>

<h2>Pourquoi le voile se forme</h2>

<p>Un verre qui sort d'une machine n'est pas sec : il porte un film d'eau. Ce film s'évapore. L'eau part, tout ce qu'elle transportait reste.</p>

<p>C'est aussi simple que ça, et c'est pour cette raison qu'aucun produit ne résout le problème à lui seul. Un liquide de rinçage abaisse la tension superficielle : au lieu de perler en gouttes, l'eau s'écoule en nappe et laisse moins de matière derrière elle. C'est une amélioration réelle, et c'est aussi sa limite. Il change la façon dont l'eau s'égoutte, il ne change pas ce qu'il y a dedans. Au-delà d'un certain taux de sels dissous, le voile revient quelle que soit la dose.</p>

<h2>Ce qu'il y a dans l'eau, chez nous</h2>

<p>La dureté se mesure en degrés français (°f). Un degré français correspond à 10 mg de carbonate de calcium par litre d'eau. L'échelle usuelle classe une eau de 15 à 30 °f comme plutôt dure, de 30 à 40 °f comme dure, et au-delà de 40 °f comme très dure.</p>

<p>Les valeurs relevées par le contrôle sanitaire de l'ARS sur nos réseaux, au premier semestre 2026 :</p>

<ul>
  <li><strong>Saint-Martin-de-Crau</strong> — 38,7 °f sur le réseau principal, 38,25 °f sur le réseau Mas Payan</li>
  <li><strong>Arles</strong> — 36,87 °f sur le réseau ville, 39,6 °f sur le réseau Mas-Thibert</li>
  <li><strong>Avignon</strong> — 30,66 °f, valeur publiée par le distributeur</li>
</ul>

<p>On est donc partout en eau dure, et à Mas-Thibert on frôle la catégorie « très dure ». Ce n'est pas une opinion de commercial, ce sont les analyses réglementaires. Et cela signifie qu'une machine installée sans traitement d'eau ici ne donnera <em>jamais</em> une verrerie brillante, quel que soit son prix.</p>

<h2>Le calcul que personne ne fait</h2>

<p>À 37 °f, chaque litre d'eau apporte 370 mg de carbonate de calcium.</p>

<p>Prenez une machine qui consomme 3 litres au rinçage — la valeur figure sur la notice de la vôtre — et qui tourne 40 fois par jour, six jours sur sept. Cela fait environ 37 000 litres par an, soit près de <strong>14 kg de calcaire</strong> qui traversent l'appareil.</p>

<p>L'essentiel repart à l'égout. Ce qui compte, c'est la fraction qui ne repart pas : celle qui s'accroche à la résistance du surchauffeur, aux buses de rinçage, et celle qui sèche sur vos verres. C'est pour cela que le même problème se manifeste toujours de deux façons à la fois — des verres ternes en salle, et une machine qui chauffe de moins en moins bien. Une résistance entartrée continue d'afficher sa consigne sans jamais l'atteindre, et vous perdez la température de rinçage sans qu'aucun voyant ne s'allume. Les valeurs à surveiller sont rassemblées dans notre <a href="/conseils/temperatures-haccp-restauration">mémo des températures</a>.</p>

<h2>Adoucisseur ou osmoseur : ils ne font pas le même travail</h2>

<p>C'est la confusion la plus répandue, et elle coûte cher parce qu'elle conduit à installer le bon appareil pour le mauvais objectif.</p>

<h3>L'adoucisseur protège la machine</h3>

<p>Un adoucisseur fait un échange : il retient le calcium et le magnésium, et les remplace par du sodium. Le calcaire ne se dépose plus — c'est exactement ce qu'il faut pour préserver le surchauffeur, les buses et la durée de vie de l'appareil.</p>

<p>Mais le sodium, lui, reste dans l'eau. La quantité de sels dissous n'a pratiquement pas baissé : elle a changé de nature. Une goutte qui sèche dépose toujours quelque chose. Ce n'est plus du calcaire, c'est une trace quand même. Beaucoup d'exploitants découvrent ce point après l'installation, et concluent que leur adoucisseur est en panne. Il ne l'est pas : il n'a jamais été conçu pour ça.</p>

<h3>L'osmoseur donne le verre brillant</h3>

<p>Un osmoseur ne remplace rien : il <strong>retire</strong>. L'eau est poussée à travers une membrane qui laisse passer les molécules d'eau et retient l'essentiel des sels dissous. L'eau de rinçage qui arrive sur le verre ne transporte quasiment plus rien, donc l'évaporation ne laisse quasiment rien. Le verre sèche seul, brillant, sans être essuyé.</p>

<p>Entre les deux existe la <strong>déminéralisation partielle</strong> par cartouche à résines, qui vise le même résultat sans membrane ni rejet d'eau. Elle convient à des volumes modestes ; sur une eau à 37 °f, les cartouches se saturent vite et le calcul de consommables doit être fait honnêtement avant de choisir.</p>

<p>À retenir : l'adoucisseur est un appareil de maintenance, l'osmoseur est un appareil de résultat. Sur une eau comme la nôtre, les deux se justifient souvent ensemble — l'adoucisseur en amont protège la membrane de l'osmoseur et allonge sa durée de vie.</p>

<h2>Comment savoir ce qu'il vous faut</h2>

<p>Trois données suffisent, et elles se relèvent en une visite :</p>

<ol>
  <li><strong>La dureté réelle à votre robinet</strong>, mesurée sur place. La valeur communale est un ordre de grandeur ; un réseau interne, un puits ou un adoucisseur existant peuvent la faire varier fortement.</li>
  <li><strong>Ce qui est déjà installé</strong>, et son état. Un adoucisseur sans sel depuis six mois est un tube inerte. Une résine jamais désinfectée est pire qu'une absence de traitement : c'est un point d'eau stagnante sur un réseau qui doit rester potable, et l'eau utilisée en cuisine relève du chapitre VII de l'annexe II du règlement (CE) n° 852/2004.</li>
  <li><strong>Le volume de rinçage et la cadence</strong> de votre machine, qui décident du dimensionnement et du coût de fonctionnement du traitement.</li>
</ol>

<p>Nous relevons ces trois points gratuitement, y compris sur des machines que nous n'avons pas vendues. Le détail de notre approche est sur la page <a href="/services/laverie-restauration">laverie de restauration</a>, et nous intervenons sur l'ensemble de la zone — <a href="/zone-intervention/arles">Arles</a> comprise, où les deux réseaux de la commune n'ont pas la même dureté.</p>

<h2>Ce que coûte vraiment l'essuyage manuel</h2>

<p>C'est la solution que tout le monde adopte par défaut, et elle a trois coûts que personne ne chiffre.</p>

<p><strong>Du temps.</strong> Essuyer la verrerie d'un service, tous les jours, occupe quelqu'un pendant que la salle attend. C'est du temps de personnel qui n'est ni du service ni de la production.</p>

<p><strong>De la casse.</strong> Un verre essuyé est un verre manipulé une fois de plus, souvent chaud, souvent vite. La casse en fin de service n'arrive pas au hasard.</p>

<p><strong>Un problème d'hygiène.</strong> C'est le coût le moins visible et le plus embêtant. Un verre qui sort d'un cycle correct est propre et désinfecté. Le torchon, lui, a servi toute la soirée, il est tiède et humide — c'est-à-dire dans les conditions idéales pour entretenir une flore. Essuyer un verre désinfecté avec ce torchon annule le travail de la machine. Le chapitre V de l'annexe II du règlement (CE) n° 852/2004 impose que les équipements en contact avec les denrées soient nettoyés et désinfectés de manière à limiter le risque de contamination : le dernier objet touché par le verre fait partie de la chaîne, et un inspecteur le sait. Supprimer l'essuyage n'est pas seulement un confort, c'est un maillon de moins à maîtriser.</p>

<h2>Et le financement</h2>

<p>Un lave-verres équipé d'un osmoseur peut entrer dans le champ des aides à la prévention des risques professionnels, parce qu'il supprime une tâche répétitive de plonge. Nous avons traité ce sujet à part, dossier et conditions compris, dans notre article sur le <a href="/conseils/subvention-lave-verres-osmoseur">lave-verres avec osmoseur subventionné</a>. Le présent article est technique : il vous dit ce qu'il faut. L'autre vous dit comment le payer.</p>

<h2>Ce que nous faisons</h2>

<p>Nous installons et entretenons les laveries de restauration de la Crau au Comtat, toutes marques. Sur ce sujet précis, notre travail consiste à mesurer avant de proposer : la dureté, l'état de l'existant, la cadence réelle. Ensuite seulement on parle de matériel.</p>

<p>Nous livrons également les détergents et liquides de rinçage adaptés à l'eau traitée — un produit dosé pour une eau à 38 °f n'est pas le même que pour une eau osmosée, et beaucoup de surdosages viennent de là. Le catalogue est sur notre page <a href="/produits">produits d'entretien</a>, livraison assurée par nos techniciens. Le détartrage périodique du surchauffeur, lui, fait partie des points vus lors des visites de <a href="/services/contrat-entretien-cuisine-professionnelle">contrat d'entretien</a> : sur une eau dure, c'est une opération de calendrier, pas une réparation.</p>
`,
    faq: [
      {
        q: "Un adoucisseur suffit-il pour ne plus avoir de verres voilés ?",
        r: `<p>Non, et c'est la confusion la plus fréquente. Un adoucisseur échange le calcium et le magnésium contre du sodium : il empêche le calcaire de se déposer et protège la machine, mais la quantité de sels dissous dans l'eau reste comparable. Une goutte qui sèche laisse donc toujours une marque, simplement ce n'est plus du calcaire. Pour un verre qui sèche seul sans trace, il faut retirer les sels — osmose inverse ou déminéralisation par résines — et non les remplacer.</p>`,
      },
      {
        q: "Mes verres sont-ils récupérables ?",
        r: `<p>Cela dépend du défaut. Faites tremper un verre une heure dans un détartrant acide dilué : s'il redevient clair, il s'agit d'un dépôt minéral et le problème se règle en amont, sur l'eau. S'il reste voilé, la surface du verre est corrodée, le dommage est définitif et les verres sont à remplacer. Dans ce second cas, vérifiez le réglage de votre adoucisseur et le dosage du détergent : une eau trop douce associée à un produit trop alcalin et à une température élevée est la cause classique.</p>`,
      },
      {
        q: "Quelle est la dureté de l'eau dans notre secteur ?",
        r: `<p>Élevée partout. Les analyses du contrôle sanitaire de l'ARS relevaient au premier semestre 2026 environ 38,7 °f à Saint-Martin-de-Crau, 36,87 °f sur le réseau ville d'Arles et 39,6 °f sur le réseau Mas-Thibert ; le distributeur du Grand Avignon publie 30,66 °f pour Avignon. Une eau est dite dure entre 30 et 40 °f. Ces valeurs communales sont un ordre de grandeur : la dureté à votre robinet peut différer, c'est pourquoi nous la mesurons sur place.</p>`,
      },
      {
        q: "Un osmoseur consomme-t-il beaucoup d'eau et d'entretien ?",
        r: `<p>Une membrane d'osmose inverse rejette une part de l'eau qui la traverse : c'est le principe même du procédé, et ce volume doit être intégré au calcul avant l'installation. Côté entretien, la membrane et les préfiltres ont une durée de vie liée à la qualité de l'eau d'entrée — d'où l'intérêt d'un adoucisseur en amont sur une eau à près de 40 °f, qui allonge nettement l'intervalle de remplacement. C'est un équipement à entretenir au calendrier, pas à installer et oublier.</p>`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 7 septembre 2026 — contrôle d'hygiène
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'controle-hygiene-restaurant',
    photo: null,
    titre: "Contrôle d'hygiène en restaurant : les points qui reviennent",
    titreSeo: "Contrôle d'hygiène restaurant : ce qui est vérifié | SODILAME",
    description: "Qui contrôle depuis 2024, ce qui déclenche une visite, les niveaux Alim'confiance et les points relevés le plus souvent dans les cuisines que nous entretenons.",
    date: '2026-09-07',
    dateAffichee: '7 septembre 2026',
    categorie: 'Hygiène & HACCP',
    resume: "Ce n'est pas le classeur qui est jugé, c'est la cohérence entre ce qu'il affirme et ce que fait la cuisine. Les constats qui reviennent le plus souvent sont techniques, et presque tous se corrigent avant la visite.",
    corps: `
<p>Un contrôle sanitaire ne se prépare pas la veille. Il se prépare dans les six mois qui précèdent, et il se joue en grande partie sur du matériel, pas sur du papier.</p>

<p>Nous entretenons des cuisines professionnelles entre la Crau, les Alpilles et le Comtat. Nos techniciens ne sont pas inspecteurs, mais ils passent souvent après eux : quand un exploitant reçoit son rapport, c'est nous qu'il appelle pour corriger ce qui a été relevé. À force, la liste se répète. Elle est plus courte qu'on ne le croit, et elle est presque toujours technique.</p>

<h2>Qui contrôle, et ce qui a changé en 2024</h2>

<p>Jusqu'en 2023, la compétence était partagée entre la DGCCRF et les services vétérinaires. Depuis le <strong>1<sup>er</sup> janvier 2024</strong>, le ministère de l'Agriculture est seul compétent en matière de sécurité sanitaire des aliments : c'est la police sanitaire unique de l'alimentation, pilotée par la DGAL. Sur le terrain, les contrôles sont conduits par la <strong>DDPP</strong> (direction départementale de la protection des populations) ou la <strong>DDETSPP</strong> selon le département — DDPP dans les Bouches-du-Rhône, le Vaucluse et le Gard.</p>

<p>Un point que peu d'exploitants connaissent : depuis cette réforme, une partie des inspections en remise directe au consommateur — restaurants, métiers de bouche, grandes surfaces, marchés — est <strong>déléguée à des organismes publics et privés</strong> mandatés par l'État. L'inspecteur qui se présente n'est donc pas nécessairement un agent de l'État. Il dispose des mêmes prérogatives, porte une carte professionnelle, et refuser le contrôle expose aux mêmes suites que face à un agent.</p>

<p>En pratique : demandez la carte, notez le nom, le service ou l'organisme, et l'heure d'arrivée. Ce n'est pas de la défiance, c'est la base d'un dossier propre si vous devez répondre par écrit ensuite.</p>

<h2>Ce qui déclenche une visite</h2>

<ul>
  <li><strong>La programmation annuelle.</strong> Chaque département établit un plan d'inspection ; la fréquence dépend du niveau de risque de l'établissement, pas du hasard.</li>
  <li><strong>Un signalement.</strong> Un client, un ancien salarié, un voisin. C'est le motif qui monte le plus vite.</li>
  <li><strong>Une suspicion d'intoxication alimentaire collective.</strong> La visite est alors immédiate et le périmètre beaucoup plus large.</li>
  <li><strong>Un contrôle précédent mal noté.</strong> Une évaluation « à améliorer » appelle une contre-visite.</li>
  <li><strong>Une ouverture ou une reprise.</strong> La déclaration d'activité auprès de la DDPP met l'établissement sur la carte.</li>
</ul>

<p>Le contrôle est inopiné et se déroule aux heures d'activité, souvent en plein service. Ce n'est pas une brimade : une cuisine à l'arrêt ne montre rien. Ce que l'inspecteur veut voir, c'est la cuisine en marche.</p>

<h2>Comment se déroule l'inspection</h2>

<p>L'inspecteur travaille avec une grille nationale. Le vade-mecum de la DGAL pour le domaine de la sécurité sanitaire des aliments l'organise en six chapitres : identification de l'établissement, <strong>locaux et équipements</strong> (conception, circuits, nuisibles, maintenance, nettoyage-désinfection), <strong>maîtrise de la chaîne de production</strong> (analyse des dangers, contrôles à réception, maîtrise des températures, eau potable), <strong>traçabilité et gestion des non-conformités</strong>, <strong>gestion des déchets et sous-produits animaux</strong>, et <strong>gestion du personnel</strong> (hygiène, formation).</p>

<p>Deux chapitres sur six concernent directement l'état du matériel et sa maintenance. C'est là que nous intervenons, et c'est là que nous voyons le plus de points perdus.</p>

<p>L'ordre habituel : le tour des locaux d'abord, appareil par appareil, avec un thermomètre étalonné ; les documents ensuite. À la fin, un relevé de constatations est établi et vous pouvez y porter vos observations. Lisez-le avant de signer, et faites préciser tout constat que vous jugez inexact — c'est le seul moment où c'est simple à faire.</p>

<h2>Alim'confiance : la note est publique, et elle reste un an</h2>

<p>Depuis la loi d'avenir pour l'agriculture, l'alimentation et la forêt du 13 octobre 2014, les résultats des contrôles sont publiés. Les modalités ont été fixées par le <strong>décret n° 2016-1750 du 15 décembre 2016</strong> et l'<strong>arrêté du 28 février 2017</strong> ; la mise en ligne a commencé le 3 avril 2017 sur <em>alim-confiance.gouv.fr</em>, repris par plusieurs applications grand public.</p>

<p>Quatre niveaux :</p>

<ul>
  <li><strong>Très satisfaisant</strong> — aucune non-conformité, ou uniquement des non-conformités mineures.</li>
  <li><strong>Satisfaisant</strong> — des non-conformités mineures, assorties d'un rappel à la réglementation.</li>
  <li><strong>À améliorer</strong> — des mesures correctives sont exigées dans un délai fixé par l'administration.</li>
  <li><strong>À corriger de manière urgente</strong> — des non-conformités susceptibles de mettre en danger la santé du consommateur.</li>
</ul>

<p>Le point qui surprend les exploitants : le résultat <strong>reste en ligne un an à compter de la date du contrôle</strong>. Corriger ne l'efface pas. Seule une nouvelle inspection produit une nouvelle note. Un « à améliorer » obtenu en mars pèse donc sur toute la saison, quelle que soit la rapidité avec laquelle vous avez repris les choses en main.</p>

<h2>Les sept points que nous retrouvons le plus souvent</h2>

<h3>1. Le relevé de température qui ne prouve rien</h3>

<p>Un cahier où la chambre froide affiche 3 °C tous les jours de l'année, dimanches de fermeture compris, ne démontre rien — sinon que personne n'est allé regarder. Un relevé crédible respire : il bouge en service, il monte après une livraison, il repart. Ce sont les carnets trop réguliers qui attirent l'attention, pas ceux qui montrent des écarts assumés et corrigés.</p>

<h3>2. La sonde qui ment</h3>

<p>C'est le constat le plus fréquent de nos interventions après contrôle. L'afficheur de la chambre froide indique 3 °C, le thermomètre étalonné de l'inspecteur en lit 7. La sonde a dérivé, ou elle est mal placée — collée à l'évaporateur, elle lit l'air soufflé, pas la denrée. Vos relevés sont alors sincères et faux en même temps, ce qui est la pire des situations : ils prouvent que vous n'avez pas vu le problème.</p>

<p>Le contrôle prend deux minutes : un thermomètre de référence, posé au milieu de la chambre, à hauteur de produit, comparé à l'afficheur. Si l'écart dépasse un degré, la sonde est à recalibrer.</p>

<h3>3. Les joints de porte</h3>

<p>Un joint durci, fendu, ou dont l'aimantation est morte laisse entrer de l'air chaud et humide en continu. Résultat : le groupe ne s'arrête plus, le givre s'installe, la température moyenne monte de deux degrés sans qu'aucune alarme ne se déclenche. Le test de la feuille de papier — vous la coincez dans la porte, elle doit résister à la traction, sur tout le pourtour — se fait en une minute par porte. C'est probablement le meilleur rapport entre le temps passé et le risque évité de toute cette liste.</p>

<h3>4. L'évaporateur givré et le bac à condensats</h3>

<p>Un évaporateur pris en glace ne fait plus circuler l'air : il se crée des zones à cinq degrés dans une chambre censée en afficher trois. Le bac à condensats et son siphon, eux, sont presque toujours oubliés du plan de nettoyage — et ce sont des points d'eau stagnante à l'intérieur même de l'enceinte réfrigérée. Un inspecteur qui ouvre un capot d'évaporateur sait exactement ce qu'il cherche.</p>

<h3>5. Le dessous et l'arrière des équipements</h3>

<p>Les surfaces visibles sont propres partout. Les non-conformités se relèvent sous le piano, derrière la friteuse, sur les pieds réglables, dans les rails des tiroirs réfrigérés et sous les plans de travail sur roulettes qui ne bougent jamais. Un plan de nettoyage qui ne nomme pas ces surfaces ne les fait pas nettoyer.</p>

<h3>6. La température de rinçage du lave-vaisselle</h3>

<p>Une machine dont la résistance de surchauffeur est entartrée continue d'afficher sa consigne sans jamais l'atteindre. Le résultat, ce sont des verres et des assiettes qui sortent chauds mais mal désinfectés, et un maillon de la chaîne d'hygiène qui saute en silence. En Provence, où l'eau est dure, c'est une panne lente et prévisible plutôt qu'un accident. Un relevé périodique de la température réelle de rinçage, et un traitement d'eau dimensionné, règlent la question — nous détaillons ce point sur notre page <a href="/services/laverie-restauration">laverie de restauration</a>.</p>

<h3>7. Le lave-mains et le poste de plonge</h3>

<p>Un lave-mains dont la commande n'est pas actionnable sans les mains, sans savon, sans essuie-mains à usage unique, ou transformé en rangement à éponges, est un constat immédiat. Même chose pour un poste de plonge sans séparation nette entre le sale et le propre. Ce sont les points les moins coûteux à corriger et parmi les plus souvent relevés.</p>

<h2>Ce qui se corrige avant, et ce qui ne se rattrape pas</h2>

<p>Se corrige la veille : le rangement, l'étiquetage, les fiches de données de sécurité au mur, l'affichage des températures de conservation, la présence des essuie-mains.</p>

<p>Ne se corrige pas la veille : un joint mort, une sonde dérivée, un évaporateur encrassé, un surchauffeur entartré, un conduit d'extraction gras. Ce sont des points de maintenance, ils se traitent au calendrier. C'est précisément l'objet d'un <a href="/services/contrat-entretien-cuisine-professionnelle">contrat d'entretien</a> : passer sur ces points une ou deux fois par an, et laisser derrière chaque visite un rapport daté. Ce rapport a une deuxième vie — c'est une preuve d'entretien, et la traçabilité des interventions est exactement ce qu'attend le chapitre « maintenance » de la grille d'inspection.</p>

<p>Pour la partie documentaire, tout est déjà décrit dans notre article sur le <a href="/conseils/plan-de-maitrise-sanitaire-restaurant">plan de maîtrise sanitaire</a> : bonnes pratiques d'hygiène, plan HACCP, traçabilité et gestion des non-conformités. Les valeurs à respecter et à afficher sont regroupées dans notre <a href="/conseils/temperatures-haccp-restauration">mémo des températures</a>. Deux repères, pour situer : l'analyse des dangers relève de l'article 5 du règlement (CE) n° 852/2004 ; la traçabilité, de l'article 18 du règlement (CE) n° 178/2002, qui impose de savoir d'où vient chaque produit et où il est parti. Le maintien au chaud à 63 °C jusqu'au service est fixé par l'arrêté du 21 décembre 2009.</p>

<p>Côté personnel, l'établissement doit compter au moins une personne justifiant d'une formation spécifique en hygiène alimentaire (article L. 233-4 du code rural et de la pêche maritime, décret n° 2011-731 du 24 juin 2011). Attention sur ce point : le cahier des charges de cette formation est désormais fixé par l'<strong>arrêté du 12 février 2024</strong>, qui a remplacé celui du 5 octobre 2011 au 1<sup>er</sup> mai 2024. Vérifiez que l'organisme qui vous a formé était bien enregistré au bon régime.</p>

<h2>Les suites possibles</h2>

<p>Elles vont du plus léger au plus lourd, et la plupart des visites s'arrêtent au premier échelon.</p>

<ul>
  <li><strong>Le rappel à la réglementation.</strong> Un courrier, pas de sanction. C'est l'issue la plus fréquente.</li>
  <li><strong>La mise en demeure.</strong> L'administration fixe les mesures à prendre et un délai pour les prendre (article L. 206-2 du code rural et de la pêche maritime). Une contre-visite vérifie l'exécution.</li>
  <li><strong>La suspension d'activité ou la fermeture administrative.</strong> Prononcée par le préfet lorsque la santé du consommateur est en jeu, ou lorsqu'une mise en demeure est restée sans effet (articles L. 233-1 et suivants du même code).</li>
  <li><strong>Les suites pénales</strong>, en cas d'infraction caractérisée, indépendantes des mesures administratives.</li>
</ul>

<p>Dans notre expérience, la fermeture n'arrive presque jamais d'un coup. Elle arrive au terme d'une chaîne : un premier constat pas traité, une mise en demeure dont le délai passe, une contre-visite qui trouve la même chose. Le moment où tout se joue, c'est le premier rapport.</p>

<h2>Ce que nous pouvons faire</h2>

<p>Nous n'écrivons pas votre plan de maîtrise sanitaire et nous ne sommes pas un bureau de certification. Nous intervenons sur la moitié technique du sujet : vérifier ce que valent vos températures réelles, contrôler les joints et les sondes, dégivrer et nettoyer les évaporateurs, détartrer les circuits de rinçage, contrôler l'extraction, et vous laisser un rapport daté par visite.</p>

<p>Nous proposons un audit technique de votre parc, sans engagement, toutes marques — y compris les équipements que nous n'avons pas vendus. Il ne remplace pas un contrôle : il vous dit ce qu'un contrôle trouverait.</p>
`,
    faq: [
      {
        q: "Un contrôle sanitaire est-il annoncé à l'avance ?",
        r: `<p>Non. Les contrôles sont inopinés et se déroulent aux heures d'activité de l'établissement, souvent en plein service. L'inspecteur — agent de la DDPP ou de la DDETSPP, ou contrôleur d'un organisme délégataire mandaté par l'État depuis 2024 — présente sa carte professionnelle à son arrivée. Refuser l'accès expose aux mêmes suites que l'infraction elle-même.</p>`,
      },
      {
        q: "Combien de temps la note Alim'confiance reste-t-elle en ligne ?",
        r: `<p>Un an à compter de la date du contrôle, sur alim-confiance.gouv.fr, conformément au décret n° 2016-1750 du 15 décembre 2016 et à son arrêté d'application du 28 février 2017. Corriger les non-conformités ne retire pas la note publiée : seule une nouvelle inspection produit un nouveau résultat.</p>`,
      },
      {
        q: "Que se passe-t-il si je conteste un constat du rapport ?",
        r: `<p>Le relevé de constatations est contradictoire : vous pouvez y porter vos observations avant de le signer, et c'est le moment le plus simple pour le faire. Vous pouvez ensuite répondre par écrit au service, pièces à l'appui — rapports d'intervention, factures de réparation, relevés. Une mise en demeure peut faire l'objet d'un recours gracieux auprès du préfet, puis d'un recours contentieux devant le tribunal administratif.</p>`,
      },
      {
        q: "Un contrat d'entretien améliore-t-il le résultat d'un contrôle ?",
        r: `<p>Il n'existe aucun lien automatique, et personne ne peut vous garantir une note. Ce qu'un entretien régulier apporte concrètement, c'est du matériel qui tient ses températures et une traçabilité des interventions — deux éléments que la grille d'inspection examine, au chapitre des locaux et équipements comme à celui de la maîtrise des températures. La plupart des constats techniques que nous corrigeons après un contrôle auraient été vus lors d'une visite d'entretien.</p>`,
      },
    ],
  },

]

export default articlesNouveaux
