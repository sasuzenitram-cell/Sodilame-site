// ---------------------------------------------------------------------------
// Pages marques.
//
// Dix-neuf pages qui parlent du même métier sont un piège : si elles se
// ressemblent, Google les traite en pages satellites et les déclasse toutes,
// y compris celles qui méritaient d'exister. Les tests ci-dessous mesurent
// donc deux choses que l'œil ne voit pas :
//
//   — que chaque page porte au moins deux faits techniques PROPRES à sa marque
//     (champ `aRetenir`, relevé dans la documentation constructeur) ;
//   — que deux pages ne partagent pas le même texte d'accroche, de résumé ou
//     de faits techniques.
//
// S'y ajoute ce qui engage juridiquement : « distributeur agréé » ne doit
// s'afficher que là où `agree` est vrai, et Gaggenau — électroménager
// domestique dont la garantie exclut l'usage commercial — ne doit jamais
// apparaître comme du matériel de production.
// ---------------------------------------------------------------------------
import { readFileSync, existsSync } from 'node:fs';
import { marques, universMarques, marquesDeLUnivers, totalMarques, marquesPied } from '../data/marques.mjs';
import { services } from '../data/services.mjs';
import { categoriesProduits } from '../data/produits.mjs';
import { navPrincipale } from '../data/site.mjs';

let ok = 0;
let ko = 0;
const verifier = (nom, cond, detail = '') => {
  if (cond) { ok++; console.log(`  ✓ ${nom}`); }
  else { ko++; console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`); }
};
const lire = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '');
const texte = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

console.log('\n═══ Hub /marques ═══');

const hub = lire('public/marques/index.html');
verifier('la page existe', !!hub);
verifier(`les ${totalMarques} marques y figurent`,
  marques.every((m) => hub.includes(`/marques/${m.slug}`)),
  marques.filter((m) => !hub.includes(`/marques/${m.slug}`)).map((m) => m.slug).join(', '));
verifier('chaque univers a au moins une marque',
  universMarques.every((u) => marquesDeLUnivers(u.slug).length > 0),
  universMarques.filter((u) => !marquesDeLUnivers(u.slug).length).map((u) => u.slug).join(', '));
verifier('le menu principal mène aux marques',
  navPrincipale.some((n) => n.url === '/marques') && hub.includes('href="/marques"'));
verifier('le pied de page met en avant quelques marques',
  marquesPied.length >= 3 && marquesPied.every((m) => lire('public/index.html').includes(`/marques/${m.slug}`)));

console.log('\n═══ Chaque page marque ═══');

for (const m of marques) {
  const html = lire(`public/marques/${m.slug}/index.html`);
  if (!html) { verifier(`${m.nom} — page générée`, false, `public/marques/${m.slug}/index.html`); continue; }

  const t = texte(html);
  const erreurs = [];

  if (!html.includes(`<h1>`)) erreurs.push('pas de h1');
  if (!t.includes(m.nom)) erreurs.push('le nom de la marque est absent du texte');
  if (m.aRetenir.length < 2) erreurs.push(`seulement ${m.aRetenir.length} fait technique`);
  for (const g of m.gammes) if (!t.includes(g)) erreurs.push(`gamme absente : ${g}`);
  if (!html.includes(m.site)) erreurs.push('lien vers le site du fabricant absent');
  if (!/rel="noopener nofollow"/.test(html)) erreurs.push('lien sortant sans nofollow');

  verifier(`${m.nom}`, !erreurs.length, erreurs.join(' | '));
}

console.log('\n═══ Chaque page dit quelque chose de différent ═══');

// Un même texte sur deux marques = contenu dupliqué, et la preuve qu'une des
// deux pages n'avait rien à dire.
for (const champ of ['accroche', 'resume']) {
  const vus = new Map();
  const doublons = [];
  for (const m of marques) {
    const v = m[champ];
    if (vus.has(v)) doublons.push(`${vus.get(v)} = ${m.slug}`);
    vus.set(v, m.slug);
  }
  verifier(`aucune « ${champ} » partagée entre deux marques`, !doublons.length, doublons.join(', '));
}

{
  const vus = new Map();
  const doublons = [];
  for (const m of marques) {
    for (const r of m.aRetenir) {
      const cle = r.replace(/<[^>]+>/g, '').slice(0, 80);
      if (vus.has(cle)) doublons.push(`${vus.get(cle)} = ${m.slug}`);
      vus.set(cle, m.slug);
    }
  }
  verifier('aucun fait technique recopié d’une marque à l’autre', !doublons.length, doublons.join(', '));
}

{
  // Mesure grossière mais efficace : la part de mots que deux pages ont en
  // commun. Au-delà de 90 %, les deux pages racontent la même chose.
  const corpus = marques.map((m) => ({
    slug: m.slug,
    mots: new Set(texte(lire(`public/marques/${m.slug}/index.html`)).toLowerCase().split(/[^a-zà-ÿ0-9]+/).filter((w) => w.length > 4)),
  }));
  let pire = { paire: '', taux: 0 };
  for (let i = 0; i < corpus.length; i++) {
    for (let j = i + 1; j < corpus.length; j++) {
      const a = corpus[i].mots, b = corpus[j].mots;
      const communs = [...a].filter((w) => b.has(w)).length;
      const taux = communs / Math.min(a.size, b.size);
      if (taux > pire.taux) pire = { paire: `${corpus[i].slug} / ${corpus[j].slug}`, taux };
    }
  }
  verifier('deux pages ne se recouvrent jamais à plus de 90 %',
    pire.taux < 0.9, `${pire.paire} : ${(pire.taux * 100).toFixed(1)} %`);
}

console.log('\n═══ Ce qui engage SODILAME ═══');

// « Distributeur agréé » est une affirmation vérifiable : elle ne doit
// apparaître que là où le champ le dit.
{
  const fautes = marques.filter((m) => {
    const html = lire(`public/marques/${m.slug}/index.html`);
    return !m.agree && /[Dd]istributeur agréé/.test(html);
  });
  verifier('« distributeur agréé » n’apparaît que sur les marques déclarées agréées',
    !fautes.length, fautes.map((m) => m.slug).join(', '));
}

// Gaggenau : électroménager domestique, garantie excluant l'usage commercial.
{
  const g = marques.find((m) => m.slug === 'gaggenau');
  const html = lire('public/marques/gaggenau/index.html');
  verifier('Gaggenau est classée hors matériel professionnel', g && g.univers === 'residentiel');
  verifier('sa page dit que la garantie exclut l’usage commercial',
    /garantie constructeur exclut l['’]usage commercial/i.test(html));
  verifier('elle ne promet ni vente ni dépannage de production',
    !/vendons, installons et dépannons/.test(html));
  verifier('aucune autre page marque ne cite Gaggenau comme matériel de production',
    !marques.filter((m) => m.slug !== 'gaggenau')
      .some((m) => /Gaggenau/.test(lire(`public/marques/${m.slug}/index.html`))));
}

// Les liens internes doivent pointer vers des pages qui existent.
{
  const casses = [];
  for (const m of marques) {
    for (const s of m.services || []) {
      if (!services.find((x) => x.slug === s)) casses.push(`${m.slug} → service ${s}`);
    }
    if (m.boutique && !categoriesProduits.find((c) => c.slug === m.boutique)) {
      casses.push(`${m.slug} → famille ${m.boutique}`);
    }
  }
  verifier('tous les liens vers services et familles produits existent', !casses.length, casses.join(', '));
}

// La zone commerciale est la même partout : si elle change, elle change dans
// un seul endroit du code, et ce test le vérifie.
{
  const manquants = marques.filter((m) => {
    const t = texte(lire(`public/marques/${m.slug}/index.html`));
    return !(t.includes('Bouches-du-Rhône') && t.includes('Gard') && t.includes('Vaucluse'));
  });
  verifier('chaque page annonce les trois départements', !manquants.length,
    manquants.map((m) => m.slug).join(', '));
}

// Aucun logo de marque : le droit de citer un nom n'emporte pas celui de
// reproduire une marque figurative.
{
  const avecLogo = marques.filter((m) => {
    const html = lire(`public/marques/${m.slug}/index.html`);
    return new RegExp(`<img[^>]+${m.slug}`, 'i').test(html) || /logos?\//.test(html);
  });
  verifier('aucune page n’affiche de logo de fabricant', !avecLogo.length, avecLogo.map((m) => m.slug).join(', '));
}

// L'ajout de « Marques » a porté le menu principal à cinq entrées, et
// l'en-tête complet ne tient plus en dessous de 1180 px : à 1024 px — un iPad
// en paysage, beaucoup de portables — le bouton « Boutique en ligne » sortait
// de l'écran. Les règles d'en-tête ont donc été sorties du bloc 1000 px. Si
// quelqu'un les y remet, ce test le dit avant la mise en ligne.
{
  const css = lire('public/assets/style.css');
  const bloc = css.match(/@media\(max-width:(\d+)px\)\{[^}]*?nav\.main\{position:fixed/s);
  const seuil = bloc ? Number(bloc[1]) : 0;
  verifier('le menu bascule en déroulant avant que l’en-tête ne déborde (≥ 1180 px)',
    seuil >= 1180, `seuil actuel : ${seuil || 'introuvable'} px pour ${navPrincipale.length} entrées`);
}

console.log('\n═══ Référencement ═══');

const sitemap = lire('public/sitemap.xml');
verifier('le hub est dans le sitemap', sitemap.includes('/marques<') || sitemap.includes('/marques</loc>'));
{
  const absents = marques.filter((m) => !sitemap.includes(`/marques/${m.slug}<`));
  verifier('chaque marque est dans le sitemap', !absents.length, absents.map((m) => m.slug).join(', '));
}
{
  const sansSchema = marques.filter((m) => {
    const html = lire(`public/marques/${m.slug}/index.html`);
    const blocs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((x) => JSON.parse(x[1]));
    const s = blocs.find((b) => b['@type'] === 'Service');
    return !s || s.brand?.name !== m.nom || s.provider?.name !== 'SODILAME';
  });
  verifier('le balisage décrit un service de SODILAME sur la marque, pas la marque elle-même',
    !sansSchema.length, sansSchema.map((m) => m.slug).join(', '));
}
{
  const titresVus = new Set();
  const doublons = [];
  for (const m of marques) {
    const html = lire(`public/marques/${m.slug}/index.html`);
    const t = (html.match(/<title>(.*?)<\/title>/) || [])[1] || '';
    if (titresVus.has(t)) doublons.push(m.slug);
    titresVus.add(t);
  }
  verifier('chaque page a un titre unique', !doublons.length, doublons.join(', '));
}

console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
