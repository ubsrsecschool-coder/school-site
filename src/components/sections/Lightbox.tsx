import { useEffect, useRef } from "react";
import type { GalleryItem } from "@/lib/schema";
import { Icon } from "@/components/ui/Icon";

interface LightboxProps {
  items: GalleryItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}

export function Lightbox({ items, index, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const item = index === null ? undefined : items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
    document.documentElement.style.overflow = item ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [item]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onChange((index + 1) % items.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onChange]);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Photograph preview"
      onClose={() => onChange(null)}
      onClick={(event) => {
        if (event.target === dialogRef.current) onChange(null);
      }}
    >
      {item && (
        <>
          <button type="button" className="close" aria-label="Close preview" onClick={() => onChange(null)}>
            <Icon name="close" />
          </button>
          <figure key={item.id}>
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} />
            <figcaption>
              {item.caption}
              {items.length > 1 && index !== null && (
                <span className="mt-1 block text-xs text-white/60">
                  {index + 1} of {items.length} · use the left and right arrow keys to browse
                </span>
              )}
            </figcaption>
          </figure>
        </>
      )}
    </dialog>
  );
}
