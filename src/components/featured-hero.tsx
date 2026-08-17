import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getSection } from "@/lib/sections";
import CoverPhoto from "./cover-photo";

export default function FeaturedHero({ post }: { post: Post }) {
  const section = getSection(post.section);
  return (
    <Link href={`/posts/${post.slug}`} className="oa-featured-left oa-featured-hero">
      <CoverPhoto
        image={post.image}
        motif={post.motif}
        alt={post.title}
        priority
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
