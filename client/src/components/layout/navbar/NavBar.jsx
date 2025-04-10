import { useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import ThemeToggleButton from '../../buttons/ThemeToggleButton.jsx';
import ProductsDropdown from './ProductsDropdown';
import { getBalance } from '../../../helpers/Balance.js';
import SearchBar from './SearchBar.jsx';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [balance, setBalance] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                if (auth?.id) {
                    const result = await getBalance(auth.id);
                    setBalance(result.balance || 0);
                }
            } catch (error) {
                console.error('Ошибка получения баланса:', error);
            }
        };

        if (auth?.id) fetchBalance();

        const handleBalanceUpdate = () => {
            if (auth?.id) fetchBalance();
        };

        window.addEventListener('balance-updated', handleBalanceUpdate);
        return () => {
            window.removeEventListener('balance-updated', handleBalanceUpdate);
        };
    }, [auth, location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
    };

    const isActive = (path) =>
        location.pathname === path
            ? 'text-[#800020]'
            : 'text-black dark:text-white';

    const handleLogout = () => {
        setAuth(null);
        navigate('/home');
    };

    return (
        <nav className="bg-white p-2 md:p-2 sticky top-0 w-full z-50 shadow-md dark:bg-gray-900">
            <div className="flex items-center justify-between mx-auto px-2 md:px-4">
                <button onClick={() => handleNavigation('/home')}>
                    <img
                        src="../src/public/banner_images/logo.png"
                        alt="Logo"
                        className="h-20 cursor-pointer object-contain"
                    />
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center ml-2">
                    <ul className="font-medium flex flex-row space-x-4 bg-white dark:bg-gray-900 rounded-lg">
                        <li>
                            <div className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                <ProductsDropdown />{' '}
                                {/* Wrap ProductsDropdown in a div for consistent alignment */}
                            </div>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/contact')}
                                className={`py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive('/contact')}`}
                            >
                                Contact
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/about')}
                                className={`py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive('/about')}`}
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
                                    className={`py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive('/adminpanel')}`}
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
                            className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                        >
                            Sign Up
                        </button>
                    )}

                    {/* Burger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="menu-toggle p-2 w-12 h-12 flex items-center justify-center text-sm dark:text-gray-300 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-controls="navbar-default"
                        aria-expanded={isMenuOpen}
                    >
                        <svg
                            className="w-6 h-6"
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

                    {/* Account Dropdown */}
                    {auth && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="fas fa-user-circle text-4xl cursor-pointer text-gray-500 hover:text-[#800020] transition-colors duration-300"
                            ></button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2 animate-fade-in z-50">
                                    <button
                                        onClick={() =>
                                            handleNavigation('/balance')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-wallet mr-3"></i>
                                        Balance: €{balance.toFixed(2)}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/profile')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-user mr-3"></i>
                                        Manage Account
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/orders')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-box mr-3"></i>
                                        My Orders
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/cancellations')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-times-circle mr-3"></i>
                                        Cancellations
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/reviews')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-star mr-3"></i>
                                        My Reviews
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/myProducts')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-store mr-3"></i>
                                        My Products
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-sign-out-alt mr-3"></i>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mobile-menu absolute top-20 right-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50 border border-gray-200 dark:border-gray-700 p-5 transition-all duration-300 w-64">
                        <div className="flex flex-col space-y-2">
                            <div className="p-2 text-black flex dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <i className="fas fa-bag-shopping pt-1 mr-4"></i>
                                <ProductsDropdown />
                            </div>
                            <button
                                onClick={() => handleNavigation('/contact')}
                                className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <i className="fas fa-envelope mr-3"></i>
                                Contact
                            </button>
                            <button
                                onClick={() => handleNavigation('/about')}
                                className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <i className="fas fa-info-circle mr-3"></i>
                                About
                            </button>
                            {auth?.role?.toLowerCase() === 'admin' && (
                                <button
                                    onClick={() =>
                                        handleNavigation('/adminpanel')
                                    }
                                    className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <i className="fas fa-cogs mr-3"></i>
                                    AdminPanel
                                </button>
                            )}
                            {!auth && (
                                <button
                                    onClick={() => handleNavigation('/signup')}
                                    className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <i className="fas fa-user-plus mr-3"></i>
                                    Sign Up
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
