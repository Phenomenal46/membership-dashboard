import Navbar from "../components/Navbar/Navbar";
import AnalyticsCards from "../components/Dashboard/AnalyticsCards";
import SearchBar from "../components/Members/SearchBar";
import MembersTable from "../components/Members/MembersTable";
import LoadingTable from "../components/Members/LoadingTable";
import AddMemberModal from "../components/Forms/AddMemberModal";

import useMembers from "../hooks/useMembers";
import { useState, useMemo } from "react";

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
    const [isOpen, setIsOpen] = useState(false);

    // instant search by name/email
    const filteredMembers = useMemo(() => {
        const query = search.toLowerCase();

        return members.filter(member => {
            return (
                member.name
                    .toLowerCase()
                    .includes(query)

                ||

                member.email
                    .toLowerCase()
                    .includes(query)
            );
        });

    }, [members, search]);

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

                {loading && (
                    <p>
                        Loading dashboard...
                    </p>
                )}

                {error && (
                    <p>
                        {error}
                    </p>
                )}

                {!loading && (
                    <AnalyticsCards
                        analytics={analytics}
                    />
                )}

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
                                members={filteredMembers}
                            />
                        )
                }

                <AddMemberModal
                    open={isOpen}
                    onClose={() =>
                        setIsOpen(false)
                    }
                    addMember={addMember}
                />

            </main>
        </div>
    );
}