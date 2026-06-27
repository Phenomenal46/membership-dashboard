export default function LoadingTable() {

    return (
        <div className="animate-pulse">

            {[...Array(5)].map((_, i) => (

                <div
                    key={i}
                    className="
                        mb-3
                        h-14
                        rounded
                        bg-gray-200
                        dark:bg-slate-700
                    "
                />

            ))}

        </div>
    );
}