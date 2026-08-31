// ---------------------------------------------------------------------------
// GET /api/catalogue
//
// Prix et disponibilité en direct, consommés par les pages produits pour que
// toute modification faite dans l'administration soit visible immédiatement,
// sans redéploiement.
//
// Public : ces prix sont affichés sur le site. Aucune donnée client ici.
// ---------------------------------------------------------------------------
import { q, initSchema, baseDisponible } from '../lib/db.mjs';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  // Court cache partagé : soulage la base sans retarder visiblement une mise à jour.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');

  if (!baseDisponible()) {
    res.statusCode = 200;
    return res.end(JSON.stringify({ tarifs: [], source: 'fichier' }));
  }

  try {
    await initSchema();
    const rows = await q(`SELECT ref, cond_label, prix_ht, disponible FROM tarifs`);
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        source: 'base',
        tarifs: rows.map((r) => ({
          ref: r.ref,
          cond: r.cond_label,
          prix: r.prix_ht === null ? null : Number(r.prix_ht),
          dispo: r.disponible !== false,
        })),
      })
    );
  } catch (e) {
    console.error('Catalogue :', e?.message);
    // On ne casse jamais l'affichage : le site retombe sur les prix du build.
    res.statusCode = 200;
    res.end(JSON.stringify({ tarifs: [], source: 'fichier' }));
  }
}
