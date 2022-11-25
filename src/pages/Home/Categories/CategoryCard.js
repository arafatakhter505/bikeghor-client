import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { name, link, img } = category;
  return (
    <Link to={`/category/${link}`}>
      <div className="card card-compact bg-base-100 shadow-xl border cursor-pointer">
        <figure className="p-2">
          <img src={img} alt="category" className="w-full h-[200px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
