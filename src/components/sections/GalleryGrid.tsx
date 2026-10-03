import { useCallback, useMemo, useState } from "react";
import { gallery } from "@/lib/content";
import type { GalleryItem } from "@/lib/schema";
import { Frame } from "@/components/ui/Frame";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "./Lightbox";

type Section = Exclude<GalleryItem["section"], "brand">;

const SECTIONS: { key: Section; label: string }[] = [
  { key: "campus", label: "Campus" },
  { key: "events", label: "Events" },
  { key: "sports", label: "Sports" },
];

export function GalleryGrid() {
  const photos = useMemo(() => gallery.filter((item) => item.section !== "brand"), []);
  const present = SECTIONS.filter((s) => photos.some((p) => p.section === s.key));
  const missing = SECTIONS.filter((s) => !photos.some((p) => p.section === s.key));
  const [filter, setFilter] = useState<Section | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const setLightbox = useCallback((index: number | null) => setOpenIndex(index), []);

  const visible = filter === "all" ? photos : photos.filter((p) => p.section === filter);

  return (
    <div>
      {present.length > 1 && (
        <div className="filters mb-9" role="group" aria-label="Filter photographs">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            All
          </button>
          {present.map((s) => (
            <button key={s.key} type="button" aria-pressed={filter === s.key} onClick={() => setFilter(s.key)}>
              {s.label}
            </button>
          ))}
        </div>
      )}

      {visible.length ? (
        <ul className="gal m-0 list-none p-0">
          {visible.map((photo, index) => (
            <Reveal as="li" key={photo.id} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
              <button
                type="button"
                className="gal-tile"
                aria-label={`Open photograph: ${photo.caption}`}
                aria-haspopup="dialog"
                onClick={() => setOpenIndex(index)}
              >
                <Frame photo={photo} caption={photo.caption} square priority={index === 0} />
              </button>
            </Reveal>
          ))}
        </ul>
      ) : (
        <PendingNote>No photographs are published yet.</PendingNote>
      )}

      <div className="mx-auto mt-10 max-w-[760px]">
        {missing.length > 0 && (
          <PendingNote>
            {missing.map((s) => s.label.toLowerCase()).join(" and ")} photographs will be added once the school supplies
            them. Photographs that show identifiable students are only published once parental consent is confirmed.
          </PendingNote>
        )}
      </div>

      <Lightbox items={visible} index={openIndex} onChange={setLightbox} />
    </div>
  );
}
