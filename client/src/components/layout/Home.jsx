import { Outlet } from 'react-router';
import BannerCarousel from '../Carousel';

const Home = () => {
    return (
        <>
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
