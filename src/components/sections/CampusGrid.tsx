import { galleryBySection } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Frame } from "@/components/ui/Frame";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";

const MIN_TILES = 4;
const staggered = "min-[681px]:[&:nth-child(2n)]:mt-8";

export function CampusGrid() {
  const photos = galleryBySection("campus");
  const pending = Math.max(0, MIN_TILES - photos.length);

  return (
    <section className="pad" id="campus">
      <div className="wrap">
        <div className="mx-auto max-w-[660px] text-center">
          <Reveal as="span" className="inline-block">
            <Eyebrow center>The Campus</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={1} className="display-lg mt-4">
            Where the day happens.
          </Reveal>
          <Reveal as="p" delay={2} className="lede mt-[18px]">
            Photographs supplied by the school. Interiors and grounds will follow.
          </Reveal>
        </div>

        <div className="mt-11 grid grid-cols-2 gap-[18px] min-[1081px]:grid-cols-4">
          {photos.map((photo, index) => (
            <Reveal key={photo.id} delay={((index % 4) + 1) as 1 | 2 | 3 | 4} className={staggered}>
              <Frame photo={photo} caption={photo.caption} className="aspect-[3/4] transition-transform duration-500 hover:-translate-y-1.5" />
            </Reveal>
          ))}
          {Array.from({ length: pending }, (_, index) => (
            <Reveal key={`pending-${index}`} delay={(((photos.length + index) % 4) + 1) as 1 | 2 | 3 | 4} className={staggered}>
              <Frame glyph={String(photos.length + index + 1).padStart(2, "0")} caption="Photograph pending" className="aspect-[3/4]" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-[34px]">
          <PendingNote>
            A list of campus facilities and further photographs will be added once the school has confirmed them.
          </PendingNote>
        </Reveal>
        <Reveal className="mt-6 text-center">
          <LinkArrow to="/gallery">See the gallery</LinkArrow>
        </Reveal>
      </div>
    </section>
  );
}
