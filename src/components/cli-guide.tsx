export default function CliGuide() {
  return (
    <section id="cli" className="cli-guide oa-container oa-section">
      <p className="oa-label text-seal">发稿 CLI</p>
      <h2 className="mt-3 font-hei text-[28px] font-medium tracking-[0.12em] sm:text-[32px]">
        给写稿 Agent 的命令
      </h2>
      <p className="mt-3 max-w-2xl font-song text-[16px] leading-relaxed text-ink-soft">
        谁能发稿：有这个 GitHub 仓库写权限的人。不要各自{" "}
        <code>wrangler login</code>，也不要把 Cloudflare 账号借来借去。线上由
        GitHub Actions 写入 D1、部署 Worker。写稿的人只碰仓库里的 Markdown 和照片。
      </p>

      <div className="cli-guide-body mt-10 max-w-3xl">
        <h3>完整稿（缺图不能发）</h3>
        <ul>
          <li>
            <code>content/posts/{"{slug}"}.md</code> — frontmatter + 正文。文内图用{" "}
            <code>![图注](/images/...)</code>
          </li>
          <li>
            <code>public/images/{"{slug}"}.jpg</code> 头图，文内图{" "}
            <code>{"{slug}"}-02.jpg</code> 等
          </li>
          <li>
            可选 <code>content/submissions/{"{slug}"}.md</code> — 投稿页那封信
          </li>
        </ul>

        <h3>发一篇</h3>
        <pre>
          <code>{`npm run tyz -- check 你的-slug
git add content/posts/你的-slug.md public/images/你的-slug*.jpg
git commit -m "Publish 你的-slug"
git push origin main`}</code>
        </pre>
        <p>
          核对图文齐全后，推进 <code>main</code>。CI 会把 Markdown 灌进 D1，把{" "}
          <code>public/images</code> 打进 Worker 静态资源，然后部署。不要跑{" "}
          <code>npx wrangler login</code>。不要本机 publish 到 Cloudflare。
        </p>

        <h3>从零起一篇（必须带图）</h3>
        <pre>
          <code>{`npm run tyz -- new --slug my-post --title 题目 --author 作者 --section bianjing --place "西藏 · 察隅" --images cover.jpg,a.jpg,b.jpg --dek "副题" --issue "第五期 · 西藏" --letter`}</code>
        </pre>
        <p>
          栏目：<code>texie</code> 特写 / <code>bianjing</code> 边境志 /{" "}
          <code>sanwen</code> 散文 / <code>yingxiang</code> 影像 /{" "}
          <code>shengyin</code> 声音 / <code>koushu</code> 口述 /{" "}
          <code>jianbao</code> 简报。
        </p>
        <p>
          写法见仓库 <code>WRITING-STYLE.md</code>，配图见{" "}
          <code>IMAGE-STYLE.md</code>，完整说明见 <code>PUBLISH.md</code>。
        </p>

        <h3>本机命令（都不登录 Cloudflare）</h3>
        <ul>
          <li>
            <code>npm run tyz -- check &lt;slug&gt;</code> — 核完整图文稿
          </li>
          <li>
            <code>npm run tyz -- new ...</code> — 在仓库里写下 md + 拷图
          </li>
          <li>
            <code>npm run tyz -- publish &lt;slug&gt; --local</code> — 只写本机 D1
          </li>
          <li>
            <code>git push</code> 到 <code>main</code> — <strong>真正上线</strong>
          </li>
        </ul>
        <p>
          没有 <code>CLOUDFLARE_API_TOKEN</code> 时，{" "}
          <code>npm run tyz -- publish</code> 只核对稿件并提示你推进{" "}
          <code>main</code>，不会用个人 Wrangler 登录去改线上。
        </p>
      </div>
    </section>
  );
}
