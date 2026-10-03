import type { ReactNode } from "react";

import { addressLine, emailHref, school, whatsapp } from "@/lib/school";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

interface Row {
  icon: IconName;
  label: string;
  content: ReactNode;
}

const linkClass = "mt-1 block text-[15.5px] leading-normal text-text hover:text-green hover:underline hover:underline-offset-[3px]";

export function ContactDetails() {
  const rows: Row[] = [
    { icon: "pin", label: "Address", content: <p className="mt-1 text-[15.5px] leading-normal">{addressLine}</p> },
    {
      icon: "phone",
      label: "Phone",
      content: school.phones.map((phone) => (
        <a key={phone.href} href={phone.href} className={linkClass}>
          {phone.display}
        </a>
      )),
    },
    {
      icon: "mail",
      label: "Email",
      content: (
        <a href={emailHref} className={linkClass}>
          {school.email}
        </a>
      ),
    },
    ...(whatsapp
      ? [
          {
            icon: "chat" as const,
            label: "WhatsApp",
            content: (
              <a href={whatsapp.href} className={linkClass}>
                {whatsapp.display}
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="grid content-center gap-1">
      {rows.map((row, index) => (
        <Reveal
          key={row.label}
          delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
          className="flex gap-4 border-b border-line py-[18px] last-of-type:border-b-0"
        >
          <span className="icon-chip h-10 w-10 !rounded-xl">
            <Icon name={row.icon} strokeWidth={1.8} />
          </span>
          <div>
            <b className="block text-xs font-bold uppercase tracking-[.09em] text-muted">{row.label}</b>
            {row.content}
          </div>
        </Reveal>
      ))}
      <Reveal delay={4} className="mt-[26px] flex flex-wrap gap-[11px]">
        <ButtonLink href={school.phones[0].href} variant="primary">
          Call the office
        </ButtonLink>
        <ButtonLink href={emailHref} variant="line">
          Send an email
        </ButtonLink>
      </Reveal>
    </div>
  );
}
