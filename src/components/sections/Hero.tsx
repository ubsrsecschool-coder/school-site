import { galleryItem } from "@/lib/content";
import { flagshipResult } from "@/lib/results";
import { sessionLabel } from "@/lib/format";
import { primaryPhone, school } from "@/lib/school";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Frame } from "@/components/ui/Frame";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const metaFacts = [
  { value: "HBSE", label: "Affiliated" },
  { value: "Nursery–XII", label: "All classes" },
  { value: "English", label: "Medium" },
];

export function Hero() {
  const photo = galleryItem("campus-peach-facade");
  const badgeClasses = flagshipResult?.classes?.map((c) => c.label.replace("Class ", "")).join(" & ");

  return (
    <section className="light-field">
      <div className="wrap grid items-center gap-12 pb-[clamp(96px,10vw,140px)] pt-[clamp(30px,3.4vw,44px)] min-[1081px]:grid-cols-[1.06fr_.94fr] min-[1081px]:gap-[clamp(40px,5vw,84px)]">
        <div>
          <Eyebrow>
            Established {school.established} · {school.location.locality}, {school.location.city}
          </Eyebrow>
          <Reveal as="h1" className="display-xl mt-5">
            Building Strong
            <br />
            Foundation for <em className="not-italic text-brass-dark">Tomorrow</em>.
          </Reveal>
          <Reveal as="p" delay={1} className="lede mt-[22px] max-w-[46ch]">
            An English-medium school affiliated with HBSE and following the CBSE-pattern curriculum, teaching{" "}
            {school.classes} for over twenty-five years.
          </Reveal>
          <Reveal className="mt-[34px] flex flex-wrap gap-3" delay={2}>
            <ButtonLink href="/admissions#enquiry" variant="brass" arrow>
              Enquire for Admission
            </ButtonLink>
            <a href={primaryPhone.href} className="btn btn-line">
              <Icon name="phone" />
              {primaryPhone.display}
            </a>
          </Reveal>
          <Reveal
            delay={3}
            className="mt-10 flex flex-wrap gap-[26px] border-t border-line pt-[26px]"
          >
            {metaFacts.map((fact) => (
              <div key={fact.label}>
                <b className="block font-display text-xl font-semibold text-green">{fact.value}</b>
                <span className="text-xs uppercase tracking-[.06em] text-stone">{fact.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={2} className="relative max-w-[460px] min-[1081px]:max-w-none">
          <Frame photo={photo} glyph="UB" caption={photo ? undefined : "Photograph pending"} priority className="aspect-[4/5]" />
          {flagshipResult && badgeClasses && (
            <div className="absolute -bottom-5 left-0 z-[4] flex items-center gap-3.5 rounded-md bg-paper px-5 py-4 shadow-2 min-[681px]:bottom-11 min-[681px]:-left-[26px]">
              <b className="font-display text-[30px] font-semibold leading-none text-green">
                <Counter to={100} suffix="%" />
              </b>
              <span className="text-[11.5px] font-semibold uppercase leading-[1.35] tracking-[.03em] text-muted">
                Board pass rate
                <br />
                Class {badgeClasses} · {sessionLabel(flagshipResult.date ?? "")}
              </span>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
