import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { Navigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

function ProtectedRouters({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkForLogin();
  }, []);

  async function checkForLogin() {
  try {
    const res = await instance.get(
      "/check/login?referer=admin",
      { withCredentials: true }
    );

    // ✅ STRICT ADMIN CHECK
    if (res.data?.loggedIn === true && res.data?.role === "admin") {
      setAllowed(true);
    } else {
      setAllowed(false);
    }

  } catch (err) {
    console.log("Not allowed", err);
    setAllowed(false);
  } finally {
    setLoading(false);
  }
}

  /* ================= LOADING UI ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="flex flex-col items-center gap-4">

          {/* 🔥 SAME PRODUCT PAGE LOADER */}
          <div className="relative">
            <FaShoppingBag className="text-5xl text-teal-600 animate-bounce" />
            <div className="absolute -inset-4 border-2 border-dashed border-teal-400 rounded-full animate-spin"></div>
          </div>

          <p className="text-slate-600 font-medium tracking-wide">
            Checking admin permission...
          </p>
        </div>
      </div>
    );
  }

  /* ================= NOT ALLOWED ================= */
  if (!allowed) {
    return <Navigate to="/admin/login" replace />;
  }

  /* ================= ALLOWED ================= */
  return children;
}

export default ProtectedRouters;
