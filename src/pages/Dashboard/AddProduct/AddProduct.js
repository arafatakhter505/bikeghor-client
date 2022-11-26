import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../../../context/UserContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BtnSpinner from "./../../shared/BtnSpinner/BtnSpinner";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit } = useForm();
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => setCategories(res.data));
  }, []);

  const handleAddProduct = (data) => {
    setPageLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBBKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const product = {
            title: data.title,
            location: data.location,
            reselPrice: data.reselPrice,
            originalPrice: data.originalPrice,
            useYears: data.useYears,
            condition: data.condition,
            mobileNumber: data.mobileNumber,
            category: data.category,
            drivenKm: data.drivenKm,
            milage: data.milage,
            brandName: data.brandName,
            bikeCC: data.bikeCC,
            image: imgData.data.url,
            sellerName: user?.displayName,
            sellerEmail: user?.email,
            date: new Date().toISOString().split("T")[0],
            sold: false,
            booked: false,
          };

          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem(
                "bikeghor-accessToken"
              )}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then(() => {
              toast.success(`${data.title} is added successfully`);
              setPageLoading(false);
              navigate("/dashboard/myproducts");
            });
        }
      });
  };

  return (
    <div className="md:p-12 p-6">
      <h2 className="text-3xl font-semibold">
        Add A <span className="text-primary">Product</span>
      </h2>
      <div>
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Product Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              {...register("location", { required: true })}
              placeholder="Location"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="number"
              {...register("reselPrice", { required: true })}
              placeholder="Resell Price"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              {...register("originalPrice", { required: true })}
              placeholder="Original Price"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              {...register("useYears", { required: true })}
              placeholder="Years of use"
              className="input input-bordered w-full"
            />
            <select
              {...register("condition", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled selected>
                Condition
              </option>
              <option value={"Excellent"}>Excellent</option>
              <option value={"Good"}>Good</option>
              <option value={"Fair"}>Fair</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              {...register("mobileNumber", { required: true })}
              placeholder="Mobile number"
              className="input input-bordered w-full"
            />
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled selected>
                Category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.link}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              {...register("drivenKm", { required: true })}
              placeholder="Driven km"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              {...register("milage", { required: true })}
              placeholder="Milage"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <input
              type="text"
              {...register("brandName", { required: true })}
              placeholder="Brand name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              {...register("bikeCC", { required: true })}
              placeholder="Bike cc"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-6">
            <label>Upload Image</label>
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary text-white normal-case"
          >
            {pageLoading ? <BtnSpinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
