export default function Modal({
    open,
    onClose,
    children,
}) {

    if (!open) return null;

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
                p-4
            "
        >

            {/* click outside closes modal */}
            <div
                className="absolute inset-0"
                onClick={onClose}
            />

            <div
                className="
                    relative
                    w-full
                    max-w-md
                    rounded-xl
                    bg-white
                    p-6
                    shadow-xl
                    dark:bg-slate-800
                "
            >
                {children}
            </div>

        </div>
    );
}