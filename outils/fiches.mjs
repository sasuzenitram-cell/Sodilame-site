// ---------------------------------------------------------------------------
// GÉNÉRATION DES FICHES TECHNIQUES SODILAME EN PDF
//
//   node outils/fiches.mjs            → toutes les références documentées
//   node outils/fiches.mjs F300 F30   → seulement celles-là
//
// ⚠️  CE SCRIPT NE FAIT PAS PARTIE DU BUILD et n'est pas lancé par Vercel.
//     Il a besoin de Playwright, qui n'est pas une dépendance du dépôt :
//
//       npm install --no-save playwright
//
//     Les PDF produits sont versionnés dans static/assets/fiches/ et servis
//     comme des fichiers statiques. On ne les régénère qu'en modifiant le
//     gabarit ou les données `technique` d'un produit — et on relance alors
//     `npm test`, qui vérifie que chaque référence documentée a bien sa fiche.
//
// Pourquoi Chromium et pas une bibliothèque PDF : la charte du site existe
// déjà en CSS, et un gabarit HTML se relit, se corrige et se compare à l'écran.
// Reconstruire la même mise en page en coordonnées absolues aurait coûté dix
// fois plus pour un résultat plus fragile.
//
// ⚠️  Ne jamais étendre ce script à la fiche de données de sécurité : voir
//     l'en-tête de src/fiche-technique.mjs.
// ---------------------------------------------------------------------------
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { produits, ficheSodilame } from '../data/produits.mjs';
import { ficheTechnique } from '../src/fiche-technique.mjs';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SORTIE = path.join(racine, 'static/assets/fiches');

/**
 * Plancher d'échelle. En dessous, le corps de texte descendrait sous 7,5 pt :
 * une fiche qu'on ne lit plus n'est pas une fiche. Si une référence l'atteint,
 * c'est que ses données sont trop longues et qu'il faut raccourcir un texte,
 * pas rapetisser la page — le script le dit alors explicitement.
 */
const ECHELLE_MINIMALE = 0.84;

async function dataUri(fichier, mime) {
  const b = await readFile(fichier);
  return `data:${mime};base64,${b.toString('base64')}`;
}

async function chargerPolices() {
  const dossier = path.join(racine, 'outils/polices');
  const fichiers = {
    'inter-400': 'inter-latin-400-normal.woff2',
    'inter-500': 'inter-latin-500-normal.woff2',
    'inter-600': 'inter-latin-600-normal.woff2',
    'inter-700': 'inter-latin-700-normal.woff2',
    'montserrat-600': 'montserrat-latin-600-normal.woff2',
    'montserrat-700': 'montserrat-latin-700-normal.woff2',
    'montserrat-800': 'montserrat-latin-800-normal.woff2',
  };
  const out = {};
  for (const [cle, nom] of Object.entries(fichiers)) {
    const f = path.join(dossier, nom);
    if (!existsSync(f)) {
      // Mieux vaut s'arrêter que sortir 8 PDF à la mauvaise typographie : le
      // défaut ne se verrait qu'une fois les fiches envoyées à un client.
      throw new Error(`Police manquante : ${nom}. Voir outils/polices/LISEZ-MOI.md`);
    }
    out[cle] = await dataUri(f, 'font/woff2');
  }
  return out;
}

async function main() {
  const demandees = process.argv.slice(2).map((s) => s.toUpperCase());

  // Une fiche n'a de sens que si les données viennent de la fiche du fabricant.
  // Sans objet `technique`, on n'aurait qu'un gabarit vide à en-tête SODILAME,
  // ce qui est pire que pas de fiche du tout.
  const cibles = produits.filter(
    (p) => p.technique && (demandees.length === 0 || demandees.includes(p.ref.toUpperCase()))
  );

  if (!cibles.length) {
    console.error(
      demandees.length
        ? `Aucune référence documentée parmi : ${demandees.join(', ')}`
        : 'Aucun produit ne porte de données techniques.'
    );
    process.exit(1);
  }

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.error('Playwright absent. Lancez :\n\n  npm install --no-save playwright\n');
    process.exit(1);
  }

  const polices = await chargerPolices();
  // Le pictogramme seul, pas le logo complet : celui-ci porte déjà le mot
  // SODILAME en bleu nuit, illisible sur le bandeau navy de la fiche. Le nom
  // est composé en typographie dans l'en-tête.
  const logo = await dataUri(path.join(racine, 'static/assets/mark@2x.png'), 'image/png');
  await mkdir(SORTIE, { recursive: true });

  // CHROMIUM_BIN permet de pointer un Chromium déjà installé sur la machine
  // quand celui de Playwright n'a pas été téléchargé (ex. CHROMIUM_BIN=/usr/bin/chromium).
  const navigateur = await chromium.launch(
    process.env.CHROMIUM_BIN ? { executablePath: process.env.CHROMIUM_BIN } : {}
  );
  const page = await navigateur.newPage();
  const resume = [];

  for (const p of cibles) {
    let photo = '';
    if (p.photo) {
      const f = path.join(racine, 'static/assets/produits', `${p.photo}.jpg`);
      if (existsSync(f)) photo = await dataUri(f, 'image/jpeg');
      else console.warn(`  ⚠  ${p.ref} : photo absente (${p.photo}.jpg)`);
    }

    // Une fiche tient sur UNE page. On mesure la hauteur naturelle du contenu
    // avant l'impression plutôt que de compter les pages après : Chromium,
    // incapable de couper une grille en deux, repousse alors tout le corps sur
    // la page 2 et laisse la première vide — un symptôme qui ne dit rien de
    // l'ampleur du problème.
    const SEUIL = 297.02; // 0,02 mm de tolérance pour l'arrondi sous-pixel

    const mesurer = async (echelle) => {
      await page.setContent(ficheTechnique(p, logo, photo, polices, echelle), { waitUntil: 'load' });
      // setContent n'attend pas les polices : sans ça, la première fiche de la
      // série sort parfois en police système, les suivantes étant déjà en cache.
      await page.evaluate(() => document.fonts.ready);
      return page.evaluate(() => {
        // `main` est en flex:1 pour coller le pied en bas de l'A4 ; on le
        // neutralise le temps de la mesure, sinon il absorbe le mou et toute
        // échelle, même trop petite, mesurerait pile 297 mm.
        const m = document.querySelector('main');
        const avant = m.style.flex;
        m.style.flex = '0 0 auto';
        // Le bas du pied de page, pas scrollHeight : celui-ci est arrondi au
        // pixel entier, et un dépassement de 0,15 mm — invisible à l'arrondi —
        // suffit à faire sortir une deuxième page.
        // Pas de correction d'échelle à appliquer : les rectangles renvoyés par
        // getBoundingClientRect tiennent déjà compte du zoom (la largeur du
        // corps reste 210 mm quelle que soit l'échelle).
        const bas = document.querySelector('footer').getBoundingClientRect().bottom;
        m.style.flex = avant;
        return (bas / 96) * 25.4;
      });
    };

    // On cherche la PLUS GRANDE échelle qui tienne, par dichotomie. Une simple
    // règle de trois ne suffit pas : la hauteur n'est pas linéaire en l'échelle
    // — à 89 % une ligne de texte se dégrafe et le bloc perd d'un coup trois
    // millimètres. L'estimation linéaire rapetissait donc bien trop, et la
    // fiche sortait avec un grand vide au-dessus du pied de page.
    let echelle = 1;
    let haut = await mesurer(1);
    if (haut > SEUIL) {
      let bas = ECHELLE_MINIMALE;
      let hautK = 1;
      echelle = ECHELLE_MINIMALE;
      haut = await mesurer(ECHELLE_MINIMALE);
      if (haut <= SEUIL) {
        for (let i = 0; i < 7; i++) {
          const milieu = (bas + hautK) / 2;
          const h = await mesurer(milieu);
          if (h <= SEUIL) {
            bas = milieu;
            echelle = milieu;
            haut = h;
          } else {
            hautK = milieu;
          }
        }
        // Dernier rendu à l'échelle retenue : la boucle a pu finir sur un essai
        // trop grand, et c'est ce rendu-là qui partirait à l'impression.
        haut = await mesurer(echelle);
      }
    }

    const cible = path.join(SORTIE, ficheSodilame(p));
    const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
    await writeFile(cible, pdf);

    resume.push({
      ref: p.ref,
      ko: Math.round(pdf.length / 1024),
      echelle,
      trop: haut > SEUIL ? Math.round(haut - 297) : 0,
      photo: !!photo,
    });
  }

  await navigateur.close();

  console.log(`\n${resume.length} fiche(s) écrite(s) dans static/assets/fiches/\n`);
  for (const r of resume) {
    const ech = r.echelle < 1 ? `  échelle ${Math.round(r.echelle * 100)} %` : '';
    const alerte = r.trop ? `  ⚠ dépasse encore de ${r.trop} mm` : '';
    console.log(
      `  ${r.ref.padEnd(10)} ${String(r.ko).padStart(4)} Ko${r.photo ? '' : '  (sans photo)'}${ech}${alerte}`
    );
  }
  const debordent = resume.filter((r) => r.trop > 0);
  if (debordent.length) {
    console.log(
      `\n⚠  ${debordent.length} fiche(s) ne tiennent pas même à l'échelle minimale : ` +
        `${debordent.map((r) => `${r.ref} (+${r.trop} mm)`).join(', ')}\n` +
        `   Raccourcissez un texte dans data/produits.mjs plutôt que d'abaisser ECHELLE_MINIMALE.`
    );
  }
  console.log('');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
