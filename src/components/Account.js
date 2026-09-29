import Image from "next/image";
import placeholder from "@/assets/images/placeholder.png";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PROFILE_ROUTE,
} from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ROLE_ADMIN, ROLE_MERCHANT } from "@/constants/userRoles";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthStore.getState();

  const popoverRef = useRef();

  const router = useRouter();

  function handleLogout() {
    logout();

    router.replace(LOGIN_ROUTE);
  }

  function handleClickOutside(event) {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative"
      ref={popoverRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button type="button">
        <Image
          src={user?.profileImageUrl ?? placeholder}
          alt=""
          width={100}
          height={100}
          className="h-10 w-10 rounded-full border-2 border-primary object-cover p-0.5"
        />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white dark:bg-gray-900 rounded-xl p-2 min-w-32 flex flex-col gap-1 shadow-md">
          <Link
            href={PROFILE_ROUTE}
            className="bg-gray-50 dark:bg-gray-800 dark:text-white px-4 py-1 rounded-md"
          >
            Account
          </Link>
          <Link
            href={ORDERS_ROUTE}
            className="bg-gray-50 dark:bg-gray-800 dark:text-white px-4 py-1 rounded-md"
          >
            Orders
          </Link>
          {(user.roles.includes(ROLE_ADMIN) ||
            user.roles.includes(ROLE_MERCHANT)) && (
            <Link
              href={DASHBOARD_ROUTE}
              className="bg-gray-50 dark:bg-gray-800 dark:text-white px-4 py-1 rounded-md"
            >
              Dashboard
            </Link>
          )}
          <hr className="text-gray-200 dark:text-gray-700 my-1" />
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-md cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;