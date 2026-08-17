import type { Author } from "../src/lib/authors";
import type { Issue } from "../src/lib/issues";
import type { Letter } from "../src/lib/letters";
import type { Post } from "../src/lib/posts";
import { sqlNullable, sqlReal, sqlString } from "./sql";

export function insertIssueSql(issue: Issue, current: boolean): string {
  return `INSERT INTO issues (n, title, season, color, blurb, label, current) VALUES (${
    issue.n
  }, ${sqlString(issue.title)}, ${sqlString(issue.season)}, ${sqlString(issue.color)}, ${sqlString(
    issue.blurb,
  )}, ${sqlString(issue.label)}, ${current ? 1 : 0})
ON CONFLICT(n) DO UPDATE SET
  title=excluded.title,
  season=excluded.season,
  color=excluded.color,
  blurb=excluded.blurb,
  label=excluded.label,
  current=excluded.current;`;
}

export function insertAuthorSql(author: Author): string {
  return `INSERT INTO authors (slug, name, place, bio, network) VALUES (${sqlString(
    author.slug,
  )}, ${sqlString(author.name)}, ${sqlString(author.place)}, ${sqlString(author.bio)}, ${
    author.network ? 1 : 0
  })
ON CONFLICT(slug) DO UPDATE SET
  name=excluded.name,
  place=excluded.place,
  bio=excluded.bio,
  network=excluded.network;`;
}

export function insertPostSql(post: Post): string {
  return `INSERT INTO posts (slug, title, dek, pull_title, author, place, date, section, issue, featured, motif, image, native, native_lang, coords_lat, coords_lng, content) VALUES (${sqlString(
    post.slug,
  )}, ${sqlString(post.title)}, ${sqlString(post.dek)}, ${sqlNullable(post.pullTitle)}, ${sqlString(
    post.author,
  )}, ${sqlString(post.place)}, ${sqlString(post.date)}, ${sqlString(post.section)}, ${sqlNullable(
    post.issue,
  )}, ${post.featured ? 1 : 0}, ${sqlString(post.motif)}, ${sqlNullable(post.image)}, ${sqlNullable(
    post.native,
  )}, ${sqlNullable(post.nativeLang)}, ${sqlReal(post.coords?.[0])}, ${sqlReal(
    post.coords?.[1],
  )}, ${sqlString(post.content)})
ON CONFLICT(slug) DO UPDATE SET
  title=excluded.title,
  dek=excluded.dek,
  pull_title=excluded.pull_title,
  author=excluded.author,
  place=excluded.place,
  date=excluded.date,
  section=excluded.section,
  issue=excluded.issue,
  featured=excluded.featured,
  motif=excluded.motif,
  image=excluded.image,
  native=excluded.native,
  native_lang=excluded.native_lang,
  coords_lat=excluded.coords_lat,
  coords_lng=excluded.coords_lng,
  content=excluded.content;`;
}

export function insertLetterSql(letter: Letter): string {
  return `INSERT INTO letters (file_slug, subject, author, section, post_slug, phone, wechat, body) VALUES (${sqlString(
    letter.fileSlug,
  )}, ${sqlString(letter.subject)}, ${sqlString(letter.author)}, ${sqlString(
    letter.section,
  )}, ${sqlString(letter.postSlug)}, ${sqlString(letter.phone)}, ${sqlString(
    letter.wechat,
  )}, ${sqlString(letter.body)})
ON CONFLICT(file_slug) DO UPDATE SET
  subject=excluded.subject,
  author=excluded.author,
  section=excluded.section,
  post_slug=excluded.post_slug,
  phone=excluded.phone,
  wechat=excluded.wechat,
  body=excluded.body;`;
}
