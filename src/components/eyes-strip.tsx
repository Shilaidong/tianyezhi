import Link from "next/link";
import { getPostsBySection } from "@/lib/posts";
import OverlayCard from "./overlay-card";
import { IconArrowRight } from "./icons";

export default async function EyesStrip() {
  const posts = await getPostsBySection("yingxiang");
  if (posts.length === 0) return null;

  return (
    <section className="pt-20">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex items-baseline justify-between border-b border-ink pb-4">
          <div>
            <h2 className="oa-section-title">影像</h2>
            <span className="oa-native oa-native--en">Eyes on the Borderlands</span>
          </div>
          <Link
            href="/sections/yingxiang"
            className="oa-label text-ink-soft transition-colors hover:text-seal"
          >
            查看全部 <IconArrowRight className="oa-arrow" />
          </Link>
        </div>
      </div>
      {/* OA 的 Eyes on the South 横排滚动图片带 */}
      <div className="mt-8 overflow-x-auto pb-4">
        <div className="mx-auto flex max-w-[1400px] snap-x snap-mandatory gap-5 px-6">
          {posts.map((post) => (
            <OverlayCard key={post.slug} post={post} size="strip" />
          ))}
        </div>
      </div>
    </section>
  );
}
