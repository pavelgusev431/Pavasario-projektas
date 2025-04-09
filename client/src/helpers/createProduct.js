import axios from 'axios';
import url from './getURL.js';

const createProduct = async (data) => {
    const response = await axios.post(url('products/user'), data, {
        withCredentials: true,
    });
    return response;
};

export default createProduct;
