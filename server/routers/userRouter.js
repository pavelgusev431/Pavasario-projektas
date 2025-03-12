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
    getSalt,
    updateUserProfile,
    updateUserPassword
} from '../controllers/userController.js';
import express from 'express';
import protect from '../validators/validateJWT.js';
import validateCreateUser from '../validators/validateCreateUser.js';
import validate from '../middlewares/validate.js';

const userRouter = express.Router();

userRouter.route('/signup').post(validateCreateUser, validate, createUser);
userRouter.route('/login').post(login);
userRouter.route('/logout').post(logout);
userRouter.route('/getSalt/:username').get(getSalt);
userRouter.route('/').get(getAllUsers);
userRouter.route('/id/:id').get(getUserById);
userRouter.route('/forgot').post(forgot);
userRouter.route('/reset/:id').post(passwordReset);

userRouter.use(protect);

userRouter.route('/me').get(me);
userRouter.route('/profile/edit').put(protect, updateUserProfile);
userRouter.route('/profile/password').put(protect, updateUserPassword);
userRouter.route('/:id').get(getUserById);
userRouter.route('/:username').get(getUserByUsername);

export default userRouter;
