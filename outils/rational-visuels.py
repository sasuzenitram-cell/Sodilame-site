# ---------------------------------------------------------------------------
# Intègre les visuels et fiches techniques RATIONAL relevés sur la Toolbox du
# portail revendeur (toolbox.rational-online.com).
#
#   python3 outils/rational-visuels.py rational-visuels.json rational-fiches.json
#
# Les deux JSON sont produits dans le navigateur, connecté au portail :
#   — rational-visuels.json : { clé: { asset, type, data (JPEG base64) } }, la
#     clé étant une référence d'accessoire (« 60.31.089 ») ou un modèle
#     (« icombi-pro-6-1-1 ») ;
#   — rational-fiches.json : { nom: { asset, type, data (PDF base64) } }, le nom
#     étant celui de la fiche technique RATIONAL (« iCombiPro_6-11_EG_Standard »).
#
# Ce script écrit :
#   — static/assets/produits/rational/<clé>.jpg : recadrée sur le produit,
#     carrée 800 x 800, fond blanc, sans métadonnées ;
#   — static/assets/fiches/rational/<nom>.pdf : le PDF d'origine, tel quel ;
#   — data/rational-visuels.mjs : la table clé → fichier.
#
# Python 3 et Pillow (pip install pillow). Ne fait pas partie du build.
#
# ⚠️  DROITS : reprise des visuels du portail revendeur RATIONAL décidée par la
#     direction le 30/10/2026, sous sa responsabilité (même décision que pour
#     Miele). Les fiches techniques sont les documents d'origine, non modifiés.
# ---------------------------------------------------------------------------
import base64
import io
import json
import re
import sys
from datetime import date
from pathlib import Path

from PIL import Image, ImageChops

if len(sys.argv) != 3:
    sys.exit('Usage : python3 outils/rational-visuels.py <rational-visuels.json> <rational-fiches.json>')

racine = Path(__file__).resolve().parent.parent
d_img = racine / 'static/assets/produits/rational'
d_pdf = racine / 'static/assets/fiches/rational'
d_img.mkdir(parents=True, exist_ok=True)
d_pdf.mkdir(parents=True, exist_ok=True)

COTE = 800
MARGE = 0.06


def nom_fichier(cle):
    return re.sub(r'[^a-z0-9]+', '-', cle.lower()).strip('-')


def recadrer(octets):
    im = Image.open(io.BytesIO(octets)).convert('RGB')
    # Le fond des visuels RATIONAL est blanc ou gris très clair (250-255) :
    # on le ramène à un blanc franc, sans toucher au produit.
    coins = [im.getpixel(p) for p in [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1)]]
    fond = min(min(c) for c in coins)
    if 235 <= fond < 255:
        k = 255 / fond
        im = im.point(lambda v: min(255, round(v * k)))
    diff = ImageChops.difference(im, Image.new('RGB', im.size, 'white')).convert('L').point(lambda v: 255 if v > 10 else 0)
    boite = diff.getbbox() or (0, 0, im.width, im.height)
    im = im.crop(boite)
    utile = round(COTE * (1 - 2 * MARGE))
    k = utile / max(im.width, im.height)  # agrandit aussi : thumbnail() ne fait que réduire
    im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    toile = Image.new('RGB', (COTE, COTE), 'white')
    toile.paste(im, ((COTE - im.width) // 2, (COTE - im.height) // 2))
    sortie = io.BytesIO()
    toile.save(sortie, 'JPEG', quality=82, optimize=True, progressive=True)  # aucune métadonnée
    return sortie.getvalue()


visuels = json.loads(Path(sys.argv[1]).read_text())
photos = {}
for cle, v in visuels.items():
    if not re.fullmatch(r'[0-9A-Za-z.\-]+', cle):
        continue
    octets = base64.b64decode(v['data'])
    if octets[:2] != b'\xff\xd8':  # signature JPEG : rien d'autre qu'une image
        continue
    f = nom_fichier(cle)
    (d_img / f'{f}.jpg').write_bytes(recadrer(octets))
    photos[cle] = f'rational/{f}'

fiches = json.loads(Path(sys.argv[2]).read_text())
pdfs = {}
for nom, v in fiches.items():
    if not re.fullmatch(r'[0-9A-Za-z_\- ]+', nom):
        continue
    octets = base64.b64decode(v['data'])
    if octets[:5] != b'%PDF-':
        continue
    f = nom_fichier(nom.replace('_RATIONAL', '')) + '-fiche-technique-rational.pdf'
    (d_pdf / f).write_bytes(octets)
    pdfs[nom] = f'rational/{f}'

(racine / 'data/rational-visuels.mjs').write_text(
    f"""// FICHIER GÉNÉRÉ par outils/rational-visuels.py — ne pas modifier à la main.
// Visuels et fiches techniques repris de la Toolbox du portail revendeur
// RATIONAL le {date.today().isoformat()}, sur décision de la direction (30/10/2026).
// Photos : static/assets/produits/rational/ — fiches : static/assets/fiches/rational/.
export const photosRational = {json.dumps(photos, indent=2, ensure_ascii=False, sort_keys=True)};

export const fichesRational = {json.dumps(pdfs, indent=2, ensure_ascii=False, sort_keys=True)};
"""
)
print(f'{len(photos)} photos, {len(pdfs)} fiches techniques')
