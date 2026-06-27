import {
    FiUsers,
    FiDollarSign,
    FiUserPlus,
    FiActivity,
} from "react-icons/fi";

import StatCard from "./StatCard";

export default function AnalyticsCards({
    analytics,
}) {

    return (
        <section
            className="
                mb-8
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-4
            "
        >
            <StatCard
                title="Active Members"
                value={analytics.activeMembers}
                icon={<FiUsers />}
            />

            <StatCard
                title="Revenue"
                value={`$${analytics.revenue}`}
                icon={<FiDollarSign />}
            />

            <StatCard
                title="New Signups"
                value={analytics.newSignups}
                icon={<FiUserPlus />}
            />

            <StatCard
                title="Total Members"
                value={analytics.totalMembers}
                icon={<FiActivity />}
            />
        </section>
    );
}