import { FaStar } from 'react-icons/fa';

export default function ProductCard({ product, avgRating, ratingCount }) {
    return (
        <>
            <div className="flex justify-center lg:w-1/4 md:w-1/3 sm:w-1/2 w-full flex-col ">
                <div className="flex flex-col items-center">
                    <div className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-1/2">
                        <img src={product.image_url} alt={product.name} />
                    </div>
                    <h2 className="font-semibold">{product.name}</h2>
                    <div className="flex gap-2">
                        <div className="text-red-500">${product.price}</div>
                        <div className="flex flex-row gap-1">
                            <span className="text-yellow-500 self-center">
                                <FaStar />
                            </span>
                            <span className="text-yellow-500 self-center">
                                <FaStar />
                            </span>
                            <span className="text-yellow-500 self-center">
                                <FaStar />
                            </span>
                            <span className="self-center">
                                <FaStar />
                            </span>
                            <span className="self-center">
                                <FaStar />
                            </span>
                            <span>{avgRating ? avgRating.toFixed(2) : "N/A"}</span>
                            <span className="self-center">({ratingCount})</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
