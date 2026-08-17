import Link from "next/link";
import { getPostsBySection } from "@/lib/posts";
import OverlayCard from "./overlay-card";
import { IconArrowRight } from "./icons";

export default async function PodcastBlock() {
  const posts = await getPostsBySection("shengyin");
  const latest = posts[0];

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-20">
      <div className="flex items-baseline justify-between border-b border-ink pb-4">
        <div>
          <h2 className="oa-section-title">声音</h2>
          <span className="oa-native oa-native--en">Field Recordings</span>
        </div>
        <Link
          href="/sections/shengyin"
          className="oa-label text-ink-soft transition-colors hover:text-seal"
        >
          查看全部 <IconArrowRight className="oa-arrow" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {latest && <OverlayCard post={latest} size="half" />}
        {/* 对标 OA 的 Points South 播客区 */}
        <div className="flex h-[240px] flex-col justify-between bg-ink p-8 text-paper md:h-[288px]">
          <div>
            <p className="oa-label text-straw">播客 · 筹备中</p>
            <h3 className="mt-3 font-song text-[22px] font-semibold leading-snug tracking-wide">
              「江声」—— 边境田野录音计划
            </h3>
            <p className="mt-3 font-body text-[15px] font-light leading-relaxed text-paper/80">
              民歌、方言、渡口的水声与集市的人声。我们正在录制中国第一档边境声音纪录片播客。
            </p>
          </div>
          <p className="oa-label text-paper/60">预计 2027 年春上线</p>
        </div>
      </div>
    </section>
  );
}
