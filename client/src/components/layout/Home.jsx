import { Outlet } from 'react-router';
import BannerCarousel from './Home/Carousel';
import NavBar from './NavBar';
import UsersProducts from '../UsersProducts';

const Home = () => {
    return (
        <>
            <NavBar />
            <div>
                <BannerCarousel />
                <UsersProducts />
                <div className='pl-2'>
                <Outlet/> 
                </div>
            </div>
        </>
    );
};

export default Home;
