import type { Metadata } from "next";
import CliGuide from "@/components/cli-guide";

export const metadata: Metadata = {
  title: "发稿 CLI",
  description: "田野志发稿：仓库写权限即可，不要 wrangler login。",
  robots: { index: false, follow: false },
};

export default function CliPage() {
  return (
    <div className="pb-16">
      <CliGuide />
    </div>
  );
}
