# Deadline Daemon

**Deadline Daemon** is an autonomous engineering architecture combining rigorous, deadline-driven execution with forensic-grade, multi-target codebase scanning.

```
                               ┌──────────────────────────────────────────────┐
                               │               DEADLINE DAEMON                │
                               │        Autonomous Engineering Engine         │
                               └──────────────────────┬───────────────────────┘
                                                      │
                       ┌──────────────────────────────┴──────────────────────────────┐
                       │                                                             │
                       ▼                                                             ▼
       ┌───────────────────────────────┐                             ┌───────────────────────────────┐
       │        DEADLINE METHOD        │                             │        REA OMNI-SCANNER       │
       │    (Workflow & Governance)    │                             │    (Discovery & Inspection)   │
       ├───────────────────────────────┤                             ├───────────────────────────────┤
       │ • Interactive Grill & Plan    │                             │ • Multi-Language AST Lexer    │
       │ • Wave-Based Parallelism      │                             │ • PageRank Repomap (PPR)      │
       │ • Context Sufficiency Gate    │                             │ • Skeleton & Focus Folder     │
       │ • Strict Anti-Context-Rot     │                             │ • FastContext Localizer       │
       │ • 6-Phase Verification Loop   │                             │ • 130+ Binary & Dynamic Tools │
       │ • Production Ship Engine      │                             │ • STRICT ZERO-WRITE POLICY    │
       └───────────────────────────────┘                             └───────────────────────────────┘
```

---

## 1. Project Overview & Component Topology

| Component | Directory | Role & Authority |
| :--- | :--- | :--- |
| **Deadline Method** | `deadline method/deadline/` | Master execution workflow, verification protocols, anti-context-rot discipline, and 11 specialized agent skills. |
| **REA Omni-Scanner** | `rea-main/` | Unified codebase discovery, token-budgeted PageRank repomap, AST code skeletonization, and 130+ forensic reverse engineering tools. **Strictly Read-Only**. |
| **Daemons Gate Reference** | `daemons-gate/` | Reference architecture for pure AST parsing, token budgeting, and system-level gates. |

---

## 2. Upgraded REA Omni-Scanning Engine

REA has been elevated beyond Daemons Gate's scanning performance by synthesizing its core intelligence mechanisms into native Node 22/26 TypeScript using `node:sqlite`:

1. **Multi-Language AST Lexer (`src/domain/codebase/codebaseLexer.ts`):**
   - Pure, zero-dependency streaming symbol extraction across TypeScript, JavaScript, Python, Go, Rust, Dart, C/C++, Java, and Swift.
   - Extracts dense signatures (`func:name(args): ret`), preceding docstrings/JSDoc, and qualified SCIP identifiers (`path#Type#Method().`).

2. **Personalized PageRank RepoMap (`src/domain/codebase/repoMapBuilder.ts`):**
   - Weighted multigraph construction: $\text{weight} = \mu \times \sqrt{\text{refs}}$ (self-edges dampened to $0.1$).
   - Power iteration ($d = 0.85$, $30$ iterations) with **Topic-Sensitive / Personalized PageRank (PPR)** teleportation vectors biased toward query or focused files.
   - Greedy packing under strict token budgets (`budget_tokens`).

3. **Source Code Skeletonizer (`src/domain/codebase/sourceSkeletonizer.ts`):**
   - Space-efficient source views saving ~85% of LLM context window tokens.
   - **`mode: "skeleton"`**: Folds function bodies into single comment lines (`/* ... (N lines body omitted) ... */`), keeping classes, interfaces, and signatures visible.
   - **`mode: "focus"`**: Expands only the targeted symbol's implementation in full while keeping surrounding sibling functions folded.

4. **FastContext Query Localizer (`src/domain/codebase/fastContextLocalizer.ts`):**
   - Natural-language query localization with stopword filtering and sub-token splitting (camelCase and snake_case).
   - Generates line-level frequency scoring, path-affinity bonuses, and explanatory `Why` tags.

5. **Directory Tree Scanner (`src/domain/codebase/codebaseTreeScanner.ts`):**
   - Traverses directories with `.gitignore` compliance, depth bounds, and automatic secret redaction (`.env`, `*.pem`, `id_rsa`, `*.key`, `credentials.json`).

6. **Persistent Incremental SQLite Cache (`src/application/codebase/CodebaseIndexStore.ts`):**
   - Native Node standard-library `node:sqlite` (`DatabaseSync`).
   - Mtime and SHA-256 gating ensuring $<2\text{ms}$ incremental re-indexing.
   - Built-in Levenshtein edit-distance suggestion (`suggestSimilarSymbols`) to auto-correct agent typos and prevent wasted round-trips.

---

## 3. Strict Safety & Read-Only Invariants

REA operates under a **non-negotiable read-only invariant**:
- **ZERO write tools.** No `workspace_edit`, no `create`, no `patch`, no `delete`.
- All 4 new tools (`scan_codebase`, `search_codebase`, `inspect_codebase`, `trace_codebase`) are formally audited with:
  ```ts
  writesFilesystem: false,
  mutatesTarget: false,
  mayDiscardData: false,
  idempotent: true
  ```
- File modifications and workspace transactions remain exclusively governed by native agent tools under the Deadline Method.

---

## 4. Verification & Test Suite

The upgraded engine is verified with automated tests covering all domain models, storage engines, and safety floors:
```bash
node --experimental-strip-types --loader ./scripts/ts-loader.mjs scripts/verify_codebase_scanner.ts
```
Output:
```
=== Testing Codebase Scanner for REA ===
✔ CodebaseLexer: TS extraction passed
✔ CodebaseLexer: Go method extraction passed
✔ SourceSkeletonizer: skeleton and focus modes passed
✔ RepoMapBuilder: PageRank multigraph and budget packing passed
✔ FastContextLocalizer: term scoring and query ranking passed
✔ CodebaseIndexStore: SQLite storage and Levenshtein suggestion passed
✔ Strict Read-Only Audit: All 4 tools verified 100% read-only with ZERO write effects
✔ CodebaseScannerService: Full end-to-end scanning pass complete

ALL CODEBASE SCANNER TESTS PASSED! 🚀
```
