import images from '../utilities/getImages.js';
import Product from '../models/productModel.js';
import AppError from '../utilities/AppError.js';
import fs from 'fs';

const getImage = (req, res, next) => {
    try {
        const { dir, file } = req.params;
        res.status(200).sendFile(`${images()}/${dir}/${file}`);
    } catch (error) {
        next(error);
    }
};

const getImages = async (req, res, next) => {
    try {
        const { dir } = req.params;
        const productId = Number(dir.split('product').join(''));
        const foundProduct = await Product.findByPk(productId);
        if (!foundProduct) {
            throw new AppError('Product not found', 404);
        } else {
            let files = fs.readdirSync(`./public/images/${dir}`);
            if (files) files = files.map((file) => `${dir}/${file}`);
            res.status(200).json({
                status: 'success',
                data: files,
            });
        }
    } catch (error) {
        next(error);
    }
};

export { getImage, getImages };
