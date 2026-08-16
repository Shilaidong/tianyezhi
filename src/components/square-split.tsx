import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getSection } from "@/lib/sections";
import CoverPhoto from "./cover-photo";

export default function SquareSplit({ post }: { post: Post }) {
  const section = getSection(post.section);
  return (
    <Link href={`/posts/${post.slug}`} className="oa-square-split">
      <div className="oa-square-image">
        <CoverPhoto image={post.image} motif={post.motif} alt={post.title} className="h-full w-full" />
      </div>
      <div className="oa-square-meta">
        <div className="oa-accent oa-square-label">{section?.name}</div>
        <h2>{post.title}</h2>
        <p className="oa-excerpt">{post.dek}</p>
        <p className="oa-accent">文 / {post.author}</p>
      </div>
    </Link>
  );
}
