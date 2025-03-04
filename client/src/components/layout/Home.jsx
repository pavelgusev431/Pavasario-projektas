import { Outlet } from 'react-router';
import BannerCarousel from './Home/Carousel';
import NavBar from './NavBar';

const Home = () => {
    return (
        <>
            <NavBar />
            <div>
                <BannerCarousel />
                <Outlet />
            </div>
        </>
    );
};

export default Home;
