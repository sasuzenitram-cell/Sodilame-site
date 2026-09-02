// ---------------------------------------------------------------------------
// Pages « étiquette QR code »
//
// Ces pages sont scannées devant une machine, souvent en plein service et
// parfois sur un réseau médiocre. Elles ont donc leur propre gabarit :
//   — CSS intégré à la page : une seule requête, aucun aller-retour ;
//   — polices système : rien à télécharger ;
//   — aucun script sauf sur les formulaires ;
//   — tout tient dans un écran, sans défilement.
//
// Elles sont volontairement en noindex : ce sont des outils, pas du contenu.
// ---------------------------------------------------------------------------
import { site } from '../data/site.mjs';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CSS = `
:root{--navy:#183253;--navy-d:#0F2138;--vert:#1B4A3E;--gold:#DFA64F;--terra:#C5642F;
  --cream:#FAF6EF;--ink:#1B2430;--muted:#5A6675;--line:#E4DACA}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;padding:0}
body{font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;min-height:100dvh;display:flex;flex-direction:column;color:var(--ink)}
a{color:var(--navy)}

/* ---------- Page d'accueil du QR ---------- */
body.accueil{background:var(--navy)}
header.qr{padding:calc(24px + env(safe-area-inset-top)) 20px 18px;text-align:center;color:#fff;
  background:radial-gradient(560px 300px at 50% -10%,rgba(64,130,116,.4),transparent 65%)}
header.qr img{width:38px;height:54px;display:block;margin:0 auto 10px}
header.qr .marque{font-size:19px;font-weight:800;letter-spacing:.13em}
header.qr .bl{font-size:10.5px;letter-spacing:.19em;text-transform:uppercase;color:var(--gold);margin-top:3px}
.intro{color:#C3D0E0;font-size:14.5px;text-align:center;padding:12px 26px 2px;margin:0}
main.actions{flex:1;padding:14px 16px 8px;display:flex;flex-direction:column;gap:12px;justify-content:center}
.act{display:flex;align-items:center;gap:14px;background:#fff;border-radius:16px;padding:18px 16px;
  text-decoration:none;color:inherit;border-left:6px solid var(--c);
  box-shadow:0 2px 10px rgba(0,0,0,.18);transition:transform .12s ease;min-height:92px}
.act:active{transform:scale(.985)}
.act .ic{width:52px;height:52px;flex:none;border-radius:14px;background:var(--bg);color:var(--c);
  display:flex;align-items:center;justify-content:center}
.act .ic svg{width:27px;height:27px}
.act .tx{flex:1;min-width:0}
.act .tx b{display:block;font-size:17.5px;font-weight:700;color:var(--navy);line-height:1.25}
.act .tx span{display:block;font-size:13.5px;color:var(--muted);margin-top:3px;line-height:1.4}
.act .fl{flex:none;color:#B7C0C9}
.act .fl svg{width:20px;height:20px}
.act.sav{--c:var(--terra);--bg:#FBEDE5}
.act.produits{--c:var(--vert);--bg:#E6F0EA}
.act.audit{--c:#B4761B;--bg:#FBF0DC}
.appel{position:sticky;bottom:0;padding:12px 16px calc(14px + env(safe-area-inset-bottom));
  background:linear-gradient(to top,var(--navy-d) 70%,rgba(15,33,56,0))}
.appel a{display:flex;align-items:center;justify-content:center;gap:9px;background:var(--gold);
  color:#1B2430;text-decoration:none;font-weight:700;font-size:17px;padding:16px;border-radius:14px;
  box-shadow:0 3px 14px rgba(0,0,0,.28)}
.appel a svg{width:20px;height:20px}
.appel p{margin:9px 0 0;text-align:center;font-size:12.5px;color:#9DB0C7}

/* ---------- Pages formulaire ---------- */
body.form{background:var(--cream)}
.bar{background:var(--navy);color:#fff;display:flex;align-items:center;gap:12px;
  padding:calc(14px + env(safe-area-inset-top)) 16px 14px}
.bar a{color:#fff;text-decoration:none;display:flex;align-items:center;justify-content:center;
  flex:none;width:44px;height:44px;margin-left:-11px}
.bar svg{width:22px;height:22px}
.bar b{font-size:16.5px;font-weight:700}
main.f{flex:1;padding:18px 16px 100px}
.chapo{background:#fff;border:1px solid var(--line);border-left:5px solid var(--a);border-radius:12px;
  padding:13px 15px;margin:0 0 20px;font-size:14px;color:var(--muted);line-height:1.5}
.chapo b{color:var(--navy)}
label{display:block;font-size:13px;font-weight:600;color:var(--muted);margin:0 0 6px}
.champ{margin-bottom:16px}
input,select,textarea{width:100%;padding:15px 14px;border:1px solid var(--line);border-radius:12px;
  background:#fff;font:inherit;font-size:16px;color:var(--ink)}
input:focus,select:focus,textarea:focus{outline:2px solid var(--gold);outline-offset:-1px;border-color:var(--gold)}
textarea{min-height:110px;resize:vertical}
.env{position:sticky;bottom:0;padding:12px 16px calc(14px + env(safe-area-inset-bottom));
  background:linear-gradient(to top,var(--cream) 72%,rgba(250,246,239,0))}
.env button{width:100%;border:0;background:var(--a);color:#fff;font:inherit;font-size:17px;
  font-weight:700;padding:17px;border-radius:14px;cursor:pointer}
.env button:disabled{opacity:.55}
.env p{margin:10px 0 0;text-align:center;font-size:12px;color:var(--muted)}
.env p a{color:var(--navy);font-weight:700}
.msg{padding:13px 15px;border-radius:11px;margin:0 0 16px;font-size:14.5px;line-height:1.5}
.msg.ko{background:#F8E4E2;border:1px solid #EDC4BF;color:#A8352C}
.msg.info{background:#FBF0DC;border:1px solid #E8CE9B;color:#8A5A12}
.msg.info a{color:#8A5A12;font-weight:700}

/* ---------- Photos et vidéo ---------- */
.media{border:2px dashed var(--line);border-radius:14px;background:#fff;padding:20px 16px;text-align:center}
.media .btn{display:inline-flex;align-items:center;gap:10px;background:var(--navy);color:#fff;
  border:0;border-radius:12px;padding:15px 22px;font:inherit;font-size:16px;font-weight:700;cursor:pointer}
.media .btn svg{width:22px;height:22px}
.media .aide{margin:12px 0 0;font-size:12.5px;color:var(--muted);line-height:1.5}
.media input[type=file]{position:absolute;left:-9999px;width:1px;height:1px}
.vignettes{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px;margin-top:14px}
.vign-m{position:relative;aspect-ratio:1/1;border-radius:11px;overflow:hidden;background:var(--cream);
  border:1px solid var(--line)}
.vign-m img{width:100%;height:100%;object-fit:cover;display:block}
.vign-m .film{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:5px;color:var(--navy);font-size:10.5px;text-align:center;padding:6px}
.vign-m .film svg{width:26px;height:26px}
.vign-m button{position:absolute;top:5px;right:5px;width:28px;height:28px;border-radius:50%;
  border:0;background:rgba(15,33,56,.82);color:#fff;font-size:15px;line-height:1;cursor:pointer;
  display:flex;align-items:center;justify-content:center}
.media-etat{font-size:12.5px;color:var(--muted);margin:12px 0 0}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}

/* Écran de confirmation */
.fini{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:40px 26px}
.fini .rond{width:74px;height:74px;border-radius:50%;background:#E2F1EA;color:#1F7A56;
  display:flex;align-items:center;justify-content:center;margin-bottom:20px}
.fini .rond svg{width:38px;height:38px}
.fini h2{font-size:22px;color:var(--navy);margin:0 0 10px}
.fini p{color:var(--muted);font-size:15px;margin:0 0 8px;max-width:30em}
.fini .ref{margin-top:16px;padding:11px 20px;background:#fff;border:1px solid var(--line);
  border-radius:12px;color:var(--navy);font-size:15px}
.fini .ref span{display:block;margin-top:3px;color:var(--muted);font-size:12.5px}

/* ---------- Écrans courts : les 3 actions doivent tenir sans défiler ---------- */
@media (max-height:740px){
  header.qr{padding-top:calc(14px + env(safe-area-inset-top));padding-bottom:12px}
  header.qr img{width:30px;height:43px;margin-bottom:7px}
  header.qr .marque{font-size:17px}
  .intro{padding:10px 26px 0;font-size:13.5px}
  main.actions{padding:10px 14px 4px;gap:10px}
  .act{min-height:76px;padding:13px 14px;border-radius:14px}
  .act .ic{width:44px;height:44px;border-radius:12px}
  .act .ic svg{width:23px;height:23px}
  .act .tx b{font-size:16px}
  .act .tx span{font-size:12.5px}
  .appel{padding-top:8px}
  .appel a{padding:14px;font-size:16px}
  .appel p{font-size:12px;margin-top:7px}
}
`;

function coque({ titre, classe, corps, script = '' }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>${esc(titre)}</title>
<meta name="theme-color" content="${classe === 'accueil' ? '#183253' : '#183253'}">
<link rel="icon" href="/favicon.png" type="image/png">
<style>${CSS}</style>
</head>
<body class="${classe}">
${corps}
${script ? `<script>${script}</script>` : ''}
</body>
</html>`;
}

const ico = (d) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const chevron =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
const retour =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
const telIco =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';

// ---------------------------------------------------------------------------
// /qr — les trois actions
// ---------------------------------------------------------------------------
export function pageQr() {
  const action = (classe, url, icone, titre, sous) => `
  <a class="act ${classe}" href="${url}">
    <span class="ic">${icone}</span>
    <span class="tx"><b>${titre}</b><span>${sous}</span></span>
    <span class="fl">${chevron}</span>
  </a>`;

  const corps = `
<header class="qr">
  <img src="/assets/mark@2x.png" width="38" height="54" alt="${site.nom}">
  <div class="marque">${site.nom}</div>
  <div class="bl">${site.baseline}</div>
</header>

<p class="intro">Que souhaitez-vous faire&nbsp;?</p>

<main class="actions">
  ${action('sav', '/qr/panne',
    ico('<path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'),
    'Signaler une panne', 'Un technicien vous rappelle')}
  ${action('produits', '/produits',
    ico('<path d="M8 8h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"/><path d="M10 8V5.5h4V8"/><path d="M15 5.5h2.2a1.3 1.3 0 0 1 1.3 1.3V9"/>'),
    'Commander mes produits', 'Livraison offerte dès un bidon')}
  ${action('audit', '/qr/audit',
    ico('<path d="M6 3h9l5 5v13H6z"/><path d="M15 3v5h5"/><path d="m9.5 14.5 1.8 1.8 3.5-3.6"/>'),
    'Audit technique', 'Gratuit — bilan de votre parc')}
</main>

<div class="appel">
  <a href="tel:${site.telephoneE164}">${telIco}${site.telephone}</a>
  <p>En plein service&nbsp;? Appelez, c'est plus rapide.</p>
</div>`;

  return coque({ titre: `${site.nom} — Votre équipement`, classe: 'accueil', corps });
}


// ---------------------------------------------------------------------------
// Photos : compression dans le navigateur
//
// Une photo de téléphone pèse 3 à 6 Mo. Envoyée telle quelle depuis une cuisine
// en 4G, l'upload échoue ou dure une minute. On la redimensionne à 1600 px et
// on la réencode en JPEG 0,72 : on tombe à 200–350 Ko sans perdre la lisibilité
// d'un code erreur ou d'une plaque signalétique.
// ---------------------------------------------------------------------------
const SCRIPT_MEDIA = `
var MEDIAS = [];
var MAX_FICHIERS = 4;
var MAX_TOTAL = 2600000;      // ~2,6 Mo de binaire, soit ~3,5 Mo une fois encodés
var MAX_VIDEO = 2000000;      // au-delà, la vidéo passe par SMS

(function(){
  var input = document.getElementById('fichiers');
  var bouton = document.getElementById('b-photo');
  var grille = document.getElementById('vignettes');
  var etat = document.getElementById('media-etat');
  if (!input) return;

  bouton.addEventListener('click', function(){ input.click(); });

  function total(){ return MEDIAS.reduce(function(n,m){ return n + m.poids; }, 0); }

  function dire(texte, type){
    etat.hidden = !texte;
    etat.textContent = texte || '';
    etat.style.color = type === 'ko' ? '#A8352C' : '';
  }

  function rendre(){
    grille.innerHTML = MEDIAS.map(function(m, i){
      var apercu = m.video
        ? '<span class="film"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m23 7-7 5 7 5z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>Vid\\u00e9o</span>'
        : '<img src="' + m.apercu + '" alt="">';
      return '<div class="vign-m">' + apercu +
        '<button type="button" data-i="' + i + '" aria-label="Retirer">\\u2715</button></div>';
    }).join('');
    grille.querySelectorAll('button').forEach(function(b){
      b.addEventListener('click', function(){
        MEDIAS.splice(parseInt(b.dataset.i, 10), 1);
        rendre();
        dire(MEDIAS.length ? MEDIAS.length + ' fichier' + (MEDIAS.length>1?'s':'') + ' joint' + (MEDIAS.length>1?'s':'') : '');
      });
    });
    bouton.textContent = MEDIAS.length ? 'Ajouter une autre photo' : 'Prendre une photo';
  }

  // Redimensionne et réencode une image via <canvas>.
  function compresser(fichier){
    return new Promise(function(resoudre, rejeter){
      var url = URL.createObjectURL(fichier);
      var img = new Image();
      img.onload = function(){
        var max = 1600;
        var l = img.width, h = img.height;
        if (l > max || h > max) {
          if (l > h) { h = Math.round(h * max / l); l = max; }
          else { l = Math.round(l * max / h); h = max; }
        }
        var c = document.createElement('canvas');
        c.width = l; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, l, h);
        URL.revokeObjectURL(url);
        var data = c.toDataURL('image/jpeg', 0.72);
        // Si c'est encore lourd (photo très détaillée), on baisse la qualité.
        if (data.length > 950000) data = c.toDataURL('image/jpeg', 0.55);
        resoudre({ apercu: data, poids: Math.round(data.length * 0.75) });
      };
      img.onerror = function(){ URL.revokeObjectURL(url); rejeter(new Error('image illisible')); };
      img.src = url;
    });
  }

  function lireTelQuel(fichier){
    return new Promise(function(resoudre, rejeter){
      var fr = new FileReader();
      fr.onload = function(){ resoudre(fr.result); };
      fr.onerror = function(){ rejeter(new Error('lecture impossible')); };
      fr.readAsDataURL(fichier);
    });
  }

  input.addEventListener('change', function(){
    var fichiers = Array.prototype.slice.call(input.files || []);
    input.value = '';
    if (!fichiers.length) return;
    dire('Pr\\u00e9paration\\u2026');

    var suite = Promise.resolve();
    var refus = [];

    fichiers.forEach(function(fichier){
      suite = suite.then(function(){
        if (MEDIAS.length >= MAX_FICHIERS) { refus.push('max'); return; }
        var estVideo = /^video\\//.test(fichier.type);

        if (estVideo) {
          if (fichier.size > MAX_VIDEO) { refus.push('video'); return; }
          return lireTelQuel(fichier).then(function(data){
            if (total() + fichier.size > MAX_TOTAL) { refus.push('poids'); return; }
            MEDIAS.push({ nom: fichier.name || 'video.mp4', type: fichier.type, data: data,
                          poids: fichier.size, video: true });
          });
        }

        return compresser(fichier).then(function(r){
          if (total() + r.poids > MAX_TOTAL) { refus.push('poids'); return; }
          MEDIAS.push({ nom: (fichier.name || 'photo').replace(/\\.[^.]+$/, '') + '.jpg',
                        type: 'image/jpeg', data: r.apercu, apercu: r.apercu, poids: r.poids, video: false });
        }).catch(function(){ refus.push('lecture'); });
      });
    });

    suite.then(function(){
      rendre();
      var messages = [];
      if (MEDIAS.length) messages.push(MEDIAS.length + ' fichier' + (MEDIAS.length>1?'s':'') + ' joint' + (MEDIAS.length>1?'s':''));
      if (refus.indexOf('max') > -1) messages.push(MAX_FICHIERS + ' fichiers maximum');
      if (refus.indexOf('poids') > -1) messages.push('certains fichiers d\\u00e9passent la taille autoris\\u00e9e');
      if (refus.indexOf('lecture') > -1) messages.push('un fichier n\\u2019a pas pu \\u00eatre lu');
      dire(messages.join(' \\u00b7 '), refus.length ? 'ko' : '');

      if (refus.indexOf('video') > -1) {
        var av = document.getElementById('avis-video');
        if (!av) {
          av = document.createElement('p');
          av.id = 'avis-video';
          av.className = 'msg info';
          av.style.marginTop = '14px';
          av.innerHTML = '<b>Votre vid\\u00e9o est trop lourde pour le formulaire.</b> ' +
            'Envoyez-la directement par SMS ou WhatsApp au ' +
            '<a href="sms:${site.telephoneE164}">${site.telephone}</a> en pr\\u00e9cisant le nom de votre \\u00e9tablissement. ' +
            'Les photos, elles, passent sans probl\\u00e8me.';
          document.querySelector('.media').appendChild(av);
        }
      }
    });
  });
})();
`;

// ---------------------------------------------------------------------------
// Script commun aux deux formulaires
// ---------------------------------------------------------------------------
const SCRIPT = `
(function(){
  var f=document.getElementById('f'),b=document.getElementById('b'),m=document.getElementById('m');
  if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(!f.checkValidity()){f.reportValidity();return;}
    var d=new FormData(f),o={};
    d.forEach(function(v,k){o[k]=v;});
    if(typeof MEDIAS!=='undefined'&&MEDIAS.length){
      o.fichiers=MEDIAS.map(function(m){return {nom:m.nom,type:m.type,data:m.data};});
    }
    b.disabled=true;b.textContent=(typeof MEDIAS!=='undefined'&&MEDIAS.length)?'Envoi des photos\u2026':'Envoi en cours\u2026';m.hidden=true;
    fetch('/api/sav',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(o)})
      .then(function(r){return r.json().then(function(j){return{ok:r.ok&&j.ok,j:j};});})
      .then(function(r){
        if(r.ok){
          document.getElementById('ecran').innerHTML=
            '<div class="fini"><div class="rond"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>'+
            '<h2>C\\u2019est envoy\\u00e9</h2><p>'+f.dataset.confirme+'</p>'+
            (r.j&&r.j.reference?'<p class="ref">R\\u00e9f\\u00e9rence <b>'+r.j.reference+'</b><br><span>\\u00c0 rappeler si vous nous t\\u00e9l\\u00e9phonez.</span></p>':'')+
            '<p style="margin-top:18px"><a href="tel:${site.telephoneE164}"><b>${site.telephone}</b></a></p></div>';
          window.scrollTo(0,0);
        } else {
          m.hidden=false;m.textContent=(r.j&&r.j.erreur)||'Envoi impossible. Merci d\\u2019appeler le ${site.telephone}.';
          b.disabled=false;b.textContent=f.dataset.bouton;
          m.scrollIntoView({behavior:'smooth',block:'center'});
        }
      })
      .catch(function(){
        m.hidden=false;m.textContent='Envoi impossible. Merci d\\u2019appeler le ${site.telephone}.';
        b.disabled=false;b.textContent=f.dataset.bouton;
      });
  });
})();`;

// ---------------------------------------------------------------------------
// /qr/panne — signalement de panne
//
// Quatre champs et un bouton photo. Pas de compte, pas de mot de passe : la
// personne qui constate la panne est souvent un cuisinier en plein service.
//
// Les photos sont compressées DANS LE NAVIGATEUR avant l'envoi (1600 px, JPEG
// qualité 0,72). Une photo de téléphone pèse 4 Mo et sort à ~250 Ko : l'envoi
// passe même en 4G médiocre, et reste sous la limite de taille des fonctions.
// ---------------------------------------------------------------------------
export function pagePanne() {
  const corps = `
<div class="bar">
  <a href="/qr" aria-label="Retour">${retour}</a>
  <b>Signaler une panne</b>
</div>

<div id="ecran" style="flex:1;display:flex;flex-direction:column">
<form id="f" style="flex:1;display:flex;flex-direction:column"
      data-bouton="Envoyer le signalement"
      data-confirme="Nous avons re&ccedil;u votre signalement. Un technicien vous rappelle sous 24&nbsp;heures ouvr&eacute;es. Si la panne bloque votre service, appelez-nous directement.">
  <input type="hidden" name="type" value="panne">
  <main class="f" style="--a:var(--terra);--abg:#FBEDE5">
    <p class="chapo" style="--a:var(--terra)">Quatre informations et, si vous le pouvez, <b>une photo</b> : c'est ce qui nous permet d'arriver avec la bonne pi&egrave;ce.</p>

    <p class="msg ko" id="m" hidden></p>

    <div class="champ">
      <label for="q1">Nom de votre établissement</label>
      <input id="q1" type="text" name="etablissement" required autocomplete="organization" placeholder="Restaurant Le Mas">
    </div>

    <div class="champ">
      <label for="q2">Produit en panne</label>
      <input id="q2" type="text" name="machine" required placeholder="Four Rational, chambre froide, lave-vaisselle…">
    </div>

    <div class="champ">
      <label for="q3">Description de la panne</label>
      <textarea id="q3" name="description" required placeholder="Ne chauffe plus, code erreur E12 affiché depuis ce matin…"></textarea>
    </div>

    <div class="champ">
      <label>Photos ou vidéo</label>
      <div class="media">
        <button class="btn" type="button" id="b-photo">
          ${ico('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>')}
          Prendre une photo
        </button>
        <input type="file" id="fichiers" accept="image/*,video/*" multiple>
        <p class="aide">Le code erreur affiché, la plaque signalétique, la fuite, la pièce cassée… <b>Une photo vaut dix lignes de description.</b></p>
        <div class="vignettes" id="vignettes"></div>
        <p class="media-etat" id="media-etat" hidden></p>
      </div>
    </div>

    <div class="champ">
      <label for="q4">Votre téléphone</label>
      <input id="q4" type="tel" name="telephone" required inputmode="tel" autocomplete="tel" placeholder="06 12 34 56 78">
      <p class="aide" style="margin-top:6px">C'est sur ce numéro que le technicien vous rappelle.</p>
    </div>

    <div class="hp" aria-hidden="true"><label for="societe_web">Ne pas remplir</label><input id="societe_web" name="societe_web" tabindex="-1" autocomplete="off"></div>

    <p style="font-size:12.5px;color:var(--muted);line-height:1.55;margin:0">
      Ces informations servent uniquement à traiter votre demande.
      <a href="/politique-de-confidentialite">Politique de confidentialité</a>.
    </p>
  </main>

  <div class="env" style="--a:var(--terra)">
    <button type="submit" id="b">Envoyer le signalement</button>
    <p>Réponse sous 24 h ouvrées. Urgence&nbsp;: <a href="tel:${site.telephoneE164}">${site.telephone}</a></p>
  </div>
</form>
</div>`;

  return coque({ titre: `Signaler une panne — ${site.nom}`, classe: 'form', corps, script: SCRIPT_MEDIA + SCRIPT });
}

// ---------------------------------------------------------------------------
// /qr/audit — demande d'audit technique
// ---------------------------------------------------------------------------
export function pageAudit() {
  const corps = `
<div class="bar">
  <a href="/qr" aria-label="Retour">${retour}</a>
  <b>Audit technique</b>
</div>

<div id="ecran" style="flex:1;display:flex;flex-direction:column">
<form id="f" style="flex:1;display:flex;flex-direction:column"
      data-bouton="Demander mon audit"
      data-confirme="Nous avons re&ccedil;u votre demande. Nous vous rappelons pour convenir d&rsquo;un cr&eacute;neau de passage.">
  <input type="hidden" name="type" value="audit">
  <main class="f" style="--a:#B4761B;--abg:#FBF0DC">
    <p class="chapo" style="--a:#B4761B">Un technicien passe dans votre établissement, recense vos équipements et vous remet un rapport avec les priorités. <b>Gratuit et sans engagement.</b></p>

    <p class="msg ko" id="m" hidden></p>

    <div class="champ">
      <label for="a1">Votre établissement</label>
      <input id="a1" type="text" name="etablissement" required autocomplete="organization" placeholder="Restaurant Le Mas">
    </div>

    <div class="champ">
      <label for="a2">Commune</label>
      <input id="a2" type="text" name="commune" required autocomplete="address-level2" placeholder="Arles">
    </div>

    <div class="champ">
      <label for="a3">Votre téléphone</label>
      <input id="a3" type="tel" name="telephone" required inputmode="tel" autocomplete="tel" placeholder="06 12 34 56 78">
    </div>

    <div class="champ">
      <label for="a4">Votre nom</label>
      <input id="a4" type="text" name="nom" autocomplete="name" placeholder="Facultatif">
    </div>

    <div class="champ">
      <label for="a5">Votre e-mail</label>
      <input id="a5" type="email" name="email" autocomplete="email" inputmode="email" placeholder="Facultatif — pour recevoir une confirmation">
    </div>

    <div class="champ">
      <label for="a6">Quelque chose à signaler ?</label>
      <textarea id="a6" name="description" placeholder="Nombre d'équipements, matériel qui vous inquiète, contrat en cours ailleurs…"></textarea>
    </div>

    <div class="hp" aria-hidden="true"><label for="societe_web">Ne pas remplir</label><input id="societe_web" name="societe_web" tabindex="-1" autocomplete="off"></div>

    <p style="font-size:12.5px;color:var(--muted);line-height:1.55;margin:0">
      Ces informations servent uniquement à traiter votre demande.
      <a href="/politique-de-confidentialite">Politique de confidentialité</a>.
    </p>
  </main>

  <div class="env" style="--a:#B4761B">
    <button type="submit" id="b">Demander mon audit</button>
    <p>Ou appelez le <a href="tel:${site.telephoneE164}">${site.telephone}</a></p>
  </div>
</form>
</div>`;

  return coque({ titre: `Audit technique gratuit — ${site.nom}`, classe: 'form', corps, script: SCRIPT });
}
