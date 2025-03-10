import express from 'express';
import cors from 'cors';
import errorHandler from '../middlewares/errorHandler.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from '../routers/userRouter.js';
import productRouter from '../routers/productRouter.js';
import protect from '../validators/validateJWT.js';

dotenv.config();
const CLIENT_HOST = process.env.CLIENT_HOST || "localhost";
const CLIENT_PORT = process.env.CLIENT_PORT || "5173";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`,
        credentials: true,
    })
);
app.use(cookieParser());

//==============
// Добавляем маршруты
app.use('/users', userRouter);
app.use('/products', productRouter);

// Добавляем маршрут `/auth/me`
app.get("/auth/me",protect, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        image_url: req.user.image_url || "/placeholder.svg"
    });
});

//==============
// Последний middleware
app.use(errorHandler);

export default app;
