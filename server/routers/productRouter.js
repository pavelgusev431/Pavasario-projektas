import express from 'express';
import {
    getUserProducts,
    getAllProducts,
    getBestNewUsersProducts
} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.route('/').get(getAllProducts);
productRouter.route('/best').get(getBestNewUsersProducts);
productRouter.route('/:id').get(getUserProducts);

export default productRouter;
