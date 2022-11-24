import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/UserContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogOut = () => {
    logout()
      .then(() => toast.success("Successfully Log Out"))
      .catch((e) => toast.error(e.message));
  };
  return (
    <nav className="bg-base-100  z-50 sticky top-0 shadow">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/blog"}>Blog</Link>
              </li>
              {user?.uid && (
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
          <Link to={"/"} className="text-3xl font-bold text-secondary">
            Bike<span className="text-primary">Ghor</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to={"/blog"}>Blog</Link>
            </li>
            {user?.uid && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {user?.uid ? (
            <button
              onClick={handleLogOut}
              className="btn btn-primary text-white normal-case"
            >
              Log Out
            </button>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-primary text-white normal-case"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
