import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    closeSidebar()
    navigate("/");
  };

  return (
    <div className="drawer-side">
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
          <button
            onClick={logout}
            className="p-4 bg-gray-800 text-white hover:bg-neutral rounded-md capitalize mt-auto"
          >
            Log Out
          </button>
        ) : (
          <NavLink
            to="/signin"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `p-4 hover:bg-neutral capitalize  ${
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
