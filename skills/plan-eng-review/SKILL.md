---
name: plan-eng-review
description: Staff Engineer and Engineering Manager-mode plan review. Audits technical architecture, identifies single points of failure (SPOFs), evaluates blast radius, tests module depth, and runs ACH hypothesis falsification.
---

# Plan Eng Review — Staff Engineer Architecture Audit

The **plan-eng-review** skill evaluates an implementation plan or architecture proposal from the perspective of a Staff Systems Engineer or Engineering Director.

It ensures that code changes are robust, deep, testable, and free of single points of failure before any code is written.

---

## When to Use
- During Phase 4 (Grill-Me Alignment Gate) of the deadline workflow.
- When evaluating architectural forks, database schema migrations, or third-party integrations.
- When assessing technical risk, failure blast radius, and hermetic testability.

---

## The 4 Staff Engineer Review Lenses

### 1. Single Point of Failure (SPOF) & Blast Radius Audit
- **What is the failure blast radius?** If this service, adapter, or query throws an unhandled exception or times out, does it crash the entire application or fail gracefully inside an isolated boundary?
- **Is there a single point of failure?** Are we relying on an unverified 3rd-party webhook, network socket, or unthrottled hardware stream without a fallback?

### 2. Module Depth & Locality (The Deletion Test)
- **Deep vs. Shallow**: Are interfaces simple while hiding substantial implementation complexity, or are we introducing shallow pass-through classes with 1:1 method forwarding?
- **Locality of Behavior**: Does the code that defines how a feature behaves live directly where the behavior occurs, or is it scattered across 5 directories?
- **The Deletion Test**: If this abstraction were deleted tomorrow, does complexity concentrate into one clean place, or does it merely break wiring?

### 3. ACH Falsification Grid
- Does the plan examine at least two competing architectural hypotheses?
- Has the author actively attempted to **disprove** the alternatives rather than cherry-picking arguments to support their favorite pattern?

### 4. Hermetic Test Surface
- Can the changes be tested with fast ($<50\text{ms}$), deterministic unit tests?
- Are dependencies decoupled via clean interface seams so tests do not require 10 nested mocks?

---

## Output Report Format: Eng Review Brief

```markdown
### 🏗️ Staff Eng Architecture Review

- **Target Plan**: [Plan Name / Path]
- **Architectural Seam**: [Adapter / Direct / Facade]
- **Blast Radius Rating**: [Isolated (Low) / Subsystem (Med) / Process Crash (Critical)]

#### Engineering Verdict
- [ ] **APPROVE**: Deep interfaces, isolated blast radius, hermetic test plan.
- [ ] **REVISE**: Architecture has shallow abstractions or unhandled SPOFs.
- [ ] **BLOCK**: High risk of data loss, cyclic dependencies, or untestable wiring.

#### Required Architectural Guardrails
1. [Seam or fallback requirement 1]
2. [Concurrency or decimation gate requirement 2]
```
