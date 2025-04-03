import { Link } from 'react-router';
import { FaStar, FaStarHalf } from 'react-icons/fa';

export default function ProductCard({ product, avgRating, ratingCount }) {
    return (
        <Link
            to={`/products/selected/${product.id}`}
            className="no-underline text-black"
        >
            <div className="bg-white dark:bg-transparent rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:animate-ease-in hover:animate-duration-300 transition-shadow p-4 flex flex-col items-center">
                <div className="w-full h-48 overflow-hidden">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="mx-auto h-full object-cover rounded-md"
                    />
                </div>
                <h2 className="font-semibold text-lg mt-3 text-center dark:text-white">
                    {product.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-red-500 text-lg font-bold">
                        ${product.price}
                    </span>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => {
                            if (i < Math.floor(avgRating)) {
                                return (
                                    <FaStar
                                        key={i}
                                        className="text-yellow-500"
                                    />
                                );
                            } else if (
                                i === Math.floor(avgRating) &&
                                avgRating % 1 !== 0
                            ) {
                                return (
                                    <FaStarHalf
                                        key={i}
                                        className="text-yellow-500"
                                    />
                                );
                            } else {
                                return (
                                    <FaStar key={i} className="text-gray-300" />
                                );
                            }
                        })}
                        <span className="text-gray-600 text-sm">
                            ({ratingCount || 0})
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
