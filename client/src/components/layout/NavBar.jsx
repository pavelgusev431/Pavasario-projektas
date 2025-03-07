import { useContext, useState, useEffect } from 'react';
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
        return location.pathname === path ? styles.activeButton : {};
    };

    const handleLogout = () => {
        setAuth(null);
        navigate('/home');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <div style={styles.logoContainer}>
                    <img
                        src="/path/to/logo.png"
                        alt="Logo"
                        style={styles.logo}
                    />
                </div>
                <div style={styles.menuContainer}>
                    <button
                        onClick={() => handleNavigation('/home')}
                        style={{ ...styles.button, ...isActive('/home') }}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => handleNavigation('/contact')}
                        style={{ ...styles.button, ...isActive('/contact') }}
                    >
                        Contact
                    </button>
                    <button
                        onClick={() => handleNavigation('/about')}
                        style={{ ...styles.button, ...isActive('/about') }}
                    >
                        About
                    </button>
                    {!auth && (
                        <button
                            onClick={() => handleNavigation('/signup')}
                            style={{ ...styles.button, ...isActive('/signup') }}
                        >
                            Sign Up
                        </button>
                    )}
                </div>
                {auth && (
                    <div
                        style={styles.accountContainer}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <i
                            className="fas fa-heart"
                            style={styles.heartIcon}
                            onClick={() => handleNavigation('/favorites')}
                        ></i>
                        <i
                            className="fas fa-shopping-cart"
                            style={styles.cartIcon}
                            onClick={() => handleNavigation('/cart')}
                        ></i>
                        <img
                            src="../src/public/banner_images/user.png"
                            alt="User"
                            style={styles.accountIcon}
                        />
                        {isHovered && (
                            <div style={styles.menu}>
                                <button
                                    onClick={() => handleNavigation('/balance')}
                                    style={styles.menuButton}
                                >
                                    <i
                                        className="fas fa-wallet"
                                        style={styles.menuIcon}
                                    ></i>
                                    Balance: ${balance.toFixed(2)}
                                </button>
                                <button
                                    onClick={() => handleNavigation('/account')}
                                    style={styles.menuButton}
                                >
                                    <i
                                        className="fas fa-user"
                                        style={styles.menuIcon}
                                    ></i>
                                    Manage my account
                                </button>
                                <button
                                    onClick={() => handleNavigation('/orders')}
                                    style={styles.menuButton}
                                >
                                    <i
                                        className="fas fa-box"
                                        style={styles.menuIcon}
                                    ></i>
                                    My orders
                                </button>
                                <button
                                    onClick={() =>
                                        handleNavigation('/cancellations')
                                    }
                                    style={styles.menuButton}
                                >
                                    <i
                                        className="fas fa-times-circle"
                                        style={styles.menuIcon}
                                    ></i>
                                    My cancellations
                                </button>
                                <button
                                    onClick={() => handleNavigation('/reviews')}
                                    style={styles.menuButton}
                                >
                                    <i
                                        className="fas fa-star"
                                        style={styles.menuIcon}
                                    ></i>
                                    My reviews
                                </button>
                                <button
                                    onClick={handleLogout}
                                    style={styles.menuButton}
                                >
                                    <i
                                        className="fas fa-sign-out-alt"
                                        style={styles.menuIcon}
                                    ></i>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: 'white',
        padding: '30px 40px',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '150px',
    },
    logo: {
        height: '40px',
    },
    menuContainer: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    button: {
        marginRight: '60px',
        color: 'black',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '20px 30px',
        fontSize: '18px',
        position: 'relative',
        transition: 'color 0.3s',
    },
    activeButton: {
        color: '#800020',
    },
    'button::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: '#800020',
        transform: 'scaleX(0)',
        transformOrigin: 'bottom right',
        transition: 'transform 0.3s ease-out',
    },
    'button:hover::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
    },
    'button.active::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
    },
    accountContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    accountIcon: {
        height: '40px',
        cursor: 'pointer',
        transition: 'transform 0.3s',
    },
    accountIconHover: {
        transform: 'scale(1.1)',
    },
    heartIcon: {
        fontSize: '24px',
        color: 'black',
        cursor: 'pointer',
        marginRight: '30px',
        transition: 'color 0.3s',
    },
    cartIcon: {
        fontSize: '24px',
        color: 'black',
        cursor: 'pointer',
        marginRight: '30px',
        transition: 'color 0.3s',
    },
    menu: {
        position: 'absolute',
        top: '40px',
        right: '0',
        background: 'linear-gradient(to top, black, gray)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        zIndex: 1001,
        overflow: 'hidden',
        border: '1px solid white',
        padding: '20px 0',
        transition: 'all 0.3s ease',
        width: '250px',
        fontFamily: "'Arial', sans-serif",
    },
    menuButton: {
        padding: '10px 20px',
        color: 'white',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        transition: 'background-color 0.3s',
        fontFamily: "'Arial', sans-serif",
    },
    menuButtonHover: {
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
    },
    menuIcon: {
        marginRight: '15px',
    },
    '@media (max-width: 768px)': {
        nav: {
            padding: '20px 30px',
        },
        logoContainer: {
            marginRight: '50px',
        },
        logo: {
            height: '30px',
        },
        button: {
            marginRight: '20px',
            fontSize: '14px',
        },
    },
    '@media (max-width: 480px)': {
        nav: {
            padding: '10px 20px',
        },
        logoContainer: {
            marginRight: '20px',
        },
        logo: {
            height: '20px',
        },
        button: {
            marginRight: '10px',
            fontSize: '12px',
        },
    },
};
export default NavBar;
