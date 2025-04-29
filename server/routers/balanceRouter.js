// @ts-check
import express from 'express';
import {
    getUserBalance,
    topUp,
    getBalanceHistory,
} from '../controllers/BalanceController.js';
import validateTopUp from '../validators/validateTopUp.js';
import validate from '../middlewares/validate.js';

/**@type {express.Router}*/
const balanceRouter = express.Router();

balanceRouter.route('/:userId').get(getUserBalance);
balanceRouter.route('/topup').post(validateTopUp, validate, topUp);
balanceRouter.route('/history/:userId').get(getBalanceHistory);

export default balanceRouter;
