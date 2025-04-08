import multer from 'multer';
import dotenv from 'dotenv';
import AppError from '../utilities/AppError.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from '../models/userModel.js';
dotenv.config();

//default path
const getImages = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const images = path.join(__dirname, '..', 'public', 'images');
    return images;
};

//checkers
const checkMulter = () => {
    const images = getImages();
    try {
        fs.access(
            images,
            fs.constants.F_OK |
                fs.constants.R_OK |
                fs.constants.W_OK |
                fs.constants.X_OK,
            (err) => {
                if (err) console.log(`FileSystem access error: ${err}`);
                else
                    console.log(
                        `\x1b[0mFileSystem access: \x1b[32m${!err}\x1b[0m`
                    );
            }
        );
        const formattedImages = images
            .split('/')
            .map((image) => {
                if (image != 'public' && image != 'images') {
                    return `\x1b[30m${image}`;
                } else {
                    return `\x1b[32m${image}`;
                }
            })
            .join('\x1b[0m/');
        console.log('\x1b[0mMulter: \x1b[32mFile upload is ready\x1b[0m');
        console.log(`File upload at: \x1b[30m${formattedImages}\x1b[0m`);
    } catch (error) {
        console.log(
            `\x1b[31mMulter: Multer is not configured properly: ${error}\x1b[0m`
        );
    }
};
const checkFileTypes = (_req, res, next) => {
    try {
        const fileTypes = process.env.AVAILABLE_IMAGE_FILE_TYPES.split(', ');
        if (!fileTypes) {
            throw new AppError('Internal server error', 500);
        } else {
            res.status(200).json({
                status: 'success',
                data: fileTypes,
            });
        }
    } catch (error) {
        next(error);
    }
};

//uploader
const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        const { dirName } = req.cookies;
        console.log(dirName);
        cb(null, `public/images/${dirName}`);
    },
    filename: async (req, file, cb) => {
        const suffixedName = Date.now() + '_' + file.originalname;
        const { dirName } = req.cookies;
        console.log(dirName);
        const userId = dirName.split('user').join('');
        if (userId) {
            const foundUser = await User.findByPk(Number(userId));
            if (foundUser) {
                foundUser.image_url = `http://${process.env.HOST}:${process.env.PORT}/images/${dirName}/${suffixedName}`;
                await foundUser.save();
            }
        }

        cb(null, suffixedName);
    },
});
const upload = multer({
    storage: storage,
});
const uploadResult = (_req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'File(-s) uploaded successfully',
        });
    } catch (error) {
        next(error);
    }
};

//directory setter
const getDirectory = (req, res, next) => {
    try {
        const images = getImages();
        const { dirName } = req.body;
        if (!dirName) {
            res.status(423).json({
                status: 'fail',
                message: 'No directory name provided',
            });
            return;
        }
        res.cookie('dirName', dirName, { httpOnly: true, maxAge: 10000 });
        if (!fs.existsSync(`${images}/${dirName}`)) {
            fs.mkdirSync(`${images}/${dirName}`);
            return res.status(201).json({
                status: 'success',
                message: `Directory '${dirName}' created successfully`,
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: `Directory '${dirName}' saved`,
            });
        }
    } catch (error) {
        next(error);
    }
};
export { checkMulter, checkFileTypes, upload, uploadResult, getDirectory };
