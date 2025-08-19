import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import LoginPage from './../Pages/Auth/LoginPage';
import { AuthContext } from "../Context/AuthContextProvider";

const ProtectedRoute = ({ children }) => {
  const {isLoggedIn} = useContext(AuthContext);
  return isLoggedIn ? children : <LoginPage />;
};

export default ProtectedRoute;
