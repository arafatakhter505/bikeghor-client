import React, { useContext } from "react";
import { AuthContext } from "./../../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Spinner from "./../../shared/Spinner/Spinner";
import MyWishListRow from "./MyWishListRow";

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://bikeghor-server.vercel.app/wishlist?email=${user.email}`,
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
        My <span className="text-primary">Wishlist</span>
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
                {wishlist.map((item, i) => (
                  <MyWishListRow key={item._id} index={i} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishList;
