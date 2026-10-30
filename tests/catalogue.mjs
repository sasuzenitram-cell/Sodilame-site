// ---------------------------------------------------------------------------
// Cohérence de la boutique /eshop : catalogue, collections, fiches, forfaits.
//
// Le filtrage lui-même vit dans le navigateur ; ce qui peut casser en silence,
// c'est la donnée : un produit sans type de machine devient invisible dès qu'on
// filtre, un slug mal orthographié crée un filtre qui ne renvoie jamais rien.
// Ces cas ne lèvent aucune erreur — d'où ces vérifications.
// ---------------------------------------------------------------------------
import { readFileSync } from 'node:fs';
import {
  produits as tousProduits, produitsPublics as produits, categoriesProduits, categoriesPubliques,
  machinesCatalogue, marquesCatalogue, produitsDeCategorie, ficheSodilame, forfaitDe, etapesForfait,
  urlProduit, urlCollection, produitsNav, totalProduits,
} from '../data/produits.mjs';

// Les fiches sont générées sous /eshop/<collection>/<produit>.
const fichier = (p) => `public${urlProduit(p)}/index.html`;

let ok = 0;
let ko = 0;
const verifier = (nom, cond, detail = '') => {
  if (cond) { ok++; console.log(`  ✓ ${nom}`); }
  else { ko++; console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`); }
};

const slugsMachines = new Set(machinesCatalogue.map((m) => m.slug));
const slugsFamilles = new Set(categoriesProduits.map((c) => c.slug));
const slugsPublics = new Set(categoriesPubliques.map((c) => c.slug));

console.log('\n═══ Données du catalogue ═══');
{
  const sansMachine = produits.filter((p) => !Array.isArray(p.machines) || !p.machines.length);
  verifier(
    'chaque produit déclare au moins un type de machine',
    !sansMachine.length,
    sansMachine.map((p) => p.ref).join(', ')
  );

  const machineInconnue = produits.filter((p) => (p.machines || []).some((m) => !slugsMachines.has(m)));
  verifier(
    'aucun type de machine inconnu',
    !machineInconnue.length,
    machineInconnue.map((p) => `${p.ref}: ${p.machines.join(',')}`).join(' | ')
  );

  const familleInconnue = produits.filter((p) => !slugsPublics.has(p.categorie));
  verifier('chaque produit appartient à une famille connue', !familleInconnue.length,
    familleInconnue.map((p) => p.ref).join(', '));

  verifier('aucun slug de produit en double (forfaits compris)',
    new Set(tousProduits.map((p) => p.slug)).size === tousProduits.length);
  verifier('aucune référence en double (forfaits compris)',
    new Set(tousProduits.map((p) => p.ref)).size === tousProduits.length);

  verifier('chaque marque du filtre a au moins un produit',
    marquesCatalogue.every((m) => produits.some((p) => p.marque === m)),
    marquesCatalogue.join(', '));

  // Un filtre qui ne renvoie jamais rien est un filtre à retirer, pas à garder.
  const machinesVides = machinesCatalogue.filter(
    (m) => !produits.some((p) => (p.machines || []).includes(m.slug))
  );
  verifier('aucun filtre machine ne renvoie zéro produit', !machinesVides.length,
    machinesVides.map((m) => m.slug).join(', '));

  const famillesVides = categoriesPubliques.filter((c) => !produitsDeCategorie(c.slug).length);
  verifier('aucune famille vide', !famillesVides.length, famillesVides.map((c) => c.slug).join(', '));

  // Un produit repris sur une fiche du fabricant doit porter au minimum sa
  // fiche de données de sécurité et une photo : c'est ce qui distingue une
  // donnée vérifiée d'une donnée reconstituée, et le client a le droit de
  // savoir laquelle il lit.
  const verifies = produits.filter((x) => x.fiches);
  verifier(`${verifies.length} références reprises sur les fiches du fabricant`, verifies.length >= 9);
  verifier('chaque référence vérifiée a sa FDS et sa photo',
    verifies.every((x) => x.fiches.securite && x.photo),
    verifies.filter((x) => !(x.fiches.securite && x.photo)).map((x) => x.ref).join(', '));

  // Le lien inverse : un objet `technique` est ce qui autorise la fiche
  // SODILAME. L'un sans l'autre est une incohérence de données — soit on
  // publie une fiche vide, soit on garde des données que personne ne voit.
  verifier('données techniques ⇔ fiche technique du fabricant',
    produits.every((x) => !x.technique || (x.fiches && x.fiches.technique)),
    produits.filter((x) => x.technique && !(x.fiches && x.fiches.technique)).map((x) => x.ref).join(', '));

  const fs = await import('node:fs');
  const manquants = [];
  for (const x of verifies) {
    for (const f of [x.fiches.technique, x.fiches.securite, ficheSodilame(x)]) {
      if (f && !fs.existsSync(`static/assets/fiches/${f}`)) manquants.push(f);
    }
  }
  // La photo se vérifie sur TOUS les produits qui en déclarent une, pas
  // seulement sur les références documentées : un fichier absent ne casse pas
  // le build, il affiche une image morte dans la boutique.
  for (const x of produits) {
    if (x.photo && !fs.existsSync(`static/assets/produits/${x.photo}.jpg`)) manquants.push(x.photo + '.jpg');
  }
  verifier('tous les fichiers référencés existent sur le disque', !manquants.length, manquants.join(', '));

  // Une fiche SODILAME existe pour chaque référence documentée : c'est le
  // document qu'on envoie aux clients, son absence se verrait en clientèle.
  const aFiche = produits.filter((x) => ficheSodilame(x));
  verifier(`${aFiche.length} fiches techniques à la charte SODILAME`, aFiche.length >= 8);

  // Une incompatibilité de matériaux ne doit jamais être une puce de liste
  // noyée dans les caractéristiques : elle a son propre champ, mis en avant.
  const alerte = produits.filter((x) => x.attention);
  verifier(`${alerte.length} mises en garde matériaux déclarées`, alerte.length >= 3);
}

console.log('\n═══ Fiches PDF sur les pages produit ═══');
{
  const fs = await import('node:fs');
  for (const x of produits.filter((y) => y.fiches)) {
    const f = fichier(x);
    let html = '';
    try { html = fs.readFileSync(f, 'utf8'); } catch { /* page absente */ }
    const attendus = [x.fiches.technique, x.fiches.securite, ficheSodilame(x)].filter(Boolean);
    const absents = attendus.filter((f) => !html.includes(f));
    verifier(`${x.ref} : ${attendus.length} PDF liés`, !absents.length, absents.join(', '));
  }
}

console.log('\n═══ Page /eshop/catalogue générée ═══');
{
  let html = '';
  try {
    html = readFileSync('public/eshop/catalogue/index.html', 'utf8');
  } catch {
    console.log('  ✗ page absente — lance `node build.mjs` avant les tests');
    process.exit(1);
  }

  // On cible le motif exact des cartes : `data-produit` seul apparaît aussi
  // dans le sélecteur du script embarqué.
  const cartes = (html.match(/data-produit\s+data-ref="[^"]+"\s+data-famille=/g) || []).length;
  verifier(`les ${produits.length} produits sont dans le HTML livré`, cartes === produits.length, `${cartes} trouvés`);

  verifier('la barre de filtres est présente', html.includes('id="barre-filtres"'));
  verifier('elle est masquée tant que le script n’a pas tourné',
    /id="barre-filtres"[^>]*\shidden/.test(html));

  const boutons = (html.match(/data-filtre="/g) || []).length;
  const machinesUtiles = machinesCatalogue.filter((m) => produits.some((p) => (p.machines || []).includes(m.slug)));
  const attendus = categoriesPubliques.length + machinesUtiles.length + marquesCatalogue.length;
  verifier(`${attendus} boutons de filtre`, boutons === attendus, `${boutons} trouvés`);

  for (const c of categoriesPubliques) {
    verifier(`conseil technique présent pour « ${c.nomCourt} »`, html.includes(`data-conseil="${c.slug}"`));
  }

  verifier('plus aucun lien vers les anciennes adresses /produits', !/href="\/produits/.test(html));

  verifier('chaque fiche produit est liée depuis le catalogue',
    produits.every((p) => html.includes(`href="${urlProduit(p)}"`)));
}

console.log('\n═══ Retrait de vente depuis l’administration ═══');
{
  // Décocher « en vente » retire le produit du site. Le mécanisme repose sur
  // quatre pièces qui doivent rester en accord, et dont trois peuvent se
  // désaligner sans que rien ne casse visiblement : le marquage dans le HTML,
  // le pont entre les deux scripts, et la règle CSS qui rend le masquage
  // effectif. On les épingle ici.
  const catalogue = readFileSync('public/eshop/catalogue/index.html', 'utf8');
  const script = readFileSync('static/assets/panier.js', 'utf8');
  const filtres = readFileSync('src/catalogue.mjs', 'utf8');
  const css = readFileSync('static/assets/style.css', 'utf8');

  const sansRef = produits.filter((p) => !catalogue.includes(`data-ref="${p.ref}"`));
  verifier('chaque carte du catalogue porte sa référence', !sansRef.length,
    sansRef.map((p) => p.ref).join(', '));

  verifier('panier.js lit la disponibilité pour masquer les produits',
    script.includes('horsCatalogue') && script.includes('masquerProduits'));

  verifier('le catalogue expose un recalcul au script des prix',
    filtres.includes('window.sodilameCatalogue') && script.includes('window.sodilameCatalogue'));

  verifier('un produit retiré ne peut pas revenir par un filtre',
    filtres.includes('if (!auCatalogue(c)) return false'));

  verifier('les produits retirés sortent aussi du total affiché',
    filtres.includes('if (auCatalogue(c)) total++'));

  // Sans cette règle, `display:grid` l'emporte sur [hidden] et la ligne retirée
  // de la vente reste affichée : le défaut est invisible en relisant le JS.
  verifier('une ligne de conditionnement masquée disparaît vraiment',
    /\.cond-row\[hidden\]\s*\{\s*display:\s*none/.test(css));

  // Chaque fiche doit porter sa référence et son bloc de repli, sinon le retrait
  // masque la carte du catalogue mais laisse la fiche commandable.
  const fichesKo = produits.filter((p) => {
    const f = readFileSync(fichier(p), 'utf8');
    return !f.includes(`data-fiche-ref="${p.ref}"`) || !/class="achat retrait-vente" hidden/.test(f);
  });
  verifier('chaque fiche porte sa référence et son bloc de repli', !fichesKo.length,
    fichesKo.map((p) => p.ref).join(', '));
}

console.log('\n═══ Produits commandés chez le fabricant (champ delai) ═══');
{
  // Les granulés ne sont pas stockés : leur fiche annonce une dizaine de jours.
  // Le risque est une promesse contradictoire — « livré lors de la prochaine
  // tournée » ET « environ 10 jours » sur la même page, ce qui revient à
  // promettre le plus rapide des deux. On épingle donc l'exclusion.
  const fs = await import('node:fs');
  const surCommande = produits.filter((p) => p.delai);
  verifier(`${surCommande.length} référence(s) déclarée(s) sur commande`, surCommande.length >= 3);

  const fautes = [];
  for (const p of surCommande) {
    const f = fichier(p);
    if (!fs.existsSync(f)) { fautes.push(`${p.ref} : page absente`); continue; }
    const h = fs.readFileSync(f, 'utf8');
    if (!h.includes('Livraison comprise dans le prix')) fautes.push(`${p.ref} : livraison comprise absente`);
    if (h.includes('En stock à Saint-Martin-de-Crau')) fautes.push(`${p.ref} : annonce « en stock » à tort`);
    if (h.includes('lors de sa prochaine tournée')) fautes.push(`${p.ref} : promet la tournée à tort`);
  }
  verifier('aucune promesse de stock sur un produit sur commande', !fautes.length, fautes.join(' · '));

  // Et l'inverse : les produits réellement en stock doivent garder la promesse.
  const enStock = produits.find((p) => !p.delai && p.type !== 'machine');
  const hStock = fs.readFileSync(fichier(enStock), 'utf8');
  verifier(`${enStock.ref} garde la livraison offerte et le stock`,
    hStock.includes('sans frais de port dès une unité') && hStock.includes('En stock à Saint-Martin-de-Crau'));
}

console.log('\n═══ Arborescence de la boutique /eshop ═══');
{
  const fs = await import('node:fs');
  const lire = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch { return ''; } };

  verifier('« catalogue » et « panier » ne sont pas des noms de collection',
    !slugsFamilles.has('catalogue') && !slugsFamilles.has('panier'));

  const accueil = lire('public/eshop/index.html');
  verifier('/eshop existe', !!accueil);
  verifier('/eshop lie chaque collection publique',
    categoriesPubliques.every((c) => accueil.includes(`href="${urlCollection(c.slug)}"`)));
  verifier('/eshop lie le catalogue complet', accueil.includes('href="/eshop/catalogue"'));
  const { rayonsBoutique, collectionsDuRayon, urlRayon } = await import('../data/produits.mjs');
  const { marques } = await import('../data/marques.mjs');
  verifier('7 rayons : Froid, Cuisson, Fours, Laverie, Buanderie, Extraction, Consommables',
    rayonsBoutique.map((r) => r.nom).join(',') === 'Froid,Cuisson,Fours,Laverie,Buanderie,Extraction,Consommables');
  verifier('chaque collection publique appartient à un rayon',
    categoriesPubliques.every((c) => rayonsBoutique.some((r) => r.slug === c.rayon)),
    categoriesPubliques.filter((c) => !rayonsBoutique.some((r) => r.slug === c.rayon)).map((c) => c.slug).join(', '));
  verifier('aucun rayon ne porte le nom d’une collection, ni « catalogue » ni « panier »',
    rayonsBoutique.every((r) => !slugsFamilles.has(r.slug) && !['catalogue', 'panier'].includes(r.slug)));
  verifier('les marques citées par les rayons existent',
    rayonsBoutique.every((r) => r.marques.every((m) => marques.some((x) => x.slug === m))));
  verifier('/eshop lie chaque rayon', rayonsBoutique.every((r) => accueil.includes(`href="${urlRayon(r.slug)}"`)));
  const rayonsVides = rayonsBoutique.filter((r) => !collectionsDuRayon(r.slug).length);
  verifier(`${rayonsVides.length} rayons sans produit en ligne : pages présentes, hors index`,
    rayonsVides.every((r) => /noindex/.test(fs.readFileSync(`public${urlRayon(r.slug)}/index.html`, 'utf8'))));
  verifier('les rayons en ligne listent leurs catégories',
    rayonsBoutique.filter((r) => collectionsDuRayon(r.slug).length).every((r) => {
      const h = fs.readFileSync(`public${urlRayon(r.slug)}/index.html`, 'utf8');
      return collectionsDuRayon(r.slug).every((c) => h.includes(`href="${urlCollection(c.slug)}"`)) && !/noindex/.test(h);
    }));

  for (const c of categoriesPubliques) {
    const h = lire(`public${urlCollection(c.slug)}/index.html`);
    const liste = produitsDeCategorie(c.slug);
    verifier(`collection ${c.slug} : ${liste.length} fiches liées`,
      !!h && liste.every((p) => h.includes(`href="${urlProduit(p)}"`)));
  }

  verifier('/eshop/panier existe et n’est pas indexée',
    /noindex/.test(lire('public/eshop/panier/index.html')));

  // Aucune page générée ne doit encore pointer vers l'ancienne boutique : les
  // 301 rattrapent les liens externes, pas nos propres liens.
  const pagesHtml = [];
  const parcourir = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = `${d}/${e.name}`;
      if (e.isDirectory()) parcourir(f);
      else if (e.name.endsWith('.html')) pagesHtml.push(f);
    }
  };
  parcourir('public');
  const anciens = pagesHtml.filter((f) => /href="\/produits(?:[/?"#])/.test(lire(f)));
  verifier('aucun lien interne vers /produits', !anciens.length, anciens.slice(0, 5).join(', '));
  verifier('l’ancien dossier /produits n’est plus généré', !fs.existsSync('public/produits'));

  verifier('menu et pied de page pointent vers la boutique',
    produitsNav.every((n) => n.url.startsWith('/eshop/')) && /href="\/eshop\/panier"/.test(accueil));

  const plan = lire('public/plan-du-site/index.html');
  verifier('le plan du site liste chaque fiche publique',
    produits.every((p) => plan.includes(`href="${urlProduit(p)}"`)));

  const sitemap = lire('public/sitemap.xml');
  verifier('le sitemap contient les collections et pas le panier',
    categoriesPubliques.every((c) => sitemap.includes(`/eshop/${c.slug}</loc>`)) && !sitemap.includes('/eshop/panier</loc>'));
}

console.log('\n═══ Forfaits de livraison, d’installation et de mise en service ═══');
{
  const fs = await import('node:fs');
  const machines = produits.filter((p) => p.type === 'machine');
  const forfaits = tousProduits.filter((p) => p.type === 'forfait');

  verifier(`${machines.length} machines en ligne`, machines.length >= 7);
  verifier('chaque machine a exactement un forfait',
    machines.every((m) => forfaitDe(m) && forfaits.filter((f) => f.pour === m.ref).length === 1),
    machines.filter((m) => !forfaitDe(m)).map((m) => m.ref).join(', '));
  verifier('aucun forfait sans machine', forfaits.every((f) => machines.some((m) => m.forfait === f.ref)));
  verifier('les forfaits sont absents des listes publiques',
    !produits.some((p) => p.type === 'forfait') && !categoriesPubliques.some((c) => c.slug === 'forfaits'));
  verifier('les forfaits ne comptent pas dans le total affiché', totalProduits === produits.length);
  verifier('aucune page de forfait générée', !fs.existsSync('public/eshop/forfaits'));
  // Les forfaits sont « marque SODILAME » : ils ne doivent pas à eux seuls
  // faire apparaître un bouton de filtre (le sel, lui, est bien un produit SODILAME).
  verifier('le filtre des marques ne compte que les produits publics',
    marquesCatalogue.join() === [...new Set(produits.map((p) => p.marque))].sort().join());

  const fautes = [];
  for (const m of machines) {
    const h = fs.readFileSync(fichier(m), 'utf8');
    const f = forfaitDe(m);
    if (!h.includes(`data-forfait-ref="${f.ref}"`)) fautes.push(`${m.ref} : bouton sans forfait`);
    if (!h.includes(`data-forfait-de="${f.ref}"`)) fautes.push(`${m.ref} : ligne forfait absente`);
    if (!etapesForfait.every((e) => h.includes(e.replace(/’/g, '’')))) fautes.push(`${m.ref} : étapes incomplètes`);
    // Une machine n'est ni « en stock » ni « livrée sans frais dès une unité ».
    if (h.includes('En stock à Saint-Martin-de-Crau')) fautes.push(`${m.ref} : annonce « en stock »`);
    if (h.includes('dès une unité')) fautes.push(`${m.ref} : promet la livraison offerte`);
    if (/"availability":"https:\/\/schema.org\/InStock"/.test(h)) fautes.push(`${m.ref} : InStock dans le balisage`);
  }
  verifier('chaque fiche machine porte son forfait et rien d’autre', !fautes.length, fautes.join(' · '));

  // Le serveur recalcule les forfaits : c'est la seule défense qui compte.
  const api = fs.readFileSync('api/commande.js', 'utf8');
  verifier('le serveur ignore les forfaits envoyés par le navigateur',
    /if \(officiel\.estForfait\) continue;/.test(api));
  verifier('le serveur ajoute le forfait derrière chaque machine, à la même quantité',
    /FORFAITS\.get\(officiel\.forfait\)/.test(api) && /lignes\.push\(\{ \.\.\.f, qte,/.test(api));

  const js = fs.readFileSync('static/assets/panier.js', 'utf8');
  verifier('le panier synchronise les forfaits à chaque lecture et écriture',
    (js.match(/synchroForfaits\(/g) || []).length >= 3);
  verifier('le panier n’envoie pas les lignes de forfait', /lire\(\)\.filter\(function \(l\) \{ return !l\.pour; \}\)/.test(js));
}

console.log('\n═══ Sélection Miele Professional ═══');
{
  const fs = await import('node:fs');
  const { refsMieleManquantes, produitsMiele } = await import('../data/miele.mjs');
  const { tarifMiele } = await import('../data/miele-tarif.mjs');

  verifier('toutes les références Miele sont au tarif généré', !refsMieleManquantes.length, refsMieleManquantes.join(', '));

  // Le tarif généré ne doit porter que des données publiables : un champ de
  // plus, c'est peut-être le prix d'achat qui fuit sur le site.
  const autorises = new Set(['prix', 'ean', 'fiche', 'description']);
  const champs = new Set(Object.values(tarifMiele).flatMap((t) => Object.keys(t)));
  verifier('le tarif généré ne contient que prix public, EAN, fiche et descriptif',
    [...champs].every((c) => autorises.has(c)), [...champs].join(', '));
  const brut = fs.readFileSync('data/miele-tarif.mjs', 'utf8');
  verifier('aucune trace de prix de revient dans le tarif généré', !/cost|revient|achat -|-33/i.test(brut.split('\n').filter((l) => !l.startsWith('//')).join('\n')));

  const conds = produitsMiele.flatMap((p) => p.conditionnements.map((c) => ({ p, c })));
  verifier(`${conds.length} versions Miele, toutes avec un prix public`, conds.every(({ c }) => typeof c.prix === 'number' && c.prix > 0));
  verifier('chaque version a sa fiche produit Miele', conds.every(({ c }) => /^https:\/\/media\.miele\.com\//.test(c.ficheMiele || '')));
  verifier('chaque libellé de version tient dans 80 caractères (limite du serveur)', conds.every(({ c }) => c.label.length <= 80),
    conds.filter(({ c }) => c.label.length > 80).map(({ c }) => c.label).join(' | '));
  verifier('aucun libellé de version en double dans une fiche',
    produitsMiele.every((p) => new Set(p.conditionnements.map((c) => c.label)).size === p.conditionnements.length));

  // Décision de la direction (28/10/2026) : ni lave-verres, ni machines à capot.
  verifier('ni lave-verres ni machine à capot en ligne',
    !produits.some((p) => /^PTD 70?1\b|^PTD 901/.test(p.ref) || /lave-verres frontal|à capot/i.test(p.nom)));

  const fautes = [];
  for (const p of produitsMiele) {
    const h = fs.readFileSync(fichier(p), 'utf8');
    if (!h.includes('media.miele.com')) fautes.push(`${p.ref} : lien fiche Miele absent`);
    if (p.conditionnements.some((c) => c.ean) && !h.includes('"gtin13"')) fautes.push(`${p.ref} : gtin13 absent`);
    if (p.type !== 'machine' && h.includes('En stock à Saint-Martin-de-Crau')) fautes.push(`${p.ref} : annonce un stock`);
    if (p.type !== 'machine' && h.includes('lors de sa prochaine tournée')) fautes.push(`${p.ref} : promet la tournée`);
  }
  verifier('fiches Miele : lien fabricant, GTIN, et aucune promesse de stock', !fautes.length, fautes.slice(0, 6).join(' · '));
  verifier('chaque fiche Miele a sa photo', produitsMiele.every((p) => p.photo && fs.existsSync(`static/assets/produits/${p.photo}.jpg`)),
    produitsMiele.filter((p) => !p.photo).map((p) => p.ref).join(', '));
  const avec3d = produitsMiele.filter((p) => p.vue3d);
  verifier(`${avec3d.length} vues 3D, toutes lues chez Miele (media.miele.com)`,
    avec3d.length > 0 && avec3d.every((p) => /^https:\/\/media\.miele\.com\/.+\.glb$/.test(p.vue3d.glb)));
  verifier('le lecteur 3D est servi depuis nos fichiers', fs.existsSync('static/assets/vendor/model-viewer-4.0.0.min.js'));
  const f3d = fs.readFileSync(fichier(avec3d[0]), 'utf8');
  verifier('la fiche avec vue 3D porte le bouton et le crédit Miele', f3d.includes('vue3d-btn') && f3d.includes('© Miele'));
}

console.log('\n═══ Sélection RATIONAL ═══');
{
  const fs = await import('node:fs');
  const { refsRationalManquantes, produitsRational } = await import('../data/rational.mjs');
  const { tarifRational } = await import('../data/rational-tarif.mjs');
  const { photosRational, fichesRational } = await import('../data/rational-visuels.mjs');

  verifier('toutes les références RATIONAL sont au tarif généré', !refsRationalManquantes.length, refsRationalManquantes.join(', '));
  // Prix public et libellé, rien d'autre : un champ de plus, c'est peut-être
  // le prix d'achat qui fuit sur le site.
  const champs = new Set(Object.values(tarifRational).flatMap((t) => Object.keys(t)));
  verifier('le tarif RATIONAL généré ne contient que prix public et libellé', [...champs].every((c) => ['prix', 'libelle'].includes(c)), [...champs].join(', '));
  const brut = fs.readFileSync('data/rational-tarif.mjs', 'utf8').split('\n').filter((l) => !l.startsWith('//')).join('\n');
  verifier('aucune trace de prix de revient dans le tarif RATIONAL', !/cost|revient|achat|-39|remise/i.test(brut));

  const conds = produitsRational.flatMap((p) => p.conditionnements.map((c) => ({ p, c })));
  verifier(`${conds.length} versions RATIONAL, toutes avec un prix public`, conds.every(({ c }) => typeof c.prix === 'number' && c.prix > 0));
  verifier('chaque libellé commence par la référence RATIONAL et tient dans 80 caractères',
    conds.every(({ c }) => c.label.startsWith(c.refFabricant + ' · ') && c.label.length <= 80));
  verifier('aucun libellé de version en double dans une fiche',
    produitsRational.every((p) => new Set(p.conditionnements.map((c) => c.label)).size === p.conditionnements.length));
  verifier('ni gaz naturel L ni 20-2/1 dans la sélection (décision du 30/10/2026)',
    !Object.values(tarifRational).some((t) => /GAZ NATUREL L\b|20-2\/1 VERSION/.test(t.libelle)));

  const machines = produitsRational.filter((p) => p.type === 'machine');
  verifier(`${machines.length} machines RATIONAL, chacune avec sa fiche technique d'origine`,
    machines.length >= 13 && machines.every((p) => p.conditionnements.every((c) => c.ficheFabricant && fs.existsSync(`static${c.ficheFabricant}`))));
  verifier('les fiches techniques RATIONAL sont des PDF',
    Object.values(fichesRational).every((f) => fs.readFileSync(`static/assets/fiches/${f}`).subarray(0, 5).toString() === '%PDF-'));
  verifier('chaque fiche RATIONAL a sa photo', produitsRational.every((p) => p.photo && fs.existsSync(`static/assets/produits/${p.photo}.jpg`)),
    produitsRational.filter((p) => !p.photo).map((p) => p.ref).join(', '));
  // Photos sans métadonnées : pas de segment EXIF.
  verifier('photos RATIONAL sans métadonnées EXIF',
    Object.values(photosRational).every((f) => !fs.readFileSync(`static/assets/produits/${f}.jpg`).includes('Exif')));

  const fautes = [];
  for (const p of produitsRational) {
    const h = fs.readFileSync(fichier(p), 'utf8');
    if (!h.includes('© RATIONAL')) fautes.push(`${p.ref} : crédit absent`);
    if (p.type === 'machine' && !h.includes('/assets/fiches/rational/')) fautes.push(`${p.ref} : fiche technique absente`);
    if (p.type !== 'machine' && h.includes('En stock à Saint-Martin-de-Crau')) fautes.push(`${p.ref} : annonce un stock`);
    if (p.type !== 'machine' && h.includes('lors de sa prochaine tournée')) fautes.push(`${p.ref} : promet la tournée`);
  }
  verifier('fiches RATIONAL : crédit, fiche technique, et aucune promesse de stock', !fautes.length, fautes.slice(0, 6).join(' · '));
  const l = fs.readFileSync(fichier(produitsRational.find((p) => p.ref === 'iVario Pro L')), 'utf8');
  verifier('iVario Pro L : une fiche technique par variante, sans doublon',
    (l.match(/href="[^"]+fiche-technique-rational\.pdf"/g) || []).length === 2 && l.includes('sur soubassement'));
  verifier('chaque machine RATIONAL a son forfait', machines.every((m) => forfaitDe(m)));
  // Grille de la direction du 30/10/2026 : 6 et 10 niveaux 550 €, 20 niveaux 850 €, iVario 750 €.
  const attendu = (m) => (/^iVario/.test(m.ref) ? 750 : /20-/.test(m.ref) ? 850 : 550);
  const ecarts = machines.filter((m) => forfaitDe(m)?.conditionnements[0].prix !== attendu(m));
  verifier('forfaits RATIONAL conformes à la grille (550 / 850 / 750 € HT)', !ecarts.length, ecarts.map((m) => m.ref).join(', '));
}

console.log('\n═══ Sélection Foster ═══');
{
  const fs = await import('node:fs');
  const { refsFosterManquantes, produitsFoster } = await import('../data/foster.mjs');
  const { tarifFoster } = await import('../data/foster-tarif.mjs');
  const { visuelsFoster } = await import('../data/foster-visuels.mjs');

  verifier('toutes les références Foster sont au tarif généré', !refsFosterManquantes.length, refsFosterManquantes.join(', '));
  const champs = new Set(Object.values(tarifFoster).flatMap((t) => Object.keys(t)));
  verifier('le tarif Foster généré ne contient que prix public et libellé', [...champs].every((c) => ['prix', 'libelle'].includes(c)), [...champs].join(', '));
  const brut = fs.readFileSync('data/foster-tarif.mjs', 'utf8').split('\n').filter((l) => !l.startsWith('//')).join('\n');
  verifier('aucune trace de prix de revient dans le tarif Foster', !/cost|revient|achat|-50|remise|éco-participation/i.test(brut));

  const conds = produitsFoster.flatMap((p) => p.conditionnements.map((c) => ({ p, c })));
  verifier(`${conds.length} versions Foster, toutes avec un prix public`, conds.every(({ c }) => typeof c.prix === 'number' && c.prix > 0));
  verifier('chaque libellé commence par la référence Foster et tient dans 80 caractères',
    conds.every(({ c }) => c.label.startsWith(c.refFabricant + ' · ') && c.label.length <= 80));
  verifier('aucun libellé de version en double dans une fiche',
    produitsFoster.every((p) => new Set(p.conditionnements.map((c) => c.label)).size === p.conditionnements.length));
  verifier('ni gamme Xtra ni version sans groupe dans la sélection (décision du 30/10/2026)',
    !Object.values(tarifFoster).some((t) => /^XR\d|SANS GROUPE|-SG\b/.test(t.libelle)));

  const machines = produitsFoster.filter((p) => p.type === 'machine');
  verifier(`${machines.length} machines Foster, chacune avec sa photo`,
    machines.length >= 23 && machines.every((p) => p.photo && fs.existsSync(`static/assets/produits/${p.photo}.jpg`)),
    machines.filter((p) => !p.photo).map((p) => p.ref).join(', '));
  verifier('photos Foster sans métadonnées EXIF',
    Object.values(visuelsFoster).filter((v) => v.photo).every((v) => !fs.readFileSync(`static/assets/produits/${v.photo}.jpg`).includes('Exif')));
  const liens = conds.flatMap(({ c }) => [c.ficheFabricant, c.etiquetteEnergie]).filter(Boolean);
  verifier('documents Foster : uniquement des liens vers fosterrefrigerator.com',
    liens.length > 40 && liens.every((u) => /^https:\/\/www\.fosterrefrigerator\.com\/Files\/Product%20assets\/[^\s"<>]+\.pdf$/.test(u)));
  verifier('chaque machine Foster a un document du fabricant', machines.every((p) => p.conditionnements.every((c) => c.ficheFabricant)));
  // Étiquette énergie : obligatoire pour les armoires et meubles bas de stockage.
  const g3 = conds.filter(({ c }) => /^4[13]-/.test(c.refFabricant));
  verifier(`étiquette énergie sur les ${g3.length} versions EcoPro G3`, g3.length === 24 && g3.every(({ c }) => c.etiquetteEnergie));

  const fautes = [];
  for (const p of produitsFoster) {
    const h = fs.readFileSync(fichier(p), 'utf8');
    if (p.photo && !h.includes('© Foster')) fautes.push(`${p.ref} : crédit absent`);
    if (p.type === 'machine' && !h.includes('fosterrefrigerator.com/Files/')) fautes.push(`${p.ref} : document absent`);
    if (p.conditionnements.some((c) => c.etiquetteEnergie) && !h.includes('Étiquette énergie')) fautes.push(`${p.ref} : étiquette absente`);
    if (p.type !== 'machine' && h.includes('En stock à Saint-Martin-de-Crau')) fautes.push(`${p.ref} : annonce un stock`);
    if (p.type !== 'machine' && h.includes('lors de sa prochaine tournée')) fautes.push(`${p.ref} : promet la tournée`);
  }
  verifier('fiches Foster : crédit, documents, étiquette, et aucune promesse de stock', !fautes.length, fautes.slice(0, 6).join(' · '));
  verifier('chaque machine Foster a son forfait', machines.every((m) => forfaitDe(m)));
  // Grille de la direction du 30/10/2026 : armoire 1 porte 150 €, 2 portes 250 €, table 150 €, cellule 150 €.
  const deuxPortes = ['EP1440H', 'EP1440L', 'EGR2H', 'EGRL2H'];
  const ecarts = machines.filter((m) => forfaitDe(m)?.conditionnements[0].prix !== (deuxPortes.includes(m.ref) ? 250 : 150));
  verifier('forfaits Foster conformes à la grille (150 / 250 € HT)', !ecarts.length, ecarts.map((m) => m.ref).join(', '));
}

console.log('\n═══ En-tête de la boutique ═══');
{
  const fs = await import('node:fs');
  const pagesBoutique = ['public/eshop/index.html', 'public/eshop/catalogue/index.html', 'public/eshop/panier/index.html', fichier(produits[0])];
  const sansTete = pagesBoutique.filter((f) => {
    const h = fs.readFileSync(f, 'utf8');
    return !(h.includes('class="shop-nav"') && h.includes('action="/eshop/catalogue"') && h.includes('href="/"'));
  });
  verifier('chaque page boutique a l’en-tête e-shop (rayons, recherche, retour au site)', !sansTete.length, sansTete.join(', '));
  const accueilBoutique = fs.readFileSync('public/eshop/index.html', 'utf8');
  const nav = accueilBoutique.slice(accueilBoutique.indexOf('class="shop-nav"'), accueilBoutique.indexOf('</nav>', accueilBoutique.indexOf('class="shop-nav"')));
  verifier('les rayons mènent à toutes les collections publiques',
    categoriesPubliques.every((c) => nav.includes(`href="${urlCollection(c.slug)}"`)));
  const vitrine = ['public/index.html', 'public/contact/index.html', 'public/marques/index.html'].map((f) => fs.readFileSync(f, 'utf8'));
  verifier('le site vitrine garde son en-tête (pas de rayons e-shop)', vitrine.every((h) => !h.includes('class="shop-nav"') && h.includes('id="burger"')));
  verifier('la recherche du catalogue est branchée', fs.readFileSync('public/eshop/catalogue/index.html', 'utf8').includes('id="recherche"'));
}

console.log('\n═══ Réalisations en photos ═══');
{
  const fs = await import('node:fs');
  const { realisations } = await import('../data/realisations.mjs');
  const photos = realisations.flatMap((r) => r.photos);
  verifier(`${photos.length} photos de réalisation, toutes présentes`, photos.every((ph) => fs.existsSync(`static/assets/realisations/${ph.fichier}`)));
  // Une photo d'iPhone porte la position GPS du chantier, donc du client.
  // On cherche les segments EXIF (APP1 « Exif ») dans les JPEG publiés.
  const avecExif = photos.filter((ph) => fs.readFileSync(`static/assets/realisations/${ph.fichier}`).includes(Buffer.from('Exif\0\0')));
  verifier('aucune photo publiée ne contient de métadonnées EXIF (GPS)', !avecExif.length, avecExif.map((ph) => ph.fichier).join(', '));
  verifier('chaque photo a un texte alternatif', photos.every((ph) => ph.alt && ph.alt.length > 20));
  // Règle de la direction : on reste vague, jamais de nom d'établissement.
  verifier('clients désignés de façon générique (« un domaine », « un hôtel »…)',
    realisations.every((r) => r.client === null || /^(un|une|des) /i.test(r.client)), realisations.map((r) => r.client).join(', '));
  verifier('les produits cités par une réalisation existent en boutique',
    realisations.every((r) => (r.produits || []).every((ref) => produits.some((p) => p.ref === ref))));
}

console.log('\n═══ Forfaits : grille de la direction ═══');
{
  const forfaits = tousProduits.filter((p) => p.type === 'forfait');
  const prixDe = (ref) => forfaits.find((f) => f.pour === ref)?.conditionnements[0].prix;
  verifier('lave-linge et sèche-linge jusqu’à 10 kg : 350 €', ['PWM 507', 'PWM 909', 'PWM 1108', 'PDR 508', 'PDR 910'].every((r) => prixDe(r) === 350));
  verifier('lave-linge et sèche-linge de 11 à 25 kg : 550 €', ['PWM 511', 'PWM 520', 'PDR 514', 'PDR 522'].every((r) => prixDe(r) === 550));
  verifier('calandres : 850 €', ['HM 16-83', 'PRI 210'].every((r) => prixDe(r) === 850));
  verifier('chaque machine de blanchisserie a un forfait chiffré',
    produits.filter((p) => p.type === 'machine' && /linge|repassage/.test(p.categorie)).every((m) => typeof prixDe(m.ref) === 'number'));
}

console.log('\n═══ Bandeau des prix ═══');
{
  const fs = await import('node:fs');
  const js = fs.readFileSync('static/assets/panier.js', 'utf8');
  // L'ancienne version retirait le bandeau dès le PREMIER prix reçu : un
  // catalogue mixte perdait son explication au moment où elle servait.
  verifier('le bandeau n’est plus retiré au premier prix',
    !/tarifs\.some\(function \(t\) \{ return typeof t\.prix === 'number'; \}\)/.test(js));
  verifier('le bandeau compare la liste des articles sans prix', js.includes('majNotices(carte)') && js.includes('sansPrix'));
  const h = fs.readFileSync('public/eshop/index.html', 'utf8');
  verifier('le bandeau livré porte la liste des articles sans prix',
    /class="notice-prix" data-total="\d+" data-sans-prix="/.test(h));
}

console.log('\n═══ Redirections des anciennes URL ═══');
{
  const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));

  // Simulation fidèle à l'ordre de Vercel : la première règle qui correspond
  // l'emporte, `has` filtre sur la query, les groupes nommés passent dans la
  // destination.
  const resoudre = (chemin) => {
    const [p, qs = ''] = chemin.split('?');
    const q = new URLSearchParams(qs);
    for (const r of vercel.redirects) {
      const params = {};
      const motif = '^' + r.source.replace(/:(\w+)\*/g, (_, n) => `(?<${n}>.*)`).replace(/:(\w+)/g, (_, n) => `(?<${n}>[^/]+)`) + '$';
      const m = p.match(new RegExp(motif));
      if (!m) continue;
      Object.assign(params, m.groups || {});
      let ok = true;
      for (const h of r.has || []) {
        if (h.type !== 'query' || !q.has(h.key)) { ok = false; break; }
        if (h.value) {
          const mv = q.get(h.key).match(new RegExp('^' + h.value + '$'));
          if (!mv) { ok = false; break; }
          Object.assign(params, mv.groups || {});
        }
      }
      if (!ok) continue;
      return { dest: r.destination.replace(/:(\w+)\*?/g, (_, n) => params[n] ?? ''), permanent: r.permanent };
    }
    return null;
  };

  const cas = [
    ['/produits', '/eshop'],
    ['/boutique', '/eshop'],
    ['/produits/ma-commande', '/eshop/panier'],
    ['/produits?famille=traitement-eau', '/eshop/traitement-eau'],
    ['/produits?marque=Winterhalter', '/eshop/catalogue'],
    ['/produits/detergents-lave-vaisselle', '/eshop/detergents-lave-vaisselle'],
    ...produits.filter((p) => p.type !== 'machine').slice(0, 3).map((p) => [`/produits/${p.categorie}/${p.slug}`, urlProduit(p)]),
  ];
  for (const [de, vers] of cas) {
    const r = resoudre(de);
    verifier(`${de} → ${vers} (301)`, r && r.dest === vers && r.permanent === true, r ? r.dest : 'aucune');
  }
  verifier('aucune redirection ne capte /eshop', !['/eshop', '/eshop/catalogue', '/eshop/panier', urlProduit(produits[0])].some((x) => resoudre(x)));
}

console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
