// ---------------------------------------------------------------------------
// FICHE TECHNIQUE SODILAME — un A4 par référence
//
// Ce gabarit produit une fiche à la charte SODILAME, à partir des DONNÉES DU
// FABRICANT relevées sur sa propre fiche technique. Elle ne remplace pas le
// document Winterhalter : les deux sont proposés côte à côte sur la page
// produit, celui-ci pour être lu, l'original pour faire foi.
//
// ⚠️  CE GABARIT NE S'APPLIQUE QU'AUX FICHES TECHNIQUES.
//     La fiche de données de sécurité reste le PDF original du fabricant, sans
//     retouche. Deux raisons : c'est lui qui engage sa responsabilité sur le
//     contenu, et une erreur de recopie dans une mention H ou P se paierait
//     sur la santé de quelqu'un. On ne remet pas en page un document de
//     sécurité pour des raisons esthétiques.
//
// La fiche tient sur UNE page. C'est une contrainte, pas un hasard : elle est
// imprimée et punaisée près de la machine, ou glissée dans le classeur du plan
// de maîtrise sanitaire. Une deuxième page ne serait jamais lue. D'où la mise
// en page en deux colonnes : la colonne étroite absorbe la photo, les
// conditionnements et les mentions de danger pendant que la large porte le
// texte et le dosage. `outils/fiches.mjs` compte les pages et alerte si le
// gabarit déborde.
//
// Rendu en PDF par `outils/fiches.mjs`, hors build : voir l'en-tête du script.
// ---------------------------------------------------------------------------
import { site } from '../data/site.mjs';
import { categorieDuProduit } from '../data/produits.mjs';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Déclarations @font-face à partir des .woff2 encodés en base64.
 * Voir outils/polices/LISEZ-MOI.md : on n'appelle pas Google Fonts, sinon une
 * génération sans réseau sortirait une fiche à la mauvaise typographie sans
 * rien signaler — défaut invisible à l'écran, visible à l'impression.
 */
export function cssPolices(polices = {}) {
  const face = (famille, poids, uri) =>
    uri
      ? `@font-face{font-family:"${famille}";font-style:normal;font-weight:${poids};font-display:block;src:url(${uri}) format("woff2")}`
      : '';
  return [
    face('Inter', 400, polices['inter-400']),
    face('Inter', 500, polices['inter-500']),
    face('Inter', 600, polices['inter-600']),
    face('Inter', 700, polices['inter-700']),
    face('Montserrat', 600, polices['montserrat-600']),
    face('Montserrat', 700, polices['montserrat-700']),
    face('Montserrat', 800, polices['montserrat-800']),
  ]
    .filter(Boolean)
    .join('\n');
}

const CSS = `
@page { size: A4; margin: 0; }
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --navy:#183253; --navy-d:#0F2138; --gold:#DFA64F; --terra:#C5642F;
  --vert:#1B4A3E; --cream:#FAF6EF; --cream-d:#F2EBDF;
  --ink:#1B2430; --muted:#5A6675; --line:#E4DACA;
}
/* --k : facteur d'échelle du document entier. Il vaut 1 pour presque toutes les
   références. Les fiches constructeur les plus bavardes — celles qui cumulent
   sept caractéristiques, quatre lignes de dosage et cinq mentions de danger —
   dépassent de quelques millimètres ; plutôt que de couper du contenu ou de
   livrer deux pages, outils/fiches.mjs mesure le dépassement et réduit
   l'échelle juste assez pour que tout tienne. La largeur et la hauteur sont
   divisées par --k avant d'être multipliées par le zoom : la feuille imprimée
   reste exactement au format A4.

   min-height et pas height : si malgré tout le gabarit débordait, on veut une
   deuxième page visible plutôt qu'un A4 silencieusement tronqué. */
body{--k:1;zoom:var(--k);width:calc(210mm / var(--k));min-height:calc(297mm / var(--k));
  font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:9pt;line-height:1.48;color:var(--ink);background:#fff;
  display:flex;flex-direction:column;-webkit-print-color-adjust:exact;print-color-adjust:exact}

/* ---------- bandeau ---------- */
header{background:var(--navy);color:#fff;padding:6.5mm 13mm 6mm;position:relative;overflow:hidden;flex:0 0 auto}
header::after{content:"";position:absolute;inset:0;
  background:radial-gradient(90mm 44mm at 90% -25%,rgba(64,130,116,.40),transparent 62%)}
.hd{position:relative;z-index:2;display:flex;align-items:flex-start;gap:8mm}
.hd .titre{flex:1;min-width:0}
.hd .eyebrow{font-family:Montserrat,sans-serif;font-size:6.6pt;font-weight:700;letter-spacing:.18em;
  text-transform:uppercase;color:var(--gold);margin-bottom:1.6mm}
.hd h1{font-family:Montserrat,sans-serif;font-size:21pt;font-weight:800;letter-spacing:-.02em;line-height:1.02}
.hd h1 span{display:block;font-size:9.6pt;font-weight:600;color:#C3D0E0;letter-spacing:0;margin-top:1.8mm;line-height:1.28}
.hd .logo{flex:0 0 auto;display:flex;align-items:center;gap:3.5mm}
/* Le pictogramme comporte une feuille bleu nuit qui disparaît sur le bandeau :
   on le pose donc sur une pastille claire plutôt que directement sur le navy. */
.hd .pastille{width:13mm;height:13mm;border-radius:2.5mm;background:#fff;
  display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.hd .pastille img{width:8mm;height:auto;display:block}
.hd .nom{font-family:Montserrat,sans-serif;font-size:13pt;font-weight:800;letter-spacing:.05em;
  line-height:1;color:#fff}
.hd .nom em{display:block;font-style:normal;font-size:5.9pt;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--gold);margin-top:1.6mm}

/* ---------- corps ---------- */
main{flex:1 1 auto;min-height:0;padding:5.5mm 13mm 4mm;
  display:grid;grid-template-columns:1fr 56mm;gap:5.5mm 6.5mm;align-content:start}
.col{display:flex;flex-direction:column;gap:4mm;min-width:0}
h2{font-family:Montserrat,sans-serif;font-size:10pt;font-weight:700;color:var(--navy);
  margin-bottom:2.2mm;padding-bottom:1.3mm;border-bottom:1.5pt solid var(--gold)}
h2.petit{font-size:8.6pt}
p{margin-bottom:1.8mm}
p:last-child{margin-bottom:0}
.intro{font-size:9.3pt;line-height:1.55}
ul{list-style:none;display:flex;flex-direction:column;gap:1.2mm}
ul li{padding-left:4.5mm;position:relative;color:var(--muted)}
ul li::before{content:"";position:absolute;left:0;top:1.7mm;width:1.9mm;height:1.9mm;
  border-radius:50%;background:var(--vert)}
.note{font-size:7.8pt;color:var(--muted);line-height:1.45;margin-top:2mm}
.note b{color:var(--navy)}

/* ---------- visuel ---------- */
.visuel{border:.8pt solid var(--line);border-radius:3mm;background:var(--cream);
  padding:3.5mm;text-align:center}
.visuel img{width:100%;height:auto;display:block}
.visuel .ref{font-family:Montserrat,sans-serif;font-size:8pt;font-weight:700;color:var(--navy);
  letter-spacing:.06em;margin-top:1.8mm}
.visuel .marque{font-size:6.8pt;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:.5mm}

/* ---------- tableaux ---------- */
table{width:100%;border-collapse:collapse;font-size:8.3pt}
th{font-family:Montserrat,sans-serif;font-size:6.6pt;font-weight:700;letter-spacing:.08em;
  text-transform:uppercase;color:#fff;background:var(--navy);text-align:left;padding:1.7mm 2.2mm}
td{padding:1.4mm 2.2mm;border-bottom:.5pt solid var(--line);vertical-align:top}
tbody tr:nth-child(even) td{background:var(--cream)}
td.dose{font-weight:700;color:var(--navy)}
.carac td:first-child{color:var(--muted);width:40%}
.carac td:last-child{font-weight:600}
.cond td{font-weight:600;color:var(--navy)}

/* ---------- encadrés ---------- */
.garde{background:#FBEDE5;border:.8pt solid #EFCDBB;border-left:3pt solid var(--terra);
  border-radius:0 2.5mm 2.5mm 0;padding:3mm 4mm}
.garde b{color:var(--terra)}
.garde p{margin:0;font-size:8.4pt;line-height:1.5;color:#7A3A1C}
/* Pleine largeur sous les deux colonnes, liste sur deux colonnes de texte :
   les mentions H sont des phrases courtes, elles gaspillaient la moitié de la
   largeur en drapeau et faisaient déborder la page. */
.danger{grid-column:1 / -1;background:var(--cream-d);border:.8pt solid var(--line);
  border-radius:2.5mm;padding:3mm 4mm}
.danger .t{font-family:Montserrat,sans-serif;font-size:8.6pt;font-weight:700;color:var(--navy);
  margin-bottom:2mm;display:block}
.danger ul{display:block;columns:2;column-gap:8mm}
.danger ul li{font-size:7.9pt;color:var(--ink);line-height:1.4;margin-bottom:1.5mm;
  break-inside:avoid}
.danger ul li::before{background:var(--terra);width:1.5mm;height:1.5mm;top:1.7mm}
.danger .rappel{margin:1.5mm 0 0;padding-top:2mm;border-top:.5pt solid var(--line);
  font-size:7.4pt;color:var(--muted);line-height:1.42}
.danger .rappel b{color:var(--navy)}

.livraison{flex:0 0 auto;margin:0 13mm 4mm;background:var(--vert);color:#fff;
  border-radius:2.5mm;padding:2.6mm 4mm;font-size:8.1pt;line-height:1.4}
.livraison b{font-family:Montserrat,sans-serif;font-size:8.6pt;color:#fff}
.livraison span{color:#CFE3D8}

/* ---------- pied ---------- */
footer{flex:0 0 auto;background:var(--navy-d);color:#9FB0C4;padding:4mm 13mm;
  font-size:7.1pt;line-height:1.5;display:flex;justify-content:space-between;gap:8mm;align-items:flex-end}
footer b{color:#fff;font-family:Montserrat,sans-serif;font-size:8pt;display:block;margin-bottom:.8mm}
footer .src{text-align:right;max-width:78mm}
`;

/** Une ligne de caractéristique, omise si la donnée n'existe pas. */
const ligne = (label, valeur) =>
  valeur ? `<tr><td>${esc(label)}</td><td>${esc(valeur)}</td></tr>` : '';

export function ficheTechnique(p, logoDataUri, photoDataUri, polices, echelle = 1) {
  const t = p.technique || {};
  const cat = categorieDuProduit(p);

  const carac = [
    ligne('Couleur', t.couleur),
    ligne('Odeur', t.odeur),
    ligne('Valeur pH', t.ph),
    ligne('Densité', t.densite),
    ligne('Viscosité', t.viscosite),
    ligne('Conductivité', t.conductivite),
    ligne('Facteur de titrage', t.titrage),
    ligne('Poids par pastille', t.poidsPastille),
    ligne('Durée de conservation', t.conservation),
  ]
    .filter(Boolean)
    .join('\n        ');

  const dosage = (t.dosage || []).length
    ? `<div>
        <h2>Dosage recommandé par le fabricant</h2>
        <table>
          <thead><tr><th>Qualité d'eau</th><th>Dureté</th><th>Équivalent CaCO₃</th><th>Dosage</th></tr></thead>
          <tbody>
            ${t.dosage.map((d) => `<tr><td>${esc(d[0])}</td><td>${esc(d[1])}</td><td>${esc(d[2])}</td><td class="dose">${esc(d[3])}</td></tr>`).join('\n            ')}
          </tbody>
        </table>
        <p class="note">Réglé sur le doseur de la machine, et vérifié à chaque visite d'entretien : un surdosage voile la verrerie, un sous-dosage laisse un film gras.</p>
      </div>`
    : '';

  const danger = (t.danger || []).length
    ? `<div class="danger">
        <span class="t">Mentions de danger</span>
        <ul>${t.danger.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
        <p class="rappel"><b>La fiche de données de sécurité du fabricant fait seule référence.</b> Elle accompagne le produit, se télécharge sur www.sodilame.com, et doit rester accessible au titre de votre plan de maîtrise sanitaire.</p>
      </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Fiche technique ${esc(p.ref)} — ${esc(site.nom)}</title>
<style>${cssPolices(polices)}
${CSS}
body{--k:${echelle}}</style>
</head>
<body>

<header>
  <div class="hd">
    <div class="titre">
      <p class="eyebrow">Fiche technique · ${esc(cat ? cat.nomCourt : 'Produit')} · ${esc(p.marque)}</p>
      <h1>${esc(p.ref)}<span>${esc(t.soustitre || p.resume)}</span></h1>
    </div>
    <div class="logo">
      ${logoDataUri ? `<span class="pastille"><img src="${logoDataUri}" alt=""></span>` : ''}
      <span class="nom">${esc(site.nom)}<em>${esc(site.baseline)}</em></span>
    </div>
  </div>
</header>

<main>
  <div class="col">
    <div>
      <h2>À quoi sert ce produit</h2>
      <p class="intro">${esc(p.description)}</p>
    </div>

    ${p.attention ? `<div class="garde"><p><b>À vérifier avant utilisation.</b> ${esc(p.attention)}</p></div>` : ''}

    <div>
      <h2>Caractéristiques techniques</h2>
      <table class="carac"><tbody>
        ${carac}
      </tbody></table>
    </div>

    ${dosage}
  </div>

  <div class="col">
    <div class="visuel">
      ${photoDataUri ? `<img src="${photoDataUri}" alt="${esc(p.marque)} ${esc(p.ref)}">` : ''}
      <div class="ref">${esc(p.ref)}</div>
      <div class="marque">${esc(p.marque)}</div>
    </div>

    <div>
      <h2 class="petit">Machines et usages</h2>
      <ul>${p.usages.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>
    </div>

    <div>
      <h2 class="petit">Conditionnements</h2>
      <table class="cond"><tbody>
        ${p.conditionnements.map((c) => `<tr><td>${esc(c.label)}</td></tr>`).join('\n        ')}
      </tbody></table>
      ${t.stockage ? `<p class="note"><b>Stockage :</b> ${esc(t.stockage)}</p>` : ''}
      ${t.ingredients ? `<p class="note"><b>Ingrédients :</b> ${esc(t.ingredients)}</p>` : ''}
    </div>
  </div>

  ${danger}
</main>

<div class="livraison">
  <b>Livraison offerte dès une unité.</b>
  <span>Votre commande voyage avec le technicien de votre secteur. Aucun paiement en ligne : nous confirmons le montant par mail et facturons dans vos conditions habituelles.</span>
</div>

<footer>
  <div>
    <b>${esc(site.nom)} — ${esc(site.baseline)}</b>
    ${esc(site.adresse.rue)}, ${esc(site.adresse.complement)}<br>
    ${esc(site.adresse.codePostal)} ${esc(site.adresse.ville)} · ${esc(site.telephone)} · www.sodilame.com
  </div>
  <div class="src">
    Données techniques relevées sur la fiche du fabricant ${esc(p.marque)}.<br>
    Document de présentation établi par ${esc(site.nom)} ; en cas d'écart,
    la fiche du fabricant prévaut.
  </div>
</footer>

</body>
</html>`;
}
