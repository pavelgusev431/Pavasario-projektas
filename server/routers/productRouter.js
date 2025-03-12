import express from 'express';
import {
    getUserProducts,
    getAllProducts,
    getAllProductCount,
} from '../controllers/productController.js';

const productRouter = express.Router();

// ✅ Maršrutai produktų gavimui
productRouter.get('/', getAllProducts);       // Gauti visus produktus
productRouter.get('/count', getAllProductCount); // Gauti visų produktų skaičių
productRouter.get('/:id', getUserProducts);     // Gauti vartotojo produktus

export default productRouter;
