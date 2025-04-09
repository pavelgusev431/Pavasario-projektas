import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import ThemeToggleButton from '../../buttons/ThemeToggleButton.jsx';
import ProductsDropdown from './ProductsDropdown';
import getBalance from '../../../helpers/getBalance.js';
import SearchBar from './SearchBar.jsx';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [balance, setBalance] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                let response;
                if (auth.id) response = await getBalance();
                const data = response?.data;
                setBalance(data?.balance || 0);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        if (auth) {
            fetchBalance();
        }

        return () => {
            setIsHovered(false);
            setIsClicked(false);
        };
    }, [auth, location]);

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const isActive = (path) =>
        location.pathname === path ? 'text-[#800020]' : 'text-black';

    const handleLogout = () => {
        setAuth(null);
        navigate('/home');
    };

    return (
        <nav className="bg-white p-2 md:p-2 sticky top-0 w-full z-50 shadow-md dark:bg-gray-900 ">
            <div className="flex items-center justify-between mx-auto px-2 md:px-4">
                <button
                    className="flex items-center"
                    onClick={() => handleNavigation('/home')}
                >
                    <img
                        src="../src/public/banner_images/logo.png"
                        alt="Logo"
                        className="h-20 md:h-20 cursor-pointer object-contain"
                    />
                </button>

                <div className="hidden md:flex items-center ml-2">
                    <ul className="font-medium flex flex-col p-2 md:p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white dark:border-gray-700  dark:bg-gray-800  dark:md:bg-gray-900">
                        <li>
                            <ProductsDropdown />
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/contact')}
                                className={`block py-2 px-2 text-gray-900 cursor-pointer dark:text-white rounded-sm hover:bg-gray-100 dark: md:hover:bg-transparent md:border-0 md: md:p-0 ${isActive('/contact')}`}
                            >
                                Contact
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/about')}
                                className={`block py-2 px-2 text-gray-900 cursor-pointer dark:text-white rounded-sm hover:bg-gray-100 dark: md:hover:bg-transparent md:border-0 md: md:p-0 ${isActive('/about')}`}
                            >
                                About
                            </button>
                        </li>
                        {auth?.role?.toLowerCase() === 'admin' && (
                            <li>
                                <button
                                    onClick={() =>
                                        handleNavigation('/adminpanel')
                                    }
                                    className={`block text-gray-900 cursor-pointer dark:text-white rounded-sm md:border-0 ${isActive('/adminpanel')}`}
                                >
                                    AdminPanel
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="ml-2">
                    <ThemeToggleButton />
                </div>

                <div className="flex items-center space-x-4 md:space-x-6 ml-auto">
                    {!auth && (
                        <button
                            onClick={() => handleNavigation('/signup')}
                            className="block py-2 px-2 text-gray-900 dark:text-white rounded-sm hover:bg-gray-100 dark: md:hover:bg-transparent md:border-0 md: md:p-0 font-medium cursor-pointer"
                        >
                            Sign Up
                        </button>
                    )}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 w-12 h-12 flex items-center justify-center text-sm text-gray-500 dark:text-gray-300 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 6h18M3 12h18M3 18h18"
                            />
                        </svg>
                    </button>
                    <div className="justify-end">
                        <SearchBar />
                    </div>
                    {auth && (
                        <div className="relative">
                            <button
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className={`fas fa-user-circle text-4xl cursor-pointer transition-transform duration-300 ${
                                    isHovered || isClicked
                                        ? 'text-red-500'
                                        : 'text-gray-500'
                                }`}
                                onClick={() => setIsClicked(!isClicked)}
                            ></button>
                            {(isHovered || isClicked) && (
                                <div className="absolute top-9 right-0 bg-gradient-to-t from-black to-gray-700 shadow-lg rounded-lg z-50 border border-white p-5 transition-all duration-300 w-48 md:w-64">
                                    <button
                                        onClick={() =>
                                            handleNavigation('/balance')
                                        }
                                        className="p-2 text-white w-full text-left hover:bg-gray-600"
                                    >
                                        <i className="fas fa-wallet mr-3"></i>{' '}
                                        <span>
                                            Balance: ${balance.toFixed(2)}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/profile')
                                        }
                                        className="p-2 text-white w-full text-left hover:bg-gray-600"
                                    >
                                        <i className="fas fa-user mr-3"></i>
                                        <span>Manage my account</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/orders')
                                        }
                                        className="p-2 text-white w-full text-left hover:bg-gray-600"
                                    >
                                        <i className="fas fa-box mr-3"></i>
                                        <span>My orders</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/cancellations')
                                        }
                                        className="p-2 text-white w-full text-left hover:bg-gray-600"
                                    >
                                        <i className="fas fa-times-circle mr-3"></i>
                                        <span>My cancellations</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/reviews')
                                        }
                                        className="p-2 text-white w-full text-left hover:bg-gray-600"
                                    >
                                        <i className="fas fa-star mr-3"></i>
                                        <span>My reviews</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/myProducts')
                                        }
                                        className="p-2 text-white w-full text-left hover:bg-gray-600"
                                    >
                                        <i className="fas fa-store mr-3"></i>
                                        <span>My Products</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 text-white w-full text-left hover:bg-gray-600"
                                    >
                                        <i className="fas fa-sign-out-alt mr-3"></i>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {isMenuOpen && (
                    <div className="absolute top-18 right-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50 border border-gray-200 dark:border-gray-700 p-5 transition-all duration-300 w-48 md:w-64">
                        <div className="flex flex-col space-y-2">
                            <div className="w-full">
                                <ProductsDropdown />
                            </div>
                            <button
                                onClick={() => handleNavigation('/contact')}
                                className="p-2 text-black dark:text-white w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <i className="fas fa-envelope mr-3"></i>{' '}
                                <span>Contact</span>
                            </button>
                            <button
                                onClick={() => handleNavigation('/about')}
                                className="p-2 text-black dark:text-white w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <i className="fas fa-info-circle mr-3"></i>{' '}
                                <span>About</span>
                            </button>
                            <button
                                onClick={() => handleNavigation('/adminpanel')}
                                className={`p-2 text-white w-full text-left hover:bg-gray-600 ${isActive('/adminpanel')}`}
                            >
                                <i className="fas fa-cogs mr-3"></i>
                                <span>AdminPanel</span>
                            </button>
                            {!auth && (
                                <button
                                    onClick={() => handleNavigation('/signup')}
                                    className="p-2 text-black dark:text-white w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <i className="fas fa-user-plus mr-3"></i>{' '}
                                    <span>Sign Up</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
