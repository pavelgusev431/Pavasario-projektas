import url from './getURL.js';
import axios from 'axios';

export async function searchProducts(
    query,
    {
        page = 1,
        limit = 12,
        minPrice,
        maxPrice,
        minDate,
        maxDate,
        sort,
        order,
    } = {}
) {
    try {
        const params = {
            q: query,
            page,
            limit,
            ...(minPrice != null && { minPrice }),
            ...(maxPrice != null && { maxPrice }),
            ...(minDate && { minDate }),
            ...(maxDate && { maxDate }),
            sort,
            order,
        };

        const { data } = await axios.get(url('products/search'), { params });

        return data;
    } catch (error) {
        console.error('API error in searchProducts:', error);
        throw error;
    }
}

export async function searchSuggestions(query) {
    try {
        const params = { q: query };
        const { data } = await axios.get(url('products/search'), { params });
        return data;
    } catch (error) {
        console.error('API error in searchSuggestions:', error);
        return [];
    }
}
