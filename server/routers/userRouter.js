import {
    createUser,
    getUserByUsername,
    getUserById,
    login,
    logout,
    me,
    getUserId,
    getAllUsers
} from '../controllers/userController.js';
import express from 'express';
import protect from '../validators/validateJWT.js';
import validateCreateUser from '../validators/validateCreateUser.js';
import validate from '../middlewares/validate.js';
import Category from '../models/categoryModel.js';
import Subcategory from '../models/subcategoryModel.js';

const userRouter = express.Router();

userRouter.route('/').post(validateCreateUser, validate, createUser).get(getAllUsers);
userRouter.route('/:id').get(getUserId);
userRouter.route('/login').post(login);
userRouter.route('/logout').post(logout);
userRouter.use(protect);
userRouter.route('/me').get(me);
userRouter.route('/:username').get(getUserByUsername);
userRouter.route('/id/:id').get(getUserById);


export default userRouter;
