import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import createUser from '../../helpers/createUser.js';
import loginUser from '../../helpers/loginUser.js';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useLocation, useNavigate } from 'react-router';
import UserCount from '../../helpers/getAllUserCount.js';

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/home';
    if (from === '/logout') from = '/home';

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const { setAuth } = useContext(AuthContext);

    const userCount = UserCount();
    const [authType, setAuthType] = useState('signup');
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            if (authType === 'signup') {
                const response = await createUser(data);
                if (response?.status === 201) {
                    alert('User created successfully');
                    setValue('username', '');
                    setValue('email', '');
                    setValue('password', '');
                    setError('');
                    navigate('/home');
                } else {
                    throw new Error(
                        response?.data?.message || 'Failed to create user'
                    );
                }
            } else {
                const user = await loginUser(data);
                if (!user) {
                    throw new Error('Invalid login credentials');
                }
                setAuth(user);
                navigate(from, { replace: true });
                alert('You are now logged in');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full bg-gray-700 overflow-hidden">
            {/* Animated Container */}
            <div
                className={`flex w-[200%] transition-transform duration-700 ease-in-out ${
                    authType === 'signup' ? 'translate-x-0' : '-translate-x-1/2'
                }`}
            >
                {/* Left Section (Signup) */}
                <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">
                            Biggest marketplace on localhost!
                        </h1>
                        <p className="mt-2 text-lg opacity-75">
                            Join a community of{' '}
                            <span className="font-semibold">{userCount}</span>{' '}
                            users.
                        </p>
                    </div>
                </div>

                {/* Right Section (Form) */}
                <div className="w-1/2 flex items-center rounded-2xl justify-center p-6 bg-white">
                    <div className="max-w-md w-full bg-white p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-800">
                            {authType === 'login'
                                ? 'Login'
                                : 'Create an Account'}
                        </h2>

                        {/* Toggle Auth Type */}
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
                                        className="w-full px-4 py-3 rounded-lg border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
                                        type="email"
                                        placeholder="Email"
                                        {...register('email', {
                                            required: 'Email is required',
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="mb-4">
                                <input
                                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#DB0045] peer"
                                    type="password"
                                    placeholder="Password"
                                    {...register('password', {
                                        required: 'Password is required',
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
                                className="w-full px-4 py-3 text-white bg-[#D30043] rounded-lg hover:bg-gray-800 transition duration-300"
                            >
                                {authType === 'login' ? 'Login' : 'Sign Up'}
                            </button>

                            {error && (
                                <p className="text-red-500 text-sm mt-2 text-center">
                                    {error}
                                </p>
                            )}
                        </form>

                        {/* Footer */}
                        <div className="mt-4 text-center text-sm">
                            {authType === 'login'
                                ? "Don't have an account?"
                                : 'Already have an account?'}{' '}
                            <button
                                onClick={() =>
                                    setAuthType(
                                        authType === 'login'
                                            ? 'signup'
                                            : 'login'
                                    )
                                }
                                className="text-black font-medium hover:underline"
                            >
                                {authType === 'login' ? 'Sign Up' : 'Log In'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Login Welcome Container */}
            </div>
            <div
                className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-gray-900 to-gray-700 
                    flex items-center justify-center text-white p-10 transition-all duration-700 ease-in-out 
                    ${
                        authType === 'login'
                            ? 'opacity-100 translate-x-0 z-10'
                            : 'opacity-0 translate-x-full -z-10'
                    }`}
            >
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 animate-fade-in">
                        Welcome Back!
                    </h1>
                    <p className="text-lg opacity-75 animate-fade-in delay-200">
                        Log in to continue your journey on localhost marketplace
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
