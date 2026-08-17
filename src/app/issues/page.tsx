import type { Metadata } from "next";
import Link from "next/link";
import { getIssues } from "@/lib/issues";
import IssueCover from "@/components/issue-cover";

export const metadata: Metadata = {
  title: "特刊",
  description: "田野志每年一个重量主题，慢慢做，认真做。",
};

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-20">
      <header className="max-w-2xl">
        <h1 className="font-song text-[40px] font-semibold tracking-[0.25em] sm:text-[46px]">特刊</h1>
        <p className="oa-label mt-4 text-ink-soft">ISSUES</p>
        <p className="mt-6 font-song text-[16px] leading-relaxed text-ink-soft">
          每期一个主题。点开封面，就是这一期的全部文章。
        </p>
      </header>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <Link key={issue.n} href={`/issues/${issue.n}`} className="issue-cover-solo group">
            <IssueCover issue={issue} />
            <p className="mt-4 font-song text-[15px] tracking-[0.16em] group-hover:text-seal">
              {issue.label}
            </p>
            <p className="mt-1 oa-label text-ink-soft">{issue.season}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
