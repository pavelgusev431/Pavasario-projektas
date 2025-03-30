import axios from 'axios';
import url from './getURL.js';



const getFilteredProducts = async ({
  page = 1,
  limit = 8,
  minPrice,
  maxPrice,
  minDate,
  maxDate,
} = {}) => {
  try {
    const response = await axios.get(url("products"), {
      params: {
        page,
        limit,
        minPrice,
        maxPrice,
        minDate,
        maxDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw new Error(error.response?.data?.message || "Error fetching products");
  }
};

export default getFilteredProducts;

