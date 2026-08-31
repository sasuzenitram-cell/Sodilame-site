// ---------------------------------------------------------------------------
// Tests de bout en bout de la boutique et du back-office.
//
// Lance un vrai serveur HTTP qui route vers les fonctions serverless comme le
// fait Vercel, contre une vraie base Postgres. Les e-mails ne partent pas :
// Resend est remplacé par un espion qui capture les envois — ce qui permet de
// récupérer le lien de connexion et de dérouler un vrai parcours client.
//
//   node tests/e2e.mjs
// ---------------------------------------------------------------------------
import { createServer } from 'node:http';

process.env.DB_DRIVER = 'pg';
process.env.DATABASE_URL ||= 'postgresql://postgres@localhost:55432/sodilame_test?host=/tmp';
process.env.SESSION_SECRET = 'secret-de-test-suffisamment-long-pour-passer-la-verification';
process.env.ADMINS = 'sodilame@sodilame.fr';
process.env.RESEND_API_KEY = 'cle-de-test';
process.env.MAIL_DESTINATION = 'sodilame@sodilame.fr';
process.env.SITE_URL = 'http://127.0.0.1:8899';

// ---- Espion sur Resend -----------------------------------------------------
const mails = [];
const vraiFetch = globalThis.fetch;
globalThis.fetch = async (url, opts) => {
  if (String(url).includes('api.resend.com')) {
    mails.push(JSON.parse(opts.body));
    return { ok: true, status: 200, text: async () => 'ok', json: async () => ({ id: 'test' }) };
  }
  return vraiFetch(url, opts);
};

const { default: auth } = await import('../api/auth.js');
const { default: admin } = await import('../api/admin.js');
const { default: espace } = await import('../api/espace.js');
const { default: commande } = await import('../api/commande.js');
const { default: catalogue } = await import('../api/catalogue.js');
const { default: moi } = await import('../api/moi.js');
const { q } = await import('../lib/db.mjs');

// ---- Routage identique aux rewrites de vercel.json -------------------------
const serveur = createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const p = u.pathname;
  const qs = u.search;
  try {
    if (p === '/api/auth') return auth(req, res);
    if (p === '/api/commande') return commande(req, res);
    if (p === '/api/catalogue') return catalogue(req, res);
    if (p === '/api/moi') return moi(req, res);
    if (p === '/admin') { req.url = '/api/admin' + qs; return admin(req, res); }
    if (p.startsWith('/admin/')) {
      const sec = p.slice(7);
      req.url = `/api/admin?section=${sec}${qs ? '&' + qs.slice(1) : ''}`;
      return admin(req, res);
    }
    if (p === '/espace') { req.url = '/api/espace' + qs; return espace(req, res); }
    if (p === '/espace/connexion') { req.url = '/api/espace?vue=connexion' + (qs ? '&' + qs.slice(1) : ''); return espace(req, res); }
    res.statusCode = 404;
    res.end('non trouvé');
  } catch (e) {
    console.error('ERREUR SERVEUR', e);
    res.statusCode = 500;
    res.end(String(e?.stack || e));
  }
});
await new Promise((r) => serveur.listen(8899, '127.0.0.1', r));
const BASE = 'http://127.0.0.1:8899';

// ---- Utilitaires de test ---------------------------------------------------
let ok = 0;
let ko = 0;
const cookies = {};

function verifier(nom, condition, detail = '') {
  if (condition) {
    ok++;
    console.log(`  ✓ ${nom}`);
  } else {
    ko++;
    console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`);
  }
}

async function appel(qui, chemin, { methode = 'GET', corps = null, form = null, suivre = false } = {}) {
  const entetes = { 'x-forwarded-for': '203.0.113.' + (qui === 'admin' ? '1' : qui === 'client' ? '2' : '3') };
  if (cookies[qui]) entetes.cookie = cookies[qui];
  let body;
  if (corps) {
    entetes['content-type'] = 'application/json';
    body = JSON.stringify(corps);
  } else if (form) {
    entetes['content-type'] = 'application/x-www-form-urlencoded';
    body = new URLSearchParams(form).toString();
  }
  const r = await vraiFetch(BASE + chemin, { method: methode, headers: entetes, body, redirect: 'manual' });
  const sc = r.headers.get('set-cookie');
  if (sc) {
    const v = sc.split(';')[0];
    if (v.endsWith('=')) delete cookies[qui];
    else cookies[qui] = v;
  }
  const texte = await r.text();
  if (suivre && r.status === 302) {
    const loc = r.headers.get('location');
    return appel(qui, loc, { suivre: false });
  }
  return { statut: r.status, loc: r.headers.get('location'), texte, entetes: r.headers };
}

const dernierLien = () => {
  const m = [...mails].reverse().find((x) => /action=valider/.test(x.text || x.html || ''));
  if (!m) return null;
  const src = (m.text || '') + (m.html || '');
  return (src.match(/https?:\/\/[^\s"'<]*action=valider[^\s"'<]*/) || [])[0]?.replace(/&amp;/g, '&') || null;
};

// ---- Table rase -------------------------------------------------------------
await q(`DROP TABLE IF EXISTS commande_lignes, commandes, jetons, journal, tarifs, clients CASCADE`);

console.log('\n═══ 1. Contrôle d\'accès (personne n\'est connecté) ═══');
{
  const r1 = await appel('anon', '/admin');
  verifier('/admin redirige vers la connexion', r1.statut === 302 && r1.loc?.includes('/espace/connexion'), `${r1.statut} ${r1.loc}`);
  const r2 = await appel('anon', '/admin/clients');
  verifier('/admin/clients redirige aussi', r2.statut === 302, String(r2.statut));
  const r3 = await appel('anon', '/espace');
  verifier('/espace redirige vers la connexion', r3.statut === 302 && r3.loc?.includes('connexion'), String(r3.statut));
  const r4 = await appel('anon', '/espace/connexion');
  verifier('la page de connexion est publique', r4.statut === 200 && r4.texte.includes('Recevoir mon lien'), String(r4.statut));
  verifier('les pages applicatives sont en noindex', r4.entetes.get('x-robots-tag')?.includes('noindex'));
  const r5 = await appel('anon', '/api/commande', { methode: 'POST', corps: { lignes: [] } });
  verifier('commander sans compte est refusé (401)', r5.statut === 401, String(r5.statut));
  const r6 = await appel('anon', '/api/moi');
  verifier('/api/moi répond « non connecté »', JSON.parse(r6.texte).connecte === false);
}

console.log('\n═══ 2. Connexion administrateur ═══');
{
  const r = await appel('admin', '/api/auth?action=demande', { methode: 'POST', corps: { email: 'SODILAME@Sodilame.fr' } });
  verifier('la demande de lien est acceptée', r.statut === 200, r.texte);
  const lien = dernierLien();
  verifier('un lien de connexion a été envoyé par e-mail', !!lien);
  const v = await appel('admin', lien.replace(BASE, ''));
  verifier('le lien ouvre la session et redirige vers /admin', v.statut === 302 && v.loc === '/admin', `${v.statut} ${v.loc}`);
  const d = await appel('admin', '/admin');
  verifier('le tableau de bord s\'affiche', d.statut === 200 && d.texte.includes('Tableau de bord'), String(d.statut));

  const rejeu = await appel('admin', lien.replace(BASE, ''));
  verifier('le même lien ne fonctionne pas deux fois', rejeu.statut === 400, String(rejeu.statut));
}

console.log('\n═══ 3. E-mail inconnu ═══');
{
  const avant = mails.length;
  const r = await appel('anon', '/api/auth?action=demande', { methode: 'POST', corps: { email: 'inconnu@exemple.fr' } });
  verifier('la réponse est identique à un succès (pas de fuite)', r.statut === 200 && JSON.parse(r.texte).ok === true);
  verifier('aucun e-mail n\'est parti', mails.length === avant, `${mails.length - avant} envoyé(s)`);
}

console.log('\n═══ 4. Import Dolibarr ═══');
{
  const csv = [
    'ref;societe;email;telephone;adresse;cp;ville',
    'CL0142;Restaurant Le Mas;contact@lemas.fr;0490000001;12 avenue de la République;13200;Arles',
    'CL0187;Hôtel des Alpilles;accueil@alpilles.fr;0490000002;3 route des Baux;13210;Saint-Rémy-de-Provence',
    'CL0203;Brasserie du Cours;;0490000003;5 cours Mirabeau;13100;Aix-en-Provence',
    'CL0250;Camping Le Soleil;direction@lesoleil.fr;0490000004;Chemin du Lac;13800;Istres',
  ].join('\n');
  const r = await appel('admin', '/admin', { methode: 'POST', form: { action: 'import', csv, retour: 'clients' } });
  verifier('l\'import redirige avec un compte rendu', r.statut === 302 && /3\+?%20client|3\s*client/.test(decodeURIComponent(r.loc || '')), decodeURIComponent(r.loc || ''));
  const n = (await q(`SELECT COUNT(*)::int n FROM clients`))[0].n;
  verifier('3 clients créés, la ligne sans e-mail est ignorée', n === 3, `${n} en base`);
  const c = (await q(`SELECT * FROM clients WHERE email='contact@lemas.fr'`))[0];
  verifier('les colonnes sont bien mappées', c.etablissement === 'Restaurant Le Mas' && c.commune === 'Arles' && c.ref_dolibarr === 'CL0142');

  // Deuxième import : mise à jour, pas de doublon
  await appel('admin', '/admin', { methode: 'POST', form: { action: 'import', csv, retour: 'clients' } });
  const n2 = (await q(`SELECT COUNT(*)::int n FROM clients`))[0].n;
  verifier('un second import ne duplique rien', n2 === 3, `${n2} en base`);
}

console.log('\n═══ 5. Invitation ═══');
{
  const c = (await q(`SELECT id FROM clients WHERE email='contact@lemas.fr'`))[0];
  const avant = mails.length;
  const r = await appel('admin', '/admin', { methode: 'POST', form: { action: 'inviter', id: String(c.id) } });
  verifier('l\'invitation part', r.statut === 302 && mails.length === avant + 1);
  const m = mails[mails.length - 1];
  verifier('elle est adressée au bon client', m.to[0] === 'contact@lemas.fr');
  verifier('elle mentionne la livraison offerte', /livraison est offerte|sans frais de port|Livraison offerte/i.test(m.html + m.text));
  verifier('elle mentionne l\'absence de paiement en ligne', /aucun paiement/i.test(m.html + m.text));
  const maj = (await q(`SELECT invite_le FROM clients WHERE id=$1`, [c.id]))[0];
  verifier('la date d\'invitation est enregistrée', !!maj.invite_le);
}

console.log('\n═══ 6. Prix et disponibilité ═══');
{
  const r = await appel('admin', '/admin', {
    methode: 'POST',
    form: {
      action: 'tarifs',
      'p_F420e__0': '46,90', 'd_F420e__0': '1',
      'p_F420e__1': '78.50', 'd_F420e__1': '1',
      'p_B100N__0': '31,20', 'd_B100N__0': '1',
      'p_F300__0': '52,00', // décoché : indisponible
      'p_56.01.535__0': '', 'd_56.01.535__0': '1', // prix laissé vide
    },
  });
  verifier('l\'enregistrement des prix redirige', r.statut === 302, String(r.statut));
  const t = await q(`SELECT ref, cond_label, prix_ht, disponible FROM tarifs ORDER BY ref, cond_label`);
  const f420 = t.find((x) => x.ref === 'F420e' && x.cond_label === 'Seau de 12 kg');
  verifier('la virgule décimale est acceptée', f420 && Number(f420.prix_ht) === 78.5, JSON.stringify(f420));
  const f300 = t.find((x) => x.ref === 'F300');
  verifier('un produit décoché passe indisponible', f300 && f300.disponible === false);
  const rat = t.find((x) => x.ref === '56.01.535');
  verifier('un prix vide reste nul (« prix sur demande »)', rat && rat.prix_ht === null);

  const cat = JSON.parse((await appel('anon', '/api/catalogue')).texte);
  verifier('/api/catalogue expose les prix publiquement', cat.source === 'base' && cat.tarifs.length >= 5, JSON.stringify(cat).slice(0, 90));
}

console.log('\n═══ 7. Connexion client et commande ═══');
{
  await appel('client', '/api/auth?action=demande', { methode: 'POST', corps: { email: 'contact@lemas.fr' } });
  const lien = dernierLien();
  const v = await appel('client', lien.replace(BASE, ''));
  verifier('le client se connecte et arrive sur /espace', v.statut === 302 && v.loc === '/espace', `${v.statut} ${v.loc}`);

  const m = JSON.parse((await appel('client', '/api/moi')).texte);
  verifier('/api/moi renvoie les coordonnées à pré-remplir', m.connecte && m.client.etablissement === 'Restaurant Le Mas' && m.client.commune === 'Arles');

  const cmd = await appel('client', '/api/commande', {
    methode: 'POST',
    corps: {
      adresse: '12 avenue de la République', codePostal: '13200', commune: 'Arles',
      message: 'Livraison le matin de préférence',
      lignes: [
        { ref: 'F420e', cond: 'Seau de 12 kg', qte: 2 },
        { ref: '56.01.535', cond: 'Seau de 150 tablettes', qte: 1 },
      ],
    },
  });
  const j = JSON.parse(cmd.texte);
  verifier('la commande est acceptée', cmd.statut === 200 && j.ok, cmd.texte.slice(0, 120));

  const c = (await q(`SELECT * FROM commandes WHERE reference=$1`, [j.reference]))[0];
  verifier('elle est enregistrée en base au statut « reçue »', c && c.statut === 'recue');
  verifier('le total est calculé côté serveur', Number(c.total_ht) === 157, `${c.total_ht} (attendu 157,00 = 2×78,50)`);
  verifier('elle est rattachée au bon client', c.etablissement === 'Restaurant Le Mas');
  const l = await q(`SELECT * FROM commande_lignes WHERE commande_id=$1 ORDER BY id`, [c.id]);
  verifier('les deux lignes sont enregistrées', l.length === 2);
  verifier('la ligne sans tarif garde un prix nul', l[1].prix_ht === null);

  verifier('SODILAME est notifiée', mails.some((x) => x.subject?.includes(j.reference) && x.to[0] === 'sodilame@sodilame.fr'));
  verifier('le client reçoit un accusé de réception', mails.some((x) => x.subject?.includes(j.reference) && x.to[0] === 'contact@lemas.fr'));
}

console.log('\n═══ 8. Ce qu\'un client ne doit pas pouvoir faire ═══');
{
  const a = await appel('client', '/admin');
  verifier('un client ne peut pas entrer dans l\'administration', a.statut === 302 && a.loc?.includes('connexion'), `${a.statut} ${a.loc}`);

  const faux = await appel('client', '/api/commande', {
    methode: 'POST',
    corps: {
      adresse: 'x', codePostal: '13200', commune: 'Arles',
      lignes: [{ ref: 'F420e', cond: 'Seau de 12 kg', qte: 1, prix: 0.01, nom: 'Gratuit' }],
    },
  });
  const jf = JSON.parse(faux.texte);
  const cf = (await q(`SELECT total_ht FROM commandes WHERE reference=$1`, [jf.reference]))[0];
  verifier('un prix falsifié dans la requête est ignoré', Number(cf.total_ht) === 78.5, `${cf.total_ht} (attendu 78,50)`);

  const inv = await appel('client', '/api/commande', {
    methode: 'POST',
    corps: { adresse: 'x', codePostal: '13200', commune: 'Arles', lignes: [{ ref: 'PIRATE', cond: 'Bidon', qte: 1 }] },
  });
  verifier('une référence inconnue est refusée', inv.statut === 409, String(inv.statut));

  const indispo = await appel('client', '/api/commande', {
    methode: 'POST',
    corps: { adresse: 'x', codePostal: '13200', commune: 'Arles', lignes: [{ ref: 'F300', cond: 'Seau de 12 kg', qte: 1 }] },
  });
  verifier('un produit marqué indisponible est refusé', indispo.statut === 409, String(indispo.statut));

  const hors = await appel('client', '/api/commande', {
    methode: 'POST',
    corps: { adresse: 'x', codePostal: '69000', commune: 'Lyon', lignes: [{ ref: 'F420e', cond: 'Seau de 12 kg', qte: 1 }] },
  });
  verifier('une commune hors zone est refusée', hors.statut === 400 && /Lyon/.test(hors.texte), String(hors.statut));

  const cp = await appel('client', '/api/commande', {
    methode: 'POST',
    corps: { adresse: 'x', codePostal: '132', commune: 'Arles', lignes: [{ ref: 'F420e', cond: 'Seau de 12 kg', qte: 1 }] },
  });
  verifier('un code postal invalide est refusé', cp.statut === 400, String(cp.statut));
}

console.log('\n═══ 9. Traitement de la commande côté SODILAME ═══');
{
  const c = (await q(`SELECT id, reference FROM commandes ORDER BY id LIMIT 1`))[0];
  const vue = await appel('admin', `/admin/commandes?id=${c.id}`);
  verifier('la fiche commande s\'affiche', vue.statut === 200 && vue.texte.includes(c.reference), String(vue.statut));
  verifier('elle montre la note interne', vue.texte.includes('Note interne'));

  const avant = mails.length;
  const maj = await appel('admin', '/admin', { methode: 'POST', form: { action: 'statut', id: String(c.id), statut: 'validee', prevenir: '1' } });
  verifier('le statut passe à « validée »', maj.statut === 302);
  const c2 = (await q(`SELECT statut FROM commandes WHERE id=$1`, [c.id]))[0];
  verifier('le changement est enregistré', c2.statut === 'validee');
  verifier('le client est prévenu par e-mail', mails.length === avant + 1 && mails[mails.length - 1].to[0] === 'contact@lemas.fr');

  const avant2 = mails.length;
  await appel('admin', '/admin', { methode: 'POST', form: { action: 'statut', id: String(c.id), statut: 'facturee' } });
  verifier('« facturée » ne déclenche pas d\'e-mail', mails.length === avant2);

  const faux = await appel('admin', '/admin', { methode: 'POST', form: { action: 'statut', id: String(c.id), statut: 'nimportequoi' } });
  verifier('un statut inconnu est rejeté', faux.statut === 302 && /inconnu/i.test(decodeURIComponent(faux.loc || '')));

  await appel('admin', '/admin', { methode: 'POST', form: { action: 'note', id: String(c.id), note: 'BL 4412, tournée de jeudi' } });
  const c3 = (await q(`SELECT note_interne FROM commandes WHERE id=$1`, [c.id]))[0];
  verifier('la note interne est enregistrée', c3.note_interne.includes('BL 4412'));

  const liste = await appel('admin', '/admin/commandes?statut=facturee');
  verifier('le filtre par statut fonctionne', liste.statut === 200 && liste.texte.includes(c.reference));
}

console.log('\n═══ 10. L\'espace client ═══');
{
  const e = await appel('client', '/espace');
  verifier('le client voit son espace', e.statut === 200 && e.texte.includes('Restaurant Le Mas'), String(e.statut));
  verifier('il voit ses commandes', /C\d{6}-\d{4}/.test(e.texte));
  verifier('il voit le statut « Validée » ou « Facturée »', /Factur|Valid/.test(e.texte));

  // Isolation : la commande d'un autre client ne doit pas être lisible
  const autre = (await q(`SELECT id FROM clients WHERE email='accueil@alpilles.fr'`))[0];
  await q(`INSERT INTO commandes (reference, client_id, etablissement, email) VALUES ('CTEST-9999',$1,'Hôtel des Alpilles','accueil@alpilles.fr')`, [autre.id]);
  const secret = (await q(`SELECT id FROM commandes WHERE reference='CTEST-9999'`))[0];
  const fuite = await appel('client', `/espace?commande=${secret.id}`);
  verifier('il ne peut pas ouvrir la commande d\'un autre client', !fuite.texte.includes('CTEST-9999'));
}

console.log('\n═══ 11. Désactivation d\'un compte ═══');
{
  const c = (await q(`SELECT id FROM clients WHERE email='contact@lemas.fr'`))[0];
  await appel('admin', '/admin', {
    methode: 'POST',
    form: { action: 'client', id: String(c.id), etablissement: 'Restaurant Le Mas', email: 'contact@lemas.fr', commune: 'Arles' },
  });
  const apres = (await q(`SELECT actif FROM clients WHERE id=$1`, [c.id]))[0];
  verifier('décocher « actif » désactive le compte', apres.actif === false);

  const cmd = await appel('client', '/api/commande', {
    methode: 'POST',
    corps: { adresse: 'x', codePostal: '13200', commune: 'Arles', lignes: [{ ref: 'F420e', cond: 'Seau de 12 kg', qte: 1 }] },
  });
  verifier('un compte désactivé ne peut plus commander', cmd.statut === 403, String(cmd.statut));

  const avant = mails.length;
  await appel('anon', '/api/auth?action=demande', { methode: 'POST', corps: { email: 'contact@lemas.fr' } });
  verifier('il ne reçoit plus de lien de connexion', mails.length === avant);
}

console.log('\n═══ 12. Déconnexion ═══');
{
  const d = await appel('admin', '/api/auth?action=deconnexion');
  verifier('la déconnexion redirige', d.statut === 302);
  const a = await appel('admin', '/admin');
  verifier('l\'administration est de nouveau fermée', a.statut === 302 && a.loc?.includes('connexion'));
}

console.log('\n═══ 13. Journal d\'audit ═══');
{
  const j = await q(`SELECT action, COUNT(*)::int n FROM journal GROUP BY action ORDER BY action`);
  const actions = Object.fromEntries(j.map((x) => [x.action, x.n]));
  verifier('les connexions sont tracées', actions.connexion >= 2, JSON.stringify(actions));
  verifier('les imports sont tracés', actions.import_clients >= 1);
  verifier('les changements de statut sont tracés', actions.commande_statut >= 2);
  verifier('les commandes sont tracées', actions.commande_recue >= 1);
}

console.log(`\n${'─'.repeat(64)}`);
console.log(`${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
serveur.close();
process.exit(ko ? 1 : 0);
