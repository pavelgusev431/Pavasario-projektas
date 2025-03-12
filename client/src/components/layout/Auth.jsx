import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useLocation, useNavigate } from 'react-router';
import sha1 from 'js-sha1';
import sha256 from 'js-sha256';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/home';
    if (from === '/logout') from = '/home';

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { setUser } = useContext(AuthContext);

    const [authType, setAuthType] = useState('signup');
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                authType === 'signup'
                    ? "http://localhost:3000/users/signup"
                    : "http://localhost:3000/users/login",
                data,
                {
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true 
                }
            );
    
            if (response?.data?.status === "success") {
                toast.success(
                    authType === "signup"
                        ? "Vartotojas sėkmingai sukurtas"
                        : "Sėkmingai prisijungėte",
                    { position: 'top-center', autoClose: 3000 }
                );
    
                setUser(response.data);
                setValue("username", "");
                setValue("email", "");
                setValue("password", "");
                setError("");
    
                setTimeout(() => navigate("/home"), 3000);
            } else {
                throw new Error(response?.data?.message || "Klaida autentifikuojant");
            }
        } catch (err) {
            console.error("❌ Klaida siuntimo metu:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Serverio klaida");
        }
    };
    

    return (
        <div className="relative flex min-h-screen w-full bg-gray-700 overflow-hidden">
            <ToastContainer />

            <div
                className={`flex w-[200%] transition-transform duration-700 ease-in-out ${
                    authType === 'signup' ? 'translate-x-0' : '-translate-x-1/2'
                }`}
            >
                <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-10">
                            Didžiausia rinka internete!
                        </h1>
                        <p className="animate-fade animate-ease-in-out animate-delay-[100ms] text-lg opacity-80 mt-2">
                            Prisijunkite prie{' '}
                            <span className="font-semibold">1000+</span>{' '}
                            mūsų aktyvios bendruomenės.
                        </p>
                        <p className="animate-fade animate-ease-in-out animate-delay-[100ms] text-lg opacity-80 mt-4">
                            Pradėkite pardavinėti savo produktus šiandien ir parodykite juos didžiulei auditorijai.
                        </p>
                        <p className="animate-fade animate-ease-in-out animate-delay-[200ms] mt-4 text-lg opacity-80">
                            Naršykite ir apsipirkite iš{' '}
                            <span className="font-semibold">5000+</span>{' '}
                            produktų asortimento.
                        </p>
                        <p className="mt-6 text-xl font-semibold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                            Pasiruošę tapti kažko didelio dalimi?{' '}
                            <span className="animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-pink-500">
                                Užsiregistruokite
                            </span>{' '}
                            dabar!
                        </p>
                    </div>
                </div>
                <div className="w-1/2 mt-[3.1cm] flex items-center justify-center bg-white p-8 rounded-[1cm] shadow-lg ">
                    <div className="max-w-sm w-full">
                        <h2 className="text-3xl font-bold text-center mb-2">
                            {authType === "signup" ? "Sukurti paskyrą" : "Prisijungti"}
                        </h2>
                        <p className="text-center text-gray-500 mb-6">
                            Įveskite savo duomenis
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <input
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    type="text"
                                    placeholder="Vartotojo vardas"
                                    {...register('username', { required: 'Vartotojo vardas yra būtinas' })}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>

                            {authType === "signup" && (
                                <div>
                                    <input
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        type="email"
                                        placeholder="El. paštas"
                                        {...register('email', {
                                            required: 'El. paštas yra būtinas',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Neteisingas el. pašto formatas'
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div>
                                <input
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    type="password"
                                    placeholder="Slaptažodis"
                                    {...register('password', {
                                        required: 'Slaptažodis yra būtinas',
                                        minLength: {
                                            value: 6,
                                            message: 'Slaptažodis turi būti ne mažiau kaip 6 simboliai'
                                        }
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                {authType === "signup" ? "Sukurti paskyrą" : "Prisijungti"}
                            </button>

                            <p className="text-center text-gray-500 mt-4">
                                {authType === "signup"
                                    ? "Jau turite paskyrą? "
                                    : "Neturite paskyros? "}
                                <span
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => setAuthType(authType === "signup" ? "login" : "signup")}
                                >
                                    {authType === "signup" ? "Prisijungti" : "Sukurti paskyrą"}
                                </span>
                            </p>

                            {error && (
                                <p className="text-red-500 text-sm mt-2 text-center">
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
