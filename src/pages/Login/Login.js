import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/UserContext";
import { toast } from "react-hot-toast";
import BtnSpinner from "./../shared/BtnSpinner/BtnSpinner";
import useToken from "./../../hooks/useToken";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [token] = useToken(loginEmail);

  const handleLogin = (data) => {
    setSignUpLoading(true);
    login(data.email, data.password)
      .then(() => {
        toast.success("Successfully Login");
        setLoginEmail(data.email);
        setSignUpLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
        setSignUpLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((data) => {
        fetch("https://bikeghor-server.vercel.app/users", {
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
            setLoginEmail(data.user.email);
            setSignUpLoading(false);
          });
      })
      .catch((e) => toast.error(e.message));
  };

  if (token) {
    navigate(from, { replace: true });
  }

  return (
    <div className="max-w-sm mx-auto my-20">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="card-body shadow-lg rounded-lg border"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
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
            {...register("password", { required: true })}
          />
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary normal-case text-white"
          >
            {signUpLoading ? <BtnSpinner /> : "Login"}
          </button>
        </div>
        <div className="divider">OR</div>
        <div
          onClick={handleGoogleLogin}
          className="btn btn-secondary-outline text-secondary hover:text-white normal-case"
        >
          Continue With Google
        </div>
        <p>
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-primary">
            Sing Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
