import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";

export default function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="site-shell internal-shell">
      <SiteHeader />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
