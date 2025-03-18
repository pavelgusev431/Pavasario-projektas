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

export { User, syncUserModel };
export default User;
