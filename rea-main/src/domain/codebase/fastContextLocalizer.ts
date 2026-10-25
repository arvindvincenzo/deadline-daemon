import type { LocalizedHit } from "./codebaseTypes.js";

const STOPWORDS = new Set([
  "the", "a", "an", "of", "in", "to", "for", "where", "which", "what",
  "how", "is", "are", "does", "do", "and", "or", "on", "with", "file",
  "files", "line", "lines", "exact", "find", "show", "me", "my", "this",
  "that", "it", "code", "get", "set"
]);

export function extractQueryTerms(query: string): readonly string[] {
  const terms: string[] = [];
  const words = query.toLowerCase().split(/[^a-z0-9_]+/);

  for (const w of words) {
    if (w.length > 1 && !STOPWORDS.has(w)) {
      terms.push(w);
      // Sub-token splitting for camelCase or snake_case
      const subTokens = w.split("_");
      if (subTokens.length > 1) {
        for (const sub of subTokens) {
          if (sub.length > 1 && !STOPWORDS.has(sub) && !terms.includes(sub)) {
            terms.push(sub);
          }
        }
      }
    }
  }

  return terms;
}

export interface LocalizeSourceFile {
  readonly relPath: string;
  readonly content: string;
}

export function localizeQuery(
  files: readonly LocalizeSourceFile[],
  query: string,
  limit = 10
): readonly LocalizedHit[] {
  const terms = extractQueryTerms(query);
  if (terms.length === 0) return [];

  const hits: LocalizedHit[] = [];

  for (const f of files) {
    const lines = f.content.split("\n");
    const counts = new Map<string, number>();
    let firstLine = 0;
    let lastLine = 0;

    for (let i = 0; i < lines.length; i++) {
      const lower = lines[i].toLowerCase();
      let matched = false;

      for (const t of terms) {
        if (lower.includes(t)) {
          counts.set(t, (counts.get(t) ?? 0) + 1);
          matched = true;
        }
      }

      if (matched) {
        if (firstLine === 0) firstLine = i + 1;
        lastLine = i + 1;
      }
    }

    if (counts.size === 0) continue;

    let score = 0.0;
    const why: string[] = [];

    for (const t of terms) {
      const count = counts.get(t) ?? 0;
      if (count > 0) {
        score += count;
        why.push(`${t}:${count}`);
      }
    }

    // Path match bonus
    const lowerPath = f.relPath.toLowerCase();
    for (const t of terms) {
      if (lowerPath.includes(t)) {
        score += 3.0;
        why.push(`path:${t}`);
      }
    }

    hits.push({
      path: f.relPath,
      startLine: firstLine,
      endLine: lastLine,
      score,
      why: why.join(" "),
    });
  }

  // Sort descending by score
  hits.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.path.localeCompare(b.path);
  });

  return hits.slice(0, limit);
}
