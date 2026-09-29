"use client";
import { getUsersById, updateUserRoles } from "@/api/users";
import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
} from "@/constants/userRoles";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateUserPage = () => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  const params = useParams();

  function updateRoles(event) {
    event.preventDefault();

    updateUserRoles(user._id, roles)
      .then(() => toast.success("Status updated"))
      .catch((error) => console.log(error));
  }

  function setUserRoles(role) {
    setRoles((prev) => {
      return prev.includes(role)
        ? prev.filter((item) => item != role)
        : [...prev, role];
    });
  }

  useEffect(() => {
    const userId = params.id;

    getUsersById(userId)
      .then((res) => {
        setUser(res.data);
        setRoles(res.data.roles);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!user) return;

  return (
    <div className="mb-12 dark:text-white">
      <h2 className="text-2xl font-semibold">User Name: {user.name}</h2>

      <p>Phone: {user.phone}</p>
      <p className="text-lg my-2 font-semibold">Email: {user.email}</p>
      <p>
        Roles:{" "}
        {roles.map((role) => (
          <span
            key={role}
            className="mr-2 bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
          >
            {role}
          </span>
        ))}
      </p>
      <form className="flex items-center gap-4 mt-5" onSubmit={updateRoles}>
        <label className="border border-gray-300 dark:border-gray-700 px-4 py-1 rounded-md text-sm">
          <input
            type="checkbox"
            className="mr-2"
            defaultChecked={roles.includes(ROLE_CUSTOMER)}
            onChange={() => setUserRoles(ROLE_CUSTOMER)}
          />
          CUSTOMER
        </label>
        <label className="border border-gray-300 dark:border-gray-700 px-4 py-1 rounded-md text-sm">
          <input
            type="checkbox"
            className="mr-2"
            defaultChecked={roles.includes(ROLE_MERCHANT)}
            onChange={() => setUserRoles(ROLE_MERCHANT)}
          />
          MERCHANT
        </label>
        <label className="border border-gray-300 dark:border-gray-700 px-4 py-1 rounded-md text-sm">
          <input
            type="checkbox"
            className="mr-2"
            disabled
            defaultChecked={roles.includes(ROLE_ADMIN)}
          />
          ADMIN
        </label>
        <button className="inline-flex gap-2 items-center px-10 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary hover:bg-primary/90">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUserPage;