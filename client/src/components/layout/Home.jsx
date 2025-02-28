import BannerCarousel from '../Carousel'

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
        </>
    );
};

export default Home;
