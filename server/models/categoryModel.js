import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';
import AppError from '../utilities/AppError.js';

const Category = sq.define(
    'Category',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false,
        tableName: 'categories',
    }
);

export default Category;
