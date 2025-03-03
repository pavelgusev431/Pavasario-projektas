import { Outlet } from 'react-router';
import BannerCarousel from '../Carousel';

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
