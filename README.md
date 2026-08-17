# 田野志 Tianyezhi

**在边界上，看见中国。**

一本对标 Oxford American 的边境文学杂志网站：记录中国边境地区的少数民族、
边境汉族与他们的日常生活——散文、特写、田野、影像、声音与口述史。

长期规划（含 AI 内容管线、边境地图、撰稿人网络等）见 [PLAN.md](PLAN.md)。

## 技术栈

- **Next.js 16**（App Router）+ React 19 + TypeScript
- **Tailwind CSS v4**（主题在 `src/app/globals.css` 的 `@theme`：纸 / 墨 / 朱砂 + 宋楷黑三体）
- 内容为本地 Markdown（`content/posts/*.md`），`gray-matter` 解析、`react-markdown` 渲染
- 封面为程序生成 SVG 插画（`src/components/cover-art.tsx`），不依赖外部图片

## 本地开发

```bash
npm install
npm run dev
```

打开 <http://localhost:3000>。

## 目录结构

```
content/posts/            # 文章（Markdown + frontmatter）
src/app/                  # 首页 / 文章 / 栏目 / 特刊 / 投稿 / 作者 / 关于
src/components/           # 报头、页脚、文章卡片、引文带、SVG 封面
src/lib/                  # posts（内容）/ sections（栏目）/ authors（作者）/ issues（特刊）
PLAN.md                   # 总体编辑与技术规划（含 AI 管线）
WRITING-STYLE.md          # 写作：一人一声；改写法，不是改标点
IMAGE-STYLE.md            # 配图与图注
PUBLISH.md                # 发稿：仓库写权限即可，不要 wrangler login
SUBMISSIONS-PROMPT.md     # 投稿邮件提示词
```

## 栏目

特写 / 边境志 / 散文 / 影像 / 声音 / 口述 / **简报**（AI 汇编，显著标注）/ 特刊（创刊号「界河」）

## 如何发布一篇新文章

见 [PUBLISH.md](PUBLISH.md)，线上说明只在 https://edgeland.org/cli （不挂导航）。有这个仓库写权限就能发，**不要** `wrangler login`。

本地只写 Markdown 和照片，核对后推进 `main`，GitHub Actions 灌 D1、部署。排版与 `npm run dev` 相同。

完整稿三件套：`content/posts/{slug}.md`、`public/images/{slug}.jpg`（及文内图）、可选 `content/submissions/{slug}.md`。

```powershell
npm run tyz -- check chu-zhen-yao-guo-he
```

frontmatter 字段：

```markdown
---
title: 文章标题
dek: 副题或摘要
pullTitle: 可选——文中的直接引语，将作为卡片标题展示（OA 风格）
author: 作者名（与 src/lib/authors.ts 中的 name 对应可自动链接作者页）
place: 采写地点
date: 2026-08-16
section: texie      # texie 特写 / bianjing 边境志 / sanwen 散文 / yingxiang 影像
                    # shengyin 声音 / koushu 口述 / jianbao 简报
issue: 创刊号 · 界河  # 可选
featured: true      # 可选，首页特写（全站只保留一篇）
motif: ferry        # 封面：terrace 梯田 / tree 树 / market 集市 / horn 鹰笛
                    # ferry 河流 / flame 火 / jiebei 界碑
coords: [24.01, 97.85]  # 可选，经纬度（为边境地图功能预留）
---

正文用 Markdown 书写。
```

## AI 编辑底线

AI 负责"发现"与"汇编"，人负责"判断"与"书写"。特写 / 散文 / 影像 / 口述永远由人创作；
「简报」栏目由 AI 依据公开信源汇编、人工核读点发，并在页面显著标注。详见 PLAN.md 第 3 节。

## 版权

`content/` 下为示例稿件，正式发布前请替换为原创内容。
