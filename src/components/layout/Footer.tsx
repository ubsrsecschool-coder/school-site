import { Link } from "react-router";
import { navRoutes } from "@/lib/routes";
import { addressLine, emailHref, primaryPhone, school } from "@/lib/school";

const schoolLinks = ["/about", "/academics", "/achievements"];

export function Footer() {
  const schoolRoutes = navRoutes.filter((route) => schoolLinks.includes(route.path));
  const exploreRoutes = navRoutes.filter((route) => !schoolLinks.includes(route.path));

  return (
    <footer className="ft pt-[clamp(56px,6vw,84px)]">
      <div className="wrap">
        <div className="relative z-[2] grid gap-[34px] pb-12 min-[681px]:grid-cols-2 min-[681px]:gap-11 min-[1081px]:grid-cols-[1.6fr_.8fr_.8fr_1.1fr]">
          <div>
            <div className="mb-[18px] flex items-center gap-[13px]">
              <span className="crest" aria-hidden="true">
                <span>UB</span>
              </span>
              <b className="font-display text-[18px] font-semibold text-white">{school.shortName}</b>
            </div>
            <p className="max-w-[34ch] text-sm leading-[1.65] text-white/70">
              An English-medium school in {school.location.locality}, {school.location.city}. Affiliated
              with HBSE and following the CBSE-pattern curriculum, teaching {school.classes} since{" "}
              {school.established}.
            </p>
            <p className="mt-[18px] font-devanagari text-[19px] font-bold text-brass-light" lang="sa">
              {school.motto.devanagari}
            </p>
          </div>
          <div>
            <h4>School</h4>
            <ul>
              {schoolRoutes.map((route) => (
                <li key={route.path}>
                  <Link to={route.path}>{route.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {exploreRoutes.map((route) => (
                <li key={route.path}>
                  <Link to={route.path}>{route.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li>
                <a href={primaryPhone.href}>{primaryPhone.display}</a>
              </li>
              <li>
                <a href={emailHref}>{school.email}</a>
              </li>
              <li>{addressLine}</li>
            </ul>
          </div>
        </div>
        <div className="relative z-[2] flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-[22px] text-[12.5px] text-white/60">
          <span>© {new Date().getFullYear()} {school.name}</span>
          <span>
            {school.affiliation} · Established {school.established}
          </span>
        </div>
      </div>
    </footer>
  );
}
