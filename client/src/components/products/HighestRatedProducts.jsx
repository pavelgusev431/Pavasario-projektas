import { getTopRatedProducts } from '../../helpers/getProduct';
import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import { Link } from 'react-router';
export default function HighestRatedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getTopRatedProducts();
                setProducts(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Kraunama...</p>;
    if (error) return <p>Klaida: {error}</p>;

    return (
        <div className="mt-10 w-full">
            <div className="flex flex-row gap-2 mt-5 ml-10">
                <div className="w-2 h-6 bg-red-500"></div>
                <h2 className="text-l text-red-500 font-bold mb-2"></h2>
            </div>
            <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-bold py-2 ml-10">
                    Highest rated products
                </h2>
                <div>
                    <Link to={`/products`}>
                        <button className="bg-red-500 mr-10 hover:bg-red-700 text-white font-bold  rounded py-2 px-4 ">
                            View All Products
                        </button>
                    </Link>
                </div>
            </div>

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
        </div>
    );
}
