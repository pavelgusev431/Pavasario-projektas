import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext.jsx';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
    };
    const isActive = (path) => {
        return location.pathname === path ? { textDecoration: 'underline' } : {};
    };

    const handleLogout = () => {
        setAuth(null);
        navigate('/home');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <div style={styles.logoContainer}>
                    <img src="../src/public/banner_images/logo.png" alt="Logo" style={styles.logo} />
                </div>
                <div style={styles.menuContainer}>
                    <button onClick={() => handleNavigation('/home')} style={{ ...styles.button, ...isActive('/home') }}>Home</button>
                    <button onClick={() => handleNavigation('/contact')} style={{ ...styles.button, ...isActive('/contact') }}>Contact</button>
                    <button onClick={() => handleNavigation('/about')} style={{ ...styles.button, ...isActive('/about') }}>About</button>
                    {!auth && (
                        <button onClick={() => handleNavigation('/signup')} style={{ ...styles.button, ...isActive('/signup') }}>Sign Up</button>
                    )}
                </div>
                {auth && (
                    <div style={styles.accountContainer}>
                        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
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
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
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
        padding: '10px 20px',
        fontSize: '16px',
    },
    accountContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logoutButton: {
        color: 'black',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 20px',
        fontSize: '16px',
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