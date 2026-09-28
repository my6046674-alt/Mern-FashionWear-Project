"use client";

import { PRODUCTS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ErrorPage = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push(PRODUCTS_ROUTE);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <div>{error?.message || "Something went wrong."}</div>
  );
};

export default ErrorPage;