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

    return (
        <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-colors duration-300">
                {/* LEFT SIDE: Main Image and Thumbnails */}
                <div className="w-full md:w-1/2 flex flex-col items-center p-4">
                    {/* Main Image */}
                    <div className="relative w-full max-w-md h-auto mb-4">
                        <button
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                            onClick={openModal}
                            className="w-full"
                        >
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full object-contain rounded-md transition-transform duration-300 ease-in-out cursor-zoom-in max-h-[400px]"
                            />
                        </button>
                    </div>

                    {/* Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="relative w-full max-w-md mt-4">
                            <button
                                onClick={() => scrollThumbnails('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 p-1 rounded-full shadow hover:bg-gray-200"
                            >
                                ◀
                            </button>
                            <div
                                ref={thumbnailsRef}
                                className="flex space-x-2 overflow-x-auto px-8 scrollbar-hide"
                            >
                                {allImages.map((img, index) => (
                                    <img
                                        key={img}
                                        src={img}
                                        alt={`Thumbnail ${index}`}
                                        onClick={() =>
                                            handleThumbnailClick(img)
                                        }
                                        className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                                            selectedImage === img
                                                ? 'border-red-500'
                                                : 'border-transparent'
                                        } hover:border-red-400 transition`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => scrollThumbnails('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-700 p-1 rounded-full shadow hover:bg-gray-200"
                            >
                                ▶
                            </button>
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
