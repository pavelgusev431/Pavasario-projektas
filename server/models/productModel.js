import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';
import { User } from './userModel.js';
import Rating from './ratingModel.js';

// Product model definition
const Product = sq.define(
    'Product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        subcategory_id: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING(255), allowNull: false },
        price: { type: DataTypes.BIGINT, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        image_url: { type: DataTypes.TEXT, allowNull: false },
        stock_quantity: { type: DataTypes.BIGINT, allowNull: false },
    },
    { timestamps: false, tableName: 'products' }
);

// Relationship between User and Product
User.hasMany(Product, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id' });

// Relationship with Rating model
Product.hasMany(Rating, { foreignKey: 'product_id' });
Rating.belongsTo(Product, { foreignKey: 'product_id' });

try {
    await Product.sync();  // ❗️ Иnaudoti { alter: true } tik kuriant modelį
    console.log('\x1b[35mProduct\x1b[34m table created\x1b[0m');
} catch (error) {
    throw new AppError(`Error while creating Product model: ${error}`, 500);
}

export default Product;
