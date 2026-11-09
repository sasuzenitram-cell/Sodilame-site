# ---------------------------------------------------------------------------
# Intègre les visuels et documents GAMKO relevés sur le site public du
# fabricant (www.gamko.com/fr), Gamko n'ayant pas de portail revendeur. Même
# site et même médiathèque que Foster (groupe ITW).
#
#   python3 outils/gamko-visuels.py gamko-visuels.json [gamko-flexbar-logo.json]
#
# Les JSON sont produits dans le navigateur, sur le site Gamko :
#   — gamko-visuels.json : { réf.: { jpg (JPEG base64 de « <réf>_1.png » sur
#     fond blanc), etiq (statut HTTP de l'étiquette énergie), fiche
#     (« statut:type:taille » de la fiche technique générée par le site) } } ;
#   — gamko-flexbar-logo.json (facultatif) : { flexbar: brochure Flexbar
#     française (PDF base64), logo: logo Gamko (JPEG base64) }. Les postes
#     cocktail Flexbar n'ont pas de page produit : leurs photos sont extraites
#     de la brochure (PAGES_FLEXBAR).
#
# Ce script écrit :
#   — static/assets/produits/gamko/<réf>.jpg : recadrée sur le produit, carrée
#     800 x 800, fond blanc, sans métadonnées ;
#   — static/assets/marques/gamko.png (logo, si fourni) ;
#   — data/gamko-visuels.mjs : photo et LIENS vers les documents Gamko (fiche
#     technique, étiquette énergie, brochure de gamme).
#
# Python 3, Pillow et pdfimages (poppler). Ne fait pas partie du build.
#
# ⚠️  DROITS : reprise des visuels du site Gamko décidée par la direction
#     (décision du 30/10/2026 étendue à toutes les marques), sous sa
#     responsabilité.
# ---------------------------------------------------------------------------
import base64
import io
import json
import re
import subprocess
import sys
import tempfile
from datetime import date
from pathlib import Path
from urllib.parse import quote

from PIL import Image, ImageChops

if len(sys.argv) not in (2, 3):
    sys.exit('Usage : python3 outils/gamko-visuels.py <gamko-visuels.json> [gamko-flexbar-logo.json]')

racine = Path(__file__).resolve().parent.parent
d_img = racine / 'static/assets/produits/gamko'
d_img.mkdir(parents=True, exist_ok=True)

SITE = 'https://www.gamko.com'
COTE = 800
MARGE = 0.06
# Une fiche technique de 43 555 octets est la page générique que le site
# renvoie pour une référence qu'il ne connaît pas : on ne la lie pas.
FICHE_VIDE = 43555
BROCHURES = {
    'E3': 'French/E3.pdf',
    'GM': 'French/GM Line.pdf',
    'MG': 'French/Maxiglass.pdf',
    'LG': 'French/Maxiglass.pdf',
    'GF': 'French/Givreurs de verres.pdf',
    'XC': 'French/Flexbar.pdf',
}


def recadrer(im):
    im = im.convert('RGB')
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
    return Image.open(io.BytesIO(octets)) if octets[:2] == b'\xff\xd8' else None


def brochure(ref):
    for prefixe, chemin in BROCHURES.items():
        if ref.startswith(prefixe):
            return SITE + quote(f'/Files/Product assets/Downloads manually/Range brochure/{chemin}')
    return None


# Seules les photos qui illustrent une fiche (champ `visuel` de data/gamko.mjs)
# sont écrites. Certaines vues du site portent un bandeau « Best seller » :
# la fiche choisit alors une autre version du même modèle.
VISUELS = set(re.findall(r"visuel: '([0-9A-Z]+)'", (racine / 'data/gamko.mjs').read_text()))

principal = json.loads(Path(sys.argv[1]).read_text())
annexe = json.loads(Path(sys.argv[2]).read_text()) if len(sys.argv) == 3 else {}

visuels = {}
for ref, v in sorted(principal.items()):
    if not re.fullmatch(r'[0-9A-Z]+', ref):
        continue
    e = {}
    im = jpeg(v.get('jpg')) if ref in VISUELS else None
    if im:
        (d_img / f'{ref.lower()}.jpg').write_bytes(recadrer(im))
        e['photo'] = f'gamko/{ref.lower()}'
    statut, _, taille = (v.get('fiche') or '').partition(':')
    taille = taille.rpartition(':')[2]
    if statut == '200' and taille.isdigit() and int(taille) != FICHE_VIDE:
        e['fiche'] = f'{SITE}/fr/pdf?productid={ref}&pdf=true'
    if v.get('etiq') == 200:
        e['etiquette'] = SITE + quote(f'/Files/Product assets/Downloads Automatic/Energy labels/{ref}.pdf')
    if brochure(ref):
        e['gamme'] = brochure(ref)
    visuels[ref] = e

# Postes cocktail Flexbar : photos tirées de la brochure (page, rang de
# l'image sur la page, rang de son masque de détourage ou null), choisies sur
# planche contact — outils/gamko-flexbar-pages.json.
PAGES_FLEXBAR = json.loads((Path(__file__).with_name('gamko-flexbar-pages.json')).read_text()) if Path(__file__).with_name('gamko-flexbar-pages.json').exists() else {}
if annexe.get('flexbar') and PAGES_FLEXBAR:
    with tempfile.TemporaryDirectory() as tmp:
        pdf = Path(tmp) / 'flexbar.pdf'
        pdf.write_bytes(base64.b64decode(annexe['flexbar']))
        for ref, (page, rang, masque) in PAGES_FLEXBAR.items():
            sortie = Path(tmp) / f'p{page}'
            if not list(Path(tmp).glob(f'p{page}-*.png')):
                subprocess.run(['pdfimages', '-f', str(page), '-l', str(page), '-png', str(pdf), str(sortie)], check=True)
            images = sorted(Path(tmp).glob(f'p{page}-*.png'))
            if rang < len(images):
                im = Image.open(images[rang]).convert('RGB')
                if masque is not None:
                    # Image détourée : on la pose sur du blanc à travers son masque.
                    fond = Image.new('RGB', im.size, 'white')
                    fond.paste(im, (0, 0), Image.open(images[masque]).convert('L').resize(im.size))
                    im = fond
                (d_img / f'{ref.lower()}.jpg').write_bytes(recadrer(im))
                visuels.setdefault(ref, {})['photo'] = f'gamko/{ref.lower()}'

if annexe.get('logo'):
    logo = Image.open(io.BytesIO(base64.b64decode(annexe['logo']))).convert('RGB')
    diff = ImageChops.difference(logo, Image.new('RGB', logo.size, 'white')).convert('L').point(lambda v: 255 if v > 10 else 0)
    logo = logo.crop(diff.getbbox() or (0, 0, logo.width, logo.height))
    k = 600 / logo.width
    logo = logo.resize((600, round(logo.height * k)), Image.LANCZOS)
    logo.save(racine / 'static/assets/marques/gamko.png', optimize=True)
    print(f'logo {logo.size}')

(racine / 'data/gamko-visuels.mjs').write_text(
    f"""// FICHIER GÉNÉRÉ par outils/gamko-visuels.py — ne pas modifier à la main.
// Visuels repris du site public Gamko (gamko.com/fr) le {date.today().isoformat()},
// sur décision de la direction. Photos : static/assets/produits/gamko/. Les
// documents (fiche technique, étiquette énergie, brochure de gamme) restent
// hébergés chez Gamko.
export const visuelsGamko = {json.dumps(visuels, indent=2, ensure_ascii=False, sort_keys=True)};
"""
)
print(f"{sum('photo' in e for e in visuels.values())} photos, "
      f"{sum('fiche' in e for e in visuels.values())} fiches techniques, "
      f"{sum('etiquette' in e for e in visuels.values())} étiquettes énergie")
