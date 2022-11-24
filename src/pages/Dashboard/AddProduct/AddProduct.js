import React, { useContext } from "react";
import { AuthContext } from "./../../../context/UserContext";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="md:p-12 p-6">
      <h2 className="text-3xl font-semibold">
        Add A <span className="text-primary">Product</span>
      </h2>
      <div>
        <form>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Location"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="number"
              placeholder="Resell Price"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              placeholder="Original Price"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              placeholder="Years of use"
              className="input input-bordered w-full"
            />
            <select className="select select-bordered w-full">
              <option disabled selected>
                Condition
              </option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              placeholder="Seller name"
              value={user?.displayName}
              className="input input-bordered w-full"
              disabled
            />
            <input
              type="text"
              placeholder="Mobile number"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              placeholder="Driven km"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Milage"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              placeholder="Brand name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Bike cc"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input type="file" accept="image/*" />
            <button
              type="submit"
              className="btn btn-primary text-white normal-case"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
