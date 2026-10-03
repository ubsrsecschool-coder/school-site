import { emailHref, primaryPhone } from "@/lib/school";
import { ButtonLink } from "@/components/ui/Button";

export function EnquiryCard() {
  return (
    <div id="enquiry" className="scroll-mt-24 rounded-lg border border-line bg-cream p-[clamp(26px,3vw,38px)] shadow-1">
      <h2 className="text-2xl">Admission enquiry</h2>
      <p className="mt-2 text-[13.5px] text-muted">Call or email the school office.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={primaryPhone.href} variant="primary">
          Call {primaryPhone.display}
        </ButtonLink>
        <ButtonLink href={emailHref} variant="line">
          Send an email
        </ButtonLink>
      </div>
    </div>
  );
}
