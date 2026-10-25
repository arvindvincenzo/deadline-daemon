# The "Grill & Thrill" Protocol

> *"Grill the plan ruthlessly upfront, thrill the user with an airtight roadmap, then execute without hesitation to fabulous results."*

---

## What is Grill & Thrill?
In standard AI coding interactions, agents either:
- Mindlessly accept vague instructions, writing fragile code that requires 15 rounds of manual debugging.
- Stop every 30 seconds to ask timid questions like *"Should I do step 2 now?"*.

**Grill & Thrill** solves this through a rigorous 30-minute upfront alignment gate:
1. **The Grill**: The agent actively questions the plan as a Principal Engineer:
   - *"You missed this edge case in the payment callback."*
   - *"Your plan lacks a thermal frame throttle on camera capture."*
   - *"This button copy says 'Save', but your backend deletes unsaved drafts."*
2. **The Thrill**: Presenting a fully structured, mathematical roadmap (`projectdeadline.md`) that accounts for every failure mode, sets an emergency cutline, and reserves a 20% project buffer.
3. **The Execution**: Once confirmed, the agent self-propels consecutively through every milestone without prompt fatigue or continuation nudges.

---

## The 4 Structured Rounds

### Round 1: Scope, Hard Deadline & Emergency Cutline (CEO Lens)
- **Goal**: Lock target completion timestamp, total available hours, and define what gets cut if time reaches 80%.
- **Pattern**:
  ```markdown
  ❓ **Q1 — Scope Cutline**: What non-essential features can be deferred if time runs short?
  ➡️ **Recommended**: Defer the custom theme picker and secondary telemetry graphs; preserve core transaction and offline persistence at all costs.
  ```

### Round 2: Architecture Seams, Depth & Flaw Mapping (Eng Lens)
- **Goal**: Eliminate single points of failure, shallow modules, and leaky abstractions.
- **Pattern**:
  ```markdown
  ❓ **Q2 — Architecture Seam**: Should third-party SDK listeners live inside views or behind decoupled adapters?
  ➡️ **Recommended**: Put behind an adapter interface to isolate failure blast radius and enable 50ms hermetic unit testing.
  ```

### Round 3: UI/UX Microcopy Logic & State Completeness (Design Lens)
- **Goal**: Eliminate "AI slop", vague errors, and contradictory button labels across all 10 screen states.
- **Pattern**:
  ```markdown
  ❓ **Q3 — Microcopy Truth**: When discarding an unsaved protocol draft, how should the UI respond?
  ➡️ **Recommended**: Display a destructive confirmation modal ("Discard unsaved changes?"). Prevents accidental data loss while keeping microcopy unambiguous.
  ```

### Round 4: Concurrency, Failure Gates & Verification (QA Lens)
- **Goal**: Verify debounce rates, stream decimation, and automated verification commands.
- **Pattern**:
  ```markdown
  ❓ **Q4 — Frame Decimation**: At what interval should camera frames be throttled?
  ➡️ **Recommended**: 135ms (~7.4 FPS) gate. Protects device from thermal throttling while providing fluid HUD guidance.
  ```
