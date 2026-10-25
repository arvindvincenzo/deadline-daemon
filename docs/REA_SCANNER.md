# REA Codebase Omni-Scanner — Architecture & API Reference

The **REA Codebase Omni-Scanner** is a forensic-grade, token-optimized repository comprehension engine embedded directly inside REA (`packages/rea`).

It synthesizes the high-throughput AST scanning of pure-Go daemons with the rich semantic analysis of modern TypeScript, running entirely on Node.js standard libraries (`node:sqlite`, `node:crypto`, `node:fs`) with **zero external dependencies**.

---

## 1. Core Architectural Pillars

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       REA CODEBASE OMNI-SCANNER                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Codebase Files] ──► [Multi-Language AST Lexer]                            │
│                              │                                              │
│                              ▼ (Dense Signatures + Qualified SCIP IDs)      │
│                     [Def-Use Multigraph]                                    │
│                              │                                              │
│                              ├───────────────┬────────────────┐             │
│                              ▼               ▼                ▼             │
│                       [Personalized    [Source Code     [FastContext        │
│                         PageRank]      Skeletonizer]     Localizer]         │
│                              │               │                │             │
│                              ▼               ▼                ▼             │
│                       [RepoMap Pack]   [Folded Code]   [Scored Hits]        │
│                              │               │                │             │
│                              └───────────────┼────────────────┘             │
│                                              ▼                              │
│                                   [SQLite Incremental Cache]                │
│                                     (<2ms Gated Lookups)                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Multi-Language AST Lexer (`src/domain/codebase/codebaseLexer.ts`)
- **Streaming Symbol Extraction**: Parses TypeScript, JavaScript, Python, Go, Rust, Dart, C/C++, Java, and Swift.
- **Typed Signatures**: Emits `func:name(args): ret` rather than bare names, giving LLMs complete interface context in a single scan.
- **Docstring Preservation**: Captures preceding JSDoc, rustdoc, and docstring headers.

### 1.2 Personalized PageRank RepoMap (`src/domain/codebase/repoMapBuilder.ts`)
- **Weighted Def-Use Multigraph**: Nodes are symbols/files; edges represent calls and references.
- **Personalized Teleportation (PPR)**: Unlike uniform PageRank, the random-walk teleportation vector is biased towards files and symbols matching the user's active query or focus files.
- **Greedy Token Packing**: Selects highest-scoring symbols until reaching the exact `budget_tokens` ceiling.

### 1.3 Source Code Skeletonizer (`src/domain/codebase/sourceSkeletonizer.ts`)
- **`mode: "skeleton"`**: Folds all method bodies into comments (`/* ... (N lines body omitted) ... */`), keeping classes, interfaces, and signatures visible. Conserves ~85% of tokens.
- **`mode: "focus"`**: Expands only the targeted symbol's body in full, keeping sibling functions folded.

### 1.4 FastContext Query Localizer (`src/domain/codebase/fastContextLocalizer.ts`)
- **Sub-Token Splitting**: Deconstructs `camelCase` and `snake_case` tokens into semantic constituents.
- **BM25 Lexical Ranking**: Ranks code chunks by keyword frequency with term proximity bonuses.

### 1.5 Persistent Incremental SQLite Cache (`src/application/codebase/CodebaseIndexStore.ts`)
- Uses Node.js native `node:sqlite` (`DatabaseSync`).
- SHA-256 + mtime invalidation ensures sub-2ms cached retrieval.
- **Levenshtein Typo Distance**: Offers `suggestSimilarSymbols` when an agent requests a misnamed function.

---

## 2. Tool Reference & Signatures

All 4 tools are registered with MCP contracts ensuring `writesFilesystem: false, mutatesTarget: false`:

### `scan_codebase`
Scans a repository and outputs a structured structural summary.
```typescript
interface ScanCodebaseInput {
  repo_path?: string;               // Target directory (default: workspace root)
  mode: "repomap" | "tree" | "overview";
  query?: string;                   // Query string to bias Personalized PageRank
  budget_tokens?: number;           // Hard token ceiling (default: 2000)
  max_depth?: number;               // For tree mode (default: 4)
  focus_paths?: string[];           // Explicit paths to boost in PageRank
}
```

### `search_codebase`
Locates symbols, terms, or patterns using FastContext BM25 scoring.
```typescript
interface SearchCodebaseInput {
  repo_path?: string;
  query: string;                    // Keywords or natural language query
  limit?: number;                   // Max results to return (default: 10)
}
```

### `inspect_codebase`
Reads source code with zero-allocation AST folding to preserve tokens.
```typescript
interface InspectCodebaseInput {
  file_path: string;                // Absolute or relative path to source file
  mode: "full" | "skeleton" | "focus";
  focus_symbol?: string;            // Symbol to unfold when mode is "focus"
  budget_lines?: number;            // Max lines to return
}
```

### `trace_codebase`
Traces inbound and outbound call graph paths across files.
```typescript
interface TraceCodebaseInput {
  repo_path?: string;
  symbol: string;                   // Target function/method name
  direction: "inbound" | "outbound" | "both";
  depth?: number;                   // Traversal depth (default: 2)
}
```

---

## 3. Strict Safety Invariants
- **ZERO Disk Writes**: Neither REA nor its codebase scanner ever create, delete, or modify workspace files.
- **Deterministic Token Bounds**: All output strings strictly conform to `budget_tokens` and `budget_lines` to prevent LLM context exhaustion.
