// ---------------------------------------------------------------------------
// Génère data/gamko-tarif.mjs à partir de l'export Dolibarr du tarif GAMKO
// 2026 (un seul fichier « création »).
//
//   node outils/gamko-tarif.mjs 1_Import_Produits_GAMKO_2026_creation.csv
//
// Ne retient QUE les références utilisées par data/gamko.mjs, et pour
// chacune : prix public HT GAMKO 2026 et ce qui suit.
//
// ⚠️  CONFIDENTIEL : ces CSV contiennent aussi le PRIX DE REVIENT SODILAME
//     (colonne p.cost_price), jamais lue ici. La note privée (p.note) rappelle
//     la remise : elle n'est lue QUE par une expression qui en extrait le
//     montant de l'éco-participation (« Éco-participation : N € HT »), et
//     rien d'autre. Les CSV eux-mêmes ne doivent pas être ajoutés au dépôt.
//
// Pour chaque référence : prix public HT GAMKO 2026, libellé, éco-participation.
// Le tarif GAMKO ne contient ni EAN ni lien de fiche.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const fichiers = process.argv.slice(2);
if (!fichiers.length) {
  console.error('Usage : node outils/gamko-tarif.mjs <1_Import_Produits_GAMKO_2026_creation.csv>');
  process.exit(1);
}

// Lecteur CSV : séparateur « ; », valeurs entre guillemets, retours à la ligne
// autorisés DANS les guillemets (les descriptifs GAMKO en contiennent).
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
  // Uniquement les colonnes publiables. p.cost_price n'est pas lue ; p.note
  // ne sert qu'à l'éco-participation (voir plus haut).
  const C = {
    ref: col(/\(p\.ref\)/),
    libelle: col(/\(p\.label\)/),
    prix: col(/\(p\.price\)/),
    note: col(/\(p\.note\)/),
  };
  for (const l of lignes) {
    const eco = (l[C.note] || '').match(/Éco-participation : (\d+(?:[.,]\d+)?) € HT/);
    tarif.set(l[C.ref].trim(), {
      prix: Number(l[C.prix]),
      libelle: (l[C.libelle] || '').replace(/\s+DE MARQUE GAMKO\s*$/i, '').trim(),
      ...(eco ? { eco: Number(eco[1].replace(',', '.')) } : {}),
    });
  }
}

// data/gamko.mjs importe le fichier généré : il doit exister pour être lu.
const sortie = new URL('../data/gamko-tarif.mjs', import.meta.url);
if (!existsSync(sortie)) writeFileSync(sortie, 'export const tarifGamko = {};\n');
const { refsGamko } = await import('../data/gamko.mjs');

const retenu = {};
const absents = [];
for (const r of [...new Set(refsGamko)].sort()) {
  const t = tarif.get(r);
  if (!t || !(t.prix > 0)) { absents.push(r); continue; }
  retenu[r] = t;
}

const entete = `// ---------------------------------------------------------------------------
// FICHIER GÉNÉRÉ — ne pas modifier à la main.
//   node outils/gamko-tarif.mjs <1_Import_Produits_GAMKO_2026_creation.csv>
// Source : ${fichiers.map((f) => f.split('/').pop()).join(' + ')}
// (tarif GAMKO 2026 V1), le ${new Date().toISOString().slice(0, 10)}.
// Prix = prix public GAMKO, HT ; eco = éco-participation, HT, facturée
// en plus. Aucun prix d'achat ici.
// ---------------------------------------------------------------------------
`;
writeFileSync(sortie, `${entete}export const tarifGamko = ${JSON.stringify(retenu, null, 2)};\n`);
console.log(`${Object.keys(retenu).length} références écrites dans data/gamko-tarif.mjs`);
if (absents.length) {
  console.error(`⚠️  ${absents.length} référence(s) absente(s) du tarif : ${absents.join(', ')}`);
  console.error('   Modèle arrêté ou référence mal saisie : à corriger dans data/gamko.mjs.');
  process.exit(2);
}
