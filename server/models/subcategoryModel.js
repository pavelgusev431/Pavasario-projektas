import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';
import AppError from '../utilities/AppError.js';

const Subcategory = sq.define(
    'Subcategory',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        category_id: { type: DataTypes.INTEGER, allowNull: false },  // ✅ Исправленное имя поля (соглашение snake_case)
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
        timestamps: false,
        tableName: 'subcategories',
    }
);

// 🔹 Saugios sinchronizacijos naudojimas
try {
    await Subcategory.sync({ alter: true });
    console.log('\x1b[35mSubcategory\x1b[34m table created\x1b[0m');
} catch (error) {
    throw new AppError(`Error while creating subcategory model: ${error}`, 500);
}

// 🔹 Supaprastinta duomenų pridėjimo struktūra (lengviau skaitoma)
const subcategories = [
    { category_id: 1, name: 'Smartphones & Accessories' },
    { category_id: 1, name: 'Computers & Laptops' },
    { category_id: 1, name: 'Audio & Headphones' },
    { category_id: 1, name: 'Wearable Tech' },
    { category_id: 1, name: 'Home Electronics' },

    { category_id: 2, name: "Men's Clothing" },
    { category_id: 2, name: "Women's Clothing" },
    { category_id: 2, name: 'Shoes & Footwear' },
    { category_id: 2, name: 'Accessories' },
    { category_id: 2, name: 'Jewelry' },

    { category_id: 3, name: 'Living Room Furniture' },
    { category_id: 3, name: 'Bedroom Furniture' },
    { category_id: 3, name: 'Kitchen & Dining' },
    { category_id: 3, name: 'Home Décor' },
    { category_id: 3, name: 'Lighting' },

    { category_id: 4, name: 'Skincare' },
    { category_id: 4, name: 'Haircare' },
    { category_id: 4, name: 'Makeup' },
    { category_id: 4, name: 'Personal Care' },
    { category_id: 4, name: 'Fitness & Nutrition' },

    { category_id: 5, name: 'Exercise Equipment' },
    { category_id: 5, name: 'Outdoor Gear' },
    { category_id: 5, name: 'Sports Apparel' },
    { category_id: 5, name: 'Team Sports' },
    { category_id: 5, name: 'Bicycles & Accessories' },

    { category_id: 6, name: 'Action Figures & Collectibles' },
    { category_id: 6, name: 'Board Games & Puzzles' },
    { category_id: 6, name: 'Video Games & Consoles' },
    { category_id: 6, name: 'Educational Toys' },
    { category_id: 6, name: 'Dolls & Plush Toys' }
];

for (const subcategory of subcategories) {
    const existingSubcategory = await Subcategory.findOne({ where: { name: subcategory.name } });

    if (!existingSubcategory) {
        await Subcategory.create(subcategory);
        console.log(`✅ Pridėta nauja subkategorija: ${subcategory.name}`);
    } else {
        console.log(`⚠️ Subkategorija „${subcategory.name}“ jau egzistuoja.`);
    }
}

export default Subcategory;
