import Logo from "@/components/Logo";
import { adminMenu } from "@/constants/routes";
import Link from "next/link";
import { FaSun } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-900 bg-gray-50 border-e border-gray-200 dark:border-gray-700 shadow">
        <div className="my-4 mx-2"><Logo/></div>
        <ul className="space-y-2 font-medium">
          {adminMenu.map(item=>(
            <li key={item.name}>
              <Link
                href={item.route}
                className="flex items-center px-2 py-1.5 text-gray-800 dark:text-gray-100 rounded hover:bg-primary/10 hover:text-primary group"
              >
                <item.Icon
              className="w-5 h-5 transition duration-75 group-hover:text-primary"

                 />
                <span className="ms-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2 font-medium border-t border-gray-100 dark:border-gray-700 mt-2 my-2">
        <ThemeSwitcher/>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
