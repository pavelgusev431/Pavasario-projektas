import axios from 'axios';
import url from './getURL.js';

const loginUser = async (user) => {
    try {
        const response = await axios.post("http://localhost:3000/users/login", user, {
            withCredentials: true, // ✅ Обязательно включаем куки
        });

        localStorage.setItem("authToken", response.data.token); // ✅ Сохраняем токен
        return response.data.data;
    } catch (error) {
        console.error("Ошибка входа:", error.response?.data || error.message);
        return null;
    }
};


export default loginUser;
