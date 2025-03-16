import BannerCarousel from './Home/Carousel';
import NavBar from './NavBar';
import HighestRatedProducts from '../products/HighestRatedProducts.jsx';
import HotProducts from '../products/HotProducts.jsx';
import TrendingUserProducts from '../products/TrendingUserProducts.jsx';
import TopUserProducts from '../products/TopUserProducts.jsx';
import SearchBar from "./SearchBar.jsx";

const Home = () => {
  const handleSearch = (query, category) => {
    console.log("Search query:", query, "Category:", category);
    // Implement search functionality here
  };
    return (
        <>
            <NavBar />
            <div>
                <BannerCarousel />                
                <SearchBar onSearch={handleSearch} />
                <HighestRatedProducts />
                <HotProducts />
                <TrendingUserProducts />
                <TopUserProducts />
                
            </div>
        </>
    );
};

export default Home;