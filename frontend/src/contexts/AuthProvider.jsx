import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";

const authContext = createContext();

function AuthProvider({ children }) {
  // Initialize from localStorage to prevent flash
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = localStorage.getItem("isLoggedIn");
    return stored === "true";
  });

  // Loading state - starts true until API check completes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  async function checkIsLoggedIn() {
    try {
      setLoading(true);
      const res = await instance.get("/check/login?referer=user");
      const loggedIn = res.data.loggedIn === true;
      setIsLoggedIn(loggedIn);
      localStorage.setItem("isLoggedIn", String(loggedIn));
    } catch {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");
    } finally {
      setLoading(false);
    }
  }

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkIsLoggedIn, loading, setLoading }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
