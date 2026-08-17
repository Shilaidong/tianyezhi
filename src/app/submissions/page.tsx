import type { Metadata } from "next";
import Link from "next/link";
import { getAllLetters } from "@/lib/letters";
import { getAllPosts } from "@/lib/posts";
import { getSection } from "@/lib/sections";
import { getAuthorByName } from "@/lib/authors";
import { FIFTH_ISSUE, getIssueByN } from "@/lib/issues";

export const metadata: Metadata = {
  title: "投稿",
  description: "田野志投稿指南：特写、边境志、散文、影像、声音、口述与简报线索。",
};

const GUIDELINES = [
  {
    name: "特写",
    body: "长篇封面故事，3000–8000 字。需要扎实的第一手采访：边境村镇、口岸、牧区的人与生活。我们只发作者亲自到过现场的稿子。",
  },
  {
    name: "边境志",
    body: "500–2000 字的快反短报道，关注「政策与人相遇之处」——通关新规、集市变迁、学校撤并，落在具体的人身上。",
  },
  {
    name: "散文",
    body: "文学性随笔与记忆书写。题材不限于新闻，但必须在边境的语境里生长出来。",
  },
  {
    name: "影像",
    body: "摄影专题，10–20 幅为一组。每幅有图、有一句说明，图文一一对应。欢迎画廊、机构与摄影师本人投稿（须获授权）。影像专题按项目支付稿酬。",
  },
  {
    name: "声音",
    body: "民歌、方言、器乐与田野录音。音频或文字稿均可。附录制背景：时间、地点、人、曲目、授权。不必写设备型号。",
  },
  {
    name: "口述",
    body: "第一人称口述史。请保留讲述者的原话与语气，整理者署名在文前注明。",
  },
  {
    name: "简报线索",
    body: "「简报」由 AI 依据公开信源汇编。你所在的边境村镇有什么正在发生的小事？欢迎来信提供线索，雷达会替你盯着。",
  },
];

export default async function SubmissionsPage() {
  const fifth = (await getIssueByN(5)) ?? FIFTH_ISSUE;
  const issueSlugs = new Set(
    (await getAllPosts())
      .filter((post) => post.issue === fifth.label)
      .map((post) => post.slug),
  );
  const letters = (await getAllLetters()).filter((letter) =>
    issueSlugs.has(letter.postSlug),
  );
  const lettersWithMeta = await Promise.all(
    letters.map(async (letter) => ({
      letter,
      section: getSection(letter.section),
      author: await getAuthorByName(letter.author),
    })),
  );

  return (
    <div className="mx-auto max-w-2xl px-6 pt-12 pb-20">
      <header className="text-center">
        <h1 className="font-song text-[40px] font-semibold tracking-[0.25em] sm:text-[46px]">投稿指南</h1>
        <p className="oa-label mt-4 text-ink-soft">
          SUBMISSIONS
        </p>
      </header>

      <div className="prose-zh mt-10">
        <blockquote>
          让生活在社区内部的人与写作者成为中心。
        </blockquote>
        <p>
          这是田野志的编辑方针。如果你的作品与中国边境无关——无论你如何定义「边境」——
          那它可能不适合本刊。反之，只要它从边境的土地里长出来，我们都愿意认真读。
        </p>
        <p>
          来稿用你自己的写法。教师把一件事讲明白，司机用路上的话，调度可以报数字，
          口述保留讲述者的插入和重复。不要学别人的短句，也不要把短句用逗号串起来充长句。
          克制是不煽情，不是不会写完整的句子。
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {GUIDELINES.map((item) => (
          <section key={item.name} className="border-l-2 border-seal pl-5">
            <h2 className="font-song text-xl font-bold tracking-[0.15em]">{item.name}</h2>
            <p className="mt-2 font-song text-[15px] leading-relaxed text-ink-soft">
              {item.body}
            </p>
          </section>
        ))}
      </div>

      <div className="prose-zh mt-12">
        <h2>如何提交</h2>
        <p>
          来稿请发送至 <strong>tougao@tianyezhi.example</strong>，
          邮件标题注明「投稿 + 栏目 + 题目」。无论采用与否，我们会在四周内回复。
        </p>
        <p>
          本刊同时招募边境本地撰稿人：教师、司机、店主、护边员、摄影师——
          如果你生活在边境，愿意记录身边的事，欢迎来信，邮件标题注明「撰稿人网络」。
        </p>
      </div>

      {lettersWithMeta.length > 0 && (
        <section className="mt-20 border-t border-ink pt-12">
          <p className="oa-label text-seal">
            {fifth.label} · ISSUE No.{fifth.n}
          </p>
          <h2 className="mt-3 font-song text-[28px] font-semibold tracking-[0.2em]">
            九人来稿
          </h2>
          <p className="mt-4 font-song text-[15px] leading-relaxed text-ink-soft">
            九位写作者把西藏边境写成还在过的日子：沟、镇、互市、出诊的河。
            下面是他们寄来的信；点开即可读已刊出的正文。
          </p>

          <div className="mt-10 space-y-12">
            {lettersWithMeta.map(({ letter, section, author }) => {
              return (
                <article
                  key={letter.fileSlug}
                  className="border border-ink/15 bg-paper-deep px-5 py-6 sm:px-7"
                >
                  <p className="oa-label text-ink-soft">
                    {section?.name ?? letter.section}
                    {author?.place ? ` · ${author.place}` : ""}
                  </p>
                  <h3 className="mt-2 font-song text-lg font-bold tracking-[0.08em] leading-snug">
                    {letter.subject}
                  </h3>
                  <p className="oa-label mt-2 text-ink-soft">
                    {author ? (
                      <Link href={`/authors/${author.slug}`} className="hover:text-seal">
                        {letter.author}
                      </Link>
                    ) : (
                      letter.author
                    )}
                    {letter.wechat ? ` · 微信 ${letter.wechat}` : ""}
                  </p>
                  <div className="mt-5 whitespace-pre-wrap font-song text-[15px] leading-[1.9] text-ink">
                    {letter.body}
                  </div>
                  <p className="mt-6">
                    <Link
                      href={`/posts/${letter.postSlug}`}
                      className="oa-label text-seal hover:underline underline-offset-4"
                    >
                      阅读已刊出的稿件 →
                    </Link>
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
