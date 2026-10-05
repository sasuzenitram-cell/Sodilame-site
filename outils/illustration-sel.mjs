// ---------------------------------------------------------------------------
// ILLUSTRATION DU SAC DE SEL EN PASTILLES — dessin original SODILAME
//
//   node outils/illustration-sel.mjs
//   → static/assets/produits/sel-pastilles-adoucisseur-25kg.jpg
//
// ⚠️  CE SCRIPT NE FAIT PAS PARTIE DU BUILD. Comme outils/fiches.mjs, il a
//     besoin de Playwright, qui n'est pas une dépendance du dépôt :
//
//       npm install --no-save playwright
//
//     L'image produite est versionnée dans static/assets/produits/ et servie
//     comme un fichier statique. On ne la régénère qu'en modifiant ce dessin.
//
// POURQUOI UN DESSIN ET PAS UNE PHOTO
// Nous n'avons pas de photo du produit, et les visuels des fabricants et des
// distributeurs ne nous appartiennent pas — c'est la règle du catalogue, écrite
// dans static/assets/produits/LISEZ-MOI.txt. Un dessin à la charte règle la
// question des droits, et il a un second mérite : il ne se fait pas passer pour
// la photo d'un sac précis, alors que la marque livrée peut changer d'un
// approvisionnement à l'autre.
//
// ⚠️  À REMPLACER dès qu'une vraie photo du stock existe : déposer le fichier
//     au même nom suffit, rien d'autre à changer. Une photo de la palette prise
//     au téléphone dans l'atelier vaudra toujours mieux que ce dessin — elle
//     montre ce que le client recevra vraiment, et aucun concurrent ne l'a.
//
// Le rendu est volontairement plat et géométrique : pas de faux relief, pas
// d'ombre réaliste. On assume l'illustration plutôt que d'imiter une photo.
// ---------------------------------------------------------------------------
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SORTIE = path.join(racine, 'static/assets/produits/sel-pastilles-adoucisseur-25kg.jpg');
const T = 800;

// Palette identique à :root dans static/assets/style.css.
const C = {
  navy: '#183253',
  teal: '#408274',
  gold: '#DFA64F',
  cream: '#FAF6EF',
  creamD: '#F2EBDF',
  line: '#E4DACA',
  bleuClair: '#CBD6E4',
  blanc: '#FFFFFF',
};

async function police(fichier) {
  const b = await readFile(path.join(racine, 'outils/polices', fichier));
  return b.toString('base64');
}

const dessin = `
<svg width="${T}" height="${T}" viewBox="0 0 ${T} ${T}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${T}" height="${T}" fill="${C.cream}"/>

  <!-- ombre au sol : une ellipse plate, pas un dégradé -->
  <ellipse cx="400" cy="652" rx="208" ry="21" fill="${C.line}"/>

  <!-- corps du sac, légèrement bombé comme un sac posé debout -->
  <path d="M252 212 C 238 300, 234 420, 242 558
           C 244 600, 264 630, 302 634 L 498 634
           C 536 630, 556 600, 558 558
           C 566 420, 562 300, 548 212 Z"
        fill="${C.blanc}" stroke="${C.navy}" stroke-width="7" stroke-linejoin="round"/>

  <!-- plis latéraux : deux traits suffisent à donner le volume -->
  <path d="M320 222 C 312 330, 310 462, 316 626" fill="none" stroke="${C.line}" stroke-width="6"/>
  <path d="M484 222 C 492 330, 494 462, 488 626" fill="none" stroke="${C.line}" stroke-width="6"/>

  <!-- haut replié et thermosoudé -->
  <path d="M252 212 L 252 174 C 252 162, 262 154, 274 154 L 526 154
           C 538 154, 548 162, 548 174 L 548 212 Z"
        fill="${C.creamD}" stroke="${C.navy}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M280 184 L 520 184" stroke="${C.navy}" stroke-width="5"
        stroke-dasharray="13 12" stroke-linecap="round" opacity=".5"/>

  <!-- bandeau d'étiquette -->
  <rect x="252" y="296" width="296" height="134" fill="${C.navy}"/>
  <rect x="252" y="296" width="296" height="9" fill="${C.gold}"/>
  <text x="400" y="349" text-anchor="middle" class="t1">SEL</text>
  <text x="400" y="384" text-anchor="middle" class="t2">EN PASTILLES</text>
  <text x="400" y="413" text-anchor="middle" class="t3">ADOUCISSEUR D'EAU</text>

  <!-- pastille de poids -->
  <circle cx="400" cy="508" r="53" fill="${C.teal}"/>
  <text x="400" y="513" text-anchor="middle" class="t4">25</text>
  <text x="400" y="540" text-anchor="middle" class="t5">kg</text>

  <!-- quelques pastilles au sol : c'est ce qui distingue « pastilles »
       de « granulés » au premier coup d'œil dans la grille du catalogue -->
  <g stroke="${C.navy}" stroke-width="5">
    <ellipse cx="198" cy="634" rx="43" ry="20" fill="${C.blanc}"/>
    <ellipse cx="198" cy="624" rx="43" ry="20" fill="${C.creamD}"/>
    <ellipse cx="614" cy="640" rx="38" ry="18" fill="${C.blanc}"/>
    <ellipse cx="614" cy="631" rx="38" ry="18" fill="${C.creamD}"/>
    <ellipse cx="652" cy="608" rx="29" ry="14" fill="${C.creamD}"/>
  </g>
</svg>`;

const gabarit = (m700, m800, inter500) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${m700}) format('woff2');font-weight:700}
@font-face{font-family:Montserrat;src:url(data:font/woff2;base64,${m800}) format('woff2');font-weight:800}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${inter500}) format('woff2');font-weight:500}
html,body{margin:0;padding:0;background:${C.cream}}
svg{display:block}
.t1{font-family:Montserrat;font-weight:800;font-size:38px;fill:${C.blanc};letter-spacing:3px}
.t2{font-family:Montserrat;font-weight:700;font-size:23px;fill:${C.gold};letter-spacing:3.4px}
.t3{font-family:Inter;font-weight:500;font-size:16px;fill:${C.bleuClair};letter-spacing:1.6px}
.t4{font-family:Montserrat;font-weight:800;font-size:40px;fill:${C.blanc}}
.t5{font-family:Montserrat;font-weight:700;font-size:19px;fill:${C.blanc}}
</style></head><body>${dessin}</body></html>`;

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright absent. Lancez :\n\n  npm install --no-save playwright\n');
  process.exit(1);
}

const html = gabarit(
  await police('montserrat-latin-700-normal.woff2'),
  await police('montserrat-latin-800-normal.woff2'),
  await police('inter-latin-500-normal.woff2')
);

const navigateur = await chromium.launch(
  process.env.CHROMIUM_BIN ? { executablePath: process.env.CHROMIUM_BIN } : {}
);
const page = await navigateur.newPage({ viewport: { width: T, height: T }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

const png = await page.screenshot({ type: 'png' });
await navigateur.close();

// Playwright ne sort pas de JPEG en deviceScaleFactor 2 sans perte de netteté :
// on capture en PNG ×2 puis on redescend à 800 px en JPEG avec ImageMagick, qui
// rééchantillonne mieux.
const tmp = path.join(racine, '.illustration-sel.png');
await writeFile(tmp, png);
const { execFileSync } = await import('node:child_process');
execFileSync('convert', [tmp, '-resize', `${T}x${T}`, '-quality', '88', '-strip', SORTIE]);
await (await import('node:fs/promises')).unlink(tmp);

console.log(`✅ ${path.relative(racine, SORTIE)}`);
