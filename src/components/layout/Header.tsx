import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, NavLink } from "react-router";
import { navRoutes } from "@/lib/routes";
import { addressLine, primaryPhone, school } from "@/lib/school";
import { Pill } from "@/components/ui/Pill";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

function Brand() {
  return (
    <Link to="/" className="brand" aria-label={`${school.name}, home`}>
      <span className="crest" aria-hidden="true">
        <span>UB</span>
      </span>
      <span className="brand-txt">
        <b>Uma Bharti</b>
        <i>Sr. Sec. School</i>
      </span>
    </Link>
  );
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => el.setAttribute("data-stuck", String(window.scrollY > 40));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const dialog = drawerRef.current;
    if (!dialog) return;
    if (drawerOpen && !dialog.open) dialog.showModal();
    if (!drawerOpen && dialog.open) dialog.close();
    document.documentElement.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header ref={headerRef} className="hdr" data-stuck="false">
        <div className="wrap hdr-in">
          <Brand />
          <nav className="nav" aria-label="Primary">
            {navRoutes.map((route) => (
              <NavLink key={route.path} to={route.path}>
                {route.label}
              </NavLink>
            ))}
          </nav>
          <div className="hdr-cta">
            <Pill>Admissions {school.session}</Pill>
            <ButtonLink href="/admissions#enquiry" variant="brass" size="sm">
              Enquire
            </ButtonLink>
            <button
              type="button"
              className="burger"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <i />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={drawerRef}
        className="drawer"
        aria-label="Site menu"
        onClose={closeDrawer}
      >
        <button type="button" className="drawer-close" aria-label="Close menu" onClick={closeDrawer}>
          <Icon name="close" />
        </button>
        <nav aria-label="Mobile" className="flex flex-col">
          <NavLink to="/" end className="drawer-link" style={{ "--i": 0 } as CSSProperties} onClick={closeDrawer}>
            Home
          </NavLink>
          {navRoutes.map((route, index) => (
            <NavLink
              key={route.path}
              to={route.path}
              className="drawer-link"
              style={{ "--i": index + 1 } as CSSProperties}
              onClick={closeDrawer}
            >
              {route.label}
            </NavLink>
          ))}
        </nav>
        <p className="drawer-foot">
          {primaryPhone.display} · {school.email}
          <br />
          {addressLine}
        </p>
      </dialog>
    </>
  );
}
