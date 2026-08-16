import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getPostsBySection, formatDate } from "@/lib/posts";
import { getSection } from "@/lib/sections";
import { getAuthorByName } from "@/lib/authors";
import CoverPhoto from "@/components/cover-photo";
import Prose from "@/components/prose";
import ArticleCard from "@/components/article-card";
import { IconCheck } from "@/components/icons";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.dek };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const section = getSection(post.section);
  const author = getAuthorByName(post.author);
  const related = getPostsBySection(post.section)
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <article>
      <header className="oa-container oa-section" style={{ paddingBottom: 20 }}>
        <p className="oa-accent">
          <Link href={`/sections/${post.section}`}>
            {section?.name}
          </Link>
          {section?.aiCompiled ? " · AI 汇编" : ""}
          {post.issue ? ` · ${post.issue}` : ""}
        </p>
        <h1 className="oa-h1" style={{ marginTop: 12 }}>
          {post.title}
        </h1>
        <p className="oa-excerpt" style={{ maxWidth: 700, marginTop: 16 }}>
          {post.dek}
        </p>
        {post.pullTitle && (
          <p className="font-song text-[22px] mt-4">「{post.pullTitle}」</p>
        )}
        {post.native && (
          <span className="oa-card-native oa-card-native--ink" lang={post.nativeLang}>
            {post.native}
          </span>
        )}
        <p className="oa-accent" style={{ marginTop: 20 }}>
          文 /{" "}
          {author ? (
            <Link href={`/authors/${author.slug}`}>{post.author}</Link>
          ) : (
            post.author
          )}
          {post.place ? ` · ${post.place}` : ""} · {formatDate(post.date)}
        </p>
      </header>

      <div className="oa-container" style={{ maxWidth: 960 }}>
        <CoverPhoto
          image={post.image}
          motif={post.motif}
          alt={post.title}
          priority
          className="aspect-[16/9] w-full"
        />
      </div>

      {section?.aiCompiled && (
        <div className="mx-auto mt-10 max-w-[700px] border border-black/10 bg-[#f0f0f0] px-5 py-4 text-[13px] leading-relaxed">
          本文由「边境雷达」依据公开信源自动汇编，经编辑人工核读与点发。
          田野志的特写、散文、影像与口述栏目永远由人创作。
        </div>
      )}

      <div className="oa-container oa-section" style={{ maxWidth: 700 }}>
        <Prose content={post.content} dropcap />
        <div className="mt-16 flex items-center justify-center gap-4" aria-hidden="true">
          <span className="h-px w-20 bg-ink/15" />
          <span className="inline-flex items-center gap-1.5 text-seal">
            <IconCheck className="h-3.5 w-3.5" />
            <span className="font-song text-xs tracking-[0.3em]">完</span>
          </span>
          <span className="h-px w-20 bg-ink/15" />
        </div>
      </div>

      {related.length > 0 && (
        <section className="oa-container oa-section">
          <div className="flex items-baseline justify-between border-b border-ink pb-4">
            <h2 className="oa-section-title" style={{ fontSize: 24 }}>
              更多「{section?.name}」
            </h2>
            <Link
              href={`/sections/${post.section}`}
              className="oa-label text-ink-soft hover:text-seal"
            >
              查看全部 →
            </Link>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
