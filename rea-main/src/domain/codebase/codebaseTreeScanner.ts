import * as fs from "node:fs";
import * as path from "node:path";
import type { TreeScanResult } from "./codebaseTypes.js";

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
  ".venv",
  ".idea",
  ".vscode"
];

const SECRET_PATTERNS = [
  /^\.env(?:\..*)?$/i,
  /^id_rsa(?:.*)?$/i,
  /.*\.pem$/i,
  /.*\.key$/i,
  /.*credentials.*\.json$/i,
  /.*secret.*\.json$/i
];

export interface TreeScanOptions {
  readonly depth?: number;
  readonly includeHidden?: boolean;
  readonly allowSecrets?: boolean;
  readonly maxEntriesPerDir?: number;
}

export function isSecretFile(name: string): boolean {
  return SECRET_PATTERNS.some(re => re.test(name));
}

function createIgnoreFilter(root: string) {
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

  return {
    ignores: (relPath: string, name: string): boolean => {
      if (patterns.has(name) || patterns.has(relPath)) return true;
      for (const p of patterns) {
        if (relPath === p || relPath.startsWith(p + "/") || relPath.includes("/" + p + "/")) {
          return true;
        }
      }
      return false;
    }
  };
}

export function scanDirectoryTree(
  root: string,
  dirPath = root,
  options: TreeScanOptions = {}
): TreeScanResult {
  const maxDepth = options.depth ?? 3;
  const allowSecrets = options.allowSecrets ?? false;
  const maxPerDir = options.maxEntriesPerDir ?? 200;

  const filter = createIgnoreFilter(root);

  let totalFiles = 0;
  let totalDirectories = 0;
  const lines: string[] = [];

  function walk(currentDir: string, currentDepth: number, prefix: string): void {
    if (currentDepth > maxDepth) return;

    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    let renderedCount = 0;

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.relative(root, fullPath).replace(/\\/g, "/");

      if (filter.ignores(relPath, entry.name)) {
        continue;
      }

      if (!allowSecrets && isSecretFile(entry.name)) {
        lines.push(`${prefix}[REDACTED SECRET] ${entry.name}`);
        continue;
      }

      if (renderedCount >= maxPerDir) {
        lines.push(`${prefix}… (${entries.length - renderedCount} entries hidden; narrow path or increase depth)`);
        break;
      }

      if (entry.isDirectory()) {
        totalDirectories++;
        lines.push(`${prefix}[DIR]  ${entry.name}`);
        walk(fullPath, currentDepth + 1, prefix + "  ");
      } else if (entry.isFile()) {
        totalFiles++;
        let sizeStr = "";
        try {
          const stat = fs.statSync(fullPath);
          sizeStr = ` (${stat.size} bytes)`;
        } catch {}
        lines.push(`${prefix}[FILE] ${entry.name}${sizeStr}`);
      }
      renderedCount++;
    }
  }

  const relRoot = path.relative(process.cwd(), root) || ".";
  lines.push(`/ [root: ${relRoot.replace(/\\/g, "/")}] (tree scan, depth ${maxDepth}):`);
  walk(dirPath, 1, "  ");

  return {
    renderedText: lines.join("\n"),
    totalFiles,
    totalDirectories,
  };
}
