import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import { AlertCircle } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = cart.reduce(
    (sum, item) =>
      sum +
      (item.discountPercentage
        ? (item.price * item.quantity * item.discountPercentage) / 100
        : 0),
    0
  );
  const finalTotal = totalPrice - totalDiscount;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (finalTotal > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: finalTotal })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error("Error fetching client secret:", err));
    }
  }, [axiosSecure, finalTotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    if (cardError) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage("Card element not found.");
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    try {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        setMessage(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const paymentData = {
          userEmail: user.email,
          sellerEmail: cart.sellerEmail,
          price: finalTotal,
          quantity: totalQuantity,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          medicineItemNames: cart.map((item) => item.productName),
          itemQuantities: cart.map((item) => item.quantity),
          itemPrices: cart.map((item) => item.price),
          totalDiscount: totalDiscount,
          totalPrice: totalPrice,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", paymentData);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful!",
            showConfirmButton: false,
            timer: 1500,
          });

          refetch();
          navigate(`/invoice`);
        }
      }
    } catch (error) {
      setMessage("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-base-100 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <label className="block mb-2 font-medium">Enter your card details:</label>
      <div 
        className={`border p-3 rounded mb-4 focus-within:ring-4 transition-all ${
          cardError || message 
            ? "border-red-500 focus-within:ring-red-500/50" 
            : "border-gray-300 focus-within:ring-primary/50"
        }`}
      >
        <CardElement onChange={(e) => setCardError(e.error ? e.error.message : "")} />
      </div>
      {cardError && (
        <p className="text-red-500 text-sm mb-3 flex items-center gap-1 font-medium">
          <AlertCircle className="w-4 h-4" /> {cardError}
        </p>
      )}
      {message && (
        <p className="text-red-500 text-sm mb-3 flex items-center gap-1 font-medium">
          <AlertCircle className="w-4 h-4" /> {message}
        </p>
      )}
      <button
        type="submit"
        className="btn btn-primary text-white w-full min-h-[44px] focus:ring-4 focus:ring-primary/50"
        disabled={!stripe || loading || !!cardError}
      >
        {loading ? "Processing..." : `Pay $${finalTotal.toFixed(2)}`}
      </button>
    </form>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;
