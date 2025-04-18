import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import getProductsBySubcategory from '../../helpers/getProductsBySubcategory';

const ProductsPage = () => {
    const { subcategoryId } = useParams();
    const [subcategory, setSubcategory] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noProducts, setNoProducts] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductsBySubcategory(subcategoryId);
                const products = response.data.products;

                if (products.length === 0) {
                    setNoProducts(true);
                } else {
                    setProducts(products);
                    setSubcategory(products[0].subcategory);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [subcategoryId]);

    if (noProducts) {
        return (
            <div className="text-center text-lg text-gray-500">
                No products found in this subcategory
            </div>
        );
    }

    if (isLoading)
        return <div className="text-center text-lg">Loading products...</div>;

    return (
        <div className="mt-10 w-full">
            <div className="flex ml-10 flex-row gap-2 mt-2">
                <div className="w-2 h-6 bg-red-500"></div>
                <h2 className="text-l text-red-500 font-bold mb-2">Products</h2>
            </div>
            <div>{error}</div>
            <h2 className="text-2xl font-bold ml-10 mb-2">
                Products in:{' '}
                {products[0]?.subcategory?.name || 'Selected Category'}
            </h2>

            {products.length === 0 ? (
                <p className="text-gray-500 text-center">
                    No products available for this category
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            avgRating={product.avgRating}
                            ratingCount={product.ratingCount}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
