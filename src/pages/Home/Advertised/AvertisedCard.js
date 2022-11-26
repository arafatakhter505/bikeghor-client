import React from "react";

const AvertisedCard = ({ advertised }) => {
  const { image, productName, price, condition, location, sold } = advertised;
  if (!sold) {
    return (
      <div className="card lg:card-side bg-base-100 shadow-xl border">
        <figure className="lg:w-1/3 lg:h-auto h-[250px] m-4 border">
          <img src={image} alt="product" className="w-[100%] h-[100%]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{productName}</h2>
          <div>
            <p>Condition: {condition}</p>
            <p>Location: {location}</p>
          </div>
          <div className="card-actions justify-end mt-auto">
            <span className="btn btn-primary text-white normal-case cursor-default">
              Price: {price}TK
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default AvertisedCard;
