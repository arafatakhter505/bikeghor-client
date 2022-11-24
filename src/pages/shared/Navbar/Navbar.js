import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const categories = [
    {
      id: 1,
      name: "Sports",
      link: "/sports",
    },
    {
      id: 2,
      name: "Touring",
      link: "/touring",
    },
    {
      id: 3,
      name: "Naked Sports",
      link: "/nakedsports",
    },
    {
      id: 4,
      name: "Commuter",
      link: "/commuter",
    },
  ];
  return (
    <nav className="bg-base-100  z-50 sticky top-0">
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
              <li tabIndex={0}>
                <Link className="justify-between">
                  Category
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </Link>
                <ul className="p-2 bg-base-100">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link to={category.link}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link to={"/blog"}>Blog</Link>
              </li>
            </ul>
          </div>
          <Link to={"/"} className="text-3xl font-bold text-secondary">
            Bike<span className="text-primary">Ghor</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li tabIndex={0}>
              <Link className="justify-between">
                Category
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </Link>
              <ul className="p-2 bg-base-100">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link to={category.link}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to={"/blog"}>Blog</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            to={"/login"}
            className="btn btn-primary text-white normal-case"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
