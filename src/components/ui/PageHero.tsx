import type { ReactNode } from "react";
import { Link } from "react-router";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs: Crumb[];
}

export function PageHero({ eyebrow, title, lede, crumbs }: PageHeroProps) {
  return (
    <section className="light-field">
      <div className="wrap pb-[clamp(40px,5vw,72px)] pt-[clamp(24px,3vw,40px)]">
        <nav aria-label="Breadcrumb" className="mb-[clamp(20px,3vw,36px)]">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-[13px] text-muted">
            <li>
              <Link to="/" className="hover:text-green hover:underline hover:underline-offset-[3px]">
                Home
              </Link>
            </li>
            {crumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {crumb.to && index < crumbs.length - 1 ? (
                  <Link to={crumb.to} className="hover:text-green hover:underline hover:underline-offset-[3px]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-semibold text-green">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Reveal as="h1" className="mt-4 max-w-[18ch] text-[clamp(36px,4.8vw,62px)] tracking-[-.025em] min-[681px]:max-w-[22ch]">
          {title}
        </Reveal>
        {lede && (
          <Reveal as="p" delay={1} className="lede mt-5 max-w-[60ch]">
            {lede}
          </Reveal>
        )}
      </div>
    </section>
  );
}
