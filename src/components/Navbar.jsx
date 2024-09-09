import { Link, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";


const navLinks = [
  { to: "/", label: "Home", protected: false },
  { to: "/events", label: "Events", protected: true },
  { to: "/create-event", label: "Create Event", protected: true },
];

export const Navbar = () => {
  const { token, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/");
  };


  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar px-[3%] bg-gray-800 text-white">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              aria-expanded="false"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <Link to={"/"} className="flex-1 mx-2 text-xl font-semibold">
            Event Scheduler
          </Link>
          <div className="hidden lg:flex space-x-5">
            {navLinks
              .filter((link) => (!link.protected || token))
              .map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `hover:text-gray-200 border-b-2 py-1 ${
                      isActive
                        ? "border-white hover:border-gray-200"
                        : "border-transparent"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

            {token ? (
              <button
                onClick={logout}
                className="bg-base-200 text-gray-800 px-3 py-1.5 text-sm rounded-md hover:scale-105 "
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `hover:text-gray-400 border-b-2 py-1 ${
                    isActive
                      ? "border-white hover:border-gray-400"
                      : "border-transparent"
                  }`
                }
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Navbar;
