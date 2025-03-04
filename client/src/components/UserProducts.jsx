import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import ProductCard from './ProductCard';

export default function UserProducts() {
    const { id } = useParams();
    const [userName, setUserName] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/products/${id}`
                );
                setProducts(response.data.data);

                const userResponse = await axios.get(
                    `http://localhost:3000/users/${id}`
                );

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
      <h2 className="text-2xl font-bold mb-2">{userName}</h2>
      <div className="flex flex-row  mt-2 flex-wrap">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};