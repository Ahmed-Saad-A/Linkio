import React, { useContext } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/authContext";
import LoginPage from './../Pages/Auth/LoginPage';

const ProtectedRoute = ({ children }) => {
  const {isLoggedIn} = useContext(authContext);
  return isLoggedIn ? children : <LoginPage />;
};

export default ProtectedRoute;
