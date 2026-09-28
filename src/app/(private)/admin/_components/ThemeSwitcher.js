"use client";

import usePreferenceStore from "@/stores/preferenceStore";
import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeSwitcher = () => {
  const theme = usePreferenceStore((state) => state.theme);

  const { toggleTheme } = usePreferenceStore.getState();

  return (
    <button
      onClick={toggleTheme}
      className="w-full dark:text-gray-100 flex items-center px-2 py-1.5 text-gray-800 rounded hover:bg-primary/10 hover:text-primary group"
    >
      {theme == "light" ? (
        <>
          <FaMoon className="w-5 h-5 dark:text-gray-100 transition duration-75 group-hover:text-primary" />
          <span className="ms-3">Dark Mode</span>
        </>
      ) : (
        <>
          <FaSun className="w-5 h-5 transition duration-75 group-hover:text-primary" />
          <span className="ms-3">Light Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeSwitcher;