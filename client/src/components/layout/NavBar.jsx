import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const handleNavigation = (path) => {
        window.location.href = path;
    };

    return (
        <nav style={{ backgroundColor: 'white', padding: '30px 40px', position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px', marginRight: '60px' }} />
                    <button onClick={() => handleNavigation('/home')} style={{ marginRight: '60px', color: 'black', textDecoration: 'none', background: 'none', border: 'none' }}>Home</button>
                    <button onClick={() => handleNavigation('/contact')} style={{ marginRight: '60px', color: 'black', textDecoration: 'none', background: 'none', border: 'none' }}>Contact</button>
                    <button onClick={() => handleNavigation('/about')} style={{ marginRight: '60px', color: 'black', textDecoration: 'none', background: 'none', border: 'none' }}>About</button>
                    <button onClick={() => handleNavigation('/signup')} style={{ color: 'black', textDecoration: 'none', background: 'none', border: 'none' }}>Sign Up</button>
                </div>
                <div>
                    <input type="text" placeholder="Search" style={{ padding: '10px', width: '400px' }} />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;