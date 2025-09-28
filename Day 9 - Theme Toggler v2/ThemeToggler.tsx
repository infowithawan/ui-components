import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState, type MouseEvent } from "react";

function ThemeToggle() {
    const [theme, setTheme] = useState<string>("");

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            localStorage.taskeep_theme === "dark" ||
                (!("taskeep_theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
        );
        if ("taskeep_theme" in localStorage) {
            setTheme(localStorage.taskeep_theme);
        } else setTheme("system");
    }, [theme]);

    function toggleTheme(e: MouseEvent<HTMLButtonElement>) {
        if (e.currentTarget.id === "system") {
            localStorage.removeItem("taskeep_theme");
            setTheme("system");
        } else if (e.currentTarget.id === "light") {
            localStorage.taskeep_theme = "light";
            setTheme("light");
        } else {
            localStorage.taskeep_theme = "dark";
            setTheme("dark");
        }
    }
    const buttons = [
        { name: "system", icon: <IconDeviceDesktop size={16} /> },
        { name: "light", icon: <IconSun size={16} /> },
        { name: "dark", icon: <IconMoon size={16} /> },
    ];
    return (
        <div
            id="theme"
            className="flex w-fit cursor-pointer appearance-none items-center justify-center gap-0.75 rounded-2xl bg-stone-200 px-0.75 py-0.5 ring-[0.75px] ring-stone-600 focus-visible:outline-hidden dark:bg-stone-600 dark:ring-stone-200"
        >
            {buttons.map((btn) => (
                <button
                    key={btn.name}
                    id={btn.name}
                    type="button"
                    onClick={toggleTheme}
                    className={`transile cursor-pointer rounded-full p-1 hover:bg-stone-400 focus-visible:outline-hidden dark:hover:bg-stone-500 ${theme === btn.name ? "bg-stone-500 dark:bg-stone-800" : "bg-transparent"}`}
                >
                    {btn.icon}
                </button>
            ))}
        </div>
    );
}

export default ThemeToggle;
