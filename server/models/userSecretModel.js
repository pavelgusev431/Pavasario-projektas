import { DataTypes } from "sequelize";
import sq from "../database/sequelize.js";
import User from "./userModel.js";
import AppError from '../utilities/AppError.js';

const UserSecret = sq.define(
    "user_secrets",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",  // ✅ Используем строку вместо `User`
                key: 'id',
            },
            onDelete: "CASCADE",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        timestamps: false,
        tableName: "user_secrets",
    }
);

// 🔹 Ассоциации добавляем ПОСЛЕ объявления обеих моделей
User.hasOne(UserSecret, { foreignKey: "user_id", onDelete: "CASCADE" });
UserSecret.belongsTo(User, { foreignKey: "user_id" });

const syncUserSecretModel = async () => {
    try {
        const isDev = process.env.NODE_ENV === 'development';
        await UserSecret.sync({ alter: true, force: isDev });
        console.log('\x1b[35mUserSecret\x1b[34m table synced successfully\x1b[0m');
    } catch (error) {
        console.error('❌ Error syncing „UserSecret“ model:', error);
        throw new AppError(`❌ Error creating „UserSecret“ model: ${error}`, 500);
    }
};

export default UserSecret;
export { syncUserSecretModel };
export { UserSecret };
