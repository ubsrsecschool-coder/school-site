import type { ReactNode } from "react";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="pill">
      <span className="dot" aria-hidden="true" />
      {children}
    </span>
  );
}
