/* Formulaire de candidature — envoi du CV sans rechargement de page.
 *
 * Deux contraintes ont dicté ce script.
 *
 * 1. LE CANDIDAT POSTULE SOUVENT DEPUIS SON TÉLÉPHONE, parfois depuis un
 *    chantier ou une pause. Il n'a pas toujours un CV à jour. Le fichier est
 *    donc FACULTATIF, et le formulaire part sans lui — c'est le numéro de
 *    téléphone qui compte. Un formulaire qui exige un PDF perd exactement les
 *    candidats que ce poste vise.
 *
 * 2. UNE PHOTO DE CV PRISE AU TÉLÉPHONE PÈSE 4 À 8 Mo, au-delà de ce que la
 *    fonction serverless accepte. Les images sont donc recompressées DANS LE
 *    NAVIGATEUR (1800 px de côté, JPEG qualité 0,78) : la feuille reste
 *    parfaitement lisible et l'envoi passe en 4G. Les PDF et les fichiers Word
 *    partent tels quels — on ne touche pas à un document que le candidat a mis
 *    en forme.
 *
 * L'anti-spam suit la même mécanique que /api/contact : jeton demandé à la
 * première frappe, rejeu automatique sur « trop vite » et sur jeton périmé.
 * Voir lib/antispam.mjs.
 */
(function () {
  var f = document.getElementById('form-candidature');
  if (!f) return;

  var msg = document.getElementById('candidature-msg');
  var btn = document.getElementById('btn-candidature');
  var libelle = btn ? btn.textContent : '';
  var champ = document.getElementById('k-cv');
  var etat = document.getElementById('k-cv-etat');
  var TEL = '04 90 93 98 88';
  var POIDS_MAX = 4000000;

  var CV = null; // { nom, type, data }

  // ---- Jeton --------------------------------------------------------------
  var jeton = null;
  var enCours = null;
  function demanderJeton() {
    if (jeton) return Promise.resolve(jeton);
    if (enCours) return enCours;
    enCours = fetch('/api/candidature', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (j) { enCours = null; jeton = (j && j.jeton) || null; return jeton; })
      .catch(function () { enCours = null; return null; });
    return enCours;
  }
  ['focusin', 'input', 'change'].forEach(function (ev) {
    f.addEventListener(ev, function () { demanderJeton(); }, { once: true });
  });

  function dire(texte, classe) {
    if (!etat) return;
    etat.hidden = !texte;
    etat.textContent = texte || '';
    etat.className = 'cv-etat' + (classe ? ' ' + classe : '');
  }

  function afficher(texte, ok) {
    if (!msg) return;
    msg.className = 'formmsg ' + (ok ? 'ok' : 'ko');
    msg.textContent = texte;
  }

  function lire(fichier) {
    return new Promise(function (resoudre, rejeter) {
      var l = new FileReader();
      l.onload = function () { resoudre(l.result); };
      l.onerror = rejeter;
      l.readAsDataURL(fichier);
    });
  }

  // Recompression d'une image. En cas d'échec (format exotique, HEIC que le
  // navigateur ne sait pas décoder), on retombe sur le fichier d'origine
  // plutôt que de refuser la candidature.
  function compresser(fichier) {
    return new Promise(function (resoudre) {
      var url = URL.createObjectURL(fichier);
      var img = new Image();
      img.onload = function () {
        try {
          var max = 1800;
          var e = Math.min(1, max / Math.max(img.width, img.height));
          var c = document.createElement('canvas');
          c.width = Math.round(img.width * e);
          c.height = Math.round(img.height * e);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          var data = c.toDataURL('image/jpeg', 0.78);
          URL.revokeObjectURL(url);
          resoudre({ data: data, poids: Math.round(data.length * 0.75) });
        } catch (e) {
          URL.revokeObjectURL(url);
          resoudre(null);
        }
      };
      img.onerror = function () { URL.revokeObjectURL(url); resoudre(null); };
      img.src = url;
    });
  }

  if (champ) {
    champ.addEventListener('change', function () {
      var fichier = champ.files && champ.files[0];
      CV = null;
      if (!fichier) { dire('', ''); return; }

      dire('Préparation du fichier…', '');
      var estImage = /^image\//.test(fichier.type);
      var prepare = estImage ? compresser(fichier) : Promise.resolve(null);

      prepare
        .then(function (compresse) {
          if (compresse && compresse.poids <= POIDS_MAX) {
            CV = {
              nom: (fichier.name || 'cv').replace(/\.[^.]+$/, '') + '.jpg',
              type: 'image/jpeg',
              data: compresse.data,
            };
            return Math.round(compresse.poids / 1024);
          }
          if (fichier.size > POIDS_MAX) return -1;
          return lire(fichier).then(function (data) {
            CV = { nom: fichier.name || 'cv', type: fichier.type, data: data };
            return Math.round(fichier.size / 1024);
          });
        })
        .then(function (ko) {
          if (ko === -1) {
            champ.value = '';
            dire(
              'Ce fichier dépasse 4 Mo. Envoyez-le par e-mail, ou postulez sans CV : nous vous rappellerons.',
              'ko'
            );
            return;
          }
          dire(CV.nom + ' — ' + ko + ' Ko, prêt à être envoyé', 'ok');
        })
        .catch(function () {
          champ.value = '';
          dire("Ce fichier n'a pas pu être lu. Postulez sans CV, nous vous rappellerons.", 'ko');
        });
    });
  }

  function patienter(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  var ECHEC = "L'envoi a échoué. Merci d'appeler le " + TEL + '.';

  function envoyer(essai) {
    return demanderJeton().then(function (jt) {
      var data = {};
      new FormData(f).forEach(function (val, cle) {
        if (cle !== 'cv') data[cle] = val;
      });
      data.jeton = jt || '';
      if (CV) data.fichiers = [CV];

      return fetch('/api/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; })
            .then(function (j) { return { ok: r.ok && j && j.ok, j: j || {} }; });
        })
        .then(function (res) {
          if (res.ok) {
            jeton = null;
            CV = null;
            f.reset();
            dire('', '');
            afficher(
              'Merci, votre candidature est bien partie. Elle est lue par la direction, et nous revenons vers vous. Pour en parler de vive voix, appelez le ' + TEL + '.',
              true
            );
            if (msg.scrollIntoView) msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }

          var code = res.j.code;
          if (code === 'trop_vite' && essai < 2) {
            return patienter(Math.min(res.j.attendreMs || 1500, 3000)).then(function () {
              return envoyer(essai + 1);
            });
          }
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
    if (btn) { btn.disabled = true; btn.textContent = CV ? 'Envoi du CV…' : 'Envoi en cours…'; }
    if (msg) msg.className = 'formmsg';

    envoyer(1)
      .catch(function () { afficher(ECHEC, false); })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = libelle; }
      });
  });
})();
