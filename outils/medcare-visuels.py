# ---------------------------------------------------------------------------
# Intègre les photos INFRICO MEDCARE (froid médical), relevées sur le site
# public infricomedcare.com (pas de portail revendeur).
#
#   python3 outils/medcare-visuels.py <medcare-visuels.json>
#
# Le JSON est produit dans le navigateur : { clé: { src, jpg (base64) } }.
# Les photos Medcare sont posées sur un fond gris uni (#DFDFDF) : il est
# remplacé par du blanc par remplissage depuis les bords, avant recadrage.
#
# Ce script écrit :
#   — static/assets/produits/medcare/<clé>.jpg : une photo par fiche, carrée
#     800 x 800, fond blanc, sans métadonnées ;
#   — data/medcare-visuels.mjs : la photo de chaque fiche.
# Les fiches techniques PDF restent hébergées par Infrico
# (infricodocuments.com/medcare/ficha-tecnica/<réf>.pdf).
#
# Python 3 et Pillow. Ne fait pas partie du build.
#
# ⚠️  DROITS : reprise des visuels du fabricant décidée par la direction le
#     30/10/2026, sous sa responsabilité (toutes marques).
# ---------------------------------------------------------------------------
import base64
import io
import json
import re
import sys
from datetime import date
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

if len(sys.argv) != 2:
    sys.exit('Usage : python3 outils/medcare-visuels.py <medcare-visuels.json>')

racine = Path(__file__).resolve().parent.parent
d_img = racine / 'static/assets/produits/medcare'
d_img.mkdir(parents=True, exist_ok=True)

COTE = 800
MARGE = 0.06
BLANC = (255, 255, 255)


def blanchir_fond(im):
    """Remplace le fond gris uni par du blanc, depuis les bords de l'image."""
    im = im.copy()
    w, h = im.size
    for x in range(0, w, max(1, w // 40)):
        for y in (0, h - 1):
            if im.getpixel((x, y)) != BLANC:
                ImageDraw.floodfill(im, (x, y), BLANC, thresh=10)
    for y in range(0, h, max(1, h // 40)):
        for x in (0, w - 1):
            if im.getpixel((x, y)) != BLANC:
                ImageDraw.floodfill(im, (x, y), BLANC, thresh=10)
    return im


def recadrer(octets):
    im = Image.open(io.BytesIO(octets)).convert('RGB')
    im.thumbnail((1400, 1400), Image.LANCZOS)
    im = blanchir_fond(im)
    diff = ImageChops.difference(im, Image.new('RGB', im.size, 'white')).convert('L').point(lambda v: 255 if v > 14 else 0)
    boite = diff.getbbox() or (0, 0, im.width, im.height)
    im = im.crop(boite)
    utile = round(COTE * (1 - 2 * MARGE))
    k = utile / max(im.width, im.height)
    im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    toile = Image.new('RGB', (COTE, COTE), 'white')
    toile.paste(im, ((COTE - im.width) // 2, (COTE - im.height) // 2))
    sortie = io.BytesIO()
    toile.save(sortie, 'JPEG', quality=82, optimize=True, progressive=True)  # aucune métadonnée
    return sortie.getvalue()


# Une photo par fiche de data/medcare.mjs (les autres vues relevées servaient
# au choix sur planche contact).
FICHES = {'per', 'ptr', 'ptr130', 'ler', 'ltr', 'ltr130', 'lef', 'ltf', 'ltf130', 'mixte',
          'bbmd', 'bbmd130', 'pfmd', 'ult', 'ultp'}

src = json.loads(Path(sys.argv[1]).read_text())
photos = {}
for cle in sorted(src):
    if cle not in FICHES or not re.fullmatch(r'[a-z0-9]+', cle):
        continue
    octets = base64.b64decode(src[cle]['jpg'])
    if octets[:2] != b'\xff\xd8':
        continue
    (d_img / f'{cle}.jpg').write_bytes(recadrer(octets))
    photos[cle] = f'medcare/{cle}'

(racine / 'data/medcare-visuels.mjs').write_text(
    f"""// FICHIER GÉNÉRÉ par outils/medcare-visuels.py — ne pas modifier à la main.
// Photos Infrico Medcare reprises de infricomedcare.com le {date.today().isoformat()},
// sur décision de la direction (30/10/2026). Fichiers :
// static/assets/produits/medcare/.
export const photosMedcare = {json.dumps(photos, indent=2, ensure_ascii=False, sort_keys=True)};
"""
)
print(f'{len(photos)} photos')
