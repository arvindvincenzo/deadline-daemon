# Deadline Daemon ⏱️⚡

[![CI](https://github.com/arvindvincenzo/deadline-daemon/actions/workflows/ci.yml/badge.svg)](https://github.com/arvindvincenzo/deadline-daemon/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node.js-22%2B-green.svg)](https://nodejs.org/)
[![Safety](https://img.shields.io/badge/Scanner_Safety-Strict_Read--Only-blueviolet.svg)](#strict-safety-invariants)
[![Skills](https://img.shields.io/badge/Skills-12_Specialized_Agents-orange.svg)](#the-12-specialized-agent-skills)

**Deadline Daemon** is an autonomous software engineering architecture that fuses deadline-driven execution with high-throughput codebase scanning.

It combines the **Deadline Method** (context-resilient execution, the executive review triad, and reactive guardrails) with the **Codebase Omni-Scanner** (zero-dependency streaming AST parsing, Personalized PageRank repomaps, and token-budgeted code folding).

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
        │        DEADLINE METHOD        │                             │     CODEBASE OMNI-SCANNER     │
        │    (Workflow & Governance)    │                             │    (Discovery & Inspection)   │
        ├───────────────────────────────┤                             ├───────────────────────────────┤
        │ • 4-Round Grill ➔ Plan Loop   │                             │ • Multi-Language AST Lexer    │
        │ • 3-Role Review Triad         │                             │ • Personalized PageRank (PPR) │
        │ • 7-Dimension Closure Matrix  │                             │ • Skeleton & Focus Code Folder│
        │ • Goldratt CCPM Buffer Engine │                             │ • FastContext BM25 Localizer  │
        │ • Context-Resilient Memory    │                             │ • Full Typed AST Signatures   │
        │ • Turnkey Verification Seal   │                             │ • STRICT ZERO-WRITE POLICY    │
        └───────────────┬───────────────┘                             └───────────────┬───────────────┘
                        │                                                             │
                        └──────────────────────────────┬──────────────────────────────┘
                                                       │
                                                       ▼
                                      ┌─────────────────────────────────┐
                                      │          NATIVE TOOLS           │
                                      │    (Atomic Authoring & Run)     │
                                      ├─────────────────────────────────┤
                                      │ • read_file / write_file        │
                                      │ • edit_file (Surgical diffs)    │
                                      │ • run_command (Tests, builds)   │
                                      └─────────────────────────────────┘
```

---

## Path-Based Project Topology

```
deadline-daemon/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Automated CI pipeline (Node 22/24 test runners)
├── docs/
│   ├── ARCHITECTURE.md            # Deep system architecture & invariants
│   ├── GRILL_AND_THRILL.md        # The 4-Round Critical Grill-Me Protocol
│   └── SCANNER.md                 # Omni-Scanner algorithm & API reference
├── packages/
│   └── scanner/                   # Codebase Omni-Scanner Engine
│       ├── src/
│       │   ├── domain/codebase/   # AST Lexer, RepoMap PageRank, Skeletonizer, FastContext
│       │   ├── application/       # SQLite incremental cache, Scanner Service
│       │   ├── contracts/         # Zod schemas, Tool contracts, strict read-only effects
│       │   └── server/            # MCP server dispatcher & tool registration
│       ├── scripts/               # Test runners & ts-loader
│       └── package.json           # Scanner package manifest
├── skills/                        # 12 Specialized Agent Skills
│   ├── deadline/                  # Master Deadline Orchestrator & Critical Thinker
│   ├── gsd-planner/               # Context-efficient wave-based task decomposition
│   ├── gstack-qa/                 # Live runtime visual QA & physical ergonomics
│   ├── plan-ceo-review/           # Customer value, moat audit, and cutlines
│   ├── plan-eng-review/           # SPOF elimination, ACH disproof, blast radius
│   ├── plan-design-review/        # Anti-slop UX, microcopy truth, 48x48dp bounds
│   ├── verification-loop/         # 6-phase hermetic build, lint, type & test score
│   ├── cso/                       # OWASP top 10 & secret leak audit
│   ├── ship/                      # Production shipping engine & clean hygiene
│   ├── change-impact/             # Inbound/outbound caller impact graph
│   ├── contract-first/            # Interface locking & validation boundaries
│   └── database-migrations/       # Zero-downtime reversible schema drift prevention
├── templates/
│   ├── project.md.tmpl            # Initial spec template
│   ├── projectdeadline.md.tmpl    # Production deadline tracking contract
│   └── walkthrough.md.tmpl        # Post-deadline delivery & verification seal
├── scripts/
│   ├── install.sh                 # Linux/macOS skills installer
│   ├── install.ps1                # Windows skills installer
│   ├── verify.sh                  # Linux/macOS quality gate runner
│   └── verify.ps1                 # Windows quality gate runner
├── .gitignore                     # Production Git ignore
├── CONTRIBUTING.md                # Community contribution guidelines
├── LICENSE                        # Apache 2.0 License
├── package.json                   # Root monorepo workspace manifest
└── README.md                      # Project documentation
```

---

## Quickstart

### 1. Install Skills
Install the 12 specialized skills into your local agent environment (`~/.gemini/config/skills` or `.agents/skills`):

**On Windows (PowerShell):**
```powershell
npm run install:skills
# or: powershell -ExecutionPolicy Bypass -File .\scripts\install.ps1
```

**On Linux / macOS (Bash):**
```bash
chmod +x ./scripts/install.sh
./scripts/install.sh
```

### 2. Run Quality Gate & Tests
Validate all 12 skills, templates, and the Codebase Omni-Scanner:

**On Windows:**
```powershell
npm run verify
# or: powershell -ExecutionPolicy Bypass -File .\scripts\verify.ps1
```

**On Linux / macOS:**
```bash
npm test
# or: ./scripts/verify.sh
```

---

## The 12 Specialized Agent Skills

| Skill | Path | Description |
| :--- | :--- | :--- |
| **`deadline`** | [`skills/deadline`](skills/deadline/SKILL.md) | **Master Orchestrator**: The Critical Thinker loop, 4-Round Grill-Me protocol, ACH hypothesis falsification, Goldratt CCPM buffer management, and zero-nudge autonomous execution. |
| **`gsd-planner`** | [`skills/gsd-planner`](skills/gsd-planner/SKILL.md) | Decomposes complex features into atomic, testable milestone waves under strict context-window ceilings. |
| **`gstack-qa`** | [`skills/gstack-qa`](skills/gstack-qa/SKILL.md) | Runtime UI inspector: drives Playwright or ADB to detect RenderFlex hazard stripes, text truncation, and $<48\times 48\text{dp}$ touch targets. |
| **`plan-ceo-review`** | [`skills/plan-ceo-review`](skills/plan-ceo-review/SKILL.md) | Evaluates user impact, competitive moats, and sets emergency scope cutlines before writing code. |
| **`plan-eng-review`** | [`skills/plan-eng-review`](skills/plan-eng-review/SKILL.md) | Audits system architecture for single points of failure (SPOFs), blast radius, and modules depth. |
| **`plan-design-review`** | [`skills/plan-design-review`](skills/plan-design-review/SKILL.md) | Eliminates UI slop: audits microcopy truth, interactive hit bounds, and all 10 screen lifecycle states. |
| **`verification-loop`** | [`skills/verification-loop`](skills/verification-loop/SKILL.md) | 6-phase hermetic verification scoring: build, types, linter, test coverage, security grep, and git diff. |
| **`cso`** | [`skills/cso`](skills/cso/SKILL.md) | Chief Security Officer audit: scans for hardcoded secrets, injection vectors, and broken access controls. |
| **`ship`** | [`skills/ship`](skills/ship/SKILL.md) | Release engine: validates pre-flight suites, generates manifests, and executes verified deployments. |
| **`change-impact`** | [`skills/change-impact`](skills/change-impact/SKILL.md) | Traces caller trees and affected screens to eliminate surprise regressions before code modification. |
| **`contract-first`** | [`skills/contract-first`](skills/contract-first/SKILL.md) | Locks interface schemas, DTOs, and serialization contracts before business logic is authored. |
| **`database-migrations`**| [`skills/database-migrations`](skills/database-migrations/SKILL.md) | Enforces non-blocking DDL, backward-compatible migrations, and tested rollback scripts. |

---

## Codebase Omni-Scanner Highlights

The integrated codebase scanner delivers high-throughput semantic analysis with zero external runtime dependencies:

| Capability | Traditional Scanners | **Codebase Omni-Scanner** |
| :--- | :--- | :--- |
| **AST Signatures** | Symbol name only (`│func:Run`) | **Full Typed Signatures** (`│func:Run(ctx: Ctx): Promise<Res>`) |
| **Graph Algorithm** | Uniform PageRank | **Personalized PageRank (PPR)** biased by query |
| **Code Folding** | Indiscriminately strips comments | **Preserves JSDoc/rustdoc** + dual `skeleton`/`focus` modes |
| **Lexical Search** | Substring / line frequency | **BM25 FastContext** with `camelCase`/`snake_case` sub-tokens |
| **Fuzzy Discovery** | Exact match only | **Levenshtein Typo Distance** suggestions |
| **Caching Engine** | External CGO bindings | **Zero-Dependency Native Node.js** (`node:sqlite`) |
| **Write Surface** | Includes file-modifying tools | **Strictly Read-Only Guarantee** (`writesFilesystem: false`) |

---

## Strict Safety Invariants

The scanner operates under a mathematically verified **Read-Only Invariant**:
- **Zero Disk Modification Tools**: The scanner contains no file editing, creating, patching, or deleting capabilities.
- All 4 scanner tools (`scan_codebase`, `search_codebase`, `inspect_codebase`, `trace_codebase`) enforce:
  ```typescript
  writesFilesystem: false,
  mutatesTarget: false,
  mayDiscardData: false,
  idempotent: true
  ```
- File authoring and modifications remain exclusively governed by native tools (`write_file`, `edit_file`) under the Deadline Method.

---

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
