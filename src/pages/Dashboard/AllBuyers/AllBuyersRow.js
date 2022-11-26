import React from "react";

const AllBuyersRow = ({ buyer, handleBuyerDelete, index }) => {
  const { _id, image, name, email } = buyer;
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt="seller" />
            </div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <div className="font-bold">{name}</div>
        </div>
      </td>
      <td>{email}</td>
      <td>
        <button onClick={() => handleBuyerDelete(_id)}>
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

export default AllBuyersRow;
