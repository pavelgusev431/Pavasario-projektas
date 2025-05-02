// @ts-check
import express from 'express';
import {
    getUserProductsSortedPaginated,
    getUserProductsByUserName,
    getHotProducts,
    getTopRatedProducts,
    getTopUserProducts,
    getTrendingUserProducts,
    getAllProductCount,
    getRatedProductsByUserName,
    getProductById,
    getUserProducts,
    createProduct,
    editProduct,
    deleteProduct,
    getAllProducts,
    getSearchRegex,
} from '../controllers/productController.js';
import protect from '../validators/validateJWT.js';
import validate from '../middlewares/validate.js';
import validateSearchQuery from '../validators/validateSearch.js';
import validateCreateProduct from '../validators/validateCreateProduct.js';
import validateEditProduct from '../validators/validateEditProduct.js';
import { getPaginatedProducts } from '../controllers/paginatedProductController.js';
import { searchProductsPaginated } from '../controllers/paginatedSearchController.js';

/**@type {express.Router}*/
const productRouter = express.Router();

productRouter.route('/').get(getPaginatedProducts);
productRouter
    .route('/search')
    .get(validateSearchQuery, validate, getAllProducts);
// .get(validateSearchQuery, validate, getAllProducts, searchProductsPaginated);

productRouter.route('/searchregex').get(getSearchRegex);
productRouter.route('/alltopuserproducts').get(getTopUserProducts);
productRouter.route('/trending').get(getTrendingUserProducts);
productRouter.route('/bestnew').get(getHotProducts);
productRouter.route('/top').get(getTopRatedProducts);
productRouter.route('/count').get(getAllProductCount);
productRouter.route('/u/:username').get(getUserProductsByUserName);
productRouter.route('/rated/:username').get(getRatedProductsByUserName);
productRouter.route('/:id').get(getUserProducts);
productRouter.route('/selected/:id').get(getProductById);
productRouter.route('/user/:id').get(getUserProductsSortedPaginated);
productRouter.use(protect);
productRouter
    .route('/user')
    .post(validateCreateProduct, validate, createProduct);
productRouter
    .route('/user/p/:productId')
    .patch(validateEditProduct, validate, editProduct)
    .delete(deleteProduct);

export default productRouter;
