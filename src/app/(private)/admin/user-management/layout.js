"use client";

import useAuthStore from "@/stores/authStore";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { ROLE_ADMIN } from "@/constants/userRoles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserMangementLayout = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return router.replace(LOGIN_ROUTE);
    }

    if (!user.roles.includes(ROLE_ADMIN)) return router.replace(HOME_ROUTE);
  }, []);

  return <div>{children}</div>;
};

export default UserMangementLayout;