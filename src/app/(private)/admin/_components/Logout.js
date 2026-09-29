import { LOGIN_ROUTE } from "@/constants/routes";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

const Logout = () => {
  const { logout } = useAuthStore.getState();

  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace(LOGIN_ROUTE);
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-white flex justify-center items-center px-2 py-1.5  bg-red-600 hover:bg-red-700 rounded-md"
    >
      <FaSignOutAlt className="w-5 h-5 transition duration-75" />
      <span className="ms-3">Logout</span>
    </button>
  );
};

export default Logout;