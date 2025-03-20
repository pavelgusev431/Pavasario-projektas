
import express from 'express';
import {
    getUserProductsByUserName,
    getHotProducts,
    getTopRatedProducts,
    getTopUserProducts,
    getTrendingUserProducts,
    getAllProductCount,
} from '../controllers/productController.js';

import { getPaginatedProducts } from '../controllers/paginatedProductController.js';

const productRouter = express.Router();


productRouter.route('/').get(getPaginatedProducts); 
productRouter.route('/alltopuserproducts').get(getTopUserProducts);
productRouter.route('/trending').get(getTrendingUserProducts);
productRouter.route('/bestnew').get(getHotProducts);
productRouter.route('/top').get(getTopRatedProducts);
productRouter.route('/count').get(getAllProductCount);
productRouter.route('/u/:username').get(getUserProductsByUserName);

export default productRouter;
