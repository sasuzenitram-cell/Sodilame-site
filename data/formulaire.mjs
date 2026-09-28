// ---------------------------------------------------------------------------
// Les natures de demande du formulaire de contact.
//
// Cette liste était écrite en dur dans src/layout.mjs. Elle est sortie ici
// parce qu'elle a maintenant deux lecteurs : la page, qui construit le menu
// déroulant, et api/contact.js, qui refuse toute autre valeur. Le robot du
// 28/09/2026 envoyait bien une des six valeurs réelles — il avait lu la page —
// mais un vocabulaire fermé coûte deux lignes et ferme la porte à tous ceux
// qui inventent ou traduisent le libellé.
//
// Toute modification doit rester synchronisée avec les libellés reconnus par
// static/assets/form.js (préremplissage depuis /contact?sujet=…).
// ---------------------------------------------------------------------------

export const sujets = [
  'Projet de cuisine complète',
  "Achat / remplacement d'un équipement",
  'Dépannage — froid',
  'Dépannage — cuisson ou laverie',
  "Contrat d'entretien / audit gratuit",
  'Autre demande',
];
