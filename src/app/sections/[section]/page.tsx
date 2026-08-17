import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTIONS, getSection } from "@/lib/sections";
import { getPostsBySection } from "@/lib/posts";
import ArticleCard from "@/components/article-card";

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section: section.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section: id } = await params;
  const section = getSection(id);
  if (!section) return {};
  return { title: section.name, description: section.tagline };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: id } = await params;
  const section = getSection(id);
  if (!section) notFound();

  const posts = await getPostsBySection(section.id);

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-14">
      <header className="border-b border-ink pb-8 text-center">
        <h1 className="font-song text-[40px] font-semibold tracking-[0.25em] sm:text-[46px]">
          {section.name}
        </h1>
        <p className="oa-label mt-4 text-ink-soft">{section.tagline}</p>
      </header>

      {section.aiCompiled && (
        <div className="mx-auto mt-8 max-w-2xl border border-ink/15 bg-paper-deep px-5 py-4 text-center font-hei text-[13px] font-light leading-relaxed text-ink-soft">
          本栏目由「边境雷达」AI 依据公开信源汇编，每条经人工核读与点发。
          田野志的特写、散文、影像与口述栏目永远由人创作。
        </div>
      )}

      {posts.length === 0 ? (
        <p className="py-20 text-center font-body font-light text-ink-soft">
          这个栏目还在酝酿中，欢迎来稿。
        </p>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
