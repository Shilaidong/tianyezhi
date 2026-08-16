import Link from "next/link";
import { SECTIONS } from "@/lib/sections";
import { CURRENT_ISSUE } from "@/lib/issues";
import { IconFacebook, IconX, IconYouTube, IconInstagram, IconSearch } from "./icons";

export default function Masthead() {
  return (
    <header className="oa-header">
      <div className="oa-container">
        <div className="oa-header-top">
          <Link href="/" className="oa-logo-link" aria-label="田野志">
            <svg
              className="oa-logo"
              viewBox="0 0 640 80"
              width={640}
              height={80}
              role="img"
            >
              <text
                x="0"
                y="68"
                fill="#000"
                fontSize="78"
                fontWeight="900"
                letterSpacing="6"
                fontFamily="Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
              >
                田野志
              </text>
            </svg>
            <span className="oa-native oa-native--en">China, seen from its edges</span>
          </Link>
          <div className="oa-social">
            <Link href="/about" className="oa-login">
              Login
            </Link>
            <span className="oa-pipe">|</span>
            <a href="#" aria-label="Facebook" className="oa-social-icon">
              <IconFacebook />
            </a>
            <a href="#" aria-label="X" className="oa-social-icon">
              <IconX />
            </a>
            <a href="#" aria-label="YouTube" className="oa-social-icon">
              <IconYouTube />
            </a>
            <a href="#" aria-label="Instagram" className="oa-social-icon">
              <IconInstagram />
            </a>
            <div className="oa-extra">
              <h2 className="oa-support">支持田野志</h2>
              <h3>支持非营利写作与独立记录</h3>
            </div>
          </div>
        </div>

        <nav className="oa-nav" aria-label="栏目">
          <div className="oa-nav-left">
            {SECTIONS.slice(0, 4).map((section) => (
              <Link key={section.id} href={`/sections/${section.id}`} className="oa-nav-link">
                {section.name}
              </Link>
            ))}
            <Link href="/issues" className="oa-nav-link oa-nav-colored">
              {CURRENT_ISSUE.title}
            </Link>
          </div>
          <div className="oa-nav-right">
            <span className="oa-search" aria-hidden>
              <IconSearch />
            </span>
            <Link href="/submissions" className="oa-btn oa-btn-red">
              订阅
            </Link>
            <Link href="/about" className="oa-btn">
              铺子
            </Link>
            <Link href="/about" className="oa-btn">
              支持
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
