import fs from 'fs';

const database = fs.existsSync('database/database.sql');

if (!database) {
    fs.writeFileSync('database/database.sql', '');
    console.log('\x1b[32mDatabase file created.\x1b[0m');
}