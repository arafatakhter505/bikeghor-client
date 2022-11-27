import React, { useEffect, useState } from "react";

const ProductCard = ({ product, setSelectedProduct, handleWishList }) => {
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
  const [seller, setSeller] = useState({});
  useEffect(() => {
    fetch(
      `https://bikeghor-server.vercel.app/users/seller?email=${sellerEmail}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem(
            "bikeghor-accessToken"
          )}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setSeller(data));
  }, [sellerEmail]);

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
          {booked || (
            <button
              onClick={() => handleWishList(product)}
              className="btn btn-secondary normal-case"
            >
              Add WishList
            </button>
          )}
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
