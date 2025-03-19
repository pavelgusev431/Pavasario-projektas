import User from '../models/userModel.js';
import { body } from 'express-validator';
import AppError from '../utilities/AppError.js';

const validateCreateUser = [
    body('username')
        .notEmpty()
        .withMessage('Username field is required')
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 4, max: 32 })
        .withMessage('Username must be between 4 and 32 characters')
        .matches(/^[A-Za-z0-9]*$/)
        .withMessage('Username must only contain letters or numbers')
        .matches(/^[A-Za-z].*$/)
        .withMessage('Username must start with a letter')
        .custom(async (username) => {
            const user = await User.findOne({ where: { username: username } });
            if (user) {
                throw new AppError('Username already exists', 403);
            }
        }),

    body('password')
        .notEmpty()
        .withMessage('Password field is required')
        .isString()
        .withMessage('Password must be a string')
        .matches(/^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]+$/)
        .withMessage(
            "Password must only contain letters, numbers and these symbols: $&+,:;=?@#|'<>.^*()%!-"
        )
        .matches(/^.*[A-Z].*$/)
        .withMessage('Password must contain at least 1 capital letter')
        .matches(/^.*\d.*$/)
        .withMessage('Password must contain at least 1 number')
        .matches(/^[$&+,:;=?@#|'<>.^*()%!-]$/)
        .withMessage('Password must contain at least 1 special character')
        .isLength({ min: 7 })
        .withMessage('Password must be at least 7 characters long')
        .custom((value, { req }) => {
            if (value.includes(req.body.username) || value.includes(req.body.email.split("@")[0])) {
                throw new Error("Password can't be too simple");
            } else {
                return value;
            }
        }),

    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .isLength({ min: 8, max: 32 })
        .withMessage('Email must be between 8 and 32 characters')
        .custom(async (email) => {
            const user = await User.findOne({ where: { email: email } });
            if (user) {
                throw new AppError('Email already exists', 403);
            }
        })
        .withMessage('Email already exists'),
];

export default validateCreateUser;
