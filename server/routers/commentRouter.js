import express from 'express';
import protect from '../validators/validateJWT.js';
import validateCreateComment from '../validators/validateCreateComment.js';
import validate from '../middlewares/validate.js';
import { getProductCommentsById, createComment } from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.route('/:id/comments').get(getProductCommentsById);
commentRouter.use(protect);
commentRouter.route('/comment').post(validateCreateComment, validate, createComment);

export default commentRouter;
