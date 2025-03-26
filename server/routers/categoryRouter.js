import express from 'express';
import {getAllCategoriesWithSubcategories, getProductsBySubcategory} from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.route('/all').get(getAllCategoriesWithSubcategories);
categoryRouter.route('/products/:subcategoryId').get(getProductsBySubcategory);

export default categoryRouter;