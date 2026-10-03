import type { ReactNode } from "react";
import { Icon } from "./Icon";

interface PendingNoteProps {
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}

export function PendingNote({ tone = "light", className = "", children }: PendingNoteProps) {
  return (
    <p className={`note ${tone === "dark" ? "on-dark" : ""} ${className}`.trim()}>
      <Icon name="info" />
      <span>{children}</span>
    </p>
  );
}
