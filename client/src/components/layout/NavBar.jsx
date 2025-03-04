import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => {
        return location.pathname === path ? { textDecoration: 'underline' } : {};
    };

    return (
        <nav style={{ backgroundColor: 'white', padding: '30px 40px', position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="../src/public/banner_images/logo.png" alt="Logo" style={{ height: '40px', marginRight: '150px' }} />
                    <button onClick={() => handleNavigation('/home')} style={{ ...isActive('/home'), marginRight: '60px', color: 'black', background: 'none', border: 'none', cursor: 'pointer' }}>Home</button>
                    <button onClick={() => handleNavigation('/contact')} style={{ ...isActive('/contact'), marginRight: '60px', color: 'black', background: 'none', border: 'none', cursor: 'pointer' }}>Contact</button>
                    <button onClick={() => handleNavigation('/about')} style={{ ...isActive('/about'), marginRight: '60px', color: 'black', background: 'none', border: 'none', cursor: 'pointer' }}>About</button>
                    <button onClick={() => handleNavigation('/signup')} style={{ ...isActive('/signup'), color: 'black', background: 'none', border: 'none', cursor: 'pointer' }}>Sign Up</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;