import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();

    const handleAuth = () => {
        navigate('/');
    };
    return (
        <>
            <div>Home</div>
            <button
                onClick={handleAuth}
                className="border-black rounded bg-slate-100"
            >
                Login/signup
            </button>
        </>
    );
};

export default Home;
