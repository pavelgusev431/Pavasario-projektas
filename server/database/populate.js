// @ts-check
import sq from './sequelize.js';
import AppError from '../utilities/AppError.js';
import fs from 'fs';

/**@type {string}*/
const fileData = fs.readFileSync('./database/database.sql', 'utf8');

console.log('\x1b[32mPopulating tables...\x1b[0m');

const populate = async () => {
    try {
        await sq.query(fileData);
        console.log('\x1b[32mPopulated tables successfully\x1b[0m');
    } catch (error) {
        throw new AppError(`Error while populating tables: ${error}`, 500);
    }
};

export default populate;
