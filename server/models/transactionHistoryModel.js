import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';
import Transaction from './transactionModel.js';
import User from './userModel.js';
import AppError from '../utilities/AppError.js';

const TransactionHistory = sq.define(
    'TransactionHistory',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        previous_status: {
            type: DataTypes.ENUM(
                'pending',
                'assigned',
                'in progress',
                'done',
                'cancelled',
                'expired'
            ),
            allowNull: true,
        },
        new_status: {
            type: DataTypes.ENUM(
                'pending',
                'assigned',
                'in progress',
                'done',
                'cancelled',
                'expired'
            ),
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'transaction_history',
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

        await TransactionHistory.sync({ alter: true });

        Transaction.hasMany(TransactionHistory, {
            foreignKey: 'transaction_id',
        });
        TransactionHistory.belongsTo(Transaction, {
            foreignKey: 'transaction_id',
        });

        User.hasMany(TransactionHistory, { foreignKey: 'user_id' });
        TransactionHistory.belongsTo(User, { foreignKey: 'user_id' });

        if (sq.options.dialect === 'postgres') {
            await sq.query('SET session_replication_role = DEFAULT;');
        } else if (sq.options.dialect === 'mysql') {
            await sq.query('SET FOREIGN_KEY_CHECKS = 1;');
        }

        console.log('\x1b[35mTransactionHistory\x1b[34m table created\x1b[0m');
    } catch (error) {
        console.error('Error initializing TransactionHistory model:', error);
        throw new AppError(
            `Error while creating TransactionHistory model: ${error}`,
            500
        );
    }
};

await initializeModel();

export default TransactionHistory;
