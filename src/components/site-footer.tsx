import Link from "next/link";
import { SECTIONS } from "@/lib/sections";
import { IconArrowUp } from "./icons";

export default function SiteFooter() {
  return (
    <footer className="oa-footer">
      <div className="oa-to-top">
        <p className="inline-flex items-center gap-2">
          <IconArrowUp className="h-3.5 w-3.5" /> 回到顶部
        </p>
      </div>
      <div className="oa-container oa-footer-inner">
        <div className="oa-footer-col">
          <p className="oa-footer-logo">田野志</p>
          <p className="oa-footer-tag">在边界上，看见中国</p>
          <span className="oa-native oa-native--dark oa-native--en">
            A journal of China&apos;s borderlands
          </span>
        </div>
        <div className="oa-footer-col">
          <h3>栏目</h3>
          {SECTIONS.map((section) => (
            <Link key={section.id} href={`/sections/${section.id}`}>
              {section.name}
            </Link>
          ))}
        </div>
        <div className="oa-footer-col">
          <h3>本刊</h3>
          <Link href="/issues">特刊</Link>
          <Link href="/submissions">投稿</Link>
          <Link href="/about">关于</Link>
        </div>
      </div>
      <p className="oa-footer-copy">
        © 2026 田野志 · 设计参照 Oxford American 源码结构，仅作学习用途
      </p>
    </footer>
  );
}
