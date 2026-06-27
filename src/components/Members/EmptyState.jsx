export default function EmptyState() {
    return (
        <div
            className="
                rounded-xl
                border
                border-dashed
                p-12
                text-center
            "
        >
            <div className="text-5xl">
                👥
            </div>

            <h3 className="mt-4 text-xl">
                No members found
            </h3>

            <p className="mt-2 text-gray-500">
                Try changing your search <br/>
                or add a new Member.
            </p>
        </div>
    );
}