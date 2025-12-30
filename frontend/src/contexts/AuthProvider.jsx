import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  async function checkIsLoggedIn() {
    const response = await instance.get("/check/login?referer=user", {
      withCredentials: true,
    });
    console.log(response);
    if (response.status === 200) setIsLoggedIn(true);
  }

  return (
    <authContext.Provider
      value={{ isLoggedIn, loggedinUser, checkIsLoggedIn, setIsLoggedIn }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;