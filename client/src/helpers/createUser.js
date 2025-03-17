import axios from 'axios';
import getURL from './getURL.js';
import Cookies from 'js-cookie';

const createUser = async (user) => {
    try {
        console.log("🟡 Į serverį siunčiami duomenys:", user);

        if (!user.username || !user.password || !user.email) {
            console.error("❌ Klaida: visi laukai yra privalomi.");
            return { status: 400, data: { message: "Visi laukai yra privalomi." } };
        }

        const apiUrl = getURL('users/signup');
        console.log(`API URL: ${apiUrl}`);

        const response = await axios.post(apiUrl, {
            ...user,
        }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true         
        });

        console.log("✅ Sėkminga registracija:", response.data);
        return response;
    } catch (error) {
        console.error("❌ Registracijos klaida:", error.response?.data || error.message);
        return error.response || { status: 500, data: { message: "Serveris nepasiekiamas" } };
    }
};

export default createUser;
