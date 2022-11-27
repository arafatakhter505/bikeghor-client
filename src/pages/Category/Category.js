import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import BookNowModal from "./BookNowModal";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Spinner from "../shared/Spinner/Spinner";
import { AuthContext } from "./../../context/UserContext";

const Category = () => {
  const { id } = useParams();
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
          `https://bikeghor-server.vercel.app/products/category/${id}`,
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
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleWishList = (item) => {
    fetch(`https://bikeghor-server.vercel.app/wishlist?email=${user.email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("bikeghor-accessToken")}`,
      },
      body: JSON.stringify({
        image: item.image,
        title: item.title,
        price: item.reselPrice,
        productId: item._id,
        email: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Successfully product wishlist add");
        } else if (data.message) {
          toast.error(data.message);
        } else {
          toast.error("Something is wrong");
        }
      });
  };

  return (
    <div className="container mx-auto px-6 lg:px-3 my-12 min-h-[70vh]">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  setSelectedProduct={setSelectedProduct}
                  handleWishList={handleWishList}
                />
              ))}
            </>
          ) : (
            <p className="text-center text-4xl">No Products</p>
          )}
        </>
      )}
      {selectedProduct && (
        <BookNowModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Category;
