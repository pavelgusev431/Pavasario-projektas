import sq from './sequelize.js';
import AppError from '../utilities/AppError.js';
import fs from 'fs';
import path from 'path';

// Путь к SQL-файлу
const sqlFilePath = path.join(process.cwd(), 'database', 'database.sql');

console.log('\x1b[32m[INFO] Начинаем заполнение базы данных...\x1b[0m');

const populate = async () => {
    try {
        if (!fs.existsSync(sqlFilePath)) {
            throw new AppError(`[ERROR] Файл database.sql не найден по пути: ${sqlFilePath}`, 500);
        }

        const fileData = fs.readFileSync(sqlFilePath, 'utf8');
        console.log('\x1b[36m[INFO] Загружен SQL-скрипт для заполнения базы\x1b[0m');

        await sq.query(fileData);
        console.log('\x1b[32m[SUCCESS] Таблицы успешно заполнены данными!\x1b[0m');
    } catch (error) {
        console.error('\x1b[31m[ERROR] Ошибка при заполнении таблиц:\x1b[0m', error.message);
    }
};

export default populate;

console.log('\x1b[32m[INFO] Заполнение базы данных завершено.\x1b[0m');