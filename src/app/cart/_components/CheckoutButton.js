"use client";

import { createOrder } from "@/api/orders";
import Spinner from "@/components/Spinner";
import { ORDERS_ROUTE } from "@/constants/routes";
import useCartStore from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";


const CheckoutButton = ({ products, totalPrice }) => {
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCartStore.getState();
  const router = useRouter();

  async function checkoutOrder() {
    if (loading) return;
    if (!products?.length) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        totalPrice,
        orderItems: products.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      toast.success("Order created successfully.");
      router.push(ORDERS_ROUTE);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to checkout. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={checkoutOrder}
      disabled={loading}
      className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20"
    >
      Proceed to Checkout
      {loading && <Spinner className="h-6! w-6! ml-2" />}
    </button>
  );
};

export default CheckoutButton;

