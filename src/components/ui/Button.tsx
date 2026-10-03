import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { Icon } from "./Icon";

type Variant = "primary" | "brass" | "line" | "ghost";
type Size = "md" | "sm";

export const buttonClass = (variant: Variant = "primary", size: Size = "md", extra = "") =>
  ["btn", `btn-${variant}`, size === "sm" ? "btn-sm" : "", extra].filter(Boolean).join(" ");

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  children: ReactNode;
}

export function ButtonLink({ href, variant, size, className, arrow, children }: ButtonLinkProps) {
  const classes = buttonClass(variant, size, className);
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" />}
    </>
  );
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
}

export function Button({ variant, size, className, arrow, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      {children}
      {arrow && <Icon name="arrow" />}
    </button>
  );
}
