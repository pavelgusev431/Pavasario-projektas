import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const cleanup = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const images = path.join(__dirname, '..', 'public', 'images');
    fs.rmSync(images, { recursive: true, force: true }, (error) => {
        throw new Error(error);
    });
    if (!fs.existsSync(images))
        fs.mkdirSync(images, { force: true }, (error) => {
            throw new Error(error);
        });
    console.log('\x1b[0mImages\x1b[30m directory cleaned up\x1b[0m');
};

export default cleanup;
