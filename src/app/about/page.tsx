import type { Metadata } from "next";
import Link from "next/link";
import { SECTIONS } from "@/lib/sections";
import { AUTHORS } from "@/lib/authors";

export const metadata: Metadata = {
  title: "关于",
  description: "关于田野志：一本写给中国边境的文学杂志。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-12">
      <header className="text-center">
        <h1 className="font-song text-[40px] font-semibold tracking-[0.25em] sm:text-[46px]">关于田野志</h1>
        <p className="oa-label mt-4 text-ink-soft">ABOUT</p>
      </header>

      <div className="prose-zh mt-10">
        <p>
          《田野志》是一本写给中国边境的文学杂志。我们记录边境地区的少数民族、
          边境汉族与他们的日常——界河边洗衣的人、口岸旁赶早市的人、
          冬牧场里最后一缕炊烟。
        </p>
        <p>
          本刊的构想受美国南方文学杂志 <em>Oxford American</em> 启发。
          我们的编辑方针译自他们的投稿页：
          <strong>让生活在社区内部的人与写作者成为中心</strong>。
          不猎奇，不俯视，不把边境当作景观——把它当作主体来书写。
        </p>

        <h2>栏目</h2>
        <p>
          {SECTIONS.map((section) => `${section.name}（${section.tagline}）`).join("，")}。
        </p>

        <h2>编辑与撰稿人网络</h2>
        <p>
          我们相信边境最好的书写者生活在边境。以下是我们的作者与本地撰稿人网络
          （<strong>◆</strong> 为本地撰稿人）：
        </p>
      </div>

      <ul className="mt-6 space-y-5">
        {AUTHORS.map((author) => (
          <li key={author.slug} className="border-b border-ink/10 pb-5">
            <p className="font-song text-lg font-bold">
              <Link
                href={`/authors/${author.slug}`}
                className="transition-colors hover:text-seal"
              >
                {author.name}
              </Link>
              {author.network && (
                <span className="ml-2 align-middle font-hei text-xs text-seal">◆</span>
              )}
              <span className="ml-3 font-hei text-xs font-normal tracking-[0.2em] text-ink-soft">
                {author.place}
              </span>
            </p>
            <p className="mt-1 font-song text-[15px] leading-relaxed text-ink-soft">
              {author.bio}
            </p>
          </li>
        ))}
      </ul>

      <div className="prose-zh mt-10">
        <h2>AI 使用原则</h2>
        <p>
          田野志是一本 AI 原生杂志，但有不可妥协的底线：
          <strong>AI 负责发现与汇编，人负责判断与书写</strong>。
          特写、散文、影像与口述栏目永远由人创作；
          「简报」栏目由我们的「边境雷达」依据公开信源自动汇编，
          每条均经人工核读与点发，并在页面显著位置标注。
        </p>
        <h2>版权</h2>
        <p>
          本站所有文字与影像的版权归作者所有，未经授权不得转载。
          转载与合作事宜请通过投稿邮箱联系。
        </p>
      </div>
    </div>
  );
}
