"use client";

import { payViaCash } from "@/api/orders";
import Spinner from "@/components/Spinner";
import { ORDERS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMoneyBill1Wave } from "react-icons/fa6";

const PayViaCash = ({ orderId }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function initPayment() {
    setLoading(true);

    payViaCash(orderId)
      .then(() => {
        router.push(`${ORDERS_ROUTE}/confirmation/${orderId}?status=Completed`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <button
      onClick={initPayment}
      className="bg-green-600 text-white px-4 py-2 rounded-md shadow flex gap-2 items-center"
    >
      <span>Cash</span>
      {loading ? <Spinner className="h-5! w-5!" /> : <FaMoneyBill1Wave />}
    </button>
  );
};

export default PayViaCash;