import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Modal from 'react-modal';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/selected/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div className="text-gray-800 dark:text-gray-200 text-center mt-10 text-xl">Loading...</div>;

    const stockStatus = product.amount_in_stock > 5 
        ? { text: 'In Stock', className: 'text-green-500 dark:text-green-400' }
        : product.amount_in_stock > 0 
        ? { text: 'Low in stock', className: 'text-yellow-500 dark:text-yellow-400' }
        : { text: 'Out of stock', className: 'text-red-500 dark:text-red-400' };

    // Functions for zooming the image
    const handleMouseEnter = (e) => {
        e.target.style.transform = 'scale(1.5)';
        e.target.style.transition = 'transform 0.3s ease';
    };

    const handleMouseLeave = (e) => {
        e.target.style.transform = 'scale(1)';
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        e.target.style.transformOrigin = `${x}% ${y}%`;
    };

    return (
        <div className="container mx-auto p-6 text-gray-800 dark:text-gray-200">
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                {/* Product Image */}
                <div className="w-full md:w-1/2 flex justify-center items-center p-6">
                    <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] overflow-hidden rounded-xl shadow-lg">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-md cursor-pointer"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                            onClick={() => setModalIsOpen(true)}
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{product.name}</h1>
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-6 h-6 ${i < Math.round(product.avgRating) ? 'text-yellow-500 dark:text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.42 8.293L12 18.897l-7.42 4.666L6 15.27 0 9.423l8.332-1.268z" />
                            </svg>
                        ))}
                        <span className="ml-2 text-gray-600 dark:text-gray-400">{product.avgRating} ({product.ratingCount} reviews)</span>
                    </div>
                    
                    {/* Price & Stock */}
                    <p className="text-3xl font-bold text-red-500 dark:text-red-400 mb-4">${Number(product.price).toFixed(2)}</p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                    <p className={`text-lg font-semibold mb-4 ${stockStatus.className}`}>{stockStatus.text}</p>

                    {/* Seller Info */}
                    <div className="mb-6">
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            <span className="font-bold">Seller:</span> {product.User.username}
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            <span className="font-bold">Contact:</span> {product.User.contacts}
                        </p>
                    </div>

                    {/* Buy Now Button */}
                    {product.amount_in_stock > 0 && (
                        <button className="w-full bg-red-500 dark:bg-red-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-red-600 dark:hover:bg-red-700 transition-transform duration-300 hover:scale-105">
                            Buy Now
                        </button>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg"
            >
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row">
                    {/* Modal Left: Image */}
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <div className="w-96 h-96 md:w-[500px] md:h-[500px]">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-contain rounded-md shadow-lg" />
                        </div>
                    </div>

                    {/* Modal Right: Name & Close Button */}
                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">{product.name}</h2>
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="mt-4 bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-md shadow-md font-semibold hover:bg-red-600 dark:hover:bg-red-700 transition-transform duration-300 hover:scale-105"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProductDetails;
