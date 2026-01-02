import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { Navigate } from "react-router-dom";

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

      if (res.status === 200) {
        setAllowed(true);
      }
    } catch (err) {
      console.log("Not allowed", err);
    } finally {
      setLoading(false);
    }
  }

  /* ================= LOADING UI ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>

          {/* Text */}
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
