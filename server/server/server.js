import app from './app.js';
import dotenv from 'dotenv';
import cleanup from './cleanup.js';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import populate from '../database/populate.js';
import UserSecret from "../models/userSecretModel.js";
import { User } from '../models/userModel.js';
import sq from '../database/sequelize.js';
import { createAdmin } from '../controllers/userController.js';
import Category from '../models/categoryModel.js';
import Subcategory from '../models/subcategoryModel.js';
import productRouter from '../routers/productRouter.js';
import userRouter from '../routers/userRouter.js';

dotenv.config();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, '../public');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
}));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("🔥 [DEBUG] Куки от клиента:", req.cookies);
    next();
});

console.log("✅ Database synced!");

app.use("/users", userRouter);
app.use("/products", productRouter);

app.use(express.static(clientBuildPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

const setup = async () => {
    try {
        await Category.findOne();
        await Subcategory.findOne();
    } catch (error) {
        console.log(error);
    }
};
await sq.sync();

app.listen(port, async () => {
    cleanup();
    await setup()
        .then(async () => {
            await createAdmin();
        })
        .then(async () => {
            await populate();
        })
        .then(() => {
            console.log(`🚀 Server started on: http://localhost:${port}`);
        });
});
