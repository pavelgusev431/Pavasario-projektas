import express from 'express';
import {
    getUserProducts,
    getAllProducts,
    getHotProducts,
    getTopRatedProducts,
    getTopUserProducts,
    getTrendingUserProducts,
    getAllProductCount,
    getProductById,
    getAllUsersProducts
} from '../controllers/productController.js';

const productRouter = express.Router();

// 🔹 Основные маршруты
productRouter.get('/', getAllProducts);
productRouter.get('/count', getAllProductCount);
productRouter.get('/user/:id', getUserProducts);
productRouter.get('/users', getAllUsersProducts);
productRouter.get('/:id', getProductById);

// 🔹 Дополнительные маршруты
productRouter.get('/alltopuserproducts', getTopUserProducts);
productRouter.get('/trending', getTrendingUserProducts);
productRouter.get('/bestnew', getHotProducts);
productRouter.get('/top', getTopRatedProducts);

export default productRouter;
