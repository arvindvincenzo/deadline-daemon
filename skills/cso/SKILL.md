---
name: cso
description: Chief Security Officer audit skill. Scans codebases for OWASP Top 10 vulnerabilities, hardcoded secrets, injection vectors, broken access controls, and insecure dependencies.
---

# CSO — Chief Security Officer Vulnerability Audit

The **cso** skill executes an uncompromising security and vulnerability audit across codebases, dependencies, configuration files, and authentication boundaries.

It treats all external inputs, third-party libraries, and client-submitted state as untrusted evidence.

---

## When to Use
- Before marking any milestone or release as complete (`ship`).
- When introducing or modifying authentication, payment flows, API routes, or database queries.
- During security reviews of dependency updates and configuration changes.

---

## The 5 Security Audit Domains

### 1. Secret Exposure & Key Hygiene
- Grep codebase and commit diffs for exposed API keys, private tokens, passwords, and `.env` files.
- Ensure secrets are loaded exclusively via environment variables or secure platform vaults (e.g. Flutter Secure Storage, AWS Secrets Manager).

### 2. Injection & Deserialization Defense
- **SQL / Query Injection**: Verify all database queries use parameterized prepared statements or ORM binding; ban raw string interpolation in queries.
- **XSS & HTML Injection**: Verify all rendered user inputs are HTML-escaped or sanitized.
- **Command Injection**: Ban arbitrary shell execution with unsanitized user arguments.

### 3. Authentication & Access Control (Broken Object Level Authorization - BOLA)
- Verify that every endpoint or query validates user authorization for the specific record ID being accessed, not just general login state.
- Confirm session cookies use `HttpOnly`, `Secure`, and `SameSite=Strict/Lax` flags.

### 4. Cryptography & Transmission Safety
- Reject deprecated hashing algorithms (`MD5`, `SHA1`) for password storage; enforce `bcrypt`, `Argon2`, or `PBKDF2`.
- Verify all external communications enforce TLS 1.3/HTTPS with certificate validation.

### 5. Dependency & Supply Chain Security
- Audit package manifests (`package.json`, `pubspec.yaml`, `Cargo.toml`, `go.mod`) for known CVEs.
- Reject unpinned or compromised third-party packages.

---

## Output Report Format: CSO Audit Brief

```markdown
### 🛡️ Chief Security Officer (CSO) Audit Report

- **Audit Scope**: [Full Repo / Branch Diff / Target Files]
- **Vulnerability Count**: Critical: [0], High: [0], Medium: [0], Low: [0]

#### Security Verdict
- [ ] **PASS**: Zero secret leaks, parameterized queries verified, strict ACLs in place.
- [ ] **REMEDIATE**: Non-critical warnings detected (e.g. permissive CORS or unpinned package).
- [ ] **BLOCK**: Critical vulnerability found (raw SQL interpolation, hardcoded secret, or broken auth).

#### Required Security Fixes
1. [Vulnerability location & required patch]
```
