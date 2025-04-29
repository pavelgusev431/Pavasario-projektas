import { body } from 'express-validator';
import User from '../models/userModel';
import AppError from '../utilities/AppError';

const validateTopUp = [
    body('userId')
        .trim()
        .notEmpty()
        .withMessage('User Id is a required field')
        .isNumeric()
        .withMessage('User Id must be a number')
        .custom(async (id) => {
            const user = await User.findByPk(id);
            if (!user) {
                throw new AppError("User doesn't exist", 404);
            }
        }),

    body('amount')
        .trim()
        .notEmpty()
        .withMessage('Amount is a required field')
        .isNumeric({ min: 0 })
        .withMessage('Amount must be a positive number')
        .custom((amount) => {
            if (amount == 0) {
                throw new AppError('Amount can not be zero', 403);
            }
        }),
];

export default validateTopUp;
