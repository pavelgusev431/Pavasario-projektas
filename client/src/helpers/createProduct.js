import axios from 'axios';
import url from './getURL.js';

const createProduct = async (data) => {
    const {
        category_id,
        subcategory_id,
        name,
        price,
        description,
        amount_in_stock,
        images,
    } = data;
    const newProduct = await axios.post(
        url('products/user'),
        {
            category_id,
            subcategory_id,
            name,
            price,
            description,
            amount_in_stock,
        },
        { withCredentials: true }
    );
    const { id } = newProduct;
    const formData = new FormData();
    formData.append(images);
    await axios.post(url('upload/dir'), `product${id}`, {
        withCredentials: true,
    });
    await axios.post(url('upload/images'), formData, { withCredentials: true });
    const allProductImages = await axios.get(url(`images/product${id}`), {
        withCredentials: true,
    });
    const frontCover = allProductImages.data[0];
    const updatedProduct = await axios.patch(
        url(`user/p/${id}`),
        { image_url: frontCover },
        { withCredentials: true }
    );
    return updatedProduct.data;
};

export default createProduct;
