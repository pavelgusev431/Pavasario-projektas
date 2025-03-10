import axios from 'axios';
import url from './getURL.js';
import sha1 from 'js-sha1';
import sha256 from 'js-sha256';
import Cookies from 'js-cookie';

const loginUser = async (user) => {
    try {
        // 🔹 Получаем соль для пользователя
        const saltResponse = await axios.get(`http://localhost:3000/users/getSalt/${user.username}`, {
            withCredentials: true,
        });

        const salt = saltResponse.data.salt;
        if (!salt) {
            console.error("Ошибка: Соль не найдена для пользователя", user.username);
            return null;
        }

        // 🔹 Хешируем пароль с солью
        const hashedPassword = sha256(sha1(user.password + salt));

        // 🔹 Отправляем запрос на логин
        const loginResponse = await axios.post(
            "http://localhost:3000/users/login",
            { username: user.username, password: hashedPassword },
            { withCredentials: true }
        );

        // ✅ Сохраняем токен в куки
        const token = loginResponse.data.token;
        if (token) {
            Cookies.set("authToken", token, {
                expires: 1, // Токен живёт 1 день
                secure: false, // ❗ В продакшене менять на `true`
                sameSite: "strict",
            });
            console.log("✅ Токен успешно сохранён в куки:", token);
        } else {
            console.error("❌ Ошибка: токен не получен!");
        }

        return loginResponse.data.data;
    } catch (error) {
        console.error("Ошибка входа:", error.response?.data || error.message);
        return null;
    }
};

export default loginUser;
