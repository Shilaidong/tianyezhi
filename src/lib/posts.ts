import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { SectionId } from "./sections";

export type CoverMotif =
  | "terrace"
  | "tree"
  | "market"
  | "horn"
  | "ferry"
  | "flame"
  | "jiebei";

export type Post = {
  slug: string;
  title: string;
  dek: string;
  pullTitle?: string;
  author: string;
  place: string;
  date: string;
  section: SectionId;
  issue?: string;
  featured?: boolean;
  motif: CoverMotif;
  image?: string;
  native?: string;
  nativeLang?: string;
  coords?: [number, number];
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

function toDateString(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

function toCoords(value: unknown): [number, number] | undefined {
  if (Array.isArray(value) && value.length === 2) {
    return [Number(value[0]), Number(value[1])];
  }
  return undefined;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${y}年${m}月${d}日`;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? "无题"),
        dek: String(data.dek ?? ""),
        pullTitle: data.pullTitle ? String(data.pullTitle) : undefined,
        author: String(data.author ?? "佚名"),
        place: String(data.place ?? ""),
        date: toDateString(data.date),
        section: String(data.section ?? "sanwen") as SectionId,
        issue: data.issue ? String(data.issue) : undefined,
        featured: Boolean(data.featured),
        motif: (data.motif ?? "terrace") as CoverMotif,
        image: data.image ? String(data.image) : undefined,
        native: data.native ? String(data.native) : undefined,
        nativeLang: data.nativeLang ? String(data.nativeLang) : undefined,
        coords: toCoords(data.coords),
        content: content.trim(),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsBySection(section: SectionId): Post[] {
  return getAllPosts().filter((post) => post.section === section);
}

export function getPostsByAuthor(author: string): Post[] {
  return getAllPosts().filter((post) => post.author === author);
}
