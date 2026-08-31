// ---------------------------------------------------------------------------
// GET /api/moi
//
// Renvoie l'état de connexion et, le cas échéant, les coordonnées du client
// pour pré-remplir le formulaire de commande. Consommé par la page statique
// /produits/ma-commande, qui reste ainsi entièrement en cache.
// ---------------------------------------------------------------------------
import { q1, initSchema, baseDisponible } from '../lib/db.mjs';
import { lireSession } from '../lib/auth.mjs';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  let session = null;
  try {
    session = lireSession(req);
  } catch {
    session = null; // SESSION_SECRET absente : on se comporte comme un visiteur.
  }

  if (!session) {
    res.statusCode = 200;
    return res.end(JSON.stringify({ connecte: false }));
  }

  if (session.role === 'admin') {
    res.statusCode = 200;
    return res.end(JSON.stringify({ connecte: true, role: 'admin', client: null }));
  }

  if (!baseDisponible()) {
    res.statusCode = 200;
    return res.end(JSON.stringify({ connecte: false }));
  }

  try {
    await initSchema();
    const c = await q1(
      `SELECT id, etablissement, contact, email, telephone, adresse, code_postal, commune, actif
         FROM clients WHERE id = $1`,
      [session.clientId]
    );
    if (!c || !c.actif) {
      res.statusCode = 200;
      return res.end(JSON.stringify({ connecte: false }));
    }
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        connecte: true,
        role: 'client',
        client: {
          etablissement: c.etablissement,
          contact: c.contact,
          email: c.email,
          telephone: c.telephone,
          adresse: c.adresse,
          codePostal: c.code_postal,
          commune: c.commune,
        },
      })
    );
  } catch (e) {
    console.error('Moi :', e?.message);
    res.statusCode = 200;
    res.end(JSON.stringify({ connecte: false }));
  }
}
