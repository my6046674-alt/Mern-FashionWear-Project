"use client"

import { ORDERS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";

const OrderLayout = ({ children }) => {

  const router = useRouter();

  function handleStatusChange(status){
    router.push(`${ORDERS_ROUTE}?status=${status}`)

  }
  
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <label
          htmlFor="status"
          className="mb-2.5 text-sm font-medium text-heading mr-2"
        >
          Filter by status:
        </label>
        <select
          id="countries"
          className=" mb-10 w-max px-3 py-2.5  border border-gray-200 text-heading text-sm rounded-md focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          onChange={(e)=>handleStatusChange(e.target.value)}
        >
          <option selected>All</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">confirmed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        {children}
      </div>
    </section>
  );
};

export default OrderLayout;
