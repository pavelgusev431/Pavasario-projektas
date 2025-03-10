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

dotenv.config();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, '../public');

// 📌 Подключаем middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // ✅ Разрешает куки
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
}));
app.use(express.json());
app.use(cookieParser());

// 📌 Дебаг кук
app.use((req, res, next) => {
    console.log("🔥 [DEBUG] Куки от клиента:", req.cookies);
    next();
});

// ⏳ Дожидаемся подключения к БД перед стартом сервера
await sq.sync();
console.log("✅ Database synced!");

// ❗️ Закомментируй, если файла нет!
import productRouter from '../routers/productRouter.js';
app.use("/products", productRouter);

// 📌 Раздаём статику (всегда в конце!)
app.use(express.static(clientBuildPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// 📌 Запускаем сервер и заполняем БД
app.listen(port, async () => {
    await populate(); // ✅ Теперь populate вызывается перед запуском
    cleanup();
    console.log(`🚀 Server started on: http://localhost:${port}`);
});
