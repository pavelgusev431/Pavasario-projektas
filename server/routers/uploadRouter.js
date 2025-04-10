import express from 'express';
import {
    checkFileTypes,
    upload,
    uploadResult,
    getDirectory,
} from '../controllers/uploadController.js';
import protect from '../validators/validateJWT.js';

const uploadRouter = express.Router();

uploadRouter.route('/').get(checkFileTypes);
uploadRouter.use(protect);
uploadRouter.route('/dir').post(getDirectory);
uploadRouter.route('/avatar').post(upload.single('avatar'), uploadResult);
uploadRouter.route('/images').post(upload.array('images'), uploadResult);
export default uploadRouter;
