import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";

export default function MembersTable({
    members,
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

            <table className="w-full">

                <thead>

                    <tr
                        className="
                            border-b
                            dark:border-slate-700
                        "
                    >
                        <th className="p-4 text-left">
                            Name
                        </th>

                        <th className="p-4 text-left">
                            Email
                        </th>

                        <th className="p-4 text-left">
                            Membership
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>
                    </tr>

                </thead>

                <tbody>

                    {members.map(member => (

                        <tr
                            key={member.id}

                            className="
                                border-b
                                transition
                                hover:bg-gray-50
                                dark:border-slate-700
                                dark:hover:bg-slate-700
                            "
                        >

                            <td className="p-4">
                                {member.name}
                            </td>

                            <td className="p-4">
                                {member.email}
                            </td>

                            <td className="p-4">
                                <StatusBadge
                                    value={
                                        member.membershipType
                                    }
                                    type="membership"
                                />
                            </td>

                            <td className="p-4">
                                <StatusBadge
                                    value={
                                        member.status
                                    }
                                    type="status"
                                />
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}