import fs from 'fs';

const envbackup = fs.readFileSync('.env', 'utf8');

fs.writeFileSync('.env.backup', envbackup);
console.log('\x1b[32mBackup of .env file created\x1b[0m');
