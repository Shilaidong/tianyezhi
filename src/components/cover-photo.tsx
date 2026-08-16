import Image from "next/image";
import type { CoverMotif } from "@/lib/posts";
import CoverArt from "./cover-art";

export default function CoverPhoto({
  image,
  motif,
  className = "",
  alt = "",
  priority = false,
}: {
  image?: string;
  motif: CoverMotif;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  if (!image) {
    return <CoverArt motif={motif} className={className} />;
  }

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 850px) 100vw, 60vw"
        className="object-cover"
        priority={priority}
      />
    </span>
  );
}
