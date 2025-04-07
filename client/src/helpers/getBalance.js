import url from './getURL';
import axios from 'axios';

const getBalance = async () => {
    const response = await axios
        .get(url(`users/balance`), { withCredentials: true })
        .catch((error) => {
            console.log(error);
        });
    return response;
};

export default getBalance;
