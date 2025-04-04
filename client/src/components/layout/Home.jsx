import BannerCarousel from './Home/Carousel';
import NavBar from './navbar/NavBar';
import HighestRatedProducts from '../products/HighestRatedProducts';
import HotProducts from '../products/HotProducts';
import TrendingUserProducts from '../products/TrendingUserProducts';
import TopUserProducts from '../products/TopUserProducts';
import SearchBar from './SearchBar'; // Import the SearchBar component
import BackToTopButton from '../buttons/BackToTopButton';

const Home = () => {
    const handleSearch = (query, category) => {
        console.log('Search query:', query, 'Category:', category);
        // Implement search functionality here
    };
    return (
        <>
            {/* <NavBar /> */}
            <div>
                <BannerCarousel />
                <SearchBar onSearch={handleSearch} />{' '}
                {/* Add the SearchBar component */}
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
