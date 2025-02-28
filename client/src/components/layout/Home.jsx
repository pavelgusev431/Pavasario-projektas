import BannerCarousel from '../Carousel';

const Home = () => {
    const navigate = useNavigate();

    const handleAuth = () => {
        navigate('/');
    };
    return (
        <>
            <div>
                <BannerCarousel />
            </div>
            <div>1</div>
        </>
    );
};

export default Home;
