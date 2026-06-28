import { useEffect, useRef } from "react";

export default function Modal({
    open,
    onClose,
    children,
}) {
    // Reference to the modal container for the focus trap
    const modalRef = useRef(null);

    // Feature 1: Lock Body Scroll
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup: Ensure scroll is restored if component unmounts unexpectedly
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    // Feature 2: Focus Trap & Escape Key
    useEffect(() => {
        if (!open) return;

        const modalElement = modalRef.current;
        if (!modalElement) return;

        // Find all elements inside the modal that can be focused
        const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Auto-focus the first input when modal opens for a snappy UX
        if (firstElement) {
            firstElement.focus();
        }

        function handleKeyDown(e) {
            // Close modal on 'Escape' key
            if (e.key === "Escape") {
                onClose();
                return;
            }

            if (e.key !== "Tab") return;

            // Handle Shift + Tab (navigating backward)
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                // Handle standard Tab (navigating forward)
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }

        // Listen for key presses
        document.addEventListener("keydown", handleKeyDown);

        // Cleanup listener when modal closes
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    // We moved the early return down here because React Hooks (useEffect) 
    // must always be called at the top level before any returns.
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
                ref={modalRef}
                // Added ARIA attributes for professional accessibility
                role="dialog"
                aria-modal="true"
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