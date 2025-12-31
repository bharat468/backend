import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { Navigate } from "react-router-dom";
import "../admin.css";

function ProtectedRouters({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkForLogin();
  }, []);

  async function checkForLogin() {
    try {
      const res = await instance.get("/check/login?referer=admin", { withCredentials: true });
      if (res.status === 200) setAllowed(true);
    } catch (err) {
      console.log("not allowed", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="admin-wrapper">Checking permission...</p>;
  if (!allowed) return <Navigate to="/admin/login" replace />;

  return children;
}

export default ProtectedRouters;
