import express from 'express';

import { getProductCommentsById } from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.route('/:id/comments').get(getProductCommentsById);

export default commentRouter;
