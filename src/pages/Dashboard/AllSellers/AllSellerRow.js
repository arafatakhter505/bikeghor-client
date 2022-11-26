import React from "react";

const AllSellerRow = ({
  index,
  seller,
  handleSellerDelete,
  handleVarified,
}) => {
  const { _id, image, name, email, varified } = seller;
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
      <th>
        {varified ? (
          "Varified"
        ) : (
          <button
            onClick={() => handleVarified(_id)}
            className="btn btn-primary text-white normal-case btn-sm"
          >
            Varify
          </button>
        )}
      </th>
      <td>
        <button onClick={() => handleSellerDelete(_id)}>
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

export default AllSellerRow;
