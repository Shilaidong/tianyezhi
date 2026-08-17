import fs from "node:fs";
import path from "node:path";
import { AUTHORS, type Author } from "../src/lib/authors";
import { ISSUES } from "../src/lib/issues";
import { getLetterFromFile } from "../src/lib/letters-fs";
import type { CoverMotif } from "../src/lib/posts";
import { getPostFromFile } from "../src/lib/posts-fs";
import { SECTIONS, type SectionId } from "../src/lib/sections";
import {
  assertCompletePackage,
  copyIncomingImages,
  syncImagesToWorkerAssets,
} from "./article-package";
import { runWithProxyFallback } from "./cf-net";
import { insertAuthorSql, insertLetterSql, insertPostSql } from "./content-sql";
import { applyMigrations, executeSqlFile } from "./d1-exec";

const MOTIFS: CoverMotif[] = [
  "terrace",
  "tree",
  "market",
  "horn",
  "ferry",
  "flame",
  "jiebei",
];
const SECTION_IDS = SECTIONS.map((section) => section.id);

type Flags = Record<string, string | boolean>;

function parseArgs(argv: string[]): { command: string; positional: string[]; flags: Flags } {
  const flags: Flags = {};
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        flags[key] = true;
      } else {
        flags[key] = next;
        i += 1;
      }
    } else {
      positional.push(arg);
    }
  }
  return { command: positional[0] ?? "help", positional: positional.slice(1), flags };
}

function flag(flags: Flags, name: string): string | undefined {
  const value = flags[name];
  if (typeof value === "string") return value;
  return undefined;
}

function yamlValue(value: string): string {
  if (value === "" || /[:#{}[\],&*?'"]|^\s|\s$|\n/.test(value)) {
    return JSON.stringify(value);
  }
  return value;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function sectionName(id: SectionId): string {
  return SECTIONS.find((section) => section.id === id)?.name ?? id;
}

function findAuthor(name: string): Author | undefined {
  return AUTHORS.find((author) => author.name === name);
}

function usage(): string {
  return `田野志发稿 CLI

完整稿 = content/posts/{slug}.md
        + public/images 里头图和文内图
        + 可选 content/submissions/{slug}.md

有 GitHub 仓库写权限就能发，不要 wrangler login。详见 PUBLISH.md。

用法：
  npm run tyz -- check <slug>
  npm run tyz -- new --slug <拼音> --title <题> --author <作者> --section <栏目> --place <地点> --images a.jpg,b.jpg,c.jpg
  npm run tyz -- publish <slug> --local

栏目：${SECTION_IDS.join(" / ")}
封面：${MOTIFS.join(" / ")}

new 可选：--dek --date --issue --motif --pull-title --featured --coords 28.49,97.02
         --bio --author-slug --network --letter --phone --wechat
check 核对图文。上线是 git push 到 main。
没有 CLOUDFLARE_API_TOKEN 时，publish 不会用个人 Cloudflare 登录去改线上。`;
}

function writePostFile(opts: {
  slug: string;
  title: string;
  dek: string;
  author: string;
  place: string;
  date: string;
  section: SectionId;
  issue?: string;
  featured: boolean;
  motif: CoverMotif;
  image?: string;
  pullTitle?: string;
  coords?: [number, number];
  body: string;
}): string {
  const lines = [
    "---",
    `title: ${yamlValue(opts.title)}`,
    `dek: ${yamlValue(opts.dek)}`,
    `author: ${yamlValue(opts.author)}`,
    `place: ${yamlValue(opts.place)}`,
    `date: ${opts.date}`,
    `section: ${opts.section}`,
  ];
  if (opts.issue) lines.push(`issue: ${yamlValue(opts.issue)}`);
  if (opts.featured) lines.push("featured: true");
  lines.push(`motif: ${opts.motif}`);
  if (opts.image) lines.push(`image: ${opts.image}`);
  if (opts.coords) lines.push(`coords: [${opts.coords[0]}, ${opts.coords[1]}]`);
  if (opts.pullTitle) lines.push(`pullTitle: ${yamlValue(opts.pullTitle)}`);
  lines.push("---", "", opts.body.trim(), "");
  const file = path.join(process.cwd(), "content", "posts", `${opts.slug}.md`);
  fs.writeFileSync(file, lines.join("\n"), "utf8");
  return file;
}

function writeLetterFile(opts: {
  slug: string;
  title: string;
  author: string;
  section: SectionId;
  place: string;
  dek: string;
  phone: string;
  wechat: string;
  body?: string;
}): string {
  const subject = `投稿｜${sectionName(opts.section)}｜${opts.title}`;
  const body =
    opts.body?.trim() ||
    [
      "编辑老师好：",
      "",
      `我是${opts.author}。稿件《${opts.title}》，${sectionName(opts.section)}。${opts.dek}`.trim(),
      "",
      "本稿首发，未投其他刊物。",
      "",
      "无论采用与否，期待回复。",
      "",
      opts.author,
      opts.phone ? `电话：${opts.phone}` : "",
      opts.wechat ? `微信：${opts.wechat}` : "",
      opts.place,
    ]
      .filter((line) => line !== "")
      .join("\n");
  const lines = [
    "---",
    `subject: ${yamlValue(subject)}`,
    `author: ${yamlValue(opts.author)}`,
    `section: ${opts.section}`,
    `slug: ${opts.slug}`,
    `phone: ${yamlValue(opts.phone)}`,
    `wechat: ${yamlValue(opts.wechat)}`,
    "---",
    "",
    body,
    "",
  ];
  const file = path.join(process.cwd(), "content", "submissions", `${opts.slug}.md`);
  fs.writeFileSync(file, lines.join("\n"), "utf8");
  return file;
}

function resolveAuthor(name: string, flags: Flags, place: string): Author | undefined {
  const existing = findAuthor(name);
  if (existing) return existing;
  const slug = flag(flags, "author-slug");
  const bio = flag(flags, "bio");
  if (!slug || !bio) return undefined;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`--author-slug 只能用小写字母、数字和连字符：${slug}`);
  }
  return {
    slug,
    name,
    place: flag(flags, "author-place") ?? place,
    bio,
    network: Boolean(flags.network),
  };
}

function defaultBody(imageNames: string[]): string {
  const inline = imageNames.slice(1);
  if (inline.length === 0) return "";
  return inline.map((name) => `![图注](/images/${name})\n`).join("\n");
}

function deployAssets(): void {
  const status = runWithProxyFallback("npx", ["wrangler", "deploy"], {
    OPEN_NEXT_DEPLOY: "true",
  });
  if (status !== 0) process.exit(status);
}

function hasSharedToken(): boolean {
  return Boolean(process.env.CLOUDFLARE_API_TOKEN);
}

function publishSlug(slug: string, flags: Flags): void {
  const post = getPostFromFile(slug);
  if (!post) {
    throw new Error(`找不到 content/posts/${slug}.md`);
  }
  const pack = assertCompletePackage(post);
  const remote = !flags.local;
  if (flags.check || flags["dry-run"]) {
    console.log(`${slug} 完整图文稿`);
    console.log(`images: ${pack.srcs.join(", ")}`);
    return;
  }

  if (remote && !hasSharedToken()) {
    console.log(`${slug} 完整图文稿`);
    console.log(`images: ${pack.srcs.join(", ")}`);
    console.log(`
不要 wrangler login。发稿权限是 GitHub 仓库写权限，不是 Cloudflare 个人登录。

把这些文件推进 main，CI 会灌 D1 并部署：
  content/posts/${slug}.md
  ${pack.files.map((name) => `public/images/${name}`).join("\n  ")}
  ${getLetterFromFile(slug) ? `content/submissions/${slug}.md` : ""}

说明见 PUBLISH.md。编辑部若给了 CLOUDFLARE_API_TOKEN，设进环境变量后再跑 publish。
`.trim());
    return;
  }

  if (!remote) applyMigrations(false);

  const statements: string[] = [];
  const author = resolveAuthor(post.author, flags, post.place);
  if (author) {
    statements.push(insertAuthorSql(author));
  } else {
    console.warn(
      `作者「${post.author}」不在作者表。文章仍会发布，作者页无链接。新人请加 --author-slug 与 --bio。`,
    );
  }
  statements.push(insertPostSql(post));
  const letter = getLetterFromFile(slug);
  if (letter) statements.push(insertLetterSql(letter));
  else console.warn(`没有 content/submissions/${slug}.md，投稿页不会出现这封信。`);

  executeSqlFile(statements.join("\n"), remote);
  console.log(`published ${slug} → D1 ${remote ? "remote" : "local"}`);
  console.log(`images: ${pack.srcs.join(", ")}`);

  if (!remote) return;

  const copied = syncImagesToWorkerAssets(pack.files);
  if (!copied && fs.existsSync(path.join(process.cwd(), ".open-next", "assets"))) {
    console.log("照片已在 Worker 静态资源里，未改文件，跳过部署。");
    return;
  }
  if (!fs.existsSync(path.join(process.cwd(), ".open-next", "assets"))) {
    console.log("没有现成的 .open-next，整包构建部署（与并进 main 后 deploy 相同）。");
    const status = runWithProxyFallback("npx", ["opennextjs-cloudflare", "build"]);
    if (status !== 0) process.exit(status);
    syncImagesToWorkerAssets(pack.files);
  } else {
    console.log("已把照片拷进 .open-next/assets/images，部署静态资源。");
  }
  deployAssets();
}

function cmdNew(flags: Flags): void {
  const title = flag(flags, "title");
  const authorName = flag(flags, "author");
  const section = flag(flags, "section") as SectionId | undefined;
  const place = flag(flags, "place");
  const slug = flag(flags, "slug");
  const imagesArg = flag(flags, "images");
  if (!title || !authorName || !section || !place || !slug) {
    throw new Error("new 需要 --slug --title --author --section --place --images 头图.jpg,文内1.jpg,文内2.jpg");
  }
  if (!imagesArg) {
    throw new Error("投稿是图文一起的。请加 --images 头图.jpg,文内1.jpg,文内2.jpg");
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`--slug 只能用小写字母、数字和连字符：${slug}`);
  }
  if (!SECTION_IDS.includes(section)) {
    throw new Error(`未知栏目 ${section}。可选：${SECTION_IDS.join(", ")}`);
  }
  const motif = (flag(flags, "motif") ?? "terrace") as CoverMotif;
  if (!MOTIFS.includes(motif)) {
    throw new Error(`未知封面 ${motif}。可选：${MOTIFS.join(", ")}`);
  }
  const issue = flag(flags, "issue");
  if (issue && !ISSUES.some((item) => item.label === issue)) {
    console.warn(
      `特刊「${issue}」不在已知列表：${ISSUES.map((item) => item.label).join(" / ")}`,
    );
  }
  const coordsRaw = flag(flags, "coords");
  const coords = coordsRaw
    ? (coordsRaw.split(",").map((part) => Number(part.trim())) as [number, number])
    : undefined;
  if (coords && (coords.length !== 2 || coords.some((n) => Number.isNaN(n)))) {
    throw new Error("--coords 格式：28.49,97.02");
  }

  const incoming = imagesArg.split(",").map((item) => item.trim()).filter(Boolean);
  const copied = copyIncomingImages(slug, incoming);
  const cover = copied[0] ? `/images/${copied[0]}` : undefined;
  const body = flag(flags, "body") ?? defaultBody(copied);

  const postPath = writePostFile({
    slug,
    title,
    dek: flag(flags, "dek") ?? "",
    author: authorName,
    place,
    date: flag(flags, "date") ?? today(),
    section,
    issue,
    featured: Boolean(flags.featured),
    motif,
    image: flag(flags, "image") ?? cover,
    pullTitle: flag(flags, "pull-title"),
    coords,
    body,
  });
  console.log(`wrote ${path.relative(process.cwd(), postPath)}`);
  console.log(`images → ${copied.map((name) => `public/images/${name}`).join(", ")}`);

  if (flags.letter || flag(flags, "phone") || flag(flags, "wechat")) {
    const letterPath = writeLetterFile({
      slug,
      title,
      author: authorName,
      section,
      place,
      dek: flag(flags, "dek") ?? "",
      phone: flag(flags, "phone") ?? "",
      wechat: flag(flags, "wechat") ?? "",
    });
    console.log(`wrote ${path.relative(process.cwd(), letterPath)}`);
  }

  if (flags.publish) publishSlug(slug, flags);
}

function main(): void {
  const { command, positional, flags } = parseArgs(process.argv.slice(2));
  if (command === "help" || flags.help) {
    console.log(usage());
    return;
  }
  if (command === "new") {
    cmdNew(flags);
    return;
  }
  if (command === "check" || command === "publish") {
    const slug = positional[0];
    if (!slug) throw new Error(`${command} 需要 slug，例如 npm run tyz -- ${command} chu-zhen-yao-guo-he`);
    if (command === "check") flags.check = true;
    publishSlug(slug, flags);
    return;
  }
  throw new Error(`未知命令 ${command}\n\n${usage()}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
