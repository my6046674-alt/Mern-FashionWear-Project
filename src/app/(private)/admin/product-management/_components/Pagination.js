"use client";

import { getTotalCount } from "@/api/products";
import { PRODUCT_MANAGEMENT_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Pagination = ({ currentPage = 1, limit = 10 }) => {
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / limit);

  const pageNumbers = [];

  for (let i = 1; i < totalPages + 1; i++) {
    pageNumbers.push(i.toString());
  }

  useEffect(() => {
    getTotalCount().then((data) => setTotalCount(data));
  });

  return (
    <nav
      className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
      aria-label="Table navigation"
    >
      <span className="flex items-center gap-1 text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">
          {limit * (currentPage - 1) + 1}-
          {Math.min(totalCount, limit * currentPage)}
        </span>
        of
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalCount}
        </span>
      </span>
      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <Link
            href={`${PRODUCT_MANAGEMENT_ROUTE}?page=${Math.max(parseInt(currentPage) - 1, 1)}`}
            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <LuChevronLeft />
          </Link>
        </li>
        {pageNumbers.map((page) => (
          <li key={page}>
            <Link
              href={`${PRODUCT_MANAGEMENT_ROUTE}?page=${page}`}
              className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className={page == currentPage ? "text-primary" : ""}>
                {page}
              </span>
            </Link>
          </li>
        ))}

        <li>
          <Link
            href={`${PRODUCT_MANAGEMENT_ROUTE}?page=${Math.min(parseInt(currentPage) + 1, totalPages)}`}
            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <LuChevronRight />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;