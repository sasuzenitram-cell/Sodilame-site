// ---------------------------------------------------------------------------
// CATALOGUE FILTRABLE — /produits
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
  var etat = { famille:'', marque:'', machine:'' };

  function lireUrl(){
    var q = new URLSearchParams(location.search);
    AXES.forEach(function(a){
      var v = (q.get(a) || '').trim();
      // On n'accepte que des valeurs réellement présentes dans la page :
      // un paramètre inventé ne doit pas vider le catalogue.
      if (v && boutons.some(function(b){ return b.dataset.filtre === a && b.dataset.valeur === v; })) etat[a] = v;
    });
  }

  function ecrireUrl(){
    var q = new URLSearchParams();
    AXES.forEach(function(a){ if (etat[a]) q.set(a, etat[a]); });
    var s = q.toString();
    // Sans filtre, aucune ancre : sinon le simple chargement de /produits
    // réécrivait l'URL en /produits#catalogue et sautait par-dessus le hero.
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
    reinit.hidden = !(etat.famille || etat.marque || etat.machine);
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
    etat = { famille:'', marque:'', machine:'' };
    appliquer();
    recentrer();
  });

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
