// @ts-check
import swaggerUi from 'swagger-ui-express';
import app from './app.js';
import dotenv from 'dotenv';
import cleanup from './cleanup.js';
import populate from '../database/populate.js';
import { createAdmin } from '../controllers/userController.js';
import Category from '../models/categoryModel.js';
import Subcategory from '../models/subcategoryModel.js';
import { syncModels } from '../models/categorySyncModel.js';
import { Model } from 'sequelize';
import fs from 'fs';

dotenv.config();
/**@type {string | undefined}*/
const port = process.env.PORT;
const setup = async () => {
    try {
        await Category.sync();
        await Subcategory.sync();
        await syncModels();

        /**@type {Model<any, any> | null}*/
        const categoryExists = await Category.findOne();
        /**@type {Model<any, any> | null}*/
        const subcategoryExists = await Subcategory.findOne();

        if (!categoryExists) {
            console.warn('No categories found!');
        }
        if (!subcategoryExists) {
            console.warn('No subcategories found!');
        }
    } catch (error) {
        console.error('Database setup error:', error);
    }
};

const outputFile = JSON.parse(
    fs.readFileSync('./server/swagger_output.json', 'utf8')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(outputFile));

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
