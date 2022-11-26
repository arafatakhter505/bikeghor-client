import React from "react";
import { Link } from "react-router-dom";

const MyWishListRow = ({ item, index }) => {
  const { image, title, price, productId } = item;
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
        </div>
      </td>
      <td>
        <div>
          <div className="font-bold">{title}</div>
        </div>
      </td>
      <td>{price}</td>
      <th>
        <Link to={`/dashboard/payment/${productId}`}>
          <button className="btn btn-primary text-white normal-case btn-sm">
            Pay
          </button>
        </Link>
      </th>
    </tr>
  );
};

export default MyWishListRow;
