import { useRouteMeta } from "@/hooks/usePageMeta";
import { galleryBySection } from "@/lib/content";
import { addressLine, school } from "@/lib/school";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Frame } from "@/components/ui/Frame";
import { PageHero } from "@/components/ui/PageHero";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";

const facts = [
  { term: "Established", detail: String(school.established) },
  { term: "Location", detail: addressLine },
  { term: "Medium", detail: school.medium },
  { term: "Classes", detail: school.classes },
  { term: "Board", detail: school.affiliation },
  { term: "Chairman", detail: school.chairman.name },
];

export function About() {
  useRouteMeta("/about");
  const photos = galleryBySection("campus");

  return (
    <>
      <PageHero
        eyebrow="About the school"
        title={`Teaching in ${school.location.locality} since ${school.established}.`}
        lede={`${school.name} is an English-medium school in ${school.location.locality}, ${school.location.city}, teaching ${school.classes}.`}
        crumbs={[{ label: "About" }]}
      />

      <section className="pad pt-[clamp(32px,4vw,56px)]">
        <div className="wrap grid gap-12 min-[1081px]:grid-cols-[1fr_1fr] min-[1081px]:gap-[clamp(40px,5vw,84px)]">
          <div>
            <Reveal as="h2" className="display-lg">
              Our story
            </Reveal>
            <Reveal as="p" delay={1} className="lede mt-5">
              {school.name} has served families in {school.location.locality}, {school.location.city} since{" "}
              {school.established}. We teach in English and follow the CBSE-pattern curriculum under affiliation to the
              Haryana Board of School Education (HBSE), taking students from their first day in Nursery through to
              Class XII.
            </Reveal>
            <Reveal as="p" delay={2} className="lede mt-4">
              Our tagline: &ldquo;{school.tagline}.&rdquo;
            </Reveal>
          </div>

          <Reveal delay={1}>
            <dl className="m-0 rounded-lg border border-line bg-paper p-[clamp(22px,3vw,34px)] shadow-1">
              {facts.map((fact) => (
                <div
                  key={fact.term}
                  className="grid gap-1 border-b border-line py-4 first:pt-0 last:border-b-0 last:pb-0 min-[681px]:grid-cols-[130px_1fr] min-[681px]:gap-4"
                >
                  <dt className="text-xs font-bold uppercase tracking-[.09em] text-muted">{fact.term}</dt>
                  <dd className="m-0 text-[15.5px] text-text">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="dark-band on-dark pad">
        <div className="wrap-tight text-center">
          <Reveal as="span" className="inline-block">
            <Eyebrow center>Our motto</Eyebrow>
          </Reveal>
          <Reveal
            as="p"
            delay={1}
            className="mt-6 font-devanagari text-[clamp(34px,5.4vw,66px)] font-bold leading-[1.3] text-white"
          >
            <span lang="sa">{school.motto.devanagari}</span>
          </Reveal>
          <Reveal as="p" delay={2} className="mt-3 font-display text-[clamp(18px,2vw,26px)] font-semibold italic text-brass-light">
            <span lang="sa-Latn">{school.motto.transliteration}</span>
          </Reveal>
          <Reveal as="p" delay={3} className="mt-3 text-xs font-semibold uppercase tracking-[.14em] text-white/70">
            {school.motto.translation}
          </Reveal>
        </div>
      </section>

      <section className="pad">
        <div className="wrap grid items-center gap-10 min-[1081px]:grid-cols-[.7fr_1.3fr] min-[1081px]:gap-[clamp(40px,5vw,84px)]">
          <Reveal className="max-w-[340px]">
            <Frame glyph="RC" caption="Formal portrait required" className="aspect-[3/4]" />
          </Reveal>
          <div>
            <Reveal as="span" className="inline-block">
              <Eyebrow>Leadership</Eyebrow>
            </Reveal>
            <Reveal as="h2" delay={1} className="display-lg mt-4">
              {school.chairman.name}
            </Reveal>
            <Reveal as="p" delay={1} className="mt-2 text-[15px] font-semibold text-stone">
              {school.chairman.title}
            </Reveal>
            <Reveal delay={2} className="mt-7">
              <PendingNote>
                The Chairman&rsquo;s message and a formal portrait have not been supplied yet. The Principal&rsquo;s
                name and message will be added when the school confirms them.
              </PendingNote>
            </Reveal>
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section className="pad border-t border-line bg-paper pt-[clamp(56px,7vw,96px)]">
          <div className="wrap">
            <Reveal as="h2" className="display-md">
              The campus
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-[18px] min-[1081px]:grid-cols-4">
              {photos.map((photo) => (
                <Reveal key={photo.id}>
                  <Frame photo={photo} caption={photo.caption} className="aspect-[3/4]" />
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8">
              <PendingNote>
                Student numbers, staff, and a list of campus facilities will be added once the school has confirmed
                them.
              </PendingNote>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
