export type Issue = {
  n: number;
  title: string;
  season: string;
  color: string;
  blurb: string;
  label: string;
};

export const ISSUES: Issue[] = [
  {
    n: 1,
    title: "界河",
    season: "2026 秋",
    color: "#33585e",
    label: "创刊号 · 界河",
    blurb:
      "河流从不问两岸的人属于哪一边。创刊号沿着中国的界河走了一遍——洗衣的、摆渡的、赶集的、守望的，记下两岸之间最古老的那种生活。",
  },
  {
    n: 2,
    title: "口岸",
    season: "2027 春",
    color: "#b03a24",
    label: "第二期 · 口岸",
    blurb:
      "从霍尔果斯的夜班到猴桥的黄昏卸货，十位边境写作者把口岸写成了人的地方：秤、帐篷、站台广播、断桥底下。",
  },
  {
    n: 3,
    title: "香火",
    season: "2027 夏",
    color: "#6b4536",
    label: "第三期 · 香火",
    blurb:
      "边境上的宗教很少待在经书里。它在奘房五点的门闩上，在主麻日货场忽然静下去的那半小时，在转山的鞋底，在看庙人口袋里的钥匙。",
  },
  {
    n: 4,
    title: "古道",
    season: "2027 秋",
    color: "#5c4a32",
    label: "第四期 · 古道",
    blurb:
      "路还在走。盐还在田里晒，桥不走车了车走下一座，驿站把第十八个名字留给了乡。货换了，石头还在。",
  },
];

export const CURRENT_ISSUE = ISSUES[0];
export const NEXT_ISSUE = ISSUES[1];
export const THIRD_ISSUE = ISSUES[2];
export const FOURTH_ISSUE = ISSUES[3];

export const ISSUE_LABEL = CURRENT_ISSUE.label;
export const NEXT_ISSUE_LABEL = NEXT_ISSUE.label;
export const THIRD_ISSUE_LABEL = THIRD_ISSUE.label;
export const FOURTH_ISSUE_LABEL = FOURTH_ISSUE.label;
