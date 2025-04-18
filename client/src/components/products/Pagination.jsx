import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    
        return (
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                >
                    Previous
                </button>
                
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        {page}
                    </button>
                ))}
                
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                >
                    Next
                </button>
            </div>
        );
    };
    
    export default Pagination;
