import { DataTypes } from "sequelize";
import sq from "../database/sequelize.js";
import { User } from "./userModel.js";
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

// 🔥 Nustatome ryšį su lentele „users“
User.hasOne(UserSecret, { foreignKey: "user_id", onDelete: "CASCADE" });
UserSecret.belongsTo(User, { foreignKey: "user_id" });

//  Funkcija sinchronizuoti modelį
const syncUserSecretModel = async () => {
    try {
        await UserSecret.sync({ alter: true });
        console.log('\x1b[35mUserSecret\x1b[34m lentelė sinchronizuota\x1b[0m');
    } catch (error) {
        console.error('Klaida sinchronizuojant „UserSecret“ modelį:', error);
        throw new AppError(`Klaida kuriant „UserSecret“ modelį: ${error}`, 500);
    }
};

export default UserSecret;
export { syncUserSecretModel };
