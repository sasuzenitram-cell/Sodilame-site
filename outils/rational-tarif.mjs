// ---------------------------------------------------------------------------
// Génère data/rational-tarif.mjs à partir des exports Dolibarr du tarif
// RATIONAL (création + mise à jour : le tarif est réparti entre les deux).
//
//   node outils/rational-tarif.mjs 1_Import_Produits_RATIONAL_….csv 2_Import_Produits_RATIONAL_….csv
//
// Ne retient QUE les références utilisées par data/rational.mjs, et pour
// chacune : prix public HT RATIONAL France (tarif 10/2026) et libellé du tarif.
//
// ⚠️  CONFIDENTIEL : ces CSV contiennent aussi le PRIX DE REVIENT SODILAME
//     (colonne p.cost_price) et la note privée, qui rappelle la remise
//     revendeur. Ces deux colonnes ne sont JAMAIS lues ici. Les CSV eux-mêmes
//     ne doivent pas être ajoutés au dépôt.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const fichiers = process.argv.slice(2);
if (!fichiers.length) {
  console.error('Usage : node outils/rational-tarif.mjs <1_Import_Produits_RATIONAL_….csv> [2_….csv]');
  process.exit(1);
}

// Lecteur CSV : séparateur « ; », valeurs entre guillemets, retours à la ligne
// autorisés DANS les guillemets (les descriptifs RATIONAL en contiennent).
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

const tarif = new Map();
for (const fichier of fichiers) {
  const [entetes, ...lignes] = lireCsv(readFileSync(fichier, 'utf8').replace(/^﻿/, ''));
  const col = (motif) => {
    const i = entetes.findIndex((h) => motif.test(h));
    if (i < 0) throw new Error(`${fichier} : colonne introuvable ${motif}`);
    return i;
  };
  // Uniquement les colonnes publiables. p.cost_price et p.note ne sont pas lues.
  const C = { ref: col(/\(p\.ref\)/), libelle: col(/\(p\.label\)/), prix: col(/\(p\.price\)/) };
  for (const l of lignes) {
    tarif.set(l[C.ref].trim(), {
      prix: Number(l[C.prix]),
      libelle: (l[C.libelle] || '').replace(/\s+DE MARQUE RATIONAL\s*$/i, '').trim(),
    });
  }
}

// data/rational.mjs importe le fichier généré : il doit exister pour être lu.
const sortie = new URL('../data/rational-tarif.mjs', import.meta.url);
if (!existsSync(sortie)) writeFileSync(sortie, 'export const tarifRational = {};\n');
const { refsRational } = await import('../data/rational.mjs');

const retenu = {};
const absents = [];
for (const r of [...new Set(refsRational)].sort()) {
  const t = tarif.get(r);
  if (!t || !(t.prix > 0)) { absents.push(r); continue; }
  retenu[r] = t;
}

const entete = `// ---------------------------------------------------------------------------
// FICHIER GÉNÉRÉ — ne pas modifier à la main.
//   node outils/rational-tarif.mjs <1_Import_Produits_RATIONAL_….csv> <2_….csv>
// Source : ${fichiers.map((f) => f.split('/').pop()).join(' + ')}
// (tarif matériel RATIONAL France 10/2026), le ${new Date().toISOString().slice(0, 10)}.
// Prix = prix public RATIONAL, HT. Aucun prix d'achat ici.
// ---------------------------------------------------------------------------
`;
writeFileSync(sortie, `${entete}export const tarifRational = ${JSON.stringify(retenu, null, 2)};\n`);
console.log(`${Object.keys(retenu).length} références écrites dans data/rational-tarif.mjs`);
if (absents.length) {
  console.error(`⚠️  ${absents.length} référence(s) absente(s) du tarif : ${absents.join(', ')}`);
  console.error('   Modèle arrêté ou référence mal saisie : à corriger dans data/rational.mjs.');
  process.exit(2);
}
