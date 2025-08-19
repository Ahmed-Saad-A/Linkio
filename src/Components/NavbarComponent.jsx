import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
} from "@heroui/react";
import userPhoto from "/src/assets/user-circles.png";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Context/AuthContextProvider";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userData } = useContext(AuthContext);

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
        <span
          className="cursor-pointer flex items-center gap-2 text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-110 transition-transform duration-300"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon
            icon={faLink}
            className="text-blue-500 drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]"
          />
          linkio
        </span>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-3 py-1 rounded-md transition-all duration-300 
            ${
              isActive
                ? "text-blue-600 font-bold bg-blue-50"
                : "text-gray-700 hover:text-blue-600"
            }`
            }
          >
            Home
            {({ isActive }) =>
              isActive && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-blue-500 rounded-full animate-[slideIn_0.3s_ease-in-out]"></span>
              )
            }
          </NavLink>
        </NavbarItem>

        <NavbarItem>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `relative px-3 py-1 rounded-md transition-all duration-300 
            ${
              isActive
                ? "text-blue-600 font-bold bg-blue-50"
                : "text-gray-700 hover:text-blue-600"
            }`
            }
          >
            Profile
            {({ isActive }) =>
              isActive && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-blue-500 rounded-full animate-[slideIn_0.3s_ease-in-out]"></span>
              )
            }
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
