import type { EvidenceMcpServer } from "./EvidenceMcpServer.js";
import type { Logger } from "pino";
import type { CodebaseScannerService } from "../application/codebase/CodebaseScannerService.js";
import { toolContract } from "../contracts/toolContracts.js";
import { applicationToolRegistrationOptions } from "./toolRegistrationOptions.js";

export const registerCodebaseTools = (
  server: EvidenceMcpServer,
  service: CodebaseScannerService,
  logger: Logger,
): void => {
  // 1. scan_codebase
  const scanContract = toolContract("scan_codebase");
  server.registerTool(
    scanContract.name,
    applicationToolRegistrationOptions(scanContract),
    async (rawInput) => {
      const parsed = scanCodebaseInputSchema.safeParse(rawInput);
      if (!parsed.success) {
        return {
          content: [{ type: "text" as const, text: `Invalid parameters: ${parsed.error.message}` }],
          isError: true,
        };
      }
      try {
        const res = service.scanCodebase({
          root: parsed.data.root,
          query: parsed.data.query,
          op: parsed.data.op,
          budgetTokens: parsed.data.budget_tokens,
          depth: parsed.data.depth,
          focus: parsed.data.focus,
        });
        return {
          content: [{ type: "text" as const, text: res.text }],
        };
      } catch (err) {
        logger.error({ err }, "scan_codebase failed");
        return {
          content: [{ type: "text" as const, text: `scan_codebase error: ${err instanceof Error ? err.message : String(err)}` }],
          isError: true,
        };
      }
    }
  );

  // 2. search_codebase
  const searchContract = toolContract("search_codebase");
  server.registerTool(
    searchContract.name,
    applicationToolRegistrationOptions(searchContract),
    async (rawInput) => {
      const parsed = searchCodebaseInputSchema.safeParse(rawInput);
      if (!parsed.success) {
        return {
          content: [{ type: "text" as const, text: `Invalid parameters: ${parsed.error.message}` }],
          isError: true,
        };
      }
      try {
        const res = service.searchCodebase({
          root: parsed.data.root,
          query: parsed.data.query,
          op: parsed.data.op,
          limit: parsed.data.limit,
        });
        return {
          content: [{ type: "text" as const, text: res }],
        };
      } catch (err) {
        logger.error({ err }, "search_codebase failed");
        return {
          content: [{ type: "text" as const, text: `search_codebase error: ${err instanceof Error ? err.message : String(err)}` }],
          isError: true,
        };
      }
    }
  );

  // 3. inspect_codebase
  const inspectContract = toolContract("inspect_codebase");
  server.registerTool(
    inspectContract.name,
    applicationToolRegistrationOptions(inspectContract),
    async (rawInput) => {
      const parsed = inspectCodebaseInputSchema.safeParse(rawInput);
      if (!parsed.success) {
        return {
          content: [{ type: "text" as const, text: `Invalid parameters: ${parsed.error.message}` }],
          isError: true,
        };
      }
      try {
        const res = service.inspectCodebase({
          root: parsed.data.root,
          target: parsed.data.target,
          mode: parsed.data.mode,
          focusSymbol: parsed.data.focus_symbol,
          startLine: parsed.data.start_line,
          endLine: parsed.data.end_line,
        });
        return {
          content: [{ type: "text" as const, text: res }],
        };
      } catch (err) {
        logger.error({ err }, "inspect_codebase failed");
        return {
          content: [{ type: "text" as const, text: `inspect_codebase error: ${err instanceof Error ? err.message : String(err)}` }],
          isError: true,
        };
      }
    }
  );

  // 4. trace_codebase
  const traceContract = toolContract("trace_codebase");
  server.registerTool(
    traceContract.name,
    applicationToolRegistrationOptions(traceContract),
    async (rawInput) => {
      const parsed = traceCodebaseInputSchema.safeParse(rawInput);
      if (!parsed.success) {
        return {
          content: [{ type: "text" as const, text: `Invalid parameters: ${parsed.error.message}` }],
          isError: true,
        };
      }
      try {
        const res = service.traceCodebase({
          target: parsed.data.target,
          op: parsed.data.op,
        });
        return {
          content: [{ type: "text" as const, text: res }],
        };
      } catch (err) {
        logger.error({ err }, "trace_codebase failed");
        return {
          content: [{ type: "text" as const, text: `trace_codebase error: ${err instanceof Error ? err.message : String(err)}` }],
          isError: true,
        };
      }
    }
  );
};

import {
  scanCodebaseInputSchema,
  searchCodebaseInputSchema,
  inspectCodebaseInputSchema,
  traceCodebaseInputSchema,
} from "../contracts/codebase/codebaseToolSchemas.js";
