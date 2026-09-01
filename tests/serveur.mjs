// Serveur local pour inspection visuelle : sert le site statique de /public
// et route /admin, /espace et /api vers les fonctions serverless.
//   node tests/serveur.mjs
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

process.env.DB_DRIVER = 'pg';
process.env.DATABASE_URL ||= 'postgresql://postgres@/sodilame_test?host=/tmp&port=55432';
process.env.SESSION_SECRET = 'secret-de-test-suffisamment-long-pour-passer-la-verification';
process.env.ADMINS = 'sodilame@sodilame.fr';
process.env.RESEND_API_KEY = 'cle-de-test';
process.env.SITE_URL = 'http://127.0.0.1:8899';

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

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon' };

async function statique(p, res) {
  const bases = [join('public', p), join('public', p, 'index.html'), join('public', p + '.html')];
  for (const f of bases) {
    try {
      if (!(await stat(f)).isFile()) continue;
      res.statusCode = 200;
      res.setHeader('Content-Type', MIME[extname(f)] || 'application/octet-stream');
      res.end(await readFile(f));
      return true;
    } catch {}
  }
  return false;
}

const serveur = createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const p = u.pathname.replace(/\/$/, '') || '/';
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
    if (p === '/espace/diagnostic') { req.url = '/api/espace?vue=diagnostic'; return espace(req, res); }
    if (await statique(p === '/' ? '/index.html' : p, res)) return;
    res.statusCode = 404;
    res.end('non trouvé');
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.end(String(e?.stack || e));
  }
});

serveur.listen(8899, '127.0.0.1', () => console.log('http://127.0.0.1:8899'));
