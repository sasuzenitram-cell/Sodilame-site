# ---------------------------------------------------------------------------
# Intègre les photos ITV (machines à glaçons), relevées sur le serveur
# d'images de CODIGEL, distributeur d'ITV en France
# (cdnapi.interactiv-database.fr — les mêmes adresses que la colonne p.url
# du tarif CODIGEL). Ni ITV ni CODIGEL n'ont de portail revendeur pour nous.
#
#   python3 outils/codigel-visuels.py <codigel-itv-visuels.json>
#
# Le JSON est produit dans le navigateur : { clé: { src, wh, jpg (base64) } }.
#
# Ce script écrit :
#   — static/assets/produits/itv/<clé>.jpg : une photo par fiche, recadrée sur
#     le produit, carrée 800 x 800, fond blanc, sans métadonnées ;
#   — data/codigel-visuels.mjs : la photo de chaque fiche.
# Les fiches techniques PDF restent hébergées par CODIGEL : leur lien vient du
# tarif (data/codigel-tarif.mjs, champ `fiche`).
#
# Python 3 et Pillow. Ne fait pas partie du build.
#
# ⚠️  DROITS : reprise des visuels décidée par la direction le 30/10/2026, sous
#     sa responsabilité (même décision que pour Miele, RATIONAL, Foster et
#     Infrico).
# ---------------------------------------------------------------------------
import base64
import io
import json
import re
import sys
from datetime import date
from pathlib import Path

from PIL import Image, ImageChops

if len(sys.argv) != 2:
    sys.exit('Usage : python3 outils/codigel-visuels.py <codigel-itv-visuels.json>')

racine = Path(__file__).resolve().parent.parent
d_img = racine / 'static/assets/produits/itv'
d_img.mkdir(parents=True, exist_ok=True)

COTE = 800
MARGE = 0.06


def recadrer(octets):
    im = Image.open(io.BytesIO(octets)).convert('RGB')
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


src = json.loads(Path(sys.argv[1]).read_text())
photos = {}
for cle in sorted(src):
    if not re.fullmatch(r'[a-z0-9]+', cle):
        continue
    octets = base64.b64decode(src[cle]['jpg'])
    if octets[:2] != b'\xff\xd8':
        continue
    (d_img / f'{cle}.jpg').write_bytes(recadrer(octets))
    photos[cle] = f'itv/{cle}'

(racine / 'data/codigel-visuels.mjs').write_text(
    f"""// FICHIER GÉNÉRÉ par outils/codigel-visuels.py — ne pas modifier à la main.
// Photos ITV reprises du serveur d'images CODIGEL le {date.today().isoformat()},
// sur décision de la direction (30/10/2026). Fichiers :
// static/assets/produits/itv/.
export const photosCodigel = {json.dumps(photos, indent=2, ensure_ascii=False, sort_keys=True)};
"""
)
print(f'{len(photos)} photos')
