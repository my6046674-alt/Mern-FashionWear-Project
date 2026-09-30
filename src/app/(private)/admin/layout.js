"use client";

import { LOGIN_ROUTE } from "@/constants/routes";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./_components/Sidebar";

const AdminLayout = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(LOGIN_ROUTE);
    }
  }, [isAuthenticated, router]);

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

export default AdminLayout;
