import { User } from '../models/userModel.js';
import UserSecret from '../models/userSecretModel.js';
import jsonwebtoken from 'jsonwebtoken';
import AppError from '../utilities/AppError.js';
import sha1 from 'js-sha1';
import sha256 from 'js-sha256';
import { sendEmail } from '../utilities/mailer.js';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const ADMIN_HASH = sha256(sha1(sha256(sha1(ADMIN_PASS)) + 'salt'));
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const CLIENT_HOST = process.env.CLIENT_HOST;
const CLIENT_PORT = process.env.CLIENT_PORT;

// Sukurti administratorių
const createAdmin = async () => {
    try {
        const admin = await User.create({
            username: ADMIN_USER,
            email: ADMIN_EMAIL,
        });

        console.log(`\x1b[34mNaudotojas \x1b[31m"${ADMIN_USER}"\x1b[34m sėkmingai sukurtas\x1b[0m`);

        await UserSecret.create({
            user_id: admin.id,
            password: `${ADMIN_HASH}:salt`,
            role: 'admin',
        });

        console.log(`\x1b[34mNaudotojo slaptažodis sukurtas sėkmingai!\x1b[0m`);
    } catch (error) {
        throw new AppError(`\x1b[31mKlaida kuriant administratorių:\x1b[0m\n${error}`, 500);
    }
};

// Sukurti naudotoją
const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    const role = 'user';
    const now = new Date();
    const salt = sha256(sha1(now.toString() + username));
    const hashedPassword = sha256(sha1(password + salt));

    try {
        const user = await User.create({ username, email });

        await UserSecret.create({
            user_id: user.id,
            password: `${hashedPassword}:${salt}`,
            role,
        });

        res.status(201).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        console.error("❌ Klaida kuriant naudotoją:", error);
        res.status(500).json({ status: "fail", message: "Serverio klaida" });
    }
};

// Gauti naudotoją pagal vartotojo vardą
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ where: { username } });
    if (!user) throw new AppError(`Naudotojas "${username}" nerastas`, 404);

    res.status(200).json({
        status: 'success',
        data: user,
    });
};

// Gauti naudotoją pagal ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) throw new AppError(`Naudotojas su ID ${id} nerastas`, 404);

    res.status(200).json({
        status: 'success',
        data: user,
    });
};

// Prisijungimas
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) throw new AppError('Neteisingas naudotojo vardas arba slaptažodis', 401);

    const secret = await UserSecret.findOne({
        where: { user_id: user.id },
    });

    const salt = secret.password.split(':')[1];
    const hashedPassword = sha256(sha1(password + salt));

    if (hashedPassword !== secret.password.split(':')[0]) {
        throw new AppError('Neteisingas naudotojo vardas arba slaptažodis', 401);
    }

    const token = jsonwebtoken.sign(
        { id: user.id, role: secret.role },
        process.env.JWT_SECRET,
        { expiresIn: '360s' }
    );

    res.cookie('token', token, { httpOnly: true });
    res.cookie('tokenJS', 1);

    res.status(200).json({
        status: 'success',
        data: user,
        token,
    });
};

// Atsijungimas
const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(203);

    const token = jsonwebtoken.decode(cookies.token);
    const foundUser = await User.findByPk(token.id);

    if (foundUser) {
        res.clearCookie('token', { httpOnly: true });
        res.clearCookie('tokenJS');
        return res.sendStatus(204);
    } else throw new AppError('Naudotojas nerastas', 404);
};

// Pamiršto slaptažodžio funkcija
const forgot = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(200).json({
                status: 'success',
                message: 'El. laiškas išsiųstas',
            });
        }

        const secret = await UserSecret.findOne({ where: { user_id: user.id } });
        const salt = secret.password.split(':')[1];
        const link = `http://${CLIENT_HOST}:${CLIENT_PORT}/reset/${user.id}/${salt}`;

        await sendEmail(link, email);

        res.status(200).json({
            status: 'success',
            message: 'El. laiškas išsiųstas',
        });
    } catch (error) {
        console.error("❌ Klaida siunčiant el. laišką:", error);
        res.status(500).json({ status: "fail", message: "Serverio klaida" });
    }
};

// Gauti druską (salt) pagal naudotojo vardą
const getSalt = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'Naudotojas nerastas' });
        }

        const userSecret = await UserSecret.findOne({ where: { user_id: user.id } });
        if (!userSecret) {
            return res.status(404).json({ status: 'fail', message: 'Naudotojo slaptažodis nerastas' });
        }

        const salt = userSecret.password.split(':')[1];
        res.status(200).json({ status: 'success', salt });
    } catch (error) {
        console.error('❌ Klaida gaunant druską:', error);
        res.status(500).json({ status: 'fail', message: 'Serverio klaida' });
    }
};

const me = async (_req, res, next) => {
    try {
        const { id } = res.locals;
        const user = await User.findByPk(id);
        const secret = await Secret.findByPk(id);
        if (user) {
            res.status(200).json({
                status: 'success',
                data: { ...user.DataValues, role: secret.role },
            });
        } else throw new AppError('User not found', 404);
    } catch (error) {
        next(error);
    }
};

// Gauti visus naudotojus
const getAllUsers = async (_req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            status: 'success',
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

// Funkcija slaptažodžio atstatymui (Password Reset)
const passwordReset = async (req, res) => {
    const { id } = req.params;
    const { password, salt } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'Naudotojas nerastas' });
        }

        const secret = await UserSecret.findOne({ where: { user_id: user.id } });
        if (!secret) {
            return res.status(404).json({ status: 'fail', message: 'Naudotojo slaptažodis nerastas' });
        }

        if (secret.password.split(':')[1] !== salt) {
            return res.status(400).json({ status: 'fail', message: 'Neteisinga druska' });
        }

        const newSalt = sha256(sha1(Date.now().toString() + user.username));
        const hashedPassword = sha256(sha1(password + newSalt));

        secret.password = `${hashedPassword}:${newSalt}`;
        await secret.save();

        res.status(200).json({ status: 'success', message: 'Slaptažodis sėkmingai atnaujintas' });
    } catch (error) {
        console.error("❌ Klaida atkuriant slaptažodį:", error);
        res.status(500).json({ status: "fail", message: "Serverio klaida" });
    }
};

// Funkcija atnaujinti naudotojo profilį (Update User Profile)
const updateUserProfile = async (req, res) => {
    console.log("🔍 req.params:", req.params);
    console.log("🔍 req.body:", req.body);
    console.log("🔍 req.user:", req.user);
    console.log("🔍 req.cookies:", req.cookies);

    const { id } = req.params;
    const { username, email, description, contacts, image_url } = req.body;

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'Naudotojas nerastas' });
        }

        // Atnaujinti naudotojo duomenis (Updating user details)
        user.username = username || user.username;
        user.email = email || user.email;
        user.description = description || user.description;
        user.contacts = contacts || user.contacts;
        user.image_url = image_url || user.image_url;

        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Profilis sėkmingai atnaujintas',
            data: user,
        });
    } catch (error) {
        console.error("❌ Klaida atnaujinant naudotojo profilį:", error);
        res.status(500).json({ status: "fail", message: "Serverio klaida" });
    }
};

// Funkcija atnaujinti slaptažodį (Update User Password)
const updateUserPassword = async (req, res) => {
    const { current, new: newPassword } = req.body;

    if (!req.user || !req.user.id) {
        return res.status(404).json({ status: 'fail', message: 'Naudotojas nerastas' });
    }

    const userId = req.user.id;

    try {
        const userSecret = await UserSecret.findOne({ where: { user_id: userId } });
        if (!userSecret) {
            return res.status(404).json({ status: 'fail', message: 'Naudotojo duomenys nerasti' });
        }

        const [hashedPassword, salt] = userSecret.password.split(':');
        const currentPasswordHash = sha256(sha1(current + salt));

        if (hashedPassword !== currentPasswordHash) {
            return res.status(400).json({ status: 'fail', message: 'Neteisingas dabartinis slaptažodis' });
        }

        const newSalt = sha256(sha1(Date.now().toString() + req.user.username));
        const newHashedPassword = sha256(sha1(newPassword + newSalt));

        await userSecret.update({ password: `${newHashedPassword}:${newSalt}` });

        res.status(200).json({
            status: 'success',
            message: 'Slaptažodis sėkmingai atnaujintas',
        });
    } catch (error) {
        console.error("❌ Klaida atnaujinant slaptažodį:", error);
        res.status(500).json({ status: "fail", message: "Serverio klaida" });
    }
};


export {
    createAdmin,
    createUser,
    getUserByUsername,
    getUserById,
    login,
    logout,
    forgot,
    getAllUsers,
    getSalt,
    me,
    passwordReset,
    updateUserPassword,
    updateUserProfile
};
