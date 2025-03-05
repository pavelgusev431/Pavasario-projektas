import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import createUser from '../../helpers/createUser.js';
import loginUser from '../../helpers/loginUser.js';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import ToggleAuthType from '../buttons/ToggleAuthType.jsx';
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
        <div className="flex min-h-screen w-full">
            {/* Left section */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-gray-700 text-white items-center justify-center p-10">
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

            {/* Right section */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6 bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        {authType === 'login' ? 'Login' : 'Create an Account'}
                    </h2>

                    {/* Toggle Auth Type */}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setAuthType('signup')}
                            className={`px-4 py-2 w-1/2 text-sm font-medium rounded-l-lg transition ${
                                authType === 'signup'
                                    ? 'bg-black text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => setAuthType('login')}
                            className={`px-4 py-2 w-1/2 text-sm font-medium rounded-r-lg transition ${
                                authType === 'login'
                                    ? 'bg-black text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            Login
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="mb-4">
                            <input
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
                            className="w-full px-4 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300"
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
                                    authType === 'login' ? 'signup' : 'login'
                                )
                            }
                            className="text-black font-medium hover:underline"
                        >
                            {authType === 'login' ? 'Sign Up' : 'Log In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
