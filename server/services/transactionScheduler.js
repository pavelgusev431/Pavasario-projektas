import cron from 'node-cron';
import transactionService from './transactionService.js';
import logger from '../utilities/logger.js';

const scheduleTransactionTasks = () => {
    // Run every hour to check for expired transactions
    cron.schedule('0 * * * *', async () => {
        try {
            logger.info(
                'Running scheduled task: Check for expired transactions'
            );
            const processedCount =
                await transactionService.processExpiredTransactions();
            logger.info(`Processed ${processedCount} expired transactions`);
        } catch (error) {
            logger.error(
                `Error in expired transactions scheduler: ${error.message}`
            );
        }
    });
};

export default scheduleTransactionTasks;
