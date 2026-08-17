import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/article-card";
import IssueCover from "@/components/issue-cover";
import { getIssueByN, getIssues } from "@/lib/issues";
import { getPostsByIssueLabel } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const issue = await getIssueByN(Number(n));
  if (!issue) return {};
  return { title: issue.label, description: issue.blurb };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const issue = await getIssueByN(Number(n));
  if (!issue) notFound();

  const posts = await getPostsByIssueLabel(issue.label);
  const issues = await getIssues();
  const others = issues.filter((item) => item.n !== issue.n);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-20">
      <p className="oa-label text-ink-soft">
        <Link href="/issues" className="hover:text-seal">
          特刊
        </Link>
        <span className="mx-2">/</span>
        ISSUE No.{String(issue.n).padStart(2, "0")}
      </p>

      <header className="mt-8 grid items-start gap-10 lg:grid-cols-[280px_1fr]">
        <div className="issue-cover-solo mx-auto w-[240px] lg:mx-0 lg:w-full">
          <IssueCover issue={issue} priority />
        </div>
        <div>
          <p className="oa-label text-seal">{issue.season}</p>
          <h1 className="mt-3 font-song text-[40px] font-semibold tracking-[0.2em] sm:text-[52px]">
            {issue.label}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-[17px] font-light leading-relaxed text-ink-soft">
            {issue.blurb}
          </p>
        </div>
      </header>

      <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      {others.length > 0 && (
        <nav className="mt-20 border-t border-ink/15 pt-10">
          <p className="oa-label text-ink-soft">其他特刊</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((item) => (
              <li key={item.n}>
                <Link href={`/issues/${item.n}`} className="font-song tracking-widest hover:text-seal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
