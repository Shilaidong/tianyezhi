import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const BUCKET = "tianyezhi-media";
const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const remote = process.argv.includes("--remote");

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function isLfsPointer(filePath: string): boolean {
  const fd = fs.openSync(filePath, "r");
  const buf = Buffer.alloc(48);
  fs.readSync(fd, buf, 0, 48, 0);
  fs.closeSync(fd);
  return buf.toString("utf8").startsWith("version https://git-lfs.github.com");
}

const files = fs
  .readdirSync(IMAGES_DIR)
  .filter((name) => MIME[path.extname(name).toLowerCase()]);

let uploaded = 0;
let skipped = 0;
for (const name of files) {
  const full = path.join(IMAGES_DIR, name);
  if (isLfsPointer(full)) {
    console.warn(`skip LFS pointer: ${name}`);
    skipped += 1;
    continue;
  }
  const key = `images/${name}`;
  const args = [
    "wrangler",
    "r2",
    "object",
    "put",
    `${BUCKET}/${key}`,
    "--file",
    full,
    "--content-type",
    MIME[path.extname(name).toLowerCase()],
  ];
  if (remote) args.push("--remote");
  const result = spawnSync("npx", args, {
    stdio: "inherit",
    shell: true,
    cwd: process.cwd(),
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
  uploaded += 1;
}

console.log(`uploaded ${uploaded}, skipped ${skipped}`);
