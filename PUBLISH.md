# 田野志 · 发稿

同一份说明只在 https://edgeland.org/cli ，不进主页、导航和页脚。仓库里这份文件是源。

谁能发稿：**有这个 GitHub 仓库写权限的人**。这是编辑部共用的权限，不要各自 `wrangler login`，也不要把 Cloudflare 账号借来借去。

线上由 GitHub Actions 用编辑部的 **API token** 写入 D1、部署 Worker。写稿的人只碰仓库里的 Markdown 和照片。

## 完整稿（和图文并进 main 同一套）

三件套，缺图不能发：

- `content/posts/{slug}.md` — frontmatter + 正文。文内图用 `![图注](/images/...)`，排版与本地预览相同。
- `public/images/{slug}.jpg` 头图，文内图 `{slug}-02.jpg` 等。
- 可选 `content/submissions/{slug}.md` — 投稿页那封信。

本地看版：

```powershell
npm install
npm run dev
```

打开 <http://localhost:3000>。此时**不读 Cloudflare**，直接读上面这些文件。

## 发一篇

```powershell
npm run tyz -- check 你的-slug
```

核对图文齐全后，把文件推进 `main`（PR 或直接推）。CI 会：

1. 把全部 Markdown 灌进 D1
2. 把 `public/images` 打进 Worker 静态资源
3. 部署

不要跑 `npx wrangler login`。不要本机 `publish` 到 Cloudflare，除非编辑部给了 `CLOUDFLARE_API_TOKEN`。

从零起一篇（必须带图）：

```powershell
npm run tyz -- new --slug my-post --title 题目 --author 作者 --section bianjing --place "西藏 · 察隅" --images cover.jpg,a.jpg,b.jpg --dek "副题" --issue "第五期 · 西藏" --letter
```

栏目：`texie` 特写 / `bianjing` 边境志 / `sanwen` 散文 / `yingxiang` 影像 / `shengyin` 声音 / `koushu` 口述 / `jianbao` 简报。

写法见 [WRITING-STYLE.md](WRITING-STYLE.md)，配图见 [IMAGE-STYLE.md](IMAGE-STYLE.md)。

## 本机命令（都不登录 Cloudflare）

| 命令 | 做什么 |
| --- | --- |
| `npm run tyz -- check <slug>` | 核完整图文稿 |
| `npm run tyz -- new ...` | 在仓库里写下 md + 拷图 |
| `npm run tyz -- publish <slug> --local` | 只写本机 D1，给 `wrangler d1` 本地库用 |
| `git push` 到 `main` | **真正上线** |

`npm run tyz -- publish <slug>` 默认**不会**用个人 Wrangler 登录去改线上。没有 `CLOUDFLARE_API_TOKEN` 时，它只核对稿件并提示你推进 `main`。

## 编辑部一次性配置（不是每人一遍）

在 Cloudflare 建一枚 **Account API Token**（不是 Global Key，也不是某个人的 `wrangler login`）：

- Account · Cloudflare Workers · Edit
- Account · D1 · Edit
- Account · Account Settings · Read

放进 GitHub 仓库 Secrets，名字必须是：

- `CLOUDFLARE_API_TOKEN`

账号 ID 已写在 `wrangler.jsonc`（`4df0efbadee174805b849a9775ea5acc`）。Token **不要**提交进 git。

本机若要直接打远程（少用），把同一枚 token 放进环境变量，**不要**放进仓库：

```powershell
$env:CLOUDFLARE_API_TOKEN = "编辑部那枚"
$env:CLOUDFLARE_ACCOUNT_ID = "4df0efbadee174805b849a9775ea5acc"
npm run tyz -- publish 你的-slug
```
