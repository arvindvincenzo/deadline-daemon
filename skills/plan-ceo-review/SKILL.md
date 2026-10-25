---
name: plan-ceo-review
description: Founder and CEO-mode plan review. Evaluates feature viability, customer value proposition, competitive moats, and establishes emergency scope cutlines before writing code.
---

# Plan CEO Review — Founder-Mode Strategic Alignment

The **plan-ceo-review** skill evaluates an implementation plan or feature proposal through the lens of a startup founder and Chief Executive Officer.

Its purpose is to prevent engineering teams from building the wrong thing, over-engineering secondary features, or falling prey to feature creep under tight deadlines.

---

## When to Use
- Before approving any technical plan or milestone schedule (`projectdeadline.md` or `/plan` artifact).
- When deciding between expanding scope or cutting to the bone.
- When evaluating whether a feature provides durable user value or is merely cosmetic overhead.

---

## The 4 CEO Review Lenses

### 1. The Value Proposition Test
- **What is the single core user outcome?** (Name what the user can now do, see, or achieve in one sentence).
- **Does this feature solve an acute, urgent problem**, or is it a "nice-to-have" distraction?
- **The "Would Anyone Care?" Check**: If this entire milestone were deleted, would customers churn or complain? If not, question why it is being built under this deadline.

### 2. The Competitive Moat & Leverage Test
- Does this code build a durable moat (proprietary data, unique workflow, superior UX speed), or is it generic boilerplate that commoditizes engineering hours?
- Is there an asymmetric 1% structural improvement that unlocks 99% of the user experience?

### 3. The Completeness Principle ("Boil the Ocean One Lake at a Time")
- AI makes completeness cheap. When building a chosen feature, do not deliver a fragile, half-baked happy-path demo.
- Deliver full edge-case coverage and bulletproof reliability for the *chosen* scope, while ruthlessly rejecting unrelated scope.

### 4. The Emergency Scope Cutline
- Every CEO review must establish the **Emergency Cutline**:
  - **Preserve at all costs**: The core transaction, data integrity, and primary user journey.
  - **Drop immediately if time reaches 80%**: Polish animations, secondary telemetry dashboards, export formats, cosmetic theme customizers.

---

## Output Report Format: CEO Review Brief

```markdown
### 💼 CEO Strategic Plan Review

- **Target Plan**: [Plan Name / Path]
- **Core User Outcome**: [One-sentence user value]
- **Moat & Leverage Rating**: [High / Medium / Low]

#### Strategic Verdict
- [ ] **APPROVE**: High-leverage, direct user value, sharp scope boundaries.
- [ ] **SCOPE CUT**: Core idea is sound, but secondary items must be dropped before the deadline.
- [ ] **PIVOT**: The plan solves the wrong problem; rethink from first principles.

#### Mandated Scope Cuts (Emergency Cutline)
1. [Non-essential item 1 to drop if deadline is pressured]
2. [Non-essential item 2 to drop if deadline is pressured]
```
