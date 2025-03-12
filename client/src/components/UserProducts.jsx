import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import ProductCard from './ProductCard';

export default function UserProducts() {
    const { id } = useParams();
    const [userName, setUserName] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("🔍 Gaunamas ID:", id);

        if (!id || isNaN(parseInt(id))) {
            console.error("❌ Netinkamas vartotojo ID formatas:", id);
            setError("Neteisingas naudotojo ID.");
            setLoading(false);
            return;
        }

        const fetchProducts = async () => {
            try {
                
                const productResponse = await axios.get(`http://localhost:3000/products/user/${id}`);
                setProducts(productResponse.data.data);
    
                
                const userResponse = await axios.get(`http://localhost:3000/users/id/${id}`);
                setUserName(userResponse.data.data.username);
            } catch (err) {
                console.error("❌ Klaida gaunant duomenis:", err);
                setError(err.message || 'Nepavyko įkelti duomenų');
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, [id]);
    

    if (loading) return <p>🔄 Kraunama...</p>;
    if (error) return <p className="text-red-500">❌ Klaida: {error}</p>;
    if (products.length === 0) return <p>❌ Produktų nerasta</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{userName}</h2>
            <div className="flex flex-row mt-2 flex-wrap">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
