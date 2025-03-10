import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import ToggleAuthType from '../buttons/ToggleAuthType.jsx';
import { useLocation, useNavigate } from 'react-router';
import sha1 from 'js-sha1';
import sha256 from 'js-sha256';
import Cookies from 'js-cookie';

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/home';
    if (from === '/logout') from = '/home';

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { setUser } = useContext(AuthContext);
    const [authType, setAuthType] = useState('signup');
    const [error, setError] = useState('');

    // 🔥 Функция получения соли
    const getSalt = async (username) => {
        try {
            const response = await axios.get(`http://localhost:3000/users/getSalt/${username}`);
            return response.data.salt;
        } catch (error) {
            console.error("❌ Ошибка получения соли:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Ошибка получения соли");
        }
    };

    // 🔥 Регистрация
    const registerUser = async (user) => {
        try {
            const response = await axios.post("http://localhost:3000/users/signup", user, {
                withCredentials: true,
            });

            console.log("✅ Успешная регистрация, токен получен:", response.data.token);

            localStorage.setItem("authToken", response.data.token);
            Cookies.set("authToken", response.data.token, { path: "/", secure: true });

            return response.data;
        } catch (error) {
            console.error("❌ Ошибка регистрации:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Ошибка при регистрации пользователя");
        }
    };

    // 🔥 Вход
    const loginUser = async (data) => {
        try {
            const salt = await getSalt(data.username);
            const hashedPassword = sha256(sha1(data.password + salt));

            const response = await axios.post("http://localhost:3000/users/login", {
                username: data.username,
                password: hashedPassword,
            }, {
                withCredentials: true,
            });

            console.log("✅ Успешный вход, токен получен:", response.data.token);

            localStorage.setItem("authToken", response.data.token);
            Cookies.set("authToken", response.data.token, { path: "/", secure: true });

            return response.data;
        } catch (error) {
            console.error("❌ Ошибка входа:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Ошибка при входе в систему");
        }
    };

    // 🔥 Отправка формы
    const onSubmit = async (data) => {
        try {
            let response;
            if (authType === "signup") {
                response = await registerUser(data);
            } else {
                response = await loginUser(data);
            }

            if (response?.status === "success") {
                alert(authType === "signup" ? "Пользователь успешно создан" : "Вы вошли в систему");

                setUser(response.data);
                setValue("username", "");
                setValue("email", "");
                setValue("password", "");
                setError("");

                navigate("/home");
            } else {
                throw new Error(response?.message || "Ошибка при авторизации");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    {authType === 'login' ? 'Вход' : 'Регистрация'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            placeholder="Имя пользователя"
                            {...register('username', { required: "Имя пользователя обязательно" })}
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    {authType === 'signup' && (
                        <div className="mb-4">
                            <input
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="email"
                                placeholder="Email"
                                {...register('email', { required: "Email обязателен" })}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                    )}

                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            placeholder="Пароль"
                            {...register('password', { required: "Пароль обязателен" })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        {authType === 'login' ? "Войти" : "Зарегистрироваться"}
                    </button>

                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                </form>

                <div className="mt-4 text-center">
                    <ToggleAuthType authType={authType} setAuthType={setAuthType} />
                </div>
            </div>
        </div>
    );
};

export default Auth;
