// ---------------------------------------------------------------------------
// Gabarit HTML des pages back-office et espace client.
//
// Volontairement distinct du gabarit vitrine : ces pages ne sont pas
// indexables, n'ont pas besoin du menu marketing, et doivent rester légères.
// ---------------------------------------------------------------------------

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const euros = (n) =>
  n === null || n === undefined || n === '' || isNaN(Number(n))
    ? '—'
    : Number(n).toFixed(2).replace('.', ',') + ' €';

export const dateFr = (d) => {
  if (!d) return '—';
  const x = new Date(d);
  return x.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const dateHeureFr = (d) => {
  if (!d) return '—';
  const x = new Date(d);
  return (
    x.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' à ' +
    x.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  );
};

const CSS = `
:root{--navy:#1B4A3E;--navy2:#2E6E5C;--gold:#DFA64F;--cream:#F6F9F5;--ink:#1B2430;
  --muted:#54655C;--line:#D5E3D8;--vert:#1F7A56;--or:#B4761B;--rouge:#A8352C;--bleu:#2A5D9E}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--ink);
  font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased}
a{color:var(--navy2)}
.bar{background:var(--navy);color:#fff;padding:0}
.bar .in{max-width:1180px;margin:0 auto;padding:14px 22px;display:flex;align-items:center;gap:1.4rem;flex-wrap:wrap}
.bar .marque{font-weight:800;letter-spacing:.06em;font-size:15px;color:#fff;text-decoration:none}
.bar .marque span{display:block;font-size:10px;letter-spacing:.14em;color:var(--gold);font-weight:600}
.bar nav{display:flex;gap:.3rem;flex-wrap:wrap;margin-left:auto}
.bar nav a{color:#BFD6CB;text-decoration:none;font-size:13.5px;padding:7px 13px;border-radius:7px}
.bar nav a:hover{background:rgba(255,255,255,.09);color:#fff}
.bar nav a[aria-current]{background:var(--gold);color:#1B2430;font-weight:600}
.wrap{max-width:1180px;margin:0 auto;padding:26px 22px 70px}
h1{font-size:24px;margin:0 0 6px;letter-spacing:-.01em}
.sous{color:var(--muted);margin:0 0 24px;font-size:14px}
h2{font-size:17px;margin:30px 0 12px}
.carte{background:#fff;border:1px solid var(--line);border-radius:11px;padding:20px 22px;margin-bottom:16px}
.grille{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));margin-bottom:22px}
.kpi{background:#fff;border:1px solid var(--line);border-radius:11px;padding:15px 18px}
.kpi b{display:block;font-size:26px;line-height:1.15;font-variant-numeric:tabular-nums;color:var(--navy)}
.kpi span{display:block;font-size:12px;color:var(--muted);margin-top:4px}
.tw{overflow-x:auto;background:#fff;border:1px solid var(--line);border-radius:11px}
table{border-collapse:collapse;width:100%;font-size:14px;min-width:640px}
th{background:#E6EFE7;text-align:left;padding:10px 14px;font-size:11px;letter-spacing:.06em;
  text-transform:uppercase;color:var(--muted);font-weight:600;white-space:nowrap}
td{padding:11px 14px;border-top:1px solid var(--line);vertical-align:middle}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
tr:hover td{background:#FAFDF9}
.et{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
  padding:3px 10px;border-radius:20px;white-space:nowrap}
.et.bleu{background:#E4EDF8;color:var(--bleu)}
.et.or{background:#FBF0DC;color:var(--or)}
.et.vert{background:#E2F1EA;color:var(--vert)}
.et.rouge{background:#F8E4E2;color:var(--rouge)}
.et.gris{background:#E6EBE6;color:var(--muted)}
.b{display:inline-flex;align-items:center;gap:.4rem;border:0;border-radius:8px;padding:9px 16px;
  font:inherit;font-size:13.5px;font-weight:600;cursor:pointer;text-decoration:none}
.b.p{background:var(--gold);color:#1B2430}
.b.p:hover{background:#d0952f}
.b.s{background:#fff;border:1px solid var(--line);color:var(--navy)}
.b.s:hover{border-color:var(--gold)}
.b.d{background:#fff;border:1px solid #E6C4C0;color:var(--rouge)}
.b:disabled{opacity:.5;cursor:not-allowed}
.b.mini{padding:6px 11px;font-size:12.5px}
label{display:block;font-size:12.5px;font-weight:600;color:var(--muted);margin:0 0 5px}
input[type=text],input[type=email],input[type=tel],input[type=number],select,textarea{
  width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:#fff;
  font:inherit;font-size:14px;color:var(--ink)}
input:focus,select:focus,textarea:focus{outline:2px solid var(--gold);outline-offset:-1px;border-color:var(--gold)}
textarea{min-height:90px;resize:vertical}
.r2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.champ{margin-bottom:14px}
.msg{padding:12px 16px;border-radius:9px;margin:0 0 18px;font-size:14px}
.msg.ok{background:#E2F1EA;border:1px solid #B9DECC;color:var(--vert)}
.msg.ko{background:#F8E4E2;border:1px solid #EDC4BF;color:var(--rouge)}
.msg.info{background:#FBF0DC;border:1px solid #E8CE9B;color:var(--or)}
.vide{text-align:center;padding:44px 20px;color:var(--muted)}
.aide{font-size:12.5px;color:var(--muted);margin:5px 0 0;line-height:1.55}
.ligne-act{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}
.ent{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:6px}
code{background:#E2EDE4;padding:2px 6px;border-radius:4px;font-size:13px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.meta{display:block;font-size:12px;color:var(--muted);margin-top:2px}
.barre-actions{position:sticky;bottom:0;background:linear-gradient(to top,var(--cream) 62%,rgba(246,249,245,0));
  padding:20px 0 14px;margin-top:22px;text-align:right}
@media (max-width:640px){.r2{grid-template-columns:1fr}.wrap{padding:20px 15px 60px}}
`;

/** Page complète du back-office / espace client. Toujours noindex. */
export function pageApp({ titre, session = null, actif = '', corps }) {
  const admin = session?.role === 'admin';
  const liens = admin
    ? [
        ['/admin', 'Tableau de bord', 'accueil'],
        ['/admin/commandes', 'Commandes', 'commandes'],
        ['/admin/clients', 'Clients', 'clients'],
        ['/admin/produits', 'Produits & prix', 'produits'],
      ]
    : session
    ? [
        ['/espace', 'Mes commandes', 'accueil'],
        ['/produits', 'Catalogue', 'catalogue'],
      ]
    : [];

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${esc(titre)} — SODILAME</title>
<link rel="icon" href="/favicon.png" type="image/png">
<style>${CSS}</style>
</head>
<body>
<div class="bar">
  <div class="in">
    <a class="marque" href="${admin ? '/admin' : session ? '/espace' : '/'}">SODILAME<span>${admin ? 'Administration' : 'Espace client'}</span></a>
    <nav>
      ${liens.map(([u, l, k]) => `<a href="${u}"${k === actif ? ' aria-current="page"' : ''}>${l}</a>`).join('')}
      ${session ? `<a href="/api/auth?action=deconnexion">Déconnexion</a>` : `<a href="/">← Le site</a>`}
    </nav>
  </div>
</div>
<div class="wrap">
${corps}
</div>
</body>
</html>`;
}

/** Réponse HTML. */
export function html(res, code, contenu) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.end(contenu);
}

/**
 * Lit le corps d'une requête, quel que soit l'environnement.
 * Vercel pré-remplit req.body ; en local on lit le flux. Gère JSON et
 * formulaire classique (application/x-www-form-urlencoded).
 */
export async function corpsRequete(req) {
  let b = req.body;
  if (b && typeof b === 'object' && !Buffer.isBuffer(b)) return b;

  if (b === undefined || b === null || Buffer.isBuffer(b)) {
    if (Buffer.isBuffer(b)) {
      b = b.toString('utf8');
    } else {
      const morceaux = [];
      for await (const c of req) morceaux.push(c);
      b = Buffer.concat(morceaux).toString('utf8');
    }
  }
  if (typeof b !== 'string') return {};
  const brut = b.trim();
  if (!brut) return {};
  if (brut.startsWith('{') || brut.startsWith('[')) {
    try {
      return JSON.parse(brut);
    } catch {
      return {};
    }
  }
  return Object.fromEntries(new URLSearchParams(brut));
}

/** Réponse JSON — n'utilise que l'API Node standard, donc testable hors Vercel. */
export function json(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}

/** Redirection avec message flash passé en query. */
export function rediriger(res, url, msg = null, type = 'ok') {
  const u = msg ? `${url}${url.includes('?') ? '&' : '?'}m=${encodeURIComponent(msg)}&t=${type}` : url;
  res.statusCode = 302;
  res.setHeader('Location', u);
  res.end();
}

export function flash(query) {
  if (!query?.m) return '';
  const t = ['ok', 'ko', 'info'].includes(query.t) ? query.t : 'ok';
  return `<div class="msg ${t}">${esc(query.m)}</div>`;
}

export const etiquetteStatut = (statut, STATUTS) => {
  const s = STATUTS[statut];
  return s ? `<span class="et ${s.couleur}">${s.label}</span>` : `<span class="et gris">${esc(statut)}</span>`;
};
