import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { getUserByUsername } from '../../helpers/getUser.js';
import { getUserProductsByUserName } from '../../helpers/getProduct.js';
import RatedProductsByUserName from './RatedProductsByUserName.jsx';
import moment from 'moment';
export default function PublicUserProfile() {
    const { username } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [avgUserRating, setAvgUserRating] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getUserProductsByUserName(username);
                setProducts(response.data.data);
                setAvgUserRating(response.data.avgUserRating);

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
        <>
            <header className="py-6 px-6 bg-gray-100 rounded-lg shadow-lg">
                <div className="max-w-4xl  flex items-center space-x-6">
                    <div className="flex-shrink-0">
                        <img
                            src={
                                user.image_url ||
                                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                            }
                            alt={user.username}
                            className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 flex items-center justify-center"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                            {user.username}
                        </h1>
                        <p className="text-lg text-gray-600">
                            Average User Rating:
                            <span className="font-bold text-yellow-500">
                                {avgUserRating || 'N/A'}
                            </span>
                        </p>
                    </div>
                </div>
            </header>

            <section className="py-6 px-6 bg-gray-50 rounded-lg shadow-lg mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    User Information
                </h2>
                <div className="space-y-4">
                    <div>
                        <p className="text-lg font-medium text-gray-700">
                            <span className="font-semibold text-gray-800">
                                Email:
                            </span>{' '}
                            {user.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-700">
                            <span className="font-semibold text-gray-800">
                                Description:
                            </span>{' '}
                            {user.description}
                        </p>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-700">
                            <span className="font-semibold text-gray-800">
                                Contacts:
                            </span>{' '}
                            {user.contacts}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-8 px-4">
                <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 border-b pb-4">
                    Products Rated by Others for Me
                </h2>
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products
                            .filter((product) => product.comments.length > 0)
                            .map((product) => (
                                <div
                                    key={`+${product.id}`}
                                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="overflow-hidden rounded-t-lg flex justify-center">
                                        <Link
                                            to={`/products/selected/${product.id}`}
                                        >
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-auto h-56 object-cover"
                                            />
                                        </Link>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-2">
                                            {[...Array(5)].map((_, i) => {
                                                if (
                                                    i <
                                                    Math.floor(
                                                        product.avgRating
                                                    )
                                                ) {
                                                    return (
                                                        <FaStar
                                                            key={i}
                                                            className="text-yellow-500"
                                                        />
                                                    );
                                                } else if (
                                                    i ===
                                                        Math.floor(
                                                            product.avgRating
                                                        ) &&
                                                    product.avgRating % 1 !== 0
                                                ) {
                                                    return (
                                                        <FaStarHalf
                                                            key={i}
                                                            className="text-yellow-500"
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <FaStar
                                                            key={i}
                                                            className="text-gray-300"
                                                        />
                                                    );
                                                }
                                            })}
                                            <span className="text-sm text-gray-600">
                                                ({product.comments.length})
                                            </span>
                                        </div>

                                        <h4 className="mt-4 font-semibold text-lg text-gray-700">
                                            Comments
                                        </h4>
                                        <div className="space-y-4 mt-2">
                                            {product.comments.map(
                                                (comment, index) => (
                                                    <div
                                                        key={index}
                                                        className="border-t pt-4"
                                                    >
                                                        <p className="text-gray-500 text-xs mt-1">
                                                            {moment(
                                                                comment.timestamp
                                                            ).format('lll')}
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-800">
                                                            <span className="font-semibold">
                                                                {
                                                                    comment.username
                                                                }
                                                            </span>
                                                            : {comment.comment}
                                                        </p>
                                                        <div className="flex items-center mt-1 text-yellow-500">
                                                            {[
                                                                ...Array(
                                                                    comment.stars
                                                                ),
                                                            ].map((_, i) => (
                                                                <FaStar
                                                                    key={i}
                                                                    className="text-yellow-500"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">
                        No products with comments found.
                    </p>
                )}
            </section>
            <RatedProductsByUserName />
        </>
    );
}
