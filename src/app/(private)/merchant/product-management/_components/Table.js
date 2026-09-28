"use client";

import { deleteProduct, getProducts } from "@/api/products";
import Spinner from "@/components/Spinner";
import { PRODUCT_MANAGEMENT_ROUTE } from "@/constants/routes";
import useAuthStore from "@/stores/authStore";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCog, FaTrash } from "react-icons/fa";
import {  FaImage, FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]= useState(true);

  const {user}= useAuthStore.getState();

  function fetchProducts(){
        getProducts({createdBy: user._id})
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => console.log(error))
      .finally(()=>setLoading(false));

  }

  useEffect(() => {
fetchProducts();

  }, []);


   if(loading)
  return(
    
    <div className="flex justify-center">
        <Spinner/>
        </div>
  );


  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
        
              <th scope="col" className="px-4 py-3">
                Product
              </th>
              <th scope="col" className="px-4 py-3">
                Category
              </th>
              <th scope="col" className="px-4 py-3">
                Brand
              </th>
             
              <th scope="col" className="px-4 py-3">
                price
              </th>
               <th scope="col" className="px-4 py-3">
                Stock
              </th>
               <th scope="col" className="px-4 py-3">
                Created At
              </th>
              <th scope="col" className="px-4 py-3">
                <FaCog/>
          </th>
            </tr>
          </thead>

          <tbody>
            {products.length==0 ?
              <tr>
                <td colSpan={7} className="text-center py-4">No Products.</td>
              </tr>

            :

            products?.map((product) => (
              <tr 
              key={product._id}
              className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
           
                <th
                  scope="row"
                  className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                {product.imageUrls?.length > 0 ? (
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.name}
                    height={64}
                    width={64}
                    className="w-8 h-8 mr-3 object-cover rounded"
                  />
                ): (
                    <FaImage className="w-8 h-8 mr-3 rounded text-gray-500"/>
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
              Rs.{product.price}
                </td>
               
                <td className="px-4 py-2 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <div className={`inline-block w-4 h-4 mr-2 ${product.stock>10 ?"bg-green-700": "bg-red-700"}  rounded-full`}></div>
                   {product.stock}
                  </div>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {format(product.createdAt, "dd MMM, yyyy")}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 <div className="flex gap-2">
                 <Link
                 href={`${PRODUCT_MANAGEMENT_ROUTE}/${product._id}/edit`}>
                   <FaPencil className="text-blue-600"/>
                 </Link>
                 <button type="button"
                 onClick={()=>{
                  if(confirm("Are you Sure?")){
                    deleteProduct(product._id).then(()=>{
                      toast.success("Product deleted successfully.");

                      fetchProducts();
                    })
                      .catch((error)=>{
                      console.log(error);
                      toast.error(error.response.data);
                    });
                  
                  }
                  
                 }}>
                 <FaTrash className="text-red-600"/>

                 </button>
                 </div>
                </td>
              </tr>
            ))}

           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
