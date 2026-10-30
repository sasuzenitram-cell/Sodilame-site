// ---------------------------------------------------------------------------
// Intègre les visuels Miele relevés sur miele-professional.fr.
//
//   node outils/miele-visuels.mjs chemin/vers/miele-visuels.json
//
// Le JSON est produit dans le navigateur, sur le site Miele Professional : pour
// chaque fiche, l'image principale du produit (recadrée en 800 x 800 sur fond
// blanc, JPEG) et les adresses du modèle 3D (GLB, et USDZ pour l'iPhone).
//
// Ce script écrit :
//   — static/assets/produits/miele/<slug>.jpg
//   — data/miele-visuels.mjs : photo, modèle 3D et page source, par fiche.
//
// ⚠️  DROITS : reprise des visuels Miele décidée par la direction le
//     30/10/2026, sous sa responsabilité. À remplacer par les fichiers du kit
//     revendeur officiel dès leur réception.
// ---------------------------------------------------------------------------
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const fichier = process.argv[2];
if (!fichier) {
  console.error('Usage : node outils/miele-visuels.mjs <miele-visuels.json>');
  process.exit(1);
}
const brut = JSON.parse(readFileSync(fichier, 'utf8'));
const dossier = new URL('../static/assets/produits/miele/', import.meta.url);
mkdirSync(dossier, { recursive: true });

const seulementMiele = (u) => (typeof u === 'string' && /^https:\/\/media\.miele(-professional)?\.com\/[\w./-]+$/.test(u) ? u : null);

const visuels = {};
let photos = 0;
let vues = 0;
for (const [slug, v] of Object.entries(brut)) {
  if (!/^miele-[a-z0-9-]+$/.test(slug)) continue;
  const e = {};
  if (v.jpg) {
    const octets = Buffer.from(v.jpg, 'base64');
    // Signature JPEG : on n'écrit rien d'autre qu'une image.
    if (octets[0] === 0xff && octets[1] === 0xd8) {
      writeFileSync(new URL(`${slug}.jpg`, dossier), octets);
      e.photo = `miele/${slug}`;
      photos++;
    }
  }
  if (seulementMiele(v.glb)) {
    e.glb = v.glb;
    if (seulementMiele(v.usdz)) e.usdz = v.usdz;
    vues++;
  }
  if (typeof v.page === 'string' && v.page.startsWith('https://www.miele-professional.fr/')) e.source = v.page;
  if (Object.keys(e).length) visuels[slug] = e;
}

writeFileSync(
  new URL('../data/miele-visuels.mjs', import.meta.url),
  `// FICHIER GÉNÉRÉ par outils/miele-visuels.mjs — ne pas modifier à la main.
// Visuels repris de miele-professional.fr le ${new Date().toISOString().slice(0, 10)}, sur décision de la
// direction (30/10/2026). Photos : static/assets/produits/miele/. Les modèles
// 3D sont lus directement chez Miele (media.miele.com), au clic.
export const visuelsMiele = ${JSON.stringify(visuels, null, 2)};
`
);
console.log(`${photos} photos, ${vues} vues 3D, ${Object.keys(visuels).length} fiches`);
