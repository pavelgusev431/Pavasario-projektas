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
            <div className="flex items-center mx-auto px-2 md:px-4 justify-between w-full">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
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
                        <ul className="font-medium flex flex-col p-2 md:p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white dark:border-gray-700 dark:bg-gray-800 dark:md:bg-gray-900">
                            <li>
                                <ProductsDropdown />
                            </li>
                            <li>
                                <ThemeToggleButton />
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation('/contact')}
                                    className={`block py-2 px-2 dark:text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${isActive('/contact')}`}
                                >
                                    Contact
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation('/about')}
                                    className={`block py-2 px-2 dark:text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${isActive('/about')}`}
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
                                        className={`block dark:text-white rounded-sm md:border-0 ${isActive('/adminpanel')}`}
                                    >
                                        AdminPanel
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4 ml-auto">
                    <div className="flex items-center">
                        {!auth && (
                            <button
                                onClick={() => handleNavigation('/signup')}
                                className="block p-3 dark:text-white rounded-md hover:bg-gray-200 md:mr-2 md:p-3 font-medium cursor-pointer"
                            >
                                Sign Up
                            </button>
                        )}

                        {/* Burger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="menu-toggle p-2 w-12 h-12 flex items-center justify-center text-sm dark:text-gray-300 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2"
                            aria-controls="navbar-default"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
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
                    </div>

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
                                className="fas fa-user-circle text-4xl cursor-pointer text-gray-500 hover:text-[#800020] transition-transform duration-300 hover:scale-110"
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
                                        <span>Balance: €{balance.toFixed(2)}</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/profile')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-user mr-3"></i>
                                        <span>Manage Account</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/orders')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-box mr-3"></i>
                                        <span>My Orders</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/cancellations')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-times-circle mr-3"></i>
                                        <span>Cancellations</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/reviews')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-star mr-3"></i>
                                        <span>My Reviews</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/myProducts')
                                        }
                                        className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-store mr-3"></i>
                                        <span>My Products</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <i className="fas fa-sign-out-alt mr-3"></i>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
