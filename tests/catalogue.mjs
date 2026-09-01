// ---------------------------------------------------------------------------
// Cohérence du catalogue filtrable.
//
// Le filtrage lui-même vit dans le navigateur ; ce qui peut casser en silence,
// c'est la donnée : un produit sans type de machine devient invisible dès qu'on
// filtre, un slug mal orthographié crée un filtre qui ne renvoie jamais rien.
// Ces cas ne lèvent aucune erreur — d'où ces vérifications.
// ---------------------------------------------------------------------------
import { readFileSync } from 'node:fs';
import {
  produits, categoriesProduits, machinesCatalogue, marquesCatalogue, produitsDeCategorie,
} from '../data/produits.mjs';

let ok = 0;
let ko = 0;
const verifier = (nom, cond, detail = '') => {
  if (cond) { ok++; console.log(`  ✓ ${nom}`); }
  else { ko++; console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`); }
};

const slugsMachines = new Set(machinesCatalogue.map((m) => m.slug));
const slugsFamilles = new Set(categoriesProduits.map((c) => c.slug));

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

  const familleInconnue = produits.filter((p) => !slugsFamilles.has(p.categorie));
  verifier('chaque produit appartient à une famille connue', !familleInconnue.length,
    familleInconnue.map((p) => p.ref).join(', '));

  verifier('aucun slug de produit en double',
    new Set(produits.map((p) => p.slug)).size === produits.length);

  verifier('chaque marque du filtre a au moins un produit',
    marquesCatalogue.every((m) => produits.some((p) => p.marque === m)),
    marquesCatalogue.join(', '));

  // Un filtre qui ne renvoie jamais rien est un filtre à retirer, pas à garder.
  const machinesVides = machinesCatalogue.filter(
    (m) => !produits.some((p) => (p.machines || []).includes(m.slug))
  );
  verifier('aucun filtre machine ne renvoie zéro produit', !machinesVides.length,
    machinesVides.map((m) => m.slug).join(', '));

  const famillesVides = categoriesProduits.filter((c) => !produitsDeCategorie(c.slug).length);
  verifier('aucune famille vide', !famillesVides.length, famillesVides.map((c) => c.slug).join(', '));
}

console.log('\n═══ Page /produits générée ═══');
{
  let html = '';
  try {
    html = readFileSync('public/produits/index.html', 'utf8');
  } catch {
    console.log('  ✗ page absente — lance `node build.mjs` avant les tests');
    process.exit(1);
  }

  // On cible le motif exact des cartes : `data-produit` seul apparaît aussi
  // dans le sélecteur du script embarqué.
  const cartes = (html.match(/data-produit\s+data-famille=/g) || []).length;
  verifier(`les ${produits.length} produits sont dans le HTML livré`, cartes === produits.length, `${cartes} trouvés`);

  verifier('la barre de filtres est présente', html.includes('id="barre-filtres"'));
  verifier('elle est masquée tant que le script n’a pas tourné',
    /id="barre-filtres"[^>]*\shidden/.test(html));

  const boutons = (html.match(/data-filtre="/g) || []).length;
  const attendus = categoriesProduits.length + machinesCatalogue.length + marquesCatalogue.length;
  verifier(`${attendus} boutons de filtre`, boutons === attendus, `${boutons} trouvés`);

  for (const c of categoriesProduits) {
    verifier(`conseil technique présent pour « ${c.nomCourt} »`, html.includes(`data-conseil="${c.slug}"`));
  }

  // Les anciennes pages de famille ne doivent plus exister ni être liées :
  // elles redirigent désormais vers le catalogue filtré.
  const lienFamille = new RegExp(`href="/produits/(${[...slugsFamilles].join('|')})"`).test(html);
  verifier('plus aucun lien vers les anciennes pages de famille', !lienFamille);

  verifier('chaque fiche produit est liée depuis le catalogue',
    produits.every((p) => html.includes(`href="/produits/${p.categorie}/${p.slug}"`)));
}

console.log('\n═══ Redirections des anciennes URL ═══');
{
  const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
  for (const c of categoriesProduits) {
    const r = vercel.redirects.find((x) => x.source === `/produits/${c.slug}`);
    verifier(`/produits/${c.slug} redirige en 301`,
      !!r && r.permanent === true && r.destination.includes(`famille=${c.slug}`),
      r ? r.destination : 'absente');
  }
  // La redirection ne doit surtout pas avaler les fiches produit.
  const trop = vercel.redirects.filter(
    (r) => r.source.startsWith('/produits/') && (r.source.includes(':') || r.source.includes('*'))
  );
  verifier('aucune redirection générique qui capterait les fiches produit', !trop.length,
    trop.map((r) => r.source).join(', '));
}

console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
