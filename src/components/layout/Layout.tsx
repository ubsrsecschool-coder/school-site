import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MottoBand } from "./MottoBand";
import { SkipLink } from "./SkipLink";
import { ScrollManager } from "./ScrollManager";

export function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <SkipLink />
      <ScrollManager />
      <Header />
      <div className="pt-[78px]">
        <MottoBand compact={pathname !== "/"} />
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
