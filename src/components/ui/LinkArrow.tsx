import type { ReactNode } from "react";
import { Link } from "react-router";
import { Icon } from "./Icon";

interface LinkArrowProps {
  to: string;
  className?: string;
  children: ReactNode;
}

export function LinkArrow({ to, className = "", children }: LinkArrowProps) {
  return (
    <Link to={to} className={`link-arrow ${className}`.trim()}>
      {children}
      <Icon name="arrow" />
    </Link>
  );
}
