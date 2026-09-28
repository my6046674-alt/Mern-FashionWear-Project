"use client";

// import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
// import useAuthStore from "@/stores/authStore";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

const CustomerLayout = ({ children }) => {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // const user = useAuthStore((state) => state.user);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.replace(LOGIN_ROUTE);
  //     return;
  //   }

  //   if (!user?.roles?.includes("ROLE_CUSTOMER", "ROLE_ADMIN")) {
  //     router.replace(HOME_ROUTE);
  //   }
  // }, [isAuthenticated, user, router]);

  // if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default CustomerLayout;
