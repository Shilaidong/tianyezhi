import Link from "next/link";

export default function SupportBlock() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-20">
      <div className="mx-auto max-w-2xl py-6 text-center">
        {/* 对标 OA 的 "Support the Oxford American" 区块 */}
        <p className="oa-label text-seal">支持我们</p>
        <h2 className="mt-4 font-hei text-[30px] font-medium tracking-[0.1em]">
          支持田野志
        </h2>
        <p className="mt-3 font-song text-[16px] leading-relaxed text-ink-soft">
          支持非营利写作与独立记录
        </p>
        <p className="mx-auto mt-5 max-w-lg font-body text-[15px] font-light leading-relaxed text-ink-soft">
          田野志不设付费墙。每一篇特写、每一次田野调查的旅费，都来自读者的支持。
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/submissions"
            className="oa-label border border-ink px-8 py-3 text-ink transition-colors hover:border-seal hover:bg-seal hover:text-white"
          >
            成为撰稿人
          </Link>
          <Link
            href="/about"
            className="oa-label border border-ink/25 px-8 py-3 text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            了解我们
          </Link>
        </div>
      </div>
    </section>
  );
}
