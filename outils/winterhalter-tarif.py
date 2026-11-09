# ---------------------------------------------------------------------------
# Génère data/winterhalter-tarif.mjs à partir du catalogue « TARIFS 2026 »
# Winterhalter France (prix publics HT applicables au 1er janvier 2026).
#
#   python3 outils/winterhalter-tarif.py winterhalter_tarifs_2026.pdf
#
# Winterhalter ne fournit pas d'export Dolibarr : la source est le catalogue
# PDF du portail revendeur (Applications → Catalogue Tarifs 2026). Ce script
# n'invente aucun prix : chaque montant est LU dans le PDF (pdftotext), à la
# page indiquée, sur la ligne qui porte la référence Winterhalter, et le
# script s'arrête si une valeur est introuvable. Le PDF lui-même ne doit pas
# être ajouté au dépôt.
#
# Les prix de ce catalogue sont les prix publics : aucun prix d'achat ici.
#
# Python 3 et pdftotext (poppler). Ne fait pas partie du build.
# ---------------------------------------------------------------------------
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

if len(sys.argv) != 2:
    sys.exit('Usage : python3 outils/winterhalter-tarif.py winterhalter_tarifs_2026.pdf')

pdf = sys.argv[1]
racine = Path(__file__).resolve().parent.parent
PRIX = r'(\d{1,3}(?: \d{3})*)'


def page(n):
    return subprocess.run(['pdftotext', '-layout', '-f', str(n), '-l', str(n), pdf, '-'],
                          capture_output=True, text=True, check=True).stdout.splitlines()


def montant(s):
    return int(s.replace(' ', ''))


def sur_la_ligne(n, motif):
    """Prix en fin de la ligne qui contient `motif` (ou sur une ligne voisine
    qui ne porte qu'un nombre, quand la mise en page l'a déplacé)."""
    lignes = page(n)
    for i, l in enumerate(lignes):
        if motif in l:
            # Premier nombre isolé par des blancs après la référence : le prix
            # (« 011V9999 / UC-S (panier 400 x 400)   6 500   Les prix… »).
            m = re.search(r'(?:^|\s{2,})' + PRIX + r'(?=\s{2,}|\s*$)', l.split(motif, 1)[1])
            if m:
                return montant(m.group(1))
            # Prix déplacé sur une ligne voisine, en bout de colonne, sur une
            # ligne qui ne porte pas elle-même de référence d'article.
            for j in (i + 1, i - 1, i + 2):
                if 0 <= j < len(lignes) and not re.search(r'\b\d{7,8}\b', lignes[j]):
                    m = re.search(r'\s{10,}' + PRIX + r'\s*$', lignes[j])
                    if m:
                        return montant(m.group(1))
    raise SystemExit(f'⚠️  page {n} : prix introuvable pour « {motif} »')


def serie(n, motif, rang):
    """Rang-ième prix d'une ligne de prix en colonnes (« Prix [EURO] 13 337 16 351 … »)."""
    for l in page(n):
        if re.search(motif, l):
            valeurs = re.findall(r'(?<![\d,.])(\d{1,3}(?: \d{3})+|\d{3,})(?:\*\d)?(?![\d,.])', l)
            return montant(valeurs[rang])
    raise SystemExit(f'⚠️  page {n} : ligne « {motif} » introuvable')


# cle : (page du PDF, fonction de lecture, argument(s))
SOURCES = {
    # Lave-vaisselle frontaux UC (p. 10 du catalogue)
    'UC-S': (12, sur_la_ligne, '011V9999'),
    'UC-M': (12, sur_la_ligne, '012V9999'),
    'UC-L': (12, sur_la_ligne, '013V9999'),
    'UC-XL': (12, sur_la_ligne, '014V9999'),
    'UC-ERG_10': (12, sur_la_ligne, 'UC-ERG_10'),
    'UC-SPA_10': (12, sur_la_ligne, 'UC-SPA_10'),
    'UC-WAUF_10': (12, sur_la_ligne, 'UC-WAUF_10'),
    # UC Excellence-i / iPlus (p. 11)
    'UC-S Excellence-i': (13, serie, (r'Prix\s+\[EURO\]', 0)),
    'UC-M Excellence-i': (13, serie, (r'Prix\s+\[EURO\]', 1)),
    'UC-S Excellence-iPlus': (13, serie, (r'Prix\s+\[EURO\]', 2)),
    'UC-M Excellence-iPlus': (13, serie, (r'Prix\s+\[EURO\]', 3)),
    # Lave-vaisselle à capot PT (p. 18-19)
    'PT-M': (20, serie, (r'Prix de la machine', 0)),
    'PT-M EnergyPlus': (20, serie, (r'Prix de la machine', 1)),
    'PT-M ClimatePlus': (20, serie, (r'Prix de la machine', 2)),
    'PT-L': (21, serie, (r'^\s*16 611', 0)),
    'PT-L EnergyPlus': (21, serie, (r'^\s*16 611', 1)),
    'PT-L ClimatePlus': (21, serie, (r'^\s*16 611', 2)),
    'PT-XL': (21, serie, (r'^\s*16 611', 3)),
    'PT-XL EnergyPlus': (21, serie, (r'^\s*16 611', 4)),
    'PT-WAUF_10': (22, sur_la_ligne, 'PT-WAUF_10'),
    'PT-D_05': (22, sur_la_ligne, 'PT-D_05'),
    'PT-H_10': (22, sur_la_ligne, 'PT-H_10'),
    'PT-B_67': (22, sur_la_ligne, 'PT-B_67'),
    # Lave-ustensiles GS 630 (p. 35) et UF (p. 42-44)
    '630V9999': (37, sur_la_ligne, '630V9999'),
    '630V0004': (37, sur_la_ligne, '630V0004'),
    'UF-M': (44, serie, (r'Prix\*3', 0)),
    'UF-M Energy': (44, serie, (r'Prix\*3', 1)),
    'UF-L': (44, serie, (r'Prix\*3', 2)),
    'UF-L Energy': (44, serie, (r'Prix\*3', 3)),
    'UF-XL': (44, serie, (r'Prix\*3', 4)),
    'UF-XL Energy': (44, serie, (r'Prix\*3', 5)),
    'UF-B_69': (45, sur_la_ligne, 'UF-B_69'),
    '75004683': (45, sur_la_ligne, '75004683'),
    '75004684': (46, sur_la_ligne, '75004684'),
    # Traitement de l'eau (p. 61-65)
    '20000826': (63, sur_la_ligne, '20000826'),
    '20000932': (63, sur_la_ligne, '20000932'),
    '200V0001': (64, serie, (r'Prix \[EURO\]', 0)),
    '201V0001': (64, serie, (r'Prix \[EURO\]', 1)),
    '3305017': (67, sur_la_ligne, '3305017'),
    # Produits lessiviels (p. 68-71)
    '3301415': (70, sur_la_ligne, '3301415'),
    '3301630': (70, sur_la_ligne, '3301630'),
    '20000620': (70, sur_la_ligne, '20000620'),
    '20006021': (70, sur_la_ligne, '20006021'),
    '20006022': (70, sur_la_ligne, '20006022'),
    '20006023': (70, sur_la_ligne, '20006023'),
    '20004401': (70, sur_la_ligne, '20004401'),
    '20004391': (70, sur_la_ligne, '20004391'),
    '20004392': (70, sur_la_ligne, '20004392'),
    '20000590': (70, sur_la_ligne, '20000590'),
    '20008202': (70, sur_la_ligne, '20008202'),
    '20008203': (70, sur_la_ligne, '20008203'),
    '20008204': (70, sur_la_ligne, '20008204'),
    '20000217': (70, sur_la_ligne, '20000217'),
    '3301581': (70, sur_la_ligne, '3301581'),
    '20000683': (71, sur_la_ligne, '20000683'),
    '20000331': (72, sur_la_ligne, '20000331'),
    '20000513': (72, sur_la_ligne, '20000513'),
    '20000514': (72, sur_la_ligne, '20000514'),
    '20008124': (72, sur_la_ligne, '20008124'),
    '20006492': (72, sur_la_ligne, '20006492'),
    '20000851': (72, sur_la_ligne, '20000851'),
    '20000377': (72, sur_la_ligne, '20000377'),
    '20004403': (72, sur_la_ligne, '20004403'),
    '20004393': (72, sur_la_ligne, '20004393'),
    '20000950': (73, sur_la_ligne, '20000950'),
    '20000523': (73, sur_la_ligne, '20000523'),
}

tarif = {}
for cle, (n, lire, arg) in SOURCES.items():
    tarif[cle] = lire(n, *arg) if isinstance(arg, tuple) else lire(n, arg)

(racine / 'data/winterhalter-tarif.mjs').write_text(
    f"""// ---------------------------------------------------------------------------
// FICHIER GÉNÉRÉ — ne pas modifier à la main.
//   python3 outils/winterhalter-tarif.py winterhalter_tarifs_2026.pdf
// Source : catalogue « TARIFS 2026 » Winterhalter France (prix publics HT au
// 1er janvier 2026), lu le {date.today().isoformat()}. Clé = référence Winterhalter
// (n° d'article, ou modèle quand le catalogue n'en donne pas). Aucun prix
// d'achat ici.
// ---------------------------------------------------------------------------
export const tarifWinterhalter = {json.dumps(tarif, indent=2, ensure_ascii=False)};
"""
)
print(f'{len(tarif)} prix lus dans le catalogue')
