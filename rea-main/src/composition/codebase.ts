import * as path from "node:path";
import * as os from "node:os";
import { CodebaseScannerService } from "../application/codebase/CodebaseScannerService.js";

export function createCodebaseScannerService(dbPath?: string): CodebaseScannerService {
  const cachePath = dbPath ?? path.join(os.homedir(), ".rea", "codebase-cache.db");
  return new CodebaseScannerService(cachePath);
}
