// @ts-check
import express from 'express';
import {
    getUserBalance,
    topUp,
    getBalanceHistory,
} from '../controllers/BalanceController.js';

/**@type {express.Router}*/
const balanceRouter = express.Router();

balanceRouter.get('/:userId', getUserBalance);
balanceRouter.post('/topup', topUp);
balanceRouter.get('/history/:userId', getBalanceHistory);

export default balanceRouter;
