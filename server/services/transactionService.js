import { Op } from 'sequelize';
import Transaction from '../models/transactionModel.js';
import TransactionHistory from '../models/transactionHistoryModel.js';
import TransactionWallet from '../models/transactionWalletModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Secret from '../models/userSecretModel.js';
import Event from '../models/eventModel.js';
import AppError from '../utilities/AppError.js';
import sq from '../database/sequelize.js';

// Helper function to create events
const createEventRecord = async (eventData, transaction = null) => {
    return await Event.create(
        {
            user_id: eventData.user_id,
            product_id: eventData.product_id,
            type_id: eventData.type_id,
            target_id: eventData.target_id,
            description: eventData.description,
            timestamp: eventData.timestamp || new Date(),
        },
        transaction ? { transaction } : undefined
    );
};

class TransactionService {
    /**
     * Create a new transaction
     * @param {Object} transactionData - Transaction data
     * @param {number} transactionData.buyer_id - Buyer ID
     * @param {number} transactionData.product_id - Product ID
     * @param {number} transactionData.quantity - Quantity of products
     * @returns {Promise<Transaction>} Created transaction
     */
    async createTransaction({ buyer_id, product_id, quantity = 1 }) {
        // 1. Get the product and check if it exists and has enough stock
        const product = await Product.findByPk(product_id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        if (product.amount_in_stock < quantity) {
            throw new AppError('Not enough stock available', 400);
        }

        // 2. Get the buyer and seller information
        const buyer = await User.findByPk(buyer_id);
        const seller_id = product.user_id;

        if (!buyer) {
            throw new AppError('Buyer not found', 404);
        }

        // 3. Check if buyer has enough balance
        const buyerSecret = await Secret.findOne({
            where: { userId: buyer_id },
        });

        if (!buyerSecret || buyerSecret.balance < product.price * quantity) {
            throw new AppError('Insufficient funds', 400);
        }

        // 4. Calculate transaction details
        const amount = product.price * quantity;

        // 5. Set expiration date (7 days from now by default)
        const due_date = new Date();
        due_date.setDate(due_date.getDate() + 7);

        // 6. Start a database transaction to ensure atomicity
        const result = await sq.transaction(async (t) => {
            // 6.1 Reduce buyer's balance
            await Secret.update(
                { balance: buyerSecret.balance - amount },
                { where: { userId: buyer_id }, transaction: t }
            );

            // 6.2 Reduce product stock
            await Product.update(
                { amount_in_stock: product.amount_in_stock - quantity },
                { where: { id: product_id }, transaction: t }
            );

            // 6.3 Create the transaction
            const transaction = await Transaction.create(
                {
                    buyer_id,
                    seller_id,
                    product_id,
                    amount,
                    quantity,
                    status: 'pending',
                    due_date,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                { transaction: t }
            );

            // 6.4 Create transaction wallet entry (escrow)
            await TransactionWallet.create(
                {
                    transaction_id: transaction.id,
                    amount_held: amount,
                    is_released: false,
                    created_at: new Date(),
                },
                { transaction: t }
            );

            // 6.5 Create transaction history entry
            await TransactionHistory.create(
                {
                    transaction_id: transaction.id,
                    user_id: buyer_id,
                    previous_status: null,
                    new_status: 'pending',
                    timestamp: new Date(),
                },
                { transaction: t }
            );

            // 6.6 Create event
            await createEventRecord(
                {
                    user_id: buyer_id,
                    product_id,
                    type_id: 6, // bought
                    target_id: 3, // transaction
                    description: `User ${buyer_id} bought product ${product_id}`,
                    timestamp: new Date(),
                },
                t
            );

            return transaction;
        });

        return result;
    }

    /**
     * Get transactions with filtering options
     * @param {Object} options - Filter options
     * @param {number} options.user_id - User ID (buyer, seller, or courier)
     * @param {string} options.role - User role ('buyer', 'seller', 'courier')
     * @param {string|Object} options.status - Transaction status or status condition
     * @returns {Promise<Array<Transaction>>} List of transactions
     */
    async getTransactions({ user_id, role, status }) {
        const whereClause = {};

        // Add status filter if provided
        if (status) {
            // Handle both simple string status and complex status objects with operators
            if (typeof status === 'string') {
                whereClause.status = status;
            } else if (typeof status === 'object') {
                // If it's an object with operators (like [Op.in])
                whereClause.status = status;
            }
        }

        // Add user_id filter based on role
        if (user_id && role) {
            if (role === 'buyer') {
                whereClause.buyer_id = user_id;
            } else if (role === 'seller') {
                whereClause.seller_id = user_id;
            } else if (role === 'courier') {
                // For courier, either show their assigned transactions
                // or available transactions that have no courier
                if (status === 'pending') {
                    whereClause.courier_id = null;
                } else {
                    whereClause.courier_id = user_id;
                }
            }
        }

        const transactions = await Transaction.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'buyer',
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: User,
                    as: 'seller',
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: User,
                    as: 'courier',
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: Product,
                    attributes: ['id', 'name', 'price', 'image_url'],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        return transactions;
    }

    /**
     * Assign courier to a transaction
     * @param {number} transaction_id - Transaction ID
     * @param {number} courier_id - Courier ID
     * @returns {Promise<Transaction>} Updated transaction
     */
    async assignCourier(transaction_id, courier_id) {
        // 1. Check if transaction exists and is in pending status
        const transaction = await Transaction.findByPk(transaction_id);

        if (!transaction) {
            throw new AppError('Transaction not found', 404);
        }

        if (transaction.status !== 'pending') {
            throw new AppError('Transaction is not in pending status', 400);
        }

        if (transaction.courier_id) {
            throw new AppError(
                'Transaction already has a courier assigned',
                400
            );
        }

        // 2. Check if courier already has an active transaction
        const activeTransactions = await Transaction.count({
            where: {
                courier_id,
                status: {
                    [Op.in]: ['assigned', 'in progress'],
                },
            },
        });

        if (activeTransactions > 0) {
            throw new AppError(
                'Courier already has an active transaction',
                400
            );
        }

        // 3. Assign courier and update status
        const result = await sq.transaction(async (t) => {
            // 3.1 Update transaction
            await Transaction.update(
                {
                    courier_id,
                    status: 'assigned',
                    updated_at: new Date(),
                },
                { where: { id: transaction_id }, transaction: t }
            );

            // 3.2 Create transaction history entry
            await TransactionHistory.create(
                {
                    transaction_id,
                    user_id: courier_id,
                    previous_status: transaction.status,
                    new_status: 'assigned',
                    timestamp: new Date(),
                },
                { transaction: t }
            );

            // 3.3 Create event
            await createEventRecord(
                {
                    user_id: courier_id,
                    product_id: transaction.product_id,
                    type_id: 2, // updated
                    target_id: 3, // transaction
                    description: `Courier ${courier_id} assigned to transaction ${transaction_id}`,
                    timestamp: new Date(),
                },
                t
            );

            return await Transaction.findByPk(transaction_id, {
                transaction: t,
            });
        });

        return result;
    }

    /**
     * Update transaction status
     * @param {number} transaction_id - Transaction ID
     * @param {string} new_status - New status
     * @param {number} user_id - User ID making the change
     * @returns {Promise<Transaction>} Updated transaction
     */
    async updateTransactionStatus(transaction_id, new_status, user_id) {
        // 1. Check if transaction exists
        const transaction = await Transaction.findByPk(transaction_id);

        if (!transaction) {
            throw new AppError('Transaction not found', 404);
        }

        // 2. Check if status change is valid
        if (transaction.status === new_status) {
            throw new AppError(
                `Transaction is already in ${new_status} status`,
                400
            );
        }

        // 3. Validate status change permissions
        if (
            new_status === 'in progress' ||
            new_status === 'done' ||
            new_status === 'cancelled'
        ) {
            // Only courier can change to these statuses
            if (transaction.courier_id !== user_id) {
                throw new AppError(
                    'Only the assigned courier can change this status',
                    403
                );
            }

            // In progress requires previous status to be assigned
            if (
                new_status === 'in progress' &&
                transaction.status !== 'assigned'
            ) {
                throw new AppError(
                    'Transaction must be in assigned status to change to in progress',
                    400
                );
            }

            // Done requires previous status to be in progress
            if (new_status === 'done' && transaction.status !== 'in progress') {
                throw new AppError(
                    'Transaction must be in progress to change to done',
                    400
                );
            }
        } else if (new_status === 'expired') {
            // Expired is set by the system, not by users
            throw new AppError('Status cannot be manually set to expired', 400);
        }

        // 4. Process the status change
        const result = await sq.transaction(async (t) => {
            // 4.1 Update transaction status
            await Transaction.update(
                {
                    status: new_status,
                    updated_at: new Date(),
                },
                { where: { id: transaction_id }, transaction: t }
            );

            // 4.2 Create transaction history entry
            await TransactionHistory.create(
                {
                    transaction_id,
                    user_id,
                    previous_status: transaction.status,
                    new_status,
                    timestamp: new Date(),
                },
                { transaction: t }
            );

            // 4.3 Handle money transfer for completed or cancelled transactions
            if (new_status === 'done' || new_status === 'cancelled') {
                const transactionWallet = await TransactionWallet.findOne({
                    where: { transaction_id, is_released: false },
                });

                if (transactionWallet) {
                    // Determine recipient based on status
                    const recipient_id =
                        new_status === 'done'
                            ? transaction.seller_id // Money to seller if done
                            : transaction.buyer_id; // Money to buyer if cancelled

                    // Get recipient secret for balance update
                    const recipientSecret = await Secret.findOne({
                        where: { userId: recipient_id },
                    });

                    if (recipientSecret) {
                        // Update recipient balance
                        await Secret.update(
                            {
                                balance:
                                    recipientSecret.balance +
                                    transactionWallet.amount_held,
                            },
                            { where: { userId: recipient_id }, transaction: t }
                        );

                        // Update transaction wallet to mark funds as released
                        await TransactionWallet.update(
                            {
                                is_released: true,
                                released_to_user_id: recipient_id,
                                release_timestamp: new Date(),
                            },
                            { where: { transaction_id }, transaction: t }
                        );
                    }
                }
            }

            // 4.4 Create event
            const eventType =
                new_status === 'done'
                    ? 10 // executed
                    : new_status === 'cancelled'
                      ? 9 // cancelled
                      : 2; // updated

            await createEventRecord(
                {
                    user_id,
                    product_id: transaction.product_id,
                    type_id: eventType,
                    target_id: 3, // transaction
                    description: `Transaction ${transaction_id} changed status to ${new_status}`,
                    timestamp: new Date(),
                },
                t
            );

            return await Transaction.findByPk(transaction_id, {
                transaction: t,
            });
        });

        return result;
    }

    /**
     * Check for expired transactions and process them
     * @returns {Promise<number>} Number of expired transactions processed
     */
    async processExpiredTransactions() {
        const now = new Date();

        // Find transactions that are past due date and not in done/cancelled/expired status
        const expiredTransactions = await Transaction.findAll({
            where: {
                due_date: { [Op.lt]: now },
                status: {
                    [Op.notIn]: ['done', 'cancelled', 'expired'],
                },
            },
        });

        if (expiredTransactions.length === 0) {
            return 0;
        }

        // Process each expired transaction
        for (const transaction of expiredTransactions) {
            await this.expireTransaction(transaction.id);
        }

        return expiredTransactions.length;
    }

    /**
     * Expire a single transaction
     * @param {number} transaction_id - Transaction ID
     * @returns {Promise<Transaction>} Updated transaction
     */
    async expireTransaction(transaction_id) {
        // 1. Check if transaction exists
        const transaction = await Transaction.findByPk(transaction_id);

        if (!transaction) {
            throw new AppError('Transaction not found', 404);
        }

        // 2. Process the expiration
        const result = await sq.transaction(async (t) => {
            // 2.1 Update transaction status
            await Transaction.update(
                {
                    status: 'expired',
                    updated_at: new Date(),
                },
                { where: { id: transaction_id }, transaction: t }
            );

            // 2.2 Create transaction history entry
            await TransactionHistory.create(
                {
                    transaction_id,
                    user_id: transaction.buyer_id, // System action, use buyer ID
                    previous_status: transaction.status,
                    new_status: 'expired',
                    notes: 'Automatically expired due to passing due date',
                    timestamp: new Date(),
                },
                { transaction: t }
            );

            // 2.3 Return funds to buyer
            const transactionWallet = await TransactionWallet.findOne({
                where: { transaction_id, is_released: false },
            });

            if (transactionWallet) {
                // Get buyer's secret for balance update
                const buyerSecret = await Secret.findOne({
                    where: { userId: transaction.buyer_id },
                });

                if (buyerSecret) {
                    // Update buyer balance
                    await Secret.update(
                        {
                            balance:
                                buyerSecret.balance +
                                transactionWallet.amount_held,
                        },
                        {
                            where: { userId: transaction.buyer_id },
                            transaction: t,
                        }
                    );

                    // Update transaction wallet to mark funds as released
                    await TransactionWallet.update(
                        {
                            is_released: true,
                            released_to_user_id: transaction.buyer_id,
                            release_timestamp: new Date(),
                        },
                        { where: { transaction_id }, transaction: t }
                    );
                }
            }

            // 2.4 Create event
            await createEventRecord(
                {
                    user_id: transaction.buyer_id,
                    product_id: transaction.product_id,
                    type_id: 8, // expired
                    target_id: 3, // transaction
                    description: `Transaction ${transaction_id} expired`,
                    timestamp: new Date(),
                },
                t
            );

            return await Transaction.findByPk(transaction_id, {
                transaction: t,
            });
        });

        return result;
    }

    /**
     * Get transaction details including history
     * @param {number} transaction_id - Transaction ID
     * @returns {Promise<Object>} Transaction with history
     */
    async getTransactionDetails(transaction_id) {
        const transaction = await Transaction.findByPk(transaction_id, {
            include: [
                {
                    model: User,
                    as: 'buyer',
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: User,
                    as: 'seller',
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: User,
                    as: 'courier',
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: Product,
                    attributes: ['id', 'name', 'price', 'image_url'],
                },
            ],
        });

        if (!transaction) {
            throw new AppError('Transaction not found', 404);
        }

        // Get transaction history
        const history = await TransactionHistory.findAll({
            where: { transaction_id },
            include: [{ model: User, attributes: ['id', 'username'] }],
            order: [['timestamp', 'ASC']],
        });

        // Get transaction wallet info
        const wallet = await TransactionWallet.findOne({
            where: { transaction_id },
            attributes: [
                'amount_held',
                'is_released',
                'released_to_user_id',
                'release_timestamp',
            ],
        });

        return {
            transaction,
            history,
            wallet,
        };
    }
}

export default new TransactionService();
