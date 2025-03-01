import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={{ backgroundColor: 'white', padding: '10px', position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px', marginRight: '20px' }} />
                    <Link to="/home" style={{ marginRight: '20px', color: 'black', textDecoration: 'none' }}>Home</Link>
                    <Link to="/contact" style={{ marginRight: '20px', color: 'black', textDecoration: 'none' }}>Contact</Link>
                    <Link to="/about" style={{ marginRight: '20px', color: 'black', textDecoration: 'none' }}>About</Link>
                    <Link to="/signup" style={{ color: 'black', textDecoration: 'none' }}>Sign Up</Link>
                </div>
                <div>
                    <input type="text" placeholder="Search" style={{ padding: '5px' }} />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;