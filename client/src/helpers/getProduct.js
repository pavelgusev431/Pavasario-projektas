import axios from 'axios';
import url from './getURL.js';

const getUserProductsByUserName = async (username) => {
    const response = await axios
        .get(url(`products/u/${username}`))
        .catch((error) => {
            console.log(error);
        });
    return response;
};

const getProductById = async (id) => {
    const response = await axios.get(url(`products/${id}`)).catch((error) => {
        console.log(error);
    });
    return response;
};

const getAllProducts = async () => {
    const response = await axios.get(url(`products`)).catch((error) => {
        console.log(error);
    });
    return response;
};

const getHotProducts = async () => {
    const response = await axios.get(url(`products/bestnew`)).catch((error) => {
        console.log(error);
    });
    return response;
};

const getTopRatedProducts = async () => {
    const response = await axios.get(url(`products/top`)).catch((error) => {
        console.log(error);
    });
    return response;
};

const getTopUserProducts = async () => {
    const response = await axios
        .get(url(`products/alltopuserproducts`))
        .catch((error) => {
            console.log(error);
        });
    return response;
};

const getTrendingUserProducts = async () => {
    const response = await axios
        .get(url(`products/trending`))
        .catch((error) => {
            console.log(error);
        });
    return response;
};

const getRatedProductsByUserName = async (username) => {
    const response = await axios
        .get(url(`products/rated/${username}`))
        .catch((error) => {
            console.log(error);
        });
    return response;
};

export {
    getProductById,
    getHotProducts,
    getTopRatedProducts,
    getTopUserProducts,
    getTrendingUserProducts,
    getAllProducts,
    getUserProductsByUserName,
    getRatedProductsByUserName,
};
