import axios from 'axios';
import url from './getURL.js';

const getUserById = async (userId) => {
    try {
        const response = await axios.get(url(`users/id/${userId}`));
        return response;
    } catch (error) {
        console.error("❌ Klaida gaunant vartotoją pagal ID:", error.message);
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const response = await axios.get(url('users'));
        return response;
    } catch (error) {
        console.error("❌ Klaida gaunant visus vartotojus:", error.message);
        throw error;
    }
};

export { getUserById, getAllUsers };
