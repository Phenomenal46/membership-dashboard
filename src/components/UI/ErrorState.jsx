export default function ErrorState({
    message,
}) {

    return (

        <div
            className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                p-6
            "
        >
            <h2
                className="
                    text-lg
                    font-semibold
                    text-red-700
                "
            >
                Failed to load data
            </h2>

            <p className="mt-2">
                {message}
            </p>
        </div>
    );
}