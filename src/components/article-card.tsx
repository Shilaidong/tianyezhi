import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getSection } from "@/lib/sections";
import { getAuthorByName } from "@/lib/authors";
import CoverPhoto from "./cover-photo";

export default async function ArticleCard({ post }: { post: Post }) {
  const section = getSection(post.section);
  const author = await getAuthorByName(post.author);
  const label = [
    section?.name ?? post.section,
    section?.aiCompiled ? "AI 汇编" : null,
    post.issue ?? null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="group flex flex-col">
      <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
        <CoverPhoto
          image={post.image}
          motif={post.motif}
          alt={post.title}
          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        {/* OA 式栏目标签：10px 大写黑体 */}
        <p className="oa-label text-ink-soft">{label}</p>
        {post.pullTitle ? (
          <>
            <h3 className="mt-2.5 font-kai text-[21px] font-bold leading-snug">
              <Link href={`/posts/${post.slug}`} className="transition-colors group-hover:text-seal">
                「{post.pullTitle}」
              </Link>
            </h3>
            <p className="oa-label mt-2 text-ink-soft">{post.title}</p>
          </>
        ) : (
          <h3 className="mt-2.5 font-song text-[22px] font-semibold leading-snug tracking-wide">
            <Link href={`/posts/${post.slug}`} className="transition-colors group-hover:text-seal">
              {post.title}
            </Link>
          </h3>
        )}
        <p className="mt-2.5 line-clamp-3 font-body text-[15px] font-light leading-relaxed text-ink">
          {post.dek}
        </p>
        {post.native && (
          <span className="oa-card-native oa-card-native--ink" lang={post.nativeLang}>
            {post.native}
          </span>
        )}
        <p className="oa-label mt-3 text-ink-soft">
          文 /{" "}
          {author ? (
            <Link href={`/authors/${author.slug}`} className="hover:text-seal hover:underline underline-offset-4">
              {post.author}
            </Link>
          ) : (
            post.author
          )}
          {post.place ? ` · ${post.place}` : ""}
        </p>
      </div>
    </article>
  );
}
