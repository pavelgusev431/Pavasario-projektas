import express from 'express';
import {
    getAllCategoriesWithSubcategories,
    getProductsBySubcategory,
    getFilteredProductsByCategory,
} from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.route('/all').get(getAllCategoriesWithSubcategories);
categoryRouter.route('/products/:subcategoryId').get(getProductsBySubcategory);
categoryRouter.route('/:id').get(getFilteredProductsByCategory);

export default categoryRouter;
