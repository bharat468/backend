import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function First() {
  const location = useLocation();

  // ✅ admin route detect
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {/* ❌ Admin panel par Header hide */}
      {!isAdminRoute && <Header />}

      <Outlet />

      {/* ❌ Admin panel par Footer hide */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default First;
