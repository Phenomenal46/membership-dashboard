export default function StatusBadge({
    value,
    type,
}) {

    let classes = "";

    if (type === "status") {

        classes =
            value === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700";
    }

    if (type === "membership") {

        switch (value) {

            case "Premium":
                classes =
                    "bg-purple-100 text-purple-700";
                break;

            case "Standard":
                classes =
                    "bg-blue-100 text-blue-700";
                break;

            default:
                classes =
                    "bg-gray-100 text-gray-700";
        }
    }

    return (
        <span
            className={`
                rounded-full
                px-3
                py-1
                text-sm
                font-medium
                ${classes}
            `}
        >
            {value}
        </span>
    );
}