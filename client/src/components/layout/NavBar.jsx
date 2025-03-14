import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext.jsx";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch the balance from the database
    const fetchBalance = async () => {
      try {
        const response = await fetch("/api/balance"); // Adjust the API endpoint as needed
        const data = await response.json();
        setBalance(data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
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
    return location.pathname === path ? "text-[#800020]" : "text-black";
  };

  const handleLogout = () => {
    setAuth(null);
    navigate("/home");
  };

  return (
    <nav className="bg-white p-4 md:p-8 sticky top-0 w-full z-50 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center">
          <img
            src="../src/public/banner_images/logo.png"
            alt="Logo"
            className="h-10 md:h-20"
          />
        </div>
        <div className="flex items-center ml-auto">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <button
                  onClick={() => handleNavigation("/home")}
                  className={`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ${isActive("/home")}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className={`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ${isActive("/contact")}`}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/about")}
                  className={`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ${isActive("/about")}`}
                >
                  About
                </button>
              </li>
              {!auth && (
                <li>
                  <button
                    onClick={() => handleNavigation("/signup")}
                    className={`block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ${isActive("/signup")}`}
                  >
                    Sign Up
                  </button>
                </li>
              )}
              {auth && (
                <li>
                  <div
                    className="relative flex items-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <i
                      className="fas fa-shopping-cart text-xl md:text-2xl cursor-pointer mr-4 md:mr-7 transition-colors duration-300"
                      onClick={() => handleNavigation("/cart")}
                    ></i>
                    <img
                      src="../src/public/banner_images/user.png"
                      alt="User"
                      className="h-8 md:h-10 cursor-pointer transition-transform duration-300"
                    />
                    {isHovered && (
                      <div className="absolute top-10 right-0 bg-gradient-to-t from-black to-gray-700 shadow-lg rounded-lg z-50 overflow-hidden border border-white p-5 transition-all duration-300 w-48 md:w-64 font-sans">
                        <button
                          onClick={() => handleNavigation("/balance")}
                          className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                        >
                          <i className="fas fa-wallet mr-3"></i>
                          Balance: ${balance.toFixed(2)}
                        </button>
                        <button
                          onClick={() => handleNavigation("/account")}
                          className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                        >
                          <i className="fas fa-user mr-3"></i>
                          Manage my account
                        </button>
                        <button
                          onClick={() => handleNavigation("/orders")}
                          className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                        >
                          <i className="fas fa-box mr-3"></i>
                          My orders
                        </button>
                        <button
                          onClick={() => handleNavigation("/cancellations")}
                          className="p-2 text-white bg-none border-none cursor-pointer w-full text-left transition-colors duration-300 font-sans"
                        >
                          <i className="fas fa-times-circle mr-3"></i>
                          My cancellations
                        </button>
                        <button
                          onClick={() => handleNavigation("/reviews")}
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
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
