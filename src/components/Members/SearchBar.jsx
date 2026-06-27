export default function SearchBar({
    search,
    setSearch,
}) {
    return (
        <input
            type="text"
            placeholder="Search by name or email..."

            value={search}

            onChange={(e) =>
                setSearch(e.target.value)
            }

            className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-3
                shadow-sm
                outline-none

                focus:ring-2
                focus:ring-blue-500

                dark:border-slate-700
                dark:bg-slate-800
            "
        />
    );
}