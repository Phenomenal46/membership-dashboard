import Navbar from "../components/Navbar/Navbar";
import AnalyticsCards from "../components/Dashboard/AnalyticsCards";
import SearchBar from "../components/Members/SearchBar";
import MembersTable from "../components/Members/MembersTable";
import LoadingTable from "../components/Members/LoadingTable";
import AddMemberModal from "../components/Forms/AddMemberModal";
import LoadingCards from "../components/Dashboard/LoadingCards";
import Pagination from "../components/Members/Pagination";
import useMembers from "../hooks/useMembers";
import { useState, useEffect, useMemo } from "react";
import ErrorState from "../components/UI/ErrorState";
import { calculateAnalytics } from "../utils/analytics";


export default function Dashboard() {
    // get member data and addMember function from custom hook
    const {
        members,
        loading,
        error,
        addMember,
    } = useMembers();

    const analytics =
        calculateAnalytics(members);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(""); // Holds the delayed search term
    const [sortOrder, setSortOrder] = useState(null); // 'asc' | 'desc' | null

    // Cycles through: Ascending -> Descending -> Default
    const handleSortToggle = () => {
        setSortOrder(prev => {
            if (prev === null) return "asc";
            if (prev === "asc") return "desc";
            return null;
        });
    };

    // Modern UX: Debounce the search input by 300ms to prevent performance lag
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search.trim()); // .trim() prevents accidental trailing spaces breaking the search
        }, 300);

        return () => clearTimeout(handler); // Cleanup on every keystroke
    }, [search]);

    const [isOpen, setIsOpen] = useState(false);
    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // instant search by name/email
    // Smart search: Filters and sorts by relevance & lexicographical order
    // Smart search & explicit sorting combined
    const filteredMembers = useMemo(() => {
        const query = debouncedSearch?.toLowerCase() || "";

        // 1. Filter matches first (or create a shallow copy if no search)
        let matched = query
            ? members.filter(member =>
                member.name.toLowerCase().includes(query) ||
                member.email.toLowerCase().includes(query)
            )
            : [...members];

        // 2. Apply sorting
        return matched.sort((a, b) => {
            // Priority 1: Explicit column sorting by the user
            if (sortOrder) {
                const comparison = a.name.localeCompare(b.name);
                return sortOrder === "asc" ? comparison : -comparison;
            }

            // Priority 2: Smart relevance sorting if searching
            if (query) {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                const aStarts = nameA.startsWith(query);
                const bStarts = nameB.startsWith(query);

                if (aStarts && !bStarts) return -1;
                if (bStarts && !aStarts) return 1;
                return nameA.localeCompare(nameB);
            }

            // Priority 3: Fallback (default order)
            return 0;
        });

    }, [members, debouncedSearch, sortOrder]); // Note: dependency is now debouncedSearch

    // calculate total pages
    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredMembers.length /
            rowsPerPage
        )
    );

    // whenever the processed search changes, go back to page 1
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    useEffect(() => {
        if (
            currentPage >
            totalPages
        ) {
            setCurrentPage(
                totalPages
            );
        }
    }, [
        currentPage,
        totalPages,
    ]);

    // members to display on current page
    const paginatedMembers =
        filteredMembers.slice(
            (currentPage - 1) *
            rowsPerPage,
            currentPage *
            rowsPerPage
        );

    return (
        <div
            className="
                min-h-screen
                bg-slate-50
                text-slate-900
                dark:bg-slate-900
                dark:text-white
            "
        >
            <Navbar />

            <main
                className="
                    mx-auto
                    max-w-7xl
                    p-6
                "
            >

                {error && (
                    <ErrorState message={error} />
                )}

                {loading ? <LoadingCards /> : <AnalyticsCards analytics={analytics} />}

                <div
                    className="
                        mb-6
                        flex
                        flex-col
                        gap-4
                        md:flex-row
                        "
                >

                    <div className="flex-1">

                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                        />

                    </div>

                    <button
                        onClick={() =>
                            setIsOpen(true)
                        }
                        className="
                            rounded-lg
                            bg-black
                            px-6
                            py-3
                            text-white
                            hover:bg-gray-700
                            hover:cursor-pointer
                            "
                    >
                        + Add Member
                    </button>

                </div>

                {/* table */}
                {
                    loading
                        ? (
                            <LoadingTable />
                        )
                        : (
                            <MembersTable
                                members={paginatedMembers}
                                sortOrder={sortOrder}
                                onSortToggle={handleSortToggle}
                            />
                        )
                }

                {/* Only show pagination if we have results to paginate */}
                {filteredMembers.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}

                <AddMemberModal
                    open={isOpen}
                    onClose={() =>
                        setIsOpen(false)
                    }
                    // NEW: Wrap addMember to handle UX state resets
                    addMember={async (member) => {
                        await addMember(member);
                        setCurrentPage(1); // Jump to page 1
                        setSearch("");     // Clear search to guarantee visibility
                    }}
                    members={members}
                />

            </main>
        </div>
    );
}