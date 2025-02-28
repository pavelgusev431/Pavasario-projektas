import express from 'express'
import {
  getUserProducts
} from '../controllers/productController.js'



const productRouter = express.Router()

productRouter.route('/:id').get(getUserProducts);

export default productRouter