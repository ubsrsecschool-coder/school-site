import { useRouteMeta } from "@/hooks/usePageMeta";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHero } from "@/components/ui/PageHero";

export function Gallery() {
  useRouteMeta("/gallery");
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Life at Uma Bharti."
        lede="Photographs supplied by the school."
        crumbs={[{ label: "Gallery" }]}
      />
      <section className="pad pt-[clamp(32px,4vw,56px)]">
        <div className="wrap">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
