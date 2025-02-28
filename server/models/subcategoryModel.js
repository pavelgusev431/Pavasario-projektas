import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';
import AppError from '../utilities/AppError.js';

const Subcategory = sq.define(
    'Subcategory',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false,
        tableName: 'subcategories',
    }
);

try {
    await Subcategory.sync({ alter: true, force: true });
    console.log('\x1b[35mSubcategory\x1b[34m table created\x1b[0m');
} catch (error) {
    throw new AppError('Error while creating subcategory model', 500);
}

try {
    await Subcategory.create({
        category_Id: 1,
        name: 'Smartphones & Accessories',
    });
    await Subcategory.create({ category_Id: 1, name: 'Computers & Laptops' });
    await Subcategory.create({ category_Id: 1, name: 'Audio & Headphones' });
    await Subcategory.create({ category_Id: 1, name: 'Wearable Tech' });
    await Subcategory.create({ category_Id: 1, name: 'Home Electronics' });

    await Subcategory.create({ category_Id: 2, name: 'Men’s Clothing' });
    await Subcategory.create({ category_Id: 2, name: 'Women’s Clothing' });
    await Subcategory.create({ category_Id: 2, name: 'Shoes & Footwear' });
    await Subcategory.create({ category_Id: 2, name: 'Accessories' });
    await Subcategory.create({ category_Id: 2, name: 'Jewelry' });

    await Subcategory.create({ category_Id: 3, name: 'Living Room Furniture' });
    await Subcategory.create({ category_Id: 3, name: 'Bedroom Furniture' });
    await Subcategory.create({ category_Id: 3, name: 'Kitchen & Dining' });
    await Subcategory.create({ category_Id: 3, name: 'Home Décor' });
    await Subcategory.create({ category_Id: 3, name: 'Lighting' });

    await Subcategory.create({ category_Id: 4, name: 'Skincare' });
    await Subcategory.create({ category_Id: 4, name: 'Haircare' });
    await Subcategory.create({ category_Id: 4, name: 'Makeup' });
    await Subcategory.create({ category_Id: 4, name: 'Personal Care' });
    await Subcategory.create({ category_Id: 4, name: 'Fitness & Nutrition' });

    await Subcategory.create({ category_Id: 5, name: 'Exercise Equipment' });
    await Subcategory.create({ category_Id: 5, name: 'Outdoor Gear' });
    await Subcategory.create({ category_Id: 5, name: 'Sports Apparel' });
    await Subcategory.create({ category_Id: 5, name: 'Team Sports' });
    await Subcategory.create({
        category_Id: 5,
        name: 'Bicycles & Accessories',
    });

    await Subcategory.create({
        category_Id: 6,
        name: 'Action Figures & Collectibles',
    });
    await Subcategory.create({ category_Id: 6, name: 'Board Games & Puzzles' });
    await Subcategory.create({
        category_Id: 6,
        name: 'Video Games & Consoles',
    });
    await Subcategory.create({ category_Id: 6, name: 'Educational Toys' });
    await Subcategory.create({ category_Id: 6, name: 'Dolls & Plush Toys' });

    await Subcategory.create({ category_Id: 7, name: 'Car Accessories' });
    await Subcategory.create({ category_Id: 7, name: 'Motorcycle Gear' });
    await Subcategory.create({ category_Id: 7, name: 'Car Parts' });
    await Subcategory.create({ category_Id: 7, name: 'Tools & Equipment' });
    await Subcategory.create({ category_Id: 7, name: 'Tires & Wheels' });

    await Subcategory.create({ category_Id: 8, name: 'Fiction Books' });
    await Subcategory.create({ category_Id: 8, name: 'Non-Fiction Books' });
    await Subcategory.create({
        category_Id: 8,
        name: 'Textbooks & Educational',
    });
    await Subcategory.create({ category_Id: 8, name: 'Music & Vinyl' });
    await Subcategory.create({ category_Id: 8, name: 'Movies & TV Shows' });

    await Subcategory.create({ category_Id: 9, name: 'Snacks & Beverages' });
    await Subcategory.create({ category_Id: 9, name: 'Fresh Produce' });
    await Subcategory.create({ category_Id: 9, name: 'Pantry Staples' });
    await Subcategory.create({ category_Id: 9, name: 'Frozen & Dairy' });
    await Subcategory.create({
        category_Id: 9,
        name: 'Health & Organic Foods',
    });

    await Subcategory.create({ category_Id: 10, name: 'Writing & Stationery' });
    await Subcategory.create({ category_Id: 10, name: 'Office Furniture' });
    await Subcategory.create({ category_Id: 10, name: 'Computer Accessories' });
    await Subcategory.create({
        category_Id: 10,
        name: 'Organization & Storage',
    });
    await Subcategory.create({ category_Id: 10, name: 'Printing & Paper' });
    console.log('\x1b[35mSubcategory\x1b[34m table populated\x1b[0m');
} catch (error) {
    throw new AppError('Error while populating subcategory model', 500);
}

export default Subcategory;
