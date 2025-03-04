import axios from 'axios';
import url from './getURL.js';

const getProductById = async (id) => {
    const response = await axios.get(url(`products/${id}`)).catch((error) => {
        console.log(error);
    });
    return response;
};

export { getProductById };
