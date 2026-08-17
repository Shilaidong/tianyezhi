import fs from "node:fs";
import path from "node:path";
import { runWithProxyFallback } from "./cf-net";

export function applyMigrations(remote: boolean): void {
  const args = [
    "wrangler",
    "d1",
    "migrations",
    "apply",
    "tianyezhi",
    remote ? "--remote" : "--local",
  ];
  const status = runWithProxyFallback("npx", args);
  if (status !== 0) process.exit(status);
}

export function executeSqlFile(sql: string, remote: boolean): void {
  const outDir = path.join(process.cwd(), ".wrangler");
  fs.mkdirSync(outDir, { recursive: true });
  const sqlPath = path.join(outDir, "tyz.sql");
  fs.writeFileSync(sqlPath, sql, "utf8");

  const args = [
    "wrangler",
    "d1",
    "execute",
    "tianyezhi",
    "--file",
    sqlPath,
    "--yes",
    remote ? "--remote" : "--local",
  ];
  const status = runWithProxyFallback("npx", args);
  if (status !== 0) process.exit(status);
}
