---
name: contract-first
description: Contract-first engineering and API/DTO schema locking. Enforces interface definitions, serialization contracts, nullable safety, and validation boundaries before writing business logic.
---

# Contract-First — Schema & API Interface Locking

The **contract-first** skill enforces the principle: **"Lock the contract before implementing the logic."**

It prevents cross-team merge collisions, serialization crashes, and runtime null-pointer exceptions by formalizing DTOs, schemas, and endpoint interfaces upfront.

---

## When to Use
- During Milestone 1 of any feature or service development.
- When creating or modifying data transfer objects (DTOs), REST/gRPC endpoints, or database tables.
- To prevent frontend/backend desynchronization.

---

## The 4 Contract-First Principles

### 1. Explicit Data Transfer Objects (DTOs)
- Ban raw maps or dictionaries (`Map<String, dynamic>` or `Record<string, any>`) across subsystem boundaries.
- Define strongly-typed model classes with explicit serialization:
  - `fromJson` / `toJson`
  - Nullable fields explicitly marked (`String?`, `Optional<String>`)
  - Default fallbacks for omitted keys

### 2. The Defensive Nullability Contract
- Assume external data from APIs or local storage can be `null`, empty, or have mismatched types.
- Never use forced non-null assertions (`!`) without a fallback or validation guard.

### 3. Backward Compatibility
- Never rename or delete an existing field in a published API or database table without a deprecation window.
- Add new fields as optional/nullable to prevent breaking existing clients.

### 4. Hermetic Contract Testing
- Write a dedicated contract test that asserts:
  - Valid JSON decodes into the model without loss.
  - Invalid JSON (missing required fields, bad types) throws a descriptive validation error instead of crashing silently.

---

## Output Report Format: Contract Locking Brief

```markdown
### 📝 Contract-First Specification

- **Contract Domain**: [Domain Name]
- **Target Files**: [lib/models/... or src/schemas/...]
- **Backward Compatible**: [Yes / No]

#### Locked Schemas & Interfaces
```dart
// Example: Locked DTO Contract
class UserProfileDto {
  final String id;
  final String displayName;
  final String? avatarUrl;
  
  const UserProfileDto({
    required this.id,
    required this.displayName,
    this.avatarUrl,
  });
}
```

#### Contract Test Status
- [x] Round-trip serialization test verified
- [x] Nullable/omitted field fallback verified
```
