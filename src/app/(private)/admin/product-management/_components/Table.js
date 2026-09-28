"use client";

import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { FaImage, FaPencil, FaTrash } from "react-icons/fa6";
import { PRODUCT_MANAGEMENT_ROUTE } from "@/constants/routes";
import { format } from "date-fns";
import { deleteProduct } from "@/api/products";
import { toast } from "react-toastify";
import TableHeader from "./TableHeader";

const ProductsTable = ({ products, loading }) => {
  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader />
        <tbody>
          {products.length == 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No products.
              </td>
            </tr>
          ) : (
            products?.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <th
                  scope="row"
                  className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.imageUrls.length > 0 ? (
                    <Image
                      src={product.imageUrls[0]}
                      alt={product.name}
                      height={64}
                      width={64}
                      className="w-8 h-8 mr-3 object-cover rounded"
                    />
                  ) : (
                    <FaImage className="w-8 h-8 mr-3 rounded text-gray-500" />
                  )}
                  <span className="font-medium">{product.name}</span>
                </th>
                <td className="px-4 py-2">
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                  {product.brand}
                </td>
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                  Rs. {product.price}
                </td>
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <div
                      className={`inline-block w-4 h-4 mr-2 ${product.stock > 10 ? "bg-green-700" : "bg-red-700"}  rounded-full`}
                    />
                    {product.stock}
                  </div>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {format(product.createdAt, "dd MMM, yyyy")}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex gap-2">
                    <Link
                      href={`${PRODUCT_MANAGEMENT_ROUTE}/${product._id}/edit`}
                    >
                      <FaPencil className="text-blue-600" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Are you sure?")) {
                          deleteProduct(product._id)
                            .then(() => {
                              toast.success("Product deleted successfully.");

                              fetchProducts();
                            })
                            .catch((error) => {
                              console.log(error);

                              toast.error(error.response.data);
                            });
                        }
                      }}
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;