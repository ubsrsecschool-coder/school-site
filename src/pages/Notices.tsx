import { useRouteMeta } from "@/hooks/usePageMeta";
import { notices } from "@/lib/content";
import { NoticeAccordion } from "@/components/sections/NoticeAccordion";
import { sortedNotices } from "@/components/sections/NoticeBoard";
import { PageHero } from "@/components/ui/PageHero";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";

export function Notices() {
  useRouteMeta("/notices");
  const items = sortedNotices();

  return (
    <>
      <PageHero
        eyebrow="Notice board"
        title="Announcements from the school."
        crumbs={[{ label: "Notices" }]}
      />
      <section className="pad pt-[clamp(32px,4vw,56px)]">
        <div className="wrap-tight">
          {notices.length ? (
            <NoticeAccordion notices={items} headingLevel={2} />
          ) : (
            <PendingNote>No notices are published at the moment.</PendingNote>
          )}
          <Reveal className="mt-6">
            <PendingNote>School timings and the holiday calendar will be published here once confirmed.</PendingNote>
          </Reveal>
        </div>
      </section>
    </>
  );
}
