import express from 'express';
import {
    getUserProducts,
    getAllProducts,
    getAllProductCount,
    getProductById,
    getAllUsersProducts
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/count', getAllProductCount);
productRouter.get('/user/:id', getUserProducts);
productRouter.get('/users', getAllUsersProducts);
productRouter.get('/:id', getProductById);

export default productRouter;
