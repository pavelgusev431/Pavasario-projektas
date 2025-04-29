import transactionService from '../services/transactionService.js';
import Secret from '../models/userSecretModel.js';
import AppError from '../utilities/AppError.js';
import { Op } from 'sequelize';
import Transaction from '../models/transactionModel.js';
import TransactionHistory from '../models/transactionHistoryModel.js';
import TransactionWallet from '../models/transactionWalletModel.js';
import sq from '../database/sequelize.js';

const createEventRecord = async (eventData, transaction = null) => {
    const Event = (await import('../models/eventModel.js')).default;
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
const transactionController = {
    createTransaction: async (req, res, next) => {
        try {
            const { product_id, quantity } = req.body;
            const buyer_id = res.locals.id;

            if (!product_id) {
                return next(new AppError('Product ID is required', 400));
            }

            const transaction = await transactionService.createTransaction({
                buyer_id,
                product_id,
                quantity: quantity || 1,
            });

            res.status(201).json({
                status: 'success',
                data: {
                    transaction,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    getTransactions: async (req, res, next) => {
        try {
            const user_id = res.locals.id;
            const { role, status } = req.query;

            if (!role || !['buyer', 'seller', 'courier'].includes(role)) {
                return next(
                    new AppError(
                        'Valid role is required (buyer, seller, or courier)',
                        400
                    )
                );
            }

            const transactions = await transactionService.getTransactions({
                user_id,
                role,
                status,
            });

            res.status(200).json({
                status: 'success',
                results: transactions.length,
                data: {
                    transactions,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    getTransactionDetails: async (req, res, next) => {
        try {
            const { id } = req.params;

            const transactionDetails =
                await transactionService.getTransactionDetails(id);

            res.status(200).json({
                status: 'success',
                data: transactionDetails,
            });
        } catch (error) {
            next(error);
        }
    },

    assignCourier: async (req, res, next) => {
        try {
            const { id } = req.params;
            const courier_id = res.locals.id;

            const userSecret = await Secret.findOne({
                where: { userId: courier_id },
            });

            if (!userSecret || userSecret.role !== 'courier') {
                return next(
                    new AppError(
                        'Only couriers can be assigned to transactions',
                        403
                    )
                );
            }

            const transaction = await transactionService.assignCourier(
                id,
                courier_id
            );

            res.status(200).json({
                status: 'success',
                data: {
                    transaction,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    updateTransactionStatus: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const user_id = res.locals.id;

            if (!status) {
                return next(new AppError('Status is required', 400));
            }

            if (!['in progress', 'done', 'cancelled'].includes(status)) {
                return next(new AppError('Invalid status', 400));
            }

            const userSecret = await Secret.findOne({
                where: { userId: user_id },
            });

            if (!userSecret || userSecret.role !== 'courier') {
                return next(
                    new AppError(
                        'Only couriers can update transaction status',
                        403
                    )
                );
            }

            const transaction =
                await transactionService.updateTransactionStatus(
                    id,
                    status,
                    user_id
                );

            res.status(200).json({
                status: 'success',
                data: {
                    transaction,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    getCourierDashboard: async (req, res, next) => {
        try {
            const user_id = res.locals.id;

            const userSecret = await Secret.findOne({
                where: { userId: user_id },
            });

            if (!userSecret || userSecret.role !== 'courier') {
                return next(
                    new AppError(
                        'Access denied. Only couriers can access this resource',
                        403
                    )
                );
            }

            const activeTransactions = await transactionService.getTransactions(
                {
                    user_id,
                    role: 'courier',
                    status: {
                        [Op.in]: ['assigned', 'in progress'],
                    },
                }
            );

            const availableTransactions =
                await transactionService.getTransactions({
                    status: 'pending',
                });

            const completedTransactions =
                await transactionService.getTransactions({
                    user_id,
                    role: 'courier',
                    status: {
                        [Op.in]: ['done', 'cancelled', 'expired'],
                    },
                });

            res.status(200).json({
                status: 'success',
                data: {
                    activeTransaction: activeTransactions[0] || null,
                    hasActiveTransaction: activeTransactions.length > 0,
                    availableTransactions,
                    completedTransactions,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    cancelTransaction: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user_id = res.locals.id;

            const transaction = await Transaction.findByPk(id);

            if (!transaction) {
                return next(new AppError('Transaction not found', 404));
            }

            if (transaction.buyer_id !== user_id) {
                return next(
                    new AppError(
                        'Only the buyer can cancel this transaction',
                        403
                    )
                );
            }

            if (transaction.status !== 'pending') {
                return next(
                    new AppError(
                        'Only pending transactions can be cancelled by the buyer',
                        400
                    )
                );
            }

            const result = await sq.transaction(async (t) => {
                await Transaction.update(
                    {
                        status: 'cancelled',
                        updated_at: new Date(),
                    },
                    { where: { id }, transaction: t }
                );

                await TransactionHistory.create(
                    {
                        transaction_id: id,
                        user_id,
                        previous_status: transaction.status,
                        new_status: 'cancelled',
                        notes: 'Cancelled by buyer before courier assignment',
                        timestamp: new Date(),
                    },
                    { transaction: t }
                );

                const transactionWallet = await TransactionWallet.findOne({
                    where: { transaction_id: id, is_released: false },
                });

                if (transactionWallet) {
                    const buyerSecret = await Secret.findOne({
                        where: { userId: transaction.buyer_id },
                    });

                    if (buyerSecret) {
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

                        await TransactionWallet.update(
                            {
                                is_released: true,
                                released_to_user_id: transaction.buyer_id,
                                release_timestamp: new Date(),
                            },
                            { where: { transaction_id: id }, transaction: t }
                        );
                    }
                }

                await createEventRecord(
                    {
                        user_id,
                        product_id: transaction.product_id,
                        type_id: 9,
                        target_id: 3,
                        description: `Transaction ${id} cancelled by buyer`,
                        timestamp: new Date(),
                    },
                    t
                );

                return await Transaction.findByPk(id, { transaction: t });
            });

            res.status(200).json({
                status: 'success',
                message: 'Transaction cancelled successfully',
                data: {
                    transaction: result,
                },
            });
        } catch (error) {
            console.error('Error in cancelTransaction:', error);
            next(error);
        }
    },
};

export default transactionController;
