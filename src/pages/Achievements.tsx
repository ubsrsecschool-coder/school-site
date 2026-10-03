import { useRouteMeta } from "@/hooks/usePageMeta";
import { academicResults } from "@/lib/content";
import { resultTabLabel } from "@/lib/results";
import { ResultPanel } from "@/components/sections/ResultCards";
import { SportsRail } from "@/components/sections/SportsRail";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";

export function Achievements() {
  useRouteMeta("/achievements");

  return (
    <>
      <PageHero
        eyebrow="Achievements"
        title="Results the school stands behind."
        lede="Board results and sports finishes, published only where the school has confirmed the figures."
        crumbs={[{ label: "Achievements" }]}
      />

      <section className="dark-band on-dark pad">
        <div className="wrap">
          <Reveal as="span" className="inline-block">
            <Eyebrow>Board Results</Eyebrow>
          </Reveal>
          {academicResults.length ? (
            academicResults.map((result) => (
              <div key={result.id} className="mt-10 first:mt-6">
                <Reveal as="h2" className="display-md">
                  {resultTabLabel(result)}
                </Reveal>
                <ResultPanel result={result} />
              </div>
            ))
          ) : (
            <PendingNote tone="dark" className="mt-6">
              Board results are being verified against the school&rsquo;s records.
            </PendingNote>
          )}
          <Reveal className="mt-[30px]">
            <PendingNote tone="dark">
              Individual topper names, photographs and marks are deliberately not shown. They will only be published
              once the school confirms parental consent and verifies the figures against original records.
            </PendingNote>
          </Reveal>
        </div>
      </section>

      <section className="dark-band on-dark pb-[clamp(72px,9vw,132px)]">
        <div className="wrap border-t border-white/10 pt-[clamp(48px,6vw,80px)]">
          <SportsRail />
        </div>
      </section>
    </>
  );
}
