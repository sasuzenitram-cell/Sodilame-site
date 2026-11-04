# ---------------------------------------------------------------------------
# Génère data/medcare-tarif.mjs à partir du tarif INFRICO MEDCARE (froid
# médical) transmis par Infrico :
#
#   python3 outils/medcare-tarif.py "MEDCARE PRICELIST 2026 FRANCIA.xlsx"
#
# Ne retient QUE les références utilisées par data/medcare.mjs, et pour
# chacune : prix public conseillé HT (colonne « PVP / Price »), volume utile,
# nombre de clayettes ou tiroirs fournis, plage de température.
#
# Le fichier Infrico ne contient que des prix publics : la remise SODILAME
# n'y figure pas et ne doit jamais être ajoutée ici. Le fichier Excel lui-même
# ne doit pas être ajouté au dépôt.
#
# Python 3 et openpyxl. Ne fait pas partie du build.
# ---------------------------------------------------------------------------
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

from openpyxl import load_workbook

if len(sys.argv) != 2:
    sys.exit('Usage : python3 outils/medcare-tarif.py "MEDCARE PRICELIST 2026 FRANCIA.xlsx"')

racine = Path(__file__).resolve().parent.parent
sortie = racine / 'data/medcare-tarif.mjs'

# Feuilles des appareils : Modèle | Volume (L) | Clayettes ou tiroirs | Temp. | PVP
APPAREILS = ['PHARMA CARE', 'PHARMA CARE PLUS', 'HEALTH CARE', 'LAB CARE (REFRIG)', 'LAB CARE (-25ºC)', 'LAB CARE PLUS (-86ºC)']
# Options vendues en ligne (décision de la direction du 04/11/2026 : dataloggers).
OPTIONS = {'308X149', '308X150', '308X130'}

classeur = load_workbook(sys.argv[1], data_only=True, read_only=True)
tarif = {}
for feuille in APPAREILS:
    for ligne in classeur[feuille].iter_rows(values_only=True):
        cellules = [c for c in ligne if c not in (None, '')]
        if not cellules or not isinstance(cellules[0], str):
            continue
        code = cellules[0].strip()
        # Ex. « LTF43SD (Static) » : la référence est le premier mot.
        ref = code.split()[0]
        if re.fullmatch(r'[A-Z]{3,4}\d{2,5}[A-Z]{0,2}|ULTP', ref) and len(cellules) >= 5 and isinstance(cellules[-1], (int, float)):
            vol, niv, temp, prix = cellules[1], cellules[2], cellules[3], cellules[-1]
            tarif.setdefault(ref, {
                'prix': round(float(prix), 2),
                'volume': str(vol).strip(),
                'niveaux': str(niv).strip(),
                'temp': str(temp).replace('º', '°').strip(),
            })
        elif ref in OPTIONS and isinstance(cellules[-1], (int, float)):
            tarif.setdefault(ref, {'prix': round(float(cellules[-1]), 2)})

# data/medcare.mjs importe le fichier généré : il doit exister pour être lu.
if not sortie.exists():
    sortie.write_text('export const tarifMedcare = {};\n')
refs = json.loads(subprocess.check_output(
    ['node', '--input-type=module', '-e',
     "const { refsMedcare } = await import('./data/medcare.mjs'); console.log(JSON.stringify(refsMedcare));"],
    cwd=racine, text=True))

retenu, absents = {}, []
for r in sorted(set(refs)):
    if r in tarif and tarif[r]['prix'] > 0:
        retenu[r] = tarif[r]
    else:
        absents.append(r)

sortie.write_text(
    f"""// ---------------------------------------------------------------------------
// FICHIER GÉNÉRÉ — ne pas modifier à la main.
//   python3 outils/medcare-tarif.py "MEDCARE PRICELIST 2026 FRANCIA.xlsx"
// Source : tarif Infrico Medcare 2026 France, le {date.today().isoformat()}.
// Prix = prix public conseillé Infrico (PVP), HT. Aucun prix d'achat ici.
// ---------------------------------------------------------------------------
export const tarifMedcare = {json.dumps(retenu, indent=2, ensure_ascii=False)};
"""
)
print(f'{len(retenu)} références écrites dans data/medcare-tarif.mjs')
if absents:
    sys.exit(f"⚠️  {len(absents)} référence(s) absente(s) du tarif : {', '.join(absents)}")
