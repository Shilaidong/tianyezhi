export type SectionId =
  | "texie"
  | "bianjing"
  | "sanwen"
  | "yingxiang"
  | "shengyin"
  | "koushu"
  | "jianbao";

export type Section = {
  id: SectionId;
  name: string;
  tagline: string;
  aiCompiled?: boolean;
};

export const SECTIONS: Section[] = [
  { id: "texie", name: "特写", tagline: "长篇封面故事" },
  { id: "bianjing", name: "边境志", tagline: "政策与人相遇之处" },
  { id: "sanwen", name: "散文", tagline: "边界上的心事与记忆" },
  { id: "yingxiang", name: "影像", tagline: "快门里的边境中国" },
  { id: "shengyin", name: "声音", tagline: "民歌、方言与大地的回响" },
  { id: "koushu", name: "口述", tagline: "普通人的一辈子" },
  {
    id: "jianbao",
    name: "简报",
    tagline: "边境小众新闻摘编",
    aiCompiled: true,
  },
];

export function getSection(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id);
}
