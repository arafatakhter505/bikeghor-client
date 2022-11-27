import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AuthContext } from "./../../../context/UserContext";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "./../../shared/Spinner/Spinner";

const stripePromise = loadStripe(process.env.REACT_APP_stripePK);

const Payment = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://bikeghor-server.vercel.app/products/${id}?email=${user?.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem(
                "bikeghor-accessToken"
              )}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="md:p-12 p-6">
      <h2 className="text-3xl font-semibold">
        Payment for <span className="text-primary">{product.title}</span>
      </h2>
      <p className="text-xl my-4">Price: {product.reselPrice}Tk</p>
      <div className="md:w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckOutForm product={product} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
