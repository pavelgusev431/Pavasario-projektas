import fs from 'fs';

const env = fs.existsSync('.env') ? fs.readFileSync('.env') : null;

if (!env || env == undefined || env == null || String(env).match(/^\s*$/)) {
    fs.writeFileSync('.env', '');
    fs.appendFileSync(
        '.env',
        'DB_HOST=localhost\rDB_NAME=\rDB_USER=postgres\rDB_PASS=\rDB_PORT=5432\r\rCLIENT_HOST=localhost\rCLIENT_PORT=5173\r\rPORT=3000\rHOST=localhost\r\rADMIN_USER=admin\rADMIN_PASS=admin\rADMIN_EMAIL=admin@gmail.com\r\r# auto re-generated\r'
    );
    fs.appendFileSync(
        '.env',
        'JWT_SECRET=0000000000000000000000000000000000000000000000000000000000000000'
    );
    throw new Error(
        '\x1b[35mPlease fill in the .env file with your database credentials and other necessary information.\x1b[0m'
    );
} else {
    console.log('\x1b[32m.env file found.\x1b[0m');
}