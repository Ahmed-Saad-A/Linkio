import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import userPhoto from "/src/assets/user-circles.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Context/AuthContextProvider";

const NavbarComponent = () => {
  const location = useLocation();

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
    <Navbar className=" dark:border-b-2 dark:border-blue-500">
      {/* Logo */}
      <NavbarBrand>
        <span
          className="cursor-pointer flex items-center gap-2 text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:scale-110 transition-transform duration-300 "
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon
            icon={faLink}
            className="text-blue-500 drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]"
          />
          linkio
        </span>
      </NavbarBrand>

      {/* Center links */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-3 py-1 rounded-md transition-all duration-300 dark:text-pink-600 
              ${
                isActive
                  ? "text-blue-600 font-bold bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>
        </NavbarItem>

        {isLoggedIn && (
          <NavbarItem>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `relative px-3 py-1 rounded-md transition-all duration-300 dark:text-pink-600
                ${
                  isActive
                    ? "text-blue-600 font-bold bg-blue-50"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              Profile
            </NavLink>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Right side */}
      <NavbarContent justify="end" className="items-center gap-3">
        {/* Dark mode toggle */}
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
          <span className="sr-only">
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </span>
        </Button>

        {/* Avatar + Dropdown */}
        {isLoggedIn && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex flex-col items-center cursor-pointer">
                <Avatar
                  src={userData?.photo || userPhoto}
                  size="sm"
                  className="cursor-pointer"
                />
              </div>
            </DropdownTrigger>

            <DropdownMenu aria-label="User menu" variant="flat">
              {/* User info */}
              <DropdownItem key="user" className="h-14 gap-2" isReadOnly>
                <div className="flex items-center gap-3">
                  <Avatar src={userData?.photo || userPhoto} size="sm" />
                  <div>
                    <p className="text-sm font-semibold">{userData?.name}</p>
                    <p className="text-xs text-gray-500">{userData?.email}</p>
                  </div>
                </div>
              </DropdownItem>

              <DropdownItem key="profile" onClick={() => navigate("/profile")}>
                Profile
              </DropdownItem>
              <DropdownItem
                key="settings"
                onClick={() => navigate("/settings")}
              >
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={SignOut}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {!isLoggedIn && (
          <>
            {location.pathname === "/login" ? (
              <NavbarItem>
                <Button
                  as={NavLink}
                  to="/register"
                  color="primary"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            ) : location.pathname === "/register" ? (
              <NavbarItem>
                <Button as={NavLink} to="/login" color="default" variant="flat">
                  Sign In
                </Button>
              </NavbarItem>
            ) : (
              <>
                <NavbarItem className="hidden lg:flex">
                  <Button
                    as={NavLink}
                    to="/login"
                    color="default"
                    variant="flat"
                  >
                    Sign In
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    as={NavLink}
                    to="/register"
                    color="primary"
                    variant="flat"
                  >
                    Sign Up
                  </Button>
                </NavbarItem>
              </>
            )}
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponent;
