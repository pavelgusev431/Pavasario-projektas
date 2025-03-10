import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'No token provided' }); // ⛔ Теперь блокируем доступ
    }

    try {
        const decoded = jsonwebtoken.verify(token, JWT_SECRET);

        // ✅ Поиск пользователя в базе
        const foundUser = await User.findByPk(decoded.id);
        if (!foundUser) {
            return res.status(401).json({ status: 'fail', message: 'User not found' });
        }

        req.user = foundUser; // ✅ Теперь данные пользователя сохраняются в `req.user`
        next(); // ✅ Передаём управление дальше
    } catch (error) {
        return res.status(401).json({ status: 'fail', message: 'Unauthorized: invalid token' });
    }
};

export default protect;
