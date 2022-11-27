import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./../../../context/UserContext";
import { toast } from "react-hot-toast";
import AllSellerRow from "./AllSellerRow";
import Spinner from "./../../shared/Spinner/Spinner";

const AllSellers = () => {
  const { user } = useContext(AuthContext);
  const {
    data: sellers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://bikeghor-server.vercel.app/sellers?email=${user.email}`,
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

  const handleSellerDelete = (id) => {
    const confirm = window.confirm("Are you sure delete this user");
    if (confirm) {
      fetch(
        `https://bikeghor-server.vercel.app/sellers/${id}?email=${user.email}`,
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
            toast.success("Successfully seller delete");
          }
        });
    }
  };

  const handleVarified = (id) => {
    fetch(`https://bikeghor-server.vercel.app/sellers/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("bikeghor-accessToken")}`,
      },
      body: JSON.stringify({ varified: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Successfully varified this seller");
          refetch();
        }
      });
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
                  <th>Varify</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, i) => (
                  <AllSellerRow
                    key={seller._id}
                    index={i}
                    seller={seller}
                    handleSellerDelete={handleSellerDelete}
                    handleVarified={handleVarified}
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

export default AllSellers;
