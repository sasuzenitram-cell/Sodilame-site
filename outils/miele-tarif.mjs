// ---------------------------------------------------------------------------
// Génère data/miele-tarif.mjs à partir de l'export Dolibarr du tarif Miele.
//
//   node outils/miele-tarif.mjs chemin/vers/1_Import_Produits_MIELE_2026_creation.csv
//
// Ne retient QUE les références utilisées par data/miele.mjs, et pour chacune :
// prix public conseillé, EAN, lien de la fiche produit Miele, descriptif
// technique et origine du tarif.
//
// ⚠️  CONFIDENTIEL : le CSV contient aussi le PRIX DE REVIENT SODILAME
//     (colonne p.cost_price) et la note privée, qui le répète. Ces deux
//     colonnes ne sont JAMAIS lues ici. Le CSV lui-même ne doit pas être
//     ajouté au dépôt.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const fichier = process.argv[2];
if (!fichier) {
  console.error('Usage : node outils/miele-tarif.mjs <1_Import_Produits_MIELE_….csv>');
  process.exit(1);
}

// Lecteur CSV : séparateur « ; », valeurs entre guillemets, retours à la ligne
// autorisés DANS les guillemets (les descriptifs Miele en contiennent).
function lireCsv(texte) {
  const lignes = [];
  let ligne = [];
  let champ = '';
  let dans = false;
  for (let i = 0; i < texte.length; i++) {
    const c = texte[i];
    if (dans) {
      if (c === '"' && texte[i + 1] === '"') { champ += '"'; i++; }
      else if (c === '"') dans = false;
      else champ += c;
    } else if (c === '"') dans = true;
    else if (c === ';') { ligne.push(champ); champ = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && texte[i + 1] === '\n') i++;
      ligne.push(champ); champ = '';
      if (ligne.some((x) => x !== '')) lignes.push(ligne);
      ligne = [];
    } else champ += c;
  }
  if (champ || ligne.length) { ligne.push(champ); lignes.push(ligne); }
  return lignes;
}

const [entetes, ...lignes] = lireCsv(readFileSync(fichier, 'utf8').replace(/^﻿/, ''));
const col = (motif) => {
  const i = entetes.findIndex((h) => motif.test(h));
  if (i < 0) throw new Error(`Colonne introuvable : ${motif}`);
  return i;
};
// Uniquement les colonnes publiables. p.cost_price et p.note ne sont pas lues.
const C = {
  ref: col(/\(p\.ref\)/),
  description: col(/\(p\.description\)/),
  url: col(/\(p\.url\)/),
  ean: col(/\(p\.barcode\)/),
  prix: col(/\(p\.price\)/),
};

const tarif = new Map(
  lignes.map((l) => [
    l[C.ref].trim(),
    {
      prix: Number(l[C.prix]),
      ean: /^\d{13}$/.test(l[C.ean] || '') ? l[C.ean] : undefined,
      fiche: /^https:\/\/media\.miele\.com\//.test(l[C.url] || '') ? l[C.url] : undefined,
      description: (l[C.description] || '').trim(),
    },
  ])
);

// data/miele.mjs importe le fichier généré : il doit exister pour être lu.
const sortie = new URL('../data/miele-tarif.mjs', import.meta.url);
if (!existsSync(sortie)) writeFileSync(sortie, 'export const tarifMiele = {};\n');
const { refsMiele } = await import('../data/miele.mjs');

const retenu = {};
const absents = [];
for (const r of [...new Set(refsMiele)].sort()) {
  const t = tarif.get(r);
  if (!t || !(t.prix > 0)) { absents.push(r); continue; }
  retenu[r] = t;
}

const entete = `// ---------------------------------------------------------------------------
// FICHIER GÉNÉRÉ — ne pas modifier à la main.
//   node outils/miele-tarif.mjs <1_Import_Produits_MIELE_….csv>
// Source : ${fichier.split('/').pop()} (tarif Miele Professional 07/2026,
// SmartBiz 01/2026), le ${new Date().toISOString().slice(0, 10)}.
// Prix = prix public conseillé Miele, HT. Aucun prix d'achat ici.
// ---------------------------------------------------------------------------
`;
writeFileSync(sortie, `${entete}export const tarifMiele = ${JSON.stringify(retenu, null, 2)};\n`);
console.log(`${Object.keys(retenu).length} références écrites dans data/miele-tarif.mjs`);
if (absents.length) {
  console.error(`⚠️  ${absents.length} référence(s) absente(s) du tarif : ${absents.join(', ')}`);
  console.error('   Modèle arrêté ou référence mal saisie : à corriger dans data/miele.mjs.');
  process.exit(2);
}
