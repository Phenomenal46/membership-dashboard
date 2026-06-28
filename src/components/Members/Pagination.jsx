export default function Pagination({
    currentPage,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    setCurrentPage,
}) {

    return (
        <div
            className="
                mt-4
                flex
                flex-col
                items-center
                justify-end
                gap-4
                text-sm
                md:flex-row
            "
        >
            {/* rows selector */}
            <div className="flex items-center gap-3 mr-5">

                <span>Rows per page</span>

                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(
                            Number(e.target.value)
                        );

                        // reset to first page
                        setCurrentPage(1);
                    }}
                    className="
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-3
                        py-2
                        dark:border-slate-700
                        dark:bg-slate-800
                        hover:cursor-pointer
                    "
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>

            </div>

            {/* pagination controls */}
            <div className="flex items-center gap-3">

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    disabled={currentPage === 1}
                    onClick={() =>
                        setCurrentPage(1)
                    }
                    className="
                        rounded
                        border
                        px-3
                        py-2
                        cursor-pointer
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    ≪
                </button>

                <button
                    disabled={currentPage === 1}
                    onClick={() =>
                        setCurrentPage(
                            prev => prev - 1
                        )
                    }
                    className="
                        rounded
                        border
                        px-3
                        py-2
                        cursor-pointer
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    ‹
                </button>

                <button
                    disabled={
                        currentPage === totalPages
                    }
                    onClick={() =>
                        setCurrentPage(
                            prev => prev + 1
                        )
                    }
                    className="
                        rounded
                        border
                        px-3
                        py-2
                        cursor-pointer
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    ›
                </button>

                <button
                    disabled={
                        currentPage === totalPages
                    }
                    onClick={() =>
                        setCurrentPage(totalPages)
                    }
                    className="
                        rounded
                        border
                        px-3
                        py-2
                        cursor-pointer
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    ≫
                </button>

            </div>
        </div>
    );
}