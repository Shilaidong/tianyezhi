import Link from "next/link";
import type { Post } from "@/lib/posts";
import { getSection } from "@/lib/sections";
import CoverPhoto from "./cover-photo";

export default function SidebarCard({ post }: { post: Post }) {
  const section = getSection(post.section);
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <p className="oa-label text-ink">{section?.name}</p>
      <CoverPhoto
        image={post.image}
        motif={post.motif}
        alt={post.title}
        className="mt-2 aspect-[16/9] w-full"
      />
      <h3 className="mt-3 font-song text-[22px] font-semibold leading-snug tracking-wide group-hover:text-seal">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 font-body text-[15px] font-light leading-snug text-ink">
        {post.dek}
      </p>
      <p className="oa-label mt-2 text-ink">文 / {post.author}</p>
    </Link>
  );
}
