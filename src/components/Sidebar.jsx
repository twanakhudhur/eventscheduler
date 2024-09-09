import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home", protected: false },
  { to: "/events", label: "Events", protected: true },
  { to: "/create-event", label: "Create Event", protected: true },
];

export const Sidebar = () => {
  const { token, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="drawer-side h-screen overflow-hidden">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu py-4 w-52 lg:w-80 h-screen bg-base-200">
        {navLinks
          .filter((link) => !link.protected || token)
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `p-4 hover:bg-gray-200 capitalize ${
                  isActive ? "font-bold" : "border-transparent"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        {token ? (
          <button
            onClick={logout}
            className="p-4 bg-gray-800 text-white hover:bg-gray-700 rounded-md capitalize mt-auto"
          >
            Log Out
          </button>
        ) : (
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              `p-4 hover:bg-gray-200 capitalize  ${
                isActive ? "font-bold" : "border-transparent"
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
