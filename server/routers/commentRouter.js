import express from 'express';
import protect from '../validators/validateJWT.js';
import validateCreateComment from '../validators/validateCreateComment.js';
import validate from '../middlewares/validate.js';
import { getProductCommentsById, createComment, getUserComments } from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.route('/:id/comments').get(getProductCommentsById);
commentRouter.use(protect);
commentRouter.route('/comment').post(validateCreateComment, validate, createComment);
commentRouter.route('/:id').get(getUserComments);

export default commentRouter;
