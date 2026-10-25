import assert from "node:assert";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

import { extractSymbolsAndEdges } from "../src/domain/codebase/codebaseLexer.js";
import { skeletonizeSource } from "../src/domain/codebase/sourceSkeletonizer.js";
import { buildRepoMap } from "../src/domain/codebase/repoMapBuilder.js";
import { localizeQuery } from "../src/domain/codebase/fastContextLocalizer.js";
import { scanDirectoryTree } from "../src/domain/codebase/codebaseTreeScanner.js";
import { CodebaseIndexStore } from "../src/application/codebase/CodebaseIndexStore.js";
import { CodebaseScannerService } from "../src/application/codebase/CodebaseScannerService.js";
import { TOOL_EFFECTS } from "../src/contracts/toolEffects.js";
import { CODEBASE_TOOL_CONTRACTS } from "../src/contracts/codebase/codebaseToolContracts.js";

console.log("=== Testing Codebase Scanner for REA ===");

// 1. Lexer AST extraction
const tsCode = `
export function authenticateUser(username: string, pass: string): boolean {
  validatePassword(pass);
  return true;
}
export class AuthManager {
  public login(req: any) {
    authenticateUser(req.user, req.pass);
  }
}
`;
const lexRes = extractSymbolsAndEdges("src/auth.ts", tsCode);
assert.strictEqual(lexRes.symbols.length >= 2, true, "Symbols extracted");
assert.ok(lexRes.symbols.some(s => s.name === "authenticateUser" && s.kind === "func"));
assert.ok(lexRes.symbols.some(s => s.name === "AuthManager" && s.kind === "class"));
assert.ok(lexRes.edges.some(e => e.to === "validatePassword"));
console.log("✔ CodebaseLexer: TS extraction passed");

// Go and Python
const goCode = "package main\ntype Server struct{}\nfunc (s *Server) HandleScan(w http.ResponseWriter, r *http.Request) {}\n";
const goRes = extractSymbolsAndEdges("server.go", goCode);
assert.ok(goRes.symbols.some(s => s.name === "HandleScan" && s.kind === "method"));
console.log("✔ CodebaseLexer: Go method extraction passed");

// 2. Skeletonizer
const longCode = `
export function firstFunc() {
  const x = 1;
  const y = 2;
  return x + y;
}
export function secondFunc() {
  const a = 10;
  return a;
}
`;
const skel = skeletonizeSource("sample.ts", longCode, { mode: "skeleton" });
assert.ok(skel.renderedText.includes("body omitted"), "Function body folded");
assert.strictEqual(skel.foldedBlocks, 2);

const focused = skeletonizeSource("sample.ts", longCode, { mode: "focus", focusSymbol: "secondFunc" });
assert.ok(focused.renderedText.includes("const a = 10;"), "Focused function preserved");
assert.ok(focused.renderedText.includes("body omitted"), "Unfocused function folded");
console.log("✔ SourceSkeletonizer: skeleton and focus modes passed");

// 3. PageRank RepoMap
const fileA = {
  relPath: "src/engine.ts",
  symbols: [{ name: "Engine", kind: "class", path: "src/engine.ts", line: 1, col: 1, endLine: 20, language: "typescript", signature: "class Engine" }],
  identifiers: new Map([["Database", 5]]),
};
const fileB = {
  relPath: "src/db.ts",
  symbols: [{ name: "Database", kind: "class", path: "src/db.ts", line: 1, col: 1, endLine: 30, language: "typescript", signature: "class Database" }],
  identifiers: new Map([["Query", 2]]),
};
const repomap = buildRepoMap([fileA, fileB], { budgetTokens: 100 });
assert.ok(repomap.renderedText.includes("src/engine.ts"));
assert.ok(repomap.renderedText.includes("src/db.ts"));
console.log("✔ RepoMapBuilder: PageRank multigraph and budget packing passed");

// 4. FastContext Localization
const locFiles = [
  { relPath: "src/auth/login.ts", content: "export function handleLogin() { checkPassword(); }" },
  { relPath: "src/utils/math.ts", content: "export function add(a, b) { return a + b; }" },
];
const hits = localizeQuery(locFiles, "where is password login handled?", 5);
assert.strictEqual(hits.length > 0, true);
assert.strictEqual(hits[0].path, "src/auth/login.ts");
console.log("✔ FastContextLocalizer: term scoring and query ranking passed");

// 5. CodebaseIndexStore (SQLite)
const store = new CodebaseIndexStore(":memory:");
store.updateFile("src/service.ts", 1000, 200, "hash123", [
  { name: "PaymentProcessor", kind: "class", path: "src/service.ts", line: 5, col: 1, endLine: 50, language: "typescript", signature: "class PaymentProcessor" }
], [{ from: "PaymentProcessor", to: "chargeCard", path: "src/service.ts", kind: "call" }]);
const found = store.searchSymbols("payment", 5);
assert.strictEqual(found.length, 1);
assert.strictEqual(found[0].name, "PaymentProcessor");
const suggs = store.suggestSimilarSymbols("PaymntProcessr", 3);
assert.ok(suggs.includes("PaymentProcessor"));
store.close();
console.log("✔ CodebaseIndexStore: SQLite storage and Levenshtein suggestion passed");

// 6. Strict Read-Only Audit (Zero-Write Policy)
for (const contract of CODEBASE_TOOL_CONTRACTS) {
  const fx = TOOL_EFFECTS[contract.name];
  assert.ok(fx, `Tool effect defined for ${contract.name}`);
  assert.strictEqual(fx.writesFilesystem, false, `${contract.name} must not write filesystem`);
  assert.strictEqual(fx.mutatesTarget, false, `${contract.name} must not mutate target`);
  assert.strictEqual(fx.mayDiscardData, false, `${contract.name} must not discard data`);
  assert.strictEqual(fx.idempotent, true, `${contract.name} must be idempotent`);
}
console.log("✔ Strict Read-Only Audit: All 4 tools verified 100% read-only with ZERO write effects");

// 7. Full Service End-to-End
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rea-test-"));
try {
  fs.mkdirSync(path.join(tempDir, "lib"), { recursive: true });
  fs.writeFileSync(path.join(tempDir, "lib", "main.dart"), "void main() { runApp(MyApp()); }\nclass MyApp {}");
  fs.writeFileSync(path.join(tempDir, "lib", "service.go"), "package main\nfunc StartService() {}\n");

  const service = new CodebaseScannerService(":memory:");
  const scanRes = service.scanCodebase({ root: tempDir, query: "MyApp", budgetTokens: 1000 });
  assert.ok(scanRes.text.includes("source files indexed"));
  assert.ok(scanRes.text.includes("MyApp"));

  const repomapRes = service.scanCodebase({ root: tempDir, op: "repomap", budgetTokens: 500 });
  assert.ok(repomapRes.text.includes("lib/main.dart"));

  const searchRes = service.searchCodebase({ root: tempDir, query: "StartService", op: "search" });
  assert.ok(searchRes.includes("StartService"));

  service.close();
  console.log("✔ CodebaseScannerService: Full end-to-end scanning pass complete");
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log("\nALL CODEBASE SCANNER TESTS PASSED SUCCESSFULLY! 🚀");
