"use client";

import Link from "next/link";
import ProductsTable from "./_components/Table";
import { PRODUCT_MANAGEMENT_ROUTE } from "@/constants/routes";
import { FaPlus } from "react-icons/fa6";
import Pagination from "./_components/Pagination";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/authStore";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/api/products";

const PAGE_LIMIT = 10;

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((state) => state.user);

  const searchParams = useSearchParams();

  const sort = searchParams.get("sort");
  const currentPage = searchParams.get("page") ?? 1;

  useEffect(() => {
    if (!user?._id) return;

    const filter = {
      createdBy: user._id,
      limit: PAGE_LIMIT,
      offset: PAGE_LIMIT * (currentPage - 1),
      sort: sort ?? JSON.stringify({ createdAt: -1 }),
    };

    getProducts(filter)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [user?._id, sort, currentPage]);

  return (
    <section className="py-3">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Product Management
      </h2>
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-900 sm:rounded-lg">
        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
          <div className="flex items-center flex-1 space-x-4">
            <h5>
              <span className="text-gray-500">All Products:</span>
              <span className="dark:text-white">123456</span>
            </h5>
          </div>
          <div className="flex flex-col shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
            <Link
              href={`${PRODUCT_MANAGEMENT_ROUTE}/add`}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 focus:outline-none "
            >
              <FaPlus className="mr-2" />
              Add New Product
            </Link>
          </div>
        </div>
        <ProductsTable loading={loading} products={products} />
        <Pagination currentPage={currentPage} limit={PAGE_LIMIT} />
      </div>
    </section>
  );
};

export default ProductManagementPage;