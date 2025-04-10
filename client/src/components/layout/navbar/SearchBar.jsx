import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { searchSuggestions } from '../../../helpers/searchProducts';
import getSearchRegex from '../../../helpers/getSearchRegex';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [zalgoRegex, setZalgoRegex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length >= 3) {
            const fetchSuggestions = async () => {
                const response = await searchSuggestions(query);
                if (response?.data) {
                    setSuggestions(response.data);
                }
            };

            const delayDebounceFn = setTimeout(() => {
                fetchSuggestions();
            }, 300);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    useEffect(() => {
        const fetchRegex = async () => {
            try {
                const response = await getSearchRegex();
                if (response?.zalgoRegex) {
                    setZalgoRegex(new RegExp(response.zalgoRegex));
                } else {
                    console.error('Zalgo regex not found in the response.');
                }
            } catch (err) {
                console.error('Failed to fetch Zalgo regex:', err);
            }
        };
        fetchRegex();
    }, []);

    const isZalgo = (text) => {
        return zalgoRegex ? zalgoRegex.test(text) : false;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        let trimmedQuery = query.trim().toLowerCase();

        if (trimmedQuery.length < 3 || trimmedQuery.length > 15) {
            toast.error('Search query must be between 3 and 15 characters.');
            return;
        }

        if (isZalgo(trimmedQuery)) {
            toast.error('Zalgo text is not allowed.');
            return;
        }

        if (!/^[a-zA-Z0-9 ]+$/.test(trimmedQuery)) {
            toast.error(
                'Search query can only contain letters, numbers, and spaces.'
            );
            return;
        }

        navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        setQuery('');
        setSuggestions([]);
        setIsFocused(false);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.name);
        setSuggestions([]);
        setIsFocused(true);
        navigate(`/search?q=${encodeURIComponent(suggestion.name)}`);
        setQuery('');
        setSuggestions([]);
    };

    return (
        <div className="flex flex-col items-center justify-center relative">
            <ToastContainer position="top-center" />
            <div className="flex items-center justify-center">
                <form onSubmit={handleSearch} className="relative mx-auto flex">
                    <input
                        type="search"
                        className={`peer cursor-pointer relative z-10 h-8 w-10 rounded-lg border bg-transparent pr-6 outline-none transition-all ${
                            isFocused
                                ? 'w-full border-gray-500 px-3'
                                : 'focus:w-full focus:border-gray-500 focus:px-3'
                        }`}
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    <button
                        type="submit"
                        className="absolute dark:bg-white-700 top-0 dark:text-white right-0 bottom-0 my-auto h-8 w-10 px-3 rounded-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 50 50"
                            className="dark:fill-white"
                        >
                            <path d="M 21 3 C 11.6 3 4 10.6 4 20s7.6 17 17 17c3.4 0 6.5-1 9.1-2.7L42.4 46.6 46.6 42.4 34.5 30.3C36.7 27.4 38 23.9 38 20 38 10.6 30.4 3 21 3zM21 7c7.2 0 13 5.8 13 13s-5.8 13-13 13S8 27.2 8 20 13.8 7 21 7z"></path>
                        </svg>
                    </button>
                </form>
            </div>

            {suggestions.length > 0 && (
                <ul className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-auto">
                    {suggestions.map((product) => (
                        <li
                            key={product.id}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                        >
                            <button
                                onMouseDown={() =>
                                    handleSuggestionClick(product)
                                }
                            >
                                {product.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
