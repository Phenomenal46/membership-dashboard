import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function MemberForm({
    onSubmit,
    loading,
}) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        membershipType: "Basic",
        status: "Active",
    });

    const [errors, setErrors] = useState({});
    const { theme } = useTheme();

    function validate() {

        const newErrors = {};

        // minimum validation rules
        if (form.name.trim().length < 3)
            newErrors.name =
                "Minimum 3 characters";

        if (
            !/\S+@\S+\.\S+/.test(
                form.email
            )
        ) {
            newErrors.email =
                "Invalid email";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors)
                .length === 0
        );
    }


    function handleSubmit(e) {

        e.preventDefault();

        if (!validate())
            return;

        onSubmit({
            ...form,
            createdAt:
                new Date().toISOString(),
        });
    }


    function updateField(
        field,
        value
    ) {
        setForm(prev => ({
            ...prev,
            [field]: value,
        }));
    }


    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <h2
                className="
                    text-2xl
                    font-bold
                "
            >
                Add a new Member
            </h2>

            {/* name */}
            <div>

                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) =>
                        updateField(
                            "name",
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        rounded-lg
                        border
                        p-3
                    "
                />

                {errors.name && (
                    <p
                        className="
                            mt-1
                            text-sm
                            text-red-500
                        "
                    >
                        {errors.name}
                    </p>
                )}

            </div>

            {/* email */}
            <div>

                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        updateField(
                            "email",
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        rounded-lg
                        border
                        p-3
                    "
                />

                {errors.email && (
                    <p
                        className="
                            mt-1
                            text-sm
                            text-red-500
                        "
                    >
                        {errors.email}
                    </p>
                )}

            </div>

            {/* membership */}
            <select
                value={
                    form.membershipType
                }
                onChange={(e) =>
                    updateField(
                        "membershipType",
                        e.target.value
                    )
                }
                // tell browser to render native dropdown in dark mode
                style={{
                    colorScheme:
                        theme === "dark"
                            ? "dark"
                            : "light",
                }}

                className="
                    w-full
                    rounded-lg
                    border
                    p-3
                    dark:border-slate-600
                    dark:bg-slate-700
                    dark:text-white
                    hover:cursor-pointer
                "
            >
                <option>
                    Basic
                </option>

                <option>
                    Standard
                </option>

                <option>
                    Premium
                </option>
            </select>

            {/* status */}
            <select
                value={form.status}
                onChange={(e) =>
                    updateField(
                        "status",
                        e.target.value
                    )
                }
                style={{
                    colorScheme:
                        theme === "dark"
                            ? "dark"
                            : "light",
                }}

                className="
                    w-full
                    rounded-lg
                    border
                    p-3
                    dark:border-slate-600
                    dark:bg-slate-700
                    dark:text-white
                    hover:cursor-pointer
                "
            >
                <option>
                    Active
                </option>

                <option>
                    Inactive
                </option>
            </select>

            <button
                disabled={loading}
                className="
                    w-full
                    rounded-lg
                    bg-black
                    py-3
                    text-white
                    disabled:opacity-50
                    hover:bg-gray-800   
                    hover:cursor-pointer
                    dark:hover:bg-gray-700
                "
            >
                {
                    loading
                        ? "Adding..."
                        : "Add Member"
                }
            </button>

        </form>
    );
}