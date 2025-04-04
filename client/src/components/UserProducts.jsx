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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getUserProductsByUserName(username);
                setProducts(response.data.data);

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

    if (loading) return <p>Kraunama...</p>;
    if (error) return <p>Klaida: {error}</p>;
    if (products.length === 0) return <p>Produktų nerasta</p>;

    return (
        <div>
            <div className="flex flex-row gap-2 mt-5 ml-10">
                <div className="w-2 h-6 bg-red-500"></div>
                <h2 className="text-l text-red-500 font-bold mb-2"></h2>
            </div>
            <h2 className="text-2xl font-bold ml-10 mt-2 mb-2">
                {userName} Products
            </h2>
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
            <BackToTopButton/>
        </div>
    );
}
