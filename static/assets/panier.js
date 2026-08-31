/* ---------------------------------------------------------------------------
   Panier de commande SODILAME
   - Stockage local uniquement (localStorage) : rien ne part sur le réseau
     tant que le client n'envoie pas son formulaire.
   - Aucun paiement, aucune donnée bancaire.
--------------------------------------------------------------------------- */
(function () {
  'use strict';

  var CLE = 'sodilame_commande_v1';

  function lire() {
    try {
      var b = localStorage.getItem(CLE);
      var l = b ? JSON.parse(b) : [];
      return Array.isArray(l) ? l : [];
    } catch (e) {
      return [];
    }
  }

  function ecrire(lignes) {
    try {
      localStorage.setItem(CLE, JSON.stringify(lignes));
    } catch (e) {
      /* navigation privée ou stockage bloqué : le panier reste en mémoire de page */
    }
    majCompteur(lignes);
  }

  function nbArticles(lignes) {
    return lignes.reduce(function (n, l) {
      return n + l.qte;
    }, 0);
  }

  function euros(n) {
    return n.toFixed(2).replace('.', ',') + ' €';
  }

  // ---- Compteur dans l'en-tête ---------------------------------------------
  function majCompteur(lignes) {
    var el = document.getElementById('panier-compte');
    if (!el) return;
    var n = nbArticles(lignes || lire());
    el.textContent = String(n);
    el.hidden = n === 0;
  }

  // ---- Boutons « Ajouter » --------------------------------------------------
  function brancherAjouts() {
    document.querySelectorAll('.ajout').forEach(function (b) {
      b.addEventListener('click', function () {
        var d = b.dataset;
        var lignes = lire();
        var existante = lignes.find(function (l) {
          return l.k === d.k;
        });
        if (existante) {
          existante.qte += 1;
        } else {
          lignes.push({
            k: d.k,
            ref: d.ref,
            nom: d.nom,
            marque: d.marque,
            cond: d.cond,
            prix: d.prix === '' ? null : parseFloat(d.prix),
            url: d.url,
            qte: 1,
          });
        }
        ecrire(lignes);
        var texte = b.innerHTML;
        b.classList.add('ok');
        b.innerHTML = 'Ajouté ✓';
        setTimeout(function () {
          b.innerHTML = texte;
          b.classList.remove('ok');
        }, 1400);
      });
    });
  }


  // ---- Prix en direct -------------------------------------------------------
  // Les pages sont statiques ; les prix, eux, sont pilotés depuis
  // l'administration. On les rafraîchit ici pour qu'une modification faite il y
  // a deux minutes soit déjà visible, sans attendre un redéploiement.
  function euros2(n) {
    return n.toFixed(2).replace('.', ',') + ' \u20ac HT';
  }

  function appliquerTarifs() {
    var boutons = document.querySelectorAll('.ajout');
    if (!boutons.length) return;
    fetch('/api/catalogue', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !Array.isArray(d.tarifs) || !d.tarifs.length) return;
        var carte = {};
        d.tarifs.forEach(function (t) { carte[t.ref + '__' + t.cond] = t; });

        boutons.forEach(function (b) {
          var t = carte[b.dataset.ref + '__' + b.dataset.cond];
          if (!t) return;
          var ligne = b.closest('.cond-row');
          var cible = ligne ? ligne.querySelector('.prix, .prix-nc') : null;

          if (t.dispo === false) {
            b.disabled = true;
            b.textContent = 'Momentan\u00e9ment indisponible';
            b.classList.add('indispo');
            if (cible) { cible.className = 'prix-nc'; cible.textContent = 'Nous consulter'; }
            return;
          }
          if (typeof t.prix === 'number') {
            b.dataset.prix = String(t.prix);
            if (cible) { cible.className = 'prix'; cible.innerHTML = '<b>' + euros2(t.prix) + '</b>'; }
          } else {
            b.dataset.prix = '';
            if (cible) { cible.className = 'prix-nc'; cible.textContent = 'Prix sur demande'; }
          }
        });

        // Un prix a pu changer depuis la mise au panier : on resynchronise.
        var l = lire();
        var modif = false;
        l.forEach(function (x) {
          var t = carte[x.ref + '__' + x.cond];
          if (!t) return;
          var np = typeof t.prix === 'number' ? t.prix : null;
          if (x.prix !== np) { x.prix = np; modif = true; }
        });
        if (modif) { ecrire(l); rendrePanier(); }
      })
      .catch(function () { /* l'affichage du build reste valable */ });
  }

  // ---- Page « ma commande » -------------------------------------------------
  function rendrePanier() {
    var corps = document.getElementById('panier-lignes');
    if (!corps) return;
    var lignes = lire();
    var vide = document.getElementById('panier-vide');
    var table = document.getElementById('panier-table');

    // La visibilité du formulaire dépend de la connexion, pas du panier :
    // c'est preparerCommande() qui en décide.
    if (!lignes.length) {
      vide.hidden = false;
      table.hidden = true;
      return;
    }
    vide.hidden = true;
    table.hidden = false;

    corps.innerHTML = lignes
      .map(function (l, i) {
        var total = typeof l.prix === 'number' ? euros(l.prix * l.qte) : '—';
        return (
          '<tr>' +
          '<td><a href="' + l.url + '"><b>' + l.nom + '</b></a>' +
          '<span class="pl-meta">' + l.marque + ' · Réf. ' + l.ref + ' · ' + l.cond + '</span></td>' +
          '<td class="num"><div class="qte"><button type="button" data-i="' + i + '" data-d="-1" aria-label="Retirer un">−</button>' +
          '<span>' + l.qte + '</span>' +
          '<button type="button" data-i="' + i + '" data-d="1" aria-label="Ajouter un">+</button></div></td>' +
          '<td class="num">' + total + '</td>' +
          '<td class="num"><button type="button" class="sup" data-sup="' + i + '" aria-label="Supprimer cette ligne">✕</button></td>' +
          '</tr>'
        );
      })
      .join('');

    corps.querySelectorAll('button[data-d]').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = lire();
        var i = parseInt(b.dataset.i, 10);
        l[i].qte = Math.max(1, l[i].qte + parseInt(b.dataset.d, 10));
        ecrire(l);
        rendrePanier();
      });
    });
    corps.querySelectorAll('button[data-sup]').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = lire();
        l.splice(parseInt(b.dataset.sup, 10), 1);
        ecrire(l);
        rendrePanier();
      });
    });

    var connus = lignes.filter(function (l) {
      return typeof l.prix === 'number';
    });
    var total = connus.reduce(function (s, l) {
      return s + l.prix * l.qte;
    }, 0);
    document.getElementById('panier-total').textContent = connus.length ? euros(total) + ' HT' : 'à confirmer';

    var note = document.getElementById('panier-note');
    if (connus.length < lignes.length) {
      note.innerHTML =
        '<b>Certaines références n’ont pas encore de tarif en ligne.</b> Nous vous confirmons le montant exact par mail avant toute livraison et toute facturation.';
    } else {
      note.textContent = 'Montant indicatif hors taxes, confirmé par nos soins avant livraison.';
    }
  }


  // ---- Qui est connecté ? ---------------------------------------------------
  function preparerCommande() {
    var f = document.getElementById('form-commande');
    var cx = document.getElementById('zone-connexion');
    if (!f || !cx) return;

    fetch('/api/moi', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.connecte && d.client) {
          f.hidden = false;
          cx.hidden = true;
          var c = d.client;
          document.getElementById('cx-client').innerHTML =
            '<b>' + c.etablissement + '</b><br>' + (c.contact ? c.contact + ' \u00b7 ' : '') + c.telephone +
            '<br><span class="cx-mail">' + c.email + '</span>';
          if (!document.getElementById('c-adresse').value) document.getElementById('c-adresse').value = c.adresse || '';
          if (!document.getElementById('c-cp').value) document.getElementById('c-cp').value = c.codePostal || '';
          if (!document.getElementById('c-commune').value) document.getElementById('c-commune').value = c.commune || '';
        } else if (d && d.connecte && d.role === 'admin') {
          cx.hidden = false;
          cx.querySelector('h2').textContent = 'Compte administrateur';
          cx.querySelector('p').textContent =
            'Vous \u00eates connect\u00e9 en tant qu\u2019administrateur : la commande en ligne est r\u00e9serv\u00e9e aux comptes clients.';
        } else {
          cx.hidden = false;
          f.hidden = true;
        }
      })
      .catch(function () { cx.hidden = false; });
  }

  // ---- Envoi de la commande -------------------------------------------------
  function brancherFormulaire() {
    var f = document.getElementById('form-commande');
    if (!f) return;
    var msg = document.getElementById('commande-msg');
    var btn = document.getElementById('btn-commande');

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var lignes = lire();
      if (!lignes.length) {
        msg.className = 'formmsg ko';
        msg.textContent = 'Votre commande est vide.';
        return;
      }
      if (!f.checkValidity()) {
        f.reportValidity();
        return;
      }

      var d = new FormData(f);
      // L'identit\u00e9 du client vient de sa session c\u00f4t\u00e9 serveur, jamais d'ici.
      var charge = {
        adresse: d.get('adresse'),
        codePostal: d.get('codePostal'),
        commune: d.get('commune'),
        message: d.get('message'),
        societe_web: d.get('societe_web'),
        lignes: lignes.map(function (l) {
          return { ref: l.ref, cond: l.cond, qte: l.qte };
        }),
      };

      btn.disabled = true;
      msg.className = 'formmsg';
      msg.textContent = 'Envoi en cours…';

      fetch('/api/commande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(charge),
      })
        .then(function (r) {
          return r.json().then(function (j) {
            return { ok: r.ok, j: j };
          });
        })
        .then(function (res) {
          if (res.ok && res.j.ok) {
            try {
              localStorage.removeItem(CLE);
            } catch (e) {}
            majCompteur([]);
            f.hidden = true;
            document.getElementById('panier-table').hidden = true;
            var v = document.getElementById('panier-vide');
            v.hidden = false;
            v.innerHTML =
              '<p><b>Commande envoyée.</b></p><p>Nous vous confirmons par mail le montant exact et la date de passage d’un technicien. Un accusé de réception vient de vous être adressé.</p><a class="btn btn-primary" href="/produits">Retour au catalogue</a>';
            v.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else if (res.j && res.j.connexion) {
            // Session expirée : on renvoie vers la connexion, panier conservé.
            window.location.href = res.j.connexion;
          } else {
            msg.className = 'formmsg ko';
            msg.textContent = res.j.erreur || 'Envoi impossible. Merci d’appeler le 04 90 93 98 88.';
            btn.disabled = false;
          }
        })
        .catch(function () {
          msg.className = 'formmsg ko';
          msg.textContent = 'Envoi impossible. Merci d’appeler le 04 90 93 98 88.';
          btn.disabled = false;
        });
    });
  }

  majCompteur();
  brancherAjouts();
  rendrePanier();
  preparerCommande();
  brancherFormulaire();
  appliquerTarifs();
})();
