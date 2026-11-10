// ---------------------------------------------------------------------------
// CATALOGUE FILTRABLE — /eshop/catalogue
//
// Une seule page porte toutes les références, filtrables sur trois axes :
// famille (détergent, rinçage, entretien machine, entretien four), marque et
// type de machine.
//
// Le filtrage est intégral côté navigateur : toutes les cartes sont dans le HTML
// livré, le script ne fait que masquer celles qui ne correspondent pas. Trois
// conséquences voulues :
//   — sans JavaScript, la page reste un catalogue complet et navigable ;
//   — Google voit tous les produits et leurs liens, pas une grille vide ;
//   — aucun aller-retour réseau au clic, donc pas d'attente sur mobile.
//
// L'état des filtres est écrit dans l'URL (?famille=&marque=&machine=). Un lien
// filtré est donc partageable, et les anciennes URL de famille redirigent vers
// le catalogue avec le bon filtre déjà appliqué.
// ---------------------------------------------------------------------------

export const SCRIPT_FILTRES = `
(function(){
  var zone = document.getElementById('catalogue');
  if (!zone) return;
  var cartes  = Array.prototype.slice.call(zone.querySelectorAll('[data-produit]'));
  var boutons = Array.prototype.slice.call(document.querySelectorAll('[data-filtre]'));
  var compte  = document.getElementById('compte');
  var vide    = document.getElementById('aucun');
  var reinit  = document.getElementById('reinit');
  var conseils = Array.prototype.slice.call(document.querySelectorAll('[data-conseil]'));
  var AXES = ['famille','marque','machine'];
  var etat = { famille:'', marque:'', machine:'', q:'' };
  // Recherche plein texte : le champ du catalogue et celui de l'en-tête de la
  // boutique (qui envoie ?q= vers cette page) partagent la même valeur.
  var champ = document.getElementById('recherche');
  var champTete = document.getElementById('q-shop');
  function normaliser(t){
    return String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  cartes.forEach(function(c){ c._texte = ' ' + normaliser((c.dataset.texte || '') + ' ' + c.textContent) + ' '; });

  function lireUrl(){
    var q = new URLSearchParams(location.search);
    AXES.forEach(function(a){
      var v = (q.get(a) || '').trim();
      // On n'accepte que des valeurs réellement présentes dans la page :
      // un paramètre inventé ne doit pas vider le catalogue.
      if (v && boutons.some(function(b){ return b.dataset.filtre === a && b.dataset.valeur === v; })) etat[a] = v;
    });
    etat.q = (q.get('q') || '').trim().slice(0, 80);
    if (champ) champ.value = etat.q;
    if (champTete) champTete.value = etat.q;
  }

  function ecrireUrl(){
    var q = new URLSearchParams();
    AXES.forEach(function(a){ if (etat[a]) q.set(a, etat[a]); });
    if (etat.q) q.set('q', etat.q);
    var s = q.toString();
    // Sans filtre, aucune ancre : sinon le simple chargement de /eshop/catalogue
    // réécrivait l’URL en /eshop/catalogue#catalogue et sautait par-dessus le hero.
    history.replaceState(null, '', s ? '?' + s + '#catalogue' : location.pathname);
  }

  function auCatalogue(c){
    // Produit retiré de la vente depuis l'administration. Le marquage est posé
    // par panier.js à la réception de /api/catalogue : la carte est bien dans le
    // HTML livré, mais elle ne doit ni s'afficher, ni être comptée, ni pouvoir
    // réapparaître au clic sur un filtre.
    return c.dataset.horsCatalogue !== '1';
  }

  function correspond(c){
    if (!auCatalogue(c)) return false;
    if (etat.famille && c.dataset.famille !== etat.famille) return false;
    if (etat.marque  && c.dataset.marque  !== etat.marque)  return false;
    if (etat.machine && (' ' + c.dataset.machines + ' ').indexOf(' ' + etat.machine + ' ') === -1) return false;
    if (etat.q) {
      // Chaque mot cherché doit apparaître : « lave linge 9 » trouve le
      // PWM 909 ; « lessive 20 l » trouve les bidons de 20 litres.
      var mots = normaliser(etat.q).split(' ');
      for (var i = 0; i < mots.length; i++) if (mots[i] && c._texte.indexOf(' ' + mots[i]) === -1) return false; // début de mot : « 10 » ne trouve pas « 1108 »
    }
    return true;
  }

  function appliquer(){
    var n = 0;
    // Le total affiché à côté du compteur exclut lui aussi les produits retirés,
    // sinon on annoncerait « 7 références sur 19 » alors que la boutique n'en
    // propose plus que 17.
    var total = 0;
    cartes.forEach(function(c){
      if (auCatalogue(c)) total++;
      var ok = correspond(c);
      c.hidden = !ok;
      if (ok) n++;
    });

    boutons.forEach(function(b){
      var actif = etat[b.dataset.filtre] === b.dataset.valeur;
      b.setAttribute('aria-pressed', actif ? 'true' : 'false');
    });

    // Le conseil technique de la famille ne s'affiche que quand cette famille
    // est seule à l'écran : hors contexte, c'est du bruit.
    conseils.forEach(function(d){ d.hidden = d.dataset.conseil !== etat.famille; });

    compte.textContent = n === 0 ? 'Aucune référence'
      : n === total ? total + ' références'
      : n + (n > 1 ? ' références sur ' : ' référence sur ') + total;
    vide.hidden = n > 0;
    reinit.hidden = !(etat.famille || etat.marque || etat.machine || etat.q);
    ecrireUrl();
  }

  // Filtrer fait fondre la hauteur de la page — de 19 cartes à 7, elle perd
  // près de 2 000 px. Le navigateur ramène alors le défilement dans les
  // limites du document, et l'utilisateur se retrouve n'importe où : souvent
  // sous le dernier produit, devant du vide. Il croit que le filtre ne marche
  // pas alors qu'il regarde le bas de la page.
  // On replace donc la barre de filtres en haut de l'écran après chaque clic.
  function recentrer(){
    var barre = document.getElementById('barre-filtres');
    if (!barre) return;
    var y = barre.getBoundingClientRect().top + window.pageYOffset - 96;
    // Uniquement si l'on a déjà quitté le haut de la page : sinon on déplace
    // l'écran alors que tout était déjà visible.
    if (window.pageYOffset > y) {
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }

  boutons.forEach(function(b){
    b.addEventListener('click', function(){
      var a = b.dataset.filtre, v = b.dataset.valeur;
      etat[a] = etat[a] === v ? '' : v;   // second clic : on retire le filtre
      appliquer();
      recentrer();
    });
  });

  reinit.addEventListener('click', function(){
    etat = { famille:'', marque:'', machine:'', q:'' };
    if (champ) champ.value = '';
    if (champTete) champTete.value = '';
    appliquer();
    recentrer();
  });

  if (champ) {
    champ.addEventListener('input', function(){
      etat.q = champ.value.trim().slice(0, 80);
      if (champTete) champTete.value = etat.q;
      appliquer();
    });
  }
  // Sur cette page, la recherche de l'en-tête filtre sur place, sans recharger.
  if (champTete && champ) {
    champTete.form.addEventListener('submit', function(e){
      e.preventDefault();
      etat.q = champTete.value.trim().slice(0, 80);
      champ.value = etat.q;
      appliquer();
      recentrer();
    });
  }

  // panier.js apprend de /api/catalogue quels produits ne sont plus en vente,
  // après ce script. Il a donc besoin de nous redemander un passage.
  window.sodilameCatalogue = { recalculer: appliquer };

  lireUrl();
  appliquer();
  // Les filtres n'ont de sens qu'avec le script : on ne les montre qu'ici.
  document.getElementById('barre-filtres').hidden = false;
})();
`;

/** Une rangée de filtres : légende + boutons bascule. */
export function groupeFiltres(legende, axe, options, esc) {
  return `<div class="fgroupe" role="group" aria-label="${esc(legende)}">
        <span class="flabel">${esc(legende)}</span>
        <div class="fboutons">
          ${options
            .map(
              (o) =>
                `<button type="button" class="fbtn" data-filtre="${axe}" data-valeur="${esc(o.slug)}" aria-pressed="false">${esc(o.nom)}<span class="fn">${o.n}</span></button>`
            )
            .join('\n          ')}
        </div>
      </div>`;
}

// ---------------------------------------------------------------------------
// BARRE DE TRI — fine et discrète, au-dessus de chaque grille de produits
// (rayons, collections, catalogue). Demande de la direction du 10/11/2026 :
// trier par prix, filtrer par marque.
//
//   — « Marque » (un menu, une marque à la fois) : seulement s'il y en a au
//     moins deux dans la grille, et pas sur /eshop/catalogue, qui a déjà ses
//     boutons de marque. ?marque= garde le choix dans l'adresse (lien du QR
//     code, retour arrière).
//   — « Trier » : pertinence (ordre de la page), prix croissant ou
//     décroissant, marque. Les articles sans prix passent en dernier.
//
// Elle remplace le filtre par boutons des rayons (04/11/2026). Masquée sans
// JavaScript, comme les autres filtres.
// ---------------------------------------------------------------------------

/** La barre. `marques` : liste des marques de la grille (menu affiché si > 1). */
export function barreTri({ marques = [], total, compte = true }, esc) {
  const menuMarque = marques.length > 1
    ? `<label class="tri-champ">Marque
        <select id="tri-marque">
          <option value="">Toutes</option>
          ${marques.map((m) => `<option value="${esc(m)}">${esc(m)}</option>`).join('\n          ')}
        </select>
      </label>`
    : '';
  return `<div class="tri-barre" id="tri-barre" hidden>
      ${compte ? `<span class="tri-compte" id="tri-compte">${total} références</span>` : '<span class="tri-compte"></span>'}
      ${menuMarque}
      <label class="tri-champ">Trier
        <select id="tri-ordre">
          <option value="">Pertinence</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="marque">Marque</option>
        </select>
      </label>
    </div>`;
}

export const SCRIPT_TRI = `
(function () {
  var barre = document.getElementById('tri-barre');
  var grille = document.getElementById('catalogue');
  if (!barre || !grille) return;
  var cartes = [].slice.call(grille.querySelectorAll('[data-produit]'));
  cartes.forEach(function (c, i) { c._ordre = i; });
  var menuMarque = document.getElementById('tri-marque');
  var menuOrdre = document.getElementById('tri-ordre');
  var compte = document.getElementById('tri-compte');
  var marques = menuMarque ? [].map.call(menuMarque.options, function (o) { return o.value; }) : [];

  function prix(c) {
    var v = parseFloat(c.getAttribute('data-prix'));
    return isNaN(v) ? null : v;
  }
  function trier() {
    var o = menuOrdre.value;
    var l = cartes.slice().sort(function (a, b) {
      if (o === 'prix-asc' || o === 'prix-desc') {
        var pa = prix(a), pb = prix(b);
        if (pa === null && pb === null) return a._ordre - b._ordre;
        if (pa === null) return 1;
        if (pb === null) return -1;
        return o === 'prix-asc' ? pa - pb || a._ordre - b._ordre : pb - pa || a._ordre - b._ordre;
      }
      if (o === 'marque') return a.getAttribute('data-marque').localeCompare(b.getAttribute('data-marque'), 'fr') || a._ordre - b._ordre;
      return a._ordre - b._ordre;
    });
    l.forEach(function (c) { grille.appendChild(c); });
  }
  function filtrer() {
    // Sur /eshop/catalogue, le filtrage appartient au script des filtres.
    if (!menuMarque) return;
    var m = menuMarque.value, n = 0;
    cartes.forEach(function (c) {
      var ok = c.dataset.horsCatalogue !== '1' && (!m || c.getAttribute('data-marque') === m);
      c.hidden = !ok;
      if (ok) n++;
    });
    if (compte) compte.textContent = n + (n > 1 ? ' références' : ' référence') + (m ? ' ' + m : '');
  }
  function url() {
    if (!menuMarque || !window.history || !history.replaceState) return;
    var u = new URL(location.href);
    if (menuMarque.value) u.searchParams.set('marque', menuMarque.value); else u.searchParams.delete('marque');
    history.replaceState(null, '', u.pathname + u.search + u.hash);
  }
  function appliquer() { filtrer(); trier(); }

  if (menuMarque) {
    var initial = new URLSearchParams(location.search).get('marque') || '';
    menuMarque.value = marques.indexOf(initial) > 0 ? initial : '';
    menuMarque.addEventListener('change', function () { appliquer(); url(); });
    // panier.js signale ici les produits retirés de la vente.
    if (!window.sodilameCatalogue) window.sodilameCatalogue = { recalculer: appliquer };
  }
  menuOrdre.addEventListener('change', trier);
  appliquer();
  barre.hidden = false;
})();
`;
