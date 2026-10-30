# ---------------------------------------------------------------------------
# Intègre les visuels et les liens documentaires INFRICO relevés sur les sites
# publics du fabricant : infrico.fr (catalogue général), infrico.com (caves à
# vin) et infricobuffet.com (buffets). Infrico n'a pas de portail revendeur.
#
#   python3 outils/infrico-visuels.py <dossier>
#
# Le dossier contient les JSON produits dans le navigateur :
#   — infrico-visuels.json : { img: { clé: [{ ref, src, jpg }] },
#                              docs: { réf.: { page, pdfs } } } (infrico.fr) ;
#   — infrico-caves.json, infrico-buffets.json : même forme (infrico.com,
#     infricobuffet.com) ;
#   — spec_status.json : { réf.: "200" } quand la fiche technique française
#     https://infricodocuments.com/infrico/spec_sheet/fr/<réf.>.pdf existe.
#
# Ce script écrit :
#   — static/assets/produits/infrico/<clé>.jpg : une photo par fiche, recadrée
#     sur le produit, carrée 800 x 800, fond blanc, sans métadonnées ;
#   — data/infrico-visuels.mjs : la photo de chaque fiche, et pour chaque
#     référence le LIEN vers sa fiche technique et vers le catalogue de sa
#     gamme, hébergés par Infrico (infricodocuments.com).
#
# Python 3 et Pillow. Ne fait pas partie du build.
#
# ⚠️  DROITS : reprise des visuels du site Infrico décidée par la direction le
#     30/10/2026, sous sa responsabilité (même décision que pour Miele,
#     RATIONAL et Foster).
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

if len(sys.argv) != 2:
    sys.exit('Usage : python3 outils/infrico-visuels.py <dossier des JSON>')

src = Path(sys.argv[1])
racine = Path(__file__).resolve().parent.parent
d_img = racine / 'static/assets/produits/infrico'
d_img.mkdir(parents=True, exist_ok=True)

COTE = 800
MARGE = 0.06
DOCS = 'https://infricodocuments.com/'

# Photo retenue pour chaque fiche (rang dans la liste relevée), choisie sur
# planche contact : vue du produit seul, sans écran de commande en gros plan,
# et la bonne taille d'appareil quand le site mélange les visuels.
CHOIX = {
    'efp': 2, 'fmpp': 1, 'agb1402': 1, 'agbpast701': 1, 'agb901': 1, 'vly': 1,
    # Cellules : le site associe à l'ABT7 et à l'ABT10 des visuels d'autres
    # modèles. ABT7 : même façade que l'ABT5 ; ABT10 : celui de l'ABT10 1L.
    'abt7': ('abt5', 0), 'abt10': ('abt14', 0), 'abt14': 1,
}


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


img, docs = {}, {}
for nom in ['infrico-visuels.json', 'infrico-caves.json', 'infrico-buffets.json']:
    o = json.loads((src / nom).read_text())
    img.update(o.get('img', {}))
    docs.update(o.get('docs', {}))
statut = json.loads((src / 'spec_status.json').read_text())

photos = {}
for cle in sorted(img):
    if not re.fullmatch(r'[a-z0-9]+', cle):
        continue
    choix = CHOIX.get(cle, 0)
    autre, rang = choix if isinstance(choix, tuple) else (cle, choix)
    liste = img.get(autre) or []
    if rang >= len(liste):
        continue
    octets = base64.b64decode(liste[rang]['jpg'])
    if octets[:2] != b'\xff\xd8':
        continue
    (d_img / f'{cle}.jpg').write_bytes(recadrer(octets))
    photos[cle] = f'infrico/{cle}'


def lien_doc(u):
    return u if isinstance(u, str) and re.fullmatch(r'https://infricodocuments\.com/[\w./%()-]+\.pdf', u) else None


references = sorted(set(docs) | set(statut))
documents = {}
for ref in references:
    e = {}
    if statut.get(ref) == '200':
        e['fiche'] = f"{DOCS}infrico/spec_sheet/fr/{quote(ref, safe='')}.pdf"
    pdfs = [lien_doc(u) for u in (docs.get(ref) or {}).get('pdfs', [])]
    pdfs = [u for u in pdfs if u]
    # Fiche technique propre à la référence (versions espagnole ou buffet,
    # trilingues ES/EN/FR) quand la française n'existe pas.
    if 'fiche' not in e:
        propre = [u for u in pdfs if ('/spec_sheet/' in u or '/fichas-tecnicas/' in u) and u.rsplit('/', 1)[-1] == f'{ref}.pdf']
        if propre:
            e['fiche'] = propre[0]
    gamme = [u for u in pdfs if '/catalogue/' in u or '/catalogo/' in u]
    if gamme:
        e['gamme'] = gamme[0]
    if e:
        documents[ref] = e

(racine / 'data/infrico-visuels.mjs').write_text(
    f"""// FICHIER GÉNÉRÉ par outils/infrico-visuels.py — ne pas modifier à la main.
// Visuels repris des sites publics Infrico (infrico.fr, infrico.com,
// infricobuffet.com) le {date.today().isoformat()}, sur décision de la direction
// (30/10/2026). Photos : static/assets/produits/infrico/. Les documents
// (fiche technique, catalogue de gamme) restent hébergés chez Infrico.
export const photosInfrico = {json.dumps(photos, indent=2, ensure_ascii=False, sort_keys=True)};

export const documentsInfrico = {json.dumps(documents, indent=2, ensure_ascii=False, sort_keys=True)};
"""
)
print(f"{len(photos)} photos, {sum('fiche' in e for e in documents.values())} fiches techniques, "
      f"{sum('gamme' in e for e in documents.values())} catalogues de gamme")
