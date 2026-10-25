---
name: verification-loop
description: 6-phase hermetic verification loop. Runs build verification, type check, linter, automated tests with coverage, security grep, and git diff review to produce a certified PASS/FAIL score.
---

# Verification Loop — 6-Phase Hermetic Quality Gate

The **verification-loop** skill executes an automated, multi-tiered verification sequence before work is considered complete.

It eliminates "done, unverified" claims by generating deterministic proof across build, static analysis, tests, security, and diff hygiene.

---

## When to Use
- After completing any individual milestone in `projectdeadline.md`.
- Before marking code changes ready for review or merging.
- When validating bug fixes to guarantee zero regressions.

---

## The 6 Verification Phases

```
┌────────────────────────────────────────────────────────┐
│ Phase 1: Build Verification                            │
│ • Compile project or execute build pipeline            │
│ • Must exit with code 0                                │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 2: Static Analysis & Type Checking               │
│ • dart analyze / tsc --noEmit / mypy / cargo check     │
│ • 0 type errors, 0 unresolved imports                  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 3: Linter Pass                                   │
│ • eslint / flutter analyze / ruff / golangci-lint      │
│ • 0 style/syntax warnings treated as errors            │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 4: Automated Tests with Coverage                 │
│ • flutter test / npm test / pytest / cargo test        │
│ • 100% test pass rate; verify coverage on new paths   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 5: Security Grep                                 │
│ • Check diffs for hardcoded secrets, keys, or passwords│
│ • Check for raw SQL interpolation or command execution │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 6: Diff Review & Locality Audit                  │
│ • git diff --stat                                      │
│ • Verify zero unintended file modifications            │
└────────────────────────────────────────────────────────┘
```

---

## Output Report Format: Verification Loop Scorecard

```markdown
### 📋 Verification Loop Scorecard

| Phase | Check | Command | Result |
| :--- | :--- | :--- | :--- |
| **P1** | Build | `flutter build ...` / `npm run build` | ✅ PASS |
| **P2** | Type Check | `dart analyze` / `tsc --noEmit` | ✅ PASS |
| **P3** | Lint | `linter command` | ✅ PASS |
| **P4** | Tests | `flutter test` / `npm test` | ✅ PASS (X passed, 0 failed) |
| **P5** | Security | Secret & injection grep | ✅ PASS (0 leaks) |
| **P6** | Diff | `git diff --stat` | ✅ PASS (clean bounds) |

**Overall Verification Status**: [CERTIFIED PASS / FAIL]
```
