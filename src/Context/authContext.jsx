import { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { getUserProfileApi } from "../Services/AuthServices";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    const response = await getUserProfileApi();
    console.log("🚀 ~ getUserData ~ response:", response);
    if (response.message === "success") {
      setUserData(response.user);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    } else {
      setUserData(null);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
