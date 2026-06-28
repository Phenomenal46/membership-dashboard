import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";
import { LuArrowDownUp, LuArrowUp, LuArrowDown } from "react-icons/lu";

export default function MembersTable({
    members,
    sortOrder,
    onSortToggle,
}) {

    if (!members.length) {
        return <EmptyState />;
    }

    return (
        <div
            className="
                overflow-x-auto
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-sm
                dark:border-slate-700
                dark:bg-slate-800
            "
        >
            <table className="w-full overflow-x-auto">
                <thead>
                    <tr className="border-b dark:border-slate-700 text-sm">
                        {/* Interactive Sortable Header */}
                        <th 
                            onClick={onSortToggle}
                            className="
                                group relative cursor-pointer select-none border-b
                                p-4 text-left transition-colors
                                hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700/50
                            "
                        >
                            <div className="flex items-center gap-2">
                                Name
                                {/* FIX 1: Increased contrast for better visibility */}
                                <span className="text-gray-600 transition-colors group-hover:text-black dark:text-gray-300 dark:group-hover:text-white">
                                    {sortOrder === "asc" ? (
                                        <LuArrowUp size={16} />
                                    ) : sortOrder === "desc" ? (
                                        <LuArrowDown size={16} />
                                    ) : (
                                        <LuArrowDownUp size={16} className="opacity-80" />
                                    )}
                                </span>
                            </div>

                            {/* FIX 2: Moved tooltip below the header (top-full, mt-2) and added z-50 to escape clipping */}
                            <div 
                                className="
                                    pointer-events-none absolute left-4 top-full mt-2 z-50
                                    w-max rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white
                                    opacity-0 shadow-lg transition-all duration-200
                                    group-hover:translate-y-1 group-hover:opacity-100
                                    dark:bg-gray-100 dark:text-gray-900
                                "
                            >
                                Click to sort by Name
                                
                                {/* Adjusted the caret triangle to point up instead of down */}
                                <div 
                                    className="
                                        absolute left-6 bottom-full h-2.5 w-2.5 
                                        -translate-x-1/2 translate-y-1/2 rotate-45 
                                        bg-gray-900 dark:bg-gray-100
                                    "
                                />
                            </div>
                        </th>

                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Membership</th>
                        <th className="p-4 text-left">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {members.map(member => (
                        <tr
                            key={member.id}
                            className="
                                border-b transition hover:bg-gray-50
                                dark:border-slate-700 dark:hover:bg-slate-700
                            "
                        >
                            {/* NEW: Added max-w-[200px] and truncate */}
                            <td className="p-4 font-medium max-w-50 truncate" title={member.name}>
                                {member.name}
                            </td>
                            {/* NEW: Added max-w-[250px] and truncate */}
                            <td className="p-4 text-gray-500 dark:text-gray-400 max-w-62.5 truncate" title={member.email}>
                                {member.email}
                            </td>
                            <td className="p-4">
                                <StatusBadge value={member.membershipType} type="membership" />
                            </td>
                            <td className="p-4">
                                <StatusBadge value={member.status} type="status" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}