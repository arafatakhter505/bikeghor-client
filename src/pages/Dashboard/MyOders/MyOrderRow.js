import React from "react";

const MyOrderRow = ({ order, index }) => {
  const { image, productName, price } = order;
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
          <div className="font-bold">{productName}</div>
        </div>
      </td>
      <td>{price}</td>
      <th>
        <button className="btn btn-primary text-white normal-case btn-sm">
          Pay
        </button>
      </th>
    </tr>
  );
};

export default MyOrderRow;
