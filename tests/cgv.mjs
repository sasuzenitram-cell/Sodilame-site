// ---------------------------------------------------------------------------
// Conditions générales de vente publiées sur /cgv
//
// Cette page n'est pas une page de contenu comme une autre : son adresse est
// imprimée au bas de chaque devis, bon de commande, bon de livraison et facture
// (bloc COMMUN-2 du cahier des charges GDSOFT du 25/09/2026). Si elle disparaît
// ou change d'URL, tous les documents commerciaux renvoient dans le vide, et
// des CGV qu'on ne peut pas consulter s'opposent mal à un client qui les
// conteste. D'où ces vérifications.
// ---------------------------------------------------------------------------
import { readFileSync, existsSync } from 'node:fs';
import { cgv } from '../data/cgv.mjs';

let ok = 0;
let ko = 0;
const verifier = (nom, cond, detail = '') => {
  if (cond) { ok++; console.log(`  ✓ ${nom}`); }
  else { ko++; console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`); }
};

console.log('\n═══ Page /cgv ═══');

verifier('la page existe à l’adresse imprimée sur les documents', existsSync('public/cgv/index.html'));
const html = existsSync('public/cgv/index.html') ? readFileSync('public/cgv/index.html', 'utf8') : '';

verifier(`les ${cgv.articles.length} articles sont publiés`,
  (html.match(/<h2 id="a\d+"/g) || []).length === cgv.articles.length,
  `${(html.match(/<h2 id="a\d+"/g) || []).length} trouvés`);

const ancresManquantes = cgv.articles.filter((a) => !html.includes(`href="#${a.id}"`));
verifier('chaque article est atteignable depuis le sommaire', !ancresManquantes.length,
  ancresManquantes.map((a) => a.id).join(', '));

// Décision du 25/09/2026 : le barème d'intervention reste sur la plaquette
// papier. L'article 11.1 ne doit plus annoncer qu'il est sur le site, sinon les
// CGV promettent un document introuvable — et la phrase se retourne contre
// SODILAME dans une discussion sur le prix.
verifier('les CGV n’annoncent pas le barème sur le site',
  !/barème[^.]*disponible sur www\.sodilame\.com/i.test(html) &&
  !/barème complet[^.]*sur www\.sodilame\.com/i.test(html));

// Le site public n'affiche aucune grille tarifaire d'intervention. Les montants
// cités dans les CGV sont ceux du contrat lui-même, pas un barème consultable.
verifier('le site ne publie pas la grille des cinq zones',
  !existsSync('public/bareme/index.html') && !existsSync('public/tarifs/index.html'));

// La version et la date doivent rester pilotées par data/cgv.mjs : le cahier
// des charges GDSOFT impose un point de mise à jour unique entre les documents
// commerciaux et la page publiée.
verifier(`la version ${cgv.version} est affichée`, html.includes(`Version ${cgv.version}`));
verifier(`la date d’entrée en vigueur est affichée`, html.includes(cgv.entreeEnVigueur));

// Tant que la date n'est pas atteinte, la page ne doit pas dire « en vigueur ».
const dejaEnVigueur = new Date().toISOString().slice(0, 10) >= cgv.entreeEnVigueurIso;
verifier(
  dejaEnVigueur ? 'la page annonce des CGV en vigueur' : 'la page n’annonce pas en vigueur un texte qui ne l’est pas encore',
  dejaEnVigueur ? html.includes('en vigueur depuis') : html.includes('applicable aux commandes passées à compter')
);

// Les clauses lourdes ne produisent effet que si elles ont été portées à la
// connaissance du Client. Leur présence sur la page publiée est le minimum.
for (const [nom, motif] of [
  ['réserve de propriété', /réserve de propriété/i],
  ['limitation de responsabilité', /responsabilité totale et cumulée/i],
  ['clause pénale', /clause pénale/i],
  ['boutique en ligne', /boutique en ligne/i],
  ['acheteurs publics', /acheteur public|acheteurs publics/i],
]) {
  verifier(`clause présente : ${nom}`, motif.test(html));
}

// Le pied de page de tout le site doit mener aux CGV : c'est le chemin qu'un
// client emprunte quand il cherche les conditions avant de commander.
const accueil = readFileSync('public/index.html', 'utf8');
verifier('le pied de page renvoie aux CGV depuis toutes les pages', accueil.includes('href="/cgv"'));

console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
