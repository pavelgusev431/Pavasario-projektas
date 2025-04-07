import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import AppError from '../utilities/AppError.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.token)
            throw new AppError('UnauthorizedL no token found', 401);
        const token = cookies.token;
        jsonwebtoken.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                throw new AppError('Unauthorized: invalid token', 401);
            }
            const decodedUser = decoded;
            const foundUser = await User.findByPk(decodedUser.id);
            if (foundUser) {
                res.locals.id = foundUser.id;
                res.locals.role = decodedUser.role;
                return next();
            } else {
                throw new AppError('Unauthorized: user not found', 401);
            }
        });
    } catch (error) {
        next(error);
    }
};

export default protect;
