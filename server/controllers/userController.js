import { User } from '../models/userModel.js';
import jsonwebtoken from 'jsonwebtoken';
import AppError from '../utilities/AppError.js';
import sha1 from 'js-sha1';
import sha256 from 'js-sha256';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import UserSecret from "../models/userSecretModel.js";



dotenv.config();

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const ADMIN_HASH = sha256(sha1(sha256(sha1(ADMIN_PASS)) + 'salt'));
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Создание администратора
const createAdmin = async () => {
    try {
        const admin = await User.create({
            username: ADMIN_USER,
            email: ADMIN_EMAIL,
        });

        console.log(`\x1b[34mUser \x1b[31m"${ADMIN_USER}"\x1b[34m created successfully\x1b[0m`);

        console.log(`🔐 Хеш пароля при регистрации: ${hashedPassword}`);
        console.log(`🧂 Соль при регистрации: ${salt}`);


        await UserSecret.create({
            user_id: admin.id,
            password: `${ADMIN_HASH}:salt`,
            role: 'admin',
        });

        console.log(`\x1b[34mUser \x1b[31m"${ADMIN_USER}"\x1b[34m secret created successfully\x1b[0m`);
    } catch (error) {
        throw new AppError(`\x1b[31mError creating admin account:\x1b[0m\n${error}`, 500);
    }
};

// Создание пользователя
const createUser = async (req, res) => {
try {
const { username, password, email } = req.body;
    const role = "user";
    const now = new Date();
        const salt = sha256(sha1(now.toString() + username));
        const hashedPassword = password.length === 64 ? password : sha256(sha1(password + salt));


        // Создаём пользователя
        const user = await User.create({ username, email });

        if (!user || !user.id) {
            throw new Error("Ошибка при создании пользователя: ID не получен.");
        }

        console.log(`✅ Пользователь создан: ${user.id}`);

        // Создаём запись пароля в `user_secrets`
        await UserSecret.create({
            user_id: user.id,
            password: `${hashedPassword}:${salt}`,
            role: role,
        });

        console.log(`✅ Запись в user_secrets создана для пользователя ${user.id}`);

        // Генерируем токен
        const token = jsonwebtoken.sign(
            { id: user.id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log(`✅ Токен сгенерирован для пользователя ${user.id}`);

        // Сохраняем токен в **HTTP-ONLY COOKIE**
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        });

        res.status(201).json({
            status: "success",
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token: token,
        });
    } catch (error) {
        console.error("❌ Ошибка при создании пользователя:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

// Вход пользователя
const login = async (req, res) => {
    const { username, password } = req.body;

    console.log("\x1b[33m[DEBUG] Попытка входа пользователя:\x1b[0m", username);

    // Находим пользователя
    const user = await User.findOne({ where: { username } });
    if (!user) {
        console.log("\x1b[31m[ERROR] Пользователь не найден\x1b[0m");
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Находим пароль в `user_secrets`
    const secret = await UserSecret.findOne({ where: { user_id: user.id } });
    if (!secret) {
        console.log("\x1b[31m[ERROR] Пароль не найден в user_secrets\x1b[0m");
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Извлекаем соль и хеш пароля
    const parts = secret.password.split(':');
    if (parts.length !== 2) {
        console.log("\x1b[31m[ERROR] Ошибка: неправильный формат пароля в БД\x1b[0m");
        return res.status(500).json({ message: "Ошибка в данных пользователя" });
    }

    const storedHash = parts[0]; // Хеш пароля из БД
    const salt = parts[1]; // Соль

    console.log(`✅ Соль найдена: ${salt}`);

    console.log(`🔑 Введённый пароль перед хешированием: '${password}'`);


    // Хешируем введённый пароль с той же солью
    const hashedPassword = password;

    console.log(`🔐 Хеш пароля при входе: ${hashedPassword}`);
    console.log(`🧂 Соль при входе: ${salt}`);
    console.log(`🆚 Ожидаемый хеш из БД: ${storedHash}`);


    // Сравниваем хеши
    if (hashedPassword !== storedHash) {
        console.log("\x1b[31m[ERROR] Неверный пароль\x1b[0m");
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Генерируем токен
    const token = jsonwebtoken.sign(
        { id: user.id, role: secret.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    console.log("\x1b[32m[SUCCESS] Токен создан:\x1b[0m", token);

    // Сохраняем токен в куки
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax', path: '/' });
    
    res.status(200).json({
        status: "success",
        data: { id: user.id, username: user.username, email: user.email },
        token: token,
    });
};

// Выход пользователя
const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(203);
    const token = jsonwebtoken.decode(cookies.token);
    const foundUser = await User.findByPk(token.id);
    if (foundUser) {
        res.clearCookie('token', { httpOnly: true });
        return res.sendStatus(204);
    } else {
        throw new AppError('User not found', 404);
    }
};

// Получить текущего пользователя
const me = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log("Декодируем токен:", decoded);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            status: "success",
            data: { id: user.id, username: user.username, email: user.email },
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

// Получить пользователя по имени
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new AppError(`User "${username}" not found`, 404);
    }
    user.password = undefined; // убираем пароль из ответа
    res.status(200).json({ status: 'success', data: user });
};

// Получить пользователя по ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: `User with id ${id} not found` });
    }
    user.password = undefined; // убираем пароль из ответа
    res.status(200).json({ status: 'success', data: user });
};

// Обновление профиля пользователя
const updateUserProfile = async (req, res) => {
    try {
        const { username, email, description, contacts, image_url } = req.body;
        const userId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Обновляем поля пользователя
        user.username = username || user.username;
        user.email = email || user.email;
        user.description = description || user.description;
        user.contacts = contacts || user.contacts;
        user.image_url = image_url || user.image_url;

        await user.save();

        res.status(200).json({
            status: "success",
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                description: user.description,
                contacts: user.contacts,
                image_url: user.image_url,
            },
        });
    } catch (error) {
        console.error("❌ Ошибка при обновлении профиля:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

// Получить всех пользователей
const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json({ status: 'success', data: users });
};

// Получить соль пользователя
const getSalt = async (req, res) => {
    try {
    const { username } = req.params;
    console.log(`🔍 Запрос соли для пользователя: ${username}`);

    // Поиск пользователя
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(404).json({ message: "Пользователь не найден." });
    }

    // Поиск его пароля в таблице user_secrets
    const secret = await UserSecret.findOne({ where: { user_id: user.id } });
    if (!secret) {
        return res.status(404).json({ message: "Секрет пользователя не найден." });
        }

     // Извлечение соли
    const salt = secret.password.split(':')[1];

    console.log(`✅ Соль найдена: ${salt}`);
    return res.status(200).json({ salt });
    } catch (error) {
    console.error("❌ Ошибка при получении соли:", error.message);
    res.status(500).json({ message: "Ошибка сервера." });
    }
};

const updateUserPassword = async (req, res) => {
    try {
        console.log("📥 Данные от клиента:", req.body);
        console.log("🔑 Авторизованный пользователь ID:", req.user?.id);

        const { current, new: newPassword, confirm } = req.body;
        const userId = req.user.id;

        const userSecret = await UserSecret.findOne({ where: { user_id: userId } });

        if (!userSecret || !userSecret.password) {
            return res.status(400).json({ status: "fail", message: "User does not have a password set" });
        }

        console.log("🔐 Пароль из БД:", userSecret.password);

        // Разбираем хранимый пароль
        const parts = userSecret.password.split(":");
        if (parts.length !== 2) {
            return res.status(500).json({ status: "fail", message: "Invalid password format in database" });
        }

        const storedHash = parts[0];  // 🔑 Сам хеш пароля
        const salt = parts[1];        // 🧂 Соль

        console.log("🧂 Соль из БД:", salt);
        console.log("🔑 Введённый текущий пароль:", current);

        // Хешируем введённый пароль и сравниваем
        const enteredHash = sha256(sha1(current + salt));

        console.log("🔐 Хеш введённого пароля:", enteredHash);
        console.log("🆚 Ожидаемый хеш:", storedHash);

        if (enteredHash !== storedHash) {
            return res.status(400).json({ status: "fail", message: "Incorrect current password" });
        }

        if (newPassword !== confirm) {
            return res.status(400).json({ status: "fail", message: "New passwords do not match" });
        }

        // Генерируем новую соль и хешируем новый пароль
        const newSalt = sha256(sha1(Date.now().toString() + userId));
        const newHashedPassword = sha256(sha1(newPassword + newSalt));

        userSecret.password = `${newHashedPassword}:${newSalt}`;

        await userSecret.save();

        console.log("✅ Пароль успешно обновлён!");

        res.status(200).json({ status: "success", message: "Password updated successfully" });
    } catch (error) {
        console.error("❌ Ошибка при обновлении пароля:", error);
        res.status(500).json({ status: "fail", message: "Server error" });
    }
};

// Экспорт функций
export {
    createAdmin,
    createUser,
    login,
    logout,
    me,
    getUserByUsername,
    getUserById,
    updateUserProfile,
    updateUserPassword,
    getAllUsers,
    getSalt
};