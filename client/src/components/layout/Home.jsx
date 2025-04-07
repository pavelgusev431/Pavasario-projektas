import BannerCarousel from './Home/Carousel';
import NavBar from './navbar/NavBar';
import HighestRatedProducts from '../products/HighestRatedProducts';
import HotProducts from '../products/HotProducts';
import TrendingUserProducts from '../products/TrendingUserProducts';
import TopUserProducts from '../products/TopUserProducts';
import BackToTopButton from '../buttons/BackToTopButton';

const Home = () => {
    return (
        <>
            <div>
                <BannerCarousel />
                <HighestRatedProducts />
                <HotProducts />
                <TrendingUserProducts />
                <TopUserProducts />
                <BackToTopButton />
            </div>
        </>
    );
};

export default Home;
