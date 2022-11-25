import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "./../../context/UserContext";
import { toast } from "react-hot-toast";
import BtnSpinner from "./../shared/BtnSpinner/BtnSpinner";
import useToken from "./../../hooks/useToken";

const SignUp = () => {
  const { createUser, updateUser, googleLogin } = useContext(AuthContext);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [token] = useToken(userEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleGoogle = () => {
    googleLogin()
      .then((data) => {
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: data.user.displayName,
            email: data.user.email,
            image: data.user.photoURL,
            role: "Buyer",
            varified: false,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Successfully Sign Up");
            setUserEmail(data.user.email);
            setSignUpLoading(false);
          });
      })
      .catch((e) => toast.error(e.message));
  };

  const handleSignUp = (data) => {
    setSignUpLoading(true);
    createUser(data.email, data.password)
      .then(() => {
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
              updateUser(data.name, imgData.data.url)
                .then(() => {
                  fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify({
                      name: data.name,
                      email: data.email,
                      image: imgData.data.url,
                      role: data.role,
                      varified: false,
                    }),
                  })
                    .then((res) => res.json())
                    .then(() => {
                      toast.success("Successfully Sign Up");
                      setUserEmail(data.email);
                      setSignUpLoading(false);
                      reset();
                    });
                })
                .catch((e) => {
                  setSignUpLoading(false);
                  toast.error(e.message);
                });
            }
          });
      })
      .catch((e) => {
        setSignUpLoading(false);
        toast.error(e.message);
      });
  };

  if (token) {
    navigate("/");
  }

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
          <select
            className="select select-bordered w-full"
            defaultValue={"Buyer"}
            {...register("role")}
          >
            <option value={"Buyer"}>Buyer</option>
            <option value={"Seller"}>Seller</option>
          </select>
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary normal-case text-white"
          >
            {signUpLoading ? <BtnSpinner /> : "Sign Up"}
          </button>
        </div>
        <div className="divider">OR</div>
        <div
          onClick={handleGoogle}
          className="btn btn-secondary-outline text-secondary hover:text-white normal-case"
        >
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
