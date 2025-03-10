import React from "react";

function ProductCard({ product }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 max-w-xs">
            {/* Изображение продукта */}
            <div className="h-56 bg-gray-100 flex justify-center items-center">
                <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                />
            </div>

            {/* Информация о товаре */}
            <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                <p className="text-orange-600 text-lg font-bold mt-2">${product.price.toFixed(2)}</p>

                {/* Кнопка */}
                <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
