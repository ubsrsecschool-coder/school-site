import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  center?: boolean;
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHead({ eyebrow, title, lede, center, as: Heading = "h2", className = "" }: SectionHeadProps) {
  return (
    <div className={`max-w-[660px] ${center ? "mx-auto text-center" : ""} ${className}`.trim()}>
      <Reveal as="span" className="inline-block">
        <Eyebrow center={center}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as={Heading} delay={1} className="display-lg mt-4">
        {title}
      </Reveal>
      {lede && (
        <Reveal as="p" delay={2} className="lede mt-[18px]">
          {lede}
        </Reveal>
      )}
    </div>
  );
}
