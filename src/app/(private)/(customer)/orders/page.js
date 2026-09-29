"use client";

import { cancelOrder, getOrdersByUser, payViaKhalti } from "@/api/orders";
import { useEffect, useState } from "react";
import OrderTable from "./_component/OrderTable";
import { format } from "date-fns";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { ORDER_PENDING } from "@/constants/orderStatus";
import PayViaKhalti from "./_component/PayViaKhalti";
import PayViaCash from "./_component/PayViaCash";
import { useRouter, useSearchParams } from "next/navigation";
import { ORDERS_ROUTE } from "@/constants/routes";
import PayViaStripe from "./_component/PayViaStripe";
import OrderStatus from "@/components/orders/OrderStatus";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const orderStatus = searchParams.get("status");

  const router = useRouter();

  function handleStatusChange(status) {
    router.push(`${ORDERS_ROUTE}?status=${status}`);
  }

  useEffect(() => {
    getOrdersByUser(orderStatus ?? "")
      .then((res) => {
        const data = Array.isArray(res?.data)
          ? res.data
          : res?.data?.orders || res?.data?.data || [];

        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, [orderStatus]);

  function handleCancelOrder(orderId) {
    if (confirm("Are you sure?")) {
      cancelOrder(orderId)
        .then(() => {
          toast.info("Order cancelled!");
        })
        .catch((error) => console.log(error));
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="dark:text-white">
      <label
        htmlFor="status"
        className=" mb-2.5 text-sm font-medium text-heading mr-2"
      >
        Filter by status:
      </label>
      <select
        id="countries"
        className="mb-10 w-max px-3 py-2.5 border border-gray-200 text-heading text-sm rounded-md focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
        onChange={(e) => handleStatusChange(e.target.value)}
        value={orderStatus || ""}
      >
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="SHIPPED">Shipped</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      {orders.length == 0 ? (
        <div>No orders.</div>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_auto_auto_auto_1fr] bg-gray-100 dark:bg-gray-700 px-6 py-4 rounded-xl gap-5 text-sm lg:justify-items-end items-center">
              <div>
                <h3 className="text-gray-500">Status</h3>
                <OrderStatus status={order.status} />
              </div>
              <div>
                <h3 className="text-gray-500">Date Placed</h3>
                <p>{order.createdDate ? format(new Date(order.createdDate), "dd MMM, yyyy") : "N/A"}</p>
                {/* <p className="">{format(order.createdDate, "dd MMM, yyyy")}</p> */}
              </div>
              <div>
                <h3 className="text-gray-500">Order Number</h3>
                <p className="">{order.orderNumber}</p>
              </div>
              <div>
                <h3 className="text-gray-500">Total amount</h3>
                <p className="">Rs. {order.totalPrice}</p>
              </div>
              {order.status == ORDER_PENDING && (
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 md:gap-3 md:justify-items-end">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md shadow md:w-max"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel
                  </button>
                  <div className="grid grid-cols-3 items-center gap-2 md:gap-3">
                    <PayViaKhalti orderId={order._id} />
                    <PayViaStripe orderId={order._id} />
                    <PayViaCash orderId={order._id} />
                  </div>
                </div>
              )}
            </div>
            <OrderTable key={index} order={order} />
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;