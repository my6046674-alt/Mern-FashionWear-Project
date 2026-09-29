"use client";

import { confirmOrder, payViaStripe } from "@/api/orders";
import config from "@/config";
import { ORDERS_ROUTE } from "@/constants/routes";
import {
  CardElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaDollarSign } from "react-icons/fa6";
import { toast } from "react-toastify";
import stripeLogo from "@/assets/images/stripe.png";
import Spinner from "@/components/Spinner";

const CheckoutForm = ({ orderId }) => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  async function initStripePayment() {
    setLoading(true);

    try {
      const response = await payViaStripe(orderId);

      const clientSecret = response.data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result && result.paymentIntent?.status == "succeeded") {
        toast.success("Payment success");
        // payment success, redirect to orders page
        // confirm payment

        await confirmOrder(orderId, "success").then(() => {
          router.replace(ORDERS_ROUTE);
        });
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 max-w-xl mx-auto">
      <Image
        src={stripeLogo}
        alt="stripe"
        height={80}
        width={200}
        className="h-10 w-auto"
      />
      <div className="border border-gray-300 mt-5 px-4 py-3 rounded-lg w-full">
        <CardElement />
      </div>
      <button
        onClick={initStripePayment}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow flex gap-2 items-center"
      >
        <span>Submit</span>
        {loading ? <Spinner className="h-5! w-5!" /> : <FaDollarSign />}
      </button>
    </div>
  );
};

const StripePaymentPage = () => {
  const params = useParams();
  const stripePromise = config.stripeKey ? loadStripe(config.stripeKey) : null;

  if (!config.stripeKey) {
    return (
      <div className="py-16 text-center text-gray-700 dark:text-gray-200">
        Stripe payment is not configured for this project yet.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderId={params.id} />
    </Elements>
  );
};

export default StripePaymentPage;