import axios from 'axios';
import getURL from './getURL.js';
import sha1 from 'js-sha1';
import sha256 from 'js-sha256';
import Cookies from 'js-cookie';

const createUser = async (user) => {
    try {
        const apiUrl = getURL('users');
        console.log(`API URL: ${apiUrl}`);

        // 🔹 Отправляем запрос на регистрацию
        const response = await axios.post(apiUrl, {
            ...user,
            password: sha256(sha1(user.password))
        }, { withCredentials: true });

        // ✅ Сохраняем токен в куки
        const token = response.data.token;
        if (token) {
            Cookies.set("authToken", token, {
                expires: 1, // 1 день
                secure: false,
                sameSite: "strict",
            });
            console.log("✅ Токен успешно сохранён в куки после регистрации:", token);
        } else {
            console.error("❌ Ошибка: токен не получен!");
        }

        return response;
    } catch (error) {
        console.error("Ошибка регистрации:", error.message);
        return error.response || { status: 500, data: { message: "Сервер недоступен" } };
    }
};

export default createUser;
