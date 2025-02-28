import { Datatypes } from 'sequelize'
import sq from '../database/sequelize.js'
import AppError from '../utilities/AppError.js'

const Secret = sq.define(
    'Secret',
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            type: Datatypes.INTEGER,
        },
    },
    {
        timestamps: false,
        tableName: 'userSecrets',
    }
)

try {
    await Secret.sync({ alter: true, force: true })
    console.log('\x1b[35mSecret\x1b[34m table created\x1b[0m')
} catch (error) {
    throw new AppError('Error while creating secret model', 500)
}

export default Secret
