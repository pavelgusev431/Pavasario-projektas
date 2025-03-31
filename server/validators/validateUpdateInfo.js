import { body } from 'express-validator';

const validateUpdateInfo = [
    body('email').optional(),

    body('username').optional(),

    body('contacts').optional(),

    body('description').optional(),
];

export default validateUpdateInfo;
