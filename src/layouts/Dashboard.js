import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import { toast } from "react-hot-toast";
import useBuyer from "./../hooks/useBuyer";
import useSeller from "./../hooks/useSeller";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [isBuyer] = useBuyer(user?.email);
  const [isSeller] = useSeller(user?.email);

  const handleLogOut = () => {
    logout()
      .then(() => toast.success("Successfully Log Out"))
      .catch((e) => toast.error(e.message));
  };

  return (
    <div>
      <nav className="bg-base-100  z-50 sticky top-0 shadow">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                htmlFor="bikeghor-drawer"
                className="btn btn-ghost drawer-button lg:hidden"
              >
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
            </div>
            <Link to={"/"} className="text-3xl font-bold text-secondary">
              Bike<span className="text-primary">Ghor</span>
            </Link>
          </div>
          <div className="navbar-end">
            {user?.uid && (
              <button
                onClick={handleLogOut}
                className="btn btn-primary text-white normal-case"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
      <div className="drawer drawer-mobile fixed">
        <input id="bikeghor-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content pb-20">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="bikeghor-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 bg-base-100 text-base-content lg:border-r">
            {isBuyer && (
              <li>
                <Link to={"/dashboard/myorders"}>My Orders</Link>
              </li>
            )}
            {isSeller && (
              <>
                <li>
                  <Link to={"/dashboard/addproduct"}>Add A Product</Link>
                </li>
                <li>
                  <Link to={"/dashboard/myproducts"}>My Products</Link>
                </li>
                <li>
                  <Link to={"/dashboard/mybuyers"}>My Buyers</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
