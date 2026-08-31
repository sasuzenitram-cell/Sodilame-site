// ---------------------------------------------------------------------------
// Gabarit commun : <head>, en-tête, pied de page, composants réutilisables
// ---------------------------------------------------------------------------
import { site, navPrincipale, secteurs, etapes, formules } from '../data/site.mjs';

export const A = site.adresse;
export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const url = (p = '/') => site.domaine + (p === '/' ? '/' : p);

// ---------------------------------------------------------------------------
// Icônes SVG (trait, 24x24)
// ---------------------------------------------------------------------------
export const icones = {
  conception: '<path d="M3 3h18v18H3z"/><path d="M3 9h18M9 3v18"/>',
  cuisson: '<path d="M4 8h16v12H4z"/><circle cx="8" cy="14" r="1.6"/><circle cx="16" cy="14" r="1.6"/><path d="M7 8V5m5 3V5m5 3V5"/>',
  froid: '<path d="M5 3h14v18H5z"/><path d="M5 11h14"/><path d="M9 7v1M9 15v1"/>',
  laverie: '<circle cx="12" cy="13" r="6"/><circle cx="12" cy="13" r="2.4"/><path d="M5 5h14"/>',
  buanderie: '<path d="M12 3.2a1.9 1.9 0 1 1 1.9 1.9c-1 0-1.9.7-1.9 1.6v1.1"/><path d="m12 7.8-8.3 5.9c-.8.6-.4 1.7.6 1.7h15.4c1 0 1.4-1.1.6-1.7z"/><path d="M6 15.4v5.2h12v-5.2"/>',
  installation: '<path d="M3 17V7l9-4 9 4v10l-9 4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  extraction: '<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>',
  depannage: '<path d="M14.7 6.3a4 4 0 0 0 5 5l-8.3 8.3a2.8 2.8 0 0 1-4-4z"/>',
  contrat: '<path d="M6 3h9l5 5v13H6z"/><path d="M15 3v5h5"/><path d="M9.5 14.5l1.8 1.8 3.5-3.6"/>',
  audit: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>',
  restaurant: '<path d="M7 3v8a3 3 0 0 0 6 0V3M10 11v10"/><path d="M17 3c-1.5 2-2 4-2 6h4c0-2-.5-4-2-6zM17 9v12"/>',
  hotel: '<path d="M3 21V6l9-3 9 3v15"/><path d="M9 21v-5h6v5M7 10h2M11 10h2M15 10h2"/>',
  bar: '<path d="M4 4h16l-8 8z"/><path d="M12 12v7M8.5 19h7"/>',
  boucherie: '<path d="M4 9h16v11H4z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/><path d="M8 13h8"/>',
  ecole: '<path d="M3 10l9-5 9 5-9 5z"/><path d="M7 12v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5"/>',
  sante: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/>',
  mairie: '<path d="M4 20h16M5 20V9l7-5 7 5v11"/><path d="M9 20v-6h6v6"/>',
  boulangerie: '<path d="M4 12h16v8H4z"/><path d="M6 12V8a6 6 0 0 1 12 0v4"/>',
  traiteur: '<rect x="2" y="7" width="14" height="10" rx="2"/><path d="M16 10h3.5l2.5 3v4h-6z"/><circle cx="7" cy="19" r="1.8"/><circle cx="18" cy="19" r="1.8"/>',
  bureau: '<path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7z"/><path d="M9 12l2 2 4-4"/>',
  tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  pin: '<path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  goutte: '<path d="M12 2.7s6 6.6 6 10.6a6 6 0 0 1-12 0c0-4 6-10.6 6-10.6z"/><path d="M9.4 14.4a2.7 2.7 0 0 0 2.6 2.2"/>',
  panier: '<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.55L21 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/>',
  camion: '<path d="M2 6.5h11v9H2z"/><path d="M13 9.5h4l3 3.2v2.8h-7z"/><circle cx="6.5" cy="18" r="1.7"/><circle cx="17" cy="18" r="1.7"/>',
  bidon: '<path d="M8 8h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"/><path d="M10 8V5.5h4V8"/><path d="M15 5.5h2.2a1.3 1.3 0 0 1 1.3 1.3V9"/>',
};
export const svg = (nom, cls = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"${cls ? ` class="${cls}"` : ''} aria-hidden="true">${icones[nom] || ''}</svg>`;

// ---------------------------------------------------------------------------
// <head>
// ---------------------------------------------------------------------------
function head({ titre, description, chemin, schemas = [], noindex = false, typeOg = 'website' }) {
  const canon = url(chemin);
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titre)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canon}">
<meta name="robots" content="${noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'}">
<meta name="author" content="${site.nom}">
${site.googleVerification ? `<meta name="google-site-verification" content="${site.googleVerification}">\n` : ''}<meta name="geo.region" content="FR-13">
<meta name="geo.placename" content="${A.ville}">
<meta property="og:type" content="${typeOg}">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${site.nom}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${url('/assets/logo-sodilame-600.png')}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#183253">
<link rel="icon" href="/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/style.css">
${schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>`;
}

// ---------------------------------------------------------------------------
// En-tête
// ---------------------------------------------------------------------------
function entete(chemin) {
  const lien = (n) => {
    const actif = chemin === n.url || (n.url !== '/' && chemin.startsWith(n.url + '/'));
    return `<a href="${n.url}"${actif ? ' aria-current="page"' : ''}>${n.label}</a>`;
  };
  return `
<div class="topbar">
  <div class="wrap">
    <div class="tb-l">
      <span><span class="dot"></span>Dépannage cuisine pro — <a href="tel:${site.telephoneE164}">${site.telephone}</a></span>
      <span class="hide-s">${site.horaires.court}</span>
    </div>
    <div><span class="hide-s">Bouches-du-Rhône · Gard · Vaucluse</span></div>
  </div>
</div>
<header class="site">
  <div class="wrap hd">
    <a class="brand" href="/" aria-label="${site.nom} — retour à l'accueil">
      <img src="/assets/mark.png" srcset="/assets/mark.png 1x, /assets/mark@2x.png 2x" width="34" height="48" alt="Logo ${site.nom}">
      <span><span class="bn">${site.nom}</span><span class="bs">${site.baseline}</span></span>
    </a>
    <nav class="main" id="nav" aria-label="Navigation principale">
      ${navPrincipale.map(lien).join('\n      ')}
      <a class="only-m" href="${site.portail.url}" target="_blank" rel="noopener">Espace client ${site.portail.nom} ↗</a>
      <a class="only-m" href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a>
    </nav>
    <div class="hd-cta">
      <a class="panier-lien" href="/produits/ma-commande" id="panier-lien" aria-label="Voir ma commande">${svg('panier')}<span class="pc" id="panier-compte" hidden>0</span></a>
      <a class="btn btn-outline btn-sm hide-m" href="${site.portail.url}" target="_blank" rel="noopener">${svg('user')}Espace client</a>
      <a class="btn btn-primary btn-sm" href="/produits">Boutique en ligne</a>
    </div>
    <button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
  </div>
</header>
<main id="contenu">`;
}

// ---------------------------------------------------------------------------
// Pied de page
// ---------------------------------------------------------------------------
function pied(servicesNav, villesNav, produitsNav = []) {
  return `</main>
<footer>
  <div class="wrap">
    <div class="f-grid">
      <div>
        <div class="fbrand">
          <img src="/assets/mark@2x.png" width="40" height="56" alt="${site.nom}" loading="lazy">
          <span><span class="bn">${site.nom}</span><span class="bs">${site.baseline}</span></span>
        </div>
        <p style="max-width:34ch">Conception, vente, installation et dépannage de cuisines professionnelles en Provence depuis ${site.anneeCreation}.</p>
        <p style="font-size:.85rem"><b style="color:#fff">${A.rue}</b><br>${A.complement}<br>${A.codePostal} ${A.ville}</p>
      </div>
      <div>
        <h2>Nos services</h2>
        ${servicesNav.map((s) => `<a href="${s.url}">${s.nomCourt}</a>`).join('\n        ')}
        ${produitsNav.length ? `<h2 style="margin-top:1.6rem">Produits lessiviels</h2>\n        ${produitsNav.map((p) => `<a href="${p.url}">${p.nom}</a>`).join('\n        ')}\n        <a href="/produits"><b>Voir le catalogue →</b></a>` : ''}
      </div>
      <div>
        <h2>Zone d'intervention</h2>
        ${villesNav.map((v) => `<a href="${v.url}">${v.nom}</a>`).join('\n        ')}
        <a href="/zone-intervention"><b>Voir toute la zone →</b></a>
      </div>
      <div>
        <h2>Contact</h2>
        <a href="tel:${site.telephoneE164}"><b style="color:#fff;font-size:1.05rem">${site.telephone}</b></a>
        <a href="mailto:${site.email}">${site.email}</a>
        <p style="font-size:.84rem;margin:.6rem 0 1rem">${site.horaires.texte.replace(' — ', '<br>')}</p>
        <a class="btn btn-primary btn-sm" href="${site.portail.url}" target="_blank" rel="noopener" style="display:inline-flex">Espace client ${site.portail.nom}</a>
      </div>
    </div>
    <div class="f-bottom">
      <span>© ${site.anneeCourante} ${site.nom} — Tous droits réservés</span>
      <span><a href="/mentions-legales">Mentions légales</a> · <a href="/politique-de-confidentialite">Confidentialité</a> · <a href="/plan-du-site">Plan du site</a></span>
    </div>
  </div>
</footer>
<div class="mcall">
  <a class="tel" href="tel:${site.telephoneE164}">${site.telephone}</a>
  <a class="dev" href="/contact">Nous contacter</a>
</div>
<script>
(function(){
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu');});
  n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');b.setAttribute('aria-expanded','false');});});}
})();
</script>
<script src="/assets/form.js" defer></script>
<script src="/assets/panier.js" defer></script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Composants réutilisables
// ---------------------------------------------------------------------------
export function ariane(items) {
  return `<nav class="ariane" aria-label="Fil d'Ariane"><div class="wrap"><ol>
    ${items
      .map((i, k) =>
        k === items.length - 1
          ? `<li aria-current="page">${esc(i.nom)}</li>`
          : `<li><a href="${i.url}">${esc(i.nom)}</a></li>`
      )
      .join('')}
  </ol></div></nav>`;
}

export function schemaAriane(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((i, k) => ({
      '@type': 'ListItem',
      position: k + 1,
      name: i.nom,
      item: url(i.url || '/'),
    })),
  };
}

export function schemaLocalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': url('/#entreprise'),
    name: site.nom,
    alternateName: 'SODILAME Cuisines Professionnelles',
    description:
      "Conception, vente, installation, dépannage et entretien de cuisines professionnelles pour restaurants, hôtels, collectivités et établissements de santé en Provence.",
    url: url('/'),
    telephone: site.telephoneE164,
    email: site.email,
    logo: url('/assets/logo-sodilame-600.png'),
    image: url('/assets/logo-sodilame-600.png'),
    priceRange: '€€',
    foundingDate: String(site.anneeCreation),
    ...(site.legal.siret ? { taxID: site.legal.siret.replace(/\s/g, '') } : {}),
    ...(site.legal.tvaIntra ? { vatID: site.legal.tvaIntra } : {}),
    ...(site.legal.siren ? { identifier: { '@type': 'PropertyValue', name: 'SIREN', value: site.legal.siren.replace(/\s/g, '') } } : {}),
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${A.rue}, ${A.complement}`,
      addressLocality: A.ville,
      postalCode: A.codePostal,
      addressRegion: A.region,
      addressCountry: A.pays,
    },
    geo: { '@type': 'GeoCoordinates', latitude: A.lat, longitude: A.lng },
    openingHoursSpecification: site.horaires.schema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.jours,
      opens: h.ouvre,
      closes: h.ferme,
    })),
    sameAs: Object.values(site.reseaux).filter(Boolean),
  };
}

export function schemaFaq(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.r.replace(/<[^>]+>/g, '') },
    })),
  };
}

export function blocFaq(faq, titre = 'Questions fréquentes', intro = '') {
  if (!faq || !faq.length) return '';
  return `<section>
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">FAQ</p>
      <h2>${esc(titre)}</h2>
      ${intro ? `<p class="lead">${intro}</p>` : ''}
    </div>
    <div style="max-width:820px;margin:0 auto">
      ${faq
        .map(
          (f, k) =>
            `<details${k === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><div class="ans">${f.r}</div></details>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;
}

export function blocSecteurs(titre = 'Nous équipons tous ceux qui cuisinent en volume') {
  return `<section>
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Nos clients</p>
      <h2>${esc(titre)}</h2>
      <p class="lead">Chaque secteur a ses contraintes réglementaires et ses cadences. Nous adaptons le matériel et le rythme d'entretien à votre réalité de terrain.</p>
    </div>
    <div class="grid4">
      ${secteurs
        .map(
          (s) =>
            `<div class="sect"><div class="ico">${svg(s.icone)}</div><b>${esc(s.titre)}</b><span>${esc(s.detail)}</span></div>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;
}

export function blocEtapes() {
  return `<section class="alt">
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Comment ça se passe</p>
      <h2>De votre appel à la mise en service</h2>
    </div>
    <div class="steps">
      ${etapes.map((e) => `<div class="step"><h3>${esc(e.titre)}</h3><p>${esc(e.texte)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

export function blocFormules(compact = false) {
  return `<div class="grid3">
    ${formules
      .map(
        (f, k) => `<div class="formule${k === 1 ? ' mid' : ''}">
      ${k === 1 ? '<span class="badge">Le plus demandé</span>' : ''}
      <h3>${esc(f.nom)}</h3>
      <p class="vis">${esc(f.visites)}</p>
      <p class="pour">${esc(f.pour)}</p>
      <ul class="ul-check">${f.inclus.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      ${compact ? '' : `<a class="btn btn-outline btn-sm" href="/contact?sujet=contrat" style="margin-top:1.2rem;justify-content:center">Recevoir une proposition</a>`}
    </div>`
      )
      .join('\n    ')}
  </div>`;
}

export function blocMySodilame() {
  return `<section class="mysod">
  <div class="wrap">
    <div>
      <p class="eyebrow on-dark" style="color:#FBE7C4">Espace client</p>
      <h2>${site.portail.nom} : votre cuisine, suivie en ligne</h2>
      <p style="font-size:1.08rem">Retrouvez à tout moment le parc d'équipements de votre établissement, l'historique de vos interventions, vos rapports de maintenance et vos documents contractuels. Vous demandez un dépannage en deux clics, nous savons immédiatement de quelle machine il s'agit.</p>
      <ul class="ul-check" style="margin-bottom:1.8rem">
        <li>Parc d'équipements : marques, modèles, numéros de série, garanties</li>
        <li>Historique et rapports d'intervention téléchargeables</li>
        <li>Demande de dépannage rattachée au bon équipement</li>
        <li>Contrats, devis et attestations réglementaires au même endroit</li>
      </ul>
      <a class="btn btn-primary" href="${site.portail.url}" target="_blank" rel="noopener">Accéder à ${site.portail.nom} →</a>
    </div>
    <div class="screen">
      <div class="bar"><i></i><i></i><i></i><b>${site.portail.nom.toUpperCase()} · Restaurant Le Mas — Arles</b></div>
      <div class="body">
        <div class="sr"><b>Chambre froide positive — labo</b><span class="tag ok">Entretien à jour</span></div>
        <div class="sr"><b>Four mixte 10 niveaux</b><span class="tag wait">Visite le 12/09</span></div>
        <div class="sr"><b>Lave-vaisselle à capot</b><span class="tag new">Dépannage demandé</span></div>
        <div class="sr"><b>Vitrine réfrigérée bar</b><span class="tag ok">Entretien à jour</span></div>
        <div class="sr" style="background:#fff;border:1px dashed var(--line)"><b style="color:var(--terra)">+ Demander une intervention</b><span style="color:var(--muted);font-size:.75rem">réponse sous 24 h</span></div>
      </div>
    </div>
  </div>
</section>`;
}

export function blocCtaFinal(titre, texte) {
  return `<section class="navy">
  <div class="wrap center" style="max-width:760px">
    <h2>${esc(titre)}</h2>
    <p class="lead" style="color:#C3D0DF">${texte}</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn btn-primary" href="/contact">Demander un devis gratuit</a>
      <a class="btn btn-ghost" href="tel:${site.telephoneE164}">${svg('tel')}${site.telephone}</a>
    </div>
  </div>
</section>`;
}

export function formulaire({ titre = 'Demander un devis ou un rappel', sujetDefaut = '' } = {}) {
  const opts = [
    'Projet de cuisine complète',
    "Achat / remplacement d'un équipement",
    'Dépannage — froid',
    'Dépannage — cuisson ou laverie',
    "Contrat d'entretien / audit gratuit",
    'Autre demande',
  ];
  return `<form class="devis" id="form-devis" method="post" action="/api/contact" novalidate>
  <h2>${esc(titre)}</h2>
  <div class="row2">
    <div class="field"><label for="nom">Nom et prénom *</label><input id="nom" name="nom" autocomplete="name" required></div>
    <div class="field"><label for="etablissement">Établissement</label><input id="etablissement" name="etablissement" autocomplete="organization" placeholder="Restaurant, hôtel, mairie…"></div>
  </div>
  <div class="row2">
    <div class="field"><label for="telephone">Téléphone *</label><input id="telephone" name="telephone" type="tel" autocomplete="tel" required></div>
    <div class="field"><label for="email">E-mail *</label><input id="email" name="email" type="email" autocomplete="email" required></div>
  </div>
  <div class="row2">
    <div class="field"><label for="ville">Ville</label><input id="ville" name="ville" autocomplete="address-level2" placeholder="Arles, Avignon…"></div>
    <div class="field"><label for="sujet">Votre besoin *</label>
      <select id="sujet" name="sujet" required>
        <option value="">Choisir…</option>
        ${opts.map((o) => `<option${o === sujetDefaut ? ' selected' : ''}>${o}</option>`).join('')}
      </select>
    </div>
  </div>
  <div class="field"><label for="message">Précisez votre demande</label><textarea id="message" name="message" placeholder="Type de matériel, marque, symptôme de la panne, délai souhaité…"></textarea></div>
  <div class="hp" aria-hidden="true"><label for="societe_web">Ne pas remplir</label><input id="societe_web" name="societe_web" tabindex="-1" autocomplete="off"></div>
  <label class="consent"><input type="checkbox" name="consentement" required> J'accepte que mes informations soient utilisées pour être recontacté par ${site.nom}. <a href="/politique-de-confidentialite">Politique de confidentialité</a>.</label>
  <button class="btn btn-primary" type="submit" style="width:100%;justify-content:center">Envoyer ma demande</button>
  <p class="formmsg" id="form-msg" role="status" aria-live="polite"></p>
  <p style="font-size:.76rem;color:var(--muted);margin:.9rem 0 0;text-align:center">Urgence ? Appelez directement le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a></p>
</form>`;
}

export function blocContact({ titre = 'Parlons de votre cuisine', texte = "Projet d'installation, remplacement d'un équipement, panne à traiter ou simple question sur l'entretien : nous répondons sous 24 heures ouvrées.", sujetDefaut = '' } = {}) {
  return `<section class="navy" id="contact">
  <div class="wrap">
    <div class="grid2 top">
      <div>
        <p class="eyebrow on-dark">Contact</p>
        <h2>${esc(titre)}</h2>
        <p>${texte}</p>
        <div class="info-row"><i>${svg('tel')}</i><span><b>Téléphone</b><a href="tel:${site.telephoneE164}">${site.telephone}</a></span></div>
        <div class="info-row"><i>${svg('mail')}</i><span><b>E-mail</b><a href="mailto:${site.email}">${site.email}</a></span></div>
        <div class="info-row"><i>${svg('pin')}</i><span><b>Adresse</b><span>${A.rue} — ${A.complement}<br>${A.codePostal} ${A.ville}</span></span></div>
        <div class="info-row"><i>${svg('horloge')}</i><span><b>Horaires</b><span>${site.horaires.texte.replace(' — ', '<br>')}</span></span></div>
        <div class="info-row"><i>${svg('user')}</i><span><b>Déjà client ?</b><a href="${site.portail.url}" target="_blank" rel="noopener">Accédez à votre espace ${site.portail.nom} →</a></span></div>
      </div>
      ${formulaire({ sujetDefaut })}
    </div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Assemblage d'une page
// ---------------------------------------------------------------------------
export function page(meta, corps, nav) {
  return head(meta) + entete(meta.chemin) + corps + pied(nav.services, nav.villes, nav.produits);
}

// ---------------------------------------------------------------------------
// Bloc « livraison offerte » — argument différenciant de la boutique
// ---------------------------------------------------------------------------
export function blocLivraison() {
  return `<section class="alt">
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Notre différence</p>
      <h2>Livraison offerte dès un bidon</h2>
      <p class="lead">Nos techniciens sillonnent la région toute la journée. Votre commande part avec eux, entre deux interventions : nous n'avons pas de frais de port à vous facturer, parce que nous n'en payons pas.</p>
    </div>
    <div class="grid3">
      <div class="avantage"><i>${svg('camion')}</i><b>Aucun minimum de commande</b><span>Un seul bidon suffit. Pas de palette à constituer, pas de seuil de franco à atteindre.</span></div>
      <div class="avantage"><i>${svg('bidon')}</i><b>Stock permanent à Saint-Martin-de-Crau</b><span>Les références courantes sont dans nos murs, pas chez un grossiste à trois jours de route.</span></div>
      <div class="avantage"><i>${svg('user')}</i><b>Livré par un technicien, pas un transporteur</b><span>Celui qui vous livre connaît vos machines. Il peut régler un doseur au passage.</span></div>
    </div>
  </div>
</section>`;
}
