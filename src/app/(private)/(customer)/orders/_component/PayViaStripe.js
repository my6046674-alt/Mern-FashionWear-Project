"use client";

import stripeLogo from "@/assets/images/stripe.png";
import { ORDERS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const PayViaStripe = ({ orderId }) => {
  return (
    <Link
      href={`${ORDERS_ROUTE}/${orderId}/payment/stripe`}
      className="bg-white text-white px-4 py-2 rounded-md shadow flex gap-2 items-center"
    >
      <Image
        src={stripeLogo}
        alt="khalti"
        height={40}
        width={100}
        className="h-5 w-auto"
      />
    </Link>
  );
};

export default PayViaStripe;