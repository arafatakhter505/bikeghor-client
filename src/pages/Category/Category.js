import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookNowModal from "./BookNowModal";
import ProductCard from "./ProductCard";

const Category = () => {
  const products = useLoaderData();
  const [selectedProduct, setSelectedProduct] = useState({});

  return (
    <div className="container mx-auto px-6 lg:px-3 my-12">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          setSelectedProduct={setSelectedProduct}
        />
      ))}
      <BookNowModal selectedProduct={selectedProduct} />
    </div>
  );
};

export default Category;
