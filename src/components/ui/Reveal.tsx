import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { prefersReducedMotion } from "@/hooks/prefersReducedMotion";

interface RevealProps {
  as?: ElementType;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  children?: ReactNode;
}

export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = ["rv", delay ? `rv-d${delay}` : "", className].filter(Boolean).join(" ");
  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
