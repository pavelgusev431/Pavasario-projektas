import React, { useState } from "react";

const SortOptions = ({ onSort }) => {
  const [sortCriteria, setSortCriteria] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    if (name === "criteria") {
      setSortCriteria(value);
    } else if (name === "order") {
      setSortOrder(value);
    }
  };

  const handleAccept = () => {
    onSort(sortCriteria, sortOrder);
    Found(sortCriteria, sortOrder); // Call the Found function
  };

  const Found = (criteria, order) => {
    console.log(`Found: ${criteria} in ${order} order`);
    // Implement the Found functionality here
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center the content
    gap: "1rem",
    margin: "1rem 0",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#333",
  };

  const selectStyle = {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    fontSize: "1rem",
    color: "#333",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ff0000", // Make the button red
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>
        Sort by:
        <select
          name="criteria"
          value={sortCriteria}
          onChange={handleSortChange}
          style={selectStyle}
        >
          <option value="date">Date</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </label>
      <label style={labelStyle}>
        Order:
        <select
          name="order"
          value={sortOrder}
          onChange={handleSortChange}
          style={selectStyle}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <button style={buttonStyle} onClick={handleAccept}>
        Accept
      </button>
    </div>
  );
};

export default SortOptions;
