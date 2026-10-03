import { EnquiryForm } from "@/components/forms/EnquiryForm";
import type { EnquiryKind } from "@/lib/enquiry";

interface EnquiryCardProps {
  kind?: EnquiryKind;
  as?: "h2" | "h3";
  id?: string;
}

const copy: Record<EnquiryKind, { title: string; text: string }> = {
  admission: { title: "Admission enquiry", text: "Leave your details and the school office will get back to you." },
  contact: { title: "Send a message", text: "Write to the school office and we will get back to you." },
};

export function EnquiryCard({ kind = "admission", as: Heading = "h2", id }: EnquiryCardProps) {
  return (
    <div id={id} className="scroll-mt-24 rounded-lg border border-line bg-cream p-[clamp(26px,3vw,38px)] shadow-1">
      <Heading className="text-2xl">{copy[kind].title}</Heading>
      <p className="mt-2 text-[13.5px] text-muted">{copy[kind].text}</p>
      <div className="mt-[26px]">
        <EnquiryForm kind={kind} />
      </div>
    </div>
  );
}
