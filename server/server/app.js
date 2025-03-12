import express from 'express';
import cors from 'cors';
import errorHandler from '../middlewares/errorHandler.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from '../routers/userRouter.js';
import productRouter from '../routers/productRouter.js';
import protect from '../validators/validateJWT.js';
import morgan from 'morgan';

dotenv.config();
const CLIENT_HOST = process.env.CLIENT_HOST || "localhost";
const CLIENT_PORT = process.env.CLIENT_PORT || "5173";

const app = express();

app.use(
    morgan(
        'Received request \x1b[32m:method\x1b[35m localhost3000:url\x1b[33m :status\x1b[0m'
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

// Маршруты
app.use('/users', userRouter);
app.use('/products', productRouter);

app.get("/auth/me", protect, (req, res) => {
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

// Последний middleware
app.use(errorHandler);

export default app;
