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
        loader: async ({ params }) =>
          fetch(`http://localhost:5000/products/category/${params.id}`, {
            headers: {
              authorization: `bearer ${localStorage.getItem(
                "bikeghor-accessToken"
              )}`,
            },
          }),
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
    ],
  },
]);

export default router;
