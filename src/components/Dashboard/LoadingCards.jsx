export default function LoadingCards() {

    return (
        <div
            className="
                mb-8
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-4
                animate-pulse
            "
        >
            {[...Array(4)].map((_, i) => (

                <div
                    key={i}
                    className="
                        h-32
                        rounded-xl
                        bg-gray-200
                        dark:bg-slate-700
                    "
                />

            ))}
        </div>
    );
}