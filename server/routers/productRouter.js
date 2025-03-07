import express from 'express';
import {
    getUserProducts,
    getAllProducts,
    getAllProductCount,
} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.route('/').get(getAllProducts);
productRouter.route('/count').get(getAllProductCount);
productRouter.route('/:id').get(getUserProducts);

export default productRouter;
