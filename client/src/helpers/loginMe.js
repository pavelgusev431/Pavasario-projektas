import axios from 'axios';
import url from './getURL.js';

const loginMe = async () => {
    const response = await axios
        .get(url('users/u/me'), { withCredentials: true })
        .catch((error) => {
            return error;
        });
    return response;
};

export default loginMe;
