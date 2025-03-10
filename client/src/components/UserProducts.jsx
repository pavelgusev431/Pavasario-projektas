import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";

function UserProducts() {
    const { id } = useParams(); // Получаем ID пользователя (если есть)
    const [userName, setUserName] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log(`🚀 Запрашиваю товары: http://localhost:3000/products`);
                const response = await axios.get("http://localhost:3000/products");
                console.log("✅ Товары загружены:", response.data);
                setProducts(response.data.data);

                // Загружаем пользователя, если ID есть
                if (id && !isNaN(id)) {
                    console.log(`🚀 Запрашиваю пользователя: http://localhost:3000/users/${id}`);
                    const userResponse = await axios.get(`http://localhost:3000/users/${id}`);
                    console.log("✅ Пользователь загружен:", userResponse.data);
                    setUserName(userResponse.data.data.username);
                }
            } catch (err) {
                console.error("❌ Ошибка при загрузке данных:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-red-500 text-xl font-semibold">{error}</p>
        </div>
    );

    if (products.length === 0) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500 text-xl">❌ Товары не найдены</p>
        </div>
    );

    return (
        <div className="container mx-auto px-6 py-12 max-w-screen-xl">
    {/* Заголовок страницы */}
    <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10 tracking-tight">
        {id ? `${userName} - Товары` : "Все товары"}
    </h2>

    {/* Проверка наличия товаров */}
    {products.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
                <div 
                    key={product.id} 
                    className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
                >
                    {/* Контейнер для изображения с фиксированной высотой */}
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                            src={product.image_url || "https://via.placeholder.com/300"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Контент продукта */}
                    <div className="p-5 flex flex-col flex-grow text-center">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-gray-500 mt-1 text-lg font-medium">{product.price} ₽</p>
                        
                        {/* Кнопка зафиксирована внизу */}
                        <div className="mt-auto">
                            <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300">
                                Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div className="text-center text-gray-500 text-lg mt-10">
            ❌ Товары не найдены.
        </div>
    )}
</div>

    );
}

export default UserProducts;
