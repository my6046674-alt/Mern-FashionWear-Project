"use client";

import { payViaKhalti } from "@/api/orders";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ORDER_ROUTE } from "@/constants/routes";
import { FaMoneyBill1Wave } from "react-icons/fa6";

const PayViaCash = ({ orderId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function initPayment() {
    setLoading(true);

    PayViaCash(orderId)
      .then((res) => { 
        toast.success("Order confirmed")
        router.push(`${ORDER_ROUTE}/confirmation/${orderId}?status=completed`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(true));
  }

  return (
    <button
      onClick={initPayment}
     className="bg-green-600 text-white px-4 py-2 rounded-md shadow flex gap-2 items-center"

    >
    <span>Cash</span>
      {/* <Spinner className="h-6! w-6!"/> */}
       {loading ? <Spinner className="h-5! w-5!" /> : <FaMoneyBill1Wave />}

    </button>
  );
};

export default PayViaCash;
