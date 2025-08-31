import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../Components/NavbarComponent";

const AuthLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};

export default AuthLayout;
