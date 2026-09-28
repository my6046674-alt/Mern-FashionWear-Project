"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowUp, FaCog } from "react-icons/fa";
import { LuChevronDown, LuChevronsUpDown, LuChevronUp } from "react-icons/lu";

const columns = [
  {
    key: "name",
    label: "Product name",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "brand",
    label: "Brand",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "stock",
    label: "Stock",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
];

const TableHeader = () => {
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(-1);

  const router = useRouter();

  function sort(key) {
    const params = new URLSearchParams();

    setSortKey(key);
    setSortOrder(sortOrder == 1 ? -1 : 1);
    params.set("sort", JSON.stringify({ [key]: sortOrder }));

    router.push(`?${params}`);
  }

  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((column, index) => (
          <th
            scope="col"
            key={index}
            className="px-4 py-3"
            onClick={() => sort(column.key)}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              {column.label}

              {sortKey == column.key ? (
                sortOrder == 1 ? (
                  <LuChevronUp />
                ) : (
                  <LuChevronDown />
                )
              ) : (
                <LuChevronsUpDown />
              )}
            </div>
          </th>
        ))}
        <th scope="col" className="px-4 py-3">
          <FaCog />
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;