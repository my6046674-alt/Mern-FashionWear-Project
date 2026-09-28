"use client";

import { cancelOrder, getOrdersByUser, payViaKhalti } from "@/api/orders";
import { useEffect, useState } from "react";
import OrderTable from "./_component/OrderTable";
import { format, isValid } from "date-fns";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { ORDER_PENDING } from "@/constants/orderStatus";
import PayViaKhalti from "./_component/PayViaKhalti";
import PayViaCash from "./_component/PayViaCash";
import OrderStatus from "./_component/OrderStatus";
import { useSearchParams } from "next/navigation";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();



  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await getOrdersByUser();
        const data = response?.data;
        const orderList =
          [
            data?.orders,
            data?.data?.orders,
            data?.data,
            data?.result?.orders,
            data?.result,
            data,
          ].find(Array.isArray) || [];

        setOrders(orderList);
      } catch (err) {
        console.error("Orders error:", err);
        setError(err?.response?.data?.message || "Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await cancelOrder(orderId);

      setOrders((oldOrders) =>
        oldOrders.map((order) =>
          order._id === orderId ? { ...order, status: "CANCELLED" } : order,
        ),
      );

      toast.info("Order cancelled");
    } catch (err) {
      console.error("Cancel order error:", err);
      toast.error("Unable to cancel order");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <Spinner />
      </div>
    );
  }



  return (
    <div>
      {orders.map((order, index) => {
        const date = new Date(order.createdDate || order.createdAt);

        return (
          <div className="mb-12" key={order._id || index}>
            <div className="grid grid-cols-1 items-center gap-5 rounded-xl bg-gray-100 px-6 py-4 text-sm lg:grid-cols-[auto_auto_auto_1fr]">
              <div >
                <h3 className="text-gray-500">Status</h3>
                <OrderStatus status={order.status}/>

              </div>
              <div>
                <h3 className="text-gray-500">Date Placed</h3>
                <p>{isValid(date) ? format(date, "dd MMM, yyyy") : "N/A"}</p>
              </div>

              <div>
                <h3 className="text-gray-500">Order Number</h3>
                <p>{order.orderNumber || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-gray-500">Total amount</h3>
                <p>Rs.{order.totalPrice || 0}</p>
              </div>
              {order.status == ORDER_PENDING && (
                <div className="flex items-center ga-5">
                  <button
                    className="rounded-md bg-red-600 px-4 py-2 text-white"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel
                  </button>
                  <PayViaKhalti orderId={order._id}  />
                  <PayViaCash orderId={order._id} />
                </div>
              )}
            </div>

            <OrderTable order={order} />
          </div>
        );
      })}
    </div>
  );
};

export default OrderPage;
