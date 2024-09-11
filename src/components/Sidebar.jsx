import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoLogOut, IoSettings } from "react-icons/io5";

const navLinks = [
  { to: "/", label: "Events", protected: false },
  { to: "/upcoming", label: "Upcoming", protected: false },
  { to: "/create-event", label: "Create Event", protected: true },
];

const closeSidebar = () => {
  document.getElementById("sidebar").checked = false;
};

export const Sidebar = () => {
  const { token, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    closeSidebar();
    navigate("/");
  };

  return (
    <div className="drawer-side z-[100]">
      <label htmlFor="sidebar" className="drawer-overlay"></label>
      <ul className="menu w-52 md:w-80 h-full bg-base-200">
        {navLinks
          .filter((link) => !link.protected || token)
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `p-4 hover:bg-neutral capitalize ${
                  isActive ? "font-bold text-white" : "border-transparent"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        {token ? (
          <div className="mt-auto flex flex-col space-y-3">
            <button
              aria-label="Settings"
              className="p-4 bg-neutral text-base-content bg-opacity-50 hover:bg-opacity-100 rounded-md capitalize flex items-center justify-between"
            >
              Setting <IoSettings className="text-xl"/>
            </button>
            <button
              aria-label="Log Out"
              onClick={logout}
              className="p-4 bg-neutral text-base-content bg-opacity-50 hover:bg-opacity-100 rounded-md capitalize mt-auto flex items-center justify-between"
            >
              Log Out <IoLogOut className="text-xl"/>
            </button>
          </div>
        ) : (
          <NavLink
            to="/signin"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `p-4 hover:bg-neutral capitalize ${
                isActive ? "font-bold text-white" : "border-transparent"
              }`
            }
          >
            Sign In
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;