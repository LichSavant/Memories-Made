import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import SiteNavigation from "../components/SiteNavigation";
import useReducedMotion from "../hooks/useReducedMotion";
import useSectionReveal from "../hooks/useSectionReveal";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const mainRef = useSectionReveal(reducedMotion, pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, mainRef]);
  return (
    <div className="site-shell internal-shell">
      <a className="skip-link" href="#page-content">
        Skip to content
      </a>
      <SiteHeader />
      <main className="page-main" id="page-content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <SiteNavigation />
    </div>
  );
}
