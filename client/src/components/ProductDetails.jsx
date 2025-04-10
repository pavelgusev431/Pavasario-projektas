import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import Modal from 'react-modal';
import ProductComments from './ProductComments';
import { nanoid } from 'nanoid';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/products/selected/${id}`
                );
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="text-center p-8 dark:text-white">Loading...</div>
        );
    }

    // Determine stock status
    let stockStatus;
    let stockClass;
    if (product.amount_in_stock > 5) {
        stockStatus = 'In Stock';
        stockClass = 'text-green-500';
    } else if (product.amount_in_stock > 0) {
        stockStatus = 'Low in stock';
        stockClass = 'text-yellow-500';
    } else {
        stockStatus = 'Out of stock';
        stockClass = 'text-red-500';
    }

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

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300">
                <div className="w-full md:w-1/2 flex justify-center items-center p-4">
                    <div className="relative overflow-hidden w-96 h-96 md:w-128 md:h-128">
                        <button
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                            onClick={openModal}
                        >
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-contain rounded-md transition-transform duration-300 ease-in-out cursor-pointer"
                            />
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                        {product.name}
                    </h1>

                    <div className="flex items-center mb-4">
                        <div className="flex items-center">
                            {[...Array(5)].map((star, index) => (
                                <svg
                                    key={nanoid(64)}
                                    className={`w-6 h-6 ${
                                        index < Math.round(product.avgRating)
                                            ? 'text-yellow-500'
                                            : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.42 8.293L12 18.897l-7.42 4.666L6 15.27 0 9.423l8.332-1.268z" />
                                </svg>
                            ))}
                        </div>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                            {product.avgRating} ({product.ratingCount} reviews)
                        </span>
                    </div>

                    <p className="text-2xl font-bold text-red-500 mb-4">
                        ${Number(product.price).toFixed(2)}
                    </p>

                    <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
                        {product.description}
                    </p>

                    <p className={`text-lg font-bold mb-4 ${stockClass}`}>
                        {stockStatus}
                    </p>

                    <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                        Seller:{' '}
                        <Link
                            to={`/users/${product.User.username}`}
                            className="text-blue-500 hover:underline"
                        >
                            {product.User.username}
                        </Link>
                    </p>

                    <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                        Contact: {product.User.contacts}
                    </p>

                    {product.amount_in_stock > 0 && (
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                            Buy Now
                        </button>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Product Images"
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-50 backdrop-blur"
            >
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-4xl mx-auto relative transition-colors duration-300">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-black dark:text-white text-2xl"
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
                        {product.name}
                    </h2>
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-auto max-h-screen object-contain rounded-md"
                    />
                </div>
            </Modal>

            <ProductComments productId={id} />
        </div>
    );
};

export default ProductDetails;
