import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/selected/${id}`
        );
        console.log("Fetched product data:", response.data); // Debugging: Log the product data
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Check if the product data is correctly fetched
  console.log("Product data:", product);

  // Determine stock status
  let stockStatus;
  let stockClass;
  if (product.amount_in_stock > 5) {
    stockStatus = "In Stock";
    stockClass = "text-green-500";
  } else if (product.amount_in_stock > 0) {
    stockStatus = "Low in stock";
    stockClass = "text-yellow-500";
  } else {
    stockStatus = "Out of stock";
    stockClass = "text-red-500";
  }

  const handleMouseEnter = (e) => {
    e.target.style.transform = "scale(1.5)";
    e.target.style.transition = "transform 0.3s ease";
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = "scale(1)";
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    e.target.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <div className="relative overflow-hidden w-96 h-96 md:w-128 md:h-128">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain rounded-md transition-transform duration-300 ease-in-out"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {product.name}
          </h1>
          <p className="text-lg mb-4 text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold text-red-500 mb-4">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className={`text-lg font-bold mb-4 ${stockClass}`}>
            {stockStatus}
          </p>
          <p className="text-lg mb-4 text-gray-700">
            Seller: {product.User.username}
          </p>
          <p className="text-lg mb-4 text-gray-700">
            Contact: {product.User.contacts}
          </p>
          {product.amount_in_stock > 0 && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
