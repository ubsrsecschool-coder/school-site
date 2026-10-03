import type { GalleryItem } from "@/lib/schema";

interface FrameProps {
  photo?: Pick<GalleryItem, "src" | "alt" | "width" | "height">;
  caption?: string;
  glyph?: string;
  square?: boolean;
  priority?: boolean;
  className?: string;
}

export function Frame({ photo, caption, glyph, square, priority, className = "" }: FrameProps) {
  const classes = ["frame", square ? "sq" : "", photo ? "has-img" : "", className].filter(Boolean).join(" ");

  if (photo) {
    return (
      <div className={classes}>
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
        <span className="frame-ring" aria-hidden="true" />
        {caption && <span className="cap">{caption}</span>}
      </div>
    );
  }

  return (
    <div className={classes} role="img" aria-label={caption ? `${caption}: photograph not yet supplied` : "Photograph not yet supplied"}>
      <span className="frame-ring" aria-hidden="true" />
      {glyph && (
        <span className="glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
      {caption && (
        <span className="cap">
          <span className="dot" aria-hidden="true" />
          {caption}
        </span>
      )}
    </div>
  );
}
