"use client";

import { PRODUCTS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEFAULT_SORT = JSON.stringify({ createdAt: -1 });
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000000000000;
const DEFAULT_CATEGORY = "";
const DEFAULT_BRANDS = [];

const Filters = ({ brands, categories }) => {
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [categoryFilter, setCategoryFilter] = useState(DEFAULT_CATEGORY);
  const [brandsFilter, setBrandsFilter] = useState(DEFAULT_BRANDS);
  const [search, setSearch] = useState("");

  const router = useRouter();

  function applyFilters() {
    const params = new URLSearchParams();

    params.set("sort", sort);
    params.set("min", minPrice);
    params.set("max", maxPrice);
    params.set("category", categoryFilter);
    params.set("brands", brandsFilter.join(","));
    params.set("name", search);

    router.push(`?${params.toString()}`);
  }

  function resetFilters() {
    router.replace(PRODUCTS_ROUTE);
  }

  function handleBrandsFilter(brand) {
    setBrandsFilter((prev) => {
      return prev.includes(brand)
        ? prev.filter((item) => item != brand)
        : [...prev, brand];
    });
  }

  return (
    <div className="self-start sticky top-20 hidden md:block shadow-md rounded-2xl py-5 px-4 dark:bg-gray-900 dark:text-white">
      <div className="py-2">
        <h4 className="font-semibold">Search:</h4>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Search products..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <h3 className="font-semibold text-xl mt-4">Product Filters</h3>

      <div className="py-2">
        <h4>Sort by:</h4>
        <select
          onChange={(event) => setSort(event.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option value={JSON.stringify({ createdAt: -1 })}>
            Newest first
          </option>
          <option value={JSON.stringify({ price: 1 })}>Price: Low-High</option>
          <option value={JSON.stringify({ price: -1 })}>Price: High-Low</option>
          <option value={JSON.stringify({ name: 1 })}>Name: A-Z</option>
        </select>
      </div>

      <div className="py-2">
        <h4>Price range:</h4>
        <label className="text-sm">Min price:</label>
        <input
          type="number"
          name="min"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="1000"
          min={0}
          onChange={(event) => setMinPrice(event.target.value)}
        />
        <label className="text-sm">Max price:</label>
        <input
          type="number"
          name="max"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="1000000000"
          onChange={(event) => setMaxPrice(event.target.value)}
        />
      </div>

      <div className="py-2">
        <h4>Category:</h4>
        <select
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option value="">Select category</option>
          {categories?.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="py-2">
        <h4>Brands:</h4>
        <div>
          {brands?.map((brand, index) => (
            <div key={index} className="flex items-center mb-1 ">
              <input
                id={brand}
                type="checkbox"
                defaultValue
                onChange={() => handleBrandsFilter(brand)}
                className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
              />
              <label
                htmlFor={brand}
                className="select-none ms-2 text-sm font-medium text-heading"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4">
        <button
          type="button"
          onClick={resetFilters}
          className="bg-red-600 w-full py-2 text-white rounded-xl"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={applyFilters}
          className="bg-blue-600 w-full py-2 text-white rounded-xl"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filters;