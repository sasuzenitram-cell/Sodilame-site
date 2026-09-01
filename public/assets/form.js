/* Envoi du formulaire de devis sans rechargement de page. */
(function () {
  var f = document.getElementById('form-devis');
  if (!f) return;
  var msg = document.getElementById('form-msg');
  var btn = f.querySelector('button[type="submit"]');
  var libelle = btn ? btn.textContent : '';

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

  function afficher(texte, ok) {
    if (!msg) return;
    msg.className = 'formmsg ' + (ok ? 'ok' : 'ko');
    msg.textContent = texte;
  }

  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours…'; }
    if (msg) msg.className = 'formmsg';

    var data = {};
    new FormData(f).forEach(function (val, cle) { data[cle] = val; });
    data.page = location.pathname;

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok) {
          f.reset();
          afficher('Merci, votre demande est bien partie. Nous revenons vers vous sous 24 heures ouvrées. Pour une urgence, appelez le 04 90 93 98 88.', true);
        } else {
          afficher((res.j && res.j.erreur) || "L'envoi a échoué. Merci d'appeler le 04 90 93 98 88 ou d'écrire à contact@sodilame.com.", false);
        }
      })
      .catch(function () {
        afficher("L'envoi a échoué. Merci d'appeler le 04 90 93 98 88 ou d'écrire à contact@sodilame.com.", false);
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = libelle; }
      });
  });
})();
