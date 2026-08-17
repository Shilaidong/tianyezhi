export type IssueCoverStyle = "river" | "port" | "incense" | "road" | "plateau";

export type IssueCoverSpec = {
  n: number;
  image: string;
  style: IssueCoverStyle;
};

export const ISSUE_COVERS: IssueCoverSpec[] = [
  { n: 1, image: "/images/jie-he-xi-yi-ji.jpg", style: "river" },
  { n: 2, image: "/images/huo-er-guo-si-ye-ban.jpg", style: "port" },
  { n: 3, image: "/images/zhuang-fang-wu-dian-kai-men.jpg", style: "incense" },
  { n: 4, image: "/images/yan-hai-zai-tian-li.jpg", style: "road" },
  { n: 5, image: "/images/chu-zhen-yao-guo-he.jpg", style: "plateau" },
];

export function getIssueCover(n: number): IssueCoverSpec {
  return ISSUE_COVERS.find((cover) => cover.n === n) ?? ISSUE_COVERS[0];
}
