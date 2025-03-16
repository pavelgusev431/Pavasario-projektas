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
        <div style={styles.searchContainer}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="What are you looking for?"
                style={styles.searchInput}
            />
            <button onClick={toggleToolsMenu} style={styles.toolsButton}>
                Tools
            </button>
            {showTools && (
                <div style={styles.toolsMenu}>
                    <button
                        style={styles.menuItem}
                        onClick={() =>
                            handleCategoryChange({
                                target: { value: 'phones' },
                            })
                        }
                    >
                        Phones
                    </button>
                    <button
                        style={styles.menuItem}
                        onClick={() =>
                            handleCategoryChange({
                                target: { value: 'laptops' },
                            })
                        }
                    >
                        Laptops
                    </button>
                    <button
                        style={styles.menuItem}
                        onClick={() =>
                            handleCategoryChange({
                                target: { value: 'accessories' },
                            })
                        }
                    >
                        Accessories
                    </button>
                    {/* Add more options as needed */}
                </div>
            )}
            <button onClick={handleSearch} style={styles.searchButton}>
                Search
            </button>
        </div>
    );
};

const styles = {
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f8f8f8',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
        position: 'relative',
    },
    searchInput: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginRight: '10px',
        width: '300px',
    },
    searchButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#800020',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    toolsButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    toolsMenu: {
        position: 'absolute',
        top: '60px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        padding: '10px',
        zIndex: 1000,
    },
    menuItem: {
        display: 'block',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
    },
};

export default SearchBar;