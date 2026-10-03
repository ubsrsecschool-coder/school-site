import { useRef, useState, type KeyboardEvent } from "react";
import { academicResults } from "@/lib/content";
import { resultTabLabel } from "@/lib/results";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";
import { ResultPanel } from "./ResultCards";
import { SportsRail } from "./SportsRail";

export function ResultsBand() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (!academicResults.length) {
    return (
      <section className="dark-band on-dark pad" id="results">
        <div className="wrap">
          <Eyebrow>Board Results</Eyebrow>
          <h2 className="display-lg mt-4">Board results</h2>
          <PendingNote tone="dark" className="mt-[30px]">
            Board results are being verified against the school&rsquo;s records and will be published here shortly.
          </PendingNote>
        </div>
      </section>
    );
  }

  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = academicResults.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  const active = academicResults[selected] ?? academicResults[0];

  return (
    <section className="dark-band on-dark pad" id="results">
      <div className="wrap">
        <div className="max-w-[660px]">
          <Reveal as="span" className="inline-block">
            <Eyebrow>Board Results</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={1} className="display-lg mt-4">
            Every student who sat the board exams passed.
          </Reveal>
          {academicResults.length > 1 && (
            <Reveal delay={2} className="mt-[26px]">
              <div className="tabs" role="tablist" aria-label="Result year">
                {academicResults.map((result, index) => (
                  <button
                    key={result.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`result-tab-${result.id}`}
                    aria-selected={index === selected}
                    aria-controls={`result-panel-${result.id}`}
                    tabIndex={index === selected ? 0 : -1}
                    onClick={() => setSelected(index)}
                    onKeyDown={(event) => move(event, index)}
                  >
                    {resultTabLabel(result)}
                  </button>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <div role="tabpanel" id={`result-panel-${active.id}`} aria-labelledby={`result-tab-${active.id}`} key={active.id}>
          <ResultPanel result={active} />
        </div>

        <Reveal as="div" className="mt-[30px]">
          <PendingNote tone="dark">
            Individual topper names, photographs and marks are deliberately not shown. They will only be published
            once the school confirms parental consent and verifies the figures against original records.
          </PendingNote>
        </Reveal>

        <div className="mt-16">
          <SportsRail />
        </div>
      </div>
    </section>
  );
}
