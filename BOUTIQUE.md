# Boutique en ligne, comptes clients et administration

Ce document explique comment mettre en service la partie « compte » du site :
base de données, administration, invitations clients.

---

## 1. Brancher la base de données (une seule fois, ~3 minutes)

L'administration et les comptes clients ont besoin d'une base Postgres.

1. Vercel → ton projet **sodilame-site** → onglet **Storage**
2. **Create Database** → **Neon** (Serverless Postgres) dans le Marketplace
3. Plan **Free**, région **Europe (Frankfurt)** ou **Paris** si proposée
4. **Connect to Project** → sélectionne `sodilame-site`, tous les environnements

Vercel injecte alors tout seul la variable `DATABASE_URL`. Tu n'as rien à copier.

> **Les tables se créent toutes seules** au premier accès à `/admin`. Aucune
> commande SQL à taper.

---

## 2. Ajouter deux variables d'environnement

Vercel → **Settings → Environment Variables**, les trois environnements cochés :

| Nom | Valeur |
|---|---|
| `SESSION_SECRET` | une longue chaîne aléatoire, 40 caractères minimum |
| `ADMINS` | `sodilame@sodilame.fr` (et l'adresse de Romain, séparée par une virgule) |

Pour générer `SESSION_SECRET`, n'importe quelle suite de caractères au hasard
convient — tape sur ton clavier, mélange lettres, chiffres et tirets. **Ne la
partage pas** : elle sert à signer les sessions. La changer déconnecte tout le
monde, sans autre conséquence.

`ADMINS` détermine qui a accès à `/admin`. Uniquement ces adresses. Ajouter un
administrateur, c'est ajouter son e-mail ici et redéployer.

Puis **Deployments → … → Redeploy**.

---

## 3. Se connecter

Va sur **www.sodilame.com/admin**. Tu es redirigé vers la page de connexion.
Saisis `sodilame@sodilame.fr`, tu reçois un lien par e-mail, tu cliques, tu es
dans l'administration.

**Il n'y a pas de mot de passe.** C'est volontaire : aucun mot de passe à
retenir, à réinitialiser, ni à se faire voler. Le lien est valable 30 minutes et
ne sert qu'une fois ; la session, elle, dure 30 jours.

---

## 4. Importer les clients depuis Dolibarr

**Admin → Clients → Importer depuis Dolibarr.**

Dans Dolibarr : **Outils → Exports → Tiers**, coche au minimum l'e-mail et le
nom ou la société, ajoute si tu les as la référence, le contact, le téléphone,
l'adresse, le code postal et la ville. Exporte en CSV, ouvre le fichier,
sélectionne tout, copie, colle dans le formulaire.

- Les séparateurs `;`, `,` et tabulation sont reconnus automatiquement.
- La première ligne doit être l'en-tête : c'est elle qui identifie les colonnes.
- Un e-mail déjà présent met la fiche à jour, il ne crée pas de doublon.
- Les lignes sans e-mail valide sont ignorées et signalées.

**L'import n'envoie rien aux clients.** Il crée les fiches, c'est tout.

---

## 5. Inviter un client

Ouvre sa fiche → **Envoyer l'invitation**.

Il reçoit un e-mail qui explique la livraison offerte dès un bidon, l'absence de
paiement en ligne, et la connexion sans mot de passe. Ses coordonnées étant déjà
enregistrées, il n'a rien à ressaisir : son adresse de livraison est
pré-remplie au moment de commander.

Tu peux relancer une invitation autant de fois que nécessaire. La fiche indique
si le client a été invité et s'il s'est déjà connecté.

---

## 6. Renseigner les prix

**Admin → Produits & prix.** Une ligne par conditionnement.

- Un prix vide affiche « Prix sur demande » et n'empêche pas de commander.
- Décocher **En vente** rend la référence non commandable, sans supprimer la
  fiche produit ni son référencement.
- La virgule et le point décimaux sont acceptés indifféremment.

Les modifications sont **visibles immédiatement** sur le site : les pages
produits lisent les prix en direct via `/api/catalogue`. Aucun redéploiement.

---

## 7. Traiter une commande

**Admin → Commandes.** Six statuts : Reçue → Validée → Préparée → Livrée →
Facturée, plus Annulée.

Sur la fiche d'une commande tu peux changer le statut et, si tu coches la case,
prévenir le client par e-mail. Seuls **Validée**, **Préparée** et **Livrée**
déclenchent un e-mail — inutile de prévenir quelqu'un qu'on vient de le
facturer, il le verra bien.

La **note interne** n'est jamais envoyée au client.

---

## Ce qui est verrouillé, et pourquoi

| Règle | Raison |
|---|---|
| Les prix sont recalculés côté serveur | Un client ne peut pas se fabriquer un tarif dans son navigateur |
| Les références sont validées contre le catalogue | Aucune ligne inventée ne peut entrer en base |
| L'identité vient de la session, jamais du formulaire | Personne ne peut commander au nom d'un autre |
| La commune est vérifiée contre les 104 communes | La livraison offerte reste tenable |
| Un e-mail inconnu reçoit la même réponse qu'un client | Le formulaire ne permet pas de deviner qui est client |
| Les pages `/admin` et `/espace` sont en `noindex` | Elles ne doivent jamais apparaître dans Google |

---

## Réversibilité

Tout reste transportable :

- Le code est à toi, sans dépendance à une plateforme.
- La base est du **Postgres standard**. Un `pg_dump` exporte l'intégralité des
  clients, commandes et tarifs dans un fichier SQL réutilisable partout.
- Aucune donnée n'est enfermée dans un format propriétaire.

Si tu quittes Vercel et Neon un jour, tu emportes le dépôt et le dump. C'est
tout ce qu'il faut.

---

## Tests

La suite de tests couvre le contrôle d'accès, l'import, les invitations, la
commande, la falsification de prix, l'isolation entre clients et le cycle de
statuts.

```bash
# nécessite un Postgres local
DB_DRIVER=pg DATABASE_URL=postgresql://… node tests/e2e.mjs
```

66 tests, à garder au vert avant chaque mise en ligne.
