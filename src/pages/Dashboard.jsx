import Navbar from "../components/Navbar/Navbar";
import AnalyticsCards from "../components/Dashboard/AnalyticsCards";
import SearchBar from "../components/Members/SearchBar";
import MembersTable from "../components/Members/MembersTable";
import LoadingTable from "../components/Members/LoadingTable";

import useMembers from "../hooks/useMembers";
import { useState,useMemo } from "react";

import { calculateAnalytics } from "../utils/analytics";


export default function Dashboard() {

    const {
        members,
        loading,
        error,
    } = useMembers();

    const analytics =
        calculateAnalytics(members);

    const [search, setSearch] = useState("");

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

                <section className="mb-6">

                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                    />

                </section>

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

            </main>
        </div>
    );
}