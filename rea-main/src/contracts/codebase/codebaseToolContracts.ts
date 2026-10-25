import {
  scanCodebaseInputSchema,
  searchCodebaseInputSchema,
  inspectCodebaseInputSchema,
  traceCodebaseInputSchema,
  codebaseResultOutputSchema,
} from "./codebaseToolSchemas.js";
import { toolContractMetadata } from "../toolEffects.js";
import type { ToolContract } from "../toolContractTypes.js";

export const CODEBASE_TOOL_CONTRACTS = [
  {
    name: "scan_codebase",
    ...toolContractMetadata("scan_codebase"),
    description:
      "High-speed repository scanner. Generates token-budgeted PageRank structural repomaps, directory trees, or query-localized context blocks across TypeScript, JavaScript, Python, Go, Rust, and Dart with zero disk mutations.",
    kind: "application",
    requiresActiveTarget: false,
    inputSchema: scanCodebaseInputSchema,
    outputSchema: codebaseResultOutputSchema,
    examples: [
      {
        title: "Scan repository with a topic query",
        input: { query: "authentication", budget_tokens: 2000 },
      },
      {
        title: "Generate PageRank structural repomap",
        input: { op: "repomap", budget_tokens: 1500 },
      },
      {
        title: "Scan directory hierarchy with gitignore filtering",
        input: { op: "tree", depth: 3 },
      },
    ],
  },
  {
    name: "search_codebase",
    ...toolContractMetadata("search_codebase"),
    description:
      "Search symbols, peek definitions, or locate files across the codebase. Auto-corrects typos using Levenshtein distance to prevent wasted agent turns.",
    kind: "application",
    requiresActiveTarget: false,
    inputSchema: searchCodebaseInputSchema,
    outputSchema: codebaseResultOutputSchema,
    examples: [
      {
        title: "Search for symbols matching a pattern",
        input: { query: "handleRequest", op: "search" },
      },
      {
        title: "Peek a symbol's definition and enclosing context in one shot",
        input: { query: "CodebaseScannerService", op: "peek" },
      },
    ],
  },
  {
    name: "inspect_codebase",
    ...toolContractMetadata("inspect_codebase"),
    description:
      "Space-efficient source code inspection. In 'skeleton' mode, folds function and method bodies into single-line comments (saving ~85% context tokens). In 'focus' mode, expands only the targeted symbol's body while keeping surrounding functions folded.",
    kind: "application",
    requiresActiveTarget: false,
    inputSchema: inspectCodebaseInputSchema,
    outputSchema: codebaseResultOutputSchema,
    examples: [
      {
        title: "Skeletonize a source file to view signatures and types",
        input: { target: "src/server/createServer.ts", mode: "skeleton" },
      },
      {
        title: "Focus on one function while skeletonizing sibling methods",
        input: {
          target: "src/server/createServer.ts",
          mode: "focus",
          focus_symbol: "createServer",
        },
      },
    ],
  },
  {
    name: "trace_codebase",
    ...toolContractMetadata("trace_codebase"),
    description:
      "Trace static call graph relationships (inbound callers or outbound callees) for any function, method, or symbol across the codebase.",
    kind: "application",
    requiresActiveTarget: false,
    inputSchema: traceCodebaseInputSchema,
    outputSchema: codebaseResultOutputSchema,
    examples: [
      {
        title: "Find all inbound callers of a function",
        input: { target: "scanCodebase", op: "callers" },
      },
    ],
  },
] as const satisfies readonly ToolContract[];
