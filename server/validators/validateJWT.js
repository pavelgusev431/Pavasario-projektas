import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.token)
        return res.sendStatus(401).json({
            status: 'fail',
            message: 'Unauthorized: no token found',
        });
    const token = cookies.token;
    jsonwebtoken.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized: invalid token',
            });
        }
        const decodedUser = decoded;
        const foundUser = await User.findByPk(decodedUser.id);
        if (foundUser) {
            res.locals.id = foundUser.id;
            res.locals.role = foundUser.role;
            next();
        } else {
            res.status(401).json({
                status: 'fail',
                message: 'User not found',
            });
        }
    });
};

export default protect;
