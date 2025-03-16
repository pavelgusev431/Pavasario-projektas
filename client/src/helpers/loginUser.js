import axios from 'axios';
import url from './getURL.js';
import sha1 from 'js-sha1';
import sha256 from 'js-sha256';
import Cookies from 'js-cookie';

const loginUser = async (user) => {
    try {
        const saltResponse = await axios.get(`http://localhost:3000/users/getSalt/${user.username}`, {
            withCredentials: true,
        });

        const salt = saltResponse.data.salt;
        if (!salt) {
            console.error("Ошибка: Соль не найдена для пользователя", user.username);
            return null;
        }

        const hashedPassword = sha256(sha1(user.password + salt));

        const loginResponse = await axios.post(
            "http://localhost:3000/users/login",
            { username: user.username, password: hashedPassword },
            { withCredentials: true }
        );

        const token = loginResponse.data.token;
        if (token) {
            Cookies.set("authToken", token, {
                expires: 1, // Токен живёт 1 день
                secure: false,
                sameSite: "strict",
            });
            console.log("✅ Ženklas sėkmingai išsaugotas slapuke: ", token);
        } else {
            console.error("❌ Klaida: simbolis negautas!");
        }

        return loginResponse.data.data;
    } catch (error) {
        console.error("❌ Prisijungimo klaida:", error.response?.data || error.message);
        return null;
    }
};

export default loginUser;
