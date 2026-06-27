import Navbar from "../components/Navbar/Navbar";
import AnalyticsCards from "../components/Dashboard/AnalyticsCards";

import useMembers from "../hooks/useMembers";

import { calculateAnalytics }
from "../utils/analytics";


export default function Dashboard() {

    const {
        members,
        loading,
        error,
    } = useMembers();

    const analytics =
        calculateAnalytics(members);

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

            </main>
        </div>
    );
}