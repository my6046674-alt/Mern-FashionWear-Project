"use client";

import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import useAuthStore from "@/stores/authStore";
import { FaCog } from "react-icons/fa";
import { FaImage, FaPencil, FaTrash } from "react-icons/fa6";
import { ORDER_MANAGEMENT_ROUTE } from "@/constants/routes";
import { format } from "date-fns";
import { getAllOrders, getOrdersByMerchant } from "@/api/orders";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OrderStatus from "@/components/orders/OrderStatus";
import { ROLE_ADMIN } from "@/constants/userRoles";
import EditOrder from "./EditOrder";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthStore.getState();

  async function fetchOrders() {
    try {
      const response = user.roles.includes(ROLE_ADMIN)
        ? await getAllOrders()
        : await getOrdersByMerchant();

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              S.N
            </th>
            <th scope="col" className="px-4 py-3">
              Order Number
            </th>
            <th scope="col" className="px-4 py-3">
              Product
            </th>
            <th scope="col" className="px-4 py-3">
              Customer
            </th>
            <th scope="col" className="px-4 py-3">
              Total Price
            </th>
            <th scope="col" className="px-4 py-3">
              Status
            </th>
            <th scope="col" className="px-4 py-3">
              Created At
            </th>
            <th scope="col" className="px-4 py-3">
              <FaCog />
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.length == 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No orders.
              </td>
            </tr>
          ) : (
            orders?.map((order, index) => (
              <tr
                key={order._id}
                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td className="px-4 py-2">
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                    {order.orderNumber}
                  </span>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div>
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center py-1">
                        {item.imageUrls.length > 0 ? (
                          <Image
                            src={item.imageUrls[0]}
                            alt={item.name}
                            height={64}
                            width={64}
                            className="w-12 h-12 mr-3 object-cover rounded"
                          />
                        ) : (
                          <FaImage className="w-12 h-12 mr-3 rounded text-gray-500" />
                        )}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <span className="text-xs text-gray-500">
                            {item.category},
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.brand}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </th>
                <td className="px-4 py-2">
                  <h3 className="text-gray-800 dark:text-gray-100">
                    {order.user.name}
                  </h3>
                  <p className="text-xs">{order.user.email}</p>
                  <p className="text-xs">{order.user.phone}</p>
                </td>
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                  Rs. {order.totalPrice}
                </td>
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                  <OrderStatus status={order.status} />
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {format(order.createdDate, "dd MMM, yyyy")}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <EditOrder orderId={order._id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;