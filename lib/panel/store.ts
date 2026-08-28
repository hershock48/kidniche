import "server-only";

/**
 * Owner-panel storage: the database layer under /admin.
 *
 * Ported from scooplist/src/lib/store.ts, the account's newest copy of the
 * two-backend shape (glaze/catalog/apps.md), cut down to what the panel
 * needs today: one key -> jsonb value table. The blog table arrives with the
 * blog screen (session 2 of the panel plan), not before.
 *
 * Two backends behind one interface:
 *
 *   postgres   when a *_DATABASE_URL / *_POSTGRES_URL env var is set. One
 *              click in Vercel: project > Storage > Create Database > Neon,
 *              free tier, part of the hosting the site already has, so it
 *              does not break the "nothing rented" rule. The table creates
 *              itself on first use.
 *
 *   memory     fallback so local dev and the build need nothing. On deployed
 *              serverless this only holds within one warm lambda, so the
 *              admin shows a plain warning when it is on memory: a demo that
 *              half-works silently is worse than one that says what is wrong.
 *
 * Keys are org-scoped from day one even though kidniche is single-tenant,
 * because org-scoping by key prefix is what made scooplist's multi-tenant
 * flip free later. Single-tenant callers pass DEFAULT_ORG (every caller in
 * this repo). The prefix scheme is scooplist's settingKey verbatim: the
 * default org's keys are bare so a future adoption can relabel them in
 * place, and "org/{slug}/{key}" can never collide with a bare key.
 */

export const DEFAULT_ORG = "default";

type PanelStore = {
  backend: "postgres" | "memory";
  getValue<T>(orgId: string, key: string): Promise<T | null>;
  setValue(orgId: string, key: string, value: unknown): Promise<void>;
};

function scopedKey(orgId: string, key: string): string {
  return orgId === DEFAULT_ORG ? key : `org/${orgId}/${key}`;
}

/* ------------------------------ memory ------------------------------ */

function memoryBag(): Map<string, unknown> {
  const g = globalThis as typeof globalThis & { __panelContent?: Map<string, unknown> };
  if (!g.__panelContent) g.__panelContent = new Map();
  return g.__panelContent;
}

const memoryStore: PanelStore = {
  backend: "memory",
  async getValue(orgId, key) {
    return (memoryBag().get(scopedKey(orgId, key)) as never) ?? null;
  },
  async setValue(orgId, key, value) {
    memoryBag().set(scopedKey(orgId, key), value);
  },
};

/* ----------------------------- postgres ----------------------------- */

/**
 * The env var actually holding the database URL, by name. Scooplist's
 * connectionVar verbatim: the Vercel/Neon integration injects PREFIXED
 * names in real situations (observed: DATABASE_CASCARELLIS_DATABASE_URL,
 * with no dashboard path to rename it), and asking an operator to hand-copy
 * a secret between rows of the env screen cost a full evening. The
 * exact-suffix match keeps the sibling variants out (..._URL_UNPOOLED,
 * ..._PRISMA_URL, ..._URL_NO_SSL all end differently); keys are sorted so
 * two candidates resolve the same way on every boot.
 */
export function connectionVar(): string | null {
  const env = process.env;
  if (env.DATABASE_URL) return "DATABASE_URL";
  if (env.POSTGRES_URL) return "POSTGRES_URL";
  const keys = Object.keys(env).sort();
  return (
    keys.find((k) => k.endsWith("_DATABASE_URL") && env[k]) ??
    keys.find((k) => k.endsWith("_POSTGRES_URL") && env[k]) ??
    null
  );
}

function connectionString(): string | undefined {
  const name = connectionVar();
  return name ? process.env[name] : undefined;
}

type PgPool = {
  query: (sql: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;
};

async function pgPool(): Promise<PgPool> {
  const g = globalThis as typeof globalThis & { __panelPool?: PgPool; __panelReady?: Promise<unknown> };
  if (!g.__panelPool) {
    // Dynamic import so the dependency never loads unless a database is
    // actually configured (scooplist/devine pattern, unchanged).
    const { Pool } = await import("pg");
    const cs = connectionString();
    const local = /localhost|127\.0\.0\.1|\[::1\]/.test(cs ?? "") || cs?.includes("sslmode=disable");
    g.__panelPool = new Pool({
      connectionString: cs,
      ssl: local ? undefined : { rejectUnauthorized: false },
      max: 3,
    }) as unknown as PgPool;
    // "panel_", not "kidniche_": the table names belong to the panel, which
    // is headed for extraction once a second client proves it. Two installs
    // sharing one database would collide, and the answer to that is the org
    // scoping already in the keys, not per-site table names.
    g.__panelReady = g.__panelPool.query(`
      CREATE TABLE IF NOT EXISTS panel_content (
        key text PRIMARY KEY,
        data jsonb NOT NULL
      );
    `);
  }
  await g.__panelReady;
  return g.__panelPool;
}

const postgresStore: PanelStore = {
  backend: "postgres",
  async getValue(orgId, key) {
    const pool = await pgPool();
    const r = await pool.query(`SELECT data FROM panel_content WHERE key = $1`, [scopedKey(orgId, key)]);
    return (r.rows[0]?.data as never) ?? null;
  },
  async setValue(orgId, key, value) {
    const pool = await pgPool();
    await pool.query(
      `INSERT INTO panel_content (key, data) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET data = $2`,
      [scopedKey(orgId, key), JSON.stringify(value)],
    );
  },
};

export function getStore(): PanelStore {
  return connectionString() ? postgresStore : memoryStore;
}
