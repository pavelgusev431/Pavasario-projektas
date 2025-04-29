import { useEffect, useState, useCallback, useMemo } from 'react';
import ProductCard from './ProductCard';
import Tools from './Tools';
import getFilteredProducts from '../helpers/getFilteredProducts';
import BackToTopButton from './buttons/BackToTopButton';
import debounce from 'lodash.debounce';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
    });

    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(12);
    const [priceRange, setPriceRange] = useState(() => {
        try {
            const savedPriceRange = JSON.parse(
                localStorage.getItem('priceRange')
            );
            return savedPriceRange ? savedPriceRange : [0, 5000];
        } catch {
            return [0, 5000];
        }
    });

    const [dateRange, setDateRange] = useState(() => {
        try {
            const savedDateRange = JSON.parse(
                localStorage.getItem('dateRange')
            );
            return savedDateRange
                ? savedDateRange
                : [
                      new Date('2024-01-01').getTime(),
                      new Date().setDate(new Date().getDate() + 1),
                  ];
        } catch {
            return [
                new Date('2024-01-01').getTime(),
                new Date().setDate(new Date().getDate() + 1),
            ];
        }
    });

    const [sortValue, setSortValue] = useState(() => {
        const savedSortValue = localStorage.getItem('sortValue');
        const validSortValues = [
            'timestamp-asc',
            'timestamp-desc',
            'price-asc',
            'price-desc',
            'avgRating-asc',
            'avgRating-desc',
            'name-asc',
            'name-desc',
        ];
        return validSortValues.includes(savedSortValue)
            ? savedSortValue
            : 'timestamp-desc';
    });

    const minDate = new Date('2024-01-01').getTime();
    const maxDate = (() => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.getTime();
    })();

    const fetchProducts = useCallback(
        debounce(async (page = 1) => {
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
                console.log(data);
                console.log(data.products);
                setPagination({
                    currentPage: data.pagination.currentPage,
                    totalPages: data.pagination.totalPages,
                    totalProducts: data.pagination.totalProducts,
                });
            } catch (err) {
                setError('Klaida gaunant produktus: ' + err.message);
            }
        }, 250),
        [pageSize, priceRange, dateRange, sortValue]
    );

    useEffect(() => {
        fetchProducts(pagination.currentPage);
        return () => fetchProducts.cancel();
    }, [fetchProducts, pagination.currentPage]);

    const filteredProducts = useMemo(() => {
        return products.filter(
            (product) =>
                product.price >= priceRange[0] &&
                product.price <= priceRange[1] &&
                new Date(product.timestamp).getTime() >= dateRange[0] &&
                new Date(product.timestamp).getTime() <= dateRange[1]
        );
    }, [products, priceRange, dateRange]);

    useEffect(() => {
        localStorage.setItem('priceRange', JSON.stringify(priceRange));
        localStorage.setItem('dateRange', JSON.stringify(dateRange));
        localStorage.setItem('sortValue', sortValue);
    }, [priceRange, dateRange, sortValue]);

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
    const resetFilters = () => {
        setPriceRange([0, 5000]);
        setDateRange([
            new Date('2024-01-01').getTime(),
            new Date().setDate(new Date().getDate() + 1),
        ]);
        setSortValue('timestamp-asc');
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
                sortValue={sortValue}
                resetFilters={resetFilters}
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
                    className="p-2 border rounded-md"
                >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={18}>18</option>
                    <option value={24}>24</option>
                    <option value={30}>30</option>
                </select>
            </div>

            {/* Produktų rodymas */}

            {error && <p className="text-red-500">{error}</p>}
            {filteredProducts.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                        {filteredProducts.map((product) => (
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
                </div>
            ) : (
                <p>No products available.</p>
            )}

            <BackToTopButton />
        </div>
    );
}
