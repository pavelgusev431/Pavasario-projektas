import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import getAllCategories from '../../../helpers/getAllCategories';

const ProductsDropdown = () => {
    const [categories, setCategories] = useState([]);
    const [openCategory, setOpenCategory] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const closeTimeout = useRef(null);
    const subcategoryRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const response = await getAllCategories();

                const categoriesData =
                    response.data?.categories || response.data || response;

                if (Array.isArray(categoriesData)) {
                    setCategories(categoriesData);
                } else {
                    console.error(
                        'API response is not an array:',
                        categoriesData
                    );
                    setCategories([]);
                    setError('Failed to load categories');
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories');
                setCategories([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const adjustSubcategoryPosition = () => {
            if (subcategoryRef.current) {
                const rect = subcategoryRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const windowWidth = window.innerWidth;

                // Adjust vertical positioning for small screens
                if (rect.bottom > windowHeight) {
                    subcategoryRef.current.style.top = 'auto';
                    subcategoryRef.current.style.bottom = '0';
                }

                // Adjust horizontal positioning for both small and large screens
                if (rect.right > windowWidth) {
                    subcategoryRef.current.style.left = 'auto';
                    subcategoryRef.current.style.right = '100%';
                }
            }
        };

        if (openCategory) {
            adjustSubcategoryPosition();
        }
    }, [openCategory]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleMouseEnter = (categoryId) => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
        }
        setOpenCategory(categoryId);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setOpenCategory(null);
            setIsDropdownOpen(false);
        }, 500);
    };

    const handleSubcategoryClick = (subcategoryId) => {
        navigate(`/products/${subcategoryId}`);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={handleMouseLeave}
        >
            <button className="">Products</button>
            {isDropdownOpen && (
                <div
                    className="absolute bg-white shadow-lg rounded-md w-[90vw] max-w-[60rem] z-10 transition-all duration-300 ease-in-out"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4 border border-gray-200 rounded-md">
                        <ul className="w-full md:w-1/2 space-y-4">
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="relative"
                                        onMouseEnter={() =>
                                            handleMouseEnter(category.id)
                                        }
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <button className="w-auto text-left px-4 py-2 text-lg font-medium text-gray-800 hover:bg-gray-100 focus:outline-none transition duration-200">
                                            {category.name}
                                        </button>
                                        {openCategory === category.id &&
                                            category.subcategories && (
                                                <div
                                                    ref={subcategoryRef}
                                                    className="absolute left-0 md:left-full top-0 bg-white shadow-lg rounded-md w-auto md:w-72 z-20 transition-all duration-300 ease-in-out"
                                                >
                                                    <ul className="p-4 space-y-2 rounded-md">
                                                        {category.subcategories
                                                            .length > 0 ? (
                                                            category.subcategories.map(
                                                                (sub) => (
                                                                    <li
                                                                        key={
                                                                            sub.id
                                                                        }
                                                                        className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200"
                                                                        onClick={() =>
                                                                            handleSubcategoryClick(
                                                                                sub.id
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            sub.name
                                                                        }
                                                                    </li>
                                                                )
                                                            )
                                                        ) : (
                                                            <li className="px-4 py-2 text-lg text-gray-500">
                                                                No subcategories
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-lg text-gray-500">
                                    No categories found
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsDropdown;
