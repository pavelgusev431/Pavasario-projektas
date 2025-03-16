import axios from 'axios';
import getURL from './getURL.js';
import Cookies from 'js-cookie';

const createUser = async (user) => {
    const { repeatPassword, ...userData } = user;
    try {
        const apiUrl = getURL('users/signup');
        console.log(`API URL: ${apiUrl}`);

        const response = await axios.post(apiUrl, {
            ...userData,
        }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true         
        });

        console.log("✅ Успешная регистрация:", response.data);
        return response;
    } catch (error) {
        console.error("❌ Ошибка регистрации:", error.response?.data || error.message);
        return error.response || { status: 500, data: { message: "Сервер недоступен" } };
    }
};

export default createUser;
