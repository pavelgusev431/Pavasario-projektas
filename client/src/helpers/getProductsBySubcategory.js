// getProductsBySubcategory.js
import axios from 'axios';

const getProductsBySubcategory = async (subcategoryId) => {
    const response = await axios.get(
        `http://localhost:3000/categories/products/${subcategoryId}`
    );
    return response.data;
};


export default getProductsBySubcategory;

