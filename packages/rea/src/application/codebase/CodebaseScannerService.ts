import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { CodebaseIndexStore } from "./CodebaseIndexStore.js";
import { extractSymbolsAndEdges, detectLanguage } from "../../domain/codebase/codebaseLexer.js";
import { skeletonizeSource } from "../../domain/codebase/sourceSkeletonizer.js";
import { buildRepoMap, type RepoMapFile } from "../../domain/codebase/repoMapBuilder.js";
import { localizeQuery } from "../../domain/codebase/fastContextLocalizer.js";
import { scanDirectoryTree } from "../../domain/codebase/codebaseTreeScanner.js";
import type {
  CodebaseScanSummary,
  LocalizedHit,
  SourceSymbol,
  SymbolEdge,
} from "../../domain/codebase/codebaseTypes.js";

const DEFAULT_IGNORED = [
  ".git",
  ".agent-wt",
  ".agentguard",
  ".deps-cache",
  "node_modules",
  "vendor",
  "dist",
  "build",
  "target",
  ".dart_tool",
  "__pycache__",
  ".venv"
];

export class CodebaseScannerService {
  private readonly store: CodebaseIndexStore;

  constructor(cacheDbPath?: string) {
    this.store = new CodebaseIndexStore(cacheDbPath);
  }

  public scanCodebase(options: {
    root?: string;
    query?: string;
    op?: "scan" | "repomap" | "tree";
    budgetTokens?: number;
    depth?: number;
    focus?: string;
  }): { text: string; tokenEstimate: number } {
    const root = path.resolve(options.root ?? process.cwd());
    const op = options.op ?? "scan";
    const budgetTokens = options.budgetTokens ?? 2000;

    if (op === "tree") {
      const treeRes = scanDirectoryTree(root, root, { depth: options.depth ?? 3 });
      return {
        text: treeRes.renderedText,
        tokenEstimate: Math.ceil(treeRes.renderedText.length / 4),
      };
    }

    // Incremental index
    const files = this.collectSourceFiles(root);
    const repoFiles: RepoMapFile[] = [];
    const localizeFiles: { relPath: string; content: string }[] = [];

    for (const f of files) {
      const rel = path.relative(root, f).replace(/\\/g, "/");
      let content: string;
      try {
        content = fs.readFileSync(f, "utf-8");
      } catch {
        continue;
      }

      localizeFiles.push({ relPath: rel, content });

      const stat = fs.statSync(f);
      const mtime = stat.mtimeMs;
      const size = stat.size;
      const cached = this.store.getCachedFile(rel);

      if (cached && cached.mtimeMs === mtime && cached.size === size) {
        // Reuse cached symbols
        const symbols = this.store.searchSymbols("", 1000).filter(s => s.path === rel);
        const edges = this.store.getCalleesOf(rel);
        const { identifiers } = extractSymbolsAndEdges(rel, content);
        repoFiles.push({ relPath: rel, symbols, identifiers });
      } else {
        // Re-index
        const sha256 = crypto.createHash("sha256").update(content).digest("hex");
        const { symbols, edges, identifiers } = extractSymbolsAndEdges(rel, content);
        this.store.updateFile(rel, mtime, size, sha256, symbols, edges);
        repoFiles.push({ relPath: rel, symbols, identifiers });
      }
    }

    if (op === "repomap") {
      const mapRes = buildRepoMap(repoFiles, {
        budgetTokens,
        focus: options.focus ?? options.query,
      });
      return {
        text: mapRes.renderedText,
        tokenEstimate: mapRes.tokenEstimate,
      };
    }

    // op === "scan": Unified omni-context
    const query = options.query ?? "";
    const hits = query ? localizeQuery(localizeFiles, query, 5) : [];
    const syms = query ? this.store.searchSymbols(query, 5) : [];
    let callers: readonly SymbolEdge[] = [];
    let callees: readonly SymbolEdge[] = [];

    if (syms.length > 0) {
      callers = this.store.getCallersOf(syms[0].name);
      callees = this.store.getCalleesOf(syms[0].name);
    }

    const lines: string[] = [];
    lines.push(`scan "${query}" under ${root} (${files.length} source files indexed)`);

    if (hits.length > 0) {
      lines.push("\nLOCALIZED:");
      for (const h of hits) {
        lines.push(`  ${h.path}:${h.startLine}-${h.endLine}  score=${h.score}  (${h.why})`);
      }
    }

    if (syms.length > 0) {
      lines.push("\nSYMBOLS:");
      for (const s of syms) {
        lines.push(`  ${s.path}:${s.line}  ${s.kind} ${s.name} (${s.language})`);
      }
    } else if (query) {
      const suggestions = this.store.suggestSimilarSymbols(query, 3);
      if (suggestions.length > 0) {
        lines.push(`\nno symbols matching "${query}". Did you mean: ${suggestions.join(", ")}`);
      }
    }

    if (callers.length > 0 || callees.length > 0) {
      lines.push("\nCALL GRAPH:");
      for (const c of callers) lines.push(`  ${c.from} -> ${c.to} (${c.path})`);
      for (const c of callees) lines.push(`  ${c.from} -> ${c.to} (${c.path})`);
    }

    // Add structural repomap preview
    const repomapRes = buildRepoMap(repoFiles, {
      budgetTokens: Math.max(500, Math.floor(budgetTokens / 2)),
      focus: options.focus ?? query,
    });
    lines.push("\nSTRUCTURAL REPOMAP:");
    lines.push(repomapRes.renderedText);

    const fullText = lines.join("\n");
    return {
      text: fullText,
      tokenEstimate: Math.ceil(fullText.length / 4),
    };
  }

  public searchCodebase(options: {
    root?: string;
    query: string;
    op?: "search" | "grep" | "find" | "peek";
    limit?: number;
  }): string {
    const root = path.resolve(options.root ?? process.cwd());
    const op = options.op ?? "search";
    const limit = options.limit ?? 20;

    if (op === "search") {
      const syms = this.store.searchSymbols(options.query, limit);
      if (syms.length === 0) {
        const suggs = this.store.suggestSimilarSymbols(options.query, 3);
        if (suggs.length > 0) {
          return `no symbols matching "${options.query}". Did you mean:\n  - ${suggs.join("\n  - ")}`;
        }
        return `no symbols matching "${options.query}"`;
      }
      return syms
        .map(s => `${s.path}:${s.line}  ${s.kind} ${s.name} (${s.language}) - ${s.signature}`)
        .join("\n");
    }

    if (op === "peek") {
      const syms = this.store.searchSymbols(options.query, 1);
      if (syms.length === 0) {
        return `no symbol matching "${options.query}" to peek`;
      }
      const s = syms[0];
      const absPath = path.join(root, s.path);
      if (!fs.existsSync(absPath)) return `file not found: ${s.path}`;
      const content = fs.readFileSync(absPath, "utf-8");
      const skel = skeletonizeSource(s.path, content, {
        mode: "focus",
        focusSymbol: s.name,
      });
      return `PEEK ${s.kind} ${s.name} in ${s.path}:${s.line}\n\n${skel.renderedText}`;
    }

    // Default grep
    return `Search completed for "${options.query}"`;
  }

  public inspectCodebase(options: {
    root?: string;
    target: string;
    mode?: "skeleton" | "focus" | "full";
    focusSymbol?: string;
    startLine?: number;
    endLine?: number;
  }): string {
    const root = path.resolve(options.root ?? process.cwd());
    const targetPath = path.isAbsolute(options.target)
      ? options.target
      : path.join(root, options.target);

    if (!fs.existsSync(targetPath)) {
      // Try searching for symbol
      const syms = this.store.searchSymbols(options.target, 1);
      if (syms.length > 0) {
        const s = syms[0];
        const abs = path.join(root, s.path);
        const content = fs.readFileSync(abs, "utf-8");
        const skel = skeletonizeSource(s.path, content, {
          mode: "focus",
          focusSymbol: s.name,
        });
        return skel.renderedText;
      }
      return `target not found: ${options.target}`;
    }

    const content = fs.readFileSync(targetPath, "utf-8");
    const rel = path.relative(root, targetPath).replace(/\\/g, "/");

    if (options.mode === "full" || (options.startLine && options.endLine)) {
      const lines = content.split("\n");
      const start = Math.max(1, options.startLine ?? 1);
      const end = Math.min(lines.length, options.endLine ?? lines.length);
      const slice = lines.slice(start - 1, end).map((l, idx) => `${start + idx}\t${l}`);
      return `${rel} (lines ${start}-${end} of ${lines.length}):\n${slice.join("\n")}`;
    }

    const skel = skeletonizeSource(rel, content, {
      mode: options.mode ?? "skeleton",
      focusSymbol: options.focusSymbol,
    });
    return skel.renderedText;
  }

  public traceCodebase(options: {
    target: string;
    op?: "callers" | "callees";
  }): string {
    const op = options.op ?? "callers";
    if (op === "callers") {
      const edges = this.store.getCallersOf(options.target);
      if (edges.length === 0) return `no callers recorded for "${options.target}"`;
      return edges.map(e => `${e.from} -> ${e.to} (${e.path})`).join("\n");
    } else {
      const edges = this.store.getCalleesOf(options.target);
      if (edges.length === 0) return `no callees recorded for "${options.target}"`;
      return edges.map(e => `${e.from} -> ${e.to} (${e.path})`).join("\n");
    }
  }

  private collectSourceFiles(root: string): string[] {
    const patterns = new Set<string>(DEFAULT_IGNORED);
    const gitignorePath = path.join(root, ".gitignore");
    if (fs.existsSync(gitignorePath)) {
      try {
        const lines = fs.readFileSync(gitignorePath, "utf-8").split("\n");
        for (const ln of lines) {
          const trimmed = ln.trim();
          if (trimmed && !trimmed.startsWith("#")) {
            patterns.add(trimmed.replace(/\/$/, ""));
          }
        }
      } catch {}
    }

    const isIgnored = (rel: string, name: string): boolean => {
      if (patterns.has(name) || patterns.has(rel)) return true;
      for (const p of patterns) {
        if (rel === p || rel.startsWith(p + "/") || rel.includes("/" + p + "/")) {
          return true;
        }
      }
      return false;
    };

    const files: string[] = [];
    const maxFiles = 3000;

    function walk(dir: string): void {
      if (files.length >= maxFiles) return;
      let entries: fs.Dirent[];
      try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
      } catch {
        return;
      }

      for (const e of entries) {
        if (files.length >= maxFiles) break;
        const full = path.join(dir, e.name);
        const rel = path.relative(root, full).replace(/\\/g, "/");

        if (isIgnored(rel, e.name)) continue;

        if (e.isDirectory()) {
          walk(full);
        } else if (e.isFile()) {
          const lang = detectLanguage(rel);
          if (lang !== "unknown") {
            files.push(full);
          }
        }
      }
    }

    walk(root);
    return files;
  }

  public close(): void {
    this.store.close();
  }
}
