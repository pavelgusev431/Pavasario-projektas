import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { getUserByUsername } from '../../helpers/getUser.js';
import { getRatedProductsByUserName } from '../../helpers/getProduct';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { FaStar } from 'react-icons/fa';
export default function RatedProductsByUserName() {
    const { username } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getRatedProductsByUserName(username);
                setProducts(response.data.data);

                const userResponse = await getUserByUsername(username);
                setUser(userResponse.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>User not found</p>;
    return (
        <section className="px-4 bg-white shadow-lg rounded-2xl">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 border-b pb-4">
                Products Rated by {user.username}
            </h2>
            {products.length > 0 ? (
                <div className="mt-6 space-y-6">
                    {products.map((product) => (
                        <div
                            key={nanoid(64)}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4"
                        >
                            <h2 className="text-lg font-bold flex items-center gap-3 text-gray-800">
                                <Link
                                    to={`/products/selected/${product.id}`}
                                    className="hover:text-blue-600 transition duration-300"
                                >
                                    {product.name}
                                </Link>
                                <div className="flex items-center">
                                    {[...Array(product.userRating)].map(
                                        (_, i) => (
                                            <FaStar
                                                key={i}
                                                className="text-yellow-500"
                                            />
                                        )
                                    )}
                                </div>
                            </h2>
                            <div className="text-gray-500 text-sm mt-1">
                                {moment(product.timestamp).format('lll')}
                            </div>
                            <p className="mt-3 text-gray-700">
                                {product.userComment}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-6">
                    No rated products.
                </p>
            )}
        </section>
    );
}
