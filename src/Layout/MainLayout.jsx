import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../Components/NavbarComponent";

const MainLayout = () => {
  return (
    <>
      <NavbarComponent />
      <div className="container my-5">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
