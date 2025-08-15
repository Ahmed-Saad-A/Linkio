import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar
} from "@heroui/react";
import userPhoto from "/src/assets/user-circles.png";
import style from "../Shared/Css/Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../Context/authContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userData } = useContext(authContext);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  function SignOut() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Navbar>
      <NavbarBrand>
        <span className={style.logoGhost}>linkio</span>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink to={""}>Home</NavLink>
        </NavbarItem>
        <NavbarItem isActive>
          <NavLink aria-current="page" to={"/profile"}>
            Profile
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="items-center gap-3">
        <Button
          isIconOnly
          variant="light"
          onPress={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <SunIcon className="w-5 h-5 text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-700" />
          )}
        </Button>

        {isLoggedIn && (
          <Avatar
            src={userData?.avatar || userPhoto}
            size="sm"
            className="cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        )}

        {isLoggedIn ? (
          <Button onPress={SignOut} color="danger" variant="flat">
            Sign Out
          </Button>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button as={NavLink} color="default" variant="flat">
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={NavLink} color="primary" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponent;
