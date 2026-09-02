# Mise à jour GitHub — 6 fichiers

Décompressez par-dessus votre dossier local, en écrasant. L'arborescence est
identique à celle du dépôt.

| Fichier | Ce qui change |
|---|---|
| `data/villes.mjs` | les 8 pages commune recentrées sur « frigoriste » et « dépannage » |
| `data/articles.mjs` | deux nouveaux articles : plan de maîtrise sanitaire, bac à graisses |
| `build.mjs` | H1 propre à chaque commune, 3 questions ajoutées à la FAQ des villes |
| `static/assets/style.css` | corrections du rendu mobile |
| `src/qr.mjs` | zones tactiles et lisibilité des pages QR |
| `tests/mobile.mjs` | **nouveau** — banc d'audit du rendu mobile |

---

## Ce que fait cette mise à jour

### Le rendu mobile

Audit automatisé des 59 pages en 360, 390 et 430 px. Cinq défauts corrigés :

- un **débordement horizontal** sur la page laverie en 360 px — un tableau
  large forçait la grille et décalait toute la page de 45 px ;
- **174 zones tactiles sous 40 px** : liens du pied de page (31 px), panier
  (38), boutons de filtre (37), bouton « Ajouter » (39,5), flèche de retour
  des pages QR (22) ;
- le **bouton d'appel du hero** qui doublonnait la barre fixe du bas ;
- la **signature du logo à 9,1 px**, illisible sur un écran de 360 ;
- deux règles mobiles écrasées par les règles de base placées après elles.

Pour relancer l'audit plus tard :

```bash
npm i -D playwright && npx playwright install chromium
node tests/serveur.mjs &
node tests/mobile.mjs
```

### Le référencement

Les mesures Semrush ont montré que « cuisine professionnelle + ville » ne se
recherche pas : **0 recherche par mois** sur Arles, Avignon et Nîmes. Le volume
local est sur « frigoriste + ville » — Marseille 260, Avignon 70, Aix 40,
Salon 30, Nîmes 30, Arles 20.

**Les 8 pages commune** gardent leur contenu local, qui était bon. Seul le
ciblage change : titre, H1 et description recentrés, plus une section
froid/dépannage par ville avec du concret non copiable — corrosion des
condenseurs par l'air de Camargue à Arles, dureté de l'eau et laverie à Salon,
groupes en cave intra-muros à Avignon, dérive de température en gastronomie à
Aix, criticité de la cellule sur les cuisines centrales d'Istres.

Chaque ville reçoit un H1 différent. Un H1 identique répété sur huit pages est
exactement ce que Google lit comme page satellite.

**Deux articles** publiés, les deux meilleurs rapports volume/difficulté du
plan éditorial :

- *Plan de maîtrise sanitaire* — 1 000 recherches/mois, difficulté 12
- *Bac à graisses en restaurant* — 320 recherches/mois, difficulté 6

---

## Après le déploiement

1. **Search Console** → Inspection d'URL → soumettre à l'indexation les deux
   nouveaux articles et les 8 pages commune modifiées. Sans ça, Google mettra
   des semaines à repasser dessus.
2. **Fiche Google** : la première publication du mois est prête à coller dans
   le mode d'emploi — c'est justement l'article sur le contrôle d'hygiène.

## Rappel : allégez le dépôt

Votre dépôt suit encore 75 fichiers dans `public/`, que Vercel régénère seul.
Une fois pour toutes :

```bash
git rm -r --cached public
git commit -m "Retire la sortie de build du depot"
git push
```
