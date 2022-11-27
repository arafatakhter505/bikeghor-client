import React, { useContext } from "react";
import AllBuyersRow from "./AllBuyersRow";
import { AuthContext } from "./../../../context/UserContext";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./../../shared/Spinner/Spinner";

const AllBuyers = () => {
  const { user } = useContext(AuthContext);
  const {
    data: buyers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://bikeghor-server.vercel.app/buyers?email=${user.email}`,
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

  const handleBuyerDelete = (id) => {
    const confirm = window.confirm("Are you sure delete this user");
    if (confirm) {
      fetch(
        `https://bikeghor-server.vercel.app/buyers/${id}?email=${user.email}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem(
              "bikeghor-accessToken"
            )}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
            toast.success("Successfully buyer delete");
          }
        });
    }
  };

  return (
    <div className="md:p-12 p-6">
      <h2 className="text-3xl font-semibold">
        My <span className="text-primary">Sellers</span>
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
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((buyer, i) => (
                  <AllBuyersRow
                    key={buyer._id}
                    index={i}
                    buyer={buyer}
                    handleBuyerDelete={handleBuyerDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBuyers;
