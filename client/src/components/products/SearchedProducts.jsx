import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductCard'; 
import {searchProducts} from '../../helpers/searchProducts';

const SearchedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    
    const fetchSearchResults = async (query) => {
        if (!query) return;
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await searchProducts(query);
    
            if (response && response.data) {
                const productsData = response.data.data || response.data;
                setProducts(productsData);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error('Error fetching search results:', err);
    
            if (err.response && err.response.status === 404) {
                setProducts([]);
            } else {
                setError('Failed to load search results');
                setProducts([]);
            }
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            fetchSearchResults(query);
        } else {
            setProducts([]);
        }
    }, [searchParams]);
    
    const searchQuery = searchParams.get('q');
    
    return (
        <div className="container p-4">
            <div className="mt-8 w-full">
                <div className="flex ml-10 flex-row gap-2 mt-2">
                    <div className="w-2 h-6 bg-red-500"></div>
                    <h2 className="text-l text-red-500 font-bold mb-2">Search Results</h2>
                </div>
                <h2 className="text-2xl font-bold ml-10 mb-2">
                    {searchQuery 
                        ? `Products matching "${searchQuery}"`
                        : "Search Results"}
                </h2>
                
                {loading && (
                    <div className="text-center py-8">
                        <p>Loading...</p>
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-10 mb-4">
                        {error}
                    </div>
                )}
                
                {!loading && !error && (
                    products.length === 0 ? (
                        <p className="text-gray-500 text-center mx-10 py-8">
                            {searchQuery 
                                ? `No products found matching "${searchQuery}"`
                                : "Enter a search term to find products."}
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mx-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} avgRating={product.avgRating} ratingCount={product.ratingCount} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default SearchedProducts;