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
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
