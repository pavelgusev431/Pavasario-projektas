import app from './app.js';
import dotenv from 'dotenv';
import cleanup from './cleanup.js';
import populate from '../database/populate.js';
import { createAdmin } from '../controllers/userController.js';
import Category from '../models/categoryModel.js';
import Subcategory from '../models/subcategoryModel.js';

dotenv.config();
const port = process.env.PORT;
const setup = async () => {
    try {
        await Category.findOne();
        await Subcategory.findOne();
    } catch (error) {
        console.log(error);
    }
};

app.listen(port, async () => {
    cleanup();
    await setup()
        .then(async () => {
            await createAdmin();
        })
        .then(async () => {
            await populate();
        })
        .then(() => {
            console.log(
                `\x1b[36mServer started on port \x1b[35m${port}`,
                '\x1b[0m'
            );
        });
});
