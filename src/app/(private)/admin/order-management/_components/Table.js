"use client";

import Image from "next/image";
import Spinner from "@/components/Spinner";
import useAuthStore from "@/stores/authStore";
import { FaCog } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { format } from "date-fns";
import { getProducts } from "@/api/products";
import {
  getAllOrders,
  getOrdersByMerchant,
  getOrdersByUser,
} from "@/api/orders";
import { useEffect, useState } from "react";
import OrderStatus from "@/components/orders/OrderStatus";
import { ROLE_ADMIN, ROLE_MERCHANT } from "@/constants/userRoles";
import EditOrder from "./EditOrder";

async function addProductImages(orderList) {
  const products = await getProducts({ limit: 100 });
  const imageUrlsByProduct = new Map(
    products.map((product) => [
      product._id,
      Array.isArray(product.imageUrls) ? product.imageUrls : [],
    ]),
  );

  return orderList.map((order) => ({
    ...order,
    orderItems: Array.isArray(order.orderItems)
      ? order.orderItems.map((item) => ({
          ...item,
          imageUrls:
            Array.isArray(item.imageUrls) && item.imageUrls.length > 0
              ? item.imageUrls
              : imageUrlsByProduct.get(item._id) ?? [],
        }))
      : [],
  }));
}

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((state) => state.user);
  const roles = Array.isArray(user?.roles)
    ? user.roles
    : user?.role
      ? [user.role]
      : [];
  const normalizedRoles = roles.map((role) =>
    String(role).replace(/^ROLE_/, "").toUpperCase(),
  );
  const isAdmin = normalizedRoles.includes(ROLE_ADMIN);
  const isMerchant = normalizedRoles.includes(ROLE_MERCHANT);

  useEffect(() => {
    let cancelled = false;

    async function fetchOrders() {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const response = isAdmin
          ? await getAllOrders()
          : isMerchant
            ? await getOrdersByMerchant()
            : await getOrdersByUser();
        const data = response.data;
        const orderList = Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
            ? data.orders
            : [];
        const ordersWithImages = await addProductImages(orderList);

        if (!cancelled) setOrders(ordersWithImages);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        if (!cancelled) setOrders([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, [user, isAdmin, isMerchant]);

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
          {orders.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                No orders.
              </td>
            </tr>
          ) : (
            orders.map((order, index) => {
              const orderItems = Array.isArray(order.orderItems)
                ? order.orderItems
                : [];
              const createdAt = order.createdDate
                ? new Date(order.createdDate)
                : null;

              return (
                <tr
                  key={order._id ?? order.orderNumber ?? index}
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
                    {orderItems.map((item, itemIndex) => (
                      <div key={item._id ?? itemIndex} className="flex items-center py-1">
                        {Array.isArray(item.imageUrls) && item.imageUrls[0] ? (
                          <Image
                            src={item.imageUrls[0]}
                            alt={item.name ?? "Product"}
                            height={64}
                            width={64}
                            className="w-12 h-12 mr-3 object-cover rounded"
                          />
                        ) : (
                          <FaImage className="w-12 h-12 mr-3 rounded text-gray-500" />
                        )}
                        <div>
                          <p className="font-medium">{item.name ?? "Product"}</p>
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
                    {order.user?.name ?? "Unknown"}
                  </h3>
                  <p className="text-xs">{order.user?.email ?? ""}</p>
                  <p className="text-xs">{order.user?.phone ?? ""}</p>
                </td>
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                  Rs. {order.totalPrice}
                </td>
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                  <OrderStatus status={order.status} />
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {createdAt && !Number.isNaN(createdAt.getTime())
                    ? format(createdAt, "dd MMM, yyyy")
                    : "N/A"}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <EditOrder orderId={order._id} />
                </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;