import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import createUser from '../../../helpers/createUser.js';
import loginUser from '../../../helpers/loginUser.js';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import { useLocation, useNavigate } from 'react-router';
import UserCount from '../../../helpers/getAllUserCount.js';
import ProductCount from '../../../helpers/getAllProductCount.js';
import { ToastContainer, toast } from 'react-toastify';
import SubmitEmailForPasswordReset from './SubmitEmailForPasswordReset.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/home';
    if (from === '/logout') from = '/home';

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();
    const { setAuth } = useContext(AuthContext);

    const userCount = UserCount();
    const productCount = ProductCount();
    const [authType, setAuthType] = useState('signup');
    const [error, setError] = useState('');
    const [showReset, setShowReset] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleResetShow = () => setShowReset(!showReset);

    const onSubmit = async (data) => {
        try {
            if (authType === 'signup') {
                const response = await createUser({
                    ...data,
                    repeatPassword: undefined,
                });
                if (response?.status === 201) {
                    setValue('username', '');
                    setValue('email', '');
                    setValue('password', '');
                    setValue('repeatPassword', '');
                    setError('');
                    toast.success('Your account is created successfully!', {
                        position: 'top-center',
                        autoClose: 10000,
                        style: { background: '#161D2F', color: '#FFFFFF' },
                        hideProgressBar: true,
                    });
                    setTimeout(() => navigate('/home'), 3000);
                } else {
                    throw new Error(
                        response?.data?.message || 'Failed to create user'
                    );
                }
            } else {
                const user = await loginUser(data);
                if (!user) throw new Error('Invalid login credentials');
                setAuth(user);
                toast.success('Logged in successfully!', {
                    position: 'top-center',
                    autoClose: 10000,
                    style: { background: '#161D2F', color: '#FFFFFF' },
                    hideProgressBar: true,
                });
                setTimeout(() => navigate(from, { replace: true }), 3000);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full bg-gray-700 overflow-hidden">
            <ToastContainer />
            <div
                className={`flex w-[200%] md:duration-500 md:animate-ease-in 
    ${authType === 'signup' ? 'sm:translate-x-0 max-sm:translate-x-0' : 'sm:-translate-x-1/2 max-sm:translate-x-0'}`}
            >
                {/* Left Section (Signup) - Hidden on Mobile */}
                <div className="w-1/2 max-sm:hidden flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-10">
                            The{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                Biggest Marketplace
                            </span>{' '}
                            on the Web!
                        </h1>
                        <p className="text-lg opcaity-80 mt-2">
                            Join over{' '}
                            <span className="font-semibold">{userCount}</span>{' '}
                            users in our vibrant community.
                        </p>
                        <p className="text-lg opacity-80 mt-4">
                            Browse more than {productCount} products and find
                            the perfect fit for your needs.
                        </p>
                        <p className="text-lg opacity-80 mt-4">
                            Do not miss out,{' '}
                            <span className="animate-pulse animate-infinite text-transparent bg-clip-text bg-gradient-to-r to-[#9153b0] from-[#03af6d]">
                                Sign Up
                            </span>{' '}
                            now and start buying & selling with confidence!
                        </p>
                    </div>
                </div>

                {/* Right Section (Form) */}
                <div className="w-1/2 max-sm:w-full flex items-center justify-center p-6 bg-white">
                    <div className="max-w-md w-full bg-white p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-800">
                            {authType === 'login'
                                ? 'Login'
                                : 'Create an Account'}
                        </h2>

                        {/* Toggle Buttons */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setAuthType('signup')}
                                className={`px-4 py-2 w-1/2 text-sm font-medium rounded-l-lg transition ${
                                    authType === 'signup'
                                        ? 'bg-[#D30043] text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => setAuthType('login')}
                                className={`px-4 py-2 w-1/2 text-sm font-medium rounded-r-lg transition ${
                                    authType === 'login'
                                        ? 'bg-[#D30043] text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                Login
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-6"
                        >
                            <div className="mb-4">
                                <input
                                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
                                    type="text"
                                    placeholder="Username"
                                    {...register('username', {
                                        required: 'Username is required',
                                        minLength: {
                                            value: 4,
                                            message:
                                                'Username must be at least 4 symbols long',
                                        },
                                        pattern: {
                                            value: /^[A-Za-z0-9]+$/,
                                            message:
                                                'Username must contain only letters',
                                        },
                                    })}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>

                            {authType === 'signup' && (
                                <div className="mb-4">
                                    <input
                                        className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
                                        type="email"
                                        placeholder="Email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            validate: (value) => {
                                                return authType === 'signup'
                                                    ? (/^[A-Za-z0-9.-]{1,64}@[A-Za-z0-9.-]{1,255}$/.test(
                                                          value
                                                      ) &&
                                                          /^[A-Za-z0-9]([A-Za-z0-9]+[.-]*)*[A-Za-z0-9]@.*$/.test(
                                                              value
                                                          ) &&
                                                          /^.*@([A-Za-z0-9]{2,63}[.-])+[A-Za-z]{2,}$/.test(
                                                              value
                                                          )) ||
                                                          'Invalid email address format'
                                                    : true;
                                            },
                                            onChange: () => {
                                                setError('');
                                                clearErrors('email');
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="mb-4 relative">
                                <input
                                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 3,
                                            message: 'Password is too short',
                                        },
                                        pattern: {
                                            value: /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]{7,}$/,
                                            message:
                                                "Password must only contain letters, numbers and these special characters: $&+,:;=?@#|'<>.^*()%!-",
                                        },
                                        onChange: () => {
                                            setError('');
                                            clearErrors('password');
                                        },
                                        validate: (value) => {
                                            return (
                                                (authType === 'signup' &&
                                                    /^.*[A-Z].*$/.test(value) &&
                                                    /^.*\d.*$/.test(value) &&
                                                    /^.*[$&+,:;=?@#|'<>.^*()%!-].*$/.test(
                                                        value
                                                    )) ||
                                                (authType === 'signup'
                                                    ? 'Password must contain at least 1 capital letter, 1 number and 1 special character'
                                                    : true)
                                            );
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-5 text-gray-600"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {authType === 'signup' && (
                                <div className="mb-4 relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
                                        placeholder="Repeat Password"
                                        {...register('repeatPassword', {
                                            required: {
                                                value: true,
                                                message:
                                                    'This field is required',
                                            },
                                            validate: (value) =>
                                                value === watch('password') ||
                                                'Passwords must match',
                                        })}
                                    />
                                    {errors.repeatPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.repeatPassword.message}
                                        </p>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full px-4 py-3 text-white bg-[#D30043] rounded-lg hover:bg-gray-800 transition duration-300"
                            >
                                {authType === 'login' ? 'Login' : 'Sign Up'}
                            </button>

                            {error && (
                                <p className="text-red-500 text-sm mt-2 text-center">
                                    {error}
                                </p>
                            )}

                            {authType === 'signup' && (
                                <p className="mt-2">
                                    Already have an account?{' '}
                                    <span
                                        className="text-blue-400 hover:cursor-pointer"
                                        onClick={() => setAuthType('login')}
                                    >
                                        Login
                                    </span>
                                </p>
                            )}

                            {authType === 'login' && (
                                <p className="mt-2">
                                    Don't have an account?{' '}
                                    <span
                                        className="text-blue-400 hover:cursor-pointer"
                                        onClick={() => setAuthType('signup')}
                                    >
                                        Sign Up
                                    </span>
                                </p>
                            )}
                        </form>

                        {/* Forgot Password */}
                        {authType === 'login' && (
                            <>
                                <button
                                    onClick={handleResetShow}
                                    className="text-blue-400 text-sm mb-3 underline bg-none border-none hover:cursor-pointer"
                                >
                                    Forgot password?
                                </button>
                                {showReset && <SubmitEmailForPasswordReset />}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Section (Login Info) - Hidden on Mobile */}
            <div
                className={`absolute top-0 max-sm:hidden right-0 w-1/2 h-full bg-gradient-to-br from-gray-900 to-gray-700 
    flex items-center justify-center text-white p-10 md:duration-500 md:animate-ease-in
    ${authType === 'login' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-full -z-10'}`}
            >
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Welcome Back!
                    </h1>
                    <p className="text-lg opacity-75">
                        Log in to continue your journey on{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#c4768f] from-[#DB0045]">
                            Just do it
                        </span>{' '}
                        marketplace.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
