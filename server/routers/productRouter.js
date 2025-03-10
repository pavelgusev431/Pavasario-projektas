import express from 'express';
import {
    getUserProducts,
    getAllProducts,
} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getUserProducts);

export default productRouter;
