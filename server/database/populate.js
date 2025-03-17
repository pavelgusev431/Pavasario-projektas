import sq from './sequelize.js';
import AppError from '../utilities/AppError.js';
import fs from 'fs';
import path from 'path';

const sqlFilePath = path.join(process.cwd(), 'database', 'database.sql');

const logSuccess = (message) => console.log(`\x1b[32m${message}\x1b[0m`);
const logError = (message) => console.error(`\x1b[31m${message}\x1b[0m`);
const logInfo = (message) => console.log(`\x1b[36m${message}\x1b[0m`);

logInfo('[INFO] Pradedama duomenų bazės užpildymas...');

const populate = async () => {
    try {
        if (!fs.existsSync(sqlFilePath)) {
            logError(`[KLAIDA] Failas database.sql nerastas šiuo keliu: ${sqlFilePath}`);
            throw new AppError(`Failas database.sql nerastas`, 500);
        }

        const fileData = fs.readFileSync(sqlFilePath, 'utf8');
        logInfo('[INFO] SQL scenarijus įkeltas sėkmingai');

        await sq.query(fileData);
        logSuccess('[SĖKMĖ] Lentelės sėkmingai užpildytos duomenimis!');
    } catch (error) {
        logError(`[KLAIDA] Klaida užpildant lenteles: ${error.message}`);
        throw new AppError(`Klaida užpildant lenteles: ${error}`, 500);
    }
};

export default populate;

logInfo('[INFO] Duomenų bazės užpildymas baigtas.');
