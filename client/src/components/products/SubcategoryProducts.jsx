import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the subcategoryId from the URL
import axios from 'axios';
import ProductCard from '../ProductCard'; // Import the ProductCard component
import getProductsBySubcategory from '../../helpers/getProductsBySubcategory';

const ProductsPage = () => {
    const { subcategoryId } = useParams(); // Get subcategoryId from the URL
    const [subcategory, setSubcategory] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noProducts, setNoProducts] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductsBySubcategory(subcategoryId);
                if (response.data.products.length === 0) {
                    setNoProducts(true);
                } else {
                    setProducts(response.data.products);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        const fetchSubcategory = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/categories/products/${subcategoryId}`
                );
                setSubcategory(response.data);
            } catch (err) {
                console.error('Error fetching subcategory:', err);
            }
        };

        fetchProducts();
        fetchSubcategory();
    }, [subcategoryId]);

    if (noProducts) {
        return (
            <div className="text-center text-lg text-gray-500">
                No products found in this subcategory
            </div>
        );
    } // Re-fetch if the subcategoryId changes

    if (isLoading)
        return <div className="text-center text-lg">Loading products...</div>;

    return (
        <div className="mt-10 w-full">
            <div className="flex ml-10 flex-row gap-2 mt-2">
                <div className="w-2 h-6 bg-red-500"></div>
                <h2 className="text-l text-red-500 font-bold mb-2">Products</h2>
            </div>
            <h2 className="text-2xl font-bold ml-10 mb-2">
                Products in this {subcategory.name}
            </h2>

            {products.length === 0 ? (
                <p className="text-gray-500 text-center">
                    No products available for this subcategory
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;

