import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./../../../context/UserContext";
import { toast } from "react-hot-toast";
import Spinner from "./../../shared/Spinner/Spinner";
import MyOrderRow from "./MyOrderRow";

const MyOders = () => {
  const { user } = useContext(AuthContext);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://bikeghor-server.vercel.app/orders?email=${user.email}`,
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
        My <span className="text-primary">Orders</span>
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
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Pay</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <MyOrderRow key={order._id} index={i} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOders;
