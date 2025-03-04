import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProductCard from './ProductCard';
import { getUserById } from '../helpers/getUser.js';
import { getProductById } from '../helpers/getProduct.js';

export default function UserProducts() {
    const { id } = useParams();
    const [userName, setUserName] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = getProductById(id);
                setProducts(response.data.data);
                const userResponse = getUserById(id);
                setUserName(userResponse.data.data.username);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id]);

    if (loading) return <p>Kraunama...</p>;
    if (error) return <p>Klaida: {error}</p>;
    if (products.length === 0) return <p>Produktų nerasta</p>;

    return (
        <div>
            <h2>{userName}</h2>
            <div>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
