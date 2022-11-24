import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSignUp = (data) => {
    console.log(data);
  };
  return (
    <div className="max-w-sm mx-auto my-20">
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="card-body shadow-lg rounded-lg border"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name must be required" })}
            placeholder="Name"
            className="input input-bordered"
          />
          <label>
            <span className="label-text text-primary">
              {errors.name?.message}
            </span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email must be required",
            })}
            placeholder="email"
            className="input input-bordered"
          />
          <label>
            <span className="label-text text-primary">
              {errors.email?.message}
            </span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: "password must be required",
              minLength: {
                value: 6,
                message: "Password must be 6 characters long",
              },
            })}
            placeholder="password"
            className="input input-bordered"
          />
          <label>
            <span className="label-text text-primary">
              {errors.password?.message}
            </span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Profile Pic</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Profile pic must be required" })}
            accept="image/*"
          />
          <label>
            <span className="label-text text-primary">
              {errors.image?.message}
            </span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Account Type</span>
          </label>
          <div className="flex">
            <label className="label cursor-pointer">
              <input
                type="radio"
                value={"Buyer"}
                {...register("role", { required: true })}
                name="role"
                className="radio checked:bg-primary"
                checked
              />
              <span className="label-text mx-3">Buyer</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                value={"Seller"}
                {...register("role", { required: true })}
                name="role"
                className="radio checked:bg-primary"
              />
              <span className="label-text ml-3">Seller</span>
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary normal-case text-white"
          >
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
      </form>
    </div>
  );
};

export default SignUp;
