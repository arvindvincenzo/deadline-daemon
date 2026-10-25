# Deadline Architecture & Mechanics

This document details the internal systems, algorithms, and decision loops that power the **Deadline** execution engine.

---

## 1. The Anti-Context-Rot Subsystem

When AI models process conversations exceeding 50% context window utilization, they suffer from **Context Rot**:
- Attention dilution leads to skipped test suites.
- Forgetting constraints established in initial prompts.
- Hallucinating previous tool outputs.

### The Solution: Durable File-Based State
Deadline decouples the orchestrator from volatile conversation memory:
- **`project.md`**: Master blueprint of requirements and domain invariants.
- **`projectdeadline.md`**: Physical on-disk milestone ledger updated after each automated check.
- **Subagent Context Isolation**: Heavy codebase mapping (`daemons-gate`), extensive test runs, or deep refactors are delegated to fresh subagent instances, keeping the main loop pristine.

---

## 2. Richards Heuer's ACH Falsification Grid

Instead of confirmation-seeking evaluation, Deadline utilizes **Analysis of Competing Hypotheses (ACH)**:

```
[Target Architecture Problem]
             │
     ┌───────┴───────┐
     ▼               ▼
Option H1       Option H2       Option H3
(In-Place)      (Adapter)       (Direct)
     │               │               │
     └───────┬───────┘───────────────┘
             │
             ▼
[ACH Disproof Matrix (Falsification Grid)]
• Active search for contradictory evidence (-)
• Disprove vulnerable candidates
• Score surviving candidates on Pareto metrics
```

### The Pareto Frontier Scoring (1–5 scale, 1=Best)
1. **Blast Radius**: Process Crash (5) vs. Isolated Exception (1).
2. **Reversibility**: One-Way Schema Drop (5) vs. Two-Way Feature Flag (1).
3. **Cognitive Overhead**: Monolithic indirection (5) vs. Locality of Behavior (1).
4. **Deterministic Testability**: 10 nested mocks (5) vs. Hermetic 50ms test (1).
5. **Velocity to Deadline**: Exceeds budget (5) vs. Fits within 80% time (1).

---

## 3. Goldratt's CCPM Buffer Science

Deadline replaces individual task padding with **Centralized Project Buffers**:
- Every task estimate is cut to its median $P_{50}$ completion time.
- All safety margins are pooled into a single **$20\%$ Project Buffer (PB)** at the end of the critical chain.
- **Fever Chart Zones**:
  - 🟢 **Green Zone ($<33\%$)**: Normal velocity.
  - 🟡 **Yellow Zone ($33-66\%$)**: Triage non-critical feeding paths.
  - 🔴 **Red Zone ($>66\%$)**: Trigger **Circuit Breaker**; cut non-essential scope immediately.

---

## 4. The 7-Dimension Nothing-Missed Matrix
Before stamping any task complete, Deadline certifies 7 closure dimensions:
1. **Inputs & Boundaries** (nulls, empty, extreme sizes, Unicode)
2. **Errors & Offline** (HTTP 4xx/5xx, timeouts, offline fallbacks, no silent `catch`)
3. **UI/UX State Completeness** (All 10 states: initial, loading, empty, error, disabled, etc.)
4. **Microcopy Truth** (state synchronization, unambiguous CTAs)
5. **Concurrency & Throttling** (double-tap debounce, thermal decimation)
6. **Data & Schema Contracts** (backward compatibility, non-blocking migrations)
7. **Hardware & Ergonomics** (>=48dp touch targets, zero RenderFlex overflow)
