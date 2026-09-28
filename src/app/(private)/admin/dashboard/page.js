"use client";

import { getAllOrders } from "@/api/orders";
import { getProducts } from "@/api/products";
import { getAllUsers } from "@/api/users";
import Spinner from "@/components/Spinner";
import { ORDER_CONFIRMED, ORDER_PENDING } from "@/constants/orderStatus";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaShoppingCart, FaUsers } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const Card = ({ value, label, color, background, border, Icon }) => {
  return (
    <div
      className={`h-40 w-full bg-white dark:bg-gray-950 dark:text-white shadow-md rounded-xl border-r-4 ${border} px-8 py-5 flex items-center gap-5`}
    >
      <div className={`${background} p-5 w-max rounded-full`}>
        <Icon className={`text-3xl ${color}`} />
      </div>
      <div>
        <h2 className="font-semibold text-5xl">{value}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-700">{label}</p>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  async function fetchDashboardData() {
    try {
      await getAllOrders().then((response) => setOrders(response.data));
      await getAllUsers().then((response) => setUsers(response.data));
      await getProducts().then((data) => setProducts(data));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => fetchDashboardData, []);

  if (loading)
    return (
      <div className="py-24 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <Card
        Icon={FaShoppingCart}
        value={products.length}
        label="Total Products"
        color="text-green-500"
        border="border-green-600"
        background="bg-green-100"
      />
      <Card
        Icon={FaClock}
        value={orders.filter((order) => order.status == ORDER_PENDING).length}
        label="Pending Orders"
        color="text-yellow-500"
        border="border-yellow-600"
        background="bg-yellow-100"
      />
      <Card
        Icon={FaCheckCircle}
        value={orders.filter((order) => order.status == ORDER_CONFIRMED).length}
        label="Confirmed Orders"
        color="text-blue-500"
        border="border-blue-600"
        background="bg-blue-100"
      />
      <Card
        Icon={FaUsers}
        value={users.length}
        label="Total Users"
        color="text-red-500"
        border="border-red-600"
        background="bg-red-100"
      />
    </div>
  );
};

export default DashboardPage;