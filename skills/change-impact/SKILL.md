---
name: change-impact
description: Predictive blast-radius and dependency impact analysis. Traces inbound/outbound callers, affected screens, and impacted test suites before code modifications to eliminate surprise regressions.
---

# Change Impact — Predictive Blast-Radius Analysis

The **change-impact** skill performs a pre-flight dependency ripple analysis before modifying any shared utility, model, service, or interface.

It prevents the common syndrome where fixing a bug in one file silently breaks three sibling components.

---

## When to Use
- Before editing shared utilities, core domain models, or foundational services.
- When planning refactors to assess the scope of work.
- When diagnosing regression risks during Phase 3 of the deadline workflow.

---

## The 4-Step Blast Radius Analysis

### 1. Identify Target Symbols
- Identify the exact functions, classes, types, or schemas to be edited.
- Example: `UserModel`, `PaymentGateway.processPayment()`, `DiaryRepository.save()`.

### 2. Inbound & Outbound Call Graph Tracing
- **Outbound (Dependencies)**: What does this function call? (Third-party SDKs, database queries, hardware listeners).
- **Inbound (Callers)**: Who calls this function?
  - Use `search_graph(name_pattern=...)` or `trace_path(function_name=..., direction="inbound")`.
  - Grep codebase for every import and call site.

### 3. Affected Screen & Route Inventory
- Map caller symbols to user-facing screens, background tasks, and API endpoints.
- Determine if the change alters UI rendering, serialized payloads, or background execution.

### 4. Impacted Test Suite Identification
- Locate all unit, widget, and integration tests covering the affected call chain.
- Ensure those tests are marked as mandatory verification gates for the milestone.

---

## Output Report Format: Change Impact Matrix

```markdown
### 🔍 Change Impact & Blast Radius Matrix

- **Target Symbol / File**: [Symbol Name / File Path]
- **Direct Callers Count**: [N callers found]
- **Blast Radius Severity**: [Isolated (1-2 callers) / Subsystem (3-10 callers) / Critical Core (>10 callers)]

#### Inbound Impacted Surfaces
1. `Screen/Service A` — Calls `targetMethod()` for user authentication.
2. `Screen/Service B` — Reads `targetProperty` for list rendering.

#### Mandatory Test Gates to Run
- `test/services/..._test.dart`
- `test/features/..._test.dart`
```
