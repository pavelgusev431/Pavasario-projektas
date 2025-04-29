import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';
import User from './userModel.js';
import Transaction from './transactionModel.js';
import AppError from '../utilities/AppError.js';

const TransactionWallet = sq.define(
    'TransactionWallet',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        amount_held: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: 'Amount of money held in escrow for this transaction',
        },
        is_released: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Whether the funds have been released',
        },
        released_to_user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        release_timestamp: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'transaction_wallets',
        timestamps: false,
    }
);

const initializeModel = async () => {
    try {
        if (sq.options.dialect === 'postgres') {
            await sq.query('SET session_replication_role = replica;');
        } else if (sq.options.dialect === 'mysql') {
            await sq.query('SET FOREIGN_KEY_CHECKS = 0;');
        }

        await TransactionWallet.sync({ alter: true });

        Transaction.hasOne(TransactionWallet, { foreignKey: 'transaction_id' });
        TransactionWallet.belongsTo(Transaction, {
            foreignKey: 'transaction_id',
        });

        User.hasMany(TransactionWallet, {
            foreignKey: 'released_to_user_id',
            as: 'receivedPayments',
        });
        TransactionWallet.belongsTo(User, {
            foreignKey: 'released_to_user_id',
            as: 'recipient',
        });

        if (sq.options.dialect === 'postgres') {
            await sq.query('SET session_replication_role = DEFAULT;');
        } else if (sq.options.dialect === 'mysql') {
            await sq.query('SET FOREIGN_KEY_CHECKS = 1;');
        }

        console.log('\x1b[35mTransactionWallet\x1b[34m table created\x1b[0m');
    } catch (error) {
        console.error('Error initializing TransactionWallet model:', error);
        throw new AppError(
            `Error while creating TransactionWallet model: ${error}`,
            500
        );
    }
};

await initializeModel();

export default TransactionWallet;
