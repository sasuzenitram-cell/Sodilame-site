// ---------------------------------------------------------------------------
// AUDIT DU RENDU MOBILE
//
// Passe toutes les pages du sitemap en 360, 390 et 430 px de large et signale
// quatre défauts qui ne lèvent aucune erreur mais dégradent l'usage :
//   — débordement horizontal (toute la page se décale) ;
//   — texte sous 12 px ;
//   — zone tactile sous 40 px de haut ;
//   — contenu qui déborde de son conteneur sans pouvoir défiler.
//
// Ce banc n'est PAS dans `npm test` : il demande Playwright, qui n'est pas une
// dépendance du projet. Pour le lancer :
//
//   npm i -D playwright && npx playwright install chromium
//   node tests/serveur.mjs &
//   node tests/mobile.mjs
//
// Les seuils (40 px de cible, 12 px de texte) sont des repères, pas des règles
// absolues : les étiquettes décoratives — signature du logo, référence produit —
// descendent volontairement en dessous et ressortent donc dans le rapport.
// ---------------------------------------------------------------------------
import { readFileSync } from 'node:fs';

// Toutes les routes du site, depuis le sitemap.
const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const routes = [...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(m => m[1] || '/');
routes.push('/qr', '/qr/panne', '/qr/audit', '/produits/ma-commande');

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const LARGEURS = [[360, 740, 'petit'], [390, 844, 'courant'], [430, 932, 'grand']];
const problemes = [];

for (const [w, h, nom] of LARGEURS) {
  const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  for (const r of routes) {
    try {
      await p.goto('http://127.0.0.1:8899' + r, { waitUntil: 'domcontentloaded', timeout: 15000 });
    } catch { problemes.push({ r, w, type: 'page', detail: 'chargement impossible' }); continue; }

    const d = await p.evaluate((vw) => {
      const out = { debord: null, coupables: [], petits: [], cibles: [], deborde: [] };
      const de = document.documentElement;
      if (de.scrollWidth > vw + 1) {
        out.debord = de.scrollWidth;
        document.querySelectorAll('body *').forEach(el => {
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) return;
          if (b.right > vw + 1 && b.left >= -1 && out.coupables.length < 4) {
            out.coupables.push((el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ').filter(Boolean).slice(0,2).join('.')).slice(0, 46) + ` [${Math.round(b.left)}→${Math.round(b.right)}]`);
          }
        });
      }
      // Texte trop petit
      document.querySelectorAll('p,li,td,th,span,a,label,small').forEach(el => {
        if (!el.textContent.trim() || el.offsetParent === null) return;
        const t = parseFloat(getComputedStyle(el).fontSize);
        if (t < 12 && out.petits.length < 4) out.petits.push(`${el.tagName.toLowerCase()} ${t}px « ${el.textContent.trim().slice(0,26)} »`);
      });
      // Zones tactiles sous 40px
      document.querySelectorAll('a,button,input[type=submit],summary').forEach(el => {
        if (el.offsetParent === null) return;
        const b = el.getBoundingClientRect();
        if (b.height > 0 && b.height < 40 && getComputedStyle(el).display !== 'inline' && out.cibles.length < 4) {
          out.cibles.push(`${el.tagName.toLowerCase()} ${Math.round(b.width)}×${Math.round(b.height)} « ${el.textContent.trim().slice(0,22)} »`);
        }
      });
      // Contenu qui dépasse son conteneur (texte tronqué)
      document.querySelectorAll('table,pre,code').forEach(el => {
        const par = el.parentElement;
        if (el.scrollWidth > el.clientWidth + 2 && par && getComputedStyle(par).overflowX === 'visible' && out.deborde.length < 3) {
          out.deborde.push(el.tagName.toLowerCase() + ' ' + el.scrollWidth + '>' + el.clientWidth);
        }
      });
      return out;
    }, w);

    if (d.debord) problemes.push({ r, w, type: 'débordement', detail: `${d.debord}px — ${d.coupables.join(' | ')}` });
    if (d.petits.length) problemes.push({ r, w, type: 'texte <12px', detail: d.petits.join(' | ') });
    if (d.cibles.length) problemes.push({ r, w, type: 'cible <40px', detail: d.cibles.join(' | ') });
    if (d.deborde.length) problemes.push({ r, w, type: 'contenu tronqué', detail: d.deborde.join(' | ') });
  }
  await p.close();
  console.log(`${nom} (${w}px) : ${routes.length} pages passées`);
}
await b.close();

console.log('\n' + '═'.repeat(70));
if (!problemes.length) { console.log('Aucun problème détecté.'); process.exit(0); }
const parType = {};
problemes.forEach(x => { (parType[x.type] ||= []).push(x); });
for (const [t, l] of Object.entries(parType)) {
  console.log(`\n### ${t} — ${l.length} occurrence(s)`);
  const vues = new Set();
  l.forEach(x => {
    const cle = x.type + x.detail;
    if (vues.has(cle)) return;
    vues.add(cle);
    console.log(`  ${String(x.w).padStart(3)}px ${x.r.padEnd(46)} ${x.detail}`);
  });
}
