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
            className="space-y-5" // Slightly increased spacing for better breathing room
        >
            <h2 className="text-2xl font-bold mb-2">
                Add a new Member
            </h2>

            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Full Name
                </label>
                <input
                    id="name"
                    placeholder="e.g. Jane Doe"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={`
                        w-full rounded-lg border p-3
                        bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600
                        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow
                        ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
                    `}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={`
                        w-full rounded-lg border p-3
                        bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600
                        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow
                        ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
                    `}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            {/* Membership Field */}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="membershipType"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Membership Tier
                </label>
                <select
                    id="membershipType"
                    value={form.membershipType}
                    onChange={(e) => updateField("membershipType", e.target.value)}
                    style={{ colorScheme: theme === "dark" ? "dark" : "light" }}
                    className="
                        w-full rounded-lg border border-gray-300 p-3
                        bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow
                        dark:border-slate-600 dark:bg-slate-700/50 dark:text-white
                        hover:cursor-pointer
                    "
                >
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                </select>
            </div>

            {/* Status Field */}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Account Status
                </label>
                <select
                    id="status"
                    value={form.status}
                    onChange={(e) => updateField("status", e.target.value)}
                    style={{ colorScheme: theme === "dark" ? "dark" : "light" }}
                    className="
                        w-full rounded-lg border border-gray-300 p-3
                        bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow
                        dark:border-slate-600 dark:bg-slate-700/50 dark:text-white
                        hover:cursor-pointer
                    "
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="
                    mt-2 w-full rounded-lg bg-black py-3 text-white font-medium
                    transition-colors disabled:opacity-50 hover:bg-gray-800   
                    hover:cursor-pointer dark:hover:bg-gray-700
                "
            >
                {loading ? "Adding Member..." : "Add Member"}
            </button>
        </form>
    );
}