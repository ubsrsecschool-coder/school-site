import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/prefersReducedMotion";

interface CounterProps {
  to: number;
  suffix?: string;
  plain?: boolean;
  className?: string;
}

const DURATION_MS = 1100;

const formatCount = (value: number, plain: boolean, suffix: string) =>
  (plain ? String(value) : value.toLocaleString("en-IN")) + suffix;

export function Counter({ to, suffix = "", plain = false, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.textContent = formatCount(0, plain, suffix);
    let frame = 0;
    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        el.textContent = formatCount(Math.round(to * (1 - Math.pow(1 - progress, 3))), plain, suffix);
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = formatCount(to, plain, suffix);
    };
  }, [to, suffix, plain]);

  return (
    <span ref={ref} className={className}>
      {formatCount(to, plain, suffix)}
    </span>
  );
}
