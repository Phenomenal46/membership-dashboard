import { useEffect, useState } from "react";
import { memberApi } from "../services/memberApi";


export default function useMembers() {

    const [members, setMembers] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);


    // Fetch all members from API
    async function fetchMembers() {

        try {

            setLoading(true);
            setError(null);

            const data =
                await memberApi.getMembers();

            setMembers(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }
    }


    // Optimistic member creation
    async function addMember(member) {

        // temporary local member
        const tempMember = {
            ...member,
            id: Date.now(),
        };

        // update UI immediately
        setMembers(prev => [
            tempMember,
            ...prev,
        ]);

        try {

            const createdMember =
                await memberApi.createMember(
                    member
                );

            // replace temp object
            setMembers(prev =>
                prev.map(m =>
                    m.id === tempMember.id
                        ? createdMember
                        : m
                )
            );

            return createdMember;

        } catch (error) {

            // rollback if request fails
            setMembers(prev =>
                prev.filter(
                    m => m.id !== tempMember.id
                )
            );

            throw error;
        }
    }


    useEffect(() => {
        fetchMembers();
    }, []);


    return {
        members,
        loading,
        error,
        addMember,
        fetchMembers,
    };
}