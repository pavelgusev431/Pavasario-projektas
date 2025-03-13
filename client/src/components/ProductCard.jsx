import { FaStar } from "react-icons/fa";

export default function ProductCard({ product, avgRating, ratingCount }) {
    return (
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:animate-ease-in hover:animate-duration-600 w-1/4 transition-shadow p-4 flex flex-col items-center">
            <div className="w-full h-48 overflow-hidden">
                <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="mx-auto h-full object-cover rounded-md"
                />
            </div>
            <h2 className="font-semibold text-lg mt-3 text-center">{product.name}</h2>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-red-500 text-lg font-bold">${product.price}</span>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < avgRating ? "text-yellow-500" : "text-gray-300"} />
                    ))}
                    <span className="text-gray-600 text-sm">({ratingCount || 0})</span>
                </div>
            </div>
        </div>
    );
}