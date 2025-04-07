import express from 'express';
import cors from 'cors';
import errorHandler from '../middlewares/errorHandler.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
//Routers
import userRouter from '../routers/userRouter.js';
import productRouter from '../routers/productRouter.js';
import commentRouter from '../routers/commentRouter.js';
import categoryRouter from '../routers/categoryRouter.js';
import adminRouter from '../routers/adminRouter.js';
import uploadRouter from '../routers/uploadRouter.js';

dotenv.config();
const CLIENT_HOST = process.env.CLIENT_HOST || 'localhost';
const CLIENT_PORT = process.env.CLIENT_PORT || '3000';

const app = express();
app.use(
    morgan(
        'Received request \x1b[32m:method\x1b[35m :url\x1b[33m :status\x1b[0m'
    )
);
app.use(express.json());
app.use(
    cors({
        origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`,
        credentials: true,
    })
);
app.use(cookieParser());
//==============
//routes go here
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/comments', commentRouter);
app.use('/categories', categoryRouter);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);
//==============
//last
app.use(errorHandler);

export default app;
