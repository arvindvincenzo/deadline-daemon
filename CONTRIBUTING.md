# Contributing to Deadline

We welcome contributions to the **Deadline** execution engine.

---

## Skill Architecture Guidelines
When proposing new supporting skills or enhancements to existing ones:
1. **Clarity of Minimalism**: Eliminate superfluous abstraction layers. Every function and file must satisfy the EFAR Triad (Direct User Clarity, Failure Consequence, Ponytail Simplification).
2. **Deterministic Evidence**: Never rely on "it looks good". Include automated tests, real runtime QA verification, or static analysis checks.
3. **Strict YAML Frontmatter**: Every skill must have a valid `name` and `description` block.
4. **Tool Separation**: Discovery is performed via fast AST scanners (`daemons-gate`), while code editing is strictly reserved for native file tools (`read_file`, `write_file`, `edit_file`).
