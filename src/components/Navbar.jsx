import { Link, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoLogOut, IoSettings } from "react-icons/io5";

const navLinks = [
  { to: "/", label: "Events", protected: false },
  { to: "/upcoming", label: "Upcoming", protected: false },
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
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar px-[3%] h-16 bg-base-200 text-neutral-content">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="sidebar"
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
          <Link to={"/"} className="flex-1 text-xl text-white font-semibold">
            Event Scheduler
          </Link>
          <div className="hidden lg:flex space-x-5">
            {navLinks
              .filter((link) => !link.protected || token)
              .map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `hover:text-white border-b-2 py-1 ${
                      isActive
                        ? "text-white border-white"
                        : "border-transparent"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

            {token ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost bg-trnasparent hover:bg-transparent rounded-btn px-0"
                >
                  <RiAccountCircleFill className="text-3xl"/>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-neutral rounded-box z-[1] mt-1 w-36 p-2 shadow space-y-3"
                >
                  <li>
                  <button className="flex items-center justify-between">Setting <IoSettings className="text-xl"/></button>
                  </li>
                  <li>
                    <button onClick={logout} className="flex items-center justify-between">Log Out <IoLogOut className="text-xl"/></button>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `hover:text-white border-b-2 py-1 ${
                    isActive ? "text-white border-white" : "border-transparent"
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
