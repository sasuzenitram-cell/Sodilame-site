/* Envoi du formulaire de devis sans rechargement de page.
 *
 * ANTI-SPAM — pourquoi ce fichier demande un jeton
 * Le robot qui a envoyé 400 messages le 28/09/2026 n'exécutait pas ce script :
 * il postait le JSON directement sur /api/contact. Le serveur exige maintenant
 * un jeton signé qu'il ne délivre que sur demande. Aller le chercher, c'est
 * exactement ce qu'un navigateur fait sans effort et ce qu'un script de spam ne
 * fait pas.
 *
 * Toute la mécanique doit rester invisible pour le visiteur : le jeton est
 * demandé dès la première frappe, et les deux refus « techniques » (envoi trop
 * rapide, jeton périmé) sont rejoués automatiquement. L'utilisateur ne voit un
 * message d'erreur que s'il y a une vraie raison.
 */
(function () {
  var f = document.getElementById('form-devis');
  if (!f) return;
  var msg = document.getElementById('form-msg');
  var btn = f.querySelector('button[type="submit"]');
  var libelle = btn ? btn.textContent : '';
  var TEL = '04 90 93 98 88';

  // Pré-remplissage depuis l'URL : /contact?sujet=audit&ville=Arles
  try {
    var p = new URLSearchParams(location.search);
    var v = p.get('ville');
    if (v && f.ville) f.ville.value = v;
    var s = p.get('sujet');
    if (s && f.sujet) {
      var map = {
        audit: "Contrat d'entretien / audit gratuit",
        contrat: "Contrat d'entretien / audit gratuit",
        depannage: 'Dépannage — froid',
        froid: 'Dépannage — froid',
        projet: 'Projet de cuisine complète',
        materiel: "Achat / remplacement d'un équipement",
      };
      var cible = map[s] || s;
      for (var i = 0; i < f.sujet.options.length; i++) {
        if (f.sujet.options[i].text === cible) { f.sujet.selectedIndex = i; break; }
      }
    }
  } catch (e) {}

  // ---- Jeton --------------------------------------------------------------
  // Demandé à la première interaction, pas au chargement : le formulaire est
  // présent au bas de presque toutes les pages, et la plupart des visiteurs ne
  // le remplissent pas. Inutile d'appeler l'API à chaque visite.
  var jeton = null;
  var enCours = null;

  function demanderJeton() {
    if (jeton) return Promise.resolve(jeton);
    if (enCours) return enCours;
    enCours = fetch('/api/contact', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (j) { enCours = null; jeton = (j && j.jeton) || null; return jeton; })
      .catch(function () { enCours = null; return null; });
    return enCours;
  }

  ['focusin', 'input', 'change'].forEach(function (ev) {
    f.addEventListener(ev, function () { demanderJeton(); }, { once: true });
  });

  function afficher(texte, ok) {
    if (!msg) return;
    msg.className = 'formmsg ' + (ok ? 'ok' : 'ko');
    msg.textContent = texte;
  }

  function patienter(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  var ECHEC = "L'envoi a échoué. Merci d'appeler le " + TEL + " ou d'écrire à contact@sodilame.com.";

  function envoyer(essai) {
    return demanderJeton().then(function (jt) {
      var data = {};
      new FormData(f).forEach(function (val, cle) { data[cle] = val; });
      data.page = location.pathname;
      data.jeton = jt || '';

      return fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (r) {
          return r.json()
            .catch(function () { return {}; })
            .then(function (j) { return { ok: r.ok, j: j || {} }; });
        })
        .then(function (res) {
          if (res.ok) {
            jeton = null; // à usage unique : le prochain envoi en redemandera un
            f.reset();
            afficher(
              'Merci, votre demande est bien partie. Nous revenons vers vous sous 24 heures ouvrées. Pour une urgence, appelez le ' + TEL + '.',
              true
            );
            return;
          }

          var code = res.j.code;

          // Envoi plus rapide que le délai minimum : on attend le reste et on
          // renvoie le même jeton. Le visiteur ne voit rien.
          if (code === 'trop_vite' && essai < 2) {
            return patienter(Math.min(res.j.attendreMs || 1500, 3000)).then(function () {
              return envoyer(essai + 1);
            });
          }

          // Jeton périmé (page laissée ouverte) ou déjà consommé : on en
          // reprend un et on renvoie, une seule fois.
          if ((code === 'jeton_expire' || code === 'jeton_invalide' || code === 'jeton_deja_utilise') && essai < 2) {
            jeton = null;
            return envoyer(essai + 1);
          }

          afficher(res.j.erreur || ECHEC, false);
        });
    });
  }

  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours…'; }
    if (msg) msg.className = 'formmsg';

    envoyer(1)
      .catch(function () { afficher(ECHEC, false); })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = libelle; }
      });
  });
})();
