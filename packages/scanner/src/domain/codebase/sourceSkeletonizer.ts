/**
 * Source Code Skeletonizer
 * Folds function and method bodies into single-line markers while preserving:
 * 1. Leading docstrings and JSDoc/rustdoc/docstrings
 * 2. Class, interface, and struct declarations
 * 3. Exact function signatures and return types
 * 4. Mode 'focus' which renders the targeted symbol's body in full while folding siblings.
 */

export interface SkeletonOptions {
  readonly mode?: "skeleton" | "focus" | "symbol";
  readonly focusSymbol?: string;
  readonly maxLines?: number;
}

export interface SkeletonResult {
  readonly renderedText: string;
  readonly totalLines: number;
  readonly foldedBlocks: number;
  readonly omittedLines: number;
}

export function skeletonizeSource(
  relPath: string,
  content: string,
  options: SkeletonOptions = {}
): SkeletonResult {
  const mode = options.mode ?? "skeleton";
  const focus = options.focusSymbol?.toLowerCase();
  const lines = content.split("\n");
  const totalLines = lines.length;

  if (totalLines === 0 || content.trim().length === 0) {
    return {
      renderedText: `${relPath} (empty file)`,
      totalLines: 0,
      foldedBlocks: 0,
      omittedLines: 0,
    };
  }

  const isPython = relPath.toLowerCase().endsWith(".py");
  const output: string[] = [];
  let foldedBlocks = 0;
  let omittedLines = 0;

  if (isPython) {
    // Python indentation-based folding
    let i = 0;
    while (i < totalLines) {
      const line = lines[i];
      const trimmed = line.trim();
      const lineNum = i + 1;

      const isDef = trimmed.startsWith("def ") || trimmed.startsWith("async def ") || trimmed.startsWith("class ");
      if (isDef && !trimmed.endsWith("pass")) {
        const fnName = extractPyName(trimmed);
        const isFocused = mode === "focus" && focus && (fnName.toLowerCase() === focus || fnName.toLowerCase().includes(focus));

        output.push(`${lineNum}\t${line}`);
        i++;

        // If focused, render body lines normally
        if (isFocused) {
          continue;
        }

        // Fold until indentation returns to parent indent or lower
        const parentIndent = line.length - line.trimStart().length;
        let bodyEnd = i;
        while (bodyEnd < totalLines) {
          const nextLine = lines[bodyEnd];
          const nextTrim = nextLine.trim();
          if (nextTrim.length === 0) {
            bodyEnd++;
            continue;
          }
          const nextIndent = nextLine.length - nextLine.trimStart().length;
          if (nextIndent <= parentIndent) {
            break;
          }
          bodyEnd++;
        }

        const omitted = bodyEnd - i;
        if (omitted > 1) {
          const indent = " ".repeat(parentIndent + 4);
          output.push(`...\t${indent}# ... (${omitted} lines body omitted) ...`);
          foldedBlocks++;
          omittedLines += omitted;
          i = bodyEnd;
        }
        continue;
      }

      output.push(`${lineNum}\t${line}`);
      i++;
    }
  } else {
    // Brace-delimited languages (TS, JS, Go, Rust, Dart, C, C++, Java)
    let i = 0;
    while (i < totalLines) {
      const line = lines[i];
      const trimmed = line.trim();
      const lineNum = i + 1;

      const isFuncOrMethod =
        /^\s*(?:export\s+)?(?:default\s+)?(?:async\s+)?(?:function|func|fn|pub fn)\s+([A-Za-z0-9_$]+)/.test(line) ||
        /^\s*(?:@\w+\s+)*(?:(?:static|factory|const|final|abstract)\s+)*[A-Za-z0-9_<>?,]+\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{?/.test(line);

      if (isFuncOrMethod) {
        const fnName = extractBraceName(line);
        const isFocused = mode === "focus" && focus && (fnName.toLowerCase() === focus || fnName.toLowerCase().includes(focus));

        output.push(`${lineNum}\t${line}`);
        i++;

        if (isFocused) {
          continue;
        }

        // Find body opening brace
        let openLine = -1;
        if (line.includes("{")) {
          openLine = i - 1;
        } else {
          while (i < totalLines) {
            const nextL = lines[i];
            output.push(`${i + 1}\t${nextL}`);
            i++;
            if (nextL.includes("{")) {
              openLine = i - 1;
              break;
            }
            if (nextL.includes(";")) {
              // abstract declaration
              openLine = -1;
              break;
            }
          }
        }

        if (openLine === -1) {
          continue;
        }

        // Track matching closing brace
        let braceDepth = 1;
        let closeLine = -1;
        for (let j = i; j < totalLines; j++) {
          const ln = lines[j];
          for (let k = 0; k < ln.length; k++) {
            if (ln[k] === "{") braceDepth++;
            else if (ln[k] === "}") {
              braceDepth--;
              if (braceDepth === 0) {
                closeLine = j;
                break;
              }
            }
          }
          if (closeLine !== -1) break;
        }

        if (closeLine !== -1 && closeLine > i) {
          const omitted = closeLine - i;
          const indent = " ".repeat(4);
          output.push(`...\t${indent}/* ... (${omitted} lines body omitted) ... */`);
          output.push(`${closeLine + 1}\t${lines[closeLine]}`);
          foldedBlocks++;
          omittedLines += omitted;
          i = closeLine + 1;
          continue;
        }
      }

      output.push(`${lineNum}\t${line}`);
      i++;
    }
  }

  return {
    renderedText: output.join("\n"),
    totalLines,
    foldedBlocks,
    omittedLines,
  };
}

function extractPyName(line: string): string {
  const match = /^[ \t]*(?:async[ \t]+)?(?:def|class)[ \t]+([A-Za-z0-9_]+)/.exec(line);
  return match ? match[1] : "";
}

function extractBraceName(line: string): string {
  const match = /(?:function|func|fn|class|interface|struct)\s+([A-Za-z0-9_$]+)/.exec(line);
  if (match) return match[1];
  const methodMatch = /([A-Za-z0-9_$]+)\s*\([^)]*\)\s*\{?/.exec(line);
  return methodMatch ? methodMatch[1] : "";
}
