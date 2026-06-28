import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "../UI/Modal";
import MemberForm from "./MemberForm";

export default function AddMemberModal({
    open,
    onClose,
    addMember,
    members,
}) {

    const [loading, setLoading] =
        useState(false);


    async function handleSubmit(
        member
    ) {

        try {

            setLoading(true);

            await addMember(
                member
            );

            toast.success(
                "Member added"
            );

            onClose();

        } catch {

            toast.error(
                "Failed to add member"
            );

        } finally {

            setLoading(false);

        }
    }

    // Extract emails for validation
    const existingEmails = members.map(m => m.email.toLowerCase());

    return (

        <Modal
            open={open}
            onClose={onClose}
        >

            <MemberForm
                loading={loading}
                onSubmit={
                    handleSubmit
                }
                existingEmails={existingEmails}
            />

        </Modal>
    );
}