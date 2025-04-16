import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import ProductComments from './ProductComments';
import { nanoid } from 'nanoid';
import getSelectedProduct from '../helpers/getSelectedProducts';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [allImages, setAllImages] = useState([]);
    const thumbnailsRef = useRef(null);

    // Swipe state
    const [touchStartX, setTouchStartX] = useState(null);
    const [slideDirection, setSlideDirection] = useState(null); // "left" or "right"
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getSelectedProduct(id);
                setProduct(productData);
                setSelectedImage(productData.image_url);
            } catch (error) {
                console.log(error.message);
            }
        };

        // Fetch all images from the server for this product
        const fetchAllImages = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/images/d/product${id}`
                );
                const urls = res.data.data.map((img) =>
                    typeof img === 'string'
                        ? `http://localhost:3000/images/d/product${id}/${img}`
                        : img.url
                );
                setAllImages(
                    res.data.data.length ? res.data.data : [product?.image_url]
                );
                // Set the main image as selected if not already set
                if (urls.length && !selectedImage) setSelectedImage(urls[0]);
            } catch (e) {
                setAllImages([product?.image_url]);
            }
        };

        fetchProduct();
        fetchAllImages();
        // eslint-disable-next-line
    }, [id]);

    if (!product) {
        return (
            <div className="text-center p-8 dark:text-white">Loading...</div>
        );
    }

    const stockStatus =
        product.amount_in_stock > 5
            ? 'In Stock'
            : product.amount_in_stock > 0
              ? 'Low in stock'
              : 'Out of stock';

    const stockClass =
        product.amount_in_stock > 5
            ? 'text-green-500'
            : product.amount_in_stock > 0
              ? 'text-yellow-500'
              : 'text-red-500';

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleMouseEnter = (e) => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1.5)';
        e.currentTarget.querySelector('img').style.transition =
            'transform 0.3s ease';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1)';
    };

    const handleMouseMove = (e) => {
        const img = e.currentTarget.querySelector('img');
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
    };

    const handleThumbnailClick = (url) => {
        setSelectedImage(url);
    };

    const scrollThumbnails = (direction) => {
        const scrollAmount = 100;
        if (thumbnailsRef.current) {
            thumbnailsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Find the index of the currently selected image
    const currentIndex = allImages.findIndex((img) => img === selectedImage);

    // Handlers for arrows
    const handlePrevImage = (e) => {
        e.stopPropagation();
        if (allImages.length > 0) {
            const prevIndex =
                (currentIndex - 1 + allImages.length) % allImages.length;
            setSelectedImage(allImages[prevIndex]);
        }
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        if (allImages.length > 0) {
            const nextIndex = (currentIndex + 1) % allImages.length;
            setSelectedImage(allImages[nextIndex]);
        }
    };

    // Touch event handlers
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        if (touchStartX === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
            // Minimum swipe distance
            if (diff > 0) {
                handlePrevImage(e);
            } else {
                handleNextImage(e);
            }
        }
        setTouchStartX(null);
    };

    return (
        <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300">
                {/* LEFT SIDE: Main Image and Thumbnails */}
                <div className="w-full md:w-1/2 flex flex-col items-center p-4">
                    {/* Main Image with pretty arrows and swipe */}
                    <div
                        className="relative w-full max-w-2xl h-[600px] mb-6 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-100 border-4 border-red-400 shadow-lg"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Left Arrow */}
                        {allImages.length > 1 && (
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-700 p-3 rounded-full shadow hover:bg-gray-200 flex items-center justify-center border border-gray-300"
                                aria-label="Previous image"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-gray-700 dark:text-gray-200"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                        )}
                        <button
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                            onClick={openModal}
                            className="w-full h-full"
                            style={{ display: 'block' }}
                        >
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full h-full object-contain transition-transform duration-300 ease-in-out cursor-zoom-in"
                                style={{ pointerEvents: 'none' }} // Prevents accidental drag
                            />
                        </button>
                        {/* Right Arrow */}
                        {allImages.length > 1 && (
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-700 p-3 rounded-full shadow hover:bg-gray-200 flex items-center justify-center border border-gray-300"
                                aria-label="Next image"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-gray-700 dark:text-gray-200"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Thumbnails (no arrows here) */}
                    {allImages.length > 1 && (
                        <div className="w-full max-w-md mt-4 flex space-x-2 overflow-x-auto px-8 scrollbar-hide">
                            {allImages.map((img, index) => (
                                <img
                                    key={img}
                                    src={img}
                                    alt={`Thumbnail ${index}`}
                                    onClick={() => handleThumbnailClick(img)}
                                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                                        selectedImage === img
                                            ? 'border-red-500'
                                            : 'border-transparent'
                                    } hover:border-red-400 transition`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full md:w-1/2 p-6 md:p-8">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                        {product.name}
                    </h1>

                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={nanoid()}
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

                    <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
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

            {/* modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Product Image Zoom"
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur"
            >
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-4xl mx-auto relative transition-colors duration-300">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-black dark:text-white text-2xl"
                    >
                        &times;
                    </button>
                    <img
                        src={selectedImage}
                        alt="Zoomed"
                        className="w-full h-auto max-h-screen object-contain rounded-md"
                    />
                </div>
            </Modal>

            <ProductComments productId={id} />
        </div>
    );
};

export default ProductDetails;
