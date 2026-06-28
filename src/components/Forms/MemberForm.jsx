import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTheme } from "../../context/ThemeContext";

// 1. Define the validation schema using Zod
// This acts as the single source of truth for our form's requirements
const memberSchema = z.object({
    name: z
        .string()
        .trim() // Automatically removes leading/trailing spaces
        .min(3, "Minimum 3 characters required")
        .regex(
            /^[a-zA-Z\s\'-]+$/,
            "Name can only contain alphabets, spaces, hyphens, and apostrophes"
        ),
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address")
        .toLowerCase(), // Normalizes the email for consistent data storage
    membershipType: z.enum(["Basic", "Standard", "Premium"]),
    status: z.enum(["Active", "Inactive"]),
});

export default function MemberForm({ onSubmit, loading }) {
    const { theme } = useTheme();

    // 2. Initialize react-hook-form with the Zod resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(memberSchema),
        defaultValues: {
            name: "",
            email: "",
            membershipType: "Basic",
            status: "Active",
        },
    });

    // 3. Handle the valid submission
    // handleSubmit automatically prevents default (e.preventDefault()) 
    // and only calls this function if Zod validation passes.
    const handleFormSubmit = (data) => {
        onSubmit({
            ...data,
            createdAt: new Date().toISOString(),
        });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            <h2 className="mb-2 text-2xl font-bold">Add a new Member</h2>

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
                    {...register("name")} // This replaces value and onChange
                    className={`
                        w-full rounded-lg border p-3 transition-shadow
                        bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
                    `}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
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
                    {...register("email")}
                    className={`
                        w-full rounded-lg border p-3 transition-shadow
                        bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
                    `}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
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
                    {...register("membershipType")}
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
                    {...register("status")}
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