import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AuthContext } from "./../../../context/UserContext";
import MyProductRow from "./MyProductRow";
import Spinner from "./../../shared/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
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

  const handleAdvertised = (product) => {
    fetch(`http://localhost:5000/advertise?email=${user.email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("bikeghor-accessToken")}`,
      },
      body: JSON.stringify({
        productName: product.title,
        image: product.image,
        sellerEmail: product.sellerEmail,
        sold: product.sold,
        productId: product._id,
        price: product.reselPrice,
        condition: product.condition,
        location: product.location,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Successfully advertised add");
        } else {
          toast.error("Something is wrong");
        }
      });
  };

  const handleProductDelete = (id) => {
    const confirm = window.confirm("Are you sure delete this product");
    if (confirm) {
      fetch(`http://localhost:5000/products/${id}?email=${user.email}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem(
            "bikeghor-accessToken"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
            toast.success("Successfully delete");
          }
        });
    }
  };

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
                  <MyProductRow
                    key={product._id}
                    product={product}
                    index={i}
                    handleAdvertised={handleAdvertised}
                    handleProductDelete={handleProductDelete}
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

export default MyProducts;
