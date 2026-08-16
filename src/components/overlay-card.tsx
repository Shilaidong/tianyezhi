import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getSection } from "@/lib/sections";
import CoverPhoto from "./cover-photo";

export default function OverlayCard({
  post,
  size = "half",
}: {
  post: Post;
  size?: "large" | "half" | "strip";
}) {
  const section = getSection(post.section);

  if (size === "half") {
    return (
      <Link href={`/posts/${post.slug}`} className="oa-half">
        <CoverPhoto image={post.image} motif={post.motif} alt={post.title} className="oa-half-bg" />
        <div className="oa-half-meta">
          <h2>{post.pullTitle ? `「${post.pullTitle}」` : post.title}</h2>
          <p className="oa-excerpt">{post.dek}</p>
          {post.native && (
            <span className="oa-card-native" lang={post.nativeLang}>
              {post.native}
            </span>
          )}
          <p className="oa-accent">文 / {post.author}</p>
        </div>
      </Link>
    );
  }

  if (size === "strip") {
    return (
      <Link href={`/posts/${post.slug}`} className="oa-strip">
        <CoverPhoto image={post.image} motif={post.motif} alt={post.title} className="oa-strip-bg" />
        <div className="oa-strip-meta">
          <p className="oa-accent text-white/80">{section?.name}</p>
          <h3>{post.pullTitle ? `「${post.pullTitle}」` : post.title}</h3>
          {post.native && (
            <span className="oa-card-native" lang={post.nativeLang}>
              {post.native}
            </span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.slug}`} className="oa-featured-left">
      <CoverPhoto
        image={post.image}
        motif={post.motif}
        alt={post.title}
        className="oa-featured-bg"
      />
      <div className="oa-meta oa-meta-top">
        <span className="oa-accent">
          {section?.name}
          {post.issue ? ` · ${post.issue}` : ""}
        </span>
      </div>
      <div className="oa-meta oa-meta-center">
        <h2>{post.title}</h2>
        <p className="oa-excerpt">{post.dek}</p>
        <p className="oa-accent">文 / {post.author}</p>
      </div>
    </Link>
  );
}
