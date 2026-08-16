import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { ISSUES } from "@/lib/issues";
import ArticleCard from "@/components/article-card";

export const metadata: Metadata = {
  title: "特刊",
  description: "田野志每年一个重量主题，慢慢做，认真做。",
};

export default function IssuesPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-20">
      {ISSUES.map((issue, index) => {
        const issuePosts = posts.filter((post) => post.issue === issue.label);
        const Heading = index === 0 ? "h1" : "h2";
        return (
          <section key={issue.n} className={index === 0 ? undefined : "mt-20"}>
            <header
              className="relative overflow-hidden px-8 py-14 text-paper sm:px-14"
              style={{ backgroundColor: issue.color }}
            >
              <div
                aria-hidden="true"
                className="vertical-rl absolute right-6 top-6 select-none font-song text-lg font-bold tracking-[0.5em] text-paper/40 sm:right-10 sm:text-2xl"
              >
                田野志
              </div>
              <p className="oa-label text-paper/70">
                ISSUE No.{issue.n} · {issue.season}
              </p>
              <Heading className="mt-4 font-song text-[44px] font-semibold tracking-[0.2em] leading-[1.2] sm:text-[56px]">
                {issue.label}
              </Heading>
              <p className="mt-6 max-w-2xl font-body text-[17px] font-light leading-relaxed text-paper/85">
                {issue.blurb}
              </p>
            </header>

            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {issuePosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
