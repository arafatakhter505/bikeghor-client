import React from "react";

const MyProductRow = ({ product, index }) => {
  const { title, image, brandName, date, sold } = product;
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt="product" />
            </div>
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm opacity-50">Brand Name: {brandName}</div>
          </div>
        </div>
      </td>
      <td>{date}</td>
      <td>{sold ? "Sold" : "Available"}</td>
      <th>
        {sold || (
          <button className="btn btn-primary text-white normal-case btn-xs">
            Advertised
          </button>
        )}
      </th>
      <td>
        <button>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
            alt=""
            className="w-6"
          />
        </button>
      </td>
    </tr>
  );
};

export default MyProductRow;
