import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext.jsx';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [balance, setBalance] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Fetch the balance from the database
        const fetchBalance = async () => {
            try {
                const response = await fetch('/api/balance'); // Adjust the API endpoint as needed
                const data = await response.json();
                setBalance(data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };
    useEffect(() => {
        // Fetch the balance from the database
        const fetchBalance = async () => {
            try {
                const response = await fetch('/api/balance'); // Adjust the API endpoint as needed
                const data = await response.json();
                setBalance(data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        if (auth) {
            fetchBalance();
        }
        if (auth) {
            fetchBalance();
        }

        // Cleanup effect to reset isHovered state on location change
        return () => {
            setIsHovered(false);
            setIsClicked(false);
        };
    }, [auth, location]);

    const handleNavigation = (path) => {
        navigate(path);
    };
    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'text-[#800020]' : 'text-black';
    };
    const isActive = (path) => {
        return location.pathname === path ? 'text-[#800020]' : 'text-black';
    };

    const handleLogout = () => {
        setAuth(null);
        navigate('/home');
    };

    const toggleMenu = () => {
        setIsClicked(!isClicked);
    };

    return (
        <nav className="bg-white p-2 md:p-4 sticky top-0 w-full z-50 shadow-md">
            <div className="flex flex-wrap items-center justify-between mx-auto px-2 md:px-4">
                <div className="flex items-center justify-start w-full md:w-auto">
                    <img
                        src="../src/public/banner_images/logo.png"
                        alt="Logo"
                        className="h-10 md:h-20 cursor-pointer"
                        onClick={() => handleNavigation('/home')}
                    />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center p-2 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-default"
                        aria-expanded={isMenuOpen}
                        style={{ marginTop: 'auto' }}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
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
                    <div className={`hidden md:flex items-center ml-2`}>
                        <ul className="font-medium flex flex-col p-2 md:p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <button
                                    onClick={() => handleNavigation('/contact')}
                                    className={`block py-2 px-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#800020] md:p-0 ${isActive('/contact')}`}
                                >
                                    Contact
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation('/about')}
                                    className={`block py-2 px-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#800020] md:p-0 ${isActive('/about')}`}
                                >
                                    About
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center justify-end w-full md:w-auto">
                    {!auth && (
                        <button
                            onClick={() => handleNavigation('/signup')}
                            className={`block py-2 px-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#800020] md:p-0 font-medium`}
                        >
                            Sign Up
                        </button>
                    )}
                    {auth && (
                        <div
                            className="relative flex items-center justify-center"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={toggleMenu}
                        >
                            <i
                                className={`fas fa-user-circle text-4xl md:text-5xl cursor-pointer transition-transform duration-300 ${isHovered ? 'text-red-500' : 'text-gray-500'}`}
                            ></i>
                            {(isHovered || isClicked) && (
                                <div className="absolute top-12 right-0 bg-gradient-to-t from-black to-gray-700 shadow-lg rounded-lg z-50 overflow-hidden border border-white p-5 transition-all duration-300 w-48 md:w-64 font-sans">
                                    <button
                                        onClick={() =>
                                            handleNavigation('/balance')
                                        }
                                        className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                                    >
                                        <i className="fas fa-wallet mr-3"></i>
                                        Balance: ${balance.toFixed(2)}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/account')
                                        }
                                        className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                                    >
                                        <i className="fas fa-user mr-3"></i>
                                        Manage my account
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/orders')
                                        }
                                        className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                                    >
                                        <i className="fas fa-box mr-3"></i>
                                        My orders
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/cancellations')
                                        }
                                        className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                                    >
                                        <i className="fas fa-times-circle mr-3"></i>
                                        My cancellations
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigation('/reviews')
                                        }
                                        className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                                    >
                                        <i className="fas fa-star mr-3"></i>
                                        My reviews
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                                    >
                                        <i className="fas fa-sign-out-alt mr-3"></i>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:hidden`}
                id="navbar-default"
            >
                <ul className="font-medium flex flex-col p-2 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white">
                    <li>
                        <button
                            onClick={() => handleNavigation('/contact')}
                            className={`block py-2 px-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#800020] md:p-0 ${isActive('/contact')}`}
                        >
                            Contact
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('/about')}
                            className={`block py-2 px-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#800020] md:p-0 ${isActive('/about')}`}
                        >
                            About
                        </button>
                    </li>
                    {!auth && (
                        <li>
                            <button
                                onClick={() => handleNavigation('/signup')}
                                className={`block py-2 px-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#800020] md:p-0 ${isActive('/signup')}`}
                            >
                                Sign Up
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
