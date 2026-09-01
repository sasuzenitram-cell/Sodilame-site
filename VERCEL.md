# Variables d'environnement Vercel

Tout ce qui est secret vit ici, jamais dans le code. C'est ce qui permet de
publier le dépôt sur GitHub sans exposer quoi que ce soit.

Chemin : **vercel.com → projet `sodilame-site` → Settings → Environment
Variables**. Attention à ne pas confondre avec *Settings → Environments*
(au pluriel), qui ne sert qu'à gérer les branches.

Pour chaque variable : cocher les trois cases **Production**, **Preview** et
**Development**.

---

## Les six variables

| Nom | Valeur | Rôle |
|---|---|---|
| `SESSION_SECRET` | à générer, ≥ 24 caractères | signe les cookies de session |
| `ADMINS` | `direction@sodilame.fr` | qui a accès à `/admin` |
| `RESEND_API_KEY` | `re_…` | envoi des e-mails |
| `MAIL_EXPEDITEUR` | `SODILAME <contact@sodilame.com>` | expéditeur affiché |
| `MAIL_DESTINATION` | `sodilame@sodilame.fr` | où arrivent commandes et SAV |
| `SITE_URL` | `https://www.sodilame.com` | base des liens dans les e-mails |

`DATABASE_URL` n'est pas à saisir : l'intégration Neon l'ajoute toute seule.

---

### `SESSION_SECRET`

Cette chaîne signe les cookies de session. Qui la connaît peut fabriquer un
cookie d'administrateur et entrer dans `/admin` sans e-mail ni lien. Elle ne
doit donc être partagée avec personne — moi compris.

Pour la générer sans qu'elle transite nulle part : ouvrir n'importe quel
onglet du navigateur, `F12` → onglet **Console**, coller puis Entrée :

```js
crypto.randomUUID() + crypto.randomUUID()
```

Copier le résultat entre guillemets (sans les guillemets) directement dans
Vercel. Ne pas la noter dans un e-mail ni dans un fichier du dépôt.

Si elle est changée plus tard, toutes les sessions ouvertes sont invalidées —
il faut se reconnecter. Sans conséquence : il suffit de redemander un lien.

### `ADMINS`

Les adresses séparées par des virgules, sans espace autour :

```
direction@sodilame.fr,mathieu@sodilame.fr
```

Une adresse absente de cette liste ne reçoit aucun lien administrateur. Par
sécurité le formulaire ne le dit pas — il répond la même chose dans tous les
cas, pour ne pas devenir un détecteur d'adresses valides.

### `SITE_URL`

Sans elle, les liens de connexion pointent vers le domaine par lequel la
demande est arrivée. Un lien demandé depuis `sodilame-site.vercel.app`
renverrait donc vers `vercel.app`. Avec elle, tous les liens pointent vers
`sodilame.com`.

---

## Étape indispensable : redéployer

**Vercel n'applique pas les variables aux déploiements déjà en ligne.** Tant
qu'on ne redéploie pas, rien ne change — c'est la cause la plus fréquente du
« j'ai tout rempli mais ça ne marche toujours pas ».

Onglet **Deployments** → le déploiement le plus récent → menu `···` →
**Redeploy** → confirmer. Une minute environ.

---

## Vérifier

Ouvrir **https://www.sodilame.com/espace/diagnostic**.

Cette page est publique mais ne révèle rien : uniquement des oui/non, les
adresses administrateur masquées (`d••••••@sodilame.fr`), et les cinq
dernières tentatives de connexion refusées. Elle dit en clair ce qui manque.

Les cinq lignes doivent être au vert :

- `SESSION_SECRET` présente et assez longue
- `ADMINS` renseignée — avec l'adresse masquée en regard
- `RESEND_API_KEY` présente
- base de données joignable
- dernier déploiement postérieur au dernier changement de variable

Ensuite : **/espace/connexion** → saisir `direction@sodilame.fr` → le lien
arrive dans la boîte. Il est valable 30 minutes et à usage unique. Une fois
cliqué, la session dure 30 jours et `/admin` est accessible.

Si le lien n'arrive pas alors que le diagnostic est au vert, regarder dans
Resend → **Logs** : l'e-mail y figure avec son statut (livré, rejeté, en
attente). C'est le seul endroit qui distingue « pas envoyé » de « envoyé mais
tombé dans les indésirables ».

---

## À faire une fois

La clé Resend `re_LqzhtXd5_…` a circulé dans une conversation. Elle est à
considérer comme compromise : Resend → **API Keys** → supprimer l'ancienne,
en créer une nouvelle, la coller dans Vercel, redéployer. Cinq minutes, et
c'est le genre de chose qu'on ne fait jamais si on ne la fait pas tout de
suite.
