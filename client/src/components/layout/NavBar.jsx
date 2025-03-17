import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext.jsx';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const [balance, setBalance] = useState(0);

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

        // Cleanup effect to reset isHovered state on location change
        return () => {
            setIsHovered(false);
        };
    }, [auth, location]);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'text-[#800020]' : 'text-black';
    };

    const handleLogout = () => {
        setAuth(null);
        navigate('/home');
    };

    return (
        <nav className="bg-white p-4 sticky top-0 w-full z-50 shadow-md">
            <div className="flex justify-between items-center">
                <div className="flex items-center mr- md:mr-36">
                    <img
                        src="../src/public/banner_images/logo.png"
                        alt="Logo"
                        className="h-10 md:h-20"
                    />
                    <div className="flex items-center ml-4">
                        <button
                            onClick={() => handleNavigation('/home')}
                            className={`mr-4 md:mr-6 bg-none border-none cursor-pointer p-2 md:p-5 text-sm md:text-lg relative transition-colors duration-300 ${isActive('/home')}`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => handleNavigation('/contact')}
                            className={`mr-4 md:mr-6 bg-none border-none cursor-pointer p-2 md:p-5 text-sm md:text-lg relative transition-colors duration-300 ${isActive('/contact')}`}
                        >
                            Contact
                        </button>
                        <button
                            onClick={() => handleNavigation('/about')}
                            className={`mr-4 md:mr-4 bg-none border-none cursor-pointer p-2 md:p-5 text-sm md:text-lg relative transition-colors duration-300 ${isActive('/about')}`}
                        >
                            About
                        </button>
                    </div>
                </div>
                <div className="flex items-center ml-auto">
                    {!auth && (
                        <button
                            onClick={() => handleNavigation('/signup')}
                            className={`mr-4 md:mr-6 bg-none border-none cursor-pointer p-2 md:p-5 text-sm md:text-lg relative transition-colors duration-300 ${isActive('/signup')}`}
                        >
                            Sign Up
                        </button>
                    )}
                    {auth && (
                        <div
                            className="relative flex items-center"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* <i
                                className="fas fa-shopping-cart text-xl md:text-2xl cursor-pointer mr-4 md:mr-7 transition-colors duration-300"
                                onClick={() => handleNavigation('/cart')}
                            ></i> */}
                            <img
                                src="../src/public/banner_images/user.png"
                                alt="User"
                                className="h-8 md:h-10 cursor-pointer transition-transform duration-300"
                            />
                            {isHovered && (
                                <div className="absolute top-10 right-0 bg-gradient-to-t from-black to-gray-700 shadow-lg rounded-lg z-50 overflow-hidden border border-white p-5 transition-all duration-300 w-48 md:w-64 font-sans">
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
        </nav>
    );
};

export default NavBar;
