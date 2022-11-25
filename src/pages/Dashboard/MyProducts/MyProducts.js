import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AuthContext } from "./../../../context/UserContext";
import MyProductRow from "./MyProductRow";
import Spinner from "./../../shared/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products?email=${user.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem(
                "bikeghor-accessToken"
              )}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="md:p-12 p-6">
      <h2 className="text-3xl font-semibold">
        My <span className="text-primary">Products</span>
      </h2>
      <div className="mt-6">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>
                    <label>Sl</label>
                  </th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Advertised</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, i) => (
                  <MyProductRow key={product._id} product={product} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
