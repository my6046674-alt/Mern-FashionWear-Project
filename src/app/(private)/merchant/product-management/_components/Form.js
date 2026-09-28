"use client";

import { addProduct, updateProduct } from "@/api/products";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaCloudArrowUp } from "react-icons/fa6";
import { toast } from "react-toastify";

const ProductForm = ({product, isEditing=false}) => {
  const { register, handleSubmit, reset } = useForm({
    values:product,
  });

  const [loading, setLoading]=useState(false)
  const router = useRouter();

  const [productImages, setProductImages] = useState([]);
  const [localImageUrls, setLocalImageUrls] = useState([]);

  function prepareData(data) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    if (data.description) formData.append("description", data.description);

    if (productImages.length > 0) {
      productImages.map((image) => {
        formData.append("images", image);
      });
    }
    return formData;
  }
    async function upsertProduct(input){
      if(isEditing){
      return  updateProduct(product._id, input)
      }
       return addProduct(input)
      
    }

  function submitForm(data) {
    setLoading(true)
    const input = prepareData(data);

    upsertProduct(input)
      .then((res) => {
        if(isEditing){
           toast.success("Product updated successfully.")
            router.refresh();
        }else{
         toast.success("Product added successfully.")

        setProductImages([]);
        setLocalImageUrls([]);

        reset();

        }
      
    
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response?.data || "Unable to save product.");
      })
      .finally(()=>setLoading(false));
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name *
          </label>

          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Type product name"
            required
            {...register("name")}
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Brand *
          </label>

          <input
            type="text"
            id="brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Product brand"
            required
            {...register("brand")}
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price *
          </label>

          <input
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Rs. 3999"
            required
            {...register("price")}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category *
          </label>

          <input
            type="text"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Category"
            required
            {...register("category")}
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Stock *
          </label>

          <input
            type="number"
            id="stock"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            defaultValue={1}
            required
            {...register("stock")}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Product Images
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="images"
              className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 border-dashed rounded-lg border border-gray-300 cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaCloudArrowUp className="w-8 h-8 mb-4" />

                <p className="mb-2 text-sm">
                  <span>Click to upload</span> or drag and drop
                </p>

                <p className="text-xs">PNG, JPG or WEBP</p>

                <input
                  id="images"
                  type="file"
                  className="hidden"
                  multiple
                  accept=".png,.jpg,.jpeg,.webp"
                  onChange={(event) => {
                    const files = [];
                    const urls = [];

                    Array.from(event.target.files).map((file) => {
                      files.push(file);
                      urls.push(URL.createObjectURL(file));
                    });

                    setProductImages(files);
                    setLocalImageUrls(urls);
                  }}
                />
              </div>
            </label>
          </div>

          {localImageUrls.length > 0 && (
            <div className="flex py-4 gap-2">
              {localImageUrls.map((imageUrl, index) => (
                <div
                  key={index}
                  className="p-1 border rounded-lg border-gray-200 dark:border-gray-700"
                >
                  <Image
                    src={imageUrl}
                    alt=""
                    height={64}
                    width={64}
                    className="h-16 w-16 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={8}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            placeholder="Your description here"
            {...register("description")}
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex gap-2 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg"
        disabled={loading}
      >
       {isEditing ? "Update product" :"Add product"}
       {loading &&  <Spinner className="h-5! w-5!"/>}
      </button>
    </form>
  );
};

export default ProductForm;
