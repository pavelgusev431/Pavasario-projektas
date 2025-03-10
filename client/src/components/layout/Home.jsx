import { Outlet } from 'react-router';
import BannerCarousel from './Home/Carousel.jsx';
import NavBar from './Navbar.jsx';
import { User } from 'lucide-react';
import UserProducts from '../UserProducts.jsx';

const Home = () => {
    return (
        <>
            <NavBar />
            <div>
                <BannerCarousel />
                <UserProducts />
                {/* <Outlet /> */}
            </div>
        </>
    );
};

export default Home;