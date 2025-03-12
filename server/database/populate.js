import sq from './sequelize.js';
import AppError from '../utilities/AppError.js';
import fs from 'fs';
import path from 'path';

// Kelias į SQL failą
const sqlFilePath = path.join(process.cwd(), 'database', 'database.sql');

console.log('\x1b[32m[INFO] Pradedama duomenų bazės užpildymas...\x1b[0m');

const populate = async () => {
    try {
        if (!fs.existsSync(sqlFilePath)) {
            throw new AppError(`[KLAIDA] Failas database.sql nerastas šiuo keliu: ${sqlFilePath}`, 500);
        }

        const fileData = fs.readFileSync(sqlFilePath, 'utf8');
        console.log('\x1b[36m[INFO] SQL scenarijus įkeltas sėkmingai\x1b[0m');

        await sq.query(fileData);
        console.log('\x1b[32m[SĖKMĖ] Lentelės sėkmingai užpildytos duomenimis!\x1b[0m');
    } catch (error) {
        console.error('\x1b[31m[KLAIDA] Klaida užpildant lenteles:\x1b[0m', error.message);
        throw new AppError(`Klaida užpildant lenteles: ${error}`, 500);
    }
};

export default populate;

console.log('\x1b[32m[INFO] Duomenų bazės užpildymas baigtas.\x1b[0m');
