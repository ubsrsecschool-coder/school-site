import { admissions } from "@/lib/admissions";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AdmissionFacts } from "./AdmissionFacts";
import { EnquiryCard } from "./EnquiryCard";

export function AdmissionsSection() {
  return (
    <section className="pad border-y border-line bg-paper" id="admissions">
      <div className="wrap grid items-start gap-10 min-[1081px]:grid-cols-[1.04fr_.96fr] min-[1081px]:gap-[clamp(40px,5vw,76px)]">
        <div>
          <Reveal as="span" className="inline-block">
            <Eyebrow>Admissions {admissions.session}</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={1} className="display-lg mt-4">
            {admissions.testName}
          </Reveal>
          <Reveal as="p" delay={2} className="lede mt-5">
            {admissions.testClasses}, across {admissions.streams} streams.
          </Reveal>
          <AdmissionFacts />
        </div>

        <Reveal delay={2}>
          <EnquiryCard as="h3" />
        </Reveal>
      </div>
    </section>
  );
}
