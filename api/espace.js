// ---------------------------------------------------------------------------
// Espace client
//   /espace            → mes commandes et mes coordonnées
//   /espace/connexion  → demande d'un lien de connexion
// ---------------------------------------------------------------------------
import { q, q1, initSchema, baseDisponible, STATUTS } from '../lib/db.mjs';
import { lireSession } from '../lib/auth.mjs';
import { pageApp, html, esc, euros, dateFr, dateHeureFr, flash, etiquetteStatut } from '../lib/vue.mjs';
import { TEL } from '../lib/mail.mjs';

const et = (s) => etiquetteStatut(s, STATUTS);

export default async function handler(req, res) {
  const u = new URL(req.url, 'http://x');
  const query = Object.fromEntries(u.searchParams);
  const vue = query.vue || '';

  // ---- Page de connexion (publique) ---------------------------------------
  if (vue === 'connexion') {
    const session = lireSession(req);
    if (session) {
      res.statusCode = 302;
      res.setHeader('Location', session.role === 'admin' ? '/admin' : '/espace');
      return res.end();
    }
    return html(res, 200, pageConnexion(query));
  }

  // ---- Espace client (protégé) --------------------------------------------
  const session = lireSession(req);
  if (!session) {
    res.statusCode = 302;
    res.setHeader('Location', '/espace/connexion?suite=%2Fespace');
    return res.end();
  }
  if (session.role === 'admin') {
    res.statusCode = 302;
    res.setHeader('Location', '/admin');
    return res.end();
  }

  if (!baseDisponible()) return html(res, 503, pageApp({ titre: 'Indisponible', session, corps: `<div class="carte vide">Service momentanément indisponible. Appelez le ${TEL}.</div>` }));
  await initSchema();

  const client = await q1(`SELECT * FROM clients WHERE id = $1`, [session.clientId]);
  if (!client || !client.actif) {
    return html(res, 403, pageApp({
      titre: 'Compte inactif',
      corps: `<div class="carte" style="max-width:560px;margin:40px auto"><h1>Compte inactif</h1>
        <p class="sous">Votre accès a été suspendu. Merci d'appeler le ${TEL}.</p></div>`,
    }));
  }

  const commandes = await q(
    `SELECT id, reference, total_ht, statut, cree_le FROM commandes WHERE client_id = $1 ORDER BY cree_le DESC LIMIT 50`,
    [client.id]
  );

  let detail = null;
  if (query.commande) {
    const c = await q1(`SELECT * FROM commandes WHERE id = $1 AND client_id = $2`, [parseInt(query.commande, 10), client.id]);
    if (c) {
      const lignes = await q(`SELECT * FROM commande_lignes WHERE commande_id = $1 ORDER BY id`, [c.id]);
      detail = { c, lignes };
    }
  }

  return html(res, 200, pageApp({
    titre: 'Mes commandes',
    session,
    actif: 'accueil',
    corps: `
${flash(query)}
<h1>Bonjour, ${esc(client.etablissement)}</h1>
<p class="sous">Retrouvez ici vos commandes de produits lessiviels et leur avancement.</p>

${
  detail
    ? `<p><a href="/espace">← Toutes mes commandes</a></p>
<div class="carte">
  <div class="ent">
    <div><h2 style="margin-top:0">Commande ${esc(detail.c.reference)}</h2>
      <p class="sous">Passée le ${dateHeureFr(detail.c.cree_le)}</p></div>
    <div>${et(detail.c.statut)}</div>
  </div>
  <div class="tw"><table>
    <tr><th>Produit</th><th class="num">Qté</th><th class="num">Total</th></tr>
    ${detail.lignes
      .map(
        (l) => `<tr><td><b>${esc(l.nom)}</b><span class="meta">${esc(l.marque)} · ${esc(l.cond_label)}</span></td>
        <td class="num">${l.qte}</td>
        <td class="num">${l.prix_ht === null ? '<span class="et or">à confirmer</span>' : euros(Number(l.prix_ht) * l.qte)}</td></tr>`
      )
      .join('')}
    <tr><td colspan="2" class="num"><b>Total HT</b></td><td class="num"><b>${euros(detail.c.total_ht)}</b></td></tr>
  </table></div>
  <p class="aide" style="margin-top:12px">Livraison à ${esc(detail.c.adresse)}, ${esc(detail.c.code_postal)} ${esc(detail.c.commune)} — sans frais de port.</p>
</div>`
    : ''
}

<div class="r2">
  <div>
    <h2>Mes commandes</h2>
    ${
      commandes.length
        ? `<div class="tw"><table style="min-width:0">
      <tr><th>Référence</th><th class="num">Total HT</th><th>Statut</th><th class="num">Date</th></tr>
      ${commandes
        .map(
          (c) => `<tr>
        <td><a href="/espace?commande=${c.id}"><b>${esc(c.reference)}</b></a></td>
        <td class="num">${euros(c.total_ht)}</td>
        <td>${et(c.statut)}</td>
        <td class="num">${dateFr(c.cree_le)}</td>
      </tr>`
        )
        .join('')}
    </table></div>`
        : `<div class="carte vide"><p>Vous n'avez pas encore passé de commande.</p>
           <p><a class="b p" href="/produits">Voir le catalogue</a></p></div>`
    }
    <p style="margin-top:16px"><a class="b p" href="/produits">Passer une nouvelle commande</a></p>
  </div>

  <div class="carte">
    <h2 style="margin-top:0">Mes coordonnées</h2>
    <p><b>${esc(client.etablissement)}</b><br>
      ${esc(client.contact)}<br>
      ${esc(client.telephone)}<br>
      ${esc(client.email)}</p>
    <h2>Adresse de livraison</h2>
    <p>${esc(client.adresse) || '<i>non renseignée</i>'}<br>${esc(client.code_postal)} ${esc(client.commune)}</p>
    <p class="aide">Ces informations pré-remplissent vos commandes. Une erreur, un déménagement, un changement de contact ? Appelez le <b>${TEL}</b> ou répondez à l'un de nos e-mails : nous mettons à jour.</p>
  </div>
</div>`,
  }));
}

// ---------------------------------------------------------------------------
function pageConnexion(query) {
  const suite = typeof query.suite === 'string' && query.suite.startsWith('/') && !query.suite.startsWith('//') ? query.suite : '';
  return pageApp({
    titre: 'Connexion',
    corps: `
<div style="max-width:480px;margin:36px auto">
  ${flash(query)}
  <div class="carte">
    <h1>Connexion</h1>
    <p class="sous">Pas de mot de passe à retenir : saisissez votre adresse e-mail, nous vous envoyons un lien de connexion valable 30 minutes.</p>

    <form id="f-connexion">
      <input type="hidden" name="suite" value="${esc(suite)}">
      <div class="champ">
        <label for="em">Votre adresse e-mail</label>
        <input id="em" type="email" name="email" autocomplete="email" required placeholder="vous@votre-etablissement.fr">
      </div>
      <button class="b p" type="submit" id="b-connexion" style="width:100%;justify-content:center">Recevoir mon lien de connexion</button>
      <p class="msg" id="m-connexion" hidden></p>
    </form>

    <p class="aide" style="margin-top:18px">L'accès à la commande en ligne est réservé aux clients SODILAME. Vous n'avez pas encore d'accès ? Appelez-nous au <b>${TEL}</b>, nous vous ouvrons un compte.</p>
  </div>
  <p style="text-align:center"><a href="/produits">← Retour au catalogue</a></p>
</div>

<script>
(function(){
  var f=document.getElementById('f-connexion'),
      m=document.getElementById('m-connexion'),
      b=document.getElementById('b-connexion');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(!f.checkValidity()){f.reportValidity();return;}
    var d=new FormData(f);
    b.disabled=true; m.hidden=false; m.className='msg'; m.textContent='Envoi en cours…';
    fetch('/api/auth?action=demande',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:d.get('email'),suite:d.get('suite')})
    }).then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
    .then(function(r){
      if(r.ok){
        m.className='msg ok';
        m.innerHTML='<b>C\\'est envoyé.</b> Si cette adresse correspond à un compte SODILAME, vous recevez un lien de connexion dans quelques secondes. Pensez à regarder vos indésirables.';
        b.disabled=true;
      }else{
        m.className='msg ko'; m.textContent=r.j.erreur||'Envoi impossible.'; b.disabled=false;
      }
    }).catch(function(){
      m.className='msg ko'; m.textContent='Envoi impossible. Merci d\\'appeler le ${TEL}.'; b.disabled=false;
    });
  });
})();
</script>`,
  });
}
