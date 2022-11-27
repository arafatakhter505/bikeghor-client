import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import Spinner from "../../shared/Spinner/Spinner";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://bikeghor-server.vercel.app/categories"
        );
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  return (
    <div className="container mx-auto px-6 lg:px-3 my-20">
      <h2 className="text-primary text-3xl font-semibold">Categories</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
          {categories?.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
