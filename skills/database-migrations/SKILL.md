---
name: database-migrations
description: Zero-downtime database migration and schema drift prevention skill. Enforces backward-compatible DDL, non-blocking index additions, foreign key cascade safety, and reversible rollback scripts.
---

# Database Migrations — Safe Schema Evolution & Drift Prevention

The **database-migrations** skill ensures database schemas (SQLite, Drift, PostgreSQL, MySQL) evolve safely without data loss, table locks, or migration crashes.

---

## When to Use
- Whenever modifying database tables, columns, indexes, or relations.
- When creating initial database schemas for new modules.
- When troubleshooting schema drift between local storage and application models.

---

## The 4 Rules of Safe Database Migration

### 1. Expand and Contract Pattern
- **Step 1 (Expand)**: Add the new column or table as nullable or with a safe default. Deploy code that writes to both old and new columns.
- **Step 2 (Backfill)**: Run a non-blocking script to backfill historical data.
- **Step 3 (Contract)**: Update queries to read exclusively from the new column. Only then deprecate or drop the old column.

### 2. Zero-Loss Schema Alterations
- Never execute destructive operations (`DROP COLUMN`, `DROP TABLE`) in the same migration that adds new features.
- In SQLite/Drift, use migration callbacks (`MigrationStrategy.onUpgrade`) with explicit version checking:
  ```dart
  if (from < 2) {
    await m.addColumn(customHabits, customHabits.notificationTime);
  }
  ```

### 3. Reversible Rollback Scripts
- Every migration must include a corresponding down-migration script or tested rollback path.
- Test both the up-migration and down-migration against realistic fixture data.

### 4. Indexing & Lock Safety
- Create indexes concurrently or in non-blocking transactions.
- Audit foreign key constraints and `ON DELETE CASCADE` rules to prevent accidental orphan deletions or lock deadlocks.

---

## Output Report Format: Migration Safety Report

```markdown
### 🗄️ Database Migration Safety Report

- **Target Database**: [SQLite / Drift / PostgreSQL]
- **Migration Version**: [vX ➔ vY]
- **Reversible**: [Yes / No]

#### Operations Verified
- [x] Non-destructive column addition
- [x] Default values for existing rows
- [x] Down-migration / rollback script verified
- [x] Zero schema drift against DTO models
```
