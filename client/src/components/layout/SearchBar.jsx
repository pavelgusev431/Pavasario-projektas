import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [showTools, setShowTools] = useState(false);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query, category);
        }
    };

    const toggleToolsMenu = () => {
        setShowTools(!showTools);
    };

    return (
        <div className="flex justify-center items-center p-5 bg-gray-100 shadow-md relative dark:bg-gray-800 shadow-md relative">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="What are you looking for?"
                className="p-2 text-lg border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
            />
            <button
                onClick={toggleToolsMenu}
                className="ml-3 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none dark:bg-blue-700  dark:hover:bg-blue-800"
            >
                Tools
            </button>
            {showTools && (
                <div className="absolute top-16 bg-white shadow-md rounded-md p-2 z-10 dark:bg-gray-700">
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={() =>
                            handleCategoryChange({
                                target: { value: 'phones' },
                            })
                        }
                    >
                        Phones
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={() =>
                            handleCategoryChange({
                                target: { value: 'laptops' },
                            })
                        }
                    >
                        Laptops
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                        onClick={() =>
                            handleCategoryChange({
                                target: { value: 'accessories' },
                            })
                        }
                    >
                        Accessories
                    </button>
                </div>
            )}
            <button
                onClick={handleSearch}
                className="ml-3 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none dark:bg-red-700 dark:hover:bg-red-800"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
