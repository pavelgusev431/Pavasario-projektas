import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProductCard from './ProductCard';
import { getUserByUsername } from '../helpers/getUser.js';
import { getUserProductsByUserName } from '../helpers/getProduct.js';
import BackToTopButton from './buttons/BackToTopButton.jsx';

export default function UserProducts() {
    const { username } = useParams();

    const [userName, setUserName] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
    });

    const [pageSize, setPageSize] = useState(8);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getUserProductsByUserName(username);
                const allProducts = response.data.data;

                setProducts(allProducts);
                setPagination({
                    currentPage: 1,
                    totalPages: Math.ceil(allProducts.length / pageSize),
                    totalProducts: allProducts.length,
                });

                const userResponse = await getUserByUsername(username);
                setUserName(userResponse.data.data.username);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [username]);

    useEffect(() => {
        // Perkaičiuojam puslapius kai keičiasi kiekis per puslapį arba produktai
        setPagination((prev) => ({
            ...prev,
            currentPage: 1,
            totalPages: Math.ceil(products.length / pageSize),
        }));
    }, [pageSize, products]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({ ...prev, currentPage: newPage }));
        }
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
    };

    const indexOfLastProduct = pagination.currentPage * pageSize;
    const indexOfFirstProduct = indexOfLastProduct - pageSize;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    if (loading) return <p>Kraunama...</p>;
    if (error) return <p>Klaida: {error}</p>;
    if (products.length === 0) return <p>Produktų nerasta</p>;

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-row gap-2 mt-5 ml-2 md:ml-10">
                <div className="w-2 h-6 bg-red-500"></div>
                <h2 className="text-l text-red-500 font-bold mb-2"></h2>
            </div>

            <h2 className="text-2xl font-bold ml-2 md:ml-10 mt-2 mb-4">
                {userName} produktai
            </h2>

            {/* Rodymo kiekio pasirinkimas */}
            <div className="mb-4 ml-2 md:ml-10">
                <label htmlFor="pageSize" className="mr-2 font-medium">
                    Produktų per puslapį:
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

            {/* Produktų tinklelis */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        avgRating={product.avgRating}
                        ratingCount={product.ratingCount}
                    />
                ))}
            </div>

            {/* Puslapiavimas */}
            {pagination.totalPages > 1 && (
                <div className="mt-6 flex justify-center items-center space-x-2">
                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                            pagination.currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage <= 1}
                    >
                        Previous
                    </button>

                    {Array.from({ length: pagination.totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`px-4 py-2 text-sm rounded-md ${
                                pagination.currentPage === index + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200'
                            } hover:bg-blue-400`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                            pagination.currentPage >= pagination.totalPages
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                        }`}
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage >= pagination.totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            <BackToTopButton />
        </div>
    );
}
