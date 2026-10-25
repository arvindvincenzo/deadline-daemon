import type { RepoMapResult, SourceSymbol } from "./codebaseTypes.js";

export interface RepoMapFile {
  readonly relPath: string;
  readonly symbols: readonly SourceSymbol[];
  readonly identifiers: ReadonlyMap<string, number>;
}

export interface BuildRepoMapOptions {
  readonly budgetTokens?: number;
  readonly focus?: string;
  readonly damping?: number;
  readonly iterations?: number;
}

export function buildRepoMap(
  files: readonly RepoMapFile[],
  options: BuildRepoMapOptions = {}
): RepoMapResult {
  const budgetTokens = options.budgetTokens ?? 2000;
  const damping = options.damping ?? 0.85;
  const iterations = options.iterations ?? 30;
  const focus = options.focus?.toLowerCase();

  const totalFiles = files.length;
  if (totalFiles === 0) {
    return {
      renderedText: "(empty codebase)",
      tokenEstimate: 0,
      rankedFiles: [],
      totalSymbols: 0,
      totalFiles: 0,
    };
  }

  // Map symbols to their declaring file
  const defOwners = new Map<string, string[]>();
  let totalSymbols = 0;

  for (const f of files) {
    totalSymbols += f.symbols.length;
    for (const s of f.symbols) {
      const existing = defOwners.get(s.name) ?? [];
      existing.push(f.relPath);
      defOwners.set(s.name, existing);
    }
  }

  // Build weighted multigraph: definer -> referencer
  // weight = mul * sqrt(refs), self-edges dampened by 0.1
  const weights = new Map<string, number>(); // key: `${definer}->${referencer}`
  const outSum = new Map<string, number>();

  for (const f of files) {
    for (const [ident, count] of f.identifiers) {
      const definers = defOwners.get(ident);
      if (!definers || definers.length === 0) continue;

      for (const def of definers) {
        const mul = def === f.relPath ? 0.1 : 1.0;
        const w = mul * Math.sqrt(count);
        const edgeKey = `${def}->${f.relPath}`;
        weights.set(edgeKey, (weights.get(edgeKey) ?? 0) + w);
        outSum.set(def, (outSum.get(def) ?? 0) + w);
      }
    }
  }

  // Personalized PageRank vector setup
  const n = totalFiles;
  let rank: Record<string, number> = {};
  const teleport: Record<string, number> = {};

  let focusCount = 0;
  for (const f of files) {
    rank[f.relPath] = 1.0 / n;
    if (focus && (f.relPath.toLowerCase().includes(focus) || f.symbols.some(s => s.name.toLowerCase().includes(focus)))) {
      teleport[f.relPath] = 1.0;
      focusCount++;
    } else {
      teleport[f.relPath] = 0.0;
    }
  }

  // Normalize teleportation vector
  if (focusCount > 0) {
    for (const k in teleport) {
      teleport[k] /= focusCount;
    }
  } else {
    for (const k in teleport) {
      teleport[k] = 1.0 / n;
    }
  }

  // Run PageRank iterations
  for (let it = 0; it < iterations; it++) {
    let dangling = 0.0;
    for (const f of files) {
      if ((outSum.get(f.relPath) ?? 0) === 0) {
        dangling += rank[f.relPath];
      }
    }

    const next: Record<string, number> = {};
    for (const f of files) {
      next[f.relPath] = (1.0 - damping) * teleport[f.relPath] + (damping * dangling) / n;
    }

    for (const [edgeKey, w] of weights) {
      const [from, to] = edgeKey.split("->");
      const fromOut = outSum.get(from) ?? 1.0;
      next[to] += damping * rank[from] * (w / fromOut);
    }
    rank = next;
  }

  // Sort files descending by PageRank score
  const ranked = [...files].sort((a, b) => {
    const ra = rank[a.relPath] ?? 0;
    const rb = rank[b.relPath] ?? 0;
    if (ra !== rb) return rb - ra;
    return a.relPath.localeCompare(b.relPath);
  });

  // Greedy packing under budgetTokens (1 token ~ 4 bytes)
  const output: string[] = [];
  let usedChars = 0;
  const maxChars = budgetTokens * 4;
  const packedFiles: string[] = [];

  for (const f of ranked) {
    const header = `${f.relPath}\n`;
    if (usedChars + header.length > maxChars) break;

    let fileBlock = header;
    packedFiles.push(f.relPath);

    const sortedSyms = [...f.symbols].sort((a, b) => a.line - b.line);
    for (const s of sortedSyms) {
      const sigLine = `│${s.kind}:${s.signature || s.name}\n`;
      if (usedChars + fileBlock.length + sigLine.length > maxChars) {
        break;
      }
      fileBlock += sigLine;
    }

    output.push(fileBlock);
    usedChars += fileBlock.length;
  }

  const renderedText = output.join("").trimEnd();
  const tokenEstimate = Math.ceil(usedChars / 4);

  return {
    renderedText,
    tokenEstimate,
    rankedFiles: packedFiles,
    totalSymbols,
    totalFiles,
  };
}
