import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(12);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/products?page=${page}&limit=${pageSize}`
      );
      const data = await response.json();

      if (response.status === 200) {
        setProducts(data.products);
        setPagination({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
          totalProducts: data.pagination.totalProducts,
        });
      } else {
        throw new Error(data.message || "Error fetching products");
      }
    } catch (err) {
      setError("Error fetching products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      fetchProducts(newPage);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label htmlFor="pageSize" className="mr-2">
          Products per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="p-2 border rounded-md"
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={18}>18</option>
          <option value={24}>24</option>
          <option value={30}>30</option>
        </select>
      </div>

      {products.length > 0 ? (
        <div>
          <div className="flex flex-wrap mt-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                avgRating={product.avgRating}
                ratingCount={product.ratingCount}
              />
            ))}
          </div>
          {pagination.totalProducts > pageSize && (
            <div className="mt-6 flex justify-center items-center space-x-2">
              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${pagination.currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1}
              >
                Previous
              </button>

              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-4 py-2 text-sm rounded-md ${pagination.currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"} hover:bg-blue-400`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${pagination.currentPage >= pagination.totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
