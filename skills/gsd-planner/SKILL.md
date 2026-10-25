---
name: gsd-planner
description: Context-efficient task decomposition and wave-based execution planner. Splits complex project milestones into atomic, checkable sub-tasks, structures parallel execution waves, and enforces anti-context-rot discipline.
---

# Wave Planner — Context-Efficient Task Decomposition

The **gsd-planner** skill decomposes high-level milestones into atomic, self-contained execution tasks organized in **dependency-free parallel waves**.

It is engineered to prevent **Context Rot** by keeping each task unit small, verifiable, and strictly bounded.

---

## When to Use
- During Phase 3 (Milestone Schedule Drafting) of the deadline workflow.
- When a milestone involves multiple files across different layers (model, service, UI, test).
- To group tasks into parallel execution waves vs. sequential critical paths.

---

## The 3 Core Planning Laws

### 1. The Atomic Chunk Rule
- Every task must touch $\le 3$ files and be verifiable with a single test or build command.
- If a task requires touching 8 files, decompose it into smaller atomic steps.

### 2. Wave-Based Sequencing
- Group tasks into execution waves:
  - **Wave 1 (Foundation)**: Schema, models, and contract definitions (zero dependencies).
  - **Wave 2 (Logic & Adapters)**: Services and business workflows (depends only on Wave 1).
  - **Wave 3 (Presentation & UI)**: Screens, widgets, and microcopy (depends only on Wave 2).
  - **Wave 4 (Integration & Live QA)**: End-to-end verification, real device inspection.

### 3. File-Based State Externalization
- Tasks are written directly to `projectdeadline.md`.
- No task state is held solely in conversational memory. When a task finishes, its checkbox is marked immediately on disk.

---

## Output Report Format: Wave-Based Task Plan

```markdown
### 🌊 GSD Wave Execution Plan

#### Wave 1: Foundation (Zero Dependencies)
- [ ] Task 1.1: [Contract / Model definition] (Files: `lib/models/...`)
- [ ] Task 1.2: [Database migration script] (Files: `lib/db/...`)
*Verification*: Model & schema migration tests pass.

#### Wave 2: Core Logic & Adapters (Depends on Wave 1)
- [ ] Task 2.1: [Service implementation] (Files: `lib/services/...`)
- [ ] Task 2.2: [Decimation / Concurrency throttle] (Files: `lib/services/...`)
*Verification*: Service unit tests pass 100%.

#### Wave 3: UI & Microcopy (Depends on Wave 2)
- [ ] Task 3.1: [Widget & Screen implementation] (Files: `lib/features/...`)
- [ ] Task 3.2: [10-State UI handling & 48dp touch bounds]
*Verification*: Widget tests pass, zero RenderFlex overflows.

#### Wave 4: Live QA & Verification Seal (Depends on Wave 3)
- [ ] Task 4.1: [Live runtime inspection on target device/browser]
*Verification*: 0 errors in console/logcat, Turnkey Seal certified.
```
