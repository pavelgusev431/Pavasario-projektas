import {
    createUser,
    getUserByUsername,
    getUserById,
    login,
    logout,
    forgot,
    passwordReset,
    me,
    getAllUsers,
    getAllUsersCount,
} from '../controllers/userController.js';
import express from 'express';
import protect from '../validators/validateJWT.js';
import validateCreateUser from '../validators/validateCreateUser.js';
import validate from '../middlewares/validate.js';

const userRouter = express.Router();

userRouter
    .route('/')
    .post(validateCreateUser, validate, createUser)
    .get(getAllUsers);
userRouter.route('/count').get(getAllUsersCount);
userRouter.route('/id/:id').get(getUserById);
userRouter.route('/login').post(login);
userRouter.route('/logout').post(logout);
userRouter.route('/forgot').post(forgot);
userRouter.route('/:username').get(getUserByUsername);
userRouter.route('/reset/:id').post(passwordReset);
userRouter.use(protect);
userRouter.route('/me').get(me);

export default userRouter;
