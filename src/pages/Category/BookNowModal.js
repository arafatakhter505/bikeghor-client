import React, { useContext } from "react";
import { AuthContext } from "./../../context/UserContext";

const BookNowModal = ({ selectedProduct }) => {
  const { title, reselPrice } = selectedProduct;
  const { user } = useContext(AuthContext);
  return (
    <div>
      <input
        type="checkbox"
        id="bikeghor-book-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="bikeghor-book-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{title}</h3>
          <form className="py-4">
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
                readOnly
                disabled
              />
            </div>
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                defaultValue={user?.email}
                className="input input-bordered w-full"
                readOnly
                disabled
              />
            </div>
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product name"
                defaultValue={title}
                className="input input-bordered w-full"
                readOnly
                disabled
              />
            </div>
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                type="text"
                placeholder="Product price"
                defaultValue={reselPrice}
                className="input input-bordered w-full"
                readOnly
                disabled
              />
            </div>
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Meeting Location</span>
              </label>
              <input
                type="text"
                placeholder="Meeting Location"
                className="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary text-white normal-case w-full mt-6"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookNowModal;
