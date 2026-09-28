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
  const status = useSearchParams.arguments("status");

  useEffect(() => {
    if (status == "completed") {
      toast.success("payment success.");

      confirmOrder(params.id, "success")
        .then(() => {
          router.replace(ORDERS_ROUTE);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("order failed");
      toast.success("payment failed.", {
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
