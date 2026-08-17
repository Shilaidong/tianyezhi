import type { Metadata } from "next";
import "./globals.css";
import Masthead from "@/components/masthead";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "田野志 · 记录乡野中国",
    template: "%s · 田野志",
  },
  description:
    "田野志是一本写给中国乡村的文学杂志：散文、田野调查、影像、声音与口述史，记录正在消逝也正在生长的乡野中国。",
};

export const dynamic = "force-dynamic";

const THEME_INIT = `(function(){try{var t=localStorage.getItem("tianyezhi-theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Masthead />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
