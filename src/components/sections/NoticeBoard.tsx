import { notices } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";
import { NoticeAccordion } from "./NoticeAccordion";

export function sortedNotices() {
  return [...notices].sort((a, b) => b.date.localeCompare(a.date));
}

export function NoticeBoard() {
  const items = sortedNotices();
  return (
    <section className="pad border-y border-line bg-paper" id="notices">
      <div className="wrap-tight">
        <div className="max-w-[660px]">
          <Reveal as="span" className="inline-block">
            <Eyebrow>Notice Board</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={1} className="display-lg mt-4">
            Announcements
          </Reveal>
        </div>
        <Reveal delay={2} className="mt-[38px]">
          {items.length ? (
            <NoticeAccordion notices={items} />
          ) : (
            <PendingNote>No notices are published at the moment.</PendingNote>
          )}
        </Reveal>
        <Reveal className="mt-[22px]">
          <PendingNote>School timings and the holiday calendar will be published here once confirmed.</PendingNote>
        </Reveal>
        <Reveal className="mt-7">
          <LinkArrow to="/notices">All notices</LinkArrow>
        </Reveal>
      </div>
    </section>
  );
}
