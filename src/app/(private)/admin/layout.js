"use client";

import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./_components/sidebar";

const MerchantLayout = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const roles = Array.isArray(user?.roles)
    ? user.roles
    : user?.role
      ? [user.role]
      : [];

  const isMerchant = roles.some(
    (role) => role === "ROLE_MERCHANT" || role === "MERCHANT",
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(LOGIN_ROUTE);
      return;
    }

    if (!isMerchant) {
      router.replace(HOME_ROUTE);
    }
  }, [isAuthenticated, isMerchant, router]);

  if (!isAuthenticated) return null;

  return (
    <>
     
     <Sidebar/>
      <div className="p-6 sm:ml-64 h-screen dark:bg-gray-800">
   {children}
      </div>
    </>
  );
};

export default MerchantLayout;
