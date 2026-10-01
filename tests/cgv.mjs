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

// Décisions des 25/09 et 29/09/2026 : le barème d'intervention reste sur la
// plaquette papier. Le PDF v2.3 annonce à TROIS endroits qu'il est « publié sur
// www.sodilame.com » — articles 11.1, 11.10.1 et 11.10.3. La page publiée ne
// doit reprendre aucun de ces renvois, sinon les CGV promettent un document
// introuvable, et la phrase se retourne contre SODILAME à la première
// discussion sur un prix. Le motif ci-dessous couvre les trois d'un coup.
{
  const renvois = (html.match(/barème[^.]{0,220}?sodilame\.com/gi) || [])
    .concat(html.match(/publié sur[^.]{0,80}sodilame\.com/gi) || []);
  verifier('les CGV n’annoncent le barème nulle part sur le site',
    !renvois.length, renvois.join(' | '));
}

// v2.3 : l'article 11.10 encadre la révision des tarifs d'intervention. C'est
// le seul apport de fond de cette version. S'il disparaissait, l'article 11.1
// renverrait à un article inexistant — et SODILAME perdrait le mécanisme qui
// rend ses hausses de tarif opposables.
verifier('l’article 11.10 (révision du barème) est publié',
  /11\.10\.\s*Révision du barème/i.test(html));

for (const [nom, motif] of [
  ['actualisation annuelle au 1er janvier', /actualisation annuelle prenant effet au 1er janvier/i],
  ['révision en cours d’année encadrée', /11\.10\.2\./],
  ['sans effet sur les devis acceptés', /sans effet sur les devis acceptés/i],
  ['motivation, article 1164 du code civil', /article 1164 du code civil/i],
  ['articulation avec les contrats d’entretien', /11\.10\.4\./],
  ['renvoi de l’article 11.1 vers 11.10', /conditions de révision de l['’]article 11\.10/i],
]) {
  verifier(`11.10 — ${nom}`, motif.test(html));
}

// v2.4 : le délai de paiement passe à trente jours date de facture, plus court
// que le plafond légal. C'est une clause de trésorerie, pas une clause de
// style : si elle disparaissait d'une future version, SODILAME retomberait de
// plein droit sur les soixante jours de l'article L. 441-10 — un mois de
// décalage sur l'encaissement, sans que rien ne le signale.
verifier('le délai de paiement est bien de trente jours',
  /ne peut en aucun cas excéder <b>trente \(30\) jours/i.test(html));
verifier('le Client ne peut pas invoquer un délai plus long',
  /Aucun délai supérieur à trente \(30\) jours ne peut être invoqué/i.test(html));
// L'article 6.1 annonçait déjà trente jours pour les comptes ouverts. Les deux
// articles doivent rester d'accord : c'est leur contradiction, dans la v2.3,
// qui a motivé la v2.4.
verifier('l’article 6.1 et l’article 6.2 annoncent le même délai',
  /trente \(30\) jours date de facture pour les Clients titulaires d'un compte ouvert/i.test(html));

// Contrepartie de la divergence assumée : la publication ayant été retirée,
// c'est l'écrit adressé au Client qui rend la révision opposable. La page doit
// donc le dire, sans quoi la clause n'a plus aucun mode d'information.
verifier('la révision n’est opposable qu’après un écrit au Client',
  /portée à la connaissance du Client[^.]{0,60}par tout moyen écrit/i.test(html));

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
