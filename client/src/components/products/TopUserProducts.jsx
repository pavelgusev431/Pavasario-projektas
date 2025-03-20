import { getTopUserProducts } from '../../helpers/getProduct';
import { getUserById } from '../../helpers/getUser.js';
import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import { Link } from 'react-router';

export default function TopUserProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
    const [noUser, setNoUser] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getTopUserProducts();

                if (response.data.data.length === 0) {
                    setNoUser(true);
                    return;
                }

                setProducts(response.data.data);

                const userId = response.data.user_id;

                if (userId) {
                    setUserId(userId);
                }

                if (userId) {
                    const userResponse = await getUserById(userId);
                    setUserName(userResponse.data.data.username);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Kraunama...</p>;
    if (error) return <p className="text-red-500 font-bold">Klaida: {error}</p>;

    return (
        <div className="w-full mt-10">
            <div className="flex ml-10 flex-row gap-2 mt-2">
                <div className="w-2 h-6 bg-red-500"></div>
                <h2 className="text-l text-red-500 font-bold mb-2">
                    {' '}
                    Top user
                </h2>
            </div>
            <h2 className="text-2xl ml-10 font-bold mb-2">
                {noUser ? 'No Top Users' : `Top ${userName} products`}
            </h2>
            {noUser ? (
                <p className="text-gray-500 text-center">
                    Currently, no users are top. Check back later!
                </p>
            ) : (
                <>
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
                    <div className="text-center mt-4">
                        <Link to={`/products/u/${userName}`}>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                View All Products
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
