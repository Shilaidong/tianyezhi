import type { SectionId } from "./sections";
import { getDb } from "./cf";
import { getAllLettersFromFiles } from "./letters-fs";

export type Letter = {
  fileSlug: string;
  subject: string;
  author: string;
  section: SectionId;
  postSlug: string;
  phone: string;
  wechat: string;
  body: string;
};

type LetterRow = {
  file_slug: string;
  subject: string;
  author: string;
  section: string;
  post_slug: string;
  phone: string;
  wechat: string;
  body: string;
};

function mapLetter(row: LetterRow): Letter {
  return {
    fileSlug: row.file_slug,
    subject: row.subject,
    author: row.author,
    section: row.section as SectionId,
    postSlug: row.post_slug,
    phone: row.phone ?? "",
    wechat: row.wechat ?? "",
    body: row.body ?? "",
  };
}

function sortLetters(letters: Letter[], dateOf: (slug: string) => string): Letter[] {
  return [...letters].sort((a, b) => {
    const dateA = dateOf(a.postSlug);
    const dateB = dateOf(b.postSlug);
    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
  });
}

export async function getAllLetters(): Promise<Letter[]> {
  const db = await getDb();
  if (db) {
    const { results } = await db
      .prepare(
        `SELECT l.file_slug, l.subject, l.author, l.section, l.post_slug, l.phone, l.wechat, l.body
         FROM letters l
         LEFT JOIN posts p ON p.slug = l.post_slug
         ORDER BY p.date DESC`,
      )
      .all<LetterRow>();
    return (results ?? []).map(mapLetter);
  }

  const { getAllPostsFromFiles } = await import("./posts-fs");
  const posts = getAllPostsFromFiles();
  const dateOf = (slug: string) => posts.find((post) => post.slug === slug)?.date ?? "";
  return sortLetters(getAllLettersFromFiles(), dateOf);
}
