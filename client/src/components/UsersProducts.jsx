import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import { Link } from 'react-router-dom';

export default function UsersProducts() {
    const [usersWithProducts, setUsersWithProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsersAndProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products/users');
                console.log("🛒 Ответ от API с товарами:", response);

                // Преобразование данных в формат [ {user, products} ]
                const groupedData = response.data.data.reduce((acc, product) => {
                    const userId = product.User.id;
                    const existingUser = acc.find(user => user.id === userId);

                    if (existingUser) {
                        existingUser.products.push(product);
                    } else {
                        acc.push({
                            id: product.User.id,
                            username: product.User.username,
                            products: [product]
                        });
                    }

                    return acc;
                }, []);

                console.log("✅ Преобразованные данные для отображения:", groupedData);

                setUsersWithProducts(groupedData);
            } catch (err) {
                console.error("❌ Klaida gaunant duomenis:", err.response || err);
                setError(err.message || 'Nepavyko įkelti duomenų');
            } finally {
                setLoading(false);
            }
        };

        fetchUsersAndProducts();
    }, []);

    if (loading) return <p>🔄 Kraunama...</p>;
    if (error) return <p className="text-red-500">❌ Klaida: {error}</p>;

    return (
        <div className="w-full">
        {usersWithProducts.map((user) => (
            <div key={user.id} className="mb-4">
                <div className="flex flex-row gap-2 mt-2 ">
                    <div className="w-2 h-6 bg-red-500"></div>
                    <h2 className="text-l text-red-500 font-bold mb-2">
                        Spotlight
                    </h2>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                    Explore {user.username} products
                </h2>
                <div className="flex flex-wrap flex-row  ">
                    {user.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="text-center">
                    <Link to={`/home/${user.id}`}>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                            View All Products
                        </button>
                    </Link>
                </div>
            </div>
        ))}
    </div>

    );
}
