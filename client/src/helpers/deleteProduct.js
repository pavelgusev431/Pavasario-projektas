import axios from 'axios';
import url from './getURL.js';

const deleteProduct = async (id, data) => {
    const response = await axios.delete(url(`products/user/${id}`), data, {
        withCredentials: true,
    });
    return response;
};

export default deleteProduct;
