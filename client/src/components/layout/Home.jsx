import { Outlet } from 'react-router';
import BannerCarousel from './Home/Carousel';
import NavBar from './NavBar';


const Home = () => {
    return (
        <>
            <NavBar />
            <div>
                <BannerCarousel />
                <div className='pl-2'>
                <Outlet/> 
                </div>
            </div>
        </>
    );
};

export default Home;
