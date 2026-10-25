import { DatabaseSync } from "node:sqlite";
import * as crypto from "node:crypto";
import * as path from "node:path";
import * as fs from "node:fs";
import type { SourceSymbol, SymbolEdge } from "../../domain/codebase/codebaseTypes.js";

export interface CachedFileRecord {
  readonly path: string;
  readonly mtimeMs: number;
  readonly size: number;
  readonly sha256: string;
}

export class CodebaseIndexStore {
  private readonly db: DatabaseSync;

  constructor(dbPath?: string) {
    if (dbPath && dbPath !== ":memory:") {
      const dir = path.dirname(dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      this.db = new DatabaseSync(dbPath);
    } else {
      this.db = new DatabaseSync(":memory:");
    }
    this.initSchema();
  }

  private initSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS file_hashes (
        path TEXT PRIMARY KEY,
        mtime_ms INTEGER NOT NULL,
        size INTEGER NOT NULL,
        sha256 TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS symbols (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        kind TEXT NOT NULL,
        path TEXT NOT NULL,
        line INTEGER NOT NULL,
        col INTEGER NOT NULL,
        end_line INTEGER NOT NULL,
        language TEXT NOT NULL,
        receiver TEXT DEFAULT '',
        signature TEXT DEFAULT '',
        docstring TEXT DEFAULT '',
        scip_id TEXT DEFAULT ''
      );
      CREATE INDEX IF NOT EXISTS idx_sym_name ON symbols(name);
      CREATE INDEX IF NOT EXISTS idx_sym_path ON symbols(path);

      CREATE TABLE IF NOT EXISTS edges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        from_sym TEXT NOT NULL,
        to_sym TEXT NOT NULL,
        path TEXT NOT NULL,
        kind TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_edge_to ON edges(to_sym);
      CREATE INDEX IF NOT EXISTS idx_edge_from ON edges(from_sym);
    `);
  }

  public getCachedFile(relPath: string): CachedFileRecord | undefined {
    const stmt = this.db.prepare("SELECT path, mtime_ms, size, sha256 FROM file_hashes WHERE path = ?");
    const row = stmt.get(relPath) as { path: string; mtime_ms: number; size: number; sha256: string } | undefined;
    if (!row) return undefined;
    return {
      path: row.path,
      mtimeMs: Number(row.mtime_ms),
      size: Number(row.size),
      sha256: row.sha256,
    };
  }

  public updateFile(
    relPath: string,
    mtimeMs: number,
    size: number,
    sha256: string,
    symbols: readonly SourceSymbol[],
    edges: readonly SymbolEdge[]
  ): void {
    // Delete existing symbols & edges for this path
    this.db.prepare("DELETE FROM symbols WHERE path = ?").run(relPath);
    this.db.prepare("DELETE FROM edges WHERE path = ?").run(relPath);

    // Insert new symbols
    const insertSym = this.db.prepare(`
      INSERT INTO symbols(name, kind, path, line, col, end_line, language, receiver, signature, docstring, scip_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const s of symbols) {
      insertSym.run(
        s.name,
        s.kind,
        s.path,
        s.line,
        s.col,
        s.endLine,
        s.language,
        s.receiver ?? "",
        s.signature ?? "",
        s.docstring ?? "",
        s.scipId ?? ""
      );
    }

    // Insert edges
    const insertEdge = this.db.prepare(`
      INSERT INTO edges(from_sym, to_sym, path, kind)
      VALUES (?, ?, ?, ?)
    `);

    for (const e of edges) {
      insertEdge.run(e.from, e.to, e.path, e.kind);
    }

    // Upsert file hash
    this.db.prepare(`
      INSERT INTO file_hashes(path, mtime_ms, size, sha256, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(path) DO UPDATE SET
        mtime_ms = excluded.mtime_ms,
        size = excluded.size,
        sha256 = excluded.sha256,
        updated_at = excluded.updated_at
    `).run(relPath, mtimeMs, size, sha256, Date.now());
  }

  public searchSymbols(query: string, limit = 20): readonly SourceSymbol[] {
    const q = `%${query.toLowerCase()}%`;
    const stmt = this.db.prepare(`
      SELECT name, kind, path, line, col, end_line, language, receiver, signature, docstring, scip_id
      FROM symbols
      WHERE lower(name) LIKE ? OR lower(scip_id) LIKE ?
      ORDER BY path, line
      LIMIT ?
    `);

    const rows = stmt.all(q, q, limit) as any[];
    return rows.map(r => ({
      name: r.name,
      kind: r.kind,
      path: r.path,
      line: r.line,
      col: r.col,
      endLine: r.end_line,
      language: r.language,
      receiver: r.receiver || undefined,
      signature: r.signature || undefined,
      docstring: r.docstring || undefined,
      scipId: r.scip_id || undefined,
    }));
  }

  public getCallersOf(sym: string): readonly SymbolEdge[] {
    const stmt = this.db.prepare(`
      SELECT from_sym, to_sym, path, kind
      FROM edges
      WHERE to_sym = ?
      ORDER BY path
    `);
    const rows = stmt.all(sym) as any[];
    return rows.map(r => ({
      from: r.from_sym,
      to: r.to_sym,
      path: r.path,
      kind: r.kind,
    }));
  }

  public getCalleesOf(sym: string): readonly SymbolEdge[] {
    const stmt = this.db.prepare(`
      SELECT from_sym, to_sym, path, kind
      FROM edges
      WHERE from_sym = ?
      ORDER BY path
    `);
    const rows = stmt.all(sym) as any[];
    return rows.map(r => ({
      from: r.from_sym,
      to: r.to_sym,
      path: r.path,
      kind: r.kind,
    }));
  }

  public suggestSimilarSymbols(query: string, limit = 3): readonly string[] {
    const lowQ = query.toLowerCase();
    const stmt = this.db.prepare("SELECT DISTINCT name FROM symbols");
    const rows = stmt.all() as { name: string }[];

    const scored: { name: string; dist: number }[] = [];
    const maxDist = Math.max(1, Math.floor(query.length / 3));

    for (const r of rows) {
      const dist = levenshtein(lowQ, r.name.toLowerCase());
      if (dist <= maxDist) {
        scored.push({ name: r.name, dist });
      }
    }

    scored.sort((a, b) => a.dist - b.dist);
    return scored.slice(0, limit).map(s => s.name);
  }

  public close(): void {
    this.db.close();
  }
}

function levenshtein(a: string, b: string): number {
  const la = a.length;
  const lb = b.length;
  if (la === 0) return lb;
  if (lb === 0) return la;

  const v0 = new Array(lb + 1);
  const v1 = new Array(lb + 1);
  for (let i = 0; i <= lb; i++) v0[i] = i;

  for (let i = 0; i < la; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < lb; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v0[j + 1] + 1, v1[j] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= lb; j++) v0[j] = v1[j];
  }
  return v1[lb];
}
