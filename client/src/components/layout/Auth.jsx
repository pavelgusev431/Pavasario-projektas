import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import createUser from '../../helpers/createUser.js';
import loginUser from '../../helpers/loginUser.js';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import ToggleAuthType from '../buttons/ToggleAuthType.jsx';
import { useLocation, useNavigate } from 'react-router';
import SubmitEmailForPasswordReset from './SubmitEmailForPasswordReset.jsx';

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

    const [authType, setAuthType] = useState('signup');
    const [error, setError] = useState('');

    const [showReset, setShowReset] = useState(false);

    const handleResetShow = () => {
        setShowReset(!showReset);
    };

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    {authType === 'login' ? 'Login' : 'Sign Up'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        {authType === 'login' ? 'Login' : 'Sign Up'}
                    </button>

                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                            {error}
                        </p>
                    )}
                </form>

                <div className="mt-4 text-center">
                    <ToggleAuthType
                        authType={authType}
                        setAuthType={setAuthType}
                    />
                </div>
                {authType === 'login' && (
                    <>
                        <button
                            onClick={handleResetShow}
                            className="text-blue-400 underline bg-none border-none hover:cursor-pointer"
                        >
                            Forgot password
                        </button>
                        {showReset && <SubmitEmailForPasswordReset />}
                    </>
                )}
            </div>
        </div>
    );
};

export default Auth;
