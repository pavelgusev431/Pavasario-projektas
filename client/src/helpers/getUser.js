import axios from 'axios';
import url from './getURL.js';

const getUserById = async (userId) => {
    const response = await axios.get(url(`users/${userId}`)).catch((error) => {
        console.log(error);
    });
    return response;
};

export { getUserById };
