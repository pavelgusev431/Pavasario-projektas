import axios from 'axios';
import url from './getURL.js';

const updateUserInfo = async (id, data) => {
    const response = await axios
        .patch(url(`users/update/${id}`), data, { withCredentials: true })
        .catch((error) => console.log(error));
    return response;
};

const updatePassword = async (id, data) => {
    const response = await axios
        .patch(url(`users/password/${id}`), data, { withCredentials: true })
        .catch((error) => console.log(error));
    return response;
};

export { updateUserInfo, updatePassword };
