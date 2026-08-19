# Site sodilame.com

Site vitrine de **SODILAME** — cuisines professionnelles, Saint-Martin-de-Crau (13310).

Site **100 % statique** (HTML/CSS/JS), généré par un script Node sans aucune dépendance
externe, hébergé sur **Vercel**. Aucun abonnement logiciel, aucun prestataire propriétaire :
le code de ce dépôt est la totalité du site.

---

## 1. Mise en ligne sur Vercel — la première fois

### Étape 1 — Mettre le code sur GitHub

1. Créez un dépôt **privé** sur [github.com/new](https://github.com/new), nommé `sodilame-site`.
   Ne cochez rien (pas de README, pas de .gitignore) — ils sont déjà là.
2. Depuis ce dossier, en ligne de commande :

```bash
git remote add origin https://github.com/VOTRE-COMPTE/sodilame-site.git
git branch -M main
git push -u origin main
```

### Étape 2 — Connecter Vercel

1. Créez un compte sur [vercel.com](https://vercel.com) avec « Continue with GitHub ».
2. **Add New… → Project**, choisissez le dépôt `sodilame-site`, puis **Import**.
3. Vercel lit automatiquement `vercel.json`. Ne changez rien :
   - Framework Preset : `Other`
   - Build Command : `node build.mjs`
   - Output Directory : `public`
4. **Deploy**. Au bout d'une minute, le site est en ligne sur une adresse
   `sodilame-site-xxxx.vercel.app`.

### Étape 3 — Brancher le domaine sodilame.com

1. Dans Vercel : **Settings → Domains → Add**, saisissez `sodilame.com`.
2. Vercel propose d'ajouter aussi `www.sodilame.com` : acceptez.
3. Vercel affiche alors une **« domain card »** avec les valeurs DNS exactes à créer.

   > ⚠️ **Recopiez les valeurs affichées par Vercel, ne reprenez aucune valeur trouvée
   > dans un tutoriel.** L'IP de l'enregistrement A et la cible du CNAME sont désormais
   > **propres à chaque projet** (par exemple `216.198.79.1` et
   > `d1d4fc829fe7bc7c.vercel-dns-017.com`). Une valeur générique récupérée ailleurs
   > fera échouer la vérification.

   Chez le registrar où vous avez acheté le domaine, créez :
   - un enregistrement **A** sur `@` → l'adresse IP affichée par Vercel ;
   - un enregistrement **CNAME** sur `www` → la valeur affichée par Vercel.
4. Choisissez `www.sodilame.com` comme domaine principal (Vercel redirigera
   `sodilame.com` → `www.sodilame.com`). Le certificat HTTPS est émis automatiquement.

> La propagation DNS prend de quelques minutes à quelques heures.

### Étape 4 — Activer le formulaire de contact

Le formulaire passe par une fonction serverless (`api/contact.js`) qui envoie les demandes
par e-mail via **Resend**.

1. Créez un compte gratuit sur [resend.com](https://resend.com) (3 000 e-mails/mois offerts).
2. **Domains → Add Domain** : ajoutez `sodilame.com` et créez chez votre registrar les
   enregistrements DNS que Resend indique (SPF, DKIM). C'est ce qui évite que vos e-mails
   partent en spam.
3. **API Keys → Create API Key**, copiez la clé (elle commence par `re_`).
4. Dans Vercel : **Settings → Environment Variables**, ajoutez ces trois variables pour
   les environnements *Production*, *Preview* et *Development* :

| Nom | Valeur |
|---|---|
| `RESEND_API_KEY` | la clé copiée à l'étape 3 |
| `MAIL_DESTINATION` | l'adresse qui doit recevoir les demandes, ex. `contact@sodilame.com` |
| `MAIL_EXPEDITEUR` | `SODILAME <site@sodilame.com>` (domaine vérifié à l'étape 2) |

5. **Redéployez** (Deployments → … → Redeploy) pour que les variables soient prises en compte.
6. Testez en envoyant une vraie demande depuis `/contact`.

> Tant que `RESEND_API_KEY` n'est pas définie, le formulaire affiche un message d'erreur
> invitant à téléphoner. Le reste du site fonctionne normalement.

---

## 2. Modifier le site au quotidien

Tout le contenu est dans le dossier `data/`. On modifie un fichier, on pousse sur GitHub,
et Vercel redéploie tout seul en une minute.

| Ce que vous voulez changer | Fichier à ouvrir |
|---|---|
| Téléphone, adresse, horaires, e-mail, **URL de MySodilame** | `data/site.mjs` |
| Formules de contrat d'entretien | `data/site.mjs` (`formules`) |
| Menu de navigation | `data/site.mjs` (`navPrincipale`) |
| Textes des 8 pages services | `data/services.mjs` |
| Pages villes (SEO local) | `data/villes.mjs` |
| Articles de conseils | `data/articles.mjs` |
| Mise en page / couleurs | `static/assets/style.css` |
| Structure des pages | `build.mjs` et `src/layout.mjs` |

### Points à compléter dès que possible

- `data/site.mjs → legal` : **SIRET, RCS, TVA intracommunautaire, capital social**
  (obligatoires dans les mentions légales).
- `data/site.mjs → portail.url` : l'URL réelle du portail MySodilame.
- `data/site.mjs → reseaux.google` : l'URL de la fiche Google Business Profile
  (elle alimente le champ `sameAs` du balisage structuré).
- Remplacer les emplacements photo par de vraies images (voir § 4).

### Aperçu en local

```bash
npm run dev     # génère le site et le sert sur http://localhost:3000
```

Ou simplement `node build.mjs` pour régénérer le dossier `public/`.

---

## 3. Ce qui est déjà en place pour le SEO local

- **30 pages** : accueil, 8 services, 8 villes, 4 articles, à propos, contact, pages légales.
- **Balisage structuré JSON-LD** sur chaque page : `LocalBusiness` (NAP, horaires réels,
  zone desservie), `Service`, `BreadcrumbList`, `FAQPage`, `Article`. C'est ce qui alimente
  le Pack Local de Google et les résultats enrichis.
- **NAP strictement identique** au site, à la fiche Google et aux annuaires — c'est le
  premier critère de cohérence pour le référencement local.
- `sitemap.xml` et `robots.txt` générés automatiquement.
- Titres et méta-descriptions calibrés (≤ 65 et ≤ 160 caractères).
- Maillage interne systématique : services ↔ villes ↔ articles.
- URLs propres, sans `.html`, avec redirections 301 des anciennes adresses.
- Pas de JavaScript bloquant, pas de framework : le site se charge quasi instantanément,
  ce qui compte dans le classement.

### À faire après la mise en ligne

1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)) :
   ajouter la propriété `www.sodilame.com`, valider, puis soumettre
   `https://www.sodilame.com/sitemap.xml`.
2. **Fiche Google Business Profile** : mettre à jour le site web vers `sodilame.com`,
   vérifier que l'adresse, le téléphone et les horaires sont **au caractère près** ceux
   du site, ajouter des photos et les 8 services.
3. **Annuaires** : Pages Jaunes, annuaires métier de la CHR — même NAP partout.
4. **Avis clients** : demander systématiquement un avis Google après intervention. C'est,
   de loin, le levier le plus efficace sur le classement local.
5. Laisser tourner `sodilame.fr` en parallèle jusqu'à la fin du contrat, puis mettre en
   place des redirections 301 si c'est possible à ce moment-là.

---

## 4. Ajouter de vraies photos

Les emplacements photo sont marqués `[ … à intégrer ]` dans les pages. Pour les remplir :

1. Déposez les images dans `static/assets/photos/`.
2. Optimisez-les avant (largeur max 1600 px, format `.webp` ou `.jpg` de qualité 80).
3. Remplacez l'appel `photoPlaceholder(...)` correspondant dans `build.mjs` par une balise
   `<img src="/assets/photos/nom.jpg" alt="description précise" loading="lazy" width="…" height="…">`.

L'attribut `alt` doit décrire la photo pour un lecteur d'écran **et** pour Google :
« Technicien SODILAME contrôlant une chambre froide dans un restaurant d'Arles » vaut
mieux que « photo1 ».

---

## 5. Structure du dépôt

```
├── build.mjs              générateur : produit le dossier public/
├── check.mjs              contrôle : liens internes, JSON-LD, longueurs SEO
├── serve.mjs              petit serveur local pour prévisualiser
├── vercel.json            configuration Vercel (build, en-têtes, redirections)
├── api/
│   └── contact.js         fonction serverless du formulaire (Resend)
├── data/                  ← LE CONTENU EST ICI
│   ├── site.mjs           coordonnées, formules, navigation
│   ├── services.mjs       les 8 pages services
│   ├── villes.mjs         les 8 pages villes
│   └── articles.mjs       les articles de conseils
├── src/
│   └── layout.mjs         gabarit HTML commun et composants
├── static/                copié tel quel dans public/
│   ├── favicon.png
│   └── assets/            logo, style.css, form.js
└── public/                GÉNÉRÉ — ne pas modifier à la main
```

---

## 6. Contrôle qualité

```bash
node build.mjs && node check.mjs
```

`check.mjs` vérifie qu'aucun lien interne n'est cassé, que tous les blocs JSON-LD sont
valides, que chaque page a exactement un `<h1>`, et que les titres et descriptions
restent dans les longueurs affichées par Google.

---

## 7. Réversibilité

Le site n'est lié à aucun prestataire. Le dossier `public/` généré est du HTML pur :
il peut être déposé tel quel chez n'importe quel hébergeur (OVH, Netlify, Cloudflare Pages,
un simple serveur Apache). Seul le formulaire de contact devrait alors être rebranché
autrement. C'est volontaire — et c'est exactement ce qui manquait sur sodilame.fr.
