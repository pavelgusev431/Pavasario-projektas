import { FaStar } from 'react-icons/fa';

function ProductCard({ product }) {
    return (
        <div className="flex justify-center w-full lg:w-1/4 md:w-1/3 sm:w-1/2 p-1">
            <div className="flex flex-col items-center bg-white rounded-lg transition-transform transform hover:scale-105 p-1">

                {/* Изображение продукта (удалена рамка) */}
                <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-lg overflow-hidden">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-contain w-full h-full"
                    />
                </div>

                {/* Название продукта */}
                <h2 className="font-semibold text-gray-800 text-center text-sm md:text-md lg:text-lg mt-3 leading-5">
                    {product.name}
                </h2>

                {/* Цена и рейтинг */}
                <div className="flex flex-col items-center mt-2">
                    <div className="text-red-500 font-bold text-lg md:text-md">
                        ${Number(product.price).toLocaleString()}
                    </div>

                    {/* Рейтинг */}
                    <div className="flex gap-1 mt-1">
                        {Array(3).fill(0).map((_, i) => (
                            <span key={i} className="text-yellow-500">
                                <FaStar />
                            </span>
                        ))}
                        {Array(2).fill(0).map((_, i) => (
                            <span key={i + 3} className="text-gray-400">
                                <FaStar />
                            </span>
                        ))}
                        <span className="text-gray-500 text-sm">(35)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
