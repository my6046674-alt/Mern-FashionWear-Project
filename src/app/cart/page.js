"use client";

import { DASHBOARD_ROUTE, PRODUCTS_ROUTE } from "@/constants/routes";
import useCartStore from "@/stores/cartStore";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaArrowLeft,
  FaImage,
  FaMinus,
  FaPlus,
  FaRegHeart,
} from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import CheckoutButton from "./_components/CheckoutButton";

const CartPage = () => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore.getState();

  const products = useCartStore((state) => state.products);

  const cartProducts = Array.isArray(products) ? products.filter(Boolean) : [];

  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto container px-4 2xl:px-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>
          <Link
            href={DASHBOARD_ROUTE}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <FaArrowLeft aria-hidden="true" />
            Back to Dashboard
          </Link>
        </div>

        {products.length == 0 ? (
          <div>Cart is empty.</div>
        ) : (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Link
                        href={`${PRODUCTS_ROUTE}/${product._id}`}
                        className="shrink-0 md:order-1"
                      >
                        {product.imageUrls?.length > 0 ? (
                          <Image
                            className="h-20 w-20 rounded-xl"
                            src={product.imageUrls[0]}
                            alt={product.name}
                            height={256}
                            width={256}
                          />
                        ) : (
                          <div className="h-20 w-20 flex items-center justify-center bg-primary/10 rounded-xl">
                            <FaImage className="text-5xl text-gray-500" />
                          </div>
                        )}
                      </Link>

                      <label htmlFor="counter-input" className="sr-only">
                        Choose quantity:
                      </label>

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="p-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            onClick={() => decreaseQuantity(product._id)}
                          >
                            <FaMinus className="dark:text-white" />
                          </button>

                          <span className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="p-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            onClick={() => increaseQuantity(product._id)}
                          >
                            <FaPlus className="dark:text-white" />
                          </button>
                        </div>

                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            Rs. {product.price}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link
                          href={`${PRODUCTS_ROUTE}/${product._id}`}
                          className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                        >
                          {product.name}
                        </Link>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                          >
                            <FaRegHeart className="mr-2" />
                            Add to Favorites
                          </button>

                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            onClick={() => {
                              if (confirm("Are you sure?")) {
                                removeFromCart(product._id);
                              }
                            }}
                          >
                            <LiaTimesSolid className="mr-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden xl:mt-8 xl:block">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  People also bought
                </h3>

                <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                  <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#" className="overflow-hidden rounded">
                      <Image
                        className="mx-auto h-44 w-44 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                        alt="imac image"
                        width={176}
                        height={176}
                      />
                      <Image
                        className="mx-auto hidden h-44 w-44 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                        alt="imac image"
                        width={176}
                        height={176}
                      />
                    </a>

                    <div>
                      <a
                        href="#"
                        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        iMac 27”
                      </a>

                      <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        <span className="line-through">$399,99</span>
                      </p>

                      <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                        $299
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2.5">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700"
                      >
                        <FaRegHeart />
                      </button>

                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#" className="overflow-hidden rounded">
                      <Image
                        className="mx-auto h-44 w-44 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
                        alt="ps5 image"
                        width={176}
                        height={176}
                      />
                      <Image
                        className="mx-auto hidden h-44 w-44 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
                        alt="ps5 image"
                        width={176}
                        height={176}
                      />
                    </a>

                    <div>
                      <a
                        href="#"
                        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        Playstation 5
                      </a>

                      <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        <span className="line-through">$799,99</span>
                      </p>

                      <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                        $499
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2.5">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
                      >
                        <FaRegHeart />
                      </button>

                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <a href="#" className="overflow-hidden rounded">
                      <Image
                        className="mx-auto h-44 w-44 dark:hidden"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                        alt="apple watch image"
                        width={176}
                        height={176}
                      />
                      <Image
                        className="mx-auto hidden h-44 w-44 dark:block"
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                        alt="apple watch image"
                        width={176}
                        height={176}
                      />
                    </a>

                    <div>
                      <a
                        href="#"
                        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        Apple Watch Series 8
                      </a>

                      <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                        This generation has some improvements, including a
                        longer continuous battery life.
                      </p>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        <span className="line-through">$1799,99</span>
                      </p>

                      <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                        $1199
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2.5">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
                      >
                        <FaRegHeart />
                      </button>

                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>

                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        Rs. {totalPrice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>

                      <dd className="text-base font-medium text-green-600">
                        - Rs. {totalPrice * 0.1}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>

                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        Rs. 100
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>

                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        Rs. {totalPrice * 0.13}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>

                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      Rs. {totalPrice + totalPrice * 0.03 + 100}
                    </dd>
                  </dl>
                </div>

                <CheckoutButton
                  products={cartProducts}
                  totalPrice={totalPrice + totalPrice * 0.03 + 100}
                />

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    or
                  </span>

                  <Link
                    href={PRODUCTS_ROUTE}
                    title="Continue Shopping"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary underline hover:no-underline"
                  >
                    Continue Shopping
                    <FaArrowRight />
                  </Link>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Do you have a voucher or gift card?
                    </label>

                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Enter voucher code"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;