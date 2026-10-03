import { admissions } from "@/lib/admissions";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AdmissionFacts } from "./AdmissionFacts";

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

        <Reveal delay={2} className="rounded-lg border border-line bg-cream p-[clamp(26px,3vw,38px)] shadow-1">
          <h3 className="text-2xl">Admission enquiry</h3>
          <p className="mt-2 text-[13.5px] text-muted">Leave your details and the school office will get back to you.</p>
          <ButtonLink href="/admissions#enquiry" variant="primary" arrow className="mt-[22px] w-full">
            Open the enquiry form
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
