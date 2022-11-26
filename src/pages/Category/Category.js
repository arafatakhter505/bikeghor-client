import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BookNowModal from "./BookNowModal";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Spinner from "../shared/Spinner/Spinner";

const Category = () => {
  const { id } = useParams();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/products/category/${id}`,
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

  return (
    <div className="container mx-auto px-6 lg:px-3 my-12">
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
                />
              ))}
            </>
          ) : (
            <p className="text-center text-xl">No Products</p>
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
