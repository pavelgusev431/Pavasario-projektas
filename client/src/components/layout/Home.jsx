import { Outlet } from 'react-router';
import BannerCarousel from './Home/Carousel';

const Home = () => {
    return (
        <>
            <div>
                <BannerCarousel />
                <Outlet />
            </div>
        </>
    );
};

export default Home;
