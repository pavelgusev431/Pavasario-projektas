import User from '../models/userModel.js';
import Secret from '../models/userSecretModel.js';
import jsonwebtoken from 'jsonwebtoken';
import AppError from '../utilities/AppError.js';
import sha1 from 'js-sha1';
import sha256 from 'js-sha256';
import dotenv from 'dotenv';
dotenv.config();
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const ADMIN_HASH = sha256(sha1(sha256(sha1(ADMIN_PASS)) + 'salt'));
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const createAdmin = async () => {
    try {
        const admin = await User.create({
            username: ADMIN_USER,
            email: ADMIN_EMAIL,
        });
        console.log(
            `\x1b[34mUser \x1b[31m"${ADMIN_USER}"\x1b[34m created successfully\x1b[0m`
        );
        await Secret.create({
            userId: admin.id,
            password: `${ADMIN_HASH}:${'salt'}`,
            role: 'admin',
        });
        console.log(
            `\x1b[34mUser \x1b[31m"${ADMIN_USER}"\x1b[34m secret created successfully\x1b[0m`
        );
    } catch (error) {
        throw new AppError(
            `\x1b[31mError creating admin account:\x1b[0m\n${error}`,
            500
        );
    }
};

const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    const role = 'user';
    const now = new Date();
    const salt = sha256(sha1(now.toString() + username));
    const hashedPassword = sha256(sha1(password + salt));
    const user = await User.create({ username: username, email: email });
    await Secret.create({
        userId: user.id,
        password: `${hashedPassword}:${salt}`,
        role: role,
    });
    res.status(201).json({
        status: 'success',
        data: user,
    });
};

const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ where: { username: username } });
    if (user === undefined)
        throw new AppError(`User "${username}" not found`, 404);
    user.password = undefined;
    res.status(200).json({
        status: 'success',
        data: user,
    });
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user === undefined)
        throw new AppError(`User with id ${id} not found`, 404);
    user.password = undefined;
    res.status(200).json({
        status: 'success',
        data: user,
    });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user) throw new AppError('Invalid username or password', 401);
    const secret = await Secret.findOne({
        where: { id: user.id },
    });
    const salt = secret.password.split(':')[1];
    const hashedPassword = sha256(sha1(password + salt));
    if (hashedPassword !== secret.password.split(':')[0]) {
        throw new AppError('Invalid username or password', 401);
    }
    const token = jsonwebtoken.sign(
        { id: user.id, role: secret.role },
        process.env.JWT_SECRET,
        { expiresIn: '360s' }
    );
    res.cookie('token', token, { httpOnly: true });
    res.cookie('tokenJS', 1);
    user.username = undefined;
    user.password = undefined;
    res.status(200).json({
        status: 'success',
        data: user,
        token: token,
    });
};

const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(203);
    const token = jsonwebtoken.decode(cookies.token);
    const foundUser = await User.findByPk(token.id);
    if (foundUser) {
        res.clearCookie('token', { httpOnly: true });
        res.clearCookie('tokenJS');
        return res.sendStatus(204);
    } else throw new AppError('User not found', 404);
};

const me = async (_req, res) => {
    const { id } = res.locals;
    const user = await User.findByPk(id);
    const secret = await Secret.findByPk(id);
    if (user) {
        res.status(200).json({
            status: 'success',
            data: { ...user.DataValues, role: secret.role },
        });
    } else throw new AppError('User not found', 404);
};
const getUserId = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    res.status(200).json({
        status: 'success',
        data: user,
    });
};

const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json({
        status: 'success',
        data: users,
    });
};
const getAllUsersCount = async (req, res) => {
    const userCount = await User.count();
    res.status(200).json({
        status: 'success',
        data: userCount,
    });
};
export {
    createAdmin,
    createUser,
    getUserByUsername,
    getUserById,
    login,
    logout,
    me,
    getUserId,
    getAllUsers,
    getAllUsersCount,
};
