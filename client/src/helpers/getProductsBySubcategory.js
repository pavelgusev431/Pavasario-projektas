import axios from 'axios';
import url from './getURL';
const getProductsBySubcategory = async (subcategoryId) => {
    const response = await axios.get(
        url(`categories/products/${subcategoryId}`)
    );
    return response.data;
};

export default getProductsBySubcategory;
