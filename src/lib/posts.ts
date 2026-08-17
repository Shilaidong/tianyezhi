import type { SectionId } from "./sections";
import { getDb } from "./cf";
import { getAllPostsFromFiles } from "./posts-fs";

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

type PostRow = {
  slug: string;
  title: string;
  dek: string;
  pull_title: string | null;
  author: string;
  place: string;
  date: string;
  section: string;
  issue: string | null;
  featured: number;
  motif: string;
  image: string | null;
  native: string | null;
  native_lang: string | null;
  coords_lat: number | null;
  coords_lng: number | null;
  content: string;
};

function mapPost(row: PostRow): Post {
  const coords =
    row.coords_lat != null && row.coords_lng != null
      ? ([Number(row.coords_lat), Number(row.coords_lng)] as [number, number])
      : undefined;
  return {
    slug: row.slug,
    title: row.title,
    dek: row.dek ?? "",
    pullTitle: row.pull_title ?? undefined,
    author: row.author,
    place: row.place ?? "",
    date: row.date,
    section: row.section as SectionId,
    issue: row.issue ?? undefined,
    featured: Boolean(row.featured),
    motif: (row.motif ?? "terrace") as CoverMotif,
    image: row.image ?? undefined,
    native: row.native ?? undefined,
    nativeLang: row.native_lang ?? undefined,
    coords,
    content: row.content ?? "",
  };
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${y}年${m}月${d}日`;
}

export async function getAllPosts(): Promise<Post[]> {
  const db = await getDb();
  if (db) {
    const { results } = await db
      .prepare("SELECT * FROM posts ORDER BY date DESC")
      .all<PostRow>();
    return (results ?? []).map(mapPost);
  }
  return getAllPostsFromFiles();
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const db = await getDb();
  if (db) {
    const row = await db
      .prepare("SELECT * FROM posts WHERE slug = ?")
      .bind(slug)
      .first<PostRow>();
    return row ? mapPost(row) : undefined;
  }
  return getAllPostsFromFiles().find((post) => post.slug === slug);
}

export async function getPostsBySection(section: SectionId): Promise<Post[]> {
  const db = await getDb();
  if (db) {
    const { results } = await db
      .prepare("SELECT * FROM posts WHERE section = ? ORDER BY date DESC")
      .bind(section)
      .all<PostRow>();
    return (results ?? []).map(mapPost);
  }
  return getAllPostsFromFiles().filter((post) => post.section === section);
}

export async function getPostsByAuthor(author: string): Promise<Post[]> {
  const db = await getDb();
  if (db) {
    const { results } = await db
      .prepare("SELECT * FROM posts WHERE author = ? ORDER BY date DESC")
      .bind(author)
      .all<PostRow>();
    return (results ?? []).map(mapPost);
  }
  return getAllPostsFromFiles().filter((post) => post.author === author);
}
