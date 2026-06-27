export default function StatCard({
    title,
    value,
    icon,
}) {
    return (
        <div
            className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                hover:shadow-md
                hover: cursor-pointer

                dark:border-slate-700
                dark:bg-slate-800 
                transition-all
                duration-200
                hover:-translate-y-1
            "
        >
            <div className="flex items-center justify-between">

                <div>

                    <p
                        className="
                            text-md
                            text-gray-900
                            dark:text-gray-300
                        "
                    >
                        {title}
                    </p>

                    <h2
                        className="
                            mt-2
                            text-3xl
                            font-bold
                        "
                    >
                        {value}
                    </h2>

                </div>

                <div
                    className="
                        text-3xl
                        opacity-70
                    "
                >
                    {icon}
                </div>

            </div>
        </div>
    );
}