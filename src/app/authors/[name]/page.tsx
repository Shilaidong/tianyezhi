import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUTHORS, getAuthorBySlug as getAuthor } from "@/lib/authors";
import { getPost, getPostsByAuthor, type Post } from "@/lib/posts";
import { getAllLetters } from "@/lib/letters";
import ArticleCard from "@/components/article-card";

export function generateStaticParams() {
  return AUTHORS.map((author) => ({ name: author.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const author = getAuthor(name);
  if (!author) return {};
  return { title: author.name, description: author.bio };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const author = getAuthor(name);
  if (!author) notFound();

  const authored = getPostsByAuthor(author.name);
  const credited = getAllLetters()
    .filter((letter) => letter.author === author.name)
    .map((letter) => getPost(letter.postSlug))
    .filter((post): post is Post => Boolean(post));
  const seen = new Set(authored.map((post) => post.slug));
  const posts = [...authored, ...credited.filter((post) => !seen.has(post.slug))];

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12">
      <header className="mx-auto max-w-2xl border-b border-ink pb-8 text-center">
        <p className="oa-label text-seal">
          {author.network ? "本地撰稿人" : "作者"}
        </p>
        <h1 className="mt-5 font-song text-[40px] font-semibold tracking-[0.2em] sm:text-[46px]">
          {author.name}
        </h1>
        <p className="oa-label mt-4 text-ink-soft">
          {author.place}
        </p>
        <p className="mt-5 font-body font-light leading-relaxed text-ink">{author.bio}</p>
      </header>

      {posts.length === 0 ? (
        <p className="py-20 text-center font-song text-ink-soft">文章整理中。</p>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
