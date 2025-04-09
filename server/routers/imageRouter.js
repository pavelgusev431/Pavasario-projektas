import express from 'express';
import { getImage, getImages } from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.route('/d/:dir').get(getImages);
imageRouter.route('/:dir/:file').get(getImage);

export default imageRouter;
