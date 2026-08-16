import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { SectionId } from "./sections";
import { getAllPosts } from "./posts";

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

const LETTERS_DIR = path.join(process.cwd(), "content", "submissions");

export function getAllLetters(): Letter[] {
  if (!fs.existsSync(LETTERS_DIR)) return [];
  const posts = getAllPosts();
  const dateOf = (slug: string) => posts.find((post) => post.slug === slug)?.date ?? "";

  return fs
    .readdirSync(LETTERS_DIR)
    .filter((file) => file.endsWith(".md"))
    .flatMap((file) => {
      try {
        const raw = fs.readFileSync(path.join(LETTERS_DIR, file), "utf8");
        const { data, content } = matter(raw);
        return [
          {
            fileSlug: file.replace(/\.md$/, ""),
            subject: String(data.subject ?? ""),
            author: String(data.author ?? ""),
            section: String(data.section ?? "sanwen") as SectionId,
            postSlug: String(data.slug ?? file.replace(/\.md$/, "")),
            phone: String(data.phone ?? ""),
            wechat: String(data.wechat ?? ""),
            body: content.trim(),
          } satisfies Letter,
        ];
      } catch {
        return [];
      }
    })
    .sort((a, b) => {
      const dateA = dateOf(a.postSlug);
      const dateB = dateOf(b.postSlug);
      return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
    });
}

