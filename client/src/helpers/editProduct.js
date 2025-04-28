import axios from 'axios';
import url from './getURL.js';

const editProduct = async (id, data) => {
    const response = await axios.patch(url(`products/user/p/${id}`), data, {
        withCredentials: true,
    });
    return response;
};

export default editProduct;
