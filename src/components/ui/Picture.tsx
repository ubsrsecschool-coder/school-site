import type { ImgHTMLAttributes } from "react";
import type { GalleryItem } from "@/lib/schema";

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> {
  photo: Pick<GalleryItem, "src" | "webp" | "alt" | "width" | "height">;
}

export function Picture({ photo, ...img }: PictureProps) {
  return (
    <picture>
      {photo.webp && <source type="image/webp" srcSet={photo.webp} />}
      <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} {...img} />
    </picture>
  );
}
