# ---------------------------------------------------------------------------
# Intègre les visuels WINTERHALTER relevés dans la médiathèque du portail
# revendeur (portal.winterhalter.com → Médiathèque), servis par
# media.winterhalter.com.
#
#   python3 outils/winterhalter-visuels.py wh-visuels-2.json [wh-visuels-3.json]
#
# Les JSON sont produits dans le navigateur, connecté au portail :
#   — wh-visuels-2.json : { clé: { id, jpg } }, dérivé « Screen_96dpi_RGB »
#     (756 px) de chaque visuel retenu ;
#   — wh-visuels-3.json (facultatif) : même forme, dérivé « Print_300dpi_CMYK »
#     des vues où l'appareil est petit dans le cadre (capots PT, osmoseurs AT),
#     et vue de remplacement de l'UF-XL (fond gris sur la première).
#     Le second fichier l'emporte sur le premier.
#
# Ce script écrit :
#   — static/assets/produits/winterhalter/<clé>.jpg : recadrée sur le produit,
#     carrée 800 x 800, fond blanc, sans métadonnées ;
#   — data/winterhalter-visuels.mjs : la photo de chaque clé.
# Documents : brochures de gamme publiques de winterhalter.com, liées depuis
# data/winterhalter.mjs.
#
# Python 3, Pillow et NumPy. Ne fait pas partie du build.
#
# ⚠️  DROITS : reprise des visuels du portail revendeur Winterhalter décidée par
#     la direction (décision du 30/10/2026 étendue à toutes les marques), sous
#     sa responsabilité.
# ---------------------------------------------------------------------------
import base64
import io
import json
import re
import sys
from datetime import date
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw

if len(sys.argv) not in (2, 3):
    sys.exit('Usage : python3 outils/winterhalter-visuels.py wh-visuels-2.json [wh-visuels-3.json]')

racine = Path(__file__).resolve().parent.parent
d_img = racine / 'static/assets/produits/winterhalter'
d_img.mkdir(parents=True, exist_ok=True)

COTE = 800
MARGE = 0.06
BLANC = (255, 255, 255)
# Vues sur fond gris uni : le fond est remplacé par du blanc depuis les bords.
FOND_GRIS = {'mono'}
# Vues en studio, fond gris dégradé que l'inox de la machine rejoint : la
# photo est gardée entière et fondue au blanc vers les bords.
FONDU = {'ufxl'}
# Relevées mais non utilisées : Ver'net (hors sélection) ; seconde vue des
# fiches à deux tailles (UC-S Excellence, AT Excellence-M), une photo par fiche.
IGNOREES = {'te', 'ucexcs', 'atm'}


def blanchir(im):
    im = im.copy()
    w, h = im.size
    for x in range(0, w, max(1, w // 40)):
        for y in (0, h - 1):
            if im.getpixel((x, y)) != BLANC:
                ImageDraw.floodfill(im, (x, y), BLANC, thresh=18)
    for y in range(0, h, max(1, h // 40)):
        for x in (0, w - 1):
            if im.getpixel((x, y)) != BLANC:
                ImageDraw.floodfill(im, (x, y), BLANC, thresh=18)
    return im


def fondre(im):
    w, h = im.size
    rampe = lambda n, a: np.clip(np.minimum(np.linspace(0, 1, n), 1 - np.linspace(0, 1, n)) / a, 0, 1)
    m = np.outer(rampe(h, 0.10), rampe(w, 0.13))
    m = (m * m * (3 - 2 * m))[..., None]
    return Image.fromarray((np.asarray(im, dtype=float) * m + 255 * (1 - m)).astype('uint8'))


def recadrer(octets, gris=False, fondu=False):
    im = Image.open(io.BytesIO(octets))
    if im.mode == 'CMYK':
        # JPEG CMJN : selon le logiciel qui l'a écrit, les valeurs sont stockées
        # inversées ou non. On garde la conversion dont les coins sont blancs.
        a = im.convert('RGB')
        b = Image.eval(im, lambda v: 255 - v).convert('RGB')
        coins = lambda x: sum(sum(x.getpixel(c)) for c in [(2, 2), (x.width - 3, 2), (2, x.height - 3), (x.width - 3, x.height - 3)])
        im = a if coins(a) >= coins(b) else b
    im = im.convert('RGB')
    im.thumbnail((1600, 1600), Image.LANCZOS)
    if gris:
        im = blanchir(im)
    if fondu:
        im = fondre(im)
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


sources = {}
for f in sys.argv[1:]:
    sources.update(json.loads(Path(f).read_text()))

photos = {}
for cle, v in sorted(sources.items()):
    if cle in IGNOREES or not re.fullmatch(r'[a-z0-9]+', cle):
        continue
    octets = base64.b64decode(v['jpg'])
    if octets[:2] != b'\xff\xd8':
        continue
    (d_img / f'{cle}.jpg').write_bytes(recadrer(octets, cle in FOND_GRIS, cle in FONDU))
    photos[cle] = f'winterhalter/{cle}'

(racine / 'data/winterhalter-visuels.mjs').write_text(
    f"""// FICHIER GÉNÉRÉ par outils/winterhalter-visuels.py — ne pas modifier à la main.
// Visuels de la médiathèque du portail revendeur Winterhalter, repris le
// {date.today().isoformat()} sur décision de la direction. Fichiers :
// static/assets/produits/winterhalter/.
export const photosWinterhalter = {json.dumps(photos, indent=2, ensure_ascii=False, sort_keys=True)};
"""
)
print(f'{len(photos)} photos')
