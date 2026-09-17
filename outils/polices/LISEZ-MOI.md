# Polices embarquées dans les fiches techniques PDF

Sept fichiers `.woff2` — Inter (400, 500, 600, 700) et Montserrat (600, 700, 800),
jeu latin uniquement, 150 Ko au total.

**Pourquoi ils sont ici et pas chargés depuis Google Fonts.** Les fiches PDF sont
rendues par Chromium en local, puis livrées comme fichiers figés. Si le gabarit
appelait Google Fonts, le rendu dépendrait d'un réseau disponible au moment de la
génération, et la fiche retomberait silencieusement sur une police système — le
document sortirait à la bonne mise en page mais avec la mauvaise typographie, ce
qui ne se voit que sur la version imprimée, trop tard.

Les fichiers sont encodés en base64 dans le HTML avant le rendu, donc Chromium
n'accède à aucun réseau. Les polices ne sont **pas** utilisées par le site :
`style.css` se contente de nommer Inter et Montserrat avec repli système.

Source : paquets npm `@fontsource/inter` et `@fontsource/montserrat`
(licence SIL Open Font License 1.1, redistribution et embarquement autorisés).
