import express from 'express';
import {
    getUserProducts,
    getAllProducts,
    getBestNewUsersProducts,
    getTopRatedUsersProducts,
    getTopUserProducts,
    getTrendingUserProducts
} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.route('/').get(getAllProducts);
productRouter.route('/alltopuserproducts').get(getTopUserProducts);
productRouter.route('/trending').get(getTrendingUserProducts);
productRouter.route('/bestnew').get(getBestNewUsersProducts);
productRouter.route('/bestmonth').get(getTopRatedUsersProducts);
productRouter.route('/:id').get(getUserProducts);

export default productRouter;
