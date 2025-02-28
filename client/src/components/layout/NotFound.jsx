import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    };
    return (
        <>
            <div>404 Page not found.</div>
            <button
                onClick={goBack}
                className="border-black rounded bg-slate-100"
            >
                Return
            </button>
        </>
    );
};

export default NotFound;
