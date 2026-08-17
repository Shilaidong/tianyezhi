import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { SectionId } from "./sections";
import type { Letter } from "./letters";

const LETTERS_DIR = path.join(process.cwd(), "content", "submissions");

function readLetterFile(file: string): Letter | undefined {
  try {
    const raw = fs.readFileSync(path.join(LETTERS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      fileSlug: file.replace(/\.md$/, ""),
      subject: String(data.subject ?? ""),
      author: String(data.author ?? ""),
      section: String(data.section ?? "sanwen") as SectionId,
      postSlug: String(data.slug ?? file.replace(/\.md$/, "")),
      phone: String(data.phone ?? ""),
      wechat: String(data.wechat ?? ""),
      body: content.trim(),
    };
  } catch {
    return undefined;
  }
}

export function getLetterFromFile(slug: string): Letter | undefined {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(LETTERS_DIR, file))) return undefined;
  return readLetterFile(file);
}

export function getAllLettersFromFiles(): Letter[] {
  if (!fs.existsSync(LETTERS_DIR)) return [];
  return fs
    .readdirSync(LETTERS_DIR)
    .filter((file) => file.endsWith(".md"))
    .flatMap((file) => {
      const letter = readLetterFile(file);
      return letter ? [letter] : [];
    });
}
