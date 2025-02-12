"use client";

import { useEffect, useState } from "react";

function ThemeToggler() {
  const [theme, setTheme] = useState();
  useEffect(() => {
    const localTheme = localStorage.getItem("infowithawan_theme");
    if (localTheme === "dark") {
      setTheme("dark");
      document.body.classList.add("dark");
    } else if (localTheme === "light") {
      setTheme("light");
      document.body.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.setItem("infowithawan_theme", "dark");
        setTheme("dark");
        document.body.classList.add("dark");
      } else {
        localStorage.setItem("infowithawan_theme", "light");
        setTheme("light");
        document.body.classList.remove("dark");
      }
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("infowithawan_theme", newTheme);
    setTheme(newTheme);
    document.body.classList.toggle("dark");
  };
  return (
    <div
      className="flex h-8 w-14 cursor-pointer flex-col justify-center rounded-full bg-gray-100 p-1 ring-1 ring-yellow-400 dark:items-end dark:bg-violet-950 dark:ring-gray-200"
      onClick={toggleTheme}
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 transition-all duration-500 ease-in-out hover:scale-110 hover:bg-yellow-500 dark:relative dark:bg-gray-200 dark:hover:bg-gray-300">
        <div className="absolute left-[15%] top-[20%] hidden h-[3px] w-[3px] rounded-full bg-gray-500 opacity-70 dark:inline-flex"></div>
        <div className="absolute left-[65%] top-[20%] hidden h-[2px] w-[2px] rounded-full bg-gray-500 opacity-70 dark:inline-flex"></div>
        <div className="absolute right-[20%] top-[45%] hidden h-[4px] w-[4px] rounded-full bg-gray-500 opacity-70 dark:inline-flex"></div>
        <div className="absolute bottom-[10%] left-[20%] hidden h-[5px] w-[5px] rounded-full bg-gray-500 opacity-70 dark:inline-flex"></div>
      </div>
    </div>
  );
}

export default ThemeToggler;
