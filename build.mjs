// ---------------------------------------------------------------------------
// Générateur du site statique SODILAME
//   node build.mjs   →   génère le dossier /public prêt à déployer sur Vercel
// ---------------------------------------------------------------------------
import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { site, formules, secteurs } from './data/site.mjs';
import { services, servicesNav } from './data/services.mjs';
import { villes, villesNav } from './data/villes.mjs';
import { articles } from './data/articles.mjs';
import {
  page, ariane, schemaAriane, schemaLocalBusiness, schemaFaq, blocFaq, blocSecteurs,
  blocEtapes, blocFormules, blocMySodilame, blocCtaFinal, blocContact, formulaire,
  svg, esc, url, A,
} from './src/layout.mjs';

const OUT = 'public';
const nav = { services: servicesNav, villes: villesNav };
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
      r: `<p>Principalement les Bouches-du-Rhône (13), le Gard (30) et le Vaucluse (84) : ${villes.map((v) => v.nom).join(', ')} et leurs alentours. Pour les projets d'installation complète, nous étudions les demandes au-delà de cette zone.</p>`,
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
        <p class="lead">Notre atelier et notre magasin de pièces se trouvent ${A.complement}, à ${A.ville}. Cette position centrale nous permet d'intervenir rapidement sur les Bouches-du-Rhône, le Gard et le Vaucluse.</p>
        <div class="zone-list">
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
      <div class="map-box"><div class="ph dark">${photoPlaceholder("Photo de l'équipe et de l'atelier")}</div></div>
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
function carte() {
  // Iframe de la fiche Google Business Profile réelle de SODILAME (établissement identifié,
  // pas une simple recherche d'adresse) — renforce la cohérence avec la fiche Google.
  return `<iframe title="SODILAME sur Google Maps — ${A.rue}, ${A.codePostal} ${A.ville}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" src="${site.carteEmbed}"></iframe>`;
}

function photoPlaceholder(texte) {
  return `<div><img src="/assets/mark@2x.png" alt="" width="80" height="112" style="margin:0 auto 1rem;opacity:.9" loading="lazy"><span style="font-size:.8rem">[ ${esc(texte)} — à intégrer ]</span></div>`;
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
    <h1>Cuisines professionnelles : nous intervenons dans le 13, le 30 et le 84</h1>
    <p>Notre atelier et notre magasin de pièces sont à ${A.ville}, au centre du triangle Arles – Salon – Avignon. C'est cette position qui nous permet d'annoncer des délais réalistes plutôt que des promesses.</p>
  </div>
</div>
${ariane(fil)}

<section>
  <div class="wrap">
    <div class="grid2">
      <div>
        <h2>Une implantation qui n'est pas un détail commercial</h2>
        <p class="lead">Beaucoup d'entreprises affichent une « couverture nationale ». Dans notre métier, cela signifie généralement une sous-traitance locale et un délai de pièce qui s'allonge.</p>
        <p>Nous faisons l'inverse : une zone volontairement resserrée autour de ${A.ville}, des techniciens salariés qui connaissent les établissements, et un stock physique de pièces à moins d'une heure de la plupart de nos clients.</p>
        <p>Concrètement, cela veut dire qu'une panne de froid sur Arles ou Istres peut être traitée dans la journée quand la pièce est en stock — et que nous vous le dirons franchement quand ce n'est pas le cas.</p>
      </div>
      <div class="map-box">${carte()}</div>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="sec-head center"><p class="eyebrow">Nos secteurs</p><h2>Choisissez votre commune</h2></div>
    <div class="grid3">
      ${villes
        .map(
          (v) => `<a class="card" href="/zone-intervention/${v.slug}">
        <div class="ico">${svg('pin')}</div>
        <h3>${esc(v.nom)}</h3>
        <p>${esc(v.cp)} · ${esc(v.departement)} — ${esc(v.distance)}</p>
        <span class="more">Voir la page →</span>
      </a>`
        )
        .join('\n      ')}
    </div>
    <p class="center" style="margin-top:2.4rem;color:var(--muted)">Votre commune ne figure pas dans cette liste ? Appelez le <a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a> : nous étudions chaque demande, en particulier pour les projets d'installation complète.</p>
  </div>
</section>

${blocCtaFinal('Une intervention à programmer ?', "Dites-nous où vous êtes et ce qui ne va pas. Nous vous annonçons un créneau réaliste, pas un délai commercial.")}`;

  return page(
    {
      titre: `Zone d'intervention — Cuisine professionnelle 13, 30, 84 | ${site.nom}`,
      description: `${site.nom} intervient sur les Bouches-du-Rhône, le Gard et le Vaucluse : Arles, Salon, Avignon, Nîmes, Aix, Marseille, Istres. Cuisines professionnelles.`,
      chemin: '/zone-intervention',
      schemas: [schemaAriane(fil)],
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
  ];

  const lb = schemaLocalBusiness();
  lb['@id'] = url(`/zone-intervention/${v.slug}#service`);
  lb.areaServed = v.communes.map((c) => ({ '@type': 'City', name: c }));

  const corps = `
<div class="phero">
  <div class="wrap">
    <p class="eyebrow on-dark">${esc(v.departement)} (${esc(v.dep)}) · ${esc(v.distance)}</p>
    <h1>Cuisine professionnelle à ${esc(v.nom)} : installation, dépannage et entretien</h1>
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
  const autres = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
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
        <div class="map-box"><div class="ph dark">${photoPlaceholder("Photo de l'équipe")}</div></div>
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
<p>Nous ne collectons aucune donnée sensible et nous ne pratiquons aucun profilage.</p>

<h2>Pourquoi nous les traitons</h2>
<p>Ces données servent exclusivement à traiter votre demande : vous recontacter, établir un devis, planifier une intervention. La base légale est votre consentement, recueilli par la case à cocher du formulaire, ainsi que l'exécution de mesures précontractuelles prises à votre demande.</p>
<p>Nous n'utilisons pas ces données à des fins de prospection commerciale non sollicitée et nous ne les revendons à personne.</p>

<h2>Combien de temps nous les conservons</h2>
<p>Les demandes sans suite sont conservées 3 ans à compter du dernier contact. Les données liées à une relation commerciale sont conservées pendant la durée de la relation, puis selon les durées légales de conservation applicables aux documents commerciaux et comptables.</p>

<h2>Qui y a accès</h2>
<p>Les demandes sont reçues par courrier électronique par l'équipe de ${site.legal.raisonSociale}. Les prestataires techniques qui interviennent dans l'acheminement (hébergeur du site, service d'envoi d'e-mails, fournisseur de messagerie) agissent en tant que sous-traitants et n'utilisent pas vos données pour leur propre compte.</p>

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
      { nom: "Zone d'intervention", url: '/zone-intervention' },
      { nom: 'Conseils', url: '/conseils' },
      { nom: "L'entreprise", url: '/a-propos' },
      { nom: 'Contact', url: '/contact' },
    ])}
${bloc('Services', services.map((s) => ({ nom: s.nom, url: `/services/${s.slug}` })))}
${bloc("Zone d'intervention", villes.map((v) => ({ nom: `Cuisine professionnelle à ${v.nom}`, url: `/zone-intervention/${v.slug}` })))}
${bloc('Conseils', articles.map((a) => ({ nom: a.titre, url: `/conseils/${a.slug}` })))}
${bloc('Informations', [
      { nom: 'Mentions légales', url: '/mentions-legales' },
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
await ecrire('/zone-intervention', zoneHub(), { priorite: 0.8 });
for (const v of villes) await ecrire(`/zone-intervention/${v.slug}`, villePage(v), { priorite: 0.8 });
await ecrire('/conseils', conseilsHub(), { priorite: 0.7 });
for (const a of articles) await ecrire(`/conseils/${a.slug}`, articlePage(a), { priorite: 0.6, majParDefaut: a.date });
await ecrire('/a-propos', aPropos(), { priorite: 0.7 });
await ecrire('/contact', contact(), { priorite: 0.9 });
await ecrire('/mentions-legales', mentions(), { priorite: 0.2 });
await ecrire('/politique-de-confidentialite', confidentialite(), { priorite: 0.2 });
await ecrire('/plan-du-site', planDuSite(), { priorite: 0.3 });

await writeFile(join(OUT, '404.html'), page404(), 'utf8');
await writeFile(join(OUT, 'sitemap.xml'), sitemapXml(), 'utf8');
await writeFile(join(OUT, 'robots.txt'), robots(), 'utf8');

console.log(`\n✅ ${pages.length} pages générées + 404, sitemap.xml et robots.txt\n`);
