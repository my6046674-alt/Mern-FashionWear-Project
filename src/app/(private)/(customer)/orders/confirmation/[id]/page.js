
"use client";

import { confirmOrder } from "@/api/orders";
import Spinner from "@/components/Spinner";
import { ORDERS_ROUTE } from "@/constants/routes";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const OrderConfirmationPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const status = searchParams.get("status");

  useEffect(() => {
    if (status == "Completed") {
      toast.success("Payment success");
      // payment success, redirect to orders page
      // confirm payment

      confirmOrder(params.id, "success")
        .then(() => {
          router.replace(ORDERS_ROUTE);
        })
        .catch((error) => console.log(error));
    } else {
      toast.error("Payment failed", {
        onClose: () => {
          router.replace(ORDERS_ROUTE);
        },
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center py-24">
      <Spinner />
    </div>
  );
};

export default OrderConfirmationPage;