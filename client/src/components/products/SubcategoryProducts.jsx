import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import getSubcategoryProducts from '../../helpers/getSubcategoryProducts';

const SubcategoryProducts = () => {
    const { subcategoryId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [subcategory, setSubcategory] = useState({});
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noProducts, setNoProducts] = useState(false);

    const initialSort = searchParams.get('sort') || 'timestamp-desc';
    const initialPage = parseInt(searchParams.get('page') || '1');

    const [sortValue, setSortValue] = useState(initialSort);
    const [page, setPage] = useState(initialPage);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const [sort, order] = sortValue.split('-');

                const response = await getSubcategoryProducts(subcategoryId, {
                    page,
                    limit: 8,
                    sort,
                    order,
                });

                if (response.products.length === 0) {
                    setNoProducts(true);
                } else {
                    setProducts(response.products);
                    setSubcategory({ name: response.subcategoryName });
                    setPagination(response.pagination);
                    setNoProducts(false);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [subcategoryId, sortValue, page]);

    const handleSortChange = (value) => {
        setSortValue(value);
        setPage(1);
        setSearchParams({ sort: value, page: 1 });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setSearchParams({ sort: sortValue, page: newPage });
    };

    if (noProducts) {
        return (
            <div className="text-center text-lg text-gray-500">
                No products found in this subcategory
            </div>
        );
    }

    if (isLoading)
        return <div className="text-center text-lg">Loading products...</div>;

    return (
        <div className="mt-10 w-full">
            <div className="flex items-center justify-between px-10 mb-4">
                <h2 className="text-2xl font-bold">
                    Products in: {subcategory.name}
                </h2>

                <div className="flex items-center">
                    <label
                        htmlFor="sort"
                        className="mr-2 text-sm font-medium text-gray-700"
                    >
                        Sort by:
                    </label>
                    <select
                        id="sort"
                        value={sortValue}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="timestamp-desc">Newest</option>
                        <option value="timestamp-asc">Oldest</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="avgRating-desc">
                            Rating (High to Low)
                        </option>
                        <option value="avgRating-asc">
                            Rating (Low to High)
                        </option>
                        <option value="name-asc">Name (A–Z)</option>
                        <option value="name-desc">Name (Z–A)</option>
                    </select>
                </div>
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}

            {products.length === 0 ? (
                <p className="text-gray-500 text-center">
                    No products available for this category
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            avgRating={product.avgRating}
                            ratingCount={product.ratingCount}
                        />
                    ))}
                </div>
            )}

            {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {[...Array(pagination.totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            onClick={() => handlePageChange(num + 1)}
                            className={`px-3 py-1 rounded ${
                                page === num + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200'
                            }`}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubcategoryProducts;
