# ---------------------------------------------------------------------------
# Intègre les visuels et documents FOSTER relevés sur le site public du
# fabricant (www.fosterrefrigerator.com/fr), Foster n'ayant pas de portail
# revendeur.
#
#   python3 outils/foster-visuels.py foster-visuels.json [foster-visuels-2.json]
#
# Les JSON sont produits dans le navigateur, sur le site Foster :
#   — foster-visuels.json : { réf.: { page, title, pdfs: [chemins /Files/…],
#     jpg (JPEG base64, image principale « <réf>_1.png ») } } ;
#   — foster-visuels-2.json (facultatif) : { « <réf>_<n> »: JPEG base64 }, les
#     vues secondaires, utilisées quand l'image principale porte un bandeau
#     publicitaire du fabricant (« A grade », « Best seller ») — voir VUE.
#
# Ce script écrit :
#   — static/assets/produits/foster/<réf>.jpg : recadrée sur le produit, carrée
#     800 x 800, fond blanc, sans métadonnées ;
#   — data/foster-visuels.mjs : photo et documents (fiche technique, brochure
#     de gamme, étiquette énergie) par référence. Les PDF restent chez Foster :
#     on ne publie que des LIENS vers fosterrefrigerator.com.
#
# Python 3 et Pillow (pip install pillow). Ne fait pas partie du build.
#
# ⚠️  DROITS : reprise des visuels du site Foster décidée par la direction le
#     30/10/2026, sous sa responsabilité (même décision que pour Miele et
#     RATIONAL).
# ---------------------------------------------------------------------------
import base64
import io
import json
import re
import sys
from datetime import date
from pathlib import Path
from urllib.parse import quote

from PIL import Image, ImageChops

if len(sys.argv) not in (2, 3):
    sys.exit('Usage : python3 outils/foster-visuels.py <foster-visuels.json> [foster-visuels-2.json]')

racine = Path(__file__).resolve().parent.parent
d_img = racine / 'static/assets/produits/foster'
d_img.mkdir(parents=True, exist_ok=True)

SITE = 'https://www.fosterrefrigerator.com'
COTE = 800
MARGE = 0.06

# Image principale barrée d'un bandeau publicitaire : on prend la vue n° 2,
# le même appareil de trois quarts, sans bandeau.
VUE = {r: 2 for r in ['41-102', '41-104', '43-102', '43-104', '43-176', '43-178', '43-258', '43-260']}


def recadrer(octets):
    im = Image.open(io.BytesIO(octets)).convert('RGB')
    diff = ImageChops.difference(im, Image.new('RGB', im.size, 'white')).convert('L').point(lambda v: 255 if v > 10 else 0)
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


def jpeg(b64):
    octets = base64.b64decode(b64 or '')
    return octets if octets[:2] == b'\xff\xd8' else None  # rien d'autre qu'une image


def lien(chemin):
    # Seuls les documents de la médiathèque Foster sont acceptés.
    if not re.fullmatch(r'/Files/Product assets/[^<>"\']+\.pdf', chemin or ''):
        return None
    return SITE + quote(chemin)


principal = json.loads(Path(sys.argv[1]).read_text())
secondaire = json.loads(Path(sys.argv[2]).read_text()) if len(sys.argv) == 3 else {}

visuels = {}
for ref, v in sorted(principal.items()):
    ref = ref.upper()
    if not re.fullmatch(r'[0-9A-Z\-]+', ref):
        continue
    e = {}
    octets = jpeg(secondaire.get(f'{ref}_{VUE[ref]}')) if ref in VUE else jpeg(v.get('jpg'))
    if octets:
        f = ref.lower()
        (d_img / f'{f}.jpg').write_bytes(recadrer(octets))
        e['photo'] = f'foster/{f}'
    for p in v.get('pdfs', []):
        u = lien(p)
        if not u:
            continue
        if '/French Technical Sheets/' in p:
            e['fiche'] = u
        elif '/Energy labels/' in p:
            e['etiquette'] = u
        elif '/Range brochure/French/' in p and 'gamme' not in e:
            e['gamme'] = u
        elif '/Range brochure/' in p and 'gamme' not in e:
            e.setdefault('gammeEn', u)
    if 'gamme' not in e and 'gammeEn' in e:
        e['gamme'] = e.pop('gammeEn')
    e.pop('gammeEn', None)
    if isinstance(v.get('page'), str) and v['page'].startswith(SITE + '/fr/'):
        e['source'] = v['page']
    visuels[ref] = e

(racine / 'data/foster-visuels.mjs').write_text(
    f"""// FICHIER GÉNÉRÉ par outils/foster-visuels.py — ne pas modifier à la main.
// Visuels repris du site public Foster (fosterrefrigerator.com/fr) le
// {date.today().isoformat()}, sur décision de la direction (30/10/2026).
// Photos : static/assets/produits/foster/. Les documents (fiche technique,
// brochure de gamme, étiquette énergie) restent hébergés chez Foster.
export const visuelsFoster = {json.dumps(visuels, indent=2, ensure_ascii=False, sort_keys=True)};
"""
)
print(f"{sum('photo' in e for e in visuels.values())} photos, "
      f"{sum('fiche' in e for e in visuels.values())} fiches techniques, "
      f"{sum('etiquette' in e for e in visuels.values())} étiquettes énergie")
