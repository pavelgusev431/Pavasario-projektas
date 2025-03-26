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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-red-500 mb-4">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className={`text-lg font-bold mb-4 ${stockClass}`}>
            {stockStatus}
          </p>
          <p className="text-lg mb-4">Seller: {product.User.username}</p>
          <p className="text-lg mb-4">Contact: {product.User.contacts}</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
