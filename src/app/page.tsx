import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getCurrentIssue, getIssues } from "@/lib/issues";
import ArticleCard from "@/components/article-card";
import FeaturedHero from "@/components/featured-hero";
import SquareSplit from "@/components/square-split";
import OverlayCard from "@/components/overlay-card";
import PullQuote from "@/components/pull-quote";
import IssueDeck from "@/components/issue-deck";
import PodcastBlock from "@/components/podcast-block";
import GoodsBlock from "@/components/goods-block";
import SupportBlock from "@/components/support-block";
import { IconArrowRight } from "@/components/icons";

export default async function Home() {
  const posts = await getAllPosts();
  const issues = await getIssues();
  const currentIssue = await getCurrentIssue();
  const texie = posts.filter((post) => post.section === "texie").slice(0, 5);
  const featured = texie[0];
  const splits = texie.slice(1, 3);
  const halves = texie.slice(3, 5);
  const used = new Set(texie.map((post) => post.slug));
  const latest = posts
    .filter((post) => post.section !== "jianbao" && !used.has(post.slug))
    .slice(0, 6);

  return (
    <div>
      <section className="oa-container oa-section-first">
        <div className="oa-grid">
          {featured && <FeaturedHero post={featured} />}
          {splits.length > 0 && (
            <div className="oa-feature-stack">
              {splits.map((post) => (
                <SquareSplit key={post.slug} post={post} />
              ))}
            </div>
          )}
          {halves.map((post) => (
            <OverlayCard key={post.slug} post={post} size="half" />
          ))}
        </div>
      </section>

      <PullQuote
        dark
        quote="河流从不问两岸的人属于哪一边。"
        source="《田野志 · 界河》发刊词"
        enSub="A river never asks which bank its people belong to."
      />

      <IssueDeck issues={issues} />

      <section className="oa-container oa-section">
        <h1 className="oa-section-title">最新文章</h1>
        <div className="mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <PullQuote
        quote="雪停的时候，整个山谷只剩我们家的烟囱在冒烟。"
        source="哈萨克族牧民 · 巴合提别克"
        enSub="When the snow stops, ours is the only chimney smoking in the valley."
      />

      <PodcastBlock />
      <GoodsBlock />
      <SupportBlock />

      <section className="oa-container oa-section">
        <Link
          href={`/issues/${currentIssue.n}`}
          className="block px-8 py-14 text-white sm:px-16"
          style={{ backgroundColor: currentIssue.color }}
        >
          <p className="oa-accent text-white/70">
            特刊 · ISSUE No.{currentIssue.n} · {currentIssue.season}
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-song text-[34px] font-normal tracking-[0.16em] sm:text-[44px]">
              {currentIssue.label}
            </h2>
            <span className="oa-accent text-white/70 inline-flex items-center">
              浏览本期 <IconArrowRight className="oa-arrow" />
            </span>
          </div>
          <p className="mt-5 max-w-2xl font-body text-[16.5px] font-light leading-7 text-white/85">
            {currentIssue.blurb}
          </p>
        </Link>
      </section>
    </div>
  );
}
