import express from 'express';
import {
    getImage,
    getImages,
    getCommentImages,
} from '../controllers/imageController.js';
import {
    getImage,
    getImages,
    getCommentImages,
} from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.route('/d/:dir').get(getImages);
imageRouter.route('/c/:dirName').get(getCommentImages);
imageRouter.route('/:dir/:file').get(getImage);

export default imageRouter;
