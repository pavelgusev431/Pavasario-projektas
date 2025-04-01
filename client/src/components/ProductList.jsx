import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Sort from './buttons/Sort';
import BackToTopButton from './buttons/BackToTopButton';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(12);
    const [isSorted, setIsSorted] = useState(false);

    const fetchProducts = async (page = 1) => {
        if (isSorted) return;

        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/products?page=${page}&limit=${pageSize}`
            );
            const data = await response.json();

            if (response.status === 200) {
                setProducts(data.products);
                setPagination({
                    currentPage: data.pagination.currentPage,
                    totalPages: data.pagination.totalPages,
                    totalProducts: data.pagination.totalProducts,
                });
            } else {
                throw new Error(data.message || 'Error fetching products');
            }
        } catch (err) {
            setError('Error fetching products: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [pageSize]);

    useEffect(() => {
        const handleSortedProducts = (event) => {
            const sortedProducts = event.detail;
            setProducts(sortedProducts);
            setIsSorted(true); // Важно!
            setPagination({
                currentPage: 1,
                totalPages: Math.ceil(sortedProducts.length / pageSize),
                totalProducts: sortedProducts.length,
            });
        };

        window.addEventListener('sortedProducts', handleSortedProducts);
        return () => {
            window.removeEventListener('sortedProducts', handleSortedProducts);
        };
    }, [pageSize]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            if (isSorted) {
                setPagination((prev) => ({ ...prev, currentPage: newPage }));
            } else {
                fetchProducts(newPage);
            }
        }
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
    };

    const paginatedProducts = isSorted
        ? products.slice(
              (pagination.currentPage - 1) * pageSize,
              pagination.currentPage * pageSize
          )
        : products;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Product List</h1>

            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label htmlFor="pageSize" className="mr-2">
                    Products per page:
                </label>
                <select
                    id="pageSize"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="p-2 border border-gray-300 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={18}>18</option>
                    <option value={24}>24</option>
                    <option value={30}>30</option>
                </select>
                <Sort />
            </div>

            {products.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                        {paginatedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                avgRating={product.avgRating}
                                ratingCount={product.ratingCount}
                            />
                        ))}
                    </div>
                    {pagination.totalProducts > pageSize && (
                        <div className="mt-6 flex justify-center items-center space-x-2">
                            <button
                                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 ${
                                    pagination.currentPage <= 1
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                onClick={() =>
                                    handlePageChange(pagination.currentPage - 1)
                                }
                                disabled={pagination.currentPage <= 1}
                            >
                                Previous
                            </button>

                            {Array.from(
                                { length: pagination.totalPages },
                                (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`px-4 py-2 text-sm rounded-md ${
                                            pagination.currentPage === index + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200'
                                        } hover:bg-blue-400 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600`}
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                )
                            )}

                            <button
                                className={`px-4 py-2 bg-blue-500 text-white rounded-md dark:bg-blue-800 dark:text-white ${
                                    pagination.currentPage >=
                                    pagination.totalPages
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                onClick={() =>
                                    handlePageChange(pagination.currentPage + 1)
                                }
                                disabled={
                                    pagination.currentPage >=
                                    pagination.totalPages
                                }
                            >
                                Next
                            </button>
                        </div>
                    )}
                    <BackToTopButton />
                </div>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ProductList;
