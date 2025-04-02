import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Tools from './Tools'; 
import getFilteredProducts from '../helpers/getFilteredProducts';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(12);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [dateRange, setDateRange] = useState([
        new Date('2023-01-01').getTime(),
        (() => {
            const today = new Date();
            today.setDate(today.getDate() + 1);
            return today.getTime();
        })(),
    ]);
    const [sortValue, setSortValue] = useState('createdAt-asc'); 

    const minDate = new Date('2023-01-01').getTime();
    const maxDate = (() => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.getTime();
    })();

    const fetchProducts = async (page = 1) => {
        if (isSorted) return;

        setLoading(true);
        try {
            const [sort, order] = sortValue.split('-');
            const data = await getFilteredProducts({
                page,
                limit: pageSize,
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                minDate: new Date(dateRange[0]).toISOString().split('T')[0],
                maxDate: new Date(dateRange[1]).toISOString().split('T')[0],
                sort,
                order: order.toUpperCase(),
            });
            setProducts(data.products);
            setPagination({
                currentPage: data.pagination.currentPage,
                totalPages: data.pagination.totalPages,
                totalProducts: data.pagination.totalProducts,
            });
        } catch (err) {
            setError('Error fetching products: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(pagination.currentPage);
    }, [pageSize, priceRange, dateRange, sortValue, pagination.currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination({ ...pagination, currentPage: newPage });
        }
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
        setPagination({ ...pagination, currentPage: 1 });
    };

    const handleSortChange = (newSortValue) => {
        setSortValue(newSortValue);
        setPagination({ ...pagination, currentPage: 1 });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Product List</h1>

            {/* Įrankių juosta */}
            <Tools
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                dateRange={dateRange}
                setDateRange={setDateRange}
                minDate={minDate}
                maxDate={maxDate}
                onSortChange={handleSortChange}
            />

            {/* Puslapio dydžio pasirinkimas */}
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
                
            </div>

            {/* Produktų rodymas */}
            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {products.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                        {products.map((product) => (
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
                                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
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
                                        } hover:bg-blue-400`}
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                )
                            )}

                            <button
                                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                                    pagination.currentPage >= pagination.totalPages
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                onClick={() =>
                                    handlePageChange(pagination.currentPage + 1)
                                }
                                disabled={
                                    pagination.currentPage >= pagination.totalPages
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
}