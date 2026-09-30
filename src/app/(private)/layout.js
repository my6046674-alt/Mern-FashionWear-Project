"use client";

import { LOGIN_ROUTE } from "@/constants/routes";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PrivateLayout = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const markHydrated = () => setHasHydrated(true);
    const unsubscribe = useAuthStore.persist.onFinishHydration(markHydrated);

    if (useAuthStore.persist.hasHydrated()) {
      markHydrated();
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace(LOGIN_ROUTE);
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) return null;

  return <>{children}</>;
};

export default PrivateLayout;
