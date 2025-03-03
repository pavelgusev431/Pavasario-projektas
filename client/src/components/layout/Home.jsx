import { Outlet } from 'react-router';
import BannerCarousel from '../Carousel';
import NavBar from './NavBar';

const Home = () => {
    return (
        <>
            <NavBar />
            <div>
                <BannerCarousel />
                <Outlet/>
            </div>
        </>
    );
};

export default Home;
