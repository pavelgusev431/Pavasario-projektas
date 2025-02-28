import { validationResult } from 'express-validator';
import AppError from '../utilities/AppError.js';
const validate = (req, _res, next) => {
    try {
        const errors = validationResult(req);
        const errorString = errors
            .array()
            .map((error) => error.msg)
            .join(';');
        if (!errors.isEmpty()) {
            throw new AppError(errorString, 400);
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default validate;
