import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

function First() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {!isAdminRoute && <Header />}

      <main className={!isAdminRoute ? "pt-16 xs:pt-20" : ""}>
        <Outlet />
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTop />}
    </div>
  );
}

export default First;
