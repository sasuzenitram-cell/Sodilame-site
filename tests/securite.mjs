// ---------------------------------------------------------------------------
// Banc d'essai de sécurité — accès administrateur et espace client.
//
// Ce fichier vérifie des propriétés qui ne se voient pas à l'usage : une
// session révoquée qui continue de fonctionner, un formulaire POST accepté
// depuis un autre site, une page de diagnostic qui parle trop. Rien de tout
// cela ne provoque d'erreur visible — c'est justement pourquoi il faut le
// tester.
// ---------------------------------------------------------------------------
process.env.SESSION_SECRET = 'cle-de-test-suffisamment-longue-pour-passer';
process.env.ADMINS = 'direction@sodilame.fr';

const {
  creerSession, lireSession, exigerAdmin, exigerConnexion, origineValide, estAdmin,
} = await import('../lib/auth.mjs');

let ok = 0;
let ko = 0;
const verifier = (nom, cond, detail = '') => {
  if (cond) { ok++; console.log(`  ✓ ${nom}`); }
  else { ko++; console.log(`  ✗ ${nom}${detail ? ' — ' + detail : ''}`); }
};

// ---- Faux objets requête / réponse ----------------------------------------
function fausseReponse() {
  return {
    statusCode: 200,
    entetes: {},
    corps: '',
    setHeader(k, v) { this.entetes[k.toLowerCase()] = v; },
    end(c = '') { this.corps = String(c); },
  };
}

function fausseRequete({ cookie = '', method = 'GET', origin = null, host = 'www.sodilame.com', url = '/admin' } = {}) {
  const headers = { host };
  if (cookie) headers.cookie = cookie;
  if (origin) headers.origin = origin;
  return { method, url, headers, socket: {} };
}

/** Fabrique un cookie de session valide, comme le ferait une vraie connexion. */
function cookiePour(identite) {
  const res = fausseReponse();
  creerSession(res, identite);
  return String(res.entetes['set-cookie']).split(';')[0];
}

const ADMIN = { email: 'direction@sodilame.fr', role: 'admin', clientId: null, etablissement: 'SODILAME' };
const CLIENT = { email: 'chef@lemas.fr', role: 'client', clientId: 7, etablissement: 'Le Mas' };

console.log('\n═══ Cookie de session ═══');
{
  const res = fausseReponse();
  creerSession(res, ADMIN);
  const c = String(res.entetes['set-cookie']);
  verifier('inaccessible au JavaScript de la page (HttpOnly)', /HttpOnly/.test(c));
  verifier('transmis en HTTPS uniquement (Secure)', /Secure/.test(c));
  verifier('non envoyé depuis un autre site (SameSite=Lax)', /SameSite=Lax/.test(c));

  const s = lireSession(fausseRequete({ cookie: cookiePour(ADMIN) }));
  verifier('relu correctement', s?.email === 'direction@sodilame.fr' && s.role === 'admin');
}

console.log('\n═══ Durée des sessions ═══');
{
  const a = lireSession(fausseRequete({ cookie: cookiePour(ADMIN) }));
  const c = lireSession(fausseRequete({ cookie: cookiePour(CLIENT) }));
  const heuresAdmin = Math.round((a.exp - Date.now()) / 3600000);
  const joursClient = Math.round((c.exp - Date.now()) / 86400000);
  verifier('session administrateur courte (12 h)', heuresAdmin === 12, `${heuresAdmin} h`);
  verifier('session client longue (30 j)', joursClient === 30, `${joursClient} j`);
}

console.log('\n═══ Signature ═══');
{
  const bon = cookiePour(ADMIN);
  const valeur = bon.split('=').slice(1).join('=');
  const [charge, sig] = [valeur.slice(0, valeur.lastIndexOf('.')), valeur.slice(valeur.lastIndexOf('.') + 1)];

  // Charge utile modifiée : on tente de se promouvoir administrateur.
  const truquee = Buffer.from(
    JSON.stringify({ email: 'pirate@example.com', role: 'admin', clientId: null, etablissement: '', exp: Date.now() + 9e8 })
  ).toString('base64url');
  verifier('charge utile modifiée rejetée',
    lireSession(fausseRequete({ cookie: `sodilame_session=${truquee}.${sig}` })) === null);

  verifier('signature modifiée rejetée',
    lireSession(fausseRequete({ cookie: `sodilame_session=${charge}.${sig.slice(0, -2)}xx` })) === null);

  verifier('cookie sans signature rejeté',
    lireSession(fausseRequete({ cookie: `sodilame_session=${charge}` })) === null);

  verifier('cookie vide rejeté', lireSession(fausseRequete({ cookie: '' })) === null);

  // Session expirée
  const perimee = Buffer.from(
    JSON.stringify({ email: 'direction@sodilame.fr', role: 'admin', exp: Date.now() - 1000 })
  ).toString('base64url');
  const { createHmac } = await import('node:crypto');
  const sigPerimee = createHmac('sha256', process.env.SESSION_SECRET).update(perimee).digest('base64url');
  verifier('session expirée rejetée même bien signée',
    lireSession(fausseRequete({ cookie: `sodilame_session=${perimee}.${sigPerimee}` })) === null);
}

console.log('\n═══ Révocation d’un accès ═══');
{
  const cookie = cookiePour(ADMIN);

  const res1 = fausseReponse();
  verifier('accès accordé tant que l’adresse est dans ADMINS',
    exigerAdmin(fausseRequete({ cookie }), res1) !== null);

  // On retire l'adresse, sans toucher au cookie déjà émis.
  process.env.ADMINS = 'quelquun-dautre@sodilame.fr';
  const res2 = fausseReponse();
  const s2 = exigerAdmin(fausseRequete({ cookie }), res2);
  verifier('accès coupé dès le retrait de ADMINS', s2 === null);
  verifier('redirection vers la connexion', res2.statusCode === 302);
  verifier('cookie effacé au passage', /Max-Age=0/.test(String(res2.entetes['set-cookie'] || '')));

  process.env.ADMINS = 'direction@sodilame.fr';
  verifier('accès rétabli si l’adresse revient',
    exigerAdmin(fausseRequete({ cookie }), fausseReponse()) !== null);
}

console.log('\n═══ Séparation des rôles ═══');
{
  verifier('un client ne peut pas entrer dans l’administration',
    exigerAdmin(fausseRequete({ cookie: cookiePour(CLIENT) }), fausseReponse()) === null);
  verifier('sans cookie, pas d’administration',
    exigerAdmin(fausseRequete(), fausseReponse()) === null);
  verifier('un client accède bien à son espace',
    exigerConnexion(fausseRequete({ cookie: cookiePour(CLIENT), url: '/espace' }), fausseReponse()) !== null);
  verifier('estAdmin ne reconnaît pas une adresse voisine',
    !estAdmin('direction@sodilame.fr.pirate.com') && !estAdmin('xdirection@sodilame.fr'));
  verifier('estAdmin insensible à la casse et aux espaces',
    estAdmin('  Direction@Sodilame.FR  '));
}

console.log('\n═══ Origine des requêtes (CSRF) ═══');
{
  verifier('POST accepté depuis le site',
    origineValide(fausseRequete({ method: 'POST', origin: 'https://www.sodilame.com', host: 'www.sodilame.com' })));
  verifier('POST refusé depuis un autre site',
    !origineValide(fausseRequete({ method: 'POST', origin: 'https://pirate.example', host: 'www.sodilame.com' })));
  // Choix assumé : une requête sans aucun en-tête d'origine passe. Un
  // navigateur en envoie toujours un sur un POST inter-sites, donc l'attaque
  // reste détectée ; refuser ici enfermerait l'administrateur dehors sur un
  // simple proxy filtrant. Voir le commentaire dans lib/auth.mjs.
  verifier('requête muette tolérée (SameSite prend le relais)',
    origineValide(fausseRequete({ method: 'POST', host: 'www.sodilame.com' })));
  verifier('en-tête d’origine illisible refusé',
    !origineValide({ method: 'POST', headers: { host: 'www.sodilame.com', origin: 'pas-une-url' } }));
  verifier('POST refusé sur un domaine qui contient le nôtre',
    !origineValide(fausseRequete({ method: 'POST', origin: 'https://www.sodilame.com.pirate.example', host: 'www.sodilame.com' })));

  const cookie = cookiePour(ADMIN);
  const res = fausseReponse();
  const s = exigerAdmin(
    fausseRequete({ cookie, method: 'POST', origin: 'https://pirate.example', url: '/admin' }),
    res
  );
  verifier('action administrateur bloquée en 403 depuis un autre site', s === null && res.statusCode === 403);

  verifier('action administrateur acceptée depuis le site',
    exigerAdmin(
      fausseRequete({ cookie, method: 'POST', origin: 'https://www.sodilame.com', url: '/admin' }),
      fausseReponse()
    ) !== null);

  // La lecture n'est pas concernée : une navigation ordinaire n'a pas d'origine.
  verifier('la simple consultation reste possible sans en-tête d’origine',
    exigerAdmin(fausseRequete({ cookie, method: 'GET' }), fausseReponse()) !== null);
}

console.log('\n═══ Journal et fuites ═══');
{
  const src = (await import('node:fs')).readFileSync('api/espace.js', 'utf8');
  verifier('le diagnostic ne charge le journal des refus que pour un administrateur',
    /if \(admin\) \{[\s\S]{0,400}connexion_refusee/.test(src));
  verifier('le diagnostic exige une session quand la connexion est possible',
    /!admin && connexionPossible/.test(src));

  const auth = (await import('node:fs')).readFileSync('api/auth.js', 'utf8');
  verifier('la déconnexion refuse le GET', /action === 'deconnexion'[\s\S]{0,200}method !== 'POST'/.test(auth));
  verifier('la limitation porte aussi sur l’adresse e-mail', /tropPourCetteAdresse/.test(auth));

  const vercel = JSON.parse((await import('node:fs')).readFileSync('vercel.json', 'utf8'));
  const entetes = vercel.headers.find((h) => h.source.includes('admin|espace'));
  const cle = (k) => entetes?.headers.find((x) => x.key.toLowerCase() === k)?.value || '';
  verifier('admin et espace en noindex', /noindex/.test(cle('x-robots-tag')));
  verifier('aucune mise en cache', /no-store/.test(cle('cache-control')));
  verifier('politique de sécurité du contenu posée', /default-src 'self'/.test(cle('content-security-policy')));
  verifier('page non affichable dans un cadre', /frame-ancestors 'none'/.test(cle('content-security-policy')));
  verifier('formulaires bridés sur le site lui-même', /form-action 'self'/.test(cle('content-security-policy')));
}

console.log('\n═══ Requêtes SQL ═══');
{
  const fs = await import('node:fs');
  const fichiers = ['api/admin.js', 'api/espace.js', 'api/commande.js', 'api/auth.js', 'api/moi.js', 'lib/auth.mjs', 'lib/db.mjs'];
  const suspectes = [];
  for (const f of fichiers) {
    const src = fs.readFileSync(f, 'utf8');
    // Une requête qui interpole une variable sans passer par $1, $2…
    for (const m of src.matchAll(/q1?\(\s*`([^`]*)`/g)) {
      if (/\$\{/.test(m[1]) && !/\$\d/.test(m[1])) suspectes.push(`${f} : ${m[1].slice(0, 60)}`);
    }
  }
  verifier('aucune requête construite par concaténation', !suspectes.length, suspectes.join(' | '));
}

console.log(`\n${'─'.repeat(56)}\n${ok} tests passés, ${ko} échec${ko > 1 ? 's' : ''}\n`);
process.exit(ko ? 1 : 0);
