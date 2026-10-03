import { admissions } from "@/lib/admissions";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const facts: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "calendar",
    title: `${admissions.testDate}, ${admissions.testTime}`,
    text: `${admissions.testName}, ${admissions.testMode.toLowerCase()}.`,
  },
  { icon: "gift", title: admissions.noFee, text: "There is no charge to apply or enrol." },
  { icon: "users", title: "Third-child concession", text: admissions.thirdChild },
  {
    icon: "file",
    title: "Document checklist",
    text: "The list of required documents has not been published yet. Please call the school office.",
  },
];

export function AdmissionFacts() {
  return (
    <ul className="m-0 mt-[34px] grid list-none gap-0.5 p-0">
      {facts.map((fact, index) => (
        <Reveal
          as="li"
          key={fact.title}
          delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
          className="flex items-start gap-4 border-t border-line py-[18px] last:border-b"
        >
          <span className="icon-chip h-[34px] w-[34px] !rounded-[10px]">
            <Icon name={fact.icon} strokeWidth={1.8} className="!h-4 !w-4" />
          </span>
          <div>
            <b className="block text-[15px] font-semibold text-text">{fact.title}</b>
            <span className="mt-0.5 block text-[13.5px] leading-[1.55] text-muted">{fact.text}</span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
