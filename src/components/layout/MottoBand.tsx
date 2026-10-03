import { school } from "@/lib/school";

export function MottoBand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "motto-band compact" : "motto-band"}>
      <div className="wrap">
        <span className="deva" lang="sa">
          {school.motto.devanagari}
        </span>
        <span className="sep" aria-hidden="true" />
        <span className="tr" lang="sa-Latn">
          {school.motto.transliteration}
        </span>
        {!compact && <span className="en">{school.motto.translation}</span>}
      </div>
    </div>
  );
}
