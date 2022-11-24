import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="max-w-sm mx-auto my-20">
      <div className="card-body shadow-lg rounded-lg border">
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
        <div className="form-control mt-6">
          <button className="btn btn-primary normal-case text-white">
            Login
          </button>
        </div>
        <div className="divider">OR</div>
        <div className="btn btn-secondary-outline text-secondary hover:text-white normal-case">
          Continue With Google
        </div>
        <p>
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-primary">
            Sing Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
