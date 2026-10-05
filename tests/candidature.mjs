// ---------------------------------------------------------------------------
// Bout en bout sur /api/candidature.
//
// Le point d'entrée est monté derrière un vrai serveur HTTP, avec un objet
// `res` façon Vercel ; les appels à Resend sont interceptés et comptés, rien ne
// part vers l'extérieur.
//
// Ce que ce fichier protège en priorité : une candidature qui se perd. Un CV
// trop lourd, un format inattendu, un champ oublié — chacun de ces cas doit
// laisser passer la candidature plutôt que la refuser. On recrute des
// techniciens, pas des webmasters.
//
// Les pauses de deux secondes sont voulues : c'est le délai minimum entre la
// délivrance du jeton et l'envoi (voir lib/antispam.mjs).
// ---------------------------------------------------------------------------
import { createServer } from 'node:http';

process.env.FORM_SECRET = 'cle-de-test-suffisamment-longue-pour-signer-les-jetons';
process.env.RESEND_API_KEY = 're_faux_pour_le_test';
process.env.MAIL_RECRUTEMENT = 'direction@sodilame.fr';

const envois = [];
const vraiFetch = globalThis.fetch;
globalThis.fetch = async (url, opts) => {
  if (String(url).includes('api.resend.com')) {
    envois.push(JSON.parse(opts.body));
    return { ok: true, status: 200, text: async () => 'ok' };
  }
  return vraiFetch(url, opts);
};

const { default: handler } = await import('../api/candidature.js');
const { postes } = await import('../data/recrutement.mjs');

const srv = createServer(async (req, res) => {
  const m = [];
  for await (const c of req) m.push(c);
  req.body = Buffer.concat(m).toString('utf8') || undefined;
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (o) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); return res; };
  try { await handler(req, res); } catch (e) { res.statusCode = 500; res.end(String(e?.stack)); }
});

await new Promise((r) => srv.listen(0, r));
const base = `http://127.0.0.1:${srv.address().port}`;

let ok = 0, ko = 0;
const verifier = (n, c, d = '') => {
  if (c) { ok++; console.log(`  ✓ ${n}`); }
  else { ko++; console.log(`  ✗ ${n}${d ? ' — ' + d : ''}`); }
};

let compteurIp = 0;
const NAV = () => ({
  Origin: 'https://www.sodilame.com',
  Host: 'www.sodilame.com',
  'X-Forwarded-For': `203.0.113.${++compteurIp}`,
});

const poster = (corps, entetes) =>
  vraiFetch(`${base}/api/candidature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...entetes },
    body: JSON.stringify(corps),
  }).then(async (r) => ({ statut: r.status, corps: await r.json() }));

const jetonDe = async () => {
  const r = await vraiFetch(`${base}/api/candidature`, { headers: { Accept: 'application/json' } });
  return (await r.json()).jeton;
};
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

const CANDIDAT = {
  poste: postes[0],
  nom: 'Kevin Roussel',
  telephone: '06 11 22 33 44',
  email: 'kevin.roussel@exemple.fr',
  ville: 'Salon-de-Provence',
  message: "Je suis actuellement en maintenance industrielle, j'aimerais passer sur de la cuisine pro.",
  permis: 'on',
  consentement: 'on',
};

// Charge utile factice : l'API ne décode pas le fichier, elle valide l'en-tête,
// le type et le poids. Un base64 de la bonne longueur suffit.
const b64 = (octets) => 'A'.repeat(Math.ceil(octets / 3) * 4);
const pdf = (o) => `data:application/pdf;base64,${b64(o)}`;

console.log('\n═══ Bout en bout sur /api/candidature ═══');

{
  const n = envois.length;
  const r = await poster(CANDIDAT);
  verifier('robot sans Origin ni jeton : rien n’est transmis',
    r.statut === 200 && envois.length === n, `${envois.length - n} e-mail(s)`);
}

// Parcours normal, avec CV.
{
  const ent = NAV();
  const jeton = await jetonDe();
  verifier('GET délivre un jeton', typeof jeton === 'string' && jeton.startsWith('1.'));
  await attendre(2300);

  const n = envois.length;
  const r = await poster(
    { ...CANDIDAT, jeton, fichiers: [{ nom: 'CV Kevin Roussel.pdf', data: pdf(120_000) }] },
    ent
  );
  verifier('la candidature passe', r.statut === 200 && r.corps.ok, JSON.stringify(r.corps));
  verifier('une référence est attribuée', /^C\d{6}-\d{4}$/.test(r.corps.reference || ''), r.corps.reference);
  verifier('deux e-mails partent : la direction et l’accusé de réception',
    envois.length - n === 2, `${envois.length - n}`);

  const pourSodilame = envois[n];
  verifier('la candidature va à la direction, pas à la boîte partagée',
    pourSodilame.to[0] === 'direction@sodilame.fr', pourSodilame.to.join());
  verifier('la réponse est dirigée vers le candidat', pourSodilame.reply_to === CANDIDAT.email);
  verifier('l’objet identifie une candidature', /^\[Candidature\]/.test(pourSodilame.subject), pourSodilame.subject);
  verifier('le CV est joint', (pourSodilame.attachments || []).length === 1);
  verifier('le nom du fichier est assaini',
    pourSodilame.attachments?.[0]?.filename === 'CV_Kevin_Roussel.pdf',
    pourSodilame.attachments?.[0]?.filename);
  verifier('le permis B est transmis', /Permis B/.test(pourSodilame.html));
  verifier('l’accusé de réception part au candidat', envois[n + 1].to[0] === CANDIDAT.email);
  verifier('l’accusé n’annonce aucun délai de réponse chiffré',
    !/24\s*h|48\s*h|sous \d+ (jours|heures)/i.test(envois[n + 1].text), envois[n + 1].text.slice(0, 200));
  verifier('l’accusé informe de la durée de conservation',
    /deux ans/.test(envois[n + 1].text));
}

// Sans CV : c'est un cas normal, pas une erreur.
{
  const ent = NAV();
  const jeton = await jetonDe();
  await attendre(2300);
  const n = envois.length;
  const r = await poster({ ...CANDIDAT, email: 'sans.cv@exemple.fr', jeton }, ent);
  verifier('une candidature sans CV est acceptée', r.statut === 200 && r.corps.ok, JSON.stringify(r.corps));
  verifier('l’e-mail signale l’absence de CV et invite à rappeler',
    /Aucun CV joint/.test(envois[n].html));
  verifier('aucune pièce jointe', !(envois[n].attachments || []).length);
}

// CV trop lourd : la candidature passe quand même, sans le fichier. Perdre un
// candidat parce que son PDF fait 5 Mo serait absurde.
{
  const ent = NAV();
  const jeton = await jetonDe();
  await attendre(2300);
  const n = envois.length;
  const r = await poster(
    { ...CANDIDAT, email: 'lourd@exemple.fr', jeton, fichiers: [{ nom: 'cv.pdf', data: pdf(6_000_000) }] },
    ent
  );
  verifier('un CV trop lourd n’empêche pas la candidature', r.statut === 200 && r.corps.ok);
  verifier('le fichier est écarté, pas la candidature',
    !(envois[n].attachments || []).length && /Aucun CV joint/.test(envois[n].html));
}

// Format non autorisé (exécutable) : écarté, candidature conservée.
{
  const ent = NAV();
  const jeton = await jetonDe();
  await attendre(2300);
  const n = envois.length;
  const r = await poster(
    { ...CANDIDAT, email: 'exe@exemple.fr', jeton,
      fichiers: [{ nom: 'cv.exe', data: `data:application/x-msdownload;base64,${b64(1000)}` }] },
    ent
  );
  verifier('un fichier exécutable est écarté',
    r.statut === 200 && !(envois[n].attachments || []).length);
}

// Photo de CV prise au téléphone — le cas le plus fréquent après le PDF.
{
  const ent = NAV();
  const jeton = await jetonDe();
  await attendre(2300);
  const n = envois.length;
  await poster(
    { ...CANDIDAT, email: 'photo@exemple.fr', jeton,
      fichiers: [{ nom: 'IMG_4312.jpg', data: `data:image/jpeg;base64,${b64(300_000)}` }] },
    ent
  );
  verifier('une photo de CV est acceptée',
    envois[n].attachments?.[0]?.filename === 'IMG_4312.jpg', envois[n].attachments?.[0]?.filename);
}

// Poste inventé : ramené à « Candidature spontanée » plutôt que refusé.
{
  const ent = NAV();
  const jeton = await jetonDe();
  await attendre(2300);
  const n = envois.length;
  const r = await poster({ ...CANDIDAT, email: 'poste@exemple.fr', poste: 'Directeur général', jeton }, ent);
  verifier('un poste hors liste devient une candidature spontanée',
    r.statut === 200 && /Candidature spontanée/.test(envois[n].html), envois[n].subject);
}

// Champs manquants et spam.
{
  const ent = NAV();
  const jeton = await jetonDe();
  await attendre(2300);
  const r = await poster({ ...CANDIDAT, jeton, telephone: '' }, ent);
  verifier('le téléphone manquant donne un message clair',
    r.statut === 400 && /téléphone/.test(r.corps.erreur), JSON.stringify(r.corps));
}

{
  const ent = NAV();
  const jeton = await jetonDe();
  await attendre(2300);
  const n = envois.length;
  const r = await poster(
    { ...CANDIDAT, jeton, nom: 'Weelankelm', ville: 'Weelankelm', telephone: '85325872322',
      message: 'escort application http://tinyurl.com/x' },
    ent
  );
  verifier('un envoi manifestement automatique est refusé',
    r.statut === 422 && envois.length === n, JSON.stringify(r.corps));
  verifier('le refus laisse une porte de sortie au candidat',
    /direction@sodilame\.fr/.test(r.corps.erreur || '') && /04 90 93 98 88/.test(r.corps.erreur || ''));
}

{
  const ent = NAV();
  const jeton = await jetonDe();
  await attendre(2300);
  const n = envois.length;
  const r = await poster({ ...CANDIDAT, email: 'piege@exemple.fr', jeton, societe_web: 'spam' }, ent);
  verifier('le piège à robots : ok de façade, rien d’envoyé',
    r.statut === 200 && envois.length === n);
}

// Une même adresse ne peut pas noyer la direction sous les candidatures.
{
  const ent = NAV();
  const statuts = [];
  for (let i = 0; i < 5; i++) {
    const jeton = await jetonDe();
    await attendre(2200);
    const r = await poster({ ...CANDIDAT, email: 'insistant@exemple.fr', jeton }, NAV());
    statuts.push(r.statut);
  }
  verifier('une même adresse est freinée après trois envois',
    statuts.filter((s) => s === 200).length === 3 && statuts[3] === 429,
    statuts.join(', '));
}

srv.close();
console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
