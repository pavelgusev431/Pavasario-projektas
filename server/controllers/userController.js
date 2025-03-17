import { User } from '../models/userModel.js';
import UserSecret from '../models/userSecretModel.js';
import jwt from 'jsonwebtoken';
import AppError from '../utilities/AppError.js';
import sha1 from 'js-sha1';
import sha256 from 'js-sha256';
import { sendEmail } from '../utilities/mailer.js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

// Administratoriaus konstantos
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const ADMIN_HASH = sha256(sha1(sha256(sha1(ADMIN_PASS)) + 'salt'));
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const CLIENT_HOST = process.env.CLIENT_HOST;
const CLIENT_PORT = process.env.CLIENT_PORT;

console.log("🔐 [SERVER] JWT_SECRET (на генерации):", process.env.JWT_SECRET);


// *********************** ADMIN FUNCTIONS ***********************

// Создать администратора
const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ where: { username: ADMIN_USER } });

        if (existingAdmin) {
            console.log(`🔹 Administratorius „${ADMIN_USER}“ jau egzistuoja.`);
            return;
        }

        const admin = await User.create({
            username: ADMIN_USER,
            email: ADMIN_EMAIL,
        });

        const salt = crypto.randomBytes(16).toString('hex');       const hashedPassword = sha256(sha1(ADMIN_PASS + salt)).toString();

        await UserSecret.create({
            user_id: admin.id,
            password: `${hashedPassword}:${salt}`,
            role: 'admin',
        });

        console.log(`🟢 Administratorius sėkmingai sukurtas.`);
    } catch (error) {
        throw new AppError(`❌ Klaida kuriant administratorių:\n${error}`, 500);
    }
};


// *********************** USER FUNCTIONS ***********************

const createUser = async (req, res) => {
    console.log("📥 [REGISTRACIJA] Iš kliento gauti duomenys:", req.body);

    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        console.error("❌ [REGISTRACIJA] Klaida: užpildyti ne visi laukai.");
        return res.status(400).json({ message: "Visi laukai yra privalomi." });
    }

    // Генерация соли
    const salt = crypto.randomBytes(16).toString('hex');
    console.log("🧂 [REGISTRACIJA] Generuojama druska:", salt);

    // Хеширование пароля с солью
    const hashedPassword = sha256(sha1(password + salt)).toString();
    console.log("🔐 [REGISTRACIJA] Užšifruotas slaptažodis:", hashedPassword);

    try {
        const user = await User.create({ username, email });
        console.log("🟢 [REGISTRACIJA] Sukurtas naudotojas. ID:", user.id);

        // Сохранение данных в таблице UserSecret
        await UserSecret.create({
            user_id: user.id,
            password: `${hashedPassword}:${salt}`,
            role: 'user',
        });
        console.log("🟢 [REGISTRACIJA] Lentelės UserSecret duomenys buvo išsaugoti.");

        res.status(201).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        console.error("❌ [REGISTRACIJA] Klaida kuriant naudotoją:", error);
        res.status(500).json({ status: "fail", message: "Server error" });
    }
};

const login = async (req, res, next) => {
    console.log("📥 [LOGIN] Iš kliento gauti duomenys:", req.body);

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            console.error("❌ [PRISIJUNGIMAS] Klaida: Tušti laukai.");
            return res.status(400).json({ message: "Įveskite naudotojo vardą ir slaptažodį." });
        }

        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            console.error("❌ [PRISIJUNGIMAS] Klaida: naudotojas nerastas.");
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log("🟢 [PRISIJUNGIMAS] Naudotojas rastas. ID:", user.id);

        const secret = await UserSecret.findOne({
            where: { user_id: user.id },
            order: [['id', 'DESC']]
        });

        console.log("🔎 [LOGIN] Pasirinktas naudotojo ID įrašas:", secret);


        console.log("🟢 [LOGIN] Rasta vartotojo paslaptis.");

        
        const salt = secret.password.split(':')[1];
        console.log("🧂 [PRISIJUNGIMAS] Iš duomenų bazės išgauta druska:", salt);

        
        const hashedPassword = sha256(sha1(password + salt)).toString();
        console.log("🔐 [LOGIN] Prisijungimo slaptažodis:", hashedPassword);

        const storedHash = secret.password.split(':')[0];
        console.log("🔐 [LOGIN] Duomenų bazės slaptažodis:", storedHash);

        if (hashedPassword !== storedHash) {
            console.error("❌ [PRISIJUNGIMAS] Netinkamas slaptažodis.");
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log("🟢 [PRISIJUNGIMAS] Slaptažodis sėkmingai patikrintas");

        
        const token = jwt.sign(
            { id: user.id, role: secret.role },
            process.env.JWT_SECRET,
            { expiresIn: '360s', algorithm: 'HS256' }
        );

        console.log("🟢 [LOGIN] Ženklas sėkmingai sugeneruotas:", token);

        // Установка куки
        res.cookie('token', token, { httpOnly: true });
        res.cookie('tokenJS', 1);
        console.log("🍪 [PRISIJUNGIMAS] Slapukai sėkmingai nustatyti.");

        return res.status(200).json({
            status: 'success',
            data: user,
            token: token,
        });
    } catch (error) {
        console.error("❌ [PRISIJUNGIMAS] Prisijungimo klaida:", error);
        next(error);
    }
};

// Vartotojo atsijungimas
const logout = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.token) return res.sendStatus(203);
        const token = jwt.decode(cookies.token);
        const foundUser = await User.findByPk(token.id);
        if (foundUser) {
            res.clearCookie('token', { httpOnly: true });
            res.clearCookie('tokenJS');
            return res.sendStatus(204);
        } else throw new AppError('Vartotojas nerastas', 404);
    } catch (error) {
        next(error);
    }
};

// Gaukite dabartinį naudotoją
const me = async (_req, res, next) => {
    try {
        const { id } = res.locals;
        const user = await User.findByPk(id);

        console.log("📤 [SERVER] Siunčiami duomenys:", user);

        if (!user) {
            throw new AppError('Vartotojas nerastas', 404);
        }

        const secret = await UserSecret.findOne({ where: { user_id: user.id } });

        res.status(200).json({
            status: 'success',
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                description: user.description,
                contacts: user.contacts,
                role: secret ? secret.role : null
            },
        });

    } catch (error) {
        next(error);
    }
};

// Gauti naudotoją pagal vardą
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ where: { username } });
    if (!user) throw new AppError(`Vartotojas "${username}" nerastas`, 404);

    res.status(200).json({
        status: 'success',
        data: user,
    });
};

// Gauti naudotoją pagal ID
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) throw new AppError(`Vartotojo ID ${id} nerasta`, 404);
        user.password = undefined;
        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// Gaukite visus naudotojus
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

// Gaukite naudotojų skaičių
const getAllUsersCount = async (req, res) => {
    const userCount = await User.count();
    res.status(200).json({
        status: 'success',
        data: userCount,
    });
};

// *********************** PASSWORD FUNCTIONS ***********************

// Slaptažodžio atkūrimo funkcija
const forgot = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ status: "fail", message: "Reikalingas el. paštas" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(200).json({
                status: 'success',
                message: 'Laiškas išsiųstas',
            });
        }

        const secret = await UserSecret.findOne({ where: { user_id: user.id } });
        if (!secret) {
            console.warn(`⚠️  Vartotojas "${user.username}" neturi UserSecret įrašo.`);
            return res.status(200).json({
                status: 'success',
                message: 'Laiškas išsiųstas',
            });
        }

        const salt = secret.password.split(':')[1];
        const link = `http://${CLIENT_HOST}:${CLIENT_PORT}/reset/${user.id}/${salt}`;

        await sendEmail(link, email);

        res.status(200).json({
            status: 'success',
            message: 'Laiškas išsiųstas',
        });

    } catch (error) {
        console.error("❌ Klaida siunčiant el. laišką:", error);
        next(error);
    }
};

// Slaptažodžio atstatymo funkcija
const passwordReset = async (req, res, next) => {
    try {
        const { password, salt } = req.body;
        const { id } = req.params;

        if (!password || !salt || !id) {
            return res.status(400).json({ status: "fail", message: "Nepakankamai privalomų duomenų" });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'Vartotojas nerastas' });
        }

        const secret = await UserSecret.findOne({ where: { user_id: user.id } });
        if (!secret) {
            return res.status(404).json({ status: 'fail', message: 'Nerastas naudotojo slaptažodis' });
        }

        if (secret.password.split(':')[1] !== salt) {
            return res.status(400).json({ status: 'fail', message: 'Netinkama druska' });
        }

        // Генерация нового пароля и соли
        const newSalt = sha256(sha1(Date.now().toString() + user.username)).toString();
        const hashedPassword = sha256(sha1(password + newSalt)).toString();

        await secret.update({ password: `${hashedPassword}:${newSalt}` });

        res.status(200).json({ 
            status: 'success', 
            message: 'Slaptažodis sėkmingai atnaujintas' 
        });

    } catch (error) {
        console.error("❌ Slaptažodžio atkūrimo klaida:", error);
        next(error);
    }
};

// *********************** USER PROFILE FUNCTIONS ***********************

// Atnaujinti naudotojo profilį
const updateUserProfile = async (req, res) => {
    const { username, email, description, contacts, image_url } = req.body || req.body.data;

    console.log("📩 [SERVER] Gauti duomenys:", { username, email, description, contacts });

    if (!username && !email && !description && !contacts && !image_url) {
        return res.status(400).json({ status: 'fail', message: 'Nėra atnaujinamų duomenų' });
    }

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'Vartotojas nerastas' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.description = description || user.description;
        user.contacts = contacts || user.contacts;
        user.image_url = image_url || user.image_url;

        await user.save();

        console.log("🟢 [SERVER] Atnaujintas profilis:", user);

        res.status(200).json({
            status: 'success',
            message: 'Profilis sėkmingai atnaujintas',
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                description: user.description,
                contacts: user.contacts,
                image_url: user.image_url
            }
        });
    } catch (error) {
        console.error("❌ Klaида atnaujinant naudotojo profilį:", error);
        res.status(500).json({ status: "fail", message: "Serverio klaida" });
    }
};

// Atnaujinti naudotojo slaptažodį
const updateUserPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!req.user || !req.user.id) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    const userId = req.user.id;

    try {
        const userSecret = await UserSecret.findOne({ where: { user_id: userId } });
        if (!userSecret) {
            return res.status(404).json({ status: 'fail', message: 'User data not found' });
        }

        const [hashedPassword, salt] = userSecret.password.split(':');
        const currentPasswordHash = sha256(sha1(currentPassword + salt));

        if (hashedPassword !== currentPasswordHash) {
            return res.status(400).json({ status: 'fail', message: 'Incorrect current password' });
        }

        const newSalt = sha256(sha1(Date.now().toString() + req.user.username));
        const newHashedPassword = sha256(sha1(newPassword + newSalt));

        await userSecret.update({ password: `${newHashedPassword}:${newSalt}` });

        res.status(200).json({
            status: 'success',
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error("❌ Error updating password:", error);
        res.status(500).json({ status: "fail", message: "Server error" });
    }
};





// *********************** SALT FUNCTIONS ***********************

// Gauti druską pagal vartotojo vardą
const getSalt = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'Vartotojas nerastas' });
        }

        const userSecret = await UserSecret.findOne({ where: { user_id: user.id } });
        if (!userSecret) {
            return res.status(404).json({ status: 'fail', message: 'Nerastas naudotojo slaptažodis' });
        }

        const salt = userSecret.password.split(':')[1];
        res.status(200).json({ status: 'success', salt });
    } catch (error) {
        console.error('❌ Klaida vartojant druską:', error);
        res.status(500).json({ status: 'fail', message: 'Serverio klaida' });
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
    getAllUsersCount,
    getSalt,
    me,
    passwordReset,
    updateUserPassword,
    updateUserProfile
};