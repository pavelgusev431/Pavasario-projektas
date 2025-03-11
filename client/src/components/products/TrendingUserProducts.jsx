import { getTrendingUserProducts } from "../../helpers/getProduct";
import { getUserById } from '../../helpers/getUser.js';
import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import { Link } from 'react-router';
export default function TrendingUserProducts() {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getTrendingUserProducts();
                setProducts(response.data.data);
                
                
                const userId = response.data.user_id;
                
                // Gauname vartotojo vardą pagal user_id
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
    if (error) return <p>Klaida: {error}</p>;

    return (
        <div className="w-full">
            <div className="flex flex-row gap-2 mt-2 ">
                <div className="w-2 h-6 bg-red-500"></div>
                <h2 className="text-l text-red-500 font-bold mb-2">Trending user</h2>
            </div>
            <h2 className="text-2xl font-bold mb-2">Trending {userName} products</h2>
            <div className="flex flex-wrap flex-row">
                {products.map((product) => (
                    <ProductCard 
                    key={product.id} 
                    product={product}
                    avgRating={product.avgRating} 
                    ratingCount={product.ratingCount} 
                    />
                ))}
            </div>
            <div className="text-center">
                        <Link to={`/home/`}>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                                View All Products
                            </button>
                        </Link>
                    </div>
        </div>
    );
}