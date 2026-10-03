import { useRef, useState, type KeyboardEvent } from "react";
import { academicResults } from "@/lib/content";
import { classResultFor, REQUIRED_BOARD_CLASSES, resultTabLabel } from "@/lib/results";
import { sessionLabel } from "@/lib/format";
import type { Achievement, ClassResult } from "@/lib/schema";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";
import { SportsRail } from "./SportsRail";

function ResultCard({ result, label, session }: { result?: ClassResult; label: string; session: string }) {
  if (!result) {
    return (
      <div className="res-card">
        <div className="cls">{label}</div>
        <div className="big text-white/30" aria-hidden="true">
          —
        </div>
        <div className="sub">Figures not yet supplied for this session</div>
      </div>
    );
  }

  const stats = [
    { value: result.students, label: result.passed === undefined ? "Students" : "Appeared" },
    ...(result.passed !== undefined ? [{ value: result.passed, label: "Passed" }] : []),
    ...(result.merit !== undefined ? [{ value: result.merit, label: "With merit" }] : []),
  ];

  return (
    <div className="res-card">
      <div className="cls">{result.label}</div>
      <div className="big">
        <Counter to={result.passPercent} />
        <sup>%</sup>
      </div>
      <div className="sub">pass rate · {session} session</div>
      <div className="res-meta">
        {stats.map((stat) => (
          <div key={stat.label}>
            <b>
              <Counter to={stat.value} />
            </b>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultPanel({ result }: { result: Achievement }) {
  const session = sessionLabel(result.date ?? "");
  return (
    <div className="mt-[38px] grid gap-[22px] min-[681px]:grid-cols-2">
      {REQUIRED_BOARD_CLASSES.map((label) => (
        <ResultCard key={label} label={label} result={classResultFor(result, label)} session={session} />
      ))}
    </div>
  );
}

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
