import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import { USER_MANAGEMENT_ROUTE } from "@/constants/routes";

const EditUser = ({ userId }) => {
  return (
    <div className="flex gap-2">
      <Link href={`${USER_MANAGEMENT_ROUTE}/${userId}/edit`}>
        <FaPencil className="text-blue-600" />
      </Link>
    </div>
  );
};

export default EditUser;