import express from 'express';
import {
    getUserProducts,
    getAllProducts,
    getBestNewUsersProducts,
    getTopRatedUsersProducts,
    getTopUserProducts
} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.route('/').get(getAllProducts);
productRouter.route('/alltopuserproducts').get(getTopUserProducts);
productRouter.route('/bestnew').get(getBestNewUsersProducts);
productRouter.route('/bestmonth').get(getTopRatedUsersProducts);
productRouter.route('/:id').get(getUserProducts);

export default productRouter;
