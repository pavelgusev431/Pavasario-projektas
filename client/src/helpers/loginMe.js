import axios from 'axios';
import getURL from './getURL.js';

const loginUser = async (user) => {
    try {
        const response = await axios.post(getURL('users', 'login'), user, {
            withCredentials: true,
        });

        localStorage.setItem("authToken", response.data.token);
        return response.data.data;
    } catch (error) {
        console.error("Prisijungimo klaida:", error.response?.data || error.message);
        return null;
    }
};

export default loginUser;
