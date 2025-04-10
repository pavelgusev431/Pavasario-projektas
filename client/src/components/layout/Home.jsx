import BannerCarousel from './Home/Carousel';
import HighestRatedProducts from '../products/HighestRatedProducts';
import HotProducts from '../products/HotProducts';
import TrendingUserProducts from '../products/TrendingUserProducts';
import TopUserProducts from '../products/TopUserProducts';
import BackToTopButton from '../buttons/BackToTopButton';

const Home = () => {
    return (
        <>
            <BannerCarousel />
            <HighestRatedProducts />
            <HotProducts />
            <TrendingUserProducts />
            <TopUserProducts />
            <BackToTopButton />
        </>
    );
};

export default Home;
