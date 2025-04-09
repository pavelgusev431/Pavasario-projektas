import fs from 'fs';
import images from '../utilities/getImages.js';

const cleanup = async () => {
    fs.rmSync(images(), { recursive: true, force: true }, (error) => {
        throw new Error(error);
    });
    if (!fs.existsSync(images()))
        fs.mkdirSync(images(), { force: true }, (error) => {
            throw new Error(error);
        });
    console.log('\x1b[0mImages\x1b[30m directory cleaned up\x1b[0m');
};

export default cleanup;
