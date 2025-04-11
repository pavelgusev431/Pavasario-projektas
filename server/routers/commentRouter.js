import express from 'express';
import protect from '../validators/validateJWT.js';
import validateCreateComment from '../validators/validateCreateComment.js';
import validate from '../middlewares/validate.js';
import { getProductCommentsById, createComment, getUserComments, editComment } from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.route('/:id/comments').get(getProductCommentsById);
commentRouter.route('/:id').get(getUserComments);
commentRouter.use(protect);
commentRouter.route('/comment').post(validateCreateComment, validate, createComment);

commentRouter.route('/comment/:commentId')
    .patch(editComment);


export default commentRouter;
