import { query } from 'express-validator';

const validateSearchQuery = [
  query('q')
    .isLength({ min: 3, max: 15 })
    .withMessage('Search query must be between 3 and 15 characters.')
    .matches(/^[a-zA-Z0-9 ]*$/)
    .withMessage('Search query can only contain letters, numbers, and spaces.'),
];

export default validateSearchQuery;