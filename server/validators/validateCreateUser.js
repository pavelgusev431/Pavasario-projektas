import User from '../models/userModel.js'
import { body } from 'express-validator'
import AppError from '../utilities/AppError.js'

const validateCreateUser = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 2, max: 32 })
        .withMessage('Username must be between 2 and 32 characters')
        .custom(async (username) => {
            const user = await User.findOne({ where: { username: username } })
            if (user) {
                throw new AppError('Username already exists', 403)
            }
        }),

    body('password').isString().withMessage('Password must be a string'),

    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address')
        .isLength({ min: 8, max: 32 })
        .withMessage('Email must be between 8 and 32 characters')
        .custom(async (email) => {
            const user = await User.findOne({ where: { email: email } })
            if (user) {
                throw new AppError('Email already exists', 403)
            }
        })
        .withMessage('Email already exists'),
]

export default validateCreateUser
