import axios from 'axios';
import url from './getURL.js';

const sanitizeParam = (param) =>
    param !== null && param !== undefined && param !== '' ? param : undefined;

const getSubcategoryProducts = async (
    subcategoryId,
    {
        page = 1,
        limit = 8,
        minPrice,
        maxPrice,
        minDate,
        maxDate,
        sort,
        order,
    } = {}
) => {
    try {
        const params = {
            page,
            limit,
            minPrice: sanitizeParam(minPrice),
            maxPrice: sanitizeParam(maxPrice),
            minDate: sanitizeParam(minDate),
            maxDate: sanitizeParam(maxDate),
            sort: sanitizeParam(sort),
            order: sanitizeParam(order),
        };

        const response = await axios.get(
            url(`products/subcategory/${subcategoryId}`),
            { params, withCredentials: true }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching products for subcategory:', error);
        throw new Error(
            `Error fetching products for subcategory ${subcategoryId}: ${error.message}`
        );
    }
};

export default getSubcategoryProducts;
