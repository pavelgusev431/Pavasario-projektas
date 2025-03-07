import { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import { Link } from 'react-router';
import { getProductById } from '../helpers/getProduct.js';
import { getAllUsers } from '../helpers/getUser.js';
import Pagination from './Pagination.jsx';
export default function UsersProducts() {
    const [usersWithProducts, setUsersWithProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // ==========================================================================================
    const [currentPage, setCurrentPage] = useState(1); // Dabartinis puslapis
    const [usersPerPage, setUsersPerPage] = useState(5); // kiek pardaveju rodyti viename puslapyje
    // ==========================================================================================

    useEffect(() => {
        const fetchUsersAndProducts = async () => {
            try {
                // Gauti visus vartotojus
                const usersResponse = await getAllUsers();
                const users = usersResponse.data.data;

                // Gauti visų vartotojų produktus
                const usersWithProductsPromises = users.map(async (user) => {
                    const productsResponse = await getProductById(user.id);
                    return { ...user, products: productsResponse.data.data };
                });

                // Palaukti, kol visi vartotojų produktai bus gauti
                const usersWithProductsData = await Promise.all(
                    usersWithProductsPromises
                );

                // Filtruojame tik tuos vartotojus, kurie turi bent vieną produktą
                setUsersWithProducts(
                    usersWithProductsData.filter(
                        (user) => user.products.length > 0
                    )
                );
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersAndProducts();
    }, []);

    // skaiciuoti kiek rodyti pardaveju puslapyje vvvvvvvv
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersWithProducts.slice(
        indexOfFirstUser,
        indexOfLastUser
    );
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // Funcija keicianti puslapi ^^^^^^^^

    const handleUsersPerPageChange = (event) => {
        setUsersPerPage(Number(event.target.value)); // Atnaujiname usersPerPage
        setCurrentPage(1); // Grąžiname vartotoją į pirmą puslapį
    };

    if (loading) return <p>Kraunama...</p>;
    if (error) return <p>Klaida: {error}</p>;

    // // Jei nera rezultatu - zinute
    if (usersWithProducts.length === 0) {
        return (
            <div className="w-full text-center mt-8">
                <p className="text-gray-600 text-xl">No Products found.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Pakeista is usersWithProducts i currentUsers  */}
            {currentUsers.map((user) => (
                <div key={user.id} className="mb-4">
                    <div className="flex flex-row gap-2 mt-2 ">
                        <div className="w-2 h-6 bg-red-500"></div>
                        <h2 className="text-l text-red-500 font-bold mb-2">
                            Spotlight
                        </h2>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                        Explore {user.username} products
                    </h2>
                    <div className="flex flex-wrap flex-row  ">
                        {user.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="text-center">
                        <Link to={`/home/${user.id}`}>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                                View All Products
                            </button>
                        </Link>
                    </div>
                </div>
            ))}

            <div className="flex justify-center items-center mt-4">
                {/* Pasirinkimo laukas, kiek pardavėjų rodyti viename puslapyje */}
                <div className="flex items-center">
                    <label htmlFor="usersPerPage" className="mr-2">
                        Show per page:
                    </label>
                    <select
                        id="usersPerPage"
                        value={usersPerPage}
                        onChange={handleUsersPerPageChange}
                        className="px-2 py-1 border rounded"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                {/* Puslapiavimo komponentas */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={usersWithProducts.length}
                    itemsPerPage={usersPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
