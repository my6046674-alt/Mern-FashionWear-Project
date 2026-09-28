"use client";
import { getOrdersById, updateOrderStatus } from "@/api/orders";
import OrderTable from "@/app/(private)/(customer)/orders/_component/OrderTable";
import OrderStatus from "@/components/orders/OrderStatus";
import {
  ORDER_CANCELLED,
  ORDER_CONFIRMED,
  ORDER_DELIVERED,
  ORDER_PENDING,
  ORDER_SHIPPED,
} from "@/constants/orderStatus";
import { HOME_ROUTE, PRODUCTS_ROUTE } from "@/constants/routes";
import { ROLE_ADMIN } from "@/constants/userRoles";
import useAuthStore from "@/stores/authStore";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateOrderPage = () => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);

  const params = useParams();

  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  function updateStatus(event) {
    event.preventDefault();

    updateOrderStatus(order._id, status)
      .then(() => toast.success("Status updated"))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (!user.roles.includes(ROLE_ADMIN)) return router.replace(HOME_ROUTE);

    const orderId = params.id;

    getOrdersById(orderId)
      .then((res) => {
        setOrder(res.data);
        setStatus(res.data.status);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!order) return;

  return (
    <div className="mb-12 dark:text-white">
      <h2 className="text-2xl font-semibold">
        Order Number: {order.orderNumber}
      </h2>

      <p>Order Date: {format(order.createdDate, "dd MMM, yyyy")}</p>
      <p className="text-lg my-2 font-semibold">
        Total amount: {order.totalPrice}
      </p>
      <p>
        Status: <OrderStatus status={status} />
      </p>
      <OrderTable order={order} />

      <form className="flex items-center gap-4" onSubmit={updateStatus}>
        <select
          defaultValue={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-gray-50 border w-64 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option value={ORDER_PENDING}>Pending</option>
          <option value={ORDER_CONFIRMED}>Confirmed</option>
          <option value={ORDER_SHIPPED}>Shipped</option>
          <option value={ORDER_DELIVERED}>Delivered</option>
          <option value={ORDER_CANCELLED}>Cancelled</option>
        </select>
        <button className="inline-flex gap-2 items-center px-10 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary hover:bg-primary/90">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateOrderPage;