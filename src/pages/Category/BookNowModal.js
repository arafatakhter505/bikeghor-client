import React, { useContext, useState } from "react";
import Spinner from "../shared/Spinner/Spinner";
import { AuthContext } from "./../../context/UserContext";
import { toast } from "react-hot-toast";

const BookNowModal = ({ selectedProduct, setSelectedProduct, refetch }) => {
  const { _id, title, reselPrice, image } = selectedProduct;
  const { user } = useContext(AuthContext);
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBooking = (event) => {
    setBookingLoading(true);
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const productName = form.productName.value;
    const price = form.productPrice.value;
    const phoneNumber = form.phoneNumber.value;
    const meetLocation = form.meetLocation.value;

    fetch(`http://localhost:5000/products/booked/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("bikeghor-accessToken")}`,
      },
      body: JSON.stringify({ booked: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem(
                "bikeghor-accessToken"
              )}`,
            },
            body: JSON.stringify({
              name,
              email,
              productName,
              price,
              phoneNumber,
              meetLocation,
              image,
              productId: _id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success(`${title} is booked`);
                refetch();
                setSelectedProduct(null);
                setBookingLoading(false);
              }
            });
        }
      });
  };

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
          <form onSubmit={handleBooking} className="py-4">
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={user?.displayName}
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
                name="email"
                value={user?.email}
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
                name="productName"
                value={title}
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
                name="productPrice"
                value={reselPrice}
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
                name="phoneNumber"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full mb-3">
              <label className="label">
                <span className="label-text">Meeting Location</span>
              </label>
              <input
                type="text"
                placeholder="Meeting Location"
                name="meetLocation"
                className="input input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary text-white normal-case w-full mt-6"
            >
              {bookingLoading ? <Spinner /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookNowModal;
