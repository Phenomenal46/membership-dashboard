import ThemeToggle from "../Theme/ThemeToggle";

export default function Navbar() {
    return (
        <nav
            className="
                border-b
                border-gray-200
                bg-white
                dark:border-slate-700
                dark:bg-slate-800
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    max-w-7xl
                    items-center
                    justify-between
                    px-6
                    py-4
                "
            >
                <h1
                    className="
                        text-xl
                        font-bold
                    "
                >
                    Membership Dashboard
                </h1>

                <ThemeToggle />
            </div>
        </nav>
    );
}