import { MEMBERSHIP_PRICING } from "./constants";

export function calculateAnalytics(members = []) {

    const activeMembers =
        members.filter(
            member => member.status === "Active"
        ).length;

    const totalMembers = members.length;

    const revenue =
        members.reduce((total, member) => {
            return (
                total +
                (MEMBERSHIP_PRICING[
                    member.membershipType
                ] || 0)
            );
        }, 0);

    const today = new Date().toDateString();

    const newSignups =
        members.filter(member => {

            if (!member.createdAt)
                return false;

            return (
                new Date(
                    member.createdAt
                ).toDateString() === today
            );

        }).length;

    return {
        activeMembers,
        revenue,
        newSignups,
        totalMembers,
    };
}