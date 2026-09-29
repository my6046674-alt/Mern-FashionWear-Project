import UsersTable from "./_components/Table";

const UserManagementPage = () => {
  return (
    <section className="py-3">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        User Management
      </h2>
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-900 sm:rounded-lg">
        <UsersTable />
      </div>
    </section>
  );
};

export default UserManagementPage;