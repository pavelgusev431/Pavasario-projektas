import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import dotenv from 'dotenv';

console.log("🔐 [MIDDLEWARE] JWT_SECRET (tikrinant):", process.env.JWT_SECRET);

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


const protect = async (req, res, next) => {
    const token = req.cookies?.authToken || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    console.log("📥 [MIDDLEWARE] Priimtas simbolis:", token);
    console.log("🔐 [MIDDLEWARE] JWT_SECRET (serverio patikrinimas):", JWT_SECRET);
    
    if (!token) {
        console.error("❌ [MIDDLEWARE] Trūksta žetono..");
        return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized: No token provided',
        });
    }

    try {
        const decoded = jsonwebtoken.verify(token, JWT_SECRET);
        console.log("✅ [MIDDLEWARE] Iššifruotas simbolis:", decoded);
        console.log("🔐 [MIDDLEWARE] JWT_SECRET tikrinimo etape:", JWT_SECRET);


        const foundUser = await User.findByPk(decoded.id);
        if (!foundUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        console.log("🟢 [MIDDLEWARE] Naudotojas rastas:", foundUser.id);

        req.user = foundUser;
        res.locals.id = foundUser.id;
        res.locals.role = foundUser.role;

        next();
    } catch (error) {
        console.error("❌ [MIDDLEWARE] Klaida tikrinant žetoną:", error);
        return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized: Invalid token',
        });
    }
};

export default protect;
