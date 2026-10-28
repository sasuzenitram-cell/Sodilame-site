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
      return Array.isArray(l) ? synchroForfaits(l) : [];
    } catch (e) {
      return [];
    }
  }

  function ecrire(lignes) {
    lignes = synchroForfaits(lignes);
    try {
      localStorage.setItem(CLE, JSON.stringify(lignes));
    } catch (e) {
      /* navigation privée ou stockage bloqué : le panier reste en mémoire de page */
    }
    majCompteur(lignes);
    return lignes;
  }

  // ---- Forfaits d'installation liés aux machines ---------------------------
  // Une machine porte `forfait` ({ ref, nom, cond, prix }). Sa ligne de forfait
  // porte `pour` = la clé de la ligne machine. Règles, appliquées à CHAQUE
  // lecture et CHAQUE écriture du panier :
  //   — le forfait existe dès que sa machine est au panier, placé juste après ;
  //   — il a toujours la quantité de sa machine ;
  //   — il disparaît avec elle : un forfait orphelin est supprimé.
  // Le client ne peut donc ni le retirer, ni le commander seul. Le serveur
  // applique la même règle de son côté, sans se fier à ce panier.
  function synchroForfaits(lignes) {
    var res = [];
    lignes.forEach(function (l) {
      if (!l || l.pour) return; // les forfaits sont recréés derrière leur machine
      res.push(l);
      if (l.forfait && l.forfait.ref) {
        var f = lignes.find(function (x) { return x && x.pour === l.k; }) || {
          k: l.k + '-forfait',
          pour: l.k,
          ref: l.forfait.ref,
          nom: l.forfait.nom,
          marque: 'SODILAME',
          cond: l.forfait.cond,
          prix: typeof l.forfait.prix === 'number' ? l.forfait.prix : null,
          url: l.url,
        };
        f.qte = l.qte;
        res.push(f);
      }
    });
    return res;
  }

  // Le compteur de l'en-tête compte des articles, pas des lignes de service.
  function nbArticles(lignes) {
    return lignes.reduce(function (n, l) {
      return l.pour ? n : n + l.qte;
    }, 0);
  }

  // 3 768,00 € : espace fine insécable entre les milliers.
  function euros(n) {
    var p = n.toFixed(2).split('.');
    return p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f') + ',' + p[1] + '\u00a0€';
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
        var forfait = d.forfaitRef
          ? {
              ref: d.forfaitRef,
              nom: d.forfaitNom,
              cond: d.forfaitCond,
              prix: d.forfaitPrix === '' || d.forfaitPrix === undefined ? null : parseFloat(d.forfaitPrix),
            }
          : null;
        if (existante) {
          existante.qte += 1;
          if (forfait && !existante.forfait) existante.forfait = forfait;
        } else {
          var ligne = {
            k: d.k,
            ref: d.ref,
            nom: d.nom,
            marque: d.marque,
            cond: d.cond,
            prix: d.prix === '' ? null : parseFloat(d.prix),
            url: d.url,
            qte: 1,
          };
          if (forfait) ligne.forfait = forfait;
          lignes.push(ligne);
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
    return euros(n) + ' HT';
  }

  // Une référence est HORS CATALOGUE quand la base connaît ses conditionnements
  // et qu'aucun n'est coché « en vente ». Deux précautions dans cette règle :
  //   — il faut que la base ait des lignes pour cette référence. Un produit
  //     jamais saisi dans l'administration reste visible : l'absence de saisie
  //     n'est pas une décision de retrait ;
  //   — si l'appel échoue ou revient vide, on ne masque rien. Un incident de
  //     base doit laisser la boutique telle quelle, pas la vider.
  function horsCatalogue(tarifs) {
    var total = {}, fermes = {};
    tarifs.forEach(function (t) {
      total[t.ref] = (total[t.ref] || 0) + 1;
      if (t.dispo === false) fermes[t.ref] = (fermes[t.ref] || 0) + 1;
    });
    return Object.keys(fermes).filter(function (ref) { return fermes[ref] === total[ref]; });
  }

  function masquerProduits(refs) {
    if (!refs.length) return;
    var dedans = {};
    refs.forEach(function (r) { dedans[r] = true; });

    // Les cartes produit, partout où elles apparaissent : catalogue, blocs
    // « autres références de la même famille », mises en avant de l'accueil.
    Array.prototype.forEach.call(document.querySelectorAll('[data-produit][data-ref]'), function (c) {
      if (dedans[c.dataset.ref]) c.dataset.horsCatalogue = '1';
    });
    // Le catalogue tient lui-même le compteur et l'état des filtres : on lui
    // demande de recalculer plutôt que de masquer les cartes dans son dos, sinon
    // son prochain passage les rendrait de nouveau visibles.
    if (window.sodilameCatalogue) window.sodilameCatalogue.recalculer();
    else {
      Array.prototype.forEach.call(document.querySelectorAll('[data-hors-catalogue="1"]'), function (c) {
        c.hidden = true;
      });
    }

    // Sur la fiche du produit lui-même : le bloc de commande laisse la place à
    // un renvoi vers la boutique, et la page demande à ne plus être indexée.
    // Google exécute le JavaScript et respecte un noindex injecté ainsi ; le
    // retrait est simplement moins immédiat qu'au prochain déploiement.
    var fiche = document.querySelector('[data-fiche-ref]');
    if (fiche && dedans[fiche.dataset.ficheRef]) {
      var achat = fiche.querySelector('.achat:not(.retrait-vente)');
      var retrait = fiche.querySelector('.retrait-vente');
      if (achat) achat.hidden = true;
      if (retrait) retrait.hidden = false;
      // On réécrit la balise existante au lieu d'en ajouter une seconde :
      // Google retient bien la directive la plus restrictive, mais deux balises
      // robots contradictoires sur la même page se signalent dans Search
      // Console et font perdre du temps à qui les lit.
      var m = document.querySelector('meta[name="robots"]') || document.head.appendChild(document.createElement('meta'));
      m.name = 'robots';
      m.content = 'noindex,follow';
    }
  }

  function appliquerTarifs() {
    var boutons = document.querySelectorAll('.ajout');
    var cartes = document.querySelectorAll('[data-produit][data-ref]');
    var fiche = document.querySelector('[data-fiche-ref]');
    if (!boutons.length && !cartes.length && !fiche) return;
    fetch('/api/catalogue', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !Array.isArray(d.tarifs) || !d.tarifs.length) return;
        var carte = {};
        d.tarifs.forEach(function (t) { carte[t.ref + '__' + t.cond] = t; });

        masquerProduits(horsCatalogue(d.tarifs));

        majNotices(carte);

        boutons.forEach(function (b) {
          var t = carte[b.dataset.ref + '__' + b.dataset.cond];
          if (!t) return;
          var ligne = b.closest('.cond-row');
          var cible = ligne ? ligne.querySelector('.prix, .prix-nc') : null;

          // \u00ab En vente \u00bb d\u00e9coch\u00e9 dans l'administration : la ligne quitte le bloc
          // de commande. Quand c'est le seul conditionnement, masquerProduits()
          // a d\u00e9j\u00e0 retir\u00e9 le produit entier \u2014 on ne laisse donc jamais un bloc
          // \u00ab Commander \u00bb vide derri\u00e8re nous.
          if (t.dispo === false) {
            if (ligne) ligne.hidden = true;
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

        // Forfaits : le prix affiché sous la machine, et celui que le bouton
        // transmettra au panier. Un forfait n'est jamais « hors vente » : une
        // machine ne part pas sans installation.
        document.querySelectorAll('[data-forfait-de]').forEach(function (r) {
          var t = carte[r.dataset.forfaitDe + '__Forfait'];
          if (!t) return;
          var cible = r.querySelector('.prix, .prix-nc');
          if (!cible) return;
          if (typeof t.prix === 'number') { cible.className = 'prix'; cible.innerHTML = '<b>' + euros2(t.prix) + '</b>'; }
          else { cible.className = 'prix-nc'; cible.textContent = 'Prix sur demande'; }
        });
        boutons.forEach(function (b) {
          if (!b.dataset.forfaitRef) return;
          var t = carte[b.dataset.forfaitRef + '__' + b.dataset.forfaitCond];
          if (t) b.dataset.forfaitPrix = typeof t.prix === 'number' ? String(t.prix) : '';
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

  // ---- Bandeau d'explication des prix ----------------------------------------
  // Le build livre la liste des articles sans prix dans son fichier catalogue.
  // Un article cesse d'être « sur demande » dès que l'administration lui donne
  // un prix. Le bandeau disparaît quand il n'en reste plus aucun ; tant qu'il
  // en reste, il passe au texte du catalogue mixte. Il ne disparaît JAMAIS
  // simplement parce qu'un premier prix est arrivé.
  var NOTICE_MIXTE = '<b>Tous les tarifs ne sont pas encore en ligne.</b> Les articles affich\u00e9s \u00ab\u00a0Prix sur demande\u00a0\u00bb se commandent exactement comme les autres\u00a0: nous vous confirmons le montant par retour de mail, avant toute exp\u00e9dition et avant toute facturation.';
  function majNotices(carte) {
    document.querySelectorAll('.notice-prix[data-sans-prix]').forEach(function (n) {
      var liste;
      try { liste = JSON.parse(n.dataset.sansPrix); } catch (e) { return; }
      if (!Array.isArray(liste)) return;
      var total = parseInt(n.dataset.total, 10) || 0;
      var reste = liste.filter(function (cle) {
        var t = carte[cle];
        if (t && t.dispo === false) return false; // retiré de la vente : n'est plus affiché
        return !(t && typeof t.prix === 'number');
      });
      if (!reste.length) n.remove();
      else if (reste.length < total) n.innerHTML = NOTICE_MIXTE;
    });
  }

  // ---- Page « panier » -------------------------------------------------------
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
        if (l.pour) {
          // Ligne de forfait : ni +/−, ni suppression. Elle suit sa machine.
          return (
            '<tr class="ligne-forfait">' +
            '<td><b>' + l.nom + '</b>' +
            '<span class="pl-meta">Indissociable de la machine \u00b7 suit sa quantit\u00e9</span></td>' +
            '<td class="num"><span class="qte-fixe">' + l.qte + '</span></td>' +
            '<td class="num">' + total + '</td>' +
            '<td class="num"></td>' +
            '</tr>'
          );
        }
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

    var nm = document.getElementById('note-machines');
    if (nm) nm.hidden = !lignes.some(function (l) { return l.pour; });

    var note = document.getElementById('panier-note');
    if (connus.length < lignes.length) {
      note.innerHTML =
        '<b>Certaines références n’ont pas encore de tarif en ligne.</b> Nous vous confirmons le montant exact par mail avant toute livraison et toute facturation.';
    } else {
      note.textContent = 'Montant indicatif hors taxes, confirmé par nos soins avant livraison.';
    }
  }


  // ---- Qui est connecté ? ---------------------------------------------------
  // La commande est ouverte à tous. Un client connecté voit simplement ses
  // coordonnées reprises de sa fiche au lieu d'avoir à les ressaisir.
  function preparerCommande() {
    var f = document.getElementById('form-commande');
    if (!f) return;
    var ident = document.getElementById('zone-identite');
    var bloc = document.getElementById('cx-client');

    fetch('/api/moi', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !d.connecte || !d.client) return; // visiteur : formulaire complet
        var c = d.client;

        // Coordonnées connues : on masque la saisie et on retire l'obligation.
        ident.hidden = true;
        ident.querySelectorAll('input').forEach(function (i) { i.required = false; i.disabled = true; });
        var cons = document.getElementById('c-consent');
        if (cons) { cons.hidden = true; cons.querySelector('input').required = false; }
        var hf = document.getElementById('hint-fiche');
        if (hf) hf.hidden = false;

        bloc.hidden = false;
        bloc.innerHTML =
          '<b>' + c.etablissement + '</b><br>' + (c.contact ? c.contact + ' \u00b7 ' : '') + c.telephone +
          '<br><span class="cx-mail">' + c.email + '</span>';

        if (!document.getElementById('c-adresse').value) document.getElementById('c-adresse').value = c.adresse || '';
        if (!document.getElementById('c-cp').value) document.getElementById('c-cp').value = c.codePostal || '';
        if (!document.getElementById('c-commune').value) document.getElementById('c-commune').value = c.commune || '';
      })
      .catch(function () { /* visiteur : le formulaire complet reste affiché */ });
  }

  // ---- Envoi de la commande -------------------------------------------------
  function brancherFormulaire() {
    var f = document.getElementById('form-commande');
    if (!f) return;
    var msg = document.getElementById('commande-msg');
    var btn = document.getElementById('btn-commande');

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var lignes = lire().filter(function (l) { return !l.pour; });
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
      // Un client connect\u00e9 est identifi\u00e9 par sa session : les champs d'identit\u00e9
      // sont alors d\u00e9sactiv\u00e9s et le serveur ignore ce qui arrive d'ici.
      var charge = {
        etablissement: d.get('etablissement'),
        nom: d.get('nom'),
        telephone: d.get('telephone'),
        email: d.get('email'),
        adresse: d.get('adresse'),
        codePostal: d.get('codePostal'),
        commune: d.get('commune'),
        message: d.get('message'),
        consentement: !!d.get('consentement'),
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
              '<p><b>Commande envoyée.</b></p><p>Nous vous confirmons par mail le montant exact et la suite de votre commande. Un accusé de réception vient de vous être adressé.</p><a class="btn btn-primary" href="/eshop">Retour à la boutique</a>';
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
