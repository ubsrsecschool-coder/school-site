import { useState } from "react";
import { noticeDateParts } from "@/lib/format";
import type { Notice } from "@/lib/schema";
import { Icon } from "@/components/ui/Icon";

function NoticeItem({ notice, defaultOpen, level }: { notice: Notice; defaultOpen: boolean; level: 2 | 3 }) {
  const Heading = `h${level}` as const;
  const [open, setOpen] = useState(defaultOpen);
  const date = noticeDateParts(notice.date);
  const bodyId = `notice-body-${notice.id}`;

  return (
    <div className="acc-item" data-open={open}>
      <Heading className="m-0 text-[length:inherit] font-normal tracking-normal">
        <button
          type="button"
          className="acc-btn"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="acc-date">
            <b>{date.primary}</b>
            <span>{date.secondary}</span>
          </span>
          <span className="acc-ttl">
            <b>{notice.title}</b>
            {notice.category && <span>{notice.category}</span>}
          </span>
          <span className="acc-ico">
            <Icon name="plus" />
          </span>
        </button>
      </Heading>
      <div className="acc-body" id={bodyId} role="region" aria-label={notice.title} inert={!open}>
        <div>
          <p>{notice.body}</p>
        </div>
      </div>
    </div>
  );
}

export function NoticeAccordion({ notices, headingLevel = 3 }: { notices: Notice[]; headingLevel?: 2 | 3 }) {
  return (
    <div className="acc">
      {notices.map((notice, index) => (
        <NoticeItem key={notice.id} notice={notice} defaultOpen={index === 0} level={headingLevel} />
      ))}
    </div>
  );
}
