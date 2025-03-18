import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/userModel.js'; // Убедись, что UserSecret импортирован
import dotenv from 'dotenv';
import { Model } from 'sequelize';
import { UserSecret } from '../models/userSecretModel.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

console.log("🔐 [MIDDLEWARE] JWT_SECRET (Server verification):", JWT_SECRET);

const protect = async (req, res, next) => {
    console.log("📥 [MIDDLEWARE] Incoming request - Method:", req.method, "URL:", req.originalUrl);
    console.log("🔎 [MIDDLEWARE] req.headers:", req.headers);
    console.log("🔎 [MIDDLEWARE] req.body:", req.body);
    console.log("🔎 [MIDDLEWARE] req.cookies:", req.cookies);

    const token = req.cookies?.authToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    console.log("📥 [MIDDLEWARE] Received token:", token || "❌ No token found");

    if (!token) {
        console.error("❌ [MIDDLEWARE] Token missing.");
        return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized: No token provided',
        });
    }

    try {
        const decoded = jsonwebtoken.verify(token, JWT_SECRET);

        console.log("✅ [MIDDLEWARE] Decoded token:", decoded);
        console.log("🔐 [MIDDLEWARE] JWT_SECRET during verification:", JWT_SECRET);

        // Проверяем, не истёк ли срок действия токена
        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log("⏳ [MIDDLEWARE] Current timestamp:", currentTimestamp);
        console.log("🕒 [MIDDLEWARE] Token expiration timestamp:", decoded.exp);

        if (decoded.exp && decoded.exp < currentTimestamp) {
            console.error("❌ [MIDDLEWARE] Token has expired.");
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized: Token expired',
            });
        }

        // Поиск пользователя по ID из токена
        const foundUser = await User.findByPk(decoded.id, {
            include: [
                {
                    model: UserSecret,
                    attributes: ['role'],
                },
            ],
        });

        if (!foundUser) {
            console.error("❌ [MIDDLEWARE] User not found with ID:", decoded.id);
            return res.status(401).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        const userRole = foundUser.UserSecret?.role || 'user';

        console.log("🟢 [MIDDLEWARE] User found:", foundUser.id);

        console.log("👤 [MIDDLEWARE] User data:", {
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            role: userRole
        });

        req.user = foundUser;
        res.locals.id = foundUser.id;
        res.locals.role = userRole;

        console.log("🔎 [MIDDLEWARE] Checking req.user:", req.user);
        console.log("🔎 [MIDDLEWARE] Checking res.locals.id:", res.locals.id);
        console.log("🔎 [MIDDLEWARE] Checking res.locals.role:", res.locals.role);

        next();
    } catch (error) {
        console.error("❌ [MIDDLEWARE] Token verification error:", error.message);

        // Добавляем конкретную ошибку
        if (error.name === 'TokenExpiredError') {
            console.error("❌ [MIDDLEWARE] Token has expired.");
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized: Token expired',
            });
        } else if (error.name === 'JsonWebTokenError') {
            console.error("❌ [MIDDLEWARE] Invalid token format.");
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized: Invalid token format',
            });
        } else {
            console.error("❌ [MIDDLEWARE] Unknown error during token verification.");
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized: Invalid token',
            });
        }
    }
};

export default protect;
