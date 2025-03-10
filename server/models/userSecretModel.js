import { DataTypes } from "sequelize";
import sq from "../database/sequelize.js";
import { User } from "./userModel.js";

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
                model: User,
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

// 🔥 Устанавливаем связь с таблицей users
User.hasOne(UserSecret, { foreignKey: "user_id", onDelete: "CASCADE" });
UserSecret.belongsTo(User, { foreignKey: "user_id" });

export default UserSecret; // Теперь экспортируется корректно
