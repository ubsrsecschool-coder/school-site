import type { ReactNode } from "react";

import { flagshipResult } from "@/lib/results";
import { sessionLabel } from "@/lib/format";
import { school } from "@/lib/school";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

interface Fact {
  key: string;
  value: ReactNode;
  label: string;
}

export function QuickFacts() {
  const session = sessionLabel(flagshipResult?.date ?? "");
  const facts: Fact[] = [
    {
      key: "established",
      value: <Counter to={school.established} plain />,
      label: "Established",
    },
    ...(flagshipResult?.classes ?? []).map((c) => ({
      key: c.label,
      value: <Counter to={c.passPercent} suffix="%" />,
      label: `${c.label} pass · ${session}`,
    })),
    { key: "span", value: "Nursery–XII", label: "English medium" },
  ];

  return (
    <div className="relative z-[5] -mt-[clamp(52px,6vw,70px)]">
      <div className="wrap">
        <Reveal className="grid grid-cols-2 overflow-hidden rounded-lg border border-line bg-paper shadow-2 min-[1081px]:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {facts.map((fact) => (
            <div
              key={fact.key}
              className="border-b border-r border-line p-[28px_26px] max-[680px]:p-5 min-[1081px]:border-b-0 [&:nth-child(2n)]:border-r-0 min-[1081px]:[&:nth-child(2n)]:border-r min-[1081px]:last:border-r-0"
            >
              <b className="block whitespace-nowrap font-display text-[clamp(22px,3vw,38px)] font-semibold leading-none text-green">
                {fact.value}
              </b>
              <span className="mt-[7px] block text-xs font-semibold uppercase tracking-[.07em] text-muted">
                {fact.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
