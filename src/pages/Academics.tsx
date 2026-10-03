import { useRouteMeta } from "@/hooks/usePageMeta";
import { flagshipResult } from "@/lib/results";
import { sessionLabel } from "@/lib/format";
import { school } from "@/lib/school";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { PageHero } from "@/components/ui/PageHero";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";

const pillars: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "book",
    title: "CBSE-pattern curriculum",
    text: "The school follows the CBSE-pattern curriculum while being affiliated with the Haryana Board of School Education (HBSE).",
  },
  { icon: "language", title: "English medium", text: "Teaching and learning at every level is in English." },
  {
    icon: "layers",
    title: "Nursery to Class XII",
    text: "One school for the whole journey, from the first day in Nursery to the board examinations in Class XII.",
  },
  {
    icon: "shield",
    title: "Science, Commerce and Humanities",
    text: "At the senior secondary level the school offers the Science, Commerce and Humanities streams.",
  },
];

export function Academics() {
  useRouteMeta("/academics");
  const session = sessionLabel(flagshipResult?.date ?? "");

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="English medium, CBSE-pattern, HBSE-affiliated."
        lede={`${school.name} teaches ${school.classes} in English.`}
        crumbs={[{ label: "Academics" }]}
      />

      <section className="pad pt-[clamp(32px,4vw,56px)]">
        <div className="wrap">
          <div className="grid gap-5 min-[681px]:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.title}
                delay={((index % 2) + 1) as 1 | 2}
                className="flex gap-5 rounded-lg border border-line bg-paper p-[clamp(22px,3vw,32px)] shadow-1"
              >
                <span className="icon-chip h-12 w-12 !rounded-[14px]">
                  <Icon name={pillar.icon} strokeWidth={1.8} className="!h-5 !w-5" />
                </span>
                <div>
                  <h2 className="text-[22px]">{pillar.title}</h2>
                  <p className="mt-2 text-[15px] leading-[1.65] text-muted">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {flagshipResult && (
            <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-peach/60 px-[clamp(22px,3vw,34px)] py-6">
              <p className="max-w-[56ch] font-display text-[clamp(18px,2vw,22px)] leading-[1.4] text-green">
                {flagshipResult.classes?.map((c) => c.label).join(" and ")} board results for {session} were a{" "}
                {flagshipResult.classes?.[0]?.passPercent}% pass.
              </p>
              <LinkArrow to="/achievements">See the results</LinkArrow>
            </Reveal>
          )}

          <Reveal className="mt-8">
            <PendingNote>
              The subjects offered in each class, school timings, working days and the holiday calendar have not been
              published yet. They will be added once the school office confirms them.
            </PendingNote>
          </Reveal>
        </div>
      </section>
    </>
  );
}
