import type { ReactNode } from "react";

interface EyebrowProps {
  center?: boolean;
  children: ReactNode;
}

export function Eyebrow({ center, children }: EyebrowProps) {
  return <span className={center ? "eyebrow center" : "eyebrow"}>{children}</span>;
}
