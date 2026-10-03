import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const items: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "trophy",
    title: "District level",
    text: "First, second and third place finishes at SGFI district-level athletics.",
  },
  {
    icon: "medal",
    title: "Block level",
    text: "Placements at SGFI block-level athletics competitions.",
  },
  {
    icon: "target",
    title: "Event breakdown",
    text: "Exact events and placements are pending verification before publication.",
  },
];

export function SportsRail() {
  return (
    <div>
      <Reveal as="span" className="inline-block">
        <Eyebrow>Sports &amp; Athletics</Eyebrow>
      </Reveal>
      <Reveal as="h3" delay={1} className="display-md mt-3.5 text-white">
        SGFI District and Block level athletics
      </Reveal>
      <div className="mt-[22px] grid gap-[18px] min-[1081px]:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={(index + 1) as 1 | 2 | 3} className="rail-item">
            <span className="ic">
              <Icon name={item.icon} strokeWidth={1.8} />
            </span>
            <div>
              <b>{item.title}</b>
              <span className="txt">{item.text}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
