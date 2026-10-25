import type { SourceSymbol, SymbolEdge, SymbolKind } from "./codebaseTypes.js";

// Non-call keywords / noise to ignore when extracting call edges
const CALL_NOISE = new Set([
  "if", "for", "while", "switch", "return", "throw", "assert",
  "func", "function", "def", "class", "type", "var", "let", "const",
  "new", "delete", "elif", "else", "try", "except", "catch", "finally",
  "with", "match", "case", "do", "in", "not", "and", "or", "is",
  "lambda", "yield", "await", "async", "print", "len", "make", "append",
  "panic", "range", "super", "self", "this", "cls", "nil", "null",
  "true", "false", "none", "import", "export", "from", "package", "interface",
  "struct", "enum", "pub", "impl", "fn", "mut", "static", "void", "int", "string"
]);

const RE_CALL = /\b([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
const RE_IDENT = /\b[A-Za-z_][A-Za-z0-9_]*\b/g;

// Language definition patterns
const RE_GO_METHOD = /^\s*func\s*\(\s*(?:[A-Za-z0-9_*]+\s+)?\*?([A-Za-z0-9_]+)\s*\)\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(/;
const RE_GO_DEF = /^\s*(func|type)\s+([A-Za-z_][A-Za-z0-9_]*)/;
const RE_PY_DEF = /^[ \t]*(?:async[ \t]+)?(def|class)[ \t]+([A-Za-z_][A-Za-z0-9_]*)/;
const RE_JS_DEF = /^\s*(?:export\s+)?(?:default\s+)?(?:async\s+)?(function\*?|class|interface|type|enum)\s+([A-Za-z_$][A-Za-z0-9_$]*)/;
const RE_JS_ARROW = /^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*(?::[^=]+)?=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][A-Za-z0-9_$]*)\s*=>/;
const RE_RUST_DEF = /^\s*(?:pub(?:\([^)]*\))?\s+)?(?:async\s+)?(fn|struct|enum|trait|type|impl)\s+([A-Za-z_][A-Za-z0-9_]*)/;
const RE_DART_DEF = /^\s*(?:@\w+\s+)*(?:(?:static|factory|const|final|abstract)\s+)*(?:(class|enum|mixin|extension)\s+([A-Za-z_][A-Za-z0-9_]*)|(?:[A-Za-z0-9_<>?,]+\s+)*([A-Za-z_][A-Za-z0-9_]*)\s*\([^)]*\)\s*(?:async\*?|sync\*?)?\s*(?::\s*[^;{]+)?\s*\{?)/;

export interface LexerResult {
  readonly symbols: readonly SourceSymbol[];
  readonly edges: readonly SymbolEdge[];
  readonly identifiers: ReadonlyMap<string, number>;
}

export function detectLanguage(relPath: string): string {
  const lower = relPath.toLowerCase();
  if (lower.endsWith(".ts") || lower.endsWith(".tsx")) return "typescript";
  if (lower.endsWith(".js") || lower.endsWith(".jsx") || lower.endsWith(".mjs") || lower.endsWith(".cjs")) return "javascript";
  if (lower.endsWith(".py")) return "python";
  if (lower.endsWith(".go")) return "go";
  if (lower.endsWith(".rs")) return "rust";
  if (lower.endsWith(".dart")) return "dart";
  if (lower.endsWith(".c") || lower.endsWith(".h")) return "c";
  if (lower.endsWith(".cpp") || lower.endsWith(".hpp") || lower.endsWith(".cc")) return "cpp";
  if (lower.endsWith(".java")) return "java";
  if (lower.endsWith(".swift")) return "swift";
  return "unknown";
}

export function extractSymbolsAndEdges(
  relPath: string,
  content: string,
  language = detectLanguage(relPath)
): LexerResult {
  const lines = content.split("\n");
  const symbols: SourceSymbol[] = [];
  const edges: SymbolEdge[] = [];
  const identifiers = new Map<string, number>();

  let currentContext = "";
  let currentReceiver = "";
  let pendingDocstring: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const lineNum = i + 1;

    // Track docstrings
    if (
      trimmed.startsWith("//") ||
      trimmed.startsWith("///") ||
      trimmed.startsWith("#") ||
      trimmed.startsWith("/*") ||
      trimmed.startsWith("*")
    ) {
      pendingDocstring.push(trimmed);
      continue;
    } else if (trimmed === "") {
      // Empty line retains docstrings if within 2 lines
      if (pendingDocstring.length > 5) {
        pendingDocstring = [];
      }
    }

    // Token frequency count for repomap PageRank
    RE_IDENT.lastIndex = 0;
    let identMatch: RegExpExecArray | null;
    while ((identMatch = RE_IDENT.exec(line)) !== null) {
      const id = identMatch[0];
      if (!CALL_NOISE.has(id)) {
        identifiers.set(id, (identifiers.get(id) ?? 0) + 1);
      }
    }

    let foundKind: SymbolKind | undefined;
    let foundName: string | undefined;
    let foundReceiver: string | undefined;
    let foundSig = trimmed;

    switch (language) {
      case "go": {
        const methodMatch = RE_GO_METHOD.exec(line);
        if (methodMatch) {
          foundKind = "method";
          foundReceiver = methodMatch[1];
          foundName = methodMatch[2];
        } else {
          const defMatch = RE_GO_DEF.exec(line);
          if (defMatch) {
            foundKind = defMatch[1] === "func" ? "func" : "struct";
            foundName = defMatch[2];
            if (foundKind === "struct") {
              currentReceiver = foundName;
            }
          }
        }
        break;
      }
      case "python": {
        const pyMatch = RE_PY_DEF.exec(line);
        if (pyMatch) {
          const rawKind = pyMatch[1];
          foundName = pyMatch[2];
          if (rawKind === "class") {
            foundKind = "class";
            currentReceiver = foundName;
          } else {
            foundKind = currentReceiver ? "method" : "func";
            foundReceiver = currentReceiver;
          }
        }
        break;
      }
      case "typescript":
      case "javascript": {
        const jsMatch = RE_JS_DEF.exec(line);
        if (jsMatch) {
          const rawKind = jsMatch[1].replace("*", "");
          foundName = jsMatch[2];
          if (rawKind === "class") {
            foundKind = "class";
            currentReceiver = foundName;
          } else if (rawKind === "interface") {
            foundKind = "interface";
          } else if (rawKind === "type") {
            foundKind = "type";
          } else if (rawKind === "enum") {
            foundKind = "enum";
          } else {
            foundKind = currentReceiver ? "method" : "func";
            foundReceiver = currentReceiver;
          }
        } else {
          const arrowMatch = RE_JS_ARROW.exec(line);
          if (arrowMatch) {
            foundKind = "func";
            foundName = arrowMatch[1];
          }
        }
        break;
      }
      case "rust": {
        const rsMatch = RE_RUST_DEF.exec(line);
        if (rsMatch) {
          const rawKind = rsMatch[1];
          foundName = rsMatch[2];
          if (rawKind === "fn") {
            foundKind = currentReceiver ? "method" : "func";
            foundReceiver = currentReceiver;
          } else if (rawKind === "struct") {
            foundKind = "struct";
            currentReceiver = foundName;
          } else if (rawKind === "trait") {
            foundKind = "interface";
          } else if (rawKind === "enum") {
            foundKind = "enum";
          } else if (rawKind === "type") {
            foundKind = "type";
          } else if (rawKind === "impl") {
            currentReceiver = foundName;
          }
        }
        break;
      }
      case "dart": {
        const dartMatch = RE_DART_DEF.exec(line);
        if (dartMatch) {
          if (dartMatch[1]) {
            foundKind = dartMatch[1] === "enum" ? "enum" : "class";
            foundName = dartMatch[2];
            currentReceiver = foundName;
          } else if (dartMatch[3] && !CALL_NOISE.has(dartMatch[3])) {
            foundKind = currentReceiver ? "method" : "func";
            foundName = dartMatch[3];
            foundReceiver = currentReceiver;
          }
        }
        break;
      }
    }

    if (foundName && foundKind) {
      let scipId = `${relPath}#${foundName}().`;
      if (foundReceiver) {
        scipId = `${relPath}#${foundReceiver}#${foundName}().`;
      }

      symbols.push({
        name: foundName,
        kind: foundKind,
        path: relPath,
        line: lineNum,
        col: line.indexOf(foundName) + 1,
        endLine: lineNum,
        language,
        receiver: foundReceiver,
        signature: foundSig.slice(0, 140),
        docstring: pendingDocstring.length > 0 ? pendingDocstring.join("\n") : undefined,
        scipId,
      });

      if (foundKind === "func" || foundKind === "method") {
        currentContext = foundReceiver ? `${foundReceiver}.${foundName}` : foundName;
      }
      pendingDocstring = [];
    }

    // Extract calls
    RE_CALL.lastIndex = 0;
    let callMatch: RegExpExecArray | null;
    while ((callMatch = RE_CALL.exec(line)) !== null) {
      const callee = callMatch[1];
      if (!CALL_NOISE.has(callee) && callee !== foundName && callee !== currentContext) {
        edges.push({
          from: currentContext || "(top)",
          to: callee,
          path: relPath,
          kind: "call",
        });
      }
    }
  }

  return { symbols, edges, identifiers };
}
