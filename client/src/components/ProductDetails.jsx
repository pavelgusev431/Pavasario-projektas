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
    <div>
      <h1>{product.name}</h1>
    </div>
  );
};

export default ProductDetails;
