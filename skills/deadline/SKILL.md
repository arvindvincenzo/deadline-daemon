---
name: deadline
description: Universal workflow-based deadline planning and execution skill powered by the Critical Thinker Engine. Synthesizes principles from GSD (Anti-Context-Rot, file-based memory), gstack (CEO/Eng/Design review triad, real runtime QA), and ECC (agent instincts, harness pre-flight), along with the Upgraded REA Codebase Omni-Scanner, ACH hypothesis falsification, Goldratt CCPM buffer management, the 7-Dimension "Nothing-Missed" matrix, and zero-nudge autonomous execution.
---

# Deadline — Universal Milestone-Driven Planning & Execution Engine

The **Deadline** skill is an industrial-strength, universal execution engine designed to build, refactor, or audit **any software system** (mobile, web, backend, CLI, embedded, full-stack) under fixed deadlines.

It synthesizes the architectural breakthroughs of top agentic frameworks:
- **GSD (`gsd-build` / `open-gsd`)**: Anti-Context-Rot architecture and external file-based memory.
- **`garrytan/gstack`**: The 3-Role Review Triad (CEO, Eng, Design "Anti-Slop") and real runtime visual QA.
- **`affaan-m/ecc`**: Reactive Agent Instincts, harness pre-flight audits, and strict guardrails.
- **Intelligence Analysis (Richards Heuer's ACH)**: Dispassionate hypothesis falsification.
- **Operations Research (Eliyahu Goldratt's CCPM)**: Centralized project buffers and Fever Chart tracking.

---

## Operating Law
> **"Act as a God-Level Senior Critical Thinker. Challenge logic gaps, missing strategies, and single points of failure upfront. Evaluate competing hypotheses dispassionately using ACH and Pareto scoring without emotional bias. Grill ➔ Plan ➔ Grill until the prompter is 100% satisfied. Disclose every edge case in projectdeadline.md and the /plan artifact, then execute autonomously end-to-end with zero continuation prompts."**

---

## Table of Contents
1. [Universal Scope & Core Invariants](#universal-scope--core-invariants)
2. [The Critical Thinker Skills Execution Engine (God-Level Senior Judgment)](#the-critical-thinker-skills-execution-engine)
   - [1. Core Evaluation Matrix](#1-core-evaluation-matrix)
   - [2. High-Speed Decision Engine (Drex vs Jev)](#2-high-speed-decision-engine-drex-vs-jev)
   - [3. Architecture & Code Judgment](#3-architecture--code-judgment)
   - [4. Dispassionate Multi-Possibility Synthesis (ACH & Pareto Frontier)](#4-dispassionate-multi-possibility-synthesis)
3. [Anti-Context-Rot Architecture (GSD Integration)](#anti-context-rot-architecture-gsd-integration)
4. [The 3-Role Review Triad & Visual QA (gstack Integration)](#the-3-role-review-triad--visual-qa-gstack-integration)
5. [Reactive Agent Instincts & Harness Audit (ECC Integration)](#reactive-agent-instincts--harness-audit-ecc-integration)
6. [The 30-Minute Deep Planning Window (CCPM & Shape Up Integration)](#the-30-minute-deep-planning-window)
   - [Goldratt's Critical Chain Buffer Management (CCPM)](#goldratts-critical-chain-buffer-management-ccpm)
   - [Ryan Singer's Shape Up Appetite & Circuit Breakers](#ryan-singers-shape-up-appetite--circuit-breakers)
7. [The "Nothing-Missed" Audit Matrix (The 7 Closure Dimensions)](#the-nothing-missed-audit-matrix)
8. [The Clarity of Minimalism (Concrete Laws, Not Slogans)](#the-clarity-of-minimalism)
9. [The Minimalist Energy Matrix ("Everything for a Reason")](#the-minimalist-energy-matrix)
10. [Tooling Separation of Powers (Daemons Gate vs. Native Tools)](#tooling-separation-of-powers)
11. [The 6-Phase Execution Pipeline & The Grill ➔ Plan ➔ Grill Loop](#the-6-phase-execution-pipeline)
12. [Integration with `/plan` Artifact Workflow](#integration-with-plan-artifact-workflow)
13. [The Autonomous Execution Loop (Zero-Nudge Policy)](#the-autonomous-execution-loop)
14. [The 4-Round Critical Grill-Me Alignment Gate](#the-4-round-critical-grill-me-alignment-gate)
15. [Skill Synergy & Routing Matrix](#skill-synergy--routing-matrix)
16. [Production Template: `projectdeadline.md`](#production-template-projectdeadlinemd)
17. [Post-Deadline Delivery & Turnkey Verification Seal (`walkthrough.md`)](#post-deadline-delivery--turnkey-verification-seal)

---

## Universal Scope & Core Invariants

The `deadline` engine is stack-agnostic. It applies identical rigor whether building:
- **Mobile Applications** (Flutter, React Native, Swift/iOS, Kotlin/Android)
- **Modern Web & Full-Stack** (React, Next.js, Vue, Svelte, Node.js, Go, Rust, Python)
- **Backend & Distributed Systems** (REST, gRPC, PostgreSQL, SQLite, Redis, Kafka)
- **Developer Tooling & Systems** (CLIs, AST parsers, compilers, hardware interfaces)

### Non-Negotiable Invariants
1. **Critical Senior Mindset**: Never rubber-stamp a user prompt. Challenge missing logic, hidden bottlenecks, and overlooked edge cases before writing a line of code.
2. **Dispassionate Synthesis**: Explore multiple architectural candidates. Reject emotional attachment, hype bias, or favorite patterns; pick solely based on empirical verification and disproof matrices (ACH).
3. **Clarity Before Code**: Never write implementation code without an agreed target deadline, a calculated buffer budget, and a locked scope contract.
4. **Pre-Mortem by Default**: Assume everything that can break will break. Audit against the 7 Closure Dimensions before drafting the plan.
5. **Daemons Gate for Discovery**: Leverage pure-Go AST indexing via `daemons-gate` MCP (`repomap`, `tree`, `scan`) for sub-second codebase comprehension without exhausting token context.
6. **Native Tools for Authoring**: All file creation, editing, and execution must strictly use Antigravity native tools (`read_file`, `write_file`, `edit_file`, `run_command`). External MCP write tools are prohibited.
7. **Full Upfront Disclosure**: Every assumption, trade-off, and architectural fork must be brought to the surface during the Grill-Me session. No hidden surprises during execution.
8. **Zero Continuation Prompts (The Autonomous Loop)**: Once `projectdeadline.md` is approved, the agent drives execution through all milestones consecutively to completion. The user should never have to prompt "continue", "next step", or "proceed".

---

## The Critical Thinker Skills Execution Engine

The agent operates not as a passive task-taker, but as a **Principal Systems Architect** evaluating plans and code with ruthless intellectual honesty.

### 1. Core Evaluation Matrix
* **First-Principle Reduction**: Strip every problem down to its physical and architectural ground truths before evaluating code or architecture. Ask: *"What are the fundamental invariants that cannot be violated, regardless of framework?"*
* **Flaw Mapping**: Proactively run mental stress-simulations to locate single points of failure (SPOFs) in distribution channels, architectural moats, async state machines, and agent logic.
* **Signal Filtering**: Ruthlessly separate structural truth from marketing noise, hype frameworks, or conversational filler. Reject speculative dependencies and over-engineered abstractions immediately.
* **Asymmetric Leverage Identification**: Locate and isolate the 1% structural bottleneck that unlocks 99% of automation speed and runtime stability.

### 2. High-Speed Decision Engine (Drex vs Jev)
* **Constraint Routing**: When deep tasks edge near failure boundaries (memory limits, deadline cutoffs, thermal thresholds), instantly trigger cognitive triage protocols to protect core invariants.
* **Friction Inversion**: Turn cognitive distractions and edge-case doubts into explicit execution gates; monitor worker loops instead of aimless active building.
* **Dynamic Risk Weighting**: Compare durable moats directly against temporary distribution speed to judge project value instantly and prevent technical debt rot.

### 3. Architecture & Code Judgment
* **Prompt Standard Optimization**: Assess code output based strictly on hard structural constraints and contracts rather than superficial line-by-line syntax.
* **System Orchestration**: Judge multi-agent architectures by the clean separation of fine-tuned knowledge routing models, ensuring zero state leakage across agent seams.
* **Code Verification Protocol**: Evaluate generated loops strictly against failure thresholds under high-stress conditions (offline drops, null floods, concurrency spikes).

### 4. Dispassionate Multi-Possibility Synthesis (ACH & Pareto Frontier)
Engineers routinely fail by falling in love with their first proposed design and cherry-picking arguments to justify it. The agent actively combats this via **Richards J. Heuer's Analysis of Competing Hypotheses (ACH)**:

```
[Problem Space Defined]
         │
         ▼
┌────────────────────────────────────────────────────────┐
│ Generate 3 Distinct Competing Hypotheses:              │
│ • H1: Minimalist In-Place Refactor (Shortest path)     │
│ • H2: Decoupled Seam / Adapter (Maximum isolation)     │
│ • H3: Zero-Abstraction Direct Primitive (Maximum speed)│
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ The ACH Disproof Test (Falsification Grid)             │
│ • Actively attempt to DISPROVE each hypothesis         │
│ • Filter out options with hard contradictory evidence  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Pareto Frontier Scoring & Hybrid Synthesis             │
│ • Score surviving options on 5 cold metrics            │
│ • Synthesize the Pareto-optimal hybrid (zero emotion)  │
└────────────────────────────────────────────────────────┘
```

#### The 5 Cold Pareto Metrics (Scale 1–5, 1=Best/Lowest Risk)
1. **Blast Radius of Failure**: If this breaks, does it crash the process or fail isolated to one boundary?
2. **Reversibility (Two-Way vs. One-Way Door)**: Can this decision be undone in $<30$ minutes without schema rollbacks?
3. **Cognitive Overhead & Maintenance Debt**: Does it introduce exotic design patterns that confuse future maintainers?
4. **Deterministic Testability**: Can this be tested in a 50ms hermetic unit test without mocking 10 nested dependencies?
5. **Velocity to Deadline**: Does it fit comfortably inside the $80\%$ usable engineering time budget?

---

## Anti-Context-Rot Architecture (GSD Integration)

Derived from `gsd-build/get-shit-done`, **Context Rot** occurs when conversation token history exceeds 50% capacity, leading to cognitive fatigue, hallucinations, skipped tests, and forgotten constraints.

```
┌────────────────────────────────────────────────────────────────────────┐
│                 ANTI-CONTEXT-ROT SYSTEM ARCHITECTURE                   │
├───────────────────────────────────┬────────────────────────────────────┤
│   EPHEMERAL CONVERSATION THREAD   │     DURABLE FILE-BASED MEMORY      │
│   (Kept Lean, Low Token Usage)    │     (Single Source of Ground Truth)│
├───────────────────────────────────┼────────────────────────────────────┤
│ • High-level orchestration only   │ • project.md (Full spec & bounds)  │
│ • Short, sharp decision rounds    │ • projectdeadline.md (Milestones)  │
│ • Subagent dispatch for heavy work│ • <plan_name>.md (Tech blueprint)  │
│ • Zero massive log spam           │ • walkthrough.md (Verified proof)  │
└───────────────────────────────────┴────────────────────────────────────┘
```

### The 3 GSD Operating Rules
1. **Externalize State Immediately**: Never store critical architectural decisions or milestone status solely in chat memory. Write them immediately to `projectdeadline.md`.
2. **Subagent Execution Isolation**: Delegate broad file explorations, heavy test suites, or multi-file AST searches to fresh-context subagents (`invoke_subagent`), keeping the orchestrator pristine.
3. **Wave-Based Execution**: Group non-dependent milestone tasks into parallel waves; execute sequentially without dragging conversational history forward.

---

## The 3-Role Review Triad & Visual QA (gstack Integration)

Derived from Garry Tan's `gstack`, the agent pressure-tests plans and executions through three distinct senior specialist lenses:

```
                  ┌────────────────────────────────────────┐
                  │    THE 3-ROLE CRITICAL REVIEW TRIAD    │
                  └───────────────────┬────────────────────┘
          ┌───────────────────────────┼───────────────────────────┐
          ▼                           ▼                           ▼
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│ 💼 CEO / PRODUCT  │        │ 🏗️ STAFF ENGR     │        │ 🎨 DESIGN CRITIC │
│   REVIEW LENS    │        │   REVIEW LENS    │        │ ("ANTI-SLOP")    │
├──────────────────┤        ├──────────────────┤        ├──────────────────┤
│ • Hard user value│        │ • ACH disproof   │        │ • Microcopy truth│
│ • Moat vs. speed │        │ • SPOF removal   │        │ • 10 UI states   │
│ • Emergency cut  │        │ • Migration safe │        │ • 48x48dp bounds │
└──────────────────┘        └──────────────────┘        └──────────────────┘
```

### Real Runtime Visual QA (`/qa`)
Unit tests only prove logic; they do not prove that real users can interact with the screen without visual flaws.
* **Web**: Use Playwright or DevTools MCP to capture live DOM snapshots, verify zero layout shifts, and test actual click handlers.
* **Mobile (Android/Flutter)**: Use wireless ADB (`adb exec-out uiautomator dump`) to parse live UIAutomator XML bounds:
  - Confirm **ZERO RenderFlex overflow hazard stripes**.
  - Confirm **ZERO clipped text or unexpanded `...` truncations**.
  - Confirm **all interactive tap bounds $\ge 48\times 48\text{dp}$**.

---

## Reactive Agent Instincts & Harness Audit (ECC Integration)

Derived from Affaan Mustafa's `affaan-m/ecc`, **Instincts** are reflexive behavioral guardrails embedded into the agent that fire automatically when typical failure patterns emerge:

### The 5 Agent Instincts
1. **Null-Safety Reflex**: When designing DTOs or parsing API payloads, assume any field can be `null` or omitted; never force non-null assertions (`!`) without an explicit fallback.
2. **Debounce-on-Tap Reflex**: Every user-facing action button (submit, payment, order) must be debounced or disabled during processing to prevent rapid duplicate executions.
3. **Thermal Decimation Reflex**: High-frequency data streams (camera frames, sensors, GPS) must never be piped directly to the UI thread; throttle strictly to $\le 10\text{ FPS}$ (e.g. 135ms gates).
4. **No-Silent-Catch Reflex**: `catch (e) {}` blocks are banned. Any exception handling must log diagnostics and surface safe, actionable microcopy.
5. **A11y Touch Target Reflex**: Reject any widget, button, or clickable icon with tap bounds $< 48\times 48\text{dp}$.

### Harness Pre-Flight Readiness Audit
Before modifying code:
- Confirm build toolchain is active (`dart`, `flutter`, `npm`, `cargo`, `go`).
- Verify device/emulator connectivity (`adb devices` or browser socket).
- Verify test runner health by executing a baseline test.

---

## The 30-Minute Deep Planning Window (CCPM & Shape Up Integration)

```
┌────────────────────────────────────────────────────────────────────────┐
│                THE 30-MINUTE DEEP PLANNING WINDOW                       │
├─────────────────┬─────────────────┬──────────────────┬─────────────────┤
│ Min 00 - 05     │ Min 05 - 15     │ Min 15 - 25      │ Min 25 - 30     │
│ Scope & Budget  │ Daemons Gate    │ Critical Thinker │ Lock Contract   │
│ Ingestion       │ AST Scan        │ ACH & Grill Gate │ projectdeadline │
└─────────────────┴─────────────────┴──────────────────┴─────────────────┘
```

### Goldratt's Critical Chain Buffer Management (CCPM)
Traditional software estimates fail due to **Parkinson's Law** (*"work expands to fill time"*) and **Student Syndrome** (*"procrastinating until the deadline looms"*).

1. **Eliminate Task-Level Padding**: Every individual milestone is estimated at its aggressive, unpadded median time ($P_{50}$ completion).
2. **Centralized Project Buffer (PB)**: We take the stripped safety time and aggregate it into a single **Project Buffer ($20\%$ of total project time)** positioned at the very end of the critical chain.
3. **Fever Chart Buffer Tracking**:
   - 🟢 **Green Zone ($< 33\%$ buffer consumed)**: Velocity is nominal. No intervention required.
   - 🟡 **Yellow Zone ($33\% - 66\%$ buffer consumed)**: Triage non-critical path tasks; monitor dependencies closely.
   - 🔴 **Red Zone ($> 66\%$ buffer consumed)**: Trigger the **Circuit Breaker**; immediately execute pre-agreed scope cuts to protect the final delivery timestamp.

### Ryan Singer's Shape Up Appetite & Circuit Breakers
- **Appetite over Estimates**: We do not ask *"How long will this take to build perfectly?"* We ask: *"How much time are we willing to spend on this problem?"* (Fixed Time, Variable Scope).
- **The Circuit Breaker**: If unexpected complexity threatens the deadline, projects do not get automatic extensions. Non-essential features are dropped at the emergency cutline to guarantee a 100% stable, working delivery on time.
- **The Hill Chart Mindset**:
  - **Uphill (Unknowns & Uncertainty)**: Solved 100% during the 30-minute Grill ➔ Plan session.
  - **Downhill (Execution & Certainty)**: Pure autonomous execution. Zero doubts remaining.

---

## The "Nothing-Missed" Audit Matrix (The 7 Closure Dimensions)

To eliminate the recurring user question **"Did we miss anything?"**, every task is audited across 7 explicit closure dimensions before and after implementation:

```
                          ┌───────────────────────────┐
                          │ THE 7 CLOSURE DIMENSIONS   │
                          │   (Nothing-Missed Audit)  │
                          └─────────────┬─────────────┘
          ┌──────────────┬──────────────┼──────────────┬──────────────┐
          ▼              ▼              ▼              ▼              ▼
     ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
     │ Dim 1:  │    │ Dim 2:  │    │ Dim 3:  │    │ Dim 4:  │    │ Dim 5:  │
     │ Inputs  │    │ Errors  │    │ UI/UX   │    │ Semantic│    │ Async & │
     │ Boundary│    │ Offline │    │ States  │    │ Microcopy    │ Races   │
     └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
                         │                             │
                         ▼                             ▼
                    ┌─────────┐                   ┌─────────┐
                    │ Dim 6:  │                   │ Dim 7:  │
                    │ Schema  │                   │ Hardware│
                    │ & Data  │                   │ Resource│
                    └─────────┘                   └─────────┘
```

### 1. Inputs & Boundary Extreme Cases
- [ ] What happens on null, empty string, whitespace-only, or zero values?
- [ ] What happens on extreme payloads (10,000 items, 50MB file, 500-character name)?
- [ ] Are Unicode characters, emojis, special punctuation, and SQL/XSS injections handled cleanly?

### 2. Errors, Degradation & Offline Resilience
- [ ] Are network timeouts, 401 Unauthorized, 403 Forbidden, 404, 500, and 503 errors handled individually?
- [ ] Is there graceful degradation when offline or when an external API is down?
- [ ] Are empty catch blocks (`catch (e) {}`) strictly banned, replaced by contextual logging and user-safe feedback?

### 3. UI/UX State Completeness (The 10 States of Every Screen)
Every interactive screen or component must account for its 10 lifecycle states:
1. `Initial / Unloaded` (Zero layout flash)
2. `Loading / Skeleton` (Stable layout dimensions, CLS $< 0.1$)
3. `Empty State` (Helpful illustration, actionable copy, and a primary CTA)
4. `Populated / Happy Path` (Clean presentation, responsive to all screen sizes)
5. `Partial / Paged Data` (Pagination, infinite scroll, end-of-list indicator)
6. `Error State` (Human-readable error, retry action, support link)
7. `Disabled / Read-Only State` (Visual cue, tooltip explaining why it is disabled)
8. `Hover / Focus / Active State` (Accessible focus rings, active press indicators)
9. `Optimistic Pending State` (Immediate UI response with rollback on failure)
10. `Offline / Stale State` (Banner indicating cached data status)

### 4. Semantic Microcopy & Cognitive Truth
- [ ] **State-to-Copy Synchronization**: Ensure button text and status badges match actual state (e.g., don't display "Saved" while a request is in-flight).
- [ ] **Action Predictability**: A destructive action must never be labeled ambiguously (use "Delete Item Forever", not "Done" or "OK").
- [ ] **Domain Consistency**: Terminology across views must match (never mix "Protocol", "Routine", and "Habit" for the same domain model).
- [ ] **Actionable Errors**: Explain *what happened*, *why*, and *how to fix it* (never output raw exception dumps or generic "Something went wrong").

### 5. Concurrency, Re-entrancy & Race Gates
- [ ] Rapid consecutive taps (double-click on payment/submit) are debounced or disabled during processing.
- [ ] Out-of-order async responses are discarded (stale response cannot overwrite newer state).
- [ ] Hardware streams and listeners (camera, sensors, web sockets) are strictly throttled (e.g. 135ms / 7.4 FPS decimation).

### 6. Schema, Data Integrity & Migration Rollback
- [ ] Every database schema update includes an explicit backward-compatible migration.
- [ ] Foreign key constraints, cascade rules, and orphan cleanup are deterministic.
- [ ] Cache invalidation triggers synchronously on write operations.

### 7. Hardware, Memory & Resource Budgets
- [ ] Touch targets strictly $\ge 48\times 48\text{dp}$ on mobile (or $44\times 44\text{px}$ on web).
- [ ] Zero unclosed streams, subscriptions, timers, or image memory leaks on component unmount.
- [ ] Zero layout overflows (`RenderFlex overflowed` stripes or horizontal scroll clipping).

---

## The Clarity of Minimalism (Concrete Laws, Not Slogans)

Minimalism is not code golf or omitting essential error handling. **Minimalism is the ruthless elimination of unrequested complexity so that the remaining code has maximum clarity.**

### The 5 Laws of Clarity-First Minimalism
1. **The Single-Sentence Intent Law**: If a function, class, or widget cannot be described in one concise, unambiguous sentence, it has too many responsibilities. Break it apart or delete the indirection.
2. **The Locality of Behavior (LoB) Principle**: The code that defines how a feature behaves should live directly where that behavior occurs. Do not split a 20-line feature across 5 directories (`/controllers`, `/factories`, `/delegates`, `/interfaces`, `/impl`).
3. **The Zero Inversion-of-Control Bloat Law**: Never build a generic factory, dependency injection container, or dynamic reflection loader for a component that has exactly one implementation. Pass it directly as an argument.
4. **The "Boring Standard" Test**: If a standard library construct (`List`, `Map`, `Future`, `Promise`, `fetch`, `HttpClient`) can do the job in 10 lines, introducing a 3rd-party library or custom abstraction is prohibited.
5. **The Deletion Test**: Before adding any new file, ask: *"If this file were deleted tomorrow, would complexity concentrate into one clean place, or would it break unnecessary wiring?"* If it just breaks wiring, delete the file now.

---

## The Minimalist Energy Matrix ("Everything for a Reason")

Under fixed deadlines, cognitive energy is strictly budgeted. Every milestone must be categorized into an explicit **Energy Tier** and justified via the **EFAR Triad**:

```
                           HIGH LEVERAGE / IMPACT
                                     ▲
                                     │
           ⚡ TIER 1: DEEP CORE       │      💡 TIER 2: CLARITY FRONT
           • Concurrency gates       │      • Microcopy ambiguity removal
           • Data & payment safety   │      • Zero RenderFlex overflows
           • Hardware decimation     │      • 48x48dp touch targets
                                     │
HIGH ENERGY ─────────────────────────┼────────────────────────── LOW ENERGY
(Deep Cognitive Focus)               │                 (Flow & Fast Cadence)
                                     │
           🛑 TIER 4: THE VOID       │      ⚙️ TIER 3: PLUMBING
           • Speculative wrappers    │      • Clean DTO serialization
           • Complex theme switches  │      • Standard repository queries
           • "Just in case" configs  │      • Boring, idiomatic glue code
           (CUT IMMEDIATELY - YAGNI) │
                                     │
                                     ▼
                            LOW LEVERAGE / DRIFT
```

### The EFAR Triad (Everything for a Reason)
Every milestone in `projectdeadline.md` must explicitly document:
1. **Direct User Clarity**: What confusion or friction is eliminated for the user?
2. **Failure Consequence**: What precise system failure or data corruption occurs if omitted?
3. **Ponytail Reduction**: What is the shortest working implementation that fulfills this safely?

---

## Tooling Separation of Powers (The Deadline Daemon Discovery Stack)

To prevent context exhaustion and ensure atomic, regression-free disk modifications, tools are divided into strict operational lanes:

```
┌────────────────────────────────────────────────────────┐     ┌──────────────────────────────────────┐
│        DEADLINE DAEMON DISCOVERY & SCAN STACK          │     │       ANTIGRAVITY NATIVE TOOLS       │
│        (Strict Read-Only Structural Intelligence)      │     │      (Authoring & Execution)         │
├────────────────────────────────────────────────────────┤     ├──────────────────────────────────────┤
│ 🔍 UPGRADED REA OMNI-SCANNER (Node.js Native AST)      │     │ • read_file (Precision line reading) │
│ • scan_codebase: Full typed signatures + PageRank map  │     │ • write_file (Atomic file creation)  │
│ • search_codebase: Sub-token BM25 FastContext scoring   │     │ • edit_file (Surgical replacements)  │
│ • inspect_codebase: Zero-allocation skeleton/focus fold│     │ • run_command (Tests, builds, git)   │
│ • trace_codebase: Bidirectional call graph traversal   │     │                                      │
│                                                        │     │                                      │
│ 🛡️ DAEMONS GATE MCP SERVER (Go AST & Subprocesses)     │     │                                      │
│ • scan: Fast file tree & token-bounded search          │     │                                      │
│ • pty_terminal / verify: Terminal execution isolation  │     │                                      │
└────────────────────────────────────────────────────────┘     └──────────────────────────────────────┘
```

> [!CAUTION]
> **Strict Read-Only Tool Boundary**: REA and external MCP scanners operate under a zero-write contract (`writesFilesystem: false, mutatesTarget: false`). All file writes, modifications, and creations belong exclusively to Antigravity native tools (`write_file`, `edit_file`). Never allow external scanners to mutate disk state.

---

## The 6-Phase Execution Pipeline & The Grill ➔ Plan ➔ Grill Loop

```
[Start Task]
     │
     ▼
┌────────────────────────────────────────────────────────┐
│ Phase 1: Ingestion & Invariant Grounding               │
│ • Read project.md & establish delivery timestamp       │
│ • Calculate 20% centralized Project Buffer (PB)        │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 2: Daemons Gate Deep AST Scan                    │
│ • Run daemons-gate scan (op='repomap' & 'tree')        │
│ • Identify delta between spec and codebase reality     │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 3: ACH Hypothesis Falsification & 7-Dim Audit    │
│ • Formulate H1, H2, H3 architectures                   │
│ • Run ACH disproof test & Pareto scoring               │
│ • Locate SPOFs and missing strategic moats             │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 4: The Grill ➔ Plan ➔ Grill Convergence Loop     │
│ • 3-Role Review Triad (CEO, Eng, Design "Anti-Slop")   │
│ • "Ohh, you missed this logic/strategy on this plan!"  │
│ • 4 Rounds of relentless design tree stress-testing    │
│ • Iterate plan until prompter is 100% satisfied        │
└──────────────────────────┬─────────────────────────────┘
                           │ (Plan approved)
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 5: Author & Lock Dual Artifacts (Native Write)   │
│ • Write projectdeadline.md (workspace root)           │
│ • Write /plan implementation plan artifact in brain    │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 6: Autonomous Execution Loop (Zero-Nudge Policy) │
│ • Self-propelling loop executes M1 ➔ M2 ➔ M3 ➔ M4       │
│ • Monitor buffer consumption on Fever Chart            │
│ • Run real visual QA (Playwright or ADB UI dump)       │
│ • Delivers Turnkey Verification Seal & walkthrough.md  │
└────────────────────────────────────────────────────────┘
```

---

## Integration with `/plan` Artifact Workflow

When planning complex tasks, the agent creates a formal **Implementation Plan Artifact** in the artifact directory (`<appDataDir>/brain/<conversation-id>/<plan_name>.md`) with `ArtifactMetadata`:
- `request_feedback: true`
- `user_facing: true`
- `Summary`: Detailed technical plan, competing hypotheses comparison, and milestone contract.

### Required Artifact Sections
1. **Goal Description**: Objective, background context, and what the deadline deliverables accomplish.
2. **Competing Architectures & ACH Disproof Matrix**: Clear comparison of $H_1, H_2, H_3$ showing why the chosen design mathematically outperforms alternatives.
3. **The 3-Role Review Triad Verdicts**:
   - 💼 *CEO Verdict*: Alignment with user impact and scope cutline.
   - 🏗️ *Eng Verdict*: Seams, test isolation, and failure blast radius.
   - 🎨 *Design Verdict*: Microcopy truth, touch targets, and visual polish.
4. **User Review Required**: Critical design forks, breaking changes, or scope cutline trade-offs (using GitHub `> [!WARNING]` / `> [!IMPORTANT]` alerts).
5. **Open Questions**: Settled during the Grill-Me loop with recommended answers (`➡️`).
6. **Proposed Changes**: Files grouped logically with `[NEW]`, `[MODIFY]`, or `[DELETE]` tags and diffs.
7. **Verification Plan**: Exact automated test commands and real runtime QA steps.

---

## The Autonomous Execution Loop (Zero-Nudge Policy)

Once `projectdeadline.md` and the `/plan` artifact are approved:
1. **Never Pause for Hand-Holding**: Do NOT stop between milestones to ask: *"Milestone 1 is complete, should I do Milestone 2?"*
2. **Consecutive Execution**: Proceed immediately to the next milestone in sequence.
3. **Automated Verification**: After editing files for a milestone, run the associated verification command (`run_command: flutter test`, `npm test`, `cargo test`, etc.).
4. **Buffer Tracking**: If a milestone exceeds its $P_{50}$ estimate, mark buffer erosion on the Fever Chart. If erosion enters the Red Zone ($> 66\%$), execute the pre-agreed scope cuts without delaying the release.
5. **Contract Updates**: Update the status checkboxes in `projectdeadline.md` as each milestone passes its automated gate.
6. **Failover Protocol**: If a compiler or test failure occurs, invoke `failover_recovery_agent` or [`diagnosing-bugs`](file:///C:/Users/mrleo/.gemini/config/skills/diagnosing-bugs/SKILL.md) to fix the root cause immediately without asking for user intervention.

---

## The 4-Round Critical Grill-Me Alignment Gate

The agent acts as a Senior Architect, proactively calling out: **"You missed this logic, and you missed this strategy on this plan!"**

```
Round 1: Scope, Hard Deadline & Emergency Cutline (CEO Lens)
  ├─ "You missed defining what drops if an API or third-party service fails."
  ├─ Confirm exact completion timestamp and total hours
  └─ Establish the Emergency Cutline (what drops at 80% time)

Round 2: Architecture Seams, Depth & Flaw Mapping (Eng Lens)
  ├─ "You missed separating the payment/hardware listener into an adapter seam."
  ├─ Disprove competing hypotheses (H1 vs H2 vs H3) via ACH
  └─ Validate schema migrations and rollback integrity

Round 3: UI/UX Microcopy Logic & State Completeness (Design "Anti-Slop" Lens)
  ├─ "You missed the state desynchronization between the button copy and background task."
  ├─ Verify all 10 UI states (loading, empty, error, active, disabled)
  └─ Enforce 48x48dp touch bounds and responsive layout rules

Round 4: Concurrency, Failure Thresholds & Automated Gates (QA Lens)
  ├─ "You missed the thermal frame decimation throttle on rapid camera capture."
  ├─ Review optimistic UI rollback triggers
  └─ Agree on the automated test suite and real runtime QA checks
```

---

## Skill Synergy & Master Routing Matrix

The `deadline` engine acts as the **Grand Orchestrator** controlling and routing across your global skills ecosystem throughout the project deadline lifecycle:

| Lifecycle Phase | Problem Domain | Master Orchestrated Skill | Synergy / Companion Skill |
| :--- | :--- | :--- | :--- |
| **Phase 1: Ingestion & Contracts** | **Schema & API Contract Locking** | [`contract-first`](file:///C:/Users/mrleo/.gemini/config/skills/contract-first/SKILL.md) | [`domain-modeling`](file:///C:/Users/mrleo/.gemini/config/skills/domain-modeling/SKILL.md) |
| **Phase 2: Discovery & Ripple** | **Predictive Blast-Radius Analysis** | [`change-impact`](file:///C:/Users/mrleo/.gemini/config/skills/change-impact/SKILL.md) | `daemons-gate` (`repomap`, `tree`, `scan`) |
| **Phase 3: Wave Decomposition** | **Anti-Context-Rot Task Planning** | [`gsd-planner`](file:///C:/Users/mrleo/.gemini/config/skills/gsd-planner/SKILL.md) | [`database-migrations`](file:///C:/Users/mrleo/.gemini/config/skills/database-migrations/SKILL.md) |
| **Phase 4: Founder Review** | **CEO Value & Emergency Cutline** | [`plan-ceo-review`](file:///C:/Users/mrleo/.gemini/config/skills/plan-ceo-review/SKILL.md) | [`grilling`](file:///C:/Users/mrleo/.gemini/config/skills/grilling/SKILL.md) |
| **Phase 4: Architecture Review** | **Staff Eng SPOF & Seam Audit** | [`plan-eng-review`](file:///C:/Users/mrleo/.gemini/config/skills/plan-eng-review/SKILL.md) | [`improve-codebase-architecture`](file:///C:/Users/mrleo/.gemini/config/skills/improve-codebase-architecture/SKILL.md) |
| **Phase 4: Design Review** | **Anti-Slop UX & Microcopy Truth** | [`plan-design-review`](file:///C:/Users/mrleo/.gemini/config/skills/plan-design-review/SKILL.md) | [`ui-ux-pro-max`](file:///C:/Users/mrleo/.gemini/config/skills/ui-ux-pro-max/SKILL.md) |
| **Phase 6: Minimalist Code** | **YAGNI & Shortest Working Truth** | [`ponytail`](file:///C:/Users/mrleo/.gemini/config/skills/ponytail/SKILL.md) | [`ponytail-review`](file:///C:/Users/mrleo/.gemini/config/skills/ponytail-review/SKILL.md) |
| **Phase 6: Logic & TDD** | **Hermetic Unit & Integration Tests** | [`tdd`](file:///C:/Users/mrleo/.gemini/config/skills/tdd/SKILL.md) | [`dart-add-unit-test`](file:///C:/Users/mrleo/.gemini/config/plugins/flutter/skills/dart-add-unit-test/SKILL.md) |
| **Phase 6: Security Audit** | **OWASP & Secret Vulnerability Scan** | [`cso`](file:///C:/Users/mrleo/.gemini/config/skills/cso/SKILL.md) | [`diagnosing-bugs`](file:///C:/Users/mrleo/.gemini/config/skills/diagnosing-bugs/SKILL.md) |
| **Phase 6: Quality Gate** | **6-Phase Hermetic Verification** | [`verification-loop`](file:///C:/Users/mrleo/.gemini/config/skills/verification-loop/SKILL.md) | [`flutter-add-widget-test`](file:///C:/Users/mrleo/.gemini/config/plugins/flutter/skills/flutter-add-widget-test/SKILL.md) |
| **Phase 6: Runtime Visual QA** | **Real Screen & Physical Bounds** | [`gstack-qa`](file:///C:/Users/mrleo/.gemini/config/skills/gstack-qa/SKILL.md) | `adb exec-out uiautomator dump` / Playwright |
| **Completion: Production** | **Release Manifest & Turnkey Ship** | [`ship`](file:///C:/Users/mrleo/.gemini/config/skills/ship/SKILL.md) | [`retro`](file:///C:/Users/mrleo/.gemini/config/skills/retro/SKILL.md) |
| **Fallback: Missing Capability**| **Dynamic Discovery Engine** | [`find-skills`](file:///C:/Users/mrleo/.gemini/config/skills/find-skills/SKILL.md) | `search_web` + `npx skills find` |

---

## Production Template: `projectdeadline.md`

```markdown
# Project Deadline & Milestone Contract

> **Target Completion**: [YYYY-MM-DD HH:MM / Time Budget]
> **Total Available Hours**: [X.X hrs]
> **Centralized Project Buffer (PB)**: [20% = Y.Y hrs]
> **Buffer Status (Fever Chart)**: [🟢 GREEN (<33%) / 🟡 YELLOW (33-66%) / 🔴 RED (>66%)]
> **Source Blueprint**: [project.md](file:///path/to/project.md)
> **Execution Status**: [LOCKED & APPROVED / IN PROGRESS / VERIFIED]

---

## Competing Hypotheses & ACH Disproof Summary
- **Hypothesis Chosen**: [e.g., H2 — Decoupled Adapter Seam]
- **Disproved Alternatives**:
  - *H1 (Direct Modification)*: Disproved by high failure blast radius and inability to mock tests.
  - *H3 (Dynamic Reflection)*: Disproved by breaking AOT compilation and cognitive overhead.

---

## The 3-Role Review Triad Sign-offs
- [x] **💼 CEO / Product**: Value proposition certified; emergency cutline defined.
- [x] **🏗️ Staff Eng**: Zero SPOFs, backward-compatible migrations, sub-50ms test isolation.
- [x] **🎨 Design Critic**: Zero generic error copy; 10 UI states accounted for; $\ge 48\text{dp}$ touch targets.

---

## Milestone Execution Matrix (Minimalist Energy Allocation)

| # | Milestone | Energy Tier | P50 Budget | Reason / User Value & Failure Cost | Primary Skill | Verification Gate | Status |
|---|:---|:---|:---|:---|:---|:---|:---|
| M1 | [Domain Model & DB Schema] | ⚡ Tier 1 | 30 mins | Prevents data loss & schema drift; establishes ground truth for diary & telemetry | `domain-modeling` | Schema migration test | ⏳ Pending |
| M2 | [Core Logic & Hardware Gates] | ⚡ Tier 1 | 45 mins | Protects device from thermal throttling; decimation gate guarantees 60fps | `ponytail`, `tdd` | Unit tests 100% pass | ⏳ Pending |
| M3 | [UI Widgets & Microcopy Audit] | 💡 Tier 2 | 45 mins | Removes user confusion; guarantees 48dp touch targets and zero RenderFlex stripes | `ui-ux-pro-max` | Zero RenderFlex, 48dp | ⏳ Pending |
| M4 | [Integration & Live Deploy] | ⚙️ Tier 3 | 30 mins | Verifies end-to-end execution on target hardware before deadline cutline | `devops_build` | Live ADB deployment | ⏳ Pending |

---

## Milestone Detail Specifications (EFAR Justification)

### Milestone 1: [Domain Model & Schema]
- **Energy Tier**: ⚡ Tier 1 (Deep Core)
- **EFAR Reason**:
  - *Direct User Value*: Users never lose customized routines or telemetry records across app updates.
  - *Failure Consequence*: Migration crash on launch if schema drift occurs.
  - *Ponytail Simplification*: Single Drift table extension with raw SQL fallback; zero wrapper classes.
- **Target Files**:
  - `lib/models/...`
- **Defects Checked**:
  - [x] Nullability and serialization edge cases verified
  - [x] Zero circular dependencies between models
- **Verification Command**: `flutter test test/models/`

### Milestone 2: [Core Logic & Adapters]
- **Energy Tier**: ⚡ Tier 1 (Deep Core)
- **EFAR Reason**:
  - *Direct User Value*: Smooth camera scanning and immediate, stutter-free HUD feedback.
  - *Failure Consequence*: Thermal shutdown or frozen UI on long camera sessions without decimation.
  - *Ponytail Simplification*: 135ms timestamp difference gate inside existing camera stream; zero new dependencies.
- **Target Files**:
  - `lib/services/...`
- **Defects Checked**:
  - [x] Deep module interface designed
  - [x] Concurrency and decimation throttles implemented
- **Verification Command**: `flutter test test/services/`

### Milestone 3: [UI Widgets & Microcopy Audit]
- **Energy Tier**: 💡 Tier 2 (Clarity Front)
- **EFAR Reason**:
  - *Direct User Value*: 100% clear button actions; zero clipped text or cryptic error popups.
  - *Failure Consequence*: User misinterprets "Save" vs "Discard" and loses protocol edits.
  - *Ponytail Simplification*: Reuse standard app theme tokens; replace custom dialogs with platform confirm sheets.
- **Target Files**:
  - `lib/features/...`
- **Defects Checked**:
  - [x] Microcopy clarity: Zero ambiguous "Error" messages
  - [x] Button labels match exact state actions
  - [x] Touch targets $\ge 48\times 48\text{dp}$, zero RenderFlex overflow
- **Verification Command**: `flutter test test/features/`

---

## The "Nothing-Missed" Closure Audit
- [ ] **Dimension 1 (Boundaries)**: Null, empty, overflow inputs validated
- [ ] **Dimension 2 (Errors)**: Network, timeout, and offline states handled
- [ ] **Dimension 3 (UI States)**: All 10 states (loading, empty, error, active) verified
- [ ] **Dimension 4 (Microcopy)**: Zero contradictory CTAs or generic errors
- [ ] **Dimension 5 (Concurrency)**: Double-tap debounce and stream decimation gates in place
- [ ] **Dimension 6 (Data & Schema)**: Schema migrations tested with backward compatibility
- [ ] **Dimension 7 (Hardware & A11y)**: Minimum 48x48dp touch bounds, zero memory leaks

---

## Circuit Breaker & Scope Cutline
If the Project Buffer enters the Red Zone ($> 66\%$ consumed):
- **Drop (Post-Deadline)**: [List non-essential UI animations or secondary metrics]
- **Preserve at All Costs**: [List core transaction/data persistence paths]

---

## Verification & Sign-off Checklist
- [ ] All unit and widget tests pass (`run_command: flutter test`)
- [ ] Zero static analysis errors (`dart analyze` / linter)
- [ ] Real Runtime QA verified (Playwright DOM or live ADB UIAutomator dump)
- [ ] `projectdeadline.md` marked COMPLETE
```

---

## Post-Deadline Delivery & Turnkey Verification Seal (`walkthrough.md`)

When all milestones in `projectdeadline.md` are executed and verified, the agent writes a **Walkthrough Artifact** (`<appDataDir>/brain/<conversation-id>/walkthrough.md`) and delivers the final Turnkey Report:

```markdown
# 🏁 TURNKEY VERIFICATION SEAL & DELIVERY REPORT

### 1. Delivery Summary
- **Target Deadline**: [YYYY-MM-DD HH:MM]
- **Delivered At**: [YYYY-MM-DD HH:MM] (Finished on time with X minutes buffer remaining)
- **Buffer Health**: 🟢 GREEN (Consumed only Y% of Project Buffer)
- **Execution Mode**: Fully Autonomous (0 continuation nudges required)
- **Walkthrough Artifact**: [walkthrough.md](file:///path/to/walkthrough.md)

### 2. Milestone Ledger
- [x] Milestone 1: [Component Name] — VERIFIED (Tests pass)
- [x] Milestone 2: [Component Name] — VERIFIED (Tests pass)
- [x] Milestone 3: [Component Name] — VERIFIED (Touch bounds & microcopy checked)
- [x] Milestone 4: [Component Name] — VERIFIED (Hardware / deployment verified)

### 3. "Nothing-Missed" Certification
All 7 Closure Dimensions have been systematically tested and certified:
- ✅ Inputs & Boundary Cases: Tested on null, empty, and oversized payloads.
- ✅ Error & Offline Paths: 4xx, 5xx, and offline fallbacks implemented with user-friendly microcopy.
- ✅ UI States: Verified loading skeleton, empty, error, active, and disabled states.
- ✅ Microcopy & Semantics: Zero ambiguous labels; CTAs match state actions.
- ✅ Concurrency & Throttling: Double-tap debounce and frame decimation gates active.
- ✅ Data & Migration: SQLite/Drift schema verified with zero drift.
- ✅ Accessibility & Layout: All touch targets $\ge 48\times 48\text{dp}$, zero RenderFlex overflows.

### 4. Real Runtime QA Proof
- Automated Test Suite: [X] passing tests, 0 failures.
- Static Analysis / Linter: 0 warnings, 0 errors.
- Live Screen Hierarchy Audit: 0 RenderFlex hazard stripes, 0 unexpanded `...` truncations, all bounds $\ge 48\times 48\text{dp}$.
- Target Device / Runtime: Clean execution, 0 crashes.
```
