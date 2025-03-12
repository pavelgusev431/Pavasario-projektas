import axios from 'axios';
import url from './getURL.js';

const sendEmail = async (email) => {
    const response = await axios.post(url('users/forgot'), { email: email });
    return response.data;
};

const sendNewPassword = async (userid, salt, password) => {
    const response = await axios.post(url(`users/reset/${userid}`), {
        password: password,
        salt: salt,
    });
    return response.data;
};

export { sendEmail, sendNewPassword };
