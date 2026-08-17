import fs from "node:fs";
import path from "node:path";
import type { Post } from "../src/lib/posts";

const IMAGE_RE = /!\[[^\]]*\]\((\/images\/[^)\s]+)(?:\s+"[^"]*")?\)/g;
const PUBLIC_IMAGES = path.join(process.cwd(), "public", "images");
const ASSET_IMAGES = path.join(process.cwd(), ".open-next", "assets", "images");

export function imageSrcs(post: Post): string[] {
  const found = new Set<string>();
  if (post.image) found.add(post.image);
  for (const match of post.content.matchAll(IMAGE_RE)) {
    found.add(match[1]);
  }
  return [...found];
}

export function imageFileName(src: string): string {
  return path.posix.basename(src);
}

export function publicImagePath(src: string): string {
  return path.join(PUBLIC_IMAGES, imageFileName(src));
}

function isLfsPointer(filePath: string): boolean {
  const fd = fs.openSync(filePath, "r");
  const buf = Buffer.alloc(48);
  fs.readSync(fd, buf, 0, 48, 0);
  fs.closeSync(fd);
  return buf.toString("utf8").startsWith("version https://git-lfs.github.com");
}

export type PackageCheck = {
  srcs: string[];
  files: string[];
  missing: string[];
  lfs: string[];
};

export function inspectPackage(post: Post): PackageCheck {
  const srcs = imageSrcs(post);
  const missing: string[] = [];
  const lfs: string[] = [];
  const files: string[] = [];
  for (const src of srcs) {
    const full = publicImagePath(src);
    if (!fs.existsSync(full)) {
      missing.push(src);
      continue;
    }
    if (isLfsPointer(full)) {
      lfs.push(src);
      continue;
    }
    files.push(imageFileName(src));
  }
  return { srcs, files, missing, lfs };
}

export function assertCompletePackage(post: Post): PackageCheck {
  const pack = inspectPackage(post);
  const errors: string[] = [];
  if (!post.image) errors.push("缺头图：frontmatter 需要 image: /images/{slug}.jpg");
  if (pack.missing.length) errors.push(`缺图文件：${pack.missing.join("、")}`);
  if (pack.lfs.length) errors.push(`还是 Git LFS 指针，不是照片：${pack.lfs.join("、")}`);
  if (errors.length) {
    throw new Error(`${post.slug} 不是完整图文稿：\n- ${errors.join("\n- ")}`);
  }
  const bodyCount = pack.srcs.filter((src) => src !== post.image).length;
  if (post.section === "yingxiang" && bodyCount < 3) {
    console.warn("影像专题文内图少于 3 张。IMAGE-STYLE：图文一一对应。");
  } else if (post.section !== "jianbao" && bodyCount < 2) {
    console.warn("文内图少于 2 张。完整稿通常是头图 + 两张文内图。");
  }
  return pack;
}

function sameFile(a: string, b: string): boolean {
  if (!fs.existsSync(b)) return false;
  const left = fs.statSync(a);
  const right = fs.statSync(b);
  return left.size === right.size && Math.abs(left.mtimeMs - right.mtimeMs) < 1000;
}

export function syncImagesToWorkerAssets(fileNames: string[]): boolean {
  if (!fs.existsSync(path.join(process.cwd(), ".open-next", "assets"))) {
    return false;
  }
  fs.mkdirSync(ASSET_IMAGES, { recursive: true });
  let changed = false;
  for (const name of fileNames) {
    const from = path.join(PUBLIC_IMAGES, name);
    const to = path.join(ASSET_IMAGES, name);
    if (sameFile(from, to)) continue;
    fs.copyFileSync(from, to);
    fs.utimesSync(to, fs.statSync(from).atime, fs.statSync(from).mtime);
    changed = true;
  }
  return changed;
}

export function copyIncomingImages(slug: string, incoming: string[]): string[] {
  if (incoming.length === 0) return [];
  fs.mkdirSync(PUBLIC_IMAGES, { recursive: true });
  const destNames: string[] = [];
  incoming.forEach((file, index) => {
    const resolved = path.resolve(file);
    if (!fs.existsSync(resolved)) {
      throw new Error(`找不到配图 ${file}`);
    }
    const ext = path.extname(resolved).toLowerCase() || ".jpg";
    const destName = index === 0 ? `${slug}${ext}` : `${slug}-${String(index).padStart(2, "0")}${ext}`;
    const dest = path.join(PUBLIC_IMAGES, destName);
    fs.copyFileSync(resolved, dest);
    destNames.push(destName);
  });
  return destNames;
}
