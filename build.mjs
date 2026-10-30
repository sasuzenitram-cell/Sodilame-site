// ---------------------------------------------------------------------------
// Générateur du site statique SODILAME
//   node build.mjs   →   génère le dossier /public prêt à déployer sur Vercel
// ---------------------------------------------------------------------------
import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { site, formules, secteurs } from './data/site.mjs';
import { services, servicesNav } from './data/services.mjs';
import { villes, villesNav } from './data/villes.mjs';
import { zones, zoneDeLaVille, totalCommunes } from './data/zones.mjs';
import { articles } from './data/articles.mjs';
import { cgv } from './data/cgv.mjs';
import { offres, offresActives, postes, emailRecrutement } from './data/recrutement.mjs';
import { realisationsDeMarque, realisationsDeCollection, realisationsDuProduit } from './data/realisations.mjs';
import { marques, universMarques, marquesDeLUnivers, marquesPied, totalMarques, faqDe } from './data/marques.mjs';
import {
  produits, produitsPublics, categoriesPubliques, produitsDeCategorie, categorieDuProduit, produitsNav, totalProduits,
  machinesCatalogue, marquesCatalogue, ficheSodilame, forfaitDe, etapesForfait,
  ESHOP, URL_PANIER, URL_CATALOGUE, urlCollection, urlProduit, rayonsBoutique, collectionsDuRayon, urlRayon, rayonDe,
} from './data/produits.mjs';
import { pageQr, pagePanne, pageAudit } from './src/qr.mjs';
import { SCRIPT_FILTRES, groupeFiltres } from './src/catalogue.mjs';
import {
  page, ariane, schemaAriane, schemaLocalBusiness, schemaFaq, blocFaq, blocSecteurs,
  blocEtapes, blocFormules, blocMySodilame, blocCtaFinal, blocContact, blocLivraison, formulaire,
  svg, esc, url, A,
} from './src/layout.mjs';

const OUT = 'public';
const nav = { services: servicesNav, villes: villesNav, produits: produitsNav };
const pages = []; // pour sitemap + plan du site

async function ecrire(chemin, html, { priorite = 0.7, dansSitemap = true, majParDefaut } = {}) {
  const fichier = chemin === '/' ? join(OUT, 'index.html') : join(OUT, chemin, 'index.html');
  await mkdir(dirname(fichier), { recursive: true });
  await writeFile(fichier, html, 'utf8');
  if (dansSitemap) pages.push({ chemin, priorite, maj: majParDefaut || '2026-08-18' });
  process.stdout.write(`  ✓ ${chemin}\n`);
}

// ===========================================================================
// ACCUEIL
// ===========================================================================
function accueil() {
  const faq = [
    {
      q: 'Intervenez-vous en urgence sur une panne de froid ?',
      r: `<p>Oui. Nous traitons les pannes de froid en priorité car elles menacent directement vos marchandises. Appelez le ${site.telephone} : nous qualifions la panne au téléphone, vérifions la disponibilité de la pièce dans notre stock de ${A.ville} et planifions l'intervention. Les clients sous contrat d'entretien bénéficient d'une priorité de passage.</p>`,
    },
    {
      q: "Faut-il un contrat d'entretien pour une cuisine professionnelle ?",
      r: "<p>L'entretien préventif n'est pas une obligation générale, mais plusieurs contrôles le sont : contrôle d'étanchéité des équipements contenant des fluides frigorigènes, entretien des circuits d'extraction, traçabilité des températures dans le cadre de votre plan de maîtrise sanitaire. Un contrat permet de regrouper ces contrôles, d'en conserver les preuves et d'éviter les arrêts d'exploitation.</p>",
    },
    {
      q: 'Travaillez-vous avec les marchés publics et les collectivités ?',
      r: "<p>Oui. Nous répondons régulièrement à des consultations de mairies, d'écoles, d'établissements de santé et de cuisines centrales, seuls ou aux côtés d'un bureau d'études. Nous fournissons les pièces administratives, les fiches techniques et les plans d'implantation nécessaires au dossier.</p>",
    },
    {
      q: 'Pouvez-vous concevoir une cuisine complète à partir d’un local vide ?',
      r: "<p>C'est notre cœur de métier. Nous relevons le local, dessinons l'implantation en 2D en respectant le principe de la marche en avant, chiffrons l'ensemble des postes puis nous livrons, installons et mettons en service. Vous n'avez qu'un interlocuteur pour tout le projet.</p>",
    },
    {
      q: 'Vendez-vous du matériel sans installation ?',
      r: "<p>Oui, nous vendons du matériel neuf en direct, avec du stock disponible sur place. Nous vous conseillons cependant sur la compatibilité électrique, gaz et évacuation avant l'achat : c'est la principale source de mauvaise surprise à la livraison.</p>",
    },
    {
      q: 'Sur quel secteur géographique intervenez-vous ?',
      r: `<p>Nous desservons ${totalCommunes} communes, principalement dans les Bouches-du-Rhône (13), le Gard (30) et le Vaucluse (84), organisées en cinq zones — de Saint-Martin-de-Crau et les Alpilles jusqu'à Aix, Marseille et le Luberon. Pour les projets d'installation complète, nous étudions les demandes au-delà.</p>`,
    },
  ];

  const lb = schemaLocalBusiness();
  lb.areaServed = villes.map((v) => ({ '@type': 'City', name: v.nom }));
  lb.hasOfferCatalog = {
    '@type': 'OfferCatalog',
    name: 'Services SODILAME',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.nom, url: url(`/services/${s.slug}`) },
    })),
  };

  const corps = `
<div class="hero">
  <div class="facets" aria-hidden="true"><i class="f1"></i><i class="f2"></i><i class="f3"></i><i class="f4"></i></div>
  <div class="wrap">
    <div>
      <p class="eyebrow on-dark">${A.ville} · Provence · Depuis ${site.anneeCreation}</p>
      <h1>Votre cuisine professionnelle,<br><em>conçue, installée et dépannée</em> par la même équipe.</h1>
      <p class="lead">${site.nom} équipe les restaurants, hôtels, collectivités, écoles et établissements de santé des Bouches-du-Rhône, du Gard et du Vaucluse. Froid, cuisson, laverie, extraction : un seul interlocuteur, du plan 2D au contrat d'entretien.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="/contact">Demander un devis gratuit</a>
        <a class="btn btn-ghost" href="tel:${site.telephoneE164}">${svg('tel')}${site.telephone}</a>
      </div>
      <p class="hero-note">Panne de froid ou de cuisson ? Nous qualifions la panne au téléphone et partons avec la bonne pièce — pièces d'usure courantes en stock à ${A.ville}.</p>
    </div>
    <div class="hero-card">
      <h2>Pourquoi les professionnels nous choisissent</h2>
      <div class="hc-row"><span class="chk">✓</span><span><b>${site.ansExperience} ans de savoir-faire technique</b><span>Une équipe de techniciens salariés, formés aux marques que nous installons.</span></span></div>
      <div class="hc-row"><span class="chk">✓</span><span><b>Frigoristes habilités aux fluides frigorigènes</b><span>Interventions sur froid professionnel en conformité avec la réglementation F-Gas.</span></span></div>
      <div class="hc-row"><span class="chk">✓</span><span><b>Un seul interlocuteur, de A à Z</b><span>Étude, plan 2D, fourniture, installation, mise en service, SAV et entretien.</span></span></div>
      <div class="hc-row"><span class="chk">✓</span><span><b>Pièces détachées en stock</b><span>Un magasin sur place à ${A.ville} pour limiter vos arrêts d'exploitation.</span></span></div>
    </div>
  </div>
</div>

<div class="strip">
  <div class="wrap">
    <div><b>${site.ansExperience} ans</b><span>d'expérience en cuisine pro</span></div>
    <div><b>3 départements</b><span>Bouches-du-Rhône · Gard · Vaucluse</span></div>
    <div><b>24 h</b><span>réponse à toute demande technique</span></div>
    <div><b>100 %</b><span>techniciens salariés ${site.nom}</span></div>
  </div>
</div>

<section id="services">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">Nos métiers</p>
      <h2>Tous les métiers de la cuisine professionnelle, sous un même toit</h2>
      <p class="lead">De l'étude d'implantation au dépannage d'urgence, ${site.nom} couvre l'intégralité du cycle de vie de votre cuisine. Chaque prestation est assurée par nos équipes internes.</p>
    </div>
    <div class="grid3">
      ${services
        .map(
          (s) => `<a class="card" href="/services/${s.slug}">
        <div class="ico">${svg(s.icone)}</div>
        <h3>${esc(s.nomCourt)}</h3>
        <p>${esc(s.resume)}</p>
        <span class="more">En savoir plus →</span>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="navy on-navy">
  <div class="wrap">
    <div class="grid2">
      <div>
        <p class="eyebrow on-dark">Entretien préventif</p>
        <h2>Le contrat d'entretien qui vous évite l'arrêt d'exploitation</h2>
        <p>Une chambre froide qui lâche un vendredi soir, c'est un service annulé et des marchandises perdues. L'entretien préventif ${site.nom} anticipe la panne au lieu de la subir : visites planifiées, pièces d'usure remplacées avant rupture, et un historique complet de vos équipements.</p>
        <ul class="ul-check">
          <li>Visites préventives planifiées selon votre activité (1 à 4 par an)</li>
          <li>Contrôle d'étanchéité et registre F-Gas tenus à jour</li>
          <li>Priorité d'intervention sur les demandes de dépannage</li>
          <li>Tarif main-d'œuvre préférentiel et remise sur pièces</li>
          <li>Rapports d'intervention centralisés dans ${site.portail.nom}</li>
        </ul>
        <div class="btn-row">
          <a class="btn btn-primary" href="/services/contrat-entretien-cuisine-professionnelle">Découvrir l'offre</a>
          <a class="btn btn-ghost" href="/contact?sujet=audit">Demander l'audit gratuit</a>
        </div>
      </div>
      <div class="panel">
        <h3>Trois formules, une seule logique : la continuité de service</h3>
        ${formules.map((f) => `<div class="tier"><b>${f.nom}</b><span>${f.visites.replace('visite préventive par an', 'visite / an').replace('visites préventives par an', 'visites / an')}</span></div>`).join('\n        ')}
        <p style="font-size:.85rem;color:#A9BACD;margin-top:1.2rem;margin-bottom:0">Tarification établie après audit de votre parc d'équipements. L'audit est gratuit et sans engagement.</p>
      </div>
    </div>
  </div>
</section>

${blocMySodilame()}
${blocSecteurs()}

<section class="alt">
  <div class="wrap">
    <div class="grid2">
      <div>
        <p class="eyebrow">Zone d'intervention</p>
        <h2>Basés à ${A.ville}, présents dans toute la Provence</h2>
        <p class="lead">Notre atelier et notre magasin de pièces se trouvent ${A.complement}, à ${A.ville}. Cette position centrale nous permet de desservir ${totalCommunes} communes des Bouches-du-Rhône, du Gard et du Vaucluse, organisées en cinq zones.</p>
        <div class="zone-list">
          ${zones.map((z) => `<a href="/zone-intervention/${z.slug}">${esc(z.nom)}</a>`).join('\n          ')}
        </div>
        <div class="zone-list" style="margin-top:.8rem">
          ${villes.map((v) => `<a href="/zone-intervention/${v.slug}">${v.nom}</a>`).join('\n          ')}
        </div>
        <p style="margin-top:1.6rem;font-size:.92rem;color:var(--muted)">Votre commune n'apparaît pas ? Appelez-nous au <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a>, nous étudions chaque demande.</p>
      </div>
      <div class="map-box">${carte()}</div>
    </div>
  </div>
</section>

${blocEtapes()}

<section>
  <div class="wrap">
    <div class="grid2">
      <div>
        <p class="eyebrow">L'entreprise</p>
        <h2>${site.ansExperience} ans de métier, une nouvelle équipe aux commandes</h2>
        <p>${site.nom} accompagne depuis quatre décennies les professionnels de la restauration en Provence. L'entreprise est aujourd'hui reprise par Romain et Mathieu, avec une conviction simple : le savoir-faire technique de l'équipe est ce qui fait la différence sur le terrain.</p>
        <p>Ce que nous faisons évoluer : la réactivité, la disponibilité des pièces, la transparence sur le suivi de vos équipements. Ce que nous préservons : les techniciens, les partenaires historiques et l'exigence de travail bien fait.</p>
        <blockquote class="quote">« Nos clients ne nous appellent pas pour acheter une machine. Ils nous appellent pour que leur cuisine tourne. »</blockquote>
        <div class="founders">
          <div class="fd"><i>R</i><span><b>Romain</b><span>Co-dirigeant</span></span></div>
          <div class="fd"><i>M</i><span><b>Mathieu</b><span>Co-dirigeant</span></span></div>
        </div>
        <div class="btn-row"><a class="btn btn-outline" href="/a-propos">Découvrir l'entreprise</a></div>
      </div>
      <div>${photo({ f: 'hotte-extraction-cuisine-professionnelle', w: 1400, h: 1050, alt: "Hotte inox, gaine d'extraction et compensation d'air neuf installées par SODILAME dans une cuisine professionnelle neuve" }, 'Extraction et compensation d’air neuf — chantier SODILAME')}</div>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Conseils</p>
      <h2>Nos guides pour les professionnels de la restauration</h2>
    </div>
    <div class="grid3">
      ${articles.slice(0, 3).map(carteArticle).join('\n      ')}
    </div>
    <div class="btn-row" style="justify-content:center"><a class="btn btn-outline" href="/conseils">Tous nos conseils</a></div>
  </div>
</section>

${blocFaq(faq, 'Ce que les professionnels nous demandent le plus')}
${blocContact()}`;

  return page(
    {
      titre: `Cuisine professionnelle en Provence (13, 30, 84) | ${site.nom}`,
      description: `Depuis ${site.anneeCreation}, ${site.nom} conçoit, installe et dépanne les cuisines professionnelles en Provence : froid, cuisson, laverie, entretien. Devis gratuit.`,
      chemin: '/',
      schemas: [
        lb,
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: site.nom,
          url: url('/'),
          inLanguage: 'fr-FR',
          publisher: { '@id': url('/#entreprise') },
        },
        schemaFaq(faq),
      ],
    },
    corps,
    nav
  );
}

// ===========================================================================
// Helpers de rendu
// ===========================================================================
// Communes qui disposent d'une page ville dédiée
const VILLE_DE_COMMUNE = {
  'Saint-Martin-de-Crau': 'saint-martin-de-crau',
  'Arles': 'arles',
  'Salon-de-Provence': 'salon-de-provence',
  'Avignon': 'avignon',
  'Nîmes': 'nimes',
  'Aix-en-Provence': 'aix-en-provence',
  'Marseille': 'marseille',
  'Istres': 'istres-miramas',
  'Miramas': 'istres-miramas',
};

function chipsCommunes(communes) {
  return communes
    .map((c) => {
      const v = VILLE_DE_COMMUNE[c];
      return v
        ? `<a href="/zone-intervention/${v}">${esc(c)}</a>`
        : `<span>${esc(c)}</span>`;
    })
    .join('\n      ');
}

function carte() {
  // Iframe de la fiche Google Business Profile réelle de SODILAME (établissement identifié,
  // pas une simple recherche d'adresse) — renforce la cohérence avec la fiche Google.
  return `<iframe title="SODILAME sur Google Maps — ${A.rue}, ${A.codePostal} ${A.ville}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" src="${site.carteEmbed}"></iframe>`;
}

// Photo de chantier SODILAME (toutes filigranées)
function photo(ph, legende = '') {
  if (!ph) return '';
  return `<figure class="ph-fig">
  <img src="/assets/photos/${ph.f}.jpg" width="${ph.w}" height="${ph.h}" alt="${esc(ph.alt)}" loading="lazy" decoding="async">
  ${legende ? `<figcaption>${esc(legende)}</figcaption>` : ''}
</figure>`;
}

function photoPlaceholder(texte) {
  return `<div><img src="/assets/mark@2x.png" alt="" width="80" height="112" style="margin:0 auto 1rem;opacity:.9" loading="lazy"><span style="font-size:.8rem">[ ${esc(texte)} — à intégrer ]</span></div>`;
}

// ---------------------------------------------------------------------------
// Maillage interne : quels articles rattacher à quel service.
// Sans ce bloc, les articles ne reçoivent que le lien du hub /conseils et
// Google en déduit qu'ils ne comptent pas.
// ---------------------------------------------------------------------------
const ARTICLES_PAR_SERVICE = {
  'conception-cuisine-professionnelle': [
    'aides-financieres-equipement-cuisine-professionnelle',
    'choisir-four-mixte-restaurant',
    'temperatures-haccp-restauration',
  ],
  'materiel-cuisson-professionnel': [
    'choisir-four-mixte-restaurant',
    'temperatures-haccp-restauration',
    'aides-financieres-equipement-cuisine-professionnelle',
  ],
  'froid-professionnel': [
    'eviter-panne-chambre-froide-ete',
    'controle-etancheite-f-gas-cuisine-professionnelle',
    'temperatures-haccp-restauration',
  ],
  'laverie-restauration': [
    'subvention-lave-verres-osmoseur',
    'aides-financieres-equipement-cuisine-professionnelle',
    'temperatures-haccp-restauration',
  ],
  'buanderie-professionnelle': [
    'aides-financieres-equipement-cuisine-professionnelle',
    'subvention-lave-verres-osmoseur',
  ],
  'installation-mise-en-service': [
    'choisir-four-mixte-restaurant',
    'aides-financieres-equipement-cuisine-professionnelle',
    'controle-etancheite-f-gas-cuisine-professionnelle',
  ],
  'extraction-ventilation-cuisine': [
    'temperatures-haccp-restauration',
    'aides-financieres-equipement-cuisine-professionnelle',
  ],
  'depannage-sav-cuisine-professionnelle': [
    'eviter-panne-chambre-froide-ete',
    'controle-etancheite-f-gas-cuisine-professionnelle',
    'choisir-four-mixte-restaurant',
  ],
  'contrat-entretien-cuisine-professionnelle': [
    'controle-etancheite-f-gas-cuisine-professionnelle',
    'temperatures-haccp-restauration',
    'eviter-panne-chambre-froide-ete',
  ],
};

const articleParSlug = (slug) => articles.find((a) => a.slug === slug);

function blocLectures(slugs, titre = 'À lire aussi dans nos conseils') {
  const liste = (slugs || []).map(articleParSlug).filter(Boolean);
  if (!liste.length) return '';
  return `<section class="alt">
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Conseils</p>
      <h2>${esc(titre)}</h2>
    </div>
    <div class="grid3">
      ${liste.map(carteArticle).join('\n      ')}
    </div>
  </div>
</section>`;
}

function carteArticle(a) {
  return `<a class="post" href="/conseils/${a.slug}">
        <span class="thumb"></span>
        <span class="in">
          <span class="meta">${esc(a.categorie)}</span>
          <h3>${esc(a.titre)}</h3>
          <p>${esc(a.resume)}</p>
        </span>
      </a>`;
}

// ===========================================================================
// SERVICES — page hub
// ===========================================================================
function servicesHub() {
  const fil = [{ nom: 'Accueil', url: '/' }, { nom: 'Nos services', url: '/services' }];
  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">Nos services</p>
    <h1>Tous les métiers de la cuisine professionnelle</h1>
    <p>De la première esquisse d'implantation au dépannage d'un soir de service, ${site.nom} couvre l'intégralité du cycle de vie de votre cuisine — avec les mêmes équipes, du début à la fin.</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid3">
      ${services
        .map(
          (s) => `<a class="card" href="/services/${s.slug}">
        <div class="ico">${svg(s.icone)}</div>
        <h2 style="font-size:1.18rem">${esc(s.nomCourt)}</h2>
        <p>${esc(s.resume)}</p>
        <span class="more">En savoir plus →</span>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">L'intérêt d'un interlocuteur unique</p>
      <h2>Pourquoi tout confier à la même entreprise</h2>
      <p class="lead">Quand l'installateur, le vendeur et le dépanneur sont trois sociétés différentes, chaque panne commence par une recherche de responsabilité. Chez nous, il n'y a personne d'autre à appeler.</p>
    </div>
    <div class="grid3">
      <div class="card"><h3>Une responsabilité claire</h3><p>Nous avons dessiné, fourni et posé : en cas de dysfonctionnement, il n'y a pas de débat sur l'origine du problème.</p></div>
      <div class="card"><h3>Une connaissance de votre parc</h3><p>Marques, modèles, numéros de série, historique : tout est enregistré. Le technicien qui arrive sait déjà ce qu'il va trouver.</p></div>
      <div class="card"><h3>Des choix cohérents dans la durée</h3><p>Nous ne référençons que du matériel dont nous pouvons assurer le SAV. Cela nous ferme quelques ventes, et vous évite quelques impasses.</p></div>
    </div>
  </div>
</section>

${blocEtapes()}
${blocSecteurs('Nos clients')}
${blocCtaFinal('Un projet, une panne, une question ?', "Décrivez-nous votre besoin : nous répondons sous 24 heures ouvrées, et le déplacement d'étude est gratuit sur notre zone.")}`;

  return page(
    {
      titre: `Nos services — Cuisine professionnelle en Provence | ${site.nom}`,
      description: `Conception, cuisson, froid, laverie, installation, extraction, dépannage et contrats d'entretien : tous les services ${site.nom} dans le 13, 30 et 84.`,
      chemin: '/services',
      schemas: [
        schemaAriane(fil),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: services.map((s, k) => ({
            '@type': 'ListItem',
            position: k + 1,
            name: s.nom,
            url: url(`/services/${s.slug}`),
          })),
        },
      ],
    },
    corps,
    nav
  );
}

// ===========================================================================
// SERVICES — page détail
// ===========================================================================
/**
 * Les marques rattachées à un service, affichées au bas de sa page.
 *
 * Sans ce bloc, les pages marques n'étaient atteignables que depuis le menu et
 * le pied de page : dix-neuf pages sans aucun lien contextuel entrant, c'est
 * dix-neuf pages que Google considère comme secondaires. L'index inverse se
 * construit à partir du champ `services` de data/marques.mjs — un seul endroit
 * à tenir à jour, et les deux sens du lien restent cohérents.
 */
function blocMarquesDuService(slugService) {
  const liees = marques.filter((m) => (m.services || []).includes(slugService));
  if (!liees.length) return '';
  return `<section>
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Marques</p>
      <h2>Les marques que nous installons et dépannons</h2>
      <p class="lead">Nous ne vendons que du matériel que nos techniciens savent réparer. Voici celles qui concernent ce service.</p>
    </div>
    <div class="zone-list" style="justify-content:center">
      ${liees.map((m) => `<a href="/marques/${m.slug}">${esc(m.nom)}</a>`).join('\n      ')}
    </div>
    <p style="text-align:center;margin-top:1.4rem"><a href="/marques"><b>Voir les ${totalMarques} marques distribuées →</b></a></p>
  </div>
</section>`;
}

function servicePage(s) {
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: 'Nos services', url: '/services' },
    { nom: s.nomCourt, url: `/services/${s.slug}` },
  ];
  const autres = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">${esc(s.nomCourt)}</p>
    <h1>${esc(s.nom)}</h1>
    <p>${esc(s.intro)}</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/contact">Demander un devis</a>
      <a class="btn btn-ghost" href="tel:${site.telephoneE164}">${svg('tel')}${site.telephone}</a>
    </div>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid-art">
      <div class="prose">
        ${s.sections
          .map(
            (sec) =>
              `<h2>${esc(sec.h2)}</h2>\n${sec.html}${sec.formules ? '\n' + blocFormulesInline() : ''}`
          )
          .join('\n')}
      </div>
      <aside>
        ${photo(s.photo, `${s.nomCourt} — réalisation SODILAME`)}
        <div class="card" style="position:sticky;top:110px">
          <h2 style="font-size:1.1rem">Ce que comprend la prestation</h2>
          <ul class="ul-check">${s.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
          <div class="btn-row" style="margin-top:1.4rem">
            <a class="btn btn-primary btn-sm" href="/contact" style="width:100%;justify-content:center">Demander un devis gratuit</a>
          </div>
          <p style="font-size:.83rem;color:var(--muted);margin:1rem 0 0;text-align:center">ou appelez le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a></p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="alt tight">
  <div class="wrap">
    <div class="sec-head center" style="margin-bottom:28px">
      <h2 style="font-size:1.5rem">Nous intervenons dans toute la Provence</h2>
    </div>
    <div class="zone-list" style="justify-content:center">
      ${villes.map((v) => `<a href="/zone-intervention/${v.slug}">${v.nom}</a>`).join('\n      ')}
    </div>
  </div>
</section>

${blocMarquesDuService(s.slug)}

${blocFaq(s.faq, `Questions fréquentes — ${s.nomCourt.toLowerCase()}`)}

<section class="alt">
  <div class="wrap">
    <div class="sec-head center"><p class="eyebrow">Nos autres services</p><h2>Vous pourriez aussi avoir besoin de…</h2></div>
    <div class="grid3">
      ${autres
        .map(
          (a) => `<a class="card" href="/services/${a.slug}">
        <div class="ico">${svg(a.icone)}</div>
        <h3>${esc(a.nomCourt)}</h3>
        <p>${esc(a.resume)}</p>
        <span class="more">En savoir plus →</span>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

${blocLectures(ARTICLES_PAR_SERVICE[s.slug])}
${blocContact({ titre: `Un projet de ${s.nomCourt.toLowerCase()} ?`, texte: "Décrivez-nous votre besoin en quelques lignes. Nous revenons vers vous sous 24 heures ouvrées avec des questions précises, et un rendez-vous si le projet le justifie." })}`;

  return page(
    {
      titre: s.titreSeo,
      description: s.description,
      chemin: `/services/${s.slug}`,
      schemas: [
        schemaAriane(fil),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.nom,
          description: s.description,
          serviceType: s.nomCourt,
          url: url(`/services/${s.slug}`),
          provider: { '@id': url('/#entreprise') },
          areaServed: villes.map((v) => ({ '@type': 'City', name: v.nom })),
          availableChannel: {
            '@type': 'ServiceChannel',
            servicePhone: site.telephoneE164,
            serviceUrl: url('/contact'),
          },
        },
        schemaFaq(s.faq),
      ],
    },
    corps,
    nav
  );
}

function blocFormulesInline() {
  return `<div style="margin:1.6rem 0">${blocFormules(true).replace('class="grid3"', 'class="grid3" style="gap:16px"')}</div>`;
}

// ===========================================================================
// ZONE — hub
// ===========================================================================
function zoneHub() {
  const fil = [{ nom: 'Accueil', url: '/' }, { nom: "Zone d'intervention", url: '/zone-intervention' }];
  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">Zone d'intervention</p>
    <h1>Cuisines professionnelles : ${totalCommunes} communes desservies en Provence et dans le Gard</h1>
    <p>Notre atelier et notre magasin de pièces sont à ${A.ville}, au centre du triangle Arles – Salon – Avignon. Nous organisons notre couverture en cinq zones, de la plus proche à la plus lointaine — et nous vous disons franchement ce que nous pouvons tenir sur chacune.</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid2">
      <div>
        <h2>Une zone resserrée, assumée</h2>
        <p class="lead">Beaucoup d'entreprises affichent une « couverture nationale ». Dans notre métier, cela signifie généralement une sous-traitance locale et un délai de pièce qui s'allonge.</p>
        <p>Nous faisons l'inverse : une zone construite autour de ${A.ville}, des techniciens salariés qui connaissent les établissements, et un stock physique de pièces à moins d'une heure de la plupart de nos clients.</p>
        <p>Concrètement, cela veut dire qu'une panne de froid sur Arles ou Istres peut être traitée dans la journée quand la pièce est en stock — et que nous vous le dirons quand ce n'est pas le cas plutôt que de vous faire attendre.</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="/contact">Demander un devis</a>
          <a class="btn btn-outline" href="tel:${site.telephoneE164}">${site.telephone}</a>
        </div>
      </div>
      <div class="map-box">${carte()}</div>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="sec-head center"><p class="eyebrow">Nos cinq zones</p><h2>Trouvez votre secteur</h2>
    <p class="lead">Chaque zone correspond à une réalité de terrain : distance depuis l'atelier, type d'établissements, saisonnalité. Cliquez sur la vôtre.</p></div>
    <div class="grid3">
      ${zones
        .map(
          (z) => `<a class="card" href="/zone-intervention/${z.slug}">
        <div class="zone-head"><span class="zone-num ${z.couleur}">${z.numero}</span></div>
        <h3>${esc(z.nom)}</h3>
        <p>${esc(z.sousTitre)}</p>
        <p style="margin-top:.7rem;font-size:.86rem;color:var(--terra);font-weight:600">${z.communes.length} communes</p>
        <span class="more">Voir la zone →</span>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="sec-head center"><p class="eyebrow">Nos principales villes</p><h2>Pages dédiées</h2></div>
    <div class="grid4">
      ${villes
        .map(
          (v) => `<a class="card" href="/zone-intervention/${v.slug}">
        <div class="ico">${svg('pin')}</div>
        <h3 style="font-size:1.05rem">${esc(v.nom)}</h3>
        <p>${esc(v.cp)} · ${esc(v.departement)}</p>
      </a>`
        )
        .join('\n      ')}
    </div>
    <p class="center" style="margin-top:2.4rem;color:var(--muted)">Votre commune ne figure nulle part ? Appelez le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a> : notre zone s'étend au-delà de ces listes et nous vous communiquons les conditions applicables avant toute intervention.</p>
  </div>
</section>

${blocCtaFinal('Une intervention à programmer ?', "Dites-nous où vous êtes et ce qui ne va pas. Nous vous annonçons un créneau réaliste, pas un délai commercial.")}`;

  return page(
    {
      titre: `Zone d'intervention — ${totalCommunes} communes en Provence | ${site.nom}`,
      description: `${site.nom} intervient sur ${totalCommunes} communes des Bouches-du-Rhône, du Gard, du Vaucluse et au-delà, organisées en 5 zones. Cuisines professionnelles.`,
      chemin: '/zone-intervention',
      schemas: [
        schemaAriane(fil),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: "Zones d'intervention SODILAME",
          itemListElement: zones.map((z, k) => ({
            '@type': 'ListItem',
            position: k + 1,
            name: z.nom,
            url: url(`/zone-intervention/${z.slug}`),
          })),
        },
      ],
    },
    corps,
    nav
  );
}

// ===========================================================================
// ZONE — page zone
// ===========================================================================
function zonePage(z) {
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: "Zone d'intervention", url: '/zone-intervention' },
    { nom: z.nom, url: `/zone-intervention/${z.slug}` },
  ];
  const villesZone = villes.filter((v) => z.villes.includes(v.slug));
  const autres = zones.filter((x) => x.slug !== z.slug);

  const faq = [
    {
      q: `Ma commune figure dans la zone ${z.numero}, sous quel délai intervenez-vous ?`,
      r: `<p>Le délai dépend de la nature de la panne et de la disponibilité de la pièce, pas seulement de la distance. Nous qualifions la demande au téléphone, vérifions le stock à ${A.ville} et vous annonçons un créneau réaliste. Les clients sous contrat d'entretien passent en priorité.</p>`,
    },
    {
      q: 'Comment est facturé le déplacement ?',
      r: `<p>Le déplacement est facturé au forfait, selon votre commune, et il vous est communiqué avant toute intervention. Aucun frais n'apparaît sur la facture sans avoir été annoncé. Appelez le ${site.telephone} pour connaître le forfait applicable chez vous.</p>`,
    },
    {
      q: 'Intervenez-vous sur du matériel que vous n’avez pas installé ?',
      r: "<p>Oui, toutes marques confondues, dans la mesure où les pièces restent approvisionnables. Communiquez-nous la marque, le modèle et le numéro de série lors de l'appel : nous vérifions avant de nous déplacer.</p>",
    },
    {
      q: 'Ma commune n’est pas dans la liste, que faire ?',
      r: `<p>Notre zone d'intervention s'étend au-delà de ces listes, en particulier pour les projets d'installation complète. Appelez-nous au ${site.telephone}, nous étudions chaque demande et vous indiquons les conditions applicables.</p>`,
    },
  ];

  const lb = schemaLocalBusiness();
  lb['@id'] = url(`/zone-intervention/${z.slug}#service`);
  lb.areaServed = z.communes.map((c) => ({ '@type': 'City', name: c }));

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">Zone ${z.numero} · ${esc(z.sousTitre)}</p>
    <h1>${esc(z.nom)} : installation, dépannage et entretien de cuisines professionnelles</h1>
    <p>${esc(z.accroche)}</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/contact">Demander un devis</a>
      <a class="btn btn-ghost" href="tel:${site.telephoneE164}">${svg('tel')}${site.telephone}</a>
    </div>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid-art">
      <div class="prose">
        ${z.corps.map((c) => `<h2>${esc(c.h2)}</h2>\n${c.html}`).join('\n')}
      </div>
      <aside>
        <div class="card" style="position:sticky;top:110px">
          <h2 style="font-size:1.1rem">Nos prestations sur cette zone</h2>
          <ul class="ul-check">
            ${services.map((s) => `<li><a href="/services/${s.slug}" style="text-decoration:none">${esc(s.nomCourt)}</a></li>`).join('\n            ')}
          </ul>
          <div class="btn-row" style="margin-top:1.4rem">
            <a class="btn btn-primary btn-sm" href="/contact" style="width:100%;justify-content:center">Être rappelé</a>
          </div>
          <p style="font-size:.83rem;color:var(--muted);margin:1rem 0 0;text-align:center">ou appelez le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a></p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Zone ${z.numero}</p>
      <h2>Les ${z.communes.length} communes de la zone ${esc(z.nom)}</h2>
      <p class="lead">Les communes en couleur disposent d'une page dédiée. Pour toutes les autres, le fonctionnement est identique : appelez-nous, nous qualifions et nous planifions.</p>
    </div>
    <div class="zone-list" style="justify-content:center;max-width:900px;margin:0 auto">
      ${chipsCommunes(z.communes)}
    </div>
    ${
      villesZone.length
        ? `<div class="sec-head center" style="margin-top:3rem;margin-bottom:24px"><h2 style="font-size:1.4rem">Pages dédiées de cette zone</h2></div>
    <div class="grid4">
      ${villesZone.map((v) => `<a class="card" href="/zone-intervention/${v.slug}"><div class="ico">${svg('pin')}</div><h3 style="font-size:1.05rem">${esc(v.nom)}</h3><p>${esc(v.cp)} · ${esc(v.departement)}</p></a>`).join('\n      ')}
    </div>`
        : ''
    }
  </div>
</section>

${blocSecteurs('Les établissements que nous suivons sur cette zone')}
${blocFaq(faq, `Questions fréquentes — zone ${z.numero}`)}

<section class="alt tight">
  <div class="wrap">
    <div class="sec-head center" style="margin-bottom:28px"><h2 style="font-size:1.5rem">Les autres zones d'intervention</h2></div>
    <div class="zone-list" style="justify-content:center">
      ${autres.map((x) => `<a href="/zone-intervention/${x.slug}">${esc(x.nom)}</a>`).join('\n      ')}
    </div>
  </div>
</section>

${blocContact({ titre: `Nous contacter depuis la zone ${esc(z.nom)}`, texte: `Projet d'équipement, remplacement de matériel, panne à traiter ou audit de votre parc : décrivez votre besoin, nous répondons sous 24 heures ouvrées.` })}`;

  return page(
    {
      titre: z.titreSeo,
      description: z.description,
      chemin: `/zone-intervention/${z.slug}`,
      schemas: [schemaAriane(fil), lb, schemaFaq(faq)],
    },
    corps,
    nav
  );
}

// ===========================================================================
// ZONE — page ville
// ===========================================================================
function villePage(v) {
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: "Zone d'intervention", url: '/zone-intervention' },
    { nom: v.nom, url: `/zone-intervention/${v.slug}` },
  ];
  const faq = [
    {
      q: `Intervenez-vous rapidement à ${v.nom} en cas de panne ?`,
      r: `<p>${v.nom} se situe ${v.distance}. Nous qualifions la panne par téléphone, vérifions la disponibilité de la pièce dans notre stock de ${A.ville} et vous annonçons un créneau réaliste. Les clients sous contrat d'entretien bénéficient d'une priorité de passage.</p>`,
    },
    {
      q: `Le déplacement pour un devis est-il facturé à ${v.nom} ?`,
      r: `<p>Non. Le déplacement pour l'étude d'un projet d'équipement ou pour l'audit de votre parc est gratuit sur notre zone d'intervention, ${v.nom} incluse.</p>`,
    },
    {
      q: `Quels types d'établissements équipez-vous à ${v.nom} ?`,
      r: `<p>Restaurants, brasseries, hôtels, campings, boulangeries, traiteurs, cantines scolaires, cuisines centrales, EHPAD et établissements de santé. Nous adaptons le matériel et le rythme d'entretien à l'intensité réelle de votre exploitation.</p>`,
    },
    // Ces trois questions reprennent le vocabulaire réellement tapé dans Google
    // — « frigoriste », « chambre froide », « toutes marques » — plutôt que
    // celui du métier. Elles alimentent aussi le bloc FAQ structuré.
    {
      q: `Dépannez-vous les chambres froides et les groupes frigorifiques à ${v.nom} ?`,
      r: `<p>Oui. Nos frigoristes sont habilités à la manipulation des fluides frigorigènes et interviennent sur les chambres froides, groupes, vitrines réfrigérées, cellules de refroidissement rapide et armoires. Nous assurons également le contrôle d'étanchéité réglementaire, avec délivrance de l'attestation et tenue du registre.</p>`,
    },
    {
      q: `Intervenez-vous sur du matériel que vous n'avez pas vendu ?`,
      r: `<p>Oui, toutes marques. Nos techniciens sont formés sur les principales marques du marché et nous disposons d'un stock de pièces d'usure courantes à ${A.ville}. Pour une pièce spécifique, nous la commandons après avoir posé le diagnostic — jamais avant.</p>`,
    },
    {
      q: `Comment se passe un dépannage depuis ${v.nom} ?`,
      r: `<p>Vous appelez le ${site.telephone}, nous qualifions la panne au téléphone — modèle, symptôme, code erreur si l'appareil en affiche un. Une photo de la plaque signalétique ou de l'écran aide beaucoup. Nous vérifions la pièce dans notre stock et nous vous annonçons un créneau réaliste plutôt qu'optimiste.</p>`,
    },
  ];

  const lb = schemaLocalBusiness();
  lb['@id'] = url(`/zone-intervention/${v.slug}#service`);
  lb.areaServed = v.communes.map((c) => ({ '@type': 'City', name: c }));

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">${esc(v.departement)} (${esc(v.dep)}) · ${esc(v.distance)}</p>
    <h1>${esc(v.h1)}</h1>
    <p>${esc(v.accroche)}</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/contact?ville=${encodeURIComponent(v.nom)}">Demander un devis</a>
      <a class="btn btn-ghost" href="tel:${site.telephoneE164}">${svg('tel')}${site.telephone}</a>
    </div>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid-art">
      <div class="prose">
        ${v.corps.map((c) => `<h2>${esc(c.h2)}</h2>\n${c.html}`).join('\n')}
        <h2>Communes desservies autour de ${esc(v.nom)}</h2>
        <p>${v.communes.map((c) => esc(c)).join(' · ')}</p>
        ${
          zoneDeLaVille(v.slug)
            ? `<div class="callout"><p><b>${esc(v.nom)} fait partie de notre zone ${zoneDeLaVille(v.slug).numero} — ${esc(zoneDeLaVille(v.slug).nom)}.</b> Retrouvez la liste complète des ${zoneDeLaVille(v.slug).communes.length} communes de ce secteur et notre organisation sur <a href="/zone-intervention/${zoneDeLaVille(v.slug).slug}">la page de la zone</a>.</p></div>`
            : ''
        }
      </div>
      <aside>
        <div class="card" style="position:sticky;top:110px">
          <h2 style="font-size:1.1rem">Nos prestations à ${esc(v.nom)}</h2>
          <ul class="ul-check">
            ${services.map((s) => `<li><a href="/services/${s.slug}" style="text-decoration:none">${esc(s.nomCourt)}</a></li>`).join('\n            ')}
          </ul>
          <div class="btn-row" style="margin-top:1.4rem">
            <a class="btn btn-primary btn-sm" href="/contact?ville=${encodeURIComponent(v.nom)}" style="width:100%;justify-content:center">Être rappelé</a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>

${blocFaq(faq, `Questions fréquentes — ${v.nom}`)}

<section class="alt tight">
  <div class="wrap">
    <div class="sec-head center" style="margin-bottom:28px"><h2 style="font-size:1.5rem">Nos autres secteurs d'intervention</h2></div>
    <div class="zone-list" style="justify-content:center">
      ${villes.filter((x) => x.slug !== v.slug).map((x) => `<a href="/zone-intervention/${x.slug}">${x.nom}</a>`).join('\n      ')}
    </div>
  </div>
</section>

${blocContact({ titre: `Nous contacter depuis ${v.nom}`, texte: `Projet d'équipement, remplacement de matériel, panne à traiter ou audit de votre parc : décrivez votre besoin, nous répondons sous 24 heures ouvrées.` })}`;

  return page(
    {
      titre: v.titreSeo,
      description: v.description,
      chemin: `/zone-intervention/${v.slug}`,
      schemas: [schemaAriane(fil), lb, schemaFaq(faq)],
    },
    corps,
    nav
  );
}

// ===========================================================================
// CONSEILS — hub + articles
// ===========================================================================
function conseilsHub() {
  const fil = [{ nom: 'Accueil', url: '/' }, { nom: 'Conseils', url: '/conseils' }];
  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">Conseils</p>
    <h1>Guides pratiques pour les professionnels de la restauration</h1>
    <p>Réglementation, hygiène, entretien, choix d'équipement : ce que nous expliquons tous les jours à nos clients, mis par écrit. Sans jargon et sans argumentaire déguisé.</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid3">
      ${articles.map(carteArticle).join('\n      ')}
    </div>
  </div>
</section>

${blocCtaFinal('Une question qui n’a pas sa réponse ici ?', "Nos techniciens répondent volontiers par téléphone, même sans projet à la clé. C'est souvent comme ça que commencent nos meilleures relations client.")}`;

  return page(
    {
      titre: `Conseils — Cuisine professionnelle, hygiène et entretien | ${site.nom}`,
      description:
        "Guides pratiques pour les professionnels de la restauration : réglementation F-Gas, températures HACCP, entretien du froid, choix d'un four mixte.",
      chemin: '/conseils',
      schemas: [
        schemaAriane(fil),
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `Conseils ${site.nom}`,
          url: url('/conseils'),
          publisher: { '@id': url('/#entreprise') },
        },
      ],
    },
    corps,
    nav
  );
}

function articlePage(a) {
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: 'Conseils', url: '/conseils' },
    { nom: a.titre, url: `/conseils/${a.slug}` },
  ];
  // Sélection glissante : on prend les 3 articles qui SUIVENT celui-ci dans la
  // liste, en repartant au début si besoin. Chaque article reçoit ainsi le même
  // nombre de liens entrants, au lieu que les 3 premiers captent tout.
  const i = articles.findIndex((x) => x.slug === a.slug);
  const autres = [1, 2, 3].map((d) => articles[(i + d) % articles.length]).filter((x) => x && x.slug !== a.slug);
  const schemas = [
    schemaAriane(fil),
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.titre,
      description: a.description,
      datePublished: a.date,
      dateModified: a.date,
      inLanguage: 'fr-FR',
      articleSection: a.categorie,
      mainEntityOfPage: url(`/conseils/${a.slug}`),
      author: { '@type': 'Organization', name: site.nom, url: url('/') },
      publisher: { '@id': url('/#entreprise') },
      image: url('/assets/logo-sodilame-600.png'),
    },
  ];
  if (a.faq) schemas.push(schemaFaq(a.faq));

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">${esc(a.categorie)}</p>
    <h1>${esc(a.titre)}</h1>
    <p>${esc(a.resume)}</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid-art">
      <article class="prose">
        <p class="postmeta">Publié le ${esc(a.dateAffichee)} · ${esc(a.categorie)} · par l'équipe ${site.nom}</p>
        ${a.corps}
        ${a.faq ? `<h2>Questions fréquentes</h2>${a.faq.map((f) => `<h3>${esc(f.q)}</h3>${f.r}`).join('\n')}` : ''}
      </article>
      <aside>
        ${photo(a.photo)}
        <div class="card" style="position:sticky;top:110px">
          <h2 style="font-size:1.1rem">Besoin d'un avis sur votre parc ?</h2>
          <p style="font-size:.94rem;color:var(--muted)">Un technicien passe dans votre établissement, recense vos équipements et vous remet un rapport avec les priorités. Gratuit et sans engagement.</p>
          <div class="btn-row">
            <a class="btn btn-primary btn-sm" href="/contact?sujet=audit" style="width:100%;justify-content:center">Demander l'audit gratuit</a>
          </div>
          <p style="font-size:.83rem;color:var(--muted);margin:1rem 0 0;text-align:center">ou appelez le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a></p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="sec-head center"><p class="eyebrow">À lire aussi</p><h2>Nos autres conseils</h2></div>
    <div class="grid3">${autres.map(carteArticle).join('\n      ')}</div>
  </div>
</section>

${blocCtaFinal('Une cuisine qui tourne, c’est notre métier', "Installation, dépannage, entretien : parlons de ce dont vous avez besoin.")}`;

  return page(
    { titre: a.titreSeo, description: a.description, chemin: `/conseils/${a.slug}`, schemas, typeOg: 'article' },
    corps,
    nav
  );
}

// ===========================================================================
// À PROPOS
// ===========================================================================
function aPropos() {
  const fil = [{ nom: 'Accueil', url: '/' }, { nom: "L'entreprise", url: '/a-propos' }];
  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">L'entreprise</p>
    <h1>${site.ansExperience} ans de métier en Provence, une nouvelle équipe aux commandes</h1>
    <p>${site.nom} équipe et entretient les cuisines professionnelles de la région depuis ${site.anneeCreation}. L'entreprise a changé de mains ; l'équipe technique, elle, est restée.</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid-art">
      <div class="prose">
        <h2>Une entreprise de techniciens</h2>
        <p>${site.nom} n'est pas un distributeur qui pose du matériel : c'est une entreprise technique qui vend du matériel. La nuance a l'air rhétorique, elle est en réalité structurante. Nos techniciens sont salariés, formés aux marques que nous installons, et ce sont eux qui reviennent quand quelque chose ne va pas.</p>
        <p>C'est ce qui explique nos choix : un stock de pièces détachées maintenu sur place plutôt qu'une commande à la demande, un catalogue volontairement limité aux matériels dont nous savons assurer le SAV, et un refus assez ferme de sous-traiter la maintenance.</p>

        <h2>Une reprise, pas une rupture</h2>
        <p>L'entreprise est aujourd'hui dirigée par Romain et Mathieu, qui en ont repris les rênes après quarante ans d'activité sous la direction précédente. Le projet n'est pas de transformer ${site.nom} en autre chose, mais de lui donner les moyens de faire mieux ce qu'elle fait déjà.</p>
        <p>Les trois chantiers que nous nous sommes fixés :</p>
        <ul>
          <li><b>La réactivité.</b> Un stock de pièces plus large, une organisation des tournées revue, un standard qui qualifie mieux les demandes pour éviter les déplacements inutiles.</li>
          <li><b>La transparence.</b> Un espace client où vous retrouvez votre parc, vos rapports d'intervention et vos documents réglementaires, sans avoir à nous les redemander.</li>
          <li><b>La prévention.</b> Développer les contrats d'entretien, parce qu'une cuisine entretenue coûte moins cher qu'une cuisine dépannée.</li>
        </ul>

        <h2>Ce que nous ne ferons pas</h2>
        <p>Nous ne promettrons pas d'intervenir « en moins de deux heures partout ». Nous ne vendrons pas un matériel que nous ne savons pas dépanner. Et nous ne facturerons pas une réparation sur un appareil que nous savons condamné.</p>
        <p>Ce sont trois règles simples, et elles nous coûtent régulièrement des affaires. Elles nous valent aussi des clients qui sont là depuis vingt ans.</p>

        <h2>Nos engagements concrets</h2>
        <ul class="ul-check">
          <li>Réponse à toute demande sous 24 heures ouvrées</li>
          <li>Déplacement d'étude et audit de parc gratuits sur notre zone</li>
          <li>Devis détaillé poste par poste, sans forfait opaque</li>
          <li>Techniciens salariés ${site.nom}, jamais de sous-traitance de la maintenance</li>
          <li>Documents réglementaires remis systématiquement après intervention</li>
        </ul>
      </div>
      <aside>
        <div class="card" style="margin-bottom:20px">
          <h2 style="font-size:1.05rem">${site.nom} en bref</h2>
          <div class="tier" style="border-color:var(--line);color:var(--ink)"><b style="color:var(--navy)">Création</b><span style="color:var(--terra)">${site.anneeCreation}</span></div>
          <div class="tier" style="border-color:var(--line)"><b style="color:var(--navy)">Siège</b><span style="color:var(--terra)">${A.ville}</span></div>
          <div class="tier" style="border-color:var(--line)"><b style="color:var(--navy)">Zone</b><span style="color:var(--terra)">13 · 30 · 84</span></div>
          <div class="tier" style="border-color:var(--line)"><b style="color:var(--navy)">Métier</b><span style="color:var(--terra)">Cuisine pro</span></div>
        </div>
        ${photo({ f: 'four-mixte-rational-icombi-pro-20-niveaux', w: 1050, h: 1400, alt: 'Four mixte Rational iCombi Pro 20 niveaux mis en service par SODILAME en cuisine de collectivité' }, 'Mise en service d’un four mixte 20 niveaux')}
      </aside>
    </div>
  </div>
</section>

${blocEtapes()}
${blocSecteurs('Ceux que nous accompagnons au quotidien')}
${blocContact({ titre: 'Faisons connaissance', texte: "Un projet, une reprise d'établissement, un parc à remettre à niveau : le premier échange ne coûte rien et clarifie souvent beaucoup de choses." })}`;

  return page(
    {
      titre: `L'entreprise — ${site.nom}, cuisines professionnelles depuis ${site.anneeCreation}`,
      description: `${site.nom}, installateur de cuisines professionnelles à ${A.ville} depuis ${site.anneeCreation} : techniciens salariés, stock de pièces sur place, contrats d'entretien.`,
      chemin: '/a-propos',
      schemas: [schemaAriane(fil), schemaLocalBusiness()],
    },
    corps,
    nav
  );
}

// ===========================================================================
// RECRUTEMENT
//
// Deux niveaux : /recrutement présente l'entreprise vue du candidat et liste
// les postes ouverts ; /recrutement/<slug> porte l'offre complète, son balisage
// JobPosting et le formulaire de candidature.
//
// Pourquoi deux pages pour une seule offre : c'est la page de l'offre que
// Google for Jobs indexe et affiche, et c'est son adresse qu'on colle dans une
// annonce Facebook ou sur France Travail. Elle doit vivre à part, survivre à
// l'ajout d'un second poste, et pouvoir basculer en « pourvu » sans emporter
// la page de recrutement avec elle.
// ===========================================================================

/**
 * Balisage JobPosting lu par Google for Jobs.
 *
 * Trois champs décident de l'affichage ou du rejet de l'offre, et c'est pour
 * eux que ce bloc existe : `datePosted`, `validThrough` (une offre sans date de
 * fin finit par être signalée en Search Console) et `hiringOrganization`, qui
 * raccroche l'annonce à la fiche de l'entreprise plutôt qu'à un agrégateur.
 */
function schemaOffre(o) {
  const texte = (t) => t.replace(/<[^>]+>/g, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: o.titre,
    description:
      `<p>${esc(o.accroche)}</p><p>${esc(o.resume)}</p>` +
      `<h3>Missions</h3><ul>${o.missions.map((m) => `<li>${esc(texte(m))}</li>`).join('')}</ul>` +
      `<h3>Profil</h3><ul>${o.profil.map((p) => `<li>${esc(texte(p))}</li>`).join('')}</ul>` +
      `<h3>Conditions</h3><ul>${o.avantages.map((a) => `<li>${esc(a.titre)} — ${esc(a.detail)}</li>`).join('')}</ul>`,
    identifier: { '@type': 'PropertyValue', name: site.nom, value: o.slug },
    datePosted: o.publieeLe,
    validThrough: `${o.valideJusquau}T23:59:59+01:00`,
    employmentType: o.contratSchema,
    hiringOrganization: {
      '@type': 'Organization',
      name: site.nom,
      sameAs: site.domaine,
      logo: url('/assets/logo-sodilame-600.png'),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${A.rue}, ${A.complement}`,
        addressLocality: A.ville,
        postalCode: A.codePostal,
        addressRegion: A.region,
        addressCountry: A.pays,
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: o.salaire.devise,
      value: {
        '@type': 'QuantitativeValue',
        minValue: o.salaire.min,
        maxValue: o.salaire.max,
        unitText: o.salaire.unite,
      },
    },
    directApply: true,
    industry: 'Cuisine professionnelle, froid commercial, laverie',
    qualifications: 'Permis B. Bases en électricité et en plomberie. Débutant motivé accepté, formation assurée en interne.',
  };
}

/** Formulaire de candidature — commun à toutes les offres. */
function formulaireCandidature(posteDefaut = '') {
  return `<form class="devis" id="form-candidature" method="post" action="/api/candidature" novalidate
      data-confirme="Nous avons bien reçu votre candidature.">
  <h2>Postuler</h2>
  <div class="field"><label for="k-poste">Poste *</label>
    <select id="k-poste" name="poste" required>
      ${postes.map((p) => `<option${p === posteDefaut ? ' selected' : ''}>${esc(p)}</option>`).join('\n      ')}
    </select>
  </div>
  <div class="field"><label for="k-nom">Nom et prénom *</label><input id="k-nom" name="nom" autocomplete="name" required></div>
  <div class="row2">
    <div class="field"><label for="k-tel">Téléphone *</label><input id="k-tel" name="telephone" type="tel" autocomplete="tel" required></div>
    <div class="field"><label for="k-email">E-mail *</label><input id="k-email" name="email" type="email" autocomplete="email" required></div>
  </div>
  <div class="field"><label for="k-ville">Ville</label><input id="k-ville" name="ville" autocomplete="address-level2" placeholder="Arles, Salon, Nîmes…"></div>
  <div class="field"><label for="k-message">Quelques mots sur vous</label><textarea id="k-message" name="message" placeholder="Ce que vous faites aujourd'hui, ce qui vous intéresse dans ce poste, vos disponibilités. Trois lignes suffisent."></textarea></div>

  <div class="cv-zone">
    <label class="cv-btn" for="k-cv">
      ${svg('doc')}
      <span><b>Joindre votre CV</b><small>PDF, Word ou photo — 4 Mo maximum</small></span>
    </label>
    <input id="k-cv" name="cv" type="file" accept=".pdf,.doc,.docx,image/*" hidden>
    <p class="cv-etat" id="k-cv-etat" hidden></p>
    <p class="cv-note">Pas de CV sous la main ? Envoyez quand même : laissez votre numéro, nous vous rappelons.</p>
  </div>

  <label class="consent" style="font-size:.8rem;color:var(--muted);font-weight:400"><input type="checkbox" name="permis"> J'ai le permis B</label>
  <div class="hp" aria-hidden="true"><label for="societe_web">Ne pas remplir</label><input id="societe_web" name="societe_web" tabindex="-1" autocomplete="off"></div>
  <label class="consent"><input type="checkbox" name="consentement" required> J'accepte que mes informations et mon CV soient utilisés pour étudier ma candidature. Ils sont conservés deux ans au plus. <a href="/politique-de-confidentialite">Politique de confidentialité</a>.</label>
  <button class="btn btn-primary" type="submit" id="btn-candidature" style="width:100%;justify-content:center">Envoyer ma candidature</button>
  <p class="formmsg" id="candidature-msg" role="status" aria-live="polite"></p>
  <p style="font-size:.76rem;color:var(--muted);margin:.9rem 0 0;text-align:center">Vous préférez en parler&nbsp;? Appelez le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a></p>
</form>`;
}

function recrutementHub() {
  const fil = [{ nom: 'Accueil', url: '/' }, { nom: 'Recrutement', url: '/recrutement' }];

  const cartes = offresActives.length
    ? offresActives
        .map(
          (o) => `<a class="card" href="/recrutement/${o.slug}">
          <div class="ico">${svg('outils')}</div>
          <h3>${esc(o.titreCourt)} (H/F)</h3>
          <p>${esc(o.accroche)}</p>
          <p style="margin-top:.9rem;font-size:.86rem;color:var(--navy)"><b>${esc(o.contrat)}</b> · ${esc(o.tempsTravail)} · ${esc(o.lieu)}</p>
          <span class="more">Lire l'offre et postuler →</span>
        </a>`
        )
        .join('\n        ')
    : `<div class="card"><h3>Pas de poste ouvert en ce moment</h3>
         <p>Nous recrutons régulièrement, et nous gardons les candidatures. Si le métier vous intéresse, envoyez-nous votre CV : nous reprenons contact dès qu'un poste s'ouvre.</p>
         <span class="more">Candidature spontanée ci-dessous ↓</span></div>`;

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">Recrutement</p>
    <h1>Travailler chez ${site.nom}</h1>
    <p>Ce sont nos techniciens qui font l'entreprise. Nous les recrutons pour leur curiosité et leur sens pratique, puis nous les formons sur nos machines : ce métier-là s'apprend sur le terrain.</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid-art">
      <div class="prose">
        <h2>Le métier, tel qu'il est</h2>
        <p>Un technicien de ${site.nom} part le matin avec sa tournée, son véhicule et ses pièces. Il passe la journée chez des restaurateurs, des hôteliers, des boulangers, des cuisines de collectivité. Il ouvre un four qui ne monte plus en température, démonte une pompe de lave-vaisselle, recherche une fuite sur un groupe froid, raccorde une machine neuve.</p>
        <p>C'est un travail où l'on ne fait pas deux fois la même journée, où l'on est seul face au problème, et où l'on sait tout de suite si ce qu'on a fait fonctionne. Pour certains, c'est exactement ce qu'ils cherchent. Pour d'autres, c'est épuisant. Nous préférons le dire avant.</p>

        <h2>Ce que nous apportons</h2>
        <p>On n'apprend pas ce matériel dans une salle de classe : on l'apprend à côté de quelqu'un qui le connaît déjà, machine après machine. C'est pour cela que nous prenons des débutants motivés, et que nous n'exigeons pas d'expérience du secteur.</p>
        <ul class="ul-check">
          <li>Un binôme pendant la période d'apprentissage : vous ne partez pas seul sur une panne que vous ne connaissez pas.</li>
          <li>Les formations des constructeurs dont nous sommes revendeurs.</li>
          <li>Un atelier et un stock de pièces à ${A.ville}, pas une commande à passer à chaque intervention.</li>
          <li>Une maison de ${site.ansExperience} ans, reprise en 2026 par deux associés qui y remettent des moyens.</li>
        </ul>

        <h2>Ce que nous attendons</h2>
        <p>De la curiosité technique, de la rigueur, et une bonne tenue chez le client : nos techniciens entrent dans la cuisine de gens qui travaillent, souvent en plein service. Ce sont eux l'image de l'entreprise, bien plus que ce site.</p>
        <p>Et une qualité qui ne se voit sur aucun CV : savoir dire « je ne sais pas, j'appelle ». Chez nous, c'est la bonne réponse.</p>
      </div>
      <aside>
        <div class="card" style="margin-bottom:20px">
          <h2 style="font-size:1.05rem">En bref</h2>
          <div class="tier" style="border-color:var(--line);color:var(--ink)"><b style="color:var(--navy)">Basés à</b><span style="color:var(--terra)">${A.ville}</span></div>
          <div class="tier" style="border-color:var(--line)"><b style="color:var(--navy)">Zone</b><span style="color:var(--terra)">13 · 30 · 84</span></div>
          <div class="tier" style="border-color:var(--line)"><b style="color:var(--navy)">Horaires</b><span style="color:var(--terra)">Lun–Ven</span></div>
          <div class="tier" style="border-color:var(--line)"><b style="color:var(--navy)">Débutants</b><span style="color:var(--terra)">Acceptés</span></div>
        </div>
        <div class="callout" style="margin:0">
          <p><b>Vous connaissez quelqu'un&nbsp;?</b></p>
          <p>Le bouche-à-oreille reste notre meilleur recrutement. Transmettez-lui cette page, ou donnez-lui notre numéro&nbsp;: <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a>.</p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <p class="eyebrow">Postes ouverts</p>
    <h2>${offresActives.length ? `${offresActives.length} poste${offresActives.length > 1 ? 's' : ''} à pourvoir` : 'Aucun poste ouvert aujourd’hui'}</h2>
    <div class="grid3" style="margin-top:28px">
        ${cartes}
    </div>
  </div>
</section>

<section id="postuler">
  <div class="wrap">
    <div class="grid2 top">
      <div>
        <p class="eyebrow">Candidature</p>
        <h2>Envoyez-nous votre candidature</h2>
        <p>Votre candidature est lue par la direction, et nous revenons vers vous — y compris quand la réponse est non. C'est la moindre des choses, et c'est assez rare pour être écrit.</p>
        <p>Vous pouvez aussi écrire directement à <a href="mailto:${emailRecrutement}">${emailRecrutement}</a> ou appeler le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a>.</p>
      </div>
      ${formulaireCandidature()}
    </div>
  </div>
</section>`;

  return page(
    {
      titre: `Recrutement — ${site.nom} recrute en cuisine professionnelle à ${A.ville}`,
      description: `${site.nom} recrute des techniciens de maintenance en cuisine professionnelle à ${A.ville} (13). Débutants acceptés, formation assurée, véhicule fourni. Postulez en ligne.`,
      chemin: '/recrutement',
      schemas: [schemaAriane(fil), schemaLocalBusiness()],
    },
    corps,
    nav
  );
}

function offrePage(o) {
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: 'Recrutement', url: '/recrutement' },
    { nom: o.titreCourt, url: `/recrutement/${o.slug}` },
  ];

  const faitsSaillants = [
    ['Contrat', `${o.contrat} — ${o.tempsTravail}`],
    ['Lieu', o.lieu],
    ['Rémunération', o.salaire.texte],
    ['Expérience', o.debutantAccepte ? 'Débutant accepté, formation assurée' : 'Expérience souhaitée'],
  ];

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">${esc(o.contrat)} · ${esc(o.lieu)}</p>
    <h1>${esc(o.titre)}</h1>
    <p>${esc(o.accroche)}</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid-art">
      <div class="prose">
        ${o.active ? '' : `<div class="callout"><p><b>Ce poste est pourvu.</b> L'offre reste en ligne pour mémoire. Nous recrutons régulièrement : envoyez une candidature spontanée, nous la conservons.</p></div>`}
        <p class="lead">${esc(o.resume)}</p>

        <h2>Vos missions</h2>
        <ul>
          ${o.missions.map((m) => `<li>${m}</li>`).join('\n          ')}
        </ul>

        <h2>Le profil que nous cherchons</h2>
        <ul>
          ${o.profil.map((p) => `<li>${p}</li>`).join('\n          ')}
        </ul>
        ${
          o.debutantAccepte
            ? `<div class="callout">
          <p><b>Débutant&nbsp;? Postulez quand même.</b></p>
          <p>Personne ne sort d'une formation en « dépannage de cuisine professionnelle » : cela n'existe pas. Nous formons sur notre matériel, en binôme, et c'est ainsi que la plupart de nos techniciens ont appris. Ce que nous ne pouvons pas vous apprendre, c'est l'envie de comprendre comment marche une machine.</p>
        </div>`
            : ''
        }

        <h2>Ce que nous proposons</h2>
        <ul class="ul-check">
          ${o.avantages.map((a) => `<li><b>${esc(a.titre)}</b> — ${esc(a.detail)}</li>`).join('\n          ')}
        </ul>
        <p><b>${esc(o.salaire.texte)}</b>, selon votre expérience et votre autonomie. Nous en parlons dès le premier échange : personne n'a de temps à perdre sur un poste dont la rémunération ne conviendra pas.</p>

        <h2>Ce que nous préférons dire tout de suite</h2>
        <ul>
          ${o.franchise.map((f) => `<li>${esc(f)}</li>`).join('\n          ')}
        </ul>
        <p>Si ces trois points ne vous font pas reculer, il y a de fortes chances que le poste vous plaise.</p>

        <h2>Comment ça se passe ensuite</h2>
        <p>Vous envoyez votre candidature avec le formulaire ci-contre, ou vous appelez. Nous la lisons et nous répondons, même quand c'est non. Si le profil correspond, nous vous proposons de venir à l'atelier de ${A.ville} : vous verrez le matériel, l'équipe et les véhicules, et vous poserez vos questions avant de vous engager.</p>
      </div>

      <aside>
        <div class="card" style="margin-bottom:20px">
          <h2 style="font-size:1.05rem">L'essentiel</h2>
          ${faitsSaillants
            .map(
              ([l, v]) =>
                `<div class="tier" style="border-color:var(--line);color:var(--ink);align-items:flex-start"><b style="color:var(--navy);white-space:nowrap">${esc(l)}</b><span style="color:var(--terra);text-align:right">${esc(v)}</span></div>`
            )
            .join('\n          ')}
          <a class="btn btn-primary btn-sm" href="#postuler" style="width:100%;justify-content:center;margin-top:18px">Postuler</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="alt" id="postuler">
  <div class="wrap">
    <div class="grid2 top">
      <div>
        <p class="eyebrow">Candidature</p>
        <h2>Postuler à ce poste</h2>
        <p>Trois lignes et un CV suffisent. Si vous n'avez pas de CV à jour, envoyez quand même le formulaire avec votre numéro : nous vous rappelons, et c'est souvent plus parlant qu'une feuille A4.</p>
        <div class="info-row"><i>${svg('tel')}</i><span><b>Téléphone</b><a href="tel:${site.telephoneE164}">${site.telephone}</a></span></div>
        <div class="info-row"><i>${svg('pin')}</i><span><b>Atelier</b><span>${A.rue} — ${A.complement}<br>${A.codePostal} ${A.ville}</span></span></div>
      </div>
      ${formulaireCandidature(o.titreCourt)}
    </div>
  </div>
</section>

${blocCtaFinal(
  'Un doute sur le poste ?',
  `Appelez-nous. Cinq minutes au téléphone valent mieux qu'une candidature qu'on hésite à envoyer.`
)}`;

  return page(
    {
      titre: `${o.titre} — ${o.contrat} à ${A.ville} | ${site.nom}`,
      description: `${site.nom} recrute un ${o.titreCourt.toLowerCase()} en ${o.contrat} à ${o.lieu}. ${o.debutantAccepte ? 'Débutant accepté, formation assurée. ' : ''}${o.salaire.texte}. Véhicule et outillage fournis.`,
      chemin: `/recrutement/${o.slug}`,
      schemas: [schemaAriane(fil), schemaOffre(o)],
    },
    corps,
    nav
  );
}

// ===========================================================================
// MARQUES
//
// Une page par marque distribuée, regroupées par univers sur /marques.
//
// Pourquoi ces pages existent : « four Rational Arles », « dépannage
// Winterhalter Nîmes », « armoire Infrico Avignon » sont des recherches que
// personne ne fait sur un hub générique. Chaque page croise une marque et un
// territoire, et c'est ce croisement qui se positionne.
//
// Le piège de l'exercice, c'est la page satellite : dix-neuf pages qui disent
// la même chose avec un nom différent, que Google classe en contenu dupliqué
// et qu'un visiteur reconnaît en trois secondes. D'où le champ `aRetenir` de
// data/marques.mjs : chaque page porte au moins deux faits techniques vrais et
// propres à SA marque, relevés dans la documentation constructeur. Si on ne
// peut pas écrire ces deux faits, la page n'a pas lieu d'être.
// ===========================================================================

/**
 * Balisage de la page marque.
 *
 * C'est un `Service` rendu PAR SODILAME SUR la marque — pas une page de la
 * marque. La nuance n'est pas cosmétique : se déclarer éditeur du contenu
 * d'une marque qu'on ne possède pas est une erreur que Google sanctionne, et
 * qu'un fabricant peut contester.
 */
function schemaMarque(m) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${m.nom} — vente, installation et dépannage`,
    serviceType: `Distribution et maintenance de matériel ${m.nom}`,
    brand: { '@type': 'Brand', name: m.nom },
    provider: {
      '@type': 'LocalBusiness',
      name: site.nom,
      telephone: site.telephoneE164,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${A.rue}, ${A.complement}`,
        addressLocality: A.ville,
        postalCode: A.codePostal,
        addressRegion: A.region,
        addressCountry: A.pays,
      },
    },
    areaServed: ZONE_DEPARTEMENTS.map((d) => ({ '@type': 'AdministrativeArea', name: d })),
    url: url(`/marques/${m.slug}`),
  };
}

// Les trois départements où SODILAME vend ET dépanne. C'est la même liste qui
// sert au balisage et au texte : le jour où la zone bouge, elle bouge partout.
const ZONE_DEPARTEMENTS = ['Bouches-du-Rhône (13)', 'Gard (30)', 'Vaucluse (84)'];

/** Le bloc « nous vendons et nous dépannons », commun à toutes les pages marque. */
function blocZoneMarque(m) {
  return `<div class="callout">
  <p><b>Nous vendons ce que nous savons dépanner.</b></p>
  <p>Le matériel ${esc(m.nom)} est livré, installé et mis en service par nos équipes dans les ${ZONE_DEPARTEMENTS.join(', ')} — et c'est le même technicien qui revient quand quelque chose ne va pas. Nous ne référençons pas une marque dont nous ne saurions pas assurer le service après-vente.</p>
  <p><a href="/zone-intervention"><b>Voir le détail de notre zone d'intervention →</b></a></p>
</div>`;
}

function marquesHub() {
  const fil = [{ nom: 'Accueil', url: '/' }, { nom: 'Marques', url: '/marques' }];

  const blocs = universMarques
    .map((u) => {
      const liste = marquesDeLUnivers(u.slug);
      if (!liste.length) return '';
      return `<section class="${u.slug === 'froid' || u.slug === 'blanchisserie' || u.slug === 'residentiel' ? 'alt' : ''}">
  <div class="wrap">
    <p class="eyebrow">${esc(u.nom)}</p>
    <h2>${esc(u.nom)}</h2>
    <p style="max-width:62ch">${esc(u.intro)}</p>
    <div class="grid3" style="margin-top:28px">
      ${liste
        .map(
          (m) => `<a class="card" href="/marques/${m.slug}">
        ${logoMarque(m, 'logo-carte')}
        <h3>${esc(m.nom)}</h3>
        <p>${esc(m.resume)}</p>
        <p style="margin-top:.8rem;font-size:.84rem;color:var(--navy)"><b>${esc(m.pays)}</b>${m.depuis ? ` · depuis ${m.depuis}` : ''}</p>
        <span class="more">Voir la marque →</span>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;
    })
    .join('\n');

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">Marques</p>
    <h1>Les marques que nous distribuons</h1>
    <p>${totalMarques} marques, et une règle qui ne bouge pas : nous ne vendons que du matériel que nos techniciens savent installer, régler et réparer. C'est ce qui explique que ce catalogue soit resté volontairement limité.</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap-sm">
    <div class="prose">
      <h2>Pourquoi cette liste et pas une autre</h2>
      <p>Un distributeur peut référencer trois cents marques : il suffit de les commander. Entretenir un parc, c'est autre chose. Il faut connaître la machine, avoir suivi la formation du constructeur, tenir les pièces d'usure en stock et savoir où trouver les autres en vingt-quatre heures.</p>
      <p>Chaque marque de cette page représente donc un engagement : celui de pouvoir intervenir dessus. Quand un fabricant ne nous le permet pas, nous ne le vendons pas — c'est plus honnête que de livrer un appareil et de renvoyer le client vers un numéro national.</p>
      <p>Nous sommes <b>distributeur agréé</b> des marques listées ici, et nous intervenons dans les ${ZONE_DEPARTEMENTS.join(', ')}.</p>
    </div>
  </div>
</section>

${blocs}

${blocCtaFinal(
  'Une marque qui ne figure pas dans cette liste ?',
  `Nous dépannons aussi du matériel que nous n'avons pas vendu, et nous pouvons souvent fournir la pièce. Appelez-nous avec la plaque signalétique sous les yeux : c'est le plus rapide.`
)}`;

  return page(
    {
      titre: `Marques distribuées — ${site.nom}, cuisines professionnelles en Provence`,
      description: `${totalMarques} marques de matériel de cuisine professionnelle distribuées, installées et dépannées par ${site.nom} dans les Bouches-du-Rhône, le Gard et le Vaucluse : RATIONAL, Winterhalter, UNOX, Infrico, Robot Coupe…`,
      chemin: '/marques',
      schemas: [schemaAriane(fil), schemaLocalBusiness()],
    },
    corps,
    nav
  );
}

function marquePage(m) {
  const univers = universMarques.find((u) => u.slug === m.univers);
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: 'Marques', url: '/marques' },
    { nom: m.nom, url: `/marques/${m.slug}` },
  ];

  const servicesLies = (m.services || [])
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  // Gaggenau est de l'électroménager domestique : la page ne promet ni SAV de
  // production ni contrat d'entretien, et le dit dès le chapeau.
  const verbe = m.domestique
    ? `Nous installons le matériel ${m.nom} dans les cuisines privées`
    : `Nous vendons, installons et dépannons le matériel ${m.nom}`;

  // Deux lignes courtes plutôt qu'une longue : « Allemagne — Landsberg am Lech,
  // Bavière » sur une seule ligne débordait de la carte, le libellé de gauche
  // étant en nowrap.
  const identite = [
    ['Origine', m.pays],
    m.lieu ? ['Site', m.lieu] : null,
    m.depuis ? ['Depuis', String(m.depuis)] : null,
    ['Notre statut', m.agree ? 'Distributeur agréé' : 'Vente, installation et dépannage'],
    ['Zone', '13 · 30 · 84'],
  ].filter(Boolean);

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">${esc(univers ? univers.nom : 'Marque')}${m.agree ? ' · Distributeur agréé' : ''}</p>
    <h1>${esc(m.nom)} — ${m.domestique ? 'installation en cuisine privée' : 'vente, installation et dépannage'} en Provence</h1>
    <p>${esc(m.accroche)}</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid-art">
      <div class="prose">
        <h2>La marque</h2>
        ${m.description.map((p) => `<p>${p}</p>`).join('\n        ')}

        <h3>Ce qu'elle fabrique</h3>
        <ul>
          ${m.familles.map((f) => `<li>${esc(f)}</li>`).join('\n          ')}
        </ul>

        <h3>Gammes que nous proposons</h3>
        <p>${m.gammes.map((g) => `<b>${esc(g)}</b>`).join(' · ')}</p>

        <h2>Ce qu'il faut savoir avant d'acheter</h2>
        <p>Trois points que nous répétons à chaque client, parce qu'ils se décident avant la commande et se paient cher après.</p>
        <ul class="ul-check">
          ${m.aRetenir.map((r) => `<li>${r}</li>`).join('\n          ')}
        </ul>

        <h2>${esc(verbe)}</h2>
        <p>${
          m.domestique
            ? `Notre métier d'installateur s'applique directement : encastrement, raccordements, extraction, mise en service. Pour une cuisine de production, en revanche, nous vous orienterons vers une marque professionnelle — c'est dans votre intérêt, pas dans le nôtre.`
            : `Étude et chiffrage, livraison, installation et raccordement, mise en service et prise en main par votre équipe, puis dépannage et entretien. Nous tenons les pièces d'usure courantes à notre atelier de ${A.ville}, et nos techniciens sont formés sur les matériels que nous installons.`
        }</p>
        ${blocZoneMarque(m)}

        <h3>Qui l'utilise chez nous</h3>
        <p>${m.clients.map((c) => esc(c)).join(' · ')}</p>
      </div>

      <aside>
        <div class="card" style="margin-bottom:20px">
          ${logoMarque(m, 'logo-fiche')}
          <h2 style="font-size:1.05rem">${esc(m.nom)} en bref</h2>
          ${identite
            .map(
              ([l, v]) =>
                `<div class="tier" style="border-color:var(--line);color:var(--ink);align-items:flex-start"><b style="color:var(--navy);white-space:nowrap">${esc(l)}</b><span style="color:var(--terra);text-align:right;min-width:0;overflow-wrap:anywhere">${esc(v)}</span></div>`
            )
            .join('\n          ')}
          <a class="btn btn-primary btn-sm" href="/contact?sujet=materiel" style="width:100%;justify-content:center;margin-top:18px">Demander un devis</a>
          <a class="btn btn-outline btn-sm" href="tel:${site.telephoneE164}" style="width:100%;justify-content:center;margin-top:.6rem">${site.telephone}</a>
          <p style="font-size:.76rem;color:var(--muted);margin:.9rem 0 0;text-align:center">Site du fabricant&nbsp;: <a href="${m.site}" target="_blank" rel="noopener nofollow">${esc(m.site.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a></p>
        </div>

        ${
          m.boutique
            ? `<div class="card" style="margin-bottom:20px">
          <div class="ico">${svg('panier')}</div>
          <h3 style="font-size:1rem">${esc(m.boutiqueTitre || 'Consommables en boutique')}</h3>
          <p>${esc(m.boutiqueTexte)}.</p>
          <a class="btn btn-outline btn-sm" href="${m.boutiqueUrl || urlCollection(m.boutique)}" style="width:100%;justify-content:center;margin-top:1rem">Voir les produits →</a>
        </div>`
            : ''
        }

        ${
          servicesLies.length
            ? `<div class="card">
          <h3 style="font-size:1rem">Nos services sur cette marque</h3>
          <ul style="margin:.8rem 0 0;padding-left:1.1rem;font-size:.92rem">
            ${servicesLies.map((s) => `<li style="margin-bottom:.5rem"><a href="/services/${s.slug}">${esc(s.nomCourt)}</a></li>`).join('\n            ')}
          </ul>
        </div>`
            : ''
        }
      </aside>
    </div>
  </div>
</section>

${blocRealisations(realisationsDeMarque(m.slug))}

<section class="alt">
  <div class="wrap">
    <p class="eyebrow">Autres marques</p>
    <h2>${esc(univers ? univers.nom : 'Nos marques')}</h2>
    <div class="grid3" style="margin-top:24px">
      ${marquesDeLUnivers(m.univers)
        .filter((x) => x.slug !== m.slug)
        .map(
          (x) => `<a class="card" href="/marques/${x.slug}">
        <h3>${esc(x.nom)}</h3>
        <p>${esc(x.resume)}</p>
        <span class="more">Voir la marque →</span>
      </a>`
        )
        .join('\n      ')}
      <a class="card" href="/marques">
        <h3>Toutes nos marques</h3>
        <p>${totalMarques} marques distribuées, installées et dépannées en Provence.</p>
        <span class="more">Voir la liste →</span>
      </a>
    </div>
  </div>
</section>

${blocFaq(faqDe(m.slug), `Questions fréquentes — ${m.nom}`)}

${blocContact({
  titre: `Un projet ou une panne sur du matériel ${m.nom} ?`,
  texte: `Décrivez-nous votre besoin : remplacement d'un appareil, équipement complet, panne à traiter ou simple question sur une référence. Nous répondons sous 24 heures ouvrées.`,
})}`;

  return page(
    {
      titre: `${m.nom} — ${m.domestique ? 'installation' : 'vente, installation et dépannage'} | ${site.nom}`,
      description: `${site.nom}, distributeur agréé ${m.nom} dans les Bouches-du-Rhône, le Gard et le Vaucluse. ${m.resume} Devis, installation, mise en service et dépannage par nos techniciens.`,
      chemin: `/marques/${m.slug}`,
      schemas: [schemaAriane(fil), schemaMarque(m), ...(faqDe(m.slug).length ? [schemaFaq(faqDe(m.slug))] : [])],
    },
    corps,
    nav
  );
}

// ===========================================================================
// CONTACT
// ===========================================================================
function contact() {
  const fil = [{ nom: 'Accueil', url: '/' }, { nom: 'Contact', url: '/contact' }];
  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">Contact</p>
    <h1>Parlons de votre cuisine</h1>
    <p>Projet d'installation, remplacement d'un équipement, panne à traiter, contrat d'entretien ou simple question technique : nous répondons sous 24 heures ouvrées.</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid2 top">
      <div>
        <h2>Nous joindre</h2>
        <div class="card" style="padding:8px 26px">
          <div class="info-row" style="border-color:var(--line)"><i style="background:var(--cream-d)">${svg('tel')}</i><span><b style="color:var(--terra)">Téléphone</b><a href="tel:${site.telephoneE164}" style="color:var(--navy);font-size:1.15rem;font-weight:700">${site.telephone}</a></span></div>
          <div class="info-row" style="border-color:var(--line)"><i style="background:var(--cream-d)">${svg('mail')}</i><span><b style="color:var(--terra)">E-mail</b><a href="mailto:${site.email}" style="color:var(--navy)">${site.email}</a></span></div>
          <div class="info-row" style="border-color:var(--line)"><i style="background:var(--cream-d)">${svg('pin')}</i><span><b style="color:var(--terra)">Adresse</b><span style="color:var(--ink)">${A.rue}<br>${A.complement}<br>${A.codePostal} ${A.ville}</span></span></div>
          <div class="info-row" style="border-color:var(--line)"><i style="background:var(--cream-d)">${svg('horloge')}</i><span><b style="color:var(--terra)">Horaires</b><span style="color:var(--ink)">${site.horaires.texte.replace(' — ', '<br>')}</span></span></div>
          <div class="info-row"><i style="background:var(--cream-d)">${svg('user')}</i><span><b style="color:var(--terra)">Déjà client ?</b><a href="${site.portail.url}" target="_blank" rel="noopener" style="color:var(--navy)">Accédez à votre espace ${site.portail.nom} →</a></span></div>
        </div>

        <div class="callout" style="margin-top:1.6rem">
          <p><b>Panne bloquante ?</b> Appelez plutôt que d'écrire. Une panne de froid ou de cuisson se qualifie en deux minutes au téléphone, et cela nous permet souvent de partir avec la bonne pièce dès le premier déplacement : <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a>.</p>
        </div>

        <div class="map-box" style="margin-top:1.6rem">${carte()}</div>
      </div>
      ${formulaire({ titre: 'Votre demande' })}
    </div>
  </div>
</section>

${blocFaq(
  [
    { q: 'Sous quel délai répondez-vous ?', r: '<p>Sous 24 heures ouvrées pour toute demande écrite. Pour une panne bloquante, le téléphone reste le canal le plus rapide.</p>' },
    { q: 'Le devis est-il payant ?', r: "<p>Non. L'étude et le devis sont gratuits, déplacement compris sur notre zone d'intervention.</p>" },
    { q: 'Puis-je passer vous voir ?', r: `<p>Oui, sur rendez-vous à ${A.ville}. C'est le meilleur moyen de voir du matériel et de discuter d'un plan. Un appel au ${site.telephone} suffit pour caler un créneau.</p>` },
  ],
  'Avant de nous écrire'
)}`;

  return page(
    {
      titre: `Contact — ${site.nom}, cuisine professionnelle à ${A.ville}`,
      description: `Contactez ${site.nom} : ${site.telephone}, ${A.rue}, ${A.codePostal} ${A.ville}. Devis gratuit, audit de parc offert, réponse sous 24 h ouvrées.`,
      chemin: '/contact',
      schemas: [
        schemaAriane(fil),
        schemaLocalBusiness(),
        { '@context': 'https://schema.org', '@type': 'ContactPage', name: `Contact ${site.nom}`, url: url('/contact') },
      ],
    },
    corps,
    nav
  );
}

// ===========================================================================
// PAGES LÉGALES
// ===========================================================================
function pageTexte({ titre, h1, description, chemin, contenu, noindex = false }) {
  const fil = [{ nom: 'Accueil', url: '/' }, { nom: h1, url: chemin }];
  const corps = `
<div class="phero">
  <div class="wrap"><h1>${esc(h1)}</h1></div>
</div>
${ariane(fil)}
<section><div class="wrap-sm"><div class="prose">${contenu}</div></div></section>`;
  return page({ titre, description, chemin, noindex, schemas: [schemaAriane(fil)] }, corps, nav);
}

function mentions() {
  const L = site.legal;
  return pageTexte({
    titre: `Mentions légales — ${site.nom} cuisines professionnelles`,
    h1: 'Mentions légales',
    description: `Mentions légales du site ${site.domaine.replace('https://', '')}, édité par ${site.nom}, installateur de cuisines professionnelles à ${A.ville} (13310).`,
    chemin: '/mentions-legales',
    contenu: `
<h2>Éditeur du site</h2>
<p><b>${L.raisonSociale}</b>${L.formeJuridique ? ` — ${L.formeJuridique}` : ''}<br>
${A.rue}, ${A.complement}<br>${A.codePostal} ${A.ville}, France<br>
Téléphone : <a href="tel:${site.telephoneE164}">${site.telephone}</a><br>
E-mail : <a href="mailto:${site.email}">${site.email}</a></p>
<p>${L.capital ? `Capital social : ${L.capital}<br>` : '<!-- Capital social : à compléter -->'}
${L.siret ? `SIRET : ${L.siret}<br>` : '<!-- SIRET : à compléter -->'}
${L.rcs ? `RCS : ${L.rcs}<br>` : '<!-- RCS : à compléter -->'}
${L.tvaIntra ? `TVA intracommunautaire : ${L.tvaIntra}` : '<!-- TVA intracommunautaire : à compléter -->'}</p>
<p>Directeur de la publication : ${L.directeurPublication}</p>

<h2>Hébergement</h2>
<p>${L.hebergeur.nom}<br>${L.hebergeur.adresse}<br><a href="${L.hebergeur.site}" target="_blank" rel="noopener">${L.hebergeur.site}</a></p>

<h2>Propriété intellectuelle</h2>
<p>L'ensemble des contenus de ce site — textes, illustrations, logo, charte graphique, structure — est la propriété de ${L.raisonSociale}, sauf mention contraire. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.</p>

<h2>Responsabilité</h2>
<p>Les informations techniques et réglementaires publiées sur ce site sont fournies à titre indicatif et reflètent notre pratique professionnelle. Elles ne se substituent ni aux textes officiels en vigueur, ni aux prescriptions des services compétents, ni à une étude adaptée à votre établissement. ${L.raisonSociale} ne saurait être tenue responsable de l'usage qui en serait fait sans validation préalable.</p>
<p>Les liens vers des sites tiers sont proposés à titre de commodité ; ${L.raisonSociale} n'exerce aucun contrôle sur leur contenu.</p>

<h2>Signaler une erreur</h2>
<p>Une information vous paraît inexacte ou obsolète ? Écrivez-nous à <a href="mailto:${site.email}">${site.email}</a>, nous corrigerons.</p>`,
  });
}

function conditionsGenerales() {
  // Les CGV entrent en vigueur au 1er novembre 2026. Tant que cette date
  // n'est pas atteinte, la page le dit : publier « en vigueur » un texte qui ne
  // l'est pas encore, c'est se prévaloir d'un document qu'un client pourrait
  // faire écarter. Le calcul se fait au build, donc la mention bascule toute
  // seule au premier déploiement de novembre.
  const enVigueur = new Date().toISOString().slice(0, 10) >= cgv.entreeEnVigueurIso;
  const etat = enVigueur
    ? `<b>Version ${cgv.version}, en vigueur depuis le ${cgv.entreeEnVigueur}.</b> Elle annule et remplace toute version antérieure.`
    : `<b>Version ${cgv.version}, applicable aux commandes passées à compter du ${cgv.entreeEnVigueur}.</b> Elle annulera et remplacera toute version antérieure. Les commandes passées avant cette date restent régies par les conditions en vigueur au jour de leur acceptation.`;

  const sommaire = cgv.articles
    .map((a, i) => `<li><a href="#${a.id}">Article ${i + 1} — ${esc(a.titre)}</a></li>`)
    .join('\n        ');

  const corps = cgv.articles
    .map((a, i) => `<h2 id="${a.id}">Article ${i + 1} — ${esc(a.titre)}</h2>${a.corps}`)
    .join('\n');

  return pageTexte({
    titre: `Conditions générales de vente — ${site.nom}`,
    h1: 'Conditions générales de vente et de prestations de services',
    description: `Conditions générales de vente et de prestations de services de ${site.nom}, applicables aux clients professionnels : vente, installation, dépannage et entretien de matériels de cuisine professionnelle.`,
    chemin: '/cgv',
    contenu: `
<p class="lead">Vente, installation, mise en service, dépannage et maintenance de matériels de cuisine professionnelle, de froid commercial, de laverie et de buanderie professionnelle.</p>
<p>${etat}</p>
<div class="callout">
  <p><b>Ces conditions s'appliquent entre professionnels.</b> Elles ne s'adressent pas aux consommateurs au sens du code de la consommation. Lorsque le Client est un acheteur public, l'article 28 prévaut sur toute clause contraire.</p>
</div>
<p>Un exemplaire est remis sur simple demande à <a href="mailto:${site.email}">${site.email}</a> ou au <a href="tel:${site.telephoneE164}">${site.telephone}</a>, et annexé à chaque devis.</p>

<h2>Sommaire</h2>
<ol class="sommaire-cgv">
        ${sommaire}
</ol>

${corps}`,
  });
}

function confidentialite() {
  return pageTexte({
    titre: `Politique de confidentialité — ${site.nom}`,
    h1: 'Politique de confidentialité',
    description: `Comment ${site.nom} collecte, utilise et protège vos données personnelles sur ${site.domaine.replace('https://', '')}.`,
    chemin: '/politique-de-confidentialite',
    contenu: `
<p>Cette page explique quelles données personnelles nous collectons sur ce site, pourquoi, et quels sont vos droits. Elle est rédigée en langage courant : si un point vous semble obscur, écrivez-nous.</p>

<h2>Qui est responsable de vos données</h2>
<p>${site.legal.raisonSociale}, ${A.rue}, ${A.codePostal} ${A.ville} — <a href="mailto:${site.email}">${site.email}</a>.</p>

<h2>Quelles données nous collectons</h2>
<p>Uniquement celles que vous nous transmettez volontairement via le formulaire de contact :</p>
<ul>
<li>Nom et prénom</li>
<li>Nom de l'établissement (facultatif)</li>
<li>Téléphone et adresse e-mail</li>
<li>Ville (facultatif)</li>
<li>Nature de votre demande et message libre</li>
</ul>
<p>Et, si vous postulez à une offre d'emploi via la page <a href="/recrutement">Recrutement</a> :</p>
<ul>
<li>Nom et prénom, téléphone, adresse e-mail, ville</li>
<li>Le poste visé et le message que vous rédigez</li>
<li>Votre CV, lorsque vous choisissez d'en joindre un</li>
</ul>
<p>Nous ne collectons aucune donnée sensible et nous ne pratiquons aucun profilage.</p>

<h2>Pourquoi nous les traitons</h2>
<p>Ces données servent exclusivement à traiter votre demande : vous recontacter, établir un devis, planifier une intervention. La base légale est votre consentement, recueilli par la case à cocher du formulaire, ainsi que l'exécution de mesures précontractuelles prises à votre demande.</p>
<p>Nous n'utilisons pas ces données à des fins de prospection commerciale non sollicitée et nous ne les revendons à personne.</p>

<h2>Combien de temps nous les conservons</h2>
<p>Les demandes sans suite sont conservées 3 ans à compter du dernier contact. Les données liées à une relation commerciale sont conservées pendant la durée de la relation, puis selon les durées légales de conservation applicables aux documents commerciaux et comptables.</p>
<p><b>Candidatures :</b> votre dossier et votre CV sont conservés <b>deux ans au plus</b> à compter de notre dernier échange, conformément à la recommandation de la CNIL, afin de pouvoir vous recontacter si un poste correspondant s'ouvre. Vous pouvez demander leur suppression à tout moment, et nous la faisons sans vous demander de motif.</p>

<h2>Qui y a accès</h2>
<p>Les demandes sont reçues par courrier électronique par l'équipe de ${site.legal.raisonSociale}. Les prestataires techniques qui interviennent dans l'acheminement (hébergeur du site, service d'envoi d'e-mails, fournisseur de messagerie) agissent en tant que sous-traitants et n'utilisent pas vos données pour leur propre compte.</p>
<p><b>Les candidatures font exception :</b> elles sont adressées à la seule direction, et non à la boîte partagée par l'équipe. Un CV n'a pas à circuler dans l'entreprise.</p>

<h2>Cookies et mesure d'audience</h2>
<p>Ce site ne dépose <b>aucun cookie de suivi publicitaire</b> et n'utilise aucun traceur nécessitant votre consentement préalable. Deux ressources externes sont chargées pour l'affichage : les polices de caractères (Google Fonts) et, sur certaines pages, la carte de localisation (Google Maps). L'affichage de la carte peut donner lieu au dépôt de cookies par ce service ; elle n'est présente que sur les pages où elle est utile.</p>

<h2>Sécurité</h2>
<p>Le site est servi exclusivement en HTTPS. Les données transmises via le formulaire sont chiffrées en transit et ne sont pas stockées dans une base de données publique : elles sont acheminées vers notre messagerie professionnelle.</p>

<h2>Vos droits</h2>
<p>Conformément au Règlement général sur la protection des données et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données. Pour l'exercer, écrivez à <a href="mailto:${site.email}">${site.email}</a> en précisant votre demande ; nous répondons dans un délai d'un mois.</p>
<p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>).</p>

<h2>Modifications</h2>
<p>Cette politique peut être mise à jour. La version en ligne est celle qui fait foi.</p>`,
  });
}

function planDuSite() {
  const bloc = (titre, liens) =>
    `<h2>${titre}</h2><ul>${liens.map((l) => `<li><a href="${l.url}">${esc(l.nom)}</a></li>`).join('')}</ul>`;
  return pageTexte({
    titre: `Plan du site — ${site.nom}, cuisines professionnelles`,
    h1: 'Plan du site',
    description: `Toutes les pages du site ${site.nom} : services, zone d'intervention, conseils et informations pratiques.`,
    chemin: '/plan-du-site',
    contenu: `
${bloc('Pages principales', [
      { nom: 'Accueil', url: '/' },
      { nom: 'Nos services', url: '/services' },
      { nom: 'Boutique en ligne', url: ESHOP },
      { nom: 'Tout le catalogue de la boutique', url: URL_CATALOGUE },
      { nom: "Zone d'intervention", url: '/zone-intervention' },
      { nom: 'Conseils', url: '/conseils' },
      { nom: "L'entreprise", url: '/a-propos' },
      { nom: 'Contact', url: '/contact' },
    ])}
${bloc('Services', services.map((s) => ({ nom: s.nom, url: `/services/${s.slug}` })))}
${categoriesPubliques.map((c) => bloc(`<a href="${urlCollection(c.slug)}">${esc(c.nom)}</a>`, produitsDeCategorie(c.slug).map((p) => ({ nom: `${p.marque} ${p.nom} — réf. ${p.ref}`, url: urlProduit(p) })))).join('\n')}
${bloc("Zones d'intervention", zones.map((z) => ({ nom: `Zone ${z.numero} — ${z.nom}`, url: `/zone-intervention/${z.slug}` })))}
${bloc('Villes', villes.map((v) => ({ nom: `Cuisine professionnelle à ${v.nom}`, url: `/zone-intervention/${v.slug}` })))}
${bloc('Conseils', articles.map((a) => ({ nom: a.titre, url: `/conseils/${a.slug}` })))}
${bloc('Informations', [
      { nom: 'Mentions légales', url: '/mentions-legales' },
      { nom: 'Conditions générales de vente', url: '/cgv' },
      { nom: 'Politique de confidentialité', url: '/politique-de-confidentialite' },
    ])}`,
  });
}

function page404() {
  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">Erreur 404</p>
    <h1>Cette page n'existe pas (ou plus)</h1>
    <p>Le lien que vous avez suivi est peut-être obsolète. Voici les pages les plus consultées — ou appelez-nous directement, c'est souvent plus rapide.</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="/">Retour à l'accueil</a>
      <a class="btn btn-ghost" href="tel:${site.telephoneE164}">${svg('tel')}${site.telephone}</a>
    </div>
  </div>
</div>
<section>
  <div class="wrap">
    <div class="grid3">
      ${services.slice(0, 6).map((s) => `<a class="card" href="/services/${s.slug}"><div class="ico">${svg(s.icone)}</div><h2 style="font-size:1.1rem">${esc(s.nomCourt)}</h2><p>${esc(s.resume)}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>`;
  return page(
    { titre: `Page introuvable — ${site.nom}`, description: `La page demandée est introuvable. Retrouvez nos services de cuisine professionnelle ou appelez le ${site.telephone}.`, chemin: '/404', noindex: true },
    corps,
    nav
  );
}

// ===========================================================================
// E-SHOP — helpers
//
// Arborescence : /eshop (accueil, collections) → /eshop/<collection> →
// /eshop/<collection>/<produit>, plus /eshop/catalogue (tout, filtrable) et
// /eshop/panier. Les forfaits d'installation ne sont JAMAIS listés : seules
// produitsPublics et categoriesPubliques alimentent les pages.
// ===========================================================================
const estMachine = (p) => p.type === 'machine';

/**
 * Visuel de la fiche : la photo, et, quand le fabricant en publie une, la vue
 * 3D. Le modèle 3D (plusieurs Mo) n'est chargé qu'au clic : la page reste
 * légère pour qui ne s'en sert pas. Le lecteur <model-viewer> (Google,
 * Apache-2.0) est servi depuis nos fichiers ; le modèle, lui, est lu chez Miele.
 */
function blocVisuel(p) {
  const v = p.vue3d;
  const credit = p.photo && p.marque === 'Miele Professional' ? `<p class="credit-visuel">Visuel${v ? ' et modèle 3D' : ''} © Miele</p>` : '';
  if (!v) return vignetteProduit(p, ' grande') + credit;
  return `<div class="vue3d" data-glb="${esc(v.glb)}"${v.usdz ? ` data-usdz="${esc(v.usdz)}"` : ''} data-alt="${esc(`${p.marque} ${p.nom} — vue 3D`)}">
            ${vignetteProduit(p, ' grande')}
            <button type="button" class="btn btn-outline btn-sm vue3d-btn" aria-pressed="false">${svg('installation')}<span>Voir en 3D</span></button>
          </div>
          ${credit}
          <script>${SCRIPT_VUE3D}</script>`;
}

const SCRIPT_VUE3D = `(function(){
  var bloc = document.currentScript.parentNode.querySelector('.vue3d');
  if (!bloc) return;
  var btn = bloc.querySelector('.vue3d-btn'), photo = bloc.querySelector('.vign'), mv = null, charge = null;
  function libelle(t){ btn.querySelector('span').textContent = t; }
  btn.addEventListener('click', function(){
    if (mv) {                      // retour à la photo
      var vers3d = mv.hidden;
      mv.hidden = !vers3d; photo.hidden = vers3d;
      btn.setAttribute('aria-pressed', vers3d ? 'true' : 'false');
      libelle(vers3d ? 'Revenir à la photo' : 'Voir en 3D');
      return;
    }
    if (charge) return;
    libelle('Chargement de la vue 3D…'); btn.disabled = true;
    charge = import('/assets/vendor/model-viewer-4.0.0.min.js').then(function(){
      mv = document.createElement('model-viewer');
      mv.setAttribute('src', bloc.dataset.glb);
      if (bloc.dataset.usdz) mv.setAttribute('ios-src', bloc.dataset.usdz);
      mv.setAttribute('alt', bloc.dataset.alt);
      ['camera-controls','auto-rotate','ar'].forEach(function(a){ mv.setAttribute(a, ''); });
      mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
      mv.setAttribute('shadow-intensity', '1');
      mv.setAttribute('touch-action', 'pan-y');
      mv.className = 'vue3d-modele';
      mv.addEventListener('load', function(){ libelle('Revenir à la photo'); btn.disabled = false; });
      mv.addEventListener('error', function(){
        mv.remove(); mv = null; charge = null; photo.hidden = false;
        libelle('Vue 3D indisponible'); btn.disabled = true;
      });
      photo.hidden = true;
      bloc.insertBefore(mv, btn);
      btn.setAttribute('aria-pressed', 'true');
    }).catch(function(){ charge = null; libelle('Vue 3D indisponible'); });
  });
})();`;

/** Réalisations SODILAME en photos (data/realisations.mjs). */
function blocRealisations(liste, { alt = false, sansLienVers = [] } = {}) {
  if (!liste.length) return '';
  const avecLien = new Set(sansLienVers);
  return liste
    .map(
      (r) => `<section${alt ? ' class="alt"' : ''}>
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">Une installation récente · ${esc(r.mois)}${r.lieu ? ` · ${esc(r.lieu)}` : ''}</p>
      <h2>${esc(r.titre)}</h2>
      <p class="lead">${esc(r.texte)}</p>
      ${(r.produits || [])
        .map((ref) => produitsPublics.find((x) => x.ref === ref))
        .filter((x) => x && !avecLien.has(x.ref))
        .map((x) => `<a class="more" href="${urlProduit(x)}">Voir le ${esc(x.ref)} dans la boutique →</a>`)
        .join(' ')}
    </div>
    <div class="realisation">
      ${r.photos
        .map(
          (ph) => `<figure class="${ph.hauteur > ph.largeur ? 'portrait' : 'paysage'}">
        <img src="/assets/realisations/${ph.fichier}" width="${ph.largeur}" height="${ph.hauteur}" alt="${esc(ph.alt)}" loading="lazy" decoding="async">
        <figcaption>${esc(ph.etiquette)}</figcaption>
      </figure>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`
    )
    .join('\n');
}

// 3 768,00 € : espace fine insécable entre les milliers, virgule décimale.
const euros = (n) => {
  const [e, d] = n.toFixed(2).split('.');
  return `${e.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f')},${d}\u00a0€`;
};
const prixTexte = (c) =>
  typeof c.prix === 'number'
    ? `<b class="prix">${euros(c.prix)} HT</b>`
    : `<span class="prix-nc">Prix sur demande</span>`;
/** Le plus petit prix connu d'un produit, ou null. */
const prixMini = (p) => {
  const l = p.conditionnements.map((c) => c.prix).filter((x) => typeof x === 'number');
  return l.length ? Math.min(...l) : null;
};

/** La page marque d'une marque du catalogue, si elle existe. */
const pageMarque = (nom) => marques.find((m) => m.nom === nom);

/** Logo officiel d'une marque, quand le fabricant nous l'a remis (data/marques.mjs). */
const logoMarque = (m, cls = '') =>
  m?.logo
    ? `<img class="logo-marque${cls ? ' ' + cls : ''}" src="/assets/marques/${m.logo.fichier}" width="${m.logo.largeur}" height="${m.logo.hauteur}" alt="${esc(m.logo.alt)}" loading="lazy" decoding="async">`
    : '';

function boutonAjout(p, c, k) {
  const prix = typeof c.prix === 'number' ? c.prix : '';
  // Une machine emporte son forfait : panier.js lit ces attributs pour créer la
  // ligne liée. Le serveur, lui, ne leur fait pas confiance et recalcule.
  const f = estMachine(p) ? forfaitDe(p) : null;
  const fc = f?.conditionnements[0];
  const attrsForfait = f
    ? ` data-forfait-ref="${esc(f.ref)}" data-forfait-nom="${esc(f.nom)}" data-forfait-cond="${esc(fc.label)}" data-forfait-prix="${typeof fc.prix === 'number' ? fc.prix : ''}"`
    : '';
  return `<button class="btn btn-primary btn-sm ajout" type="button"
    data-ref="${esc(p.ref)}" data-nom="${esc(p.nom)}" data-marque="${esc(p.marque)}"
    data-cond="${esc(c.label)}" data-prix="${prix}" data-url="${urlProduit(p)}" data-k="${p.slug}-${k}"${attrsForfait}>
    ${svg('panier')}Ajouter au panier</button>`;
}

// Vignette produit : la vraie photo si elle existe, sinon une vignette de
// remplacement cohérente avec la charte. Jamais d'image cassée, jamais d'image
// dont nous n'avons pas les droits — les visuels Miele arriveront avec le kit
// revendeur officiel.
function vignetteProduit(p, taille = '') {
  // Le logo de la marque (quand le fabricant nous l'a remis) se pose en
  // pastille en haut à droite, sur la photo comme sur la vignette de secours.
  const lm = logoMarque(pageMarque(p.marque), 'logo-vign');
  if (p.photo) {
    return `<span class="vign${taille}"><img src="/assets/produits/${p.photo}.jpg" width="800" height="800" alt="${esc(p.marque)} ${esc(p.nom)} — référence ${esc(p.ref)}" loading="lazy" decoding="async">${lm}</span>`;
  }
  const icone = estMachine(p)
    ? categorieDuProduit(p)?.icone || 'installation'
    : p.caracteristiques.some((c) => /liquide/i.test(c))
      ? 'bidon'
      : 'seau';
  return `<span class="vign vide${taille}"${lm ? '' : ' aria-hidden="true"'}>${lm}${svg(icone)}<span class="vr">${esc(p.ref)}</span></span>`;
}

function carteProduit(p) {
  const c0 = p.conditionnements[0];
  // Les data-* portent les critères de filtrage : le script du catalogue ne
  // lit que ça, il n'a aucune connaissance du contenu des cartes.
  // data-ref sert au retrait de vente : panier.js marque la carte des produits
  // que l'administration n'a plus cochés « en vente ».
  const mini = prixMini(p);
  const bas = mini !== null
    ? `<span class="cond">${p.conditionnements.length > 1 ? 'dès ' : ''}<b class="prix-carte">${euros(mini)} HT</b></span>`
    : estMachine(p)
    ? '<span class="cond">Livrée, installée, mise en service</span>'
    : p.conditionnements.length > 1
      ? `<span class="cond">${p.conditionnements.length} conditionnements</span>`
      : `<span class="cond">${esc(c0.label)}</span>`;
  return `<a class="card prod" href="${urlProduit(p)}"
        data-produit data-ref="${esc(p.ref)}" data-famille="${esc(p.categorie)}" data-marque="${esc(p.marque)}" data-machines="${esc((p.machines || []).join(' '))}" data-texte="${esc([categorieDuProduit(p)?.nom, ...p.conditionnements.map((c) => c.label)].join(' '))}">
        ${vignetteProduit(p)}
        <span class="prod-top"><span class="marque">${esc(p.marque)}</span><span class="ref">${esc(p.ref)}</span></span>
        <h3>${esc(p.nom)}</h3>
        <p>${esc(p.resume)}</p>
        <span class="prod-bas">${bas}<span class="more">Voir →</span></span>
      </a>`;
}

/**
 * Bloc servi à la place de « Commander » quand l'administration a décoché
 * « en vente » sur tous les conditionnements de la référence. Il est dans le
 * HTML livré mais masqué : c'est panier.js qui le révèle après avoir lu
 * /api/catalogue, de sorte qu'un retrait de vente prenne effet sans attendre
 * un redéploiement.
 *
 * On garde la page plutôt que de la supprimer : sa description, son dosage et
 * ses fiches PDF restent utiles au client qui possède déjà le produit. Ce qu'on
 * retire, c'est l'espoir d'une commande qu'on ne prendra pas.
 */
function retraitVente(p) {
  return `<div class="achat retrait-vente" hidden>
          ${vignetteProduit(p, ' grande')}
          <h2>Plus au catalogue</h2>
          <p class="achat-sub">Cette référence n'est plus proposée à la commande en ligne.</p>
          <p class="achat-note" style="margin:0 0 1.1rem">Nous pouvons vous dire par quoi la remplacer, et vous la fournir encore s'il en reste en stock. Un appel est le plus rapide.</p>
          <a class="btn btn-primary btn-sm" href="tel:${site.telephoneE164}" style="width:100%;justify-content:center">${site.telephone}</a>
          <a class="btn btn-outline btn-sm" href="${ESHOP}" style="width:100%;justify-content:center;margin-top:.6rem">Voir la boutique →</a>
        </div>`;
}

// Bandeau d'explication des prix. Trois états, et c'est le deuxième qui compte :
// dès qu'un seul article porte un prix, le catalogue devient mixte, et un
// visiteur qui voit « 25,00 € HT » sur un article et « Prix sur demande » sur
// les autres se demande ce qu'on lui cache. Le bandeau doit alors rester, avec
// un autre texte — pas disparaître.
//
// Les prix réels vivent en base. Le bandeau livré porte donc la liste des
// articles sans prix au moment du build (forfaits compris) : panier.js la
// confronte à /api/catalogue et ne retire le bandeau que lorsque plus aucun
// article n'est « sur demande ».
const NOTICE_TOUS = `<b>Tarifs en cours de mise en ligne.</b> Composez votre commande normalement : nous vous confirmons le montant exact par retour de mail, avant toute expédition et avant toute facturation.`;
const NOTICE_MIXTE = `<b>Tous les tarifs ne sont pas encore en ligne.</b> Les articles affichés « Prix sur demande » se commandent exactement comme les autres : nous vous confirmons le montant par retour de mail, avant toute expédition et avant toute facturation.`;
const clesTarifs = produits.flatMap((p) => p.conditionnements.map((c) => ({ cle: `${p.ref}__${c.label}`, prix: c.prix })));
const clesSansPrix = clesTarifs.filter((x) => typeof x.prix !== 'number').map((x) => x.cle);
const noticePrix =
  clesSansPrix.length === 0
    ? ''
    : `<div class="notice-prix" data-total="${clesTarifs.length}" data-sans-prix="${esc(JSON.stringify(clesSansPrix))}">${
        clesSansPrix.length === clesTarifs.length ? NOTICE_TOUS : NOTICE_MIXTE
      }</div>`;

const nbCollection = (slug) => produitsDeCategorie(slug).length;
const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`;

function carteCollection(c) {
  const n = nbCollection(c.slug);
  return `<a class="card collec" href="${urlCollection(c.slug)}">
        <div class="ico">${svg(c.icone)}</div>
        <h3>${esc(c.nom)}</h3>
        <p>${esc(c.description)}</p>
        <span class="prod-bas"><span class="cond">${pluriel(n, 'référence')}</span><span class="more">Voir la collection →</span></span>
      </a>`;
}

/** Le forfait expliqué : sur les collections de matériel et les fiches machine. */
function blocForfait({ titre = 'Une machine, livrée et installée', avecCarte = true } = {}) {
  return `<section class="alt">
  <div class="wrap">
    <div class="grid2 top">
      <div>
        <p class="eyebrow">Le forfait d'installation</p>
        <h2>${titre}</h2>
        <p>Nous ne vendons pas de machine « en carton ». Chaque machine de la boutique est vendue avec <b>son forfait de livraison, d'installation et de mise en service</b>, ajouté automatiquement à votre panier. Son montant dépend de la machine : un lave-verres ne se pose pas comme une laveuse de blanchisserie.</p>
        <p>Avant de commander la machine chez le fabricant, nous vérifions avec vous l'arrivée d'eau, l'évacuation, l'alimentation électrique et le passage jusqu'à l'emplacement. Une machine qui ne passe pas la porte, cela se découvre au relevé — pas le jour de la livraison.</p>
      </div>
      ${
        avecCarte
          ? `<div class="avantage">
        <i>${svg('installation')}</i>
        <b>Ce que comprend le forfait</b>
        <ul class="ul-check">${etapesForfait.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
      </div>`
          : ''
      }
    </div>
  </div>
</section>`;
}

const etapesCommande = `<section class="alt">
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Comment ça marche</p>
      <h2>Quatre étapes, aucun paiement en ligne</h2>
    </div>
    <div class="steps">
      <div class="step"><h3>Vous composez</h3><p>Vous ajoutez machines et consommables à votre panier, sans compte à créer.</p></div>
      <div class="step"><h3>Vous envoyez</h3><p>Vos coordonnées et votre adresse de livraison. Aucune carte bancaire demandée.</p></div>
      <div class="step"><h3>Nous validons</h3><p>Vous recevez par mail la confirmation du montant exact. Pour une machine, nous vérifions l'installation avec vous avant de la commander.</p></div>
      <div class="step"><h3>Nous livrons et facturons</h3><p>Un technicien vous livre — et installe s'il s'agit d'une machine. La facture suit dans vos conditions habituelles.</p></div>
    </div>
  </div>
</section>`;

const faqBoutique = [
  {
    q: 'Qui peut commander sur la boutique ?',
    r: `Les professionnels — restaurants, hôtels, campings, collectivités, établissements de santé — installés sur notre zone d'intervention : Bouches-du-Rhône, Gard et Vaucluse. Pas besoin d'être déjà client : la première commande sert souvent de premier contact.`,
  },
  {
    q: 'Comment se passe le paiement ?',
    r: `Il n'y a aucun paiement sur le site. Vous composez votre panier, nous recevons la commande par mail, nous vous la confirmons avec le montant exact, puis nous livrons et facturons dans les conditions de votre compte client.`,
  },
  {
    q: "Pourquoi le forfait d'installation est-il obligatoire avec une machine ?",
    r: `Parce qu'une machine professionnelle mal raccordée ou mal réglée sur votre eau donne de mauvais résultats dès le premier jour, et que c'est nous qui en assurons ensuite l'entretien et le SAV. Nous la recevons, la préparons, la livrons, l'installons, la mettons en service et montrons son fonctionnement à votre équipe : c'est ce travail que couvre le forfait.`,
  },
  {
    q: "Quel est le délai pour une machine ?",
    r: `Il dépend de la disponibilité chez le fabricant et de la préparation de votre installation. Nous vous l'indiquons à la confirmation de commande, avant de commander la machine — jamais un délai que nous ne pouvons pas tenir.`,
  },
  {
    q: 'La livraison des produits d’entretien est-elle vraiment offerte, même pour un seul bidon ?',
    r: `Oui, sans minimum de commande, partout sur notre zone d'intervention. Nos techniciens circulent toute la journée entre deux rendez-vous : votre commande voyage avec eux. Nous ne facturons pas un port que nous ne payons pas.`,
  },
  {
    q: 'Je ne sais pas quelle référence commander pour ma machine.',
    r: `Envoyez-nous une photo de la plaque signalétique ou appelez le ${site.telephone}. La bonne référence dépend de la génération de l'appareil et, pour les fours Rational, de la présence du système CareControl ou de l'AutoDose. Nous vérifions avant de livrer.`,
  },
];

// ===========================================================================
// E-SHOP — accueil /eshop
// ===========================================================================
function eshopAccueil() {
  const fil = [{ nom: 'Accueil', url: '/' }, { nom: 'Boutique', url: ESHOP }];
  const marquesBoutique = marquesCatalogue.map((nom) => ({ nom, page: pageMarque(nom), n: produitsPublics.filter((p) => p.marque === nom).length }));
  const rayonsEnLigne = rayonsBoutique.filter((r) => collectionsDuRayon(r.slug).length);
  const rayonsADevis = rayonsBoutique.filter((r) => !collectionsDuRayon(r.slug).length);

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">La boutique ${esc(site.nom)}</p>
    <h1>Équipez et entretenez votre cuisine, nous livrons et installons</h1>
    <p>Machines livrées, installées et mises en service par nos techniciens ; produits d'entretien livrés sans frais de port. Pour les professionnels des Bouches-du-Rhône, du Gard et du Vaucluse — <b>aucun paiement en ligne</b>, chaque commande vous est confirmée par mail.</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="#rayons">Voir les rayons</a>
      <a class="btn btn-ghost" href="${URL_CATALOGUE}">Tout le catalogue</a>
    </div>
  </div>
</div>
${ariane(fil)}

<section id="rayons">
  <div class="wrap">
    ${noticePrix}
    ${rayonsEnLigne
      .map(
        (r) => `<div class="univers-bloc" id="rayon-${r.slug}">
      <div class="sec-head rayon-tete">
        <div>
          <p class="eyebrow">${esc(r.nom)}</p>
          <h2>${esc(r.accroche)}</h2>
        </div>
        <a class="more" href="${urlRayon(r.slug)}">Tout le rayon ${esc(r.nom)} →</a>
      </div>
      <div class="grid3">
      ${collectionsDuRayon(r.slug).map(carteCollection).join('\n      ')}
      </div>
    </div>`
      )
      .join('\n    ')}
    ${
      rayonsADevis.length
        ? `<div class="univers-bloc" id="rayons-a-venir">
      <div class="sec-head">
        <p class="eyebrow">Bientôt en ligne</p>
        <h2>Ces rayons arrivent : nous vous les chiffrons dès aujourd'hui</h2>
      </div>
      <div class="collec-liens">
        ${rayonsADevis.map((r) => `<a href="${urlRayon(r.slug)}">${svg(r.icone)}<span>${esc(r.nom)} — sur devis</span></a>`).join('\n        ')}
      </div>
    </div>`
        : ''
    }
    <p class="lien-catalogue"><a class="btn btn-outline" href="${URL_CATALOGUE}">Parcourir les ${totalProduits} références, avec filtres →</a></p>
  </div>
</section>

${blocForfait()}

<section>
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Les marques de la boutique</p>
      <h2>Des marques que nous installons et dépannons</h2>
      <p class="lead">Nous ne vendons que ce que nous savons entretenir. C'est plus court qu'un catalogue de grossiste, et c'est volontaire.</p>
    </div>
    <div class="marques-boutique">
      ${marquesBoutique
        .map(
          (m) =>
            `<a href="${m.page ? `/marques/${m.page.slug}` : `${URL_CATALOGUE}?marque=${encodeURIComponent(m.nom)}#catalogue`}">${logoMarque(m.page)}<b>${esc(m.nom)}</b><span>${pluriel(m.n, 'référence')}</span></a>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

${etapesCommande}
${blocFaq(faqBoutique, 'Questions sur la boutique')}
${blocCtaFinal('Un doute sur une machine ou une référence ?', "Appelez-nous ou envoyez une photo de la plaque signalétique : nous vous orientons avant que vous commandiez.")}`;

  return page(
    {
      titre: `Boutique en ligne — matériel et produits d'entretien pour cuisine professionnelle | ${site.nom}`,
      description: `Lave-vaisselle, lave-verres, blanchisserie et produits d'entretien professionnels. Machines livrées et installées, consommables livrés sans frais de port dans les Bouches-du-Rhône, le Gard et le Vaucluse.`,
      chemin: ESHOP,
      schemas: [
        schemaAriane(fil),
        schemaFaq(faqBoutique),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Collections de la boutique ${site.nom}`,
          numberOfItems: categoriesPubliques.length,
          itemListElement: categoriesPubliques.map((c, k) => ({
            '@type': 'ListItem',
            position: k + 1,
            name: c.nom,
            url: url(urlCollection(c.slug)),
          })),
        },
      ],
    },
    corps,
    nav
  );
}

// ===========================================================================
// E-SHOP — un rayon /eshop/<rayon> (Froid, Cuisson, Fours, Laverie…)
// ===========================================================================
function rayonPage(r) {
  const cols = collectionsDuRayon(r.slug);
  const liste = cols.flatMap((c) => produitsDeCategorie(c.slug));
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: 'Boutique', url: ESHOP },
    { nom: r.nom, url: urlRayon(r.slug) },
  ];
  const marquesDuRayon = r.marques.map((s) => marques.find((m) => m.slug === s)).filter(Boolean);
  const service = r.service ? services.find((x) => x.slug === r.service) : null;
  const autres = rayonsBoutique.filter((x) => x.slug !== r.slug);

  const contenu = cols.length
    ? `<section>
  <div class="wrap">
    ${noticePrix}
    <div class="sec-head"><p class="eyebrow">Rayon ${esc(r.nom)}</p><h2>Les catégories</h2></div>
    <div class="grid3">
      ${cols.map(carteCollection).join('\n      ')}
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">${liste.length} références</p><h2>Tout le rayon ${esc(r.nom)}</h2></div>
    <div class="grid3" id="catalogue">
      ${liste.map(carteProduit).join('\n      ')}
    </div>
  </div>
</section>`
    : `<section>
  <div class="wrap">
    <div class="grid-art">
      <div class="prose">
        <h2>Ce rayon arrive en ligne</h2>
        <p>Nous mettons ce rayon en ligne progressivement. En attendant, nous vendons, installons et entretenons déjà ce matériel : décrivez-nous votre besoin, nous vous adressons un devis.</p>
        ${r.aVenir.length ? `<h3>Ce que nous vous proposons</h3><ul class="ul-check">${r.aVenir.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        ${service ? `<p>Tout savoir sur notre service : <a href="/services/${service.slug}"><b>${esc(service.nom)}</b></a>.</p>` : ''}
      </div>
      <aside>
        <div class="card">
          <h3 style="font-size:1rem">Un devis sur ce rayon</h3>
          <p>Machine, dimensions, emplacement : nous vous rappelons pour chiffrer, installation comprise.</p>
          <a class="btn btn-primary btn-sm" href="/contact?sujet=materiel" style="width:100%;justify-content:center;margin-top:1rem">Demander un devis</a>
          <a class="btn btn-outline btn-sm" href="tel:${site.telephoneE164}" style="width:100%;justify-content:center;margin-top:.6rem">${site.telephone}</a>
        </div>
      </aside>
    </div>
  </div>
</section>`;

  const corps = `
<div class="phero compact">
  <div class="wrap">
    <p class="eyebrow on-dark">Boutique · Rayon</p>
    <h1>${esc(r.nom)}</h1>
    <p>${esc(r.accroche)}</p>
  </div>
</div>
${ariane(fil)}

${contenu}

${
  marquesDuRayon.length
    ? `<section${cols.length ? '' : ' class="alt"'}>
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">Marques du rayon</p><h2>Les marques que nous installons</h2></div>
    <div class="marques-boutique">
      ${marquesDuRayon.map((m) => `<a href="/marques/${m.slug}">${logoMarque(m)}<b>${esc(m.nom)}</b><span>${esc(m.pays)}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>`
    : ''
}

<section${cols.length ? ' class="alt"' : ''}>
  <div class="wrap">
    <div class="sec-head center"><p class="eyebrow">Boutique</p><h2>Les autres rayons</h2></div>
    <div class="collec-liens">
      ${autres.map((x) => `<a href="${urlRayon(x.slug)}">${svg(x.icone)}<span>${esc(x.nom)}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>

${blocCtaFinal('Un projet d’équipement ?', 'Dites-nous ce que vous produisez et dans quel local : nous vous indiquons le matériel adapté, installation comprise.')}`;

  return page(
    {
      titre: `${r.nom} professionnel — boutique ${site.nom}`,
      description: `${r.accroche} Bouches-du-Rhône, Gard et Vaucluse.`,
      chemin: urlRayon(r.slug),
      // Un rayon sans produit en ligne n'est qu'un renvoi vers le devis :
      // utile au visiteur, sans intérêt pour un moteur de recherche.
      noindex: !cols.length,
      schemas: [schemaAriane(fil)],
    },
    corps,
    nav
  );
}

// ===========================================================================
// E-SHOP — une collection /eshop/<famille>
// ===========================================================================
function collectionPage(c) {
  const r = rayonDe(c);
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: 'Boutique', url: ESHOP },
    ...(r ? [{ nom: r.nom, url: urlRayon(r.slug) }] : []),
    { nom: c.nomCourt, url: urlCollection(c.slug) },
  ];
  const liste = produitsDeCategorie(c.slug);
  const autres = categoriesPubliques.filter((x) => x.slug !== c.slug);
  const materiel = c.univers === 'materiel';

  const corps = `
<div class="phero compact">
  <div class="wrap">
    <p class="eyebrow on-dark">${esc(r ? `Rayon ${r.nom}` : 'Boutique')}</p>
    <h1>${esc(c.nom)}</h1>
    <p>${esc(c.description)}</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    ${noticePrix}
    ${c.intro ? `<p class="lead collec-intro">${esc(c.intro)}</p>` : ''}
    ${c.conseil ? `<div class="conseil-famille"><b>Le conseil de nos techniciens.</b> ${esc(c.conseil)}</div>` : ''}
    <div class="grid3" id="catalogue">
      ${liste.map(carteProduit).join('\n      ')}
    </div>
    <p class="aucun-resultat">
      Vous ne trouvez pas votre référence ? <b>Notre boutique en ligne est plus courte que notre offre</b> :
      appelez le <a href="tel:${site.telephoneE164}">${site.telephone}</a> ou <a href="/contact?sujet=${materiel ? 'materiel' : 'produits'}">écrivez-nous</a>.
    </p>
  </div>
</section>

${blocRealisations(realisationsDeCollection(c.slug), { alt: true })}

${materiel ? blocForfait() : blocLivraison()}

<section${materiel ? '' : ' class="alt"'}>
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">Boutique</p>
      <h2>Les autres collections</h2>
    </div>
    <div class="collec-liens">
      ${autres.map((x) => `<a href="${urlCollection(x.slug)}">${svg(x.icone)}<span>${esc(x.nom)}</span></a>`).join('\n      ')}
      <a href="${URL_CATALOGUE}">${svg('panier')}<span>Tout le catalogue</span></a>
    </div>
  </div>
</section>

${blocCtaFinal(materiel ? 'Un projet d’équipement ?' : 'Un doute sur une référence ?', materiel ? "Dites-nous ce que vous lavez, combien et avec quelle eau : nous vous indiquons la machine adaptée avant que vous commandiez." : "Appelez-nous ou envoyez une photo de la plaque signalétique de votre machine : nous confirmons la bonne référence avant de livrer.")}`;

  return page(
    {
      titre: `${c.titreSeo || c.nom} | ${site.nom}`,
      description: `${c.description} ${pluriel(liste.length, 'référence')} en ligne, commande sans paiement en ligne.`,
      chemin: urlCollection(c.slug),
      schemas: [
        schemaAriane(fil),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: c.nom,
          description: c.description,
          url: url(urlCollection(c.slug)),
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: liste.length,
            itemListElement: liste.map((p, k) => ({
              '@type': 'ListItem',
              position: k + 1,
              name: `${p.marque} ${p.nom}`,
              url: url(urlProduit(p)),
            })),
          },
        },
      ],
    },
    corps,
    nav
  );
}

// ===========================================================================
// E-SHOP — tout le catalogue, filtrable /eshop/catalogue
// ===========================================================================
function cataloguePage() {
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: 'Boutique', url: ESHOP },
    { nom: 'Tout le catalogue', url: URL_CATALOGUE },
  ];
  const nbMarque = (m) => produitsPublics.filter((p) => p.marque === m).length;
  const nbMachine = (s) => produitsPublics.filter((p) => (p.machines || []).includes(s)).length;
  const machinesUtiles = machinesCatalogue.filter((m) => nbMachine(m.slug) > 0);

  const corps = `
<div class="phero compact">
  <div class="wrap">
    <p class="eyebrow on-dark">Boutique</p>
    <h1>Tout le catalogue</h1>
    <p>Les ${totalProduits} références de la boutique, à filtrer par collection, par machine ou par marque.</p>
  </div>
</div>
${ariane(fil)}

<section id="boutique">
  <div class="wrap">
    ${noticePrix}
    <div class="filtres" id="barre-filtres" hidden>
      <div class="frecherche">
        <label for="recherche">Rechercher</label>
        <input id="recherche" type="search" placeholder="Référence, modèle, usage… ex. PWM 909, sèche-linge 10 kg, rinçage" autocomplete="off">
      </div>
      ${groupeFiltres('Collection', 'famille', categoriesPubliques.map((c) => ({ slug: c.slug, nom: c.nomCourt, n: nbCollection(c.slug) })), esc)}
      ${groupeFiltres('Machine', 'machine', machinesUtiles.map((m) => ({ slug: m.slug, nom: m.nom, n: nbMachine(m.slug) })), esc)}
      ${groupeFiltres('Marque', 'marque', marquesCatalogue.map((m) => ({ slug: m, nom: m, n: nbMarque(m) })), esc)}
      <div class="fbilan">
        <span id="compte">${totalProduits} références</span>
        <button type="button" id="reinit" class="freinit" hidden>Tout afficher</button>
      </div>
    </div>

    ${categoriesPubliques
      .map(
        (c) => `<div class="conseil-famille" data-conseil="${c.slug}" hidden>
      <b>${esc(c.nomCourt)} — le conseil de nos techniciens.</b> ${esc(c.conseil)}
    </div>`
      )
      .join('\n    ')}

    <div class="grid3" id="catalogue">
      ${produitsPublics.map(carteProduit).join('\n      ')}
    </div>

    <p class="aucun-resultat" id="aucun" hidden>
      Aucune référence ne correspond à cette combinaison. <b>Cela ne veut pas dire que nous ne l'avons pas</b> :
      notre boutique en ligne est plus courte que notre offre. Appelez le
      <a href="tel:${site.telephoneE164}">${site.telephone}</a> ou <a href="/contact?sujet=produits">écrivez-nous</a>.
    </p>
  </div>
</section>

${blocCtaFinal('Un doute sur une référence ?', "Appelez-nous ou envoyez une photo de la plaque signalétique de votre machine : nous confirmons la bonne référence avant de livrer.")}
<script>${SCRIPT_FILTRES}</script>`;

  return page(
    {
      titre: `Tout le catalogue — matériel et produits d'entretien | ${site.nom}`,
      description: `Les ${totalProduits} références de la boutique ${site.nom} : lave-vaisselle, blanchisserie, détergents, liquides de rinçage, entretien des fours et traitement de l'eau.`,
      chemin: URL_CATALOGUE,
      schemas: [
        schemaAriane(fil),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Catalogue de la boutique ${site.nom}`,
          numberOfItems: produitsPublics.length,
          itemListElement: produitsPublics.map((p, k) => ({
            '@type': 'ListItem',
            position: k + 1,
            name: `${p.marque} ${p.nom}`,
            url: url(urlProduit(p)),
          })),
        },
      ],
    },
    corps,
    nav
  );
}

// ===========================================================================
// E-SHOP — fiche produit /eshop/<famille>/<produit>
// ===========================================================================
function produitPage(p) {
  const c = categorieDuProduit(p);
  const machine = estMachine(p);
  const forfait = machine ? forfaitDe(p) : null;
  const fc = forfait?.conditionnements[0];
  const marque = pageMarque(p.marque);
  const adresse = urlProduit(p);
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: 'Boutique', url: ESHOP },
    ...(rayonDe(c) ? [{ nom: rayonDe(c).nom, url: urlRayon(rayonDe(c).slug) }] : []),
    { nom: c.nomCourt, url: urlCollection(c.slug) },
    { nom: p.nom, url: adresse },
  ];
  // Sélection glissante, pour que chaque référence reçoive des liens entrants
  // au lieu que les trois premières de la famille captent tout.
  const famille = produitsDeCategorie(c.slug);
  const ip = famille.findIndex((x) => x.slug === p.slug);
  const memeFamille = [1, 2, 3]
    .map((d) => famille[(ip + d) % famille.length])
    .filter((x, k, t) => x && x.slug !== p.slug && t.findIndex((y) => y.slug === x.slug) === k);

  // Une machine n'est pas « en stock » : elle est commandée chez le fabricant
  // une fois l'installation validée. On ne lui attribue donc ni disponibilité
  // ni frais de port nuls — le transport est dans le forfait.
  const schemaProduit = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${p.marque} ${p.nom}`,
    sku: p.ref,
    mpn: p.ref,
    brand: { '@type': 'Brand', name: p.marque },
    category: c.nom,
    description: p.description,
    url: url(adresse),
    offers: p.conditionnements
      .filter((cd) => !machine || typeof cd.prix === 'number')
      .map((cd) => ({
        '@type': 'Offer',
        name: cd.label,
        ...(typeof cd.prix === 'number' ? { price: cd.prix.toFixed(2), priceCurrency: 'EUR' } : {}),
        ...(cd.ean ? { gtin13: cd.ean } : {}),
        ...(machine ? {} : { availability: 'https://schema.org/InStock' }),
        url: url(adresse),
        seller: { '@id': url('/#entreprise') },
        areaServed: { '@type': 'AdministrativeArea', name: 'Bouches-du-Rhône, Gard, Vaucluse' },
        ...(machine
          ? {}
          : {
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'EUR' },
                shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'FR' },
              },
            }),
      })),
  };
  if (!schemaProduit.offers.length) delete schemaProduit.offers;

  const blocDocs = p.fiches
    ? `<h2>Documentation</h2>
        <p>${
          ficheSodilame(p)
            ? `La fiche technique SODILAME reprend les données du fabricant sous une forme lisible, sur une page. Le document d'origine ${esc(p.marque)} reste disponible : c'est lui qui fait foi. `
            : ''
        }La fiche de données de sécurité doit être conservée et accessible : elle fait partie de votre plan de maîtrise sanitaire, au titre du plan de nettoyage.</p>
        <ul class="fiches-pdf">
          ${
            ficheSodilame(p)
              ? `<li class="mise-en-avant"><a href="/assets/fiches/${ficheSodilame(p)}" target="_blank" rel="noopener">Fiche technique ${esc(p.ref)} — ${esc(site.nom)}</a> <span>PDF 1 page — dosage, caractéristiques, conditionnements</span></li>`
              : ''
          }
          ${
            p.fiches.technique
              ? `<li><a href="/assets/fiches/${p.fiches.technique}" target="_blank" rel="noopener">Fiche technique ${esc(p.ref)} — ${esc(p.marque)}</a> <span>PDF — document d'origine du fabricant</span></li>`
              : ''
          }
          ${
            // Trois documents au plus, et l'ordre compte. La FDS est le PDF
            // ORIGINAL du fabricant, jamais remis en page : une erreur de
            // recopie dans une mention H ou P se paierait sur la santé de
            // quelqu'un.
            p.fiches.securite
              ? `<li><a href="/assets/fiches/${p.fiches.securite}" target="_blank" rel="noopener">Fiche de données de sécurité ${esc(p.ref)}</a> <span>PDF — document du fabricant, à conserver dans votre PMS</span></li>`
              : ''
          }
        </ul>`
    : '';

  // Fiches produit du fabricant, une par version : un LIEN vers le document
  // hébergé par Miele, jamais une copie.
  const fichesFabricant = p.conditionnements.filter((cd) => cd.ficheMiele);
  const blocFichesFabricant = fichesFabricant.length
    ? `<h2>Fiche produit ${esc(p.marque)}</h2>
        <p>Dimensions, raccordements et caractéristiques complètes${fichesFabricant.length > 1 ? ', version par version' : ''}, sur le document officiel du fabricant.</p>
        <ul class="fiches-pdf">
          ${fichesFabricant
            .map((cd) => `<li><a href="${esc(cd.ficheMiele)}" target="_blank" rel="noopener nofollow">Fiche produit ${esc(cd.refMiele || p.ref)}</a> <span>PDF — site ${esc(p.marque)}</span></li>`)
            .join('\n          ')}
        </ul>`
    : '';

  const livraison = machine
    ? `<h2>Livraison, installation et mise en service</h2>
        <p>Cette machine est vendue avec son <b>forfait de livraison, d'installation et de mise en service</b>, ajouté automatiquement à votre panier. Il comprend :</p>
        <ul class="ul-check">${etapesForfait.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
        <p>Avant de commander la machine chez ${esc(p.marque)}, nous vérifions avec vous l'arrivée d'eau, l'évacuation, l'alimentation électrique et le passage jusqu'à l'emplacement. Le délai vous est confirmé à ce moment-là.</p>
        <h2>Commande et facturation</h2>
        <p>Aucun paiement n'est demandé sur le site : nous vous confirmons le montant exact de la machine et de son forfait par mail, puis nous vous facturons dans les conditions habituelles de votre compte.</p>
        <p>Vous hésitez entre deux modèles ? Appelez le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a> : dites-nous ce que vous lavez, en quelle quantité et avec quelle eau, nous vous dirons laquelle choisir.</p>`
    : p.surCommande
      ? `<h2>Livraison et facturation</h2>
        <p>Cet article est commandé chez ${esc(p.marque)} à la validation de votre commande : nous vous confirmons son délai par mail. Il vous est ensuite livré <b>sans frais de port</b> par l'un de nos techniciens, sur l'ensemble de notre zone d'intervention.</p>
        <p>Aucun paiement n'est demandé sur le site : nous vous confirmons votre commande et son montant par mail, puis nous vous facturons dans les conditions habituelles de votre compte.</p>
        <p>Un doute sur la compatibilité avec votre machine ? Appelez le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a> : nous vérifions avant de commander.</p>`
      : `<h2>Livraison et facturation</h2>
        ${
          // Tout n'est pas en stock. Quand un produit part en commande chez le
          // fabricant, son délai réel doit REMPLACER la promesse de tournée, pas
          // s'y ajouter.
          p.delai
            ? `<p>${esc(p.delai)}</p>`
            : `<p>Ce produit est livré <b>sans frais de port dès une unité</b> sur l'ensemble de notre zone d'intervention, par l'un de nos techniciens lors de sa prochaine tournée dans votre secteur.</p>`
        }
        <p>Aucun paiement n'est demandé sur le site : nous vous confirmons votre commande et son montant par mail, puis nous vous facturons dans les conditions habituelles de votre compte.</p>
        <p>Vous ne savez pas si cette référence correspond à votre machine ? Envoyez-nous une photo de la plaque signalétique, ou appelez le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a> : nous vérifions avant de livrer.</p>`;

  const lignesAchat = p.conditionnements
    .map(
      (cd, k) => `<div class="cond-row">
            <span class="cl">${esc(cd.label)}${cd.aConfirmer ? ' <i title="Caractéristiques à confirmer par nos équipes">*</i>' : ''}</span>
            ${prixTexte(cd)}
            ${boutonAjout(p, cd, k)}
          </div>`
    )
    .join('\n          ');

  // La ligne du forfait n'a pas de bouton : elle n'est pas « ajoutable », elle
  // accompagne la machine. Son prix est rafraîchi par panier.js comme les autres.
  const ligneForfait = forfait
    ? `<div class="cond-row forfait-row" data-forfait-de="${esc(forfait.ref)}">
            <span class="cl">+ Forfait livraison, installation et mise en service</span>
            ${prixTexte(fc)}
            <span class="forfait-note">Ajouté automatiquement avec la machine</span>
          </div>`
    : '';

  const plus = machine
    ? `<span>${svg('installation')}Livrée, installée et mise en service</span>
            <span>${svg('outils')}${marque?.agree ? `Distributeur agréé ${esc(p.marque)}` : 'Entretien et SAV par nos techniciens'}</span>
            <span>${svg('user')}Aucun paiement en ligne</span>`
    : p.surCommande
      ? `<span>${svg('camion')}Livraison offerte sur notre zone</span>
            <span>${svg('horloge')}Commandé chez ${esc(p.marque)}, délai confirmé par mail</span>
            <span>${svg('user')}Aucun paiement en ligne</span>`
    : p.delai
      ? `<span>${svg('camion')}Livraison comprise dans le prix</span>
            <span>${svg('horloge')}Commandé chez le fabricant, environ 10 jours</span>
            <span>${svg('user')}Aucun paiement en ligne</span>`
      : `<span>${svg('camion')}Livraison offerte dès une unité</span>
            <span>${svg('bidon')}En stock à Saint-Martin-de-Crau</span>
            <span>${svg('user')}Aucun paiement en ligne</span>`;

  const corps = `
<div class="phero compact">
  <div class="wrap">
    <p class="eyebrow on-dark">${esc(p.marque)} · Réf. ${esc(p.ref)}</p>
    <h1>${esc(p.nom)}</h1>
    <p>${esc(p.resume)}</p>
  </div>
</div>
${ariane(fil)}

<section data-fiche-ref="${esc(p.ref)}">
  <div class="wrap">
    <div class="grid-art">
      <article class="prose">
        ${noticePrix}
        <h2>${machine ? 'Cette machine' : 'À quoi sert ce produit'}</h2>
        <p>${esc(p.description)}</p>

        <h2>${machine ? 'Pour quels établissements' : 'Machines et usages concernés'}</h2>
        <ul class="ul-check">${p.usages.map((u) => `<li>${esc(u)}</li>`).join('')}</ul>

        <h2>Caractéristiques</h2>
        <ul>${p.caracteristiques.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        ${p.dosage ? `<p><b>Dosage constructeur :</b> ${esc(p.dosage)}</p>` : ''}

        ${
          // Lu AVANT la commande, pas après : d'où un encadré et non une puce.
          p.attention
            ? `<div class="mise-en-garde">
          <p><b>À vérifier avant de commander.</b> ${esc(p.attention)}</p>
        </div>`
            : ''
        }

        ${blocDocs}
        ${blocFichesFabricant}

        ${livraison}
        ${
          marque
            ? `<p>${esc(p.marque)} chez ${esc(site.nom)} : gammes, points forts et services associés sur notre <a href="/marques/${marque.slug}">page ${esc(p.marque)}</a>.</p>`
            : ''
        }
      </article>

      <aside>
        ${retraitVente(p)}
        <div class="achat">
          ${blocVisuel(p)}
          <h2>Commander</h2>
          <p class="achat-sub">${machine ? 'Machine et forfait d’installation' : p.conditionnements.length > 1 ? 'Choisissez votre conditionnement' : 'Conditionnement disponible'}</p>
          ${lignesAchat}
          ${ligneForfait}
          ${p.conditionnements.some((x) => x.aConfirmer) ? `<p class="achat-note">* Caractéristiques confirmées par nos équipes lors de la validation de votre commande.</p>` : ''}
          <div class="achat-plus">
            ${plus}
          </div>
          <a class="btn btn-outline btn-sm" href="${URL_PANIER}" style="width:100%;justify-content:center;margin-top:1rem">Voir mon panier →</a>
        </div>
      </aside>
    </div>
  </div>
</section>

${blocRealisations(realisationsDuProduit(p.ref), { sansLienVers: [p.ref] })}

${
  memeFamille.length
    ? `<section class="alt">
  <div class="wrap">
    <div class="sec-head center">
      <p class="eyebrow">${esc(c.nomCourt)}</p>
      <h2>${machine ? 'Les autres machines de la collection' : 'Autres références de la même famille'}</h2>
    </div>
    <div class="grid3">
      ${memeFamille.map(carteProduit).join('\n      ')}
    </div>
    <p class="lien-catalogue"><a class="btn btn-outline btn-sm" href="${urlCollection(c.slug)}">Toute la collection ${esc(c.nomCourt)} →</a></p>
  </div>
</section>`
    : ''
}

${
  machine
    ? blocCtaFinal('Un doute sur le bon modèle ?', "Dites-nous ce que vous lavez, en quelle quantité et avec quelle eau : nous vous indiquons la machine adaptée avant que vous commandiez.")
    : blocCtaFinal('Une machine à faire régler en même temps ?', "Le technicien qui vous livre peut contrôler votre doseur et vos températures dans la foulée. Parlez-nous-en à la commande.")
}`;

  return page(
    {
      titre: `${p.marque} ${p.nom} (${p.ref}) | ${site.nom}`,
      description: machine
        ? `${p.resume} Livrée, installée et mise en service par ${site.nom} dans les Bouches-du-Rhône, le Gard et le Vaucluse.`
        : p.surCommande
        ? `${p.resume} Livraison offerte en Provence par ${site.nom}, distributeur ${p.marque}.`
        : `${p.resume} Livraison offerte dès une unité en Provence par ${site.nom}, stock à Saint-Martin-de-Crau.`,
      chemin: adresse,
      typeOg: 'product',
      schemas: [schemaAriane(fil), schemaProduit],
    },
    corps,
    nav
  );
}

// ===========================================================================
// E-SHOP — panier /eshop/panier
// ===========================================================================
function commandePage() {
  const fil = [
    { nom: 'Accueil', url: '/' },
    { nom: 'Boutique', url: ESHOP },
    { nom: 'Mon panier', url: URL_PANIER },
  ];
  const communes = [...new Set(zones.flatMap((z) => z.communes))].sort((a, b) => a.localeCompare(b, 'fr'));

  const corps = `
<div class="phero compact">
  <div class="wrap">
    <p class="eyebrow on-dark">Boutique</p>
    <h1>Mon panier</h1>
    <p>Vérifiez votre liste, confirmez l'adresse de livraison et envoyez. Aucun paiement n'est demandé ici : nous vous confirmons tout par mail.</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid-art">
      <div>
        <div id="panier-vide" class="panier-vide">
          <p><b>Votre panier est vide.</b></p>
          <p>Parcourez la boutique et ajoutez ce dont vous avez besoin.</p>
          <a class="btn btn-primary" href="${ESHOP}">Voir la boutique</a>
        </div>
        <div id="panier-table" hidden>
          <table class="panier">
            <thead><tr><th>Article</th><th class="num">Qté</th><th class="num">Total</th><th></th></tr></thead>
            <tbody id="panier-lignes"></tbody>
          </table>
          <div class="panier-total">
            <span>Total estimé HT</span>
            <b id="panier-total">—</b>
          </div>
          <p class="panier-note" id="panier-note"></p>
          <p class="panier-note"><b>Produits d'entretien : livraison offerte</b> sur l'ensemble de notre zone d'intervention, sans minimum de commande.</p>
          <p class="panier-note" id="note-machines" hidden><b>Machines :</b> chacune est accompagnée de son forfait de livraison, d'installation et de mise en service. Il suit la quantité de la machine et ne peut pas en être séparé. Nous vérifions l'installation avec vous avant de commander la machine.</p>
        </div>
      </div>

      <aside>
        <form class="devis" id="form-commande" method="post" action="/api/commande" novalidate>
          <!-- Client reconnu : coordonnées reprises de sa fiche -->
          <p class="cx-client" id="cx-client" hidden></p>

          <!-- Visiteur : coordonnées à saisir -->
          <div id="zone-identite">
            <p class="cx-invite">Déjà client&nbsp;? <a href="/espace/connexion?suite=${encodeURIComponent(URL_PANIER)}">Connectez-vous</a> pour ne rien ressaisir et suivre vos commandes.</p>
            <h2>Vos coordonnées</h2>
            <div class="field"><label for="c-etab">Établissement *</label><input id="c-etab" name="etablissement" autocomplete="organization" required placeholder="Restaurant Le Mas"></div>
            <div class="field"><label for="c-nom">Nom du contact *</label><input id="c-nom" name="nom" autocomplete="name" required></div>
            <div class="row2">
              <div class="field"><label for="c-tel">Téléphone *</label><input id="c-tel" name="telephone" type="tel" autocomplete="tel" required></div>
              <div class="field"><label for="c-email">E-mail *</label><input id="c-email" name="email" type="email" autocomplete="email" required></div>
            </div>
          </div>

          <h2>Livraison</h2>
          <div class="field"><label for="c-adresse">Adresse de livraison *</label><input id="c-adresse" name="adresse" autocomplete="street-address" required></div>
          <div class="row2">
            <div class="field"><label for="c-cp">Code postal *</label><input id="c-cp" name="codePostal" inputmode="numeric" autocomplete="postal-code" required></div>
            <div class="field"><label for="c-commune">Commune *</label>
              <input id="c-commune" name="commune" list="liste-communes" autocomplete="address-level2" required>
              <datalist id="liste-communes">${communes.map((x) => `<option value="${esc(x)}">`).join('')}</datalist>
            </div>
          </div>
          <p class="hint"><span id="hint-fiche" hidden>Adresse reprise de votre fiche client, modifiable pour cette commande. </span>Nous livrons les ${communes.length} communes de notre zone. <a href="/zone-intervention">Voir la zone</a>.</p>
          <div class="field"><label for="c-message">Précisions</label><textarea id="c-message" name="message" placeholder="Référence de vos machines, accès à l'emplacement, créneau souhaité, numéro de commande interne…"></textarea></div>
          <div class="hp" aria-hidden="true"><label for="societe_web">Ne pas remplir</label><input id="societe_web" name="societe_web" tabindex="-1" autocomplete="off"></div>
          <label class="consent" id="c-consent"><input type="checkbox" name="consentement" required> J'accepte que mes informations soient utilisées pour traiter cette commande. <a href="/politique-de-confidentialite">Politique de confidentialité</a>.</label>
          <button class="btn btn-primary" type="submit" id="btn-commande" style="width:100%;justify-content:center">Envoyer ma commande</button>
          <p class="formmsg" id="commande-msg" role="status" aria-live="polite"></p>
          <p style="font-size:.76rem;color:var(--muted);margin:.9rem 0 0;text-align:center">Aucun paiement n'est demandé. Nous vous confirmons le montant par mail avant livraison. <a href="/cgv">Conditions générales de vente</a>.</p>
        </form>
      </aside>
    </div>
  </div>
</section>`;

  return page(
    {
      titre: `Mon panier — boutique | ${site.nom}`,
      description: `Finalisez votre commande de matériel et de produits d'entretien professionnels, sans paiement en ligne.`,
      chemin: URL_PANIER,
      noindex: true,
      schemas: [schemaAriane(fil)],
    },
    corps,
    nav
  );
}

// ===========================================================================
// FICHIERS TECHNIQUES
// ===========================================================================
function sitemapXml() {
  const u = pages
    .sort((a, b) => b.priorite - a.priorite)
    .map(
      (p) =>
        `  <url>\n    <loc>${url(p.chemin)}</loc>\n    <lastmod>${p.maj}</lastmod>\n    <changefreq>${p.priorite >= 0.9 ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${p.priorite.toFixed(1)}</priority>\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${u}\n</urlset>\n`;
}

function robots() {
  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${url('/sitemap.xml')}
`;
}

// ===========================================================================
// EXÉCUTION
// ===========================================================================
console.log(`\n🏗  Génération du site ${site.nom} → /${OUT}\n`);
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp('static', OUT, { recursive: true });

await ecrire('/', accueil(), { priorite: 1.0 });
await ecrire('/services', servicesHub(), { priorite: 0.9 });
for (const s of services) await ecrire(`/services/${s.slug}`, servicePage(s), { priorite: 0.9 });
await ecrire('/zone-intervention', zoneHub(), { priorite: 0.9 });
for (const z of zones) await ecrire(`/zone-intervention/${z.slug}`, zonePage(z), { priorite: 0.8 });
for (const v of villes) await ecrire(`/zone-intervention/${v.slug}`, villePage(v), { priorite: 0.8 });
await ecrire('/qr', pageQr(), { dansSitemap: false });
await ecrire('/qr/panne', pagePanne(), { dansSitemap: false });
await ecrire('/qr/audit', pageAudit(), { dansSitemap: false });
await ecrire(ESHOP, eshopAccueil(), { priorite: 0.9 });
await ecrire(URL_CATALOGUE, cataloguePage(), { priorite: 0.7 });
for (const r of rayonsBoutique) {
  const enLigne = collectionsDuRayon(r.slug).length > 0;
  await ecrire(urlRayon(r.slug), rayonPage(r), { priorite: 0.8, dansSitemap: enLigne });
}
for (const c of categoriesPubliques) await ecrire(urlCollection(c.slug), collectionPage(c), { priorite: 0.8 });
for (const p of produitsPublics) await ecrire(urlProduit(p), produitPage(p), { priorite: 0.7 });
await ecrire(URL_PANIER, commandePage(), { priorite: 0.1, dansSitemap: false });
await ecrire('/conseils', conseilsHub(), { priorite: 0.7 });
for (const a of articles) await ecrire(`/conseils/${a.slug}`, articlePage(a), { priorite: 0.6, majParDefaut: a.date });
await ecrire('/a-propos', aPropos(), { priorite: 0.7 });
await ecrire('/marques', marquesHub(), { priorite: 0.8 });
for (const m of marques) await ecrire(`/marques/${m.slug}`, marquePage(m), { priorite: 0.7 });
await ecrire('/recrutement', recrutementHub(), { priorite: 0.6 });
// Une offre pourvue reste publiée, en priorité basse : les candidats qui ont
// gardé le lien tombent sur « poste pourvu » plutôt que sur un 404, et la page
// conserve le référencement qu'elle a mis des mois à acquérir.
for (const o of offres) {
  await ecrire(`/recrutement/${o.slug}`, offrePage(o), { priorite: o.active ? 0.7 : 0.2, majParDefaut: o.publieeLe });
}
await ecrire('/contact', contact(), { priorite: 0.9 });
await ecrire('/mentions-legales', mentions(), { priorite: 0.2 });
// Les CGV sont l'adresse citée au bas de chaque devis, bon de commande, bon de
// livraison et facture (bloc COMMUN-2 du cahier des charges GDSOFT) : cette URL
// doit exister et ne doit jamais changer.
await ecrire('/cgv', conditionsGenerales(), { priorite: 0.3 });
await ecrire('/politique-de-confidentialite', confidentialite(), { priorite: 0.2 });
await ecrire('/plan-du-site', planDuSite(), { priorite: 0.3 });

await writeFile(join(OUT, '404.html'), page404(), 'utf8');
await writeFile(join(OUT, 'sitemap.xml'), sitemapXml(), 'utf8');
await writeFile(join(OUT, 'robots.txt'), robots(), 'utf8');

console.log(`\n✅ ${pages.length} pages générées + 404, sitemap.xml et robots.txt\n`);
