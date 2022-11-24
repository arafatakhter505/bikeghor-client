import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="max-w-sm mx-auto my-20">
      <div className="card-body shadow-lg rounded-lg border">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Profile Pic</span>
          </label>
          <input type="file" accept="image/*" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Account Type</span>
          </label>
          <div className="flex">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="role"
                className="radio checked:bg-primary"
                checked
              />
              <span className="label-text mx-3">Buyer</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="role"
                className="radio checked:bg-primary"
              />
              <span className="label-text ml-3">Seller</span>
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary normal-case text-white">
            Sign Up
          </button>
        </div>
        <div className="divider">OR</div>
        <div className="btn btn-secondary-outline text-secondary hover:text-white normal-case">
          Continue With Google
        </div>
        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
