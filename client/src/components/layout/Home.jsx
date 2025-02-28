import React from 'react';
import { useNavigate } from 'react-router-dom';
import BannerCarousel from '../Carousel';
import NavBar from './NavBar';

const Home = () => {
    const navigate = useNavigate();

    const handleAuth = () => {
        navigate('/');
    };

    return (
        <>
            <NavBar />
            <div>
                <BannerCarousel />
            </div>
            <div>1</div>
        </>
    );
};

export default Home;
