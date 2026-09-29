"use client";

import { payViaKhalti } from "@/api/orders";

import khaltiLogo from "@/assets/images/khalti.png";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { useState } from "react";

const PayViaKhalti = ({ orderId }) => {
  const [loading, setLoading] = useState(false);

  function initKhaltiPayment() {
    setLoading(true);

    payViaKhalti(orderId)
      .then((res) => {
        window.location.href = res.data.payment_url;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <button
      onClick={initKhaltiPayment}
      className="bg-white text-white px-4 py-2 rounded-md shadow flex gap-2 items-center"
    >
      <Image
        src={khaltiLogo}
        alt="khalti"
        height={40}
        width={100}
        className="h-5 w-auto"
      />
      {loading && <Spinner className="h-5! w-5!" />}
    </button>
  );
};

export default PayViaKhalti;