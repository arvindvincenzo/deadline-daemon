---
name: plan-design-review
description: Design Lead and "Anti-Slop" UX review. Audits interface logic, microcopy truth, interactive touch targets, layout bounds, and validates all 10 screen lifecycle states before implementation.
---

# Plan Design Review — UX & "Anti-Slop" Interface Critique

The **plan-design-review** skill evaluates UI/UX proposals, component specs, and front-end milestones through the critical lens of a Principal Design Architect.

It systematically eliminates **"AI slop"**—generic visual patterns, misleading button microcopy, truncated text ellipsis, unhandled edge states, and layout overflow stripes.

---

## When to Use
- Before building or refactoring any user-facing screen, widget, dialog, or form.
- During Phase 4 (Grill-Me Alignment Gate) when reviewing UI/UX specifications.
- When auditing microcopy, button labels, and accessibility compliance.

---

## The 4 Design Review Lenses

### 1. Microcopy Truth & State Synchronization
- **Action Predictability**: A button label must match its exact technical action. (e.g. "Delete Forever", not "OK"; "Save Draft", not "Submit").
- **State Synchronization**: Status indicators must never lie. (Never display "Syncing..." if a background job failed; never show "Saved" if the mutation is still in-flight).
- **Anti-Hostile Errors**: Error messages must state *what failed*, *why*, and *how to fix it*, rather than outputting generic "An error occurred".

### 2. The 10-State Screen Lifecycle Audit
Every interactive screen specification must account for all 10 states:
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

### 3. Touch Bounds & Physical Ergonomics
- All interactive elements (buttons, icons, chips, list items) must have touch bounds strictly $\ge 48\times 48\text{dp}$ on mobile (or $44\times 44\text{px}$ on web).
- Tap targets must have at least 8dp of separation to prevent mis-taps.

### 4. Layout Constraints & Zero Truncation
- Ensure responsive columns and rows are bounded (`Flexible`, `Expanded`, or scrollable) to guarantee **zero `RenderFlex` overflow hazard stripes**.
- Reject unexpanded text blocks that cause unreadable `...` text truncation.

---

## Output Report Format: Design Review Brief

```markdown
### 🎨 Principal Design & "Anti-Slop" Review

- **Target Screen / Component**: [Name / Path]
- **10-State Completeness**: [X/10 states verified]
- **Touch Target Compliance**: [Pass (>=48dp) / Fail (<48dp)]

#### Design Verdict
- [ ] **APPROVE**: Clean microcopy, complete lifecycle states, accessible bounds.
- [ ] **REVISE**: Microcopy ambiguity, missing empty/error states, or touch bounds too small.
- [ ] **REJECT**: High risk of RenderFlex overflow stripes or unexpanded text truncation.

#### Mandated UI Fixes
1. [Microcopy clarification]
2. [Layout constraint guard]
```
