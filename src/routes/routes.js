import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import MyOders from "./../pages/Dashboard/MyOders/MyOders";
import AddProduct from "./../pages/Dashboard/AddProduct/AddProduct";
import MyProducts from "./../pages/Dashboard/MyProducts/MyProducts";
import Category from "./../pages/Category/Category";
import MyBuyers from "./../pages/Dashboard/MyBuyers/MyBuyers";
import MyDashboard from "./../pages/Dashboard/MyDashboard/MyDashboard";
import AllSellers from "./../pages/Dashboard/AllSellers/AllSellers";
import AllBuyers from "./../pages/Dashboard/AllBuyers/AllBuyers";
import Report from "./../pages/Dashboard/Report/Report";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <MyDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myorders",
        element: (
          <PrivateRoute>
            <MyOders />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/mybuyers",
        element: (
          <PrivateRoute>
            <MyBuyers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <PrivateRoute>
            <AllSellers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <PrivateRoute>
            <AllBuyers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/report",
        element: (
          <PrivateRoute>
            <Report />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
