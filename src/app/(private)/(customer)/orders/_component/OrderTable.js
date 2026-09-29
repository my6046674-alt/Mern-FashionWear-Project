import { PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const OrderTable = ({ order }) => {
  return (
    <div className="relative overflow-x-auto py-5">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body border-b border-gray-200 text-gray-500">
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
          {(Array.isArray(order.orderItems) ? order.orderItems : []).map((item, index) => {
            const product = item?.product || {};
            const imageUrl = product.imageUrls?.[0];
            const productId = product._id || item?.productId || "";

            return (
              <tr key={index} className="border-b border-gray-200 text-gray-700 dark:text-white">
                <td className="w-full px-6 py-4 font-semibold text-heading">
                  <div className="flex items-center gap-5">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.name || "Product"}
                        height={100}
                        width={100}
                        className="h-15 w-15 rounded-md"
                      />
                    ) : (
                      <div className="flex h-15 w-15 items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                    <h4 className="whitespace-nowrap mr-10">{product.name || "Product"}</h4>
                  </div>
                </td>
                <td className="min-w-32 px-6 py-4">x{item.quantity ?? 1}</td>
                <td className="min-w-32 px-6 py-4 font-semibold text-heading">
                  Rs. {product.price ?? item.price ?? 0}
                </td>
                <td className="min-w-32 px-6 py-4">
                  {productId ? (
                    <Link
                      href={`${PRODUCTS_ROUTE}/${productId}`}
                      className="font-medium text-blue-500 hover:underline"
                    >
                      view
                    </Link>
                  ) : (
                    <span className="text-gray-400">view</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;