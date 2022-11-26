import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const ProductCard = ({ product, setSelectedProduct }) => {
  const {
    image,
    title,
    location,
    reselPrice,
    originalPrice,
    useYears,
    condition,
    mobileNumber,
    category,
    drivenKm,
    milage,
    brandName,
    bikeCC,
    date,
    sellerName,
    sellerEmail,
    booked,
  } = product;
  const { data: seller } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/users/seller?email=${sellerEmail}`,
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
    <div className="card lg:card-side bg-base-100 shadow-xl mb-12 border">
      <figure className="lg:w-1/3 m-4 border">
        <img src={image} alt="product" className="w-[100%] h-[100%]" />
      </figure>
      <div className="card-body">
        <h3 className="text-xl text-primary flex items-center">
          Seller Name: {sellerName}{" "}
          {seller?.varified ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eo_circle_light-blue_checkmark.svg/1200px-Eo_circle_light-blue_checkmark.svg.png"
              alt=""
              className="w-4"
            />
          ) : (
            <span className="badge">Unverified</span>
          )}
        </h3>
        <h2 className="card-title">{title}</h2>
        <p>Location: {location}</p>
        <p>Publish Date: {date}</p>
        <p>Phone: {mobileNumber}</p>
        <h3 className="text-xl text-primary">Description</h3>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          <p>Resel Price: {reselPrice}TK</p>
          <p>Original Price: {originalPrice}TK</p>
          <p>Years Of Use: {useYears}</p>
          <p>Condition: {condition}</p>
          <p>Category: {category}</p>
          <p>Kilometer Drive: {drivenKm}Km</p>
          <p>Milage: {milage}Km</p>
          <p>Brand Name: {brandName}</p>
          <p>Bike CC: {bikeCC}</p>
        </div>
        <div className="card-actions justify-end">
          {booked ? (
            <button className="btn normal-case" disabled>
              Booked
            </button>
          ) : (
            <label
              onClick={() => setSelectedProduct(product)}
              htmlFor="bikeghor-book-modal"
              className="btn btn-primary text-white normal-case"
            >
              Book Now
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
