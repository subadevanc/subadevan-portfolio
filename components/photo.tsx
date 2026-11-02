import Image from "next/image";
import type { Photo } from "@/data/photos";

export function PhotoFigure({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  caption = false,
  fit = "auto",
}: {
  photo: Photo;
  className?: string;
  sizes?: string;
  caption?: boolean;
  fit?: "auto" | "cover";
}) {
  return (
    <figure className={`group overflow-hidden border border-line bg-surface ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        className={`w-full transition duration-700 group-hover:scale-[1.02] ${fit === "cover" ? "h-full object-cover" : "h-auto"}`}
      />
      {caption && <figcaption className="border-t border-line px-3 py-2 font-mono text-[11px] text-muted">{photo.alt}</figcaption>}
    </figure>
  );
}

/** First photo large, the rest as a row of thumbnails. */
export function PhotoCollage({ photos }: { photos: Photo[] }) {
  const [lead, ...rest] = photos;
  return (
    <div className="grid gap-2">
      <PhotoFigure photo={lead} fit="cover" className="aspect-[4/3]" />
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {rest.slice(0, 2).map((p) => (
            <PhotoFigure key={p.src} photo={p} fit="cover" className="aspect-[4/3]" sizes="(min-width: 1024px) 20vw, 50vw" />
          ))}
        </div>
      )}
    </div>
  );
}
