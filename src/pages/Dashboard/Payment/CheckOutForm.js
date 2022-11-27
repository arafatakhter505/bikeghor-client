import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from "./../../../context/UserContext";
import { toast } from "react-hot-toast";

const CheckOutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { _id, title, reselPrice } = product;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://bikeghor-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("bikeghor-accessToken")}`,
      },
      body: JSON.stringify({ price: reselPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [reselPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      paymentLoading(false);
    } else {
      setCardError("");
    }
    setPaymentLoading(true);
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price: reselPrice,
        productId: _id,
        productName: title,
        buyerEmail: user.email,
        transactionId: paymentIntent.id,
      };
      fetch("https://bikeghor-server.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem(
            "bikeghor-accessToken"
          )}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result.insertedId) {
            toast.success("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setPaymentLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || paymentLoading}
          className="btn btn-primary text-white normal-case mt-6"
        >
          Pay
        </button>
      </form>
      <p className="text-primary">{cardError}</p>
      {transactionId && (
        <p className="text-xl pt-4">
          Your payment transaction id: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckOutForm;
