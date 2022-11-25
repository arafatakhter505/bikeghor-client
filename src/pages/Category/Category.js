import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";

const Category = () => {
  const products = useLoaderData();

  return (
    <div className="container mx-auto px-6 lg:px-3 my-12">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Category;
