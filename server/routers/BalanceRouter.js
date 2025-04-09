import express from 'express';
import {
    getUserBalance,
    topUp,
    getBalanceHistory,
} from '../controllers/BalanceController.js';

const router = express.Router();

router.get('/:userId', getUserBalance);
router.post('/topup', topUp);
router.get('/history/:userId', getBalanceHistory);

export default router;
