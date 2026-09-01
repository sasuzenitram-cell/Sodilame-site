// ---------------------------------------------------------------------------
// CATALOGUE FILTRABLE — /produits
//
// Une seule page porte les 17 références, filtrables sur trois axes :
// famille (détergent / rinçage / entretien four), marque et type de machine.
//
// Le filtrage est intégral côté navigateur : les 17 cartes sont dans le HTML
// livré, le script ne fait que masquer celles qui ne correspondent pas. Trois
// conséquences voulues :
//   — sans JavaScript, la page reste un catalogue complet et navigable ;
//   — Google voit les 17 produits et leurs liens, pas une grille vide ;
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
    history.replaceState(null, '', s ? '?' + s + '#catalogue' : location.pathname + '#catalogue');
  }

  function correspond(c){
    if (etat.famille && c.dataset.famille !== etat.famille) return false;
    if (etat.marque  && c.dataset.marque  !== etat.marque)  return false;
    if (etat.machine && (' ' + c.dataset.machines + ' ').indexOf(' ' + etat.machine + ' ') === -1) return false;
    return true;
  }

  function appliquer(){
    var n = 0;
    cartes.forEach(function(c){
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
      : n === cartes.length ? cartes.length + ' références'
      : n + (n > 1 ? ' références sur ' : ' référence sur ') + cartes.length;
    vide.hidden = n > 0;
    reinit.hidden = !(etat.famille || etat.marque || etat.machine);
    ecrireUrl();
  }

  boutons.forEach(function(b){
    b.addEventListener('click', function(){
      var a = b.dataset.filtre, v = b.dataset.valeur;
      etat[a] = etat[a] === v ? '' : v;   // second clic : on retire le filtre
      appliquer();
    });
  });

  reinit.addEventListener('click', function(){
    etat = { famille:'', marque:'', machine:'' };
    appliquer();
  });

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
