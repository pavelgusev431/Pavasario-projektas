export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Jei pardaveju maziau nei 5 arba tik 5 , tada nerodoma paginationas
    if (totalItems <= itemsPerPage) {
        return null;
    }

    return (
        <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`mx-1 px-4 py-2 rounded ${
                        currentPage === i + 1
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}
