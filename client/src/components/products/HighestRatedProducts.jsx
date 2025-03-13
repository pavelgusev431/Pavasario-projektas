import { getTopRatedProducts } from "../../helpers/getProduct";
import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import { Link } from 'react-router';
export default function HighestRatedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await getTopRatedProducts();
              setProducts(response.data.data);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchProducts();
  }, []);

  if (loading) return <p>Kraunama...</p>;
  if (error) return <p>Klaida: {error}</p>;

  return (
      <div className="w-full">
            <div className="flex flex-row gap-2 mt-2">
              <div className="w-2 h-6 bg-red-500"></div>
              <h2 className="text-l text-red-500 font-bold mb-2"></h2>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold py-2">Highest rated products</h2>
            <div>
                        <Link to={`/products`}>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded py-2 px-4 ">
                                View All Products
                            </button>
                        </Link>
                    </div>
          </div>
          
          <div className="flex gap-2 flex-wrap lg:flex-nowrap flex-row">
              {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    avgRating={product.avgRating} 
                    ratingCount={product.ratingCount}
                  />
                ))}
              </div>
          </div>
      
  );
}