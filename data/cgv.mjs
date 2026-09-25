// ---------------------------------------------------------------------------
// CONDITIONS GÉNÉRALES DE VENTE ET DE PRESTATIONS DE SERVICES
//
// Texte de référence : CGV SODILAME version 2.1, en vigueur au 1er novembre
// 2026. Ce fichier est la version publiée sur www.sodilame.com/cgv, adresse
// citée par le bloc COMMUN-2 imprimé au bas de chaque devis, bon de commande,
// bon de livraison et facture (cahier des charges GDSOFT du 25/09/2026).
//
// ⚠️  CE TEXTE EST CONTRACTUEL. Il n'est pas de la rédaction marketing : une
//     reformulation, même heureuse, change la portée d'une clause. Toute
//     modification doit venir du document de référence, et la version publiée
//     ici doit rester identique au PDF remis aux clients et annexé aux devis.
//     Si les deux divergent, c'est le client qui arbitrera — contre nous.
//
// ⚠️  UNE SEULE DIFFÉRENCE VOULUE AVEC LE PDF v2.1, décidée le 25/09/2026 :
//     l'article 11.1 annonçait que le barème des communes et des zones était
//     « disponible sur www.sodilame.com ». Il ne l'est pas, et il ne doit pas
//     l'être — les tarifs d'intervention restent sur la plaquette papier. La
//     phrase ne conserve donc que « communiqué sur simple demande ».
//     Le PDF doit être corrigé à l'identique avant diffusion.
// ---------------------------------------------------------------------------

export const cgv = {
  version: '2.1',
  entreeEnVigueur: '1er novembre 2026',
  // Date ISO, pour comparer sans ambiguïté à la date du build.
  entreeEnVigueurIso: '2026-11-01',

  articles: [
    {
      id: 'a1',
      titre: "Objet et champ d'application",
      corps: `
<p><b>1.1.</b> Les présentes Conditions Générales de Vente et de Prestations de Services (ci-après les « <b>CGV</b> ») ont pour objet de définir les conditions dans lesquelles la société SODILAME (ci-après « <b>SODILAME</b> ») vend, livre, installe, met en service, dépanne et entretient tous matériels et équipements de cuisine professionnelle, de production et de conservation du froid, de laverie, de buanderie et de blanchisserie professionnelles, ainsi que les pièces détachées, consommables et produits lessiviels associés.</p>
<p><b>1.2.</b> Les présentes CGV s'appliquent exclusivement aux clients agissant dans le cadre de leur activité professionnelle : restaurateurs, hôteliers, boulangers, bouchers, traiteurs, collectivités, établissements de santé, blanchisseries, laveries, entreprises et acheteurs publics ou privés (ci-après le « <b>Client</b> »). Elles ne s'appliquent pas aux consommateurs au sens de l'article liminaire du code de la consommation. Lorsque le Client est un acheteur soumis au code de la commande publique, les présentes CGV s'appliquent <b>sous réserve des dispositions de l'article 28</b>, qui prévalent sur toute stipulation contraire.</p>
<p><b>1.3.</b> Conformément à l'article L. 441-1 du code de commerce, les présentes CGV constituent le <b>socle unique de la négociation commerciale</b>. Elles sont communiquées à tout Client professionnel qui en fait la demande.</p>
<p><b>1.4.</b> Le fait pour SODILAME de ne pas se prévaloir à un moment donné de l'une quelconque des présentes clauses ne peut être interprété comme une renonciation à s'en prévaloir ultérieurement.</p>`,
    },
    {
      id: 'a2',
      titre: 'Définitions',
      corps: `
<ul>
<li><b>Matériel</b> : tout équipement, appareil, machine, pièce détachée, accessoire ou consommable vendu ou fourni par SODILAME.</li>
<li><b>Prestations</b> : toute intervention réalisée par SODILAME — étude, conception, livraison, manutention, installation, raccordement, mise en service, formation, dépannage, réparation, maintenance préventive ou curative.</li>
<li><b>Site</b> : le lieu d'exécution des Prestations désigné par le Client.</li>
<li><b>Commande</b> : le devis, bon de commande ou marché accepté par le Client dans les conditions de l'article 4.</li>
<li><b>Contrat</b> : l'ensemble formé par la Commande, ses annexes et les présentes CGV.</li>
</ul>`,
    },
    {
      id: 'a3',
      titre: 'Documents contractuels et opposabilité',
      corps: `
<p><b>3.1.</b> Toute Commande passée à SODILAME emporte de plein droit acceptation sans réserve des présentes CGV par le Client, qui reconnaît en avoir pris connaissance préalablement et renonce expressément à se prévaloir de ses propres conditions générales ou particulières d'achat.</p>
<p><b>3.2.</b> En cas de contradiction, l'ordre de priorité décroissante est le suivant : (i) les conditions particulières écrites et signées par les deux parties, (ii) le devis ou bon de commande accepté, (iii) les présentes CGV, (iv) tout autre document.</p>
<p><b>3.3.</b> Aucune dérogation aux présentes CGV n'est opposable à SODILAME si elle n'a pas fait l'objet d'un écrit signé par un représentant habilité de SODILAME. Aucune mention portée unilatéralement par le Client sur un bon de commande, un bon de livraison ou tout autre document n'est opposable à SODILAME.</p>
<p><b>3.4.</b> SODILAME se réserve le droit de modifier les présentes CGV à tout moment. La version applicable est celle en vigueur à la date de la Commande.</p>`,
    },
    {
      id: 'a4',
      titre: 'Devis, études et commandes',
      corps: `
<p><b>4.1. Validité.</b> Sauf mention contraire, les devis établis par SODILAME sont valables <b>trente (30) jours calendaires</b> à compter de leur date d'émission. Passé ce délai, ils sont caducs et les prix révisables sans préavis.</p>
<p><b>4.2. Formation du contrat.</b> La Commande n'est définitive et n'engage SODILAME qu'après (i) retour du devis daté, signé et revêtu de la mention « Bon pour accord », par une personne habilitée à engager le Client, <b>et</b> (ii) lorsqu'un acompte est prévu à l'article 6, son encaissement effectif.</p>
<p>Par exception, les <b>demandes de dépannage et d'intervention ponctuelle peuvent être formées verbalement</b>, notamment par téléphone. Le Contrat est alors conclu dès que SODILAME accepte la demande et convient d'une date ou d'un créneau d'intervention avec le Client, sans devis signé ni acompte, les présentes CGV s'appliquant dans les conditions de l'article 3.1. La confirmation écrite que SODILAME adresse le cas échéant au Client, par courriel ou message texte, mentionnant la date, le créneau et le renvoi aux présentes CGV, <b>fait foi de la date et de l'heure convenues</b> au sens de l'article 11.3.</p>
<p><b>4.3. Études et plans.</b> Les études d'implantation, plans, schémas techniques, notes de calcul et bilans de puissance réalisés par SODILAME sont établis sur la base des informations, cotes et relevés fournis par le Client. SODILAME n'est pas tenue d'en vérifier l'exactitude. Toute étude non suivie de commande peut être facturée si le devis le prévoit.</p>
<p><b>4.4. Modification.</b> Toute demande de modification du Client postérieure à la Commande (changement de référence, de quantité, de configuration, de planning ou de lieu de livraison) doit être formulée par écrit et n'est effective qu'après acceptation écrite de SODILAME. Elle peut donner lieu à un avenant tarifaire et à un report du délai d'exécution.</p>
<p><b>4.5. Matériels spécifiques.</b> Les Matériels fabriqués sur mesure, sur cotes, ou spécialement commandés auprès d'un fournisseur pour le compte du Client ne sont ni annulables, ni repris, ni échangés.</p>
<p><b>4.6. Retour de marchandises.</b> Aucun retour n'est accepté sans accord écrit préalable de SODILAME. Le Matériel repris doit être neuf, complet, non installé, dans son emballage d'origine intact, et retourné en port payé dans les quinze (15) jours de l'accord. Une <b>indemnité forfaitaire de restockage de 20 % du prix HT</b> est retenue, sans préjudice des frais de remise en état.</p>
<p><b>4.7. Devoir de conseil et adéquation du Matériel.</b> SODILAME exerce son devoir de conseil <b>sur la seule base des besoins, contraintes, volumes de production, cadences et caractéristiques du Site que le Client lui communique par écrit</b>. Il appartient au Client de décrire précisément son activité, ses usages, ses pics de charge et toute sujétion particulière. Lorsque le Client impose une marque, une référence, une configuration ou un dimensionnement, ou lorsqu'il modifie après coup ses conditions d'exploitation, <b>il assume le choix opéré et l'adéquation du Matériel à son usage réel</b>. Le Client reconnaît avoir reçu de SODILAME les informations et explications nécessaires pour arrêter son choix en connaissance de cause.</p>`,
    },
    {
      id: 'a5',
      titre: 'Prix',
      corps: `
<p><b>5.1.</b> Les prix sont exprimés en euros, <b>hors taxes</b>, départ entrepôt de SODILAME, hors frais de transport, de manutention, de mise à disposition de moyens de levage, d'installation, de raccordement et de mise en service, sauf stipulation contraire du devis.</p>
<p><b>5.2.</b> Les prix s'entendent pour des Prestations exécutées en une seule fois, pendant les heures ouvrables de SODILAME, soit <b>du lundi au jeudi de 8h00 à 12h00 et de 14h00 à 17h15, et le vendredi de 8h00 à 12h00 et de 14h00 à 16h00</b>, hors jours fériés. Toute intervention en dehors de ces plages, la nuit, le samedi, le dimanche ou un jour férié donne lieu à application des majorations du barème en vigueur.</p>
<p><b>5.3. Révision.</b> Pour les Commandes dont le délai d'exécution excède trois (3) mois, ou en cas de variation significative du coût des matières premières, des composants, des fluides frigorigènes, de l'énergie ou du transport, ou de hausse tarifaire décidée par le fabricant, SODILAME pourra réviser ses prix. Le Client en sera informé par écrit et disposera de quinze (15) jours pour annuler le solde non exécuté de la Commande sans indemnité de part et d'autre, à l'exclusion des Matériels déjà commandés ou fabriqués.</p>
<p><b>5.4. Barème et réductions de prix.</b> Le barème des prix unitaires de SODILAME et les conditions des éventuelles réductions de prix (remises quantitatives, remises de fin d'année, remises de gamme) sont communiqués sur demande. Aucune réduction de prix n'est acquise si elle n'est pas expressément mentionnée sur la facture.</p>
<p><b>5.5.</b> Toute taxe, contribution, éco-participation, redevance ou droit nouveau applicable à la date de facturation est répercuté sur le prix.</p>`,
    },
    {
      id: 'a6',
      titre: 'Conditions de règlement',
      corps: `
<h3>6.1. Échéancier — acompte obligatoire</h3>
<p><b>Le versement d'un acompte à la commande est obligatoire et constitue une condition de formation du Contrat pour toute vente de Matériel, avec ou sans installation</b> : aucune Commande de cette nature n'est enregistrée et aucun Matériel n'est approvisionné avant encaissement effectif de cet acompte. <b>Aucun acompte n'est en revanche exigé pour les dépannages et interventions ponctuelles</b>, dont la formation obéit à l'article 4.2. Sauf conditions particulières écrites, les règlements sont exigibles selon l'échéancier suivant :</p>
<table>
<thead><tr><th>Nature de la Commande</th><th>Échéancier</th></tr></thead>
<tbody>
<tr><td>Vente de Matériel avec installation ou chantier</td><td><b>50 %</b> d'acompte obligatoire à la Commande<br><b>40 %</b> au démarrage du chantier ou à la mise à disposition du Matériel<br><b>10 %</b> à la réception, contre levée des réserves</td></tr>
<tr><td>Vente de Matériel sans installation, pièces détachées, consommables et produits lessiviels</td><td>Paiement comptant à la commande ou avant enlèvement / expédition</td></tr>
<tr><td>Dépannage et interventions ponctuelles</td><td>Paiement comptant à l'issue de l'intervention, ou à trente (30) jours date de facture pour les Clients titulaires d'un compte ouvert</td></tr>
<tr><td>Contrats d'entretien</td><td>Facturation annuelle d'avance, ou selon la périodicité prévue au contrat</td></tr>
</tbody>
</table>
<p><b>6.2.</b> Lorsqu'un délai de paiement est accordé, il ne peut en aucun cas excéder les délais maximaux fixés par l'article L. 441-10 du code de commerce, soit <b>soixante (60) jours à compter de la date d'émission de la facture</b>, ou quarante-cinq (45) jours fin de mois si cette dérogation est expressément stipulée au contrat.</p>
<h3>6.3. Modes de paiement</h3>
<p>Les règlements s'effectuent par virement bancaire, chèque, carte bancaire ou espèces dans la limite légale. <b>Les lettres de change, billets à ordre et effets de commerce ne sont acceptés qu'après accord écrit exprès de SODILAME</b> et ne constituent ni novation ni dérogation à la clause de réserve de propriété. Le paiement n'est réputé réalisé qu'à l'encaissement effectif et définitif des fonds.</p>
<h3>6.4. Escompte</h3>
<p><b>Aucun escompte n'est accordé en cas de paiement anticipé.</b></p>
<h3>6.5. Pénalités de retard et indemnité de recouvrement</h3>
<p>Toute somme non payée à son échéance entraîne de plein droit, <b>sans qu'aucune mise en demeure soit nécessaire</b> :</p>
<ul>
<li>l'application de <b>pénalités de retard</b> calculées sur le montant TTC, au taux d'intérêt appliqué par la Banque centrale européenne à son opération de refinancement la plus récente <b>majoré de 10 points de pourcentage</b>, ce taux ne pouvant être inférieur à trois fois le taux d'intérêt légal, courant du lendemain de l'échéance jusqu'au paiement intégral ;</li>
<li>l'exigibilité d'une <b>indemnité forfaitaire pour frais de recouvrement de 40 euros</b> par facture impayée (articles L. 441-10 II et D. 441-5 du code de commerce), <b>ainsi qu'une indemnisation complémentaire sur justificatifs</b> lorsque les frais réellement exposés (honoraires d'avocat, frais d'huissier, frais de société de recouvrement) excèdent ce montant ;</li>
<li>l'application, à titre de <b>clause pénale</b> et après mise en demeure restée infructueuse huit (8) jours, d'une indemnité égale à <b>15 % des sommes dues</b>, avec un minimum de 150 euros, cette indemnité s'imputant sur l'indemnisation complémentaire visée à l'alinéa précédent.</li>
</ul>
<h3>6.6. Déchéance du terme et suspension</h3>
<p>Le défaut de paiement d'une seule échéance entraîne de plein droit, au choix de SODILAME : (i) la <b>déchéance du terme</b> et l'exigibilité immédiate de toutes les sommes dues au titre de l'ensemble des Commandes, même non échues ; (ii) la <b>suspension immédiate</b> de toutes livraisons, interventions, prestations de garantie et prestations d'entretien en cours, sans que le Client puisse invoquer un quelconque préjudice ; (iii) la mise en œuvre de la clause de réserve de propriété de l'article 7.</p>
<h3>6.7. Encours et garanties</h3>
<p>SODILAME peut à tout moment, notamment en cas de dégradation de la solvabilité du Client, de retard de paiement, de résiliation ou de réduction de couverture par son assureur-crédit, exiger des garanties de paiement (paiement d'avance, garantie bancaire à première demande, caution personnelle), réduire l'encours autorisé ou subordonner la poursuite du Contrat à leur obtention.</p>
<h3>6.8. Interdiction de compensation</h3>
<p>Le Client ne peut opérer aucune compensation, retenue ou réfaction unilatérale sur les sommes dues, notamment au titre d'une réclamation, d'une réserve ou d'un litige portant sur une autre Commande.</p>
<h3>6.9. Facturation électronique</h3>
<p>Dans le cadre de la réforme de la facturation électronique, le Client s'engage à <b>communiquer à SODILAME, dès l'ouverture de son compte et à chaque modification, son numéro SIREN, son adresse de facturation électronique et la plateforme agréée qu'il a retenue</b>, ainsi que toute donnée obligatoire au format de facture réglementaire (numéro de bon de commande, code service, mentions analytiques). <b>Le défaut, l'inexactitude ou la tardiveté de ces informations ne suspend ni le point de départ des délais de paiement, ni l'exigibilité des factures.</b> Les factures émises par SODILAME au format électronique et déposées sur la plateforme du Client sont réputées reçues à la date de leur mise à disposition sur celle-ci.</p>`,
    },
    {
      id: 'a7',
      titre: 'Clause de réserve de propriété',
      corps: `
<div class="callout">
<p><b>Clause essentielle — réserve de propriété.</b> SODILAME conserve la propriété pleine et entière des Matériels vendus jusqu'au paiement intégral et effectif du prix en principal, frais, taxes, pénalités et accessoires.</p>
</div>
<p><b>7.1. Principe.</b> Conformément aux articles 2367 à 2372 du code civil, le transfert de propriété des Matériels est suspendu jusqu'au complet paiement de leur prix. <b>La propriété est réservée sur la totalité de chaque Matériel, et non à hauteur de la seule fraction du prix restant due</b> : tant que le solde n'est pas soldé, le Matériel demeure intégralement la propriété de SODILAME. Le versement d'acomptes, quel qu'en soit le montant, n'opère aucun transfert, même partiel, de propriété. La présente clause ne s'applique pas aux consommables et produits lessiviels à compter de leur utilisation ou de leur incorporation.</p>
<p><b>7.2. Opposabilité.</b> La présente clause a été portée à la connaissance du Client et acceptée par écrit par lui au plus tard au moment de la livraison, conformément à l'article L. 624-16 du code de commerce.</p>
<p><b>7.3. Transfert des risques.</b> Par exception au transfert de propriété, <b>les risques de perte, vol, destruction et détérioration du Matériel, ainsi que la responsabilité des dommages qu'il pourrait causer, sont transférés au Client dès sa remise matérielle</b> (article 8).</p>
<p><b>7.4. Obligations du Client.</b> Jusqu'au complet paiement, le Client, simple détenteur précaire, s'oblige à :</p>
<ul>
<li>conserver les Matériels en bon état, individualisés, identifiables et séparés de tout matériel de même nature appartenant à des tiers ;</li>
<li>ne pas les revendre, les louer, les prêter, les mettre en gage, les nantir, les céder à titre de garantie ni les incorporer à un ensemble immobilier sans l'accord écrit préalable de SODILAME ;</li>
<li>les assurer, à ses frais, contre tous risques, auprès d'une compagnie notoirement solvable, et à en justifier à première demande. En cas de sinistre, l'indemnité d'assurance est déléguée de plein droit à SODILAME à concurrence du solde dû ;</li>
<li>informer immédiatement SODILAME de toute saisie, mesure conservatoire, revendication d'un tiers ou toute mesure susceptible de porter atteinte au droit de propriété de SODILAME, et de s'y opposer par tous moyens ;</li>
<li>informer tout tiers, notamment son bailleur, son assureur ou un éventuel acquéreur de son fonds, de l'existence de la présente clause.</li>
</ul>
<p><b>7.5. Revendication et reprise.</b> À défaut de paiement d'une seule échéance et huit (8) jours après une mise en demeure restée sans effet, SODILAME pourra <b>revendiquer et reprendre les Matériels</b>, où qu'ils se trouvent et aux frais du Client, sans préjudice de tous dommages et intérêts. Le Client autorise dès à présent SODILAME, ou toute personne mandatée par elle, à accéder aux locaux où les Matériels sont entreposés ou installés afin d'en constater l'existence, l'état et, le cas échéant, d'en reprendre possession, aux jours et heures ouvrables.</p>
<p><b>7.6. Imputation des acomptes.</b> En cas de reprise, <b>les acomptes et versements déjà encaissés restent acquis à SODILAME</b> à titre d'indemnité forfaitaire d'immobilisation, d'usage et de dépréciation, sans préjudice de son droit d'obtenir réparation du surplus du préjudice subi.</p>
<p><b>7.7. Revente autorisée.</b> Si SODILAME a autorisé par écrit la revente des Matériels non intégralement payés, la présente clause se reporte de plein droit sur la créance de prix détenue par le Client sur son propre acquéreur, laquelle est cédée à SODILAME à concurrence des sommes dues.</p>
<p><b>7.8. Procédure collective.</b> En cas d'ouverture d'une procédure de sauvegarde, de redressement ou de liquidation judiciaire à l'encontre du Client, SODILAME exercera son action en revendication ou en restitution dans les conditions et délais des articles L. 624-9 et suivants du code de commerce.</p>`,
    },
    {
      id: 'a8',
      titre: 'Livraison et transfert des risques',
      corps: `
<p><b>8.1. Délais.</b> Les délais de livraison et d'exécution sont donnés <b>à titre indicatif</b> et en fonction des disponibilités de SODILAME et de ses fournisseurs. Un dépassement de délai ne peut donner lieu à annulation de la Commande, à refus de la marchandise, à retenue de paiement, ni au versement de dommages et intérêts ou de pénalités, sauf clause pénale expressément acceptée par écrit par SODILAME et plafonnée conformément à l'article 17.</p>
<p><b>8.2. Suspension.</b> Le délai est suspendu de plein droit en cas de retard imputable au Client (défaut d'information, de plans, de choix, d'acompte, indisponibilité du Site, travaux tiers non achevés) et en cas de force majeure.</p>
<p><b>8.3. Transfert des risques.</b> <b>Les risques sont transférés au Client dès la remise matérielle des Matériels</b>, c'est-à-dire dès leur enlèvement par le Client ou son transporteur, ou dès leur déchargement sur le Site en cas de livraison par SODILAME, indépendamment du transfert de propriété (article 7).</p>
<p><b>8.4. Conditions d'accès et de déchargement.</b> Le Client garantit un accès carrossable au Site pour un véhicule poids lourd, une aire de déchargement dégagée, et la présence d'une personne habilitée à réceptionner. À défaut, les frais de déplacement, d'attente (facturée par tranche horaire), de nouvelle présentation, de stockage ou de moyens de manutention complémentaires (chariot, grue, monte-charge) sont à la charge du Client.</p>
<p><b>8.5. Réserves.</b> Il appartient au Client de <b>vérifier l'état et la conformité des Matériels au moment de la remise</b>, en présence du transporteur. Toute avarie, manquant ou non-conformité apparente doit faire l'objet de <b>réserves écrites, précises et détaillées</b> portées sur le bon de livraison ou la lettre de voiture, confirmées au transporteur par lettre recommandée avec accusé de réception <b>dans les trois (3) jours</b> conformément à l'article L. 133-3 du code de commerce, et notifiées à SODILAME dans le même délai. La mention « sous réserve de déballage » est sans valeur. À défaut, les Matériels sont réputés conformes et acceptés.</p>
<p><b>8.6. Livraisons partielles.</b> SODILAME se réserve la faculté de procéder à des livraisons partielles, qui donnent lieu à facturation au fur et à mesure.</p>`,
    },
    {
      id: 'a9',
      titre: 'Installation et mise en service',
      corps: `
<p><b>9.1. Périmètre.</b> Les Prestations d'installation comprennent exclusivement les travaux expressément décrits au devis. Sont notamment exclus, sauf mention contraire : les travaux de gros œuvre et de second œuvre, la maçonnerie, le carrelage, les cloisons, les faux plafonds, la création ou la modification d'arrivées et d'évacuations d'eau, de gaz, d'électricité, de ventilation et de désenfumage, le percement de murs porteurs, le désamiantage, l'adaptation du tableau électrique, la mise à la terre, la fourniture et la pose d'un adoucisseur d'eau, ainsi que la dépose et l'évacuation des anciens matériels.</p>
<h3>9.2. Obligations préalables du Client</h3>
<p>Le Client s'engage, <b>à ses frais, sous sa seule responsabilité et préalablement à l'intervention</b>, à :</p>
<ul>
<li>mettre à disposition un local <b>libre, propre, hors d'eau, hors d'air, éclairé et achevé</b>, aux dimensions conformes aux plans validés ;</li>
<li>faire réaliser et amener en attente, aux emplacements convenus, l'ensemble des <b>fluides et énergies</b> : alimentation électrique de puissance et de section adaptées, protégée par des dispositifs différentiels et de coupure conformes à la norme NF C 15-100 ; alimentations en eau froide et chaude, avec vannes d'arrêt et pression comprise dans les tolérances constructeur ; évacuations et siphons de sol ; alimentation gaz avec organe de coupure conforme, ainsi que les certificats de conformité correspondants ;</li>
<li>garantir une <b>ventilation, une extraction et un apport d'air neuf</b> conformes à la réglementation applicable aux locaux professionnels et aux prescriptions du fabricant, notamment pour les matériels à combustion, les laveries et les buanderies ;</li>
<li>faire réaliser, lorsque la dureté de l'eau l'exige, un <b>traitement d'eau adapté (adoucisseur, osmoseur, filtration)</b> pour tous les matériels alimentés en eau — lave-vaisselle, lave-verres, fours vapeur, machines à glace, laveuses, calandres, générateurs de vapeur ;</li>
<li>assurer la <b>faisabilité du passage et de la manutention</b> des Matériels (largeurs de portes, escaliers, ascenseurs, hauteurs sous plafond, résistance des planchers) et signaler par écrit toute contrainte particulière ;</li>
<li>obtenir toutes <b>autorisations administratives, de copropriété ou de bailleur</b> nécessaires ;</li>
<li>fournir tout élément relatif à la présence d'<b>amiante, de plomb ou de matériaux dangereux</b> (dossier technique amiante) ;</li>
<li>désigner un <b>interlocuteur unique</b> disposant du pouvoir de décider sur le Site.</li>
</ul>
<p><b>9.3.</b> À défaut d'exécution de ces obligations, SODILAME pourra suspendre ou reporter l'intervention. Les frais de déplacement, d'immobilisation des équipes et de matériel, ainsi que les frais de retour, seront facturés au Client au barème en vigueur, sans que le Client puisse invoquer un retard imputable à SODILAME.</p>
<p><b>9.4. Consommables de mise en service.</b> Sauf mention contraire, les fluides frigorigènes de complément, produits lessiviels, produits de rinçage, sel régénérant et consommables nécessaires aux essais et à la mise en service sont facturés en sus.</p>
<p><b>9.5. Formation.</b> La mise en service comprend une <b>prise en main du Matériel par le personnel du Client présent le jour de l'intervention</b>. Le Client s'oblige à assurer la présence des personnes concernées et à leur transmettre les notices d'utilisation et de sécurité. Toute session de formation complémentaire fait l'objet d'un devis distinct.</p>
<p><b>9.6. Coactivité.</b> Lorsque SODILAME intervient sur un chantier en présence d'autres entreprises, le Client fait son affaire de la coordination, du plan de prévention et des mesures de sécurité collectives. SODILAME décline toute responsabilité au titre des dommages causés par les autres intervenants ou du fait d'un retard résultant de leur intervention.</p>
<p><b>9.7. Prévention et sécurité sur le Site.</b> Le Client intervient en qualité d'<b>entreprise utilisatrice</b>. Il lui incombe, préalablement à toute intervention, d'établir avec SODILAME le <b>plan de prévention</b> et, pour les opérations de chargement et de déchargement, le <b>protocole de sécurité</b> lorsque la réglementation l'exige, de communiquer les consignes de sécurité et les risques propres à son établissement, de désigner les zones et circulations autorisées, et de mettre à disposition les moyens de secours et les points de coupure des énergies. Le Client garantit que les installations électriques, gaz et de ventilation du Site ont fait l'objet des <b>vérifications périodiques réglementaires</b> et en communique les rapports sur demande.</p>`,
    },
    {
      id: 'a10',
      titre: 'Réception des travaux',
      corps: `
<p><b>10.1.</b> La réception intervient <b>contradictoirement, à l'achèvement des Prestations</b>, et donne lieu à l'établissement d'un procès-verbal signé des deux parties, mentionnant le cas échéant les réserves.</p>
<p><b>10.2.</b> À défaut de réception contradictoire dans les <b>huit (8) jours</b> de la convocation écrite de SODILAME, ou en cas de <b>mise en exploitation ou d'utilisation effective</b> du Matériel par le Client, la réception est réputée acquise sans réserve à la date de la convocation ou de la première utilisation.</p>
<p><b>10.3.</b> Les réserves doivent être précises, motivées et techniquement caractérisées. Elles ne dispensent pas le Client du paiement du solde exigible au titre de l'article 6.1, à l'exception d'une <b>retenue proportionnée à la valeur des travaux réservés, plafonnée à 5 % du montant HT de la Commande</b> et libérée dès la levée des réserves. Le solde de 10 % prévu à l'article 6.1 est donc payable à la réception, sous la seule déduction de cette retenue.</p>
<p><b>10.4.</b> La réception fait courir le point de départ des garanties visées à l'article 15.</p>
<p><b>10.5. Documents remis.</b> Sont remis au Client à la réception, contre émargement du procès-verbal : les <b>notices d'utilisation, d'entretien et de sécurité</b> des Matériels, les certificats de conformité et déclarations CE des fabricants, le procès-verbal de mise en service et, le cas échéant, les fiches d'intervention relatives aux circuits frigorifiques. <b>La remise des attestations de conformité des installations électriques et gaz du Site (Consuel, Qualigaz ou équivalent) incombe au Client</b> ou aux entreprises ayant réalisé ces installations, sauf lorsque ces travaux figurent expressément au devis de SODILAME.</p>`,
    },
    {
      id: 'a11',
      titre: 'Dépannage et service après-vente',
      corps: `
<p><b>11.1. Facturation.</b> Sauf prise en charge au titre de la garantie ou d'un contrat d'entretien, toute intervention est facturée selon le barème en vigueur, comprenant :</p>
<ul>
<li>un <b>forfait de déplacement</b> déterminé par la commune d'intervention, selon le découpage en cinq zones du barème SODILAME (de 23 € HT en zone 1 à 170 € HT en zone 5) ;</li>
<li>la <b>main-d'œuvre au tarif de 70,00 € HT de l'heure</b>, décomptée par tranche horaire indivisible, temps de diagnostic et de recherche de panne inclus ;</li>
<li>les <b>pièces détachées, fluides et consommables</b> employés ;</li>
<li>le cas échéant, les frais de traitement des déchets, de moyens de levage ou de manutention et les majorations pour intervention hors heures ouvrables.</li>
</ul>
<p>Le barème complet des communes et des zones est communiqué au Client sur simple demande. Les tarifs sont révisables à tout moment ; le tarif applicable est celui en vigueur au jour de l'intervention.</p>
<p><b>11.2. Déplacement sans réparation.</b> Le forfait de déplacement, le temps de recherche de panne et le temps passé restent dus dans tous les cas, y compris lorsque : aucune panne n'est constatée, le défaut résulte d'une mauvaise utilisation ou d'un défaut d'entretien, l'accès au Matériel n'a pas été rendu possible, ou le Client refuse le devis de réparation.</p>
<p><b>11.3. Annulation ou report d'une intervention programmée.</b> Toute demande d'intervention acceptée par SODILAME donne lieu à la <b>réservation d'un créneau et d'un technicien</b>, qui ne peuvent plus être affectés à un autre client. En conséquence, lorsque le Client annule, reporte ou rend impossible une intervention programmée <b>moins de vingt-quatre (24) heures ouvrables avant l'heure convenue</b>, ou le jour même, SODILAME est en droit de facturer, <b>à titre d'indemnité forfaitaire d'immobilisation</b>, le forfait de déplacement de la zone concernée majoré d'<b>une (1) heure de main-d'œuvre au tarif en vigueur</b>.</p>
<p>Cette indemnité est due dans tous les cas d'annulation tardive, quel qu'en soit le motif, et notamment lorsque :</p>
<ul>
<li>le Client a <b>fait intervenir un tiers dans l'intervalle</b> sans en informer SODILAME sans délai ;</li>
<li>le Matériel a été remis en service, remplacé ou déposé entre-temps ;</li>
<li>le Site est fermé, inaccessible, ou aucune personne habilitée n'est présente à l'heure convenue ;</li>
<li>le Matériel n'est pas accessible, n'est pas à l'arrêt, ou n'a pas été vidé, nettoyé ou dégagé comme convenu.</li>
</ul>
<p>Lorsque le technicien est <b>déjà parti ou déjà sur place</b> au moment de l'annulation, sont facturés le déplacement effectif et l'intégralité du temps passé, sans application de l'indemnité forfaitaire. Aucune indemnité n'est due si l'annulation est notifiée par écrit plus de vingt-quatre (24) heures ouvrables avant l'heure convenue. Réciproquement, SODILAME informe le Client dans les meilleurs délais de toute impossibilité d'intervenir à la date convenue et lui propose une nouvelle date sans frais supplémentaires.</p>
<p><b>11.4. Devis de réparation.</b> Lorsque le coût prévisible de la réparation excède <b>400 euros HT</b>, SODILAME établit un devis préalable et suspend l'intervention dans l'attente de l'accord écrit du Client. En deçà de ce seuil, le Client autorise SODILAME à procéder directement à la réparation. Les <b>frais de démontage, de diagnostic et de remontage restent dus en cas de refus du devis</b>. À défaut de réponse du Client dans les trente (30) jours, le devis est réputé refusé et l'article 14 s'applique.</p>
<p><b>11.5. Délais.</b> Les délais d'intervention sont indicatifs. Ils dépendent de la disponibilité des pièces auprès des fabricants. SODILAME ne garantit aucun délai de rétablissement, sauf engagement spécifique souscrit dans un contrat d'entretien.</p>
<p><b>11.6. Pièces remplacées.</b> Les pièces défectueuses remplacées deviennent la propriété de SODILAME et sont évacuées et traitées par ses soins, sauf demande écrite contraire du Client formulée avant l'intervention.</p>
<p><b>11.7. Sécurité.</b> SODILAME se réserve le droit de <b>refuser ou d'interrompre toute intervention</b> sur un Matériel présentant un danger, non conforme, modifié, ou dont l'environnement (installation électrique, gaz, ventilation) présente un risque pour les personnes. Le Client en est informé par écrit et fait son affaire de la mise en conformité.</p>
<p><b>11.8. Pièces en échange standard.</b> Certaines pièces (compresseurs, cartes électroniques, moteurs, pompes, groupes) ne sont fournies qu'en <b>échange standard</b>. La pièce défectueuse doit alors être restituée à SODILAME dans son emballage d'origine, complète et non démontée, <b>dans les quinze (15) jours</b> de la pose. À défaut de restitution dans ce délai, ou en cas de pièce détériorée, incomplète ou non identifiable, <b>la consigne facturée reste définitivement acquise à SODILAME</b>, ou la pièce est facturée à son prix neuf.</p>
<p><b>11.9. Matériel de remplacement.</b> La mise à disposition d'un matériel de remplacement pendant l'immobilisation n'est jamais de droit. Lorsqu'elle est accordée, elle fait l'objet d'un écrit précisant sa durée et son coût. Le matériel prêté demeure la propriété de SODILAME ; le Client en est gardien, l'utilise conformément à sa destination, l'assure et le restitue en bon état de fonctionnement et de propreté. Toute détérioration, perte ou restitution tardive est facturée.</p>`,
    },
    {
      id: 'a12',
      titre: "Contrats d'entretien et de maintenance",
      corps: `
<p><b>12.1.</b> Les contrats d'entretien font l'objet de conditions particulières précisant le parc couvert, la nature et la périodicité des visites, les délais d'intervention, les prestations incluses et exclues, et le prix. Les présentes CGV s'y appliquent à titre supplétif.</p>
<p><b>12.2. Durée et reconduction.</b> Sauf stipulation contraire, les contrats sont conclus pour une durée d'<b>un (1) an</b>, reconduits tacitement par périodes d'un an, sauf dénonciation par lettre recommandée avec accusé de réception adressée <b>au moins trois (3) mois avant l'échéance</b>.</p>
<p><b>12.3. Révision annuelle.</b> Le prix du contrat est <b>majoré de plein droit de 5 % à chaque échéance annuelle</b>, sans formalité ni préavis, afin de tenir compte de l'évolution des coûts de main-d'œuvre, de transport et de fournitures. Cette majoration s'applique au prix de la période précédente. SODILAME pourra, en outre, réviser le prix en cours de période en cas de variation exceptionnelle du parc couvert ou de son périmètre, après information écrite du Client.</p>
<p><b>12.4. Prestations incluses.</b> Sauf stipulation contraire, le contrat couvre la <b>maintenance préventive</b> : visites planifiées, contrôles de fonctionnement et de sécurité, nettoyage des organes techniques, réglages, contrôles d'étanchéité réglementaires et rapport de visite. <b>Les pièces détachées, les fluides, les consommables et les interventions curatives ne sont pas inclus</b>, sauf formule expressément souscrite.</p>
<p><b>12.5. Obligations du Client.</b> Le Client s'engage à rendre le Matériel accessible et à l'arrêt aux dates convenues, à effectuer les opérations d'entretien courant lui incombant (nettoyage quotidien, détartrage, remplacement des filtres et joints d'usage, vidange des bacs, ramassage des peluches et nettoyage des filtres de sèche-linge), et à signaler sans délai toute anomalie. <b>Une visite ne pouvant être réalisée du fait du Client est réputée effectuée et reste due.</b></p>
<p><b>12.6. Résiliation.</b> En cas de manquement du Client, notamment de défaut de paiement, SODILAME pourra suspendre les Prestations puis résilier le contrat de plein droit huit (8) jours après mise en demeure restée infructueuse, les sommes correspondant à la période contractuelle en cours restant intégralement dues.</p>
<p><b>12.7. Télésurveillance et télémaintenance.</b> Lorsque le Matériel dispose d'une fonction de communication à distance, le Client autorise SODILAME à s'y connecter aux fins de diagnostic, de paramétrage, de mise à jour et de suivi des alarmes, et met à disposition la connexion réseau nécessaire, à ses frais. Les données techniques et d'exploitation ainsi collectées peuvent être utilisées par SODILAME à des fins de maintenance, de statistiques et d'amélioration de ses prestations. <b>La télésurveillance ne constitue en aucun cas une garantie de détection, un dispositif d'alarme ou une prestation de télésurveillance au sens de l'article 17.4</b>, et ne dispense pas le Client de ses propres moyens de surveillance et d'alarme. SODILAME n'assume aucune obligation de veille permanente, de délai de réaction ni de remontée d'alarme, et sa responsabilité ne peut être engagée à raison d'une anomalie non détectée, non transmise ou transmise tardivement par ce moyen, ni d'une interruption de la connexion réseau du Client.</p>`,
    },
    {
      id: 'a13',
      titre: 'Fluides frigorigènes et obligations réglementaires',
      corps: `
<p><b>13.1.</b> SODILAME est titulaire de l'<b>attestation de capacité « Fluides Frigorigènes » n° ACO/SQ026146-001, catégorie I</b>, délivrée le 11 septembre 2026 par SOCOTEC Certification France en application de l'article R. 543-99 du code de l'environnement, et valable jusqu'au 10 septembre 2031. Cette attestation couvre le contrôle d'étanchéité, la maintenance, l'entretien, l'assemblage, la mise en service et la récupération des fluides sur les équipements de réfrigération, de climatisation et de pompe à chaleur, quelle que soit leur charge. Les opérations sont réalisées par du personnel titulaire d'une attestation d'aptitude, conformément aux articles R. 543-75 et suivants du code de l'environnement et au règlement (UE) 2024/573 relatif aux gaz à effet de serre fluorés.</p>
<p><b>13.2. Qualité de détenteur.</b> Le Client est informé qu'en sa qualité d'<b>exploitant et détenteur des équipements</b> contenant des fluides frigorigènes, il lui incombe personnellement : de faire réaliser les <b>contrôles périodiques d'étanchéité</b> aux fréquences légales déterminées par la charge exprimée en tonnes équivalent CO₂ ; de faire procéder sans délai à la réparation de toute fuite détectée et à son contrôle de suivi ; de <b>conserver et tenir à disposition de l'administration</b> les fiches d'intervention et le registre de l'équipement ; et de faire assurer la récupération des fluides en fin de vie par un opérateur attesté.</p>
<p><b>13.3.</b> SODILAME remet au Client une fiche d'intervention à l'issue de toute opération sur un circuit frigorifique. <b>La responsabilité de SODILAME ne saurait être engagée du fait du non-respect par le Client de ses obligations de détenteur</b>, ni des sanctions administratives ou pénales en résultant.</p>
<p><b>13.4. Hygiène alimentaire et sécurité.</b> Le Client demeure seul responsable du respect de la réglementation applicable à son activité, notamment en matière d'hygiène alimentaire (paquet hygiène, plan de maîtrise sanitaire, HACCP), de sécurité des travailleurs, de sécurité incendie et de conformité des locaux recevant du public.</p>`,
    },
    {
      id: 'a14',
      titre: 'Matériels confiés, gardiennage et matériels non réclamés',
      corps: `
<div class="callout">
<p><b>Clause essentielle — matériels confiés non réclamés.</b> Le Matériel confié à SODILAME et non repris par le Client, malgré mise en demeure, sera considéré comme abandonné à l'expiration d'un délai de douze (12) mois.</p>
</div>
<p><b>14.1. Dépôt.</b> Les Matériels confiés par le Client à SODILAME — pour réparation en atelier, expertise, reprise, stockage temporaire ou dans l'attente de l'achèvement de son Site — sont reçus en dépôt à titre gratuit pendant une durée de <b>trente (30) jours calendaires</b> à compter, selon le cas, de la date d'achèvement de la réparation, de la date du devis refusé ou demeuré sans réponse au sens de l'article 11.4, de la date de mise à disposition notifiée au Client, ou de la date de réception du Matériel en dépôt lorsque celui-ci n'est lié ni à une réparation ni à une vente.</p>
<p><b>14.2. Garantie de propriété du Client.</b> Le Client garantit être <b>propriétaire des Matériels qu'il confie</b> et disposer du pouvoir d'en disposer. Il informe SODILAME par écrit, avant tout dépôt, de l'existence de tout droit de tiers (crédit-bail, location financière, location longue durée, gage, réserve de propriété d'un autre fournisseur). Le Client garantit SODILAME contre toute réclamation d'un tiers à ce titre.</p>
<p><b>14.3. Frais de gardiennage.</b> À l'expiration du délai de gratuité, et après notification écrite au Client, des <b>frais de gardiennage de 100 euros HT par mois et par équipement</b>, tout mois entamé étant dû en entier, sont facturés mensuellement au Client. Ces frais sont exigibles dans les conditions de l'article 6 et se cumulent avec les sommes éventuellement dues au titre de la réparation ou de la vente.</p>
<p><b>14.4. Relances et mise en demeure.</b> SODILAME adresse au Client : une <b>première relance écrite</b> à l'expiration du délai de gratuité, puis une <b>mise en demeure par lettre recommandée avec accusé de réception</b> à la dernière adresse connue du Client, l'invitant à reprendre possession du Matériel et à régler les sommes dues, et l'informant expressément des conséquences de son inaction telles que prévues au 14.5.</p>
<p><b>14.5. Matériels non réclamés — présomption d'abandon et transfert de propriété.</b> À défaut pour le Client d'avoir repris possession du Matériel et réglé l'intégralité des sommes dues dans un délai de <b>douze (12) mois</b> courant à compter de la première mise à disposition ou notification, et sous réserve que la mise en demeure prévue au 14.4 soit demeurée sans effet pendant au moins <b>trois (3) mois</b> :</p>
<ul>
<li>le Client est <b>réputé avoir abandonné le Matériel</b> et renoncé à tout droit sur celui-ci ;</li>
<li>la <b>propriété du Matériel est transférée de plein droit à SODILAME</b>, à titre de <b>dation en paiement</b> des frais de gardiennage, de réparation et de toute autre somme restant due, à concurrence de la valeur vénale du Matériel telle qu'estimée à cette date ;</li>
<li>SODILAME est dès lors libre de <b>conserver, réemployer, revendre, démonter pour pièces ou faire détruire</b> le Matériel, sans autre formalité ;</li>
<li>si la valeur vénale du Matériel excède le montant des sommes dues, l'excédent est tenu à la disposition du Client pendant un (1) an ; à défaut de réclamation, il reste acquis à SODILAME ;</li>
<li>si la valeur vénale est inférieure aux sommes dues, <b>le solde reste exigible</b> à l'encontre du Client.</li>
</ul>
<p><b>14.6. Recours alternatif.</b> SODILAME conserve la faculté, en lieu et place du 14.5, de recourir à la procédure de <b>vente aux enchères publiques des objets confiés et non réclamés prévue par la loi du 31 décembre 1903</b>, sur autorisation judiciaire, ou d'engager toute action en recouvrement de droit commun.</p>
<p><b>14.7. Étendue de la garde.</b> Le dépôt est effectué aux risques du Client, qui fait son affaire de l'assurance des Matériels confiés. SODILAME n'assume qu'une <b>obligation de moyens de conservation</b> et ne répond que des dommages résultant de sa faute prouvée, à l'exclusion de toute dépréciation liée à l'écoulement du temps, à l'obsolescence ou à l'inutilisation. SODILAME ne répond pas des denrées, linge, contenus ou effets laissés dans le Matériel, dont le Client doit assurer le retrait préalable.</p>`,
    },
    {
      id: 'a15',
      titre: 'Garanties',
      corps: `
<p><b>15.1. Garantie contractuelle de base.</b> Les Matériels neufs bénéficient d'une garantie <b>minimale de douze (12) mois pièces</b>, à compter de la date de réception ou, à défaut, de la date de livraison, couvrant tout défaut de matière, de fabrication ou de montage. Cette durée est portée à celle de la garantie du fabricant lorsque celle-ci est plus longue. SODILAME s'engage, <b>à son choix</b>, à réparer ou à remplacer la pièce reconnue défectueuse.</p>
<table>
<thead><tr><th>Situation</th><th>Étendue de la garantie</th></tr></thead>
<tbody>
<tr><td>Matériel neuf installé et mis en service par SODILAME</td><td>Pièces, main-d'œuvre et déplacement pendant 12 mois</td></tr>
<tr><td>Matériel neuf vendu seul, installé par le Client ou un tiers</td><td>Pièces uniquement, pendant <b>12 mois minimum</b>, porté à la durée plus longue éventuellement accordée par le fabricant</td></tr>
<tr><td>Pièce détachée posée et réparation (art. 15.6)</td><td><b>3 mois</b> sur la pièce remplacée et la main-d'œuvre de la réparation concernée — déplacement facturé</td></tr>
<tr><td>Matériel d'occasion ou reconditionné (art. 15.7)</td><td><b>3 mois</b>, pièces et main-d'œuvre — déplacement facturé</td></tr>
<tr><td><b>Extension de garantie souscrite</b> (art. 15.5)</td><td>Jusqu'à <b>5 ans</b> — pièces, main-d'œuvre et déplacement, sous condition d'un contrat d'entretien en vigueur</td></tr>
</tbody>
</table>
<p><b>15.2. Modalités.</b> La garantie n'est due qu'au Client d'origine, sous réserve du <b>paiement intégral du prix</b>. Tout défaut doit être dénoncé par écrit dans les <b>huit (8) jours</b> de sa découverte, avec description précise et éléments de preuve. Le Client doit permettre à SODILAME de constater le défaut et de procéder aux opérations nécessaires. <b>Toute intervention technique de réparation, de modification, de démontage ou de déplacement du Matériel réalisée par le Client ou par un tiers entraîne la déchéance de la garantie</b>, sauf si le Client démontre que cette intervention est demeurée sans lien avec le défaut invoqué.</p>
<p><b>15.3. Effets.</b> La mise en œuvre de la garantie ne peut avoir pour effet d'en prolonger la durée initiale. Les Matériels réparés ou remplacés sont garantis pour la durée restant à courir. La garantie ne donne lieu à aucune indemnité pour immobilisation, perte d'usage, perte de production ou perte d'exploitation, ni à la fourniture d'un matériel de remplacement, sauf accord exprès.</p>
<p><b>15.4. Garanties légales.</b> Les présentes stipulations ne privent pas le Client du bénéfice de la garantie légale des vices cachés des articles 1641 et suivants du code civil, qui doit être exercée dans les conditions et délais légaux. S'agissant de ventes entre professionnels, SODILAME n'est pas tenue des vices dont le Client, professionnel de même spécialité, était ou devait être informé.</p>
<h3>15.5. Extensions de garantie</h3>
<p>SODILAME propose des <b>extensions de garantie portant la couverture jusqu'à cinq (5) ans</b> à compter de la réception, en <b>pièces, main-d'œuvre et déplacement</b>. Chaque extension fait l'objet d'un <b>chiffrage distinct, propre à chaque Matériel</b>, mentionné sur le devis avec sa durée et son prix. Elle obéit aux conditions suivantes :</p>
<ul>
<li>l'extension est <b>souscrite au plus tard à la commande du Matériel</b> ; elle ne peut être souscrite ni prolongée après la mise en service ;</li>
<li><b>l'absence de mention d'une extension sur le devis vaut absence d'extension</b> : seule la garantie de base de l'article 15.1 s'applique alors, sans qu'aucune déclaration verbale ou document commercial puisse y déroger ;</li>
<li>le prix de l'extension est <b>facturé en totalité à la commande</b>, en même temps que le Matériel, et n'est remboursable que dans le cas prévu au titre du plafond ci-dessous ;</li>
<li>elle ne couvre que des Matériels <b>neufs, vendus, installés et mis en service par SODILAME</b> ;</li>
<li>elle est subordonnée au <b>maintien en vigueur, sans interruption et sans incident de paiement, d'un contrat d'entretien SODILAME</b> couvrant le Matériel concerné, et à la réalisation effective de toutes les visites de maintenance préventive prévues ;</li>
<li>pour tout Matériel alimenté en eau, elle est subordonnée à la <b>présence et à l'entretien d'un traitement d'eau adapté</b>, dont le Client justifie sur demande ;</li>
<li><b>l'ensemble des exclusions de l'article 16 demeure applicable</b> pendant toute la durée de l'extension, en particulier l'usure normale, les pièces d'usure, l'entartrage et les produits lessiviels inadaptés ;</li>
<li>l'engagement total de SODILAME au titre de l'extension, toutes interventions cumulées, est <b>plafonné au prix d'achat HT du Matériel garanti</b> ; au-delà, SODILAME peut mettre fin à l'extension en remboursant la fraction du prix correspondant à la période non courue ;</li>
<li>l'extension est <b>attachée au Matériel et au Site</b> ; son transfert en cas de cession du fonds ou de déplacement du Matériel est subordonné à l'accord écrit de SODILAME et, le cas échéant, à un contrôle préalable facturé ;</li>
<li>la suspension ou la résiliation du contrat d'entretien, le défaut de paiement, l'intervention d'un tiers sur le Matériel ou le montage de pièces non d'origine entraînent la <b>déchéance immédiate et définitive de l'extension, sans remboursement</b>.</li>
</ul>
<p><b>15.6. Pièces détachées et réparations.</b> Toute <b>pièce détachée neuve fournie et posée par SODILAME dans le cadre d'une réparation est garantie trois (3) mois</b> à compter de la date de l'intervention, de même que la main-d'œuvre de la réparation concernée. Le déplacement demeure facturé au barème en vigueur. Cette garantie est <b>strictement limitée à la pièce remplacée et à la prestation exécutée</b> : elle ne s'étend ni aux autres organes du Matériel, ni à l'ensemble sur lequel la pièce est montée.</p>
<p>En conséquence, <b>l'intervention de SODILAME sur un Matériel ancien, vétuste ou en fin de vie n'emporte aucune garantie sur son état général, sa fiabilité ou sa durée de vie résiduelle</b>, et ne saurait faire naître à sa charge une quelconque obligation au titre d'une panne ultérieure d'origine distincte. Lorsque SODILAME a informé le Client, par écrit ou par la mention portée sur le rapport d'intervention, de la vétusté du Matériel ou du caractère aléatoire de la réparation, le Client qui fait néanmoins procéder à celle-ci en assume le résultat.</p>
<p><b>15.7. Matériels d'occasion et reconditionnés.</b> Les Matériels d'occasion ou reconditionnés sont garantis <b>trois (3) mois</b> à compter de la livraison ou de la mise en service, en pièces et main-d'œuvre, le déplacement restant facturé. Ils sont vendus <b>dans l'état où le Client les a vus et acceptés</b>, avec leurs caractéristiques d'usure apparentes. Sont exclus de cette garantie l'usure normale et les pièces d'usure, l'esthétique et l'aspect, ainsi que les défauts signalés au devis ou au bon de livraison. SODILAME ne garantit ni la disponibilité future des pièces détachées, ni la conformité de ces Matériels aux normes postérieures à leur date de fabrication, ni leur éligibilité à une extension de garantie au sens de l'article 15.5.</p>
<p><b>15.8. Garanties légales de construction.</b> Lorsque les Prestations relèvent d'un ouvrage au sens de l'article 1792 du code civil, les garantie et responsabilités légales correspondantes s'appliquent, dans la limite des travaux effectivement réalisés par SODILAME et de sa couverture d'assurance.</p>`,
    },
    {
      id: 'a16',
      titre: 'Exclusions de garantie',
      corps: `
<p>Sont <b>expressément exclus</b> de la garantie ; les interventions qui s'y rapportent sont facturées au barème en vigueur :</p>
<ul>
<li>l'<b>usure normale</b> et les pièces d'usure : joints, hublots, membranes, courroies, roulements, résistances entartrées, filtres, lampes, plaquettes, charbons, galets, ressorts, tuyaux et raccords souples, bandes de calandre, revêtements, roulettes ;</li>
<li>l'<b>entartrage, l'embouage, la corrosion et les dépôts calcaires</b> résultant de la qualité de l'eau, de l'absence, du sous-dimensionnement ou du défaut d'entretien du traitement d'eau (adoucisseur, osmoseur, filtration) ;</li>
<li>l'utilisation de <b>produits lessiviels, détergents, produits de rinçage, désinfectants ou additifs non adaptés</b>, non conformes aux préconisations du fabricant, surdosés, ou incompatibles avec les matériaux du Matériel ;</li>
<li>le <b>défaut d'entretien courant</b> incombant au Client, notamment le nettoyage quotidien, le détartrage, la vidange, le nettoyage des filtres et le retrait des peluches dans les séchoirs et laveuses ;</li>
<li>les <b>anomalies d'alimentation</b> : surtension, sous-tension, coupure, déséquilibre des phases, inversion de phases, défaut de terre, foudre, pression d'eau ou de gaz hors tolérances, qualité de la vapeur ;</li>
<li>l'<b>insuffisance de ventilation, d'extraction ou d'apport d'air neuf</b>, l'encrassement des conduits, ainsi que l'exposition à un environnement inadapté (température ambiante excessive, humidité, atmosphère saline, poussières de farine, graisses) ;</li>
<li>le <b>non-respect des notices d'utilisation et de sécurité</b>, une utilisation non conforme à la destination du Matériel, une surcharge, une utilisation intensive au-delà des préconisations, ou l'emploi par un personnel non formé ;</li>
<li>les <b>modifications, adaptations, réparations ou déplacements</b> réalisés par le Client ou par un tiers, ainsi que le montage de <b>pièces non d'origine</b> ;</li>
<li>le <b>lavage de linge contenant des corps étrangers</b>, des solvants, des hydrocarbures ou des matières inflammables, ainsi que les conséquences d'un chargement non conforme ;</li>
<li>les <b>dommages accidentels</b> : chocs, chutes, incendie, dégâts des eaux, vandalisme, vol, actes de malveillance, nuisibles et rongeurs ;</li>
<li>les <b>réglages, paramétrages et mises à jour</b> de confort, ainsi que les interventions résultant d'une mauvaise manipulation ou d'une absence de panne réelle ;</li>
<li>les cas de <b>force majeure</b> visés à l'article 19.</li>
</ul>`,
    },
    {
      id: 'a17',
      titre: 'Responsabilité',
      corps: `
<p><b>17.1. Nature de l'obligation.</b> SODILAME est tenue d'une <b>obligation de moyens</b> dans l'exécution de ses Prestations, sauf engagement de résultat expressément stipulé par écrit.</p>
<p><b>17.2. Dommages exclus.</b> Sauf faute lourde ou dolosive de sa part, et sauf dommages corporels, <b>la responsabilité de SODILAME ne peut être engagée au titre des dommages indirects et immatériels</b>, notamment : perte d'exploitation, perte de chiffre d'affaires, de marge ou de bénéfice, perte de clientèle ou d'image, coût de fermeture ou de report d'ouverture d'un établissement, coût de recours à un tiers ou à une solution de substitution, pénalités subies par le Client vis-à-vis de ses propres clients, <b>perte ou détérioration de denrées alimentaires, de stocks ou de linge</b>, frais de personnel improductif.</p>
<p><b>17.3. Plafond.</b> En tout état de cause, et à l'exception des dommages corporels et de la faute lourde ou dolosive, <b>la responsabilité totale et cumulée de SODILAME, toutes causes confondues, est limitée au montant hors taxes effectivement encaissé au titre de la Commande à l'origine du dommage</b>, et en toute hypothèse au montant des garanties souscrites au titre de son assurance responsabilité civile professionnelle.</p>
<p><b>17.4. Denrées et linge.</b> Il appartient au Client, professionnel averti, de mettre en place les <b>moyens de surveillance, d'alarme et de secours</b> adaptés à la valeur des denrées, produits ou linge stockés ou traités (report d'alarme, groupe de secours, enceinte de repli, assurance perte de marchandises en chambre froide). À défaut, aucune indemnisation ne pourra être réclamée à SODILAME à ce titre.</p>
<p><b>17.5. Informations du Client.</b> SODILAME n'est pas responsable des conséquences d'informations inexactes, incomplètes ou tardives fournies par le Client, ni de l'inadéquation du Matériel choisi par le Client au regard de son usage réel, lorsque ce choix n'a pas été formulé par SODILAME sur la base d'un cahier des charges écrit.</p>
<p><b>17.6. Prescription.</b> Conformément à l'article 2254 du code civil, les parties conviennent que toute action du Client à l'encontre de SODILAME est prescrite à l'expiration d'un délai d'<b>un (1) an</b> à compter de la survenance du fait générateur. Ce délai abrégé ne s'applique ni à l'action en garantie des vices cachés, ni aux garanties légales de construction visées à l'article 15.8, ni à aucune action dont le délai est fixé par une disposition d'ordre public.</p>`,
    },
    {
      id: 'a18',
      titre: 'Assurances',
      corps: `
<p><b>18.1.</b> SODILAME déclare être titulaire, auprès d'<b>AXA France IARD</b>, du contrat « Construction BTPLUS » n° 0000006107106204 souscrit par l'intermédiaire d'ASSURALLIANCE SARL, couvrant sa responsabilité décennale obligatoire au titre des travaux constitutifs d'ouvrage ainsi que sa responsabilité civile de chef d'entreprise avant et après réception. Les garanties s'appliquent pour la France métropolitaine, dans les limites, sous-limites, plafonds et exclusions des conditions générales et particulières de ces polices. Une attestation d'assurance en cours de validité est remise au Client sur simple demande.</p>
<p><b>18.2.</b> Le Client déclare être assuré pour les dommages pouvant survenir sur son Site, y compris ceux affectant les Matériels non encore payés (article 7.4) ou confiés (article 14.7), et pour ses pertes d'exploitation. <b>Le Client renonce à tout recours contre SODILAME et ses assureurs au-delà des limites de responsabilité fixées à l'article 17, et s'engage à obtenir de ses propres assureurs une renonciation à recours de même étendue</b>, dont il justifie sur demande.</p>`,
    },
    {
      id: 'a19',
      titre: 'Force majeure',
      corps: `
<p><b>19.1.</b> SODILAME ne peut être tenue responsable d'un manquement résultant d'un cas de force majeure au sens de l'article 1218 du code civil.</p>
<p><b>19.2.</b> Sont notamment considérés comme tels, sans que cette liste soit limitative : catastrophes naturelles, incendie, inondation, épidémie ou pandémie et mesures administratives associées, guerre, attentat, émeute, grève totale ou partielle interne ou externe, blocage des moyens de transport ou d'approvisionnement, pénurie ou rupture d'approvisionnement en matières premières, composants, fluides frigorigènes ou énergie, défaillance ou retard d'un fournisseur ou d'un sous-traitant, cyberattaque, panne généralisée des réseaux de communication ou d'énergie, décision d'une autorité publique.</p>
<p><b>19.3.</b> Les obligations affectées sont suspendues pendant la durée de l'événement. Si celui-ci se prolonge au-delà de <b>trois (3) mois</b>, chacune des parties pourra résilier la partie non exécutée du Contrat par lettre recommandée avec accusé de réception, sans indemnité, les Prestations et Matériels déjà fournis restant dus.</p>`,
    },
    {
      id: 'a20',
      titre: 'Annulation, résiliation et résolution',
      corps: `
<p><b>20.1. Annulation par le Client.</b> Sous réserve des articles 5.3 et 19.3, qui ouvrent au Client une faculté d'annulation sans indemnité, toute annulation de Commande par le Client après acceptation, quel qu'en soit le motif, donne lieu à la conservation par SODILAME de l'acompte versé, ainsi qu'au paiement d'une <b>indemnité forfaitaire égale à 30 % du montant HT de la Commande</b>, augmentée du coût des Prestations et approvisionnements déjà engagés. Les Matériels spécifiques visés à l'article 4.5 n'étant ni annulables ni repris, leur annulation de fait par le Client rend exigible <b>100 % de leur prix HT</b>.</p>
<p><b>20.2. Résolution pour manquement.</b> En cas de manquement grave du Client à l'une quelconque de ses obligations, notamment de paiement, et huit (8) jours après une mise en demeure demeurée infructueuse, SODILAME pourra résoudre le Contrat de plein droit, sans formalité judiciaire, et exiger la restitution des Matériels non payés, sans préjudice de tous dommages et intérêts.</p>
<p><b>20.3. Procédure collective.</b> L'ouverture d'une procédure collective à l'encontre du Client n'emporte pas résiliation automatique du Contrat, SODILAME exerçant alors ses droits conformément au livre VI du code de commerce.</p>`,
    },
    {
      id: 'a21',
      titre: 'Propriété intellectuelle et confidentialité',
      corps: `
<p><b>21.1.</b> Les études, plans d'implantation, schémas, notes de calcul, chiffrages, documentations techniques et savoir-faire remis par SODILAME demeurent sa <b>propriété exclusive</b>. Ils sont communiqués à titre confidentiel, pour les seuls besoins de la Commande, et ne peuvent être reproduits, communiqués à un tiers, ni utilisés pour une consultation concurrente ou une exécution par un tiers, sans accord écrit préalable de SODILAME.</p>
<p><b>21.2.</b> Chacune des parties s'engage à conserver confidentielles les informations non publiques dont elle a connaissance à l'occasion du Contrat, pendant sa durée et cinq (5) ans après son terme.</p>
<p><b>21.3. Référence commerciale.</b> Sauf opposition écrite du Client, SODILAME est autorisée à citer le nom du Client et à utiliser des photographies des réalisations, à des fins de référence commerciale, sur tous supports.</p>
<p><b>21.4. Non-sollicitation du personnel.</b> Le Client s'interdit d'embaucher ou de faire travailler, directement ou par personne interposée, tout salarié de SODILAME intervenu chez lui, <b>pendant toute la durée des relations contractuelles et pendant douze (12) mois après la dernière intervention</b>. En cas de manquement, le Client versera à SODILAME une indemnité forfaitaire égale à <b>douze (12) mois du dernier salaire brut</b> du salarié concerné, charges patronales incluses, sans préjudice de la réparation du préjudice complémentaire. Cette stipulation ne fait pas obstacle à une candidature spontanée résultant d'une offre publique d'emploi à laquelle le Client n'a pas sollicité le salarié.</p>`,
    },
    {
      id: 'a22',
      titre: 'Sous-traitance et cession du Contrat',
      corps: `
<p>SODILAME se réserve la faculté de confier tout ou partie de l'exécution des Prestations à des sous-traitants de son choix, sous sa responsabilité et sans que cela modifie ses engagements à l'égard du Client. Le Client ne peut céder ni transférer le Contrat sans l'accord écrit préalable de SODILAME.</p>`,
    },
    {
      id: 'a23',
      titre: "Déchets d'équipements et reprise",
      corps: `
<p><b>23.1.</b> Conformément à la réglementation relative aux déchets d'équipements électriques et électroniques professionnels, SODILAME propose au Client, <b>lors de la vente d'un équipement neuf, la reprise de l'équipement usagé de type équivalent</b> qu'il remplace. Cette reprise fait l'objet d'un chiffrage au devis (dépose, manutention, transport, retrait des fluides, traitement).</p>
<p><b>23.2.</b> À défaut de reprise commandée à SODILAME, le Client demeure responsable de l'élimination de ses équipements usagés, de la récupération réglementaire des fluides frigorigènes et de la traçabilité correspondante.</p>
<p><b>23.3.</b> L'éco-participation applicable est facturée en sus et affichée distinctement le cas échéant.</p>`,
    },
    {
      id: 'a24',
      titre: 'Boutique en ligne — produits lessiviels et consommables',
      corps: `
<p><b>24.1. Périmètre.</b> La boutique en ligne accessible depuis www.sodilame.com est <b>strictement réservée aux acheteurs professionnels</b> et propose exclusivement des <b>produits lessiviels, produits de rinçage, détergents, désinfectants et consommables associés</b>, à l'exclusion de tout matériel ou équipement.</p>
<p><b>24.2. Qualité professionnelle de l'acheteur.</b> La création d'un compte et la passation d'une commande emportent <b>déclaration et garantie par l'acheteur qu'il agit à des fins professionnelles</b>, dans le cadre de son activité commerciale, industrielle, artisanale, libérale ou agricole, et qu'il communique un numéro SIREN valide. <b>En conséquence, aucune disposition du code de la consommation, et notamment aucun droit de rétractation, n'est applicable à ces ventes.</b> Toute commande passée par une personne agissant à des fins non professionnelles pourra être refusée et annulée par SODILAME.</p>
<p><b>24.3. Commande et prix.</b> Les prix affichés s'entendent hors taxes, hors frais de port et hors éco-participation. La vente est parfaite après validation de la commande par l'acheteur, acceptation des présentes CGV par case à cocher, et <b>encaissement effectif du paiement</b>. Les offres sont valables dans la limite des stocks disponibles ; en cas d'indisponibilité, SODILAME en informe l'acheteur et procède au remboursement de la somme correspondante.</p>
<p><b>24.4. Livraison et réserves.</b> Les articles 8.3 à 8.5 s'appliquent aux commandes en ligne. Les réserves relatives à un colis endommagé, ouvert ou incomplet doivent être portées sur le récépissé du transporteur en présence de celui-ci et confirmées dans les trois (3) jours.</p>
<p><b>24.5. Retours.</b> Compte tenu de leur nature, <b>les produits lessiviels et chimiques ne sont ni repris ni échangés</b> dès lors que leur emballage ou leur scellé a été ouvert, ou que leur conservation n'est plus garantie. Les retours de produits scellés obéissent à l'article 4.6.</p>
<p><b>24.6. Sécurité des produits chimiques.</b> SODILAME met à disposition de l'acheteur, préalablement à la première livraison et lors de toute mise à jour, les <b>fiches de données de sécurité (FDS)</b> des produits concernés, conformément au règlement (CE) n° 1907/2006 (REACH) et au règlement (CE) n° 1272/2008 (CLP). L'acheteur s'engage à en prendre connaissance, à les tenir à disposition de son personnel et des services de contrôle, et à respecter les conditions d'emploi, de dilution, de stockage, d'incompatibilité, de ventilation et d'équipements de protection individuelle qui y sont prescrites. <b>L'acheteur est seul responsable des conséquences d'un mauvais usage, d'un surdosage, d'un mélange, d'un transvasement, d'un déconditionnement ou d'un stockage non conforme</b>, tant à l'égard de son personnel que de ses propres clients, ainsi que des dommages causés aux matériels du fait de produits inadaptés (article 16).</p>
<p><b>24.7. Revente.</b> La revente en l'état des produits acquis auprès de SODILAME à des consommateurs relève de la seule responsabilité de l'acheteur, qui fait son affaire des obligations d'étiquetage, d'information et de sécurité qui lui incombent alors.</p>`,
    },
    {
      id: 'a25',
      titre: 'Données à caractère personnel',
      corps: `
<p><b>25.1.</b> SODILAME traite les données à caractère personnel des interlocuteurs du Client (identité, fonction, coordonnées professionnelles, historique des commandes et interventions) en qualité de responsable de traitement, aux fins de gestion de la relation commerciale, d'exécution du Contrat, de facturation, de recouvrement, de suivi du parc installé et de prospection sur des produits analogues.</p>
<p><b>25.2.</b> Les bases légales sont l'exécution du contrat, le respect d'obligations légales et l'intérêt légitime de SODILAME. Les données sont conservées pendant la durée de la relation commerciale puis, en archivage, pendant les durées légales de prescription et de conservation comptable.</p>
<p><b>25.3.</b> Conformément au règlement (UE) 2016/679 et à la loi n° 78-17 du 6 janvier 1978 modifiée, les personnes concernées disposent d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et à la portabilité, qu'elles peuvent exercer à l'adresse sodilame@sodilame.fr. Elles peuvent introduire une réclamation auprès de la CNIL.</p>`,
    },
    {
      id: 'a26',
      titre: 'Dispositions diverses',
      corps: `
<p><b>26.1. Nullité partielle.</b> Si l'une quelconque des stipulations des présentes CGV était déclarée nulle, illicite ou inopposable, les autres stipulations conserveraient leur pleine force. La clause affectée serait remplacée par une stipulation valable dont l'effet économique serait le plus proche possible.</p>
<p><b>26.2. Preuve.</b> Les registres informatisés, courriels, comptes rendus d'intervention signés électroniquement et enregistrements conservés par SODILAME dans des conditions raisonnables de sécurité sont admis comme moyens de preuve entre les parties.</p>
<p><b>26.3. Notifications.</b> Toute notification est valablement effectuée à la dernière adresse postale ou électronique communiquée par le destinataire. Le Client s'oblige à signaler sans délai tout changement de dénomination, de forme juridique, de siège, de contrôle ou de coordonnées bancaires.</p>
<p><b>26.4. Langue.</b> Les présentes CGV sont rédigées en langue française. En cas de traduction, seule la version française fait foi.</p>`,
    },
    {
      id: 'a27',
      titre: 'Droit applicable et juridiction compétente',
      corps: `
<p><b>27.1.</b> Les présentes CGV et l'ensemble des relations contractuelles entre SODILAME et le Client sont soumis au <b>droit français</b>, à l'exclusion de la Convention de Vienne sur la vente internationale de marchandises.</p>
<p><b>27.2.</b> Les parties pourront s'efforcer de résoudre amiablement leurs différends, sans que cette démarche constitue un préalable obligatoire à toute action en justice ni une cause de suspension des délais. <b>Tout litige relatif à la formation, l'interprétation, l'exécution ou la rupture du Contrat sera de la compétence exclusive du Tribunal de commerce de Tarascon</b>, y compris en cas de référé, de procédure d'injonction de payer, d'appel en garantie, de pluralité de défendeurs ou de demande incidente.</p>
<p><b>27.3.</b> Cette clause attributive de compétence est expressément acceptée par le Client, commerçant, en application de l'article 48 du code de procédure civile. Elle ne s'applique pas aux acheteurs publics, régis par l'article 28.9.</p>`,
    },
    {
      id: 'a28',
      titre: 'Dispositions propres aux acheteurs publics',
      corps: `
<p><b>28.1. Champ d'application.</b> Le présent article s'applique lorsque le Client est un <b>pouvoir adjudicateur ou une entité adjudicatrice</b> au sens du code de la commande publique — État, collectivités territoriales et leurs groupements, établissements publics, établissements publics de santé, établissements d'enseignement publics, offices publics et organismes de droit public. Ses stipulations <b>prévalent sur toute clause contraire des présentes CGV</b>.</p>
<p><b>28.2. Hiérarchie des documents.</b> Les pièces constitutives du marché (acte d'engagement, CCAP, CCTP, bordereau de prix, CCAG applicable) <b>priment sur les présentes CGV</b>, qui ne s'appliquent qu'à titre supplétif, pour ce que ces pièces ne règlent pas. Lorsque le marché est passé <b>sans procédure formalisée, sur simple devis ou bon de commande</b>, en application des dispositions dispensant l'acheteur de publicité et de mise en concurrence, les présentes CGV s'appliquent intégralement sous les réserves du présent article.</p>
<h3>28.3. Clauses écartées et remplacées</h3>
<table>
<thead><tr><th>Clause écartée</th><th>Régime applicable à l'acheteur public</th></tr></thead>
<tbody>
<tr><td>Art. 6.1 — Échéancier 50 / 40 / 10 et acompte obligatoire</td><td>Paiement <b>après service fait</b>, selon les modalités du marché. Avance versée dans les conditions et limites réglementaires, sur demande du titulaire. Acomptes périodiques pour les prestations continues ou échelonnées.</td></tr>
<tr><td>Art. 6.2 — Délais de paiement</td><td><b>30 jours</b> pour l'État, les collectivités territoriales et leurs établissements publics ; <b>50 jours</b> pour les établissements publics de santé et les services de santé des armées.</td></tr>
<tr><td>Art. 6.5 — Pénalités de retard et clause pénale</td><td><b>Intérêts moratoires</b> au taux d'intérêt de la principale facilité de refinancement de la BCE <b>majoré de 8 points</b>, exigibles de plein droit, et <b>indemnité forfaitaire de 40 euros</b> pour frais de recouvrement. La clause pénale de 15 % est inapplicable.</td></tr>
<tr><td>Art. 6.6 — Déchéance du terme et suspension</td><td>Inapplicables. La suspension d'exécution obéit aux seules stipulations du marché et au CCAG applicable.</td></tr>
<tr><td>Art. 6.8 — Interdiction de compensation</td><td>Inapplicable. L'acheteur exerce, le cas échéant, les retenues et précomptes prévus par le marché et le CCAG applicable.</td></tr>
<tr><td>Art. 6.9 — Facturation électronique</td><td>Remplacé par l'article 28.4 (transmission via le portail Chorus Pro).</td></tr>
<tr><td>Art. 7 — Réserve de propriété</td><td><b>Écartée.</b> Le transfert de propriété s'opère selon les stipulations du marché ; les biens affectés au service public sont insaisissables.</td></tr>
<tr><td>Art. 14.5 — Abandon et transfert de propriété des matériels non réclamés</td><td><b>Écarté.</b> Seuls les frais de gardiennage de l'article 14.3 demeurent dus, dans les conditions du marché.</td></tr>
<tr><td>Art. 20.1 — Indemnité forfaitaire d'annulation</td><td>Remplacée par le droit de l'acheteur de <b>résilier pour motif d'intérêt général</b>, ouvrant droit à l'indemnisation du préjudice subi par SODILAME, notamment des dépenses engagées et des approvisionnements réalisés.</td></tr>
<tr><td>Art. 21.4 — Non-sollicitation du personnel</td><td><b>Écartée.</b></td></tr>
<tr><td>Art. 27.2 et 27.3 — Juridiction</td><td>Voir article 28.9.</td></tr>
</tbody>
</table>
<p><b>28.4. Facturation.</b> Les factures sont transmises par voie dématérialisée via le <b>portail Chorus Pro</b>. Le Client s'engage à communiquer à SODILAME, préalablement à toute exécution, l'ensemble des données nécessaires au dépôt : SIRET de l'entité destinataire, <b>code service</b>, <b>numéro d'engagement juridique</b> et toute référence exigée par ses services financiers. Le défaut ou l'inexactitude de ces éléments ne saurait faire obstacle au point de départ du délai de paiement à compter de la réception de la facture sur le portail.</p>
<p><b>28.5. Avance et sous-traitance.</b> SODILAME peut solliciter le versement de l'avance prévue par la réglementation. Toute sous-traitance est déclarée et acceptée dans les conditions du code de la commande publique, les conditions de paiement du sous-traitant étant agréées par l'acheteur ; le <b>paiement direct</b> du sous-traitant s'applique dans les cas et au-delà des seuils prévus par les textes.</p>
<p><b>28.6. Obligations déclaratives.</b> SODILAME remet, à la signature puis <b>tous les six (6) mois</b> jusqu'à la fin d'exécution, les attestations de régularité sociale et fiscale ainsi que l'attestation de vigilance URSSAF, et déclare ne pas être placée dans un cas d'exclusion de la procédure de passation.</p>
<p><b>28.7. Pénalités de retard imputées à SODILAME.</b> Les pénalités éventuellement prévues par le marché à la charge de SODILAME ne sont applicables qu'après déduction des retards imputables à l'acheteur, à un autre titulaire ou à un cas de force majeure, et sous réserve du respect par l'acheteur de ses propres obligations, notamment celles de l'article 9 relatives à la mise à disposition du Site et des fluides.</p>
<h3>28.8. Clauses maintenues</h3>
<p>Demeurent pleinement applicables aux acheteurs publics, en tant qu'elles ne contredisent aucune disposition d'ordre public ni aucune pièce du marché :</p>
<ul>
<li>l'article 4.7 — <b>devoir de conseil</b> et adéquation du Matériel au besoin exprimé par écrit ;</li>
<li>l'article 9 — <b>obligations préalables du Client</b> : local achevé, fluides et énergies en attente, ventilation et extraction conformes, <b>traitement d'eau adapté</b>, faisabilité de la manutention, autorisations, plan de prévention et protocole de sécurité ;</li>
<li>l'article 10 — modalités de <b>réception</b> et documents remis ;</li>
<li>l'article 11 — conditions de <b>dépannage</b>, y compris l'article 11.3 relatif à l'annulation tardive d'une intervention programmée et l'article 11.8 relatif à l'échange standard ;</li>
<li>l'article 13 — répartition des obligations réglementaires relatives aux <b>fluides frigorigènes</b>, le Client demeurant détenteur des équipements ;</li>
<li>les articles 15 et 16 — <b>étendue et exclusions de garantie</b>, notamment l'entartrage, les produits lessiviels inadaptés, le défaut d'entretien courant et les anomalies d'alimentation ;</li>
<li>l'article 17 — <b>limitation de responsabilité</b>, dans la mesure admise par les pièces du marché et le CCAG applicable ;</li>
<li>l'article 19 — <b>force majeure</b> ;</li>
<li>l'article 23 — <b>reprise des équipements usagés</b> et éco-participation.</li>
</ul>
<p><b>28.9. Règlement des différends.</b> Les litiges relatifs à l'exécution du marché relèvent de la compétence du <b>tribunal administratif territorialement compétent</b>. Préalablement à toute instance, les parties peuvent saisir le <b>comité consultatif de règlement amiable des différends</b> compétent, sans que cette saisine constitue un préalable obligatoire.</p>`,
    },
  ],
};

/** Les clauses que le Client accepte expressément, reprises sur les devis. */
export const clausesExpresses =
  "pénalités de retard et clause pénale (article 6.5), réserve de propriété (article 7), indemnité d'annulation d'une intervention programmée (article 11.3), matériels confiés et non réclamés (article 14), conditions et déchéance des extensions de garantie (article 15.5), exclusions de garantie (article 16), limitation de responsabilité (article 17), indemnité d'annulation de Commande (article 20.1), non-sollicitation du personnel (article 21.4) et attribution de compétence (article 27)";
