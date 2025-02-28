import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import createUser from '../../helpers/createUser.js';
import loginUser from '../../helpers/loginUser.js';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import ToggleAuthType from '../buttons/ToggleAuthType.jsx';
import { useLocation, useNavigate } from 'react-router';

const Auth = () => {
    //check if navigated from other page
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/home';
    if (from === '/logout') from = '/home';
    //form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    //states
    const [error, setError] = useState('');
    const { auth, setAuth } = useContext(AuthContext);
    const [authType, setAuthType] = useState('signup');

    //submit formdata
    const onSubmit = async (data) => {
        //signup
        if (authType === 'signup') {
            const response = await createUser(data);
            try {
                if (response.status === 201) {
                    alert('User created successfully');
                    setValue('username', '');
                    setValue('email', '');
                    setValue('password', '');
                    setError('');
                }
            } catch (error) {
                console.log(error);
                setError(response.data.message);
            }
        } //login
        else {
            try {
                const user = await loginUser(data);
                setAuth(user);
                navigate(from, { replace: true });
                alert('You are now logged in');
            } catch (error) {
                setAuth(!auth);
                setError(error.message);
            }
        }
    };

    return (
        <div>
            <div className="w-1/4 mx-auto mt-20">
                {authType === 'login' ? 'Login' : 'Signup'}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-1/4 mx-auto mt-5"
            >
                {/* username */}
                <input
                    className="input input-bordered"
                    type="name"
                    name="username"
                    placeholder="Username"
                    {...register('username', { required: true })}
                />
                {errors?.username && <span>Username is required</span>}
                {/* email */}
                {authType === 'signup' ? (
                    <input
                        className="input input-bordered"
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...register('email', { required: true })}
                    />
                ) : (
                    <></>
                )}
                {errors?.email && <span>Email is required</span>}
                {/* password */}
                <input
                    className="input input-bordered"
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                />
                {errors?.password && <span>Password is required</span>}
                {/* submit */}
                <button type="submit" className="btn">
                    Submit
                </button>
                {error && <span>{error}</span>}
            </form>
            {/* toggle auth */}
            <ToggleAuthType authType={authType} setAuthType={setAuthType} />
        </div>
    );
};

export default Auth;
