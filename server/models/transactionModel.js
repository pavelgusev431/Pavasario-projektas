import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';
import User from './userModel.js';
import Product from './productModel.js';
import AppError from '../utilities/AppError.js';

const Transaction = sq.define(
    'Transaction',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        buyer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seller_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        courier_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: 'Total cost of the transaction',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        status: {
            type: DataTypes.ENUM(
                'pending',
                'assigned',
                'in progress',
                'done',
                'cancelled',
                'expired'
            ),
            defaultValue: 'pending',
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'transactions',
        timestamps: false,
    }
);

const setupAssociations = () => {
    User.hasMany(Transaction, { foreignKey: 'buyer_id', as: 'purchases' });
    Transaction.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });

    User.hasMany(Transaction, { foreignKey: 'seller_id', as: 'sales' });
    Transaction.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });

    User.hasMany(Transaction, { foreignKey: 'courier_id', as: 'deliveries' });
    Transaction.belongsTo(User, { foreignKey: 'courier_id', as: 'courier' });

    Product.hasMany(Transaction, { foreignKey: 'product_id' });
    Transaction.belongsTo(Product, { foreignKey: 'product_id' });
};

const initializeModel = async () => {
    try {
        if (sq.options.dialect === 'postgres') {
            await sq.query('SET session_replication_role = replica;');
        } else if (sq.options.dialect === 'mysql') {
            await sq.query('SET FOREIGN_KEY_CHECKS = 0;');
        }

        await Transaction.sync({ alter: true });

        setupAssociations();

        if (sq.options.dialect === 'postgres') {
            await sq.query('SET session_replication_role = DEFAULT;');
        } else if (sq.options.dialect === 'mysql') {
            await sq.query('SET FOREIGN_KEY_CHECKS = 1;');
        }

        console.log('\x1b[35mTransaction\x1b[34m table created\x1b[0m');
    } catch (error) {
        console.error('Error initializing Transaction model:', error);
        throw new AppError(
            `Error while creating Transaction model: ${error}`,
            500
        );
    }
};

await initializeModel();

export default Transaction;
