import axios from 'axios';
import getURL from './getURL.js';
import Cookies from 'js-cookie';

const loginUser = async (user) => {
    try {
        console.log("🧪 Naudotojo duomenys:", user);

        if (!user || !user.password) {
            console.error("❌ Klaida: `user` arba `user.password` nėra apibrėžti.");
            return null;
        }

        const loginResponse = await axios.post(
            "http://localhost:3000/users/login",
            { username: user.username, password: user.password }, // <-- Чистый пароль
            { withCredentials: true }
        );

        const token = loginResponse.data.token;
        if (token) {
            Cookies.set("authToken", token, {
                expires: 1,
                secure: false,
                sameSite: "Lax",
            });
            console.log("✅ Ženklas sėkmingai išsaugotas slapуке: ", token);
        } else {
            console.error("❌ Klaida: simbolis negautas!");
        }

        localStorage.setItem("token", token);
        console.log("✅ [FRONTEND] Žetonas sėkmingai išsaugotas:", token);

        return loginResponse.data.data;
    } catch (error) {
        console.error("❌ Prisijungimo klaida:", error.response?.data || error.message);
        return null;
    }
};

export default loginUser;
