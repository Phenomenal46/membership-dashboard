import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="
                rounded-lg
                p-2
                transition
                hover:bg-gray-100
                hover: cursor-pointer
                dark:hover:bg-slate-700
            "
        >
            {
                theme === "light"
                    ? <FiMoon size={20} />
                    : <FiSun size={20} />
            }
        </button>
    );
}