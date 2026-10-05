// ---------------------------------------------------------------------------
// Pages de recrutement et formulaire de candidature.
//
// Ce qui est vérifié ici n'est pas visible à l'œil nu sur la page, et c'est
// exactement pour cela que ça casse sans prévenir :
//
//   — une offre dont la date de validité est dépassée sort silencieusement de
//     Google for Jobs ; la page reste en ligne, personne ne la trouve plus ;
//   — un salaire affiché qui ne correspond plus au salaire balisé donne deux
//     montants différents au candidat et à Google ;
//   — un menu « Poste » désaccordé avec data/recrutement.mjs fait refuser
//     toutes les candidatures par l'API, en silence, côté serveur ;
//   — une promesse de conservation du CV écrite sur le formulaire mais absente
//     de la politique de confidentialité se retourne contre SODILAME.
// ---------------------------------------------------------------------------
import { readFileSync, existsSync } from 'node:fs';
import { offres, offresActives, postes, emailRecrutement } from '../data/recrutement.mjs';

let ok = 0;
let ko = 0;
const verifier = (nom, cond, detail = '') => {
  if (cond) { ok++; console.log(`  ✓ ${nom}`); }
  else { ko++; console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`); }
};
const lire = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '');

console.log('\n═══ Page /recrutement ═══');

const hub = lire('public/recrutement/index.html');
verifier('la page existe', !!hub);
verifier('elle annonce les postes ouverts', hub.includes('Postes ouverts'));
verifier('chaque offre active y est présentée',
  offresActives.every((o) => hub.includes(`/recrutement/${o.slug}`)),
  offresActives.filter((o) => !hub.includes(o.slug)).map((o) => o.slug).join(', '));
verifier('une candidature spontanée reste possible depuis le hub',
  hub.includes('Candidature spontanée'));

// Le pied de page mène au recrutement depuis n'importe où : c'est le chemin
// qu'emprunte quelqu'un qui est arrivé sur le site pour une tout autre raison.
verifier('le pied de page renvoie au recrutement depuis toutes les pages',
  lire('public/index.html').includes('href="/recrutement"'));

console.log('\n═══ Offres ═══');

const aujourdhui = new Date().toISOString().slice(0, 10);

for (const o of offres) {
  const chemin = `public/recrutement/${o.slug}/index.html`;
  const html = lire(chemin);
  console.log(`  — ${o.titreCourt}`);
  verifier(`    la page est générée`, !!html, chemin);
  if (!html) continue;

  const blocs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .map((m) => JSON.parse(m[1]));
  const job = blocs.find((b) => b['@type'] === 'JobPosting');

  verifier('    le balisage JobPosting est présent', !!job);
  if (!job) continue;

  // Les champs sans lesquels Google refuse ou déclasse l'offre.
  for (const champ of ['title', 'description', 'datePosted', 'validThrough', 'hiringOrganization', 'jobLocation', 'employmentType', 'baseSalary']) {
    verifier(`    champ obligatoire : ${champ}`, !!job[champ]);
  }

  // Le piège silencieux : une date de validité dépassée retire l'offre des
  // résultats sans rien casser d'autre.
  if (o.active) {
    verifier("    l'offre active n'est pas périmée",
      o.valideJusquau >= aujourdhui,
      `valide jusqu'au ${o.valideJusquau}, nous sommes le ${aujourdhui}`);
    verifier('    la date de publication n’est pas dans le futur', o.publieeLe <= aujourdhui, o.publieeLe);
  }

  // Le candidat et Google doivent lire le même montant.
  verifier('    le salaire balisé correspond au salaire affiché',
    job.baseSalary.value.minValue === o.salaire.min &&
    job.baseSalary.value.maxValue === o.salaire.max &&
    html.includes(o.salaire.texte),
    `${job.baseSalary.value.minValue}–${job.baseSalary.value.maxValue} / « ${o.salaire.texte} »`);

  verifier('    l’employeur est SODILAME, pas un agrégateur',
    job.hiringOrganization.name === 'SODILAME');
  verifier('    le lieu de travail est renseigné',
    job.jobLocation.address.postalCode === '13310');
  verifier('    la candidature se fait sur le site (directApply)', job.directApply === true);

  // Une offre pourvue reste en ligne, mais le dit.
  if (!o.active) {
    verifier('    une offre pourvue l’annonce clairement', /poste est pourvu/i.test(html));
  }
}

console.log('\n═══ Formulaire de candidature ═══');

const offre = offresActives[0];
const page = offre ? lire(`public/recrutement/${offre.slug}/index.html`) : hub;

verifier('le formulaire est présent sur la page de l’offre', page.includes('id="form-candidature"'));
for (const champ of ['nom', 'telephone', 'email', 'poste', 'consentement']) {
  verifier(`champ « ${champ} »`, page.includes(`name="${champ}"`));
}
verifier('le piège à robots est en place', page.includes('name="societe_web"'));
verifier('le CV peut être joint', page.includes('id="k-cv"'));

// Le CV est FACULTATIF : exiger un PDF écarterait précisément les candidats que
// ce poste vise, qui postulent depuis leur téléphone.
verifier('le CV n’est pas obligatoire', !/id="k-cv"[^>]*\srequired/.test(page));
verifier('la page le dit au candidat', /Pas de CV sous la main/i.test(page));

// Vocabulaire fermé : l'API refuse tout poste absent de cette liste. Si le menu
// et data/recrutement.mjs divergent, plus aucune candidature ne passe.
const manquants = postes.filter((p) => !page.includes(`>${p}</option>`));
verifier('le menu « Poste » correspond exactement à la liste acceptée par l’API',
  !manquants.length, manquants.join(' | '));

const js = lire('public/assets/candidature.js');
verifier('le script est publié', !!js);
verifier('il demande un jeton avant d’envoyer', /demanderJeton/.test(js));
verifier('il rejoue un envoi jugé trop rapide', /trop_vite/.test(js));
verifier('il recompresse les photos de CV', /toDataURL\('image\/jpeg'/.test(js));
verifier('il est chargé par les pages du site', page.includes('/assets/candidature.js'));

console.log('\n═══ Données personnelles ═══');

// Le formulaire promet deux ans et la seule direction. La politique de
// confidentialité doit dire la même chose : c'est elle qui fait foi.
const conf = lire('public/politique-de-confidentialite/index.html');
verifier('la politique de confidentialité couvre les candidatures', /candidature/i.test(conf));
verifier('elle annonce la même durée de conservation que le formulaire',
  /deux ans au plus/.test(conf) && /deux ans au plus/.test(page));
verifier('elle précise que le CV ne circule pas dans l’entreprise',
  /seule direction/i.test(conf));

// L'adresse de recrutement est publiée sur les pages de recrutement — et
// nulle part ailleurs : c'est une boîte de direction, pas une adresse de
// contact général.
verifier('l’adresse de recrutement est donnée au candidat', hub.includes(emailRecrutement));
verifier('elle n’apparaît pas sur les pages commerciales',
  !lire('public/index.html').includes(emailRecrutement) &&
  !lire('public/contact/index.html').includes(emailRecrutement));

console.log('\n═══ Référencement ═══');

const sitemap = lire('public/sitemap.xml');
verifier('le recrutement est dans le sitemap', sitemap.includes('/recrutement'));
for (const o of offresActives) {
  verifier(`l’offre « ${o.titreCourt} » est dans le sitemap`, sitemap.includes(`/recrutement/${o.slug}`));
}
verifier('les pages de recrutement sont indexables',
  !/name="robots" content="noindex/.test(hub) && !/name="robots" content="noindex/.test(page));

console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
