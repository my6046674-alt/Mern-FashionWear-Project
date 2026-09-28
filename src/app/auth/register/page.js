
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { useForm } from "react-hook-form";
import { signup } from "@/api/auth";
import PasswordInput from "@/components/passwordInput";
import useAuthStore from "@/stores/authStore";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const { registerUser } = useAuthStore.getState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function submitForm(data) {
    setLoading(true);

    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      address: {
        city: data.city,
        province: data.province,
      },
    };

    signup(userData)
      .then((response) => {
        console.log("Register response:", response);

        registerUser({
          user: response.data,
        });
         router.replace(HOME_ROUTE);
       
        toast.success("Register successful");
      })
      .catch((error) => {
        console.log("Register error:", error);

        toast.error(
          error?.response?.data?.message ||
            error?.response?.data ||
            "Registration failed"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-center py-10">
        <div className="w-full rounded-lg sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-2 md:space-y-8 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>

            <form
              onSubmit={handleSubmit(submitForm)}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>

                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="John Doe"
                  required
                  {...register("name")}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>

                <input
                  type="tel"
                  id="phone"
                  placeholder="98xxxxxxxx"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                  {...register("phone")}
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>

                <input
                  type="text"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your city"
                  required
                  {...register("city")}
                />

                <select
                  id="province"
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  {...register("province")}
                >
                  <option value="Bagmati">Bagmati</option>
                  <option value="Koshi">Koshi</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Lumbini">Lumbini</option>
                  <option value="Madhesh">Madhesh</option>
                  <option value="Karnali">Karnali</option>
                  <option value="Sudur-Paschim">Sudur-Paschim</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>

                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                  {...register("email")}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>

                <PasswordInput
                  id="password"
                  {...register("password")}
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                    required
                  />
                </div>

                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="relative w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-85"
              >
                Create an account

                {loading && (
                  <Spinner className="absolute right-3 top-2 w-7! h-7!" />
                )}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href={LOGIN_ROUTE}
                  className="font-medium text-primary hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

