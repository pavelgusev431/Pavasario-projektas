// @ts-check
import Category from './categoryModel.js';
import Subcategory from './subcategoryModel.js';
import sq from '../database/sequelize.js';
import Product from './productModel.js';
Category.hasMany(Subcategory, {
    foreignKey: 'categoryId',
    as: 'subcategories',
});
Subcategory.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export { Category, Subcategory };

const syncModels = async () => {
    try {
        await sq.query('DROP TABLE IF EXISTS "subcategories" CASCADE');
        await Subcategory.drop();
        await Category.drop();
        await Category.sync({ alter: true });
        console.log('\x1b[35mCategory\x1b[34m table created\x1b[0m');

        await Category.bulkCreate([
            { name: 'Electronics' },
            { name: 'Fashion & Apparel' },
            { name: 'Home & Furniture' },
            { name: 'Health & Beauty' },
            { name: 'Sports & Outdoors' },
            { name: 'Toys & Games' },
            { name: 'Automotive' },
            { name: 'Books & Media' },
            { name: 'Groceries & Food' },
            { name: 'Office & School Supplies' },
        ]);
        console.log('\x1b[35mCategory\x1b[36m table populated\x1b[0m');

        /**@type {object}*/
        const syncOptions = {
            /**@type {boolean}*/
            alter: true,
            /**@type {boolean}*/
            force: true,
        };
        await Subcategory.sync(syncOptions);
        console.log('\x1b[35mSubcategory\x1b[34m table created\x1b[0m');

        /**@type {object}*/
        const electronicsCategory = await Category.findOne({
            where: { name: 'Electronics' },
        });
        /**@type {object}*/
        const fashionCategory = await Category.findOne({
            where: { name: 'Fashion & Apparel' },
        });
        /**@type {object}*/
        const homeCategory = await Category.findOne({
            where: { name: 'Home & Furniture' },
        });
        /**@type {object}*/
        const healthCategory = await Category.findOne({
            where: { name: 'Health & Beauty' },
        });
        /**@type {object}*/
        const sportsCategory = await Category.findOne({
            where: { name: 'Sports & Outdoors' },
        });
        /**@type {object}*/
        const toysCategory = await Category.findOne({
            where: { name: 'Toys & Games' },
        });
        /**@type {object}*/
        const automotiveCategory = await Category.findOne({
            where: { name: 'Automotive' },
        });
        /**@type {object}*/
        const booksCategory = await Category.findOne({
            where: { name: 'Books & Media' },
        });
        /**@type {object}*/
        const groceriesCategory = await Category.findOne({
            where: { name: 'Groceries & Food' },
        });
        /**@type {object}*/
        const officeCategory = await Category.findOne({
            where: { name: 'Office & School Supplies' },
        });
        await Product.sync({ alter: true, force: true });
        console.log('\x1b[35mProduct\x1b[34m table created\x1b[0m');
        await Subcategory.bulkCreate([
            {
                categoryId: electronicsCategory.id,
                name: 'Smartphones & Accessories',
            },
            { categoryId: electronicsCategory.id, name: 'Computers & Laptops' },
            { categoryId: electronicsCategory.id, name: 'Audio & Headphones' },
            { categoryId: electronicsCategory.id, name: 'Wearable Tech' },
            { categoryId: electronicsCategory.id, name: 'Home Electronics' },
            { categoryId: fashionCategory.id, name: "Men's Clothing" },
            { categoryId: fashionCategory.id, name: "Women's Clothing" },
            { categoryId: fashionCategory.id, name: 'Shoes & Footwear' },
            { categoryId: fashionCategory.id, name: 'Accessories' },
            { categoryId: fashionCategory.id, name: 'Jewelry' },
            { categoryId: homeCategory.id, name: 'Living Room Furniture' },
            { categoryId: homeCategory.id, name: 'Bedroom Furniture' },
            { categoryId: homeCategory.id, name: 'Kitchen & Dining' },
            { categoryId: homeCategory.id, name: 'Home Décor' },
            { categoryId: healthCategory.id, name: 'Vitamins & Supplements' },
            { categoryId: healthCategory.id, name: 'Skincare & Haircare' },
            { categoryId: healthCategory.id, name: 'Health Food' },
            { categoryId: healthCategory.id, name: 'Fitness Equipment' },
            { categoryId: sportsCategory.id, name: 'Team Sports' },
            { categoryId: sportsCategory.id, name: 'Individual Sports' },
            { categoryId: sportsCategory.id, name: 'Outdoor Gear' },
            { categoryId: toysCategory.id, name: 'Action Figures & Playsets' },
            { categoryId: toysCategory.id, name: 'Dolls & Accessories' },
            { categoryId: toysCategory.id, name: 'Puzzles & Games' },
            { categoryId: toysCategory.id, name: 'Outdoor Toys' },
            { categoryId: automotiveCategory.id, name: 'Car Electronics' },
            { categoryId: automotiveCategory.id, name: 'Car Accessories' },
            { categoryId: automotiveCategory.id, name: 'Car Maintenance' },
            { categoryId: automotiveCategory.id, name: 'Car Parts' },
            { categoryId: booksCategory.id, name: 'Fiction Books' },
            { categoryId: booksCategory.id, name: 'Non-Fiction Books' },
            { categoryId: booksCategory.id, name: 'Childrens Books' },
            { categoryId: booksCategory.id, name: 'Textbooks' },
            { categoryId: groceriesCategory.id, name: 'Fresh Produce' },
            { categoryId: groceriesCategory.id, name: 'Meat & Seafood' },
            { categoryId: groceriesCategory.id, name: 'Dairy & Eggs' },
            { categoryId: groceriesCategory.id, name: 'Bakery & Bread' },
            { categoryId: officeCategory.id, name: 'Office Supplies' },
            { categoryId: officeCategory.id, name: 'School Supplies' },
            { categoryId: officeCategory.id, name: 'Furniture & Decor' },
            { categoryId: officeCategory.id, name: 'Technology & Electronics' },
        ]);
        console.log('\x1b[35mSubcategory\x1b[36m table populated\x1b[0m');
    } catch (error) {
        console.error(error);
    }
};

export { syncModels };
