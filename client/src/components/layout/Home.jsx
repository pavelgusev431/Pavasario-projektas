import { Outlet } from 'react-router';
import BannerCarousel from './Home/Carousel.jsx';
import NavBar from './NavBar';
import UsersProducts from '../UsersProducts.jsx';

const Home = () => {
    return (
        <>
            <NavBar />
            <div>
                <BannerCarousel />
                <div className="pl-2">
                    <UsersProducts />
                    <Outlet />
                </div>                
            </div>
        </>
    );
};

export default Home;
