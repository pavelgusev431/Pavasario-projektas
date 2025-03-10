import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

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

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        style={styles.searchInput}
      />
      <select
        value={category}
        onChange={handleCategoryChange}
        style={styles.searchSelect}
      >
        <option value="all">All</option>
        <option value="phones">Phones</option>
        <option value="laptops">Laptops</option>
        <option value="accessories">Accessories</option>
        {/* Add more categories as needed */}
      </select>
      <button onClick={handleSearch} style={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f8f8f8",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  searchInput: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "10px",
    width: "300px",
  },
  searchSelect: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "10px",
  },
  searchButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#800020",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SearchBar;
