import { describe, it, expect, beforeEach, afterEach } from "vitest";
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

describe("Codebase Scanner & REA Omni-Scan Engine", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rea-codebase-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("extracts symbols, signatures and call edges from TypeScript", () => {
    const code = `
      // Authentication helper
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
    const res = extractSymbolsAndEdges("src/auth.ts", code);
    expect(res.symbols.length).toBeGreaterThanOrEqual(2);
    expect(res.symbols.some(s => s.name === "authenticateUser" && s.kind === "func")).toBe(true);
    expect(res.symbols.some(s => s.name === "AuthManager" && s.kind === "class")).toBe(true);
    expect(res.edges.some(e => e.to === "validatePassword")).toBe(true);
    expect(res.identifiers.has("authenticateUser")).toBe(true);
  });

  it("extracts symbols and methods from Go and Python", () => {
    const goCode = `
      package main
      type Server struct{}
      func (s *Server) HandleScan(w http.ResponseWriter, r *http.Request) {
        log.Println("scan")
      }
    `;
    const goRes = extractSymbolsAndEdges("server.go", goCode);
    expect(goRes.symbols.some(s => s.name === "HandleScan" && s.kind === "method")).toBe(true);

    const pyCode = `
      class AgentRunner:
          async def execute_task(self, prompt: str):
              print(prompt)
    `;
    const pyRes = extractSymbolsAndEdges("runner.py", pyCode);
    expect(pyRes.symbols.some(s => s.name === "AgentRunner" && s.kind === "class")).toBe(true);
    expect(pyRes.symbols.some(s => s.name === "execute_task" && s.kind === "method")).toBe(true);
  });

  it("folds function bodies into comments in skeleton mode and focuses on requested symbol", () => {
    const code = [
      "export function firstFunc() {",
      "  const x = 1;",
      "  const y = 2;",
      "  return x + y;",
      "}",
      "",
      "export function secondFunc() {",
      "  const a = 10;",
      "  return a;",
      "}",
    ].join("\n");

    const skel = skeletonizeSource("sample.ts", code, { mode: "skeleton" });
    expect(skel.renderedText).toContain("/* ... (3 lines body omitted) ... */");
    expect(skel.foldedBlocks).toBe(2);

    const focused = skeletonizeSource("sample.ts", code, {
      mode: "focus",
      focusSymbol: "secondFunc",
    });
    expect(focused.renderedText).toContain("const a = 10;"); // preserved
    expect(focused.renderedText).toContain("/* ... (3 lines body omitted) ... */"); // firstFunc folded
  });

  it("builds an Aider-style PageRank structural repomap within token budget", () => {
    const fileA = {
      relPath: "src/engine.ts",
      symbols: [
        {
          name: "Engine",
          kind: "class" as const,
          path: "src/engine.ts",
          line: 1,
          col: 1,
          endLine: 20,
          language: "typescript",
          signature: "class Engine",
        },
      ],
      identifiers: new Map([["Database", 5], ["Logger", 3]]),
    };
    const fileB = {
      relPath: "src/db.ts",
      symbols: [
        {
          name: "Database",
          kind: "class" as const,
          path: "src/db.ts",
          line: 1,
          col: 1,
          endLine: 30,
          language: "typescript",
          signature: "class Database",
        },
      ],
      identifiers: new Map([["Query", 2]]),
    };

    const map = buildRepoMap([fileA, fileB], { budgetTokens: 100 });
    expect(map.renderedText).toContain("src/engine.ts");
    expect(map.renderedText).toContain("src/db.ts");
    expect(map.tokenEstimate).toBeLessThanOrEqual(100);
  });

  it("localizes natural-language query terms with scoring and why explanation", () => {
    const files = [
      {
        relPath: "src/auth/login.ts",
        content: "export function handleLogin() { checkPassword(); }",
      },
      {
        relPath: "src/utils/math.ts",
        content: "export function add(a, b) { return a + b; }",
      },
    ];

    const hits = localizeQuery(files, "where is password login handled?", 5);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].path).toBe("src/auth/login.ts");
    expect(hits[0].why).toContain("login:1");
  });

  it("scans directory trees with .gitignore compliance and secret redaction", () => {
    fs.mkdirSync(path.join(tempDir, "src"), { recursive: true });
    fs.writeFileSync(path.join(tempDir, "src", "index.ts"), "console.log('hi');");
    fs.writeFileSync(path.join(tempDir, ".env"), "API_KEY=secret123");
    fs.writeFileSync(path.join(tempDir, ".gitignore"), "node_modules/\n");

    const tree = scanDirectoryTree(tempDir, tempDir, { depth: 2, allowSecrets: false });
    expect(tree.renderedText).toContain("[FILE] index.ts");
    expect(tree.renderedText).toContain("[REDACTED SECRET] .env");
    expect(tree.renderedText).not.toContain("secret123");
  });

  it("indexes into SQLite and retrieves symbols with Levenshtein typo suggestion", () => {
    const store = new CodebaseIndexStore(":memory:");
    store.updateFile(
      "src/service.ts",
      1000,
      200,
      "abc123hash",
      [
        {
          name: "PaymentProcessor",
          kind: "class",
          path: "src/service.ts",
          line: 5,
          col: 1,
          endLine: 50,
          language: "typescript",
          signature: "class PaymentProcessor",
        },
      ],
      [{ from: "PaymentProcessor", to: "chargeCard", path: "src/service.ts", kind: "call" }]
    );

    const found = store.searchSymbols("payment", 5);
    expect(found.length).toBe(1);
    expect(found[0].name).toBe("PaymentProcessor");

    const callers = store.getCalleesOf("PaymentProcessor");
    expect(callers.length).toBe(1);
    expect(callers[0].to).toBe("chargeCard");

    // Typo suggestion
    const suggs = store.suggestSimilarSymbols("PaymntProcessr", 3);
    expect(suggs).toContain("PaymentProcessor");

    store.close();
  });

  it("strictly enforces zero write operations (read-only invariant)", () => {
    for (const contract of CODEBASE_TOOL_CONTRACTS) {
      const effects = TOOL_EFFECTS[contract.name];
      expect(effects).toBeDefined();
      expect(effects.writesFilesystem).toBe(false);
      expect(effects.mutatesTarget).toBe(false);
      expect(effects.mayDiscardData).toBe(false);
      expect(effects.idempotent).toBe(true);
    }
  });

  it("runs full CodebaseScannerService end-to-end on local workspace", () => {
    fs.mkdirSync(path.join(tempDir, "lib"), { recursive: true });
    fs.writeFileSync(path.join(tempDir, "lib", "main.dart"), "void main() { runApp(MyApp()); }\nclass MyApp {}");
    fs.writeFileSync(path.join(tempDir, "lib", "service.go"), "package main\nfunc StartService() {}\n");

    const service = new CodebaseScannerService(":memory:");
    const scanRes = service.scanCodebase({ root: tempDir, query: "MyApp", budgetTokens: 1000 });
    expect(scanRes.text).toContain("source files indexed");
    expect(scanRes.text).toContain("MyApp");

    const repomapRes = service.scanCodebase({ root: tempDir, op: "repomap", budgetTokens: 500 });
    expect(repomapRes.text).toContain("lib/main.dart");

    const searchRes = service.searchCodebase({ root: tempDir, query: "StartService", op: "search" });
    expect(searchRes).toContain("StartService");

    service.close();
  });
});
