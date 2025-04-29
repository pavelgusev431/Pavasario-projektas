import { body, param } from 'express-validator';
import AppError from '../utilities/AppError.js';
import Product from '../models/productModel.js';

const validateEditProduct = [
    param('productId')
        .trim()
        .notEmpty()
        .withMessage('Product Id is a required parameter')
        .isNumeric()
        .withMessage('Product Id must be a number')
        .custom(async (productId) => {
            const product = await Product.findByPk(productId);
            if (!product) {
                throw new AppError('Product not found', 404);
            }
        }),

    body('category_id')
        .trim()
        .optional()
        .isNumeric()
        .withMessage('Category Id must be a number'),

    body('subcategory_id')
        .trim()
        .optional()
        .isNumeric()
        .withMessage('Subcategory Id must be a number'),

    body('name')
        .trim()
        .escape()
        .optional()
        .isString()
        .withMessage('Name must be a string'),

    body('price')
        .trim()
        .optional()
        .isNumeric()
        .withMessage('Price must be a number'),

    body('description')
        .trim()
        .escape()
        .optional()
        .isString()
        .withMessage('Description must be a string'),

    body('amount_in_stock')
        .trim()
        .optional()
        .isNumeric()
        .withMessage('Amount in stock must be a number'),

    body('image_url')
        .trim()
        .escape()
        .optional()
        .isString()
        .withMessage('Image URL must be a string')
        .isURL()
        .withMessage('Image URL must be a valid URL'),
];

export default validateEditProduct;
