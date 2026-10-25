---
name: ship
description: Production release and deployment shipping engine. Validates pre-flight test suites, enforces clean git hygiene, generates release manifests, and executes verified deployments.
---

# Ship — Production Release & Deployment Engine

The **ship** skill governs the final cut of software delivery. It prevents broken builds, dirty working trees, untracked regressions, and unverified deployments from contaminating production environments.

---

## When to Use
- When all milestones in `projectdeadline.md` are complete and verified.
- When generating a release pull request, commit manifest, or production deployment.
- Before delivering the final **Turnkey Verification Seal**.

---

## The 5 Pre-Flight Shipping Gates

### 1. Test & Build Gate
- Run full automated test suite (`flutter test`, `npm test`, `cargo test`, `go test ./...`).
- Verify exit code is 0 with **zero failures and zero skipped critical suites**.
- Verify compilation / static analysis passes with **zero warnings treated as errors**.

### 2. Git Hygiene Gate
- Check `git status --porcelain`.
- Ensure zero uncommitted draft files, zero temporary debug scripts (`*.tmp`, `scratch/`), and zero sensitive `.env` files staged.
- Ensure branch is clean and rebased against main target.

### 3. Change Manifest & Release Notes Gate
- Generate concise, user-facing release notes detailing:
  - What features were delivered.
  - What bugs were remediated.
  - What was deliberately deferred (with Ponytail justification).
- Document semantic version tag (`vX.Y.Z`).

### 4. Live Runtime Sanity Gate
- Verify that live deployment or compiled binary launches cleanly without immediate startup crashes or missing environment variables.

### 5. Rollback Preparedness Gate
- Confirm the rollback procedure:
  - Git rollback commit hash identified.
  - Database migration down-script verified.

---

## Output Report Format: Release Shipping Manifest

```markdown
### 🚀 Production Release Shipping Manifest

- **Release Version**: [vX.Y.Z]
- **Target Environment**: [Production / Staging / Device]
- **Git Commit Hash**: [SHA]
- **Automated Tests**: [X passed, 0 failed]
- **Working Tree**: Clean (0 uncommitted files)

#### Shipping Verdict
- [ ] **SHIPPED**: All 5 pre-flight gates passed; release deployed and verified.
- [ ] **HOLD**: Test failure, uncommitted diffs, or missing migration rollback script.
```
