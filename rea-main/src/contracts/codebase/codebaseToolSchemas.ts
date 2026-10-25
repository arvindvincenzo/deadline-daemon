import { z } from "zod";

export const scanCodebaseInputSchema = z.strictObject({
  root: z.string().optional().describe("Optional workspace root directory path. Defaults to cwd."),
  query: z.string().optional().describe("Optional query for symbol and context localization."),
  op: z.enum(["scan", "repomap", "tree"]).optional().describe("Scan operation mode: 'scan' (default, unified context), 'repomap' (PageRank structural map), 'tree' (directory tree)."),
  budget_tokens: z.number().int().positive().optional().describe("Token budget ceiling (default 2000, 1 token ~ 4 bytes)."),
  depth: z.number().int().positive().optional().describe("Directory tree traversal depth for op='tree' (default 3)."),
  focus: z.string().optional().describe("Optional symbol name or file path to bias PageRank in repomap."),
});

export const searchCodebaseInputSchema = z.strictObject({
  root: z.string().optional().describe("Optional workspace root directory path. Defaults to cwd."),
  query: z.string().min(1).describe("Target symbol name, text pattern, or query string."),
  op: z.enum(["search", "grep", "find", "peek"]).optional().describe("Search operation mode: 'search' (AST symbols), 'grep' (full-text), 'find' (file names), 'peek' (symbol definition + focused body)."),
  limit: z.number().int().positive().optional().describe("Maximum number of results to return (default 20)."),
});

export const inspectCodebaseInputSchema = z.strictObject({
  root: z.string().optional().describe("Optional workspace root directory path. Defaults to cwd."),
  target: z.string().min(1).describe("File path or symbol name to inspect."),
  mode: z.enum(["skeleton", "focus", "full"]).optional().describe("Inspection mode: 'skeleton' (folds function bodies), 'focus' (expands targeted symbol, folds others), 'full' (complete code)."),
  focus_symbol: z.string().optional().describe("Symbol name to keep unfolded in 'focus' mode."),
  start_line: z.number().int().positive().optional().describe("Starting line number for range-based reading (1-based)."),
  end_line: z.number().int().positive().optional().describe("Ending line number for range-based reading (1-based)."),
});

export const traceCodebaseInputSchema = z.strictObject({
  target: z.string().min(1).describe("Target symbol name to trace."),
  op: z.enum(["callers", "callees"]).optional().describe("Trace operation: 'callers' (inbound) or 'callees' (outbound)."),
});

export const codebaseResultOutputSchema = z.strictObject({
  content: z.string().describe("Formatted textual analysis content."),
  token_estimate: z.number().optional().describe("Estimated token count of the output."),
});
