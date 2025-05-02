import axios from 'axios';
import getURL from './getURL';

const BASE_URL = getURL('balance');

export const getBalance = async (userId) => {
    const res = await axios.get(`${BASE_URL}/${userId}`);
    return res.data;
};

export const topUpBalance = async (userId, amount) => {
    const res = await axios.post(
        `${BASE_URL}/topup`,
        { userId, amount },
        { withCredentials: true }
    );
    return res.data;
};

export const getBalanceHistory = async (userId) => {
    const res = await axios.get(`${BASE_URL}/history/${userId}`);
    return res.data;
};
