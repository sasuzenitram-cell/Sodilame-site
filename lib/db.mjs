// ---------------------------------------------------------------------------
// Accès à la base de données
//
// En production : Neon Postgres, branché depuis Vercel (Marketplace → Neon).
// L'intégration injecte DATABASE_URL toute seule.
//
// En local (tests) : Postgres classique, via le pilote `pg`, activé quand
// DB_DRIVER vaut « pg ». Les requêtes SQL sont rigoureusement identiques.
//
// RÉVERSIBILITÉ : c'est du SQL standard. Un `pg_dump` suffit à tout emporter
// ailleurs. Aucune dépendance à une API propriétaire.
// ---------------------------------------------------------------------------

let _sql = null;

async function pilote() {
  if (_sql) return _sql;

  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
  if (!url) throw new Error('DATABASE_URL absente : la base n’est pas branchée.');

  if (process.env.DB_DRIVER === 'pg') {
    const { default: pg } = await import('pg');
    const pool = new pg.Pool({ connectionString: url, max: 3 });
    _sql = async (texte, params = []) => (await pool.query(texte, params)).rows;
  } else {
    const { neon } = await import('@neondatabase/serverless');
    const client = neon(url);
    _sql = async (texte, params = []) => await client.query(texte, params);
  }
  return _sql;
}

/** Exécute une requête paramétrée ($1, $2…) et renvoie les lignes. */
export async function q(texte, params = []) {
  const exec = await pilote();
  return exec(texte, params);
}

/** Première ligne, ou null. */
export async function q1(texte, params = []) {
  const r = await q(texte, params);
  return r[0] || null;
}

/** La base est-elle configurée ? (permet une dégradation propre) */
export const baseDisponible = () => !!(process.env.DATABASE_URL || process.env.POSTGRES_URL);

// ---------------------------------------------------------------------------
// Schéma — créé automatiquement au premier appel, idempotent.
// ---------------------------------------------------------------------------
let _pret = false;

export async function initSchema() {
  if (_pret) return;

  await q(`CREATE TABLE IF NOT EXISTS clients (
    id             SERIAL PRIMARY KEY,
    ref_dolibarr   TEXT,
    etablissement  TEXT NOT NULL,
    contact        TEXT NOT NULL DEFAULT '',
    email          TEXT NOT NULL UNIQUE,
    telephone      TEXT NOT NULL DEFAULT '',
    adresse        TEXT NOT NULL DEFAULT '',
    code_postal    TEXT NOT NULL DEFAULT '',
    commune        TEXT NOT NULL DEFAULT '',
    notes          TEXT NOT NULL DEFAULT '',
    actif          BOOLEAN NOT NULL DEFAULT TRUE,
    invite_le      TIMESTAMPTZ,
    connecte_le    TIMESTAMPTZ,
    cree_le        TIMESTAMPTZ NOT NULL DEFAULT now()
  )`);

  await q(`CREATE TABLE IF NOT EXISTS tarifs (
    ref         TEXT NOT NULL,
    cond_label  TEXT NOT NULL,
    prix_ht     NUMERIC(10,2),
    disponible  BOOLEAN NOT NULL DEFAULT TRUE,
    maj_le      TIMESTAMPTZ NOT NULL DEFAULT now(),
    maj_par     TEXT NOT NULL DEFAULT '',
    PRIMARY KEY (ref, cond_label)
  )`);

  await q(`CREATE TABLE IF NOT EXISTS commandes (
    id            SERIAL PRIMARY KEY,
    reference     TEXT NOT NULL UNIQUE,
    client_id     INTEGER REFERENCES clients(id) ON DELETE SET NULL,
    etablissement TEXT NOT NULL,
    contact       TEXT NOT NULL DEFAULT '',
    email         TEXT NOT NULL,
    telephone     TEXT NOT NULL DEFAULT '',
    adresse       TEXT NOT NULL DEFAULT '',
    code_postal   TEXT NOT NULL DEFAULT '',
    commune       TEXT NOT NULL DEFAULT '',
    message       TEXT NOT NULL DEFAULT '',
    total_ht      NUMERIC(10,2),
    statut        TEXT NOT NULL DEFAULT 'recue',
    note_interne  TEXT NOT NULL DEFAULT '',
    cree_le       TIMESTAMPTZ NOT NULL DEFAULT now(),
    maj_le        TIMESTAMPTZ NOT NULL DEFAULT now()
  )`);

  await q(`CREATE TABLE IF NOT EXISTS commande_lignes (
    id           SERIAL PRIMARY KEY,
    commande_id  INTEGER NOT NULL REFERENCES commandes(id) ON DELETE CASCADE,
    ref          TEXT NOT NULL DEFAULT '',
    nom          TEXT NOT NULL,
    marque       TEXT NOT NULL DEFAULT '',
    cond_label   TEXT NOT NULL DEFAULT '',
    qte          INTEGER NOT NULL DEFAULT 1,
    prix_ht      NUMERIC(10,2)
  )`);

  await q(`CREATE TABLE IF NOT EXISTS jetons (
    jeton_hash  TEXT PRIMARY KEY,
    email       TEXT NOT NULL,
    expire_le   TIMESTAMPTZ NOT NULL,
    utilise_le  TIMESTAMPTZ,
    cree_le     TIMESTAMPTZ NOT NULL DEFAULT now()
  )`);

  await q(`CREATE TABLE IF NOT EXISTS journal (
    id      SERIAL PRIMARY KEY,
    quand   TIMESTAMPTZ NOT NULL DEFAULT now(),
    qui     TEXT NOT NULL DEFAULT '',
    action  TEXT NOT NULL,
    detail  TEXT NOT NULL DEFAULT ''
  )`);

  await q(`CREATE INDEX IF NOT EXISTS idx_commandes_statut ON commandes(statut, cree_le DESC)`);
  await q(`CREATE INDEX IF NOT EXISTS idx_commandes_client ON commandes(client_id, cree_le DESC)`);
  await q(`CREATE INDEX IF NOT EXISTS idx_jetons_email ON jetons(email)`);

  _pret = true;
}

export async function tracer(qui, action, detail = '') {
  try {
    await q(`INSERT INTO journal (qui, action, detail) VALUES ($1,$2,$3)`, [qui, action, String(detail).slice(0, 800)]);
  } catch {
    /* le journal ne doit jamais bloquer une opération métier */
  }
}

// ---------------------------------------------------------------------------
// Statuts de commande
// ---------------------------------------------------------------------------
export const STATUTS = {
  recue: { label: 'Reçue', couleur: 'bleu', ordre: 1 },
  validee: { label: 'Validée', couleur: 'or', ordre: 2 },
  preparee: { label: 'Préparée', couleur: 'or', ordre: 3 },
  livree: { label: 'Livrée', couleur: 'vert', ordre: 4 },
  facturee: { label: 'Facturée', couleur: 'vert', ordre: 5 },
  annulee: { label: 'Annulée', couleur: 'rouge', ordre: 9 },
};
export const estStatut = (s) => Object.prototype.hasOwnProperty.call(STATUTS, s);
