import { useRouteMeta } from "@/hooks/usePageMeta";
import { admissions } from "@/lib/admissions";
import { notices } from "@/lib/content";
import { AdmissionFacts } from "@/components/sections/AdmissionFacts";
import { EnquiryCard } from "@/components/sections/EnquiryCard";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { PageHero } from "@/components/ui/PageHero";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";

export function Admissions() {
  useRouteMeta("/admissions");

  return (
    <>
      <PageHero
        eyebrow={`Admissions ${admissions.session}`}
        title={admissions.testName}
        lede={`${admissions.testClasses}, across ${admissions.streams} streams. There is no admission fee, and the school gives a full tuition-fee concession for a third child.`}
        crumbs={[{ label: "Admissions" }]}
      />

      <section className="pad pt-[clamp(32px,4vw,56px)]">
        <div className="wrap grid items-start gap-10 min-[1081px]:grid-cols-[1.04fr_.96fr] min-[1081px]:gap-[clamp(40px,5vw,76px)]">
          <div>
            <Reveal as="h2" className="display-md">
              What you need to know
            </Reveal>
            <AdmissionFacts />
            <Reveal className="mt-8">
              <PendingNote>
                The step-by-step admission process and the fee structure have not been published yet. The school office
                will explain both when you call or enquire.
              </PendingNote>
            </Reveal>
            {notices.length > 0 && (
              <Reveal className="mt-8">
                <LinkArrow to="/notices">Read the admission notices</LinkArrow>
              </Reveal>
            )}
          </div>
          <Reveal delay={2}>
            <EnquiryCard />
          </Reveal>
        </div>
      </section>
    </>
  );
}
