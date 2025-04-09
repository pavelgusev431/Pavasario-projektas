import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const images = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const images = path.join(__dirname, '..', 'public', 'images');
    return images;
};

export default images;
