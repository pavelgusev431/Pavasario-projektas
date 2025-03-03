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

try {
    await Category.sync({ alter: true, force: true });
    console.log('\x1b[35mCategory\x1b[34m table created\x1b[0m');
} catch (error) {
    throw new AppError('Error while creating category model', 500);
}

try {
    await Category.create({ name: 'Electronics' });
    await Category.create({ name: 'Fashion & Apparel' });
    await Category.create({ name: 'Home & Furniture' });
    await Category.create({ name: 'Health & Beauty' });
    await Category.create({ name: 'Sports & Outdoors' });
    await Category.create({ name: 'Toys & Games' });
    await Category.create({ name: 'Automotive' });
    await Category.create({ name: 'Books & Media' });
    await Category.create({ name: 'Groceries & Food' });
    await Category.create({ name: 'Office & School Supplies' });
    console.log('\x1b[35mCategory\x1b[36m table populated\x1b[0m');
} catch (error) {
    throw new AppError('Error while populating category model', 500);
}

export default Category;
