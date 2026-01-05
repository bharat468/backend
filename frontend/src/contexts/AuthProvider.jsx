import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  async function checkIsLoggedIn() {
    try {
      const res = await instance.get("/check/login?referer=user");
      setIsLoggedIn(res.data.loggedIn === true);
    } catch {
      setIsLoggedIn(false);
    }
  }

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkIsLoggedIn }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
