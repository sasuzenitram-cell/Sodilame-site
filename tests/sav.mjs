// Banc d'essai de /api/sav — les e-mails sont capturés, rien ne part.
process.env.RESEND_API_KEY = 'cle-de-test';
process.env.MAIL_DESTINATION = 'sodilame@sodilame.fr';

const mails = [];
const vraiFetch = globalThis.fetch;
globalThis.fetch = async (url, opts) => {
  if (String(url).includes('api.resend.com')) {
    mails.push(JSON.parse(opts.body));
    return { ok: true, status: 200, text: async () => 'ok' };
  }
  return vraiFetch(url, opts);
};

const { default: sav } = await import('../api/sav.js');

let ok = 0;
let ko = 0;
const verifier = (nom, cond, detail = '') => {
  if (cond) { ok++; console.log(`  ✓ ${nom}`); }
  else { ko++; console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`); }
};

async function appel(corps, ip = '203.0.113.7') {
  const req = { method: 'POST', headers: { 'x-forwarded-for': ip }, socket: {}, body: corps };
  const res = { statusCode: 0, corps: null, setHeader() {}, end(c) { this.corps = JSON.parse(c); } };
  await sav(req, res);
  return res;
}

const panne = {
  type: 'panne', etablissement: 'Restaurant Le Mas', telephone: '06 12 34 56 78',
  nom: 'Marie Dupont', email: 'marie@lemas.fr',
  machine: 'Four Rational iCombi Pro', description: 'Ne chauffe plus, code E12.',
};

const audit = {
  type: 'audit', etablissement: 'Hôtel des Alpilles', commune: 'Saint-Rémy-de-Provence',
  telephone: '0490000002', description: 'Une dizaine d’équipements, chambre froide qui inquiète.',
};

console.log('\n═══ Signalement de panne ═══');
{
  const r = await appel(panne, '10.1.0.1');
  verifier('accepté', r.statusCode === 200 && r.corps.ok, JSON.stringify(r.corps));
  verifier('référence attribuée', /^P\d{6}-\d{4}$/.test(r.corps.reference || ''), r.corps.reference);
  const m = mails.find((x) => x.to[0] === 'sodilame@sodilame.fr');
  verifier('SODILAME est notifiée', !!m);
  verifier('le sujet identifie une panne', /^\[PANNE\]/.test(m.subject), m.subject);
  verifier("l'équipement est dans le sujet", /iCombi/.test(m.subject));
  verifier('réponse dirigée vers le client', m.reply_to === 'marie@lemas.fr');
  verifier('accusé de réception au client', mails.some((x) => x.to[0] === 'marie@lemas.fr'));
}

console.log('\n═══ Panne sans e-mail ═══');
{
  const avant = mails.length;
  const r = await appel({ ...panne, email: '' }, '10.1.0.2');
  verifier('accepté', r.statusCode === 200);
  const m = mails[mails.length - 1];
  verifier('aucun accusé sans e-mail fourni', mails.length === avant + 1);
  verifier('pas de reply-to sans e-mail client', !m.reply_to);
}

console.log('\n═══ Demande d’audit ═══');
{
  const r = await appel(audit, '10.1.0.3');
  verifier('accepté', r.statusCode === 200 && r.corps.ok);
  verifier('référence en A', /^A\d{6}-\d{4}$/.test(r.corps.reference || ''), r.corps.reference);
  const m = mails[mails.length - 1];
  verifier('sujet identifiable', /^\[Audit\]/.test(m.subject), m.subject);
  verifier('la commune est transmise', /Saint-Rémy/.test(m.html));
}

console.log('\n═══ Champs manquants ═══');
{
  const sansTel = await appel({ ...panne, telephone: '' }, '10.1.0.4');
  verifier('téléphone obligatoire', sansTel.statusCode === 400 && /téléphone/.test(sansTel.corps.erreur));

  const telCourt = await appel({ ...panne, telephone: '0612' }, '10.1.0.5');
  verifier('téléphone trop court refusé', telCourt.statusCode === 400);

  const sansMachine = await appel({ ...panne, machine: '' }, '10.1.0.6');
  verifier('produit en panne obligatoire', sansMachine.statusCode === 400 && /produit en panne/.test(sansMachine.corps.erreur), sansMachine.corps.erreur);

  const sansCommune = await appel({ ...audit, commune: '' }, '10.1.0.7');
  verifier('commune obligatoire pour un audit', sansCommune.statusCode === 400 && /commune/.test(sansCommune.corps.erreur));

  const mailFaux = await appel({ ...panne, email: 'marie(at)lemas.fr' }, '10.1.0.8');
  verifier('e-mail invalide refusé', mailFaux.statusCode === 400);

  const auditSansMachine = await appel(audit, '10.1.0.9');
  verifier("l'audit n'exige pas d'équipement", auditSansMachine.statusCode === 200);
}

console.log('\n═══ Photos et vidéos ═══');
{
  // Charge utile factice : l'API ne décode pas l'image, elle valide l'en-tête,
  // le type MIME et le poids. Un base64 de la bonne longueur suffit.
  const b64 = (octets) => 'A'.repeat(Math.ceil(octets / 3) * 4);
  const img = (o) => `data:image/jpeg;base64,${b64(o)}`;

  {
    const r = await appel(
      { ...panne, email: '', fichiers: [{ nom: 'photo 1.jpg', data: img(80_000) }] },
      '10.2.0.1'
    );
    const m = mails[mails.length - 1];
    verifier('photo acceptée', r.statusCode === 200);
    verifier('la photo est jointe à l’e-mail', (m.attachments || []).length === 1);
    verifier('nom de fichier assaini', m.attachments?.[0]?.filename === 'photo_1.jpg', m.attachments?.[0]?.filename);
    verifier('le corps annonce la pièce jointe', /1 pièce jointe/.test(m.html));
    verifier('la version texte aussi', /1 pièce\(s\) jointe\(s\)/.test(m.text));
  }

  {
    const r = await appel(
      { ...panne, email: '', fichiers: [{ nom: 'clip.mp4', data: `data:video/mp4;base64,${b64(1_200_000)}` }] },
      '10.2.0.2'
    );
    const m = mails[mails.length - 1];
    verifier('vidéo mp4 acceptée', r.statusCode === 200 && (m.attachments || []).length === 1);
    verifier('extension conservée', m.attachments?.[0]?.filename === 'clip.mp4', m.attachments?.[0]?.filename);
  }

  {
    const r = await appel(
      { ...panne, email: '', fichiers: [{ nom: 'agenda.pdf', data: `data:application/pdf;base64,${b64(20_000)}` }] },
      '10.2.0.3'
    );
    const m = mails[mails.length - 1];
    verifier('type non autorisé écarté', r.statusCode === 200 && !(m.attachments || []).length);
    verifier('le corps signale l’absence de photo', /Aucune photo transmise/.test(m.html));
  }

  {
    const r = await appel(
      { ...panne, email: '', fichiers: [{ nom: 'enorme.jpg', data: img(3_500_000) }] },
      '10.2.0.4'
    );
    const m = mails[mails.length - 1];
    verifier('pièce trop lourde écartée', r.statusCode === 200 && !(m.attachments || []).length);
  }

  {
    // Cinq pièces de 1,2 Mo : la 5e est ignorée (limite de 4), et le budget
    // cumulé de 4 Mo coupe avant la quatrième.
    const lourde = () => ({ nom: 'p.jpg', data: img(1_200_000) });
    const r = await appel(
      { ...panne, email: '', fichiers: [lourde(), lourde(), lourde(), lourde(), lourde()] },
      '10.2.0.5'
    );
    const m = mails[mails.length - 1];
    const n = (m.attachments || []).length;
    verifier('budget cumulé respecté', r.statusCode === 200 && n === 3, `${n} pièces`);
  }

  {
    const r = await appel({ ...panne, email: '', fichiers: 'pas-un-tableau' }, '10.2.0.6');
    verifier('charge malformée ignorée sans planter', r.statusCode === 200);
  }

  {
    const r = await appel(
      { ...panne, email: '', fichiers: [{ nom: 'x', data: 'coucou' }, { data: img(50_000) }] },
      '10.2.0.7'
    );
    const m = mails[mails.length - 1];
    verifier('entrée non conforme ignorée, la valide passe', (m.attachments || []).length === 1);
    verifier('nom de repli appliqué', m.attachments?.[0]?.filename === 'piece.jpg', m.attachments?.[0]?.filename);
  }
}

console.log('\n═══ Robustesse ═══');
{
  const bot = await appel({ ...panne, societe_web: 'spam' }, '10.1.0.10');
  verifier('piège à robots : accepté en silence', bot.statusCode === 200 && bot.corps.ok);

  const g = { method: 'GET', headers: {}, socket: {} };
  const res = { statusCode: 0, corps: null, setHeader() {}, end(c) { this.corps = JSON.parse(c); } };
  await sav(g, res);
  verifier('GET refusé', res.statusCode === 405);

  console.log('  limitation de débit (même IP) :');
  let dernier = 0;
  for (let i = 1; i <= 8; i++) dernier = (await appel(panne, '9.9.9.1')).statusCode;
  verifier('  au-delà de 6 demandes → 429', dernier === 429, String(dernier));
}

console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
