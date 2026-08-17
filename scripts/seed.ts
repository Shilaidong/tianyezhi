import fs from "node:fs";
import path from "node:path";
import { AUTHORS } from "../src/lib/authors";
import { ISSUES } from "../src/lib/issues";
import { getAllLettersFromFiles } from "../src/lib/letters-fs";
import { getAllPostsFromFiles } from "../src/lib/posts-fs";
import {
  insertAuthorSql,
  insertIssueSql,
  insertLetterSql,
  insertPostSql,
} from "./content-sql";
import { executeSqlFile } from "./d1-exec";

function buildSql(): string {
  const statements: string[] = [];

  for (const issue of ISSUES) {
    statements.push(insertIssueSql(issue, issue.n === ISSUES[0].n));
  }
  for (const author of AUTHORS) {
    statements.push(insertAuthorSql(author));
  }
  for (const post of getAllPostsFromFiles()) {
    statements.push(insertPostSql(post));
  }
  for (const letter of getAllLettersFromFiles()) {
    statements.push(insertLetterSql(letter));
  }

  return statements.join("\n");
}

const remote = process.argv.includes("--remote");
const outDir = path.join(process.cwd(), ".wrangler");
fs.mkdirSync(outDir, { recursive: true });
const sql = buildSql();
fs.writeFileSync(path.join(outDir, "seed.sql"), sql, "utf8");
executeSqlFile(sql, remote);
