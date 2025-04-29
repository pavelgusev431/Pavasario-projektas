import express from 'express';
import transactionController from '../controllers/transactionController.js';
import protect, { restrictTo } from '../middlewares/authMiddleware.js';

const transactionRouter = express.Router();

transactionRouter.use(protect);

transactionRouter.post('/buy', transactionController.createTransaction);
transactionRouter.get('/', transactionController.getTransactions);
transactionRouter.get('/:id', transactionController.getTransactionDetails);
transactionRouter.patch('/:id/cancel', transactionController.cancelTransaction);

transactionRouter.get(
    '/courier/dashboard',
    restrictTo('courier'),
    transactionController.getCourierDashboard
);
transactionRouter.patch(
    '/:id/assign',
    restrictTo('courier'),
    transactionController.assignCourier
);
transactionRouter.patch(
    '/:id/status',
    restrictTo('courier'),
    transactionController.updateTransactionStatus
);

export default transactionRouter;
