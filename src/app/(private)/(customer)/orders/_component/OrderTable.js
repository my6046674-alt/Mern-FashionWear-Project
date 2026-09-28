import { PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderTable = ({ order }) => {
  return (
    <div className="relative overflow-x-auto py-5 ">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body border-b border-gray-200 text-gray-700 dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              Product
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Qty
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Price
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {(Array.isArray(order?.orderItems) ? order.orderItems : []).map(
            (item, index) => {
              const product =
                item?.product && typeof item.product === "object"
                  ? item.product
                  : null;
              const imageUrl = product?.imageUrls?.[0];

              return (
                <tr
                  key={item?._id || `${order?._id || "order"}-${index}`}
                  className="border-b border-gray-200 text-gray-700"
                >
                  <td className="w-full px-6 py-4 font-semibold text-heading">
                    <div className="flex items-center gap-5">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product?.name || ""}
                          height={100}
                          width={100}
                          className="h-15 w-15 rounded-md"
                        />
                      ) : (
                        <div className="h-15 w-15 rounded-md bg-gray-100" />
                      )}
                      <h4 className="mr-10 whitespace-nowrap">
                        {product?.name || "Product unavailable"}
                      </h4>
                    </div>
                  </td>

                  <td className="min-w-32 px-6 py-4">x{item?.quantity || 0}</td>

                  <td className="min-w-32 px-6 py-4 font-semibold text-heading">
                    Rs.{product?.price ?? "N/A"}
                  </td>

                  <td className="min-w-32 px-6 py-4">
                    {product?._id ? (
                      <Link
                        href={`${PRODUCTS_ROUTE}/${product._id}`}
                        className="font-medium text-blue hover:underline"
                      >
                        View
                      </Link>
                    ) : (
                      <span className="text-gray-400">Unavailable</span>
                    )}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
