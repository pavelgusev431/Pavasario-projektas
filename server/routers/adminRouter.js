import express from 'express';
import {
    getAllUsersWithRoles,
    banUser,
    deleteUser,
    updateUserRole,
    createUser,
    updateUserData,
} from '../controllers/adminController.js';

import validate from '../middlewares/validate.js';
import validateCreateUser from '../validators/validateCreateUser.js';
import protect from '../validators/validateJWT.js';
import admin from '../validators/validateAdmin.js';

const adminRouter = express.Router();

adminRouter.use(protect, admin);

adminRouter.route('/users').get(getAllUsersWithRoles);
adminRouter.route('/users').post(validateCreateUser, validate, createUser);
adminRouter.route('/users/role/:id').patch(updateUserRole);
adminRouter.route('/users/ban/:id').post(banUser);
adminRouter.route('/users/:id').delete(deleteUser);
adminRouter.route('/users/:id').patch(updateUserData);

export default adminRouter;
