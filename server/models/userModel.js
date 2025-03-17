import { DataTypes } from 'sequelize';
import sq from '../database/sequelize.js';
import AppError from '../utilities/AppError.js';

const User = sq.define(
    'User',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        description: { type: DataTypes.STRING },
        contacts: { type: DataTypes.STRING },
        image_url: { type: DataTypes.STRING },
    },
    {
        timestamps: false,
        tableName: 'users',
    }
);

// 🔹 Saugi sinchronizacija (alternatyva pavojingai `force: true`)
const syncUserModel = async () => {
    try {
        const isDev = process.env.NODE_ENV === 'development';
        await User.sync({ alter: true, force: isDev }); 
        console.log('\x1b[35mUser\x1b[34m table synced successfully\x1b[0m');
    } catch (error) {
        console.error('\x1b[31m❌ Error while syncing User model:\x1b[0m', error);
        throw new AppError(`Error while syncing user model: ${error}`, 500);
    }
};

// 🔹 Automatiškai pridėti administratorių kuriant modelį
const createAdminUser = async () => {
    try {
        const existingAdmin = await User.findOne({ where: { username: 'admin' } });

        if (!existingAdmin) {
            await User.create({
                username: 'admin',
                email: 'admin@example.com',
                description: 'System Administrator',
            });
            console.log('\x1b[35mAdmin\x1b[34m user created successfully\x1b[0m');
        } else {
            console.log('\x1b[36mAdmin user already exists\x1b[0m');
        }
    } catch (error) {
        console.error('\x1b[31m❌ Error creating Admin user:\x1b[0m', error);
    }
};

export { User, syncUserModel, createAdminUser };
export default User;
