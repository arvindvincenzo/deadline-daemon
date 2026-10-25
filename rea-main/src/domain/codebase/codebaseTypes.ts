/**
 * Codebase Scanner Types
 * Domain models for repository-scale AST symbol extraction, repomap, tree, and localization.
 */

export type SymbolKind =
  | "func"
  | "method"
  | "class"
  | "interface"
  | "type"
  | "struct"
  | "enum"
  | "variable"
  | "constant";

export interface SourceSymbol {
  readonly name: string;
  readonly kind: SymbolKind;
  readonly path: string;
  readonly line: number;
  readonly col: number;
  readonly endLine: number;
  readonly language: string;
  readonly receiver?: string;
  readonly signature: string;
  readonly docstring?: string;
  readonly scipId?: string;
}

export interface SymbolEdge {
  readonly from: string;
  readonly to: string;
  readonly path: string;
  readonly kind: "call" | "import" | "inherits" | "implements";
}

export interface FileEntry {
  readonly path: string;
  readonly relPath: string;
  readonly size: number;
  readonly mtimeMs: number;
  readonly sha256: string;
  readonly language: string;
  readonly lineCount: number;
}

export interface LocalizedHit {
  readonly path: string;
  readonly startLine: number;
  readonly endLine: number;
  readonly score: number;
  readonly why: string;
}

export interface RepoMapResult {
  readonly renderedText: string;
  readonly tokenEstimate: number;
  readonly rankedFiles: readonly string[];
  readonly totalSymbols: number;
  readonly totalFiles: number;
}

export interface TreeScanResult {
  readonly renderedText: string;
  readonly totalFiles: number;
  readonly totalDirectories: number;
}

export interface CodebaseScanSummary {
  readonly query?: string;
  readonly root: string;
  readonly totalFiles: number;
  readonly localizedHits: readonly LocalizedHit[];
  readonly symbols: readonly SourceSymbol[];
  readonly callEdges: readonly SymbolEdge[];
  readonly repomap?: string;
  readonly tokenEstimate: number;
  readonly executionMs: number;
}
