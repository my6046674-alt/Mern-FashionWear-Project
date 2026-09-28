import { ORDER_MANAGEMENT_ROUTE } from "@/constants/routes";
import { ROLE_ADMIN } from "@/constants/userRoles";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

const EditOrder = ({ orderId }) => {
  const user = useAuthStore((state) => state.user);

  if (!user.roles.includes(ROLE_ADMIN)) return;

  return (
    <div className="flex gap-2">
      <Link href={`${ORDER_MANAGEMENT_ROUTE}/${orderId}/edit`}>
        <FaPencil className="text-blue-600" />
      </Link>
    </div>
  );
};

export default EditOrder;