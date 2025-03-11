import { Outlet } from 'react-router';
import BannerCarousel from './Home/Carousel';
import NavBar from './NavBar';
import HighestRatedProducts from '../products/HighestRatedProducts';
import HotProducts from '../products/HotProducts';
import TrendingUserProducts from '../products/TrendingUserProducts';
import TopUserProducts from '../products/TopUserProducts';
const Home = () => {
    return (
        <>
            <NavBar />
            <div>
                <BannerCarousel />
                <HighestRatedProducts />
                <HotProducts />
                <TrendingUserProducts />
                <TopUserProducts />
                <div className="pl-2">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Home;
