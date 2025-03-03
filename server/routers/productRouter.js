import express from 'express';
import {
    getUserProducts,
    getAllProducts,
} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.route('/').get(getAllProducts);
productRouter.route('/:id').get(getUserProducts);

export default productRouter;
