import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

export default function UsersProducts() {
    const [usersWithProducts, setUsersWithProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsersAndProducts = async () => {
            try {
                // 🔹 Загружаем пользователей
                const usersResponse = await axios.get('http://localhost:3000/users');
                console.log("Ответ API /users:", usersResponse.data);

                const users = usersResponse.data?.data;
                
                if (!Array.isArray(users)) {
                    throw new Error("Ошибка: API /users вернул некорректные данные!");
                }

                // 🔹 Фильтруем пользователей с корректными ID
                const validUsers = users.filter(user => user.id && !isNaN(user.id));

                // 🔹 Загружаем товары для каждого пользователя
                const usersWithProductsPromises = validUsers.map(async (user) => {
                    console.log(`Запрос к /products/${user.id}`);
                    try {
                        const productsResponse = await axios.get(
                            `http://localhost:3000/products/${user.id}`
                        );
                        return { ...user, products: productsResponse.data?.data || [] };
                    } catch (error) {
                        console.error(`Ошибка при загрузке продуктов для ID ${user.id}:`, error.message);
                        return { ...user, products: [] };
                    }
                });

                // 🔹 Дожидаемся всех запросов
                const usersWithProductsData = await Promise.all(usersWithProductsPromises);
                
                // 🔹 Фильтруем пользователей, у которых есть товары
                setUsersWithProducts(usersWithProductsData.filter(user => user.products.length > 0));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersAndProducts();
    }, []);

    if (loading) return <p className="text-center text-lg font-semibold mt-6">🔄 Загрузка...</p>;
    if (error) return <p className="text-center text-red-500 text-lg font-semibold mt-6">❌ Ошибка: {error}</p>;

    return (
        <div className="container mx-auto px-4 mt-8">
            {usersWithProducts.map((user) => (
                <div key={user.id} className="mb-10">
                    {/* Имя пользователя */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{user?.username || "Неизвестный пользователь"}</h2>
                    
                    {/* Контейнер для товаров */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {user?.products?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
