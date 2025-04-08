import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const getImage = (req, res, next) => {
    try {
        const { dir, file } = req.params;
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const images = path.join(__dirname, '..', 'public', 'images');
        res.status(200).sendFile(`${images}/${dir}/${file}`);
    } catch (error) {
        next(error);
    }
};

const getImages = (req, res, next) => {
    const { dir } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const images = path.join(__dirname, '..', 'public', 'images');
};

export { getImage, getImages };
