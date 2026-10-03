import { classResultFor, REQUIRED_BOARD_CLASSES } from "@/lib/results";
import { sessionLabel } from "@/lib/format";
import type { Achievement, ClassResult } from "@/lib/schema";
import { Counter } from "@/components/ui/Counter";

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

export function ResultPanel({ result }: { result: Achievement }) {
  const session = sessionLabel(result.date ?? "");
  return (
    <div className="mt-[38px] grid gap-[22px] min-[681px]:grid-cols-2">
      {REQUIRED_BOARD_CLASSES.map((label) => (
        <ResultCard key={label} label={label} result={classResultFor(result, label)} session={session} />
      ))}
    </div>
  );
}
